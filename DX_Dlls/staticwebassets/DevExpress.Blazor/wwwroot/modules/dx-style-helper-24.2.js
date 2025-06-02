import { G as toPx, p as getVerticalScrollBarWidth } from './dom-utils-24.2.js';
import { b as browser } from './browser-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { L as LitElementBase } from './lit-element-base-24.2.js';
import { x, i } from './lit-element-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './css-classes-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';

const styleSheetWarningTagName = "dxbl-stylesheet-warning";
let DxStyleSheetWarning = class DxStyleSheetWarning extends LitElementBase {
    render() {
        return x `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18ZM12 4C10.8954 4 10 4.89543 10 6V12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12V6C14 4.89543 13.1046 4 12 4Z" fill="currentColor" fill-opacity="0.75"/>
            </svg>
            <div>
                <p>This application references outdated DevExpress Blazor CSS resources. Refer to the following article for upgrade instructions: <a href="https://supportcenter.devexpress.com/ticket/details/t1081253" target="_blank">The location of CSS resources for DevExpress Blazor controls has changed</a>.</p>
            </div>
        `;
    }
    static isStyleSheetDeprecated(sourceUrl) {
        return sourceUrl !== null && /\/dx-blazor(\.bs5)*\.css$/ig.test(sourceUrl);
    }
    static create() {
        return document.createElement(styleSheetWarningTagName);
    }
};
DxStyleSheetWarning.styles = i `
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: 0px;
            bottom: 0px;
            width: 100%;
            padding: 1.5rem;
            color: var(--bs-dark, var(--dark, rgb(33, 37, 41)));
            background-color: var(--bs-warning, var(--warning, rgb(255, 193, 7)));
            z-index: 10000;
            font-size: 0.875rem;
        }
        :host > svg {
            flex: 0 0 auto;
            margin-right: 1rem;
        }
        p {
            margin: 0;
        }
        a, span {
            font-weight: 600;
        }
        a {
            color: inherit;
        }`;
DxStyleSheetWarning = __decorate([
    e(styleSheetWarningTagName)
], DxStyleSheetWarning);

const invalidPosition = -10000;
let scrollbarStyle = null;
class CssRule {
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }
    get name() { return this._name; }
    get value() { return this._value; }
}
class CssStyle {
    constructor(selectors, rules) {
        this._selectors = selectors;
        this._rules = rules;
    }
    get selectors() { return this._selectors; }
    get rules() { return this._rules; }
    toString(replaceRules) {
        let stringRules = this.rules.join("\n");
        for (let i = 0; i < replaceRules.length; i++) {
            const replaceRule = replaceRules[i];
            stringRules = stringRules.replace(new RegExp(`${replaceRule.name}`, "g"), replaceRule.value);
        }
        return `${this.selectors.join(",\n")} { ${stringRules} }`;
    }
}
class DefaultCssStyle {
    constructor() {
        this._rules = [];
        this._dummyContainer = null;
        this._ieCssStyles = [];
        this._styleElement = null;
        this.initialize();
    }
    get styleElement() {
        if (this._styleElement == null)
            this._styleElement = this.createStyleElement();
        return this._styleElement;
    }
    createStyleElement() {
        const styleElement = document.createElement("STYLE");
        document.head.appendChild(styleElement);
        return styleElement;
    }
    initialize() {
        this.initializeIeCssStyles();
        this.initializeDummyElements();
        this.initializeRules();
        this.updateStyleElement();
        this.removeDummyElements();
    }
    getAccentColor() {
        if (!this._dummyContainer)
            return "";
        const link = this._dummyContainer.querySelector("a");
        return window.getComputedStyle(link)["color"];
    }
    getAccentShadowColor(accentColor) {
        const values = accentColor.replace("rgb", "").replace("(", "").replace(")", "");
        const valuesArray = values.split(",").map(v => v.trim());
        valuesArray.push(".25");
        const newValues = valuesArray.join(",");
        return `rgba(${newValues})`;
    }
    updateStyleElement() {
        if (browser.Browser.IE)
            this.updateIEStyleElement();
        else
            this.updateStyleElementCore();
    }
    updateIEStyleElement() {
        if (this._ieCssStyles)
            this.styleElement.innerHTML = this._ieCssStyles.map(r => r.toString(this._rules)).join("\n");
    }
    updateStyleElementCore() {
        if (this._rules) {
            const stringRules = this._rules.map(r => `${r.name}: ${r.value}`).join(";\n");
            this.styleElement.innerHTML = `:root{ ${stringRules} }`;
        }
    }
    update() {
        this._rules = [];
        this.initialize();
    }
    initializeIeCssStyles() { }
    initializeDummyElements() { }
    initializeRules() { }
    removeDummyElements() { }
}
class AccentColorCssStyle extends DefaultCssStyle {
    initializeIeCssStyles() {
        this._ieCssStyles = [
            new CssStyle(["th:focus .dxColumnResizeAnchor"], ["box-shadow: 0 0 0 1px --dx-accent-shadow-color;"]),
            new CssStyle(["th:focus .dxColumnResizeAnchor::after"], [
                "border-left: 1px solid --dx-accent-color;",
                "border-right: 1px solid --dx-accent-color;"
            ]),
            new CssStyle([".table th:focus:before"], ["box-shadow: 0 0 0 2px --dx-accent-color;"])
        ];
    }
    initializeDummyElements() {
        const container = this.createDummyContainer();
        const link = this.createDummyLink();
        container.appendChild(link);
        document.documentElement.appendChild(container);
        this._dummyContainer = container;
    }
    createDummyContainer() {
        const container = document.createElement("DIV");
        container.style.top = toPx(invalidPosition);
        container.style.left = toPx(invalidPosition);
        container.className = "dxAIFE";
        container.setAttribute("aria-hidden", "true");
        return container;
    }
    createDummyLink() {
        const link = document.createElement("A");
        link.innerHTML = "test";
        link.href = "javascript:;";
        return link;
    }
    removeDummyElements() {
        if (this._dummyContainer)
            document.documentElement.removeChild(this._dummyContainer);
        this._dummyContainer = null;
    }
    initializeRules() {
        const accentColor = this.getAccentColor();
        if (this._rules) {
            this._rules.push(new CssRule("--dx-accent-color", accentColor));
            this._rules.push(new CssRule("--dx-accent-shadow-color", this.getAccentShadowColor(accentColor)));
        }
    }
}
class ScrollbarCssStyle extends DefaultCssStyle {
    initializeIeCssStyles() {
        this._ieCssStyles = [
            new CssStyle([".dxbs-gridview.dxbs-has-vertical-scrollbar.dxbs-vertical-scrollbar-visible > .card > .dxgvHSDC.dxbs-scrollbar-padding"], ["padding-right: --dx-scrollbar-width;"])
        ];
    }
    initializeRules() {
        if (this._rules)
            this._rules.push(new CssRule("--dx-scrollbar-width", toPx(getVerticalScrollBarWidth())));
    }
}
function ensureAccentColorStyle() {
    if (!window.dxAccentColorStyle)
        window.dxAccentColorStyle = new AccentColorCssStyle();
}
function ensureScrollbarStyle() {
    if (!scrollbarStyle)
        scrollbarStyle = new ScrollbarCssStyle();
}
function updateScrollbarStyle() {
    ensureScrollbarStyle();
    if (scrollbarStyle)
        scrollbarStyle.update();
}
function showDeprecatedStyleSheetWarningIfNeeded() {
    const deprecatedSources = Array.from(document.styleSheets)
        .map(styleSheet => styleSheet.href)
        .filter(DxStyleSheetWarning.isStyleSheetDeprecated);
    if (deprecatedSources.length > 0) {
        deprecatedSources
            .forEach(source => {
            const styleSheetWarning = DxStyleSheetWarning.create();
            document.body.appendChild(styleSheetWarning);
        });
    }
}
const dxStyleHelper = { ensureAccentColorStyle, showDeprecatedStyleSheetWarningIfNeeded };

export { dxStyleHelper as default, ensureAccentColorStyle, showDeprecatedStyleSheetWarningIfNeeded, updateScrollbarStyle };
//# sourceMappingURL=dx-style-helper-24.2.js.map
