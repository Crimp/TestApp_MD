import { c as changeDom } from './dom-utils-24.2.js';
import { d as defineDxCustomElement } from './define-custom-element-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';

const resourceStyleElementTemplate = document.createElement("style");
resourceStyleElementTemplate.type = "text/css";
async function syncStyles(css, linkEl) {
    if (css)
        await changeDom(() => linkEl.innerHTML = css);
}
class DynamicStylesheetComponent extends HTMLElement {
    constructor() {
        super();
        this.resourceStyleElement = resourceStyleElementTemplate.cloneNode();
    }
    static get observedAttributes() {
        return ["css"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "css")
            syncStyles(newVal, this.resourceStyleElement);
    }
    connectedCallback() {
        if (!this.resourceStyleElement.isConnected)
            document.head.appendChild(this.resourceStyleElement);
    }
    disconnectedCallback() {
        if (this.resourceStyleElement.isConnected)
            this.resourceStyleElement.remove();
    }
}
defineDxCustomElement(customElements, "dxbl-dynamic-stylesheet", DynamicStylesheetComponent);

export { DynamicStylesheetComponent as default };
//# sourceMappingURL=dynamic-stylesheet-component-24.2.js.map
