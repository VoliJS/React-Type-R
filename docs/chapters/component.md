# Component

React-MVx extends React namespace and should be used instead of `react`.
All class Component definitions must be preceeded with the `@define` decorator.

All features of the Component are controlled through the unified property and attribute declarations.

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

The majority of React-MVx features are controlled with declarative props, state, store, and context type annotations.

### Everything (state, store, props, and context)

Type annotations below represents the run-time type assertions.

 Annotation | Description
 -----------|-------------
| `Ctor` | element has specified type
| `Ctor.isRequired` | element is required
| `Ctor.has.check(...)`| custom validation check

### state, store, and props

You can specify the default value for an attribute or prop, and reactions on its change.

 Annotation | Description
 -----------|-------------
| `Ctor.value( defaultValue )` | element has default value
| `defaultValue` | element has default value
| `Ctor.has.watcher(...)`| custom reaction on element's change 
| `Ctor.has.events(...)`| listen to custom events from the element
| `Ctor.has.changeEvents(...)`| update on element's changes

### state and store

You have an an attribute-level control of the serialization and ownership for the state, store, and records attributes.

Annotation | Description
-----------|-------------
| `Record.shared`| attribute holds the reference to the record |
| `Collection.Refs`| collection of references to the records |
| `Record.from(...)`| reference to the record from the specified collection |
| `Collection.subsetOf(...)`| collection of references to the records from the specified collection |
| `Ctor.has.parse(...)`| custom parse hook |
| `Ctor.has.toJSON(...)`| custom serialization hook |
| `Ctor.has.get(...)`| attribute read hook |
| `Ctor.has.set(...)`| attribute write hook |
| `Ctor.has.metadata(...)`| attach custom metadata to the attribute |