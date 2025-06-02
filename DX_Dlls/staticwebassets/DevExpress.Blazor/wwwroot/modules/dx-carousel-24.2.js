import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
import { s as stringToEnumConverter } from './enumConverter-24.2.js';
import { k as key } from './key-24.2.js';
import { P as Point } from './point-24.2.js';
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
import './constants-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';

class CarouselSwipeStartEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(CarouselSwipeStartEvent.eventName);
    }
}
CarouselSwipeStartEvent.eventName = DxTagNames.Carousel + ".swipe-start";
class CarouselSwipeEndEvent extends CustomEvent {
    constructor(direction) {
        super(CarouselSwipeEndEvent.eventName, {
            detail: new CarouselSwipeEndEventContext(direction),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
CarouselSwipeEndEvent.eventName = DxTagNames.Carousel + ".swipe-end";
class CarouselSwipeEndEventContext {
    constructor(direction) {
        this.Direction = direction;
    }
}
class CarouselWheelEvent extends CustomEvent {
    constructor(detail) {
        super(CarouselWheelEvent.eventName, {
            detail: detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
CarouselWheelEvent.eventName = DxTagNames.Carousel + ".mouse-scroll";
class CarouselShortcutEvent extends CustomEvent {
    constructor(detail) {
        super(CarouselShortcutEvent.eventName, {
            detail: detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
CarouselShortcutEvent.eventName = DxTagNames.Carousel + ".shortcut";
CustomEventsHelper.register(CarouselSwipeStartEvent.eventName, x => x.detail);
CustomEventsHelper.register(CarouselSwipeEndEvent.eventName, x => x.detail);
CustomEventsHelper.register(CarouselWheelEvent.eventName, x => {
    const e = x.detail;
    return {
        "DeltaX": e.deltaX,
        "DeltaY": e.deltaY,
        "DeltaZ": e.deltaZ,
        "DeltaMode": e.deltaMode,
    };
});
CustomEventsHelper.register(CarouselShortcutEvent.eventName, x => {
    const e = x.detail;
    return {
        "Key": e.key,
        "Code": e.code,
        "CtrlKey": e.ctrlKey,
        "AltKey": e.altKey,
        "ShiftKey": e.shiftKey,
        "MetaKey": e.metaKey
    };
});

const disabledAnimation = "none";
const scrollingInterval = 100;
var SwipeMode;
(function (SwipeMode) {
    SwipeMode[SwipeMode["None"] = 0] = "None";
    SwipeMode[SwipeMode["Touch"] = 1] = "Touch";
    SwipeMode[SwipeMode["TouchAndPointer"] = 2] = "TouchAndPointer";
})(SwipeMode || (SwipeMode = {}));
let DxCarousel = class DxCarousel extends SingleSlotElementBase {
    get content() {
        return this.querySelector(".dxbl-carousel-content");
    }
    constructor() {
        super();
        this.width = 0;
        this.swipingStart = new Point(0, 0);
        this.isSwiping = false;
        this.lastWheelExecutionTime = null;
        this.gestureCover = null;
        this.keyDownHandler = this.onKeyDown.bind(this);
        this.mouseWheelHandler = this.onMouseWheel.bind(this);
        this.touchMoveHandler = this.onTouchMove.bind(this);
        this.pointerDownHandler = this.onPointerDown.bind(this);
        this.stopSwipingHandler = this.stopSwiping.bind(this);
        this.cancelSwipingHandler = this.cancelSwiping.bind(this);
        this.performSwipingHandler = this.performSwiping.bind(this);
        this.allowMouseWheel = false;
        this.animation = "";
        this.activeIndex = -1;
        this.displayIndex = -1;
        this.loop = false;
        this.swipeMode = SwipeMode.Touch;
        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries)
                this.width = entry.contentRect.width;
        });
    }
    moveNext(animation = this.animation) {
        var _a;
        this.setTransition(animation);
        if (this.activeIndex === this.displayIndex) {
            const transform = this.getTransform(this.activeIndex);
            if (this.content && this.content.style.transform !== transform)
                this.applyTransform(transform);
        }
        else {
            const transform = this.getTransform(this.displayIndex);
            if (this.content && this.content.style.transform !== transform) {
                const index = this.activeIndex;
                this._moveFast = () => {
                    var _a, _b;
                    (_a = this.content) === null || _a === void 0 ? void 0 : _a.removeEventListener("transitionend", this._moveFast);
                    this.setTransition(disabledAnimation);
                    this.applyTransform(this.getTransform(index));
                    (_b = this.content) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
                    this._moveFast = undefined;
                };
                (_a = this.content) === null || _a === void 0 ? void 0 : _a.addEventListener("transitionend", this._moveFast);
                this.applyTransform(transform);
            }
        }
    }
    createRenderRoot() {
        return this;
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has("loop"))
            this.moveNext(disabledAnimation);
        else if (changed.has("activeIndex")) {
            if (this._moveFast)
                this._moveFast();
            this.moveNext();
        }
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        this.applyTransform(this.getTransform(this.activeIndex));
    }
    connectedCallback() {
        this.addEventListener("pointerdown", this.pointerDownHandler);
        this.addEventListener("wheel", this.mouseWheelHandler);
        this.addEventListener("keydown", this.keyDownHandler);
        super.connectedCallback();
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        var _a;
        this.removeEventListener("pointerdown", this.pointerDownHandler);
        this.removeEventListener("wheel", this.mouseWheelHandler);
        this.removeEventListener("keydown", this.keyDownHandler);
        super.disconnectedCallback();
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this);
    }
    onKeyDown(e) {
        if (e.target !== this)
            return;
        const keyCode = key.KeyUtils.getEventKeyCode(e);
        if (keyCode === key.KeyCode.Left ||
            keyCode === key.KeyCode.Right ||
            keyCode === key.KeyCode.Space) {
            e.preventDefault();
            this.dispatchEvent(new CarouselShortcutEvent(e));
        }
    }
    onMouseWheel(e) {
        if (this.allowMouseWheel) {
            e.preventDefault();
            const now = new Date();
            if (this.lastWheelExecutionTime && now.getTime() - this.lastWheelExecutionTime.getTime() < scrollingInterval)
                return;
            this.lastWheelExecutionTime = now;
            this.dispatchEvent(new CarouselWheelEvent(e));
        }
    }
    onPointerDown(e) {
        if (e.button !== 0)
            return;
        if (this.swipeMode === SwipeMode.None)
            return;
        const isTouch = e.pointerType === "touch";
        if (this.swipeMode === SwipeMode.Touch && !isTouch)
            return;
        const target = e.target;
        if (!target)
            return;
        if (!this.content.contains(target) &&
            !target.classList.contains("dxbl-carousel-substrate-button"))
            return;
        if (target instanceof HTMLElement && (target.isContentEditable || target.hasAttribute("contenteditable")) ||
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement) {
            if (!isTouch)
                return;
            if (document.activeElement === target)
                return;
        }
        this.onStartSwiping(e.clientX, e.clientY);
    }
    onStartSwiping(clientX, clientY) {
        this.swipingStart = new Point(clientX, clientY);
        document.addEventListener("pointermove", this.performSwipingHandler);
        document.addEventListener("pointerup", this.stopSwipingHandler);
        document.addEventListener("pointercancel", this.cancelSwipingHandler);
        document.addEventListener("touchmove", this.touchMoveHandler, { passive: false });
    }
    stopSwiping(e) {
        this.onStopSwiping(e.clientX);
    }
    cancelSwiping(e) {
        this.onStopSwiping(this.swipingStart.x);
    }
    onStopSwiping(clientX) {
        var _a;
        if (this.isSwiping) {
            const offsetX = clientX - this.swipingStart.x;
            const threshold = this.width / 3;
            const direction = Math.abs(offsetX) < threshold ? 0 : Math.sign(offsetX);
            this.setTransition(this.animation);
            if (direction === 0 ||
                direction === 1 && !this.loop && this.activeIndex === 0 ||
                direction === -1 && !this.loop && this.activeIndex === this.content.childElementCount - 1)
                this.applyTransform(this.getTransform(this.activeIndex));
            (_a = this.gestureCover) === null || _a === void 0 ? void 0 : _a.remove();
            this.isSwiping = false;
            this.dispatchEvent(new CarouselSwipeEndEvent(direction));
        }
        this.swipingStart = new Point(0, 0);
        document.removeEventListener("pointermove", this.performSwipingHandler);
        document.removeEventListener("pointerup", this.stopSwipingHandler);
        document.removeEventListener("pointercancel", this.cancelSwipingHandler);
        document.removeEventListener("touchmove", this.touchMoveHandler);
    }
    onTouchMove(e) {
        // prevent safari vertical scroll (or chrome scroll with railing disabled) on horizontal swipe by touch
        if (!e.cancelable)
            return;
        const offsetX = Math.abs(e.touches[0].clientX - this.swipingStart.x);
        const offsetY = Math.abs(e.touches[0].clientY - this.swipingStart.y);
        if (offsetX > offsetY && offsetX > 5)
            e.preventDefault();
    }
    performSwiping(e) {
        if (!this.isSwiping) {
            this.isSwiping = true;
            this.setTransition(disabledAnimation);
            this.gestureCover = document.createElement("div");
            this.gestureCover.classList.add("dxbl-gesture-cover");
            this.appendChild(this.gestureCover);
            this.dispatchEvent(new CarouselSwipeStartEvent());
        }
        const offsetX = e.clientX - this.swipingStart.x;
        this.applyTransform(this.getTransform(this.activeIndex, offsetX));
    }
    getTransform(slideIndex, offsetX = 0) {
        const slidePosition = slideIndex * -100;
        const slideOffset = offsetX === 0 ? 0 : Math.min(100, Math.max(-100, Math.round(offsetX / this.width * 100)));
        return `translateX(${slidePosition + slideOffset}%)`;
    }
    applyTransform(value) {
        if (this.content)
            this.content.style.transform = value;
    }
    setTransition(value) {
        if (this.content)
            this.content.style.transition = value;
    }
};
__decorate([
    n({ attribute: "allow-mouse-wheel", type: Boolean })
], DxCarousel.prototype, "allowMouseWheel", void 0);
__decorate([
    n({ attribute: "animation", type: String })
], DxCarousel.prototype, "animation", void 0);
__decorate([
    n({ attribute: "active-index", type: Number })
], DxCarousel.prototype, "activeIndex", void 0);
__decorate([
    n({ attribute: "display-index", type: Number })
], DxCarousel.prototype, "displayIndex", void 0);
__decorate([
    n({ attribute: "loop", type: Boolean })
], DxCarousel.prototype, "loop", void 0);
__decorate([
    n({ attribute: "swipe-mode", type: SwipeMode, converter: stringToEnumConverter(SwipeMode) })
], DxCarousel.prototype, "swipeMode", void 0);
DxCarousel = __decorate([
    e(DxTagNames.Carousel)
], DxCarousel);

export { DxCarousel };
//# sourceMappingURL=dx-carousel-24.2.js.map
