import { ThumbDragStartedEvent, ThumbDragDeltaEvent, ThumbDragCompletedEvent } from './thumb-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { L as LayoutHelper, D as DomHelper } from './layouthelper-24.2.js';
import { R as RafAction } from './rafaction-24.2.js';
import { T as TransformHelper } from './transformhelper-24.2.js';
import './point-24.2.js';
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './constants-24.2.js';

const dxDraggableTagName = "dxbl-draggable";
class DxDraggable extends HTMLElement {
    get left() {
        return this.leftField;
    }
    set left(value) {
        this.leftField = value;
    }
    get top() {
        return this.topField;
    }
    set top(value) {
        this.topField = value;
    }
    constructor() {
        super();
        this.dragX = 0;
        this.dragY = 0;
        this.leftField = 0;
        this.topField = 0;
        this.rafAction = new RafAction();
        this.dragStartedHandler = this.dragStarted.bind(this);
        this.dragDeltaHandler = this.dragDelta.bind(this);
        this.dragCompletedHandler = this.dragCompleted.bind(this);
        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.innerHTML = `
            <style>
              :host {
                  position: absolute;
                  display: block;
              }
            </style>
            <slot/>`;
    }
    connectedCallback() {
        DataQaUtils.setLoaded(this);
        this.addEventListener(ThumbDragStartedEvent.eventName, this.dragStartedHandler);
        this.addEventListener(ThumbDragDeltaEvent.eventName, this.dragDeltaHandler);
        this.addEventListener(ThumbDragCompletedEvent.eventName, this.dragCompletedHandler);
    }
    disconnectedCallback() {
        DataQaUtils.removeLoaded(this);
    }
    dragStarted(args) {
        EventHelper.markHandled(args);
        const parent = LayoutHelper.findParent(this, x => DomHelper.isAbsolutePositioning(x));
        const rect = LayoutHelper.getRelativeElementRect(this, parent);
        this.left = rect.x;
        this.top = rect.y;
        this.style.transform = TransformHelper.translate(this.left, this.top);
    }
    dragDelta(args) {
        EventHelper.markHandled(args);
        this.left += args.detail.deltaX;
        this.top += args.detail.deltaY;
        this.rafAction.execute(() => this.style.transform = TransformHelper.translate(this.left, this.top));
    }
    dragCompleted(args) {
        EventHelper.markHandled(args);
        this.rafAction.cancel();
        this.style.transform = TransformHelper.translate(this.left, this.top);
    }
}
customElements.define(dxDraggableTagName, DxDraggable);
function init() {
}
const draggable = { init, DxDraggable, dxDraggableTagName };

export { draggable as default };
//# sourceMappingURL=draggable-24.2.js.map
