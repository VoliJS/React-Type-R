export function compilePureProps( props ){
    const ctorBody      = [ 'var v; this._s = s && s._changeToken' ],
        isChangedBody = [ 'var v, t = this._changeTokens, s = this.state; return ( s && s._changeToken !== t._s )' ];

    for( let name in props ){
        const propExpr = `( ( v = p.${ name }) && v._changeToken ) || v`;
        ctorBody.push( `this.${ name }= ${ propExpr }`);
        isChangedBody.push( `t.${ name } !== (${ propExpr })` );
    }

    const ChangeTokens : any = new Function( 'p', 's', ctorBody.join( ';' ) ),
          isChanged    = new Function( 't', 'p', 's', isChangedBody.join( '||' ) );

    ChangeTokens.prototype = null;

    return {
        _isChanged : isChanged,
        _ChangeTokens : ChangeTokens
    }
};

export const PureRenderMixin = {
    _changeTokens : null,

    shouldComponentUpdate( nextProps ){
        return this._isChanged( nextProps );
    },

    componentDidMount(){
        this._changeTokens = new this._ChangeTokens( this.props, this.state );
    },
    componentDidUpdate(){
        this._changeTokens = new this._ChangeTokens( this.props, this.state );
    }
}