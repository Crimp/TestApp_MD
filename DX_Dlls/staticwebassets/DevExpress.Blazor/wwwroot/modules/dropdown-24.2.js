import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxPopup, B as BranchType, c as calculateSizeStyleAttributeToPx, a as DropDirection, b as DropAlignment, d as DropDownKeyboardStrategy, I as InterestPoint, P as PopupZIndexDeltaChangeEvent, Z as ZIndexDeltaChangeContext } from './popup-24.2.js';
import { ThumbDragStartedEvent, ThumbDragDeltaEvent, ThumbDragCompletedEvent } from './thumb-24.2.js';
import { P as Point } from './point-24.2.js';
import { L as LayoutHelper, D as DomHelper, R as RectHelper, a as Rect } from './layouthelper-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { i } from './query-24.2.js';
import { x } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './constants-24.2.js';
import './branch-24.2.js';
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
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';

const dxDropDownTagName = "dxbl-dropdown";
const dxDropDownThumbAttribute = "data-dropdown-thumb";
class DropDownSizeChangedEventContext {
    constructor(width, height) {
        this.width = Math.floor(width);
        this.height = Math.floor(height);
    }
}
class DropDownResizeStartedEvent extends CustomEvent {
    constructor(width, height) {
        super(DropDownResizeStartedEvent.eventName, {
            detail: new DropDownSizeChangedEventContext(width, height),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DropDownResizeStartedEvent.eventName = dxDropDownTagName + ".resizeStarted";
CustomEventsHelper.register(DropDownResizeStartedEvent.eventName, x => {
    return x.detail;
});
class DropDownResizeCompletedEvent extends CustomEvent {
    constructor(width, height) {
        super(DropDownResizeCompletedEvent.eventName, {
            detail: new DropDownSizeChangedEventContext(width, height),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DropDownResizeCompletedEvent.eventName = dxDropDownTagName + ".resizeCompleted";
CustomEventsHelper.register(DropDownResizeCompletedEvent.eventName, x => {
    return x.detail;
});
class DxDropDownBase extends DxPopup {
    constructor() {
        super(...arguments);
        this.dragStart = null;
        this.dragBounds = null;
        this.dragStartedHandler = this.handleDragStarted.bind(this);
        this.dragDeltaHandler = this.handleDragDelta.bind(this);
        this.dragCompletedHandler = this.handleDragCompleted.bind(this);
        this.dragWidth = 0;
        this.dragHeight = 0;
        this.dragMaxWidth = 0;
        this.dragMaxHeight = 0;
        this.isInDragOperation = false;
        this.dragCssStyle = null;
    }
    get branchType() {
        return BranchType.DropDown;
    }
    renderTemplate() {
        return x `
            <dxbl-branch
                id="branch"
                branch-id="${this.branchId}"
                parent-branch-id="${this.parentBranchId}"
                type="${this.branchType}"
                style="${this.dragCssStyle}">
                <dxbl-dropdown-root
                    id="root"
                    style="${this.rootCssStyle}"
                    ?resizing="${this.resizing}"
                    drop-opposite="${this.actualDropOpposite}"
                    drop-direction="${this.actualDropDirection}"
                    drop-alignment="${this.actualDropAlignment}">
                    ${this.renderDefaultSlot()}
                    ${this.renderAdditionalSlots()}
                    ${this.renderBridgeSlot()}
                </dxbl-dropdown-root>
            </dxbl-branch>
        `;
    }
    getRootTagName() {
        return "dxbl-dropdown-root";
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(ThumbDragStartedEvent.eventName, this.dragStartedHandler);
        this.addEventListener(ThumbDragDeltaEvent.eventName, this.dragDeltaHandler);
        this.addEventListener(ThumbDragCompletedEvent.eventName, this.dragCompletedHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(ThumbDragStartedEvent.eventName, this.dragStartedHandler);
        this.removeEventListener(ThumbDragDeltaEvent.eventName, this.dragDeltaHandler);
        this.removeEventListener(ThumbDragCompletedEvent.eventName, this.dragCompletedHandler);
    }
    get child() {
        return this.root;
    }
    handleDragStarted(e) {
        const target = EventHelper.getOriginalSource(e);
        if (!target)
            return;
        if (!target.hasAttribute(dxDropDownThumbAttribute))
            return;
        if (!this.child)
            return;
        this.lockPlacement();
        this.dragStart = new Point(e.detail.x, e.detail.y);
        const restrictBounds = this.getRestrictBounds();
        const interestPoints = this.getPlacementTargetInterestPoints(this.placement);
        const dropAlignment = this.actualDropAlignment;
        const dropDirection = this.actualDropDirection;
        const childBounds = LayoutHelper.getRelativeElementRect(this.child);
        this.dragBounds = this.calcResizeRect(restrictBounds, interestPoints, dropAlignment, dropDirection);
        this.dragMaxWidth = this.dragBounds.width;
        this.dragMaxHeight = this.dragBounds.height;
        this.isInDragOperation = true;
        this.dragWidth = childBounds.width;
        this.dragHeight = childBounds.height;
        this.raiseResizeStarted(this.dragWidth, this.dragHeight);
    }
    willUpdate(updated) {
        super.willUpdate(updated);
        this.dragCssStyle = this.isInDragOperation ? `width: ${DomHelper.toPx(this.dragWidth)}; height: ${DomHelper.toPx(this.dragHeight)}; max-width: ${DomHelper.toPx(this.dragMaxWidth)}; max-height: ${DomHelper.toPx(this.dragMaxHeight)};` : null;
    }
    updated(updated) {
        super.updated(updated);
        if (this.root.offsetWidth < this.root.scrollWidth)
            this.dragWidth = this.root.scrollWidth;
        if (this.root.offsetHeight < this.root.scrollHeight)
            this.dragHeight = this.root.scrollHeight;
    }
    handleDragDelta(e) {
        const target = EventHelper.getOriginalSource(e);
        if (!target)
            return;
        if (!target.hasAttribute(dxDropDownThumbAttribute))
            return;
        const width = Math.min(this.dragMaxWidth, this.actualDropDirection === DropDirection.Near ? e.detail.x - this.offset.x : this.offset.x + this.childSize.width - e.detail.x);
        const height = Math.min(this.dragMaxHeight, this.actualDropAlignment === DropAlignment.bottom ? e.detail.y - this.offset.y : this.offset.y + this.childSize.height - e.detail.y);
        const minWidth = calculateSizeStyleAttributeToPx(this.minWidth, this);
        const minHeight = calculateSizeStyleAttributeToPx(this.minHeight, this);
        this.dragWidth = minWidth ? (width > minWidth ? width : minWidth) : (width > 0 ? width : 0);
        this.dragHeight = minHeight ? (height > minHeight ? height : minHeight) : (height > 0 ? height : 0);
    }
    handleDragCompleted(e) {
        var _a, _b;
        const target = EventHelper.getOriginalSource(e);
        if (!target)
            return;
        if (!target.hasAttribute(dxDropDownThumbAttribute))
            return;
        this.isInDragOperation = false;
        this.dragWidth = (_a = this.branch.offsetWidth) !== null && _a !== void 0 ? _a : 0;
        this.dragHeight = (_b = this.branch.offsetHeight) !== null && _b !== void 0 ? _b : 0;
        this.desiredWidth = DomHelper.toPx(this.dragWidth);
        this.desiredHeight = DomHelper.toPx(this.dragHeight);
        this.unlockPlacement();
        this.raiseResizeCompleted(this.dragWidth, this.dragHeight);
    }
    calcResizeRect(restrictBounds, points, dropAlignment, dropDirection) {
        if (dropDirection === DropDirection.Near) {
            if (dropAlignment === DropAlignment.top) {
                const anchorPoint = points[InterestPoint.TopLeft];
                const restrictPoint = restrictBounds.topRight;
                return RectHelper.intersect(restrictBounds, Rect.createFromPoints(anchorPoint, restrictPoint));
            }
            else {
                const anchorPoint = points[InterestPoint.BottomLeft];
                const restrictPoint = restrictBounds.bottomRight;
                return RectHelper.intersect(restrictBounds, Rect.createFromPoints(anchorPoint, restrictPoint));
            }
        }
        if (dropAlignment === DropAlignment.top) {
            const anchorPoint = points[InterestPoint.TopRight];
            const restrictPoint = restrictBounds.topLeft;
            return RectHelper.intersect(restrictBounds, Rect.createFromPoints(anchorPoint, restrictPoint));
        }
        else {
            const anchorPoint = points[InterestPoint.BottomRight];
            const restrictPoint = restrictBounds.bottomLeft;
            return RectHelper.intersect(restrictBounds, Rect.createFromPoints(anchorPoint, restrictPoint));
        }
    }
    raiseResizeStarted(width, height) {
        this.dispatchEvent(new DropDownResizeStartedEvent(width, height));
    }
    raiseResizeCompleted(width, height) {
        this.dispatchEvent(new DropDownResizeCompletedEvent(width, height));
    }
    calcRenderWidth() {
        return this.isInDragOperation ? null : super.calcRenderWidth();
    }
    calcRenderHeight() {
        return this.isInDragOperation ? null : super.calcRenderHeight();
    }
    shouldUpdateRootCssStyle(updated) {
        return super.shouldUpdateRootCssStyle(updated)
            || updated.has("isInDragOperation")
            || updated.has("dragWidth")
            || updated.has("dragHeight")
            || updated.has("dragMaxWidth")
            || updated.has("dragMaxHeight");
    }
    createKeyboardNavigationStrategy() {
        return new DropDownKeyboardStrategy(this.keyboardNavigator, this);
    }
}
__decorate([
    i("#root", true)
], DxDropDownBase.prototype, "root", void 0);
__decorate([
    i("#branch")
], DxDropDownBase.prototype, "branch", void 0);
__decorate([
    n({ type: Number, reflect: false })
], DxDropDownBase.prototype, "dragWidth", void 0);
__decorate([
    n({ type: Number, reflect: false })
], DxDropDownBase.prototype, "dragHeight", void 0);
__decorate([
    n({ type: Number, reflect: false })
], DxDropDownBase.prototype, "dragMaxWidth", void 0);
__decorate([
    n({ type: Number, reflect: false })
], DxDropDownBase.prototype, "dragMaxHeight", void 0);
__decorate([
    n({ type: Boolean, reflect: false })
], DxDropDownBase.prototype, "isInDragOperation", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxDropDownBase.prototype, "dragCssStyle", void 0);
let DxDropDown = class DxDropDown extends DxDropDownBase {
    updated(changedProperties) {
        if (changedProperties.has("zIndex") && this.zIndex)
            this.raiseZIndexChange();
        super.updated(changedProperties);
    }
    raiseZIndexChange() {
        this.updateComplete.then(value => {
            this.dispatchEvent(new PopupZIndexDeltaChangeEvent(new ZIndexDeltaChangeContext(this.zIndex)));
        });
    }
};
DxDropDown = __decorate([
    e(dxDropDownTagName)
], DxDropDown);
function getReference(reference) {
    if (!reference)
        throw new Error("failed");
    return reference;
}
const dropdown = { getReference, dxDropDownTagName, DxDropDownBase };

export { DropDownResizeCompletedEvent, DropDownResizeStartedEvent, DxDropDownBase, dropdown as default, dxDropDownTagName, dxDropDownThumbAttribute, getReference };
//# sourceMappingURL=dropdown-24.2.js.map
