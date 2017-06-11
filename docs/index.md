---
title: React-MVx 1.0 API Reference

toc_footers:
  - <a href="https://github.com/Volicon/React-MVx">GitHub repository</a>
  - <a href="https://github.com/Volicon/React-MVx/issues">Ask the question or report the bug</a>
  - <a href="http://www.volicon.com/">Supported by <img style="vertical-align: middle" src="images/volicon_verizon_dm.png"/></a>

includes:
  - tutorials
  - tutorials/databinding
  - tutorials/validation
  - tutorials/selection
  - component
  - link
  - controls

search: true
---

# Getting started

React-MVx is the MVVM SPA framework with React as View layer, which is built upon frontend technologies used at Volicon/Verizon for 3 years.

Contrary to the popular React approaches, React-MVx does not try to avoid the distributed mutable application state. Instead, it is focused on bringing stateful components capabilities to their maximum.

React-MVx manages both local UI state and application domain state with the same universal state container provided by [Type-R](https://volicon.github.com/Type-R) data framework. It supports:

- two-way data binding
- declarative state validation
- nested data structures & observable changes
- painless state synchronization
- automatic JSON serialization

React-MVx application architecture follows scalable MVVM architecture pattern. It features the _unidirectional data flow_ and _pure render_ optimization. But contrary to the popular React state management solutions:

- It doesn't rely on singletons (unless you _really_ need some data to be shared across pages)
- It assists and encourages usage of _locally encapsulated state_ and _OO decomposition_.

## Overview

React-MVx is built around the idea of _universal state management_ featuring 
the same technique to manage the local component state, application page state,
and the global application state.

Basic building blocks of the application architecture are:

- React-MVx Component (extended React.Component) for the view layer.
- Records and Collection (provided by Type-R data framework) for managing all kinds of an application state.
- Links for two-way data binding.
- Stores (which is the subclass of the Record and can be dynamically created) for resolving record's id-references.

React-MVx Component uses the Record class to manage its local state. Record can consists of other records 
and collections, describing the data structure of arbitrary complexity. All records are serializable by default, has deeply observable changes, and supports the declarative validation.

The behavior of record's attributes and component state/props elements is controlled with declarative _type annotations_. 

React-MVx extends React namespace and should be used instead of `react`.
All class Component definitions must be preceeded with the `@define` decorator.

```javascript
import React, { define } from 'react-mvx'

@define class HelloApp extends React.Component {
    static state = {
        count : 0
    };

    render(){
        const { state } = this;
        return (
            <h1 onClick={ () => state.count++ }>
                Hi there! { state.count }
            </h1>;
        );
    }
}
```

## Installation & Requirements

Supported browsers: Chrome, Firefox, Safari, IE10+.

Requires `react` and `type-r` as peer dependencies. Installation (assuming that React is installed):

    `npm install react-mvx type-r --save-dev`

TypeScript is unsupported (yet) but may work.

---

MIT License. Used and supported by Volicon and Verizon Digital Media Services.