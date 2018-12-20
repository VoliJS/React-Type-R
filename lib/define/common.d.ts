import { ComponentClass as ReactComponentClass, Component } from 'react';
import { MixableConstructor, Store, Messenger } from 'type-r';
export interface ComponentClass<Proto> extends ReactComponentClass, MixableConstructor {
    prototype: Proto & ComponentProto;
}
export declare type ComponentProto = Component & Messenger;
export declare const StoreContext: import("react").Context<Store>;
export declare const ExposeStore: import("react").ProviderExoticComponent<import("react").ProviderProps<Store>>;
export declare const AccessStore: import("react").ExoticComponent<import("react").ConsumerProps<Store>>;
