/*****************
 * State
 */
import { define, Record, Store } from 'type-r'
import { ComponentClass, StoreContext } from './common'

export interface StateDefinition {
    state? : object | typeof Record
    State? : typeof Record
}

export interface StateProto {
    State? : typeof Record
}

export default function process( this : ComponentClass<StateProto>, definition : StateDefinition, BaseComponentClass : ComponentClass<StateProto> ){
    const { prototype } = this;

    let { state, State } = definition;

    if( typeof state === 'function' ){
        State = state as typeof Record;
        state = void 0;
    }

    if( state ){
        const BaseClass = State || prototype.State || Record;

        @define class ComponentState extends BaseClass {
            static attributes = state;
        }

        prototype.State = ComponentState;
    }
    else if( State ){
        prototype.State = State;
    }

    if( state || State ){
        this.mixins.merge([ StateMixin ]);
    }
}

export class StateMixin {
    State : typeof Record
    state : Record
    props : { __keepState : Record }

    _initializeState(){
        // props.__keepState is used to workaround issues in Backbone intergation layer
        const state = this.state = this.props.__keepState || new this.State();
        
        // Take ownership on state...
        state._owner = this as any;
        state._ownerKey = 'state';
    }

    _onChildrenChange(){}

    static contextType = StoreContext;

    context : Store

    _preventDispose : boolean

    asyncUpdate : () => void

    componentDidMount(){
        this._onChildrenChange = this.asyncUpdate;
    }

    componentWillUnmount(){
        const { state } = this;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    }
};