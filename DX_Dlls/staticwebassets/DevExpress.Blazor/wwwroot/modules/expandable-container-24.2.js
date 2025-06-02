import { _ as __decorate } from './tslib.es6-24.2.js';
import { f as getTopBottomBordersAndPaddingsSummaryValue, R as RequestAnimationFrame, c as changeDom } from './dom-utils-24.2.js';
import { d as dom } from './dom-24.2.js';
import { E as EventRegister } from './eventRegister-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { n } from './property-24.2.js';
import { t } from './state-24.2.js';
import { e } from './custom-element-24.2.js';
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './css-classes-24.2.js';
import './string-24.2.js';
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

const transitionAttribute = "is-animating";
const containerAttribute = "data-items-container";
var AnimationType;
(function (AnimationType) {
    AnimationType["None"] = "None";
    AnimationType["Slide"] = "Slide";
})(AnimationType || (AnimationType = {}));
let ExpandableContainer = class ExpandableContainer extends SingleSlotElementBase {
    constructor() {
        super();
        this.isAnimating = false;
        this.mutationObserver = null;
        this._expandedState = "False";
        this._previousNodeCount = null;
        this._getNodeCount = (mainElement) => {
            var _a;
            return mainElement ? this.childElementCount : ((_a = this.firstElementChild) === null || _a === void 0 ? void 0 : _a.childElementCount) || null;
        };
        this.animationType = AnimationType.None;
        this.expanded = false;
        this.events = new EventRegister(this);
        this.isRendered = false;
        this._expandedState = "False";
    }
    connectedCallback() {
        super.connectedCallback();
        this.isRendered = true;
        if (!this.expanded)
            this.setElementVisibility(false);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.isRendered = false;
    }
    set expandedState(val) {
        const oldVal = this._expandedState;
        this._expandedState = val;
        this.expanded = val === "True";
        this.requestUpdate("expandedState", oldVal);
        if (!(!this.isRendered && val === "True"))
            this.onExpandedChanged();
        else
            this.notifyActualExpandedChanged();
    }
    get expandedState() {
        return this._expandedState;
    }
    onExpandedChanged() {
        this.applyExpandedStateToElements();
    }
    notifyActualExpandedChanged() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    get value() {
        return this.expandedState;
    }
    applyExpandedStateToElements() {
        var _a, _b, _c, _d;
        const expanded = this.expanded;
        if (this.animationType === AnimationType.None) {
            this.notifyActualExpandedChanged();
            this.setContainerElementVisibility(expanded);
            return;
        }
        const isContainerChild = (_a = this.firstElementChild) === null || _a === void 0 ? void 0 : _a.hasAttribute(containerAttribute);
        const nodeCount = this._getNodeCount(!isContainerChild);
        if (expanded) {
            if (this.childElementCount === 0) {
                this.waitForContent(this);
                return;
            }
            if (((_b = this.firstElementChild) === null || _b === void 0 ? void 0 : _b.hasAttribute(containerAttribute)) && !nodeCount) {
                this.waitForContent(this.firstElementChild);
                return;
            }
        }
        if (expanded && this.firstElementChild && (this._previousNodeCount === nodeCount || !isContainerChild)) {
            (_c = this.mutationObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
            if (isContainerChild && !nodeCount)
                return;
        }
        this._previousNodeCount = this._getNodeCount(!isContainerChild);
        const animating = this.token;
        const startHeight = expanded && !animating ? 0 : this.getContainerStartHeight(expanded);
        this.toggleAttribute(transitionAttribute, false);
        if (animating)
            this.style.maxHeight = startHeight + "px";
        const endHeight = this.getContainerEndHeight(expanded);
        (_d = this.token) === null || _d === void 0 ? void 0 : _d.dispose();
        this.token = null;
        this.prepareElementsForAnimation(expanded, 0, !!animating);
        if (startHeight !== endHeight) {
            const transitionEnd = () => {
                this.onAnimationComplete();
                this.token.dispose();
                this.token = null;
            };
            this.startAnimation(startHeight, endHeight, () => {
                transitionEnd();
            });
        }
        else
            this.onAnimationComplete();
    }
    waitForContent(element) {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.mutationObserver = new MutationObserver((_) => {
            this.applyExpandedStateToElements();
        });
        this.mutationObserver.observe(element, { childList: true });
    }
    setContainerElementVisibility(value) {
        this.setElementVisibility(value);
    }
    setElementVisibility(value) {
        if (!value) {
            this.style.display = "none";
            this.style.height = "0px";
        }
        else {
            this.style.display = "";
            this.style.height = "";
        }
    }
    getContainerStartHeight(expanding) {
        return expanding ? this.getClearClientHeight() : this.offsetHeight;
    }
    getContainerEndHeight(expanding) {
        if (!expanding)
            return 0;
        const currentHeight = this.getClearClientHeight();
        const visibility = this.getElementVisibility(false);
        this.style.maxHeight = "";
        this.setElementVisibility(true);
        const height = this.getClearClientHeight();
        this.setElementVisibility(visibility);
        this.style.maxHeight = currentHeight + "px";
        return height;
    }
    prepareElementsForAnimation(expanding, heightCorrection, animating) {
        this.style.overflow = "hidden";
        if (expanding) {
            this.setContainerElementVisibility(true);
            this.style.maxHeight = (animating ? 0 : this.getClearClientHeight()) + "px";
        }
        else {
            const height = this.offsetHeight + heightCorrection;
            if (height >= 0)
                this.setOffsetHeight(height, null);
        }
    }
    getClearClientHeight() {
        return this.offsetHeight;
    }
    getElementVisibility(isCurrentStyle) {
        if (isCurrentStyle) {
            const currentStyle = dom.DomUtils.getCurrentStyle(this);
            if (currentStyle)
                return currentStyle.display !== "none";
        }
        return this.style.display !== "none";
    }
    setOffsetHeight(heightValue, currentStyle) {
        if (!currentStyle)
            currentStyle = dom.DomUtils.getCurrentStyle(this);
        let value = heightValue - dom.DomUtils.pxToInt(currentStyle.marginTop) - dom.DomUtils.pxToInt(currentStyle.marginBottom);
        value -= getTopBottomBordersAndPaddingsSummaryValue(this, currentStyle);
        if (value > -1)
            this.style.maxHeight = value + "px";
    }
    startAnimation(from, to, _onComplete) {
        this.isAnimating = true;
        if (from !== to) {
            this.token = this.events.attachEvent(this, "transitionend", _onComplete);
            // eslint-disable-next-line new-cap
            RequestAnimationFrame(() => {
                if (!this.isAnimating)
                    return;
                this.toggleAttribute(transitionAttribute, true);
                setTimeout(() => this.style.maxHeight = to + "px");
            });
        }
        else
            _onComplete();
    }
    onAnimationComplete() {
        this.toggleAttribute(transitionAttribute, false);
        this.setContainerElementVisibility(this.expanded);
        changeDom(() => {
            this.style.overflow = "";
            this.style.maxHeight = "";
        });
        this.notifyActualExpandedChanged();
        this.checkChildContent();
    }
    checkChildContent() {
        if (!this.expanded && this.childElementCount !== 0 && this.firstElementChild !== null && this.firstElementChild.hasAttribute(containerAttribute)) {
            const childElements = this.querySelectorAll(" ul[data-items-container]");
            if (!childElements)
                return;
            for (let i = 0; i < childElements.length; i = i + 1)
                childElements[i].style.overflowY = "hidden";
        }
    }
};
__decorate([
    n({ type: String, attribute: "expanded-state" })
], ExpandableContainer.prototype, "expandedState", null);
__decorate([
    n({ type: AnimationType, attribute: "animation-type" })
], ExpandableContainer.prototype, "animationType", void 0);
__decorate([
    t()
], ExpandableContainer.prototype, "expanded", void 0);
ExpandableContainer = __decorate([
    e(DxTagNames.ExpandableContainer)
], ExpandableContainer);
function loadModule() { }
const expandableContainer = { loadModule };

export { AnimationType, ExpandableContainer, expandableContainer as default };
//# sourceMappingURL=expandable-container-24.2.js.map
