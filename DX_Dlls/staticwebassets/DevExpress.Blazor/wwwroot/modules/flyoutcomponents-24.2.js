import { dxFlyoutTagName } from './flyout-24.2.js';
import { D as DxPopupPortalTagName } from './popupportal-24.2.js';
import { d as dxEventsInterceptorTagName } from './events-interseptor-24.2.js';
import { a as DropDirection, b as DropAlignment, J as dxFlyoutDialogTagName, K as dxFlyoutArrowTagName } from './popup-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { s, i, x } from './lit-element-24.2.js';
import './point-24.2.js';
import './layouthelper-24.2.js';
import './constants-24.2.js';
import './query-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './eventhelper-24.2.js';
import './logicaltreehelper-24.2.js';
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

const dxFlyoutRootTagName = "dxbl-flyout-root";
let DxFlyoutRoot = class DxFlyoutRoot extends s {
    constructor() {
        super(...arguments);
        this.dropOpposite = false;
        this.dropDirection = DropDirection.Near;
        this.dropAlignment = DropAlignment.bottom;
    }
    static get styles() {
        return i `
            :host {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                align-items: stretch;
                justify-items: stretch;
                min-height: 0;
            }
        }`;
    }
    render() {
        return x `
            <slot></slot>
            <slot name="arrow"/>
        `;
    }
};
__decorate([
    n({ type: Object, attribute: "drop-opposite" })
], DxFlyoutRoot.prototype, "dropOpposite", void 0);
__decorate([
    n({ type: String, attribute: "drop-direction" })
], DxFlyoutRoot.prototype, "dropDirection", void 0);
__decorate([
    n({ type: String, attribute: "drop-alignment" })
], DxFlyoutRoot.prototype, "dropAlignment", void 0);
DxFlyoutRoot = __decorate([
    e(dxFlyoutRootTagName)
], DxFlyoutRoot);

const registeredComponents = [dxFlyoutTagName, dxFlyoutDialogTagName, dxFlyoutRootTagName, DxPopupPortalTagName, dxEventsInterceptorTagName, dxFlyoutArrowTagName];
function getReference(elementReference) {
    if (!elementReference)
        throw new Error("failed");
    return elementReference;
}
const flyoutcomponents = { getReference, registeredComponents };

export { flyoutcomponents as default, getReference };
//# sourceMappingURL=flyoutcomponents-24.2.js.map
