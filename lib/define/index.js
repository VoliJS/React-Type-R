import { Messenger } from 'type-r';
import onDefineState from './state';
import onDefineProps from './props';
export default function onDefine(definition, BaseClass) {
    // Initialize mixins placeholder...
    onDefineState.call(this, definition, BaseClass);
    onDefineProps.call(this, definition, BaseClass);
    Messenger.onDefine.call(this, definition, BaseClass);
}
;
export { Node, Element } from './typeSpecs';
export { EmptyPropsChangeTokensCtor } from './pureRender';
//# sourceMappingURL=index.js.map