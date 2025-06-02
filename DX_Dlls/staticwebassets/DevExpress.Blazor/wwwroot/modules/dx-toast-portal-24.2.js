import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { s } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';

const dxToastPortalTagName = "dxbl-toast-portal";
let DxToastPortal = class DxToastPortal extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.width = "";
        this.zIndex = 0;
    }
    updated(props) {
        if (props.has("width"))
            this.style.width = this.width;
        if (props.has("zIndex"))
            this.style.zIndex = this.zIndex.toString();
    }
};
DxToastPortal.shadowRootOptions = { ...s.shadowRootOptions, mode: "open" };
__decorate([
    n()
], DxToastPortal.prototype, "width", void 0);
__decorate([
    n({ type: Number, attribute: "z-index" })
], DxToastPortal.prototype, "zIndex", void 0);
DxToastPortal = __decorate([
    e(dxToastPortalTagName)
], DxToastPortal);

export { DxToastPortal, dxToastPortalTagName };
//# sourceMappingURL=dx-toast-portal-24.2.js.map
