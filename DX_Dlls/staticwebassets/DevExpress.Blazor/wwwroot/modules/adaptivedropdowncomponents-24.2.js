import { r as registeredComponents } from './dropdowncomponents-24.2.js';
import { registeredComponents as registeredComponents$1 } from './modalcomponents-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { e as isIPopupAccessor } from './logicaltreehelper-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { s } from './lit-element-24.2.js';
import { d as dxEventsInterceptorTagName } from './events-interseptor-24.2.js';
import './dropdown-24.2.js';
import './popup-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './eventhelper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './devices-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './custom-events-helper-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './thumb-24.2.js';
import './query-24.2.js';
import './popupportal-24.2.js';

var DxAdaptiveDropDown_1;
const dxAdaptiveDropDownTagName = "dxbl-adaptive-dropdown";
let DxAdaptiveDropDown = DxAdaptiveDropDown_1 = class DxAdaptiveDropDown extends s {
    constructor() {
        super(...arguments);
        this.slotChangedHandler = this.handleSlotChanged.bind(this);
        this.interceptorSlotChangedHandler = this.handleInterceptorSlotChange.bind(this);
        this.interceptor = null;
        this.resizeHandler = this.handleResize.bind(this);
        this._adaptivityEnabled = false;
        this._popupAccessor = null;
        this.adaptiveWidth = 576;
    }
    get popup() {
        var _a;
        return ((_a = this._popupAccessor) === null || _a === void 0 ? void 0 : _a.popup) || null;
    }
    get popupBase() {
        var _a;
        return ((_a = this._popupAccessor) === null || _a === void 0 ? void 0 : _a.popupBase) || null;
    }
    get adaptivityEnabled() {
        return this._adaptivityEnabled;
    }
    set adaptivityEnabled(val) {
        if (this._adaptivityEnabled !== val) {
            this._adaptivityEnabled = val;
            this.raiseEnableAdaptivity(val);
        }
    }
    createRenderRoot() {
        const root = super.createRenderRoot();
        const slot = document.createElement("slot");
        root.appendChild(slot);
        slot.addEventListener("slotchange", this.slotChangedHandler);
        const slotInterceptor = document.createElement("slot");
        slotInterceptor.name = "interceptor";
        root.appendChild(slotInterceptor);
        slotInterceptor.addEventListener("slotchange", this.interceptorSlotChangedHandler);
        return root;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("resize", this.resizeHandler, { passive: true });
        setTimeout(() => this.updateAdaptivity());
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("resize", this.resizeHandler);
    }
    handleResize(_) {
        this.updateAdaptivity();
    }
    updateAdaptivity() {
        this.adaptivityEnabled = this.getActualAdaptivityEnabled();
        this.raiseEvent("adaptivityChanged", {
            enabled: this.adaptivityEnabled,
        });
    }
    getActualAdaptivityEnabled() {
        return window.innerWidth <= this.adaptiveWidth;
    }
    handleSlotChanged(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this._popupAccessor = DxAdaptiveDropDown_1.findPopupAccessor(elements);
    }
    handleInterceptorSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this.interceptor = elements[0];
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    raiseEvent(name, args) {
        if (!this.interceptor || !this.interceptor.raise)
            return;
        this.interceptor.raise(name, args);
    }
    raiseEnableAdaptivity(enabled) {
        this.raiseEvent("adaptivityChanged", {
            enabled: enabled,
        });
    }
    static findPopupAccessor(elements) {
        const popupAccessor = elements.find(e => isIPopupAccessor(e));
        if (!popupAccessor)
            return null;
        return popupAccessor;
    }
};
__decorate([
    n({ type: Number, attribute: "adaptive-width" })
], DxAdaptiveDropDown.prototype, "adaptiveWidth", void 0);
DxAdaptiveDropDown = DxAdaptiveDropDown_1 = __decorate([
    e(dxAdaptiveDropDownTagName)
], DxAdaptiveDropDown);

function init() {
}
const adaptiveDropdownComponents = { dropDownRegisteredComponents: registeredComponents, modalRegisteredComponents: registeredComponents$1, init, dxAdaptiveDropDownTagName, dxEventsInterceptorTagName };

export { adaptiveDropdownComponents as default, init };
//# sourceMappingURL=adaptivedropdowncomponents-24.2.js.map
