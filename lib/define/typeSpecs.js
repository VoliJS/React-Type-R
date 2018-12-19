import * as PropTypes from 'prop-types';
import { Record } from 'type-r';
export function compileSpecs(props) {
    var propTypes = {}, 
    // Create NestedTypes model definition to process props spec.
    modelProto = Record.defaults(props).prototype;
    var defaults, watchers, changeHandlers;
    var _loop_1 = function (spec) {
        var name_1 = spec.name;
        // Skip auto-generated `id` attribute.
        if (name_1 !== 'id') {
            var value = spec.value, type = spec.type, options = spec.options;
            // Translate props type to the propTypes guard.
            propTypes[name_1] = translateType(type, options.isRequired);
            if (options._onChange) {
                watchers || (watchers = {});
                watchers[name_1] = toLocalWatcher(options._onChange);
            }
            // Handle listening to event maps...
            if (options.changeHandlers && options.changeHandlers.length) {
                changeHandlers || (changeHandlers = {});
                changeHandlers[name_1] = options.changeHandlers;
            }
            // Handle listening to props changes...
            if (options.changeEvents) {
                changeHandlers || (changeHandlers = {});
                var handlers = changeHandlers[name_1] || (changeHandlers[name_1] = []), changeEvents_1 = typeof options.changeEvents === 'string' ? options.changeEvents : null;
                handlers.push(function (next, prev, component) {
                    prev && component.stopListening(prev);
                    next && component.listenTo(next, changeEvents_1 || next._changeEventName, component.asyncUpdate);
                });
            }
            // If default value is explicitly provided...
            if (value !== void 0) {
                //...append it to getDefaultProps function.
                defaults || (defaults = {});
                defaults[name_1] = spec.convert(value, void 0, null, {});
            }
        }
    };
    for (var _i = 0, _a = modelProto._attributesArray; _i < _a.length; _i++) {
        var spec = _a[_i];
        _loop_1(spec);
    }
    return { propTypes: propTypes, defaults: defaults, watchers: watchers, changeHandlers: changeHandlers };
}
function toLocalWatcher(ref) {
    return typeof ref === 'function' ? ref : function (value, name) {
        this[ref] && this[ref](value, name);
    };
}
var Node = /** @class */ (function () {
    function Node() {
    }
    return Node;
}());
export { Node };
var Element = /** @class */ (function () {
    function Element() {
    }
    return Element;
}());
export { Element };
function translateType(Type, isRequired) {
    var T = _translateType(Type);
    return isRequired ? T.isRequired : T;
}
function _translateType(Type) {
    switch (Type) {
        case Number:
            return PropTypes.number;
        case String:
            return PropTypes.string;
        case Boolean:
            return PropTypes.bool;
        case Array:
            return PropTypes.array;
        case Function:
            return PropTypes.func;
        case Object:
            return PropTypes.object;
        case Node:
            return PropTypes.node;
        case Element:
            return PropTypes.element;
        case void 0:
        case null:
            return PropTypes.any;
        default:
            return PropTypes.instanceOf(Type);
    }
}
//# sourceMappingURL=typeSpecs.js.map