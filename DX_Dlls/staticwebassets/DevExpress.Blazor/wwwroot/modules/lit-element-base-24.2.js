import { registerTrialPanelComponents } from './dx-license-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { s } from './lit-element-24.2.js';

registerTrialPanelComponents();
class ConnectedContext {
    constructor(element) {
        this.element = element;
    }
}
class ConnectedEvent extends CustomEvent {
    constructor(detail) {
        super(ConnectedEvent.eventName, {
            detail,
            bubbles: false,
            composed: false,
            cancelable: false,
        });
    }
    static create(element) {
        return new ConnectedEvent(new ConnectedContext(element));
    }
}
ConnectedEvent.eventName = "dxbl-element-connected";
class DisconnectedEvent extends CustomEvent {
    constructor(detail) {
        super(DisconnectedEvent.eventName, {
            detail,
            bubbles: false,
            composed: false,
            cancelable: false,
        });
    }
    static create(element) {
        return new ConnectedEvent(new ConnectedContext(element));
    }
}
DisconnectedEvent.eventName = "dxbl-element-disconnected";
class LitElementBase extends s {
    constructor() {
        super(...arguments);
        this._isDOMAttached = false;
    }
    get isDOMAttached() {
        return this._isDOMAttached;
    }
    connectedCallback() {
        super.connectedCallback();
        this._isDOMAttached = true;
        if (this.readyOnConnectedCallback)
            DataQaUtils.setLoaded(this);
        this.dispatchEvent(ConnectedEvent.create(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._isDOMAttached = false;
        if (this.readyOnConnectedCallback)
            DataQaUtils.removeLoaded(this);
        this.dispatchEvent(DisconnectedEvent.create(this));
    }
    get readyOnConnectedCallback() {
        return true;
    }
}

export { LitElementBase as L };
//# sourceMappingURL=lit-element-base-24.2.js.map
