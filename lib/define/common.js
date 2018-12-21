"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var type_r_1 = require("type-r");
// Context for the Type-R store
exports.StoreContext = react_1.createContext(type_r_1.Store.global);
exports.ExposeStore = exports.StoreContext.Provider;
exports.AccessStore = exports.StoreContext.Consumer;
//# sourceMappingURL=common.js.map