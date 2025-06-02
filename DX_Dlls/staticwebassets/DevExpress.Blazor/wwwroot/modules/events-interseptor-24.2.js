import { _ as __decorate } from './tslib.es6-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { s } from './lit-element-24.2.js';

const dxEventsInterceptorTagName = "dxbl-events-interceptor";
let DxEventsInterceptor = class DxEventsInterceptor extends s {
    constructor() {
        super();
        this.eventsSet = new Set();
        this.events = null;
        this.eventListener = this.handleEvent.bind(this);
        this._value = null;
    }
    get value() {
        return this._value;
    }
    updated(updated) {
        var _a, _b;
        if (updated.has("events")) {
            this.unsubscribe((_a = updated.get("events")) !== null && _a !== void 0 ? _a : null);
            this.eventsSet = new Set((_b = this.events) === null || _b === void 0 ? void 0 : _b.split(";"));
            this.subscribe(this.events);
        }
    }
    subscribe(events) {
        var _a;
        (_a = this.events) === null || _a === void 0 ? void 0 : _a.split(";").forEach(x => {
            this.addEventListener(x, this.eventListener);
        });
    }
    unsubscribe(events) {
        events === null || events === void 0 ? void 0 : events.split(";").forEach(x => {
            this.removeEventListener(x, this.eventListener);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    raise(eventName, args) {
        try {
            if (!this.eventsSet.has(eventName))
                return;
            this._value = JSON.stringify([eventName, args]);
            this.dispatchEvent(new Event("change", { bubbles: true }));
        }
        finally {
            this._value = null;
        }
    }
    handleEvent(evt) {
    }
};
__decorate([
    n({ type: String, attribute: "events" })
], DxEventsInterceptor.prototype, "events", void 0);
DxEventsInterceptor = __decorate([
    e(dxEventsInterceptorTagName)
], DxEventsInterceptor);

export { dxEventsInterceptorTagName as d };
//# sourceMappingURL=events-interseptor-24.2.js.map
