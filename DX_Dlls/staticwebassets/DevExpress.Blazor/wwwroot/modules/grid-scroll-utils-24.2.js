import { S as ScreenHelper } from './screenhelper-24.2.js';
import { a as Rect, R as RectHelper } from './layouthelper-24.2.js';
import { D as DxScrollViewer, V as VerticalAlign } from './dx-scroll-viewer-24.2.js';

class GridScrollUtils {
    static calculateHorizontalScrollCorrection(element, fixedCells, isLeftFixedPosition) {
        let result = 0;
        const itemBounds = element.getBoundingClientRect();
        for (const cell of fixedCells) {
            const fixedBounds = cell.getBoundingClientRect();
            const intersection = this.getIntersectionRectangle(itemBounds, fixedBounds);
            if (!intersection.isEmpty) {
                const offset = isLeftFixedPosition ? intersection.left - fixedBounds.right : intersection.right - fixedBounds.left;
                itemBounds.x -= offset;
                result += offset;
            }
        }
        return result;
    }
    static calculateVerticalScrollCorrection(element, scrollViewer) {
        const offsetTop = this.calculateHeightOffsetValue(element, scrollViewer, true);
        const offsetBottom = this.calculateHeightOffsetValue(element, scrollViewer, false);
        if (offsetTop < 0 && offsetBottom < 0)
            return offsetTop;
        if (offsetBottom > 0 && offsetTop > 0)
            return offsetBottom;
        return 0;
    }
    static calculateBoundaryItemIndex(strategy, scrollViewer, isForward) {
        const viewPortHeight = Math.ceil(this.getDataAreaViewportHeight(scrollViewer));
        const boundaryIndex = isForward ? 0 : strategy.itemCount - 1;
        const isOutOfBoundary = isForward && strategy.selectedItemIndex <= boundaryIndex || !isForward && strategy.selectedItemIndex >= boundaryIndex;
        let index = isOutOfBoundary ? boundaryIndex : strategy.selectedItemIndex;
        let height = this.calculateItemHeight(strategy, scrollViewer, index, isForward);
        // TODO: DxVirtualScrollViewer.averageHeight is not reliable - it doesn't count footer rows
        const defaultItemHeight = this.isVirtualScrollingEnabled(scrollViewer) ? this.calculateItemAverageHeight(strategy) : undefined;
        const indexOffset = isForward ? 1 : -1;
        let curIndex = index + indexOffset;
        while (strategy.isIndexWithinBoundaries(curIndex)) {
            height += this.getElementHeight(strategy.getItem(curIndex), defaultItemHeight);
            if (height > viewPortHeight && index !== strategy.selectedItemIndex)
                break;
            index = curIndex;
            curIndex += indexOffset;
        }
        return index;
    }
    static isVirtualScrollingEnabled(scrollViewer) {
        return scrollViewer.totalItemCount !== undefined;
    }
    static isElementInView(element, scrollViewer) {
        const scrollViewerClientRect = scrollViewer.getBoundingClientRect();
        const rowClientRect = element.getBoundingClientRect();
        return rowClientRect.bottom > (scrollViewerClientRect.top + rowClientRect.height) && rowClientRect.top < scrollViewerClientRect.bottom;
    }
    static bottomAlignmentRequired(element, scrollViewer) {
        const elementClientRect = element.getBoundingClientRect();
        return (scrollViewer.getBoundingClientRect().bottom - elementClientRect.bottom) < elementClientRect.height;
    }
    static calculateItemAverageHeight(strategy) {
        const firstItem = strategy.getItem(0);
        const lastItem = strategy.getItem(strategy.itemCount - 1);
        return (lastItem.getBoundingClientRect().bottom - firstItem.getBoundingClientRect().top) / strategy.itemCount;
    }
    static calculateItemHeight(strategy, scrollViewer, index, isForward) {
        const itemElement = strategy.getItem(index);
        let height = this.getElementHeight(itemElement);
        if (itemElement && !this.isOutsideViewportItemRequired(strategy, scrollViewer, index, isForward)) {
            const offset = this.calculateHeightOffsetValue(itemElement, scrollViewer, isForward);
            height += isForward ? offset : -offset;
        }
        return height;
    }
    static isOutsideViewportItemRequired(strategy, scrollViewer, index, isForward) {
        const siblingItemIndex = isForward ? index + 1 : index - 1;
        const siblingItem = strategy.getItem(siblingItemIndex);
        if (!siblingItem)
            return true;
        const siblingBounds = siblingItem.getBoundingClientRect();
        const siblingHeight = this.getElementHeight(siblingItem);
        if (!scrollViewer.hasVerticalScrollBar) {
            const viewportBounds = ScreenHelper.viewport();
            const viewportRect = new Rect(0, 0, viewportBounds.width, viewportBounds.height);
            const intersection = this.getIntersectionRectangle(siblingBounds, viewportRect);
            return intersection.height < siblingHeight;
        }
        const footerRect = scrollViewer.getElementsRectangle(scrollViewer.getFooterElements());
        if (isForward && footerRect)
            return !this.getIntersectionRectangle(siblingBounds, footerRect).isEmpty;
        const headerRect = scrollViewer.getElementsRectangle(scrollViewer.getHeaderElements());
        if (!isForward && headerRect)
            return !this.getIntersectionRectangle(siblingBounds, headerRect).isEmpty;
        const visibleRect = this.getIntersectionRectangle(siblingBounds, scrollViewer.getBoundingClientRect());
        return visibleRect.height < siblingHeight;
    }
    static calculateHeightOffsetValue(selectedItemElement, scrollViewer, isForward) {
        const targetRect = selectedItemElement.getBoundingClientRect();
        const dataAreaRect = scrollViewer.getDataAreaRectangle();
        const useDocumentBounds = !scrollViewer.hasVerticalScrollBar;
        const containerTop = useDocumentBounds ? 0 : dataAreaRect.y;
        const containerBottom = useDocumentBounds ? document.documentElement.clientHeight : containerTop + dataAreaRect.height;
        const align = isForward ? VerticalAlign.Top : VerticalAlign.Bottom;
        return DxScrollViewer.calcScrollOffset(containerTop, containerBottom, targetRect.top, targetRect.bottom, align);
    }
    static getDataAreaViewportHeight(scrollViewer) {
        const scrollViewerRect = scrollViewer.getRectangle();
        const viewPort = scrollViewer.hasVerticalScrollBar ? scrollViewer.getDataAreaRectangle() : ScreenHelper.viewport();
        if (scrollViewer.hasVerticalScrollBar && scrollViewerRect && scrollViewerRect.height < viewPort.height)
            return scrollViewerRect.height - this.calcStickyElementsHeight(scrollViewer);
        return viewPort.height;
    }
    static calcStickyElementsHeight(scrollViewer) {
        let height = 0;
        for (const el of this.getStickyElementsRectangles(scrollViewer))
            height += this.getElementRectangleHeight(el);
        return height;
    }
    static getStickyElementsRectangles(scrollViewer) {
        if (scrollViewer)
            return [scrollViewer.getElementsRectangle(scrollViewer.getHeaderElements()), scrollViewer.getElementsRectangle(scrollViewer.getFooterElements())];
        return [];
    }
    static getElementHeight(element, defaultHeight = 0) {
        return element ? element.getBoundingClientRect().height : defaultHeight;
    }
    static getElementRectangleHeight(element, defaultHeight = 0) {
        return element ? element.height : defaultHeight;
    }
    static getIntersectionRectangle(elementBounds, serviceElementBounds) {
        const elementRectangle = new Rect(elementBounds.x, elementBounds.y, elementBounds.width, elementBounds.height);
        const serviceElementRectangle = new Rect(serviceElementBounds.x, serviceElementBounds.y, serviceElementBounds.width, serviceElementBounds.height);
        return RectHelper.intersect(elementRectangle, serviceElementRectangle);
    }
    static alignElementVertically(element, scrollViewer, scrollContainer) {
        const verticalCorrection = GridScrollUtils.calculateVerticalScrollCorrection(element, scrollViewer);
        scrollContainer.scrollBy(0, verticalCorrection);
    }
}

export { GridScrollUtils as G };
//# sourceMappingURL=grid-scroll-utils-24.2.js.map
