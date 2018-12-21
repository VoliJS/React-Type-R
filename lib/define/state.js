"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*****************
 * State
 */
var type_r_1 = require("type-r");
var common_1 = require("./common");
function process(definition, BaseComponentClass) {
    var prototype = this.prototype;
    var state = definition.state, State = definition.State;
    if (typeof state === 'function') {
        State = state;
        state = void 0;
    }
    if (state) {
        var BaseClass = State || prototype.State || type_r_1.Record;
        var ComponentState = /** @class */ (function (_super) {
            tslib_1.__extends(ComponentState, _super);
            function ComponentState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComponentState.attributes = state;
            ComponentState = tslib_1.__decorate([
                type_r_1.define
            ], ComponentState);
            return ComponentState;
        }(BaseClass));
        prototype.State = ComponentState;
    }
    else if (State) {
        prototype.State = State;
    }
    if (state || State) {
        this.mixins.merge([StateMixin]);
    }
}
exports.default = process;
var StateMixin = /** @class */ (function () {
    function StateMixin() {
    }
    StateMixin.prototype._initializeState = function () {
        // props.__keepState is used to workaround issues in Backbone intergation layer
        var state = this.state = this.props.__keepState || new this.State();
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    };
    StateMixin.prototype._onChildrenChange = function () { };
    StateMixin.prototype.componentDidMount = function () {
        this._onChildrenChange = this.asyncUpdate;
    };
    StateMixin.prototype.componentWillUnmount = function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    };
    StateMixin.contextType = common_1.StoreContext;
    return StateMixin;
}());
exports.StateMixin = StateMixin;
;
//# sourceMappingURL=state.js.map