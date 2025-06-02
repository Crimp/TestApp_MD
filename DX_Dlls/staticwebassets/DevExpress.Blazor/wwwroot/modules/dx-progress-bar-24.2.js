import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { s as stringToEnumConverter } from './enumConverter-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { x } from './lit-element-24.2.js';
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

class ProgressBarCssClasses {
}
ProgressBarCssClasses.ProgressBar = CssClasses.Prefix + "-progress-bar";
ProgressBarCssClasses.ProgressCircularBar = CssClasses.Prefix + "-progress-circular-bar";
ProgressBarCssClasses.ProgressCircularBarTrack = ProgressBarCssClasses.ProgressCircularBar + "-track";
ProgressBarCssClasses.ProgressCircularBarIndicator = ProgressBarCssClasses.ProgressCircularBar + "-indicator";
ProgressBarCssClasses.ProgressBarLabel = ProgressBarCssClasses.ProgressBar + "-label";
ProgressBarCssClasses.ProgressBarLabelContainer = ProgressBarCssClasses.ProgressBarLabel + "-container";

class ConvertHelper {
    static convertRemToPixels(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    static convertToPixels(value) {
        const temp = document.createElement("div");
        temp.style.fontSize = "1rem";
        temp.style.position = "absolute";
        temp.style.visibility = "hidden";
        temp.style.width = value;
        document.body.appendChild(temp);
        const pixels = temp.offsetWidth;
        document.body.removeChild(temp);
        return pixels;
    }
}

const dxProgressBarTagName = "dxbl-progress-bar";
var ProgressBarType;
(function (ProgressBarType) {
    ProgressBarType[ProgressBarType["Horizontal"] = 0] = "Horizontal";
    ProgressBarType[ProgressBarType["Vertical"] = 1] = "Vertical";
    ProgressBarType[ProgressBarType["Circular"] = 2] = "Circular";
})(ProgressBarType || (ProgressBarType = {}));
const maxRadius = 50;
let DxProgressBar = class DxProgressBar extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.value = null;
        this.visible = false;
        this.type = null;
        this.size = "";
        this.thickness = "";
        this.indeterminate = false;
        this.emptyOffset = false;
        this.thicknessPixel = 0;
        this.circularSizeObserver = null;
    }
    get radius() {
        if (!this.thicknessPixel)
            return maxRadius;
        return maxRadius - this.thicknessPixel / 2;
    }
    get isVertical() {
        return this.type === ProgressBarType.Vertical;
    }
    get isHorizontal() {
        return this.type === ProgressBarType.Horizontal;
    }
    get isCircular() {
        return this.type === ProgressBarType.Circular;
    }
    get offset() {
        if (this.emptyOffset)
            return 0;
        if (this.indeterminate)
            return this.circumference * 0.7;
        return this.circumference * (100 - this.value) / 100;
    }
    get circumference() {
        return Math.round(2 * Math.PI * this.radius);
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateSize();
        this.style.visibility = "visible";
    }
    render() {
        return x `
            <style>
                :host {
                    --dxbl-progress-bar-indicator-width: ${this.isHorizontal ? this.value + "%" : "100%"};
                    --dxbl-progress-bar-indicator-height: ${this.isVertical ? this.value + "%" : "100%"};
                }
            </style>
            <slot></slot>
        `;
    }
    updated(props) {
        super.updated(props);
        if (props.has("visible"))
            this.style.display = this.visible ? "" : "none";
        if (props.has("type"))
            this.updateType();
        if (props.has("thickness"))
            this.updateThickness();
        if ((props.has("value") || props.has("indeterminate") || props.has("emptyOffset")) && this.isCircular)
            this.updateCircularValue();
        if (props.has("size") || props.has("type"))
            this.updateSize();
    }
    updateSize() {
        this.calculateSize();
        this.updateCircular();
    }
    calculateSize() {
        this.style.width = this.isHorizontal || this.isCircular ? this.size : "";
        this.style.height = this.isVertical || this.isCircular ? this.size : "";
        this.style.setProperty("--dxbl-progress-bar-width", this.style.width);
        this.style.setProperty("--dxbl-progress-bar-height", this.style.height);
    }
    updateType() {
        this.updateCircular();
    }
    updateCircular() {
        if (this.isCircular) {
            this.updateThickness();
            this.updatePercentCircularSize();
        }
    }
    updateThickness() {
        this.style.setProperty("--dxbl-progress-bar-thickness", this.thickness);
        if (!this.isCircular)
            return;
        this.thicknessPixel = ConvertHelper.convertToPixels(this.thickness);
        this.updateCircularValue();
        this.updateCircularLabelSize();
    }
    updateCircularValue() {
        if (!this.isCircular || !this.thicknessPixel)
            return;
        const circularTrack = this.querySelector(`.${ProgressBarCssClasses.ProgressCircularBarTrack}`);
        const circularIndicator = this.querySelector(`.${ProgressBarCssClasses.ProgressCircularBarIndicator}`);
        if (!circularTrack || !circularIndicator)
            return;
        circularTrack.setAttribute("r", this.radius.toString());
        circularIndicator.setAttribute("r", this.radius.toString());
        circularIndicator.setAttribute("stroke-dasharray", this.circumference.toFixed(2));
        circularIndicator.setAttribute("stroke-dashoffset", this.offset.toFixed(2));
        circularIndicator.style.display = this.value === 0 ? "none" : "";
    }
    updatePercentCircularSize() {
        if (this.size.indexOf("%") < 0) {
            this.unsubscribeCircularSizeObserver();
            return;
        }
        this.subscribeCircularSizeObserver();
        this.updateCircularPercentHeight();
    }
    subscribeCircularSizeObserver() {
        if (this.circularSizeObserver)
            return;
        this.circularSizeObserver = new ResizeObserver(() => this.updateCircularPercentHeight());
        this.circularSizeObserver.observe(this);
    }
    unsubscribeCircularSizeObserver() {
        if (!this.circularSizeObserver)
            return;
        this.circularSizeObserver.unobserve(this);
        this.circularSizeObserver = null;
        this.calculateSize();
    }
    updateCircularPercentHeight() {
        this.style.height = this.offsetWidth + "px";
        this.updateCircularLabelSize();
    }
    updateCircularLabelSize() {
        const getIconSpace = () => {
            const labelElement = this.querySelector(`.${ProgressBarCssClasses.ProgressBarLabelContainer}`);
            if (!labelElement)
                return 0;
            const iconElement = labelElement.querySelector(".dxbl-image");
            if (!iconElement)
                return 0;
            return iconElement.clientWidth + ConvertHelper.convertToPixels(getComputedStyle(labelElement).gap);
        };
        const iconWidth = getIconSpace();
        const labelWidth = this.offsetWidth - 2 * Math.PI * this.thicknessPixel - iconWidth;
        this.style.setProperty("--dxbl-progress-bar-label-width", labelWidth.toFixed(2) + "px");
    }
};
__decorate([
    n({ type: Number })
], DxProgressBar.prototype, "value", void 0);
__decorate([
    n({ type: Boolean })
], DxProgressBar.prototype, "visible", void 0);
__decorate([
    n({ type: ProgressBarType, converter: stringToEnumConverter(ProgressBarType) })
], DxProgressBar.prototype, "type", void 0);
__decorate([
    n()
], DxProgressBar.prototype, "size", void 0);
__decorate([
    n()
], DxProgressBar.prototype, "thickness", void 0);
__decorate([
    n({ type: Boolean })
], DxProgressBar.prototype, "indeterminate", void 0);
__decorate([
    n({ attribute: "empty-offset", type: Boolean })
], DxProgressBar.prototype, "emptyOffset", void 0);
DxProgressBar = __decorate([
    e(dxProgressBarTagName)
], DxProgressBar);

export { DxProgressBar };
//# sourceMappingURL=dx-progress-bar-24.2.js.map
