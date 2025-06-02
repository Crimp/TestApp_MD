import { dxDropDownTagName } from './dropdown-24.2.js';
import { a as DropDirection, b as DropAlignment, n as dxDropDownDialogTagName } from './popup-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { s, i, x } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { dxBranchTagName } from './branch-24.2.js';
import { D as DxPopupPortalTagName } from './popupportal-24.2.js';
import { d as dxEventsInterceptorTagName } from './events-interseptor-24.2.js';

const dxDropDownRootTagName = "dxbl-dropdown-root";
let DxDropDownRoot = class DxDropDownRoot extends s {
    constructor() {
        super(...arguments);
        this.topLeftClass = null;
        this.topRightClass = null;
        this.bottomLeftClass = null;
        this.bottomRightClass = null;
        this.dropOpposite = false;
        this.dropDirection = DropDirection.Near;
        this.dropAlignment = DropAlignment.bottom;
        this.resizing = false;
    }
    static get styles() {
        return i `
            :host {
                display: flex;
                position: relative;
                flex: 1 1 auto;
                flex-direction: column;
                box-sizing: border-box;
                min-height: 0;
            }
            .hidden {
                display: none;
            }
            ::slotted([slot="top-right"]) {
                position: absolute;
                z-index: 1001;
                top: 0px;
                right: 0px;
                transform: rotate(270deg);
                cursor: ne-resize;
            }
            ::slotted([slot="top-left"]) {
                position: absolute;
                z-index: 1001;
                top: 0px;
                left: 0px;
                transform: rotate(180deg);
                cursor: nw-resize;
            }
            ::slotted([slot="bottom-left"]) {
                position: absolute;
                z-index: 1001;
                bottom: 0px;
                left: 0px;
                transform: rotate(90deg);
                cursor: sw-resize;
            }
            ::slotted([slot="bottom-right"]) {
                position: absolute;
                z-index: 1001;
                bottom: 0px;
                right: 0px;
                cursor: se-resize;
                transform: rotate(0deg);
            }
        }`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.calculateStyles(this.resizing, this.dropAlignment, this.dropDirection);
    }
    willUpdate(changed) {
        if (changed.has("dropAlignment") || changed.has("dropDirection") || changed.has("resizing"))
            this.calculateStyles(this.resizing, this.dropAlignment, this.dropDirection);
    }
    calculateStyles(resizing, dropAlignment, dropDirection) {
        this.topLeftClass = resizing && dropAlignment === DropAlignment.top && dropDirection === DropDirection.Far ? null : "hidden";
        this.topRightClass = resizing && dropAlignment === DropAlignment.top && dropDirection === DropDirection.Near ? null : "hidden";
        this.bottomLeftClass = resizing && dropAlignment === DropAlignment.bottom && dropDirection === DropDirection.Far ? null : "hidden";
        this.bottomRightClass = resizing && dropAlignment === DropAlignment.bottom && dropDirection === DropDirection.Near ? null : "hidden";
    }
    render() {
        return x `
            <slot></slot>
            <dxbl-thumb data-qa-thumb-location="top-left" data-dropdown-thumb class="${this.topLeftClass}">
                <slot name="top-left"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="top-right" data-dropdown-thumb class="${this.topRightClass}">
                <slot name="top-right"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="bottom-left" data-dropdown-thumb class="${this.bottomLeftClass}">
                <slot name="bottom-left"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="bottom-right" data-dropdown-thumb class="${this.bottomRightClass}">
                <slot name="bottom-right"></slot>
            </dxbl-thumb>`;
    }
};
__decorate([
    n({ type: String, reflect: false })
], DxDropDownRoot.prototype, "topLeftClass", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxDropDownRoot.prototype, "topRightClass", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxDropDownRoot.prototype, "bottomLeftClass", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxDropDownRoot.prototype, "bottomRightClass", void 0);
__decorate([
    n({ type: Object, attribute: "drop-opposite" })
], DxDropDownRoot.prototype, "dropOpposite", void 0);
__decorate([
    n({ type: String, attribute: "drop-direction" })
], DxDropDownRoot.prototype, "dropDirection", void 0);
__decorate([
    n({ type: String, attribute: "drop-alignment" })
], DxDropDownRoot.prototype, "dropAlignment", void 0);
__decorate([
    n({ type: Boolean, attribute: "resizing" })
], DxDropDownRoot.prototype, "resizing", void 0);
DxDropDownRoot = __decorate([
    e(dxDropDownRootTagName)
], DxDropDownRoot);

const registeredComponents = [dxDropDownTagName, dxDropDownDialogTagName, dxDropDownRootTagName, dxBranchTagName, DxPopupPortalTagName, dxEventsInterceptorTagName];
function getReference(elementReference) {
    if (!elementReference)
        throw new Error("failed");
    return elementReference;
}
const dropdowncomponents = { getReference, registeredComponents };

const dropdowncomponents$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    registeredComponents,
    getReference,
    default: dropdowncomponents
});

export { DxDropDownRoot as D, dropdowncomponents$1 as d, registeredComponents as r };
//# sourceMappingURL=dropdowncomponents-24.2.js.map
