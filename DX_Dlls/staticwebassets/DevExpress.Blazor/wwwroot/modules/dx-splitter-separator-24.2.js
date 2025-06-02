import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { D as DraggingHelperBase } from './dragging-helper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { D as DxElementPointerEventsHelper, P as PointerDragStartEvent, c as PointerDragCancelEvent, a as PointerDragStopEvent, H as HandlePointerEventsMode, L as LongTapInteractionTimeout } from './dx-html-element-pointer-events-helper-24.2.js';
import { k as key } from './key-24.2.js';
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
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';

class SplitterCssClasses {
}
SplitterCssClasses.Splitter = CssClasses.Prefix + "-splitter";
SplitterCssClasses.SplitterButton = SplitterCssClasses.Splitter + "-button";

class SplitterSeparatorDraggedContext {
    constructor(prevPaneSize, nextPaneSize) {
        this.prevPaneSize = prevPaneSize;
        this.nextPaneSize = nextPaneSize;
    }
}
class SplitterSeparatorCollapseToggledContext {
    constructor(prevPaneSize, nextPaneSize) {
        this.prevPaneSize = prevPaneSize;
        this.nextPaneSize = nextPaneSize;
    }
}
class SplitterSeparatorDraggedEvent extends CustomEvent {
    constructor(detail) {
        super(SplitterSeparatorDraggedEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
SplitterSeparatorDraggedEvent.eventName = DxTagNames.Splitter + ".separator-dragged";
class SplitterSeparatorCollapseToggledEvent extends CustomEvent {
    constructor(detail) {
        super(SplitterSeparatorCollapseToggledEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
SplitterSeparatorCollapseToggledEvent.eventName = DxTagNames.Splitter + ".separator-collapse-toggled";
CustomEventsHelper.register(SplitterSeparatorDraggedEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(SplitterSeparatorCollapseToggledEvent.eventName, x => {
    return x.detail;
});

class DxSplitterResizeHelper {
    constructor(separator) {
        this.prevPaneInitialSizeValue = "";
        this.nextPaneInitialSizeValue = "";
        const splitter = separator.splitter;
        this._separator = separator;
        this._prevPane = separator.prevPane;
        this._nextPane = separator.nextPane;
        this._splitterInitialSize = !splitter.isVertical ? splitter.clientWidth : splitter.clientHeight;
        this._prevPaneInitialSize = this.getPaneVisibleSize(this._prevPane);
        this._nextPaneInitialSize = this.getPaneVisibleSize(this._nextPane);
        this.prevPaneInitialSizeValue = this._prevPane.size;
        this.nextPaneInitialSizeValue = this._nextPane.size;
    }
    cancel() {
        this._prevPane.size = this.prevPaneInitialSizeValue;
        this._nextPane.size = this.nextPaneInitialSizeValue;
    }
    stop() {
        if (this.accumulatedOffset === 0)
            this.cancel();
        else {
            const detail = new SplitterSeparatorDraggedContext(this._prevPane.size, this._nextPane.size);
            this._separator.dispatchEvent(new SplitterSeparatorDraggedEvent(detail));
        }
    }
    get accumulatedOffset() {
        return this.getPaneVisibleSize(this._prevPane) - this._prevPaneInitialSize;
    }
    resizePanes(offset) {
        const [previousMinOffset, previousMaxOffset] = this.calculatePreviousOffsetRange(this._prevPane, this._prevPaneInitialSize);
        const [nextMinOffset, nextMaxOffset] = this.calculateNextOffsetRange(this._nextPane, this._nextPaneInitialSize);
        const minOffset = Math.max(previousMinOffset, nextMinOffset);
        const maxOffset = Math.min(previousMaxOffset, nextMaxOffset);
        if (minOffset > maxOffset)
            return;
        offset = Math.min(maxOffset, Math.max(minOffset, offset));
        this.setPaneSize(this._prevPane, this._prevPaneInitialSize + offset);
        this.setPaneSize(this._nextPane, this._nextPaneInitialSize - offset);
    }
    calculatePreviousOffsetRange(pane, paneSize) {
        const [paneMinSize, paneMaxSize] = this.calculateMinMaxSizes(pane);
        return [
            paneMinSize - paneSize,
            paneMaxSize - paneSize
        ];
    }
    calculateNextOffsetRange(pane, paneSize) {
        const [paneMinSize, paneMaxSize] = this.calculateMinMaxSizes(pane);
        return [
            paneSize - paneMaxSize,
            paneSize - paneMinSize
        ];
    }
    calculateMinMaxSizes(pane) {
        return [
            !pane.minSize ? 0 : this.parseMinMaxSize(pane.minSize),
            !pane.maxSize ? this._splitterInitialSize : this.parseMinMaxSize(pane.maxSize)
        ];
    }
    parseMinMaxSize(sizeString) {
        const size = parseFloat(sizeString);
        return sizeString.includes("%") ? size * this._splitterInitialSize / 100 : size;
    }
    setPaneSize(pane, size) {
        pane.size = pane.size.includes("%") ?
            size / this._splitterInitialSize * 100 + "%" :
            size + "px";
    }
    getPaneVisibleSize(pane) {
        return !this._separator.splitter.isVertical ? pane.offsetWidth : pane.offsetHeight;
    }
}

class DxSplitterDragHelper extends DraggingHelperBase {
    cancel() {
        this.splitterDragContext.resizeHelper.cancel();
        super.stop();
    }
    stop() {
        this.splitterDragContext.resizeHelper.stop();
        super.stop();
    }
    getDraggableElement(srcElement) {
        return document.createElement("div");
    }
    hideDraggableElement() {
    }
    get splitterDragContext() {
        return this.draggableContext;
    }
    createDraggableContext(srcElement, draggableElement, pointerDownEvt) {
        const baseContext = super.createDraggableContext(srcElement, draggableElement, pointerDownEvt);
        const splitterSeparator = srcElement;
        return {
            ...baseContext,
            resizeHelper: new DxSplitterResizeHelper(splitterSeparator),
            isVertical: splitterSeparator.splitter.isVertical
        };
    }
    refreshUICore() {
        super.refreshUICore();
        if (!this.splitterDragContext)
            return;
        const cursorOffset = !this.splitterDragContext.isVertical ?
            this.splitterDragContext.currentCursorPosition.x - this.splitterDragContext.initialCursorPosition.x :
            this.splitterDragContext.currentCursorPosition.y - this.splitterDragContext.initialCursorPosition.y;
        this.splitterDragContext.resizeHelper.resizePanes(cursorOffset);
    }
}

var DxSplitterSeparator_1;
let DxSplitterSeparator = DxSplitterSeparator_1 = class DxSplitterSeparator extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this._resizeHelper = null;
        this.allowCollapse = false;
        this.allowResize = false;
        this._pointerEventsHelper = new DxElementPointerEventsHelper(this);
        this._dragStartHandler = this.onDragStart.bind(this);
        this._dragCancelHandler = this.onDragCancel.bind(this);
        this._dragStopHandler = this.onDragStop.bind(this);
        this._keyDownResizeHandler = this.onKeyDownResize.bind(this);
        this._keyUpResizeHandler = this.onKeyUpResize.bind(this);
        this._keyDownCollapseHandler = this.onKeyDownCollapse.bind(this);
        this._dblClickCollapseHandler = this.onDblClickCollapse.bind(this);
        // endregion
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.allowResize)
            this.disposeResizing();
        if (this.allowCollapse)
            this.disposeCollapsing();
    }
    updated(props) {
        super.updated(props);
        if (props.has("allowResize")) {
            if (this.allowResize)
                this.initializeResizing();
            else
                this.disposeResizing();
        }
        if (props.has("allowCollapse")) {
            if (this.allowCollapse)
                this.initializeCollapsing();
            else
                this.disposeCollapsing();
        }
    }
    get splitter() {
        return this.closest(DxTagNames.Splitter);
    }
    get prevPane() {
        return this.previousElementSibling;
    }
    get nextPane() {
        return this.nextElementSibling;
    }
    initializeResizing() {
        this._pointerEventsHelper.initialize();
        this.addEventListener(PointerDragStartEvent.eventName, this._dragStartHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this._dragCancelHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this._dragStopHandler);
        this.addEventListener("keydown", this._keyDownResizeHandler);
        this.addEventListener("keyup", this._keyUpResizeHandler);
    }
    disposeResizing() {
        this._pointerEventsHelper.dispose();
        this.removeEventListener(PointerDragStartEvent.eventName, this._dragStartHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this._dragCancelHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this._dragStopHandler);
        this.removeEventListener("keydown", this._keyDownResizeHandler);
        this.removeEventListener("keyup", this._keyUpResizeHandler);
    }
    initializeCollapsing() {
        this.addEventListener("keydown", this._keyDownCollapseHandler);
        this.addEventListener("dblclick", this._dblClickCollapseHandler);
    }
    disposeCollapsing() {
        this.removeEventListener("keydown", this._keyDownCollapseHandler);
        this.removeEventListener("dblclick", this._dblClickCollapseHandler);
    }
    onDragStart(evt) {
        DxSplitterSeparator_1.dragHelper.start(this, evt.detail.source);
        evt.stopPropagation();
    }
    onDragCancel(evt) {
        DxSplitterSeparator_1.dragHelper.cancel();
        evt.stopPropagation();
    }
    onDragStop(evt) {
        DxSplitterSeparator_1.dragHelper.stop();
        evt.stopPropagation();
    }
    onKeyDownResize(evt) {
        var _a;
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (!this.isArrow(keyCode))
            return;
        if (!this._resizeHelper)
            this._resizeHelper = new DxSplitterResizeHelper(this);
        if ((_a = this.splitter) === null || _a === void 0 ? void 0 : _a.isVertical) {
            if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Up) {
                this._resizeHelper.resizePanes(this._resizeHelper.accumulatedOffset - 5);
                evt.preventDefault();
            }
            else if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Down) {
                this._resizeHelper.resizePanes(this._resizeHelper.accumulatedOffset + 5);
                evt.preventDefault();
            }
        }
        else {
            if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Left) {
                this._resizeHelper.resizePanes(this._resizeHelper.accumulatedOffset - 5);
                evt.preventDefault();
            }
            else if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Right) {
                this._resizeHelper.resizePanes(this._resizeHelper.accumulatedOffset + 5);
                evt.preventDefault();
            }
        }
    }
    onKeyUpResize(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (!this.isArrow(keyCode))
            return;
        if (this._resizeHelper) {
            this._resizeHelper.stop();
            this._resizeHelper = null;
        }
    }
    onKeyDownCollapse(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Enter) {
            this.toggleCollapsed();
            evt.preventDefault();
        }
    }
    onDblClickCollapse(evt) {
        this.toggleCollapsed();
        evt.preventDefault();
    }
    toggleCollapsed() {
        var _a;
        const detail = ((_a = this.splitter) === null || _a === void 0 ? void 0 : _a.isVertical) ?
            new SplitterSeparatorCollapseToggledContext(this.prevPane.offsetHeight, this.nextPane.offsetHeight) :
            new SplitterSeparatorCollapseToggledContext(this.prevPane.offsetWidth, this.nextPane.offsetWidth);
        this.dispatchEvent(new SplitterSeparatorCollapseToggledEvent(detail));
    }
    isArrow(keyCode) {
        return keyCode === key.KeyCode.Left || keyCode === key.KeyCode.Up || keyCode === key.KeyCode.Right || keyCode === key.KeyCode.Down;
    }
    // region IDxHTMLElement
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        const target = evt.target;
        if (target.closest(SplitterCssClasses.SplitterButton))
            return false;
        return true;
    }
};
DxSplitterSeparator.dragHelper = new DxSplitterDragHelper();
__decorate([
    n({ type: Boolean, attribute: "allow-collapse" })
], DxSplitterSeparator.prototype, "allowCollapse", void 0);
__decorate([
    n({ type: Boolean, attribute: "allow-resize" })
], DxSplitterSeparator.prototype, "allowResize", void 0);
DxSplitterSeparator = DxSplitterSeparator_1 = __decorate([
    e(DxTagNames.SplitterSeparator)
], DxSplitterSeparator);

export { DxSplitterSeparator };
//# sourceMappingURL=dx-splitter-separator-24.2.js.map
