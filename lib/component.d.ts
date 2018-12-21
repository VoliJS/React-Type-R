/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { Messenger, Record, Store } from 'type-r';
import onDefine, { TypeSpecs } from './define';
import Link from './link';
export declare class Component<P extends object, S extends Record = Record> extends React.Component<P, S> {
    cid: string;
    static state?: TypeSpecs | typeof Record;
    static props?: TypeSpecs;
    static pureRender?: boolean;
    static extend: (spec: object, statics?: object) => Component<any>;
    linkAt(key: string): Link<any>;
    linkAll(...keys: string[]): {
        [key: string]: Link<any>;
    };
    linkPath(path: string): Link<any>;
    readonly links: any;
    static onDefine: typeof onDefine;
    readonly state: S;
    constructor(props: Readonly<P>);
    _initializeState(): void;
    assignToState(x: any, key: string): void;
    setState(attrs: object | ((state: S, props: P) => object) | null): void;
    isMounted: () => boolean;
    componentWillUnmount(): void;
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction(fun: (state?: Record) => void): void;
    getStore(): Store;
    asyncUpdate(): void;
}
export interface Component<P extends object, S extends Record = Record> extends Messenger {
}
