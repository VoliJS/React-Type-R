export function createChangeTokensConstructor(props, watchers) {
    var propNames = Object.keys(props);
    var PropsChangeTokens = new Function('p', 's', "\n        var v;\n        this._s = s && s._changeToken;\n        this._isDirty = false;\n        " + propNames.map(function (name) { return "\n            this." + name + " = ( ( v = p." + name + ") && v._changeToken ) || v;\n        "; }).join('') + "\n    ");
    PropsChangeTokens.prototype._update = new Function('p', 'ws', "\n        var v, tk, upd = false;\n        \n        " + propNames.map(function (name) { return "\n            v = p." + name + ", tk = ( v && v._changeToken ) || v;\n            if( this." + name + " !== tk ){\n                " + (watchers[name] ? "ws." + name + ".call( t, v, '" + name + "' );" : '') + "\n                this." + name + " = tk;\n                upd = true;\n            };\n        "; }).join('') + "\n        \n        return upd;\n    ");
    return PropsChangeTokens;
}
;
export var EmptyPropsChangeTokensCtor = createChangeTokensConstructor({}, {});
// Both pure render and watcher enables props updates tracking.
export var PropsChangesMixin = {
    shouldComponentUpdate: function (nextProps) {
        var _a = this, _silent = _a._silent, state = _a.state, _propsChangeTokens = _a._propsChangeTokens;
        this._silent = 1; // watchers
        var upd = _propsChangeTokens._update(nextProps, this._watchers); // both 
        if (state && _propsChangeTokens._s !== state._changeToken) { // pure render
            _propsChangeTokens._s = state._changeToken;
            upd = true; // pure render
        }
        _propsChangeTokens._isDirty || (_propsChangeTokens._isDirty = upd); // pure render
        if (_silent)
            return false;
        this._silent = 0;
        return !this.pureRender || _propsChangeTokens._isDirty;
    },
    // We need to know if the component was actually rendered.
    componentDidUpdate: function () {
        this._propsChangeTokens._isDirty = false;
    },
    componentDidMount: function () {
        this._propsChangeTokens = new this.PropsChangeTokens(this.props, this.state);
    }
};
export var WatchersMixin = {
    componentWillMount: function () {
        var _a = this, _watchers = _a._watchers, props = _a.props;
        for (var name_1 in _watchers) {
            _watchers[name_1].call(this, props[name_1], name_1);
        }
    }
};
//# sourceMappingURL=propUpdatesTracking.js.map