import { ChangeHandler } from 'type-r';
import { ComponentProto } from './common';
export interface TypeSpecs {
    [name: string]: object | Function;
}
export declare function compileSpecs(props: TypeSpecs): {
    propTypes: {};
    defaults: {} | undefined;
    watchers: {
        [name: string]: PropWatcher;
    } | undefined;
    changeHandlers: {
        [name: string]: ChangeHandler[];
    } | undefined;
};
declare type PropWatcher = (this: ComponentProto, propValue: any, propName: string) => void;
export declare class Node {
}
export declare class Element {
}
export {};
