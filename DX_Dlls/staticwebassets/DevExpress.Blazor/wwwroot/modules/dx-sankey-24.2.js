import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { c as createFnAfterTimeoutExecutor } from './create-after-timeout-fn-executor-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
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

const dxSankeyPrefix = "dxbl-sankey";
class SankeyDrawnEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(SankeyDrawnEvent.eventName);
    }
}
SankeyDrawnEvent.eventName = dxSankeyPrefix + ".drawn";
class SankeyExportedEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(SankeyExportedEvent.eventName);
    }
}
SankeyExportedEvent.eventName = dxSankeyPrefix + ".exported";
class SankeyNodeClickEventContext {
    constructor({ label, linksIn, linksOut }) {
        this.Node = {
            label,
            linksIn,
            linksOut
        };
    }
}
class SankeyLinkClickEventContext {
    constructor(connection) {
        this.Connection = connection;
    }
}
class SankeyNodeClickEvent extends CustomEvent {
    constructor(node) {
        super(SankeyNodeClickEvent.eventName, {
            detail: new SankeyNodeClickEventContext(node),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
SankeyNodeClickEvent.eventName = dxSankeyPrefix + ".nodeClick";
class SankeyLinkClickEvent extends CustomEvent {
    constructor(connection) {
        super(SankeyLinkClickEvent.eventName, {
            detail: new SankeyLinkClickEventContext(connection),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
SankeyLinkClickEvent.eventName = dxSankeyPrefix + ".linkClick";
CustomEventsHelper.register(SankeyDrawnEvent.eventName, x => x.detail);
CustomEventsHelper.register(SankeyExportedEvent.eventName, x => x.detail);
CustomEventsHelper.register(SankeyNodeClickEvent.eventName, x => x.detail);
CustomEventsHelper.register(SankeyLinkClickEvent.eventName, x => x.detail);

const sankeyTag = "dxbl-sankey";
const SourceField = "sources";
const TargetField = "targets";
const WeightField = "weights";
const SankeyClientMethods = {
    exportTo: "exportTo",
    print: "print",
    svg: "svg",
    getAllLinks: "getAllLinks",
    getAllNodes: "getAllNodes",
};
const colorKey = "color";
const fontKey = "font";
const subtitleKey = "subtitle";
const titleKey = "title";
const labelKey = "label";
const fontColorPath = `${fontKey}.${colorKey}`;
const titleFontColorPath = `${titleKey}.${fontColorPath}`;
const subtitleFontColorPath = `${titleKey}.${subtitleKey}.${fontColorPath}`;
const labelFontColorPath = `${labelKey}.${fontColorPath}`;
const sankeyCSSprefix = `--${sankeyTag}`;
const fontColorCSSPostfix = `${fontKey}-${colorKey}`;
const titleFontColorCSSPostfix = `${titleKey}-${fontColorCSSPostfix}`;
const subtitleFontColorCSSPostfix = `${subtitleKey}-${fontColorCSSPostfix}`;
const labelFontColorCSSPostfix = `${labelKey}-${fontColorCSSPostfix}`;
let DxSankey = class DxSankey extends DevExtremeWidgetWrapper {
    constructor() {
        super();
        this._styleHelper = ClientComponentStyleHelper.getInstance();
        this._drawnExecutor = createFnAfterTimeoutExecutor(this.onDrawn.bind(this));
    }
    getWidgetTypeName() { return "dxSankey"; }
    createWidgetDefaultOptions() {
        return {
            tooltip: { enabled: false },
            palette: this._styleHelper.palette
        };
    }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onDrawn: () => this.onDrawn(),
            onOptionChanged: () => this.onOptionChanged(),
            onNodeClick: (event) => this.onNodeClick(event.target),
            onLinkClick: (event) => this.onLinkClick(event.target),
            onExported: () => this.onExported(),
        };
    }
    processSpecialOptions(_options) {
        super.processSpecialOptions(_options);
        if (_options.dataSource)
            _options.dataSource = this._prepareDataSource(_options.dataSource);
    }
    _prepareDataSource(dataSource) {
        const sourceValues = dataSource[SourceField] || [];
        const targetValues = dataSource[TargetField] || [];
        const weightValues = dataSource[WeightField] || [];
        const updatedDataSource = [];
        for (let i = 0; i < sourceValues.length; i++) {
            updatedDataSource.push({
                source: sourceValues[i],
                target: targetValues[i],
                weight: weightValues[i]
            });
        }
        return updatedDataSource;
    }
    onDrawn() {
        this._drawnExecutor.reset();
        this.changeLoadingPanelVisibility(false);
        this.dispatchEvent(new SankeyDrawnEvent());
    }
    onOptionChanged() {
        this._drawnExecutor.execute();
    }
    onNodeClick({ label, linksIn, linksOut }) {
        this.dispatchEvent(new SankeyNodeClickEvent({ label, linksIn, linksOut }));
    }
    onLinkClick({ connection }) {
        this.dispatchEvent(new SankeyLinkClickEvent(connection));
    }
    onlyContainerSizeChanged() {
        var _a;
        (_a = this._widgetPromise) === null || _a === void 0 ? void 0 : _a.then(widget => {
            widget.render();
        });
        this.onDrawn();
    }
    onExported() {
        this.dispatchEvent(new SankeyExportedEvent());
    }
    getThemeDependentOptionsDict() {
        const options = {
            [titleFontColorPath]: `${sankeyCSSprefix}-${titleFontColorCSSPostfix}`,
            [subtitleFontColorPath]: `${sankeyCSSprefix}-${subtitleFontColorCSSPostfix}`,
            [labelFontColorPath]: `${sankeyCSSprefix}-${labelFontColorCSSPostfix}`
        };
        return { ...super.getThemeDependentOptionsDict(), ...options };
    }
    // DevExtreme Client Methods
    [SankeyClientMethods.exportTo](...args) {
        return this.executeClientMethod(SankeyClientMethods.exportTo, ...args);
    }
    [SankeyClientMethods.print](...args) {
        return this.executeClientMethod(SankeyClientMethods.print, ...args);
    }
    [SankeyClientMethods.svg](...args) {
        return this.executeClientMethod(SankeyClientMethods.svg, ...args);
    }
    [SankeyClientMethods.getAllLinks](...args) {
        return this.executeClientMethod(SankeyClientMethods.getAllLinks, ...args)
            .then(links => links.map((link) => link.connection));
    }
    [SankeyClientMethods.getAllNodes](...args) {
        return this.executeClientMethod(SankeyClientMethods.getAllNodes, ...args)
            .then(nodes => {
            return nodes.map((node) => {
                return {
                    label: node.label,
                    linksIn: node.linksIn,
                    linksOut: node.linksOut
                };
            });
        });
    }
};
DxSankey = __decorate([
    e(sankeyTag)
], DxSankey);

export { DxSankey };
//# sourceMappingURL=dx-sankey-24.2.js.map
