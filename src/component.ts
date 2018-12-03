/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { CallbacksByEvents, Messenger, Record, Store, define, definitions, mixinRules, mixins } from 'type-r';
import onDefine, { EmptyPropsChangeTokensCtor, TypeSpecs } from './define';
import Link from './link';

@define({
    PropsChangeTokens : EmptyPropsChangeTokensCtor
})
@definitions({
    // Definitions to be extracted from mixins and statics and passed to `onDefine()`
    state                     : mixinRules.merge,
    State                     : mixinRules.value,
    store                     : mixinRules.merge,
    Store                     : mixinRules.value,
    props                     : mixinRules.merge,
    context                   : mixinRules.merge,
    childContext              : mixinRules.merge,
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
    getChildContext           : mixinRules.defaults
} )
// Component can send and receive events...
@mixins( Messenger )
export class Component<P, S extends Record = Record > extends React.Component<P, S> {
    cid : string

    static state? : TypeSpecs | typeof Record
    static store? : TypeSpecs | typeof Store
    static props? : TypeSpecs
    static context? : TypeSpecs
    static childContext? : TypeSpecs
    static pureRender? : boolean

    private static propTypes: any;
    private static defaultProps: any;
    private static contextTypes : any;
    private static childContextTypes : any;

    private PropsChangeTokens : Function
    
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
    readonly store? : Store

    constructor( props?, context? ){
        super( props, context );
        this._initializeState();
    }

    _initializeState(){
        ( this as any ).state = null;
    }

    assignToState( x, key : string ){
        this.state.assignFrom({ [ key ] : x });
    }

    setState( attrs : object | ( ( state : S, props : P ) => object ) ){
        this.state.set( typeof attrs === 'function' ? attrs.call( this, this.state, this.props ) : attrs );
    }

    // Messenger methods...
    on : ( events : string | CallbacksByEvents, callback, context? ) => this
    once : ( events : string | CallbacksByEvents, callback, context? ) => this
    off : ( events? : string | CallbacksByEvents, callback?, context? ) => this
    trigger      : (name : string, a?, b?, c?, d?, e? ) => this

    stopListening : ( source? : Messenger, a? : string | CallbacksByEvents, b? : Function ) => this
    listenTo : ( source : Messenger, a : string | CallbacksByEvents, b? : Function ) => this
    listenToOnce : ( source : Messenger, a : string | CallbacksByEvents, b? : Function ) => this

    dispose : () => void

    _disposed : boolean

    componentWillUnmount(){
        this.dispose();
        this._disposed = true;
    }

    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction( fun : ( state? : Record ) => void ){
        // Initialize transaction...
        const { shouldComponentUpdate } = this,
            isRoot = shouldComponentUpdate !== shouldNotUpdate;

        if( isRoot ) this.shouldComponentUpdate = shouldNotUpdate;

        fun( this.state );

        // Commit transaction...
        if( isRoot ){
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    }

    

    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    asyncUpdate(){
        this.shouldComponentUpdate === shouldNotUpdate || this._disposed || this.forceUpdate();
    }

    // Legacy method, don't use.
    isMounted : () => boolean
}

Object.defineProperty( Component.prototype, 'isMounted',{
    value(){
        return !this._disposed;
    }
});

function shouldNotUpdate(){
    // PROBLEM: Watchers won't be called. But they should.
    return false;
}

type Silence = 0 | 1 /* in transaction */ | 2 /* is disposed */;


const AfterRenderMixin = {
    componentDidMount : callAfterRenderHooks,
    componentDidUpdate : callAfterRenderHooks,

    afterRender( hook ){
        const { _callAfterRender } = this;
        this._callafterRender = _callAfterRender ? () => {
            _callAfterRender();
            hook();
        } : hook;
    }
}

function callAfterRenderHooks(){
    if( this._callAfterRender ){
        this._callAfterRender();
        this._callAfterRender = null;
    } 
}