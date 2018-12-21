"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * React-Type-R component base class. Overrides React component.
 */
var React = require("react");
var type_r_1 = require("type-r");
var define_1 = require("./define");
var Component = /** @class */ (function (_super) {
    tslib_1.__extends(Component, _super);
    function Component(props) {
        var _this = _super.call(this, props) || this;
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
        var _a;
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
    };
    Component.prototype.setState = function (attrs) {
        this.state.set(typeof attrs === 'function' ? attrs.call(this, this.state, this.props) : attrs);
    };
    Component.prototype.componentWillUnmount = function () {
        this.dispose();
    };
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    Component.prototype.transaction = function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        this.state.transaction(fun);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    };
    // reference global store to fix model's store locator
    Component.prototype.getStore = function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context) ||
            ((state = this.state) && state._defaultStore) || type_r_1.Store.global;
    };
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    Component.prototype.asyncUpdate = function () {
        this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
    };
    Component.onDefine = define_1.default;
    Component = tslib_1.__decorate([
        type_r_1.define({
            PropsChangeTokens: define_1.EmptyPropsChangeTokensCtor
        }),
        type_r_1.definitions({
            // Definitions to be extracted from mixins and statics and passed to `onDefine()`
            state: type_r_1.mixinRules.merge,
            State: type_r_1.mixinRules.value,
            props: type_r_1.mixinRules.merge,
            pureRender: type_r_1.mixinRules.protoValue
        }),
        type_r_1.mixinRules({
            // Apply old-school React mixin rules.
            componentWillMount: type_r_1.mixinRules.classLast,
            componentDidMount: type_r_1.mixinRules.classLast,
            componentWillReceiveProps: type_r_1.mixinRules.classLast,
            componentWillUpdate: type_r_1.mixinRules.classLast,
            componentDidUpdate: type_r_1.mixinRules.classLast,
            componentWillUnmount: type_r_1.mixinRules.classFirst,
            // And a bit more to fix inheritance quirks.
            shouldComponentUpdate: type_r_1.mixinRules.some,
        })
        // Component can send and receive events...
        ,
        type_r_1.mixins(type_r_1.Messenger)
    ], Component);
    return Component;
}(React.Component));
exports.Component = Component;
function returnFalse() { return false; }
// Looks like React guys _really_ want to deprecate it. But no way.
// We will work around their attempt.
Object.defineProperty(Component.prototype, 'isMounted', {
    value: function isMounted() {
        return !this._disposed;
    }
});
//# sourceMappingURL=component.js.map