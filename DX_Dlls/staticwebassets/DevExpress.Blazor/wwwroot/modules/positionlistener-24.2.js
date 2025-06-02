import { PositionChangingEvent } from './positiontracker-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { R as RafAction } from './rafaction-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';

const template = document.createElement("template");
template.innerHTML = `
 <div class="inner popover fade show bs-popover-right" role="tooltip" style="position: absolute; left: 0px; top: 0px">
    <div class="arrow" style="top: 34px;"></div>
    <h3 class="popover-header">test</h3>
    <div class="popover-body">test</div>
  </div>
  <slot/>`;
class PositionListener extends HTMLElement {
    constructor() {
        super(...arguments);
        this.listenedIdField = "";
        this.positionChangingHandler = this.handlePositionChanging.bind(this);
        this.rafAction = new RafAction();
        this.innerElement = null;
    }
    get listenerId() {
        return this.listenedIdField;
    }
    set listenerId(listenerId) {
        this.listenedIdField = listenerId;
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
        window.addEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
    }
    disconnectedCallback() {
    }
    static get observedAttributes() {
        return ["listener-id"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "listener-id":
                this.listenerIdChanged(newVal);
        }
    }
    listenerIdChanged(newVal) {
        this.listenerId = newVal;
    }
    handlePositionChanging(ev) {
        if (!this.listenerId)
            return;
        if (ev.detail.Tracker.listenerId !== this.listenerId)
            return;
        EventHelper.markHandled(ev);
        if (!this.innerElement) {
            this.innerElement = this.shadowRoot.querySelector(".inner");
            if (!this.innerElement)
                return;
            const body = this.closest("body");
            body.appendChild(this.innerElement);
        }
        const rect = ev.detail.Tracker.getTargetBoundingClientRect();
        this.innerElement.style.transform = ["translate(", Math.round(rect.x + rect.width), "px, ", Math.round(rect.y), "px)"].join("");
    }
}
customElements.define("dxbl-position-listener", PositionListener);
function init() {
}
const positionlistener = { init, PositionListener };

export { PositionListener, positionlistener as default, init };
//# sourceMappingURL=positionlistener-24.2.js.map
