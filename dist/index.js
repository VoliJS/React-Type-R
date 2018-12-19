!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react"),require("type-r"),require("prop-types")):"function"==typeof define&&define.amd?define(["exports","react","type-r","prop-types"],e):e(t.ReactMVx={},t.React,t.Nested,t.PropTypes)}(this,function(t,e,p,d){"use strict";var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function s(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function a(t,e,n,r){var o,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;0<=a;a--)(o=t[a])&&(s=(i<3?o(s):3<i?o(e,n,s):o(e,n))||s);return 3<i&&s&&Object.defineProperty(e,n,s),s}var u={_initializeState:function(){var t=this.state=this.props.__keepState||new this.State;t._owner=this,t._ownerKey="state"},context:{_nestedStore:p.Store},getStore:function(){var t,e;return(t=this.context)&&t._nestedStore||(e=this.state)&&e._defaultStore||p.Store.global},componentWillUnmount:function(){var t=this.state;t._owner=t._ownerKey=void 0,this._preventDispose||t.dispose(),this.state=void 0}},c={_onChildrenChange:function(){},componentDidMount:function(){this._onChildrenChange=this.asyncUpdate}};var i={childContext:{_nestedStore:p.Store},getChildContext:function(){return{_nestedStore:this.store}},getStore:function(){return this.store},get:function(t){var e=u.getStore.call(this);return e&&e.get(t)}},l={componentDidMount:function(){this.listenTo(this.store,"change",this.asyncUpdate)}},h={componentWillMount:function(){var t=this.store=new this.Store;t._owner=this,t._ownerKey="store"},componentWillUnmount:function(){this.store._ownerKey=this.store._owner=void 0,this.store.dispose(),this.store=void 0}};function f(t){for(var l,h,f,v={},e=function(t){var n,e,r,o,i=t.name;if("id"!==i){var s=t.value,a=t.type,u=t.options;if(v[i]=(e=a,r=u.isRequired,o=function(t){switch(t){case Number:return d.number;case String:return d.string;case Boolean:return d.bool;case Array:return d.array;case Function:return d.func;case Object:return d.object;case y:return d.node;case m:return d.element;case void 0:case null:return d.any;default:return d.instanceOf(t)}}(e),r?o.isRequired:o),u._onChange&&(h||(h={}),h[i]="function"==typeof(n=u._onChange)?n:function(t,e){this[n]&&this[n](t,e)}),u.changeHandlers&&u.changeHandlers.length&&(f||(f={}),f[i]=u.changeHandlers),u.changeEvents){f||(f={});var c=f[i]||(f[i]=[]),p="string"==typeof u.changeEvents?u.changeEvents:null;c.push(function(t,e,n){e&&n.stopListening(e),t&&n.listenTo(t,p||t._changeEventName,n.asyncUpdate)})}void 0!==s&&(l||(l={}),l[i]=t.convert(s,void 0,null,{}))}},n=0,r=p.Record.defaults(t).prototype._attributesArray;n<r.length;n++){e(r[n])}return{propTypes:v,defaults:l,watchers:h,changeHandlers:f}}var y=function(){},m=function(){};function v(t,e){void 0===e&&(e={});var n=Object.keys(t),r=new Function("p","s","\n        var v;\n        this._s = s && s._changeToken;\n        this._isDirty = false;\n        "+n.map(function(t){return"\n            this."+t+" = ( ( v = p."+t+") && v._changeToken ) || v;\n        "}).join("")+"\n    ");return r.prototype._update=new Function("p","t","\n        var v, tk, upd = false;\n        \n        "+n.map(function(t){return"\n            v = p."+t+", tk = ( v && v._changeToken ) || v;\n            if( this."+t+" !== tk ){\n                "+(e[t]?"t._watchers."+t+".call( t, v, '"+t+"' );":"")+"\n                this."+t+" = tk;\n                upd = true;\n            };\n        "}).join("")+"\n        \n        return upd;\n    "),r}var n=v({},{}),g={shouldComponentUpdate:function(t){var e=this._silent,n=this.state,r=this._propsChangeTokens;this._silent=1;var o=r._update(t,this);return n&&r._s!==n._changeToken&&(r._s=n._changeToken,o=!0),r._isDirty||(r._isDirty=o),!e&&(this._silent=0,!this.pureRender||r._isDirty)},componentDidUpdate:function(){this._propsChangeTokens._isDirty=!1},componentDidMount:function(){this._propsChangeTokens=new this.PropsChangeTokens(this.props,this.state)}},_={componentWillMount:function(){var t=this._watchers,e=this.props;for(var n in t)t[n].call(this,e[n],n)}};var x={componentDidMount:function(){o(this,{},this.props)},componentDidUpdate:function(t){o(this,t,this.props)},componentWillUnmount:function(){o(this,this.props,{})}};function o(t,e,n){var r=t._changeHandlers;for(var o in r)if(e[o]!==n[o])for(var i=0,s=r[o];i<s.length;i++){(0,s[i])(n[o],e[o],t)}}function k(t,e){(function(t,e){var n=t.store,r=t.Store;if(n&&n instanceof p.Store)this.prototype.store=n,this.mixins.merge([l,i]);else if(n||t.Store){if("function"==typeof n&&(r=n,n=void 0),n){var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return s(e,t),e.attrbutes=n,e=a([p.define],e)}(r||this.prototype.Store||p.Store);this.prototype.Store=o}else r&&(this.prototype.Store=r);this.mixins.merge([h,c,i])}}).call(this,t,e),function(t,e){var n=this.prototype,r=t.state,o=t.State;if("function"==typeof r&&(o=r,r=void 0),r){var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return s(e,t),e.attributes=r,e=a([p.define],e)}(o||n.State||p.Record);n.State=i}else o&&(n.State=o);(r||o)&&this.mixins.merge([u,c])}.call(this,t,e),function(t,e){var n=t.context,r=t.childContext,o=this.prototype;n&&(o._context=p.tools.defaults(n,e.prototype._context||{}),this.contextTypes=f(n).propTypes),r&&(o._childContext=p.tools.defaults(r,e.prototype._childContext),this.childContextTypes=f(r).propTypes)}.call(this,t,e),function(t,e){var n=t.props,r=t.pureRender,o=this.prototype;if(n){o._props=p.tools.defaults(n,e.prototype._props||{});var i=f(n),s=i.propTypes,a=i.defaults,u=i.watchers,c=i.changeHandlers;this.propTypes=s,a&&(this.defaultProps=a),u&&(o._watchers=u,this.mixins.merge([_])),c&&(o._changeHandlers=c,this.mixins.merge([x])),(o.pureRender||u)&&(this.mixins.merge([g]),o.PropsChangeTokens=v(n,u))}else r&&(this.mixins.merge([g]),o.PropsChangeTokens=v(o._props,o._watchers))}.call(this,t,e),p.Messenger.onDefine.call(this,t,e)}var b=function(r){function t(t,e){var n=r.call(this,t,e)||this;return n._initializeState(),n}return s(t,r),t.prototype.linkAt=function(t){return this.state.linkAt(t)},t.prototype.linkAll=function(){var t=this.state;return t.linkAll.apply(t,arguments)},t.prototype.linkPath=function(t){return this.state.linkPath(t)},Object.defineProperty(t.prototype,"links",{get:function(){return this.state._links},enumerable:!0,configurable:!0}),t.prototype._initializeState=function(){this.state=null},t.prototype.assignToState=function(t,e){var n;this.state.assignFrom(((n={})[e]=t,n))},t.prototype.setState=function(t){this.state.set("function"==typeof t?t.call(this,this.state,this.props):t)},t.prototype.componentWillUnmount=function(){this.dispose(),this._disposed=!0},t.prototype.transaction=function(t){var e=this.shouldComponentUpdate,n=e!==C;n&&(this.shouldComponentUpdate=C),t(this.state),n&&(this.shouldComponentUpdate=e,this.asyncUpdate())},t.prototype.asyncUpdate=function(){this.shouldComponentUpdate===C||this._disposed||this.forceUpdate()},t.onDefine=k,t=a([p.define({PropsChangeTokens:n}),p.definitions({state:p.mixinRules.merge,State:p.mixinRules.value,store:p.mixinRules.merge,Store:p.mixinRules.value,props:p.mixinRules.merge,context:p.mixinRules.merge,childContext:p.mixinRules.merge,pureRender:p.mixinRules.protoValue}),p.mixinRules({componentWillMount:p.mixinRules.classLast,componentDidMount:p.mixinRules.classLast,componentWillReceiveProps:p.mixinRules.classLast,componentWillUpdate:p.mixinRules.classLast,componentDidUpdate:p.mixinRules.classLast,componentWillUnmount:p.mixinRules.classFirst,shouldComponentUpdate:p.mixinRules.some,getChildContext:p.mixinRules.defaults}),p.mixins(p.Messenger)],t)}(e.Component);function C(){return!1}Object.defineProperty(b.prototype,"isMounted",{value:function(){return!this._disposed}});var S=Array.prototype,w=Object.prototype;function R(t){if(t&&"object"==typeof t)switch(Object.getPrototypeOf(t)){case S:return O;case w:return j}return T}var T={clone:function(t){return t},map:function(t,e){return[]},remove:function(t){return t}},j={map:function(t,e){var n=[];for(var r in t.value){var o=e(t.at(r),r);void 0===o||n.push(o)}return n},remove:function(t,e){return delete t[e],t},clone:function(t){var e={};for(var n in t)e[n]=t[n];return e}},O={clone:function(t){return t.slice()},remove:function(t,e){return t.splice(e,1),t},map:function(t,e){for(var n=t.value.length,r=Array(n),o=0,i=0;o<n;o++){var s=e(t.at(o),o);void 0===s||(r[i++]=s)}return r.length===i||(r.length=i),r}},P=function(){function t(t){this.value=t}return t.value=function(t,e){return new U(t,e)},Object.defineProperty(t.prototype,"validationError",{get:function(){return this.error},enumerable:!0,configurable:!0}),t.prototype.onChange=function(e){var n=this;return new A(this,function(t){e(t),n.set(t)})},Object.defineProperty(t.prototype,"props",{get:function(){var e=this;return"boolean"==typeof this.value?{checked:this.value,onChange:function(t){return e.set(Boolean(t.target.checked))}}:{value:this.value,onChange:function(t){return e.set(t.target.value)}}},enumerable:!0,configurable:!0}),t.prototype.requestChange=function(t){this.set(t)},t.prototype.update=function(t,e){var n=t(this.clone(),e);void 0===n||this.set(n)},t.prototype.pipe=function(n){var r=this;return new A(this,function(t){var e=n(t,r.value);void 0===e||r.set(e)})},t.prototype.action=function(e){var n=this;return function(t){return n.update(e,t)}},t.prototype.equals=function(t){return new D(this,t)},t.prototype.enabled=function(t){return new M(this,t||"")},t.prototype.contains=function(t){return new F(this,t)},t.prototype.push=function(){var t=O.clone(this.value);Array.prototype.push.apply(t,arguments),this.set(t)},t.prototype.unshift=function(){var t=O.clone(this.value);Array.prototype.unshift.apply(t,arguments),this.set(t)},t.prototype.splice=function(){var t=O.clone(this.value);Array.prototype.splice.apply(t,arguments),this.set(t)},t.prototype.map=function(t){return R(this.value).map(this,t)},t.prototype.removeAt=function(t){var e=this.value,n=R(e);this.set(n.remove(n.clone(e),t))},t.prototype.at=function(t){return new E(this,t)},t.prototype.clone=function(){var t=this.value;return R(t).clone(t)},t.prototype.pick=function(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];t[n]=new E(this,n)}return t},t.prototype.check=function(t,e){return this.error||t(this.value)||(this.error=e||t.error||W),this},t}(),U=function(r){function t(t,e){var n=r.call(this,t)||this;return n.set=e,n}return s(t,r),t.prototype.set=function(t){},t}(P),A=function(o){function t(t,e){var n=o.call(this,t.value)||this;n.set=e;var r=t.error;return r&&(n.error=r),n}return s(t,o),t.prototype.set=function(t){},t}(P),D=function(r){function t(t,e){var n=r.call(this,t.value===e)||this;return n.parent=t,n.truthyValue=e,n}return s(t,r),t.prototype.set=function(t){this.parent.set(t?this.truthyValue:null)},t}(P),M=function(r){function t(t,e){var n=r.call(this,null!=t.value)||this;return n.parent=t,n.defaultValue=e,n}return s(t,r),t.prototype.set=function(t){this.parent.set(t?this.defaultValue:null)},t}(P),F=function(r){function t(t,e){var n=r.call(this,0<=t.value.indexOf(e))||this;return n.parent=t,n.element=e,n}return s(t,r),t.prototype.set=function(t){var e=this,n=Boolean(t);if(this.value!==n){var r=this.parent.value,o=t?r.concat(this.element):r.filter(function(t){return t!==e.element});this.parent.set(o)}},t}(P),W="Invalid value",E=function(r){function t(t,e){var n=r.call(this,t.value[e])||this;return n.parent=t,n.key=e,n}return s(t,r),t.prototype.remove=function(){this.parent.removeAt(this.key)},t.prototype.set=function(e){var n=this;this.value!==e&&this.parent.update(function(t){return t[n.key]=e,t})},t}(P);p.Mixable.mixins.populate(P),p.MixinsState.get(p.Record).merge([{linkAt:function(t){return H(q(this),this,t)},linkPath:function(t,e){return new V(this,t,e)},linkAll:function(){var t=q(this);if(arguments.length)for(var e=0;e<arguments.length;e++)H(t,this,arguments[e]);else{var n=this.attributes;for(var r in n)void 0===n[r]||H(t,this,r)}return t}}]);var L=function(o){function t(t,e,n){var r=o.call(this,n)||this;return r.record=t,r.attr=e,r}return s(t,o),t.prototype.set=function(t){this.record[this.attr]=t},Object.defineProperty(t.prototype,"error",{get:function(){return void 0===this._error?this.record.getValidationError(this.attr):this._error},set:function(t){this._error=t},enumerable:!0,configurable:!0}),t.prototype.assignFrom=function(t){this.value.assignFrom(t)},t}(P),V=function(o){function t(t,e,n){var r=o.call(this,t.deepGet(e))||this;return r.record=t,r.path=e,r.options=n,r}return s(t,o),Object.defineProperty(t.prototype,"error",{get:function(){return void 0===this._error&&(this._error=this.record.deepValidationError(this.path)||null),this._error},set:function(t){this._error=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_changeToken",{get:function(){return this.record._changeToken},enumerable:!0,configurable:!0}),t.prototype.set=function(t){this.record.deepSet(this.path,t,this.options)},t.prototype.assignFrom=function(t){this.value.assignFrom(t)},t}(P);function q(t){return t._links||(t._links=new t.AttributesCopy({}))}function H(t,e,n){var r=t[n],o=e[n];return r&&r.value===o?r:t[n]=new L(e,n,o)}p.MixinsState.get(p.Record.Collection).merge([{linkContains:function(t){return new N(this,t)},linkAt:function(e){var n=this;return P.value(this[e],function(t){return n[e]=t})}}]);var N=function(r){function t(t,e){var n=r.call(this,Boolean(t.get(e)))||this;return n.collection=t,n.record=e,n}return s(t,r),t.prototype.set=function(t){this.collection.toggle(this.record,t)},t}(P),B=Object.create(e);(B.default=B).define=p.define,B.mixins=p.mixins,B.Node=p.type(y).value(null),B.Element=p.type(m).value(null),B.Link=P,B.Component=b;var K=B.assignToState=function(r){return function(t){var e,n=t&&t instanceof P?t.value:t;this.state.assignFrom(((e={})[r]=n,e)),n&&n._changeToken&&(this.state[r]._changeToken=n._changeToken)}};t.default=B,t.define=p.define,t.mixins=p.mixins,t.Node=y,t.Element=m,t.Link=P,t.Component=b,t.assignToState=K,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
