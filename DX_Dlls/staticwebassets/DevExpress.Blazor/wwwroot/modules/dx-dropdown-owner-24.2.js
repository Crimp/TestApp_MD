import { D as DxUIElement } from './dx-ui-element-24.2.js';
import { P as PortableElementsChangedEvent } from './portal-24.2.js';
import { t as PopupShownEvent, u as PopupClosedEvent } from './popup-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { e as isIPopupAccessor, d as isILogicalChildBase, f as isIAdaptiveDropDown } from './logicaltreehelper-24.2.js';
import { x } from './lit-element-24.2.js';

class DxDropDownOwner extends DxUIElement {
    constructor() {
        super();
        this.boundOnDropDownElementChangedHandler = this.onDropDownElementChanged.bind(this);
        this.boundOnDropDownShownHandler = this.onDropDownShown.bind(this);
        this.boundOnDropDownClosedHandler = this.onDropDownClosed.bind(this);
        this.boundOnDropDownPortalElementsChangedHandler = this.onDropDownPortalElementsChanged.bind(this);
        this.boundSlotChangedHandler = this.onSlotChanged.bind(this);
        this.dropDownPortal = null;
        this._dropDownElement = null;
        this._adaptiveDropDownElement = null;
    }
    get dropDownElement() {
        return this._dropDownElement;
    }
    get useMobileFocusBehaviour() {
        var _a;
        return ((_a = this._adaptiveDropDownElement) === null || _a === void 0 ? void 0 : _a.adaptivityEnabled) || false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.ensureDropDownInfrastructure();
        this.addEventListener(PortableElementsChangedEvent.eventName, this.boundOnDropDownElementChangedHandler);
    }
    disconnectedCallback() {
        this.removeEventListener(PortableElementsChangedEvent.eventName, this.boundOnDropDownElementChangedHandler);
        this.disposeDropDownInfrastructure();
        super.disconnectedCallback();
    }
    render() {
        return x `
            <slot @slotchange="${this.boundSlotChangedHandler}">
            </slot>
        `;
    }
    processCapturedKeyDownAsync(event, options) {
        if (this.invokeKeyDownServerCommand(event)) {
            event.preventDefault();
            options.handled = true;
            return Promise.resolve();
        }
        return super.processCapturedKeyDownAsync(event, options);
    }
    processCapturedPointerAsync(event, options) {
        if (this.canHandlePointerDown(event)) {
            options.handled = true;
            return Promise.resolve();
        }
        return super.processCapturedPointerAsync(event, options);
    }
    canHandlePointerDown(_) {
        return false;
    }
    invokeKeyDownServerCommand(_) {
        return false;
    }
    onSlotChanged(_) {
        this.disposeDropDownInfrastructure();
        this.ensureDropDownInfrastructure();
    }
    getDropDownPortal() {
        if (!this.shadowRoot)
            return null;
        const slot = this.shadowRoot.querySelector("slot");
        if (!slot)
            return null;
        const elements = slot.assignedNodes();
        return elements.find(e => isIPopupAccessor(e));
    }
    onDropDownElementChanged(evt) {
        if (!this.dropDownPortal)
            this.ensureDropDownInfrastructure();
        if (EventHelper.getOriginalSource(evt) !== this.dropDownPortal)
            return;
        this.disposeDropDownElement();
        this.ensureDropDownElement();
    }
    onDropDownShown(_) {
        if (this.dropDownElement && isILogicalChildBase(this.dropDownElement))
            this.addLogicalChild(this.dropDownElement);
    }
    onDropDownClosed(_) {
        if (this.dropDownElement && isILogicalChildBase(this.dropDownElement))
            this.removeLogicalChild(this.dropDownElement);
    }
    onDropDownPortalElementsChanged(_) {
        this.ensureDropDownElement();
    }
    ensureDropDownInfrastructure() {
        var _a;
        this.dropDownPortal = this.getDropDownPortal();
        (_a = this.dropDownPortal) === null || _a === void 0 ? void 0 : _a.addEventListener(PortableElementsChangedEvent.eventName, this.boundOnDropDownPortalElementsChangedHandler);
        this.ensureDropDownElement();
    }
    ensureDropDownElement() {
        var _a, _b, _c;
        if (!this.dropDownPortal)
            return;
        this._dropDownElement = (_a = this.dropDownPortal) === null || _a === void 0 ? void 0 : _a.popup;
        (_b = this._dropDownElement) === null || _b === void 0 ? void 0 : _b.addEventListener(PopupShownEvent.eventName, this.boundOnDropDownShownHandler);
        (_c = this._dropDownElement) === null || _c === void 0 ? void 0 : _c.addEventListener(PopupClosedEvent.eventName, this.boundOnDropDownClosedHandler);
        if (this._dropDownElement && isIAdaptiveDropDown(this._dropDownElement))
            this._adaptiveDropDownElement = this._dropDownElement;
    }
    disposeDropDownInfrastructure() {
        var _a;
        (_a = this.dropDownPortal) === null || _a === void 0 ? void 0 : _a.removeEventListener(PortableElementsChangedEvent.eventName, this.boundOnDropDownPortalElementsChangedHandler);
        this.dropDownPortal = null;
        this._adaptiveDropDownElement = null;
        this.disposeDropDownElement();
    }
    disposeDropDownElement() {
        var _a, _b;
        (_a = this._dropDownElement) === null || _a === void 0 ? void 0 : _a.removeEventListener(PopupShownEvent.eventName, this.boundOnDropDownShownHandler);
        (_b = this._dropDownElement) === null || _b === void 0 ? void 0 : _b.removeEventListener(PopupClosedEvent.eventName, this.boundOnDropDownClosedHandler);
        this._dropDownElement = null;
    }
}

export { DxDropDownOwner as D };
//# sourceMappingURL=dx-dropdown-owner-24.2.js.map
