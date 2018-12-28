import * as tslib_1 from "tslib";
import React, { define, Component } from 'react-type-r';
import ReactDOM from 'react-dom';
import { Record } from 'type-r';
import './styles.css';
import { type } from 'type-r';
var Item = /** @class */ (function (_super) {
    tslib_1.__extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        type(String).as
    ], Item.prototype, "text", void 0);
    Item = tslib_1.__decorate([
        define
    ], Item);
    return Item;
}(Record));
var Application = /** @class */ (function (_super) {
    tslib_1.__extends(Application, _super);
    function Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Application_1 = Application;
    Application.prototype.render = function () {
        var state = this.state;
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return state.items.add({}); } }, "Add"),
            state.items.map(function (item) { return (React.createElement(ItemView, { key: item.cid, item: item })); })));
    };
    var Application_1;
    Application.state = {
        items: Item.Collection
    };
    Application = Application_1 = tslib_1.__decorate([
        define
    ], Application);
    return Application;
}(Component));
var ItemView = function (_a) {
    var item = _a.item;
    return (React.createElement("input", tslib_1.__assign({}, item.linkAt('text').props)));
};
ReactDOM.render(React.createElement(Application, null), document.getElementById('react-application'));
//# sourceMappingURL=index.js.map