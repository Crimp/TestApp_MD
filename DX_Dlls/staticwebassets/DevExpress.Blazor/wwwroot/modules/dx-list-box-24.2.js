import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { o as listBoxTagName } from './constants-24.23.js';
import { H as HorizontalAlign, V as VerticalAlign, a as ScrollViewerVisibleElementChangedEvent, D as DxScrollViewer, b as ScrollViewerUpdateEvent } from './dx-scroll-viewer-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { L as ListBoxAttributes, a as ListBoxKbdNavigationUtils, b as ListBoxSelectors, c as ListBoxCssClasses, d as ListBoxFocusedRowChangedEvent, e as ListBoxMakeElementVisibleEvent } from './dx-list-box-events-24.2.js';
import { d as dom } from './dom-24.2.js';
import { b as browser } from './browser-24.2.js';
import { k as key } from './key-24.2.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils } from './keyboard-navigation-strategy-24.2.js';
import { D as DomHelper } from './layouthelper-24.2.js';
import { addFocusHiddenAttribute, removeFocusHiddenAttribute } from './focus-utils-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { a as DxVirtualScrollViewer } from './dx-virtual-scroll-viewer-24.2.js';
import { e } from './custom-element-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './property-24.2.js';
import './css-classes-24.2.js';
import './text-editor-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './grid-scroll-utils-24.2.js';
import './screenhelper-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './focushelper-24.2.js';
import './constants-24.2.js';
import './dom-utils-24.2.js';
import './point-24.2.js';
import './disposable-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './thumb-24.2.js';

class ListBoxKbdStrategyBase extends KeyboardNavigationStrategy {
    constructor(component, targetElement) {
        super(component.getKeyboardNavigator(), targetElement);
        this.component = component;
    }
    getTable() {
        return this.component.getTable();
    }
    getList() {
        return this.component.getList();
    }
    getSearchBox() {
        return this.component.getSearchBox();
    }
    getScrollViewer() {
        return this.component.getScrollViewer();
    }
    getScrollViewerContent() {
        return this.component.getScrollViewerContent();
    }
    getColumnInfoByCell(element) {
        return this.component.getColumnInfoByCell(element);
    }
    get isFocusedRowEnabled() {
        return this.component.enableFocusedRow;
    }
    get isMultipleSelectionEnabled() {
        return this.component.enableMultipleSelection;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    handleTabKeyDown(evt, allowAltKey = false) {
        if (!allowAltKey && evt.altKey)
            return false;
        if (evt.shiftKey) {
            if (this.firstItemSelected)
                return false;
            this.moveToPrevItem();
        }
        else {
            if (this.lastItemSelected)
                return false;
            this.moveToNextItem();
        }
        return true;
    }
}
class ListBoxItemKbdStrategyBase extends ListBoxKbdStrategyBase {
    constructor(containerStrategy, listBox, targetElement) {
        super(listBox, targetElement);
        this.lockScroll = 0;
        this.containerStrategy = containerStrategy;
    }
    isImmediatelyClickEnabled() {
        return false;
    }
    get preventScrollOnFocus() {
        return this.lockScroll > 0;
    }
    getVisibleIndex() {
        return DomHelper.getAttributeIntValue(this.targetElement, ListBoxAttributes.VisibleIndexAttributeName, -1);
    }
    leave() {
        FocusUtils.removeTabIndex(this.selectedItemElement);
    }
    lockScrollOnFocus() {
        this.lockScroll++;
    }
    unlockScrollOnFocus() {
        this.lockScroll--;
    }
    getShortcutContext() {
        return {
            ElementType: this.getElementType(),
            VisibleIndex: this.getVisibleIndex()
        };
    }
}
class ListBoxItemsContainerKbdStrategyBase extends ListBoxKbdStrategyBase {
    constructor(component, targetElement) {
        super(component, targetElement);
        this.savedVisibleIndex = -1;
        this.selectedVisibleIndex = -1;
        this.firstVisibleIndex = -1;
        this.lastVisibleIndex = -1;
        this.firstAvailableVisibleIndex = 0;
        this.lastAvailableVisibleIndex = -1;
        this.requestRestoreSelectedElementIndex = -1;
        this.boundOnVisibleElementChangedHandler = this.onMakeRowVisible.bind(this);
        this._rows = [];
        this.addEventSubscriptions();
    }
    get enableVirtualRenderMode() {
        return this.component.enableVirtualRenderMode;
    }
    get isFirstItemSelected() {
        return this.selectedVisibleIndex <= this.firstAvailableVisibleIndex;
    }
    get isLastItemSelected() {
        return this.selectedVisibleIndex >= this.lastAvailableVisibleIndex;
    }
    get totalItemCount() {
        const virtualItemsCount = this.component.virtualItemCount;
        return virtualItemsCount >= 0 ? virtualItemsCount : this._rows.length;
    }
    get preventScrollOnFocus() {
        return this.enableVirtualRenderMode;
    }
    updateSelectedItemByChildElement(childElement, evt = null) {
        const index = this.findItemElementIndexByChild(childElement);
        if (index < 0)
            return;
        const isMouseEvent = evt instanceof MouseEvent;
        if (isMouseEvent)
            this.selectedVisibleIndex = ListBoxKbdNavigationUtils.getElementVisibleIndex(this.items[index]);
        if (this.enableVirtualRenderMode) {
            if (!isMouseEvent && index !== this.selectedItemIndex && this.isElementInsideViewport(this.selectedVisibleIndex))
                this.requestRestoreSelectedElementIndex = this.selectedVisibleIndex;
            this.updateSelectedItemByIndex(index);
            return;
        }
        super.updateSelectedItemByChildElement(childElement, evt);
    }
    initialize() {
        super.initialize();
        this._rows = this.queryRows();
        this.resetState();
        this.updateBoundaries();
        this.updateViewportBoundaries();
    }
    activate() {
        if (!this.enableVirtualRenderMode) {
            super.activate();
            return;
        }
        if (this.requestRestoreSelectedElementIndex > -1) {
            this.notifyMakeElementVisible(this.requestRestoreSelectedElementIndex, null);
            this.requestRestoreSelectedElementIndex = -1;
        }
        else if (this.selectedVisibleIndex > -1) {
            if (this.isElementInsideViewport(this.selectedVisibleIndex)) {
                const itemIndex = ListBoxKbdNavigationUtils.findItemIndex(this.selectedVisibleIndex, this.items);
                if (itemIndex > -1)
                    this.selectViewportItem(itemIndex);
            }
            else
                addFocusHiddenAttribute(this.targetElement);
        }
        else
            this.selectViewportItem(this.selectedItemIndex);
    }
    onDispose() {
        this._rows = [];
        this.resetState();
        this.removeEventSubscriptions();
        super.onDispose();
    }
    getSelectedItemStrategy() {
        return super.getSelectedItemStrategy();
    }
    selectItem(index) {
        const prevItemStrategy = this.getSelectedItemStrategy();
        const newItemStrategy = this.getStrategy(index);
        const visibleIndex = newItemStrategy.getVisibleIndex();
        this.selectedVisibleIndex = visibleIndex;
        this.savedVisibleIndex = visibleIndex;
        removeFocusHiddenAttribute(this.targetElement);
        super.selectItem(index);
        if (prevItemStrategy && prevItemStrategy !== newItemStrategy)
            prevItemStrategy.leave();
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Up:
                return this.handleArrowUpKeyDown();
            case key.KeyCode.Down:
                return this.handleArrowDownKeyDown();
            case key.KeyCode.PageDown:
                return this.handlePageDown();
            case key.KeyCode.PageUp:
                return this.handlePageUp();
            case key.KeyCode.Home:
                if (!this.handleHomeKeyDown(evt))
                    this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.End:
                if (!this.handleEndKeyDown(evt))
                    this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Space:
                this.performShortcutEvent(evt);
                return true;
        }
        return false;
    }
    handleKeyUp(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
            case key.KeyCode.Up:
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
            case key.KeyCode.Home:
            case key.KeyCode.End:
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
        super.moveToNextItem();
        this.scrollToElement(null, HorizontalAlign.None);
    }
    selectViewportItem(index) {
        const itemStrategy = this.getStrategy(index);
        itemStrategy.lockScrollOnFocus();
        this.selectItem(index);
        itemStrategy.unlockScrollOnFocus();
    }
    moveToPrevVirtualItem() {
        let visibleIndex = this.selectedVisibleIndex - 1;
        const isFirstGroupRow = visibleIndex === 0 && this.selectedItemIndex === 0;
        if (isFirstGroupRow)
            return;
        if (this.isElementInsideViewport(visibleIndex) && ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex))
            visibleIndex--;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex > 0) {
            this.selectViewportItem(this.selectedItemIndex - 1);
            this.scrollToElement(null, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
    }
    moveToNextVirtualItem() {
        let visibleIndex = this.selectedVisibleIndex + 1;
        if (this.isElementInsideViewport(visibleIndex) && ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex))
            visibleIndex++;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex < this.totalItemCount - 1) {
            this.selectViewportItem(this.selectedItemIndex + 1);
            this.scrollToElement(null, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
    }
    handleArrowUpKeyDown() {
        if (this.isFirstItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToPrevVirtualItem();
        else
            this.moveToPrevItem();
        return true;
    }
    handleArrowDownKeyDown() {
        if (this.isLastItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToNextVirtualItem();
        else
            this.moveToNextItem();
        return true;
    }
    handleHomeKeyDown(evt) {
        this.savedVisibleIndex = -1;
        if (this.isFirstItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToFirstVirtualItem();
        else
            this.moveToFirstItem();
        return !(evt.ctrlKey && evt.shiftKey);
    }
    moveToFirstItem() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer) {
            const isFirstGroupItem = ListBoxKbdNavigationUtils.isGroupRow(this, 0);
            this.selectItem(0);
            const rowToScroll = !isFirstGroupItem ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, 0);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToFirstVirtualItem() {
        const visibleIndex = 0;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex > 0) {
            this.selectViewportItem(0);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
    }
    handleEndKeyDown(evt) {
        this.savedVisibleIndex = -1;
        if (this.isLastItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToLastVirtualItem();
        else
            this.moveToLastItem();
        return !(evt.ctrlKey && evt.shiftKey);
    }
    moveToLastItem() {
        const scrollViewer = this.component.getScrollViewer();
        if (scrollViewer) {
            this.selectItem(this.itemCount - 1);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None);
        }
    }
    moveToLastVirtualItem() {
        const visibleIndex = this.totalItemCount - 1;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex < this.itemCount - 1) {
            this.selectViewportItem(this.itemCount - 1);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
    }
    handlePageUp() {
        this.savedVisibleIndex = -1;
        if (this.isFirstItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToPrevVirtualPageItem();
        else
            this.moveToPrevPageItem();
        return true;
    }
    moveToPrevPageItem() {
        const scrollViewer = this.component.getScrollViewer();
        if (scrollViewer) {
            const boundaryItemIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, false);
            const visibleIndex = boundaryItemIndex < 0 ? 0 : boundaryItemIndex;
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.selectItem(index);
            const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToPrevVirtualPageItem() {
        const scrollViewer = this.component.getScrollViewer();
        if (scrollViewer) {
            const visibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, false);
            if (this.isElementInsideViewport(visibleIndex)) {
                const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
                const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
                const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
                this.selectViewportItem(index);
                const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
                this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
            }
            else
                this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
        }
    }
    handlePageDown() {
        this.savedVisibleIndex = -1;
        if (this.isLastItemSelected)
            return false;
        if (this.enableVirtualRenderMode)
            this.moveToNextVirtualPageItem();
        else
            this.moveToNextPageItem();
        return true;
    }
    moveToNextPageItem() {
        const lastItemIndex = this.lastAvailableVisibleIndex;
        const scrollViewer = this.component.getScrollViewer();
        if (scrollViewer) {
            const boundaryItemVisibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, true);
            const visibleIndex = boundaryItemVisibleIndex > lastItemIndex ? lastItemIndex : boundaryItemVisibleIndex;
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex - 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.selectItem(index);
            const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToNextVirtualPageItem() {
        const scrollViewer = this.component.getScrollViewer();
        if (scrollViewer) {
            const visibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, true);
            if (this.isElementInsideViewport(visibleIndex)) {
                const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
                const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex - 1;
                const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
                this.selectViewportItem(index);
                const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
                this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None, rowToScroll);
            }
            else
                this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
        }
    }
    onMakeRowVisible(evt) {
        if (evt.detail.isFocusRequired) { // TODO tech debt
            const visibleIndex = ListBoxKbdNavigationUtils.getElementVisibleIndex(evt.detail.element);
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.selectItem(index);
        }
    }
    addEventSubscriptions() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            scrollViewer.addEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
    }
    removeEventSubscriptions() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer)
            scrollViewer.removeEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
    }
    getStrategy(index) {
        return this.getItemStrategy(index);
    }
    notifyFocusedRowChanged() {
        if (this.isFocusedRowEnabled && this.savedVisibleIndex > -1) {
            this.component.notifyFocusedRowChanged(this.savedVisibleIndex);
            this.savedVisibleIndex = -1;
        }
    }
    scrollToElement(alignVert, alignHor, targetElement = this.selectedItemElement) {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer && targetElement)
            DxScrollViewer.scrollToElementRelyOnStickyDescendants(targetElement, alignVert, alignHor, scrollViewer);
    }
    notifyMakeElementVisible(visibleIndex, edge = null) {
        if (visibleIndex < 0)
            return;
        this.component.notifyMakeElementVisible(visibleIndex, ListBoxKbdNavigationUtils.getVerticalEdge(edge));
    }
    updateBoundaries() {
        this.firstAvailableVisibleIndex = 0;
        this.lastAvailableVisibleIndex = this.totalItemCount - 1;
    }
    updateViewportBoundaries() {
        if (this._rows.length === 0)
            return;
        const firstItem = this._rows[0];
        this.firstVisibleIndex = ListBoxKbdNavigationUtils.getElementVisibleIndex(firstItem);
        const lastItem = this._rows[this._rows.length - 1];
        this.lastVisibleIndex = ListBoxKbdNavigationUtils.getElementVisibleIndex(lastItem);
    }
    queryRows() {
        return Array.from(this.targetElement.querySelectorAll(ListBoxSelectors.VisibleItemSelector));
    }
    isElementInsideViewport(visibleIndex) {
        return visibleIndex >= this.firstVisibleIndex && visibleIndex <= this.lastVisibleIndex;
    }
    resetState() {
        this.firstAvailableVisibleIndex = -1;
        this.lastAvailableVisibleIndex = -1;
        this.firstVisibleIndex = -1;
        this.lastVisibleIndex = -1;
    }
    getLastAvailableVisibleIndex() {
        return this.lastAvailableVisibleIndex;
    }
    getSelectedVisibleIndex() {
        return this.selectedVisibleIndex;
    }
    getItemsContainer() {
        return this.targetElement;
    }
    getRows() {
        return this._rows;
    }
}

var ListBoxElementType;
(function (ListBoxElementType) {
    ListBoxElementType[ListBoxElementType["Undefined"] = 0] = "Undefined";
    ListBoxElementType[ListBoxElementType["HeaderRow"] = 1] = "HeaderRow";
    ListBoxElementType[ListBoxElementType["DataRow"] = 2] = "DataRow";
    ListBoxElementType[ListBoxElementType["ListItem"] = 3] = "ListItem";
    ListBoxElementType[ListBoxElementType["EmptyData"] = 4] = "EmptyData";
})(ListBoxElementType || (ListBoxElementType = {}));
var ListBoxNavigationAreaType;
(function (ListBoxNavigationAreaType) {
    ListBoxNavigationAreaType[ListBoxNavigationAreaType["None"] = 0] = "None";
    ListBoxNavigationAreaType[ListBoxNavigationAreaType["Table"] = 1] = "Table";
    ListBoxNavigationAreaType[ListBoxNavigationAreaType["List"] = 2] = "List";
    ListBoxNavigationAreaType[ListBoxNavigationAreaType["SearchBox"] = 3] = "SearchBox";
})(ListBoxNavigationAreaType || (ListBoxNavigationAreaType = {}));
class ListBoxLayoutHelper {
    static getElementType(row) {
        if (row.matches(ListBoxSelectors.HeaderRowSelector))
            return ListBoxElementType.HeaderRow;
        if (row.matches(ListBoxSelectors.TableVisibleRowGeneralSelector))
            return ListBoxElementType.DataRow;
        if (row.matches(ListBoxSelectors.ListVisibleItemGeneralSelector))
            return ListBoxElementType.ListItem;
        return ListBoxElementType.Undefined;
    }
    static getNavigationAreaType(element) {
        if (element.matches(ListBoxSelectors.TableSelector))
            return ListBoxNavigationAreaType.Table;
        if (element.matches(ListBoxSelectors.ListSelector))
            return ListBoxNavigationAreaType.List;
        if (element.matches(ListBoxSelectors.SearchBoxSelector))
            return ListBoxNavigationAreaType.SearchBox;
        return ListBoxNavigationAreaType.None;
    }
    static isSelectionCell(element) {
        var _a;
        return (_a = element === null || element === void 0 ? void 0 : element.matches(`.${ListBoxCssClasses.TableSelectionCellClassName}`)) !== null && _a !== void 0 ? _a : false;
    }
    static isItemDisplayTemplateContainer(element) {
        var _a;
        return (_a = element === null || element === void 0 ? void 0 : element.matches(`.${ListBoxCssClasses.ItemDisplayTemplateContainer}`)) !== null && _a !== void 0 ? _a : false;
    }
}

class ListBoxTableKbdStrategy extends ListBoxKbdStrategyBase {
    constructor(component, targetElement) {
        super(component, targetElement);
        this.savedSelectedColumnUid = null;
    }
    saveSelectedColumn(rowStrategy) {
        this.savedSelectedColumnUid = rowStrategy.getSelectedColumnUid();
    }
    syncSelectedColumn(rowStrategy) {
        rowStrategy.syncSelectedColumn(this.savedSelectedColumnUid);
    }
    queryItems() {
        return this.queryItemsBySelector(ListBoxSelectors.TablePartsSelector);
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches("thead"))
            return new ListBoxTableHeaderKbdStrategy(this, this.component, itemElement);
        if (itemElement.matches("tbody"))
            return new ListBoxTableBodyKbdStrategy(this, this.component, itemElement);
        return null;
    }
    selectItem(index) {
        const strategy = this.getStrategy(index);
        const selectedStrategy = this.getSelectedItemStrategy();
        if (selectedStrategy && selectedStrategy !== strategy)
            selectedStrategy.leaveTablePart();
        strategy.activate();
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
            case key.KeyCode.Home:
            case key.KeyCode.End:
                return this.handleBodyShortcut(evt);
        }
        return false;
    }
    handleBodyShortcut(evt) {
        const bodyIndex = this.items.findIndex(item => item.matches("tbody"));
        const bodyStrategy = this.getStrategy(bodyIndex);
        if (bodyIndex >= 0 && bodyStrategy && bodyStrategy !== this.getSelectedItemStrategy())
            return bodyStrategy.handleKeyDown(evt);
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
                strategy.syncSelectedColumns(selectedRowStrategy, syncRowStrategy);
        }
    }
}
class ListBoxTablePartKbdStrategyBase extends ListBoxItemsContainerKbdStrategyBase {
    constructor(parent, component, targetElement) {
        super(component, targetElement);
        this.parentTableStrategy = parent;
    }
    leaveTablePart() { }
    syncSelectedColumns(prevRowStrategy, newRowStrategy) {
        const isRowChanged = prevRowStrategy && prevRowStrategy !== newRowStrategy;
        if (isRowChanged) {
            if (this.isColumnSyncRequired(prevRowStrategy.getElementType()))
                this.parentTableStrategy.saveSelectedColumn(prevRowStrategy);
            if (this.isColumnSyncRequired(newRowStrategy.getElementType())) {
                this.parentTableStrategy.syncSelectedColumn(newRowStrategy);
                return true;
            }
        }
        return false;
    }
    queryItems() {
        return this.queryItemsBySelector(ListBoxSelectors.TableDataRowSelector);
    }
    isColumnSyncRequired(rowType) {
        switch (rowType) {
            case ListBoxElementType.HeaderRow:
            case ListBoxElementType.DataRow:
                return true;
        }
        return false;
    }
    getShortcutContext() {
        return { AreaType: ListBoxNavigationAreaType.Table };
    }
    getStrategy(index) {
        return this.getItemStrategy(index);
    }
    getSelectedItemStrategy() {
        return super.getSelectedItemStrategy();
    }
}
class ListBoxTableHeaderKbdStrategy extends ListBoxTablePartKbdStrategyBase {
    constructor(parent, component, targetElement) {
        super(parent, component, targetElement);
    }
    createItemStrategy(element) {
        switch (ListBoxLayoutHelper.getElementType(element)) {
            case ListBoxElementType.HeaderRow:
                return new ListBoxTableHeaderRowKbdStrategy(this, this.component, element);
        }
        throw new Error("Not implemented");
    }
}
class ListBoxTableBodyKbdStrategy extends ListBoxTablePartKbdStrategyBase {
    constructor(parent, component, targetElement) {
        super(parent, component, targetElement);
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches(ListBoxSelectors.TableVisibleRowGeneralSelector))
            return new ListBoxTableDataRowKbdStrategy(this, this.component, itemElement);
        if (itemElement.matches(ListBoxSelectors.EmptyDataItemSelector))
            return new ListBoxTableEmptyDataRowKbdStrategy(this, this.component, itemElement);
        return null;
    }
    leaveTablePart() {
        super.leaveTablePart();
        this.notifyFocusedRowChanged();
    }
}
class ListBoxTableRowKbdStrategyBase extends ListBoxItemKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getSelectedColumnUid() {
        var _a;
        return (_a = this.getColumnUidByCell(this.selectedItemElement)) !== null && _a !== void 0 ? _a : null;
    }
    syncSelectedColumn(columnUid) {
        const index = columnUid !== null
            ? this.items.findIndex(i => this.getColumnUidByCell(i) === columnUid)
            : -1;
        this.selectedItemIndex = Math.max(index, 0);
    }
    getColumnUidByCell(itemElement) {
        var _a;
        return (_a = this.getColumnInfoByCell(itemElement)) === null || _a === void 0 ? void 0 : _a.uID;
    }
}
class ListBoxTableHeaderRowKbdStrategy extends ListBoxTableRowKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getElementType() {
        return ListBoxElementType.HeaderRow;
    }
    isImmediatelyClickEnabled() {
        return true;
    }
}
class ListBoxTableDataRowKbdStrategy extends ListBoxTableRowKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getElementType() {
        return ListBoxElementType.DataRow;
    }
    handleKeyDown(evt) {
        if (!this.nestedContentSelected) {
            if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Space) {
                this.performShortcutEvent(evt);
                return true;
            }
        }
        return super.handleKeyDown(evt);
    }
}
class ListBoxTableEmptyDataRowKbdStrategy extends ListBoxTableRowKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getElementType() {
        return ListBoxElementType.EmptyData;
    }
}

class ListBoxListKbdStrategy extends ListBoxItemsContainerKbdStrategyBase {
    constructor(component, targetElement) {
        super(component, targetElement);
    }
    getShortcutContext() {
        return { AreaType: ListBoxNavigationAreaType.List };
    }
    queryItems() {
        return this.queryItemsBySelector(ListBoxSelectors.ItemSelector);
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches(ListBoxSelectors.ListVisibleItemGeneralSelector))
            return new ListBoxListItemKbdStrategy(this, this.component, itemElement);
        if (itemElement.matches(ListBoxSelectors.EmptyDataItemSelector))
            return new ListBoxListEmptyDataItemKbdStrategy(this, this.component, itemElement);
        return null;
    }
}
class ListBoxListItemKbdStrategy extends ListBoxItemKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getElementType() {
        return ListBoxElementType.ListItem;
    }
    handleKeyDown(evt) {
        if (!this.nestedContentSelected) {
            if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Space) {
                this.performShortcutEvent(evt);
                return true;
            }
        }
        return super.handleKeyDown(evt);
    }
}
class ListBoxListEmptyDataItemKbdStrategy extends ListBoxItemKbdStrategyBase {
    constructor(containerStrategy, component, targetElement) {
        super(containerStrategy, component, targetElement);
    }
    getElementType() {
        return ListBoxElementType.EmptyData;
    }
}

class ListBoxSearchKbdStrategy extends ListBoxKbdStrategyBase {
    constructor(listBox, targetElement) {
        super(listBox, targetElement);
    }
}

class ListBoxRootKbdStrategy extends ListBoxKbdStrategyBase {
    constructor(listBox) {
        super(listBox, listBox);
    }
    getShortcutContext() {
        return {
            IsMacOSPlatform: this.isMacOSPlatform
        };
    }
    queryItems() {
        return new Array(this.getSearchBox(), this.getList(), this.getTable());
    }
    createItemStrategy(itemElement) {
        switch (ListBoxLayoutHelper.getNavigationAreaType(itemElement)) {
            case ListBoxNavigationAreaType.SearchBox:
                return new ListBoxSearchKbdStrategy(this.component, itemElement);
            case ListBoxNavigationAreaType.Table:
                return new ListBoxTableKbdStrategy(this.component, itemElement);
            case ListBoxNavigationAreaType.List:
                return new ListBoxListKbdStrategy(this.component, itemElement);
        }
        return null;
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
}

class ListBoxColumnInfo {
    constructor(uID) {
        this._uID = uID;
    }
    get uID() { return this._uID; }
}

const DxListBoxColumnsInfoTagName = "dxbl-list-box-columns-info";
class DxListBoxColumnsInfo extends DxHTMLElementBase {
    get data() {
        return this.getAttribute("data");
    }
    get componentClassName() {
        return this.getAttribute("component-class-name");
    }
    get columns() {
        return (this.data !== null) ? this.parseColumns(this.data) : [];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.component = this.closest(`.${this.componentClassName}`);
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.notifyColumnsChanged(this.columns);
    }
    parseColumns(columnsStr) {
        const columns = JSON.parse(columnsStr);
        const columnsInfo = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const info = new ListBoxColumnInfo(column.UID);
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
                (_a = this.component) === null || _a === void 0 ? void 0 : _a.notifyColumnsChanged(this.parseColumns(newVal));
                break;
        }
    }
}

let DxListBox = class DxListBox extends SingleSlotElementBase {
    constructor() {
        super();
        this._focusedRowIndex = -1;
        this._columnsInfo = [];
        this.boundOnScrollViewerUpdateHandler = this.onScrollViewerUpdate.bind(this);
        this.boundOnMouseDownHandler = this.onMouseDown.bind(this);
        this.resizeObserver = new ResizeObserver(this.onSizeChanged.bind(this));
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventSubscriptions();
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        delete this.keyboardNavigator;
        this.removeEventSubscriptions();
        this.resizeObserver.disconnect();
        super.disconnectedCallback();
    }
    contentChanged() {
        super.contentChanged();
        this.initializeKeyboardNavigator();
    }
    getScrollViewer() {
        return this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
    }
    getScrollViewerContent() {
        return this.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
    }
    getTable() {
        return this.querySelector(ListBoxSelectors.TableSelector);
    }
    getList() {
        return this.querySelector(ListBoxSelectors.ListSelector);
    }
    getSearchBox() {
        return this.querySelector(ListBoxSelectors.SearchBoxSelector);
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
    notifyFocusedRowChanged(visibleIndex) {
        if (visibleIndex === this.focusedRowIndex)
            return;
        if (this.enableFocusedRow) {
            this.focusedRowIndex = visibleIndex;
            this.dispatchEvent(new ListBoxFocusedRowChangedEvent(visibleIndex));
        }
    }
    notifyMakeElementVisible(visibleIndex, edge) {
        if (visibleIndex < 0)
            return;
        this.dispatchEvent(new ListBoxMakeElementVisibleEvent(visibleIndex, edge));
    }
    notifyColumnsChanged(columns) {
        this._columnsInfo = columns;
    }
    getColumnInfoByCell(element) {
        if (element instanceof HTMLElement) {
            const cellIndex = this.getElementIndex(element);
            if (cellIndex >= 0 && cellIndex < this._columnsInfo.length)
                return this._columnsInfo[cellIndex];
        }
        return null;
    }
    get isTableRender() {
        return !!this.getTable();
    }
    get focusedRowIndex() {
        return this._focusedRowIndex;
    }
    set focusedRowIndex(value) {
        this._focusedRowIndex = value;
    }
    get enableFocusedRow() {
        return false;
    }
    get enableMultipleSelection() {
        return this.classList.contains(ListBoxCssClasses.MultiSelectClassName);
    }
    get enableVirtualRenderMode() {
        const scrollViewer = this.getScrollViewer();
        return scrollViewer !== null && scrollViewer instanceof DxVirtualScrollViewer;
    }
    get virtualItemCount() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer && scrollViewer instanceof DxVirtualScrollViewer)
            return scrollViewer.totalItemCount;
        return -1;
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(ListBoxSelectors.KeyboardNavigatorSelector);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, new ListBoxRootKbdStrategy(this));
    }
    addEventSubscriptions() {
        this.addEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
        if (browser.Browser.Firefox && this.isTableRender)
            this.addEventListener("mousedown", this.boundOnMouseDownHandler);
    }
    removeEventSubscriptions() {
        this.removeEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
        if (browser.Browser.Firefox && this.isTableRender)
            this.removeEventListener("mousedown", this.boundOnMouseDownHandler);
    }
    onScrollViewerUpdate(evt) {
        const scrollViewerContent = this.getScrollViewerContent();
        const table = this.getTable();
        if (scrollViewerContent && table) {
            if (table.offsetHeight < scrollViewerContent.clientHeight)
                dom.DomUtils.addClassName(table, ListBoxCssClasses.TableNoScrollClassName);
            else
                dom.DomUtils.removeClassName(table, ListBoxCssClasses.TableNoScrollClassName);
        }
        evt.stopPropagation();
    }
    onSizeChanged(_) {
        const scrollViewer = this.getScrollViewer();
        scrollViewer && scrollViewer.refreshUI && scrollViewer.refreshUI();
    }
    onMouseDown(evt) {
        if (evt.ctrlKey)
            evt.preventDefault();
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
};
DxListBox = __decorate([
    e(listBoxTagName)
], DxListBox);
customElements.define(DxListBoxColumnsInfoTagName, DxListBoxColumnsInfo);
function loadModule() { }
const dxListBox = { loadModule };

export { DxListBox, dxListBox as default };
//# sourceMappingURL=dx-list-box-24.2.js.map
