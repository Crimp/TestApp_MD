import { ThumbDragStartedEvent, ThumbDragDeltaEvent, ThumbDragCompletedEvent } from './thumb-24.2.js';
import { D as DxScrollViewer, R as RequiredVisibleElementAttributeName } from './dx-scroll-viewer-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { b as browser } from './browser-24.2.js';

const DxVirtualScrollViewerTagName = "dxbl-virtual-scroll-viewer";
const VirtualItemIndexAttributeName = "data-virtual-item-index";
const VirtualItemsContainerAttributeName = "data-virtual-items-container";
const TopVirtualSpacerAttributeName = "dxbl-top-virtual-spacer-element";
const BottomVirtualSpacerAttributeName = "dxbl-bottom-virtual-spacer-element";
const SkeletonItemsContainerAttributeName = "dxbl-skeleton-items-container";
const SkeletonWithVariantsDataTypeAttributeName = "dxbl-skeleton-with-variants-data-type";
const SkeletonCssClassVariantsCount = 5;
const SkeletonObserverMarginCalculationError = 1;
const ThumbMoveViewportUpdateDelay = 700;
const MaximumElementHeight = 8000000;
class ScrollEvent extends CustomEvent {
    constructor(position) {
        super(ScrollEvent.eventName, {
            detail: new ScrollEventContext(position),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ScrollEvent.eventName = "dxbl-virtual-scroll-viewer.scroll";
class ScrollEventContext {
    constructor(position) {
        this.Position = position;
    }
}
class ScrollParamsChanged extends CustomEvent {
    constructor(params) {
        super(ScrollParamsChanged.eventName, {
            detail: params,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ScrollParamsChanged.eventName = "dxbl-virtual-scroll-viewer.scrollparamschanged";
class ScrollParamsChangedContext {
    constructor(averageHeight, heights, viewportHeight, contentHeightConstraint, skeletonHeight, headerElementHeight, footerElementHeight) {
        this.AverageHeight = averageHeight;
        this.Heights = heights;
        this.ViewportHeight = viewportHeight;
        this.ContentHeightConstraint = contentHeightConstraint;
        this.SkeletonHeight = skeletonHeight;
        this.HeaderElementHeight = headerElementHeight;
        this.FooterElementHeight = footerElementHeight;
    }
    equals(params) {
        if (!params)
            return false;
        if (params.AverageHeight !== this.AverageHeight)
            return false;
        if (params.ViewportHeight !== this.ViewportHeight)
            return false;
        if (params.ContentHeightConstraint !== this.ContentHeightConstraint)
            return false;
        if (!this.sequenceEquals(params.Heights, this.Heights))
            return false;
        if (params.SkeletonHeight !== this.SkeletonHeight)
            return false;
        return true;
    }
    sequenceEquals(arr1, arr2) {
        if (!arr1)
            return false;
        if (!arr2)
            return false;
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
}
class IntersectionCallbackEvent extends CustomEvent {
    constructor(position, height, renderStateHashCode) {
        super(IntersectionCallbackEvent.eventName, {
            detail: new IntersectionCallbackContext(position, height, renderStateHashCode),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
IntersectionCallbackEvent.eventName = "dxbl-virtual-scroll-viewer.intersectioncallback";
class IntersectionCallbackContext {
    constructor(position, spacerHeight, renderStateHashCode) {
        this.Position = position;
        this.SpacerHeight = spacerHeight;
        this.RenderStateHashCode = renderStateHashCode;
    }
}
CustomEventsHelper.register(ScrollEvent.eventName, x => { return x.detail; });
CustomEventsHelper.register(ScrollParamsChanged.eventName, x => { return x.detail; });
CustomEventsHelper.register(IntersectionCallbackEvent.eventName, x => { return x.detail; });
class DxVirtualScrollViewer extends DxScrollViewer {
    constructor() {
        super();
        this.skeletonScrollContainers = new Set();
        this.positionUpdateLocked = false;
        this._rootMargin = "0px";
        this._renderStateHashCode = -1;
        this._scrollTop = -1;
        this._viewportHeight = 0;
        this._isThumbDragging = false;
        this._averageItemHeight = -1;
        this._contentHeightConstraint = -1;
        this._thumbMoveTimerId = -1;
        this._scrollParams = null;
        this._renderTypeChanged = false;
        this._requireInitialize = false;
        this._totalItemCount = 0;
        this._skeletonViewportItemsCount = 0;
        this._skeletonPatternContainerClasses = null;
        this._skeletonHeight = 0;
        this._headerElementHeight = 0;
        this._footerElementHeight = 0;
        this._lastExpectedTopVisibleIndex = 0;
        this.pendingMakeElementVisibleParams = null;
        this.boundOnThumbMoveStarted = this.onThumbMoveStarted.bind(this);
        this.boundOnThumbMove = this.onThumbMove.bind(this);
        this.boundOnThumbMoveCompleted = this.onThumbMoveCompleted.bind(this);
        this.visibleElementMutationObserver = new MutationObserver(this.visibleElementMutationCallback.bind(this));
    }
    initializeComponent() {
        super.initializeComponent();
        this.subscribeScrollBarEvents();
        if (this.initialize())
            this.dispatchScrollParams();
    }
    disposeComponent() {
        var _a, _b, _c;
        super.disposeComponent();
        this.unsubscribeScrollBarEvents();
        this.reset();
        (_a = this.spacerIntersectionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.spacerResizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        (_c = this.contentContainerResizeObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
        this.visibleElementMutationObserver.disconnect();
    }
    initialize() {
        this.contentContainer = this.getContentContainerElement();
        this.itemsContainer = this.getItemsContainerElement();
        this.spacerTop = this.getTopSpacer();
        this.spacerBottom = this.getBottomSpacer();
        this.headerElementRectangle = this.getElementsRectangle(this.getHeaderElements());
        this.footerElementRectangle = this.getElementsRectangle(this.getFooterElements());
        this._headerElementHeight = 0;
        this._footerElementHeight = 0;
        this._averageItemHeight = -1;
        if (this.headerElementRectangle)
            this._headerElementHeight = DxVirtualScrollViewer.roundHeight(this.headerElementRectangle.height);
        if (this.footerElementRectangle)
            this._footerElementHeight = DxVirtualScrollViewer.roundHeight(this.footerElementRectangle.height);
        if (this.contentContainer && this.spacerTop && this.spacerBottom) {
            this._viewportHeight = this.contentContainer.getBoundingClientRect().height;
            if (this.contentContainerResizeObserver) {
                this.contentContainerResizeObserver.disconnect();
                this.contentContainerResizeObserver = undefined;
            }
            this.contentContainerResizeObserver = this.createContentContainerResizeObserver(this.contentContainer);
            if (this.spacerIntersectionObserver) {
                this.spacerIntersectionObserver.disconnect();
                this.spacerIntersectionObserver = undefined;
            }
            const options = { root: this.contentContainer, rootMargin: this._rootMargin };
            this.spacerIntersectionObserver = new IntersectionObserver(this.intersectionCallback.bind(this), options);
            this.spacerIntersectionObserver.observe(this.spacerTop);
            this.spacerIntersectionObserver.observe(this.spacerBottom);
            if (this.spacerResizeObserver) {
                this.spacerResizeObserver.disconnect();
                this.spacerResizeObserver = undefined;
            }
            this.spacerResizeObserver = new ResizeObserver(this.resizeObserverCallback.bind(this));
            this.spacerResizeObserver.observe(this.spacerTop);
            this.spacerResizeObserver.observe(this.spacerBottom);
            return true;
        }
        return false;
    }
    get averageHeight() {
        return this._averageItemHeight;
    }
    get skeletonHeight() {
        return this._skeletonHeight;
    }
    get viewportHeight() {
        return this._viewportHeight;
    }
    get totalItemCount() {
        return this._totalItemCount;
    }
    getItemsContainerElement() {
        return this.querySelector(`[${VirtualItemsContainerAttributeName}]`);
    }
    getTopSpacer() {
        return this.querySelector(`[${TopVirtualSpacerAttributeName}]`);
    }
    getBottomSpacer() {
        return this.querySelector(`[${BottomVirtualSpacerAttributeName}]`);
    }
    findContentHeightConstraint() {
        if (this._contentHeightConstraint < 0) {
            const parentElement = document.createElement("div");
            parentElement.setAttribute("style", "overflow: auto; height: 0; visibility: hidden;");
            const targetElement = document.createElement("div");
            targetElement.setAttribute("style", "position: relative;");
            parentElement.appendChild(targetElement);
            document.body.appendChild(parentElement);
            this._contentHeightConstraint = this.findElementMaximumHeight(targetElement) / 2;
            document.body.removeChild(parentElement);
        }
        return this._contentHeightConstraint;
    }
    queryElementsSizeArray() {
        const sizes = new Array();
        if (this.itemsContainer) {
            let common = 0;
            const grouped = this.groupElements(this.itemsContainer.children);
            let index = 0;
            let count = 0;
            for (const [visibleIndex, elements] of grouped) {
                let height = 0;
                for (let i = 0; i < elements.length; i++)
                    height += this.queryElementHeight(elements[i]);
                sizes.push(visibleIndex);
                sizes.push(height);
                if (index !== 0 && index !== grouped.size - 1) {
                    common += height;
                    count++;
                }
                index++;
            }
            if (this._averageItemHeight < 0 && count > 0 && common > 0)
                this._averageItemHeight = DxVirtualScrollViewer.roundHeight(common / count);
        }
        return sizes;
    }
    queryElementHeight(element) {
        if (!element)
            return 0;
        const height = element.getBoundingClientRect().height;
        return DxVirtualScrollViewer.roundHeight(height);
    }
    findElementMaximumHeight(targetElement) {
        let elementHeight = 1000000;
        // getBoundingClientRect() method returns 0 if height overflows inner constraint
        const maximum = browser.Browser.Firefox ? MaximumElementHeight : Number.MAX_VALUE;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const current = elementHeight * 2;
            targetElement.style.height = `${current}px`;
            const height = targetElement.getBoundingClientRect().height;
            if (current > maximum || height !== current)
                break;
            else
                elementHeight = current;
        }
        return elementHeight;
    }
    groupElements(collection) {
        const grouped = new Map();
        let elements = [];
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];
            const attribute = element.getAttribute(VirtualItemIndexAttributeName);
            if (this.skipElement(attribute))
                continue;
            if (attribute) {
                elements = [];
                grouped.set(parseInt(attribute), elements);
            }
            if (elements)
                elements.push(element);
        }
        return grouped;
    }
    canDispatchPositionUpdate() {
        return !this._isThumbDragging && !this.positionUpdateLocked;
    }
    skipElement(attribute) {
        if (attribute)
            return parseInt(attribute) < 0;
        return false;
    }
    clearSelection() {
        if (document.activeElement !== null && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA"))
            return;
        const selection = window.getSelection ? window.getSelection() : document.getSelection();
        if (selection && selection.rangeCount > 0 && !selection.isCollapsed)
            selection.collapseToStart();
    }
    onRefresh(scrollTop, scrollLeft) {
        super.onRefresh(scrollTop, scrollLeft);
        const position = Math.ceil(scrollTop);
        if (Math.abs(this._scrollTop - position) > 1) {
            this.dispatchScrollEvent(position);
            this._scrollTop = position;
            this.clearSelection();
            this.shiftSkeletonContainers();
        }
    }
    intersectionCallback(entries) {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (entry.isIntersecting && this.canDispatchPositionUpdate()) {
                if (entry.target === this.spacerTop) {
                    const spacerHeight = entry.intersectionRect.top - entry.boundingClientRect.top;
                    this.dispatchEvent(new IntersectionCallbackEvent(0, spacerHeight, this._renderStateHashCode));
                    this.clearSelection();
                }
                if (entry.target === this.spacerBottom) {
                    const spacerHeight = entry.boundingClientRect.bottom - entry.intersectionRect.bottom;
                    this.dispatchEvent(new IntersectionCallbackEvent(1, spacerHeight, this._renderStateHashCode));
                    this.clearSelection();
                }
            }
        }
    }
    resizeObserverCallback(entries) {
        for (let i = 0; i < entries.length; i++) {
            const target = entries[i].target;
            if (target.hasAttribute(TopVirtualSpacerAttributeName))
                this.reconnectIntersectionObserver(this.spacerTop);
            if (target.hasAttribute(BottomVirtualSpacerAttributeName))
                this.reconnectIntersectionObserver(this.spacerBottom);
        }
    }
    reconnectIntersectionObserver(spacer) {
        if (spacer && this.spacerIntersectionObserver) {
            this.spacerIntersectionObserver.unobserve(spacer);
            this.spacerIntersectionObserver.observe(spacer);
        }
    }
    reconnectSpacerContentIntersectionObserver() {
        if (this._spacerContentIntersectionObserver) {
            this._spacerContentIntersectionObserver.disconnect();
            this._spacerContentIntersectionObserver = undefined;
            this.skeletonScrollContainers = new Set();
        }
        if (!this.contentContainer || !this.itemsContainer)
            return;
        const horizontalMargin = this.itemsContainer.getBoundingClientRect().width;
        const topMargin = Math.max(0, this._skeletonHeight - this._headerElementHeight) + SkeletonObserverMarginCalculationError;
        const bottomMargin = Math.max(0, this._skeletonViewportItemsCount * this._skeletonHeight + this._headerElementHeight - this._viewportHeight) + SkeletonObserverMarginCalculationError;
        const options = {
            root: this.contentContainer,
            rootMargin: `${topMargin}px ${horizontalMargin}px ${bottomMargin}px ${horizontalMargin}px`,
            threshold: 0.999
        };
        this._spacerContentIntersectionObserver = new IntersectionObserver(this.intersectionSkeletonsCallback.bind(this), options);
        this.observeSkeletonContainers(this.spacerTop);
        this.observeSkeletonContainers(this.spacerBottom);
    }
    observeSkeletonContainers(spacer) {
        if (spacer && this._spacerContentIntersectionObserver) {
            const containers = spacer.querySelectorAll(`[${SkeletonItemsContainerAttributeName}]`);
            for (const container of containers)
                this._spacerContentIntersectionObserver.observe(container);
        }
    }
    lockSpacersIntersection() {
        this.positionUpdateLocked = true;
    }
    unlockSpacersIntersection() {
        this.positionUpdateLocked = false;
        this.reconnectIntersectionObserver(this.spacerTop);
        this.reconnectIntersectionObserver(this.spacerBottom);
    }
    scheduleMakeElementVisible(elementSelector, alignVert, alignHor) {
        this.lockSpacersIntersection();
        super.scheduleMakeElementVisible(elementSelector, alignVert, alignHor);
    }
    makeElementVisible(elementSelector, alignVert, alignHor) {
        super.makeElementVisible(elementSelector, alignVert, alignHor);
        this.unlockSpacersIntersection();
    }
    makeUnrenderedElementVisible(elementSelector, alignVert, alignHor) {
        super.makeUnrenderedElementVisible(elementSelector, alignVert, alignHor);
        this.pendingMakeElementVisibleParams = { elementSelector, alignVert, alignHor };
    }
    createContentContainerResizeObserver(container) {
        const resizeObserver = new ResizeObserver(entries => {
            this._viewportHeight = entries[0].contentRect.height;
            this.dispatchScrollParams();
            this.dispatchScrollEvent(this._scrollTop);
        });
        resizeObserver.observe(container);
        return resizeObserver;
    }
    subscribeScrollBarEvents() {
        const vScrollBarElement = this.getVerticalScrollBarElement();
        if (vScrollBarElement)
            this.subscribeThumbEvents(vScrollBarElement, this.boundOnThumbMoveStarted, this.boundOnThumbMove, this.boundOnThumbMoveCompleted);
    }
    unsubscribeScrollBarEvents() {
        const vScrollBarElement = this.getVerticalScrollBarElement();
        if (vScrollBarElement)
            this.unsubscribeThumbEvents(vScrollBarElement, this.boundOnThumbMoveStarted, this.boundOnThumbMove, this.boundOnThumbMoveCompleted);
    }
    subscribeThumbEvents(element, boundOnThumbMoveStarted, boundOnThumbMove, boundOnThumbMoveCompleted) {
        element.addEventListener(ThumbDragStartedEvent.eventName, boundOnThumbMoveStarted);
        element.addEventListener(ThumbDragDeltaEvent.eventName, boundOnThumbMove);
        element.addEventListener(ThumbDragCompletedEvent.eventName, boundOnThumbMoveCompleted);
    }
    unsubscribeThumbEvents(element, boundOnThumbMoveStarted, boundOnThumbMove, boundOnThumbMoveCompleted) {
        element.removeEventListener(ThumbDragStartedEvent.eventName, boundOnThumbMoveStarted);
        element.removeEventListener(ThumbDragDeltaEvent.eventName, boundOnThumbMove);
        element.removeEventListener(ThumbDragCompletedEvent.eventName, boundOnThumbMoveCompleted);
    }
    onThumbMoveStarted(evt) {
        this._isThumbDragging = true;
    }
    onThumbMove(evt) {
        if (this._thumbMoveTimerId !== -1)
            clearTimeout(this._thumbMoveTimerId);
        const dispatch = () => {
            this.dispatchPositionUpdate();
        };
        this._thumbMoveTimerId = setTimeout(dispatch.bind(this), ThumbMoveViewportUpdateDelay);
        this._isThumbDragging = true;
    }
    onThumbMoveCompleted(evt) {
        this.dispatchPositionUpdate();
    }
    dispatchPositionUpdate() {
        this._isThumbDragging = false;
        clearTimeout(this._thumbMoveTimerId);
        this._thumbMoveTimerId = -1;
        this.dispatchScrollEvent(this._scrollTop);
        this.reconnectIntersectionObserver(this.spacerTop);
        this.reconnectIntersectionObserver(this.spacerBottom);
    }
    dispatchScrollEvent(position) {
        if (!this.canDispatchPositionUpdate())
            return;
        this.dispatchEvent(new ScrollEvent(position));
    }
    dispatchScrollParams() {
        const elementsSizeArray = this.queryElementsSizeArray();
        const contentHeightConstraint = this.findContentHeightConstraint();
        const scrollParams = new ScrollParamsChangedContext(this._averageItemHeight, elementsSizeArray, this._viewportHeight, contentHeightConstraint, this._skeletonHeight, this._headerElementHeight, this._footerElementHeight);
        if (!scrollParams.equals(this._scrollParams)) {
            this._scrollParams = scrollParams;
            this.dispatchEvent(new ScrollParamsChanged(this._scrollParams));
        }
    }
    onStateChanged(value) {
        if (!value)
            return;
        if (this._renderTypeChanged) {
            if (this._requireInitialize)
                this.initialize();
            this.calculateSkeletonHeight();
            this._renderTypeChanged = false;
        }
        this.reconnectSpacerContentIntersectionObserver();
        this.rerunSkeletonAnimation();
        this.dispatchScrollParams();
    }
    rerunSkeletonAnimation() {
        this.classList.remove(CssClasses.SkeletonAnimateClassName);
        setTimeout(() => this.classList.add(CssClasses.SkeletonAnimateClassName));
    }
    onRenderStateChanged(value) {
        if (!value)
            return;
        this._renderStateHashCode = parseInt(value);
    }
    reset() {
        this._scrollParams = null;
    }
    calculateSkeletonHeight() {
        if (!this._skeletonPatternContainerClasses)
            return;
        const text = document.createElement("div");
        text.innerHTML = "&nbsp;";
        const line = document.createElement("div");
        line.appendChild(text);
        const container = document.createElement("div");
        container.setAttribute("class", `${CssClasses.VirtualSpacerPatternClassName} ${this._skeletonPatternContainerClasses}`);
        container.appendChild(line);
        document.body.appendChild(container);
        this._skeletonHeight = DxVirtualScrollViewer.roundHeight(line.getBoundingClientRect().height);
        document.body.removeChild(container);
    }
    updateSkeletonClasses(container, topVisibleIndex) {
        if (container.children.length > 0) {
            const firstSkeletonVisibleIndex = this.getSkeletonItemIndex(container.children[0]);
            const offset = topVisibleIndex - firstSkeletonVisibleIndex;
            for (const skeleton of container.children) {
                const visibleIndex = this.getSkeletonItemIndex(skeleton) + offset;
                const variants = skeleton.querySelectorAll(`[${SkeletonWithVariantsDataTypeAttributeName}]`);
                for (const skeleton of variants) {
                    const dataType = skeleton.getAttribute(SkeletonWithVariantsDataTypeAttributeName);
                    skeleton.setAttribute("class", `${CssClasses.SkeletonBaseClassName}-${dataType}-${visibleIndex % SkeletonCssClassVariantsCount}`);
                }
            }
        }
    }
    shiftSkeletonContainers() {
        if (!this.itemsContainer)
            return;
        const scrollTop = this._scrollTop;
        const top = this._headerElementHeight - scrollTop % this._skeletonHeight;
        let currentExpectedTopVisibleIndex = Math.floor(scrollTop / this._skeletonHeight);
        const skeletonMaxTopVisibleIndex = Math.min(this._totalItemCount - this._skeletonViewportItemsCount, this._totalItemCount - 1);
        if (this._averageItemHeight === this._skeletonHeight && skeletonMaxTopVisibleIndex > 0)
            currentExpectedTopVisibleIndex = Math.min(currentExpectedTopVisibleIndex, skeletonMaxTopVisibleIndex);
        for (const container of this.skeletonScrollContainers) {
            container.setAttribute("style", `top: ${top}px`);
            if (this._lastExpectedTopVisibleIndex !== currentExpectedTopVisibleIndex)
                this.updateSkeletonClasses(container, currentExpectedTopVisibleIndex);
        }
        this._lastExpectedTopVisibleIndex = currentExpectedTopVisibleIndex;
    }
    getSkeletonItemIndex(skeleton) {
        if (skeleton) {
            const attr = skeleton.getAttribute(VirtualItemIndexAttributeName);
            if (attr)
                return parseInt(attr);
        }
        return -1;
    }
    intersectionSkeletonsCallback(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting)
                this.skeletonScrollContainers.add(entry.target);
            else
                this.skeletonScrollContainers.delete(entry.target);
        }
    }
    static roundHeight(value) {
        if (isNaN(value))
            return 0;
        return parseFloat(value.toFixed(2));
    }
    onSkeletonPatternContainerClassesChanged(newVal) {
        this._requireInitialize = this._skeletonPatternContainerClasses !== null;
        if (this._skeletonPatternContainerClasses !== newVal) {
            this._skeletonPatternContainerClasses = newVal;
            this._renderTypeChanged = true;
        }
    }
    onSkeletonViewportItemsCountChanged(newVal) {
        this._requireInitialize = this._skeletonViewportItemsCount !== 0;
        const numericValue = parseInt(newVal);
        if (this._skeletonViewportItemsCount !== numericValue) {
            this._skeletonViewportItemsCount = numericValue;
            this._renderTypeChanged = true;
        }
    }
    reconnectVisibleElementMutationObserver() {
        this.visibleElementMutationObserver.disconnect();
        this.visibleElementMutationObserver.observe(this, {
            attributes: true,
            attributeFilter: [RequiredVisibleElementAttributeName],
            attributeOldValue: true,
            subtree: true
        });
    }
    cancelRequestMakeElementVisible() {
        super.cancelRequestMakeElementVisible();
        this.visibleElementMutationObserver.disconnect();
    }
    execRequestMakeElementVisible(elementSelector, alignVert, alignHor) {
        this.reconnectVisibleElementMutationObserver();
        super.execRequestMakeElementVisible(elementSelector, alignVert, alignHor);
    }
    visibleElementMutationCallback(records, __) {
        if (!this.pendingMakeElementVisibleParams)
            return;
        for (const record of records) {
            if (record.attributeName && record.target) {
                const attributeValue = record.target.getAttribute(record.attributeName);
                if (attributeValue) {
                    const pendingElementSelector = this.pendingMakeElementVisibleParams.elementSelector;
                    const pendingElementVerticalAlignment = this.pendingMakeElementVisibleParams.alignVert;
                    const pendingElementHorizontalAlignment = this.pendingMakeElementVisibleParams.alignHor;
                    if (pendingElementSelector && pendingElementSelector.indexOf(attributeValue) !== -1) {
                        this.makeElementVisible(pendingElementSelector, pendingElementVerticalAlignment, pendingElementHorizontalAlignment);
                        break;
                    }
                }
            }
        }
        this.pendingMakeElementVisibleParams = null;
    }
    static get observedAttributes() {
        return ["reset-v-scroll-guid", "reset-h-scroll-guid", "request-make-element-visible", "state-has-changed", "render-state-changed", "header-selector", "footer-selector", "left-selector", "right-selector", "skeleton-pattern-container-classes", "total-item-count", "skeleton-viewport-items-count"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        switch (name) {
            case "state-has-changed":
                setTimeout(() => this.onStateChanged(newVal));
                break;
            case "render-state-changed":
                this.onRenderStateChanged(newVal);
                break;
            case "total-item-count":
                this._totalItemCount = parseInt(newVal);
                break;
            case "skeleton-pattern-container-classes":
                this.onSkeletonPatternContainerClassesChanged(newVal);
                break;
            case "skeleton-viewport-items-count":
                this.onSkeletonViewportItemsCountChanged(newVal);
                break;
        }
    }
}
customElements.define(DxVirtualScrollViewerTagName, DxVirtualScrollViewer);

export { BottomVirtualSpacerAttributeName as B, DxVirtualScrollViewerTagName as D, ScrollEvent as S, TopVirtualSpacerAttributeName as T, VirtualItemIndexAttributeName as V, DxVirtualScrollViewer as a };
//# sourceMappingURL=dx-virtual-scroll-viewer-24.2.js.map
