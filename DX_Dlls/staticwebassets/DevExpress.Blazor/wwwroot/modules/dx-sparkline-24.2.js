import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
import { c as createFnAfterTimeoutExecutor } from './create-after-timeout-fn-executor-24.2.js';
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

const dxSparklinePrefix = "dxbl-sparkline";
class SparklineDrawnEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(SparklineDrawnEvent.eventName);
    }
}
SparklineDrawnEvent.eventName = dxSparklinePrefix + ".drawn";
class SparklineExportedEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(SparklineExportedEvent.eventName);
    }
}
SparklineExportedEvent.eventName = dxSparklinePrefix + ".exported";
CustomEventsHelper.register(SparklineDrawnEvent.eventName, x => x.detail);
CustomEventsHelper.register(SparklineExportedEvent.eventName, x => x.detail);

const ArgumentField = "arg";
const ValueField = "val";
const SparklineClientMethods = {
    exportTo: "exportTo",
    print: "print",
    svg: "svg",
};
let DxSparkline = class DxSparkline extends DevExtremeWidgetWrapper {
    constructor() {
        super();
        this._drawnExecutor = createFnAfterTimeoutExecutor(this.onDrawn.bind(this));
    }
    getWidgetTypeName() { return "dxSparkline"; }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onDrawn: () => this.onDrawn(),
            onOptionChanged: () => this.onOptionChanged(),
            onExported: () => this.onExported(),
        };
    }
    createWidgetDefaultOptions() {
        return {
            ignoreEmptyPoints: true,
            tooltip: { enabled: false },
        };
    }
    processSpecialOptions(_options) {
        super.processSpecialOptions(_options);
        if (_options.dataSource)
            _options.dataSource = this._prepareDataSource(_options.dataSource);
    }
    getContainerToSetStyle() {
        return this.getWidgetElement();
    }
    _prepareDataSource(dataSource) {
        const argValues = dataSource[ArgumentField] || [];
        const valValues = dataSource[ValueField] || [];
        const updatedDataSource = [];
        for (let i = 0; i < argValues.length; i++) {
            updatedDataSource.push({
                arg: argValues[i],
                val: valValues[i]
            });
        }
        return updatedDataSource;
    }
    onDrawn() {
        this._drawnExecutor.reset();
        this.changeLoadingPanelVisibility(false);
        this.dispatchEvent(new SparklineDrawnEvent());
    }
    onExported() {
        this.dispatchEvent(new SparklineExportedEvent());
    }
    onOptionChanged() {
        this._drawnExecutor.execute();
    }
    onlyContainerSizeChanged() {
        var _a;
        (_a = this._widgetPromise) === null || _a === void 0 ? void 0 : _a.then(widget => {
            widget.render();
        });
        this.onDrawn();
    }
    getSkippedEmptyOptions() {
        return ["dataSource"];
    }
    // DevExtreme Client Methods
    [SparklineClientMethods.exportTo](...args) {
        return this.executeClientMethod(SparklineClientMethods.exportTo, ...args);
    }
    [SparklineClientMethods.print](...args) {
        return this.executeClientMethod(SparklineClientMethods.print, ...args);
    }
    [SparklineClientMethods.svg](...args) {
        return this.executeClientMethod(SparklineClientMethods.svg, ...args);
    }
};
DxSparkline = __decorate([
    e("dxbl-sparkline")
], DxSparkline);

export { DxSparkline };
//# sourceMappingURL=dx-sparkline-24.2.js.map
