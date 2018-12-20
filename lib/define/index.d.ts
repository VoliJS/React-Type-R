import { ComponentClass } from './common';
import { StateDefinition, StateProto } from './state';
import { PropsDefinition, PropsProto } from './props';
export interface ComponentDefinition extends StateDefinition, PropsDefinition {
}
export interface ComponentProto extends StateProto, PropsProto {
}
export default function onDefine(this: ComponentClass<ComponentProto>, definition: ComponentDefinition, BaseClass: ComponentClass<ComponentProto>): void;
export { Node, Element, TypeSpecs } from './typeSpecs';
export { EmptyPropsChangeTokensCtor } from './pureRender';
