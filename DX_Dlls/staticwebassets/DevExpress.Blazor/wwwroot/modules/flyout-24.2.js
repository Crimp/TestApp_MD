import { _ as __decorate } from './tslib.es6-24.2.js';
import { C as CustomPopupPlacement, D as DxPopup, B as BranchType, e as PlacementMode, f as PopupPrimaryAxis, a as DropDirection, b as DropAlignment, V as Vector, F as FlyoutArrowAlignment, g as DxFlyoutDialog, h as FlyoutKeyboardStrategy } from './popup-24.2.js';
import { P as Point } from './point-24.2.js';
import { b as Range } from './layouthelper-24.2.js';
import { x } from './lit-element-24.2.js';
import { i } from './query-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './constants-24.2.js';
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

var DxFlyout_1;
var FlyoutPosition;
(function (FlyoutPosition) {
    FlyoutPosition[FlyoutPosition["TopStart"] = 1] = "TopStart";
    FlyoutPosition[FlyoutPosition["Top"] = 2] = "Top";
    FlyoutPosition[FlyoutPosition["TopEnd"] = 4] = "TopEnd";
    FlyoutPosition[FlyoutPosition["RightStart"] = 8] = "RightStart";
    FlyoutPosition[FlyoutPosition["Right"] = 16] = "Right";
    FlyoutPosition[FlyoutPosition["RightEnd"] = 32] = "RightEnd";
    FlyoutPosition[FlyoutPosition["BottomStart"] = 64] = "BottomStart";
    FlyoutPosition[FlyoutPosition["Bottom"] = 128] = "Bottom";
    FlyoutPosition[FlyoutPosition["BottomEnd"] = 256] = "BottomEnd";
    FlyoutPosition[FlyoutPosition["LeftStart"] = 512] = "LeftStart";
    FlyoutPosition[FlyoutPosition["Left"] = 1024] = "Left";
    FlyoutPosition[FlyoutPosition["LeftEnd"] = 2048] = "LeftEnd";
})(FlyoutPosition || (FlyoutPosition = {}));
class CustomFlyoutPlacement extends CustomPopupPlacement {
    constructor(flyoutPosition, point, axis, dropOpposite, dropDirection, dropAlignment) {
        super(point, axis, dropOpposite, dropDirection, dropAlignment);
        this.flyoutPosition = flyoutPosition;
    }
}
const dxFlyoutTagName = "dxbl-flyout";
let DxFlyout = DxFlyout_1 = class DxFlyout extends DxPopup {
    get actualDistance() {
        var _a;
        return (_a = this.flyoutDistance) !== null && _a !== void 0 ? _a : 2;
    }
    get actualOffset() {
        var _a;
        return (_a = this.flyoutOffset) !== null && _a !== void 0 ? _a : 0;
    }
    get branchType() {
        return BranchType.DropDown;
    }
    constructor() {
        super();
        this.slotChangedHandler = this.handleSlotChange.bind(this);
        this.dialog = null;
        this.flyoutDistance = null;
        this.flyoutOffset = null;
        this.calcStartAlignment = () => 0;
        this.calcEndAlignment = (childSize, targetSize) => targetSize - childSize;
        this.calcAlignment = (childSize, targetSize) => targetSize / 2 - childSize / 2;
        this.placement = PlacementMode.Custom;
        this.fitToRestriction = true;
        this.flyoutPosition = 0;
    }
    get child() {
        return this.root;
    }
    processCustomPlacement(childPoints, placementTargetPoints) {
        return this.calcCustomPlacements(childPoints, placementTargetPoints);
    }
    calcCustomPlacements(childPoints, targetPoints) {
        const result = [];
        if (!this.dialog || !this.dialog.arrow)
            return result;
        const targetBounds = this.getBounds(targetPoints);
        const childBounds = this.getBounds(childPoints);
        const arrowSize = this.dialog.arrow.arrowSize;
        if (this.flyoutPosition & FlyoutPosition.Bottom)
            result.push(this.calcBottomPlacement(targetBounds, arrowSize, this.calcAlignment(childBounds.width, targetBounds.width), FlyoutPosition.Bottom));
        if (this.flyoutPosition & FlyoutPosition.BottomStart)
            result.push(this.calcBottomPlacement(targetBounds, arrowSize, this.calcStartAlignment(), FlyoutPosition.BottomStart));
        if (this.flyoutPosition & FlyoutPosition.BottomEnd)
            result.push(this.calcBottomPlacement(targetBounds, arrowSize, this.calcEndAlignment(childBounds.width, targetBounds.width), FlyoutPosition.BottomEnd));
        if (this.flyoutPosition & FlyoutPosition.Top)
            result.push(this.calcTopPlacement(childBounds, arrowSize, this.calcAlignment(childBounds.width, targetBounds.width), FlyoutPosition.Top));
        if (this.flyoutPosition & FlyoutPosition.TopStart)
            result.push(this.calcTopPlacement(childBounds, arrowSize, this.calcStartAlignment(), FlyoutPosition.TopStart));
        if (this.flyoutPosition & FlyoutPosition.TopEnd)
            result.push(this.calcTopPlacement(childBounds, arrowSize, this.calcEndAlignment(childBounds.width, targetBounds.width), FlyoutPosition.TopEnd));
        if (this.flyoutPosition & FlyoutPosition.Left)
            result.push(this.calcLeftPlacement(childBounds, arrowSize, this.calcAlignment(childBounds.height, targetBounds.height), FlyoutPosition.Left));
        if (this.flyoutPosition & FlyoutPosition.LeftStart)
            result.push(this.calcLeftPlacement(childBounds, arrowSize, this.calcStartAlignment(), FlyoutPosition.LeftStart));
        if (this.flyoutPosition & FlyoutPosition.LeftEnd)
            result.push(this.calcLeftPlacement(childBounds, arrowSize, this.calcEndAlignment(childBounds.height, targetBounds.height), FlyoutPosition.LeftEnd));
        if (this.flyoutPosition & FlyoutPosition.Right)
            result.push(this.calcRightPlacement(targetBounds, arrowSize, this.calcAlignment(childBounds.height, targetBounds.height), FlyoutPosition.Right));
        if (this.flyoutPosition & FlyoutPosition.RightStart)
            result.push(this.calcRightPlacement(targetBounds, arrowSize, this.calcStartAlignment(), FlyoutPosition.RightStart));
        if (this.flyoutPosition & FlyoutPosition.RightEnd)
            result.push(this.calcRightPlacement(targetBounds, arrowSize, this.calcEndAlignment(childBounds.height, targetBounds.height), FlyoutPosition.RightEnd));
        return result;
    }
    // Dialog Placement
    calcLeftPlacement(child, arrowSize, alignment, flyoutPosition) {
        const hgrow = this.actualDistance;
        const voffset = this.actualOffset;
        const pt = new Point(-child.width - arrowSize.width - hgrow, alignment + voffset);
        return new CustomFlyoutPlacement(flyoutPosition, pt, PopupPrimaryAxis.Horizontal, true, /* horz-left */ DropDirection.Near, DropAlignment.bottom);
    }
    calcTopPlacement(child, arrowSize, alignment, flyoutPosition) {
        const vgrow = this.actualDistance;
        const hoffset = this.actualOffset;
        const pt = new Point(alignment + hoffset, -child.height - arrowSize.height - vgrow);
        return new CustomFlyoutPlacement(flyoutPosition, pt, PopupPrimaryAxis.Vertical, true, DropDirection.Near, /* vert-top */ DropAlignment.top);
    }
    calcRightPlacement(target, arrowSize, alignment, flyoutPosition) {
        const hgrow = this.actualDistance;
        const voffset = this.actualOffset;
        const pt = new Point(target.width + arrowSize.width + hgrow, alignment + voffset);
        return new CustomFlyoutPlacement(flyoutPosition, pt, PopupPrimaryAxis.Horizontal, false, /* horz-right */ DropDirection.Far, DropAlignment.bottom);
    }
    calcBottomPlacement(target, arrowSize, alignment, flyoutPosition) {
        const vgrow = this.actualDistance;
        const hoffset = this.actualOffset;
        const pt = new Point(alignment + hoffset, target.height + arrowSize.height + vgrow);
        return new CustomFlyoutPlacement(flyoutPosition, pt, PopupPrimaryAxis.Vertical, false, DropDirection.Near, /* vert-top */ DropAlignment.bottom);
    }
    //
    processBestTranslationResults(bestTranslation, childBounds, targetBounds, screenBounds, bestDropOpposite, bestDropDirection, bestDropAlignment, bestAxis, bestCustomPlacement) {
        super.processBestTranslationResults(bestTranslation, childBounds, targetBounds, screenBounds, bestDropOpposite, bestDropDirection, bestDropAlignment, bestAxis, bestCustomPlacement);
        if (!this.dialog || !this.dialog.arrow)
            return;
        const arrowAlignment = this.calcArrowAlignment(bestDropDirection, bestDropAlignment, bestAxis);
        this.dialog.arrowAlignment = arrowAlignment;
        const arrow = this.dialog.arrow;
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        arrow.position = this.getArrowPosition(arrow, childBounds, targetBounds, screenBounds, bestAxis, bestCustomPlacement === null || bestCustomPlacement === void 0 ? void 0 : bestCustomPlacement.flyoutPosition);
        arrow.alignment = arrowAlignment;
    }
    // Arrow Placement
    getArrowPosition(arrow, childBounds, targetBounds, screenBounds, axis, flyoutPosition) {
        const isVertical = axis === PopupPrimaryAxis.Vertical;
        const arrowSizeValue = isVertical ? arrow.arrowSize.width : arrow.arrowSize.height;
        const targetRange = Range.rectToRange(targetBounds, isVertical);
        const childRange = Range.rectToRange(childBounds, isVertical);
        const screenRange = Range.rectToRange(screenBounds, isVertical);
        let realChildStart = childRange.start;
        let realChildEnd = childRange.end;
        if (this.fitToRestriction) {
            if (childRange.start <= screenRange.start) {
                realChildStart = screenRange.start;
                realChildEnd = realChildStart + childRange.size;
            }
            else if (childRange.end >= screenRange.end) {
                realChildStart = screenRange.end - childRange.size;
                realChildEnd = realChildStart + childRange.size;
            }
        }
        const [startBounds, endBounds] = [Math.max(realChildStart, targetRange.start), Math.min(realChildEnd, targetRange.end)];
        let desiredPoint;
        if (flyoutPosition & (FlyoutPosition.RightStart | FlyoutPosition.RightEnd | FlyoutPosition.LeftStart | FlyoutPosition.LeftEnd))
            desiredPoint = targetRange.start;
        else
            desiredPoint = targetRange.start + targetRange.size / 2;
        const positionWithinBoundaries = this.alignWithinBoundaries(desiredPoint - arrowSizeValue / 2, startBounds, endBounds);
        const childOffsetFromEdge = this.calculateArrowOffsetFromEdge(targetRange, arrowSizeValue, childRange);
        return isVertical
            ? new Vector(Math.min(Math.max(positionWithinBoundaries - realChildStart, childOffsetFromEdge), childBounds.width - childOffsetFromEdge - arrowSizeValue), 0)
            : new Vector(0, Math.min(Math.max(positionWithinBoundaries - realChildEnd, childOffsetFromEdge - childBounds.height), -childOffsetFromEdge - arrowSizeValue));
    }
    calcArrowAlignment(dropDirection, dropAlignment, axis) {
        if (axis === PopupPrimaryAxis.Vertical)
            return dropAlignment === DropAlignment.bottom ? FlyoutArrowAlignment.bottom : FlyoutArrowAlignment.top;
        else
            return dropDirection === DropDirection.Near ? FlyoutArrowAlignment.start : FlyoutArrowAlignment.end;
    }
    alignWithinBoundaries(value, near, far) {
        if (near >= far)
            return (near + far) / 2;
        return Math.min(Math.max(value, near), far);
    }
    calculateArrowOffsetFromEdge(targetRange, arrowSizeValue, childRange) {
        const targetRequiredOffset = Math.min(targetRange.size - arrowSizeValue, targetRange.size / 2 - arrowSizeValue / 2);
        return Math.max(DxFlyout_1.DefaultArrowOffsetFromEdge, Math.min(targetRequiredOffset, childRange.size * 0.2));
    }
    //
    renderTemplate() {
        return x `
            <dxbl-branch
                id="branch"
                branch-id="${this.branchId}"
                parent-branch-id="${this.parentBranchId}"
                type="${BranchType.Flyout}">
                <dxbl-flyout-root
                    id="root"
                    style="${this.rootCssStyle}">
                    ${this.renderDefaultSlot()}
                    ${this.renderBridgeSlot()}
                </dxbl-flyout-root>
            </dxbl-branch>
        `;
    }
    renderDefaultSlot() {
        return x `<slot @slotchange="${this.slotChangedHandler}"></slot>`;
    }
    handleSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this.dialog = elements.find(x => x instanceof DxFlyoutDialog);
        if (this.dialog)
            this.dialog.animationEnabled = this.animationEnabled;
        this.reposition();
    }
    updated(updated) {
        super.updated(updated);
        if (this.dialog && updated.has("animationEnabled"))
            this.dialog.animationEnabled = this.animationEnabled;
    }
    createKeyboardNavigationStrategy() {
        return new FlyoutKeyboardStrategy(this.keyboardNavigator, this);
    }
};
DxFlyout.DefaultArrowOffsetFromEdge = 8;
__decorate([
    i("#root", true)
], DxFlyout.prototype, "root", void 0);
__decorate([
    n({ type: Number, attribute: "flyout-position" })
], DxFlyout.prototype, "flyoutPosition", void 0);
__decorate([
    n({ type: Number, attribute: "flyout-distance" })
], DxFlyout.prototype, "flyoutDistance", void 0);
__decorate([
    n({ type: Number, attribute: "flyout-offset" })
], DxFlyout.prototype, "flyoutOffset", void 0);
DxFlyout = DxFlyout_1 = __decorate([
    e(dxFlyoutTagName)
], DxFlyout);
const flyout = { DxFlyout, dxFlyoutTagName };

export { CustomFlyoutPlacement, DxFlyout, FlyoutPosition, flyout as default, dxFlyoutTagName };
//# sourceMappingURL=flyout-24.2.js.map
