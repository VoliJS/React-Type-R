import { ChangeHandler } from 'type-r';
import { ComponentProto } from './common';
export interface TypeSpecs {
    [name: string]: object | Function;
}
export declare function compileSpecs(props: TypeSpecs): {
    propTypes: {};
    defaults: any;
    watchers: {
        [name: string]: PropWatcher;
    };
    changeHandlers: {
        [name: string]: ChangeHandler[];
    };
};
<<<<<<< HEAD
type PropWatcher = (this: ComponentProto, propValue: any, propName: string) => void;
=======
declare type PropWatcher = (this: ComponentProto, propValue: any, propName: string) => void;
>>>>>>> develop
export declare class Node {
}
export declare class Element {
}
<<<<<<< HEAD
declare global {
    interface NumberConstructor {
        integer: Function;
    }
}
=======
>>>>>>> develop
export {};
