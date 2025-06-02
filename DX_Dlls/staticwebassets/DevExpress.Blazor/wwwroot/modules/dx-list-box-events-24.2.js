import { V as VerticalAlign } from './dx-scroll-viewer-24.2.js';
import { D as DomHelper } from './layouthelper-24.2.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { T as TopVirtualSpacerAttributeName, B as BottomVirtualSpacerAttributeName } from './dx-virtual-scroll-viewer-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { T as TextEditCssClasses } from './text-editor-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { G as GridScrollUtils } from './grid-scroll-utils-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { o as listBoxTagName } from './constants-24.23.js';

class ListBoxCssClasses {
}
ListBoxCssClasses.ClassName = CssClasses.Prefix + "-list-box";
ListBoxCssClasses.TableNoScrollClassName = ListBoxCssClasses.ClassName + "-table-no-scroll";
ListBoxCssClasses.TableHeaderRowClassName = ListBoxCssClasses.ClassName + "-table-header-row";
ListBoxCssClasses.TableSelectionCellClassName = ListBoxCssClasses.ClassName + "-selection-cell";
ListBoxCssClasses.MultiSelectClassName = ListBoxCssClasses.ClassName + "-multi-select";
ListBoxCssClasses.SelectedItemClassName = ListBoxCssClasses.ClassName + "-item-selected";
ListBoxCssClasses.FocusedItemClassName = ListBoxCssClasses.ClassName + "-item-focused";
ListBoxCssClasses.EmptyDataItemClassName = ListBoxCssClasses.ClassName + "-empty-data-item";
ListBoxCssClasses.GroupRowClassName = ListBoxCssClasses.ClassName + "-group-item";
ListBoxCssClasses.ItemDisplayTemplateContainer = ListBoxCssClasses.ClassName + "-item-display-template-container";
ListBoxCssClasses.RenderContainer = CssClasses.Prefix + "-list-box-render-container";

class ListBoxAttributes {
}
ListBoxAttributes.VisibleIndexAttributeName = "data-visible-index";
ListBoxAttributes.ItemIdAttributeName = "id";

class ListBoxSelectors {
}
ListBoxSelectors.TableSelector = `.${ScrollViewerCssClasses.ContentContainerClassName} > table`;
ListBoxSelectors.ListSelector = `.${ScrollViewerCssClasses.ContentContainerClassName} > ul`;
ListBoxSelectors.MultiSelectClassSelector = `.${ListBoxCssClasses.MultiSelectClassName}`;
ListBoxSelectors.TablePartsSelector = ":scope > *:not(colgroup):not(thead)";
ListBoxSelectors.TableBodySelector = ":scope > tbody";
ListBoxSelectors.KeyboardNavigatorSelector = `:scope > ${DxKeyboardNavigatorTagName}`;
ListBoxSelectors.HeaderRowSelector = `.${ListBoxCssClasses.TableHeaderRowClassName}`;
ListBoxSelectors.TableDataRowSelector = `:scope > tr:not([${TopVirtualSpacerAttributeName}]):not([${BottomVirtualSpacerAttributeName}]):not(.${ListBoxCssClasses.GroupRowClassName})`;
ListBoxSelectors.TableVisibleRowGeneralSelector = `tr[${ListBoxAttributes.VisibleIndexAttributeName}]`;
ListBoxSelectors.TableVisibleRowSelector = `:scope > ${ListBoxSelectors.TableVisibleRowGeneralSelector}`;
ListBoxSelectors.ItemSelector = `:scope > li:not([${TopVirtualSpacerAttributeName}]):not([${BottomVirtualSpacerAttributeName}]):not(.${ListBoxCssClasses.GroupRowClassName})`;
ListBoxSelectors.ListVisibleItemGeneralSelector = `li[${ListBoxAttributes.VisibleIndexAttributeName}]`;
ListBoxSelectors.ListVisibleItemSelector = `:scope > ${ListBoxSelectors.ListVisibleItemGeneralSelector}`;
ListBoxSelectors.VisibleItemSelector = `:scope > [${ListBoxAttributes.VisibleIndexAttributeName}]`;
ListBoxSelectors.ListItemDisplayTemplateConrainerSelector = `.${ListBoxCssClasses.ItemDisplayTemplateContainer}`;
ListBoxSelectors.SelectedItemSelector = `.${ListBoxCssClasses.SelectedItemClassName}`;
ListBoxSelectors.FocusedItemSelector = `.${ListBoxCssClasses.FocusedItemClassName}`;
ListBoxSelectors.EmptyDataItemSelector = `.${ListBoxCssClasses.EmptyDataItemClassName}`;
ListBoxSelectors.SearchBoxSelector = `:scope > .${TextEditCssClasses.TextEdit}`;
ListBoxSelectors.GroupRowSelector = `.${ListBoxCssClasses.GroupRowClassName}`;

class ListBoxKbdNavigationUtils {
    static getVerticalEdge(edge) {
        switch (edge) {
            case VerticalAlign.Top:
                return 0;
            case VerticalAlign.Bottom:
                return 1;
            default:
                return -1;
        }
    }
    static getElementVisibleIndex(element) {
        return DomHelper.getAttributeIntValue(element, ListBoxAttributes.VisibleIndexAttributeName, -1);
    }
    static findItemIndex(visibleIndex, items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item && this.getElementVisibleIndex(item) === visibleIndex)
                return i;
        }
        return -1;
    }
    static queryItemsBySelector(element, itemSelector) {
        return Array.from(element.querySelectorAll(itemSelector));
    }
    static isGroupRowElement(target) {
        const element = target;
        return element ? element.matches && element.matches(ListBoxSelectors.GroupRowSelector) : false;
    }
    static getRow(strategy, visibleIndex) {
        const itemsContainer = strategy.getItemsContainer();
        if (!itemsContainer)
            return null;
        return itemsContainer.querySelector(`:scope > [${ListBoxAttributes.VisibleIndexAttributeName}="${visibleIndex}"]`);
    }
    static isGroupRow(strategy, visibleIndex) {
        const item = ListBoxKbdNavigationUtils.getRow(strategy, visibleIndex);
        return !!item && ListBoxKbdNavigationUtils.isGroupRowElement(item);
    }
    static getElementHeight(strategy, visibleIndex, defaultHeight = 0) {
        const element = ListBoxKbdNavigationUtils.getRow(strategy, visibleIndex);
        return element ? element.getBoundingClientRect().height : defaultHeight;
    }
    static calculateItemAverageHeight(rows) {
        const firstItem = rows[0];
        const lastItem = rows[rows.length - 1];
        return (lastItem.getBoundingClientRect().bottom - firstItem.getBoundingClientRect().top) / rows.length;
    }
    static isOutsideViewportItemRequired(strategy, scrollViewer, visibleIndex, isForward) {
        const siblingItemVisibleIndex = isForward ? visibleIndex + 1 : visibleIndex - 1;
        const siblingItem = ListBoxKbdNavigationUtils.getRow(strategy, siblingItemVisibleIndex);
        if (siblingItem) {
            const siblingItemBounds = siblingItem.getBoundingClientRect();
            const headerElementRectangle = scrollViewer.getElementsRectangle(scrollViewer.getHeaderElements());
            if (!isForward && headerElementRectangle)
                return !GridScrollUtils.getIntersectionRectangle(siblingItemBounds, headerElementRectangle).isEmpty;
            const rect = GridScrollUtils.getIntersectionRectangle(siblingItemBounds, scrollViewer.getBoundingClientRect());
            return rect.height <= ListBoxKbdNavigationUtils.getElementHeight(strategy, siblingItemVisibleIndex);
        }
        return true;
    }
    static calculateRowHeight(strategy, scrollViewer, visibleIndex, isForward) {
        const rowElement = ListBoxKbdNavigationUtils.getRow(strategy, visibleIndex);
        let height = ListBoxKbdNavigationUtils.getElementHeight(strategy, visibleIndex);
        if (rowElement && height && !ListBoxKbdNavigationUtils.isOutsideViewportItemRequired(strategy, scrollViewer, visibleIndex, isForward))
            height += GridScrollUtils.calculateHeightOffsetValue(rowElement, scrollViewer, isForward);
        return height;
    }
    static calculateBoundaryItemVisibleIndex(strategy, scrollViewer, isForward) {
        const viewPortHeight = Math.ceil(GridScrollUtils.getDataAreaViewportHeight(scrollViewer));
        const boundaryIndex = isForward ? 0 : strategy.getLastAvailableVisibleIndex();
        const isOutOfBoundary = isForward && strategy.getSelectedVisibleIndex() <= boundaryIndex || !isForward && strategy.getSelectedVisibleIndex() >= boundaryIndex;
        let visibleIndex = isOutOfBoundary ? boundaryIndex : strategy.getSelectedVisibleIndex();
        let height = ListBoxKbdNavigationUtils.calculateRowHeight(strategy, scrollViewer, visibleIndex, isForward);
        const defaultItemHeight = GridScrollUtils.isVirtualScrollingEnabled(scrollViewer)
            ? ListBoxKbdNavigationUtils.calculateItemAverageHeight(strategy.getRows())
            : undefined;
        const indexOffset = isForward ? 1 : -1;
        let curIndex = visibleIndex + indexOffset;
        while (strategy.isElementInsideViewport(curIndex)) {
            height += ListBoxKbdNavigationUtils.getElementHeight(strategy, curIndex, defaultItemHeight);
            if (height > viewPortHeight && visibleIndex !== strategy.getSelectedVisibleIndex())
                break;
            visibleIndex = curIndex;
            curIndex += indexOffset;
        }
        return visibleIndex;
    }
}

class ListBoxFocusedRowChangedEvent extends CustomEvent {
    constructor(visibleIndex) {
        super(ListBoxFocusedRowChangedEvent.eventName, {
            detail: new ListBoxFocusedRowChangedEventContext(visibleIndex),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ListBoxFocusedRowChangedEvent.eventName = listBoxTagName + ".focusedrowchanged";
class ListBoxFocusedRowChangedEventContext {
    constructor(visibleIndex) {
        this.VisibleIndex = visibleIndex;
    }
}
class ListBoxMakeElementVisibleEvent extends CustomEvent {
    constructor(visibleIndex, verticalEdge) {
        super(ListBoxMakeElementVisibleEvent.eventName, {
            detail: new MakeElementVisibleEventContext(visibleIndex, verticalEdge),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ListBoxMakeElementVisibleEvent.eventName = listBoxTagName + ".makeelementvisible";
class MakeElementVisibleEventContext {
    constructor(visibleIndex, verticalEdge) {
        this.VisibleIndex = visibleIndex;
        this.VerticalEdge = verticalEdge;
    }
}
CustomEventsHelper.register(ListBoxFocusedRowChangedEvent.eventName, x => { return x.detail; });
CustomEventsHelper.register(ListBoxMakeElementVisibleEvent.eventName, x => { return x.detail; });

export { ListBoxAttributes as L, ListBoxKbdNavigationUtils as a, ListBoxSelectors as b, ListBoxCssClasses as c, ListBoxFocusedRowChangedEvent as d, ListBoxMakeElementVisibleEvent as e };
//# sourceMappingURL=dx-list-box-events-24.2.js.map
