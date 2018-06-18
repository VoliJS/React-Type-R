import { Record } from 'type-r'

export function createChangeTokensConstructor( props : object, watchers : Watchers   = {} ) : PropsChangeTokensCtor {
    const propNames = Object.keys( props );

    const PropsChangeTokens = new Function( 'p', 's', `
        var v;
        this._s = s && s._changeToken;
        this._isDirty = false;
        ${ propNames.map( name => `
            this.${ name } = ( ( v = p.${ name }) && v._changeToken ) || v;
        `).join( '' )}
    `);
    
    PropsChangeTokens.prototype._update = new Function( 'p', 't', `
        var v, tk, upd = false;
        
        ${ propNames.map( name => `
            v = p.${ name }, tk = ( v && v._changeToken ) || v;
            if( this.${ name } !== tk ){
                ${ watchers[ name ] ? `t._watchers.${ name }.call( t, v, '${name}' );` : '' }
                this.${ name } = tk;
                upd = true;
            };
        `).join( '' )}
        
        return upd;
    `);    

    return PropsChangeTokens as PropsChangeTokensCtor;
};

export const EmptyPropsChangeTokensCtor = createChangeTokensConstructor({}, {});

export interface PropsChangeTokens {
    _update( props : object, component : PropsUpdateTracking ) : boolean
    _s : {}
    _isDirty : boolean
}

export interface PropsChangeTokensCtor {
    new ( props : object, state : Record ) : PropsChangeTokens
}

export interface PropsUpdateTracking {
    _silent : number
    state : Record
    pureRender : boolean
    _propsChangeTokens : PropsChangeTokens
    _watchers : Watchers
}

export interface Watchers {
    [ name : string ] : ( value : any, name: string ) => void
}

// Both pure render and watcher enables props updates tracking.
export const PropsChangesMixin = {
    shouldComponentUpdate( this : PropsUpdateTracking, nextProps : object ){
        const { _silent, state, _propsChangeTokens } = this;
        this._silent = 1; // watchers

        // PROBLEM: Here we must be protected from the state updates.
        // Thus, asyncUpdate must be suppressed. _silent is good mechanics for that.
        let upd = _propsChangeTokens._update( nextProps, this ); // both 

        if( state && _propsChangeTokens._s !== state._changeToken ){ // pure render
            _propsChangeTokens._s = state._changeToken;
            upd = true; // pure render
        }

        _propsChangeTokens._isDirty || ( _propsChangeTokens._isDirty = upd ); // pure render

        if( _silent ) return false;
        
        this._silent = 0;
        return !this.pureRender || _propsChangeTokens._isDirty;
    },

    // We need to know if the component was actually rendered.
    componentDidUpdate(){ // Pure render only
        this._propsChangeTokens._isDirty = false;
    },

    componentDidMount(){ // Both
        this._propsChangeTokens = new this.PropsChangeTokens( this.props, this.state );
    }
}

export const WatchersMixin = {
    componentWillMount(){
        const { _watchers, props } = this;

        for( let name in _watchers ){
            _watchers[ name ].call( this, props[ name ], name );
        }
    }
}