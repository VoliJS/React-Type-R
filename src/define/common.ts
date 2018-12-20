import {
    ComponentClass as ReactComponentClass,
    Component,
    createContext
} from 'react'

import { MixableConstructor, Store, Messenger } from 'type-r'

export interface ComponentClass<Proto> extends ReactComponentClass, MixableConstructor {
    prototype : Proto & ComponentProto
}

export type ComponentProto = Component & Messenger

// Context for the Type-R store
export const StoreContext = createContext( Store.global );
export const ExposeStore = StoreContext.Provider;
export const AccessStore = StoreContext.Consumer;