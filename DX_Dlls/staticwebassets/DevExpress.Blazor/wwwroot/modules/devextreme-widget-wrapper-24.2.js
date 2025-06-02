import { g as getCurrentStyleSheet, i as isRemovedFromDOM } from './dom-utils-24.2.js';
import { waitForCondition } from './utils-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { a as ClientComponentWrapperLoadingPanelVisibilityChangedEvent, b as ClientComponentWrapperOptionsLoadedEvent } from './events-24.2.js';
import { registerTrialPanelComponents } from './dx-license-24.2.js';
import { n } from './property-24.2.js';
import { d as dom } from './dom-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';

const dxtModuleKey = "DevExpress";
const dxtThemeMarkerPrefix = "dx.";
const dxtThemeMarkerClass = "dx-theme-marker";
const baseDxtThemeName = "generic.light";
const dxtThemeMarkerRule = `.${dxtThemeMarkerClass} { font-family: "dx.${baseDxtThemeName}"; }`;
let resourcesIsloaded = false;
class WidgetLoader {
    constructor() {
        this._dxtThemeMarkerLoaded = false;
        this._customThemesCache = {};
    }
    static getInstance() {
        if (!WidgetLoader.instance)
            WidgetLoader.instance = new WidgetLoader();
        return WidgetLoader.instance;
    }
    async initializeWidget(hostElement, typeName, moduleName, options) {
        const WidgetClass = await this.getWidgetClass(typeName, moduleName);
        return new WidgetClass(hostElement, options);
    }
    async registerCustomTheme(theme) {
        if (!theme)
            return;
        const themeName = theme.name;
        const themeStr = JSON.stringify(theme);
        if (this._customThemesCache[themeName] !== themeStr) {
            const module = await this.getVizModule();
            module.registerTheme(theme, baseDxtThemeName);
            this._customThemesCache[themeName] = themeStr;
        }
    }
    ensureDxtThemeMarkerExists() {
        this._dxtThemeMarkerLoaded || (this._dxtThemeMarkerLoaded = this.checkDxtThemeMarkerExists());
        if (this._dxtThemeMarkerLoaded)
            return;
        const styleSheet = getCurrentStyleSheet();
        if (styleSheet) {
            styleSheet.insertRule(dxtThemeMarkerRule);
            this._dxtThemeMarkerLoaded = true;
        }
    }
    checkDxtThemeMarkerExists() {
        const element = document.createElement("div");
        element.className = dxtThemeMarkerClass;
        window.document.body.appendChild(element);
        const fontFamily = window.getComputedStyle(element)["fontFamily"]; // dxt way to load theme marker)
        element.remove();
        return fontFamily.indexOf(dxtThemeMarkerPrefix) > -1;
    }
    async getVizModule() {
        return await this.getDxtModuleOrClass("viz");
    }
    async setLocalization(locale) {
        const localization = await this.getDxtModuleOrClass("localization");
        localization.locale(locale);
    }
    async getWidgetClass(className, moduleName) {
        return await this.getDxtModuleOrClass(moduleName, className);
    }
    async getDxtModuleOrClass(moduleName, className = "") {
        this.ensureDxtThemeMarkerExists();
        if (!resourcesIsloaded)
            await this.loadDxtScripts();
        return this.tryGetDxtModuleOrClass(moduleName, className);
    }
    tryGetDxtModuleOrClass(moduleName, className = "") {
        const globalModule = window[dxtModuleKey];
        const subModule = globalModule === null || globalModule === void 0 ? void 0 : globalModule[moduleName];
        return className ? subModule === null || subModule === void 0 ? void 0 : subModule[className] : subModule;
    }
    async loadDxtScripts() {
        const wnd = window;
        try {
            await waitForCondition(() => { var _a; return !!((_a = wnd.DevExpress) === null || _a === void 0 ? void 0 : _a.ui); });
            resourcesIsloaded = true;
        }
        catch (_) {
            console.error("Failed to load Devextreme scripts");
        }
    }
}

registerTrialPanelComponents();
const isObject = (item) => {
    return (item && typeof item === "object" && !Array.isArray(item));
};
class ClientComponentWrapper extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.optionChunks = "";
        this._firstLoading = true;
        this._loadedChunks = [];
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        this.createComponentIfRequired();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.disposeComponent();
    }
    firstUpdated() {
        this._firstLoading = false;
    }
    createComponentIfRequired() {
        if (!this.canCreateComponent())
            return;
        const options = {};
        this.deepAssign(options, this.createInitOptions(), this.getServerOptions());
        this.createComponent(options);
    }
    processSpecialOptions(_options) { }
    willUpdate(changed) {
        if (!this._firstLoading && changed.has("optionChunks")) {
            const options = this.getServerOptions();
            if (options)
                this.updateComponent(options);
        }
    }
    parseServerOptions(jsonOptions) {
        const data = jsonOptions && JSON.parse(jsonOptions);
        if (!data)
            return;
        const keys = Object.keys(data).filter(key => !this._loadedChunks.includes(key));
        const chunks = keys.map(k => data[k]);
        const options = this.deepAssign({}, ...chunks);
        this.processSpecialOptions(options);
        this.invokeOptionsLoadedEvent(keys);
        this._loadedChunks.push(...keys);
        return options;
    }
    deepAssign(target, ...sources) {
        if (!sources.length)
            return target;
        const source = sources.shift();
        if (isObject(target) && isObject(source)) {
            for (const [key, value] of Object.entries(source)) {
                if (isObject(value)) {
                    if (!target[key])
                        target[key] = {};
                    this.deepAssign(target[key], value);
                }
                else
                    target[key] = value;
            }
        }
        return this.deepAssign(target, ...sources);
    }
    // Placed in this class so that this mechanism can be tested in WebTestRunner tests, should be moved to the DevExtremeWidgetWrapper in the future
    resetEmptyOptions(resetAction, options, path = "") {
        if (!options)
            return;
        const filteredOptions = Object.entries(options)
            .filter(([key]) => !this.getSkippedEmptyOptions().includes(path + key));
        for (const [key, value] of filteredOptions) {
            const optionPath = path + key;
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (isObject(item))
                        this.resetEmptyOptions(resetAction, item, `${optionPath}[${index}].`);
                });
            }
            else if (isObject(value))
                this.resetEmptyOptions(resetAction, value, `${optionPath}.`);
            if (value === null) {
                delete options[key];
                resetAction(optionPath);
            }
        }
    }
    changeLoadingPanelVisibility(visible) {
        this.dispatchEvent(new ClientComponentWrapperLoadingPanelVisibilityChangedEvent(visible));
    }
    invokeOptionsLoadedEvent(optionsChunkKeys) {
        this.dispatchEvent(new ClientComponentWrapperOptionsLoadedEvent(optionsChunkKeys));
    }
    getServerOptions() { return this.parseServerOptions(this.optionChunks); }
    getSkippedEmptyOptions() {
        return [];
    }
}
__decorate([
    n({ attribute: "option-chunks" })
], ClientComponentWrapper.prototype, "optionChunks", void 0);

// supported widgets for custom theming
const customThemeWidgetNames = {
    dxBarGauge: "barGauge",
    dxBullet: "bullet",
    dxChart: "chart",
    dxFunnel: "funnel",
    dxCircularGauge: "gauge",
    dxLinearGauge: "gauge",
    dxVectorMap: "map",
    dxPieChart: "pie",
    dxPolarChart: "polar",
    dxRangeSelector: "rangeSelector",
    dxSankey: "sankey",
    dxSparkline: "sparkline",
    dxTreeMap: "treeMap",
};
/**
* Generates custom themes for widgets as stated here https://js.devexpress.com/jQuery/Documentation/Guide/Themes_and_Styles/SVG-Based_Components_Customization/#Themes/Create_a_Custom_Theme.
*
* @param themedOptionsInfo - A dictionary, where the key is the path to the desired property like "title.font.color",
* and the value is the CSS variable associated with it like "--dxbl-bar-gauge-title-font-color"
* @param widgetTypeName - The name of the widget type, for example "dxBarGauge"
* @param widgetElement - Widget element containing css-variables
* @param name - Individual theme name for widget like dxBarGauge-blazor-theme`
* @returns Custom theme object according to documentation article
*
*/
function generateCustomTheme(themedOptionsInfo, widgetTypeName, widgetElement, name) {
    const dxtSectionName = customThemeWidgetNames[widgetTypeName];
    if (!themedOptionsInfo || !dxtSectionName || !widgetElement)
        return null;
    name !== null && name !== void 0 ? name : (name = `dx-${dxtSectionName}-blazor-theme`);
    const options = getCustomThemeOptions(themedOptionsInfo, widgetElement);
    return Object.keys(options).length > 0 ? { name, [dxtSectionName]: options } : null;
}
function getCustomThemeOptions(themedOptionsInfo, widgetElement) {
    const result = {};
    const style = window.getComputedStyle(widgetElement);
    for (const [key, cssVariableName] of Object.entries(themedOptionsInfo)) {
        const cssValue = style.getPropertyValue(cssVariableName);
        if (!cssValue)
            continue;
        const path = key.split(".");
        applyDefaultThemeDependentOption(path, cssValue, result);
    }
    return result;
}
function applyDefaultThemeDependentOption(path, value, options) {
    path.reduce((result, key, i) => {
        var _a;
        const isLastPart = i === (path.length - 1);
        return isLastPart ? (result[key] = value) : ((_a = result[key]) !== null && _a !== void 0 ? _a : (result[key] = {}));
    }, options);
}

const elementDataKey = "dxInstance";
const widthKey = "width";
const heightKey = "height";
const visibleKey = "visible";
const themeKey = "theme";
const localeKey = "locale";
const defaultWidgetElementClassName = "dxbl-widget-container";
class DevExtremeWidgetWrapper extends ClientComponentWrapper {
    constructor() {
        super(...arguments);
        this._containerSizeChanged = false;
    }
    canCreateComponent() {
        return !this._widgetPromise && !!this.getWidgetElement();
    }
    createComponent(options) {
        this._widgetPromise = this.initializeWidget(options);
    }
    disposeComponent() {
        var _a;
        (_a = this._widgetPromise) === null || _a === void 0 ? void 0 : _a.then(widget => this.disposeWidget(widget)).catch((e) => {
            if (!isRemovedFromDOM(this))
                console.error(e);
        });
    }
    afterWidgetResolved(callback) {
        if (!this._widgetPromise)
            return;
        return this._widgetPromise
            .then(callback)
            .catch((e) => {
            if (!isRemovedFromDOM(this))
                console.error(e);
        });
    }
    disposeWidget(widget) {
        widget.dispose();
    }
    updateComponent(options) {
        var _a;
        if (Object.keys(options).length)
            (_a = this._widgetPromise) === null || _a === void 0 ? void 0 : _a.then(widget => this.updateWidgetOptions(widget, options));
        else if (this._containerSizeChanged)
            this.onlyContainerSizeChanged();
    }
    createInitOptions() {
        const options = {
            ...this.createWidgetDefaultOptions(),
            ...this.createWidgetHandlers()
        };
        return options;
    }
    createWidgetDefaultOptions() { return {}; }
    createWidgetHandlers() {
        return {
            onInitialized: (e) => this.onWidgetInitialized(e),
            onDisposing: (e) => this.onWidgetDisposing(e),
        };
    }
    getWidgetCustomTheme() {
        return generateCustomTheme(this.getThemeDependentOptionsDict(), this.getWidgetTypeName(), this);
    }
    // key: path to widget option like "title.font.color"
    // value: name of Blazor Css variable like "--dxbl-bar-gauge-title-font-color"
    getThemeDependentOptionsDict() {
        return {};
    }
    async initializeWidget(options) {
        const customTheme = this.getWidgetCustomTheme();
        if (customTheme) {
            await this.widgetLoader.registerCustomTheme(customTheme);
            options[themeKey] = customTheme.name;
        }
        this.processLocalization(options);
        this.resetEmptyOptions((option) => { }, options);
        const widgetElement = this.getWidgetElement();
        const widgetTypeName = this.getWidgetTypeName();
        const widgetModuleName = this.getWidgetModuleName();
        return this.widgetLoader.initializeWidget(widgetElement, widgetTypeName, widgetModuleName, options);
    }
    get widgetLoader() {
        var _a;
        (_a = this._loader) !== null && _a !== void 0 ? _a : (this._loader = WidgetLoader.getInstance());
        return this._loader;
    }
    getWidgetElement() { return this.getElementsByClassName(this.getWidgetElementClassName())[0]; }
    getWidgetElementClassName() { return defaultWidgetElementClassName; }
    getWidgetModuleName() { return "viz"; }
    async processLocalization(options) {
        if (options[localeKey]) {
            await this.widgetLoader.setLocalization(options[localeKey]);
            delete options[localeKey];
        }
    }
    updateWidgetOptions(widget, options) {
        widget.beginUpdate();
        this.resetEmptyOptions((option) => { widget.resetOption(option); }, options);
        widget.option(options);
        widget.endUpdate();
    }
    onWidgetInitialized(e) {
        e.element[elementDataKey] = e.component;
    }
    onWidgetDisposing(e) { delete e.element[elementDataKey]; }
    setStyleOptionForElement(key, value) {
        this.getContainerToSetStyle().style.setProperty(key, value);
    }
    processSpecialOptions(_options) {
        const hasWidth = _options[widthKey] !== undefined;
        const hasHeight = _options[heightKey] !== undefined;
        this._containerSizeChanged = hasWidth || hasHeight;
        if (hasWidth) {
            this.setStyleOptionForElement(widthKey, this.getCorrectedSizeValue(_options[widthKey]));
            delete _options[widthKey];
        }
        if (hasHeight) {
            this.setStyleOptionForElement(heightKey, this.getCorrectedSizeValue(_options[heightKey]));
            delete _options[heightKey];
        }
        if (_options[visibleKey] !== undefined)
            dom.DomUtils.toggleClassName(this, CssClasses.Invisible, !_options[visibleKey]);
    }
    getCorrectedSizeValue(value) {
        if (/^[0-9]+$/.test(value)) { // pure number -> px
            const result = parseFloat(value);
            return isNaN(result) ? value : `${result}px`;
        }
        return value;
    }
    getContainerToSetStyle() {
        return this;
    }
    onlyContainerSizeChanged() {
        this.changeLoadingPanelVisibility(false);
    }
    executeClientMethod(methodName, ...args) {
        if (this._widgetPromise) {
            return this._widgetPromise.then(widget => {
                return widget[methodName](...args);
            }).catch((e) => console.error(e));
        }
        return Promise.resolve();
    }
}

export { DevExtremeWidgetWrapper as D, WidgetLoader as W };
//# sourceMappingURL=devextreme-widget-wrapper-24.2.js.map
