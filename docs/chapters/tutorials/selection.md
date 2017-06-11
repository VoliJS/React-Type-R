## Managing selection in lists

State of the lists is represented with Type-R's `Collection` type. Every `Record` class has the automatically created collection constructor which is referenced with `Record.Collection`.

### Single item selection

For the purpose of clarity we split the example into two components. Top-level holding the state, and the stateless component which will render the list.

```javascript
@define class TopComponent extends React.Component {
    static attributes = {
        items : User.Collection, // aggregated collection of users
        selected : User.shared // reference to the record of this.users
    };

    render(){
        const { state } = this;
        // List must change the selection, thus it is passed as link.
        return <List items={ state.items }
                     selectedLink={ state.linkAt( 'selected' ) } />;
    }
}
```

In Type-R, all the state is represented as the set of _aggregation trees_. By default, each nested record or collection is _aggregated_ and behave as an integral part of the owner. It means, that it's created, copied, serialized, and validated recursively when it happens to its owner. And aggregation implies that there must be just the single owner, which is fine when the state has the proper tree structure.

Here, however, the state is not the tree. `selected` points to the elements of `items` collection, which would cause an aggregation error if we wouldn't marked is as `User.shared`. Now Type-R knows that `selected` is not an aggregation, but an association. Thus it can properly clone and dispose the state.

![selected state](images/selected-state.png)

Our list component will be pure. Since it has to modify the selection on item's click, it needs to take the link to the selected element rather than the value.

```jsx
const List = ({ items, selectedLink }) => (
    <div className="list">
        { items.map( item => (
            <div key={ item.cid }
                 className={ item === selectedLink.value ? 'selected' : '' }
                 onClick={ () => selectedLink.set( item ) }>
                { item.name }
            </div>
        )}
    </div>
);
```

Every object in Type-R has `cid`. It's the unique client-only id generated upon object's creation. We used it here as `key` prop inside of map, so the React can handle items removal and insertions properly.

### Multiple items selection

The state of multi-selection is represented with the collection, but we can't just use `User.Collection` because the state will aggregate selected items twice. `Collection.Refs` is the type of the collection which does not aggregate its members.

```javascript
@define class TopComponent extends React.Component {
    static attributes = {
        items : User.Collection,
        selected : User.Collection.Refs 
    };

    render(){
        const { state } = this;
        return <List items={ state.items }
                     selected={ state.selected } />;
    }
}
```

`Collection.Refs` is _non-aggregating collection_, which doesn't attempt to take an ownership on its elements. Whenever the state will be cloned `selected` collection itself will be shallow cloned, while the `items` collection will be deeply cloned.

![multiselect state](images/multiselect-state.png)

In Type-R, the nested records and collections are mutable and deeply observable. `state.selected` is an object, so we can just pass it to the List component as it is. Whenever it will be updated, the change will be noticed by the TopComponent which will cause the render.

```javascript
const List = ({ items, selected }) => (
    <div className="list">
        { items.map( item => (
            <div key={ item.cid }
                 className={ selected.get( item ) ? 'selected' : '' }
                 onClick={ () => selected.toggle( item ) }>
                { item.name }
            </div>
        )}
    </div>
);
```

### Making the state serializable

`User.shared` and `Collection.Refs` are not present in JSON
when the `state.toJSON()` is called. They are _non-serializable_ references, and it's 's okay for the UI state in the majority of cases.

You need to use `Record.from` and `Collection.subsetOf` attribute definitions to make the serializable. Both of them take the reference to the master collection which is used to restore elements from their ids. The reference is the dot-separated path to the collection taken relative to the record's `this`.

<aside class="notice">
id-references notation is more informative to the reader and should be preferred to `shared` and `Refs` anywhere where it's possible.
</aside>

```javascript
static attributes = {
    items : User.Collection,
    selected : User.from( 'items' ) // as an id of the record from this.items collection in JSON
};
```

```javascript
static attributes = {
    items : User.Collection,
    selected : User.Collection.subsetOf( 'items' ) // as array of ids of records from this.items in JSON
};
```

### API used in the example

Name | Description
---|---
