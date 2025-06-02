import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
import { c as createFnAfterTimeoutExecutor } from './create-after-timeout-fn-executor-24.2.js';
import { C as ClientComponentStyleHelper } from './client-component-style-helper-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './utils-24.2.js';
import './single-slot-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './property-24.2.js';

const dxGaugeBasePrefix = "dxbl-gauge-base";
class GaugeDrawnEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(GaugeDrawnEvent.eventName);
    }
}
GaugeDrawnEvent.eventName = dxGaugeBasePrefix + ".drawn";
class GaugeExportedEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(GaugeExportedEvent.eventName);
    }
}
GaugeExportedEvent.eventName = dxGaugeBasePrefix + ".exported";
CustomEventsHelper.register(GaugeDrawnEvent.eventName, x => x.detail);
CustomEventsHelper.register(GaugeExportedEvent.eventName, x => x.detail);

class DxGaugeBase extends DevExtremeWidgetWrapper {
    constructor() {
        super();
        this._styleHelper = ClientComponentStyleHelper.getInstance();
        this._drawnExecutor = createFnAfterTimeoutExecutor(this.onGaugeDrawn.bind(this));
    }
    createWidgetDefaultOptions() {
        return {
            palette: this._styleHelper.palette
        };
    }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onDrawn: () => this.onGaugeDrawn(),
            onOptionChanged: () => this.onGaugeOptionChanged(),
            onExported: () => this.onGaugeExported()
        };
    }
    onGaugeDrawn() {
        this._drawnExecutor.reset();
        this.changeLoadingPanelVisibility(false);
        this.dispatchEvent(new GaugeDrawnEvent());
    }
    onGaugeOptionChanged() {
        this._drawnExecutor.execute();
    }
    onGaugeExported() {
        this.dispatchEvent(new GaugeExportedEvent());
    }
    onlyContainerSizeChanged() {
        this.onGaugeDrawn();
    }
    // DevExtreme Client Methods
    exportTo(...args) {
        return this.executeClientMethod("exportTo", ...args);
    }
    print(...args) {
        return this.executeClientMethod("print", ...args);
    }
    svg(...args) {
        return this.executeClientMethod("svg", ...args);
    }
}

const barGaugeTag = "dxbl-bar-gauge";
const legendKey = "legend";
const legendItemCaptionsKey = "itemCaptions";
const customizeTextKey = "customizeText";
const colorKey = "color";
const fontKey = "font";
const subtitleKey = "subtitle";
const titleKey = "title";
const fontColorPath = `${fontKey}.${colorKey}`;
const legendFontColorPath = `${legendKey}.${fontColorPath}`;
const titleFontColorPath = `${titleKey}.${fontColorPath}`;
const subtitleFontColorPath = `${titleKey}.${subtitleKey}.${fontColorPath}`;
const legendTitleFontColorPath = `${legendKey}.${titleFontColorPath}`;
const legendSubtitleFontColorPath = `${legendKey}.${subtitleFontColorPath}`;
const barGaugeCSSprefix = `--${barGaugeTag}`;
const legendCSSPrefix = `${barGaugeCSSprefix}-${legendKey}`;
const fontColorCSSPostfix = `${fontKey}-${colorKey}`;
const titleFontColorCSSPostfix = `${titleKey}-${fontColorCSSPostfix}`;
const subtitleFontColorCSSPostfix = `${subtitleKey}-${fontColorCSSPostfix}`;
let DxBarGauge = class DxBarGauge extends DxGaugeBase {
    getWidgetTypeName() { return "dxBarGauge"; }
    processSpecialOptions(_options) {
        super.processSpecialOptions(_options);
        this.prepareLegend(_options[legendKey]);
    }
    prepareLegend(legend) {
        const itemCaptions = legend === null || legend === void 0 ? void 0 : legend[legendItemCaptionsKey];
        if (itemCaptions) {
            legend[customizeTextKey] = (arg) => {
                var _a, _b;
                const barIndex = (_a = arg.item) === null || _a === void 0 ? void 0 : _a.index;
                return (_b = itemCaptions[barIndex]) !== null && _b !== void 0 ? _b : arg.text;
            };
            delete legend[legendItemCaptionsKey];
        }
    }
    getThemeDependentOptionsDict() {
        const options = {
            [titleFontColorPath]: `${barGaugeCSSprefix}-${titleFontColorCSSPostfix}`,
            [subtitleFontColorPath]: `${barGaugeCSSprefix}-${subtitleFontColorCSSPostfix}`,
            [legendFontColorPath]: `${legendCSSPrefix}-item-${fontColorCSSPostfix}`,
            [legendTitleFontColorPath]: `${legendCSSPrefix}-${titleFontColorCSSPostfix}`,
            [legendSubtitleFontColorPath]: `${legendCSSPrefix}-${subtitleFontColorCSSPostfix}`
        };
        return { ...super.getThemeDependentOptionsDict(), ...options };
    }
};
DxBarGauge = __decorate([
    e(barGaugeTag)
], DxBarGauge);

export { DxBarGauge };
//# sourceMappingURL=dx-bar-gauge-24.2.js.map
