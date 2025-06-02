import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { G as GlobalConstants } from './const-24.2.js';
import { D as DxUIElement } from './dx-ui-element-24.2.js';
import { n } from './property-24.2.js';

let _inEnchancedNavigation = false;
const subscribeOnEnchancedNavigation = (callback) => {
    var _a;
    const enchancedCallback = () => {
        var _a;
        _inEnchancedNavigation = true;
        callback();
        (_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.removeEventListener("enhancedload", enchancedCallback);
        _inEnchancedNavigation = false;
    };
    (_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.addEventListener("enhancedload", enchancedCallback);
    return () => {
        var _a;
        if (!_inEnchancedNavigation)
            (_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.removeEventListener("enhancedload", enchancedCallback);
    };
};
class SingleSlotElementBase extends DxUIElement {
    constructor() {
        super(...arguments);
        this.boundSlotChangedHandler = this.onSlotChanged.bind(this);
        this.renderGuid = "";
        this._removeEnchancedNavigationSubscription = () => { };
    }
    contentChanged() { }
    connectedOrContentChanged() { }
    needReasignAttributes() { return true; }
    connectedCallback() {
        super.connectedCallback();
        this.connectedOrContentChanged();
    }
    restoreState() {
        if (this.needReasignAttributes()) {
            this.constructor["observedAttributes"].forEach(attributeName => {
                if (attributeName !== GlobalConstants.renderGuidAttributeName && this.hasAttribute(attributeName)) {
                    const currentValue = this.getAttribute(attributeName);
                    this.setAttribute(attributeName, "");
                    this.setAttribute(attributeName, currentValue);
                }
            });
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a;
        if (name === GlobalConstants.renderGuidAttributeName && oldValue && ((_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.addEventListener)) {
            this._removeEnchancedNavigationSubscription = subscribeOnEnchancedNavigation(() => this.restoreState());
            return;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._removeEnchancedNavigationSubscription();
    }
    onSlotChanged(_) {
        this.connectedOrContentChanged();
        this.contentChanged();
        if (!this.readyOnConnectedCallback)
            DataQaUtils.setLoaded(this);
    }
    createRenderRoot() {
        const root = super.createRenderRoot();
        const slot = document.createElement("slot");
        root.appendChild(slot);
        slot.addEventListener("slotchange", this.boundSlotChangedHandler);
        return root;
    }
}
__decorate([
    n({ type: String, attribute: GlobalConstants.renderGuidAttributeName })
], SingleSlotElementBase.prototype, "renderGuid", void 0);

export { SingleSlotElementBase as S };
//# sourceMappingURL=single-slot-element-base-24.2.js.map
