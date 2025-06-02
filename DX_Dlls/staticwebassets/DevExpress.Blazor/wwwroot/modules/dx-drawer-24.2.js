import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { f as focusTrapSingleton } from './focustrap-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './tabbable-24.2.js';
import './focushelper-24.2.js';

let DxDrawerPanel = class DxDrawerPanel extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this._focusInHandler = this.focusIn.bind(this);
        this._focusOutHandler = this.focusOut.bind(this);
        this.focusLoop = false;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.focusLoop)
            this.removeFocusTrapEvents();
    }
    updated(props) {
        super.updated(props);
        if (props.has("focusLoop"))
            this.onFocusLoopUpdated();
    }
    onFocusLoopUpdated() {
        if (this.focusLoop) {
            this.addFocusTrapEvents();
            if (this.contains(document.activeElement))
                this.activateFocusTrap();
        }
        else {
            this.removeFocusTrapEvents();
            this.deactivateFocusTrap();
        }
    }
    addFocusTrapEvents() {
        this.addEventListener("focusin", this._focusInHandler);
        this.addEventListener("focusout", this._focusOutHandler);
    }
    removeFocusTrapEvents() {
        this.removeEventListener("focusin", this._focusInHandler);
        this.removeEventListener("focusout", this._focusOutHandler);
    }
    focusIn(evt) {
        const relatedTarget = evt.relatedTarget;
        if (this.contains(relatedTarget))
            return;
        this.activateFocusTrap();
    }
    focusOut(evt) {
        const relatedTarget = evt.relatedTarget;
        if (this.contains(relatedTarget) || this.contains(document.activeElement))
            return;
        this.deactivateFocusTrap();
    }
    activateFocusTrap() {
        focusTrapSingleton.activate(this, true, true, false);
    }
    deactivateFocusTrap() {
        focusTrapSingleton.deactivate(this, false);
    }
};
__decorate([
    n({ type: Boolean, attribute: "focus-loop" })
], DxDrawerPanel.prototype, "focusLoop", void 0);
DxDrawerPanel = __decorate([
    e(DxTagNames.DrawerPanel)
], DxDrawerPanel);

export { DxDrawerPanel };
//# sourceMappingURL=dx-drawer-24.2.js.map
