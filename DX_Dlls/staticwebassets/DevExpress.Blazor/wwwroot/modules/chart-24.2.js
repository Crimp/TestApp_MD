import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxChartBase, C as ChartStringConsts, L as LegendItemType, a as ChartVisualRangeChangedEvent } from './baseChart-24.2.js';
import { C as ChartSettingsConstants, X as XYChartWidgetSettingsConverter, a as ChartCssVariables } from './settings-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './disposable-24.2.js';
import './devextreme-widget-wrapper-24.2.js';
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
import './events-24.2.js';
import './custom-events-helper-24.2.js';
import './create-after-timeout-fn-executor-24.2.js';
import './client-component-style-helper-24.2.js';

const xyChartTag = "dxbl-chart";
const axisTitleFontColorPath = `${ChartSettingsConstants.commonAxisSettingsKey}.title.font.${ChartSettingsConstants.colorKey}`;
const constantLineColorPath = `${ChartSettingsConstants.commonAxisSettingsKey}.${ChartSettingsConstants.constantLineStyleKey}.${ChartSettingsConstants.colorKey}`;
const axisLineColorPath = `${ChartSettingsConstants.commonAxisSettingsKey}.${ChartSettingsConstants.colorKey}`;
const seriesPointHoverColorPath = `${ChartSettingsConstants.commonSeriesSettingsKey}.point.hoverStyle.${ChartSettingsConstants.colorKey}`;
const errorBarColorPath = `${ChartSettingsConstants.commonSeriesSettingsKey}.valueErrorBar.${ChartSettingsConstants.colorKey}`;
const annotationsColorPath = `${ChartSettingsConstants.commonAnnotationSettingsKey}.${ChartSettingsConstants.colorKey}`;
const annotationsTextColorPath = `${ChartSettingsConstants.commonAnnotationSettingsKey}.font.${ChartSettingsConstants.colorKey}`;
let DxChart = class DxChart extends DxChartBase {
    constructor() {
        super(...arguments);
        this._pointClickArgs = null;
    }
    getWidgetTypeName() { return ChartStringConsts.xyChartName; }
    getLegendItemType() { return LegendItemType.series; }
    createWidgetSettingsConverter() {
        return new XYChartWidgetSettingsConverter();
    }
    getThemeDependentOptionsDict() {
        const options = {
            [axisTitleFontColorPath]: ChartCssVariables.axisTitleFontColor,
            [constantLineColorPath]: ChartCssVariables.constantLineColor,
            [axisLineColorPath]: ChartCssVariables.axisLineColor,
            [seriesPointHoverColorPath]: ChartCssVariables.seriesPointHoverColor,
            [errorBarColorPath]: ChartCssVariables.errorBarColor,
            [annotationsColorPath]: ChartCssVariables.annotationColor,
            [annotationsTextColorPath]: ChartCssVariables.annotationTextColor
        };
        return { ...super.getThemeDependentOptionsDict(), ...options };
    }
    configureSelectionController(optExt) {
        if (optExt.seriesSelectionMode !== undefined)
            this.selectionController.setSeriesSelectionMode(optExt.seriesSelectionMode);
        super.configureSelectionController(optExt);
    }
    getChartOnPointClickHandler() {
        return (e) => { this._pointClickArgs = e; };
    }
    getChartOnSeriesClickHandler() {
        return (e) => {
            var _a;
            const series = e.target;
            const point = (_a = this._pointClickArgs) === null || _a === void 0 ? void 0 : _a.target;
            this.onSeriesClick(series.index, point === null || point === void 0 ? void 0 : point.data, point === null || point === void 0 ? void 0 : point.tag);
            this._pointClickArgs = null;
            this.selectionController.selectSeriesAndPoint(series, point);
        };
    }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onZoomEnd: (e) => this.onChartVisualRangeChanged(e),
        };
    }
    onChartVisualRangeChanged(data) {
        const evt = new ChartVisualRangeChangedEvent(data);
        this.dispatchEvent(evt);
    }
    resetVisualRange() {
        this.afterWidgetResolved(chart => {
            chart.resetVisualRange();
        });
    }
    setArgumentAxisVisualRange(range) {
        this.afterWidgetResolved(chart => {
            chart.getArgumentAxis().visualRange(range);
        });
    }
    setValueAxisVisualRange(range, axisName) {
        this.afterWidgetResolved(chart => {
            var _a;
            (_a = chart.getValueAxis(axisName)) === null || _a === void 0 ? void 0 : _a.visualRange(range);
        });
    }
};
DxChart = __decorate([
    e(xyChartTag)
], DxChart);

export { DxChart };
//# sourceMappingURL=chart-24.2.js.map
