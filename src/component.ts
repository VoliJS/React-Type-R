/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { define, definitions, Messenger, mixinRules, mixins, Record, Store } from 'type-r';
import onDefine, { EmptyPropsChangeTokensCtor, TypeSpecs } from './define';
import Link from './link';

@define({
    PropsChangeTokens : EmptyPropsChangeTokensCtor
})
@definitions({
    // Definitions to be extracted from mixins and statics and passed to `onDefine()`
    state                     : mixinRules.merge,
    State                     : mixinRules.value,
    props                     : mixinRules.merge,
    pureRender                : mixinRules.protoValue
})
@mixinRules( {
    // Apply old-school React mixin rules.
    componentWillMount        : mixinRules.classLast,
    componentDidMount         : mixinRules.classLast,
    componentWillReceiveProps : mixinRules.classLast,
    componentWillUpdate       : mixinRules.classLast,
    componentDidUpdate        : mixinRules.classLast,
    componentWillUnmount      : mixinRules.classFirst,

    // And a bit more to fix inheritance quirks.
    shouldComponentUpdate     : mixinRules.some,
} )
// Component can send and receive events...
@mixins( Messenger )
export class Component<P extends object, S extends Record = Record> extends React.Component<P, S> {
    cid : string

    static state? : TypeSpecs | typeof Record
    static props? : TypeSpecs
    static pureRender? : boolean
    
    static extend : ( spec : object, statics? : object ) => Component< any >

    linkAt( key : string ) : Link<any> {
        // Quick and dirty hack to suppres type error - refactor later.
        return ( this.state as any ).linkAt( key );
    }

    linkAll( ...keys : string[] ) : { [ key : string ] : Link<any> }
    linkAll(){
        // Quick and dirty hack to suppres type error - refactor later.
        const { state } = this as any;
        return state.linkAll.apply( state, arguments );
    }

    linkPath( path : string ) : Link<any> {
        return ( this.state as any ).linkPath( path );
    }

    get links(){
        return ( this.state as any )._links;
    }

    static onDefine = onDefine;

    readonly state : S

    constructor( props : Readonly<P> ){
        super( props );
        this._initializeState();
    }

    _initializeState(){
        ( this as any ).state = null;
    }

    assignToState( x : any, key : string ) : void {
        this.state.assignFrom({ [ key ] : x });
    }

    setState( attrs : object | ( ( state : S, props : P ) => object ) | null ){
        this.state.set( typeof attrs === 'function' ? attrs.call( this, this.state, this.props ) : attrs );
    }

    isMounted : () => boolean

    componentWillUnmount(){
        this.dispose();
    }

    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction( fun : ( state? : Record ) => void ){
        var shouldComponentUpdate = this.shouldComponentUpdate,
            isRoot = shouldComponentUpdate !== returnFalse;

        if( isRoot ){
            this.shouldComponentUpdate = returnFalse;
        }
        
        this.state.transaction( fun );

        if( isRoot ){
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    }

    // reference global store to fix model's store locator
    getStore(){
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        let context : Store, state : Record;

        return  ( ( context = this.context ) && context ) ||
                ( ( state = this.state ) && state._defaultStore ) || Store.global;
    }

    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    asyncUpdate(){
        this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
    }
}

// Mix in Messenger members...
export interface Component<P extends object, S extends Record = Record> extends Messenger {}

function returnFalse(){ return false; }

// Looks like React guys _really_ want to deprecate it. But no way.
// We will work around their attempt.
Object.defineProperty( Component.prototype, 'isMounted', {
    value : function isMounted(){
        return !this._disposed;
    }
});