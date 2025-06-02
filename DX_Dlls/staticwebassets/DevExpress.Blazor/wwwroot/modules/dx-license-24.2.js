const DATA_PERMANENT_ATTRIBUTE = "data-permanent";
const dxLicenseTriggerName = "dx-license-trigger";
const componentNames = {
    trigger: dxLicenseTriggerName,
    panel: "dx-license",
};
const attributeNames = {
    buyNow: "buy-now",
    version: "version",
};
const commonStyles = {
    opacity: "1",
    visibility: "visible",
    "clip-path": "none",
    "filter": "none"
};
const contentStyles = {
    ...commonStyles,
    width: "100%",
    height: "auto",
    lineHeight: "auto",
    display: "block",
    "z-index": "900",
    position: "static",
    transform: "translate(0px, 0px)",
    "background-color": "#FF7200",
    border: "none",
    margin: "auto",
    "box-sizing": "border-box",
    "text-align": "center"
};
const containerStyles = {
    ...contentStyles,
    display: "flex",
    "align-items": "center",
    "flex-direction": "row",
    position: "relative",
    top: "0px",
    left: "0px",
    padding: "0.5rem",
};
const buttonStyles = {
    width: "1rem",
    cursor: "pointer",
    height: "1rem"
};
const textStyles = {
    ...commonStyles,
    display: "inline",
    position: "static",
    padding: "0px",
    margin: "0px",
    color: "white",
    "font-family": "'Segoe UI','Open Sans Condensed',-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif",
    "font-size": "14px",
    "font-wight": "600",
};
class DxLicense extends HTMLElement {
    constructor() {
        super();
        this._observer = null;
        this._inReassign = false;
        this._hidden = false;
        this._spanStyles = this._createImportantStyles(textStyles);
        this._linkStyles = this._createImportantStyles(textStyles);
        this._containerStyles = this._createImportantStyles(containerStyles);
        this._contentStyles = this._createImportantStyles(contentStyles);
        this._buttonStyles = this._createImportantStyles(buttonStyles);
    }
    _createImportantStyles(stylesMap) {
        return Object.keys(stylesMap)
            .reduce((cssString, currentKey) => `${cssString}${[currentKey, `${stylesMap[currentKey]} !important;`].join(": ")}`, "");
    }
    _createSpan(text) {
        const span = document.createElement("span");
        span.innerText = text;
        span.style.cssText = this._spanStyles;
        return span;
    }
    _createLink(text, href) {
        const link = document.createElement("a");
        link.innerText = text;
        link.style.cssText = this._linkStyles;
        link.href = href;
        link.target = "_blank";
        return link;
    }
    _createButton() {
        const button = document.createElement("div");
        button.style.cssText = this._buttonStyles;
        button.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16">
  <polygon points="13.4 12.7 8.7 8 13.4 3.4 12.6 2.6 8 7.3 3.4 2.6 2.6 3.4 7.3 8 2.6 12.6 3.4 13.4 8 8.7 12.7 13.4 13.4 12.7"/>
</svg>`;
        const polygon = button.querySelector("polygon");
        const svg = button.querySelector("svg");
        if (svg)
            svg.style.verticalAlign = "baseline";
        if (polygon) {
            polygon.style.fill = "#fff";
            polygon.style.opacity = ".5";
            polygon.style.strokeWidth = "0px";
        }
        button.onclick = () => {
            this._hidden = true;
            this.style.display = "none";
        };
        return button;
    }
    _createContentContainer() {
        const contentContainer = document.createElement("div");
        contentContainer.style.cssText = this._contentStyles;
        contentContainer.append(this._createSpan("For evaluation purposes only. Redistribution not authorized. Please "), this._createLink("purchase a license", this.getAttribute(attributeNames.buyNow)), this._createSpan(` to continue use of DevExpress product libraries (v${this.getAttribute(attributeNames.version)}).`));
        return contentContainer;
    }
    _reassignComponent() {
        this.innerHTML = "";
        this.style.cssText = this._containerStyles;
        this.append(this._createContentContainer(), this._createButton());
    }
    connectedCallback() {
        this._reassignComponent();
        if (!this._observer) {
            this._observer = new MutationObserver(() => {
                var _a;
                if (this._hidden) {
                    (_a = this._observer) === null || _a === void 0 ? void 0 : _a.disconnect();
                    return;
                }
                if (this._inReassign)
                    this._inReassign = false;
                else {
                    this._inReassign = true;
                    this._reassignComponent();
                }
            });
            this._observer.observe(this, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        }
    }
    disconnectedCallback() {
        setTimeout(() => {
            const licensePanel = document.getElementsByTagName(componentNames.panel);
            if (!licensePanel.length)
                document.body.prepend(this);
        }, 100);
    }
}
class DxLicenseTrigger extends HTMLElement {
    connectedCallback() {
        this.style.display = "none";
        const licensePanel = document.getElementsByTagName(componentNames.panel);
        if (!licensePanel.length) {
            const license = document.createElement(componentNames.panel);
            license.setAttribute(attributeNames.version, this.getAttribute(attributeNames.version));
            license.setAttribute(attributeNames.buyNow, this.getAttribute(attributeNames.buyNow));
            license.setAttribute(DATA_PERMANENT_ATTRIBUTE, "true");
            document.body.prepend(license);
        }
    }
}
function registerTrialPanelComponents() {
    if (typeof customElements !== "undefined" && !customElements.get(componentNames.trigger)) {
        customElements.define(componentNames.trigger, DxLicenseTrigger);
        customElements.define(componentNames.panel, DxLicense);
    }
}
// DevExtreme License Key Registation

export { dxLicenseTriggerName, registerTrialPanelComponents };
//# sourceMappingURL=dx-license-24.2.js.map
