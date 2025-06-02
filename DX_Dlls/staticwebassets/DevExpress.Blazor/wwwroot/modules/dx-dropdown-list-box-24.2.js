import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxDropDownBase, b as DropDownWidthMode, c as DropDownListBoxKbdStrategy } from './dx-dropdown-base3-24.2.js';
import { V as VerticalAlign, H as HorizontalAlign, a as ScrollViewerVisibleElementChangedEvent, D as DxScrollViewer, b as ScrollViewerUpdateEvent } from './dx-scroll-viewer-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { a as ListBoxKbdNavigationUtils, b as ListBoxSelectors, L as ListBoxAttributes, c as ListBoxCssClasses, d as ListBoxFocusedRowChangedEvent, e as ListBoxMakeElementVisibleEvent } from './dx-list-box-events-24.2.js';
import { b as browser } from './browser-24.2.js';
import { d as dom } from './dom-24.2.js';
import { t as PopupShownEvent, u as PopupClosedEvent } from './popup-24.2.js';
import { k as key } from './key-24.2.js';
import { n as navigatorsManagerSingleton } from './keyboard-navigation-strategy-24.2.js';
import { D as DomHelper } from './layouthelper-24.2.js';
import { a as DxVirtualScrollViewer } from './dx-virtual-scroll-viewer-24.2.js';
import { containsFocusHiddenAttribute, addFocusHiddenAttribute, removeFocusHiddenAttribute } from './focus-utils-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { p as dropdownListBoxTagName } from './constants-24.23.js';
import { D as DxElementPointerEventsHelper, H as HandlePointerEventsMode, L as LongTapInteractionTimeout } from './dx-html-element-pointer-events-helper-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { n } from './property-24.2.js';

class DropDownListBoxKeyboardNavigationHelper {
    constructor(component) {
        this._selectedItemIndex = -1;
        this._selectedVisibleIndex = -1;
        this._firstVisibleIndex = -1;
        this._lastVisibleIndex = -1;
        this._firstAvailableVisibleIndex = 0;
        this._lastAvailableVisibleIndex = -1;
        this._tabKeyPressed = false;
        this._isActive = false;
        this._renderContainer = null;
        this._requireUpdateSelectedItemState = -1;
        this.boundOnRenderContainerMutationHandler = this.onRenderContainerMutation.bind(this);
        this.boundOnVisibleElementChangedHandler = this.onVisibleElementChanged.bind(this);
        this._component = component;
        this._items = [];
        this._rows = [];
        this._renderContainerMutationObserver = new MutationObserver(this.boundOnRenderContainerMutationHandler);
    }
    get tabKeyPressed() {
        return this._tabKeyPressed ||
            (navigatorsManagerSingleton.keyboardEventProcessed && navigatorsManagerSingleton.processingKeyCode === key.KeyCode.Tab);
    }
    get items() {
        return this._items;
    }
    get itemCount() {
        return this.items.length;
    }
    get selectedItemElement() {
        if (this.selectedItemIndex >= 0 && this.selectedItemIndex < this.itemCount)
            return this.items[this.selectedItemIndex];
        return null;
    }
    get selectedItemIndex() {
        return this._selectedItemIndex;
    }
    get isFirstItemSelected() {
        return this._selectedVisibleIndex <= this._firstAvailableVisibleIndex;
    }
    get isLastItemSelected() {
        return this._selectedVisibleIndex >= this._lastAvailableVisibleIndex;
    }
    get isVirtualRenderModeEnabled() {
        return this._component.enableVirtualRenderMode;
    }
    get totalItemCount() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer && scrollViewer instanceof DxVirtualScrollViewer)
            return scrollViewer.totalItemCount;
        return this._rows.length;
    }
    get searchIsAppliedAndReturnsNoneEmptyData() {
        return this.itemCount > 0 && this._component.searchIsApplied;
    }
    isIndexWithinBoundaries(index) {
        return index >= 0 && index < this.itemCount;
    }
    onPopupShown() {
        this._isActive = true;
        this.initialize();
        this.addEventSubscriptions();
    }
    onPopupClosed() {
        this.removeEventSubscriptions();
        this.dispose();
        this._isActive = false;
    }
    processKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                this._tabKeyPressed = true;
                break;
            case key.KeyCode.Enter:
            case key.KeyCode.Esc:
                if (!this._isActive) {
                    this._component.dispatchKeyDownEvent(evt);
                    return true;
                }
                return false;
            case key.KeyCode.Up:
                return this._component.handleCloseDropDown(evt);
            case key.KeyCode.Down:
                return this._component.handleOpenDropDown(evt);
            case key.KeyCode.Delete:
                return this._component.handleTryClearEditorValue(evt);
        }
        return false;
    }
    processCapturedKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                this._tabKeyPressed = true;
                break;
            case key.KeyCode.Enter:
            case key.KeyCode.Esc:
                this._component.dispatchKeyDownEvent(evt);
                return true;
            case key.KeyCode.Up:
                return !(evt.altKey || evt.metaKey) && this.handleArrowUpKeyDown();
            case key.KeyCode.Down:
                return !(evt.altKey || evt.metaKey) && this.handleArrowDownKeyDown();
            case key.KeyCode.PageUp:
                return this.handlePageUp();
            case key.KeyCode.PageDown:
                return this.handlePageDown();
            case key.KeyCode.Home:
                return evt.ctrlKey && evt.shiftKey && this.handleHomeKeyDown();
            case key.KeyCode.End:
                return evt.ctrlKey && evt.shiftKey && this.handleEndKeyDown();
        }
        return false;
    }
    processKeyUp(evt) {
        this._tabKeyPressed = false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
            case key.KeyCode.Up:
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
                this.notifyFocusedRowChanged();
                break;
            case key.KeyCode.Home:
            case key.KeyCode.End:
                if (evt.shiftKey && evt.ctrlKey)
                    this.notifyFocusedRowChanged();
                break;
        }
        return false;
    }
    updateState() {
        if (this._isActive) {
            this.udpdateFocusState();
            this.updateSelectedItemState();
        }
        else
            this._requireUpdateSelectedItemState++;
    }
    shouldHandleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Enter:
            case key.KeyCode.Esc:
                return this._isActive;
            default:
                return false;
        }
    }
    getItem(index) {
        return this.items[index];
    }
    addFocusHiddenAttribute() {
        this._renderContainer && !containsFocusHiddenAttribute(this._renderContainer) && addFocusHiddenAttribute(this._renderContainer);
    }
    removeFocusHiddenAttribute() {
        this._renderContainer && containsFocusHiddenAttribute(this._renderContainer) && removeFocusHiddenAttribute(this._renderContainer);
    }
    containsFocusHiddenAttribute() {
        return !!this._renderContainer && containsFocusHiddenAttribute(this._renderContainer);
    }
    dispose() {
        this.removeFocusHiddenAttribute();
        this._renderContainerMutationObserver.disconnect();
        this.setSelectedItem(-1, true);
        this.notifyFocusedRowChanged();
        this._firstAvailableVisibleIndex = -1;
        this._lastAvailableVisibleIndex = -1;
        this._firstVisibleIndex = -1;
        this._lastVisibleIndex = -1;
        this._items = [];
        this._rows = [];
    }
    initialize() {
        this._items = this.queryItems();
        this._rows = this.queryRows();
        this.updateBoundaries();
        this._renderContainer = this._component.renderContainer;
        this._renderContainer && this._renderContainerMutationObserver.observe(this._renderContainer, { childList: true, subtree: true });
        this.addFocusHiddenAttribute();
        this.updateViewportBoundaries();
        if (!this._component.useCustomInput)
            this.restoreFocusedState();
        else {
            const selectedItemIndex = this.findSelectedDataItemIndex();
            if (selectedItemIndex >= 0) {
                this.setSelectedItem(selectedItemIndex);
                this.notifyFocusedRowChanged();
            }
        }
    }
    restoreFocusedState() {
        if (this.searchIsAppliedAndReturnsNoneEmptyData && this._requireUpdateSelectedItemState >= 0) {
            this.removeFocusHiddenAttribute();
            this._requireUpdateSelectedItemState = -1;
            this.setSelectedItem(0, true);
        }
        else {
            const selectedItemIndex = this.findSelectedDataItemIndex();
            if (selectedItemIndex >= 0)
                this.setSelectedItem(selectedItemIndex, true);
        }
        this.notifyFocusedRowChanged();
    }
    handleArrowUpKeyDown() {
        this.removeFocusHiddenAttribute();
        if (this.isFirstItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToPrevVirtualItem();
        else
            this.moveToPrevItem();
        return true;
    }
    handleArrowDownKeyDown() {
        this.removeFocusHiddenAttribute();
        if (this.isLastItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToNextVirtualItem();
        else
            this.moveToNextItem();
        return true;
    }
    handlePageUp() {
        this.removeFocusHiddenAttribute();
        if (this.isFirstItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToPrevVirtualPageItem();
        else
            this.moveToPrevPageItem();
        return true;
    }
    handlePageDown() {
        this.removeFocusHiddenAttribute();
        if (this.isLastItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToNextVirtualPageItem();
        else
            this.moveToNextPageItem();
        return true;
    }
    moveToNextPageItem() {
        const lastItemIndex = this._lastAvailableVisibleIndex;
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            const boundaryItemVisibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, true);
            const visibleIndex = boundaryItemVisibleIndex > lastItemIndex ? lastItemIndex : boundaryItemVisibleIndex;
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex - 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.setSelectedItem(index);
            const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToPrevPageItem() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            const boundaryItemIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, false);
            const visibleIndex = boundaryItemIndex < 0 ? 0 : boundaryItemIndex;
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.setSelectedItem(index);
            const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToPrevVirtualPageItem() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            const visibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, false);
            if (this.isElementInsideViewport(visibleIndex)) {
                const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
                const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
                const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
                this.setSelectedItem(index);
                const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
                this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
            }
            else
                this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
        }
    }
    moveToNextVirtualPageItem() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            const visibleIndex = ListBoxKbdNavigationUtils.calculateBoundaryItemVisibleIndex(this, scrollViewer, true);
            if (this.isElementInsideViewport(visibleIndex)) {
                const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
                const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex - 1;
                const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
                this.setSelectedItem(index);
                const rowToScroll = !isGroupRow ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, visibleIndex);
                this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None, rowToScroll);
            }
            else
                this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
        }
    }
    handleHomeKeyDown() {
        this.removeFocusHiddenAttribute();
        if (this.isFirstItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToFirstVirtualItem();
        else
            this.moveToFirstItem();
        return true;
    }
    handleEndKeyDown() {
        this.removeFocusHiddenAttribute();
        if (this.isLastItemSelected) {
            this.addFocusMarkerClass(this.selectedItemElement);
            return false;
        }
        if (this.isVirtualRenderModeEnabled)
            this.moveToLastVirtualItem();
        else
            this.moveToLastItem();
        return true;
    }
    moveToPrevItem() {
        if (this.selectedItemIndex > 0)
            this.setSelectedItem(this.selectedItemIndex - 1);
        this.scrollToElement(null, HorizontalAlign.None);
    }
    moveToNextItem() {
        if (this.selectedItemIndex < this.itemCount - 1)
            this.setSelectedItem(this.selectedItemIndex + 1);
        this.scrollToElement(null, HorizontalAlign.None);
    }
    moveToNextVirtualItem() {
        let visibleIndex = this._selectedVisibleIndex + 1;
        if (this.isElementInsideViewport(visibleIndex) && ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex))
            visibleIndex++;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex < this.totalItemCount - 1) {
            this.setSelectedItem(this.selectedItemIndex + 1);
            this.scrollToElement(null, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
    }
    moveToPrevVirtualItem() {
        let visibleIndex = this._selectedVisibleIndex - 1;
        const isFirstGroupRow = visibleIndex === 0 && this.selectedItemIndex === 0;
        if (isFirstGroupRow)
            return;
        if (this.isElementInsideViewport(visibleIndex) && ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex))
            visibleIndex--;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex > 0) {
            this.setSelectedItem(this.selectedItemIndex - 1);
            this.scrollToElement(null, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
    }
    moveToFirstItem() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            const isFirstGroupItem = ListBoxKbdNavigationUtils.isGroupRow(this, 0);
            this.setSelectedItem(0);
            const rowToScroll = !isFirstGroupItem ? this.selectedItemElement : ListBoxKbdNavigationUtils.getRow(this, 0);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None, rowToScroll);
        }
    }
    moveToFirstVirtualItem() {
        const visibleIndex = 0;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex > 0) {
            this.setSelectedItem(0);
            this.scrollToElement(VerticalAlign.Top, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Top);
    }
    moveToLastItem() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer) {
            this.setSelectedItem(this.itemCount - 1);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None);
        }
    }
    moveToLastVirtualItem() {
        const visibleIndex = this.totalItemCount - 1;
        if (this.isElementInsideViewport(visibleIndex) && this.selectedItemIndex < this.itemCount - 1) {
            this.setSelectedItem(this.itemCount - 1);
            this.scrollToElement(VerticalAlign.Bottom, HorizontalAlign.None);
        }
        else
            this.notifyMakeElementVisible(visibleIndex, VerticalAlign.Bottom);
    }
    updateViewportBoundaries() {
        if (this._rows.length === 0 || this.itemCount === 0)
            return;
        const firstItem = this._rows[0];
        this._firstVisibleIndex = this.getElementVisibleIndex(firstItem);
        const lastItem = this._rows[this._rows.length - 1];
        this._lastVisibleIndex = this.getElementVisibleIndex(lastItem);
    }
    queryRows() {
        if (this.itemsContainer)
            return Array.from(this.itemsContainer.querySelectorAll(ListBoxSelectors.VisibleItemSelector));
        return [];
    }
    get itemsContainer() {
        const tableElement = this._component.getTable();
        if (tableElement)
            return tableElement.querySelector(ListBoxSelectors.TableBodySelector);
        else
            return this._component.getList();
    }
    updateBoundaries() {
        let changes = 0;
        const firstAvailableVisibleIndex = 0;
        if (this._firstAvailableVisibleIndex !== firstAvailableVisibleIndex) {
            changes++;
            this._firstAvailableVisibleIndex = firstAvailableVisibleIndex;
        }
        const lastAvailableVisibleIndex = this.totalItemCount - 1;
        if (this._lastAvailableVisibleIndex !== lastAvailableVisibleIndex) {
            changes++;
            this._lastAvailableVisibleIndex = lastAvailableVisibleIndex;
        }
        return changes > 0;
    }
    isElementInsideViewport(visibleIndex) {
        return visibleIndex >= this._firstVisibleIndex && visibleIndex <= this._lastVisibleIndex;
    }
    findItemIndex(visibleIndex) {
        for (let i = 0; i < this.itemCount; i++) {
            const item = this.items[i];
            if (item && this.getElementVisibleIndex(item) === visibleIndex)
                return i;
        }
        return -1;
    }
    getElementVisibleIndex(element) {
        return DomHelper.getAttributeIntValue(element, ListBoxAttributes.VisibleIndexAttributeName, -1);
    }
    findSelectedDataItemIndex() {
        for (let i = 0; i < this.itemCount; i++) {
            const item = this.items[i];
            if (item && item.matches(ListBoxSelectors.SelectedItemSelector))
                return i;
        }
        return -1;
    }
    notifyFocusedRowChanged() {
        this._component.notifyFocusedRowChanged(this._selectedVisibleIndex);
    }
    notifyMakeElementVisible(visibleIndex, edge = null) {
        if (visibleIndex < 0)
            return;
        this._component.notifyMakeElementVisible(visibleIndex, ListBoxKbdNavigationUtils.getVerticalEdge(edge));
    }
    setSelectedItem(index, force = false) {
        if (this.selectedItemIndex === index && !force)
            return;
        this.removeFocusMarkerClass(this.selectedItemElement);
        this._selectedItemIndex = index;
        if (this.selectedItemElement) {
            this.addFocusMarkerClass(this.selectedItemElement);
            this.updateActiveDescendantAttribute(this.selectedItemElement);
            this._selectedVisibleIndex = this.getElementVisibleIndex(this.selectedItemElement);
        }
        else {
            this.removeFocusMarkerClass(this.selectedItemElement);
            this.updateActiveDescendantAttribute(this.selectedItemElement);
            this._selectedVisibleIndex = -1;
        }
    }
    updateActiveDescendantAttribute(element) {
        if (this.containsFocusHiddenAttribute())
            return;
        const elementId = element && element.getAttribute(ListBoxAttributes.ItemIdAttributeName);
        this._component.updateActiveDescendantAttributeValue(elementId !== null && elementId !== void 0 ? elementId : "");
    }
    removeFocusMarkerClass(element) {
        if (element && dom.DomUtils.hasClassName(element, ListBoxCssClasses.FocusedItemClassName))
            dom.DomUtils.removeClassName(element, ListBoxCssClasses.FocusedItemClassName);
    }
    addFocusMarkerClass(element) {
        if (this.containsFocusHiddenAttribute())
            return;
        if (element && !dom.DomUtils.hasClassName(element, ListBoxCssClasses.FocusedItemClassName) && !dom.DomUtils.hasClassName(element, ListBoxCssClasses.EmptyDataItemClassName))
            dom.DomUtils.addClassName(element, ListBoxCssClasses.FocusedItemClassName);
    }
    queryItems() {
        const tableElement = this._component.getTable();
        if (tableElement) {
            const tableBody = tableElement.querySelector(ListBoxSelectors.TableBodySelector);
            if (tableBody)
                return ListBoxKbdNavigationUtils.queryItemsBySelector(tableBody, ListBoxSelectors.TableDataRowSelector);
        }
        else {
            const listElement = this._component.getList();
            if (listElement)
                return ListBoxKbdNavigationUtils.queryItemsBySelector(listElement, ListBoxSelectors.ItemSelector);
        }
        return [];
    }
    addEventSubscriptions() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer)
            scrollViewer.addEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
    }
    removeEventSubscriptions() {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer)
            scrollViewer.removeEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
    }
    udpdateFocusState() {
        if (!this._component.useCustomInput)
            this.removeFocusHiddenAttribute();
        else
            this.addFocusHiddenAttribute();
    }
    updateSelectedItemState() {
        if (this.searchIsAppliedAndReturnsNoneEmptyData && !this._component.useCustomInput)
            this.setSelectedItem(0, true);
        else
            this.setSelectedItem(-1, true);
        this.notifyFocusedRowChanged();
    }
    onRenderContainerMutation(_, __) {
        if (!this._isActive)
            return;
        this.removeFocusMarkerClass(this.selectedItemElement);
        this._items = this.queryItems();
        this._rows = this.queryRows();
        this.updateViewportBoundaries();
        if (this.updateBoundaries()) {
            this.udpdateFocusState();
            this.updateSelectedItemState();
        }
        else {
            if (this.isElementInsideViewport(this._selectedVisibleIndex)) {
                const itemIndex = this.findItemIndex(this._selectedVisibleIndex);
                if (itemIndex > -1) {
                    this.setSelectedItem(itemIndex, true);
                    this.notifyFocusedRowChanged();
                }
            }
        }
    }
    onVisibleElementChanged(evt) {
        if (evt.detail.isFocusRequired) { // TODO tech debt
            const visibleIndex = ListBoxKbdNavigationUtils.getElementVisibleIndex(evt.detail.element);
            const isGroupRow = ListBoxKbdNavigationUtils.isGroupRow(this, visibleIndex);
            const visibleIndexToSelect = !isGroupRow ? visibleIndex : visibleIndex + 1;
            const index = ListBoxKbdNavigationUtils.findItemIndex(visibleIndexToSelect, this.items);
            this.setSelectedItem(index);
            this.notifyFocusedRowChanged();
        }
    }
    scrollToElement(alignVert, alignHor, targetElement = this.selectedItemElement) {
        const scrollViewer = this._component.getScrollViewer();
        if (scrollViewer && targetElement)
            DxScrollViewer.scrollToElementRelyOnStickyDescendants(targetElement, alignVert, alignHor, scrollViewer);
    }
    getLastAvailableVisibleIndex() {
        return this._lastAvailableVisibleIndex;
    }
    getSelectedVisibleIndex() {
        return this._selectedVisibleIndex;
    }
    getItemsContainer() {
        return this.itemsContainer;
    }
    getRows() {
        return this._rows;
    }
}

class DropDownListKeyDownEvent extends CustomEvent {
    constructor(key, altKey, ctrlKey, shiftKey) {
        super(DropDownListKeyDownEvent.eventName, {
            detail: new KeyboardEventContext(key, altKey, ctrlKey, shiftKey),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DropDownListKeyDownEvent.eventName = dropdownListBoxTagName + ".keydown";
class KeyboardEventContext {
    constructor(key, altKey, ctrlKey, shiftKey) {
        this.Key = key;
        this.AltKey = altKey;
        this.CtrlKey = ctrlKey;
        this.ShiftKey = shiftKey;
    }
}
class DropDownListDropDownClosed extends CustomEvent {
    constructor() {
        super(DropDownListDropDownClosed.eventName, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DropDownListDropDownClosed.eventName = dropdownListBoxTagName + ".dropdownclosed";
CustomEventsHelper.register(DropDownListKeyDownEvent.eventName, x => { return x.detail; });
CustomEventsHelper.register(DropDownListDropDownClosed.eventName, x => { return x.detail; });

class A11yAttributes {
}
A11yAttributes.AriaActiveDescendant = "aria-activedescendant";

var ListSearchMode;
(function (ListSearchMode) {
    ListSearchMode["Default"] = "Default";
    ListSearchMode["None"] = "None";
    ListSearchMode["AutoSearch"] = "AutoSearch";
})(ListSearchMode || (ListSearchMode = {}));
class DxDropDownListBox extends DxDropDownBase {
    constructor() {
        super();
        this._columnsInfo = [];
        this._focusedRowIndex = -1;
        this._elementHasCalculatedWidthAttribute = "has-calculated-width";
        this.boundOnScrollViewerUpdateHandler = this.onScrollViewerUpdate.bind(this);
        this.boundOnRenderContainerPointerDownHandler = this.onRenderContainerPointerDown.bind(this);
        this.boundOnVisibleElementChangedHandler = this.onVisibleElementChanged.bind(this);
        this.boundOnPopupShownHandler = this.onPopupShown.bind(this);
        this.boundOnPopupClosedHandler = this.onPopupClosed.bind(this);
        this._tableHeaderCellSelector = `.${ScrollViewerCssClasses.ContentContainerClassName} > table > thead > ${ListBoxSelectors.HeaderRowSelector} > th`;
        this._tableBodyCellSelector = `.${ScrollViewerCssClasses.ContentContainerClassName} > table > tbody > ${ListBoxSelectors.TableVisibleRowGeneralSelector} > td`;
        this._hoverTitleElementsSelector = [
            this._tableBodyCellSelector,
            this._tableHeaderCellSelector,
        ].join(", ");
        this._kbdNavigationHelper = new DropDownListBoxKeyboardNavigationHelper(this);
        this.dropDownWidthMode = DropDownWidthMode.ContentOrEditorWidth;
        this.searchMode = ListSearchMode.Default;
        this.useCustomInput = false;
        this._pointerEventsHelper = new DxElementPointerEventsHelper(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.prepareRenderContainer();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.releaseRenderContainer();
    }
    ensurePopupElement() {
        super.ensurePopupElement();
        if (this.popupElement) {
            this.popupElement.addEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
            this.popupElement.addEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        }
    }
    disposePopupElement() {
        if (this.popupElement) {
            this.popupElement.removeEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
            this.popupElement.removeEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        }
        super.disposePopupElement();
    }
    createKeyboardStrategy() {
        return new DropDownListBoxKbdStrategy(this);
    }
    get renderContainer() {
        if (this.popupDOMElement)
            return this.popupDOMElement.querySelector(`.${ListBoxCssClasses.RenderContainer}`);
        return null;
    }
    getScrollViewer() {
        if (this.renderContainer)
            return this.renderContainer.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
        return null;
    }
    getScrollViewerContent() {
        if (this.renderContainer)
            return this.renderContainer.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
        return null;
    }
    getTable() {
        if (this.renderContainer)
            return this.renderContainer.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName} > table`);
        return null;
    }
    getList() {
        if (this.renderContainer)
            return this.renderContainer.querySelector(ListBoxSelectors.ListSelector);
        return null;
    }
    notifyFocusedRowChanged(visibleIndex) {
        if (visibleIndex !== this._focusedRowIndex) {
            this.dispatchEvent(new ListBoxFocusedRowChangedEvent(visibleIndex));
            this._focusedRowIndex = visibleIndex;
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
    handleOpenDropDown(evt) {
        const canOpenDropDown = this.enabled && !this.isReadOnly;
        if (canOpenDropDown && !this.isDropDownOpen && (evt.altKey || evt.metaKey)) {
            this.openDropDown();
            return true;
        }
        return false;
    }
    handleCloseDropDown(evt) {
        const canCloseDropDown = this.enabled && !this.isReadOnly;
        if (canCloseDropDown && this.isDropDownOpen && (evt.altKey || evt.metaKey)) {
            this.closeDropDown();
            return true;
        }
        return false;
    }
    handleTryClearEditorValue(evt) {
        const editorAvailable = this.enabled && !this.isReadOnly;
        if (editorAvailable && evt.altKey) {
            this.dispatchClearEditorValue();
            return true;
        }
        return false;
    }
    dispatchKeyDownEvent(evt) {
        const keyboardEvent = new DropDownListKeyDownEvent(evt.key, evt.altKey, evt.ctrlKey || evt.metaKey, evt.shiftKey);
        this.dispatchEvent(keyboardEvent);
    }
    updateActiveDescendantAttributeValue(value) {
        if (this.inputElement && this.inputElement.hasAttribute(A11yAttributes.AriaActiveDescendant))
            this.inputElement.setAttribute(A11yAttributes.AriaActiveDescendant, value);
    }
    get isTableRender() {
        return !!this.getTable();
    }
    get enableVirtualRenderMode() {
        const scrollViewer = this.getScrollViewer();
        return scrollViewer !== null && scrollViewer instanceof DxVirtualScrollViewer;
    }
    get isSearchActive() {
        switch (this.searchMode) {
            case ListSearchMode.None:
            case ListSearchMode.Default:
                return false;
            default:
                return true;
        }
    }
    get searchIsApplied() {
        const fieldValue = !this.fieldElement ? this.fieldText : this.fieldElementValue;
        const fieldValueLength = fieldValue ? fieldValue.length : -1;
        return this.isSearchActive && fieldValueLength > 0;
    }
    onTextInput(evt) {
        if (!this.inputElement)
            return;
        this.ensureDropDownOpened(evt);
        this._kbdNavigationHelper.updateState();
        this.raiseFieldText();
    }
    raiseFocusOut(text) {
        super.raiseFocusOut(text, this._kbdNavigationHelper.tabKeyPressed);
    }
    ensureDropDownOpened(evt) {
        if (!this.isDropDownOpen && evt.data && evt.data.length > 0)
            this.tryOpenDropDown();
    }
    processKeyDown(evt) {
        if (!this.tryProcessKeyDown(evt))
            return super.processKeyDown(evt);
        return true;
    }
    processKeyUp(evt) {
        if (!this.tryProcessKeyUp(evt))
            return super.processKeyUp(evt);
        return true;
    }
    tryProcessKeyDown(evt) {
        return this._kbdNavigationHelper.processKeyDown(evt);
    }
    tryProcessKeyUp(evt) {
        return this._kbdNavigationHelper.processKeyUp(evt);
    }
    processCapturedKeyDownAsync(evt, options) {
        if (this._kbdNavigationHelper.processCapturedKeyDown(evt)) {
            evt.preventDefault();
            options.handled = true;
            return Promise.resolve();
        }
        return super.processCapturedKeyDownAsync(evt, options);
    }
    onPopupShown(_) {
        setTimeout(() => {
            this.prepareRenderContainer();
            this._kbdNavigationHelper.onPopupShown();
        });
    }
    onPopupClosed(_) {
        setTimeout(() => {
            this._kbdNavigationHelper.onPopupClosed();
            this.releaseRenderContainer();
        });
    }
    prepareRenderContainer() {
        if (this.renderContainer) {
            this.renderContainer.addEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
            this.renderContainer.addEventListener("pointerdown", this.boundOnRenderContainerPointerDownHandler);
            this.renderContainer.addEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
            this.resizeDropDownElement();
            this._pointerEventsHelper.initialize();
        }
    }
    onVisibleElementChanged(evt) {
        this.resizeDropDownElement();
    }
    resizeDropDownElementCore() {
        const table = this.getTable();
        if (table) {
            const colGroups = Array.from(table.querySelectorAll(":scope > colgroup > col"));
            const headers = Array.from(table.querySelectorAll(":scope > thead > tr > th"));
            const columnIndicesWithWidth = [];
            const columnIndicesWithoutWidth = [];
            for (let i = 0; i < colGroups.length; i++) {
                const colGroup = colGroups[i];
                if (colGroup.style.width.indexOf("%") > 0 || colGroup.hasAttribute(this._elementHasCalculatedWidthAttribute)) {
                    colGroup.style.removeProperty("width");
                    colGroup.removeAttribute(this._elementHasCalculatedWidthAttribute);
                }
                if (colGroup.style.width)
                    columnIndicesWithWidth.push(i);
                else
                    columnIndicesWithoutWidth.push(i);
            }
            if (columnIndicesWithoutWidth.length < 1)
                return;
            const headersWithWidth = columnIndicesWithWidth.map(x => headers[x]);
            const headersWithoutWidth = columnIndicesWithoutWidth.map(x => headers[x]);
            const absoluteWidth = headersWithWidth.reduce((sum, headerElement) => sum + headerElement.getBoundingClientRect().width, 0);
            const tableStyleWidth = table.style.width;
            table.style.width = "auto";
            const adjustedWidth = headersWithoutWidth.reduce((sum, headerElement) => sum + headerElement.getBoundingClientRect().width, 0);
            const minDesiredWidth = this.dropDownElement.minDesiredWidth ? dom.DomUtils.pxToInt(this.dropDownElement.minDesiredWidth) : 0;
            if (this.needAdjustNarrowContent(absoluteWidth, adjustedWidth, minDesiredWidth)) {
                if (columnIndicesWithoutWidth.length > 1) {
                    const multiplier = (minDesiredWidth - absoluteWidth) / adjustedWidth;
                    for (let i = 0; i < columnIndicesWithoutWidth.length - 1; i++) {
                        const index = columnIndicesWithoutWidth[i];
                        const colGroup = colGroups[index];
                        const header = headers[index];
                        colGroup.style.width = DomHelper.toPx(Math.ceil(header.getBoundingClientRect().width * multiplier));
                        colGroup.setAttribute(this._elementHasCalculatedWidthAttribute, "");
                    }
                }
            }
            else {
                columnIndicesWithoutWidth.forEach(index => {
                    const colGroup = colGroups[index];
                    const header = headers[index];
                    colGroup.style.width = DomHelper.toPx(Math.ceil(header.getBoundingClientRect().width));
                    colGroup.setAttribute(this._elementHasCalculatedWidthAttribute, "");
                });
            }
            table.style.width = tableStyleWidth;
        }
        else {
            const itemsContainer = this.getList();
            const windowWidth = window.innerWidth;
            const scrollViewerContent = this.getScrollViewerContent();
            const additionWidth = this.popupDOMElement && scrollViewerContent ? this.popupDOMElement.getBoundingClientRect().width - scrollViewerContent.getBoundingClientRect().width : 0;
            const desiredWidth = Math.ceil(itemsContainer.getBoundingClientRect().width + additionWidth);
            this.dropDownElement.desiredWidth = DomHelper.toPx(Math.min(desiredWidth, windowWidth));
        }
    }
    needAdjustNarrowContent(absoluteWidth, adjustedWidth, minDesiredWidth) {
        if (minDesiredWidth) {
            const hasExtraSpace = absoluteWidth + adjustedWidth < minDesiredWidth;
            return this.dropDownWidthMode === DropDownWidthMode.ContentOrEditorWidth && hasExtraSpace;
        }
        return false;
    }
    resizeDropDownElement() {
        if (!this.dropDownElement)
            return;
        if (this.isDropDownWidthDependsOnContent)
            this.resizeDropDownElementCore();
    }
    releaseRenderContainer() {
        if (this.renderContainer) {
            this.renderContainer.removeEventListener(ScrollViewerUpdateEvent.eventName, this.boundOnScrollViewerUpdateHandler);
            this.renderContainer.removeEventListener(ScrollViewerVisibleElementChangedEvent.eventName, this.boundOnVisibleElementChangedHandler);
            this.renderContainer.removeEventListener("pointerdown", this.boundOnRenderContainerPointerDownHandler);
            this._pointerEventsHelper.dispose();
        }
        if (this.isDropDownWidthDependsOnContent && this.dropDownElement)
            this.dropDownElement.desiredWidth = null;
    }
    onSizeChanged(entries, observer) {
        if (!this.dropDownElement)
            return;
        const scrollViewer = this.getScrollViewer();
        scrollViewer && scrollViewer.refreshUI && scrollViewer.refreshUI();
        super.onSizeChanged(entries, observer);
    }
    onRenderContainerPointerDown(evt) {
        var _a;
        if (browser.Browser.Firefox && this.isTableRender && evt.ctrlKey)
            evt.preventDefault();
        if (((_a = this.renderContainer) === null || _a === void 0 ? void 0 : _a.querySelector(ListBoxSelectors.EmptyDataItemSelector)) !== null)
            EventHelper.markHandled(evt);
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
    shouldHandleKeyDown(evt) {
        return this._kbdNavigationHelper.shouldHandleKeyDown(evt);
    }
    get isDropDownWidthDependsOnContent() {
        return this.dropDownWidthMode === DropDownWidthMode.ContentWidth || this.dropDownWidthMode === DropDownWidthMode.ContentOrEditorWidth;
    }
    // Pointer events interaction
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.None;
    }
    get handlePointerEventsTarget() {
        var _a;
        return (_a = this.getTable()) !== null && _a !== void 0 ? _a : this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return this._hoverTitleElementsSelector;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
}
__decorate([
    n({ type: ListSearchMode, attribute: "search-mode" })
], DxDropDownListBox.prototype, "searchMode", void 0);
__decorate([
    n({ type: Boolean, attribute: "use-custom-input" })
], DxDropDownListBox.prototype, "useCustomInput", void 0);

export { DxDropDownListBox as D, ListSearchMode as L };
//# sourceMappingURL=dx-dropdown-list-box-24.2.js.map
