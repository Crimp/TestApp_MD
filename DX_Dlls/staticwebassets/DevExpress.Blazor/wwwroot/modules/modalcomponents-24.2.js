import { x as DxModalDialog, y as dxModalTagName, p as popupResizableContainerTagName, z as dxModalDialogTagName } from './popup-24.2.js';
import { b as dxPopupRootTagName } from './constants-24.22.js';
import { D as DxPopupPortalTagName } from './popupportal-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { e } from './custom-element-24.2.js';
import { s, x } from './lit-element-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './property-24.2.js';
import './eventhelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
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

const dxModalRootTagName = "dxbl-modal-root";
let DxModalRoot = class DxModalRoot extends s {
    constructor() {
        super(...arguments);
        this.slotChangedHandler = this.handleSlotChange.bind(this);
    }
    render() {
        return x `
            <slot @slotchange=${this.slotChangedHandler}></slot>
        `;
    }
    handleSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        const dialog = elements.find(x => x instanceof DxModalDialog);
        const modal = this.closest(dxModalTagName);
        if (modal) {
            if (dialog) {
                modal.notifyDialogConnected(dialog);
                modal.notifyRootConnected();
            }
            else {
                modal.notifyDialogDisconnected();
                modal.notifyRootDisconnected();
            }
        }
    }
};
DxModalRoot = __decorate([
    e(dxModalRootTagName)
], DxModalRoot);

const registeredComponents = [popupResizableContainerTagName, dxModalDialogTagName, dxModalTagName, dxModalRootTagName, dxPopupRootTagName, DxPopupPortalTagName];
function getReference(elementReference) {
    if (!elementReference)
        throw new Error("failed");
    return elementReference;
}
const modalcomponents = { getReference, registeredComponents };

export { modalcomponents as default, getReference, registeredComponents };
//# sourceMappingURL=modalcomponents-24.2.js.map
