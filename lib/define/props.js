/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
import { compileSpecs } from './typeSpecs';
import { WatchersMixin, PropsChangesMixin, createChangeTokensConstructor } from './propUpdatesTracking';
import { tools } from 'type-r';
export default function onDefine(_a, BaseClass) {
    var props = _a.props, pureRender = _a.pureRender;
    var prototype = this.prototype;
    // process props spec...
    if (props) {
        // Merge with inherited members.
        prototype._props = tools.defaults(props, BaseClass.prototype._props || {});
        // Compile props spec.
        var _b = compileSpecs(props), propTypes = _b.propTypes, defaults = _b.defaults, watchers = _b.watchers, changeHandlers = _b.changeHandlers;
        this.propTypes = propTypes;
        if (defaults)
            this.defaultProps = defaults;
        // Watchers require props updates tracking.
        if (watchers) {
            prototype._watchers = watchers;
            this.mixins.merge([WatchersMixin]);
        }
        if (changeHandlers) {
            prototype._changeHandlers = changeHandlers;
            this.mixins.merge([ChangeHandlersMixin]);
        }
        // If pure render is defined in parent and props have changed,
        // or if we have watchers defined, we need a new constructor.
        if (prototype.pureRender || watchers) {
            this.mixins.merge([PropsChangesMixin]);
            prototype.PropsChangeTokens = createChangeTokensConstructor(props, watchers);
        }
    }
    else if (pureRender) {
        // If pure render is defined, need a new construtor even if props has not been defined.
        this.mixins.merge([PropsChangesMixin]);
        prototype.PropsChangeTokens = createChangeTokensConstructor(prototype._props, prototype._watchers);
    }
}
/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
var ChangeHandlersMixin = {
    componentDidMount: function () {
        handlePropsChanges(this, {}, this.props);
    },
    componentDidUpdate: function (prev) {
        handlePropsChanges(this, prev, this.props);
    },
    componentWillUnmount: function () {
        handlePropsChanges(this, this.props, {});
    }
};
function handlePropsChanges(component, prev, next) {
    var _changeHandlers = component._changeHandlers;
    for (var name_1 in _changeHandlers) {
        if (prev[name_1] !== next[name_1]) {
            for (var _i = 0, _a = _changeHandlers[name_1]; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(next[name_1], prev[name_1], component);
            }
        }
    }
}
//# sourceMappingURL=props.js.map