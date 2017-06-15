export function compilePureProps(props) {
    var ctorBody = ['var v; this._s = s && s._changeToken'], isChangedBody = ['var v, t = this._changeTokens, s = this.state; return ( s && s._changeToken !== t._s )'];
    for (var name_1 in props) {
        var propExpr = "( ( v = p." + name_1 + ") && v._changeToken ) || v";
        ctorBody.push("this." + name_1 + "= " + propExpr);
        isChangedBody.push("t." + name_1 + " !== (" + propExpr + ")");
    }
    var ChangeTokens = new Function('p', 's', ctorBody.join(';')), isChanged = new Function('t', 'p', 's', isChangedBody.join('||'));
    ChangeTokens.prototype = null;
    return {
        _isChanged: isChanged,
        _ChangeTokens: ChangeTokens
    };
}
;
export var PureRenderMixin = {
    _changeTokens: null,
    shouldComponentUpdate: function (nextProps) {
        return this._isChanged(nextProps);
    },
    componentDidMount: function () {
        this._changeTokens = new this._ChangeTokens(this.props, this.state);
    },
    componentDidUpdate: function () {
        this._changeTokens = new this._ChangeTokens(this.props, this.state);
    }
};
//# sourceMappingURL=pureRender.js.map