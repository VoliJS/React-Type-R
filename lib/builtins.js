"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var type_r_1 = require("type-r");
var component_1 = require("./component");
var common_1 = require("./define/common");
function localStoreComponent(StoreClass, ComponentClass) {
    var LocalStoreComponent = /** @class */ (function (_super) {
        tslib_1.__extends(LocalStoreComponent, _super);
        function LocalStoreComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LocalStoreComponent.prototype.get = function (key) {
            // Ask an upper store.
            var store = this.getStore();
            return store && store.get(key);
        };
        LocalStoreComponent.prototype.render = function () {
            var _a = this.props, children = _a.children, props = tslib_1.__rest(_a, ["children"]);
            return (React.createElement(common_1.ExposeStore, { value: this.state },
                React.createElement(ComponentClass, tslib_1.__assign({}, props, { store: this.state }), children)));
        };
        LocalStoreComponent.State = StoreClass;
        LocalStoreComponent = tslib_1.__decorate([
            type_r_1.define
        ], LocalStoreComponent);
        return LocalStoreComponent;
    }(component_1.Component));
    return LocalStoreComponent;
}
exports.localStoreComponent = localStoreComponent;
/**
 * Connect external store.
 * @param store
 * @param ComponentClass
 */
function externalStoreComponent(store, ComponentClass) {
    var ExternalStoreComponent = /** @class */ (function (_super) {
        tslib_1.__extends(ExternalStoreComponent, _super);
        function ExternalStoreComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.store = store;
            return _this;
        }
        ExternalStoreComponent.prototype.render = function () {
            var _a = this.props, children = _a.children, props = tslib_1.__rest(_a, ["children"]);
            return (React.createElement(common_1.ExposeStore, { value: this.store },
                React.createElement(ComponentClass, tslib_1.__assign({}, props, { store: this.store }), children)));
        };
        ExternalStoreComponent.prototype.componentDidMount = function () {
            this.listenTo(this.store, 'change', this.asyncUpdate);
        };
        ExternalStoreComponent = tslib_1.__decorate([
            type_r_1.define
        ], ExternalStoreComponent);
        return ExternalStoreComponent;
    }(component_1.Component));
    return ExternalStoreComponent;
}
exports.externalStoreComponent = externalStoreComponent;
var PureComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PureComponent, _super);
    function PureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PureComponent.pureRender = true;
    PureComponent = tslib_1.__decorate([
        type_r_1.define
    ], PureComponent);
    return PureComponent;
}(component_1.Component));
exports.PureComponent = PureComponent;
//# sourceMappingURL=builtins.js.map