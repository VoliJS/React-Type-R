# Component

React-MVx extends React namespace and should be used instead of `react`. `@define` decorator must preceed all the Component class definitions.

```javascript
import React, { define } from 'react-mvx'

@define class Hello extends React.Component {
    static props = { // instead of `propTypes` and `defaultProps`
        propName : `propDef`,
        ...
    }

    static context = { // instead of `contextTypes`
        propName : `propDef`,
        ...
    }

    static childContext = { // instead of `childContextTypes`
        propName : `propDef`,
        ...
    }

    static state = { // instead of "this.state = " in the constructor.
        attrName : `attrDef`,
        ...
    }

    static store = { // store
        attrName : `attrDef`,
        ...
    }

    render(){...}
}
```

## props and state definitions

The majority of React-MVx features are controlled with declarative props, state, store, and context attribute definitions.

### Everything (state, store, props, and context)

Type annotations below represents the run-time type assertions.

 Annotation | Description
 -----------|-------------
 `Ctor` | element has specified type
 `Ctor.isRequired` | element is required
 `Ctor.has.check(...)`| custom validation check

### state, store, and props

You can specify the default value for an attribute or prop, and reactions on its change.

Annotation | Description
-----------|-------------
`Ctor.value( defaultValue )` | element has default value
`defaultValue` | element has default value
`Ctor.has.watcher(...)`| custom reaction on element's change 
`Ctor.has.events(...)`| listen to custom events from the element
`Ctor.has.changeEvents(...)`| update on element's changes

### state and store

You have an an attribute-level control of the serialization and ownership for the state, store, and records attributes.

Annotation | Description
-----------|-------------
`Record.shared`| attribute holds the reference to the record
`Collection.Refs`| collection of references to the records
`Record.from(...)`| reference to the record from the specified collection
`Collection.subsetOf(...)`| collection of references to the records from the specified collection
`Ctor.has.parse(...)`| custom parse hook
`Ctor.has.toJSON(...)`| custom serialization hook
`Ctor.has.get(...)`| attribute read hook |
`Ctor.has.set(...)`| attribute write hook |
`Ctor.has.metadata(...)`| attach custom metadata to the attribute

## props

Component _static props declaration_ replaces standard React's `propTypes` and `defaultProps`.

### `static` props = { name : `propDef`, ... }

Declare component props. Declaration is an object 

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        name : Declaration,
        ...
    }
}
```

### `static` pureRender = true

Prevents subsequent render calls in case if props were unchanged. It's known as "pure render" optimization.

*Inner changes of records and collections* are detected and taken into account. Thus, it works properly with mutable records and collections.

`static props` declaration is required for `pureRender` to work. Only declared props will be tracked and compared.

### `propDef` name : Constructor

Checks if component prop is an instance of the `Constructor` and puts the warning to the console if the prop type is not compatible.

### `propDef` name : Constructor.isRequired

Mark property as required.

```javascript
import React, { define } from 'react-mvx'
@define class PropsDemo extends React.Component {
    static props = {
        // Simple form of annotation is just the constructor function designating the type.
        optionalArray: Array,
        optionalBool: Boolean,
        optionalFunc: Function,
        optionalNumber: Number,
        optionalObject: Object,
        optionalString: String,
        optionalSymbol: Symbol,   
        
        // Anything that can be rendered: numbers, strings, elements or an array
        // (or fragment) containing these types.
        optionalNode: React.Node,

        // A React element.
        optionalElement: React.Element,

        // You can also declare that a prop is an instance of a class.
        optionalMessage: Message,

        // You can chain any of the above with `isRequired` to make sure a warning
        // is shown if the prop isn't provided.
        requiredFunction : Function.isRequired
    };
    ...
}
```

### `propDef` name : Constructor.value( defaultValue )

Assign default property value.

### `propDef` name : defaultValue

Assign default property value. The the type will be inferred from the `defaultValue`.

Any function in props annotation is treated as a constructor. Thus, `Function.value( defaultValue )` must be used to specify the defaults for functions.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        withDefault : String.value( 'defaultValue' ),
        anotherDefault : 'defaultValue'
    }
}
```

### `propDef` name : Constructor.has.watcher( 'componentMethodName' )

### `propDef` name : Constructor.has.watcher( function( newValue, name ){ ... } )

_Watcher_ is the function which is called when the particular prop is assigned with new value.

Watcher is called after `componentWillMount`, and may be called during `componentWillReceiveProps` if the property is changed.
Watcher is executed in the context of the component.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        first : String.has.watcher( 'onFirstChange' ),
        second : Number.has.watcher( second => console.log( 'Received new prop:', second ) )
    }

    onFirstChange( newValue, name ){
        console.log( 'First prop is about to change:', newValue );
    }
}
```

### `propDef` name : RecordOrCollection.has.changeEvents( true )

Observe _internal changes_ of the record or collection and update the component in case of changes.

### `propDef` name : EventSource.has.changeEvents( 'event1 event2 ...' )

Update the component in case if property triggers any of the listed events.

```javascript
import React, { define } from 'react-mvx'
import { Record } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        // Render on every change
        trackInnerChanges : Record.has.changeEvents( true ),
        // Render when record is added to or removed from the collection
        anotherDefault : Collection.has.changeEvents( 'add remove' )
    }
}
```

### `propDef` name : EventSource.has.events({ event : handler, ... })

Subscribe for events from the component property. `handler` can either be the name of the component's method,
or the function handling the event. Handler is executed in the context of the component.

## state

Component's state is modeled as Type-R `Record`. Record is created before `componentWillMount()` and disposed after `componentWillUnmount()`.
All changed inside of the state record are observed, and the component is updated in case of change.

### `static` state = RecordConstructor

Define stateful component with the state Record declared externally.

### `static` state = { name : `attrDef`, ... }

Implicitly define state Record with a given attributes declaration. All declarations working on `props` works for the state as well. Refer to the Record documentation for the attributes declaration syntax.

### component.state

Holds an object of the `Record` subclass. 

*Do not use `component.setState()`*. Use direct assignments to modify the state:

    this.state.x = 5;

Refer to the Record documentation for the complete list of methods.

### component.transaction( fun )

Group the sequence of state (and props) updates in the single transaction leading to single UI update.

    this.transaction( state => {
        state.a++;
        state.b++;
        this.props.collection.reset();
    });

Read more about transactions in Record's manual.

## store

Stores in Type-R are internally similar to the Record and used to resolve one-to-many and many-to-many relationships by id.
Stores *must not* be used to store UI state; they are intended to hold the shared domain state which is cross-referenced by id.

There may be multiple stores in Rect-MVx. There is the single _default store_ (`Store.global`) which is used to cache the data that must be accessible across the pages.

Specifying the store for the top-level component sets this store as the primary one for all the internal state of the current component subtree.

### `static` store = existingStore

Expose the `existingStore` to the component subtree. Update component on store changes.

### `static` store = StoreConstructor

Creates the local store on component's mount and dispose it when component is unmounted.

Expose the store to the component subtree. Update component on store changes.

### `static` store = { attrName : `attrDef`, ... }

Implicitly create the `Store` subclass from the given attribute spec.

Accepts the same `attrDef` as the `state` and `Record`.

### component.store 

When the `static store` is defined, provide the access to the store in component.

Store *is not* directly accessible to the subcomponents; you have to pass values down as props.

## context

Static `context` and `childContext` declarations replaces React's standard `contextTypes` and `childContextTypes`.

### `static` context = { name : `propDef`, ... }

Replacement for standard `contextTypes`.

### `static` childContext = { name : `propDef`, ... }

Replacement for standard `childContextTypes`.

`getChildContext()` function is required to create the context as in raw React.

Subset of `static props` declaration is supported for the context `propDef`.

### `propDef` name : Constructor

Checks whenever the value is an instance of the `Constructor` and puts the warning to the console if the prop type is not compatible.

### `propDef` name : Constructor.isRequired

Value is required.

## Links to state

Component implements shorthand methods for creating links to state.
The same API is implemented by every Record class. All the methods below generally forward calls to the `component.state`.

### component.linkAt( 'key' )

Create the link for the state member `key`. Is a shortcut for `component.state.linkAt()` method.

All records support `linkAt()` method as well.

### component.linkAll()

Create links for all (or specified) the state members. All records support `linkAll()` method as well.

### component.links

Direct access to the links cache. Can be used in event handlers to access the links created during the last `render()`.

All links created for records (and for the component's state) are being cached. They are recreated only in case when their value has been changed.

## UI updates

### component.asyncUpdate()

Safe version of the `forceUpdate()`. Gracefully handles component disposal and UI update transactions.

Shall be used in place of every manual call to `forceUpdate()`.

## Events

Component implements `Events` interface from the Type-R framework, thus it's able to trigger and subscribe for events.

## Lifecycle hooks and mixins

<aside class="warning">
Lifecycle hooks are chained automatically on inheritance.
</aside>