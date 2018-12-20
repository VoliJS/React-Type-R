import { ComponentClass } from './common'
import { Messenger } from 'type-r'

import onDefineState, { StateDefinition, StateProto } from './state'
import onDefineProps, { PropsDefinition, PropsProto } from './props'

export interface ComponentDefinition extends StateDefinition, PropsDefinition {}
export interface ComponentProto extends StateProto, PropsProto {}

export default function onDefine( this : ComponentClass<ComponentProto>, definition : ComponentDefinition, BaseClass : ComponentClass<ComponentProto> ){
    // Initialize mixins placeholder...
    onDefineState.call( this, definition, BaseClass );
    onDefineProps.call( this, definition, BaseClass );

    Messenger.onDefine.call( this, definition, BaseClass );
};

export { Node, Element, TypeSpecs } from './typeSpecs'
export { EmptyPropsChangeTokensCtor } from './pureRender'