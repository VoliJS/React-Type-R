import { Component } from './component';
import { Store } from 'type-r';
import { ComponentDefinition } from './define';
/**
 * Connect Store class to the component and expose it to the component subtree.
 * @param StoreClass
 * @param ComponentClass
 */
export declare function localStoreComponent<S extends typeof Store>(StoreClass: S, ComponentClass: (props: {
    store?: InstanceType<S>;
} & {
    [name: string]: any;
}) => any): typeof Component;
export declare function localStoreComponent<S extends typeof Store>(StoreClass: S, ComponentClass: Function): typeof Component;
/**
 * Connect external store.
 * @param store
 * @param ComponentClass
 */
export declare function externalStoreComponent<S extends Store, P>(store: S, ComponentClass: Function): typeof Component;
export declare class PureComponent<C extends ComponentDefinition> extends Component<C> {
    static pureRender: boolean;
}
