export function createChangeTokensConstructor(props, watchers) {
    if (watchers === void 0) { watchers = {}; }
    var propNames = Object.keys(props);
    var PropsChangeTokens = new Function('p', 's', "\n        var v;\n        this._s = s && s._changeToken;\n        this._isDirty = false;\n        " + propNames.map(function (name) { return "\n            this." + name + " = ( ( v = p." + name + ") && v._changeToken ) || v;\n        "; }).join('') + "\n    ");
    PropsChangeTokens.prototype._update = new Function('p', 't', "\n        var v, tk, upd = false;\n        \n        " + propNames.map(function (name) { return "\n            v = p." + name + ", tk = ( v && v._changeToken ) || v;\n            if( this." + name + " !== tk ){\n                " + (watchers[name] ? "t._watchers." + name + ".call( t, v, '" + name + "' );" : '') + "\n                this." + name + " = tk;\n                upd = true;\n            };\n        "; }).join('') + "\n        \n        return upd;\n    ");
    return PropsChangeTokens;
}
;
export var EmptyPropsChangeTokensCtor = createChangeTokensConstructor({}, {});
// Both pure render and watcher enables props updates tracking.
export var PropsChangesMixin = {
    /**
     * 1. For values replacement - we already know old and new stuff. So, plain comparison will do.
     * 2. We need to store tokens for Transactional props. That's it.
     */
    shouldComponentUpdate: function (nextProps) {
        var _this = this;
        var props = this.props;
        /// Single prop x (pure render)
        if (nextProps.x !== props.x) {
            // Pure render
            changed = true;
            // Watcher
            this._watchers.x.call(this, nextProps.x, 'x');
            props.x && this.stopListening(props.x);
            // events
            nextProps.x && this.afterRender(function () {
                _this.listenTo(props.x, _this._events.x);
            });
        }
        /// Transactional props x (pure render)
        next = nextProps.x;
        if (next !== props.x || (next && next._changeToken !== _tokens.x)) {
            _tokens.x = next && next._changeToken;
            // Pure render
            changed = true;
            // Watcher
            this._watchers.x.call(this, nextProps.x, 'x');
        }
        if ((ev = next !== props.x) || (next && next._changeToken !== _tokens.x)) {
            _tokens.x = next && next._changeToken;
            // Pure render
            changed = true;
            // Watcher
            this._watchers.x.call(this, nextProps.x, 'x');
        }
        /// Date prop
        // Just watchers, plain props
        for (var _i = 0, _a = this._watchedKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            var next = nextProps[key];
            if (props[key] !== next) {
                this._watchers[key].call(this, next, key);
            }
        }
        // Just watchers, Transactional props
        for (var _b = 0, _c = this._watchedKeys; _b < _c.length; _b++) {
            var key = _c[_b];
            var next = nextProps[key];
            if (props[key] !== next || (next && next._changeToken !== this._tokens[key])) {
                this._watchers[key].call(this, nextProps[key], key);
                this._tokens[key] = next && next._changeToken;
            }
        }
    },
    shouldComponentUpdate: function (nextProps) {
        var _a = this, _silent = _a._silent, state = _a.state, _propsChangeTokens = _a._propsChangeTokens;
        this._silent = 1; // watchers
        // PROBLEM: Here we must be protected from the state updates.
        // Thus, asyncUpdate must be suppressed. _silent is good mechanics for that.
        var upd = _propsChangeTokens._update(nextProps, this); // both 
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