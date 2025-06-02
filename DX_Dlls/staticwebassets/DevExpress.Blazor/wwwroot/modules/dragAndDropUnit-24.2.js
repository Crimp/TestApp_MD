import { t as touch } from './touch-24.2.js';
import { e as ensureElement, H as eraseBlazorIdentificators } from './dom-utils-24.2.js';
import { E as EventRegister } from './eventRegister-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './dom-24.2.js';
import './tslib.es6-24.2.js';
import './css-classes-24.2.js';

class DragAndDropUnit {

    constructor(object, container, getDropTarget, selectorForDragAnchor, getZeroPoint, isModal) {
        this.isModal = isModal;
        this.itemForDrag = object;
        ensureElement(this.itemForDrag);
        this.container = container;
        this.getDropTarget = getDropTarget;
        this.clean = false;
        this.getZeroPoint = getZeroPoint;
        if(selectorForDragAnchor) this.dragAnchor = this.itemForDrag.querySelector(selectorForDragAnchor);
        if(!this.dragAnchor) this.dragAnchor = this.itemForDrag;
        this.cloneForMove = null;
        this.reset();
    }
    dropEvents() {
        if(!this.events) return;
        this.events.dispose();
        this.events = null;
    }
    dropTempObject() {
        this.currentPoint = null;
        this.startPoint = null;
        if(this.cloneForMove) {
            this.cloneForMove.parentNode.removeChild(this.cloneForMove);
            this.cloneForMove = null;
        }
    }

    reset() {
        if(this.clean)
            return;
        this.clean = true;
        this.dropTempObject();
        this.dropEvents();
        if(!this.events) this.events = new EventRegister(this);
        const unit = this;

        this.eventTokenDragStart = this.events.attachEvent(this.dragAnchor, touch.TouchUtils.touchMouseDownEventName, function(e) { this.dragTrigger(e); });

        this.container.size = function() { return getClientRect(unit.container).size; };
        this.itemForDrag.size = function() { return getClientRect(unit.itemForDrag).size; };
        this.itemForDrag.location = function() { return getClientRect(unit.itemForDrag).location; };

        this.contentHeightInt = -1;

    }
    stop() {
        this.clean = false;
        this.dropEvents();
    }
    dispose() {
        this.dropTempObject();
        this.dropEvents();
        this.onDragStart = null;
        this.onDrag = null;
        this.onDrop = null;
        this.onDragEndAnimateEnd = null;
        this.onDragCancel = null;
        this.itemForDrag = null;
        this.container = null;
    }

    get contentHeight() {
        if(this.contentHeightInt === -1) {
            this.contentHeightInt = 0;
            const children = this.scrollContainer.children;
            for(let i = 0; i < children.length; i++) {
                if(children[i] !== this.cloneForMove)
                    this.contentHeightInt += children[i].getBoundingClientRect().height;
            }
        }
        return this.contentHeightInt;
    }
    get cursor() {
        return this.cursorPoint;
    }
    get isScrollActive() {
        return this.contentHeight !== getClientRect(this.scrollContainer).height;
    }
    get scrollContainer() {
        if(this.isModal) {
            if(!this._scrollContainer) {
                let c = this.container;
                while(c !== window && c.classList) {
                    if(c.classList.contains("modal-body")) {
                        this._scrollContainer = c;
                        break;
                    }
                    c = c.parentNode;
                }
            }
            return this._scrollContainer;
        }
        return this.container;
    }
    get scrollingCorrection() {
        if(this.isModal && this.isScrollActive)
            return { y: this.scrollingStart - this.scrollContainer.scrollTop };
        return { y: 0 };
    }

    dragTrigger(e) {
        this.updateCursor(e);

        const start = this.cursor.clone();
        const threshold = 3;
        const mouseMove = function(e_m) {
            this.updateCursor(e_m);
            const delta = geometry(start, "-", this.cursor);
            if(delta.scalarLength > threshold) {
                mouseUp();
                this.clean = false;
                this.dragStart(e);
            }
            e_m.preventDefault();
            return false;
        };

        let eventTokenMouseMove = null;
        let eventTokenMouseUp = null;

        const mouseUp = function() {
            eventTokenMouseMove.dispose();
            eventTokenMouseUp.dispose();
        };

        eventTokenMouseMove = this.events.attachEvent(document, touch.TouchUtils.touchMouseMoveEventName, mouseMove);
        eventTokenMouseUp = this.events.attachEvent(document, touch.TouchUtils.touchMouseUpEventName, mouseUp);

        e.preventDefault();
        return false;
    }

    dragStart(e) {
        if(!this.itemForDrag)
            return;
        this.updateCursor(e);
        this.eventTokenDragStart.dispose();

        this.cloneForMove = createCloneForMove(this.itemForDrag);
        this.itemForDrag.parentNode.insertBefore(this.cloneForMove, this.itemForDrag);

        if(this.onDragStart)
            this.onDragStart(this.itemForDrag);

        this.scrollingStart = this.scrollContainer.scrollTop;

        this.eventTokenDrag = this.events.attachEvent(document, touch.TouchUtils.touchMouseMoveEventName, function(e) { this.drag(e); });
        this.eventTokenDragEnd = this.events.attachEvent(document, touch.TouchUtils.touchMouseUpEventName, function(e) { this.dragEnd(e); });
    }

    drag(e) {
        if(!this.itemForDrag || !this.cloneForMove)
            return;
        this.updateCursor(e);
        this.scroll();

        if(!this.startPoint) {
            this.currentPoint = this.cursor.clone();
            this.cloneForMove.style.visibility = "visible";
            this.startPoint = getClientRect(this.cloneForMove).location;
        }

        const dragLimit = geometry(this.scrollContainer, "-", this.cloneForMove.size());
        dragLimit.width = 0;

        this.currentPoint = this.cursor.limitByRectangle(dragLimit);

        const delta = geometry(this.currentPoint, "-", this.startPoint, "-", this.scrollingCorrection);
        this.translateElement(this.cloneForMove, delta, 0);

        if(this.onDrag) {
            e.centerOfDraggingObject = this.toRelativeCoord(this.cloneForMove.center());
            this.onDrag(this.itemForDrag, e);
        }
    }

    dragEnd(e) {
        if(!this.itemForDrag || !this.cloneForMove || !this.startPoint)
            return;

        this.eventTokenDrag.dispose();
        this.eventTokenDragEnd.dispose();

        const target = this.getDropTarget(this.toRelativeCoord(this.cloneForMove.center()));

        if(target && this.itemForDrag !== target.item) {
            if(this.onDrop) this.onDrop(this.itemForDrag, target.item);

            const onAnimationEnd = function() {
                if(this.cloneForMove) this.cloneForMove.style["box-shadow"] = "none";
                if(this.onDropAnimationEnd) this.onDropAnimationEnd(this.itemForDrag, target.item);
            };

            const delta = geometry(this.toScreenCoord(target.relativeRect), "-", this.startPoint, "-", this.scrollingCorrection);
            this.animateItem(this.cloneForMove, delta, onAnimationEnd);
            return;
        }

        if(this.cloneForMove) {
            this.animateItem(this.cloneForMove, { x: 0, y: 0 }, function() {
                this.onDragCancel(this.itemForDrag);
                this.reset();
            });
        }
    }

    scroll() {
        if(!this.isScrollActive)
            return;

        const scllR = this.scrollContainer.getBoundingClientRect();

        let delta = this.cursor.y + this.cloneForMove.size().height + 2 - scllR.bottom;
        if(delta > 0) {
            this.scrollContainer.scrollTop = Math.min(this.scrollContainer.scrollTop + delta, this.contentHeight - scllR.height);
            return;
        }

        delta = this.cursor.y - 2 - scllR.top;
        if(delta < 0)
            this.scrollContainer.scrollTop = Math.max(this.scrollContainer.scrollTop + delta, 0);
    }
    updateCursor(eventArg) {
        this.cursorPoint = new PointBlz(this.getClientEventPos(eventArg, "clientX"), this.getClientEventPos(eventArg, "clientY") - this.itemForDrag.size().height / 2);
    }
    translateElement(element, delta, seconds) {
        const transform = element.style.transform;
        if(delta.x === 0 && delta.y === 0 && (transform.includes("translate(0px)") || transform.includes("translate(0px,0px)")))
            return false;

        element.style.transition = "all " + seconds + "s";
        const newTransform = ["translate(", Math.round(delta.x), "px, ", Math.round(delta.y), "px)"].join("");

        if(transform.includes(newTransform))
            return false;

        element.style.transform = newTransform;
        return true;
    }
    animateItem(item, delta, afterAnimation) {
        let token = null;
        const transitionEnd = function() {
            token.dispose();
            afterAnimation.call(this);
        };
        token = this.events.attachEvent(item, "transitionend", transitionEnd);

        const translateSet = this.translateElement(item, delta, "0.2");

        if(!translateSet)
            transitionEnd.call(this);

        return translateSet;
    }
    toRelativeCoord(element) {
        return geometry(element, "-", this.getZeroPoint());
    }
    toScreenCoord(element) {
        return geometry(element, "+", this.getZeroPoint());
    }
    getClientEventPos(evt, method) {
        if(typeof (evt[method]) !== "undefined")
            return evt[method];
        if(typeof (evt.touches) !== "undefined" && evt.touches[0] && evt.touches[0][method])
            return evt.touches[0][method];
        if(typeof (evt.changedTouches) !== "undefined" && evt.changedTouches[0] && evt.changedTouches[0][method])
            return evt.changedTouches[0][method];
        return 0;
    }
}

class FocusUnit {
    constructor(object, inputSelector, container, isBlurMode) {
        this.inputSelector = inputSelector;
        this.focusElement = object;
        this.container = container;
        this.input = inputSelector ? this.focusElement.querySelector(inputSelector) : null;
        this.restrictClick = false;
        this.isBlurMode = isBlurMode;
        this.lock = false;
        this.reset();
    }

    onKeydown(e) {
        if((e.keyCode === 32 || e.keyCode === 13) && !this.restrictClick && e.target === this.focusElement && e.currentTarget === this.focusElement) {
            this.lock = true;
            this.input.click();
            this.focusElement.setAttribute("aria-selected", this.input.checked);
            this.lock = false;
        }
    }
    onClickInternal(e) {
        if(this.onClick && !this.lock)
            this.onClick(this.focusElement);
    }
    onFocusInternal() {
        this.updateStyleMetadata();
        if(this.onFocus)
            this.onFocus(this.focusElement);
    }
    onBlurInternal() {
        if(this.onBlur)
            this.onBlur(this.focusElement);
    }

    reset() {
        if(this.events)
            this.events.dispose();
        this.events = new EventRegister(this);

        if(this.input) {
            this.input.tabIndex = -1;
            this.events.attachEvent(this.input, "focus", function() { this.input.blur(); });
            this.events.attachEvent(this.input, "click", function() { this.onClickInternal(); });
            this.events.attachEvent(this.focusElement, "keydown", this.onKeydown);
        }

        this.resetStyleMetadata();

        if(document.activeElement === this.focusElement) {
            this.updateStyleMetadata();
            if(this.isBlurMode)
                this.focusElement.blur();
        }

        let handlerOnFocus;
        if(this.isBlurMode)
            handlerOnFocus = function() { this.focusElement.blur(); };
        else {
            handlerOnFocus = this.onFocusInternal;
            this.events.attachEvent(this.focusElement, "blur", this.onBlurInternal);
        }

        this.events.attachEvent(this.focusElement, "focus", handlerOnFocus);
        this.events.attachEvent(this.focusElement, "mousedown", function(e) { e.preventDefault(); });
        this.restrictClick = false;
    }
    stop() {
        this.restrictClick = true;
    }

    focus() {
        if(this.isBlurMode)
            return;
        this.focusElement.focus();
    }
    blur() {
        this.focusElement.blur();
    }

    dispose() {
        if(this.events)
            this.events.dispose();
        this.events = null;
        this.focusElement = null;
        this.input = null;
    }

    resetStyleMetadata() {
        if(typeof (this.focusElement.style) === "undefined" || !this.focusElement.style)
            return;
        this.focusElement.style.removeProperty("--h");
        this.focusElement.style.removeProperty("--t");
        this.focusElement.style.removeProperty("--bt");
    }
    updateStyleMetadata() {
        if(typeof (this.focusElement.style) !== "undefined" && this.focusElement.style && this.focusElement.style.cssText)
            return;
        const r = getClientRect(this.focusElement);
        const cr = getClientRect(this.container);
        const bt = window.getComputedStyle(this.focusElement)["border-top-width"];
        this.focusElement.setAttribute("style", `--h:${r.height}px; --t:${r.y - cr.y}px; --bt:${bt};`);
    }
}

class PointBlz {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new PointBlz(this.x, this.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    equal(_pointBlz) {
        return this.x === _pointBlz.x && this.y === _pointBlz.y;
    }
    limitByRectangle(rect) {
        const y = Math.min(Math.max(this.y, rect.top), rect.bottom);
        const x = Math.min(Math.max(this.x, rect.left), rect.right);
        return new PointBlz(x, y);
    }
    isInRect(rect) {
        return rect.left <= this.x && this.x <= rect.right && rect.top <= this.y && this.y <= rect.bottom;
    }
}

class RectBlz {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    clone() { return new RectBlz(this.x, this.y, this.width, this.height); }

    get left() { return this.x; }

    get top() { return this.y; }

    get bottom() { return this.y + this.height; }

    get right() { return this.x + this.width; }

    get size() { return new RectBlz(0, 0, this.width, this.height); }

    get location() { return new RectBlz(this.x, this.y, 0, 0); }

    get center() { return new RectBlz(this.x + this.width / 2, this.y + this.height / 2, 0, 0); }

    get scalarLength() { return Math.sqrt(this.x * this.x + this.y * this.y); }

    equal(_rectBlz) {
        return this.x === _rectBlz.x && this.y === _rectBlz.y && this.width === _rectBlz.width && this.height === _rectBlz.height;
    }
    limitByRectangle(r) {
        const y = Math.min(Math.max(this.y, r.top), r.bottom);
        const x = Math.min(Math.max(this.x, r.left), r.right);
        return new RectBlz(x, y, 0, 0);
    }
}

function createCloneForMove(item) {
    const clone = item.cloneNode(true);
    clone.center = function() { return getClientRect(clone).center; };
    clone.size = function() { return getClientRect(clone).size; };
    clone.style.transition = "none";
    clone.style.width = item.offsetWidth + "px";
    clone.style.height = item.offsetHeight + "px";
    clone.style.visibility = "hidden";
    clone.classList.add("in-drag");
    eraseBlazorIdentificators(clone);
    return clone;
}
function geometry() {
    const expression = Array.from(arguments);
    const operations = [];
    const operands = [];

    expression.forEach(function(e) {
        if(e === "-" || e === "+")
            operations.push(e);
        else
            operands.push(e);
    });

    const expr = [];

    while(operands.length > 0)
        expr.push(operands.pop());
    while(operations.length > 0)
        expr.push(operations.shift());

    while(expr.length > 0) {
        const v = expr.shift();
        if(v === "+")
            operations.push(sum(operations.pop(), operations.pop()));
        else if(v === "-")
            operations.push(subtract(operations.pop(), operations.pop()));
        else
            operations.push(v);
    }
    return operations.pop();
}
function sum(_a, _b) {
    const a = getCoord(_a);
    const b = getCoord(_b);
    return new RectBlz(a.x + b.x, a.y + b.y, a.width + b.width, a.height + b.height);
}
function subtract(_a, _b) {
    const a = getCoord(_a);
    const b = getCoord(_b);
    return new RectBlz(a.x - b.x, a.y - b.y, a.width - b.width, a.height - b.height);
}
function getCoord(z) {
    if(z.getBoundingClientRect)
        return getClientRect(z);
    if(z === window)
        return { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };

    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    if(z.x) x = z.x;
    if(z.y) y = z.y;
    if(z.width) w = z.width;
    if(z.height) h = z.height;
    return { x: x, y: y, width: w, height: h };
}
function getClientRect(element) {
    const r = element.getBoundingClientRect();
    if(r && (!r.x || !r.y)) {
        r.x = Math.min(r.left, r.right);
        r.y = Math.min(r.top, r.bottom);
    }
    return new RectBlz(r.x, r.y, r.width, r.height);
}
function getClientRectWithMargins(element) {
    const r = getClientRect(element);
    const stl = window.getComputedStyle(element);
    const lm = parse(stl.marginLeft);
    const rm = parse(stl.marginRight);
    const tm = parse(stl.marginTop);
    const bm = parse(stl.marginBottom);
    return new RectBlz(r.x - lm, r.y - tm, r.width + lm + rm, r.height + tm + bm);
}
function parse(val) {
    return Math.max(parseFloat(val), 0);
}

const dragAndDropUnit = { DragAndDropUnit, FocusUnit, RectBlz, PointBlz, getClientRect, getClientRectWithMargins, geometry };

export { DragAndDropUnit, FocusUnit, PointBlz, RectBlz, dragAndDropUnit as default, geometry, getClientRect, getClientRectWithMargins };
//# sourceMappingURL=dragAndDropUnit-24.2.js.map
