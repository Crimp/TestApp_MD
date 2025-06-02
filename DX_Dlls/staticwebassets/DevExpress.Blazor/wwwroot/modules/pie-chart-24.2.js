import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxChartBase, C as ChartStringConsts, L as LegendItemType } from './baseChart-24.2.js';
import { P as PieChartWidgetSettingsConverter } from './settings-24.2.js';
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

const pieChartTag = "dxbl-pie-chart";
let DxPieChart = class DxPieChart extends DxChartBase {
    getWidgetTypeName() { return ChartStringConsts.pieChartName; }
    createWidgetSettingsConverter() {
        return new PieChartWidgetSettingsConverter();
    }
    getLegendItemType() { return LegendItemType.point; }
    getChartOnPointClickHandler() {
        const selectionController = this.selectionController;
        return (e) => {
            const point = e.target;
            this.onSeriesClick(point.series.index, point.data, point.tag);
            selectionController.togglePointSelection(point);
        };
    }
};
DxPieChart = __decorate([
    e(pieChartTag)
], DxPieChart);

export { DxPieChart };
//# sourceMappingURL=pie-chart-24.2.js.map
