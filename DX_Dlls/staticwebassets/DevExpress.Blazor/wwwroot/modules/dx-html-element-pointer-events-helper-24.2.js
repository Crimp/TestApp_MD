import { d as dom } from './dom-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { A as Attribute, a as TextOverflow, D as Display } from './constants-24.2.js';
import { D as DeviceHelper } from './devices-24.2.js';

const TapInteractionTimeout = 100;
const LongTapInteractionTimeout = 500;
const TouchDistanceLimit = 4;
var HandlePointerEventsMode;
(function (HandlePointerEventsMode) {
    HandlePointerEventsMode[HandlePointerEventsMode["None"] = 0] = "None";
    HandlePointerEventsMode[HandlePointerEventsMode["Click"] = 1] = "Click";
    HandlePointerEventsMode[HandlePointerEventsMode["DblClick"] = 2] = "DblClick";
    HandlePointerEventsMode[HandlePointerEventsMode["Dragging"] = 4] = "Dragging";
})(HandlePointerEventsMode || (HandlePointerEventsMode = {}));
var PointerInteractionState;
(function (PointerInteractionState) {
    PointerInteractionState[PointerInteractionState["Stopped"] = 0] = "Stopped";
    PointerInteractionState[PointerInteractionState["WaitingForDragging"] = 1] = "WaitingForDragging";
    PointerInteractionState[PointerInteractionState["Dragging"] = 2] = "Dragging";
})(PointerInteractionState || (PointerInteractionState = {}));
class PointerDragStartEvent extends CustomEvent {
    constructor(detail) {
        super(PointerDragStartEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PointerDragStartEvent.eventName = "dxpointerdragstart";
class PointerDragStopEvent extends CustomEvent {
    constructor(detail) {
        super(PointerDragStopEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PointerDragStopEvent.eventName = "dxpointerdragstop";
class PointerDragCancelEvent extends Event {
    constructor() {
        super(PointerDragCancelEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
PointerDragCancelEvent.eventName = "dxpointerdragcancel";
class PointerClickEvent extends CustomEvent {
    constructor(detail) {
        super(PointerClickEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PointerClickEvent.eventName = "dxclick";
class PointerDblClickEvent extends CustomEvent {
    constructor(detail) {
        super(PointerDblClickEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PointerDblClickEvent.eventName = "dxdblclick";

class PointerEventHelper {
    static containsInComposedPath(event, element) {
        const composed = event.composedPath();
        for (const index in composed) {
            if (composed[index] === element)
                return true;
        }
        return false;
    }
}
const changeTitleVisibilityOnPointerOver = function (evt, hoverTitleElementsSelector, bypassNonInlineHoverTitleElementChildSelector = null) {
    const element = evt.target;
    if (!requireTitleIfElementTruncated(element, hoverTitleElementsSelector, bypassNonInlineHoverTitleElementChildSelector))
        return;
    if (element.offsetWidth < element.scrollWidth) {
        element.setAttribute(Attribute.title, element.innerText);
        element.setAttribute(Attribute.textTrimmed, "");
    }
    else {
        element.removeAttribute(Attribute.title);
        element.removeAttribute(Attribute.textTrimmed);
    }
};
const requireTitleIfElementTruncated = function (element, hoverTitleElementsSelector, bypassNonInlineHoverTitleElementChildSelector = null) {
    if (!element || !element.matches(hoverTitleElementsSelector))
        return false;
    if (getComputedStyle(element).textOverflow !== TextOverflow.ellipsis)
        return false;
    if (!elementHasOnlyInlineContent(element, bypassNonInlineHoverTitleElementChildSelector))
        return false;
    if (!element.hasAttribute(Attribute.textTrimmed) && element.getAttribute(Attribute.title))
        return false;
    return true;
};
const elementHasOnlyInlineContent = function (element, bypassNonInlineHoverTitleElementChildSelector = null) {
    for (let i = 0; i < element.children.length; i++) {
        if (getComputedStyle(element.children[i]).display !== Display.inline && !(bypassNonInlineHoverTitleElementChildSelector && element.children[i].matches(bypassNonInlineHoverTitleElementChildSelector)))
            return false;
    }
    return true;
};

class DxElementPointerEventsHelper {
    constructor(element) {
        this.boundOnPointerDownHandler = this.onPointerDown.bind(this);
        this.boundOnPointerMoveHandler = this.onPointerMove.bind(this);
        this.boundOnPointerUpHandler = this.onPointerUp.bind(this);
        this.boundOnPointerCancelHandler = this.onPointerCancel.bind(this);
        this.boundOnDraggingKeyDownHandler = this.onDraggingKeyDown.bind(this);
        this.boundOnDraggingWindowBlurHandler = this.onDraggingWindowBlur.bind(this);
        this.boundOnDraggingContextMenuHandler = this.onDraggingContextMenu.bind(this);
        this.boundOnGotPointerCaptureHandler = this.onGotPointerCapture.bind(this);
        this.boundOnPointerClickHandler = this.onPointerClick.bind(this);
        this.boundOnPointerDblClickHandler = this.onPointerDblClick.bind(this);
        this.element = element;
        this.state = PointerInteractionState.Stopped;
        const hoverTitleElementsSelector = element.hoverTitleElementsSelector;
        const bypassNonInlineHoverTitleElementChildSelector = element.bypassNonInlineHoverTitleElementChildSelector;
        if (hoverTitleElementsSelector && DeviceHelper.isHoverableDevice())
            this.boundOnPointerOverHandler = (el) => changeTitleVisibilityOnPointerOver(el, hoverTitleElementsSelector, bypassNonInlineHoverTitleElementChildSelector);
    }
    initialize() {
        this.addPointerEventsSubscriptions();
    }
    dispose() {
        this.removePointerEventsSubscriptions();
    }
    reinitialize(newElement) {
        this.removePointerEventsSubscriptions();
        this.element = newElement;
        this.addPointerEventsSubscriptions();
    }
    static preventDefaultBrowserBehaviour(evt) {
        if (evt.cancelable)
            evt.preventDefault();
    }
    onGotPointerCapture(evt) {
        if (!this.shouldProcessPointerEvent(evt))
            return;
        if (!this.pointerDownContext || !this.pointerDownContext.isLongTap && this.state !== PointerInteractionState.WaitingForDragging)
            return;
        const targetElement = evt.target;
        if (targetElement && targetElement.hasPointerCapture(evt.pointerId))
            targetElement.releasePointerCapture(evt.pointerId);
    }
    get handlePointerEventsMode() {
        return this.element.handlePointerEventsMode;
    }
    get handlePointerEventsTarget() {
        var _a;
        return (_a = this.element) === null || _a === void 0 ? void 0 : _a.handlePointerEventsTarget;
    }
    get handlePointerEventsDelay() {
        return this.element.handlePointerEventsDelay;
    }
    shouldProcessPointerEvent(evt) {
        return EventHelper.containsInComposedPath(evt, t => t === this.handlePointerEventsTarget) &&
            this.element.shouldProcessPointerEvent(evt);
    }
    addPointerEventsSubscriptions() {
        const eventsTarget = this.handlePointerEventsTarget;
        if (!eventsTarget)
            return;
        if (this.element !== eventsTarget && this.element.contains(eventsTarget))
            throw new Error("Specify the handlePointerEventsTarget property as web component or it parent.");
        eventsTarget.addEventListener("click", this.boundOnPointerClickHandler);
        eventsTarget.addEventListener("dblclick", this.boundOnPointerDblClickHandler);
        eventsTarget.addEventListener("pointerdown", this.boundOnPointerDownHandler);
        eventsTarget.addEventListener("gotpointercapture", this.boundOnGotPointerCaptureHandler);
        if (this.boundOnPointerOverHandler)
            eventsTarget.addEventListener("pointerover", this.boundOnPointerOverHandler);
    }
    removePointerEventsSubscriptions() {
        const eventsTarget = this.handlePointerEventsTarget;
        if (!eventsTarget)
            return;
        eventsTarget.removeEventListener("click", this.boundOnPointerClickHandler);
        eventsTarget.removeEventListener("dblclick", this.boundOnPointerDblClickHandler);
        eventsTarget.removeEventListener("pointerdown", this.boundOnPointerDownHandler);
        eventsTarget.removeEventListener("gotpointercapture", this.boundOnGotPointerCaptureHandler);
        if (this.boundOnPointerOverHandler)
            eventsTarget.removeEventListener("pointerover", this.boundOnPointerOverHandler);
    }
    onPointerDown(evt) {
        var _a;
        DxElementPointerEventsHelper.preventClickEvent = false;
        if (!this.shouldProcessPointerEvent(evt))
            return;
        const isTouch = evt.pointerType === "touch";
        if (isTouch && this.state === PointerInteractionState.Dragging)
            return;
        this.pointerDownContext = {
            source: evt,
            isTouch: isTouch,
            isLongTap: false
        };
        if ((this.handlePointerEventsMode & HandlePointerEventsMode.Dragging) === 0) {
            if (evt.shiftKey)
                (_a = document === null || document === void 0 ? void 0 : document.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
            return;
        }
        if (evt.button !== 0)
            return;
        this.state = PointerInteractionState.WaitingForDragging;
        if (isTouch)
            this.touchDeviceInteractionTimer = setTimeout(this.onTouchDeviceInteractionTimerTimeout.bind(this), this.handlePointerEventsDelay);
        document.addEventListener("pointermove", this.boundOnPointerMoveHandler);
        document.addEventListener("pointerup", this.boundOnPointerUpHandler);
        document.addEventListener("pointercancel", this.boundOnPointerCancelHandler);
        document.addEventListener("keydown", this.boundOnDraggingKeyDownHandler);
        document.addEventListener("contextmenu", this.boundOnDraggingContextMenuHandler);
        window.addEventListener("blur", this.boundOnDraggingWindowBlurHandler); // handle case when browser tab lose focus - T1234684
        dom.DomUtils.addClassName(document.body, "dx-prevent-selection");
    }
    onPointerMove(evt) {
        var _a;
        if (this.state === PointerInteractionState.Stopped)
            return;
        const isButtonUnpressed = evt.buttons === 0;
        if (isButtonUnpressed) {
            if (this.state === PointerInteractionState.Dragging)
                this.stopPointerDrag(evt, false);
            this.stopPointerInteraction();
            this.element.releasePointerCapture(evt.pointerId);
            return;
        }
        if (this.state === PointerInteractionState.WaitingForDragging) {
            if (this.isDistanceExceedLimit(evt)) {
                if ((_a = this.pointerDownContext) === null || _a === void 0 ? void 0 : _a.isTouch) {
                    if (this.handlePointerEventsDelay > 0)
                        this.stopPointerInteraction();
                }
                else
                    this.tryStartPointerInteraction();
            }
        }
    }
    stopPointerDrag(evt, isButtonPressed) {
        if (this.pointerDownContext) {
            const event = new PointerDragStopEvent({
                source: evt,
                isTouch: this.pointerDownContext.isTouch,
                isLongTap: this.pointerDownContext.isLongTap
            });
            this.element.dispatchEvent(event);
            if (!this.pointerDownContext.isTouch)
                DxElementPointerEventsHelper.preventClickEvent = true;
        }
    }
    onPointerCancel(_) {
        if (this.state === PointerInteractionState.Stopped)
            return;
        this.stopPointerInteraction();
        const event = new PointerDragCancelEvent();
        this.element.dispatchEvent(event);
    }
    onDraggingKeyDown(evt) {
        if (this.state === PointerInteractionState.Stopped)
            return;
        if (evt.key === "Escape") {
            this.stopPointerInteraction();
            const event = new PointerDragCancelEvent();
            this.element.dispatchEvent(event);
        }
    }
    onDraggingWindowBlur(evt) {
        if (this.state === PointerInteractionState.Stopped)
            return;
        this.stopPointerInteraction();
        const event = new PointerDragCancelEvent();
        this.element.dispatchEvent(event);
    }
    onDraggingContextMenu(evt) {
        if (this.state === PointerInteractionState.Stopped)
            return;
        evt.preventDefault();
        evt.stopPropagation();
    }
    onPointerUp(evt) {
        if (this.state === PointerInteractionState.Dragging)
            this.stopPointerDrag(evt, true);
        this.stopPointerInteraction();
        this.element.releasePointerCapture(evt.pointerId);
    }
    onPointerClick(evt) {
        if ((this.handlePointerEventsMode & HandlePointerEventsMode.Click) === 0)
            return;
        if (!this.shouldProcessPointerEvent(evt))
            return;
        if (DxElementPointerEventsHelper.preventClickEvent || evt.button !== 0 || this.isDistanceExceedLimit(evt)) {
            evt.stopPropagation();
            return;
        }
        this.raiseDxPointerEvent(evt, new PointerClickEvent({
            source: evt,
            isTouch: this.pointerDownContext ? this.pointerDownContext.isTouch : false
        }), PointerClickEvent.eventName);
        delete this.pointerDownContext;
    }
    onPointerDblClick(evt) {
        if ((this.handlePointerEventsMode & HandlePointerEventsMode.DblClick) === 0)
            return;
        if (!this.shouldProcessPointerEvent(evt))
            return;
        if (evt.button !== 0 || this.isDistanceExceedLimit(evt)) {
            evt.stopPropagation();
            return;
        }
        this.raiseDxPointerEvent(evt, new PointerDblClickEvent({
            source: evt,
            isTouch: this.pointerDownContext ? this.pointerDownContext.isTouch : false
        }), PointerDblClickEvent.eventName);
    }
    raiseDxPointerEvent(nativeEvent, event, eventKey) {
        if (nativeEvent[eventKey])
            return;
        this.element.dispatchEvent(event);
        nativeEvent[eventKey] = true;
    }
    tryStartPointerInteraction() {
        if (DxElementPointerEventsHelper.pointerInteractionElement)
            this.state = PointerInteractionState.Stopped;
        else
            this.startPointerInteraction();
    }
    startPointerInteraction() {
        this.state = PointerInteractionState.Dragging;
        DxElementPointerEventsHelper.pointerInteractionElement = this.element;
        document.addEventListener("touchmove", DxElementPointerEventsHelper.preventDefaultBrowserBehaviour, { passive: false });
        this.raisePointerDragStartEvent();
    }
    stopPointerInteraction() {
        this.clearTouchDeviceInteractionTimer();
        if (this.state === PointerInteractionState.Dragging) {
            delete DxElementPointerEventsHelper.pointerInteractionElement;
            this.state = PointerInteractionState.Stopped;
        }
        document.removeEventListener("touchmove", DxElementPointerEventsHelper.preventDefaultBrowserBehaviour);
        document.removeEventListener("pointermove", this.boundOnPointerMoveHandler);
        document.removeEventListener("pointerup", this.boundOnPointerUpHandler);
        document.removeEventListener("pointercancel", this.boundOnPointerCancelHandler);
        document.removeEventListener("keydown", this.boundOnDraggingKeyDownHandler);
        document.removeEventListener("contextmenu", this.boundOnDraggingContextMenuHandler);
        window.removeEventListener("blur", this.boundOnDraggingWindowBlurHandler);
        dom.DomUtils.removeClassName(document.body, "dx-prevent-selection");
        delete this.pointerDownContext;
    }
    clearTouchDeviceInteractionTimer() {
        if (!this.touchDeviceInteractionTimer)
            return;
        clearTimeout(this.touchDeviceInteractionTimer);
        delete this.touchDeviceInteractionTimer;
    }
    onTouchDeviceInteractionTimerTimeout() {
        if (this.state === PointerInteractionState.WaitingForDragging) {
            if (this.pointerDownContext && this.pointerDownContext.isTouch) {
                this.pointerDownContext.isLongTap = true;
                this.tryStartPointerInteraction();
                this.clearTouchDeviceInteractionTimer();
            }
        }
    }
    isDistanceExceedLimit(evt) {
        if (!this.pointerDownContext)
            return false;
        return Math.abs(this.pointerDownContext.source.clientX - evt.clientX) > TouchDistanceLimit || Math.abs(this.pointerDownContext.source.clientY - evt.clientY) > TouchDistanceLimit;
    }
    raisePointerDragStartEvent() {
        if (!this.pointerDownContext)
            return;
        const event = new PointerDragStartEvent({
            source: this.pointerDownContext.source,
            isTouch: this.pointerDownContext.isTouch,
            isLongTap: this.pointerDownContext.isLongTap
        });
        this.element.dispatchEvent(event);
    }
}
DxElementPointerEventsHelper.preventClickEvent = false;

export { DxElementPointerEventsHelper as D, HandlePointerEventsMode as H, LongTapInteractionTimeout as L, PointerDragStartEvent as P, TapInteractionTimeout as T, PointerDragStopEvent as a, PointerEventHelper as b, PointerDragCancelEvent as c, PointerClickEvent as d, PointerDblClickEvent as e };
//# sourceMappingURL=dx-html-element-pointer-events-helper-24.2.js.map
