/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { CallbacksByEvents, InferAttrs, Messenger, Record, Store } from 'type-r';
import onDefine from './define';
import Link from './link';
export interface ComponentDefinition {
    props?: object;
    state?: object | typeof Record;
}
export declare class Component<C extends ComponentDefinition> extends React.Component<InferAttrs<C["props"]>, object> {
    readonly cid: string;
    static state?: any;
    static props?: object;
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
    readonly state: C["state"] extends typeof Record ? InstanceType<C["state"]> : InferAttrs<C["state"]> & Record;
    constructor(props?: any, context?: any);
    _initializeState(): void;
    assignToState(x: any, key: string): void;
    setState(attrs: object | ((state: this["state"], props: this["props"]) => object)): void;
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
    transaction(fun: (state?: this["state"]) => void): void;
    getStore(): import("type-r").Transactional | Store;
    asyncUpdate(): void;
}
