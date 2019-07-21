# React-MVx

React-MVx is the [Type-R](https://github.com/VoliJS/Type-R) binding to React based on 
[NestedLink](https://github.com/Volicon/NestedLink) React data binding library.

- [React](https://reactjs.org/) used as a view layer.
- [Type-R](https://github.com/VoliJS/Type-R) as a data layer and UI state management.
- [NestedLink](https://github.com/Volicon/NestedLink) for two-way data binding.
    
Contrary to the popular React approaches, React-MVx does not try to avoid the distributed mutable application state. Instead, it is focused on bringing stateful components capabilities to their maximum.

Key features:

- *Run-time type asserts*. Application state defined with Type-R is protected from improper assignments, including incompatible JSON coming from the network.
- *Speed*. Collections of 10-20K items are being parsed and processed with sub-second delays.
- *Complex state support*. Component's state is described with Type-R Record and its attributes can be composed of complex types, including other records and collections with indefinite nesting.
- *Automatic serialization*. All state elements are serializable to JSON by default with no additional effort.
- *id-references support*. References by object ids in JSON are resolved automatically, including the situation with multiple collections of records holding cross-references which are being fetched independently.
- *Deeply observable changes*. Updates are executed in transactions allowing the bunch of changes to be made as reactions on other changes, without introducing extra change events and renders.
- *Mutable data structures* with *pure render* support. For some reason, many people believes that it's impossible.
- *Two-way data binding*. Dealing with complex forms is *the* strong side of the React-MVx.
- *Forms validation*. You'll get it for free, just attach the check to the state's attribute.
- *Layered application state*. You can create and dispose as many stores as you want dynamically. In many cases, you don't even need the store - there's no any difference in managing the component's local state and the store.
- *MVVM pattern support*. MVVM scales perfectly, and we believe its support is a must.

## Examples

- Babel + Webpack [boilerplate](/examples/babel-boilerplate)
- [Checklist tree](/examples/checklistTree)
- [TodoMVC](/examples/todomvc)
- [UsersList](/examples/userslist)
- [Flux Comparison](/examples/flux-comparison)

## [Documentation](https://volicon.github.io/React-MVx)

## Installation & Requirements

Supported browsers: Chrome, Firefox, Safari, IE10+.

Requires `react`, `prop-types`, and `type-r` as peer dependencies. Installation (assuming that React is installed):

    npm install react react-mvx type-r prop-types --save-dev

The best way to start is to use the [boilerplate](/examples/babel-boilerplate) which already has
babel, webpack, and the minimal set of required dependencies configured.

TypeScript is unsupported (yet) but may work.

## Developer tools

The [modified version of the React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/ahggoppikhphoggoibnlbpcpegnchiio) with fixes required for React-MVx is available in the Chrome Web Store.

- Fixed an exception when inspecting the props with custom getters in prototype.
- Collections are displayed as an array (system fields hidden).
- Record is displayed as an object (system fields hidden).
- Component's state (which is the Record) is displayed as an object.

---

MIT License. Used and supported by Volicon and Verizon Digital Media Services.
