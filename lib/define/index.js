"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_r_1 = require("type-r");
var state_1 = require("./state");
var props_1 = require("./props");
function onDefine(definition, BaseClass) {
    // Initialize mixins placeholder...
    state_1.default.call(this, definition, BaseClass);
    props_1.default.call(this, definition, BaseClass);
    type_r_1.Messenger.onDefine.call(this, definition, BaseClass);
}
exports.default = onDefine;
;
var typeSpecs_1 = require("./typeSpecs");
exports.Node = typeSpecs_1.Node;
exports.Element = typeSpecs_1.Element;
var pureRender_1 = require("./pureRender");
exports.EmptyPropsChangeTokensCtor = pureRender_1.EmptyPropsChangeTokensCtor;
//# sourceMappingURL=index.js.map