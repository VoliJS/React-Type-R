import * as tslib_1 from "tslib";
/**
 * React-Type-R component base class. Overrides React component.
 */
import * as React from 'react';
import { Messenger, define, definitions, mixinRules, mixins } from 'type-r';
import onDefine, { EmptyPropsChangeTokensCtor } from './define';
var Component = /** @class */ (function (_super) {
    tslib_1.__extends(Component, _super);
    function Component(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._silent = 0;
        _this._initializeState();
        return _this;
    }
    Component.prototype.linkAt = function (key) {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAt(key);
    };
    Component.prototype.linkAll = function () {
        // Quick and dirty hack to suppres type error - refactor later.
        var state = this.state;
        return state.linkAll.apply(state, arguments);
    };
    Component.prototype.linkPath = function (path) {
        return this.state.linkPath(path);
    };
    Object.defineProperty(Component.prototype, "links", {
        get: function () {
            return this.state._links;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._initializeState = function () {
        this.state = null;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    Component.prototype.setState = function (attrs) {
        this.state.set(typeof attrs === 'function' ? attrs.call(this, this.state, this.props) : attrs);
    };
    Component.prototype.componentWillUnmount = function () {
        this.dispose();
        this._silent = 2;
    };
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    Component.prototype.transaction = function (fun) {
        // Initialize transaction...
        var isRoot = !this._silent;
        if (isRoot)
            this._silent = 1;
        fun(this.state);
        // Commit transaction...
        if (isRoot) {
            this._silent = 0;
            this.asyncUpdate();
        }
    };
    Component.prototype.shouldComponentUpdate = function () {
        return !this._silent;
    };
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    Component.prototype.asyncUpdate = function () {
        this._silent || this.forceUpdate();
    };
    // Re
    Component.prototype.isMounted = function () {
        return this._silent !== 2;
    };
    Component.onDefine = onDefine;
    Component = tslib_1.__decorate([
        define({
            PropsChangeTokens: EmptyPropsChangeTokensCtor
        }),
        definitions({
            // Definitions to be extracted from mixins and statics and passed to `onDefine()`
            state: mixinRules.merge,
            State: mixinRules.value,
            store: mixinRules.merge,
            Store: mixinRules.value,
            props: mixinRules.merge,
            context: mixinRules.merge,
            childContext: mixinRules.merge,
            pureRender: mixinRules.protoValue
        }),
        mixinRules({
            // Apply old-school React mixin rules.
            componentWillMount: mixinRules.classLast,
            componentDidMount: mixinRules.classLast,
            componentWillReceiveProps: mixinRules.classLast,
            componentWillUpdate: mixinRules.classLast,
            componentDidUpdate: mixinRules.classLast,
            componentWillUnmount: mixinRules.classFirst,
            // And a bit more to fix inheritance quirks.
            shouldComponentUpdate: mixinRules.some,
            getChildContext: mixinRules.defaults
        })
        // Component can send and receive events...
        ,
        mixins(Messenger)
    ], Component);
    return Component;
}(React.Component));
export { Component };
//# sourceMappingURL=component.js.map