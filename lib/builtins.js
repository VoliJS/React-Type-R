import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from './component';
import { define } from 'type-r';
import { ExposeStore } from './define/common';
export function localStoreComponent(StoreClass, ComponentClass) {
    var LocalStoreComponent = /** @class */ (function (_super) {
        tslib_1.__extends(LocalStoreComponent, _super);
        function LocalStoreComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LocalStoreComponent_1 = LocalStoreComponent;
        LocalStoreComponent.prototype.get = function (key) {
            // Ask an upper store.
            var store = this.getStore();
            return store && store.get(key);
        };
        LocalStoreComponent.prototype.render = function () {
            var _a = this.props, children = _a.children, props = tslib_1.__rest(_a, ["children"]);
            return (React.createElement(ExposeStore, { value: this.state },
                React.createElement(ComponentClass, tslib_1.__assign({}, props, { store: this.state }), children)));
        };
        var LocalStoreComponent_1;
        LocalStoreComponent.state = StoreClass;
        LocalStoreComponent = LocalStoreComponent_1 = tslib_1.__decorate([
            define
        ], LocalStoreComponent);
        return LocalStoreComponent;
    }(Component));
    return LocalStoreComponent;
}
/**
 * Connect external store.
 * @param store
 * @param ComponentClass
 */
export function externalStoreComponent(store, ComponentClass) {
    var ExternalStoreComponent = /** @class */ (function (_super) {
        tslib_1.__extends(ExternalStoreComponent, _super);
        function ExternalStoreComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.store = store;
            return _this;
        }
        ExternalStoreComponent_1 = ExternalStoreComponent;
        ExternalStoreComponent.prototype.render = function () {
            var _a = this.props, children = _a.children, props = tslib_1.__rest(_a, ["children"]);
            return (React.createElement(ExposeStore, { value: this.store },
                React.createElement(ComponentClass, tslib_1.__assign({}, props, { store: this.store }), children)));
        };
        ExternalStoreComponent.prototype.componentDidMount = function () {
            this.listenTo(this.store, 'change', this.asyncUpdate);
        };
        var ExternalStoreComponent_1;
        ExternalStoreComponent = ExternalStoreComponent_1 = tslib_1.__decorate([
            define
        ], ExternalStoreComponent);
        return ExternalStoreComponent;
    }(Component));
    return ExternalStoreComponent;
}
var PureComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PureComponent, _super);
    function PureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PureComponent.pureRender = true;
    PureComponent = tslib_1.__decorate([
        define
    ], PureComponent);
    return PureComponent;
}(Component));
export { PureComponent };
//# sourceMappingURL=builtins.js.map