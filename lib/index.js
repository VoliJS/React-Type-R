"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var type_r_1 = require("type-r");
exports.define = type_r_1.define;
exports.mixins = type_r_1.mixins;
var component_1 = require("./component");
exports.Component = component_1.Component;
var define_1 = require("./define");
exports.Element = define_1.Element;
exports.Node = define_1.Node;
var link_1 = require("./link");
exports.Link = link_1.default;
tslib_1.__exportStar(require("./builtins"), exports);
// extend React namespace
var ReactMVx = Object.create(React);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.define = type_r_1.define;
ReactMVx.mixins = type_r_1.mixins;
ReactMVx.Node = type_r_1.type(define_1.Node).value(null);
ReactMVx.Element = type_r_1.type(define_1.Element).value(null);
ReactMVx.Link = link_1.default;
ReactMVx.Component = component_1.Component;
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        var _a;
        var source = prop && prop instanceof link_1.default ? prop.value : prop;
        this.state.assignFrom((_a = {}, _a[key] = source, _a));
        if (source && source._changeToken) {
            this.state[key]._changeToken = source._changeToken;
        }
    };
};
exports.assignToState = assignToState;
exports.default = ReactMVx;
//# sourceMappingURL=index.js.map