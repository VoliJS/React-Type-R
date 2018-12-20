import * as tslib_1 from "tslib";
/*****************
 * State
 */
import { define, Record, Store } from 'type-r';
import { StoreContext } from './common';
export default function process(definition, BaseComponentClass) {
    var prototype = this.prototype;
    var state = definition.state, State = definition.State;
    if (typeof state === 'function') {
        State = state;
        state = void 0;
    }
    if (state) {
        var BaseClass = State || prototype.State || Record;
        var ComponentState = /** @class */ (function (_super) {
            tslib_1.__extends(ComponentState, _super);
            function ComponentState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComponentState.attributes = state;
            ComponentState = tslib_1.__decorate([
                define
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
    // reference global store to fix model's store locator
    StateMixin.prototype.getStore = function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context) ||
            ((state = this.state) && state._defaultStore) || Store.global;
    };
    StateMixin.prototype.componentDidMount = function () {
        this._onChildrenChange = this.asyncUpdate;
    };
    StateMixin.prototype.componentWillUnmount = function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    };
    StateMixin.contextType = StoreContext;
    return StateMixin;
}());
export { StateMixin };
;
//# sourceMappingURL=state.js.map