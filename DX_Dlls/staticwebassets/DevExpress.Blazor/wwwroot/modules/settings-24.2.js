import { m as math, d as dom } from './dom-24.2.js';
import { c as changeDom } from './dom-utils-24.2.js';

const Chart = "dxbl-chart";
const ChartFirstLoading = "dxbl-chart-first-loading";
const ChartLegend = "dxbl-chart-legend";
const ChartLegendIcon = "dxbl-chart-legend-icon";
const ChartLegendDefIcon = "dxbl-chart-legend-def-icon";
const ChartLegendItem = "dxbl-chart-legend-item";
const ChartToolTip = "dxbl-chart-tooltip";
const ChartToolTipPointer = "dxbl-chart-tooltip-pointer";
const chartCssVarPrefix = `--${Chart}`;
class ChartCssVariables {
}
ChartCssVariables.axisTitleFontColor = `${chartCssVarPrefix}-axis-title-font-color`;
ChartCssVariables.axisLineColor = `${chartCssVarPrefix}-axis-line-color`;
ChartCssVariables.constantLineColor = `${chartCssVarPrefix}-constant-line-color`;
ChartCssVariables.seriesPointHoverColor = `${chartCssVarPrefix}-point-hover-color`;
ChartCssVariables.errorBarColor = `${chartCssVarPrefix}-error-bar-color`;
ChartCssVariables.annotationColor = `${chartCssVarPrefix}-annotation-color`;
ChartCssVariables.annotationTextColor = `${chartCssVarPrefix}-annotation-text-color`;

const tooltipCssSelector = "." + ChartToolTip;
const pointerCssSelector = "." + ChartToolTipPointer;
class ChartTooltipHelper {
    constructor(owner) {
        this.currentPointInfo = null;
        this._owner = owner;
    }
    onTooltipHidden(evt) {
        if (evt.isPointerOut)
            this.hideTooltip(false);
    }
    onTooltipShown(evt, callback) {
        const point = evt.target;
        if (!point || !point.series)
            return;
        const id = math.MathUtils.generateGuid();
        this.currentPointInfo = { chartPoint: point, x: evt.x, y: evt.y, id };
        const pointData = { seriesIndex: point.series.index, data: point.data, tag: point.tag, id };
        callback(pointData);
    }
    hideTooltip(clearHover) {
        var _a, _b;
        if (clearHover && ((_b = (_a = this.currentPointInfo) === null || _a === void 0 ? void 0 : _a.chartPoint) === null || _b === void 0 ? void 0 : _b.series))
            this.currentPointInfo.chartPoint.clearHover();
        const tooltip = this._owner.querySelector(tooltipCssSelector);
        if (tooltip)
            changeDom(() => tooltip.classList.remove("dxbl-visible"));
        this.currentPointInfo = null;
    }
    positionTooltip() {
        if (!this.currentPointInfo)
            return;
        const x = this.currentPointInfo["x"];
        const y = this.currentPointInfo["y"];
        const rootElement = this._owner;
        const chartContainer = rootElement.getWidgetElement();
        const tooltip = rootElement === null || rootElement === void 0 ? void 0 : rootElement.querySelector(tooltipCssSelector);
        if (!tooltip)
            return;
        const tooltipOffsetParent = tooltip.offsetParent;
        const tooltipTop = y - dom.DomUtils.getAbsolutePositionY(tooltipOffsetParent);
        let tooltipLeft = x - dom.DomUtils.getAbsolutePositionX(tooltipOffsetParent);
        let pointerPositionDelta = 0;
        const correctedLeft = this.getCorrectedTooltipLeft(tooltipLeft, tooltip, rootElement, chartContainer);
        if (correctedLeft !== null) {
            pointerPositionDelta = tooltipLeft - correctedLeft;
            tooltipLeft = correctedLeft;
        }
        this.applyTooltipPosition(tooltipLeft, tooltipTop, pointerPositionDelta, tooltip);
    }
    getCorrectedTooltipLeft(left, tooltip, widgetElement, chartContainer) {
        let result = null;
        const halfWidth = tooltip.getBoundingClientRect().width / 2;
        const chartContainerRect = chartContainer.getBoundingClientRect();
        if (left < halfWidth) {
            const chartContainerParent = chartContainer.offsetParent;
            const chartContainerParentLeft = (chartContainerParent === null || chartContainerParent === void 0 ? void 0 : chartContainerParent.getBoundingClientRect().left) || 0;
            const chartLeftPoint = chartContainerRect.left - chartContainerParentLeft;
            result = chartLeftPoint + halfWidth;
        }
        else {
            const chartRightPoint = (widgetElement.getBoundingClientRect().width + chartContainerRect.width) / 2;
            if (left + halfWidth > chartRightPoint)
                result = chartRightPoint - halfWidth;
        }
        return result;
    }
    applyTooltipPosition(left, top, pointerPositionDelta, tooltip) {
        const pointer = tooltip.querySelector(pointerCssSelector);
        const tooltipTopCss = `calc(${top}px - 0.625rem)`;
        const tooltipLeftCss = `${left}px`;
        const tootlipClassList = tooltip.classList;
        const pointerLeftCss = pointerPositionDelta !== 0 ? `calc(50% + ${pointerPositionDelta}px)` : "50%";
        changeDom(function () {
            tooltip.style.top = tooltipTopCss;
            tooltip.style.left = tooltipLeftCss;
            pointer.style.left = pointerLeftCss;
            if (!tootlipClassList.contains("dxbl-visible"))
                tootlipClassList.add("dxbl-visible");
        });
    }
}
function getTooltipSettings(serverSettings) {
    var _a, _b;
    const hasTooltip = !!((_a = serverSettings.tooltip) === null || _a === void 0 ? void 0 : _a.enabled);
    return {
        enabled: false,
        forceEvents: hasTooltip,
        location: ((_b = serverSettings.tooltip) === null || _b === void 0 ? void 0 : _b.location) || undefined
    };
}

class ChartSettingsConstants {
}
ChartSettingsConstants.argumentAxisKey = "argumentAxis";
ChartSettingsConstants.commonAnnotationSettingsKey = "commonAnnotationSettings";
ChartSettingsConstants.commonAxisSettingsKey = "commonAxisSettings";
ChartSettingsConstants.commonSeriesSettingsKey = "commonSeriesSettings";
ChartSettingsConstants.colorKey = "color";
ChartSettingsConstants.constantLineStyleKey = "constantLineStyle";
ChartSettingsConstants.customizeLabelKey = "customizeLabel";
ChartSettingsConstants.customizePointKey = "customizePoint";
ChartSettingsConstants.customizeTextKey = "customizeText";
ChartSettingsConstants.customLabelTextKey = "texts";
ChartSettingsConstants.dataSourceKey = "dataSource";
ChartSettingsConstants.legendKey = "legend";
ChartSettingsConstants.seriesKey = "series";
ChartSettingsConstants.seriesDataKey = "seriesData";
ChartSettingsConstants.seriesPointsKey = "points";
ChartSettingsConstants.seriesTemplateKey = "seriesTemplate";
ChartSettingsConstants.titleKey = "title";
ChartSettingsConstants.tooltipKey = "tooltip";
ChartSettingsConstants.visualRangeKey = "visualRange";
ChartSettingsConstants.defaultLegendHoverMode = "includePoints";
ChartSettingsConstants.defaultSeriesNameField = "seriesId";
ChartSettingsConstants.defaultSeriesArgumentField = "argument";
ChartSettingsConstants.defaultSeriesValueField = "value";
ChartSettingsConstants.defaultOpenValueField = "openValue";
ChartSettingsConstants.defaultHighValueField = "highValue";
ChartSettingsConstants.defaultLowValueField = "lowValue";
ChartSettingsConstants.defaultCloseValueField = "closeValue";
ChartSettingsConstants.defaultRangeValue1Field = "startValue";
ChartSettingsConstants.defaultRangeValue2Field = "endValue";
ChartSettingsConstants.defaultSizeField = "size";
ChartSettingsConstants.seriesTypeRangeBar = "rangebar";
ChartSettingsConstants.seriesTypeRangeArea = "rangearea";
ChartSettingsConstants.seriesTypeBar = "bar";
ChartSettingsConstants.seriesTypeDonut = "donut";
ChartSettingsConstants.defaultAxisLabelOverlappingBehavior = "rotate";
ChartSettingsConstants.defaultAxisLabelRotationAngle = 45;
ChartSettingsConstants.defaultAxisLabelFontOpacity = 0.75;
ChartSettingsConstants.defaultAnnotationType = "text";
ChartSettingsConstants.defaultStripLabelAlignment = "auto";
class ChartWidgetSettingsConverter {
    convert(serverSettings, needDefaultSettings = false) {
        const settings = needDefaultSettings ? this.createDefaultSettings() : {};
        this.processServerSettings(settings, serverSettings);
        return settings;
    }
    createDefaultSettings() {
        return {
            dataPrepareSettings: { sortingMethod: false },
            adaptiveLayout: { width: 0, height: 0 },
            pathModified: false,
            commonSeriesSettings: this.getDefaultCommonSeriesSettings(),
            commonAnnotationSettings: this.getDefaultAnnotationSettings(),
            legend: {
                visible: false,
                hoverMode: ChartSettingsConstants.defaultLegendHoverMode
            }
        };
    }
    processServerSettings(widgetSettings, serverSettings) {
        if (widgetSettings) {
            this.processSettingsInCommon(widgetSettings, serverSettings);
            this.processSpecialSettings(widgetSettings, serverSettings);
        }
    }
    processSettingsInCommon(widgetSettings, serverSettings) {
        const keysToSkip = this.getSpecialProcessingOptionNames();
        for (const prop in serverSettings) {
            const canProcessProperty = Object.prototype.hasOwnProperty.call(serverSettings, prop) && !keysToSkip.includes(prop);
            if (canProcessProperty)
                this.addOption(widgetSettings, prop, serverSettings[prop]);
        }
    }
    getSpecialProcessingOptionNames() {
        return [
            ChartSettingsConstants.legendKey,
            ChartSettingsConstants.tooltipKey,
            ChartSettingsConstants.seriesTemplateKey,
            ChartSettingsConstants.dataSourceKey,
            ChartSettingsConstants.seriesKey,
            ChartSettingsConstants.seriesDataKey,
            ChartSettingsConstants.titleKey
        ];
    }
    isSeriesDeleted(serverSettings) {
        var _a;
        return ((_a = serverSettings.series) === null || _a === void 0 ? void 0 : _a.length) === 0 && !serverSettings[ChartSettingsConstants.seriesDataKey];
    }
    processSpecialSettings(widgetSettings, serverSettings) {
        var _a, _b;
        this.processSeriesSettings(widgetSettings, serverSettings.series);
        this.processSeriesDataIfNeeded(widgetSettings, serverSettings);
        if ((_a = serverSettings.legend) === null || _a === void 0 ? void 0 : _a.hoverMode) {
            this.addOption(widgetSettings, ChartSettingsConstants.legendKey, {
                hoverMode: (_b = serverSettings.legend) === null || _b === void 0 ? void 0 : _b.hoverMode
            });
        }
        if (serverSettings[ChartSettingsConstants.tooltipKey] !== undefined)
            this.addOption(widgetSettings, ChartSettingsConstants.tooltipKey, getTooltipSettings(serverSettings), true);
    }
    processSeriesDataIfNeeded(widgetSettings, serverSettings) {
        if (this.isSeriesDeleted(serverSettings))
            widgetSettings[ChartSettingsConstants.dataSourceKey] = [];
        else
            this.processSeriesData(widgetSettings, serverSettings[ChartSettingsConstants.seriesDataKey]);
    }
    getDefaultCommonSeriesSettings() {
        return {
            argumentField: ChartSettingsConstants.defaultSeriesArgumentField,
            valueField: ChartSettingsConstants.defaultSeriesValueField
        };
    }
    getDefaultAnnotationSettings() {
        return {
            type: ChartSettingsConstants.defaultAnnotationType
        };
    }
    addOption(widgetSettings, optionName, value, forceRewrite = false) {
        const isObject = typeof value === "object";
        const hasOption = widgetSettings[optionName] !== undefined;
        const shouldRewrite = forceRewrite || !hasOption || !isObject || value instanceof Array;
        if (shouldRewrite)
            widgetSettings[optionName] = value;
        else
            Object.assign(widgetSettings[optionName], value);
    }
    processSeriesSettings(widgetSettings, seriesSettings) {
        if (seriesSettings) {
            const seriesTemplate = {
                nameField: ChartSettingsConstants.defaultSeriesNameField,
                customizeSeries: function (valueFromNameField) {
                    return seriesSettings.filter(function (s) { return s.seriesId === valueFromNameField; })[0];
                }
            };
            this.addOption(widgetSettings, ChartSettingsConstants.seriesTemplateKey, seriesTemplate, true);
        }
    }
    processSeriesData(widgetSettings, seriesData) {
        if (!seriesData)
            return;
        const source = [];
        let hasCustomLabel = false;
        let hasCustomPoint = false;
        for (let i = 0; i < seriesData.length; i++) {
            const seriesItem = seriesData[i];
            const seriesId = seriesItem[ChartSettingsConstants.defaultSeriesNameField];
            const points = seriesItem[ChartSettingsConstants.seriesPointsKey];
            points === null || points === void 0 ? void 0 : points.forEach(p => {
                hasCustomLabel || (hasCustomLabel = !!p.pointLabel);
                hasCustomPoint || (hasCustomPoint = !!p.pointAppearance);
                const item = this.createWidgetDataitem(seriesId, p);
                source.push(item);
            });
        }
        widgetSettings[ChartSettingsConstants.dataSourceKey] = source;
        widgetSettings[ChartSettingsConstants.customizeLabelKey] = hasCustomLabel ? (point) => { return this.createWidgetPointLabelSettings(point); } : null;
        widgetSettings[ChartSettingsConstants.customizePointKey] = hasCustomPoint ? (point) => { return point.data.pointAppearance; } : null;
    }
    createWidgetDataitem(seriesName, seriesPointData) {
        const item = Object.assign({}, seriesPointData);
        item[ChartSettingsConstants.defaultSeriesNameField] = seriesName;
        return item;
    }
    createWidgetPointLabelSettings(point) {
        // the returned object must match
        // https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxChart/Configuration/commonSeriesSettings/label/
        const pointLabel = { ...point.data.pointLabel };
        const customTexts = pointLabel[ChartSettingsConstants.customLabelTextKey];
        if (customTexts) {
            delete pointLabel[ChartSettingsConstants.customLabelTextKey];
            const series = point.series;
            const isRangeSeries = series.type === ChartSettingsConstants.seriesTypeRangeBar || series.type === ChartSettingsConstants.seriesTypeRangeArea;
            // https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxChart/Configuration/commonSeriesSettings/label/#customizeText
            pointLabel[ChartSettingsConstants.customizeTextKey] = (labelPointInfo) => {
                if (isRangeSeries && customTexts.length > 1)
                    return labelPointInfo.value === point.minValue ? customTexts[0] : customTexts[1];
                return customTexts[0];
            };
        }
        return pointLabel;
    }
}
class CommonChartWidgetSettingConverter extends ChartWidgetSettingsConverter {
    getDefaultCommonSeriesSettings() {
        const settings = {
            openValueField: ChartSettingsConstants.defaultOpenValueField,
            highValueField: ChartSettingsConstants.defaultHighValueField,
            lowValueField: ChartSettingsConstants.defaultLowValueField,
            closeValueField: ChartSettingsConstants.defaultCloseValueField,
            rangeValue1Field: ChartSettingsConstants.defaultRangeValue1Field,
            rangeValue2Field: ChartSettingsConstants.defaultRangeValue2Field,
            sizeField: ChartSettingsConstants.defaultSizeField,
            type: ChartSettingsConstants.seriesTypeBar
        };
        return Object.assign({}, super.getDefaultCommonSeriesSettings(), settings);
    }
}
class XYChartWidgetSettingsConverter extends CommonChartWidgetSettingConverter {
    createDefaultSettings() {
        const options = super.createDefaultSettings();
        options.commonAxisSettings = this.getDefaultCommonAxisSettings();
        options.resizePanesOnZoom = true;
        return options;
    }
    processSpecialSettings(widgetSettings, serverSettings) {
        var _a;
        var _b;
        super.processSpecialSettings(widgetSettings, serverSettings);
        if (widgetSettings.argumentAxis)
            (_a = (_b = widgetSettings.argumentAxis).categories) !== null && _a !== void 0 ? _a : (_b.categories = []);
        this.processStripSettings(widgetSettings);
    }
    processStripSettings(widgetSettings) {
        var _a, _b, _c;
        const argumentAxisStrips = (_b = (_a = widgetSettings.argumentAxis) === null || _a === void 0 ? void 0 : _a.strips) !== null && _b !== void 0 ? _b : [];
        const valueAxes = (_c = widgetSettings.valueAxis) !== null && _c !== void 0 ? _c : [];
        const valueAxisStrips = valueAxes.reduce((acc, axis) => {
            var _a;
            return acc.concat((_a = axis.strips) !== null && _a !== void 0 ? _a : []);
        }, []);
        const commonStrips = argumentAxisStrips.concat(valueAxisStrips);
        commonStrips.forEach((strip) => {
            const label = strip.label;
            if ((label === null || label === void 0 ? void 0 : label.horizontalAlignment) === ChartSettingsConstants.defaultStripLabelAlignment)
                label.horizontalAlignment = undefined;
            if ((label === null || label === void 0 ? void 0 : label.verticalAlignment) === ChartSettingsConstants.defaultStripLabelAlignment)
                label.verticalAlignment = undefined;
        });
    }
    getDefaultCommonAxisSettings() {
        const axisColor = window.getComputedStyle(document.body).getPropertyValue("color");
        return {
            label: {
                overlappingBehavior: ChartSettingsConstants.defaultAxisLabelOverlappingBehavior,
                rotationAngle: ChartSettingsConstants.defaultAxisLabelRotationAngle,
                font: {
                    color: axisColor,
                    opacity: ChartSettingsConstants.defaultAxisLabelFontOpacity
                }
            }
        };
    }
}
class PieChartWidgetSettingsConverter extends ChartWidgetSettingsConverter {
    getDefaultCommonSeriesSettings() {
        const base = super.getDefaultCommonSeriesSettings();
        base.type = ChartSettingsConstants.seriesTypeDonut;
        return base;
    }
    createDefaultSettings() {
        const options = super.createDefaultSettings();
        options.innerRadius = 0;
        return options;
    }
}
class PolarChartWidgetSettingsConverter extends ChartWidgetSettingsConverter {
    getDefaultCommonSeriesSettings() {
        const base = super.getDefaultCommonSeriesSettings();
        base.type = ChartSettingsConstants.seriesTypeBar;
        return base;
    }
}
class RangeSelectorWidgetSettingsConverter extends CommonChartWidgetSettingConverter {
    processSpecialChartSettings(widgetSettings, serverSettings) {
        this.processSeriesSettings(widgetSettings.chart, serverSettings.series);
        this.processSeriesDataIfNeeded(widgetSettings, serverSettings);
    }
    processSeriesSettings(widgetSettings, seriesSettings) {
        super.processSeriesSettings(widgetSettings, seriesSettings);
        delete widgetSettings.series;
    }
    processSeriesDataIfNeeded(widgetSettings, serverSettings) {
        super.processSeriesDataIfNeeded(widgetSettings, serverSettings);
        delete widgetSettings.chart.seriesData;
        delete widgetSettings.customizeLabel;
        delete widgetSettings.customizePoint;
    }
}

export { ChartSettingsConstants as C, PieChartWidgetSettingsConverter as P, RangeSelectorWidgetSettingsConverter as R, XYChartWidgetSettingsConverter as X, ChartCssVariables as a, ChartLegendItem as b, ChartLegendIcon as c, ChartLegendDefIcon as d, ChartTooltipHelper as e, ChartLegend as f, ChartFirstLoading as g, PolarChartWidgetSettingsConverter as h };
//# sourceMappingURL=settings-24.2.js.map
