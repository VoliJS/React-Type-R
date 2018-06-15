export function createChangeTokensConstructor( props, watchers ) {
    const propNames = Object.keys( props );

    const PropsChangeTokens = new Function( 'p', 's', `
        var v;
        this._s = s && s._changeToken;
        this._isDirty = false;
        ${ propNames.map( name => `
            this.${ name } = ( ( v = p.${ name }) && v._changeToken ) || v;
        `).join( '' )}
    `);
    
    PropsChangeTokens.prototype._update = new Function( 'p', 'ws', `
        var v, tk, upd = false;
        
        ${ propNames.map( name => `
            v = p.${ name }, tk = ( v && v._changeToken ) || v;
            if( this.${ name } !== tk ){
                ${ watchers[ name ] ? `ws.${ name }.call( t, v, '${name}' );` : '' }
                this.${ name } = tk;
                upd = true;
            };
        `).join( '' )}
        
        return upd;
    `);    

    return PropsChangeTokens;
};

export const EmptyPropsChangeTokensCtor = createChangeTokensConstructor({}, {});

// TODO: Must combine Pure Render with watchers.
// Watcher can be added at any time.
// Pure render... questionalble
// State can be added at any time. ???
export const PureRenderMixin = {
    shouldComponentUpdate( nextProps ){
        const { _silent, state, _propsChangeTokens } = this;
        this._silent = 1; // watchers
        
        let upd = _propsChangeTokens._update( nextProps, this._watchers ); // both 

        if( state && _propsChangeTokens._s !== state._changeToken ){ // pure render
            _propsChangeTokens._s = state._changeToken;
            upd = true; // pure render
        }

        _propsChangeTokens._isDirty || ( _propsChangeTokens._isDirty = upd ); // pure render

        if( _silent ) return false; // watchers
        
        this._silent = 0; // watchers
        return !this.pureRender || _propsChangeTokens._isDirty; // pure render
    },

    shouldComponentUpdatePure( nextProps ){
        const { state, _propsChangeTokens } = this;
        
        let upd = _propsChangeTokens._update( nextProps, this._watchers ); // both 

        if( state && _propsChangeTokens._s !== state._changeToken ){ // pure render
            _propsChangeTokens._s = state._changeToken;
            upd = true; // pure render
        }

        _propsChangeTokens._isDirty || ( _propsChangeTokens._isDirty = upd ); // pure render

        return _propsChangeTokens._isDirty; // pure render
    },

    shouldComponentUpdateWatchers( nextProps ){
        const { _silent, _propsChangeTokens } = this;
        this._silent = 1; // watchers
        
        _propsChangeTokens._update( nextProps, this._watchers ); // both 

        if( _silent ) return false; // watchers
        
        this._silent = 0; // watchers
        return true;
    },

    // We need to know if the component was actually rendered.
    componentDidUpdate(){ // Pure render only
        this._propsChangeTokens._isDirty = false;
    }
}

export const PropsChangeTracking = {
    componentDidMount(){ // Both
        this._propsChangeTokens = new this.PropsChangeTokens( this.props, this.state );
    }
}