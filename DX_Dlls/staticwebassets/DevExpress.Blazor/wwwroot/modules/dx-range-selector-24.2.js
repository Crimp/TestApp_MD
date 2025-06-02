import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
import { c as createFnAfterTimeoutExecutor } from './create-after-timeout-fn-executor-24.2.js';
import { R as RangeSelectorWidgetSettingsConverter, C as ChartSettingsConstants } from './settings-24.2.js';
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

const dxRangeSelectorPrefix = "dxbl-range-selector";
class RangeSelectorDrawnEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(RangeSelectorDrawnEvent.eventName);
    }
}
RangeSelectorDrawnEvent.eventName = dxRangeSelectorPrefix + ".drawn";
class RangeSelectorValuesChangedEvent extends CustomEvent {
    constructor(value, previousValue) {
        super(RangeSelectorValuesChangedEvent.eventName, {
            detail: new ValueChangedEventContext(value, previousValue),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
RangeSelectorValuesChangedEvent.eventName = dxRangeSelectorPrefix + ".value-changed";
class RangeSelectorExportedEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(RangeSelectorExportedEvent.eventName);
    }
}
RangeSelectorExportedEvent.eventName = dxRangeSelectorPrefix + ".exported";
class ValueChangedEventContext {
    constructor(value, previousValue) {
        this.Value = value;
        this.PreviousValue = previousValue;
    }
}
CustomEventsHelper.register(RangeSelectorDrawnEvent.eventName, x => x.detail);
CustomEventsHelper.register(RangeSelectorValuesChangedEvent.eventName, x => x.detail);
CustomEventsHelper.register(RangeSelectorExportedEvent.eventName, x => x.detail);

const RangeSelector = "dxbl-range-selector";
const titleKey = "title";
const fontKey = "font";
const colorKey = "color";
const subtitleKey = "subtitle";
const scaleKey = "scale";
const tickKey = "tick";
const minorTickKey = "minorTick";
const selectedRangeColorKey = "selectedRangeColor";
const sliderMarkerKey = "sliderMarker";
const sliderHandleKey = "sliderHandle";
const shutterKey = "shutter";
const containerBackgroundColorKey = "containerBackgroundColor";
const labelKey = "label";
const fontColorPath = `${fontKey}.${colorKey}`;
const titleFontColorPath = `${titleKey}.${fontColorPath}`;
const subtitleFontColorPath = `${titleKey}.${subtitleKey}.${fontColorPath}`;
const scaleTickColorPath = `${scaleKey}.${tickKey}.${colorKey}`;
const scaleMinorTickColorPath = `${scaleKey}.${minorTickKey}.${colorKey}`;
const selectedRangeColorPath = `${selectedRangeColorKey}`;
const sliderMarkerColorPath = `${sliderMarkerKey}.${colorKey}`;
const sliderMarkerFontColorPath = `${sliderMarkerKey}.${fontColorPath}`;
const sliderHandleColorPath = `${sliderHandleKey}.${colorKey}`;
const shutterColorPath = `${shutterKey}.${colorKey}`;
const containerBackgroundColorPath = `${containerBackgroundColorKey}`;
const scaleLabelFontColorPath = `${scaleKey}.${labelKey}.${fontColorPath}`;
const rangeSelectorCssVarPrefix = `--${RangeSelector}`;
const scaleTickColor = `${rangeSelectorCssVarPrefix}-scale-tick-color`;
const titleColor = `${rangeSelectorCssVarPrefix}-title-font-color`;
const selectedRangeColor = `${rangeSelectorCssVarPrefix}-selected-range-color`;
const sliderMarkerColor = `${rangeSelectorCssVarPrefix}-slider-marker-color`;
const sliderMarkerFontColor = `${rangeSelectorCssVarPrefix}-slider-marker-font-color`;
const sliderHandleColor = `${rangeSelectorCssVarPrefix}-slider-handle-color`;
const shutterColor = `${rangeSelectorCssVarPrefix}-shutter-color`;
const containerBackgroundColor = `${rangeSelectorCssVarPrefix}-container-background-color`;
const scaleLabelFontColor = `${rangeSelectorCssVarPrefix}-scale-label-font-color`;
const RangeSelectorClientMethods = {
    exportTo: "exportTo",
    print: "print",
    svg: "svg"
};
let DxRangeSelector = class DxRangeSelector extends DevExtremeWidgetWrapper {
    get styleHelper() {
        return this._styleHelper;
    }
    constructor() {
        super();
        this._styleHelper = ClientComponentStyleHelper.getInstance();
        this._drawnExecutor = createFnAfterTimeoutExecutor(this.onDrawn.bind(this));
        this._widgetSettingsConverter = this.createWidgetSettingsConverter();
    }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onDrawn: () => this.onDrawn(),
            onOptionChanged: () => this.onOptionChanged(),
            onValueChanged: (e) => this.onValueChanged(e),
            onExported: () => this.onExported()
        };
    }
    getWidgetTypeName() {
        return "dxRangeSelector";
    }
    createWidgetSettingsConverter() {
        return new RangeSelectorWidgetSettingsConverter();
    }
    createInitOptions() {
        const options = super.createInitOptions();
        const defaultSettings = this._widgetSettingsConverter.createDefaultSettings();
        options.dataPrepareSettings = defaultSettings.dataPrepareSettings;
        options.scale = {
            label: {
                font: { opacity: ChartSettingsConstants.defaultAxisLabelFontOpacity }
            }
        };
        options.chart = {
            commonSeriesSettings: defaultSettings.commonSeriesSettings,
            palette: this.styleHelper.palette
        };
        return options;
    }
    onDrawn() {
        this._drawnExecutor.reset();
        this.changeLoadingPanelVisibility(false);
        this.dispatchEvent(new RangeSelectorDrawnEvent());
    }
    onlyContainerSizeChanged() {
        this.onDrawn();
    }
    onOptionChanged() {
        this._drawnExecutor.execute();
    }
    onValueChanged(e) {
        this.dispatchEvent(new RangeSelectorValuesChangedEvent(e.value, e.previousValue));
    }
    onExported() {
        this.dispatchEvent(new RangeSelectorExportedEvent());
    }
    createWidgetDefaultOptions() {
        return {
            height: "100%",
            width: "100%"
        };
    }
    processSpecialOptions(options) {
        super.processSpecialOptions(options);
        this.prepareValueOptions(options);
        this.prepareImageOptions(options);
        this.prepareBehaviorOptions(options);
        if (options.chart)
            this._widgetSettingsConverter.processSpecialChartSettings(options, options.chart);
    }
    prepareOptions(options, targetKey, mappings) {
        options[targetKey] = options[targetKey] || {};
        for (const [sourceKey, targetSubKey] of Object.entries(mappings)) {
            if (sourceKey in options) {
                options[targetKey][targetSubKey] = options[sourceKey];
                delete options[sourceKey];
            }
        }
    }
    prepareValueOptions(options) {
        this.prepareOptions(options, "value", {
            "selectedRangeStartValue": "startValue",
            "selectedRangeEndValue": "endValue",
            "selectedRangeLength": "length"
        });
    }
    prepareImageOptions(options) {
        if ("background" in options) {
            this.prepareOptions(options.background, "image", {
                "imagePosition": "location",
                "imageUrl": "url"
            });
        }
    }
    prepareBehaviorOptions(options) {
        this.prepareOptions(options, "behavior", {
            "allowSlidersSwap": "allowSlidersSwap",
            "animationEnabled": "animationEnabled",
            "manualRangeSelectionEnabled": "manualRangeSelectionEnabled",
            "moveSelectedRangeByClick": "moveSelectedRangeByClick",
            "snapToTicks": "snapToTicks",
            "valueChangeMode": "valueChangeMode"
        });
    }
    // DevExtreme Client Methods
    [RangeSelectorClientMethods.exportTo](...args) {
        return this.executeClientMethod(RangeSelectorClientMethods.exportTo, ...args);
    }
    [RangeSelectorClientMethods.print](...args) {
        return this.executeClientMethod(RangeSelectorClientMethods.print, ...args);
    }
    [RangeSelectorClientMethods.svg](...args) {
        return this.executeClientMethod(RangeSelectorClientMethods.svg, ...args);
    }
    getThemeDependentOptionsDict() {
        const options = {
            [titleFontColorPath]: titleColor,
            [subtitleFontColorPath]: titleColor,
            [scaleTickColorPath]: scaleTickColor,
            [scaleMinorTickColorPath]: scaleTickColor,
            [selectedRangeColorPath]: selectedRangeColor,
            [sliderMarkerColorPath]: sliderMarkerColor,
            [sliderMarkerFontColorPath]: sliderMarkerFontColor,
            [sliderHandleColorPath]: sliderHandleColor,
            [shutterColorPath]: shutterColor,
            [containerBackgroundColorPath]: containerBackgroundColor,
            [scaleLabelFontColorPath]: scaleLabelFontColor
        };
        return { ...super.getThemeDependentOptionsDict(), ...options };
    }
};
DxRangeSelector = __decorate([
    e("dxbl-range-selector")
], DxRangeSelector);

export { DxRangeSelector, RangeSelector };
//# sourceMappingURL=dx-range-selector-24.2.js.map
