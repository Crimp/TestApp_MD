import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { H as HandlePointerEventsMode, D as DxElementPointerEventsHelper, L as LongTapInteractionTimeout } from './dx-html-element-pointer-events-helper-24.2.js';
import { registerTrialPanelComponents } from './dx-license-24.2.js';

registerTrialPanelComponents();
const Template = document.createElement("template");
Template.innerHTML = "<slot />";
class DxHTMLElementBase extends HTMLElement {
    constructor() {
        super();
        this._handlePointerEventsMode = HandlePointerEventsMode.None;
        this._isInitialized = false;
        this._isDisconnected = false;
        this.pointerEventsHelper = new DxElementPointerEventsHelper(this);
        this.contentChangedObserver = null;
        this.prepareComponent();
    }
    get isInitialized() {
        return this._isInitialized;
    }
    get useShadowDom() {
        return true;
    }
    connectedCallback() {
        if (!this.useShadowDom && this.childElementCount > 0)
            this.componentContentChanged();
        if (this.useShadowDom && this._isDisconnected)
            // in case if the component has changed his position in DOM (T1136141)
            this.componentContentChanged();
        this.pointerEventsHelper.initialize();
        DataQaUtils.setLoaded(this);
        this._isDisconnected = false;
    }
    disconnectedCallback() {
        DataQaUtils.removeLoaded(this);
        this.pointerEventsHelper.dispose();
        this.disposeComponent();
        this._isDisconnected = true;
    }
    initializeComponent() {
    }
    afterInitialize() {
    }
    disposeComponent() {
        var _a;
        (_a = this.contentChangedObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    getContentTemplate() {
        return Template;
    }
    componentContentChanged() {
        this.initializeComponent();
        this._isInitialized = true;
        this.afterInitialize();
    }
    prepareComponent() {
        if (this.useShadowDom)
            this.prepareShadowDom();
        else {
            this.contentChangedObserver = new MutationObserver(this.componentContentChanged.bind(this));
            this.contentChangedObserver.observe(this, { childList: true });
        }
    }
    prepareShadowDom() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(this.getContentTemplate().content.cloneNode(true));
        const slotElement = shadowRoot.querySelector("slot");
        slotElement.addEventListener("slotchange", this.componentContentChanged.bind(this));
    }
    // Pointer events interaction
    get handlePointerEventsMode() {
        return this._handlePointerEventsMode;
    }
    set handlePointerEventsMode(value) {
        this._handlePointerEventsMode = value;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
}

export { DxHTMLElementBase as D };
//# sourceMappingURL=dx-html-element-base-24.2.js.map
