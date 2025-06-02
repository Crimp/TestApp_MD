import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { b as ScrollViewerUpdateEvent } from './dx-scroll-viewer-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { b as browser } from './browser-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { d as dom } from './dom-24.2.js';
import './tslib.es6-24.2.js';
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
import './_commonjsHelpers-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './string-24.2.js';

class PivotTableCssClasses {
}
PivotTableCssClasses.ClassName = CssClasses.Prefix + "-pivot-table";
PivotTableCssClasses.TableDataClassName = PivotTableCssClasses.ClassName + "-data";
PivotTableCssClasses.RowFieldItemClassName = PivotTableCssClasses.ClassName + "-row-field-item";
PivotTableCssClasses.AreaDataClassName = PivotTableCssClasses.ClassName + "-area-data";
PivotTableCssClasses.AreaRowClassName = PivotTableCssClasses.ClassName + "-area-row";
PivotTableCssClasses.AreaRowFieldClassName = PivotTableCssClasses.ClassName + "-area-row-field";
PivotTableCssClasses.AreaColumnInnerContainerClassName = PivotTableCssClasses.ClassName + "-area-column-inner-container";
PivotTableCssClasses.FixedCellClassName = PivotTableCssClasses.ClassName + "-fixed-cell";
PivotTableCssClasses.NoScrollClassName = PivotTableCssClasses.ClassName + "-no-scroll";
PivotTableCssClasses.LastFixedLeftCellClassName = PivotTableCssClasses.ClassName + "-last-fixed-left-cell";

class PivotTableSelectors {
    constructor() { }
}
PivotTableSelectors.Table = `.${PivotTableCssClasses.TableDataClassName}`;
PivotTableSelectors.BodyRows = "tbody tr";
PivotTableSelectors.RowFieldItem = `.${PivotTableCssClasses.RowFieldItemClassName}`;
PivotTableSelectors.AreaData = `.${PivotTableCssClasses.AreaDataClassName}`;
PivotTableSelectors.AreaRow = `.${PivotTableCssClasses.AreaRowClassName}`;
PivotTableSelectors.AreaRowField = `.${PivotTableCssClasses.AreaRowFieldClassName}`;
PivotTableSelectors.AreaColumnInnerContainer = `.${PivotTableCssClasses.AreaColumnInnerContainerClassName}`;
PivotTableSelectors.ColElementSelector = `:scope > .${ScrollViewerCssClasses.ClassName} > .${ScrollViewerCssClasses.ContentContainerClassName} > .${PivotTableCssClasses.TableDataClassName} > colgroup > col`;

const DxPivotTableTagName = "dxbl-pivot-table";

class PivotTableAttributes {
    constructor() { }
}
PivotTableAttributes.DataColumnIndex = "data-column-index";
PivotTableAttributes.TableState = "table-state";
PivotTableAttributes.Uid = "data-dx-pivot-uid";

var ScrollStatus;
(function (ScrollStatus) {
    ScrollStatus[ScrollStatus["Disabled"] = 0] = "Disabled";
    ScrollStatus[ScrollStatus["LeftBorder"] = 1] = "LeftBorder";
    ScrollStatus[ScrollStatus["BetweenBorders"] = 2] = "BetweenBorders";
    ScrollStatus[ScrollStatus["RightBorder"] = 3] = "RightBorder";
})(ScrollStatus || (ScrollStatus = {}));
class PivotTableStyleGenerator {
    constructor(pivot) {
        this._pivotUid = "";
        this._lastGeneratedStyle = "";
        this._scrollStatus = ScrollStatus.Disabled;
        this._pivot = pivot;
    }
    get highlightLeftBorder() {
        switch (this._scrollStatus) {
            case ScrollStatus.BetweenBorders:
            case ScrollStatus.RightBorder:
                return true;
            default:
                return false;
        }
    }
    onScrollPositionUpdated(contentContainer) {
        this._scrollStatus = this.calcScrollStatus(contentContainer);
        requestAnimationFrame(() => this.updateFixedCellsStyle());
    }
    hasAnyFixedColumn() {
        return this._pivot.columnsInfo.some(c => !!c.fixedPosition);
    }
    updateFixedCellsStyle() {
        this._pivotUid = this._pivot.getAttribute(PivotTableAttributes.Uid);
        const styleElement = this._pivot.querySelector("style");
        if (!styleElement)
            return;
        let generatedStyle = "";
        if (this.hasAnyFixedColumn()) {
            generatedStyle += this.createPositionStyles();
            generatedStyle += this.createBorderStyles();
        }
        if (this._lastGeneratedStyle !== generatedStyle) {
            styleElement.innerText = generatedStyle;
            this._lastGeneratedStyle = generatedStyle;
        }
    }
    createPositionStyles() {
        const colElements = this._pivot.getColElements();
        const offsetWidths = this.getOffsetWidths(colElements);
        const offsets = new Array(offsetWidths.length);
        offsets[0] = 0;
        for (let i = 1; i < offsetWidths.length; ++i)
            offsets[i] = offsets[i - 1] + offsetWidths[i - 1];
        let result = "";
        for (let i = 0; i < this._pivot.columnsInfo.length; ++i) {
            const columnInfo = this._pivot.columnsInfo[i];
            const fixedPosition = columnInfo.fixedPosition;
            if (fixedPosition && fixedPosition === "left")
                result += this.createPositionStyleForColumn(i, fixedPosition, offsets[i]);
        }
        return result;
    }
    createPositionStyleForColumn(columnIndex, fixedPosition, offset) {
        return this.getTableRowsSelector() +
            ` > .${PivotTableCssClasses.FixedCellClassName}[data-column-index="${columnIndex}"]` +
            ` { ${fixedPosition}: ${offset}px; }`;
    }
    createBorderStyles() {
        const styles = [];
        if (this.highlightLeftBorder) {
            styles.push(this.createLeftBorderStyle("th"));
            styles.push(this.createLeftBorderStyle("td"));
        }
        return styles.join("");
    }
    createLeftBorderStyle(tagSelector) {
        return this.getTableRowsSelector() +
            ` > ${tagSelector}.${PivotTableCssClasses.LastFixedLeftCellClassName}` +
            " { border-right-color: var(--dxbl-pivot-table-fixed-column-border-color); border-right-width: var(--dxbl-pivot-table-border-width); }";
    }
    getTableRowsSelector() {
        return [
            `${DxPivotTableTagName}[${PivotTableAttributes.Uid}="${this._pivotUid}"]`,
            `.${ScrollViewerCssClasses.ClassName}`,
            `.${ScrollViewerCssClasses.ContentContainerClassName}`,
            `.${PivotTableCssClasses.TableDataClassName}`,
            "*",
            "tr"
        ].join(" > ");
    }
    getOffsetWidths(colElements) {
        const result = [];
        for (let i = 0; i < colElements.length; ++i)
            result.push(this._pivot.getColElementOffsetWidth(i));
        return result;
    }
    calcScrollStatus(contentContainer) {
        const table = this._pivot && this._pivot.getTable();
        if (!table)
            return ScrollStatus.Disabled;
        const tableWidth = this._pivot.getTable().clientWidth;
        if (tableWidth === contentContainer.clientWidth)
            return ScrollStatus.Disabled;
        if (contentContainer.scrollLeft === 0)
            return ScrollStatus.LeftBorder;
        if (Math.abs(tableWidth - contentContainer.clientWidth - contentContainer.scrollLeft) < 1)
            return ScrollStatus.RightBorder;
        return ScrollStatus.BetweenBorders;
    }
}

class PivotColumnInfo {
    get uID() { return this._uID; }
    get width() { return this._width; }
    get minWidth() { return this._minWidth; }
    get hasWidth() { return !!this._width; }
    get isPercentWidth() { return this.hasWidth && this.width.indexOf("%") !== -1; }
    get isAbsoluteWidth() { return (this.hasWidth && !this.isPercentWidth); }
    get colElementWidth() { return this._colElementWidth; }
    set colElementWidth(value) { this._colElementWidth = value; }
    get fixedPosition() { return this._fixedPosition; }
    constructor(uID, width, minWidth, fixedPosition) {
        this._uID = uID;
        this._width = width;
        this._colElementWidth = width;
        this._minWidth = minWidth;
        this._fixedPosition = fixedPosition;
    }
    updateWidth(newWidth) {
        this._width = newWidth;
        this._colElementWidth = newWidth;
    }
}

const DxPivotTableColumnsInfoTagName = "dxbl-pivot-table-columns-info";
class DxPivotTableColumnsInfo extends DxHTMLElementBase {
    get data() {
        return this.getAttribute("data");
    }
    get columns() {
        return (this.data !== null) ? this.parseColumns(this.data) : [];
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.pivot = this.closest(`.${PivotTableCssClasses.ClassName}`);
        (_a = this.pivot) === null || _a === void 0 ? void 0 : _a.notifyColumnsChanged(this.columns);
    }
    parseColumns(columnsStr) {
        const columns = JSON.parse(columnsStr);
        const columnsInfo = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const info = new PivotColumnInfo(column.UID, column.Width, column.MinWidth, column.FixedPosition);
            columnsInfo.push(info);
        }
        return columnsInfo;
    }
    static get observedAttributes() {
        return ["data"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        var _a;
        switch (name) {
            case "data":
                (_a = this.pivot) === null || _a === void 0 ? void 0 : _a.notifyColumnsChanged(this.parseColumns(newVal));
                break;
        }
    }
}

class DxPivotTable extends SingleSlotElementBase {
    constructor() {
        super();
        this.boundOnMouseDownHandler = this.onMouseDown.bind(this);
        this.boundOnScrollViewerScrollHandler = this.onScrollViewerScroll.bind(this);
        this.boundOnScrollViewerUpdateHandler = this.onScrollViewerUpdate.bind(this);
        this._columnsInfo = [];
        this._styleGenerator = null;
    }
    get styleGenerator() {
        return this._styleGenerator;
    }
    get columnsInfo() {
        return this._columnsInfo;
    }
    get uId() {
        return this.getAttribute(PivotTableAttributes.Uid);
    }
    getScrollViewer() {
        return this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
    }
    getScrollViewerContent() {
        return this.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
    }
    getTable() {
        return this.querySelector(PivotTableSelectors.Table);
    }
    getColElements() {
        return this.querySelectorAll(PivotTableSelectors.ColElementSelector);
    }
    getTableContainerWidth() {
        const tableContainer = this.getScrollViewerContent();
        return tableContainer ? tableContainer === null || tableContainer === void 0 ? void 0 : tableContainer.getBoundingClientRect().width : 0;
    }
    getColElementOffsetWidth(columnIndex) {
        const colElements = this.getColElements();
        return colElements[columnIndex].getBoundingClientRect().width;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventSubscriptions();
        this._styleGenerator = new PivotTableStyleGenerator(this);
        this.setupBottomBorderForLastDataRow();
    }
    disconnectedCallback() {
        this.removeEventSubscriptions();
        super.disconnectedCallback();
    }
    notifyColumnsChanged(columns) {
        this._columnsInfo = columns;
    }
    addEventSubscriptions() {
        if (browser.Browser.Firefox)
            this.addEventListener("mousedown", this.boundOnMouseDownHandler);
        setTimeout(() => {
            const scrollViewer = this.getScrollViewer();
            scrollViewer && scrollViewer.subscribeToScroll && scrollViewer.subscribeToScroll(this.boundOnScrollViewerScrollHandler);
            this.addEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
        });
    }
    removeEventSubscriptions() {
        if (browser.Browser.Firefox)
            this.removeEventListener("mousedown", this.boundOnMouseDownHandler);
        setTimeout(() => {
            const scrollViewer = this.getScrollViewer();
            scrollViewer && scrollViewer.unsubscribeFromScroll && scrollViewer.unsubscribeFromScroll();
        });
    }
    onScrollViewerScroll() {
        this.styleGenerator.onScrollPositionUpdated(this.getScrollViewerContent());
    }
    setupBottomBorderForLastDataRow() {
        const scrollViewerContent = this.getScrollViewerContent();
        const table = this.getTable();
        if (scrollViewerContent && table) {
            if (table.offsetHeight < scrollViewerContent.clientHeight)
                dom.DomUtils.addClassName(table, PivotTableCssClasses.NoScrollClassName);
            else
                dom.DomUtils.removeClassName(table, PivotTableCssClasses.NoScrollClassName);
        }
    }
    onScrollViewerUpdate(evt) {
        this.setupBottomBorderForLastDataRow();
        evt.stopPropagation();
    }
    onMouseDown(evt) {
        evt.ctrlKey && evt.preventDefault();
    }
}
customElements.define(DxPivotTableTagName, DxPivotTable);
customElements.define(DxPivotTableColumnsInfoTagName, DxPivotTableColumnsInfo);
function loadModule() { }
const dxPivotTable = { loadModule };

export { DxPivotTable, dxPivotTable as default };
//# sourceMappingURL=dx-pivot-table-24.2.js.map
