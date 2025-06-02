import { P as Point, a as PointHelper } from './point-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { b as browser } from './browser-24.2.js';
import './_commonjsHelpers-24.2.js';

const dxThumbTagName = "dxbl-thumb";
// const thumbDraggingClassName = "dxbs-thumb-dragging";
class DragContext {
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get source() {
        return this._source;
    }
    constructor(x, y, source) {
        this._source = source;
        this._y = y;
        this._x = x;
    }
}
class DragDeltaContext extends DragContext {
    get deltaX() {
        return this.deltaXField;
    }
    get deltaY() {
        return this.deltaYField;
    }
    constructor(deltaX, deltaY, x, y, source) {
        super(x, y, source);
        this.deltaXField = deltaX;
        this.deltaYField = deltaY;
    }
}
class ThumbDragEvent extends CustomEvent {
    constructor(eventName, detail) {
        super(eventName, {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        });
    }
}
class ThumbDragStartedEvent extends ThumbDragEvent {
    constructor(detail) {
        super(ThumbDragStartedEvent.eventName, detail);
    }
}
ThumbDragStartedEvent.eventName = "dxthumbdragstarted";
class ThumbDragDeltaEvent extends ThumbDragEvent {
    constructor(detail) {
        super(ThumbDragDeltaEvent.eventName, detail);
    }
}
ThumbDragDeltaEvent.eventName = "dxthumbdragdelta";
class ThumbDragCompletedEvent extends ThumbDragEvent {
    constructor(detail) {
        super(ThumbDragCompletedEvent.eventName, detail);
    }
}
ThumbDragCompletedEvent.eventName = "dxthumbdragcompleted";
// T1198363: prevents dispatching a click to a hovered element outside the thumb area when its dragging ends in Firefox
class DxThumbFirefoxOutsideClickHandler {
    constructor(thumb) {
        this.outsideClickHandler = this.handleOutsideClick.bind(this);
        this.thumbElement = thumb;
    }
    preventOutsideClick(args) {
        if (browser.Browser.Firefox && args.button === 0)
            document.addEventListener("click", this.outsideClickHandler, { capture: true, once: true });
    }
    cancelOutsideClickPrevention() {
        document.removeEventListener("click", this.outsideClickHandler, { capture: true });
    }
    handleOutsideClick(args) {
        const hoveredElement = document.elementFromPoint(args.clientX, args.clientY);
        if (hoveredElement !== this.thumbElement)
            EventHelper.markHandled(args);
    }
}
class DxThumb extends HTMLElement {
    constructor() {
        super(...arguments);
        this.pointerDownHandler = this.handlePointerDown.bind(this);
        this.pointerUpHandler = this.handlePointerUp.bind(this);
        this.pointerLostCaptureHandler = this.lostPointerCapture.bind(this);
        this.pointerGotCaptureHandler = this.pointerGotCapture.bind(this);
        this.pointerMoveHandler = this.pointerMove.bind(this);
        this.pointerCancelHandler = this.pointerCancel.bind(this);
        this.touchStartHandler = this.touchStart.bind(this);
        this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
        this._isDragging = false;
        this._isCaptured = false;
        this.capturedPointer = null;
        this.previousPoint = new Point(0, 0);
        this.firefoxOutsideClickHandler = new DxThumbFirefoxOutsideClickHandler(this);
    }
    connectedCallback() {
        DataQaUtils.setLoaded(this);
        this.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
        this.addEventListener("pointerup", this.pointerUpHandler, { capture: true });
        this.addEventListener("lostpointercapture", this.pointerLostCaptureHandler, { capture: true });
        this.addEventListener("gotpointercapture", this.pointerGotCaptureHandler, { capture: true });
        this.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
        this.addEventListener("pointercancel", this.pointerCancelHandler, { capture: true });
        this.addEventListener("touchstart", this.touchStartHandler, { capture: true, passive: false });
        document.addEventListener("visibilitychange", this.visibilityChangeHandler);
    }
    disconnectedCallback() {
        DataQaUtils.removeLoaded(this);
        this.removeEventListener("pointerdown", this.pointerDownHandler);
        this.removeEventListener("pointerup", this.pointerUpHandler);
        this.removeEventListener("lostpointercapture", this.pointerLostCaptureHandler);
        this.removeEventListener("gotpointercapture", this.pointerGotCaptureHandler);
        this.removeEventListener("pointermove", this.pointerMoveHandler);
        this.removeEventListener("pointercancel", this.pointerCancelHandler);
        this.removeEventListener("touchstart", this.touchStartHandler);
        document.removeEventListener("visibilitychange", this.visibilityChangeHandler);
        this.firefoxOutsideClickHandler.cancelOutsideClickPrevention();
    }
    get isDragging() {
        return this._isDragging;
    }
    get isCaptured() {
        return this._isCaptured;
    }
    cancelDrag(args = null) {
        if (this.isDragging) {
            this._isDragging = false;
            if (args)
                this.releaseCapture(args.pointerId);
            else if (this.capturedPointer)
                this.releaseCapture(this.capturedPointer);
            DataQaUtils.removeAttribute(this, DxThumb.dragging);
            const point = args ? new Point(args.pageX, args.pageY) : this.previousPoint;
            const dragCompletedEvent = new ThumbDragCompletedEvent(new DragContext(point.x, point.y, args));
            this.dispatchEvent(dragCompletedEvent);
        }
    }
    markHandled(args) {
        args.preventDefault();
        args.stopPropagation();
        args.stopImmediatePropagation();
    }
    handleVisibilityChange(args) {
        if (!this.isDragging || document.visibilityState === "visible")
            return;
        this.cancelDrag();
    }
    touchStart(args) {
        if (!this.isDragging)
            return;
        if (args.cancelable)
            args.preventDefault();
    }
    pointerGotCapture(args) {
        if (args.target === this)
            return;
        if (!this.isDragging)
            return;
        const target = args.target;
        target === null || target === void 0 ? void 0 : target.releasePointerCapture(args.pointerId);
        this._isCaptured = false;
        this.pointerCapture(args);
    }
    pointerCancel(args) {
        if (args.target !== this)
            return;
        if (!this.hasPointerCapture(args.pointerId))
            this.cancelDrag(args);
    }
    pointerCapture(pointerArgs) {
        if (this._isCaptured)
            return;
        this.setPointerCapture(pointerArgs.pointerId);
        this._isCaptured = true;
        this.capturedPointer = pointerArgs.pointerId;
    }
    releaseCapture(pointerId) {
        if (!this._isCaptured)
            return;
        this.releasePointerCapture(pointerId);
        this._isCaptured = false;
        this.capturedPointer = null;
    }
    handlePointerDown(args) {
        if (this.isDragging)
            return;
        const target = args.target;
        if (target === null || target === void 0 ? void 0 : target.hasPointerCapture(args.pointerId))
            target.releasePointerCapture(args.pointerId);
        DataQaUtils.setAttribute(this, DxThumb.dragging);
        EventHelper.markHandled(args);
        this.focus();
        this.pointerCapture(args);
        this._isDragging = true;
        this.previousPoint = new Point(args.pageX, args.pageY);
        const event = new ThumbDragStartedEvent(new DragContext(args.pageX, args.pageY, args));
        this.dispatchEvent(event);
        this.firefoxOutsideClickHandler.preventOutsideClick(args);
    }
    handlePointerUp(args) {
        if (this.isDragging && this.isCaptured) {
            EventHelper.markHandled(args);
            this.cancelDrag(args);
        }
    }
    lostPointerCapture(args) {
        if (args.target !== this)
            return;
        if (!this.hasPointerCapture(args.pointerId))
            this.cancelDrag(args);
    }
    pointerMove(args) {
        if (this.isDragging && args.isPrimary)
            this.processMove(args);
    }
    processMove(args) {
        const current = new Point(args.pageX, args.pageY);
        if (!PointHelper.areClose(current, this.previousPoint)) {
            EventHelper.markHandled(args);
            const event = new ThumbDragDeltaEvent(new DragDeltaContext(current.x - this.previousPoint.x, current.y - this.previousPoint.y, args.pageX, args.pageY, args));
            this.dispatchEvent(event);
            this.previousPoint = current;
        }
    }
}
DxThumb.dragging = "dragging";
customElements.define(dxThumbTagName, DxThumb);
function init() {
}
const thumb = { init, dxThumbTagName, ThumbDragStartedEvent, ThumbDragDeltaEvent, ThumbDragCompletedEvent, DragContext };

export { DragContext, DragDeltaContext, DxThumb, ThumbDragCompletedEvent, ThumbDragDeltaEvent, ThumbDragEvent, ThumbDragStartedEvent, thumb as default, dxThumbTagName, init };
//# sourceMappingURL=thumb-24.2.js.map
