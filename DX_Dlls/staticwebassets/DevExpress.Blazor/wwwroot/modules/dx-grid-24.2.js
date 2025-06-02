import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { H as HandlePointerEventsMode, T as TapInteractionTimeout, a as PointerDragStopEvent, P as PointerDragStartEvent, c as PointerDragCancelEvent, d as PointerClickEvent, e as PointerDblClickEvent } from './dx-html-element-pointer-events-helper-24.2.js';
import { DxUIHandlersBridgeTagName } from './dx-ui-handlers-bridge-24.2.js';
import { b as browser } from './browser-24.2.js';
import { k as key } from './key-24.2.js';
import { S as ScrollViewerAutoScrollingMode, H as HorizontalAlign, V as VerticalAlign, D as DxScrollViewer, a as ScrollViewerVisibleElementChangedEvent, b as ScrollViewerUpdateEvent } from './dx-scroll-viewer-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { a as DxKeyboardNavigatorTagName, K as KeyboardNavigationStrategy, F as FocusUtils, L as LeaveDirection } from './keyboard-navigation-strategy-24.2.js';
import { T as TopVirtualSpacerAttributeName, B as BottomVirtualSpacerAttributeName, S as ScrollEvent, V as VirtualItemIndexAttributeName } from './dx-virtual-scroll-viewer-24.2.js';
import { PagerSizeSelectorCssClass } from './pager-24.2.js';
import { DxCheckBoxTagName } from './dx-check-internal-24.2.js';
import { I as ItemDraggingHelper, d as dropTargetRegistrySingleton, D as DraggingHelperBase } from './dragging-helper-24.2.js';
import { I as getParentByPredicate } from './dom-utils-24.2.js';
import { D as DomHelper } from './layouthelper-24.2.js';
import { A as PortalAccessor, t as PopupShownEvent, D as DxPopup, E as DxModal, v as PopupClosingResultRequestedEvent, w as PopupClosingRequestedEvent, u as PopupClosedEvent, G as PopupCloseReason, H as visibleBranchTreeSingleton, B as BranchType } from './popup-24.2.js';
import { G as GridScrollUtils } from './grid-scroll-utils-24.2.js';
import { containsFocusHiddenAttribute, removeFocusHiddenAttribute, addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { BranchCreatedEvent, BranchContext, BranchRemovedEvent, BranchRefreshedEvent, BranchIdContext } from './branch-24.2.js';
import { S as SvgUtils } from './svg-utils-24.2.js';
import { T as TransformHelper } from './transformhelper-24.2.js';
import { d as dom } from './dom-24.2.js';

class GridCssClasses {
}
GridCssClasses.ClassName = CssClasses.Prefix + "-grid";
GridCssClasses.DataTableClassName = GridCssClasses.ClassName + "-table";
GridCssClasses.DataTableNoScrollClassName = GridCssClasses.DataTableClassName + "-no-scroll";
GridCssClasses.TopPanelClassName = GridCssClasses.ClassName + "-top-panel";
GridCssClasses.BottomPanelClassName = GridCssClasses.ClassName + "-bottom-panel";
GridCssClasses.ToolbarContainerClassName = GridCssClasses.ClassName + "-toolbar-container";
GridCssClasses.PagerPanelClassName = "dxbl-pager-container";
GridCssClasses.GroupPanelContentContainerClassName = GridCssClasses.ClassName + "-group-panel-container";
GridCssClasses.SearchBoxContainerClassName = GridCssClasses.ClassName + "-search-box-container";
GridCssClasses.SearchBoxClassName = GridCssClasses.ClassName + "-search-box";
GridCssClasses.EmptyHeaderCellContentContainerClassName = GridCssClasses.ClassName + "-empty-header";
GridCssClasses.GroupContentFreeSpaceClassName = GridCssClasses.ClassName + "-group-panel-free-space";
GridCssClasses.HeaderRowClassName = GridCssClasses.ClassName + "-header-row";
GridCssClasses.EditRowClassName = GridCssClasses.ClassName + "-edit-row";
GridCssClasses.FilterRowClassName = GridCssClasses.ClassName + "-filter-row";
GridCssClasses.GroupRowClassName = GridCssClasses.ClassName + "-group-row";
GridCssClasses.FooterRowClassName = GridCssClasses.ClassName + "-footer-row";
GridCssClasses.GroupFooterRowClassName = GridCssClasses.ClassName + "-group-footer-row";
GridCssClasses.PagerRowClassName = GridCssClasses.ClassName + "-pager-row";
GridCssClasses.EmptyRowClassName = GridCssClasses.ClassName + "-empty-row";
GridCssClasses.ArmRowClassName = GridCssClasses.ClassName + "-arm-row";
GridCssClasses.HeaderElementClassName = GridCssClasses.ClassName + "-header";
GridCssClasses.HeaderContentClassName = GridCssClasses.ClassName + "-header-content";
GridCssClasses.AllowDragClassName = GridCssClasses.ClassName + "-action";
GridCssClasses.DraggableHeaderClassName = GridCssClasses.ClassName + "-draggable-header";
GridCssClasses.SelectionCellClassName = GridCssClasses.ClassName + "-selection-cell";
GridCssClasses.CommandCellClassName = GridCssClasses.ClassName + "-command-cell";
GridCssClasses.FixedCellClassName = GridCssClasses.ClassName + "-fixed-cell";
GridCssClasses.LastLeftFixedCellClassName = GridCssClasses.ClassName + "-last-fixed-left-cell";
GridCssClasses.IndentCellClassName = GridCssClasses.ClassName + "-indent-cell";
GridCssClasses.HeaderIndentCellClassName = GridCssClasses.ClassName + "-header-indent-cell";
GridCssClasses.GroupFooterIndentCellClassName = GridCssClasses.ClassName + "-group-footer-indent-cell";
GridCssClasses.ExpandButtonCellClassName = GridCssClasses.ClassName + "-expand-button-cell";
GridCssClasses.DetailCellClassName = GridCssClasses.ClassName + "-detail-cell";
GridCssClasses.EmptyDataRowCellClassName = GridCssClasses.ClassName + "-empty-data-area";
GridCssClasses.EmptyCellClassName = GridCssClasses.ClassName + "-empty-cell";
GridCssClasses.EditFormClassName = GridCssClasses.ClassName + "-edit-form";
GridCssClasses.EditNewItemRowClassName = GridCssClasses.ClassName + "-edit-new-item-row";
GridCssClasses.EditNewItemRowInplaceClassName = GridCssClasses.ClassName + "-edit-new-item-row-inplace";
GridCssClasses.TopFixedBodyClassName = GridCssClasses.ClassName + "-top-fixed-body";
GridCssClasses.SelectedRowClassName = GridCssClasses.ClassName + "-selected-row";
GridCssClasses.TouchSelectionClassName = GridCssClasses.ClassName + "-touch-selection";
GridCssClasses.TouchSelectionEdgeClassName = GridCssClasses.ClassName + "-touch-selection-edge";
GridCssClasses.MoveCursorCssClassName = GridCssClasses.ClassName + "-move-cursor";
GridCssClasses.DraggingDownTargetClassName = GridCssClasses.ClassName + "-dragging-down-target";
GridCssClasses.DraggingUpTargetClassName = GridCssClasses.ClassName + "-dragging-up-target";
GridCssClasses.ColumnsResizeAnchorClassName = GridCssClasses.ClassName + "-column-resize-anchor";
GridCssClasses.ColumnsSeparatorClassName = GridCssClasses.ClassName + "-columns-separator";
GridCssClasses.HiddenEmptyCellClassName = GridCssClasses.ClassName + "-hidden-empty-cell";
GridCssClasses.RowDragHintClassName = GridCssClasses.ClassName + "-row-drag-hint";
GridCssClasses.RowDragHintPortalClassName = GridCssClasses.ClassName + "-row-drag-hint-portal";
GridCssClasses.RowDragAnchorClassName = GridCssClasses.ClassName + "-row-drag-anchor-cell";
GridCssClasses.DropTargetIndicatorClassName = GridCssClasses.ClassName + "-drop-target-indicator";
GridCssClasses.ColumnChooserItemClassName = GridCssClasses.ClassName + "-column-chooser-item";
GridCssClasses.ColumnChooserDraggingItemClassName = GridCssClasses.ClassName + "-column-chooser-dragging-item";
GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName = GridCssClasses.ClassName + "-column-chooser-dragging-item-next-sibling";
GridCssClasses.ColumnChooserItemDragAnchorClassName = GridCssClasses.ClassName + "-column-chooser-item-drag-anchor";
GridCssClasses.ColumnChooserItemDragLockClassName = GridCssClasses.ClassName + "-column-chooser-item-drag-lock";
GridCssClasses.HighlightedTextClassName = GridCssClasses.ClassName + "-highlighted-text";
GridCssClasses.CalculateContentWidthsClassName = GridCssClasses.DataTableClassName + "-content-fit-calc";

const DxGridHeaderContentTagName = "dxbl-grid-header-content";
class DxGridHeaderContent extends DxHTMLElementBase {
    constructor() {
        super();
        this.handlePointerEventsMode = HandlePointerEventsMode.Click | HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this.closest(`.${GridCssClasses.HeaderElementClassName}`);
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
}

class ColumnDragRestrictions {
    get previousColumnUid() { return this._previousColumnUid; }
    get nextColumnUid() { return this._nextColumnUid; }
    get nextVisibleColumnUid() { return this._nextVisibleColumnUid; }
    constructor(previousColumnUid, nextColumnUid, nextVisibleColumnUid) {
        this._previousColumnUid = previousColumnUid;
        this._nextColumnUid = nextColumnUid;
        this._nextVisibleColumnUid = nextVisibleColumnUid;
    }
}
class GridColumnInfo {
    get uID() { return this._uID; }
    get parentUID() { return this._parentUID; }
    get allowGroup() { return this._allowGroup; }
    get allowReorder() { return this._allowReorder; }
    get dragRestrictions() { return this._dragRestrictions; }
    get width() { return this._width; }
    get minWidth() { return this._minWidth; }
    get hasWidth() { return !!this._width; }
    get isFreeWidth() { return !this.width && !this.isIndent && !this.isEmpty; }
    get isPercentWidth() { return this.hasWidth && this.width.indexOf("%") !== -1; }
    get isAbsoluteWidth() { return (this.hasWidth && !this.isPercentWidth) || this.isIndent; }
    get colElementWidth() { return this._colElementWidth; }
    set colElementWidth(value) { this._colElementWidth = value; }
    get isIndent() { return this._isIndent; }
    get isEmpty() { return this._isEmpty; }
    get isDetail() { return this._isDetail; }
    get isEditable() { return this._isEditable; }
    get fixedPosition() { return this._fixedPosition; }
    get headerRowIndex() { return this._headerRowIndex; }
    get headerCellIndex() { return this._headerCellIndex; }
    get leafIndex() { return this._leafIndex; }
    get parent() { return this._parent; }
    get parentPath() { return this._parentPath; }
    get isRoot() { return this.parentUID < 0; }
    get hasLeafs() { return this._leafs.length > 0; }
    constructor(uID, parentUID, allowGroup, width, minWidth, fixedPosition, isIndent = false, isEmpty = false, isDetail = false, isEditable = false, allowReorder = true, dragRestrictions = null) {
        this._parent = null;
        this._parentPath = [];
        this._leafs = [];
        this._leafIndex = -1;
        this._headerRowIndex = -1;
        this._headerCellIndex = -1;
        this._uID = uID;
        this._parentUID = parentUID;
        this._allowGroup = allowGroup;
        this._allowReorder = allowReorder;
        this._dragRestrictions = dragRestrictions;
        this._width = width;
        this._colElementWidth = width;
        this._minWidth = minWidth;
        this._isIndent = isIndent;
        this._isEmpty = isEmpty;
        this._isDetail = isDetail;
        this._isEditable = isEditable;
        this._fixedPosition = fixedPosition;
    }
    getPercents() {
        if (!this.isPercentWidth)
            return 0;
        return parseFloat(this.width.replace("%", ""));
    }
    updateWidth(newWidth) {
        this._width = newWidth;
        this._colElementWidth = newWidth;
    }
    updateHeaderLayoutInfo(rowIndex, cellIndex) {
        this._headerRowIndex = rowIndex;
        this._headerCellIndex = cellIndex;
    }
    attachParent(parent) {
        var _a, _b;
        this._parent = parent;
        this._parentPath = [...((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parentPath) !== null && _b !== void 0 ? _b : []), parent];
    }
    attachLeaf(leaf) {
        this._leafs.push(leaf);
    }
    updateLeafIndex(index) {
        this._leafIndex = index;
    }
    containsLeaf(uid) {
        if (!this.hasLeafs)
            return this.uID === uid;
        return this._leafs.findIndex(info => info.uID === uid) >= 0;
    }
    getLeftLeaf() {
        return this.hasLeafs ? this._leafs[0] : null;
    }
    getRightLeaf() {
        return this.hasLeafs ? this._leafs[this._leafs.length - 1] : null;
    }
}

const DxGridColumnsInfoTagName = "dxbl-grid-columns-info";
class DxGridColumnsInfo extends DxHTMLElementBase {
    get data() {
        if (!this._dataCache) {
            const attrValue = this.getAttribute("data");
            this._dataCache = attrValue ? JSON.parse(attrValue) : {};
        }
        return this._dataCache;
    }
    get header() {
        if (!this._headerCache) {
            const headerUids = this.data["header-uids"];
            this._headerCache = headerUids ? this.parseHeaderLayout(headerUids) : [];
        }
        return this._headerCache;
    }
    get leafs() {
        if (!this._leafsCache) {
            const leafUids = this.data["leaf-uids"];
            this._leafsCache = leafUids ? this.parseColumns(leafUids, true) : [];
            this.attachLeafs(this._leafsCache);
        }
        return this._leafsCache;
    }
    get columns() {
        if (!this._columnsInfoCache) {
            const columnsData = this.data["columns"];
            this._columnsInfoCache = columnsData ? this.parseColumnsInfo(columnsData) : {};
            this.attachParents(this._columnsInfoCache);
        }
        return this._columnsInfoCache;
    }
    get indents() {
        if (!this._indentsCache) {
            const indentsData = this.data["indents"];
            this._indentsCache = indentsData ? this.parseInfoArray(indentsData) : [];
        }
        return this._indentsCache;
    }
    get emptyColumn() {
        if (!this._emptyColumnCache) {
            const emptyColumnData = this.data["empty-column"];
            this._emptyColumnCache = emptyColumnData ? this.parseColumnInfo(emptyColumnData) : null;
        }
        return this._emptyColumnCache;
    }
    constructor() {
        super();
        this._dataCache = null;
        this._columnsInfoCache = null;
        this._headerCache = null;
        this._leafsCache = null;
        this._indentsCache = null;
        this._emptyColumnCache = null;
        this._gridElementPromise = null;
    }
    initializeComponent() {
        super.initializeComponent();
        this.grid = this.closest(`.${GridCssClasses.ClassName}`);
        this._gridElementPromise = customElements.whenDefined(this.grid.tagName.toLowerCase());
        this._gridElementPromise.then(this.notifyColumnsInitialized.bind(this));
    }
    invalidateCaches() {
        this._dataCache = null;
        this._columnsInfoCache = null;
        this._headerCache = null;
        this._leafsCache = null;
        this._indentsCache = null;
        this._emptyColumnCache = null;
    }
    parseHeaderLayout(layout) {
        const result = [];
        for (let rowIndex = 0; rowIndex < layout.length; rowIndex++) {
            const rowLayout = layout[rowIndex];
            const rowColumnsInfo = this.parseColumns(rowLayout, rowIndex === 0);
            this.updateHeaderLayoutInfo(rowColumnsInfo, rowIndex);
            result.push(rowColumnsInfo);
        }
        return result;
    }
    updateHeaderLayoutInfo(columns, rowIndex) {
        for (let cellIndex = 0; cellIndex < columns.length; cellIndex++)
            columns[cellIndex].updateHeaderLayoutInfo(rowIndex, cellIndex);
    }
    parseColumns(uids, extraInfo) {
        const result = extraInfo ? this.indents.slice() : [];
        for (let i = 0; i < uids.length; i++) {
            const info = this.columns[uids[i]];
            result.push(info);
        }
        if (extraInfo && this.emptyColumn)
            result.push(this.emptyColumn);
        return result;
    }
    parseColumnsInfo(columns) {
        const result = {};
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            result[column.UID] = this.parseColumnInfo(column);
        }
        return result;
    }
    parseInfoArray(columns) {
        const result = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            result.push(this.parseColumnInfo(column));
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parseColumnInfo(column) {
        const columnDragRestrictions = column.DragRestrictions
            ? new ColumnDragRestrictions(column.DragRestrictions.PreviousColumnUid, column.DragRestrictions.NextColumnUid, column.DragRestrictions.NextVisibleColumnUid)
            : null;
        return new GridColumnInfo(column.UID, column.ParentUID, column.AllowGroup, column.Width, column.MinWidth, column.FixedPosition, column.IsIndent, column.IsEmpty, column.IsDetail, column.IsEditable, column.AllowReorder, columnDragRestrictions);
    }
    attachParents(columns) {
        for (const columnInfo of Object.values(columns)) {
            const parent = columns[columnInfo.parentUID];
            if (parent)
                columnInfo.attachParent(parent);
        }
    }
    attachLeafs(leafs) {
        for (let i = 0; i < leafs.length; i++) {
            const leaf = leafs[i];
            if (!leaf.isIndent && !leaf.isRoot)
                this.attachLeafRecursive(leaf.parentUID, leaf);
            leaf.updateLeafIndex(i);
        }
    }
    attachLeafRecursive(parentUid, leaf) {
        const parentInfo = parentUid >= 0 ? this.columns[parentUid] : null;
        if (parentInfo) {
            parentInfo.attachLeaf(leaf);
            this.attachLeafRecursive(parentInfo.parentUID, leaf);
        }
    }
    notifyColumnsInitialized() {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.notifyColumnsInitialized(this.leafs, this.header);
    }
    notifyColumnsChanged() {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.notifyColumnsChanged(this.leafs, this.header);
    }
    static get observedAttributes() {
        return ["data"];
    }
    attributeChangedCallback(_, __, newVal) {
        var _a;
        this.invalidateCaches();
        (_a = this._gridElementPromise) === null || _a === void 0 ? void 0 : _a.then(this.notifyColumnsChanged.bind(this));
    }
}

const DxGridDropRestrictionsInfoTagName = "dxbl-grid-drop-restrictions-info";
const DataAttributeName = "data";
const AllowedComponentsKey = "allowed-components";
const ReorderDeniedRangesKey = "reorder-denied-ranges";
class DxGridDropRestrictionsInfo extends DxHTMLElementBase {
    constructor() {
        super(...arguments);
        this._dataCache = null;
        this._allowedComponentsCache = null;
        this._reorderDeniedRangesCache = null;
    }
    get allowedComponents() {
        var _a;
        if (!this._allowedComponentsCache)
            this._allowedComponentsCache = (_a = this.data[AllowedComponentsKey]) !== null && _a !== void 0 ? _a : [];
        return this._allowedComponentsCache;
    }
    get reorderDeniedRanges() {
        var _a;
        if (!this._reorderDeniedRangesCache)
            this._reorderDeniedRangesCache = (_a = this.data[ReorderDeniedRangesKey]) !== null && _a !== void 0 ? _a : [];
        return this._reorderDeniedRangesCache;
    }
    get data() {
        if (!this._dataCache) {
            const attrValue = this.getAttribute(DataAttributeName);
            this._dataCache = attrValue ? JSON.parse(attrValue) : {};
        }
        return this._dataCache;
    }
    invalidateCaches() {
        this._dataCache = null;
        this._allowedComponentsCache = null;
        this._reorderDeniedRangesCache = null;
    }
    static get observedAttributes() {
        return [DataAttributeName];
    }
    attributeChangedCallback(_name, _oldVal, _newVal) {
        this.invalidateCaches();
    }
}

var GridUpdateWidthsReason;
(function (GridUpdateWidthsReason) {
    GridUpdateWidthsReason[GridUpdateWidthsReason["ColumnsChanged"] = 0] = "ColumnsChanged";
    GridUpdateWidthsReason[GridUpdateWidthsReason["GridResize"] = 1] = "GridResize";
})(GridUpdateWidthsReason || (GridUpdateWidthsReason = {}));
class GridColumnWidthsController {
    constructor(grid) {
        this.grid = grid;
    }
    correctWidths(updateReason) {
        if (this.grid.columnsInfo.length === 0)
            return false;
        const dataTable = this.grid.getDataTable();
        if (!dataTable)
            return false;
        if (window.getComputedStyle(dataTable).tableLayout !== "fixed")
            return false;
        requestAnimationFrame(() => {
            const columnsInfo = this.grid.columnsInfo;
            const colElements = this.grid.getColElements();
            if (updateReason === GridUpdateWidthsReason.ColumnsChanged)
                GridColumnWidthsController.resetColumnWidths(columnsInfo, colElements);
            if (!GridColumnWidthsController.canAcquireAbsoluteColumnWidths(this.grid))
                return;
            this.updateEmptyColumnVisibility();
            const absoluteColumnWidths = new Map();
            for (let i = 0; i < this.grid.columnsInfo.length; ++i) {
                const columnInfo = this.grid.columnsInfo[i];
                if (columnInfo.isAbsoluteWidth) {
                    const offsetWidth = this.grid.getColElementOffsetWidth(i);
                    if (offsetWidth !== null)
                        absoluteColumnWidths.set(columnInfo, Math.round(offsetWidth));
                }
            }
            const context = {
                columnsInfo: this.grid.columnsInfo,
                columnCurrentWidths: new Map(),
                tableWidth: this.grid.getTableContainerWidth(),
                absoluteColumnWidths: absoluteColumnWidths,
                percentColumns: this.grid.columnsInfo.filter(column => column.isPercentWidth),
                freeColumns: this.grid.columnsInfo.filter(column => column.isFreeWidth),
                emptyColumn: this.grid.columnsInfo.filter(column => column.isEmpty)[0]
            };
            GridColumnWidthsController.doDistributionWaves(context);
            GridColumnWidthsController.applyColumnWidths(context, colElements);
            this.updateEmptyColumnVisibility();
            this.grid.styleGenerator.updateFixedCellsStyle();
        });
        return true;
    }
    autoFitColumnWidths() {
        const contentWidths = GridColumnWidthsController.calculateContentWidths(this.grid);
        let calculatedTotalWidth = 0;
        let calculatedFixedWidth = 0;
        for (const [info, value] of contentWidths) {
            if (!info.isIndent) {
                calculatedTotalWidth += value;
                if (info.isAbsoluteWidth)
                    calculatedFixedWidth += value;
            }
        }
        const totalPercentWidth = calculatedTotalWidth - calculatedFixedWidth;
        const changedUids = [];
        const changedWidths = [];
        for (const [info, value] of contentWidths) {
            const width = info.isPercentWidth || info.isFreeWidth
                ? `${value / totalPercentWidth * 100}%`
                : `${value}px`;
            info.updateWidth(width);
            changedUids.push(info.uID);
            changedWidths.push(width);
        }
        this.grid.notifyColumnsChanged(this.grid.columnsInfo, this.grid.headerLayout);
        this.grid.onColumnWidthsChanged(changedUids, changedWidths);
    }
    autoFitColumnWidthsLegacy(useRelativeWidth = false) {
        const contentWidths = GridColumnWidthsController.calculateContentWidths(this.grid);
        let calculatedTotalWidth = 0;
        for (const [info, value] of contentWidths) {
            if (!info.isIndent)
                calculatedTotalWidth += value;
        }
        const changedUids = [];
        const changedWidths = [];
        for (const [info, value] of contentWidths) {
            const width = useRelativeWidth
                ? `${value / calculatedTotalWidth * 100}%`
                : `${value}px`;
            info.updateWidth(width);
            changedUids.push(info.uID);
            changedWidths.push(width);
        }
        this.grid.notifyColumnsChanged(this.grid.columnsInfo, this.grid.headerLayout);
        this.grid.onColumnWidthsChanged(changedUids, changedWidths);
    }
    static calculateContentWidths(grid) {
        const result = new Map();
        const dataTable = grid.getDataTable();
        if (dataTable) {
            dataTable.classList.add(GridCssClasses.CalculateContentWidthsClassName);
            const colElements = grid.getColElements();
            for (let i = 0; i < colElements.length; i++) {
                const info = grid.columnsInfo[i];
                if (info && info.uID !== -1) {
                    const offsetWidth = grid.getColElementOffsetWidth(i);
                    // Add an extra pixel to make sure it always fits to content after render
                    const safeContentWidth = offsetWidth ? Math.ceil(offsetWidth) + 1 : 0;
                    result.set(info, safeContentWidth);
                }
            }
            dataTable.classList.remove(GridCssClasses.CalculateContentWidthsClassName);
        }
        return result;
    }
    updateEmptyColumnVisibility() {
        const colElements = this.grid.getColElements();
        const emptyColumnColElement = colElements[colElements.length - 1];
        const shouldHideEmptyColumn = GridColumnWidthsController.hasAnyDataColumnWithEmptyWidth(this.grid.columnsInfo, colElements);
        if (shouldHideEmptyColumn)
            emptyColumnColElement.classList.add(GridCssClasses.HiddenEmptyCellClassName);
        else
            emptyColumnColElement.classList.remove(GridCssClasses.HiddenEmptyCellClassName);
    }
    static resetColumnWidths(columnsInfo, colElements) {
        for (let i = 0; i < colElements.length; i++) {
            const columnInfo = columnsInfo[i];
            if (columnInfo && !columnInfo.isIndent && !columnInfo.isEmpty)
                colElements[i].style.width = columnInfo.width;
        }
    }
    static doDistributionWaves(context) {
        let continueWave = false;
        let iterationCounter = 0;
        do {
            GridColumnWidthsController.performAllColumnsRealWidthCalculation(context);
            continueWave = GridColumnWidthsController.evaluateColumnMinWidthCorrection(context);
        } while (continueWave && ++iterationCounter <= context.columnsInfo.length);
    }
    static performAllColumnsRealWidthCalculation(context) {
        context.columnCurrentWidths = new Map();
        const absoluteColumnsSpace = GridColumnWidthsController.calculateAbsoluteColumnWidths(context);
        let remainingSpace = Math.max(0, context.tableWidth - absoluteColumnsSpace);
        remainingSpace = GridColumnWidthsController.calculatePercentColumnWidths(context, remainingSpace);
        remainingSpace = GridColumnWidthsController.calculateFreeColumnWidths(context, remainingSpace);
        GridColumnWidthsController.calculateEmptyColumnWidth(context, remainingSpace);
    }
    static calculateAbsoluteColumnWidths(context) {
        let absoluteColumnsSpace = 0;
        for (const column of context.absoluteColumnWidths.keys()) {
            const width = context.absoluteColumnWidths.get(column);
            absoluteColumnsSpace += width;
            context.columnCurrentWidths.set(column, width);
        }
        return absoluteColumnsSpace;
    }
    static calculatePercentColumnWidths(context, availableSpace) {
        let totalPercents = 0;
        for (const column of context.percentColumns)
            totalPercents += column.getPercents();
        let percentBasis = context.tableWidth;
        const totalPercentNormalizationRatio = totalPercents > 100 ? 100 / totalPercents : 1;
        const requiredSpace = percentBasis * (totalPercents * totalPercentNormalizationRatio) / 100;
        const compressionRatio = availableSpace < requiredSpace ? availableSpace / requiredSpace : 1;
        percentBasis *= compressionRatio;
        let percentColumnSpace = 0;
        for (const column of context.percentColumns) {
            const normalizedColumnPercent = column.getPercents() * totalPercentNormalizationRatio;
            const width = percentBasis * (normalizedColumnPercent / 100);
            context.columnCurrentWidths.set(column, width);
            percentColumnSpace += width;
        }
        return availableSpace - percentColumnSpace;
    }
    static calculateFreeColumnWidths(context, availableSpace) {
        if (context.freeColumns.length > 0) {
            const freeColumnWidth = availableSpace / context.freeColumns.length;
            for (const column of context.freeColumns)
                context.columnCurrentWidths.set(column, freeColumnWidth);
            return 0;
        }
        return availableSpace;
    }
    static calculateEmptyColumnWidth(context, availableSpace) {
        if (!context.emptyColumn)
            return;
        context.columnCurrentWidths.set(context.emptyColumn, availableSpace);
    }
    static evaluateColumnMinWidthCorrection(context) {
        const prevAbsoluteColumns = context.absoluteColumnWidths.size;
        for (const column of context.columnCurrentWidths.keys()) {
            if (context.columnCurrentWidths.get(column) > column.minWidth || column.minWidth === 0)
                continue;
            context.absoluteColumnWidths.set(column, column.minWidth);
        }
        context.percentColumns = context.percentColumns.filter(column => !context.absoluteColumnWidths.has(column));
        context.freeColumns = context.freeColumns.filter(column => !context.absoluteColumnWidths.has(column));
        return prevAbsoluteColumns !== context.absoluteColumnWidths.size;
    }
    static applyColumnWidths(context, colElements) {
        for (let i = 0; i < context.columnsInfo.length; ++i) {
            const columnInfo = context.columnsInfo[i];
            if (columnInfo.isIndent)
                continue;
            const colElementWidth = context.absoluteColumnWidths.has(columnInfo) ? `${context.absoluteColumnWidths.get(columnInfo)}px` : columnInfo.width;
            context.columnsInfo[i].colElementWidth = colElementWidth;
            colElements[i].style.width = colElementWidth;
        }
    }
    static hasAnyDataColumnWithEmptyWidth(columnsInfo, colElements) {
        let dataColumnsCount = 0;
        for (let i = 0; i < columnsInfo.length; i++) {
            const columnInfo = columnsInfo[i];
            if (columnInfo.isIndent || columnInfo.isEmpty)
                continue;
            ++dataColumnsCount;
            if (!colElements[i].style.width)
                return true;
        }
        return dataColumnsCount === 0;
    }
    static canAcquireAbsoluteColumnWidths(grid) {
        for (let i = 0; i < grid.columnsInfo.length; ++i) {
            const columnInfo = grid.columnsInfo[i];
            if (columnInfo.isAbsoluteWidth && grid.getColElementOffsetWidth(i) === null)
                return false;
        }
        return true;
    }
}

var ResizeReason;
(function (ResizeReason) {
    ResizeReason[ResizeReason["Mouse"] = 1] = "Mouse";
    ResizeReason[ResizeReason["Keyboard"] = 2] = "Keyboard";
    ResizeReason[ResizeReason["DblClick"] = 3] = "DblClick";
})(ResizeReason || (ResizeReason = {}));
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Left"] = 0] = "Left";
    MoveDirection[MoveDirection["Right"] = 1] = "Right";
})(MoveDirection || (MoveDirection = {}));
const MoveStepCount = 100;
const MaxMoveStep = 5;
const KeyboardResizeTimeout = 500;
class GridColumnResizeStrategy {
    get isResizing() { return !!this.resizeReason; }
    get columnIndex() { return this._columnIndex; }
    get columnsInfo() { return this.grid.columnsInfo; }
    get tableContainerWidth() { return this._tableContainerWidth; }
    get currentColumnInfo() { return this.columnsInfo[this.columnIndex]; }
    constructor(grid) {
        this.startMousePosition = -1;
        this.startHeaderCellPosition = -1;
        this.timeoutId = null;
        this.initialColumnWidths = new Map();
        this.boundOnDocumentPointerMoveHandler = this.onPointerMove.bind(this);
        this.getColumnOffsetWidth = (index) => {
            return this.grid.getColElementOffsetWidth(index);
        };
        this.setColumnWidth = (index, width) => {
            const colElements = this.grid.getColElements();
            colElements[index].style.width = width;
        };
        this.grid = grid;
        this.columnResizeSeparator = grid.getColumnResizeSeparator();
    }
    startDrag(anchorIndex, mousePosition) {
        var _a;
        this.initializeResizing(anchorIndex);
        this.resizeReason = ResizeReason.Mouse;
        this.startMousePosition = mousePosition;
        this.startHeaderCellPosition = this.getHeaderCellPosition(this.columnIndex);
        document.addEventListener("pointermove", this.boundOnDocumentPointerMoveHandler);
        document.body.classList.add(CssClasses.ResizeCursor);
        (_a = this.grid.getScrollViewer()) === null || _a === void 0 ? void 0 : _a.startAutoScrolling(ScrollViewerAutoScrollingMode.Horizontal, this.boundOnDocumentPointerMoveHandler);
    }
    autoFitColumnWidth(columnIndex) {
        if (this.isResizing)
            return;
        const contentWidths = GridColumnWidthsController.calculateContentWidths(this.grid);
        const info = this.columnsInfo[columnIndex];
        const newColumnWidth = contentWidths.get(info);
        if (newColumnWidth !== undefined) {
            this.resizeReason = ResizeReason.DblClick;
            this.initializeResizing(columnIndex);
            const diff = newColumnWidth - this.getColumnOffsetWidth(columnIndex);
            const normalizedDiff = diff > 1 ? Math.ceil(diff) : Math.floor(diff);
            this.performResize(normalizedDiff);
            // performResize uses requestAnimationFrame to perform changes, we need to make sure that finalizeResizing is called aftermost
            requestAnimationFrame(() => setTimeout(() => this.finalizeResizing(false)));
        }
    }
    anchorFocused(anchorIndex) {
        this.resizeReason = ResizeReason.Keyboard;
        this.initializeResizing(anchorIndex);
    }
    anchorUnfocused() {
        this.finalizeResizing(false);
    }
    stopDrag() {
        this.finalizeResizing(false);
    }
    cancelDrag() {
        if (this.timeoutId)
            clearTimeout(this.timeoutId);
        this.finalizeResizing(true);
    }
    performMoveStep(direction) {
        if (this.resizeReason === ResizeReason.Mouse)
            return;
        let moveDirectionMultiplier = direction === MoveDirection.Right ? 1 : -1;
        if (this.isReverseResizing)
            moveDirectionMultiplier *= -1;
        const diff = this.calculateDiffByMoveStep(moveDirectionMultiplier);
        this.performResize(diff);
        if (this.timeoutId)
            clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.createNotificationAction()(), KeyboardResizeTimeout);
    }
    initializeResizing(index) {
        var _a;
        this._tableContainerWidth = this.grid.getTableContainerWidth();
        this.columnResizeSeparator = this.grid.getColumnResizeSeparator();
        index = this.calculateResizingColumnIndex(index);
        this._columnIndex = index;
        this.initialColumnWidths.clear();
        const colElements = this.grid.getColElements();
        for (let i = 0; i < colElements.length; ++i)
            this.initialColumnWidths.set(i, colElements[i].style.width);
        this.initializeResizingCore();
        const columnInfo = this.columnsInfo[index];
        const headerCellInfo = (_a = columnInfo.parentPath.find(i => i.getRightLeaf() === columnInfo)) !== null && _a !== void 0 ? _a : columnInfo;
        const cell = this.grid.getHeaderCell(headerCellInfo.headerRowIndex, headerCellInfo.headerCellIndex);
        if (cell)
            this.columnResizeSeparator.show(cell, this.isReverseResizing);
        this.grid.updateEmptyColumnVisibility();
    }
    performResize(diff) {
        var _a;
        diff = Math.round(diff);
        this.performResizeCore(diff);
        requestAnimationFrame(() => this.grid.styleGenerator.updateFixedCellsStyle());
        (_a = this.columnResizeSeparator) === null || _a === void 0 ? void 0 : _a.render();
    }
    finalizeResizing(cancelled) {
        var _a, _b;
        if (!this.resizeReason)
            return;
        if (this.resizeReason === ResizeReason.Mouse) {
            document.removeEventListener("pointermove", this.boundOnDocumentPointerMoveHandler);
            document.body.classList.remove(CssClasses.ResizeCursor);
            (_a = this.grid.getScrollViewer()) === null || _a === void 0 ? void 0 : _a.stopAutoScrolling();
            this.startMousePosition = -1;
            this.startHeaderCellPosition = -1;
        }
        (_b = this.columnResizeSeparator) === null || _b === void 0 ? void 0 : _b.hide();
        let notificationAction = null;
        if (cancelled) {
            this.cancelResizeCore();
            const colElements = this.grid.getColElements();
            this.initialColumnWidths.forEach((value, key) => {
                if (value === colElements[key].style.width)
                    return;
                colElements[key].style.width = value;
            });
            this.initialColumnWidths.clear();
            requestAnimationFrame(() => this.grid.styleGenerator.updateFixedCellsStyle());
        }
        else {
            notificationAction = this.createNotificationAction();
            this.finalizeResizeCore();
        }
        this.grid.updateEmptyColumnVisibility();
        this.resizeReason = undefined;
        this._columnIndex = undefined;
        this._tableContainerWidth = undefined;
        if (this.timeoutId)
            clearTimeout(this.timeoutId);
        if (notificationAction)
            notificationAction();
    }
    createNotificationAction() {
        const changedColumns = this.applyResizingAndGetChangedColumns();
        const uids = changedColumns.map(column => column.uID);
        const widths = changedColumns.map(column => column.width);
        return () => {
            this.grid.onColumnWidthsChanged(uids, widths);
        };
    }
    getHeaderCellPosition(index) {
        var _a;
        const headerCell = this.grid.findHeaderCellByColumnIndex(index);
        return (_a = headerCell === null || headerCell === void 0 ? void 0 : headerCell.getBoundingClientRect().x) !== null && _a !== void 0 ? _a : -1;
    }
    onPointerMove(e) {
        const currentHeaderCellPosition = this.getHeaderCellPosition(this.columnIndex);
        let diff = e.pageX - this.startMousePosition;
        if (!this.isReverseResizing) {
            const headerCellPositionDelta = this.startHeaderCellPosition - currentHeaderCellPosition; // in case of scrolling during resizing
            diff += headerCellPositionDelta;
        }
        else
            diff *= -1;
        this.performResize(diff);
    }
    calculateResizingColumnIndex(anchorIndex) {
        return anchorIndex;
    }
}
class NextColumnResizeStrategy extends GridColumnResizeStrategy {
    constructor() {
        super(...arguments);
        this.columnInitialWidth = -1;
        this.columnNewWidth = -1;
        this.nextColumnInitialWidth = -1;
        this.nextColumnNewWidth = -1;
        this.nextColumnIndex = -1;
        this.totalPercents = 0;
        this.totalFreeWidth = 0;
    }
    get nextColumnInfo() { return this.columnsInfo[this.nextColumnIndex]; }
    get isReverseResizing() { return false; }
    calculateDiffByMoveStep(moveDirectionMultiplier) {
        return this.columnNewWidth - this.columnInitialWidth + Math.min(MaxMoveStep, Math.ceil((this.columnInitialWidth + this.nextColumnInitialWidth) / MoveStepCount)) * moveDirectionMultiplier;
    }
    initializeResizingCore() {
        this.columnInitialWidth = this.getColumnOffsetWidth(this.columnIndex);
        this.columnNewWidth = this.columnInitialWidth;
        this.nextColumnIndex = this.columnIndex + 1;
        this.nextColumnInitialWidth = this.getColumnOffsetWidth(this.nextColumnIndex);
        this.nextColumnNewWidth = this.nextColumnInitialWidth;
        for (let i = 0; i < this.columnsInfo.length; ++i) {
            const columnInfo = this.columnsInfo[i];
            if (columnInfo.isPercentWidth)
                this.totalPercents += columnInfo.getPercents();
            if (columnInfo.isFreeWidth)
                this.totalFreeWidth += this.getColumnOffsetWidth(i);
        }
    }
    performResizeCore(diff) {
        this.columnNewWidth = this.columnInitialWidth + diff;
        if (this.columnNewWidth < this.currentColumnInfo.minWidth)
            this.columnNewWidth = this.currentColumnInfo.minWidth;
        this.nextColumnNewWidth = this.columnInitialWidth + this.nextColumnInitialWidth - this.columnNewWidth;
        const maxWidth = this.columnInitialWidth + this.nextColumnInitialWidth - this.nextColumnInfo.minWidth;
        if (this.columnNewWidth > maxWidth) {
            this.columnNewWidth = maxWidth;
            this.nextColumnNewWidth = this.nextColumnInfo.minWidth;
        }
        requestAnimationFrame(() => {
            if (!this.isResizing)
                return;
            this.setColumnWidth(this.columnIndex, `${this.columnNewWidth}px`);
            this.setColumnWidth(this.nextColumnIndex, `${this.nextColumnNewWidth}px`);
        });
    }
    cancelResizeCore() {
        this.reset();
    }
    applyResizingAndGetChangedColumns() {
        const result = [];
        const anyResizedColumnIsPercent = this.currentColumnInfo.isPercentWidth || this.nextColumnInfo.isPercentWidth;
        if (anyResizedColumnIsPercent) {
            if (this.currentColumnInfo.isPercentWidth)
                return this.calculateNewWidthsForPercentColumn(this.currentColumnInfo, this.columnNewWidth, this.columnInitialWidth, this.nextColumnInfo, this.nextColumnNewWidth, this.nextColumnInitialWidth);
            else
                return this.calculateNewWidthsForPercentColumn(this.nextColumnInfo, this.nextColumnNewWidth, this.nextColumnInitialWidth, this.currentColumnInfo, this.columnNewWidth, this.columnInitialWidth);
        }
        else {
            const hasPercentColumns = this.totalPercents !== 0;
            const anyResizedColumnIsFree = this.currentColumnInfo.isFreeWidth || this.nextColumnInfo.isFreeWidth;
            const shouldTransformCurrentColumnToPixel = this.currentColumnInfo.isFreeWidth && hasPercentColumns;
            const shouldTransformFreeColumnsToPercent = anyResizedColumnIsFree && !hasPercentColumns;
            if (this.currentColumnInfo.isAbsoluteWidth || shouldTransformCurrentColumnToPixel) {
                this.currentColumnInfo.updateWidth(`${this.columnNewWidth}px`);
                result.push(this.currentColumnInfo);
            }
            if (shouldTransformFreeColumnsToPercent) {
                const currentFreeWidth = this.totalFreeWidth
                    + (this.currentColumnInfo.isFreeWidth ? this.columnNewWidth - this.columnInitialWidth : 0)
                    + (this.nextColumnInfo.isFreeWidth ? this.nextColumnNewWidth - this.nextColumnInitialWidth : 0);
                for (let i = 0; i < this.columnsInfo.length; ++i) {
                    const columnInfo = this.columnsInfo[i];
                    if (!columnInfo.isFreeWidth)
                        continue;
                    columnInfo.updateWidth(`${this.getColumnOffsetWidth(i) * 100 / currentFreeWidth}%`);
                    result.push(columnInfo);
                }
            }
        }
        if (!result.includes(this.nextColumnInfo)) {
            this.nextColumnInfo.updateWidth(`${this.nextColumnNewWidth}px`);
            result.push(this.nextColumnInfo);
        }
        return result;
    }
    calculateNewWidthsForPercentColumn(percentColumn, percentColumnCurrentWidth, percentColumnInitWidth, otherColumn, otherColumnCurrentWidth, otherColumnInitWidth) {
        const result = [];
        const calculateNewPercent = (percent, newWidth, initWidth) => {
            return percent * newWidth / initWidth;
        };
        const columnInitPercents = percentColumn.getPercents();
        const columnNewPercents = calculateNewPercent(columnInitPercents, percentColumnCurrentWidth, percentColumnInitWidth);
        percentColumn.updateWidth(percentColumn.colElementWidth === percentColumn.width ? `${columnNewPercents}%` : `${percentColumnCurrentWidth}px`);
        result.push(percentColumn);
        if (otherColumn.isPercentWidth) {
            // first column is percent and second column is percent too, so total percents will not change
            otherColumn.updateWidth(`${calculateNewPercent(otherColumn.getPercents(), otherColumnCurrentWidth, otherColumnInitWidth)}%`);
            result.push(otherColumn);
        }
        else {
            otherColumn.updateWidth(`${otherColumnCurrentWidth}px`);
            result.push(otherColumn);
            // total percents increase and may become more than 100, we need to normalize it
            const newTotalPercents = this.totalPercents - columnInitPercents + columnNewPercents;
            const needPercentColumnsNormalization = newTotalPercents > 100;
            if (needPercentColumnsNormalization) {
                const magnificationRatio = newTotalPercents / this.totalPercents;
                for (let i = 0; i < this.columnsInfo.length; ++i) {
                    const columnInfo = this.columnsInfo[i];
                    if (!columnInfo.isPercentWidth)
                        continue;
                    columnInfo.updateWidth(`${columnInfo.getPercents() / magnificationRatio}%`);
                    if (columnInfo !== percentColumn)
                        result.push(columnInfo);
                }
            }
        }
        return result;
    }
    finalizeResizeCore() {
        this.reset();
    }
    reset() {
        this.columnInitialWidth = -1;
        this.columnNewWidth = -1;
        this.nextColumnInitialWidth = -1;
        this.nextColumnNewWidth = -1;
        this.nextColumnIndex = -1;
        this.totalFreeWidth = 0;
        this.totalPercents = 0;
    }
}
class ColumnContainerResizeStrategy extends GridColumnResizeStrategy {
    constructor() {
        super(...arguments);
        this.enforcedColumnWidths = new Map();
        this.columnInitialWidth = -1;
        this.columnsInitialTotalWidth = -1;
        this.columnNewWidth = -1;
    }
    get isReverseResizing() { return this.currentColumnInfo.fixedPosition === "right"; }
    calculateDiffByMoveStep(moveDirectionMultiplier) {
        return this.columnNewWidth - this.columnInitialWidth + Math.min(MaxMoveStep, Math.ceil(this.columnInitialWidth * 2 / MoveStepCount)) * moveDirectionMultiplier;
    }
    initializeResizingCore() {
        this.columnInitialWidth = this.getColumnOffsetWidth(this.columnIndex);
        this.columnNewWidth = this.columnInitialWidth;
        if (this.currentColumnInfo.fixedPosition) {
            let maxWidth = this.tableContainerWidth;
            for (let i = 0; i < this.columnsInfo.length; ++i) {
                const columnInfo = this.columnsInfo[i];
                if (columnInfo === this.currentColumnInfo || !columnInfo.fixedPosition)
                    continue;
                maxWidth -= this.getColumnOffsetWidth(i);
            }
            this.columnMaxWidth = Math.max(this.columnInitialWidth, maxWidth);
        }
        this.enforcedColumnWidths.clear();
        for (let i = 0; i < this.columnsInfo.length; ++i) {
            const columnInfo = this.columnsInfo[i];
            const needToEnforceColumnWidth = !columnInfo.isIndent && !columnInfo.isEmpty && !columnInfo.isAbsoluteWidth;
            if (needToEnforceColumnWidth) {
                const enforcedColumnWidth = `${this.getColumnOffsetWidth(i)}px`;
                this.setColumnWidth(i, enforcedColumnWidth);
                this.enforcedColumnWidths.set(i, enforcedColumnWidth);
            }
        }
    }
    performResizeCore(diff) {
        let newWidth = this.columnInitialWidth + diff;
        if (newWidth < this.currentColumnInfo.minWidth)
            newWidth = this.currentColumnInfo.minWidth;
        if (this.columnMaxWidth && newWidth > this.columnMaxWidth)
            newWidth = this.columnMaxWidth;
        if (this.isReverseResizing) {
            const otherColumnsTotalWidth = this.columnsInitialTotalWidth - this.columnInitialWidth;
            const currentTotalWidth = otherColumnsTotalWidth + newWidth;
            if (currentTotalWidth < this.tableContainerWidth)
                newWidth = this.tableContainerWidth - otherColumnsTotalWidth;
        }
        this.columnNewWidth = newWidth;
        const columnIndex = this.columnIndex;
        requestAnimationFrame(() => {
            if (!this.isResizing)
                return;
            this.setColumnWidth(columnIndex, `${newWidth}px`);
        });
    }
    cancelResizeCore() {
        this.reset();
    }
    applyResizingAndGetChangedColumns() {
        const result = [];
        const columnsInfo = this.columnsInfo;
        const resizedColumn = columnsInfo[this.columnIndex];
        resizedColumn.updateWidth(`${this.columnNewWidth}px`);
        result.push(resizedColumn);
        this.enforcedColumnWidths.forEach((value, index) => {
            const changedColumn = columnsInfo[index];
            if (changedColumn !== resizedColumn) {
                changedColumn.updateWidth(value);
                result.push(changedColumn);
            }
        });
        return result;
    }
    calculateResizingColumnIndex(anchorIndex) {
        if (this.columnsInfo[anchorIndex].fixedPosition === "right") {
            let columnsTotalWidth = 0;
            for (let i = 0; i < this.columnsInfo.length; ++i) {
                if (this.columnsInfo[i].isEmpty)
                    continue;
                columnsTotalWidth += this.getColumnOffsetWidth(i);
            }
            this.columnsInitialTotalWidth = columnsTotalWidth;
            if (columnsTotalWidth < this.tableContainerWidth)
                return anchorIndex - 1;
        }
        return anchorIndex;
    }
    finalizeResizeCore() {
        this.reset();
    }
    reset() {
        this.columnInitialWidth = -1;
        this.columnsInitialTotalWidth = -1;
        this.columnNewWidth = -1;
        this.enforcedColumnWidths.clear();
        this.columnMaxWidth = undefined;
    }
}

const DxColumnResizeAnchorTagName = "dxbl-column-resize-anchor";
class DxColumnResizeAnchor extends DxHTMLElementBase {
    constructor() {
        super();
        this.boundOnAnchorFocusHandler = this.onAnchorFocus.bind(this);
        this.boundOnAnchorBlurHandler = this.onAnchorBlur.bind(this);
        this.boundOnKeyDownHandler = this.onKeyDown.bind(this);
        this.handlePointerEventsMode = HandlePointerEventsMode.Click | HandlePointerEventsMode.DblClick | HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
    initializeComponent() {
        var _a, _b, _c;
        super.initializeComponent();
        if (browser.Browser.TouchUI)
            this.classList.add(CssClasses.Touch);
        this.grid = this.closest(`.${GridCssClasses.ClassName}`);
        this.focusableElement = this.querySelector("div");
        (_a = this.focusableElement) === null || _a === void 0 ? void 0 : _a.addEventListener("focus", this.boundOnAnchorFocusHandler);
        (_b = this.focusableElement) === null || _b === void 0 ? void 0 : _b.addEventListener("blur", this.boundOnAnchorBlurHandler);
        (_c = this.focusableElement) === null || _c === void 0 ? void 0 : _c.addEventListener("keydown", this.boundOnKeyDownHandler);
    }
    disposeComponent() {
        var _a, _b, _c;
        super.disposeComponent();
        (_a = this.focusableElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("focus", this.boundOnAnchorFocusHandler);
        (_b = this.focusableElement) === null || _b === void 0 ? void 0 : _b.removeEventListener("blur", this.boundOnAnchorBlurHandler);
        (_c = this.focusableElement) === null || _c === void 0 ? void 0 : _c.removeEventListener("keydown", this.boundOnKeyDownHandler);
    }
    onAnchorFocus(evt) {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.notifyColumnResizeAnchorFocus(evt.target);
    }
    onAnchorBlur() {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.notifyColumnResizeAnchorBlur();
    }
    onKeyDown(evt) {
        var _a, _b;
        if (evt.keyCode === key.KeyCode.Left) {
            evt.preventDefault();
            (_a = this.grid) === null || _a === void 0 ? void 0 : _a.notifyColumnResizeAnchorMove(MoveDirection.Left);
        }
        if (evt.keyCode === key.KeyCode.Right) {
            evt.preventDefault();
            (_b = this.grid) === null || _b === void 0 ? void 0 : _b.notifyColumnResizeAnchorMove(MoveDirection.Right);
        }
    }
}

const DxColumnResizeSeparatorTagName = "dxbl-column-resize-separator";
class DxColumnResizeSeparator extends DxHTMLElementBase {
    constructor() {
        super();
        this.cell = null;
        this.leftSide = false;
        this.parentWidth = 0;
        this.tableContainerResizeObserver = new ResizeObserver(this.onTableContainerSizeChanged.bind(this));
        this.boundOnTableContainerScroll = this.onTableContainerScroll.bind(this);
    }
    get tableContainer() { return this._tableContainer; }
    initializeComponent() {
        super.initializeComponent();
        this.initializeTableContainer();
        this.tableContainer.addEventListener("scroll", this.boundOnTableContainerScroll);
        this.tableContainerResizeObserver.observe(this.tableContainer);
    }
    initializeTableContainer() {
        this._tableContainer = this.closest(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
    }
    disposeComponent() {
        super.disposeComponent();
        this.tableContainer.removeEventListener("scroll", this.boundOnTableContainerScroll);
        this.tableContainerResizeObserver.unobserve(this.tableContainer);
    }
    show(cell, leftSide) {
        this.cell = cell;
        this.leftSide = leftSide;
        this.classList.add(DxColumnResizeSeparator.ActiveColumnResizeSeparator);
        this.render();
    }
    hide() {
        this.cell = null;
        this.leftSide = false;
        this.classList.remove(DxColumnResizeSeparator.ActiveColumnResizeSeparator);
        this.style.transform = "none";
    }
    render() {
        requestAnimationFrame(() => {
            if (!this.cell)
                return;
            const position = this.getColumnSeparatorPosition(this.cell);
            const borderWidth = this.getBorderWidth(this.cell);
            const centeredPosition = DxColumnResizeSeparator.getCenteredByBorderPosition(position, this.offsetWidth, borderWidth);
            const height = this.getActualHeight();
            const cellOffsetTop = this.cell.offsetTop;
            if (cellOffsetTop > 0)
                this.style.transform = `translate(${centeredPosition},${cellOffsetTop}px)`;
            else
                this.style.transform = `translateX(${centeredPosition})`;
            if (height > 0)
                this.style.height = `${height - cellOffsetTop}px`;
        });
    }
    onTableContainerScroll() {
        this.render();
    }
    onTableContainerSizeChanged(entries) {
        const newWidth = entries[0].contentRect.width;
        if (this.parentWidth !== newWidth) {
            this.parentWidth = newWidth;
            this.render();
        }
    }
    getColumnSeparatorPosition(cell) {
        const relativeLeft = cell.offsetLeft - this.tableContainer.scrollLeft;
        if (this.leftSide)
            return relativeLeft;
        return relativeLeft + cell.offsetWidth;
    }
    getActualHeight() {
        const tableFoot = this.tableContainer.querySelector(`.${GridCssClasses.DataTableClassName} > tfoot`);
        if (!tableFoot)
            return 0;
        const tableFootHeight = tableFoot.getBoundingClientRect().height;
        return this.tableContainer.getBoundingClientRect().height - tableFootHeight;
    }
    getBorderWidth(cell) {
        var _a;
        const borderWidth = DxColumnResizeSeparator.getBorderWidthByElement(cell, "border-right-width");
        if (borderWidth > 0)
            return borderWidth;
        const nextCell = (_a = this.cell) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
        return nextCell && DxColumnResizeSeparator.getBorderWidthByElement(nextCell, "border-left-width");
    }
    static getBorderWidthByElement(element, propertyName) {
        const style = getComputedStyle(element);
        const border = style.getPropertyValue(propertyName);
        return parseFloat(border) || parseFloat(style.borderWidth);
    }
    static getCenteredByBorderPosition(position, elementWidth, borderWidth) {
        return `${position - (elementWidth - borderWidth) / 2}px`;
    }
}
DxColumnResizeSeparator.ActiveColumnResizeSeparator = CssClasses.Active;

const ItemColumnUidAttributeName = "data-column-uid";
const ItemColumnParentUidAttributeName = "data-parent-column-uid";
const DataColumnFixedPositionAttributeName = "data-column-fixed-position";

var ReorderState;
(function (ReorderState) {
    ReorderState[ReorderState["ItemMoving"] = 0] = "ItemMoving";
    ReorderState[ReorderState["Stop"] = 1] = "Stop";
    ReorderState[ReorderState["Cancel"] = 2] = "Cancel";
})(ReorderState || (ReorderState = {}));
class ItemsReorderHelper {
    constructor(reorderingCallback) {
        this.boundOnDocumentMouseMoveHandler = this.onDocumentMouseMove.bind(this);
        this.reorderContext = null;
        this.reorderingCallback = reorderingCallback;
    }
    start(items, draggingItem, e) {
        const itemRects = items.map(i => i.getBoundingClientRect());
        const columnUids = items.map(i => i.getAttribute(ItemColumnUidAttributeName));
        const columnParentUids = items.map(i => i.getAttribute(ItemColumnParentUidAttributeName));
        const columnFixedPositions = items.map(i => i.getAttribute(DataColumnFixedPositionAttributeName));
        const draggingItemIndex = items.indexOf(draggingItem);
        const draggingItemIndices = ItemsReorderHelper.populateItemGroup(draggingItemIndex, columnUids, columnParentUids);
        const offsetParent = draggingItem.parentElement;
        const offsetParentStartY = ItemsReorderHelper.calcOffsetParentY(offsetParent);
        const intervals = ItemsReorderHelper.calculateReorderIntervals(itemRects, draggingItemIndices, columnUids, columnParentUids, columnFixedPositions);
        const initialInterval = ItemsReorderHelper.findInterval(intervals, 0);
        this.reorderContext = {
            state: ReorderState.ItemMoving,
            startY: e.y,
            currentY: e.y,
            offsetParentStartY: offsetParentStartY,
            offsetParent: offsetParent,
            draggingItemIndices: draggingItemIndices,
            draggingItem: draggingItem,
            items: items,
            intervals: intervals,
            initialInterval: initialInterval,
            currentInterval: initialInterval
        };
        this.refreshUI();
        document.addEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
    }
    stop() {
        this.end(ReorderState.Stop);
    }
    cancel() {
        this.end(ReorderState.Cancel);
    }
    end(state) {
        if (this.reorderContext == null)
            return;
        this.reorderContext.state = state;
        this.refreshUI();
        document.removeEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
    }
    onDocumentMouseMove(e) {
        if (this.reorderContext == null)
            return;
        this.reorderContext.currentY = e.y;
        this.refreshUI();
    }
    refreshUI() {
        if (this.reorderContext == null)
            return;
        const offsetYDiff = this.reorderContext.offsetParentStartY - ItemsReorderHelper.calcOffsetParentY(this.reorderContext.offsetParent);
        const yDiff = this.reorderContext.currentY - this.reorderContext.startY;
        const position = yDiff + offsetYDiff;
        let interval = ItemsReorderHelper.findInterval(this.reorderContext.intervals, position);
        if (this.reorderContext.state === ReorderState.Cancel)
            interval = this.reorderContext.initialInterval;
        this.reorderContext.currentInterval = interval;
        this.applyTransformations(position);
    }
    applyTransformations(draggingItemOffset) {
        requestAnimationFrame(() => {
            if (this.reorderContext == null)
                return;
            const interval = this.reorderContext.currentInterval;
            if (interval == null)
                return;
            const useDraggingItemOffset = this.reorderContext.state === ReorderState.ItemMoving &&
                draggingItemOffset >= interval.top && draggingItemOffset <= interval.bottom;
            for (let i = 0; i < interval.transforms.length; i++) {
                let transform = interval.transforms[i];
                if (this.reorderContext.draggingItemIndices.includes(i) && useDraggingItemOffset)
                    transform = draggingItemOffset;
                this.reorderContext.items[i].style.transform = "translate(0, " + transform + "px)";
            }
            this.reorderingCallback(this.reorderContext.items, interval.itemIndices, this.reorderContext.draggingItemIndices, this.reorderContext.state);
        });
    }
    static calcOffsetParentY(element) {
        return element.getBoundingClientRect().y - element.scrollTop;
    }
    static calculateReorderIntervals(itemRects, draggingItemIndices, columnUids, parentUids, fixedPositions) {
        const draggingItemIndex = draggingItemIndices[0];
        const draggingItemsCount = draggingItemIndices.length;
        const intervalBounds = ItemsReorderHelper.calcIntervalBounds(itemRects, draggingItemIndex, columnUids, parentUids, fixedPositions);
        const etalonIndices = Array.from(Array(itemRects.length).keys());
        etalonIndices.splice(draggingItemIndex, draggingItemsCount);
        const draggingItemHeight = Math.ceil(ItemsReorderHelper.calculateTotalGroupHeight(draggingItemIndices, itemRects) / draggingItemsCount);
        const result = intervalBounds.map(intervalBound => {
            const itemIndices = Array.from(etalonIndices);
            const offset = intervalBound.itemIndex > draggingItemIndex ? 1 : 0;
            const position = intervalBound.itemIndex !== draggingItemIndex
                ? itemIndices.indexOf(intervalBound.itemIndex) + offset
                : intervalBound.itemIndex;
            itemIndices.splice(position, 0, ...draggingItemIndices);
            return {
                top: intervalBound.top,
                bottom: intervalBound.bottom,
                itemIndices: itemIndices,
                transforms: this.calcItemsTransformations(itemIndices, draggingItemHeight),
                itemIndex: intervalBound.itemIndex
            };
        });
        return result;
    }
    static calcIntervalBounds(itemRects, draggingItemIndex, columnUids, parentUids, fixedPositions) {
        const itemIndices = Array.from(Array(itemRects.length).keys());
        const draggingItemFixedPosition = fixedPositions[draggingItemIndex];
        const draggingItemParentUid = parentUids[draggingItemIndex];
        let topIndices = draggingItemIndex !== 0 ? itemIndices.slice(0, draggingItemIndex).reverse() : [];
        let bottomIndices = draggingItemIndex !== itemIndices.length - 1 ? itemIndices.slice(draggingItemIndex + 1) : [];
        if (fixedPositions.some(value => value !== null)) {
            topIndices = topIndices.filter(i => fixedPositions[i] === draggingItemFixedPosition);
            bottomIndices = bottomIndices.filter(i => fixedPositions[i] === draggingItemFixedPosition);
        }
        if (parentUids.some(value => value !== null)) {
            topIndices = topIndices.filter(i => parentUids[i] === draggingItemParentUid);
            bottomIndices = bottomIndices.filter((i) => parentUids[i] === draggingItemParentUid);
        }
        const topItemGroups = topIndices.map((i) => ItemsReorderHelper.populateItemGroup(i, columnUids, parentUids));
        const bottomItemGroups = bottomIndices.map((i) => ItemsReorderHelper.populateItemGroup(i, columnUids, parentUids));
        const topIntervals = this.calcIntervalBoundsCore(itemRects, topItemGroups, true);
        const bottomIntervals = this.calcIntervalBoundsCore(itemRects, bottomItemGroups, false);
        const result = [];
        topIntervals.reverse();
        for (let i = 0; i < topIntervals.length; i++) {
            const interval = topIntervals[i];
            result.push({
                top: interval.bottom * -1,
                bottom: interval.top * -1,
                itemIndex: interval.itemIndex
            });
        }
        result.push({
            top: result.length > 0 ? result[result.length - 1].bottom + 1 : 0,
            bottom: bottomIntervals.length > 0 ? bottomIntervals[0].top - 1 : 0,
            itemIndex: draggingItemIndex
        });
        return result.concat(bottomIntervals);
    }
    static calcIntervalBoundsCore(itemRects, itemIndices, isTopInterval = true) {
        if (itemIndices.length === 0)
            return [];
        let totalHeight = 0;
        const bounds = [];
        for (let i = 0; i < itemIndices.length; i++) {
            const height = ItemsReorderHelper.calculateTotalGroupHeight(itemIndices[i], itemRects);
            bounds.push(totalHeight + Math.ceil(height / 2));
            totalHeight += height;
        }
        bounds.push(totalHeight);
        const result = [];
        for (let i = 0; i < bounds.length - 1; i++) {
            const indices = itemIndices[i];
            const index = isTopInterval ? 0 : indices.length - 1;
            result.push({
                top: 1 + bounds[i],
                bottom: bounds[i + 1],
                itemIndex: indices[index]
            });
        }
        return result;
    }
    static calcItemsTransformations(itemIndices, draggingItemHeight) {
        const result = [];
        for (let itemIndex = 0; itemIndex < itemIndices.length; itemIndex++) {
            let transform = 0;
            const diff = itemIndices.indexOf(itemIndex) - itemIndex;
            if (diff !== 0)
                transform = draggingItemHeight * diff;
            result.push(transform);
        }
        return result;
    }
    static findInterval(intervals, position) {
        for (let i = 0; i < intervals.length; i++) {
            if (position >= intervals[i].top && position <= intervals[i].bottom)
                return intervals[i];
        }
        if (position < intervals[0].top)
            return intervals[0];
        if (position > intervals[intervals.length - 1].bottom)
            return intervals[intervals.length - 1];
        return null;
    }
    static populateItemGroup(index, columnUids, parentUids) {
        const group = [index];
        const dependentUids = new Set();
        dependentUids.add(columnUids[index]);
        for (let i = index + 1; i < columnUids.length; i++) {
            const parentUid = parentUids[i];
            if (parentUid && dependentUids.has(parentUid)) {
                group.push(i);
                dependentUids.add(columnUids[i]);
            }
        }
        return group;
    }
    static calculateTotalGroupHeight(groupIndices, itemRects) {
        return groupIndices.reduce((totalHeight, currentIndex) => {
            return totalHeight + itemRects[currentIndex].height;
        }, 0);
    }
}

class GridAttributes {
}
GridAttributes.VisibleIndexName = "data-visible-index";
GridAttributes.SummaryItem = GridCssClasses.ClassName + "-summary-item";
GridAttributes.EditCell = "data-edit-cell";
GridAttributes.FocusedRowHidden = "dxbl-grid-focused-row-hidden";

var GridNavigationAreaType;
(function (GridNavigationAreaType) {
    GridNavigationAreaType[GridNavigationAreaType["None"] = 0] = "None";
    GridNavigationAreaType[GridNavigationAreaType["GroupPanel"] = 1] = "GroupPanel";
    GridNavigationAreaType[GridNavigationAreaType["DataTable"] = 2] = "DataTable";
    GridNavigationAreaType[GridNavigationAreaType["Pager"] = 3] = "Pager";
    GridNavigationAreaType[GridNavigationAreaType["ColumnChooser"] = 4] = "ColumnChooser";
    GridNavigationAreaType[GridNavigationAreaType["ToolbarContainer"] = 5] = "ToolbarContainer";
    GridNavigationAreaType[GridNavigationAreaType["SearchBox"] = 6] = "SearchBox";
})(GridNavigationAreaType || (GridNavigationAreaType = {}));
var GridRowType;
(function (GridRowType) {
    GridRowType[GridRowType["None"] = 0] = "None";
    GridRowType[GridRowType["Header"] = 1] = "Header";
    GridRowType[GridRowType["Filter"] = 2] = "Filter";
    GridRowType[GridRowType["Edit"] = 3] = "Edit";
    GridRowType[GridRowType["EditForm"] = 4] = "EditForm";
    GridRowType[GridRowType["Group"] = 5] = "Group";
    GridRowType[GridRowType["Data"] = 6] = "Data";
    GridRowType[GridRowType["EmptyData"] = 7] = "EmptyData";
    GridRowType[GridRowType["Detail"] = 8] = "Detail";
    GridRowType[GridRowType["Footer"] = 9] = "Footer";
    GridRowType[GridRowType["GroupFooter"] = 10] = "GroupFooter";
    GridRowType[GridRowType["EmptyRow"] = 11] = "EmptyRow";
    GridRowType[GridRowType["EditNewItemRow"] = 12] = "EditNewItemRow";
})(GridRowType || (GridRowType = {}));
var GridCellType;
(function (GridCellType) {
    GridCellType[GridCellType["Data"] = 0] = "Data";
    GridCellType[GridCellType["Edit"] = 1] = "Edit";
    GridCellType[GridCellType["Selection"] = 2] = "Selection";
    GridCellType[GridCellType["Command"] = 3] = "Command";
    GridCellType[GridCellType["Indent"] = 4] = "Indent";
    GridCellType[GridCellType["ExpandButton"] = 5] = "ExpandButton";
    GridCellType[GridCellType["EditNewItemRowCell"] = 6] = "EditNewItemRowCell";
})(GridCellType || (GridCellType = {}));
class GridLayoutHelper {
    static getNavigationAreaType(element) {
        if (element.matches(GridSelectors.ToolbarContainerSelector))
            return GridNavigationAreaType.ToolbarContainer;
        if (element.matches(GridSelectors.DataTableSelector))
            return GridNavigationAreaType.DataTable;
        if (element.matches(GridSelectors.PagerPanelSelector))
            return GridNavigationAreaType.Pager;
        if (element.matches(GridSelectors.TopPanelSelector))
            return GridNavigationAreaType.GroupPanel;
        return GridNavigationAreaType.None;
    }
    static getRowType(row) {
        if (row.matches(GridSelectors.HeaderRowSelector))
            return GridRowType.Header;
        if (row.matches(GridSelectors.FilterRowSelector))
            return GridRowType.Filter;
        if (row.matches(GridSelectors.EditRowSelector))
            return GridRowType.Edit;
        if (!!row.querySelector(GridSelectors.EditFormRowCellSelector))
            return GridRowType.EditForm;
        if (row.matches(GridSelectors.GroupRowSelector))
            return GridRowType.Group;
        if (row.matches(GridSelectors.EditNewItemRowSelector))
            return GridRowType.EditNewItemRow;
        if (row.matches(GridSelectors.DataRowSelector))
            return GridRowType.Data;
        if (!!row.querySelector(GridSelectors.EmptyDataRowCellSelector))
            return GridRowType.EmptyData;
        if (!!row.querySelector(GridSelectors.DetailRowCellSelector))
            return GridRowType.Detail;
        if (row.matches(GridSelectors.FooterRowSelector))
            return GridRowType.Footer;
        if (row.matches(GridSelectors.GroupFooterRowSelector))
            return GridRowType.GroupFooter;
        if (row.matches(`.${GridCssClasses.EmptyRowClassName}`))
            return GridRowType.EmptyRow;
        return GridRowType.None;
    }
    static getCellType(cell) {
        if (cell.dataset.editCell !== undefined)
            return GridCellType.Edit;
        if (GridLayoutHelper.isSelectionCell(cell))
            return GridCellType.Selection;
        if (GridLayoutHelper.isCommandCell(cell))
            return GridCellType.Command;
        if (GridLayoutHelper.isExpandButtonCell(cell))
            return GridCellType.ExpandButton;
        if (GridLayoutHelper.isIndentCell(cell))
            return GridCellType.Indent;
        if (GridLayoutHelper.isEditNewItemRowCell(cell))
            return GridCellType.EditNewItemRowCell;
        return GridCellType.Data;
    }
    static isIndentCell(cell) {
        return cell === null || cell === void 0 ? void 0 : cell.matches(`.${GridCssClasses.IndentCellClassName}, .${GridCssClasses.GroupFooterIndentCellClassName}`);
    }
    static isCommandCell(cell) {
        var _a;
        return (_a = cell === null || cell === void 0 ? void 0 : cell.matches(`.${GridCssClasses.CommandCellClassName}`)) !== null && _a !== void 0 ? _a : false;
    }
    static isExpandButtonCell(cell) {
        var _a;
        return (_a = cell === null || cell === void 0 ? void 0 : cell.matches(`.${GridCssClasses.ExpandButtonCellClassName}`)) !== null && _a !== void 0 ? _a : false;
    }
    static isSelectionCell(cell) {
        var _a;
        return (_a = cell === null || cell === void 0 ? void 0 : cell.matches(`.${GridCssClasses.SelectionCellClassName}`)) !== null && _a !== void 0 ? _a : false;
    }
    static isFixedCell(cell) {
        var _a;
        return (_a = cell === null || cell === void 0 ? void 0 : cell.matches(`.${GridCssClasses.FixedCellClassName}`)) !== null && _a !== void 0 ? _a : false;
    }
    static isEditNewItemRowCell(cell) {
        var _a, _b;
        return (_b = (_a = cell === null || cell === void 0 ? void 0 : cell.parentElement) === null || _a === void 0 ? void 0 : _a.matches(`.${GridCssClasses.EditNewItemRowClassName}`)) !== null && _b !== void 0 ? _b : false;
    }
    static isSearchBoxContainer(element) {
        return element === null || element === void 0 ? void 0 : element.matches(`.${GridCssClasses.SearchBoxContainerClassName}`);
    }
}

const DxDropTargetIndicatorTagName = "dxbl-drop-target-indicator";
var GridDropPosition;
(function (GridDropPosition) {
    GridDropPosition[GridDropPosition["Append"] = 0] = "Append";
    GridDropPosition[GridDropPosition["Before"] = 1] = "Before";
    GridDropPosition[GridDropPosition["After"] = 2] = "After";
    GridDropPosition[GridDropPosition["Inside"] = 3] = "Inside";
})(GridDropPosition || (GridDropPosition = {}));
class DxDropTargetIndicator extends DxHTMLElementBase {
    constructor() {
        super();
        this.tableContainer = null;
        this.dropTargetElement = null;
        this.dropPosition = GridDropPosition.Before;
        this.lastObservedWidth = 0;
        this.resizeObserver = new ResizeObserver(this.onTableContainerSizeChanged.bind(this));
        this.boundOnTableContainerScrollHandler = this.onTableContainerScroll.bind(this);
    }
    get isHidden() {
        return !this.dropTargetElement;
    }
    show() {
        this.classList.add(CssClasses.Active);
        this.render();
    }
    hide() {
        this.dropTargetElement = null;
        this.classList.remove(CssClasses.Active);
        this.removeAttribute("style");
    }
    updatePosition(targetElement, position) {
        this.dropTargetElement = targetElement;
        this.dropPosition = position;
    }
    initializeComponent() {
        super.initializeComponent();
        this.tableContainer = this.closest(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
        if (this.tableContainer) {
            this.tableContainer.addEventListener("scroll", this.boundOnTableContainerScrollHandler);
            this.resizeObserver.observe(this.tableContainer);
        }
    }
    disposeComponent() {
        super.disposeComponent();
        if (this.tableContainer) {
            this.tableContainer.removeEventListener("scroll", this.boundOnTableContainerScrollHandler);
            this.resizeObserver.unobserve(this.tableContainer);
        }
    }
    onTableContainerScroll() {
        this.render();
    }
    onTableContainerSizeChanged(entries) {
        const newWidth = entries[0].contentRect.width;
        if (this.lastObservedWidth !== newWidth) {
            this.lastObservedWidth = newWidth;
            this.render();
        }
    }
    render() {
        if (this.isHidden)
            return;
        requestAnimationFrame(this.updateIndicatorStyle.bind(this));
    }
    updateIndicatorStyle() {
        const targetElement = this.getTargetElement();
        this.style.height = targetElement && this.shouldFitIntoElement()
            ? `${targetElement.offsetHeight}px`
            : "";
        const position = this.calculatePosition();
        this.style.transform = `translateY(${position})`;
        this.style.marginLeft = this.calculateLeftOffset();
    }
    calculatePosition() {
        const dropTargetElement = this.getTargetElement();
        const targetPosition = this.calculateIndicatorPosition(dropTargetElement);
        const position = this.shouldFitIntoElement()
            ? targetPosition
            : DxDropTargetIndicator.getCenteredPosition(targetPosition, this.offsetHeight);
        return `${Math.ceil(position)}px`;
    }
    shouldFitIntoElement() {
        return this.dropPosition === GridDropPosition.Append
            || this.dropPosition === GridDropPosition.Inside;
    }
    calculateIndicatorPosition(targetElement) {
        if (!targetElement || !this.tableContainer)
            return 0;
        const targetElementRect = targetElement.getBoundingClientRect();
        const tableContainerRect = this.tableContainer.getBoundingClientRect();
        const relativeTop = targetElementRect.top - tableContainerRect.top;
        return this.dropPosition === GridDropPosition.After
            ? relativeTop + targetElement.offsetHeight
            : relativeTop;
    }
    calculateLeftOffset() {
        const dropTargetElement = this.getTargetElement();
        if (!dropTargetElement || GridLayoutHelper.getRowType(dropTargetElement) !== GridRowType.Data)
            return "";
        const indents = dropTargetElement.querySelectorAll(`.${GridCssClasses.IndentCellClassName}`);
        if (indents.length === 0)
            return "";
        const lastIndent = indents[indents.length - 1];
        return `${lastIndent.offsetLeft + lastIndent.offsetWidth}px`;
    }
    getTargetElement() {
        return this.dropPosition === GridDropPosition.Append ? this.tableContainer : this.dropTargetElement;
    }
    static getCenteredPosition(position, elementHeight) {
        return position - (elementHeight / 2);
    }
}

const DxDragHintTagName$1 = "dxbl-drag-hint";
class GridRowDraggingHelperBase extends ItemDraggingHelper {
    constructor(grid) {
        super();
        this.grid = grid;
        this.boundOnDroppableMouseMoveHandler = this.onDroppableAreaMove.bind(this);
    }
    get draggableRowContext() {
        return (this.draggableItemContext);
    }
    getKey() {
        return this.grid.uId;
    }
    getItemDropArea() {
        return this.grid.getDataTable();
    }
    initItemDropTarget(enabled) {
        if (enabled)
            dropTargetRegistrySingleton.register(this);
        else
            dropTargetRegistrySingleton.remove(this.getKey());
    }
    start(srcElement, mouseDownEvt) {
        if (!this.isRowDraggingAllowed(srcElement))
            return;
        super.start(srcElement, mouseDownEvt);
        this.toggleCursorClass(true);
    }
    stop() {
        var _a;
        this.toggleCursorClass(false);
        (_a = this.getTargetIndicator()) === null || _a === void 0 ? void 0 : _a.hide();
        super.stop();
    }
    activateDropTarget(context) {
        var _a;
        super.activateDropTarget(context);
        (_a = this.grid.getScrollViewer()) === null || _a === void 0 ? void 0 : _a.startAutoScrolling(ScrollViewerAutoScrollingMode.Vertical);
    }
    deactivateDropTarget() {
        var _a, _b;
        super.deactivateDropTarget();
        (_a = this.getTargetIndicator()) === null || _a === void 0 ? void 0 : _a.hide();
        (_b = this.grid.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.stopAutoScrolling();
    }
    addElementListeners(element) {
        super.addElementListeners(element);
        element.addEventListener("pointermove", this.boundOnDroppableMouseMoveHandler);
    }
    removeElementListeners(element) {
        super.removeElementListeners(element);
        element.removeEventListener("pointermove", this.boundOnDroppableMouseMoveHandler);
    }
    createSourceInfo() {
        const baseArgs = super.createSourceInfo();
        return {
            ...baseArgs,
            visibleIndex: this.draggableRowContext.visibleIndex
        };
    }
    createTargetInfo() {
        const baseArgs = super.createTargetInfo();
        const element = this.draggableRowContext.mouseOverElement;
        return {
            ...baseArgs,
            visibleIndex: this.getRowVisibleIndex(element),
            dropPosition: this.getDropPosition()
        };
    }
    createDraggableContext(srcElement, draggableElement, pointerDownEvt) {
        const baseContext = super.createDraggableContext(srcElement, draggableElement, pointerDownEvt);
        const visibleIndex = this.getRowVisibleIndex(srcElement);
        const restrictions = this.grid.getDropRestrictions();
        return {
            ...baseContext,
            visibleIndex,
            restrictions
        };
    }
    updateDraggableContext(dropItemElement) {
        super.updateDraggableContext(dropItemElement);
        this.updateIndicator();
    }
    updateDraggableElementPosition() {
        super.updateDraggableElementPosition();
        if (!this.draggableContext)
            return;
        const context = this.draggableContext;
        const x = context.draggableElementPosition.x - context.draggableElementOffset.x;
        const y = context.draggableElementPosition.y - context.draggableElementOffset.y;
        context.draggableElementPosition = { x, y };
    }
    refreshUICore() {
        var _a;
        super.refreshUICore();
        const indicator = this.getTargetIndicator();
        if (this.isStarted() && ((_a = this.draggableRowContext) === null || _a === void 0 ? void 0 : _a.isPossibleDropItem) && this.draggableRowContext.target === this)
            indicator.show();
        else
            indicator === null || indicator === void 0 ? void 0 : indicator.hide();
    }
    getDraggableElement(_) {
        return this.grid.getRowDragHint();
    }
    getDroppableTargets() {
        const { restrictions } = this.draggableRowContext || {};
        if (!restrictions)
            return [];
        return restrictions.allowedComponents
            .map(targetKey => dropTargetRegistrySingleton.find(targetKey));
    }
    isItemDropPossible(dropItemElement) {
        if (!this.draggableRowContext || dropItemElement === this.draggableRowContext.srcElement)
            return false;
        if (this.isWithinDragging())
            return this.isReorderPossible(dropItemElement);
        return this.isDropPossible(dropItemElement);
    }
    isDropPossible(dropRowElement) {
        const rowType = GridLayoutHelper.getRowType(dropRowElement);
        return rowType === GridRowType.Data
            || rowType === GridRowType.Group
            || rowType === GridRowType.EmptyData
            || rowType === GridRowType.EmptyRow;
    }
    isReorderPossible(dropRowElement) {
        const rowType = GridLayoutHelper.getRowType(dropRowElement);
        if (!this.draggableRowContext || rowType !== GridRowType.Data)
            return false;
        const dropArea = this.getItemDropArea();
        if (!dropArea || dropRowElement.closest(dropArea.tagName) !== dropArea)
            return false;
        const visibleIndex = this.getRowVisibleIndex(dropRowElement);
        return !this.isWithinDeniedRange(visibleIndex);
    }
    isRestrictedTopArea() {
        if (!this.draggableRowContext)
            return false;
        const { currentCursorPosition, mouseOverElementRect, mouseOverElement } = this.draggableRowContext;
        if (!mouseOverElement || !mouseOverElementRect)
            return false;
        const visibleIndex = this.getRowVisibleIndex(mouseOverElement);
        const centerPoint = GridRowDraggingHelperBase.calculateVerticalCenter(mouseOverElementRect);
        return this.isWithinDragging()
            && currentCursorPosition.y > centerPoint
            && this.isTopAdjacentDeniedRange(visibleIndex);
    }
    isRestrictedBottomArea() {
        if (!this.draggableRowContext)
            return false;
        const { currentCursorPosition, mouseOverElementRect, mouseOverElement } = this.draggableRowContext;
        if (!mouseOverElement || !mouseOverElementRect)
            return false;
        const visibleIndex = this.getRowVisibleIndex(mouseOverElement);
        const centerPoint = GridRowDraggingHelperBase.calculateVerticalCenter(mouseOverElementRect);
        return this.isWithinDragging()
            && currentCursorPosition.y < centerPoint
            && this.isBottomAdjacentDeniedRange(visibleIndex);
    }
    isWithinDeniedRange(visibleIndex) {
        var _a, _b, _c;
        const reorderDeniedRanges = (_c = (_b = (_a = this.draggableRowContext) === null || _a === void 0 ? void 0 : _a.restrictions) === null || _b === void 0 ? void 0 : _b.reorderDeniedRanges) !== null && _c !== void 0 ? _c : [];
        return reorderDeniedRanges.some(r => r.Start <= visibleIndex && r.End >= visibleIndex);
    }
    isTopAdjacentDeniedRange(visibleIndex) {
        var _a, _b, _c;
        const reorderDeniedRanges = (_c = (_b = (_a = this.draggableRowContext) === null || _a === void 0 ? void 0 : _a.restrictions) === null || _b === void 0 ? void 0 : _b.reorderDeniedRanges) !== null && _c !== void 0 ? _c : [];
        return reorderDeniedRanges.some(r => visibleIndex === r.Start - 1);
    }
    isBottomAdjacentDeniedRange(visibleIndex) {
        var _a, _b, _c;
        const reorderDeniedRanges = (_c = (_b = (_a = this.draggableRowContext) === null || _a === void 0 ? void 0 : _a.restrictions) === null || _b === void 0 ? void 0 : _b.reorderDeniedRanges) !== null && _c !== void 0 ? _c : [];
        return reorderDeniedRanges.some(r => visibleIndex === r.End + 1);
    }
    isPositionalDropAllowed() {
        return this.grid.enablePositionalItemDrop;
    }
    onDroppableAreaMove(evt) {
        const targetElement = document.elementFromPoint(evt.clientX, evt.clientY);
        const itemDropArea = this.getItemDropArea();
        const rowElement = getParentByPredicate(targetElement, null, (element) => {
            return element.matches(GridSelectors.TableBodyRows)
                && element.closest(GridSelectors.DataTableSelector) === itemDropArea;
        });
        if (rowElement) {
            this.updateDraggableContext(rowElement);
            this.refreshUI();
        }
    }
    isRowDraggingAllowed(rowElement) {
        if (GridLayoutHelper.getRowType(rowElement) === GridRowType.Edit)
            return this.grid.enableInplaceEditing;
        return GridLayoutHelper.getRowType(rowElement) === GridRowType.Data;
    }
    toggleCursorClass(isAdding) {
        document.body.classList.toggle(CssClasses.GrabbingCursor, isAdding);
    }
    getRowVisibleIndex(rowElement) {
        const isInplaceEditMode = this.grid.enableInplaceEditing;
        return this.grid.getRowVisibleIndexByTarget(rowElement, isInplaceEditMode);
    }
    getTargetIndicator() {
        return this.grid.getDropTargetIndicator();
    }
    updateIndicator() {
        if (!this.draggableRowContext)
            return;
        const indicator = this.getTargetIndicator();
        const position = this.getDropPosition();
        if (indicator && this.draggableRowContext.mouseOverElement)
            indicator.updatePosition(this.draggableRowContext.mouseOverElement, position);
    }
    static getDropPositionByCursor(cursorY, rect) {
        const centerY = GridRowDraggingHelperBase.calculateVerticalCenter(rect);
        return cursorY > centerY ? GridDropPosition.After : GridDropPosition.Before;
    }
    static calculateVerticalCenter(rect) {
        return rect.y + rect.height / 2;
    }
    static isDataRow(element) {
        return GridLayoutHelper.getRowType(element) === GridRowType.Data;
    }
    static isEmptyRow(element) {
        const rowType = GridLayoutHelper.getRowType(element);
        return rowType === GridRowType.EmptyData
            || rowType === GridRowType.EmptyRow;
    }
}
class GridRowDraggingHelper extends GridRowDraggingHelperBase {
    getDropPosition() {
        if (!this.draggableRowContext)
            return GridDropPosition.Append;
        const { currentCursorPosition, mouseOverElementRect, mouseOverElement } = this.draggableRowContext;
        if (!mouseOverElement || !mouseOverElementRect)
            return GridDropPosition.Inside;
        if (GridRowDraggingHelperBase.isEmptyRow(mouseOverElement))
            return GridDropPosition.Append;
        if (GridRowDraggingHelperBase.isDataRow(mouseOverElement) && !this.isPositionalDropAllowed())
            return GridDropPosition.Append;
        if (!GridRowDraggingHelperBase.isDataRow(mouseOverElement))
            return GridDropPosition.Inside;
        if (this.isRestrictedTopArea())
            return GridDropPosition.Before;
        if (this.isRestrictedBottomArea())
            return GridDropPosition.After;
        return GridRowDraggingHelperBase.getDropPositionByCursor(currentCursorPosition.y, mouseOverElementRect);
    }
    isReorderPossible(dropRowElement) {
        return this.isPositionalDropAllowed() && super.isReorderPossible(dropRowElement);
    }
    isWithinDeniedRange(visibleIndex) {
        if (this.isTopAdjacentDeniedRange(visibleIndex) && this.isBottomAdjacentDeniedRange(visibleIndex))
            return true;
        return super.isWithinDeniedRange(visibleIndex);
    }
}

class GridSelectors {
    static getBodyCellsSelector(gridUid, gridTagName) {
        return this.getDataTableBodySelector(gridUid, gridTagName) + " > tr > td";
    }
    static getBodyEditRowSelector(gridUid, gridTagName) {
        return this.getDataTableBodySelector(gridUid, gridTagName) + ` > .${GridCssClasses.EditRowClassName}`;
    }
    static getBodyEditCellSelector(gridUid, gridTagName) {
        return this.getBodyEditRowSelector(gridUid, gridTagName) + `> td[${GridAttributes.EditCell}]`;
    }
    static getDataTableBodySelector(gridUid, gridTagName) {
        return `${gridTagName !== null && gridTagName !== void 0 ? gridTagName : DxGridTagName}[${DxGridUidAttributeName$1}="${gridUid}"] > .${ScrollViewerCssClasses.ClassName} > .${ScrollViewerCssClasses.ContentContainerClassName} > .${GridCssClasses.DataTableClassName} > tbody`;
    }
}
GridSelectors.DataTableSelector = `.${GridCssClasses.DataTableClassName}`;
GridSelectors.TableBodyRows = `.${GridCssClasses.DataTableClassName} > tbody > tr`;
GridSelectors.TableCell = `${GridSelectors.TableBodyRows} > td`;
GridSelectors.TableHeader = `.${GridCssClasses.DataTableClassName} > thead > tr > th`;
GridSelectors.TableHeaderCell = `${GridSelectors.TableHeader} > ${GridCssClasses.HeaderContentClassName}`;
GridSelectors.TableHeaderCellContent = `${GridSelectors.TableHeaderCell} span`;
GridSelectors.TableGroupFooterCell = `${GridSelectors.TableBodyRows}.${GridCssClasses.GroupFooterRowClassName} > td`;
GridSelectors.TableGroupFooterCellContent = `${GridSelectors.TableGroupFooterCell} > div[${GridAttributes.SummaryItem}]`;
GridSelectors.TableFooterCell = `.${GridCssClasses.DataTableClassName} > tfoot > tr > td`;
GridSelectors.TableFooterCellContent = `${GridSelectors.TableFooterCell} > div[${GridAttributes.SummaryItem}]`;
GridSelectors.TableCellSelector = `.${GridCssClasses.DataTableClassName} > * > tr > td`;
GridSelectors.TitleElementsSelector = [
    GridSelectors.TableCellSelector,
    GridSelectors.TableHeaderCellContent,
    GridSelectors.TableHeader,
    GridSelectors.TableFooterCellContent,
    GridSelectors.TableGroupFooterCellContent,
    GridSelectors.TableFooterCell,
].join(", ");
GridSelectors.DataTablePartsSelector = ":scope > *:not(colgroup)";
GridSelectors.ColElementSelector = `:scope > .${ScrollViewerCssClasses.ClassName} > .${ScrollViewerCssClasses.ContentContainerClassName} > .${GridCssClasses.DataTableClassName} > colgroup > col`;
GridSelectors.RowSelector = `:scope > tr:not(.${GridCssClasses.EmptyRowClassName}):not(.${GridCssClasses.ArmRowClassName}):not([${TopVirtualSpacerAttributeName}]):not([${BottomVirtualSpacerAttributeName}])`;
GridSelectors.HeaderRowSelector = `.${GridCssClasses.HeaderRowClassName}`;
GridSelectors.FilterRowSelector = `.${GridCssClasses.FilterRowClassName}`;
GridSelectors.EditRowSelector = `.${GridCssClasses.EditRowClassName}`;
GridSelectors.EditFormRowCellSelector = `:scope > .${GridCssClasses.EditFormClassName}`;
GridSelectors.EditNewItemRowSelector = `.${GridCssClasses.EditNewItemRowClassName}`;
GridSelectors.GroupRowSelector = `.${GridCssClasses.GroupRowClassName}`;
GridSelectors.DataRowSelector = `tr[${GridAttributes.VisibleIndexName}]:not(.${GridCssClasses.EditRowClassName}):not(.${GridCssClasses.GroupRowClassName})`;
GridSelectors.EmptyDataRowCellSelector = `:scope > .${GridCssClasses.EmptyDataRowCellClassName}`;
GridSelectors.DetailRowCellSelector = `:scope > .${GridCssClasses.DetailCellClassName}`;
GridSelectors.FooterRowSelector = `.${GridCssClasses.FooterRowClassName}`;
GridSelectors.GroupFooterRowSelector = `.${GridCssClasses.GroupFooterRowClassName}`;
GridSelectors.RowDragHintSelector = `${DxDragHintTagName$1}.${GridCssClasses.RowDragHintClassName}`;
GridSelectors.KeyboardNavigatorSelector = `:scope > ${DxKeyboardNavigatorTagName}`;
GridSelectors.ToolbarContainerSelector = `.${GridCssClasses.ToolbarContainerClassName}`;
GridSelectors.TopPanelSelector = `.${GridCssClasses.TopPanelClassName}`;
GridSelectors.PagerPanelSelector = `.${GridCssClasses.PagerPanelClassName}`;
GridSelectors.PagerSizeSelector = `:scope > .${PagerSizeSelectorCssClass}`;
GridSelectors.CellCheckBoxDisplayViewSelector = "td .dxbl-checkbox-display-view-unchecked, td .dxbl-checkbox-display-view-checked, td .dxbl-checkbox-display-view-indeterminate";
GridSelectors.CellCheckBoxEditViewInputSelector = `:scope > ${DxCheckBoxTagName} input, :scope > .dxbl-checkbox-container > ${DxCheckBoxTagName} input`;

class GridKbdStrategy extends KeyboardNavigationStrategy {
    constructor(grid, targetElement) {
        super(grid.getKeyboardNavigator(), targetElement);
        this.grid = grid;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    get editorManager() {
        return this.grid.editorManager;
    }
    get isEditing() {
        return this.grid.isEditing;
    }
    get isInplaceEditingEnabled() {
        return this.grid.enableInplaceEditing;
    }
    get isFocusedRowEnabled() {
        return this.grid.enableFocusedRow;
    }
    get isSelectionRowEnabled() {
        return this.grid.allowSelectRowByClick;
    }
    get hasRowClickEvent() {
        return this.grid.hasRowClickEvent;
    }
    getToolbarContainer() {
        return this.grid.getToolbarContainer();
    }
    getDataTable() {
        return this.grid.getDataTable();
    }
    getPagerPanel(isTop) {
        return this.grid.getPagerPanel(isTop);
    }
    getGroupPanelContentContainer() {
        return this.grid.getGroupPanelContentContainer();
    }
    getSearchBoxContainer() {
        return this.grid.getSearchBoxContainer();
    }
    getScrollViewer() {
        return this.grid.getScrollViewer();
    }
    getScrollViewerContent() {
        return this.grid.getScrollViewerContent();
    }
    getColumnUID(element) {
        return this.grid.getColumnUID(element);
    }
    getHeaderColumnInfo(element) {
        return this.grid.getColumnInfo(element);
    }
    getColumnInfoByCell(element) {
        return this.grid.getColumnInfoByCell(element);
    }
    findHeaderCellByColumnIndex(columnIndex) {
        return this.grid.findHeaderCellByColumnIndex(columnIndex);
    }
    handleTabKeyDown(evt, allowAltKey = false, isLoop = false) {
        if (!allowAltKey && evt.altKey)
            return false;
        if (evt.shiftKey) {
            if (this.firstItemSelected && !isLoop)
                return false;
            this.moveToPrevItem(isLoop);
        }
        else {
            if (this.lastItemSelected && !isLoop)
                return false;
            this.moveToNextItem(isLoop);
        }
        return true;
    }
}

class GridCellInfo {
    static isEditRowCell(cellInfo) {
        return cellInfo !== null && cellInfo.rowType === GridRowType.Edit;
    }
    static areIdentical(first, second) {
        if (first === null || second === null)
            return false;
        return first.rowIndex === second.rowIndex && first.columnInfo.uID === second.columnInfo.uID;
    }
    static fromElement(grid, element) {
        const cellElement = GridCellInfo.getCellElement(grid, element);
        if (cellElement !== null) {
            const hitInnerElement = GridCellInfo.getHitInnerElement(element);
            const cellRowType = GridCellInfo.getRowType(cellElement);
            const cellType = GridLayoutHelper.getCellType(cellElement);
            const cellRowIndex = GridCellInfo.getCellRowIndex(cellElement);
            const columnInfo = grid.getColumnInfoByCell(cellElement);
            if (cellRowType !== null && cellType !== null && cellRowIndex !== null && columnInfo !== null)
                return new GridCellInfo(cellType, cellRowType, cellRowIndex, columnInfo, hitInnerElement, cellElement);
        }
        return null;
    }
    static findCellInnerElement(element, cellInnerElementType) {
        if (element !== null) {
            if (cellInnerElementType === GridCellInnerElementType.CheckBox)
                return element.querySelector(GridSelectors.CellCheckBoxEditViewInputSelector);
        }
        return null;
    }
    static getCellElement(grid, element) {
        if (grid.uId === null || element === null || element === undefined)
            return null;
        const cellElement = element.closest(GridSelectors.getBodyCellsSelector(grid.uId, grid.getTagName()));
        if (cellElement !== null)
            return cellElement;
        const popupPortal = PortalAccessor.getPortalFrom(element);
        if (popupPortal !== null)
            return popupPortal.closest(GridSelectors.getBodyCellsSelector(grid.uId, grid.getTagName()));
        return null;
    }
    static getRowType(element) {
        if (element === null)
            return null;
        const parentElement = element.parentElement;
        if (parentElement === null)
            return null;
        return GridLayoutHelper.getRowType(parentElement);
    }
    static getCellRowIndex(element) {
        const parent = element === null || element === void 0 ? void 0 : element.parentElement;
        if (parent !== null && parent !== undefined) {
            const value = parent.dataset.visibleIndex;
            if (value !== undefined)
                return parseInt(value);
        }
        return null;
    }
    static getHitInnerElement(element) {
        if (element !== null) {
            if (element.closest(GridSelectors.CellCheckBoxDisplayViewSelector))
                return GridCellInnerElementType.CheckBox;
        }
        return null;
    }
    constructor(type, rowType, rowIndex, columnInfo, hitInnerElement, element) {
        this._type = type;
        this._rowType = rowType;
        this._rowIndex = rowIndex;
        this._columnInfo = columnInfo;
        this._hitInnerElement = hitInnerElement;
        this._element = element;
    }
    get type() {
        return this._type;
    }
    get rowIndex() {
        return this._rowIndex;
    }
    get rowType() {
        return this._rowType;
    }
    get columnInfo() {
        return this._columnInfo;
    }
    get hitInnerElement() {
        return this._hitInnerElement;
    }
    get element() {
        return this._element;
    }
}
var GridCellInnerElementType;
(function (GridCellInnerElementType) {
    GridCellInnerElementType[GridCellInnerElementType["CheckBox"] = 0] = "CheckBox";
})(GridCellInnerElementType || (GridCellInnerElementType = {}));

class GridEditorManager {
    constructor(grid) {
        this.activePopup = null;
        this.pendingCommandId = null;
        this.closingTimerId = null;
        this.pressedCellInfo = null;
        this.boundOnDocumentPointerDownHandler = this.onDocumentPointerDown.bind(this);
        this.boundOnDocumentPointerUpHandler = this.onDocumentPointerUp.bind(this);
        this.boundOnDocumentFocusOutHandler = this.onDocumentFocusOut.bind(this);
        this.boundOnPopupShownHandler = this.onPopupShown.bind(this);
        this.boundOnPopupClosingHandler = this.onPopupClosing.bind(this);
        this.boundOnPopupClosedHandler = this.onPopupClosed.bind(this);
        this.grid = grid;
    }
    get isPendingCommandResult() {
        return this.pendingCommandId !== null;
    }
    get isEditorPopupShown() {
        return this.activePopup !== null;
    }
    initialize() {
        document.addEventListener("pointerdown", this.boundOnDocumentPointerDownHandler);
        document.addEventListener("pointerup", this.boundOnDocumentPointerUpHandler);
        document.addEventListener("focusout", this.boundOnDocumentFocusOutHandler);
        document.addEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
    }
    dispose() {
        document.removeEventListener("pointerdown", this.boundOnDocumentPointerDownHandler);
        document.removeEventListener("pointerup", this.boundOnDocumentPointerUpHandler);
        document.removeEventListener("focusout", this.boundOnDocumentFocusOutHandler);
        document.removeEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
    }
    showNewItemRowEditor(columnInfo) {
        var _a;
        const defaultResult = -1;
        let editableColumnInfo = columnInfo;
        if (!editableColumnInfo || !editableColumnInfo.isEditable) {
            editableColumnInfo = (_a = this.grid.columnsInfo.find(c => c.isEditable)) !== null && _a !== void 0 ? _a : null;
            if (!editableColumnInfo)
                return defaultResult;
        }
        if (this.sendCommand("showNewItemRowEditor", { columnUid: editableColumnInfo.uID }))
            return editableColumnInfo.leafIndex;
        return defaultResult;
    }
    showEditor(cell, cellInnerElementTypeToClick, endCallback = null) {
        if (!this.allowInteraction)
            return false;
        const cellInfo = this.grid.getCellInfo(cell);
        if (cellInfo === null)
            return false;
        if (cellInfo.type !== GridCellType.Data)
            return false;
        if (!cellInfo.columnInfo.isEditable)
            return false;
        return this.sendCommand("showEditor", {
            visibleIndex: cellInfo.rowIndex,
            columnUid: cellInfo.columnInfo.uID
        }, endCallback, commandResult => {
            if (commandResult.result && cellInnerElementTypeToClick !== null)
                this.clickToEditCellInnerElement(cellInnerElementTypeToClick, cellInfo);
        });
    }
    closeEditor(closingAction = GridEditorClosingAction.Save, endCallback = null) {
        if (!this.allowInteraction)
            return false;
        return this.sendCommand("closeEditor", { action: closingAction }, endCallback);
    }
    onEndCommand(commandResult, endCallback = null) {
        if (endCallback === null)
            return;
        let result = GridEditorManagerCommandResult.Aborted;
        if (commandResult.processedBy(this.pendingCommandId)) {
            result = commandResult.result
                ? GridEditorManagerCommandResult.Completed
                : GridEditorManagerCommandResult.Failed;
        }
        endCallback(result);
    }
    notifyPendingEditorShow(pending) {
        if (!this.allowInteraction)
            return;
        if (pending)
            this.pendingCommandId = GridEditorManager.ServerSideShowCommandId;
        else if (this.pendingCommandId === GridEditorManager.ServerSideShowCommandId)
            this.pendingCommandId = null;
    }
    sendCommand(handlerId, args, endCallback = null, completeCallback = null) {
        if (!this.uiHandlersBridge)
            return false;
        this.cancelClosingTimer();
        this.pendingCommandId = GridEditorManager.InitializationCommandId;
        if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
        this.pendingCommandId = this.uiHandlersBridge.send(handlerId, args, commandResult => {
            this.onEndCommand(commandResult, endCallback);
            if (commandResult.processedBy(this.pendingCommandId)) {
                if (completeCallback)
                    completeCallback(commandResult);
                this.pendingCommandId = null;
            }
        });
        return true;
    }
    get allowInteraction() {
        return this.grid.enableInplaceEditing;
    }
    get uiHandlersBridge() {
        return this.grid.uiHandlersBridge;
    }
    onDocumentPointerDown(evt) {
        if (!this.allowInteraction)
            return;
        this.pressedCellInfo = this.grid.getCellInfo(evt.target);
    }
    onDocumentPointerUp() {
        if (!this.allowInteraction)
            return;
        this.pressedCellInfo = null;
    }
    onDocumentFocusOut(evt) {
        if (!this.allowInteraction)
            return;
        if (!this.grid.isEditing)
            return;
        if (this.isPendingCommandResult)
            return;
        const unfocusedCell = this.grid.getCellInfo(evt.target);
        if (!GridCellInfo.isEditRowCell(unfocusedCell))
            return;
        const focusedCell = this.grid.getCellInfo(evt.relatedTarget) || this.grid.getCellInfo(this.activePopup);
        const areIdentical = GridCellInfo.areIdentical(unfocusedCell, focusedCell);
        if (GridCellInfo.isEditRowCell(focusedCell)) {
            if (!areIdentical && this.isPressedCell(focusedCell))
                this.startClosingTimer(GridEditorClosingAction.Hide);
        }
        else {
            if (this.isPressedDataCell(focusedCell) && !this.isDataCellInteractiveElement(evt.relatedTarget))
                this.startClosingTimer();
            else
                this.closeEditor();
        }
    }
    isDataCellInteractiveElement(element) {
        return false;
    }
    onPopupShown(evt) {
        if (!this.allowInteraction)
            return;
        if (!this.grid.isEditing)
            return;
        if (!(evt.target instanceof DxPopup) && !(evt.target instanceof DxModal))
            return;
        const cellInfo = this.grid.getCellInfo(evt.target);
        if (GridCellInfo.isEditRowCell(cellInfo)) {
            this.activePopup = evt.target;
            this.activePopup.addEventListener(PopupClosingResultRequestedEvent.eventName, this.boundOnPopupClosingHandler);
            this.activePopup.addEventListener(PopupClosingRequestedEvent.eventName, this.boundOnPopupClosingHandler);
            this.activePopup.addEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        }
    }
    onPopupClosing(evt) {
        if (this.activePopup === null)
            return;
        this.activePopup.removeEventListener(PopupClosingResultRequestedEvent.eventName, this.boundOnPopupClosingHandler);
        this.activePopup.removeEventListener(PopupClosingRequestedEvent.eventName, this.boundOnPopupClosingHandler);
        if (evt.detail.closeReason !== PopupCloseReason.OutsideClick)
            return;
        const cellPortal = PortalAccessor.getPortalFrom(document.activeElement);
        if (cellPortal && cellPortal.branchId !== evt.detail.branchId)
            return;
        this.activePopup.removeEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        this.activePopup = null;
        this.closeEditor();
    }
    onPopupClosed(_) {
        if (this.activePopup === null)
            return;
        this.activePopup.removeEventListener(PopupClosingResultRequestedEvent.eventName, this.boundOnPopupClosingHandler);
        this.activePopup.removeEventListener(PopupClosingRequestedEvent.eventName, this.boundOnPopupClosingHandler);
        this.activePopup.removeEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        // to skip popup's restore focus
        setTimeout(() => this.activePopup = null, 0);
    }
    clickToEditCellInnerElement(cellInnerElementType, cellInfo) {
        var _a;
        const editCellElement = this.getEditCellElement();
        const editCellInfo = this.grid.getCellInfo(editCellElement);
        if (!GridCellInfo.areIdentical(cellInfo, editCellInfo))
            return;
        (_a = GridCellInfo.findCellInnerElement(editCellElement, cellInnerElementType)) === null || _a === void 0 ? void 0 : _a.click();
    }
    getEditCellElement() {
        if (this.grid.uId === null)
            return null;
        return this.grid.querySelector(GridSelectors.getBodyEditCellSelector(this.grid.uId, this.grid.getTagName()));
    }
    isPressedDataCell(cellInfo) {
        if ((cellInfo === null || cellInfo === void 0 ? void 0 : cellInfo.type) !== GridCellType.Data)
            return false;
        return this.isPressedCell(cellInfo);
    }
    isPressedCell(cellInfo) {
        return GridCellInfo.areIdentical(cellInfo, this.pressedCellInfo);
    }
    startClosingTimer(closingAction = GridEditorClosingAction.Save) {
        this.cancelClosingTimer();
        this.closingTimerId = setTimeout(() => this.closeEditor(closingAction), GridEditorManager.ClosingDelay);
    }
    cancelClosingTimer() {
        if (this.closingTimerId === null)
            return;
        clearTimeout(this.closingTimerId);
        this.closingTimerId = null;
    }
}
GridEditorManager.InitializationCommandId = -1;
GridEditorManager.ServerSideShowCommandId = -2;
GridEditorManager.ClosingDelay = 150;
var GridEditorClosingAction;
(function (GridEditorClosingAction) {
    GridEditorClosingAction[GridEditorClosingAction["Save"] = 0] = "Save";
    GridEditorClosingAction[GridEditorClosingAction["Cancel"] = 1] = "Cancel";
    GridEditorClosingAction[GridEditorClosingAction["Hide"] = 2] = "Hide";
    GridEditorClosingAction[GridEditorClosingAction["SaveAndStartNewRow"] = 3] = "SaveAndStartNewRow";
})(GridEditorClosingAction || (GridEditorClosingAction = {}));
var GridEditorManagerCommandResult;
(function (GridEditorManagerCommandResult) {
    GridEditorManagerCommandResult[GridEditorManagerCommandResult["Completed"] = 0] = "Completed";
    GridEditorManagerCommandResult[GridEditorManagerCommandResult["Failed"] = 1] = "Failed";
    GridEditorManagerCommandResult[GridEditorManagerCommandResult["Aborted"] = 2] = "Aborted";
})(GridEditorManagerCommandResult || (GridEditorManagerCommandResult = {}));

class GridEditorUtils {
    static selectInputValue(element) {
        if (element === null)
            return;
        if (!(element instanceof HTMLInputElement))
            return;
        if (!DomHelper.isTextInput(element))
            return;
        element.select();
    }
}

const DisallowedToNavigationRowItemClassNames = [
    GridCssClasses.IndentCellClassName,
    GridCssClasses.HeaderIndentCellClassName,
    GridCssClasses.GroupFooterIndentCellClassName,
    GridCssClasses.EmptyCellClassName,
    GridCssClasses.HiddenEmptyCellClassName,
    GridCssClasses.RowDragAnchorClassName
];
const RowItemSelector = `:scope > *:not(.${DisallowedToNavigationRowItemClassNames.join(",.")})`;
class GridRowKbdStrategyBase extends GridKbdStrategy {
    constructor(tableStrategy, grid, targetElement) {
        super(grid, targetElement);
        this.obsolete = false;
        this.tableStrategy = tableStrategy;
    }
    get isObsolete() {
        return this.obsolete;
    }
    makeObsolete() {
        this.obsolete = true;
    }
    getRowVisibleIndex(ignoreHiddenRow = false) {
        const hiddenRowVisibleIndex = ignoreHiddenRow ? null : this.tableStrategy.hiddenRowVisibleIndex;
        return hiddenRowVisibleIndex !== null && hiddenRowVisibleIndex !== void 0 ? hiddenRowVisibleIndex : DomHelper.getAttributeIntValue(this.targetElement, GridAttributes.VisibleIndexName, -1);
    }
    selectFirstCell() {
        if (!this.firstItemSelected)
            this.moveToFirstItem();
    }
    selectLastCell() {
        if (!this.lastItemSelected)
            this.moveToLastItem();
    }
    getSyncSelectedColumnInfo() {
        return this.getSelectedColumnInfo();
    }
    syncSelectedColumn(columnInfo) {
        const index = columnInfo !== null
            ? this.findItemElementIndexByColumnUid(columnInfo.uID)
            : -1;
        this.selectedItemIndex = Math.max(index, 0);
    }
    leaveRow() {
        FocusUtils.removeTabIndex(this.selectedItemElement);
    }
    getSelectedColumnInfo() {
        var _a;
        return (_a = this.getColumnInfo(this.selectedItemElement)) !== null && _a !== void 0 ? _a : null;
    }
    getColumnInfo(itemElement) {
        return this.getColumnInfoByCell(itemElement);
    }
    findItemElementIndexByColumnUid(columnUid) {
        return this.items.findIndex(x => this.getColumnUidByCell(x) === columnUid);
    }
    get firstItemSelected() {
        return this.tableStrategy.isFirstCellSelected(this) || super.firstItemSelected;
    }
    get lastItemSelected() {
        return this.tableStrategy.isLastCellSelected(this) || super.lastItemSelected;
    }
    getShortcutContext() {
        var _a, _b, _c, _d;
        return {
            // The type of a hidden row is necessary here - in other places it might prevent the natural focus flow (e.g., breaking column synchronization)
            RowType: (_b = (_a = this.tableStrategy.selectedHiddenRowStrategy) === null || _a === void 0 ? void 0 : _a.getRowType()) !== null && _b !== void 0 ? _b : this.getRowType(),
            ColumnUID: (_c = this.getSelectedColumnUid()) !== null && _c !== void 0 ? _c : -1,
            VisibleIndex: (_d = this.getRowVisibleIndex()) !== null && _d !== void 0 ? _d : -1
        };
    }
    tryRestoreSelection() {
        if (super.tryRestoreSelection())
            return true;
        this.tableStrategy.syncSelectedColumn(this);
        return false;
    }
    queryItems() {
        return this.queryItemsBySelector(RowItemSelector);
    }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        if (!this.isObsolete && super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                return this.handleArrowLeftKeyDown(evt);
            case key.KeyCode.Right:
                return this.handleArrowRightKeyDown(evt);
            case key.KeyCode.Tab:
                return this.handleTabKeyDown(evt);
            case key.KeyCode.Home:
                if (!evt.ctrlKey) {
                    this.selectFirstCell();
                    return true;
                }
                break;
            case key.KeyCode.End:
                if (!evt.ctrlKey) {
                    this.selectLastCell();
                    return true;
                }
                break;
        }
        return false;
    }
    selectItem(index) {
        const indexChanged = index !== this.selectedItemIndex;
        if (indexChanged && this.tableStrategy.trySelectHiddenCell(index))
            return;
        super.selectItem(index);
        if (indexChanged)
            this.saveSelectedColumn();
        if (this.navigator.isActive && (indexChanged || !this.preventScrollOnFocus))
            this.alignRequiredVisibleElement(this.selectedItemElement);
    }
    get selectedColumnUidSearchElement() {
        var _a, _b;
        return (_b = (_a = this.tableStrategy.selectedHiddenRowStrategy) === null || _a === void 0 ? void 0 : _a.selectedItemElement) !== null && _b !== void 0 ? _b : this.selectedItemElement;
    }
    get preventScrollOnFocus() {
        return this.tableStrategy.preventScrollOnFocus;
    }
    isImmediatelyClickEnabled() {
        return this.isActiveCommandCell() || this.isActiveExpandButtonCell() || this.isSelectionCell();
    }
    handleKeyDownForHiddenItem(evt) {
        return this.tableStrategy.handleKeyDownForHiddenRow(this, evt);
    }
    handleArrowLeftKeyDown(evt) {
        this.moveToPrevItem();
        return true;
    }
    handleArrowRightKeyDown(evt) {
        this.moveToNextItem();
        return true;
    }
    getColumnUidByCell(itemElement) {
        var _a;
        return (_a = this.getColumnInfo(itemElement)) === null || _a === void 0 ? void 0 : _a.uID;
    }
    syncFocusedRowVisibleIndex() {
        if (!this.isFocusedRowEnabled)
            return;
        const visibleIndex = this.getRowVisibleIndex();
        this.grid.notifyFocusedRowChanged(visibleIndex);
    }
    isActiveCommandCell() {
        return GridLayoutHelper.isCommandCell(this.selectedItemElement);
    }
    isActiveExpandButtonCell() {
        return GridLayoutHelper.isExpandButtonCell(this.selectedItemElement);
    }
    isSelectionCell() {
        return GridLayoutHelper.isSelectionCell(this.selectedItemElement);
    }
    saveSelectedColumn() {
        const rowType = this.getRowType();
        if (GridDataTablePartKbdStrategyBase.isColumnSyncRequired(rowType))
            this.tableStrategy.saveSelectedColumn(this);
    }
    getSelectedColumnUid() {
        const searchElement = this.selectedColumnUidSearchElement;
        let columnUid;
        if (searchElement)
            columnUid = this.getColumnUidByCell(searchElement);
        return columnUid !== null && columnUid !== void 0 ? columnUid : null;
    }
    isFixedCell(cell) {
        return GridLayoutHelper.isFixedCell(cell);
    }
    isFixedTablePart() {
        return this.tableStrategy.isFixed;
    }
    alignRequiredVisibleElement(element) {
        const contentContainer = this.getScrollViewerContent();
        if (!contentContainer)
            return;
        element.scrollIntoView({ block: "nearest" });
        if (!this.isFixedTablePart())
            this.alignElementVertically(element, contentContainer);
        if (!this.isFixedCell(element))
            this.alignElementHorizontally(element, contentContainer);
    }
    alignElementVertically(element, contentContainer) {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            GridScrollUtils.alignElementVertically(element, scrollViewer, contentContainer);
    }
    alignElementHorizontally(element, contentContainer) {
        const itemIndex = this.findItemElementIndexByChild(element);
        if (itemIndex < 0)
            return;
        const rightFixedCells = this.getFixedCells(itemIndex + 1, this.itemCount);
        if (rightFixedCells.length > 0) {
            const scrollValue = GridScrollUtils.calculateHorizontalScrollCorrection(element, rightFixedCells.reverse(), false);
            contentContainer.scrollBy(scrollValue, 0);
        }
        const leftFixedCells = this.getFixedCells(0, itemIndex);
        if (leftFixedCells.length > 0) {
            const scrollValue = GridScrollUtils.calculateHorizontalScrollCorrection(element, leftFixedCells, true);
            contentContainer.scrollBy(scrollValue, 0);
        }
    }
    getFixedCells(startIndex, endIndex) {
        const fixedCells = [];
        for (let i = startIndex; i < endIndex; i++) {
            const element = this.getItem(i);
            if (element && this.isFixedCell(element))
                fixedCells.push(element);
        }
        return fixedCells;
    }
}
class GridHeaderRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getSelectedItemRowSpan() {
        const itemCell = this.selectedItemElement;
        return itemCell.rowSpan;
    }
    getSelectedItemLeafIndex(leftDirection) {
        return this.getLeafIndex(this.selectedItemElement, leftDirection);
    }
    getRowType() { return GridRowType.Header; }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Space:
                this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Down:
                if (evt.altKey)
                    this.performShortcutEvent(evt);
                return evt.altKey;
        }
        return false;
    }
    isImmediatelyClickEnabled() {
        return true;
    }
    getColumnInfo(itemElement) {
        return this.getHeaderColumnInfo(itemElement);
    }
    findItemElementIndexByColumnUid(columnUid) {
        let itemIndex = super.findItemElementIndexByColumnUid(columnUid);
        if (itemIndex < 0)
            itemIndex = this.items.findIndex(item => { var _a; return (_a = this.getColumnInfo(item)) === null || _a === void 0 ? void 0 : _a.containsLeaf(columnUid); });
        return itemIndex;
    }
    getSyncSelectedColumnInfo() {
        const info = super.getSyncSelectedColumnInfo();
        if (info && info.hasLeafs) {
            const savedColumnInfo = this.tableStrategy.getSavedColumnInfo();
            if (savedColumnInfo && info.containsLeaf(savedColumnInfo.uID))
                return savedColumnInfo;
            return info.getLeftLeaf();
        }
        return info;
    }
    handleArrowLeftKeyDown(evt) {
        const prevItemIndex = this.selectedItemIndex - 1;
        if (prevItemIndex >= 0 && this.isAdjacentColumn(-1))
            return super.handleArrowLeftKeyDown(evt);
        return false;
    }
    handleArrowRightKeyDown(evt) {
        const nextItemIndex = this.selectedItemIndex + 1;
        if (nextItemIndex < this.itemCount && this.isAdjacentColumn(1))
            return super.handleArrowRightKeyDown(evt);
        return false;
    }
    isAdjacentColumn(offset) {
        const leftDirection = offset < 0;
        const currentIndex = this.getSelectedItemLeafIndex(leftDirection);
        const adjacentColumnIndex = this.getLeafIndex(this.getItem(this.selectedItemIndex + offset), !leftDirection);
        return adjacentColumnIndex === currentIndex + offset;
    }
    getLeafIndex(itemElement, leftDirection) {
        var _a, _b, _c;
        const info = this.getColumnInfo(itemElement);
        if (!info || !info.hasLeafs)
            return (_b = (_a = this.getColumnInfo(itemElement)) === null || _a === void 0 ? void 0 : _a.leafIndex) !== null && _b !== void 0 ? _b : -1;
        const leaf = leftDirection ? info.getLeftLeaf() : info.getRightLeaf();
        return (_c = leaf === null || leaf === void 0 ? void 0 : leaf.leafIndex) !== null && _c !== void 0 ? _c : -1;
    }
}
class GridRowWithEditorsKbdStrategyBase extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    focusNestedEditor() {
        this.alignRequiredVisibleElement(this.selectedItemElement);
        if (!this.switchToNestedContent())
            return false;
        this.selectFocusedInputValue();
        return true;
    }
    updateSelectedItemByChildElement(childElement, evt = null) {
        if (evt instanceof FocusEvent)
            this.syncFocusedRowVisibleIndex();
        super.updateSelectedItemByChildElement(childElement, evt);
    }
    selectFocusedInputValue() {
        GridEditorUtils.selectInputValue(document.activeElement);
    }
}
class GridRowWithEditorsKbdStrategy extends GridRowWithEditorsKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getNestedContentContainer() {
        if (this.nestedContentSelected)
            return this.targetElement;
        return super.getNestedContentContainer();
    }
    activate() {
        if (this.nestedContentSelected && !this.isNestedElementFocused())
            this.leaveFromNestedContent();
        super.activate();
    }
    switchToNestedContent() {
        if (this.getNestedContentElement())
            FocusUtils.scheduleResetTabIndex(this.selectedItemElement);
        return super.switchToNestedContent();
    }
    leaveFromNestedContent(direction = LeaveDirection.None) {
        FocusUtils.makeElementFocusable(this.selectedItemElement);
        super.leaveFromNestedContent(direction);
    }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (this.nestedContentSelected) {
            if (keyCode === key.KeyCode.Tab)
                this.alignToAdjacentFocusableItem(evt.shiftKey);
            FocusUtils.removeTabIndex(this.selectedItemElement);
        }
        const wasInEditMode = this.nestedContentSelected;
        const keyHandled = super.handleKeyDown(evt);
        if (keyCode === key.KeyCode.Tab && keyHandled && wasInEditMode && !this.nestedContentSelected)
            return false;
        return keyHandled;
    }
    alignToAdjacentFocusableItem(isBackward) {
        if (isBackward)
            FocusUtils.makeElementFocusable(this.selectedItemElement);
        const nextElement = isBackward
            ? FocusUtils.findPrevFocusableElement(this.selectedItemElement)
            : FocusUtils.findNextFocusableNotChildElement(document.activeElement);
        if (!nextElement)
            return;
        const nextIndex = this.findItemElementIndexByChild(nextElement);
        if (nextIndex < 0 || nextIndex === this.selectedItemIndex)
            return;
        const nextItem = this.getItem(nextIndex);
        if (!nextItem)
            return;
        this.alignRequiredVisibleElement(nextItem);
    }
}
class GridFilterRowKbdStrategy extends GridRowWithEditorsKbdStrategy {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.Filter; }
}
class GridEditRowKbdStrategy extends GridRowWithEditorsKbdStrategy {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.Edit; }
    selectItem(index) {
        const indexChanged = index !== this.selectedItemIndex;
        if (indexChanged && this.nestedContentSelected)
            this.leaveFromNestedContent();
        super.selectItem(index);
        this.switchToNestedContent();
    }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        if (this.nestedContentSelected) {
            const keyCode = key.KeyUtils.getEventKeyCode(evt);
            const ctrlNavigationKeys = [key.KeyCode.Up, key.KeyCode.Down, key.KeyCode.Home, key.KeyCode.End];
            if ((evt.ctrlKey && ctrlNavigationKeys.includes(keyCode)) || (evt.altKey && keyCode === key.KeyCode.Tab)) {
                this.leaveFromNestedContent();
                return false;
            }
            if ((keyCode === key.KeyCode.Enter && this.canSaveOnEnter()) || keyCode === key.KeyCode.Esc) {
                this.leaveFromNestedContent();
                this.saveRowSelectedColumn();
                this.performShortcutEvent(evt);
                return true;
            }
            if (keyCode === key.KeyCode.Space || keyCode === key.KeyCode.Enter)
                this.saveRowSelectedColumn();
        }
        return super.handleKeyDown(evt);
    }
    saveRowSelectedColumn() {
        this.tableStrategy.saveRowSelectedColumn(this);
    }
    canSaveOnEnter() {
        if (!document.activeElement)
            return false;
        const activeElement = document.activeElement;
        return DomHelper.isTextInput(activeElement) && !DomHelper.isMultipleRowInput(activeElement);
    }
}
class GridInplaceEditRowKbdStrategy extends GridRowWithEditorsKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    get tableBodyStrategy() {
        return this.tableStrategy;
    }
    getRowType() { return GridRowType.Edit; }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        if (this.editorManager.isPendingCommandResult)
            return true;
        if (this.isEditorCell()) {
            if (this.isActiveEditorCell()) {
                if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab) {
                    const shouldSaveAndStartNewRow = this.isNewItemRow && !evt.shiftKey;
                    if (this.tableBodyStrategy.startEditNearestRowItem(!evt.shiftKey, shouldSaveAndStartNewRow))
                        return true;
                    const closingAction = shouldSaveAndStartNewRow ? GridEditorClosingAction.SaveAndStartNewRow : GridEditorClosingAction.Hide;
                    if (this.tableBodyStrategy.endEditRowItem(closingAction))
                        return true;
                }
                if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Enter && !evt.shiftKey && !this.editorManager.isEditorPopupShown) {
                    if (this.tableBodyStrategy.endEditRowItem(GridEditorClosingAction.Hide))
                        return true;
                }
            }
            else {
                if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Enter && this.isEditorCell()) {
                    if (this.tableBodyStrategy.startEditRowItem(this, this.selectedItemIndex))
                        return true;
                }
            }
            if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Esc) {
                if (this.tableBodyStrategy.endEditRowItem(GridEditorClosingAction.Cancel))
                    return true;
            }
        }
        return super.handleKeyDown(evt);
    }
    handleTabKeyDown(evt, allowAltKey = false, _ = false) {
        if (this.isNewItemRow && !evt.shiftKey && this.lastItemSelected) {
            if (this.tableBodyStrategy.endEditRowItem(GridEditorClosingAction.SaveAndStartNewRow))
                return true;
            return super.handleTabKeyDown(evt, allowAltKey, true);
        }
        return super.handleTabKeyDown(evt, allowAltKey);
    }
    get isNewItemRow() {
        return this.targetElement.classList.contains(GridCssClasses.EditNewItemRowInplaceClassName);
    }
    isEditorCell() {
        return !GridLayoutHelper.isCommandCell(this.selectedItemElement) &&
            !GridLayoutHelper.isExpandButtonCell(this.selectedItemElement) &&
            !GridLayoutHelper.isSelectionCell(this.selectedItemElement);
    }
    isActiveEditorCell() {
        return GridLayoutHelper.getCellType(this.selectedItemElement) === GridCellType.Edit;
    }
}
class GridEditFormRowKbdStrategy extends GridRowWithEditorsKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.EditForm; }
}
class GridEditNewItemRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.EditNewItemRow; }
    handleKeyDown(evt) {
        if (this.editorManager.isPendingCommandResult)
            return true;
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (!this.isObsolete && keyCode === key.KeyCode.Enter) {
            const colInfo = this.tableStrategy.getSavedColumnInfo();
            const tableBodyStrategy = this.tableStrategy;
            if (tableBodyStrategy.startEditNewItemRow(this, colInfo))
                return true;
        }
        return super.handleKeyDown(evt);
    }
}
class GridGroupRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    get selectedColumnUidSearchElement() {
        var _a;
        const searchElement = super.selectedColumnUidSearchElement;
        return (_a = searchElement === null || searchElement === void 0 ? void 0 : searchElement.querySelector(`.${GridCssClasses.ExpandButtonCellClassName}`)) !== null && _a !== void 0 ? _a : searchElement;
    }
    getRowType() { return GridRowType.Group; }
    queryItems() {
        return new Array();
    }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        if (!this.nestedContentSelected && (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Left || key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Right)) {
            if (!this.tableStrategy.trySelectHiddenCell(this.selectedItemIndex, () => this.dispatchKeyboardEventToSelectedItemStrategy(evt)))
                this.performShortcutEvent(evt);
            return true;
        }
        return super.handleKeyDown(evt);
    }
    isImmediatelyClickEnabled() {
        return true;
    }
    dispatchKeyboardEventToSelectedItemStrategy(evt) {
        const selectedRowStrategy = this.tableStrategy.getSelectedItemStrategy();
        selectedRowStrategy === null || selectedRowStrategy === void 0 ? void 0 : selectedRowStrategy.targetElement.dispatchEvent(evt);
    }
}
class GridDataRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    get tableBodyStrategy() {
        return this.tableStrategy;
    }
    getRowType() { return GridRowType.Data; }
    handleKeyDown(evt) {
        const keyDownHandled = this.handleKeyDownForHiddenItem(evt);
        if (keyDownHandled !== null)
            return keyDownHandled;
        if (this.editorManager.isPendingCommandResult)
            return true;
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (!this.nestedContentSelected) {
            if (keyCode === key.KeyCode.Space && this.isSelectionRowEnabled) {
                this.performShortcutEvent(evt);
                return true;
            }
            if (!this.isObsolete && keyCode === key.KeyCode.Enter) {
                if (this.tableBodyStrategy.startEditRowItem(this, this.selectedItemIndex))
                    return true;
            }
        }
        if (super.handleKeyDown(evt))
            return true;
        if (!this.nestedContentSelected && keyCode === key.KeyCode.Enter && this.hasRowClickEvent) {
            this.performShortcutEvent(evt);
            return true;
        }
        return false;
    }
}
class GridEmptyDataRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.EmptyData; }
}
class GridDetailRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.Detail; }
}
class GridFooterRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.Footer; }
}
class GridGroupFooterRowKbdStrategy extends GridRowKbdStrategyBase {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    getRowType() { return GridRowType.GroupFooter; }
}

class GridRequestStartCellEditingContext {
    constructor(cellInfo) {
        this.cellInfo = cellInfo;
    }
}
class GridStartCellEditingRequestCompleteContext {
    constructor(result) {
        this.result = result;
    }
}
class GridRequestStartCellEditingEvent extends CustomEvent {
    constructor(detail) {
        super(GridRequestStartCellEditingEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: false,
        });
    }
}
GridRequestStartCellEditingEvent.eventName = "dxbl-grid-request-start-editing";
class GridStartCellEditingRequestCompleteEvent extends CustomEvent {
    constructor(result) {
        const detail = new GridStartCellEditingRequestCompleteContext(result);
        super(GridStartCellEditingRequestCompleteEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: false,
        });
    }
}
GridStartCellEditingRequestCompleteEvent.eventName = "dxbl-grid-cell-editor-shown";

class GridDataTableKbdStrategy extends GridKbdStrategy {
    constructor(grid, targetElement) {
        super(grid, targetElement);
        this.savedColumnInfo = null;
    }
    getSavedColumnInfo() {
        return this.savedColumnInfo;
    }
    saveSelectedColumn(rowStrategy) {
        this.savedColumnInfo = rowStrategy.getSyncSelectedColumnInfo();
    }
    syncSelectedColumn(rowStrategy) {
        const columnInfo = this.getSavedColumnInfo();
        rowStrategy.syncSelectedColumn(columnInfo);
    }
    queryItems() {
        return this.queryItemsBySelector(GridSelectors.DataTablePartsSelector);
    }
    createTableBodyItemStrategy(itemElement) {
        if (this.isVirtualScrollingEnabled(itemElement))
            return new GridDataTableBodyWithVirtualScrollKbdStrategy(this, this.grid, itemElement);
        return new GridDataTableBodyKbdStrategy(this, this.grid, itemElement);
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches("thead"))
            return new GridDataTableHeaderKbdStrategy(this, this.grid, itemElement);
        if (itemElement.matches("tbody"))
            return this.createTableBodyItemStrategy(itemElement);
        if (itemElement.matches("tfoot"))
            return new GridDataTableFooterKbdStrategy(this, this.grid, itemElement);
        return null;
    }
    selectItem(index, rowIndex = -1) {
        var _a;
        const strategy = this.getStrategy(index);
        const sync = this.syncSelectedColumns(strategy);
        if (rowIndex >= 0)
            strategy.enterTablePartWithNewIndex(rowIndex);
        if (rowIndex < 0 || sync && ((_a = strategy.getStrategy(rowIndex)) === null || _a === void 0 ? void 0 : _a.getRowType()) === GridRowType.Header)
            rowIndex = strategy.selectedItemIndex;
        const selectedStrategy = this.getSelectedItemStrategy();
        if (selectedStrategy && selectedStrategy !== strategy)
            selectedStrategy.leaveTablePart();
        strategy.selectItem(rowIndex);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Up:
                return this.handleArrowUpKeyDown(evt.ctrlKey);
            case key.KeyCode.Down:
                return this.handleArrowDownKeyDown(evt.ctrlKey);
            case key.KeyCode.Tab:
                return this.handleTabKeyDown(evt);
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
                return this.handleBodyShortcut(evt, true);
            case key.KeyCode.Home:
            case key.KeyCode.End:
                return this.handleBodyShortcut(evt, false);
        }
        return false;
    }
    handleTabKeyDown(evt) {
        var _a, _b;
        if (evt.altKey)
            return super.handleTabKeyDown(evt, true);
        if (evt.shiftKey) {
            if (this.firstItemSelected)
                return false;
            (_a = this.getStrategy(this.selectedItemIndex - 1)) === null || _a === void 0 ? void 0 : _a.selectLastCell();
        }
        else {
            if (this.lastItemSelected)
                return false;
            (_b = this.getStrategy(this.selectedItemIndex + 1)) === null || _b === void 0 ? void 0 : _b.selectFirstCell();
        }
        return true;
    }
    isVirtualScrollingEnabled(itemElement) {
        if (itemElement.classList.contains(GridCssClasses.TopFixedBodyClassName))
            return false;
        const scrollViewer = this.getScrollViewer();
        return scrollViewer ? GridScrollUtils.isVirtualScrollingEnabled(scrollViewer) : false;
    }
    handleArrowUpKeyDown(ctrlKey) {
        if (this.selectedItemIndex === 0)
            return false;
        if (ctrlKey)
            this.moveToPrevItem();
        else {
            const strategy = this.getStrategy(this.selectedItemIndex - 1);
            this.selectItem(this.selectedItemIndex - 1, strategy.itemCount - 1);
        }
        return true;
    }
    handleArrowDownKeyDown(ctrlKey) {
        if (this.selectedItemIndex >= this.itemCount - 1)
            return false;
        if (ctrlKey)
            this.moveToNextItem();
        else
            this.selectItem(this.selectedItemIndex + 1, 0);
        return true;
    }
    handleBodyShortcut(evt, syncColumns) {
        const bodyIndices = this.items.map((item, index) => item.matches("tbody") ? index : -1).filter(i => i >= 0);
        if (!bodyIndices.length)
            return false;
        const bodyIndex = bodyIndices[bodyIndices.length - 1];
        const bodyStrategy = this.getStrategy(bodyIndex);
        if (bodyStrategy && bodyStrategy !== this.getSelectedItemStrategy()) {
            if (syncColumns)
                this.syncSelectedColumns(bodyStrategy);
            return bodyStrategy.handleKeyDown(evt);
        }
        return false;
    }
    getStrategy(index) {
        return this.getItemStrategy(index);
    }
    syncSelectedColumns(strategy) {
        const selectedStrategy = this.getSelectedItemStrategy();
        if (selectedStrategy) {
            const selectedRowStrategy = selectedStrategy.getSelectedItemStrategy();
            const syncRowStrategy = strategy.getSelectedItemStrategy();
            if (selectedRowStrategy && syncRowStrategy)
                return strategy.syncSelectedColumns(selectedRowStrategy, syncRowStrategy);
        }
        return false;
    }
}
class GridDataTablePartKbdStrategyBase extends GridKbdStrategy {
    constructor(parent, grid, targetElement) {
        super(grid, targetElement);
        this.parentTableStrategy = parent;
    }
    get selectedHiddenRowStrategy() {
        return null;
    }
    get hiddenRowVisibleIndex() {
        return null;
    }
    get isFixed() {
        return true;
    }
    get preventScrollOnFocus() {
        return !this.navigator.initialized;
    }
    enterTablePartWithNewIndex(index) { }
    isFirstCellSelected(rowStrategy) {
        return false;
    }
    isLastCellSelected(rowStrategy) {
        return false;
    }
    trySelectHiddenCell(index, onSelectedCallback = null) {
        return false;
    }
    handleKeyDownForHiddenRow(rowStrategy, evt) {
        return null;
    }
    leaveTablePart() { }
    getStrategy(index) {
        const strategy = this.getItemStrategy(index);
        return strategy instanceof GridRowKbdStrategyBase ? strategy : null;
    }
    selectFirstCell() {
        var _a;
        this.selectItem(0);
        (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectFirstCell();
    }
    selectLastCell() {
        var _a;
        this.selectItem(this.itemCount - 1);
        (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectLastCell();
    }
    getSavedColumnInfo() {
        return this.parentTableStrategy.getSavedColumnInfo();
    }
    saveRowSelectedColumn(rowStrategy) {
        this.saveSelectedColumn(rowStrategy);
    }
    saveSelectedColumn(rowStrategy) {
        this.parentTableStrategy.saveSelectedColumn(rowStrategy);
    }
    syncSelectedColumn(rowStrategy) {
        if (this.isColumnSyncRequired(rowStrategy))
            this.parentTableStrategy.syncSelectedColumn(rowStrategy);
    }
    syncSelectedColumns(prevRowStrategy, newRowStrategy) {
        const isRowChanged = newRowStrategy && prevRowStrategy !== newRowStrategy;
        if (isRowChanged) {
            if (prevRowStrategy && this.isColumnSyncRequired(prevRowStrategy))
                this.saveSelectedColumn(prevRowStrategy);
            this.syncSelectedColumn(newRowStrategy);
        }
        return false;
    }
    getShortcutContext() {
        return { AreaType: GridNavigationAreaType.DataTable };
    }
    queryItems() {
        return this.queryItemsBySelector(GridSelectors.RowSelector);
    }
    getSelectedItemStrategy() {
        const strategy = super.getSelectedItemStrategy();
        return strategy instanceof GridRowKbdStrategyBase ? strategy : null;
    }
    selectItem(index) {
        const prevRowStrategy = this.getSelectedItemStrategy();
        const newRowStrategy = this.getStrategy(index);
        this.syncSelectedColumns(prevRowStrategy, newRowStrategy);
        super.selectItem(index);
        if (prevRowStrategy && prevRowStrategy !== newRowStrategy)
            prevRowStrategy.leaveRow();
    }
    updateSelectedItemByIndex(index) {
        const rowStrategy = this.getSelectedItemStrategy();
        if (rowStrategy && index !== this.selectedItemIndex)
            rowStrategy.leaveRow();
        super.updateSelectedItemByIndex(index);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Up:
                return this.handleArrowUpKeyDown(evt.ctrlKey);
            case key.KeyCode.Down:
                return this.handleArrowDownKeyDown(evt.ctrlKey);
            case key.KeyCode.Tab:
                return this.handleTabKeyDown(evt);
        }
        return false;
    }
    handleTabKeyDown(evt) {
        const handled = super.handleTabKeyDown(evt);
        if (handled)
            this.onAfterTabKeyDownHandled(evt);
        return handled;
    }
    onAfterTabKeyDownHandled(evt) {
        var _a, _b;
        if (evt.shiftKey)
            (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectLastCell();
        else
            (_b = this.getSelectedItemStrategy()) === null || _b === void 0 ? void 0 : _b.selectFirstCell();
    }
    getStrategyByRowVisibleIndex(rowVisibleIndex) {
        const rowItemIndex = this.items.findIndex((_, i) => { var _a; return ((_a = this.getStrategy(i)) === null || _a === void 0 ? void 0 : _a.getRowVisibleIndex()) === rowVisibleIndex; });
        return this.getItemStrategy(rowItemIndex);
    }
    handleArrowUpKeyDown(ctrlKey) {
        if (!ctrlKey) {
            if (this.firstItemSelected)
                return false;
            this.moveToPrevItem();
        }
        return !ctrlKey;
    }
    handleArrowDownKeyDown(ctrlKey) {
        if (!ctrlKey) {
            if (this.lastItemSelected)
                return false;
            this.moveToNextItem();
        }
        return !ctrlKey;
    }
    isColumnSyncRequired(rowStrategy) {
        const rowType = rowStrategy.getRowType();
        return GridDataTablePartKbdStrategyBase.isColumnSyncRequired(rowType);
    }
    static isColumnSyncRequired(rowType) {
        switch (rowType) {
            case GridRowType.Header:
            case GridRowType.Filter:
            case GridRowType.Edit:
            case GridRowType.Data:
            case GridRowType.Footer:
            case GridRowType.GroupFooter:
                return true;
        }
        return false;
    }
}
class GridDataTableHeaderKbdStrategy extends GridDataTablePartKbdStrategyBase {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
        this.isTabKeyDownHandling = false;
    }
    selectItem(index) {
        const prevRowStrategy = this.getSelectedItemStrategy();
        const newRowStrategy = this.getStrategy(index);
        const rowIndex = this.syncSelectedRows(prevRowStrategy, newRowStrategy);
        super.selectItem(rowIndex >= 0 ? rowIndex : index);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                return this.moveHorizontally(true);
            case key.KeyCode.Right:
                return this.moveHorizontally(false);
        }
        return super.handleKeyDown(evt);
    }
    createItemStrategy(element) {
        switch (GridLayoutHelper.getRowType(element)) {
            case GridRowType.Header:
                return new GridHeaderRowKbdStrategy(this, this.grid, element);
            case GridRowType.Filter:
                return new GridFilterRowKbdStrategy(this, this.grid, element);
        }
        throw new Error("Not implemented");
    }
    syncSelectedColumns(prevRowStrategy, newRowStrategy) {
        const isRowChanged = prevRowStrategy && prevRowStrategy !== newRowStrategy;
        if (isRowChanged && this.isColumnSyncRequired(newRowStrategy)) {
            const rowIndex = this.syncSelectedRows(prevRowStrategy, newRowStrategy);
            if (rowIndex >= 0) {
                this.selectedItemIndex = rowIndex;
                newRowStrategy = this.getSelectedItemStrategy();
                super.syncSelectedColumns(prevRowStrategy, newRowStrategy);
                return true;
            }
        }
        return super.syncSelectedColumns(prevRowStrategy, newRowStrategy);
    }
    syncSelectedRows(prevRowStrategy, newRowStrategy) {
        if (!this.isTabKeyDownHandling && prevRowStrategy && !this.isHeaderRowStrategy(prevRowStrategy) &&
            newRowStrategy && this.isHeaderRowStrategy(newRowStrategy)) {
            const columnInfo = this.isColumnSyncRequired(prevRowStrategy)
                ? prevRowStrategy.getSyncSelectedColumnInfo() : this.getSavedColumnInfo();
            if (columnInfo)
                return columnInfo.headerRowIndex;
        }
        return -1;
    }
    handleArrowDownKeyDown(ctrlKey) {
        const strategy = this.getSelectedItemStrategy();
        if (!ctrlKey && strategy && this.isHeaderRowStrategy(strategy)) {
            const headerStrategy = strategy;
            const info = headerStrategy.getSelectedColumnInfo();
            if (info && !info.hasLeafs) {
                const nextRowIndex = info.headerRowIndex + headerStrategy.getSelectedItemRowSpan();
                if (nextRowIndex >= this.itemCount)
                    return false;
                this.selectItem(nextRowIndex);
                return true;
            }
        }
        return super.handleArrowDownKeyDown(ctrlKey);
    }
    handleTabKeyDown(evt) {
        this.isTabKeyDownHandling = true;
        const handled = super.handleTabKeyDown(evt);
        this.isTabKeyDownHandling = false;
        return handled;
    }
    isHeaderRowStrategy(strategy) {
        return strategy.getRowType() === GridRowType.Header;
    }
    moveHorizontally(leftDirection) {
        const currentStrategy = this.getSelectedItemStrategy();
        if (currentStrategy && this.isHeaderRowStrategy(currentStrategy)) {
            const headerRowStrategy = currentStrategy;
            const columnIndex = headerRowStrategy.getSelectedItemLeafIndex(leftDirection);
            const offset = leftDirection ? -1 : 1;
            return this.selectColumn(columnIndex + offset);
        }
        return false;
    }
    selectColumn(columnIndex) {
        if (columnIndex >= 0) {
            const cell = this.findHeaderCellByColumnIndex(columnIndex);
            if (cell) {
                const rowIndex = this.findItemElementIndexByChild(cell);
                const strategy = this.getStrategy(rowIndex);
                if (strategy) {
                    const columnInfo = strategy.getColumnInfo(cell);
                    if (columnInfo) {
                        strategy.syncSelectedColumn(columnInfo);
                        this.selectedItemIndex = rowIndex;
                        this.selectItem(rowIndex);
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
class GridDataTableBodyKbdStrategy extends GridDataTablePartKbdStrategyBase {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
        this.savedVisibleIndex = -1;
        this.restoreSelectedColumn = false;
        this.expectedFocusedRowFromServer = false;
        this.boundOnVisibleElementChangedHandler = this.onVisibleElementChanged.bind(this);
        this.boundOnGridRequestStartCellEditingHandle = this.onRequestStartCellEditing.bind(this);
        this.addEventSubscriptions();
    }
    get isFixed() {
        return false;
    }
    onDispose() {
        super.onDispose();
        this.removeEventSubscriptions();
    }
    createDataRowStrategy(element) {
        return new GridDataRowKbdStrategy(this, this.grid, element);
    }
    createEditRowStrategy(element) {
        return new GridEditRowKbdStrategy(this, this.grid, element);
    }
    createInplaceEditRowStrategy(element) {
        return new GridInplaceEditRowKbdStrategy(this, this.grid, element);
    }
    createItemStrategy(element) {
        switch (GridLayoutHelper.getRowType(element)) {
            case GridRowType.Edit:
                if (this.isInplaceEditingEnabled)
                    return this.createInplaceEditRowStrategy(element);
                return this.createEditRowStrategy(element);
            case GridRowType.EditForm:
                return new GridEditFormRowKbdStrategy(this, this.grid, element);
            case GridRowType.EditNewItemRow:
                return new GridEditNewItemRowKbdStrategy(this, this.grid, element);
            case GridRowType.Group:
                return new GridGroupRowKbdStrategy(this, this.grid, element);
            case GridRowType.Data:
                return this.createDataRowStrategy(element);
            case GridRowType.EmptyData:
                return new GridEmptyDataRowKbdStrategy(this, this.grid, element);
            case GridRowType.Detail:
                return new GridDetailRowKbdStrategy(this, this.grid, element);
            case GridRowType.GroupFooter:
                return new GridGroupFooterRowKbdStrategy(this, this.grid, element);
        }
        throw new Error("Not implemented");
    }
    selectItem(index) {
        const newRowStrategy = this.getStrategy(index);
        this.saveFocusedRowVisibleIndex(newRowStrategy);
        super.selectItem(index);
        this.restoreSelectedColumn = false;
    }
    saveRowSelectedColumn(rowStrategy) {
        super.saveRowSelectedColumn(rowStrategy);
        this.restoreSelectedColumn = true;
    }
    syncSelectedColumns(prevRowStrategy, newRowStrategy) {
        const isSync = super.syncSelectedColumns(prevRowStrategy, newRowStrategy);
        if (!isSync && this.restoreSelectedColumn && newRowStrategy)
            this.parentTableStrategy.syncSelectedColumn(newRowStrategy);
        return isSync || this.restoreSelectedColumn;
    }
    handleKeyDown(evt) {
        this.expectedFocusedRowFromServer = false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.PageDown:
                if (!this.handlePageUpDown(evt, false))
                    this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.PageUp:
                if (!this.handlePageUpDown(evt, true))
                    this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Home:
                return this.handleHomeKeyDown(evt.ctrlKey);
            case key.KeyCode.End:
                return this.handleEndKeyDown(evt.ctrlKey);
        }
        return super.handleKeyDown(evt);
    }
    handleKeyUp(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
            case key.KeyCode.Up:
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
            case key.KeyCode.Home:
            case key.KeyCode.End:
            case key.KeyCode.Tab:
                this.notifyFocusedRowChanged();
                break;
        }
        return false;
    }
    moveToPrevItem() {
        super.moveToPrevItem();
        this.scrollToElement(null, HorizontalAlign.None);
    }
    moveToNextItem() {
        const scrollViewer = this.getScrollViewer();
        const vertAlign = scrollViewer && GridScrollUtils.bottomAlignmentRequired(this.selectedItemElement, scrollViewer) ? VerticalAlign.Bottom : null;
        super.moveToNextItem();
        this.scrollToElement(vertAlign, HorizontalAlign.None);
    }
    leaveTablePart() {
        super.leaveTablePart();
        this.notifyFocusedRowChanged();
    }
    onHandlePageUpDownKey(boundaryItemIndex, alignVert, alignHor) {
        const validIndex = this.validateItemIndex(boundaryItemIndex);
        this.selectItem(validIndex);
        this.scrollToElement(alignVert, alignHor);
    }
    scrollToElement(alignVert, alignHor) {
        const scrollViewer = this.getScrollViewer();
        if (!scrollViewer)
            return;
        DxScrollViewer.scrollToElementRelyOnStickyDescendants(this.selectedItemElement, alignVert, alignHor, scrollViewer);
        if (!scrollViewer.hasVerticalScrollBar && alignVert) {
            const block = alignVert === VerticalAlign.Top ? "start" : "end";
            this.selectedItemElement.scrollIntoView({ block });
        }
    }
    onMakeRowVisible(index) {
        this.selectItem(index);
    }
    handlePageUpDown(evt, isPageUp) {
        this.savedVisibleIndex = -1;
        const isFirstItemSelected = isPageUp ? this.firstItemSelected : this.lastItemSelected;
        const selectedStrategy = this.getSelectedItemStrategy();
        const isEmptyDataRow = selectedStrategy && selectedStrategy.getRowType() === GridRowType.EmptyData;
        const isCurrentTarget = this.targetElement.contains(evt.target);
        if (isFirstItemSelected && (isEmptyDataRow || isCurrentTarget)) {
            this.expectedFocusedRowFromServer = this.isFocusedRowEnabled;
            return false;
        }
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer) {
            const verticalAlign = isPageUp ? VerticalAlign.Top : VerticalAlign.Bottom;
            const boundaryItemIndex = GridScrollUtils.calculateBoundaryItemIndex(this, scrollViewer, !isPageUp);
            this.onHandlePageUpDownKey(boundaryItemIndex, verticalAlign, HorizontalAlign.None);
        }
        return true;
    }
    handleHomeKeyDown(ctrlKey) {
        if (ctrlKey)
            this.selectFirstCell();
        return ctrlKey;
    }
    handleEndKeyDown(ctrlKey) {
        if (ctrlKey)
            this.selectLastCell();
        return ctrlKey;
    }
    notifyFocusedRowChanged() {
        if (this.isFocusedRowEnabled && this.savedVisibleIndex > -1) {
            this.grid.notifyFocusedRowChanged(this.savedVisibleIndex);
            this.savedVisibleIndex = -1;
        }
    }
    shouldSaveFocusedRowVisibleIndex(rowStrategy) {
        return !this.expectedFocusedRowFromServer && this.isFocusableRow(rowStrategy.getRowType());
    }
    saveFocusedRowVisibleIndex(rowStrategy) {
        if (rowStrategy && this.shouldSaveFocusedRowVisibleIndex(rowStrategy))
            this.savedVisibleIndex = rowStrategy.getRowVisibleIndex();
    }
    isFocusableRow(rowType) {
        switch (rowType) {
            case GridRowType.Group:
            case GridRowType.Edit:
            case GridRowType.Data:
                return true;
        }
        return false;
    }
    addEventSubscriptions() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            scrollViewer.addEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
        this.grid.addEventListener(GridRequestStartCellEditingEvent.eventName, this.boundOnGridRequestStartCellEditingHandle);
    }
    removeEventSubscriptions() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            scrollViewer.removeEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
        this.grid.removeEventListener(GridRequestStartCellEditingEvent.eventName, this.boundOnGridRequestStartCellEditingHandle);
    }
    onVisibleElementChanged(evt) {
        if (evt.detail.isFocusRequired) { // TODO tech debt
            const index = this.items.indexOf(evt.detail.element);
            this.onMakeRowVisible(index);
        }
    }
    onRequestStartCellEditing(evt) {
        let startRequested = false;
        const cellInfo = evt.detail.cellInfo;
        const strategyIndex = this.findItemElementIndexByChild(cellInfo.element);
        if (strategyIndex < 0)
            return;
        const rowStrategy = this.getStrategy(strategyIndex);
        if (rowStrategy instanceof GridEditNewItemRowKbdStrategy)
            return;
        if (rowStrategy instanceof GridRowKbdStrategyBase) {
            this.saveRowSelectedColumn(rowStrategy);
            const itemIndex = rowStrategy.findItemElementIndexByColumnUid(cellInfo.columnInfo.uID);
            startRequested = this.startEditRowItem(rowStrategy, itemIndex, cellInfo.hitInnerElement, this.raiseStartCellEditingRequestComplete.bind(this));
        }
        if (!startRequested) {
            if (cellInfo.rowType === GridRowType.Edit)
                this.endEditRowItem(GridEditorClosingAction.Hide);
            this.raiseStartCellEditingRequestComplete(false);
        }
    }
    raiseStartCellEditingRequestComplete(result) {
        this.grid.dispatchEvent(new GridStartCellEditingRequestCompleteEvent(result));
    }
    startEditNewItemRow(rowStrategy, columnInfo) {
        const editableItemIndex = this.editorManager.showNewItemRowEditor(columnInfo);
        if (editableItemIndex >= 0) {
            rowStrategy.selectItem(editableItemIndex);
            this.saveRowSelectedColumn(rowStrategy);
            return true;
        }
        return false;
    }
    startEditRowItem(rowStrategy, itemIndex, cellInnerElementTypeToClick = null, endCallback = null) {
        if (rowStrategy === null || !this.isInplaceEditableRow(rowStrategy))
            return false;
        if (itemIndex < 0 || itemIndex >= rowStrategy.itemCount)
            return false;
        const showRequested = this.editorManager.showEditor(rowStrategy.getItem(itemIndex), cellInnerElementTypeToClick, result => {
            const completed = result === GridEditorManagerCommandResult.Completed;
            if (completed) {
                const editRowStrategy = this.findEditRowStrategy();
                if (editRowStrategy !== null) {
                    editRowStrategy.updateSelectedItemByIndex(itemIndex);
                    this.saveRowSelectedColumn(editRowStrategy);
                    if (!editRowStrategy.focusNestedEditor())
                        editRowStrategy.leaveFromNestedContent();
                }
            }
            if (endCallback !== null)
                endCallback(completed);
        });
        if (showRequested) {
            rowStrategy.selectItem(itemIndex);
            this.saveRowSelectedColumn(rowStrategy);
            return true;
        }
        return false;
    }
    endEditRowItem(action = GridEditorClosingAction.Save) {
        const rowStrategy = this.getSelectedItemStrategy();
        if (rowStrategy === null || !(rowStrategy instanceof GridInplaceEditRowKbdStrategy))
            return false;
        rowStrategy.leaveFromNestedContent();
        if (action !== GridEditorClosingAction.Hide)
            this.saveRowSelectedColumn(rowStrategy);
        return this.editorManager.closeEditor(action, result => {
            if (action === GridEditorClosingAction.Cancel && result === GridEditorManagerCommandResult.Failed) {
                if (!rowStrategy.focusNestedEditor())
                    rowStrategy.leaveFromNestedContent();
            }
        });
    }
    startEditNearestRowItem(afterSelectedRowItem, restrictToSameRow = false) {
        const position = this.findNearestEditablePosition(afterSelectedRowItem);
        if (position === null)
            return false;
        const [nextRowIndex, nextItemIndex] = position;
        if (restrictToSameRow && nextRowIndex !== this.selectedItemIndex)
            return false;
        const currentRowStrategy = this.getSelectedItemStrategy();
        const nextRowStrategy = this.getStrategy(nextRowIndex);
        if (currentRowStrategy && currentRowStrategy !== nextRowStrategy)
            currentRowStrategy.updateSelectedItemByIndex(nextItemIndex);
        return this.startEditRowItem(nextRowStrategy, nextItemIndex, null, this.raiseStartCellEditingRequestComplete.bind(this));
    }
    findNearestEditablePosition(afterSelectedRowItem) {
        const step = afterSelectedRowItem ? 1 : -1;
        const rowCount = this.itemCount;
        const startRowIndex = this.selectedItemIndex;
        for (let rowIndex = startRowIndex; rowIndex >= 0 && rowIndex < rowCount; rowIndex += step) {
            const rowStrategy = this.getStrategy(rowIndex);
            if (rowStrategy === null || !this.isInplaceEditableRow(rowStrategy))
                continue;
            let startItemIndex;
            if (rowIndex === startRowIndex)
                startItemIndex = rowStrategy.selectedItemIndex + step;
            else
                startItemIndex = afterSelectedRowItem ? 0 : rowStrategy.itemCount - 1;
            for (let itemIndex = startItemIndex; itemIndex >= 0 && itemIndex < rowStrategy.itemCount; itemIndex += step) {
                const item = rowStrategy.getItem(itemIndex);
                const columnInfo = this.getColumnInfoByCell(item);
                if (columnInfo !== null && columnInfo.isEditable)
                    return [rowIndex, itemIndex];
            }
        }
        return null;
    }
    isInplaceEditableRow(rowStrategy) {
        if (!this.isInplaceEditingEnabled)
            return false;
        const rowType = rowStrategy.getRowType();
        return rowType === GridRowType.Data || rowType === GridRowType.Edit;
    }
    findEditRowStrategy() {
        for (let i = 0; i < this.itemCount; i++) {
            const strategy = this.getStrategy(i);
            const editRowStrategy = GridDataTableBodyKbdStrategy.castToEditRowStategy(strategy);
            if (editRowStrategy)
                return editRowStrategy;
        }
        return null;
    }
    static castToEditRowStategy(rowStrategy) {
        if (rowStrategy instanceof GridRowWithEditorsKbdStrategyBase && rowStrategy.getRowType() === GridRowType.Edit)
            return rowStrategy;
        return null;
    }
}
class GridDataTableBodyWithVirtualScrollKbdStrategy extends GridDataTableBodyKbdStrategy {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
        this.selectedRowVirtualIndex = -1;
        this.selectedNonVirtualRowIndexOffset = 0;
        this.selectedHiddenStrategy = null;
        this.isLastRowSelected = false;
        this.rowVirtualIndexToShow = null;
        this.scrollRequired = false;
        this.onRowMadeVisibleCallback = null;
        this.cellEditingStarted = false;
        this.skipIndexCorrectionForIncomingEditRow = false;
        this.boundOnScrollHandler = this.onScroll.bind(this);
        this.boundOnStartCellEditingRequestHandler = this.onStartCellEditingRequest.bind(this);
        this.addEventListeners();
    }
    onDispose() {
        this.removeEventListeners();
        super.onDispose();
    }
    get preventScrollOnFocus() {
        return super.preventScrollOnFocus || this.isFocusHidden || (!this.scrollRequired && !this.isRowInView(this.selectedItemElement));
    }
    get firstItemSelected() {
        return super.firstItemSelected && this.selectedRowVirtualIndex === 0;
    }
    get lastItemSelected() {
        return this.isLastRowSelected || !this.totalItemCount;
    }
    get isFocusHidden() {
        return containsFocusHiddenAttribute(this.targetElement);
    }
    get lastVirtualIndexSelected() {
        return this.selectedRowVirtualIndex >= this.lastVirtualIndex;
    }
    get lastVirtualIndex() {
        const totalItemCount = this.totalItemCount;
        return totalItemCount ? totalItemCount - 1 : 0;
    }
    get totalItemCount() {
        const scrollViewer = this.getScrollViewer();
        return scrollViewer.totalItemCount;
    }
    get makingRowVisibleStarted() {
        return this.rowVirtualIndexToShow !== null;
    }
    initialize() {
        super.initialize();
        this.cellEditingStarted = false;
    }
    isFirstCellSelected(rowStrategy) {
        var _a, _b;
        return (_b = (_a = this.getSelectedHiddenStrategyNotEqualTo(rowStrategy)) === null || _a === void 0 ? void 0 : _a.firstItemSelected) !== null && _b !== void 0 ? _b : super.isFirstCellSelected(rowStrategy);
    }
    isLastCellSelected(rowStrategy) {
        var _a, _b;
        return (_b = (_a = this.getSelectedHiddenStrategyNotEqualTo(rowStrategy)) === null || _a === void 0 ? void 0 : _a.lastItemSelected) !== null && _b !== void 0 ? _b : super.isLastCellSelected(rowStrategy);
    }
    isIndexWithinBoundaries(_index) {
        return true;
    }
    enterTablePartWithNewIndex(index) {
        this.scrollRequired = true;
        const selectFirstRow = index === 0;
        this.updateSelectedVirtualIndex(selectFirstRow ? 0 : this.lastVirtualIndex);
        this.selectedNonVirtualRowIndexOffset = selectFirstRow ? -1 : GridDataTableBodyWithVirtualScrollKbdStrategy.maxOffset;
    }
    selectItem(index) {
        const indexToSelect = this.correctSelectionIndex(index);
        if (indexToSelect < 0)
            return;
        super.selectItem(indexToSelect);
        this.scrollRequired = false;
        if (!this.isFocusHidden)
            this.updateSelectedVirtualState();
    }
    leaveTablePart() {
        super.leaveTablePart();
        this.scrollRequired = true;
    }
    updateSelectedItemByChildElement(childElement, evt = null) {
        const prevSelectedItemIndex = this.selectedItemIndex;
        super.updateSelectedItemByChildElement(childElement, evt);
        this.skipIndexCorrectionForIncomingEditRow = false;
        if (evt instanceof MouseEvent) {
            removeFocusHiddenAttribute(this.targetElement);
            this.updateSelectedVirtualState();
            return;
        }
        const isNestedContentTarget = childElement.parentElement !== this.selectedItemElement;
        const shouldResetVirtualState = prevSelectedItemIndex !== this.selectedItemIndex || isNestedContentTarget;
        if (shouldResetVirtualState)
            this.resetVirtualStateBySelectedStrategy(childElement);
    }
    moveToPrevItem() {
        if (this.isFocusHidden)
            this.moveToSiblingRowByVirtualIndex(-1);
        else
            super.moveToPrevItem();
    }
    moveToNextItem() {
        if (this.isFocusHidden)
            this.moveToSiblingRowByVirtualIndex(1);
        else
            super.moveToNextItem();
    }
    selectFirstCell() {
        this.selectedNonVirtualRowIndexOffset = -1;
        this.setOnRowMadeVisibleCallback(() => {
            var _a;
            (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectFirstCell();
        });
        this.makeRowVisible(0);
    }
    selectLastCell() {
        this.selectedNonVirtualRowIndexOffset = GridDataTableBodyWithVirtualScrollKbdStrategy.maxOffset;
        this.setOnRowMadeVisibleCallback(() => {
            var _a;
            (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectLastCell();
        });
        this.makeRowVisible(this.lastVirtualIndex);
    }
    get hiddenRowVisibleIndex() {
        if (this.isFocusHidden)
            return this.selectedNonVirtualRowIndexOffset ? -1 : this.selectedRowVirtualIndex;
        return super.hiddenRowVisibleIndex;
    }
    get selectedHiddenRowStrategy() {
        return this.isFocusHidden && this.selectedHiddenStrategy ? this.selectedHiddenStrategy : super.selectedHiddenRowStrategy;
    }
    handleKeyDownForHiddenRow(rowStrategy, evt) {
        const hiddenStrategy = this.getSelectedHiddenStrategyNotEqualTo(rowStrategy);
        if (!hiddenStrategy)
            return super.handleKeyDownForHiddenRow(rowStrategy, evt);
        return hiddenStrategy.handleKeyDown(evt);
    }
    trySelectHiddenCell(index, onSelectedCallback = null) {
        if (!this.isFocusHidden)
            return false;
        this.setOnRowMadeVisibleCallback(() => {
            var _a;
            (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.selectItem(index);
            this.scrollToElement(null, HorizontalAlign.None);
            onSelectedCallback === null || onSelectedCallback === void 0 ? void 0 : onSelectedCallback();
        });
        this.makeRowVisible(this.selectedRowVirtualIndex);
        return true;
    }
    getSelectedItemStrategy() {
        var _a;
        const strategy = (_a = super.getSelectedItemStrategy()) !== null && _a !== void 0 ? _a : this.selectedHiddenStrategy;
        if (strategy && this.selectedHiddenStrategy && strategy !== this.selectedHiddenStrategy)
            this.syncSelectedColumns(this.selectedHiddenStrategy, strategy);
        return strategy;
    }
    onAfterTabKeyDownHandled(evt) {
        if (this.makingRowVisibleStarted) {
            this.setOnRowMadeVisibleCallback(() => {
                this.scrollToElement(null, HorizontalAlign.None);
                super.onAfterTabKeyDownHandled(evt);
            }, true);
        }
        else
            super.onAfterTabKeyDownHandled(evt);
    }
    onMakeRowVisible(index) {
        var _a;
        if (this.makingRowVisibleStarted) {
            this.rowVirtualIndexToShow = null;
            this.scrollRequired = true;
            super.onMakeRowVisible((_a = this.findVisibleIndexByVirtualIndex(this.selectedRowVirtualIndex)) !== null && _a !== void 0 ? _a : index);
            this.callOnRowMadeVisibleCallback();
            this.notifyFocusedRowChanged();
        }
        else {
            const newStrategy = this.getStrategy(index);
            if (!newStrategy || !this.resetVirtualStateForIncomingEditRow(newStrategy))
                this.updateSelectedVirtualIndex(-1);
            super.onMakeRowVisible(index);
        }
    }
    onHandlePageUpDownKey(boundaryItemIndex, alignVert, alignHor) {
        if (this.isFocusHidden) {
            this.makeRowVisibleWithAlignment(this.selectedRowVirtualIndex, alignVert, alignHor);
            return;
        }
        const validIndex = this.validateItemIndex(boundaryItemIndex);
        const indices = this.findClosestVisibleIndexWithVirtualIndex(validIndex, alignVert !== null && alignVert !== void 0 ? alignVert : undefined);
        const boundaryVirtualIndex = indices.virtualIndex;
        const expectedIndexOffset = boundaryItemIndex - indices.visibleIndex;
        if (validIndex === boundaryItemIndex) {
            this.selectedNonVirtualRowIndexOffset = expectedIndexOffset;
            this.makeRowVisibleWithAlignment(boundaryVirtualIndex, alignVert, alignHor);
        }
        else {
            this.setOnRowMadeVisibleCallback(() => {
                this.selectedNonVirtualRowIndexOffset = 0;
                const boundaryVisibleIndex = this.findVisibleIndexByVirtualIndex(boundaryVirtualIndex);
                if (boundaryVisibleIndex)
                    this.selectItem(boundaryVisibleIndex + expectedIndexOffset);
                this.scrollToElement(alignVert, alignHor);
            });
            // TODO: 2 instead of 1 to decrease the risk of the ratio problem appearing when scrolling down virtually
            const virtualIndexToShow = boundaryVirtualIndex + (alignVert === VerticalAlign.Bottom ? 2 : -1);
            this.makeRowVisible(virtualIndexToShow);
        }
    }
    shouldSaveFocusedRowVisibleIndex(rowStrategy) {
        return super.shouldSaveFocusedRowVisibleIndex(rowStrategy) &&
            (this.selectedRowVirtualIndex !== rowStrategy.getRowVisibleIndex() || this.selectedNonVirtualRowIndexOffset !== 0 || this.scrollRequired);
    }
    resetVirtualStateBySelectedStrategy(childElementToUpdateSelectedItem) {
        const newStrategy = this.getSelectedItemStrategy();
        if (!newStrategy)
            return;
        if (this.resetVirtualStateForIncomingEditRow(newStrategy)) {
            newStrategy.updateSelectedItemByChildElement(childElementToUpdateSelectedItem);
            newStrategy.switchToNestedContent();
            this.saveRowSelectedColumn(newStrategy);
        }
    }
    addEventListeners() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer) {
            scrollViewer.addEventListener(ScrollEvent.eventName, this.boundOnScrollHandler);
            this.grid.addEventListener(GridStartCellEditingRequestCompleteEvent.eventName, this.boundOnStartCellEditingRequestHandler);
        }
    }
    removeEventListeners() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer) {
            scrollViewer.removeEventListener(ScrollEvent.eventName, this.boundOnScrollHandler);
            this.grid.removeEventListener(GridStartCellEditingRequestCompleteEvent.eventName, this.boundOnStartCellEditingRequestHandler);
        }
    }
    onScroll(_) {
        if (this.cellEditingStarted && !this.isRowInView(this.selectedItemElement)) {
            this.endEditRowItem();
            this.cellEditingStarted = false;
        }
    }
    onStartCellEditingRequest(evt) {
        this.cellEditingStarted = evt.detail.result;
        this.updateSelectedVirtualState();
    }
    correctSelectionIndex(index) {
        var _a, _b, _c;
        if (this.makingRowVisibleStarted || this.skipIndexCorrectionForIncomingEditRow) {
            this.skipIndexCorrectionForIncomingEditRow = false;
            return -1;
        }
        if (this.selectedRowVirtualIndex < 0)
            return index;
        const visibilityChangedByScroll = index === this.selectedItemIndex && !this.scrollRequired;
        if (visibilityChangedByScroll) {
            if (this.isVirtualIndexRendered(this.selectedRowVirtualIndex)) {
                index = (_a = this.findVisibleIndexByVirtualIndex(this.selectedRowVirtualIndex)) !== null && _a !== void 0 ? _a : index;
                removeFocusHiddenAttribute(this.targetElement);
            }
            else {
                addFocusHiddenAttribute(this.targetElement);
                (_b = this.selectedHiddenStrategy) === null || _b === void 0 ? void 0 : _b.makeObsolete();
            }
        }
        else if (this.isFocusHidden || this.scrollRequired) {
            if (this.isVirtualIndexRendered(this.selectedRowVirtualIndex)) {
                index = (_c = this.findVisibleIndexByVirtualIndex(this.selectedRowVirtualIndex)) !== null && _c !== void 0 ? _c : index;
                removeFocusHiddenAttribute(this.targetElement);
            }
            else {
                this.makeRowVisible(this.selectedRowVirtualIndex);
                return -1;
            }
        }
        return index;
    }
    resetVirtualStateForIncomingEditRow(newStrategy) {
        if (this.skipIndexCorrectionForIncomingEditRow)
            return false;
        const editRowStrategy = GridDataTableBodyKbdStrategy.castToEditRowStategy(newStrategy);
        const isNewEditStrategy = !!editRowStrategy && newStrategy !== this.selectedHiddenStrategy;
        this.skipIndexCorrectionForIncomingEditRow = isNewEditStrategy && this.isRowInView(editRowStrategy.targetElement);
        if (!this.skipIndexCorrectionForIncomingEditRow)
            return false;
        if (this.selectedRowVirtualIndex >= 0) {
            removeFocusHiddenAttribute(this.targetElement);
            this.updateSelectedVirtualIndex(-1);
            this.selectedHiddenStrategy = null;
        }
        return true;
    }
    getSelectedHiddenStrategyNotEqualTo(rowStrategy) {
        if (this.isFocusHidden && this.selectedHiddenStrategy && rowStrategy !== this.selectedHiddenStrategy)
            return this.selectedHiddenStrategy;
        return null;
    }
    callOnRowMadeVisibleCallback() {
        if (!this.onRowMadeVisibleCallback)
            return;
        this.onRowMadeVisibleCallback();
        this.onRowMadeVisibleCallback = null;
    }
    updateSelectedVirtualState() {
        this.selectedHiddenStrategy = super.getSelectedItemStrategy();
        this.updateSelectedVirtualIndex();
    }
    setOnRowMadeVisibleCallback(callback, force = false) {
        if (this.makingRowVisibleStarted && !force)
            return;
        this.onRowMadeVisibleCallback = callback;
    }
    async makeRowVisible(virtualIndex) {
        var _a;
        if (this.makingRowVisibleStarted)
            return;
        const virtualIndexToShow = this.getValidVirtualIndex(virtualIndex);
        this.updateSelectedVirtualIndex(virtualIndexToShow);
        if (this.isVirtualIndexRendered(virtualIndexToShow)) {
            this.scrollRequired = true;
            // TODO: might it be called twice because of onMakeRowVisible?
            this.selectItem((_a = this.findVisibleIndexByVirtualIndex(virtualIndexToShow)) !== null && _a !== void 0 ? _a : 0);
            this.callOnRowMadeVisibleCallback();
        }
        else {
            this.rowVirtualIndexToShow = virtualIndexToShow;
            this.grid.makeRowVisible(virtualIndexToShow);
            const success = await this.waitForVirtualIndexToShow(virtualIndexToShow);
            const virtualIndexExpectedForDisplay = this.rowVirtualIndexToShow === virtualIndexToShow;
            if (virtualIndexExpectedForDisplay) {
                if (success)
                    this.onMakeRowVisible(this.selectedItemIndex);
                else
                    this.rowVirtualIndexToShow = null;
            }
        }
    }
    moveToSiblingRowByVirtualIndex(indexIncrement) {
        this.selectedNonVirtualRowIndexOffset += indexIncrement;
        this.makeRowVisibleWithAlignment(this.selectedRowVirtualIndex, null, HorizontalAlign.None);
    }
    makeRowVisibleWithAlignment(virtualIndex, alignVert, alightHor) {
        this.setOnRowMadeVisibleCallback(() => {
            this.scrollToElement(alignVert, alightHor);
        });
        this.makeRowVisible(virtualIndex);
    }
    updateSelectedVirtualIndex(newIndex = null) {
        if (newIndex === null) {
            const indices = this.findClosestVisibleIndexWithVirtualIndex(this.selectedItemIndex);
            this.selectedNonVirtualRowIndexOffset = this.selectedItemIndex - indices.visibleIndex;
            newIndex = indices.virtualIndex;
        }
        if (newIndex !== null) {
            this.selectedRowVirtualIndex = newIndex;
            this.isLastRowSelected = this.lastVirtualIndexSelected && super.lastItemSelected;
        }
    }
    // TODO: should be gone when the Virtual Scrolling API gets stabilised
    waitForVirtualIndexToShow(virtualIndex, tries = 0) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    if (this.rowVirtualIndexToShow !== virtualIndex) {
                        resolve(false);
                        return;
                    }
                    const success = this.isVirtualIndexRendered(virtualIndex);
                    if (success || tries > 1)
                        resolve(success);
                    else {
                        const result = await this.waitForVirtualIndexToShow(virtualIndex, ++tries);
                        resolve(result);
                    }
                }
                catch {
                    resolve(false);
                }
            }, 1000);
        });
    }
    getValidVirtualIndex(virtualIndex) {
        if (virtualIndex < 0)
            return 0;
        const lastVirtualIndex = this.lastVirtualIndex;
        return virtualIndex > lastVirtualIndex ? lastVirtualIndex : virtualIndex;
    }
    isVirtualIndexRendered(virtualIndex) {
        const { virtualIndex: startVirtualIndex } = this.findClosestVisibleIndexWithVirtualIndex(0);
        const { virtualIndex: endVirtualIndex } = this.findClosestVisibleIndexWithVirtualIndex(super.itemCount - 1);
        return virtualIndex >= startVirtualIndex && virtualIndex <= endVirtualIndex;
    }
    findClosestVisibleIndexWithVirtualIndex(visibleIndex, align = VerticalAlign.Top) {
        let virtualIndex = -1;
        let offset = align === VerticalAlign.Top ? -1 : 1;
        let curIndex = visibleIndex;
        let searchDirectionChanged = false;
        while (super.isIndexWithinBoundaries(curIndex) || !searchDirectionChanged) {
            const item = super.getItem(curIndex);
            if (!item) {
                searchDirectionChanged = true;
                offset *= -1;
                curIndex = visibleIndex + offset;
                continue;
            }
            virtualIndex = DomHelper.getAttributeIntValue(item, VirtualItemIndexAttributeName, -1);
            if (virtualIndex >= 0)
                break;
            curIndex += offset;
        }
        virtualIndex = virtualIndex >= 0 ? virtualIndex : this.selectedRowVirtualIndex;
        return { virtualIndex, visibleIndex: curIndex };
    }
    findVisibleIndexByVirtualIndex(virtualIndex) {
        const virtualIndexStr = virtualIndex.toString();
        const itemCount = super.itemCount;
        for (let i = 0; i < itemCount; ++i) {
            const item = super.getItem(i);
            if (item && virtualIndexStr === item.getAttribute(VirtualItemIndexAttributeName))
                return super.validateItemIndex(i + this.selectedNonVirtualRowIndexOffset);
        }
        return null;
    }
    isRowInView(row) {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            return GridScrollUtils.isElementInView(row, scrollViewer);
        return false;
    }
}
GridDataTableBodyWithVirtualScrollKbdStrategy.maxOffset = 1000;
class GridDataTableFooterKbdStrategy extends GridDataTablePartKbdStrategyBase {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
    }
    createItemStrategy(element) {
        if (GridLayoutHelper.getRowType(element) === GridRowType.Footer)
            return new GridFooterRowKbdStrategy(this, this.grid, element);
        throw new Error("Not implemented");
    }
}

class GridRootKbdStrategy extends GridKbdStrategy {
    constructor(grid) {
        super(grid, grid);
        this.searchBoxInputSelector = `.${GridCssClasses.SearchBoxClassName} > input`;
    }
    getShortcutContext() {
        return {
            IsMacOSPlatform: this.isMacOSPlatform
        };
    }
    queryItems() {
        return new Array(this.getToolbarContainer(), this.getPagerPanel(true), this.getTopPanel(), this.getDataTable(), this.getPagerPanel(false));
    }
    createDataTableStrategy(dataTableElement) {
        return new GridDataTableKbdStrategy(this.grid, dataTableElement);
    }
    createItemStrategy(itemElement) {
        switch (GridLayoutHelper.getNavigationAreaType(itemElement)) {
            case GridNavigationAreaType.ToolbarContainer:
                return new GridToolbarContainerKbdStrategy(this.grid, itemElement);
            case GridNavigationAreaType.GroupPanel:
            case GridNavigationAreaType.SearchBox:
                return new GridTopPanelKbdStrategy(this.grid, itemElement);
            case GridNavigationAreaType.DataTable:
                return this.createDataTableStrategy(itemElement);
            case GridNavigationAreaType.Pager:
                return new GridPagerContainerKbdStrategy(this.grid, itemElement);
        }
        return null;
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab)
            return this.handleTabKeyDown(evt);
        if (keyCode === key.KeyCode.Up && evt.ctrlKey) {
            this.moveToPrevItem();
            return true;
        }
        if (keyCode === key.KeyCode.Down && evt.ctrlKey) {
            this.moveToNextItem();
            return true;
        }
        if (keyCode === key.KeyCode.Key_f && evt.ctrlKey)
            return this.tryFocusSearchBox();
        return false;
    }
    handleTabKeyDown(evt) {
        if (!super.handleTabKeyDown(evt, evt.altKey)) {
            if (evt.shiftKey)
                this.leaveBackward();
            else
                this.leaveForward();
        }
        return true;
    }
    moveToPrevItem() {
        if (this.selectedItemIndex > 0)
            super.moveToPrevItem();
        else
            this.leaveBackward();
    }
    moveToNextItem() {
        if (this.selectedItemIndex < this.itemCount - 1)
            super.moveToNextItem();
        else
            this.leaveForward();
    }
    getTopPanel() {
        var _a, _b;
        const childContainer = (_a = this.getGroupPanelContentContainer()) !== null && _a !== void 0 ? _a : this.getSearchBoxContainer();
        return (_b = childContainer === null || childContainer === void 0 ? void 0 : childContainer.closest(GridSelectors.TopPanelSelector)) !== null && _b !== void 0 ? _b : null;
    }
    tryFocusSearchBox() {
        const searchBoxContainer = this.getSearchBoxContainer();
        if (searchBoxContainer) {
            const searchBox = searchBoxContainer.querySelector(this.searchBoxInputSelector);
            const elementToFocus = searchBox !== null && searchBox !== void 0 ? searchBox : searchBoxContainer;
            FocusUtils.focusElement(elementToFocus);
            return true;
        }
        return false;
    }
}
class GridToolbarContainerKbdStrategy extends GridKbdStrategy {
    constructor(grid, targetElement) {
        super(grid, targetElement);
    }
    getShortcutContext() {
        return {
            AreaType: GridNavigationAreaType.ToolbarContainer
        };
    }
}
class GridTopPanelKbdStrategy extends GridKbdStrategy {
    constructor(grid, targetElement) {
        super(grid, targetElement);
        this.itemSelector = `.${GridCssClasses.HeaderElementClassName}`;
        this.searchBoxContainer = null;
        this.searchBoxContainer = this.getSearchBoxContainer();
    }
    getShortcutContext() {
        return {
            AreaType: this.getAreaType(),
            ColumnUID: this.getSelectedColumnUID()
        };
    }
    queryItems() {
        const result = this.queryItemsBySelector(this.itemSelector);
        result.push(this.searchBoxContainer);
        return result;
    }
    handleKeyDown(evt) {
        if (evt.ctrlKey && (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Enter || key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Space)) // temporary ungrouping feature disabled
            return true;
        if (super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                this.moveToPrevItem();
                return true;
            case key.KeyCode.Right:
                this.moveToNextItem();
                return true;
            case key.KeyCode.Space:
                this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Up:
                if (!this.isSearchBoxItemSelected() && this.isSearchBoxInMobileView()) {
                    const searchBoxItemIndex = this.items.findIndex(item => GridLayoutHelper.isSearchBoxContainer(item));
                    this.selectItem(searchBoxItemIndex);
                    return true;
                }
                break;
            case key.KeyCode.Down:
                if (evt.altKey && !this.isSearchBoxItemSelected()) {
                    this.performShortcutEvent(evt);
                    return true;
                }
                if (!evt.altKey && this.isSearchBoxItemSelected() && this.isSearchBoxInMobileView()) {
                    this.selectItem(0);
                    return true;
                }
                break;
        }
        return false;
    }
    isImmediatelyClickEnabled() {
        return this.selectedItemElement !== this.searchBoxContainer;
    }
    getAreaType() {
        if (GridLayoutHelper.isSearchBoxContainer(this.selectedItemElement))
            return GridNavigationAreaType.SearchBox;
        return GridNavigationAreaType.GroupPanel;
    }
    getSelectedColumnUID() {
        return this.getColumnUID(this.selectedItemElement);
    }
    isSearchBoxItemSelected() {
        return this.getAreaType() === GridNavigationAreaType.SearchBox;
    }
    isSearchBoxInMobileView() {
        return !!this.searchBoxContainer && this.searchBoxContainer.offsetWidth === this.targetElement.offsetWidth;
    }
}
class GridPagerContainerKbdStrategy extends GridKbdStrategy {
    constructor(grid, targetElement) {
        super(grid, targetElement);
    }
    getShortcutContext() {
        return { AreaType: GridNavigationAreaType.Pager };
    }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
            case key.KeyCode.Right:
            case key.KeyCode.Home:
            case key.KeyCode.End:
                this.performShortcutEvent(evt);
                return true;
        }
        return false;
    }
    tryRestoreSelectedItem(itemElementToRestore) {
        super.tryRestoreSelectedItem(itemElementToRestore);
        const pagerSizeContainer = this.targetElement.querySelector(GridSelectors.PagerSizeSelector);
        if (pagerSizeContainer === null || pagerSizeContainer === void 0 ? void 0 : pagerSizeContainer.contains(document.activeElement))
            this.targetElement.scrollIntoView({ block: "nearest" });
    }
}
class GridColumnChooserKbdStrategy extends KeyboardNavigationStrategy {
    constructor(owner, navigator) {
        super(navigator, owner);
        this.itemSelector = `.${GridCssClasses.ColumnChooserItemClassName}`;
        this.savedColumnUID = null;
        this.hasXafActionsContainer = false;
        this.boundOnDragStopHandler = this.onDragStop.bind(this);
        this.columnChooser = owner;
        this.addEventSubscriptions();
        this.hasXafActionsContainer = this.targetElement.nextSibling instanceof HTMLElement
            && this.targetElement.nextSibling.classList.contains("column-chooser-actions-container");
    }
    initialize() {
        super.initialize();
        if (this.savedColumnUID !== null)
            this.restoreSelectedColumn();
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    getShortcutContext() {
        return {
            AreaType: GridNavigationAreaType.ColumnChooser,
            ColumnUID: this.getSelectedColumnUID()
        };
    }
    isImmediatelyClickEnabled() {
        return true;
    }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Up:
                this.moveToPrevItem();
                return true;
            case key.KeyCode.Down:
                this.moveToNextItem();
                return true;
            case key.KeyCode.Tab:
                if (evt.shiftKey)
                    this.moveToPrevItem(true);
                else if (this.lastItemSelected && this.hasXafActionsContainer)
                    this.leaveForward();
                else
                    this.moveToNextItem(true);
                return true;
            case key.KeyCode.Space:
                this.performShortcutEvent(evt);
                return true;
        }
        return false;
    }
    onDispose() {
        super.onDispose();
        this.removeEventSubscriptions();
    }
    onDragStop(_) {
        this.savedColumnUID = this.getSelectedColumnUID();
    }
    restoreSelectedColumn() {
        const itemIndex = this.findItemByColumnUID(this.savedColumnUID);
        if (itemIndex >= 0)
            this.selectItem(itemIndex);
        this.savedColumnUID = null;
    }
    addEventSubscriptions() {
        this.columnChooser.addEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
    }
    removeEventSubscriptions() {
        this.columnChooser.removeEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
    }
    findItemByColumnUID(columnUID) {
        return this.items.findIndex(item => this.getColumnUID(item) === columnUID);
    }
    getSelectedColumnUID() {
        return this.getColumnUID(this.selectedItemElement);
    }
    getColumnUID(element) {
        var _a;
        return (_a = this.columnChooser.getColumnUid(element)) !== null && _a !== void 0 ? _a : -1;
    }
}

const DxGridColumnChooserTagName = "dxbl-grid-column-chooser";
class DxGridColumnChooser extends DxHTMLElementBase {
    constructor() {
        super();
        this.boundOnDragStartHandler = this.onDragStart.bind(this);
        this.boundOnDragStopHandler = this.onDragStop.bind(this);
        this.boundOnDragCancelHandler = this.onDragCancel.bind(this);
        this.grid = null;
        this.scrollViewer = null;
        this.itemsReorderHelper = new ItemsReorderHelper(this.onItemsReording.bind(this));
        this.handlePointerEventsMode = HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
    get useShadowDom() {
        return false;
    }
    initializeComponent() {
        super.initializeComponent();
        this.addEventSubscriptions();
        this.grid = DxGrid.findGrid(this.getAttribute(DxGridUidAttributeName$1));
        this.scrollViewer = this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
        this.initializeKeyboardNavigator();
    }
    disposeComponent() {
        super.disposeComponent();
        this.removeEventSubscriptions();
        delete this.keyboardNavigator;
    }
    getColumnUid(itemElement) {
        return parseInt(itemElement.getAttribute(ItemColumnUidAttributeName));
    }
    getColumnParentUid(itemElement) {
        return itemElement.getAttribute(ItemColumnParentUidAttributeName);
    }
    addEventSubscriptions() {
        this.addEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
    }
    removeEventSubscriptions() {
        this.removeEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, new GridColumnChooserKbdStrategy(this, this.keyboardNavigator));
    }
    onDragStart(evt) {
        var _a;
        const eventSource = evt.detail.source;
        const srcElement = eventSource.target;
        const dragAnchor = srcElement.closest(`.${GridCssClasses.ColumnChooserItemDragAnchorClassName}`);
        const draggingItem = srcElement.closest(`.${GridCssClasses.ColumnChooserItemClassName}`);
        if (dragAnchor != null && draggingItem != null) {
            const items = Array.from(this.getElementsByClassName(GridCssClasses.ColumnChooserItemClassName));
            this.itemsReorderHelper.start(items, draggingItem, eventSource);
            (_a = this.scrollViewer) === null || _a === void 0 ? void 0 : _a.startAutoScrolling(ScrollViewerAutoScrollingMode.Vertical, () => { this.itemsReorderHelper.refreshUI(); });
        }
        evt.stopPropagation();
    }
    onDragStop(evt) {
        var _a;
        this.itemsReorderHelper.stop();
        (_a = this.scrollViewer) === null || _a === void 0 ? void 0 : _a.stopAutoScrolling();
        evt.stopPropagation();
    }
    onDragCancel(evt) {
        var _a;
        this.itemsReorderHelper.cancel();
        (_a = this.scrollViewer) === null || _a === void 0 ? void 0 : _a.stopAutoScrolling();
        evt.stopPropagation();
    }
    onItemsReording(items, orderedItemIndices, draggingItemIndices, state) {
        const draggingItems = draggingItemIndices.map(index => items[index]);
        const draggingItem = draggingItems[0];
        const nextSiblingItemStartPosition = orderedItemIndices.indexOf(draggingItemIndices[0]) + draggingItemIndices.length;
        const isLastItem = nextSiblingItemStartPosition === orderedItemIndices.length;
        let nextSiblingItem = null;
        if (!isLastItem) {
            const nextSiblingItemIndex = orderedItemIndices[nextSiblingItemStartPosition];
            nextSiblingItem = items[nextSiblingItemIndex];
            const parentUid = this.getColumnParentUid(nextSiblingItem);
            if (parentUid !== this.getColumnParentUid(draggingItem))
                nextSiblingItem = null;
        }
        this.applyStyles(items, draggingItems, nextSiblingItem, state);
        if (state === ReorderState.Stop)
            this.onItemsReorded(draggingItem, nextSiblingItem);
    }
    applyStyles(items, draggingItems, nextSiblingItem, state) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const hasClassName = item.classList.contains(GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName);
            if (state !== ReorderState.ItemMoving || hasClassName && item !== nextSiblingItem)
                item.classList.remove(GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName);
        }
        if (state === ReorderState.ItemMoving) {
            for (const draggingItem of draggingItems) {
                if (!draggingItem.classList.contains(GridCssClasses.ColumnChooserDraggingItemClassName))
                    draggingItem.classList.add(GridCssClasses.ColumnChooserDraggingItemClassName);
            }
            if (nextSiblingItem != null && !nextSiblingItem.classList.contains(GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName))
                nextSiblingItem.classList.add(GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName);
        }
        else {
            for (const draggingItem of draggingItems)
                draggingItem.classList.remove(GridCssClasses.ColumnChooserDraggingItemClassName);
            nextSiblingItem === null || nextSiblingItem === void 0 ? void 0 : nextSiblingItem.classList.remove(GridCssClasses.ColumnChooserDraggingItemNextSiblingClassName);
        }
    }
    onItemsReorded(draggingItem, nextSiblingItem) {
        if (this.grid == null)
            return;
        const columnUid = this.getColumnUid(draggingItem);
        const beforeColumnUid = nextSiblingItem != null ? this.getColumnUid(nextSiblingItem) : null;
        setTimeout(() => { var _a; return (_a = this.grid) === null || _a === void 0 ? void 0 : _a.onColumnChooserItemDragged(columnUid, beforeColumnUid); }, 200);
    }
}

const DxDragHintTagName = "dxbl-drag-hint";
class DxDragHint extends DxHTMLElementBase {
    get branchId() {
        return this.getAttribute("branch-id");
    }
    show() {
        visibleBranchTreeSingleton.register(this.branchId);
        this.refresh();
        this.classList.add(CssClasses.Visible);
    }
    hide() {
        visibleBranchTreeSingleton.unregister(this.branchId);
        this.refresh();
        this.classList.remove(CssClasses.Visible);
    }
    initializeComponent() {
        super.initializeComponent();
        const branchCreated = new BranchCreatedEvent(new BranchContext(this.branchId, null, BranchType.DragHint));
        this.dispatchEvent(branchCreated);
    }
    disposeComponent() {
        super.disposeComponent();
        const branchRemoved = new BranchRemovedEvent(new BranchContext(this.branchId, null, BranchType.DragHint));
        this.dispatchEvent(branchRemoved);
    }
    refresh() {
        const branchRefreshed = new BranchRefreshedEvent(new BranchIdContext(this.branchId));
        this.dispatchEvent(branchRefreshed);
    }
}

var TargetAlign;
(function (TargetAlign) {
    TargetAlign[TargetAlign["Left"] = 0] = "Left";
    TargetAlign[TargetAlign["Right"] = 1] = "Right";
})(TargetAlign || (TargetAlign = {}));
class GridDraggingTargets {
    constructor() {
        this.downTargetElement = GridDraggingTargets.addTargetToDom(GridCssClasses.DraggingDownTargetClassName, SvgUtils.ArrowDownIconName);
        this.upTargetElement = GridDraggingTargets.addTargetToDom(GridCssClasses.DraggingUpTargetClassName, SvgUtils.ArrowUpIconName);
        const targetElementRect = this.upTargetElement.getBoundingClientRect();
        this.targetElementSize = {
            width: targetElementRect.width,
            height: targetElementRect.height
        };
        this.upTargetElementPosition = null;
        this.downTargetElementPosition = null;
        this.hide();
    }
    show() {
        if (!this.upTargetElementPosition || !this.downTargetElementPosition)
            return;
        this.downTargetElement.style.transform = TransformHelper.translateByPoint(this.downTargetElementPosition);
        this.upTargetElement.style.transform = TransformHelper.translateByPoint(this.upTargetElementPosition);
        this.downTargetElement.classList.remove(CssClasses.DisplayNone);
        this.upTargetElement.classList.remove(CssClasses.DisplayNone);
    }
    hide() {
        this.downTargetElement.classList.add(CssClasses.DisplayNone);
        this.upTargetElement.classList.add(CssClasses.DisplayNone);
    }
    setPositionRelativeToElement(elementRect, targetAlign) {
        this.setUpTargetPosition(elementRect, targetAlign);
        this.setDownTargetPosition(elementRect, targetAlign);
    }
    setUpTargetPosition(elementRect, targetAlign) {
        this.upTargetElementPosition = {
            x: this.getTargetXCoordinate(elementRect, targetAlign),
            y: elementRect.y + elementRect.height
        };
    }
    setDownTargetPosition(elementRect, targetAlign) {
        this.downTargetElementPosition = {
            x: this.getTargetXCoordinate(elementRect, targetAlign),
            y: elementRect.y - this.targetElementSize.height
        };
    }
    getTargetXCoordinate(elementRect, targetAlign) {
        let x = elementRect.x - this.targetElementSize.width / 2;
        if (targetAlign === TargetAlign.Right)
            x += elementRect.width;
        return x;
    }
    dispose() {
        GridDraggingTargets.removeElementsByClassName(GridCssClasses.DraggingDownTargetClassName);
        GridDraggingTargets.removeElementsByClassName(GridCssClasses.DraggingUpTargetClassName);
    }
    static removeElementsByClassName(cssClassName) {
        const elements = document.querySelectorAll(`.${cssClassName}`);
        for (let i = 0; i < elements.length; i++)
            elements[i].remove();
    }
    static addTargetToDom(cssClassName, iconName) {
        const target = document.createElement("div");
        target.className = cssClassName;
        target.innerHTML = SvgUtils.getSvgHtml(iconName);
        document.body.appendChild(target);
        return target;
    }
}

var GridDraggingArea;
(function (GridDraggingArea) {
    GridDraggingArea[GridDraggingArea["HeaderRow"] = 0] = "HeaderRow";
    GridDraggingArea[GridDraggingArea["GroupPanel"] = 1] = "GroupPanel";
    GridDraggingArea[GridDraggingArea["ColumnChooser"] = 2] = "ColumnChooser";
})(GridDraggingArea || (GridDraggingArea = {}));
var DropTargetPosition;
(function (DropTargetPosition) {
    DropTargetPosition[DropTargetPosition["Left"] = 0] = "Left";
    DropTargetPosition[DropTargetPosition["Right"] = 1] = "Right";
})(DropTargetPosition || (DropTargetPosition = {}));
class GridColumnDraggingHelper extends DraggingHelperBase {
    constructor(grid) {
        super();
        this.draggableContext = null;
        this.boundOnDocumentPointerUpHandler = this.onDocumentPointerUp.bind(this);
        this.boundOnHeaderMouseMoveHandler = this.onHeaderMouseMove.bind(this);
        this.boundOnElementMouseOutHandler = this.onElementMouseOut.bind(this);
        this.boundOnGroupPanelMouseMoveHandler = this.onGroupPanelMouseMove.bind(this);
        this.boundOnEmptyHeaderCellMouseMoveHandler = this.onEmptyHeaderCellMouseMove.bind(this);
        this.boundOnGroupFreeSpaceMouseMoveHandler = this.onGroupFreeSpaceMouseMove.bind(this);
        this.grid = grid;
    }
    start(srcHeaderElement, mouseDownEvt) {
        if (!this.isColumnDraggingAllowed(srcHeaderElement))
            return;
        super.start(srcHeaderElement, mouseDownEvt);
        this.grid.styleGenerator.notifyColumnDragStarted();
    }
    stop() {
        var _a;
        (_a = this.draggableContext) === null || _a === void 0 ? void 0 : _a.targets.dispose();
        super.stop();
        document.body.classList.remove(GridCssClasses.MoveCursorCssClassName);
        this.grid.styleGenerator.notifyColumnDragEnded();
    }
    getDraggableElement(srcElement) {
        return GridColumnDraggingHelper.addDraggableHeaderToDOM(srcElement);
    }
    hideDraggableElement() {
        GridColumnDraggingHelper.removeDraggableHeaderFromDom();
    }
    updateDraggableContextByEvent(evt) {
        const element = document.elementFromPoint(evt.clientX, evt.clientY);
        this.updateDraggableContextByElement(element, evt);
    }
    onDocumentPointerUp(_) {
        var _a;
        const element = (_a = this.draggableContext) === null || _a === void 0 ? void 0 : _a.srcElement;
        if (element && !element.isConnected)
            this.stop();
    }
    onHeaderMouseMove(evt) {
        this.updateDraggableContextByElement(evt.target, evt);
    }
    onGroupPanelMouseMove() {
        const groupPanel = this.grid.getGroupPanelContentContainer();
        this.onPanelElementMouseMove(groupPanel, GridDraggingArea.GroupPanel);
    }
    onEmptyHeaderCellMouseMove() {
        const emptyHeaderCell = this.grid.getEmptyHeaderCellContentContainer();
        this.onPanelElementMouseMove(emptyHeaderCell, GridDraggingArea.HeaderRow);
    }
    onGroupFreeSpaceMouseMove() {
        const groupFreeSpace = this.grid.getGroupContentFreeSpaceElement();
        this.onPanelElementMouseMove(groupFreeSpace, GridDraggingArea.GroupPanel);
    }
    isColumnDraggingAllowed(srcHeaderElement) {
        const columnInfo = this.grid.getColumnInfo(srcHeaderElement);
        return columnInfo
            ? columnInfo.allowReorder || (columnInfo.allowGroup && !!this.grid.getGroupPanelContentContainer())
            : false;
    }
    onPanelElementMouseMove(panelElement, dropArea) {
        if (!panelElement || !this.draggableContext || this.draggableContext.mouseOverElement === panelElement)
            return;
        if (this.draggableContext.srcElement === panelElement.previousElementSibling)
            return;
        this.clearMoveStateFromDraggableContext();
        this.setMouseOverElementInfo(panelElement);
        this.draggableContext.dropArea = dropArea;
        if (this.isPossibleDropToCurrentArea()) {
            this.draggableContext.isPossibleDropItem = true;
            this.draggableContext.targets.setPositionRelativeToElement(this.draggableContext.mouseOverElementRect, TargetAlign.Left);
        }
        this.refreshUI();
    }
    isPossibleDropToCurrentArea() {
        var _a, _b, _c;
        return ((_a = this.draggableContext) === null || _a === void 0 ? void 0 : _a.allowGroup) || ((_b = this.draggableContext) === null || _b === void 0 ? void 0 : _b.dropArea) === ((_c = this.draggableContext) === null || _c === void 0 ? void 0 : _c.srcArea);
    }
    createColumnDraggedHandlerArgs() {
        var _a;
        if (!this.draggableContext || !this.draggableContext.isPossibleDropItem)
            return null;
        const context = this.draggableContext;
        const getRestrictedNextColumnUid = (draggedColumn) => {
            var _a;
            if (!draggedColumn.dragRestrictions)
                return null;
            return (_a = draggedColumn.dragRestrictions.nextColumnUid) !== null && _a !== void 0 ? _a : -1;
        };
        let beforeColumnUid = context.beforeColumnUid;
        if (context.dropArea === GridDraggingArea.HeaderRow)
            beforeColumnUid = (_a = getRestrictedNextColumnUid(context.draggedColumn)) !== null && _a !== void 0 ? _a : beforeColumnUid;
        return {
            columnUid: context.draggedColumn.uID,
            beforeColumnUid,
            srcArea: context.srcArea,
            dropArea: context.dropArea
        };
    }
    getLatestVisibleColumnIndex() {
        const isVisibleColumn = (column) => {
            return !column.isIndent && !column.isEmpty;
        };
        for (let i = this.grid.columnsInfo.length - 1; i >= 0; i--) {
            if (isVisibleColumn(this.grid.columnsInfo[i]))
                return i;
        }
        return -1;
    }
    getRestrictedDropHeaderInfo(headerElement) {
        const headerElementArea = this.getDropColumnArea(headerElement);
        const isUngroupingRestrictedColumn = !!(this.draggableContext && this.draggableContext.draggedColumn.dragRestrictions
            && this.draggableContext.srcArea === GridDraggingArea.GroupPanel
            && this.draggableContext.dropArea !== GridDraggingArea.GroupPanel
            && headerElementArea === GridDraggingArea.HeaderRow);
        if (!isUngroupingRestrictedColumn)
            return null;
        let dropHeaderElement;
        let position = DropTargetPosition.Left;
        const latestVisibleColumnIndex = this.getLatestVisibleColumnIndex();
        const dragRestrictions = this.draggableContext.draggedColumn.dragRestrictions;
        let targetColumnIndex = -1;
        if (dragRestrictions && dragRestrictions.nextVisibleColumnUid !== null)
            targetColumnIndex = this.grid.columnsInfo.findIndex(c => c.uID === dragRestrictions.nextVisibleColumnUid && !c.isIndent);
        else {
            targetColumnIndex = latestVisibleColumnIndex;
            position = DropTargetPosition.Right;
        }
        if (targetColumnIndex !== -1)
            dropHeaderElement = this.grid.getHeaderCells()[targetColumnIndex];
        return dropHeaderElement
            ? { dropHeaderElement, position }
            : null;
    }
    updateDraggableContextByElement(element, evt) {
        let headerElement = this.grid.findHeaderElement(element);
        const columnInfo = this.grid.getColumnInfo(headerElement);
        if (headerElement && columnInfo && this.draggableContext && this.draggableContext.draggedColumn.parentUID !== columnInfo.parentUID)
            headerElement = this.findMatchingParentHeader(headerElement);
        if (headerElement) {
            this.updateDraggableContext(headerElement, evt);
            this.refreshUI();
        }
    }
    findMatchingParentHeader(headerElement) {
        let columnInfo = this.grid.getColumnInfo(headerElement);
        while (columnInfo) {
            if (this.draggableContext && this.draggableContext.draggedColumn.parentUID === columnInfo.parentUID)
                return this.grid.getHeaderCell(columnInfo.headerRowIndex, columnInfo.headerCellIndex);
            columnInfo = columnInfo.parent;
        }
        return headerElement;
    }
    updateDraggableContext(dropHeaderElement, evt) {
        var _a;
        this.clearMoveStateFromDraggableContext();
        if (this.draggableContext == null)
            return;
        const restrictedDropHeaderInfo = dropHeaderElement ? this.getRestrictedDropHeaderInfo(dropHeaderElement) : null;
        if (restrictedDropHeaderInfo)
            dropHeaderElement = restrictedDropHeaderInfo.dropHeaderElement;
        if (this.draggableContext.srcElement !== dropHeaderElement) {
            this.setMouseOverElementInfo(dropHeaderElement);
            if (this.isPossibleDropToCurrentArea()) {
                const isLeft = (restrictedDropHeaderInfo === null || restrictedDropHeaderInfo === void 0 ? void 0 : restrictedDropHeaderInfo.position) !== undefined
                    ? restrictedDropHeaderInfo.position === DropTargetPosition.Left
                    : this.isThereCursorInLeftPart(evt);
                const dropHeaderInfo = this.grid.getColumnInfo(dropHeaderElement);
                const isEmptyBandParent = dropHeaderInfo && !dropHeaderInfo.hasLeafs && dropHeaderInfo.uID === this.draggableContext.draggedColumn.parentUID;
                if (isEmptyBandParent) {
                    this.draggableContext.beforeColumnUid = -1;
                    this.draggableContext.isPossibleDropItem = true;
                }
                else if ((isLeft && dropHeaderElement.previousElementSibling !== this.draggableContext.srcElement) || (!isLeft && dropHeaderElement.nextElementSibling !== this.draggableContext.srcElement)) {
                    let nextColumn = isLeft ? dropHeaderInfo : this.grid.getColumnInfo(dropHeaderElement.nextElementSibling);
                    let prevColumn = !isLeft ? dropHeaderInfo : this.grid.getColumnInfo(dropHeaderElement.previousElementSibling);
                    if (isLeft && prevColumn && prevColumn.parentUID !== (nextColumn === null || nextColumn === void 0 ? void 0 : nextColumn.parentUID))
                        prevColumn = null;
                    if (!isLeft && nextColumn && nextColumn.parentUID !== (prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.parentUID))
                        nextColumn = null;
                    const canDropColumn = this.canDropBetweenColumns(prevColumn, nextColumn);
                    if (!canDropColumn) {
                        this.draggableContext.isPossibleDropItem = false;
                        return;
                    }
                    this.draggableContext.beforeColumnUid = (_a = nextColumn === null || nextColumn === void 0 ? void 0 : nextColumn.uID) !== null && _a !== void 0 ? _a : -1;
                    this.draggableContext.isPossibleDropItem = true;
                }
                if (this.draggableContext.isPossibleDropItem)
                    this.draggableContext.targets.setPositionRelativeToElement(this.draggableContext.mouseOverElementRect, isLeft ? TargetAlign.Left : TargetAlign.Right);
            }
        }
    }
    static canDropColumnWithDisabledReorderingBetweenColumns(draggedColumn, srcArea, prevColumn, nextColumn) {
        var _a, _b;
        if (srcArea !== GridDraggingArea.GroupPanel)
            return false;
        const dragRestrictions = draggedColumn.dragRestrictions;
        if (dragRestrictions) {
            const prevColumnUid = ((_a = prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.uID) !== null && _a !== void 0 ? _a : null);
            const nextColumnUid = ((_b = nextColumn === null || nextColumn === void 0 ? void 0 : nextColumn.uID) !== null && _b !== void 0 ? _b : null);
            if (dragRestrictions.previousColumnUid !== prevColumnUid
                && dragRestrictions.nextColumnUid !== nextColumnUid
                && dragRestrictions.nextVisibleColumnUid !== nextColumnUid)
                return false;
        }
        return true;
    }
    canDropBetweenColumns(prevColumn, nextColumn) {
        if (!this.draggableContext)
            return false;
        if (this.draggableContext.dropArea === GridDraggingArea.GroupPanel)
            return true;
        if (!this.draggableContext.draggedColumn.allowReorder && !GridColumnDraggingHelper.canDropColumnWithDisabledReorderingBetweenColumns(this.draggableContext.draggedColumn, this.draggableContext.srcArea, prevColumn, nextColumn))
            return false;
        const draggedParentUID = this.draggableContext.draggedColumn.parentUID;
        const isNextColumnMatching = nextColumn && draggedParentUID === nextColumn.parentUID;
        const isPrevColumnMatching = !isNextColumnMatching && prevColumn && draggedParentUID === prevColumn.parentUID;
        if (!isPrevColumnMatching && !isNextColumnMatching)
            return false;
        const transformFixedPositionToInt = (fixedPosition) => {
            if (fixedPosition === "left")
                return 0;
            if (fixedPosition === "right")
                return 2;
            return 1;
        };
        const columnFixedPositions = [];
        if (prevColumn)
            columnFixedPositions.push(transformFixedPositionToInt(prevColumn.fixedPosition));
        columnFixedPositions.push(transformFixedPositionToInt(this.draggableContext.draggedColumn.fixedPosition));
        if (nextColumn)
            columnFixedPositions.push(transformFixedPositionToInt(nextColumn.fixedPosition));
        for (let i = 0; i < columnFixedPositions.length - 1; ++i) {
            if (columnFixedPositions[i] > columnFixedPositions[i + 1])
                return false;
        }
        return true;
    }
    getDropColumnArea(headerElement) {
        const groupPanel = this.grid.getGroupPanelContentContainer();
        if (!groupPanel)
            return GridDraggingArea.HeaderRow;
        return GridColumnDraggingHelper.isThereHeaderInsideGroupPanel(groupPanel, headerElement) ? GridDraggingArea.GroupPanel : GridDraggingArea.HeaderRow;
    }
    static isThereHeaderInsideGroupPanel(groupPanelContentContainer, headerElement) {
        const count = groupPanelContentContainer.childNodes.length;
        for (let i = 0; i < count; i++) {
            if (groupPanelContentContainer.childNodes[i] === headerElement)
                return true;
        }
        return false;
    }
    refreshUICore() {
        super.refreshUICore();
        const context = this.draggableContext;
        if (!context)
            return;
        if (context.isPossibleDropItem)
            context.targets.show();
        else
            context.targets.hide();
        document.body.classList.add(GridCssClasses.MoveCursorCssClassName);
    }
    setMouseOverElementInfo(dropHeaderElement) {
        super.setMouseOverElementInfo(dropHeaderElement);
        if (!this.draggableContext)
            return;
        const columnInfo = this.grid.getColumnInfo(dropHeaderElement);
        const leaf = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.getRightLeaf();
        if (leaf) {
            const cell = this.grid.getHeaderCell(leaf.headerRowIndex, leaf.headerCellIndex);
            const leafRect = cell === null || cell === void 0 ? void 0 : cell.getBoundingClientRect();
            if (leafRect && this.draggableContext.mouseOverElementRect) {
                const rect = dropHeaderElement.getBoundingClientRect();
                this.draggableContext.mouseOverElementRect.height = leafRect.height + leafRect.top - rect.top;
            }
        }
        if (this.draggableContext.scrollViewerRect && this.draggableContext.mouseOverElementRect) {
            const rect = this.draggableContext.scrollViewerRect;
            if (this.draggableContext.mouseOverElementRect.x < rect.x)
                this.draggableContext.mouseOverElementRect.x = rect.x;
            if (this.draggableContext.mouseOverElementRect.x + this.draggableContext.mouseOverElementRect.width > rect.x + rect.width)
                this.draggableContext.mouseOverElementRect.width = rect.x + rect.width - this.draggableContext.mouseOverElementRect.x;
        }
        this.draggableContext.dropArea = this.getDropColumnArea(dropHeaderElement);
    }
    isThereCursorInLeftPart(evt) {
        if (!this.draggableContext || !this.draggableContext.mouseOverElementRect)
            return false;
        const rect = this.draggableContext.mouseOverElementRect;
        return evt.pageX < rect.x + rect.width / 2;
    }
    updateDraggableElementPosition() {
        if (!this.draggableContext)
            return;
        const context = this.draggableContext;
        const cursorPositionDeltaX = context.currentCursorPosition.x - context.initialCursorPosition.x;
        const documentScrollDeltaX = context.currentScrollPosition.x - context.initialScrollPosition.x;
        const x = context.srcElementPosition.x + cursorPositionDeltaX + documentScrollDeltaX + context.currentScrollPosition.x;
        const cursorPositionDeltaY = context.currentCursorPosition.y - context.initialCursorPosition.y;
        const documentScrollDeltaY = context.currentScrollPosition.y - context.initialScrollPosition.y;
        const y = context.srcElementPosition.y + cursorPositionDeltaY + documentScrollDeltaY + context.currentScrollPosition.y;
        context.draggableElementPosition = { x, y };
    }
    addEventSubscriptions() {
        super.addEventSubscriptions();
        document.addEventListener("pointerup", this.boundOnDocumentPointerUpHandler);
        this.addHeaderEventSubscriptions();
        this.addGroupPanelEventSubscriptions();
        this.addEmptyHeaderCellEventSubscriptions();
        this.addGroupContentFreeSpaceElementEventSubscriptions();
    }
    addHeaderEventSubscriptions() {
        const cells = this.grid.getHeaderCells();
        for (let i = 0; i < cells.length; i++) {
            const headerElement = cells[i];
            headerElement.addEventListener("pointermove", this.boundOnHeaderMouseMoveHandler);
            headerElement.addEventListener("pointerout", this.boundOnElementMouseOutHandler);
        }
    }
    addEmptyHeaderCellEventSubscriptions() {
        const emptyCell = this.grid.getEmptyHeaderCellContentContainer();
        if (emptyCell)
            this.addPanelElementEventSubscriptions(emptyCell, this.boundOnEmptyHeaderCellMouseMoveHandler);
    }
    addGroupPanelEventSubscriptions() {
        if (!this.shouldAddEventListenersToGroupPanel())
            return;
        const groupPanelElement = this.grid.getGroupPanelContentContainer();
        this.addPanelElementEventSubscriptions(groupPanelElement, this.boundOnGroupPanelMouseMoveHandler);
    }
    addGroupContentFreeSpaceElementEventSubscriptions() {
        const freeSpaceElement = this.grid.getGroupContentFreeSpaceElement();
        if (freeSpaceElement)
            this.addPanelElementEventSubscriptions(freeSpaceElement, this.boundOnGroupFreeSpaceMouseMoveHandler);
    }
    addPanelElementEventSubscriptions(panelElement, onMouseMoveHandler) {
        panelElement.addEventListener("pointermove", onMouseMoveHandler);
        panelElement.addEventListener("pointerout", this.boundOnElementMouseOutHandler);
    }
    removeEventSubscriptions() {
        super.removeEventSubscriptions();
        document.removeEventListener("pointerup", this.boundOnDocumentPointerUpHandler);
        this.removeHeaderEventSubscriptions();
        this.removeGroupPanelEventSubscriptions();
        this.removeEmptyHeaderCellEventSubscriptions();
        this.removeGroupContentFreeSpaceElementEventSubscriptions();
    }
    removeHeaderEventSubscriptions() {
        const cells = this.grid.getHeaderCells();
        for (let i = 0; i < cells.length; i++) {
            const headerElement = cells[i];
            headerElement.removeEventListener("pointermove", this.boundOnHeaderMouseMoveHandler);
            headerElement.removeEventListener("pointerout", this.boundOnElementMouseOutHandler);
        }
    }
    removeGroupPanelEventSubscriptions() {
        if (!this.shouldAddEventListenersToGroupPanel())
            return;
        const groupPanelElement = this.grid.getGroupPanelContentContainer();
        this.removePanelElementEventSubscriptions(groupPanelElement, this.boundOnGroupPanelMouseMoveHandler);
    }
    removeEmptyHeaderCellEventSubscriptions() {
        const emptyCell = this.grid.getEmptyHeaderCellContentContainer();
        if (emptyCell)
            this.removePanelElementEventSubscriptions(emptyCell, this.boundOnEmptyHeaderCellMouseMoveHandler);
    }
    removeGroupContentFreeSpaceElementEventSubscriptions() {
        const freeSpaceElement = this.grid.getGroupContentFreeSpaceElement();
        if (freeSpaceElement)
            this.removePanelElementEventSubscriptions(freeSpaceElement, this.boundOnGroupFreeSpaceMouseMoveHandler);
    }
    removePanelElementEventSubscriptions(panelElement, mouseMoveHandler) {
        panelElement.removeEventListener("pointermove", mouseMoveHandler);
        panelElement.removeEventListener("pointerout", this.boundOnElementMouseOutHandler);
    }
    shouldAddEventListenersToGroupPanel() {
        const groupPanelElement = this.grid.getGroupPanelContentContainer();
        if (!groupPanelElement)
            return false;
        return !(groupPanelElement === null || groupPanelElement === void 0 ? void 0 : groupPanelElement.querySelector(`.${GridCssClasses.HeaderElementClassName}`));
    }
    static addDraggableHeaderToDOM(sourceHeader) {
        const draggableHeader = document.createElement("div");
        draggableHeader.className = `${GridCssClasses.DraggableHeaderClassName}`;
        if (sourceHeader.classList.contains(GridCssClasses.SelectionCellClassName))
            draggableHeader.classList.add(GridCssClasses.SelectionCellClassName);
        if (sourceHeader.classList.contains(GridCssClasses.CommandCellClassName))
            draggableHeader.classList.add(GridCssClasses.CommandCellClassName);
        const sourceRect = sourceHeader.getBoundingClientRect();
        draggableHeader.style.width = `${sourceRect.width}px`;
        draggableHeader.style.height = `${sourceRect.height}px`;
        const headerStyle = getComputedStyle(sourceHeader);
        draggableHeader.style.padding = headerStyle.padding;
        draggableHeader.style.font = headerStyle.font;
        draggableHeader.style.whiteSpace = headerStyle.whiteSpace;
        const content = this.getContentElement(sourceHeader).cloneNode(true);
        draggableHeader.appendChild(content);
        document.body.appendChild(draggableHeader);
        return draggableHeader;
    }
    static getContentElement(headerElement) {
        return headerElement.querySelector(`.${GridCssClasses.HeaderContentClassName}`);
    }
    static removeDraggableHeaderFromDom() {
        const elements = document.querySelectorAll(`.${GridCssClasses.DraggableHeaderClassName}`);
        for (let i = 0; i < elements.length; i++)
            elements[i].remove();
    }
    createDraggableContext(srcHeaderElement, draggableHeaderElement, pointerDownEvt) {
        const baseContext = super.createDraggableContext(srcHeaderElement, draggableHeaderElement, pointerDownEvt);
        const scrollViewer = this.grid.getScrollViewer();
        const columnInfo = this.grid.getColumnInfo(srcHeaderElement);
        return {
            ...baseContext,
            allowGroup: columnInfo.allowGroup,
            scrollViewerRect: scrollViewer && scrollViewer.getRectangle(),
            draggedColumn: columnInfo,
            beforeColumnUid: null,
            srcArea: srcHeaderElement.closest(`.${GridCssClasses.GroupPanelContentContainerClassName}`) ? GridDraggingArea.GroupPanel : GridDraggingArea.HeaderRow,
            dropArea: GridDraggingArea.HeaderRow,
            targets: new GridDraggingTargets()
        };
    }
    clearMoveStateFromDraggableContext() {
        super.clearMoveStateFromDraggableContext();
        if (this.draggableContext)
            this.draggableContext.beforeColumnUid = null;
    }
}

class GridSelectionHelper {
    constructor(grid) {
        this._startSelectionRowIndex = -1;
        this._endSelectionRowIndex = -1;
        this.savedSelectedRows = [];
        this.boundOnRowPointerEnterHandler = this.onRowPointerEnter.bind(this);
        this.grid = grid;
    }
    get startSelectionRowIndex() { return this._startSelectionRowIndex; }
    get endSelectionRowIndex() { return this._endSelectionRowIndex; }
    start(targetElement, cleanSelection) {
        this._startSelectionRowIndex = this.grid.getRowVisibleIndexByTarget(targetElement);
        if (this._startSelectionRowIndex > -1) {
            this._endSelectionRowIndex = this._startSelectionRowIndex;
            if (cleanSelection)
                this.storeSelectedRows();
            this.addRowEventSubscriptions();
            this.updateRowsSelection();
        }
    }
    stop() {
        if (this._startSelectionRowIndex > -1) {
            this.deselectRows();
            this.removeRowEventSubscriptions();
            this.restoreSelectedRows();
            this._startSelectionRowIndex = -1;
            this._endSelectionRowIndex = -1;
        }
    }
    isStarted() {
        return this._startSelectionRowIndex > -1 && this._endSelectionRowIndex > -1;
    }
    updateSeletionByEvent(evt) {
        const element = document.elementFromPoint(evt.clientX, evt.clientY);
        this.updateSeletionByElement(element);
    }
    findRowElement(visibleIndex) {
        return this.grid.getMainElement().querySelector(`tr[${GridAttributes.VisibleIndexName}="${visibleIndex}"]`);
    }
    findRowElements() {
        return this.grid.getMainElement().querySelectorAll(`tr[${GridAttributes.VisibleIndexName}]`);
    }
    findSelectedRowElements() {
        return this.grid.getMainElement().querySelectorAll(`tr.${GridCssClasses.SelectedRowClassName}[${GridAttributes.VisibleIndexName}]`);
    }
    addRowEventSubscriptions() {
        const elements = this.findRowElements();
        if (elements) {
            for (let i = 0; i < elements.length; i++)
                elements[i].addEventListener("pointerenter", this.boundOnRowPointerEnterHandler);
        }
    }
    removeRowEventSubscriptions() {
        const elements = this.findRowElements();
        if (elements) {
            for (let i = 0; i < elements.length; i++)
                elements[i].removeEventListener("pointerenter", this.boundOnRowPointerEnterHandler);
        }
    }
    updateSeletionByElement(element) {
        const index = this.grid.getRowVisibleIndexByTarget(element, true);
        if (index > -1) {
            this._endSelectionRowIndex = index;
            this.updateRowsSelection();
        }
    }
    onRowPointerEnter(evt) {
        this.updateSeletionByElement(evt.target);
    }
    selectRows(indexes) {
        for (let i = 0; i < indexes.length; i++) {
            const row = this.findRowElement(indexes[i]);
            if (row) {
                if (i === 0 || i === indexes.length - 1)
                    row.classList.add(GridCssClasses.TouchSelectionEdgeClassName);
                else
                    row.classList.add(GridCssClasses.TouchSelectionClassName);
            }
        }
    }
    deselectRows() {
        const rows = this.findRowElements();
        if (rows) {
            for (let i = 0; i < rows.length; i++)
                rows[i].classList.remove(GridCssClasses.TouchSelectionClassName, GridCssClasses.TouchSelectionEdgeClassName);
        }
    }
    updateRowsSelection() {
        if (this.startSelectionRowIndex === -1 || this.endSelectionRowIndex === -1)
            return;
        this.deselectRows();
        const start = Math.min(this.startSelectionRowIndex, this.endSelectionRowIndex);
        const end = Math.max(this.startSelectionRowIndex, this.endSelectionRowIndex);
        const indexes = Array.from({ length: end - start + 1 }, (_, i) => i + start);
        this.selectRows(indexes);
    }
    storeSelectedRows() {
        const selectedRows = this.findSelectedRowElements();
        if (selectedRows) {
            for (let i = 0; i < selectedRows.length; i++) {
                selectedRows[i].classList.remove(GridCssClasses.SelectedRowClassName);
                this.savedSelectedRows.push(selectedRows[i]);
            }
        }
    }
    restoreSelectedRows() {
        for (let i = 0; i < this.savedSelectedRows.length; i++)
            this.savedSelectedRows[i].classList.add(GridCssClasses.SelectedRowClassName);
        this.savedSelectedRows = [];
    }
}

var ScrollStatus;
(function (ScrollStatus) {
    ScrollStatus[ScrollStatus["Disabled"] = 0] = "Disabled";
    ScrollStatus[ScrollStatus["LeftBorder"] = 1] = "LeftBorder";
    ScrollStatus[ScrollStatus["BetweenBorders"] = 2] = "BetweenBorders";
    ScrollStatus[ScrollStatus["RightBorder"] = 3] = "RightBorder";
})(ScrollStatus || (ScrollStatus = {}));
class GridStyleGenerator {
    get highlightLeftBorder() { return this.scrollStatus === ScrollStatus.BetweenBorders || this.scrollStatus === ScrollStatus.RightBorder || this.isDragging; }
    get highlightRightBorder() { return this.scrollStatus === ScrollStatus.BetweenBorders || this.scrollStatus === ScrollStatus.LeftBorder || this.isDragging; }
    constructor(grid) {
        this.grid = grid;
        this.gridUid = "";
        this.lastGeneratedStyle = "";
        this.isDragging = false;
        this.scrollStatus = ScrollStatus.Disabled;
    }
    notifyColumnDragStarted() {
        if (!this.hasAnyFixedColumn())
            return;
        this.isDragging = true;
        requestAnimationFrame(() => this.updateFixedCellsStyle());
    }
    notifyColumnDragEnded() {
        if (!this.hasAnyFixedColumn())
            return;
        this.isDragging = false;
        requestAnimationFrame(() => this.updateFixedCellsStyle());
    }
    scrollPositionUpdated(contentContainer) {
        if (!this.hasAnyFixedColumn())
            return;
        this.scrollStatus = this.calcScrollStatus(contentContainer);
        requestAnimationFrame(() => this.updateFixedCellsStyle());
    }
    updateFixedCellsStyle() {
        this.gridUid = this.grid.getAttribute(DxGridUidAttributeName$1);
        const styleElement = this.grid.querySelector("style");
        if (!styleElement)
            return;
        let generatedStyle = "";
        if (this.hasAnyFixedColumn()) {
            generatedStyle += this.createPositionStyles();
            generatedStyle += this.createBorderStyles();
        }
        if (this.lastGeneratedStyle !== generatedStyle) {
            styleElement.innerText = generatedStyle;
            this.lastGeneratedStyle = generatedStyle;
        }
    }
    createPositionStyles() {
        const colElements = this.grid.getColElements();
        const offsetWidths = this.getOffsetWidths(colElements);
        const leftOffsets = new Array(offsetWidths.length);
        const rightOffsets = new Array(offsetWidths.length);
        leftOffsets[0] = 0;
        rightOffsets[offsetWidths.length - 1] = 0;
        for (let i = 1; i < offsetWidths.length; ++i)
            leftOffsets[i] = leftOffsets[i - 1] + offsetWidths[i - 1];
        for (let i = offsetWidths.length - 2; i >= 0; --i)
            rightOffsets[i] = rightOffsets[i + 1] + offsetWidths[i + 1];
        const anyColumnFixedToLeft = this.grid.columnsInfo.some(c => c.fixedPosition === "left");
        let result = "";
        for (const rowLayout of this.grid.headerLayout) {
            for (const columnInfo of rowLayout) {
                let fixedPosition = columnInfo.fixedPosition;
                if (columnInfo.isIndent && anyColumnFixedToLeft)
                    fixedPosition = "left";
                if (fixedPosition) {
                    let leaf = columnInfo;
                    const isLeft = fixedPosition === "left";
                    if (leaf.hasLeafs)
                        leaf = isLeft ? columnInfo.getLeftLeaf() : columnInfo.getRightLeaf();
                    const offset = isLeft ? leftOffsets[leaf.leafIndex] : rightOffsets[leaf.leafIndex];
                    result += this.createPositionStyle(columnInfo, leaf.leafIndex, fixedPosition, offset);
                }
            }
        }
        return result;
    }
    hasAnyBandColumn() {
        return this.grid.headerLayout.length > 1;
    }
    hasAnyFixedColumn() {
        return this.grid.columnsInfo.some(c => !!c.fixedPosition);
    }
    calcScrollStatus(contentContainer) {
        const tableWidth = this.grid.getDataTable().clientWidth;
        if (tableWidth === contentContainer.clientWidth)
            return ScrollStatus.Disabled;
        if (contentContainer.scrollLeft === 0)
            return ScrollStatus.LeftBorder;
        if (Math.abs(tableWidth - contentContainer.clientWidth - contentContainer.scrollLeft) < 1)
            return ScrollStatus.RightBorder;
        return ScrollStatus.BetweenBorders;
    }
    createPositionStyle(columnInfo, leafIndex, fixedPosition, offset) {
        const result = [];
        const hasBands = this.hasAnyBandColumn();
        if (hasBands) {
            result.push(this.getHeaderRowsSelector(columnInfo.headerRowIndex));
            result.push(this.createPositionStyleForColumn("th", columnInfo.headerCellIndex, fixedPosition, offset));
        }
        if (!columnInfo.hasLeafs) {
            const tagSelector = hasBands ? "td" : "";
            result.push(this.getTableRowsSelector());
            result.push(this.createPositionStyleForColumn(tagSelector, leafIndex, fixedPosition, offset));
        }
        return result.join("");
    }
    createPositionStyleForColumn(tagSelector, columnIndex, fixedPosition, offset) {
        return ` > ${tagSelector}.${GridCssClasses.FixedCellClassName}:nth-child(${columnIndex + 1}) { ${fixedPosition}: ${offset}px; }`;
    }
    createBorderStyles() {
        const styles = [];
        const hasBands = this.hasAnyBandColumn();
        if (this.highlightLeftBorder) {
            styles.push(this.createLeftBorderStyle("th"));
            styles.push(this.createLeftBorderStyle("td"));
        }
        if (this.highlightRightBorder) {
            if (hasBands)
                styles.push(this.createHeaderRightBorderStyle());
            else
                styles.push(this.createRightBorderStyle("th"));
            styles.push(this.createRightBorderStyle("td"));
        }
        return styles.join("");
    }
    createLeftBorderStyle(tagSelector) {
        return this.getTableRowsSelector() +
            ` > ${tagSelector}.${GridCssClasses.LastLeftFixedCellClassName}` +
            " { border-right-color: var(--dxbl-grid-fixed-column-border-color); }";
    }
    createRightBorderStyle(tagSelector) {
        return this.getTableRowsSelector() +
            ` > ${tagSelector}:not(.${GridCssClasses.FixedCellClassName}) + ${tagSelector}.${GridCssClasses.FixedCellClassName}` +
            " { border-left-color: var(--dxbl-grid-fixed-column-border-color); }";
    }
    createHeaderRightBorderStyle() {
        const styles = [];
        for (const rowLayout of this.grid.headerLayout) {
            const firstRightAlignedColumn = rowLayout.find(columnInfo => columnInfo.fixedPosition === "right");
            if (firstRightAlignedColumn) {
                styles.push(this.getHeaderRowsSelector(firstRightAlignedColumn.headerRowIndex));
                styles.push(` > th.${GridCssClasses.FixedCellClassName}:nth-child(${firstRightAlignedColumn.headerCellIndex + 1})`);
                styles.push(" { border-left-color: var(--dxbl-grid-fixed-column-border-color); }");
            }
        }
        return styles.join("");
    }
    getHeaderRowsSelector(rowIndex) {
        return this.getTableRowsSelector() + `.${GridCssClasses.HeaderRowClassName}:nth-child(${rowIndex + 1})`;
    }
    getTableRowsSelector() {
        return [
            `${this.grid.getTagName()}[${DxGridUidAttributeName$1}="${this.gridUid}"]`,
            `.${ScrollViewerCssClasses.ClassName}`,
            `.${ScrollViewerCssClasses.ContentContainerClassName}`,
            `.${GridCssClasses.DataTableClassName}`,
            "*",
            "tr"
        ].join(" > ");
    }
    getOffsetWidths(colElements) {
        const result = [];
        for (let i = 0; i < colElements.length; ++i)
            result.push(this.grid.getColElementOffsetWidth(i));
        return result;
    }
}

const DxTreeListTagName = "dxbl-tree-list";

const DxGridTagName = "dxbl-grid";
const DxGridUidAttributeName$1 = "data-dx-grid-uid";

const Template = document.createElement("template");
Template.innerHTML = `
<style></style>
<slot />`;
const DxGridUidAttributeName = "data-dx-grid-uid";
class DxGridBase extends DxHTMLElementBase {
    constructor() {
        super();
        this._columnsInfo = [];
        this._headerLayout = [];
        this._cachedColElements = null;
        this._allowSelectRowByClick = false;
        this._enableFocusedRow = false;
        this._enableInplaceEditing = false;
        this._enableMultiSelect = false;
        this._enableRowDrag = false;
        this._enableItemDrop = false;
        this._enablePositionalItemDrop = false;
        this._hasRowClickEvent = false;
        this._hasRowDblClickEvent = false;
        this._isEditing = false;
        this._focusedRowIndex = -1;
        this._latestAutoFitColumnWidthsRequestGuid = null;
        this.boundOnDragStartHandler = this.onDragStart.bind(this);
        this.boundOnDragStopHandler = this.onDragStop.bind(this);
        this.boundOnDragCancelHandler = this.onDragCancel.bind(this);
        this.boundOnClickHandler = this.onClick.bind(this);
        this.boundOnDblClickHandler = this.onDblClick.bind(this);
        this.boundOnScrollViewerUpdateHandler = this.onScrollViewerUpdate.bind(this);
        this.boundOnStartCellEditingRequestCompleteHandler = this.onStartCellEditingRequestComplete.bind(this);
        this.boundOnScrollViewerScrollHandler = this.onScrollViewerScroll.bind(this);
        this.boundOnDocumentKeyDownHandler = this.onDocumentKeyDown.bind(this);
        this.boundOnMouseDownHandler = this.onMouseDown.bind(this);
        this.currentWidth = -1;
        this.focusedRowRestoreVisibilityTimeout = 500;
        this.rowDraggingHelper = this.createRowDraggingHelper();
        this.columnDraggingHelper = new GridColumnDraggingHelper(this);
        this.columnWidthsController = new GridColumnWidthsController(this);
        this.selectionHelper = new GridSelectionHelper(this);
        this._editorManager = this.createEditorManager();
        this._styleGenerator = null;
        this.resizeObserver = new ResizeObserver(this.onSizeChanged.bind(this));
    }
    initializeComponent() {
        super.initializeComponent();
        this._editorManager.initialize();
        this._styleGenerator = new GridStyleGenerator(this);
        this._uiHandlersBridge = this.querySelector(DxUIHandlersBridgeTagName);
        this.initializeKeyboardNavigator();
        this.ensureColumnResizeStrategy();
        this.addEventSubscriptions();
        this.resizeObserver.observe(this);
    }
    disposeComponent() {
        this.removeEventSubscriptions();
        this.resizeObserver.unobserve(this);
        this._editorManager.dispose();
        delete this._uiHandlersBridge;
        delete this.keyboardNavigator;
        super.disposeComponent();
    }
    createEditorManager() {
        return new GridEditorManager(this);
    }
    get hoverTitleElementsSelector() {
        return GridSelectors.TitleElementsSelector;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    getMainElement() {
        return this;
    }
    getDataTable() {
        return this.querySelector(GridSelectors.DataTableSelector);
    }
    getHeaderRows() {
        return this.querySelectorAll(`thead > tr.${GridCssClasses.HeaderRowClassName}`);
    }
    getFilterRow() {
        return this.querySelector(`thead > tr.${GridCssClasses.FilterRowClassName}`);
    }
    getHeaderCells() {
        return this.querySelectorAll(`.${GridCssClasses.HeaderElementClassName}`);
    }
    getToolbarContainer() {
        return this.querySelector(`.${GridCssClasses.ToolbarContainerClassName}`);
    }
    getGroupPanelContentContainer() {
        return this.querySelector(`.${GridCssClasses.GroupPanelContentContainerClassName}`);
    }
    getSearchBoxContainer() {
        return this.querySelector(`.${GridCssClasses.SearchBoxContainerClassName}`);
    }
    getEmptyHeaderCellContentContainer() {
        return this.querySelector(`.${GridCssClasses.EmptyHeaderCellContentContainerClassName}`);
    }
    getGroupContentFreeSpaceElement() {
        return this.querySelector(`.${GridCssClasses.GroupContentFreeSpaceClassName}`);
    }
    getColElements() {
        if (this._cachedColElements == null) {
            this._cachedColElements = this.querySelectorAll(GridSelectors.ColElementSelector);
            setTimeout(() => { this._cachedColElements = null; });
        }
        return this._cachedColElements;
    }
    getFooterRow() {
        return this.querySelector(`.${GridCssClasses.FooterRowClassName}`);
    }
    getPagerPanel(isTop) {
        const panelDirectionClassName = isTop ? GridCssClasses.TopPanelClassName : GridCssClasses.BottomPanelClassName;
        return this.querySelector(`:scope > ${GridSelectors.PagerPanelSelector}.${panelDirectionClassName}`);
    }
    getRowDragHint() {
        var _a, _b;
        const portal = this.querySelector(`.${GridCssClasses.RowDragHintPortalClassName}`);
        return (_b = (_a = portal === null || portal === void 0 ? void 0 : portal.portable) === null || _a === void 0 ? void 0 : _a.find(item => { var _a; return (_a = item.matches) === null || _a === void 0 ? void 0 : _a.call(item, GridSelectors.RowDragHintSelector); })) !== null && _b !== void 0 ? _b : null;
    }
    getDropRestrictions() {
        return this.querySelector(DxGridDropRestrictionsInfoTagName);
    }
    getScrollViewer() {
        return this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
    }
    getScrollViewerContent() {
        return this.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
    }
    getTableContainerWidth() {
        const tableContainer = this.getScrollViewerContent();
        return tableContainer ? tableContainer === null || tableContainer === void 0 ? void 0 : tableContainer.getBoundingClientRect().width : 0;
    }
    getColumnResizeSeparator() {
        return this.querySelector(`.${GridCssClasses.ColumnsSeparatorClassName}`);
    }
    getDropTargetIndicator() {
        return this.querySelector(`.${GridCssClasses.DropTargetIndicatorClassName}`);
    }
    createRootKeyboardNavigationStrategy() {
        return new GridRootKbdStrategy(this);
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(GridSelectors.KeyboardNavigatorSelector);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized) {
            let reinitAttributeToObserve = null;
            const scrollViewer = this.getScrollViewer();
            if (scrollViewer && GridScrollUtils.isVirtualScrollingEnabled(scrollViewer))
                reinitAttributeToObserve = VirtualItemIndexAttributeName;
            this.keyboardNavigator.initialize(this, this.createRootKeyboardNavigationStrategy(), reinitAttributeToObserve);
        }
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
    getColElementOffsetWidth(columnIndex) {
        const colElements = this.getColElements();
        let result = colElements[columnIndex].getBoundingClientRect().width;
        if (result === 0 && (browser.Browser.Safari || browser.Browser.MacOSMobilePlatform || browser.Browser.WebKitFamily || browser.Browser.AndroidDefaultBrowser)) {
            const headerCell = this.findHeaderCellByColumnIndex(columnIndex);
            if (headerCell)
                result = headerCell.getBoundingClientRect().width;
            else
                result = null;
        }
        return result;
    }
    addEventSubscriptions() {
        var _a;
        this.addEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
        this.addEventListener(PointerClickEvent.eventName, this.boundOnClickHandler);
        this.addEventListener(PointerDblClickEvent.eventName, this.boundOnDblClickHandler);
        this.addEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
        this.addEventListener(GridStartCellEditingRequestCompleteEvent.eventName, this.boundOnStartCellEditingRequestCompleteHandler);
        (_a = this.getScrollViewer()) === null || _a === void 0 ? void 0 : _a.subscribeToScroll(this.boundOnScrollViewerScrollHandler);
        document.addEventListener("keydown", this.boundOnDocumentKeyDownHandler);
        if (browser.Browser.Firefox)
            this.addEventListener("mousedown", this.boundOnMouseDownHandler);
    }
    removeEventSubscriptions() {
        var _a;
        this.removeEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
        this.removeEventListener(PointerClickEvent.eventName, this.boundOnClickHandler);
        this.removeEventListener(PointerDblClickEvent.eventName, this.boundOnDblClickHandler);
        this.removeEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
        this.removeEventListener(GridStartCellEditingRequestCompleteEvent.eventName, this.boundOnStartCellEditingRequestCompleteHandler);
        (_a = this.getScrollViewer()) === null || _a === void 0 ? void 0 : _a.unsubscribeFromScroll();
        document.removeEventListener("keydown", this.boundOnDocumentKeyDownHandler);
        if (browser.Browser.Firefox)
            this.removeEventListener("mousedown", this.boundOnMouseDownHandler);
    }
    onDragStart(evt) {
        var _a, _b, _c;
        const srcElement = evt.target;
        const eventSource = evt.detail.source;
        if (this.isResizeAnchor(srcElement)) {
            const cell = this.findHeaderElement(srcElement);
            const columnIndex = this.findLeafIndex(cell);
            (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.startDrag(columnIndex, eventSource.pageX);
        }
        else if (this.isHeaderContentElement(srcElement)) {
            const headerElement = this.findHeaderElement(srcElement);
            if (headerElement) {
                this.columnDraggingHelper.start(headerElement, eventSource);
                (_b = this.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.startAutoScrolling(ScrollViewerAutoScrollingMode.Horizontal, (evt) => this.columnDraggingHelper.updateDraggableContextByEvent(evt));
            }
        }
        else if (this.isRowDragAnchor(eventSource.target)) {
            const anchor = eventSource.target;
            const rowVisibleIndex = this.getRowVisibleIndexByTarget(anchor, this.enableInplaceEditing);
            const rowElement = this.getMainElement().querySelector(`tr[${GridAttributes.VisibleIndexName}="${rowVisibleIndex}"]`);
            if (rowElement)
                this.rowDraggingHelper.start(rowElement, eventSource);
        }
        else {
            this.selectionHelper.start(eventSource.target, !eventSource.ctrlKey && !eventSource.metaKey && !evt.detail.isLongTap);
            (_c = this.getScrollViewer()) === null || _c === void 0 ? void 0 : _c.startAutoScrolling(ScrollViewerAutoScrollingMode.Vertical, (evt) => this.selectionHelper.updateSeletionByEvent(evt), (rect) => {
                const tableElement = this.getDataTable();
                if (tableElement) {
                    const headerElement = tableElement.querySelector("thead");
                    if (headerElement) {
                        rect.y += headerElement.offsetHeight;
                        rect.height -= headerElement.offsetHeight;
                    }
                    const footerElement = tableElement.querySelector("tfoot");
                    if (footerElement)
                        rect.height -= footerElement.offsetHeight;
                }
            });
        }
        evt.stopPropagation();
    }
    onDragStop(evt) {
        var _a, _b;
        if ((_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.isResizing)
            this.columnResizeStrategy.stopDrag();
        else if (this.columnDraggingHelper.isStarted()) {
            const args = this.columnDraggingHelper.createColumnDraggedHandlerArgs();
            this.columnDraggingHelper.stop();
            this.onColumnDragged(args);
        }
        else if (this.rowDraggingHelper.isStarted()) {
            const args = this.rowDraggingHelper.createItemDraggedHandlerArgs();
            this.rowDraggingHelper.stop();
            this.onRowDragged(args);
        }
        else if (this.selectionHelper.isStarted()) {
            if (this.uiHandlersBridge && this.selectionHelper.startSelectionRowIndex > -1 && this.selectionHelper.endSelectionRowIndex > -1) {
                const args = {
                    startVisibleIndex: this.selectionHelper.startSelectionRowIndex,
                    endVisibleIndex: this.selectionHelper.endSelectionRowIndex,
                    cleanSelection: !evt.detail.source.ctrlKey && !evt.detail.source.metaKey && !evt.detail.isLongTap
                };
                this.uiHandlersBridge.send("rowDragged", args);
            }
            this.selectionHelper.stop();
        }
        (_b = this.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.stopAutoScrolling();
        evt.stopPropagation();
    }
    onDragCancel(evt) {
        var _a, _b;
        if ((_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.isResizing)
            this.columnResizeStrategy.cancelDrag();
        else if (this.columnDraggingHelper.isStarted())
            this.columnDraggingHelper.stop();
        else if (this.rowDraggingHelper.isStarted())
            this.rowDraggingHelper.stop();
        else if (this.selectionHelper.isStarted())
            this.selectionHelper.stop();
        (_b = this.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.stopAutoScrolling();
        evt.stopPropagation();
    }
    allowInplaceEditingOnCellElementClick(targetElement) {
        return true;
    }
    onClick(evt) {
        const srcElement = evt.target;
        const targetElement = evt.detail.source.target;
        const isLeftButton = evt.detail.source.button === 0;
        if (this.isResizeAnchor(srcElement))
            evt.detail.source.stopPropagation();
        else if (isLeftButton && this.enableInplaceEditing) {
            const cellInfo = this.getCellInfo(targetElement);
            if (cellInfo !== null && this.allowInplaceEditingOnCellElementClick(targetElement))
                this.requestStartCellEditing(cellInfo);
        }
    }
    requestStartCellEditing(cellInfo) {
        if (!this.keyboardNavigator)
            return;
        if (cellInfo === null || cellInfo.type === GridCellType.Edit)
            return;
        if (cellInfo.type === GridCellType.Data)
            this.setFocusedRowVisible(false);
        const eventDetails = new GridRequestStartCellEditingContext(cellInfo);
        setTimeout(() => this.dispatchEvent(new GridRequestStartCellEditingEvent(eventDetails)), 0);
    }
    onStartCellEditingRequestComplete() {
        this.setFocusedRowVisible(true);
    }
    onDblClick(evt) {
        var _a;
        const srcElement = evt.target;
        if (this.isResizeAnchor(srcElement)) {
            evt.stopPropagation();
            const cell = this.findHeaderElement(srcElement);
            const columnIndex = this.findLeafIndex(cell);
            (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.autoFitColumnWidth(columnIndex);
        }
    }
    onScrollViewerUpdate(evt) {
        const scrollViewerContent = this.getScrollViewerContent();
        const dataTable = this.getDataTable();
        if (dataTable) {
            if (scrollViewerContent) {
                if (dataTable.offsetHeight < scrollViewerContent.clientHeight)
                    dom.DomUtils.addClassName(dataTable, GridCssClasses.DataTableNoScrollClassName);
                else if (dataTable.offsetHeight > scrollViewerContent.clientHeight)
                    dom.DomUtils.removeClassName(dataTable, GridCssClasses.DataTableNoScrollClassName);
            }
            this.updateTopFixedBodyPosition(dataTable);
        }
        evt.stopPropagation();
    }
    onScrollViewerScroll() {
        this.styleGenerator.scrollPositionUpdated(this.getScrollViewerContent());
    }
    getRowVisibleIndexByTarget(targetElement, ignoreEditRowCheck) {
        let element = targetElement;
        while (element && element !== this) {
            if (!ignoreEditRowCheck && element.classList.contains(GridCssClasses.EditRowClassName))
                break;
            if (element.tagName.toLowerCase() === "tr" && element.dataset.visibleIndex)
                return parseInt(element.dataset.visibleIndex);
            element = element.parentElement;
        }
        return -1;
    }
    get allowSelectRowByClick() {
        return this._allowSelectRowByClick;
    }
    set allowSelectRowByClick(value) {
        this._allowSelectRowByClick = value;
        this.updateHandlePointerEventsMode();
    }
    get enableMultiSelect() {
        return this._enableMultiSelect;
    }
    set enableMultiSelect(value) {
        this._enableMultiSelect = value;
        this.updateHandlePointerEventsMode();
    }
    get enableFocusedRow() {
        return this._enableFocusedRow;
    }
    set enableFocusedRow(value) {
        this._enableFocusedRow = value;
        this.updateHandlePointerEventsMode();
    }
    get enableRowDrag() {
        return this._enableRowDrag;
    }
    set enableRowDrag(value) {
        this._enableRowDrag = value;
        this.updateHandlePointerEventsMode();
    }
    get enableItemDrop() {
        return this._enableItemDrop;
    }
    set enableItemDrop(value) {
        this._enableItemDrop = value;
        this.onItemDropStateChanged();
    }
    get enablePositionalItemDrop() {
        return this._enablePositionalItemDrop;
    }
    get enableInplaceEditing() {
        return this._enableInplaceEditing;
    }
    set enableInplaceEditing(value) {
        this._enableInplaceEditing = value;
        this.updateHandlePointerEventsMode();
    }
    get isEditing() {
        return this._isEditing;
    }
    set isEditing(value) {
        this._isEditing = value;
    }
    get focusedRowIndex() {
        return this._focusedRowIndex;
    }
    set focusedRowIndex(value) {
        this._focusedRowIndex = value;
    }
    get keyboardNavigationEnabled() {
        return !!this.keyboardNavigator;
    }
    get hasRowClickEvent() {
        return this._hasRowClickEvent;
    }
    set hasRowClickEvent(value) {
        this._hasRowClickEvent = value;
        this.updateHandlePointerEventsMode();
    }
    get hasRowDblClickEvent() {
        return this._hasRowDblClickEvent;
    }
    set hasRowDblClickEvent(value) {
        this._hasRowDblClickEvent = value;
        this.updateHandlePointerEventsMode();
    }
    get columnsInfo() {
        return this._columnsInfo;
    }
    get headerLayout() {
        return this._headerLayout;
    }
    get styleGenerator() {
        return this._styleGenerator;
    }
    get editorManager() {
        return this._editorManager;
    }
    get uiHandlersBridge() {
        return this._uiHandlersBridge;
    }
    get uId() {
        return this.getAttribute(DxGridUidAttributeName);
    }
    updateHandlePointerEventsMode() {
        this.handlePointerEventsMode = HandlePointerEventsMode.None;
        if (this.hasRowClickEvent || this.enableFocusedRow || this.enableInplaceEditing)
            this.handlePointerEventsMode |= HandlePointerEventsMode.Click;
        if (this.hasRowDblClickEvent)
            this.handlePointerEventsMode |= HandlePointerEventsMode.DblClick;
        if (this.enableRowDrag)
            this.handlePointerEventsMode |= HandlePointerEventsMode.Dragging;
        if (this.allowSelectRowByClick) {
            this.handlePointerEventsMode |= HandlePointerEventsMode.Click;
            if (this.enableMultiSelect && browser.Browser.TouchUI)
                this.handlePointerEventsMode |= HandlePointerEventsMode.Dragging;
        }
    }
    makeRowVisible(visibleIndex) {
        if (this.uiHandlersBridge && visibleIndex >= 0) {
            const args = { visibleIndex: visibleIndex };
            this.uiHandlersBridge.send("makeRowVisible", args);
        }
    }
    notifyFocusedRowChanged(visibleIndex) {
        if (visibleIndex === this.focusedRowIndex)
            return;
        if (this.enableFocusedRow && this.uiHandlersBridge) {
            this.focusedRowIndex = visibleIndex;
            const args = { visibleIndex: visibleIndex };
            this.uiHandlersBridge.send("focusedRowChanged", args);
        }
    }
    notifyColumnsInitialized(columnsInfo, headerLayout) {
        this._columnsInfo = columnsInfo;
        this._headerLayout = headerLayout;
    }
    notifyColumnsChanged(columnsInfo, headerLayout) {
        this._columnsInfo = columnsInfo;
        this._headerLayout = headerLayout;
        this.correctWidths(GridUpdateWidthsReason.ColumnsChanged);
    }
    notifyColumnResizeAnchorFocus(anchor) {
        var _a;
        const cell = this.findHeaderElement(anchor);
        const columnIndex = this.findLeafIndex(cell);
        (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.anchorFocused(columnIndex);
    }
    notifyColumnResizeAnchorBlur() {
        var _a;
        (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.anchorUnfocused();
    }
    notifyColumnResizeAnchorMove(direction) {
        var _a;
        (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.performMoveStep(direction);
    }
    updateEmptyColumnVisibility() {
        this.columnWidthsController.updateEmptyColumnVisibility();
    }
    autoFitColumnWidthsLegacy(useRelativeWidth = false) {
        this.columnWidthsController.autoFitColumnWidthsLegacy(useRelativeWidth);
    }
    autoFitColumnWidths() {
        this.columnWidthsController.autoFitColumnWidths();
    }
    updateTopFixedBodyPosition(dataTable) {
        const tableHeader = dataTable.querySelector(":scope > thead");
        const fixedTableBody = dataTable.querySelector(`:scope > tbody.${GridCssClasses.TopFixedBodyClassName}`);
        if (tableHeader && fixedTableBody)
            fixedTableBody.style.top = window.getComputedStyle(tableHeader).height;
    }
    correctWidths(reasonToCorrectWidths) {
        var _a;
        if ((_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.isResizing)
            return;
        this.columnWidthsController.correctWidths(reasonToCorrectWidths);
        const scrollViewer = this.getScrollViewer();
        scrollViewer && scrollViewer.refreshUI && scrollViewer.refreshUI();
    }
    getElementIndex(element) {
        if (!element)
            return -1;
        if (element instanceof HTMLTableCellElement)
            return element.cellIndex;
        if (element && element.parentElement) {
            for (let i = 0; i < element.parentElement.children.length; i++) {
                if (element.parentElement.children[i] === element)
                    return i;
            }
        }
        return -1;
    }
    getColumnInfo(element) {
        const headerElement = this.findHeaderElement(element);
        const cellIndex = this.getElementIndex(headerElement);
        if (cellIndex >= 0) {
            const headerRows = Array.from(this.getHeaderRows());
            const headerRowIndex = headerRows.findIndex(row => row === headerElement.parentElement);
            let columnInfoArray = this.columnsInfo;
            if (headerRowIndex >= 0)
                columnInfoArray = this.headerLayout[headerRowIndex];
            if (cellIndex < columnInfoArray.length)
                return columnInfoArray[cellIndex];
        }
        return null;
    }
    getCellInfo(element) {
        return GridCellInfo.fromElement(this, element);
    }
    getCellElement(element) {
        return GridCellInfo.getCellElement(this, element);
    }
    getColumnInfoByCell(element) {
        if (element instanceof HTMLElement) {
            const cellIndex = this.getElementIndex(element);
            if (cellIndex >= 0 && cellIndex < this.columnsInfo.length)
                return this.columnsInfo[cellIndex];
        }
        return null;
    }
    getColumnUID(element) {
        const columnInfo = this.getColumnInfo(element);
        return columnInfo ? columnInfo.uID : -1;
    }
    findHeaderElement(innerHeaderElement) {
        const innerElement = innerHeaderElement;
        if (!innerElement)
            return null;
        if (this.isHeaderElement(innerElement))
            return innerElement;
        return innerElement.closest(`.${GridCssClasses.HeaderElementClassName}`);
    }
    findHeaderCellByColumnIndex(columnIndex) {
        const columnInfo = this.columnsInfo[columnIndex];
        return this.getHeaderCell(columnInfo.headerRowIndex, columnInfo.headerCellIndex);
    }
    getHeaderCell(rowIndex, cellIndex) {
        var _a, _b;
        return (_b = (_a = this.getHeaderRow(rowIndex)) === null || _a === void 0 ? void 0 : _a.cells[cellIndex]) !== null && _b !== void 0 ? _b : null;
    }
    findLeafIndex(headerElement) {
        let columnInfo = this.getColumnInfo(headerElement);
        if (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.hasLeafs)
            columnInfo = columnInfo.getRightLeaf();
        return columnInfo ? columnInfo.leafIndex : -1;
    }
    getHeaderRow(rowIndex) {
        return this.getHeaderRows().item(rowIndex);
    }
    isHeaderElement(element) {
        const htmlElement = element;
        return htmlElement && htmlElement.classList.contains(GridCssClasses.HeaderElementClassName);
    }
    isHeaderContentElement(element) {
        return element.tagName.toLowerCase() === DxGridHeaderContentTagName;
    }
    isResizeAnchor(element) {
        return element.classList.contains(GridCssClasses.ColumnsResizeAnchorClassName);
    }
    isRowDragAnchor(element) {
        return element.classList.contains(GridCssClasses.RowDragAnchorClassName);
    }
    onItemDropStateChanged() {
        this.rowDraggingHelper.initItemDropTarget(this.enableItemDrop);
    }
    onDocumentKeyDown(evt) {
        if (this.keyboardNavigationEnabled)
            return;
        if (evt.key === "Enter" || evt.key === " ") {
            const headerElement = this.findHeaderElement(evt.target);
            if (headerElement) {
                const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: evt.ctrlKey, metaKey: evt.metaKey, shiftKey: evt.shiftKey });
                headerElement.dispatchEvent(clickEvent);
            }
        }
    }
    onMouseDown(evt) {
        if (evt.ctrlKey)
            evt.preventDefault();
    }
    onColumnChooserItemDragged(columnUid, beforeColumnUid) {
        this.onColumnDragged({ columnUid: columnUid, beforeColumnUid: beforeColumnUid, srcArea: GridDraggingArea.ColumnChooser, dropArea: GridDraggingArea.ColumnChooser });
    }
    onRowDragged(args) {
        if (args && this.uiHandlersBridge)
            this.uiHandlersBridge.send("rowDropped", args);
    }
    onColumnDragged(args) {
        if (args && this.uiHandlersBridge)
            this.uiHandlersBridge.send("columnHeaderDragged", args);
    }
    onColumnWidthsChanged(uids, widths) {
        const args = { columnUids: uids, widths: widths };
        if (this.uiHandlersBridge)
            this.uiHandlersBridge.send("columnWidthsChanged", args);
    }
    onSizeChanged(entries) {
        const isInitResize = this.currentWidth === -1;
        const newWidth = entries[0].contentRect.width;
        if (this.currentWidth !== newWidth && newWidth > 0) {
            this.correctWidths(isInitResize ? GridUpdateWidthsReason.ColumnsChanged : GridUpdateWidthsReason.GridResize);
            this.currentWidth = newWidth;
        }
    }
    getContentTemplate() {
        return Template;
    }
    static get observedAttributes() {
        return [
            "allow-select-row-by-click", "enable-multi-select", "has-row-click-event", "has-row-dbl-click-event",
            "resize-mode", "enable-focused-row", "enable-inplace-editing", "is-editing", "request-auto-fit-column-widths",
            "focus-pending-editor-column-uid", "is-pending-editor-show", "focused-row-index",
            "enable-row-drag", "enable-item-drop", "enable-positional-item-drop", "has-fixed-on-top-body"
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        var _a;
        switch (name) {
            case "allow-select-row-by-click":
                this.allowSelectRowByClick = newVal !== null;
                break;
            case "enable-focused-row":
                this.enableFocusedRow = newVal !== null;
                break;
            case "enable-multi-select":
                this.enableMultiSelect = newVal !== null;
                break;
            case "enable-inplace-editing":
                this.enableInplaceEditing = newVal != null;
                break;
            case "enable-row-drag":
                this.enableRowDrag = newVal !== null;
                break;
            case "enable-item-drop":
                this.enableItemDrop = newVal !== null;
                break;
            case "enable-positional-item-drop":
                this._enablePositionalItemDrop = newVal !== null;
                break;
            case "has-row-click-event":
                this.hasRowClickEvent = newVal !== null;
                break;
            case "has-row-dbl-click-event":
                this.hasRowDblClickEvent = newVal !== null;
                break;
            case "is-editing":
                this.isEditing = newVal !== null;
                break;
            case "focused-row-index":
                this.focusedRowIndex = parseInt(newVal);
                break;
            case "resize-mode":
                (_a = this.columnResizeStrategy) === null || _a === void 0 ? void 0 : _a.cancelDrag();
                this.ensureColumnResizeStrategy();
                break;
            case "is-pending-editor-show":
                this.editorManager.notifyPendingEditorShow(newVal !== null);
                break;
            case "has-fixed-on-top-body":
                if (newVal !== null) {
                    const dataTable = this.getDataTable();
                    if (dataTable)
                        setTimeout(() => this.updateTopFixedBodyPosition(dataTable));
                }
                break;
            case "focus-pending-editor-column-uid":
                if (newVal !== null)
                    this.requestFocusEditor(parseInt(newVal));
                break;
            case "request-auto-fit-column-widths":
                if (newVal) {
                    const args = JSON.parse(newVal);
                    if (args[0] && args[0] !== this._latestAutoFitColumnWidthsRequestGuid) {
                        this._latestAutoFitColumnWidthsRequestGuid = args[0];
                        if (args.length === 2) {
                            const useRelativeWidth = args[1];
                            setTimeout(() => {
                                this.autoFitColumnWidthsLegacy(useRelativeWidth);
                            });
                        }
                        else {
                            setTimeout(() => {
                                this.autoFitColumnWidths();
                            });
                        }
                    }
                }
                break;
        }
    }
    ensureColumnResizeStrategy() {
        const resizeMode = this.getAttribute("resize-mode");
        if (!resizeMode) {
            this.columnResizeStrategy = undefined;
            return;
        }
        if (resizeMode === "next-column")
            this.columnResizeStrategy = new NextColumnResizeStrategy(this);
        else
            this.columnResizeStrategy = new ColumnContainerResizeStrategy(this);
    }
    requestFocusEditor(editorColumnUid) {
        setTimeout(() => this.focusEditor(editorColumnUid), 0);
    }
    focusEditor(editorColumnUid) {
        const uid = this.uId;
        if (uid === null)
            return;
        const editRow = this.querySelector(GridSelectors.getBodyEditRowSelector(uid, this.getTagName()));
        if (editRow === null)
            return;
        let editCell = null;
        for (const cell of editRow.cells) {
            const cellInfo = this.getCellInfo(cell);
            if (cellInfo !== null && cellInfo.columnInfo.uID === editorColumnUid && cellInfo.type === GridCellType.Edit) {
                editCell = cell;
                break;
            }
        }
        if (editCell === null)
            return;
        const focusableElements = FocusUtils.findFocusableElements(editCell);
        const focusableElement = focusableElements.length > 0 ? focusableElements[0] : null;
        if (!focusableElement)
            return;
        focusableElement.focus();
        const scrollViewer = this.getScrollViewer();
        const scrollViewerContent = this.getScrollViewerContent();
        if (scrollViewer && scrollViewerContent)
            GridScrollUtils.alignElementVertically(focusableElement, scrollViewer, scrollViewerContent);
        GridEditorUtils.selectInputValue(focusableElement);
    }
    setFocusedRowVisible(visible) {
        if (!visible) {
            if (this.enableFocusedRow)
                this.setAttribute(GridAttributes.FocusedRowHidden, "");
            clearTimeout(this.focusedRowRestoreVisibilityTimerId);
            this.focusedRowRestoreVisibilityTimerId = setTimeout(() => this.setFocusedRowVisible(true), this.focusedRowRestoreVisibilityTimeout);
        }
        else {
            clearTimeout(this.focusedRowRestoreVisibilityTimerId);
            this.focusedRowRestoreVisibilityTimerId = undefined;
            if (this.hasAttribute(GridAttributes.FocusedRowHidden))
                this.removeAttribute(GridAttributes.FocusedRowHidden);
        }
    }
    static findGrid(gridUid) {
        let result = document.querySelector(`${DxGridTagName}[${DxGridUidAttributeName}="${gridUid}"]`);
        if (!result)
            result = document.querySelector(`${DxTreeListTagName}[${DxGridUidAttributeName}="${gridUid}"]`);
        return result;
    }
}
customElements.define(DxGridHeaderContentTagName, DxGridHeaderContent);
customElements.define(DxGridColumnsInfoTagName, DxGridColumnsInfo);
customElements.define(DxGridDropRestrictionsInfoTagName, DxGridDropRestrictionsInfo);
customElements.define(DxColumnResizeAnchorTagName, DxColumnResizeAnchor);
customElements.define(DxColumnResizeSeparatorTagName, DxColumnResizeSeparator);
customElements.define(DxGridColumnChooserTagName, DxGridColumnChooser);
customElements.define(DxDropTargetIndicatorTagName, DxDropTargetIndicator);
customElements.define(DxDragHintTagName, DxDragHint);

class DxGrid extends DxGridBase {
    constructor() {
        super();
    }
    getTagName() {
        return DxGridTagName;
    }
    createRowDraggingHelper() {
        return new GridRowDraggingHelper(this);
    }
}
customElements.define(DxGridTagName, DxGrid);
function loadModule() { }
const dxGrid = { loadModule };

const dxGrid$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DxGridTagName,
    DxGridUidAttributeName: DxGridUidAttributeName$1,
    DxGrid,
    default: dxGrid
});

export { DxGridBase as D, GridSelectors as G, GridRowDraggingHelperBase as a, GridDropPosition as b, GridDataRowKbdStrategy as c, GridInplaceEditRowKbdStrategy as d, GridDataTableKbdStrategy as e, GridDataTableBodyKbdStrategy as f, GridDataTableBodyWithVirtualScrollKbdStrategy as g, GridRootKbdStrategy as h, GridEditorManager as i, DxTreeListTagName as j, dxGrid$1 as k };
//# sourceMappingURL=dx-grid-24.2.js.map
