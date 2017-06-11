# Tutorials

## Data binding and forms

In this tutorial we will learn the state management and two-way data binding basics on the example of the simple user info editing form.

![form](images/form.png)

Our form will be the simple stateful component holding the state of the form in its local state, and for the purpose of the illustration storing its state in the browser's localStorage.

### Defining the stateful component

React-MVx extends React namespace and must be used instead of React. The most important class it exports is the modified `Component`.

The general definition of the stateful component looks like this:

```javascript
import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'

@define class Application extends React.Component {
    static state = {
        /* state attributes definition */
    };

    render(){
        return (
            /* jsx */
        );
    }
}

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );
```

There are few differences to raw React so far:

- Component definitions (as all React-MVx definitions) must be preceded with the `@define` decorator. 
- The state is not _assigned_ in the constructor, but _declaratively defined_ in class definition.

### Declaring the state

In the simplest case like ours when the state is flat and consists of primitive types, the state definition looks like the plain object. We list state attributes accompanied with their default values.

```javascript
    static state = {
        name : '',
        email : '',
        isActive : true
    };
```

This declaration will lead to an automatic creation of the observable `component.state` object of the similar shape when the `Application` component will be mounted. No need to initialize the state in the constructor.

No need for `component.setState()` either; plain assignments to the `component.state` members will be detected and will lead to the component's render. Which is cute, but we won't need any explicit state modifications in this example. Because we have two-way data binding.

### Adding the form's markup

Now it's the time to create the markup for our form using the standard React's ["controlled components"](https://facebook.github.io/react/docs/forms.html#controlled-components). Controlled components do not have their own local state; it's mapped to some external state container.

In React-MVx this mapping is done with _links_. Think of [link](../04_Link/00_Overview.md) in this example as an object-reference to the state's attribute. `link.props` return the `value`/`onChange` props pair which is expected by standard _controlled form components_.

```javascript
    render(){
        // Link the state...
        const { name, email, isActive } = this.linkAll();

        return (
            <form>
                <label>
                    Name: <input type="text" { ...name.props }/>
                </label>

                <label>
                    Email: <input type="text" { ...email.props }/>
                </label>

                <label>
                    Is active: <input type="checkbox" { ...isActive.props }/>
                </label>
            </form>
        );
    }
```

At this stage, we have an editable form.

### Adding the persistent state

We would like to store the state of our form in the browser's localStorage. "Save" button must save the state, while "Cancel" must return the form to its default state. First of all, lets add these buttons:

```javascript
    render(){
        ...
        return (
            <form onSubmit={ this.onSubmit }>
                ...
                <button type="submit">Save</button>
                <button type="button" onClick={ this.onCancel }>
                    Clear
                </button>
            </form>
        );
    }
```

We want "Cancel" button to set out state to its defaults, which is represented in the code quite literally:

```javascript
    onCancel = () => this.state.set( this.state.defaults() );
``` 

And the "Save" button must save the state to the localStorage. Good news is that _all the state in React-MVx is serializable by default_.

```javascript
    onSubmit = () => localStorage.setItem( 'users-form', JSON.stringify( this.state ) );
```

Now, all we have to do is to restore the state on load. Which is done in the standard React's `componentWillMount` lifecycle hook.

```javascript
    componentWillMount(){
        const json = JSON.parse( localStorage.getItem( 'users-form' ) || '{}' );
        this.state.set( json, { parse : true } );
    }
```

That's really it. Here are the complete [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/form.jsx) of our example, and here you can see the example [working](https://gaperton.github.io/react-mvx-examples/dist/form.html).

### API used in the example

Name | Description
---|---
`static` state = { attrName : `attrDef`, ... } | Inline component state definition
component.state | record representing the component state
recordOrCollection.set( data, options? ) | bulk update the record or collection
recordOrCollection.toJSON() | convert an object to JSON.
component.linkAll() | Create links to all state attributes. Same as `component.state.linkAll()`
link.props | Convert the link to the standard pair of `value`/`onChange` props.

## Form Validation

In this tutorial, we will add input validation to the user editing form from the [previous example](01_Data_binding_and_forms.md). That's the client-side "as-you-type" validation preventing the user from submitting invalid data while giving him hints.

![Validated form](images/validation.png)

### State definition and validation checks

All state attributes in React-MVx has associated run-time types and the metadata. The general form of an attribute definition is `Constructor.value( defaultValue )`. When the `defaultValue` is used as an attribute definition (as it was in [previous example](01_Data_binding_and_forms.md)), its type (Constructor) is taken from the value.

`.value( defaultValue )` can be omitted as well. If an attribute definition is a function, it assumed to be the attribute's `Constructor`. Therefore, the following state definition is equivalent to one in the example.

```javascript
@define class Application extends React.Component {
    static state = {
        name : String, // same as ''
        email : String, // same as ''
        isActive : Boolean.value( true ) // same as true
    };
    ...
}
```

This is important because validation checks are the part of the attribute definition. Which is cool, as it allows us to make custom attribute types with all of the validation checks encapsulated. Let's do this for the email.

Validator itself is the function taking the attribute's value and returning `true` whenever it is valid.

```javascript
// Something simple, just for illustration purposes.
function isValidEmail( x ){
    return !x || x.indexOf('@') >= 0;
}
```

Then, we need to attach the validator to the attribute definition. And we've got the Email attribute type which can be used anywhere across the system.

```javascript
const Email = String.has.check( isValidEmail, 'Invalid email' );
```

Now we have all we need to define our state. We will use the built-in validation check `isRequired` which fails at empty values. This check is special because it is always executed first. Other `checks()` predicates can be chained and are executed in sequence.

```javascript
@define class Application extends React.Component {
    static state = {
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    };
    ...
}
```

### Displaying validation errors

In React-MVx, the validation happens transparently and automatically. When you create the link, the attribute's validation error is accessible as `link.error`. Nothing special needs to be done to _trigger_ the validation, all you have to do is to display the error.

```javascript
    render(){
        const { name, email, isActive } = this.linkAll();
        return (
            <form onSubmit={ this.onSubmit }>
                <label> Name: 
                    <div className="validated-control">
                        <input type="text" { ...name.props} />
                        { name.error && <div className="error">{ name.error }</div> }
                    </div>
                </label>
                ...
            </form>
        );
    }
```

And we would like to have the Save button disabled in case if the state is not valid for any reason:

```javascript
...
<button type="submit" disabled={!this.state.isValid()}>
    Save
</button>
...
```

That's it. There's one more optional but important thing left to do, though.

### Linked UI controls

The final touch is to wrap the form's input displaying the validation error to the dedicated control, taking the `link` as an argument.

We define our own reusable `Input` form element which displays the validation error in the way we want:

```javascript
const Input = ({ link, ...props }) => (
    <div className="validated-control">
        <input {...props} {...link.props} />
        { link.error && <div className="error">{ link.error }</div> }
    </div>
);
```

With that change, our `render()` method starts looking like this:

```javascript
render(){
    // Link the state...
    const { name, email, isActive } = this.linkAll();
    return (
        <form onSubmit={ this.onSubmit }>
            <label>
                Name: <Input type="text" link={name}/>
            </label>
            <label>
                Email: <Input type="text" link={email}/>
            </label>
            <label>
                Is active: <input type="checkbox" {...isActive.props}/>
            </label>
            <button type="submit" disabled={!this.state.isValid()}>
                Save
            </button>
            <button type="button" onClick={this.onCancel}>
                Clear
            </button>
        </form>
    );
}
```

As you can see, the validation does not affect the markup in React-MVx. Thanks to the _links_, which conveniently transport the validation error from the place where it occurs to the place where it's consumed.

Here are the complete [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/validation.jsx), and here you can see the example [working](https://gaperton.github.io/react-mvx-examples/dist/validation.html).

### API used in the example

Name | Description
-----|----------
`attrDef` : Type.value( defaultValue ) | The general form of attribute definition where the `Type` is the constructor function.
`attrDef` : Type | Attribute with a given type and the default value `new Type()` or `Type()` for primitives.
`attrDef` : defaultValue | Attribute with the given default value and the type inferred from the value.
`attrDef` : Type.has.check( predicate, errorMsg? ) | Attribute-level validator.
`attrDef` : Type.isRequired | The special case of attribute-level check cutting out empty values.
record.isValid() | Returns `true` whenever an object and its aggregation tree is valid.

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


## Editable lists

## Paging

TBD

## Relations and stores

TBD

## Layered application state

TBD