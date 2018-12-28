/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { CallbacksByEvents, InferAttrs, Messenger, Record, Store } from 'type-r';
import onDefine, { TypeSpecs } from './define';
import Link from './link';
export declare class Component<P extends object, S extends object = {}> extends React.Component<InferAttrs<P>, any> {
    readonly cid: string;
    static state?: TypeSpecs | typeof Record;
    static props?: TypeSpecs;
    static pureRender?: boolean;
    private _disposed;
    private static propTypes;
    private static defaultProps;
    private PropsChangeTokens;
    static extend: (spec: object, statics?: object) => Component<any>;
    linkAt(key: string): Link<any>;
    linkAll(...keys: string[]): {
        [key: string]: Link<any>;
    };
    linkPath(path: string): Link<any>;
    readonly links: any;
    static onDefine: typeof onDefine;
    readonly state: S extends Record ? S : InferAttrs<S> & Record;
    constructor(props?: any, context?: any);
    _initializeState(): void;
    assignToState(x: any, key: string): void;
    setState(attrs: object | ((state: S, props: P) => object)): void;
    isMounted: () => boolean;
    on: (events: string | CallbacksByEvents, callback: any, context?: any) => this;
    once: (events: string | CallbacksByEvents, callback: any, context?: any) => this;
    off: (events?: string | CallbacksByEvents, callback?: any, context?: any) => this;
    trigger: (name: string, a?: any, b?: any, c?: any, d?: any, e?: any) => this;
    stopListening: (source?: Messenger, a?: string | CallbacksByEvents, b?: Function) => this;
    listenTo: (source: Messenger, a: string | CallbacksByEvents, b?: Function) => this;
    listenToOnce: (source: Messenger, a: string | CallbacksByEvents, b?: Function) => this;
    dispose: () => void;
    componentWillUnmount(): void;
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction(fun: (state?: Record) => void): void;
    getStore(): import("type-r").Transactional | Store;
    asyncUpdate(): void;
}
