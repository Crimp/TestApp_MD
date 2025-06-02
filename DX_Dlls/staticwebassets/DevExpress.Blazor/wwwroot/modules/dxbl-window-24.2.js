import { _ as __decorate } from './tslib.es6-24.2.js';
import { DxDropDownBase } from './dropdown-24.2.js';
import { p as popupResizableContainerTagName, i as DxPopupDraggableDialog, e as PlacementMode, j as CloseMode, k as addLayoutChangeHandlers, B as BranchType, l as PopupKeyboardStrategyActivateEvent, C as CustomPopupPlacement, f as PopupPrimaryAxis, a as DropDirection, b as DropAlignment, P as PopupZIndexDeltaChangeEvent, Z as ZIndexDeltaChangeContext, m as PopupWindowKeyboardStrategy } from './popup-24.2.js';
import { r as registeredComponents, D as DxDropDownRoot } from './dropdowncomponents-24.2.js';
import { P as Point } from './point-24.2.js';
import { c as dxWindowRootTagName, a as dxWindowDialogTagName, e as dxWindowTagName } from './constants-24.22.js';
import { x } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './thumb-24.2.js';
import './data-qa-utils-24.2.js';
import './eventhelper-24.2.js';
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './layouthelper-24.2.js';
import './constants-24.2.js';
import './custom-events-helper-24.2.js';
import './query-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './const-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './string-24.2.js';
import './devices-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';

function getNextIdleFramePromise() {
    return new Promise((resolve, _) => {
        requestAnimationFrame(() => {
            setTimeout(resolve);
        });
    });
}

var DxWindow_1;
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["Center"] = "Center";
    HorizontalAlignment["Left"] = "Left";
    HorizontalAlignment["Right"] = "Right";
})(HorizontalAlignment || (HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment["Top"] = "Top";
    VerticalAlignment["Center"] = "Center";
    VerticalAlignment["Bottom"] = "Bottom";
})(VerticalAlignment || (VerticalAlignment = {}));
[registeredComponents, popupResizableContainerTagName];
let DxWindowDialog = class DxWindowDialog extends DxPopupDraggableDialog {
    constructor() {
        super(...arguments);
        this.allowResize = false;
    }
    get header() {
        return this.querySelector(".dxbl-window-header");
    }
    render() {
        if (!this.allowResize)
            return x `<slot></slot>`;
        return x `<dxbl-popup-resizable-container><slot></slot></dxbl-popup-resizable-container>`;
    }
};
__decorate([
    n({ type: Boolean, attribute: "allow-resize", reflect: false })
], DxWindowDialog.prototype, "allowResize", void 0);
DxWindowDialog = __decorate([
    e("dxbl-window-dialog")
], DxWindowDialog);
let DxWindowRoot = class DxWindowRoot extends DxDropDownRoot {
    constructor() {
        super();
    }
};
DxWindowRoot = __decorate([
    e(dxWindowRootTagName)
], DxWindowRoot);
let DxWindow = DxWindow_1 = class DxWindow extends DxDropDownBase {
    constructor() {
        super();
        this.actualSize = null;
        this.actualPosition = null;
        this.initialSize = null;
        this.initialPosition = null;
        this.actualMinWidth = null;
        this.actualMaxWidth = null;
        this.actualMinHeight = null;
        this.actualMaxHeight = null;
        this.sizeDirty = false;
        this.positionYDirty = false;
        this.positionXDirty = false;
        this.showAnchorElement = null;
        this._showOptionsToApply = null;
        this.childContentObserver = null;
        this.isAdjustDialogEnabled = true;
        this.horizontalAlignment = HorizontalAlignment.Center;
        this.verticalAlignment = VerticalAlignment.Center;
        this.closeOnEscape = false;
        this.placement = PlacementMode.Custom;
        this.closeMode = CloseMode.None;
        addLayoutChangeHandlers(this);
    }
    get branchType() {
        return BranchType.Window;
    }
    get canAdjustZIndexOnShow() {
        return false;
    }
    get positionY() {
        return this.offset.y;
    }
    set positionY(value) {
        this.positionYDirty = true;
        this.offset = new Point(this.positionX || 0, value || 0);
    }
    get positionX() {
        return this.offset.x;
    }
    set positionX(value) {
        this.positionXDirty = true;
        this.offset = new Point(value || 0, this.positionY || 0);
    }
    get showOptionsToApply() {
        return this._showOptionsToApply;
    }
    set showOptionsToApply(value) {
        this._showOptionsToApply = value;
        this.positionXDirty = false;
        this.positionYDirty = false;
    }
    move(options) {
        this.showOptionsToApply = options;
        this.forceReposition();
        return getNextIdleFramePromise();
    }
    showAt(options) {
        this.showOptionsToApply = options;
        this.observeChildContent(this);
        super.show();
        return getNextIdleFramePromise();
    }
    show() {
        this.showAt(this.showOptionsToApply).catch(_ => { });
    }
    observeChildContent(observedElement) {
        var _a;
        (_a = this.childContentObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        if (this.contentLoaded())
            this.enableVisibility();
        else {
            this.childContentObserver = new MutationObserver(this.handleChildContentChanged.bind(this));
            this.childContentObserver.observe(observedElement, { childList: true });
        }
    }
    handleChildContentChanged(records) {
        var _a;
        const dialogElement = this.querySelector(dxWindowDialogTagName);
        if (dialogElement) {
            if (dialogElement.childElementCount > 0) {
                this.enableVisibility();
                (_a = this.childContentObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            }
            else
                this.observeChildContent(dialogElement);
        }
        else
            this.observeChildContent(this);
    }
    contentLoaded() {
        const dialogElement = this.querySelector(dxWindowDialogTagName);
        return dialogElement !== null && dialogElement.childElementCount > 0;
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.childContentObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    static getPlacementTargetClientRect(options) {
        if (options !== null) {
            if (options.targetReference !== null && options.targetReference instanceof HTMLElement)
                return options.targetReference.getBoundingClientRect();
            if (options.targetSelector !== null) {
                const target = document.querySelector(options.targetSelector);
                if (target !== null)
                    return target.getBoundingClientRect();
            }
        }
        return {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    static getShowAtBox(options) {
        if (options === null)
            return null;
        if (options.targetReference !== null && options.targetReference instanceof HTMLElement)
            return DxWindow_1.getElementTopLeftPoint(options.targetReference);
        if (options.targetSelector !== null)
            return DxWindow_1.getElementTopLeftPoint(document.querySelector(options.targetSelector));
        return options.targetPoint;
    }
    static getElementTopLeftPoint(targetReference) {
        if (targetReference === null)
            return null;
        const box = targetReference.getBoundingClientRect();
        return new Point(box.left, box.top);
    }
    canProcessEscapeKeyDown() {
        return this.closeOnEscape;
    }
    activatePopupContent() {
        this.dispatchEvent(new PopupKeyboardStrategyActivateEvent(this.initialVisibility));
    }
    renderTemplate() {
        return x `
            <dxbl-branch
                id="branch"
                branch-id="${this.branchId}"
                parent-branch-id="${this.parentBranchId}"
                type="${this.branchType}"
                style="${this.dragCssStyle}">
                <dxbl-window-root
                    id="root"
                    style="${this.rootCssStyle}"
                    ?resizing="${this.resizing}"
                    drop-opposite="${this.actualDropOpposite}"
                    drop-direction="${this.actualDropDirection}"
                    drop-alignment="${this.actualDropAlignment}">
                    ${this.renderDefaultSlot()}
                    ${this.renderAdditionalSlots()}
                    ${this.renderBridgeSlot()}
                </dxbl-window-root>
            </dxbl-branch>
        `;
    }
    raiseResizeCompleted(width, height) {
        this.sizeDirty = true;
        super.raiseResizeCompleted(width, height);
    }
    processCustomPlacement(childPoints, placementTargetPoints) {
        if (this.positionXDirty || this.positionYDirty || this.isInDragOperation || this.sizeDirty)
            return null;
        const options = this.showOptionsToApply;
        if (options) {
            const targetPoint = options.targetPoint || this.calcShowPoint(options);
            return [
                new CustomPopupPlacement(targetPoint, PopupPrimaryAxis.None, false, DropDirection.Near, DropAlignment.bottom)
            ];
        }
        return null;
    }
    calcShowPoint(options) {
        const viewPortElementClientRect = DxWindow_1.getPlacementTargetClientRect(options);
        const selfRect = this.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();
        const viewPortRect = window.visualViewport != null ? {
            x: 0,
            y: 0,
            width: window.visualViewport.width,
            height: window.visualViewport.height
        } : bodyRect;
        const rawX = this.calcShowXPoint(selfRect, viewPortElementClientRect);
        const rawY = this.calcShowYPoint(selfRect, viewPortElementClientRect);
        const maxX = viewPortRect.x + viewPortRect.width - selfRect.width;
        const maxY = viewPortRect.y + viewPortRect.height - selfRect.height;
        // 1. first of all - try to show entire footer: correctN = -Math.max(0, rawPoint.N - maxN) calculates required delta
        //    to fit entire footer in viewpoert's bottom-right boundary
        // 2. next step - ensure that header is shown entirely: Math.max(0, rawPoint.N + correctN) calculates min N
        //    to fit entire window in viewpoert's top-left boundary despite footer correction, since footer contains UI actions (close, drag etc)
        return new Point(Math.max(0, rawX + window.scrollX - Math.max(0, rawX - maxX)), Math.max(0, rawY + window.scrollY - Math.max(0, rawY - maxY)));
    }
    calcShowXPoint(selfRect, parentRect) {
        return Math.floor((() => {
            switch (this.horizontalAlignment) {
                case HorizontalAlignment.Left:
                    return parentRect.x;
                case HorizontalAlignment.Right:
                    return parentRect.x + parentRect.width - selfRect.width;
                case HorizontalAlignment.Center:
                    return parentRect.x + (parentRect.width / 2) - (selfRect.width / 2);
            }
            throw new Error("calcShowXPoint not supported for horizontalAlignment:" + this.horizontalAlignment);
        })());
    }
    calcShowYPoint(selfRect, parentRect) {
        return Math.floor((() => {
            switch (this.verticalAlignment) {
                case VerticalAlignment.Top:
                    return parentRect.y;
                case VerticalAlignment.Bottom:
                    return parentRect.y + parentRect.height - selfRect.height;
                case VerticalAlignment.Center:
                    return parentRect.y + (parentRect.height / 2) - (selfRect.height / 2);
            }
            throw new Error("calcShowYPoint not supported for horizontalAlignment:" + this.verticalAlignment);
        })());
    }
    updated(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("zIndex") && this.zIndex)
            this.raiseZIndexChange();
    }
    raiseZIndexChange() {
        this.updateComplete.then(value => {
            this.dispatchEvent(new PopupZIndexDeltaChangeEvent(new ZIndexDeltaChangeContext(this.zIndex)));
        });
    }
    createKeyboardNavigationStrategy() {
        return new PopupWindowKeyboardStrategy(this.keyboardNavigator, this, true);
    }
};
__decorate([
    n({ type: HorizontalAlignment, attribute: "horizontal-alignment", reflect: false })
], DxWindow.prototype, "horizontalAlignment", void 0);
__decorate([
    n({ type: HorizontalAlignment, attribute: "vertical-alignment", reflect: false })
], DxWindow.prototype, "verticalAlignment", void 0);
__decorate([
    n({ type: Number, attribute: "position-y", reflect: false })
], DxWindow.prototype, "positionY", null);
__decorate([
    n({ type: Number, attribute: "position-x", reflect: false })
], DxWindow.prototype, "positionX", null);
__decorate([
    n({ type: Boolean, attribute: "close-on-escape" })
], DxWindow.prototype, "closeOnEscape", void 0);
DxWindow = DxWindow_1 = __decorate([
    e(dxWindowTagName)
], DxWindow);

export { DxWindow };
//# sourceMappingURL=dxbl-window-24.2.js.map
