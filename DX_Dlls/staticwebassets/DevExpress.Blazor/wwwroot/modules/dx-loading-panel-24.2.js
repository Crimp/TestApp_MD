import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { L as LayoutHelper } from './layouthelper-24.2.js';
import { d as defineDxCustomElement } from './define-custom-element-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { x } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { t } from './state-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './logicaltreehelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';

class LoadingPanelClickEventContext {
}
class LoadingPanelClickEvent extends CustomEvent {
    constructor() {
        super(LoadingPanelClickEvent.eventName, {
            detail: new LoadingPanelClickEventContext(),
            bubbles: true
        });
    }
}
LoadingPanelClickEvent.eventName = "dxbl:loading-panel.click";
CustomEventsHelper.register(LoadingPanelClickEvent.eventName, x => x.detail);
class LoadingPanel extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.attachPanelHandler = this.attachPanel.bind(this);
        this.resizePanelHandler = this.resizePanel.bind(this);
        this.clickPanelHandler = this.clickPanel.bind(this);
        this.panel = null;
        this.targetElement = null;
        this.targetResizeObserver = null;
        this.panelItems = [];
        this.positionTarget = null;
        this.panelVisible = false;
        this.blockedContent = false;
        this.hasContent = false;
        this.zIndex = null;
        this.width = "unset";
        this.height = "unset";
        this.translateState = "translate(0px; 0px)";
        this.trackingInterval = null;
        this.targetCurrentRect = null;
    }
    render() {
        return x `
            <style>
                :host {
                    display: ${this.getDisplayProp()};
                    position: ${this.hasContent ? "relative" : "fixed"};
                    pointer-events: ${this.blockedContent || this.hasContent ? "unset" : "none"};
                    width: ${this.hasContent ? "var(--dxbl-loading-panel-width)" : this.width};
                    height: ${this.hasContent ? "var(--dxbl-loading-panel-height)" : this.height};
                    transform: ${this.hasContent ? "none" : this.translateState};
                    z-index: ${this.panelVisible && this.zIndex && !this.hasContent ? this.zIndex : "auto"};
                }
            </style>
            <slot></slot>
        `;
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        this.setAttribute(CssClasses.Loaded, "");
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.hasContent)
            window.addEventListener("resize", this.resizePanelHandler);
        this.panel = document.querySelector(`#${this.id}`);
        this.addEventListener("click", this.clickPanelHandler);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        if (this.targetElement) {
            (_a = this.targetResizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this.targetElement);
            this.unsubscribeTargetScroll();
        }
        window.removeEventListener("resize", this.resizePanelHandler);
        this.removeEventListener("click", this.clickPanelHandler);
        this.disablePersistentAttaching();
    }
    updated(props) {
        super.updated(props);
        if (props.has("positionTarget")) {
            this.setTargetElement();
            this.processPanelElements();
            this.attachPanel();
            this.resizePanel();
        }
        if (props.has("panelVisible")) {
            if (!this.targetElement && this.panelVisible)
                this.setTargetElement();
            this.attachPanel();
            this.resizePanel();
            this.checkBlockPanelTabIndexes();
        }
        if (props.has("blockedContent"))
            this.checkBlockPanelTabIndexes();
    }
    setTargetElement() {
        var _a;
        if (this.positionTarget) {
            this.targetElement = document.querySelector(this.positionTarget);
            if (!this.targetElement)
                return;
            this.targetCurrentRect = this.targetElement.getBoundingClientRect();
            this.subscribeTargetResize();
            this.subscribeTargetScroll();
            this.enablePersistentAttaching();
        }
        else if (this.targetElement) {
            (_a = this.targetResizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this.targetElement);
            this.targetElement = null;
        }
    }
    attachPanel() {
        if (this.hasContent || !this.targetElement || !this.panel)
            return;
        requestAnimationFrame(() => {
            const rect = this.targetElement.getBoundingClientRect();
            this.translateState = `translate(${rect.left + this.scrollLeft}px, ${rect.top + this.scrollTop}px)`;
        });
    }
    resizePanel() {
        if (!this.targetElement || !this.panel)
            return;
        requestAnimationFrame(() => {
            const rect = this.targetElement.getBoundingClientRect();
            this.width = rect.width + "px";
            this.height = rect.height + "px";
        });
    }
    clickPanel() {
        if (this.panelVisible)
            this.dispatchEvent(new LoadingPanelClickEvent());
    }
    processPanelElements() {
        if (!this.targetElement)
            return;
        this.checkAndAddElementTabIndex(this.targetElement);
        this.processPanelChildElements(this.targetElement);
    }
    checkAndAddElementTabIndex(element) {
        if (this.panelItems.map(x => x.element).indexOf(element) < 0) {
            this.panelItems.push({
                element: element,
                tabIndex: element.hasAttribute("tabIndex") ? element.tabIndex : null
            });
        }
    }
    processPanelChildElements(element) {
        const children = element.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child instanceof HTMLElement) {
                this.checkAndAddElementTabIndex(child);
                this.processPanelChildElements(child);
            }
        }
    }
    checkBlockPanelTabIndexes() {
        if (!this.panelItems.length)
            return;
        this.panelItems.forEach(item => {
            if (this.blockedContent && this.panelVisible)
                item.element.tabIndex = -1;
            else if (item.tabIndex !== null)
                item.element.tabIndex = item.tabIndex;
            else
                item.element.removeAttribute("tabIndex");
        });
    }
    subscribeTargetResize() {
        this.targetResizeObserver = new ResizeObserver(() => this.resizePanel());
        this.targetResizeObserver.observe(this.targetElement);
    }
    enablePersistentAttaching() {
        this.trackingInterval = setInterval(() => {
            const rect = this.targetElement.getBoundingClientRect();
            if (rect.top !== this.targetCurrentRect.top || rect.left !== this.targetCurrentRect.left) {
                this.targetCurrentRect = rect;
                this.attachPanel();
            }
        }, 0);
    }
    disablePersistentAttaching() {
        if (this.trackingInterval)
            clearInterval(this.trackingInterval);
    }
    subscribeTargetScroll() {
        this.getTargetRootElements().forEach(element => element.addEventListener("scroll", this.attachPanelHandler));
    }
    unsubscribeTargetScroll() {
        this.getTargetRootElements().forEach(element => element.removeEventListener("scroll", this.attachPanelHandler));
    }
    getTargetRootElements() {
        return [...LayoutHelper.getRootPath(this.targetElement)]
            .filter(x => x instanceof HTMLElement)
            .map(x => x);
    }
    getDisplayProp() {
        if (!this.hasContent && !this.positionTarget)
            return "block";
        if (this.hasContent || this.panelVisible)
            return "inline-block";
        return "none";
    }
}
__decorate([
    n({ type: String, attribute: "position-target", reflect: true })
], LoadingPanel.prototype, "positionTarget", void 0);
__decorate([
    n({ type: Boolean, attribute: "panel-visible" })
], LoadingPanel.prototype, "panelVisible", void 0);
__decorate([
    n({ type: Boolean, attribute: "blocked-content" })
], LoadingPanel.prototype, "blockedContent", void 0);
__decorate([
    n({ type: Boolean, attribute: "has-content" })
], LoadingPanel.prototype, "hasContent", void 0);
__decorate([
    n({ type: Number, attribute: "z-index" })
], LoadingPanel.prototype, "zIndex", void 0);
__decorate([
    t()
], LoadingPanel.prototype, "width", void 0);
__decorate([
    t()
], LoadingPanel.prototype, "height", void 0);
__decorate([
    t()
], LoadingPanel.prototype, "translateState", void 0);
defineDxCustomElement(customElements, "dxbl-loading-panel", LoadingPanel);

export { LoadingPanelClickEvent, LoadingPanelClickEventContext, LoadingPanel as default };
//# sourceMappingURL=dx-loading-panel-24.2.js.map
