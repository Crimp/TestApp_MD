import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
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

const dxToastTagName = "dxbl-toast";
class ToastCssClasses {
}
ToastCssClasses.Toast = CssClasses.Prefix + "-toast";
ToastCssClasses.ToastText = ToastCssClasses.Toast + "-text";
let DxToast = class DxToast extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.maxHeight = "";
    }
    updated(props) {
        if (props.has("maxHeight"))
            this.calculateHeight();
    }
    calculateHeight() {
        this.style.maxHeight = this.maxHeight;
        const textElement = this.querySelector(`.${ToastCssClasses.ToastText}`);
        if (textElement) {
            const lineHeight = parseInt(window.getComputedStyle(textElement).lineHeight);
            const lineClamp = Math.floor(textElement.offsetHeight / lineHeight);
            this.style.setProperty("--dxbl-toast-line-clamp", lineClamp.toString());
        }
    }
};
__decorate([
    n({ attribute: "max-height" })
], DxToast.prototype, "maxHeight", void 0);
DxToast = __decorate([
    e(dxToastTagName)
], DxToast);

export { DxToast, ToastCssClasses };
//# sourceMappingURL=dx-toast-24.2.js.map
