import * as React from 'react';
import { ChainableAttributeSpec, define, mixinRules, mixins } from 'type-r';
import { Component } from './component';
import { Element, Node } from './define';
import Link from './link';
interface ReactMVx {
    default: ReactMVx;
    define: typeof define;
    mixins: typeof mixins;
    mixinRules: typeof mixinRules;
    Component: typeof Component;
    Link: typeof Link;
    Node: ChainableAttributeSpec;
    Element: ChainableAttributeSpec;
    assignToState(key: string): any;
}
declare const ReactMVx: ReactMVx & typeof React;
declare const assignToState: (key: string) => (prop: any) => void;
export default ReactMVx;
export { define, mixins, Node, Element, Link, Component, assignToState };
