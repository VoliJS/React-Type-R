/// <reference types="react" />
/*****************
 * State
 */
import { Record, Store } from 'type-r';
import { ComponentClass } from './common';
export interface StateDefinition {
    state?: object | typeof Record;
    State?: typeof Record;
}
export interface StateProto {
    State?: typeof Record;
}
export default function process(this: ComponentClass<StateProto>, definition: StateDefinition, BaseComponentClass: ComponentClass<StateProto>): void;
export declare class StateMixin {
    State: typeof Record;
    state: Record;
    props: {
        __keepState: Record;
    };
    _initializeState(): void;
    _onChildrenChange(): void;
    static contextType: import("react").Context<Store>;
    context: Store;
    getStore(): import("type-r").Transactional | Store;
    _preventDispose: boolean;
    asyncUpdate: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
