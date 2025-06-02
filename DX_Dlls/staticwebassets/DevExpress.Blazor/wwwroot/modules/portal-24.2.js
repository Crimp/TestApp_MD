import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { b as dxPopupRootTagName } from './constants-24.22.js';
import { G as GlobalConstants } from './const-24.2.js';
import { s } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';

class PopupContainer {
    _doWithElementCheck(action) {
        const popup = document.querySelector(dxPopupRootTagName);
        return action(popup !== null && popup !== void 0 ? popup : this._createPopupElement());
    }
    _createPopupElement() {
        const rootEl = document.createElement(dxPopupRootTagName);
        document.body.appendChild(rootEl);
        return rootEl;
    }
    constructor() {
        this._rootElementPromise = customElements.whenDefined(dxPopupRootTagName);
    }
    assign(portal) {
        this._rootElementPromise.then(() => this._doWithElementCheck(x => x.assign(portal)));
    }
    getPopup(parentBranchId) {
        return this._rootElementPromise.then(() => this._doWithElementCheck(x => x.getPopup(parentBranchId)));
    }
    release(portal) {
        this._rootElementPromise.then(() => this._doWithElementCheck(x => x.release(portal)));
    }
    async subscribeCaptureManager(element) {
        await this._rootElementPromise;
        return this._doWithElementCheck(x => x.subscribe(element));
    }
}
const popupContainerSingleton = new PopupContainer();
function getPopupRootSingleton() {
    return popupContainerSingleton;
}

const dxPortalTagName = "dxbl-portal";
class PortableElementsContext {
    constructor(elements) {
        this.elements = elements;
    }
}
class PortableElementsChangedEvent extends CustomEvent {
    constructor(detail) {
        super(PortableElementsChangedEvent.eventName, {
            detail,
            bubbles: true
        });
    }
}
PortableElementsChangedEvent.eventName = "dxbl-portable-elements-changed";
let DxPortal = class DxPortal extends s {
    constructor() {
        super(...arguments);
        this._portable = null;
        this._elementsPorted = false;
        this.slotChangedHandler = this.handleSlotChange.bind(this);
        this.boundOnFocusInHandler = this.handleFocusIn.bind(this);
        this._reassignPortal = () => getPopupRootSingleton().assign(this);
    }
    get portable() {
        return this._portable;
    }
    createRenderRoot() {
        const root = super.createRenderRoot();
        const slot = document.createElement("slot");
        root.appendChild(slot);
        slot.addEventListener("slotchange", this.slotChangedHandler);
        return root;
    }
    handleSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        if (this._elementsPorted && elements.length === 0)
            return;
        this.assignElements(elements);
        this._elementsPorted = true;
    }
    assignElements(elements) {
        this._portable = elements;
        this.raiseElementsChanged(elements);
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        DataQaUtils.setLoaded(this);
        getPopupRootSingleton().assign(this);
        if ((_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.addEventListener)
            window.Blazor.addEventListener("enhancedload", this._reassignPortal);
        this.addEventListener("focusin", this.boundOnFocusInHandler, { capture: true });
    }
    handleFocusIn(evt) {
        const popup = document.querySelector(`:not(.dxbl-popup-portal)[branch-id=${this.branchId}]`);
        if (popup)
            popup.activatePopupContent();
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        getPopupRootSingleton().release(this);
        DataQaUtils.removeLoaded(this);
        if ((_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.removeEventListener)
            window.Blazor.removeEventListener("enhancedload", this._reassignPortal);
        this.removeEventListener("focusin", this.boundOnFocusInHandler, { capture: true });
    }
    raiseElementsChanged(elements) {
        const event = new PortableElementsChangedEvent(new PortableElementsContext(elements));
        this.dispatchEvent(event);
    }
    updated(_) {
        if (!this.branchId && !this.hasAttribute(GlobalConstants.virtualElementAttributeName))
            throw new Error("branch-id must be specified");
    }
};
__decorate([
    n({ type: String, attribute: "branch-id" })
], DxPortal.prototype, "branchId", void 0);
DxPortal = __decorate([
    e(dxPortalTagName)
], DxPortal);
function init() {
}
const portal = { init, DxPortal, dxPortalTagName };

const portal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    dxPortalTagName,
    PortableElementsChangedEvent,
    get DxPortal () { return DxPortal; },
    init,
    default: portal
});

export { DxPortal as D, PortableElementsChangedEvent as P, getPopupRootSingleton as g, portal$1 as p };
//# sourceMappingURL=portal-24.2.js.map
