import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { a as MenuConstants, M as MenuCssClasses } from './constants-24.24.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';

class MenuCollapseChangedEvent extends CustomEvent {
    constructor(collapsed) {
        super(MenuCollapseChangedEvent.eventName, {
            bubbles: true,
            composed: true,
            detail: new MenuCollapseChangedEventContext(collapsed)
        });
    }
}
MenuCollapseChangedEvent.eventName = `${MenuConstants.menuComponentName}.collapse-changed`;
class MenuCollapseChangedEventContext {
    constructor(collapsed) {
        this.collapsed = collapsed;
    }
}
CustomEventsHelper.register(MenuCollapseChangedEvent.eventName, x => {
    return x.detail;
});
class MenuItemConnectedEvent extends CustomEvent {
    constructor(menuItem) {
        super(MenuItemConnectedEvent.eventName, {
            bubbles: true,
            composed: true,
            detail: menuItem
        });
    }
}
MenuItemConnectedEvent.eventName = `${MenuConstants.menuItemComponentName}.connected`;

let DxMenuItem = class DxMenuItem extends SingleSlotElementBase {
    constructor() {
        super();
        this._prevActiveElement = null;
        this.menu = null;
        this.adaptivePriority = -1;
        this.canCrop = false;
        this.isVisible = false;
        this._onButtonFocusInHandler = this.onButtonFocusIn.bind(this);
        this.subscribeToEvents();
    }
    connectedCallback() {
        super.connectedCallback();
        this.dispatchEvent(new MenuItemConnectedEvent(this));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.menu) === null || _a === void 0 ? void 0 : _a.onItemDisconnected();
        super.disconnectedCallback();
    }
    isDropDownItem(element) {
        return element.classList.contains(MenuCssClasses.dropdownItem);
    }
    subscribeToEvents() {
        this.addEventListener("pointerdown", event => {
            if (event.target instanceof HTMLElement && this.isDropDownItem(event.target)) {
                if (document.activeElement instanceof HTMLElement)
                    this._prevActiveElement = document.activeElement;
                event.target.addEventListener("focusin", this._onButtonFocusInHandler);
            }
        });
    }
    onButtonFocusIn(event) {
        if (!event.currentTarget)
            return;
        event.currentTarget.removeEventListener("focusin", this._onButtonFocusInHandler);
        if (this._prevActiveElement)
            this._prevActiveElement.focus();
        else
            event.currentTarget.blur();
    }
};
__decorate([
    n({ type: Number, attribute: "adaptive-priority" })
], DxMenuItem.prototype, "adaptivePriority", void 0);
__decorate([
    n({ type: Boolean, attribute: "can-crop" })
], DxMenuItem.prototype, "canCrop", void 0);
DxMenuItem = __decorate([
    e(MenuConstants.menuItemComponentName)
], DxMenuItem);
function loadModule() { }
const dxMenuItem = { loadModule };

const dxMenuItem$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get DxMenuItem () { return DxMenuItem; },
    default: dxMenuItem
});

export { DxMenuItem as D, MenuItemConnectedEvent as M, MenuCollapseChangedEvent as a, dxMenuItem$1 as d };
//# sourceMappingURL=dx-menu-item-24.2.js.map
