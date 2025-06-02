import { a as Rect, R as RectHelper, L as LayoutHelper, D as DomHelper } from './layouthelper-24.2.js';
import { R as RafAction } from './rafaction-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';

class PositionChangingEvent extends CustomEvent {
    constructor(detail) {
        super(PositionChangingEvent.eventName, {
            detail,
            bubbles: true,
            cancelable: true,
        });
    }
}
PositionChangingEvent.eventName = "dxbl-position-changing";
class PositionChangedEvent extends CustomEvent {
    constructor(detail) {
        super(PositionChangedEvent.eventName, {
            detail,
            bubbles: true,
            cancelable: true,
        });
    }
}
PositionChangedEvent.eventName = "dxbl-position-changed";
class PositionTracker extends HTMLElement {
    constructor() {
        super(...arguments);
        this.observer = null;
        this.targetField = "";
        this.listenedIdField = "";
        this.elementScrollHandler = this.handleElementScroll.bind(this);
        this.resizeHandler = this.handleResize.bind(this);
        this.mutationObserver = new MutationObserver(this.handleMutations.bind(this));
        this.overflows = [];
        this.resizing = [];
        this.targetElement = null;
        this.rafAction = new RafAction();
    }
    get target() {
        return this.targetField;
    }
    set target(selector) {
        this.targetField = selector;
    }
    get listenerId() {
        return this.listenedIdField;
    }
    set listenerId(listenerId) {
        this.listenedIdField = listenerId;
    }
    connectedCallback() {
        this.initializeObserver();
        this.subscribeToOverflows();
    }
    getTargetBoundingClientRect() {
        if (!this.targetElement)
            return Rect.Empty;
        return RectHelper.fromDomRect(this.targetElement.getBoundingClientRect());
    }
    initializeObserver() {
        this.destroyObserver();
        const targetElement = this.querySelector(this.target);
        if (!targetElement) {
            this.mutationObserver.observe(this, { childList: true, subtree: true });
            return;
        }
        const options = {
            root: targetElement,
            rootMargin: "0px",
            threshold: 0
        };
        const callback = function (entries, observer) {
            // console.log("intersect");
        };
        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this);
        this.targetElement = targetElement;
    }
    disconnectedCallback() {
        this.destroyObserver();
    }
    destroyObserver() {
        var _a;
        this.mutationObserver.disconnect();
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.observer = null;
    }
    static get observedAttributes() {
        return ["target", "listener-id"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "target":
                this.targetChanged(newVal);
                break;
            case "listener-id":
                this.listenerIdChanged(newVal);
        }
    }
    handleMutations(records) {
        const targetElement = this.querySelector(this.target);
        if (!targetElement)
            return;
        this.targetElement = targetElement;
        this.mutationObserver.disconnect();
        this.initializeObserver();
        this.subscribeToOverflows();
    }
    handleResize(entries, observer) {
        this.raisePositionChanging();
        this.rafAction.execute(() => this.raisePositionChanged());
    }
    targetChanged(newVal) {
        this.target = newVal;
        this.initializeObserver();
    }
    listenerIdChanged(newVal) {
        this.listenerId = newVal;
    }
    raisePositionChanging() {
        const event = new PositionChangingEvent({ Tracker: this });
        this.dispatchEvent(event);
    }
    raisePositionChanged() {
        const event = new PositionChangedEvent({ Tracker: this });
        this.dispatchEvent(event);
    }
    subscribeToOverflows() {
        if (!this.targetElement)
            return;
        const overflows = [];
        const resizing = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const node of LayoutHelper.getRootPath(this.targetElement)) {
            const element = node;
            if (!element)
                return;
            const resizeObserver = new ResizeObserver(this.resizeHandler);
            resizeObserver.observe(element, { box: "border-box" });
            resizing.push();
            if (!DomHelper.isScrollable(element))
                continue;
            element.addEventListener("scroll", this.elementScrollHandler, { capture: true });
            overflows.push(element);
        }
        this.overflows = overflows;
        this.resizing = resizing;
    }
    unsubscribeFromOverflows() {
        this.overflows.forEach(x => {
            x.removeEventListener("scroll", this.elementScrollHandler);
        });
        this.resizing.forEach(x => {
            x.disconnect();
        });
    }
    handleElementScroll(ev) {
        this.raisePositionChanging();
        this.rafAction.execute(() => this.raisePositionChanged());
    }
}
customElements.define("dxbl-position-tracker", PositionTracker);
function init() {
}
const positiontracker = { init, PositionTracker: PositionTracker };

export { PositionChangedEvent, PositionChangingEvent, PositionTracker, positiontracker as default, init };
//# sourceMappingURL=positiontracker-24.2.js.map
