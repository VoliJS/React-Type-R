export function createChangeTokensConstructor( props, watchers ) {
    const propNames = Object.keys( props );

    const PropsChangeTokens = new Function( 'p', 's', `
        var v;
        this._s = s && s._changeToken;
        ${ propNames.map( name => `
            this.${ name } = ( ( v = p.${ name }) && v._changeToken ) || v;
        `).join( '' )}
    `);
    
    PropsChangeTokens.prototype._update = new Function( 'p', 't', `
        var v, tk, upd = false, ws = t._watchers;
        
        ${ propNames.map( name => `
            v = p.${ name }, tk = ( v && v._changeToken ) || v;
            if( this.${ name } !== tk ){
                ${ watchers[ name ] ? `ws.${ name }.call( t, v, '${name}' );` : '' }
                this.${ name } = tk;
                upd = true;
            };
        `).join( '' )}

        v = t.state, tk = tk = ( v && v._changeToken ) || v;

        if( this._s !== tk ){
            this._s = tk;
            upd = true;
        }

        return upd;
    `);    

    return PropsChangeTokens;
};

export const EmptyPropsChangeTokensCtor = createChangeTokensConstructor({}, {});

export const PureRenderMixin = {
    shouldComponentUpdate( nextProps ){
        const { _silent } = this;
        this._silent = 1;
        
        const res = this._propsChangeTokens._update( nextProps, this );
        
        _silent || ( this._silent = 0 );

        return !_silent && res;
    },

    componentWillMount : updateChangeTokens,
    componentDidUpdate : updateChangeTokens
}

function updateChangeTokens(){
    this._propsChangeTokens = new this.PropsChangeTokens( this.props, this.state );
}