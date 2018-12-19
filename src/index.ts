import * as React from 'react';
import { ChainableAttributeSpec, define, mixinRules, mixins, type } from 'type-r';
import { Component } from './component';
import { Element, Node } from './define';
import Link from './link';

interface ReactMVx {
    // It's ES6 module
    default : ReactMVx
    
    // MixtureJS decorators...
    define : typeof define
    mixins : typeof mixins
    mixinRules : typeof mixinRules

    // Overriden components
    Component : typeof Component

    // additional ReactMVx types
    Link : typeof Link
    Node : ChainableAttributeSpec
    Element : ChainableAttributeSpec

    // Helper methods
    assignToState( key : string )
}

// extend React namespace
const ReactMVx : ReactMVx & typeof React = Object.create( React );

// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.define = define;
ReactMVx.mixins = mixins;

ReactMVx.Node = type( Node ).value( null );
ReactMVx.Element = type( Element ).value( null );
ReactMVx.Link = Link;

ReactMVx.Component = Component as any;
const assignToState = ReactMVx.assignToState = key => {
    return function( prop ){
        const source = prop && prop instanceof Link ? prop.value : prop;
        this.state.assignFrom({ [ key ] : source });
        if( source && source._changeToken ){
            this.state[ key ]._changeToken = source._changeToken;
        }
    }
}

export default ReactMVx;
export { define, mixins, Node, Element, Link, Component, assignToState }
