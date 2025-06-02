import { d as dom } from './dom-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';

class ScrollBarInfo {
    constructor() {
        this._visible = false;
        this._contentElementInfo = {
            scrollStart: 0,
            clientSize: 0,
            scrollSize: 0
        };
        this._scrollBarStart = 0;
        this._scrollBarEnd = 0;
        this._scrollBarOffset = 0;
        this._scrollBarThickness = 0;
        this._thumbStart = 0;
        this._thumbEnd = 0;
    }
    get visible() { return this._visible; }
    set visible(value) { this._visible = value; }
    get contentElementInfo() { return this._contentElementInfo; }
    set contentElementInfo(value) { this._contentElementInfo = value; }
    get scrollBarStart() { return this._scrollBarStart; }
    set scrollBarStart(value) { this._scrollBarStart = value; }
    get scrollBarEnd() { return this._scrollBarEnd; }
    set scrollBarEnd(value) { this._scrollBarEnd = value; }
    get scrollBarOffset() { return this._scrollBarOffset; }
    set scrollBarOffset(value) { this._scrollBarOffset = value; }
    get scrollBarThickness() { return this._scrollBarThickness; }
    set scrollBarThickness(value) { this._scrollBarThickness = value; }
    get thumbStart() { return this._thumbStart; }
    set thumbStart(value) { this._thumbStart = value; }
    get thumbEnd() { return this._thumbEnd; }
    set thumbEnd(value) { this._thumbEnd = value; }
}

const MinThumbSize = 20;
class ScrollThumbCalculator {
    get scrollBarInfo() {
        return this._scrollBarInfo;
    }
    get contentElementInfo() {
        return this.scrollBarInfo.contentElementInfo;
    }
    constructor(scrollBarInfo) {
        this._scrollBarInfo = scrollBarInfo;
        this.thumbSize = MinThumbSize;
        this._scrollBarInfo.scrollBarEnd = this._scrollBarInfo.contentElementInfo.clientSize;
        this.recalculate();
    }
    scrollByPointerClick(position) {
        const elementScrollHeight = this.contentElementInfo.scrollSize - this.contentElementInfo.clientSize;
        this.contentElementInfo.scrollStart = elementScrollHeight * position / this.getScrollBarSize();
        this.contentElementInfo.scrollStart = Math.max(0, this.contentElementInfo.scrollStart);
        this.contentElementInfo.scrollStart = Math.min(elementScrollHeight, this.contentElementInfo.scrollStart);
        this.recalculate();
    }
    scrollByPointerMove(positionDelta) {
        const elementScrollHeight = this.contentElementInfo.scrollSize - this.contentElementInfo.clientSize;
        const scale = elementScrollHeight / (this.getScrollBarSize() - this.thumbSize);
        this.contentElementInfo.scrollStart = this.contentElementInfo.scrollStart + positionDelta * scale;
        this.contentElementInfo.scrollStart = Math.max(0, this.contentElementInfo.scrollStart);
        this.contentElementInfo.scrollStart = Math.min(elementScrollHeight, this.contentElementInfo.scrollStart);
        this.recalculate();
    }
    recalculate() {
        this.recalculateThumb();
    }
    recalculateThumb() {
        this.thumbSize = this.calculateThumbSize();
        this._scrollBarInfo.visible = this.scrollBarInfo.contentElementInfo.scrollSize > this.scrollBarInfo.contentElementInfo.clientSize;
        this._scrollBarInfo.thumbStart = this.calculateThumbStart();
        this._scrollBarInfo.thumbEnd = this._scrollBarInfo.thumbStart + this.thumbSize;
    }
    calculateThumbSize() {
        const scrollBarSize = this.getScrollBarSize();
        const thumbSize = scrollBarSize * this.scrollBarInfo.contentElementInfo.clientSize / this.scrollBarInfo.contentElementInfo.scrollSize;
        return scrollBarSize > MinThumbSize ? Math.max(thumbSize, MinThumbSize) : thumbSize;
    }
    calculateThumbStart() {
        const ratio = (this.getScrollBarSize() - this.thumbSize) / (this.scrollBarInfo.contentElementInfo.scrollSize - this.scrollBarInfo.contentElementInfo.clientSize);
        return this.scrollBarInfo.contentElementInfo.scrollStart * ratio;
    }
    getScrollBarSize() {
        return this._scrollBarInfo.scrollBarEnd - this._scrollBarInfo.scrollBarStart;
    }
}

class ScrollController {
    constructor(scrollableHTMLElement) {
        this._offsets = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this._verticalScrollBarInfo = new ScrollBarInfo();
        this._horizontalScrollBarInfo = new ScrollBarInfo();
        this._verticalThumbCalculator = new ScrollThumbCalculator(this._verticalScrollBarInfo);
        this._horizontalThumbCalculator = new ScrollThumbCalculator(this._horizontalScrollBarInfo);
        this.updateScrollableElementInfo(scrollableHTMLElement);
    }
    get verticalScrollBarInfo() {
        return this._verticalScrollBarInfo;
    }
    get horizontalScrollBarInfo() {
        return this._horizontalScrollBarInfo;
    }
    updateScrollableElementInfo(element) {
        this._verticalScrollBarInfo.contentElementInfo.scrollStart = element.scrollTop || 0;
        this._verticalScrollBarInfo.contentElementInfo.scrollSize = element.scrollHeight || 0;
        const elementRect = element.getBoundingClientRect();
        this._verticalScrollBarInfo.contentElementInfo.clientSize = Math.ceil(elementRect.height);
        this._horizontalScrollBarInfo.contentElementInfo.scrollStart = element.scrollLeft || 0;
        this._horizontalScrollBarInfo.contentElementInfo.scrollSize = element.scrollWidth || 0;
        this._horizontalScrollBarInfo.contentElementInfo.clientSize = element.clientWidth || 0;
        this.recalculate();
    }
    initScrollBarsThickness(verticalThickness, horizontalThickness) {
        this._verticalScrollBarInfo.scrollBarThickness = verticalThickness;
        this._horizontalScrollBarInfo.scrollBarThickness = horizontalThickness;
    }
    updateTopPanelHeight(topPanelHeight) {
        this._offsets.top = topPanelHeight;
        this.recalculate();
    }
    updateBottomPanelHeight(bottomPanelHeight) {
        this._offsets.bottom = bottomPanelHeight;
        this.recalculate();
    }
    updateLeftPanelWidth(leftPanelWidth) {
        this._offsets.left = leftPanelWidth;
        this.recalculate();
    }
    updateRightPanelWidth(rightPanelWidth) {
        this._offsets.right = rightPanelWidth;
        this.recalculate();
    }
    vertScrollByPointerMove(positionDelta) {
        this._verticalThumbCalculator.scrollByPointerMove(positionDelta);
        this.recalculate();
    }
    vertScrollByPointerClick(position) {
        this._verticalThumbCalculator.scrollByPointerClick(position);
        this.recalculate();
    }
    horScrollByPointerMove(positionDelta) {
        this._horizontalThumbCalculator.scrollByPointerMove(positionDelta);
        this.recalculate();
    }
    horScrollByPointerClick(position) {
        this._horizontalThumbCalculator.scrollByPointerClick(position);
        this.recalculate();
    }
    recalculate() {
        this._verticalScrollBarInfo.scrollBarStart = this._offsets.top;
        this._verticalScrollBarInfo.scrollBarEnd = this._verticalScrollBarInfo.contentElementInfo.clientSize - this._offsets.bottom;
        this._horizontalScrollBarInfo.scrollBarStart = this._offsets.left;
        this._horizontalScrollBarInfo.scrollBarEnd = this._horizontalScrollBarInfo.contentElementInfo.clientSize - this._offsets.right;
        this._verticalScrollBarInfo.scrollBarOffset = this._offsets.right;
        this._horizontalScrollBarInfo.scrollBarOffset = this._offsets.bottom;
        this._verticalThumbCalculator.recalculate();
        this._horizontalThumbCalculator.recalculate();
        if (this._horizontalScrollBarInfo.visible)
            this._verticalScrollBarInfo.thumbEnd -= this._horizontalScrollBarInfo.scrollBarThickness;
    }
}

var ScrollBarMode;
(function (ScrollBarMode) {
    ScrollBarMode[ScrollBarMode["Vertical"] = 0] = "Vertical";
    ScrollBarMode[ScrollBarMode["Horizontal"] = 1] = "Horizontal";
})(ScrollBarMode || (ScrollBarMode = {}));
class DxScrollBar extends DxHTMLElementBase {
    constructor() {
        super();
        this.thumbElement = null;
        this._mode = ScrollBarMode.Vertical;
        this._info = null;
    }
    initializeComponent() {
        super.initializeComponent();
        this.thumbElement = this.getThumbElement();
        this.thumbElement.addEventListener("click", DxScrollBar.onThumbElementClick);
    }
    disposeComponent() {
        super.disposeComponent();
        if (this.thumbElement)
            this.thumbElement.removeEventListener("click", DxScrollBar.onThumbElementClick);
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
    }
    get info() {
        return this._info;
    }
    set info(value) {
        this._info = value;
        this.applyUIChanges();
    }
    getThumbThickness() {
        if (!this.thumbElement)
            return 0;
        const style = dom.DomUtils.getCurrentStyle(this.thumbElement);
        const thickness = this.mode === ScrollBarMode.Vertical ? style.width : style.height;
        return parseInt(thickness);
    }
    applyUIChanges() {
        if (!this.isInitialized)
            return;
        if (!this.info || !this.info.visible) {
            dom.DomUtils.removeClassName(this, ScrollViewerCssClasses.ScrollBarActiveClassName);
            return;
        }
        const thumbSizeStyle = `${this.info.thumbEnd - this.info.thumbStart}px`;
        if (this.mode === ScrollBarMode.Vertical)
            this.applyVerticalScrollUIChanges(thumbSizeStyle);
        else
            this.applyHorizontalScrollUIChanges(thumbSizeStyle);
        dom.DomUtils.addClassName(this, ScrollViewerCssClasses.ScrollBarActiveClassName);
    }
    applyVerticalScrollUIChanges(thumbSizeStyle) {
        if (!this.thumbElement || !this.info)
            return;
        this.thumbElement.style.height = thumbSizeStyle;
        this.thumbElement.style.transform = `translateY(${this.info.thumbStart}px)`;
        this.style.top = this.info.scrollBarStart + "px";
        this.style.bottom = this.info.contentElementInfo.clientSize - this.info.scrollBarEnd + "px";
        this.style.right = this.info.scrollBarOffset + "px";
    }
    applyHorizontalScrollUIChanges(thumbSizeStyle) {
        if (!this.thumbElement || !this.info)
            return;
        this.thumbElement.style.width = thumbSizeStyle;
        this.thumbElement.style.transform = `translateX(${this.info.thumbStart}px)`;
        this.style.left = this.info.scrollBarStart + "px";
        this.style.right = this.info.contentElementInfo.clientSize - this.info.scrollBarEnd + "px";
        this.style.bottom = this.info.scrollBarOffset + "px";
    }
    getThumbElement() {
        return this.querySelector(`.${ScrollViewerCssClasses.ScrollBarThumbClassName}`);
    }
    static onThumbElementClick(evt) {
        evt.stopPropagation();
    }
}

const DxScrollViewerTagName = "dxbl-scroll-viewer";
const RequiredVisibleElementAttributeName = "data-required-visible-element";
const AutoScrollingStartDistance = 40;
var VerticalAlign;
(function (VerticalAlign) {
    VerticalAlign[VerticalAlign["None"] = 0] = "None";
    VerticalAlign[VerticalAlign["Top"] = 1] = "Top";
    VerticalAlign[VerticalAlign["Bottom"] = 2] = "Bottom";
})(VerticalAlign || (VerticalAlign = {}));
var HorizontalAlign;
(function (HorizontalAlign) {
    HorizontalAlign[HorizontalAlign["None"] = 0] = "None";
    HorizontalAlign[HorizontalAlign["Left"] = 1] = "Left";
    HorizontalAlign[HorizontalAlign["Right"] = 2] = "Right";
})(HorizontalAlign || (HorizontalAlign = {}));
var RefreshUIType;
(function (RefreshUIType) {
    RefreshUIType[RefreshUIType["All"] = 0] = "All";
    RefreshUIType[RefreshUIType["ScrollBars"] = 1] = "ScrollBars";
    RefreshUIType[RefreshUIType["ScrollPosition"] = 2] = "ScrollPosition";
})(RefreshUIType || (RefreshUIType = {}));
var ScrollViewerAutoScrollingMode;
(function (ScrollViewerAutoScrollingMode) {
    ScrollViewerAutoScrollingMode[ScrollViewerAutoScrollingMode["Horizontal"] = 0] = "Horizontal";
    ScrollViewerAutoScrollingMode[ScrollViewerAutoScrollingMode["Vertical"] = 1] = "Vertical";
    ScrollViewerAutoScrollingMode[ScrollViewerAutoScrollingMode["Both"] = 2] = "Both";
})(ScrollViewerAutoScrollingMode || (ScrollViewerAutoScrollingMode = {}));
class ScrollViewerUpdateEvent extends CustomEvent {
    constructor() {
        super(ScrollViewerUpdateEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
ScrollViewerUpdateEvent.eventName = "dxscrollviewerupdate";
class ScrollViewerVisibleElementChangedEvent extends CustomEvent {
    constructor(element, isFocusRequired) {
        super(ScrollViewerVisibleElementChangedEvent.eventName, {
            detail: { element, isFocusRequired },
            bubbles: true,
            composed: false
        });
    }
}
ScrollViewerVisibleElementChangedEvent.eventName = "dxscrollviewervisibleelementchanged";
class DxScrollViewer extends DxHTMLElementBase {
    constructor() {
        super();
        this.scrollAttributeLifespanTimeoutId = null;
        this.pendingRefreshUi = null;
        this.currentMakeElementVisibleTimeoutId = -1;
        this.autoScrollingMode = null;
        this.autoScrollingRect = null;
        this.autoScrollingRafID = -1;
        this.autoScrollingCallback = null;
        this.contentContainerScrollingCallback = null;
        this.boundOnContentScrollHandler = this.onContentScroll.bind(this);
        this.boundOnVerticalScrollBarClickHandler = this.onVerticalScrollBarClick.bind(this);
        this.boundOnVerticalScrollThumbMoveHandler = this.onVerticalScrollThumbMove.bind(this);
        this.boundOnHorizontalScrollBarClickHandler = this.onHorizontalScrollBarClick.bind(this);
        this.boundOnHorizontalScrollThumbMoveHandler = this.onHorizontalScrollThumbMove.bind(this);
        this.boundOnDocumentMouseMoveHandler = this.onDocumentMouseMove.bind(this);
        this.preventScrollEvent = false;
        this.contentContainerElement = null;
        this.verticalScrollBarElement = null;
        this.horizontalScrollBarElement = null;
        this.scrollController = null;
        this.contentResizeObserver = new ResizeObserver(this.onContentSizeChanged.bind(this));
        this.headerResizeObserver = new ResizeObserver(this.onHeaderSizeChanged.bind(this));
        this.footerResizeObserver = new ResizeObserver(this.onFooterSizeChanged.bind(this));
        this.leftResizeObserver = new ResizeObserver(this.onLeftSizeChanged.bind(this));
        this.rightResizeObserver = new ResizeObserver(this.onRightSizeChanged.bind(this));
    }
    get useShadowDom() {
        return false;
    }
    get headerSelector() {
        return this.getAttribute("header-selector");
    }
    get footerSelector() {
        return this.getAttribute("footer-selector");
    }
    get leftSelector() {
        return this.getAttribute("left-selector");
    }
    get rightSelector() {
        return this.getAttribute("right-selector");
    }
    get isRefreshUIRequested() {
        return !!this.pendingRefreshUi;
    }
    get canMakeElementVisible() {
        if (this.isRefreshUIRequested)
            return false;
        if (this.contentContainerElement) {
            const isConnected = this.contentContainerElement.isConnected;
            const hasValidHeight = this.contentContainerElement.offsetHeight > 0;
            const hasValidWidth = this.contentContainerElement.offsetWidth > 0;
            return isConnected && hasValidHeight && hasValidWidth;
        }
        return false;
    }
    getContentContainerElement() {
        return this.contentContainerElement;
    }
    getVerticalScrollBarElement() {
        return this.verticalScrollBarElement;
    }
    getHorizontalScrollBarElement() {
        return this.horizontalScrollBarElement;
    }
    get hasHorizontalScrollBar() {
        var _a, _b;
        return !!((_b = (_a = this.getHorizontalScrollBarElement()) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.visible);
    }
    get hasVerticalScrollBar() {
        var _a, _b;
        return !!((_b = (_a = this.getVerticalScrollBarElement()) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.visible);
    }
    initializeComponent() {
        super.initializeComponent();
        this.initializeInnerHTMLElements();
        this.initializeScrollController();
        this.connectResizeObservers();
    }
    afterInitialize() {
        super.afterInitialize();
        this.refreshScrollPosition();
    }
    disposeComponent() {
        super.disposeComponent();
        this.releaseInnerHTMLElements();
        this.scrollController = null;
        this.contentResizeObserver.disconnect();
        this.headerResizeObserver.disconnect();
        this.footerResizeObserver.disconnect();
        this.leftResizeObserver.disconnect();
        this.rightResizeObserver.disconnect();
    }
    getRectangle() {
        const { left, top, width, height } = this.getBoundingClientRect();
        return { x: left, y: top, width, height };
    }
    getDataAreaRectangle() {
        const rect = this.getRectangle();
        const headerElementsRectangle = this.getElementsRectangle(this.getHeaderElements());
        if (headerElementsRectangle) {
            const headerHeight = headerElementsRectangle.height;
            rect.height -= headerHeight;
            rect.y += headerHeight;
        }
        const leftElementsRectangle = this.getElementsRectangle(this.getLeftElements());
        if (leftElementsRectangle) {
            const leftElementWidth = leftElementsRectangle.width;
            rect.width -= leftElementWidth;
            rect.x += leftElementWidth;
        }
        const rightElementsRectangle = this.getElementsRectangle(this.getRightElements());
        if (rightElementsRectangle)
            rect.width -= rightElementsRectangle.width;
        const footerElementsRectangle = this.getElementsRectangle(this.getFooterElements());
        if (footerElementsRectangle)
            rect.height -= footerElementsRectangle.height;
        return rect;
    }
    static calculateBoundingRectangle(elements) {
        if (elements.length === 1)
            return elements[0];
        let minLeft = -1;
        let minTop = -1;
        let maxRight = -1;
        let maxBottom = -1;
        elements.forEach(function (rect) {
            if (rect.x < minLeft || minLeft === -1)
                minLeft = rect.x;
            if (rect.y < minTop || minTop === -1)
                minTop = rect.y;
            if (rect.x + rect.width > maxRight || maxRight === -1)
                maxRight = rect.x + rect.width;
            if (rect.y + rect.height > maxBottom || maxBottom === -1)
                maxBottom = rect.y + rect.height;
        });
        return { x: minLeft, y: minTop, width: maxRight - minLeft, height: maxBottom - minTop };
    }
    onDocumentMouseMove(evt) {
        this.performAutoScrolling(evt);
    }
    startAutoScrolling(mode, callback = null, updateRectangle = null) {
        this.autoScrollingMode = mode;
        this.autoScrollingCallback = callback;
        const rect = this.getRectangle();
        if (updateRectangle)
            updateRectangle(rect);
        this.autoScrollingRect = rect;
        document.addEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
    }
    stopAutoScrolling() {
        document.removeEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
        this.stopAutoScrollingTimer();
        this.autoScrollingCallback = null;
        this.autoScrollingRect = null;
        this.autoScrollingMode = null;
    }
    subscribeToScroll(callback = null) {
        this.contentContainerScrollingCallback = callback;
    }
    unsubscribeFromScroll() {
        this.contentContainerScrollingCallback = null;
    }
    get isHorizontalAutoScrollingEnabled() {
        return this.autoScrollingMode === ScrollViewerAutoScrollingMode.Horizontal || this.autoScrollingMode === ScrollViewerAutoScrollingMode.Both;
    }
    get isVerticalAutoScrollingEnabled() {
        return this.autoScrollingMode === ScrollViewerAutoScrollingMode.Vertical || this.autoScrollingMode === ScrollViewerAutoScrollingMode.Both;
    }
    performAutoScrolling(evt) {
        this.stopAutoScrollingTimer();
        if (this.autoScrollingMode !== undefined && this.autoScrollingRect) {
            const rect = this.autoScrollingRect;
            const inX = rect.x <= evt.pageX && evt.pageX <= rect.x + rect.width;
            const inY = rect.y <= evt.pageY && evt.pageY <= rect.y + rect.height;
            let offsetX = 0;
            let offsetY = 0;
            if (this.isHorizontalAutoScrollingEnabled && inX && inY) {
                const leftEdgeDistance = evt.pageX - rect.x;
                if (0 <= leftEdgeDistance && leftEdgeDistance <= AutoScrollingStartDistance)
                    offsetX = -(AutoScrollingStartDistance - leftEdgeDistance) / 2;
                const rightEdgeDistance = rect.x + rect.width - evt.pageX;
                if (0 <= rightEdgeDistance && rightEdgeDistance <= AutoScrollingStartDistance)
                    offsetX = (AutoScrollingStartDistance - rightEdgeDistance) / 2;
            }
            if (this.isVerticalAutoScrollingEnabled && inX && inY) {
                const topEdgeDistance = evt.pageY - rect.y;
                if (0 <= topEdgeDistance && topEdgeDistance <= AutoScrollingStartDistance)
                    offsetY = -(AutoScrollingStartDistance - topEdgeDistance) / 2;
                const bottomEdgeDistance = rect.y + rect.height - evt.pageY;
                if (0 <= bottomEdgeDistance && bottomEdgeDistance <= AutoScrollingStartDistance)
                    offsetY = (AutoScrollingStartDistance - bottomEdgeDistance) / 2;
            }
            if (offsetX !== 0 || offsetY !== 0)
                this.startAutoScrollingTimer(evt, offsetX, offsetY);
        }
    }
    startAutoScrollingTimer(evt, offsetX, offsetY) {
        this.autoScrollingRafID = requestAnimationFrame(() => {
            if (this.contentContainerElement) {
                this.contentContainerElement.scrollBy(offsetX, offsetY);
                this.refresh(RefreshUIType.ScrollBars);
            }
            if (this.autoScrollingCallback)
                this.autoScrollingCallback(evt);
            this.performAutoScrolling(evt);
        });
    }
    stopAutoScrollingTimer() {
        if (this.autoScrollingRafID > -1) {
            cancelAnimationFrame(this.autoScrollingRafID);
            this.autoScrollingRafID = -1;
        }
    }
    releaseInnerHTMLElements() {
        this.contentContainerElement && this.contentContainerElement.removeEventListener("scroll", this.boundOnContentScrollHandler);
        if (this.verticalScrollBarElement)
            this.unsubscribeEvents(this.verticalScrollBarElement, this.boundOnVerticalScrollBarClickHandler, this.boundOnVerticalScrollThumbMoveHandler);
        if (this.horizontalScrollBarElement)
            this.unsubscribeEvents(this.horizontalScrollBarElement, this.boundOnHorizontalScrollBarClickHandler, this.boundOnHorizontalScrollThumbMoveHandler);
        this.contentContainerElement = null;
        this.verticalScrollBarElement = null;
        this.horizontalScrollBarElement = null;
        if (this.currentMakeElementVisibleTimeoutId !== -1)
            clearTimeout(this.currentMakeElementVisibleTimeoutId);
    }
    getHeaderElements() {
        return this.getElements(this.headerSelector);
    }
    getFooterElements() {
        return this.getElements(this.footerSelector);
    }
    getLeftElements() {
        return this.getElements(this.leftSelector);
    }
    getRightElements() {
        return this.getElements(this.rightSelector);
    }
    getElementsRectangle(nodes) {
        if (nodes === null || nodes.length === 0)
            return null;
        const elements = Array.from(nodes);
        return DxScrollViewer.calculateBoundingRectangle(elements.map((el) => el.getBoundingClientRect()));
    }
    getElements(selector) {
        return selector && this.contentContainerElement ? this.contentContainerElement.querySelectorAll(selector) : null;
    }
    subscribeEvents(scrollBarElement, boundOnScrollBarClickHandler, boundOnScrollThumbMoveHandler) {
        scrollBarElement.addEventListener("click", boundOnScrollBarClickHandler);
        scrollBarElement.addEventListener("dxthumbdragdelta", boundOnScrollThumbMoveHandler);
    }
    unsubscribeEvents(scrollBarElement, boundOnScrollBarClickHandler, boundOnScrollThumbMoveHandler) {
        scrollBarElement.removeEventListener("click", boundOnScrollBarClickHandler);
        scrollBarElement.removeEventListener("dxthumbdragdelta", boundOnScrollThumbMoveHandler);
    }
    refreshUI() {
        this.refresh(RefreshUIType.All);
        this.dispatchEvent(new ScrollViewerUpdateEvent());
    }
    refreshScrollPosition() {
        this.refresh(RefreshUIType.ScrollPosition);
        this.dispatchEvent(new ScrollViewerUpdateEvent());
    }
    refresh(refreshType) {
        if (this.pendingRefreshUi) {
            const isScrollPositionUpdateNeeded = refreshType === RefreshUIType.ScrollBars && refreshType !== this.pendingRefreshUi.refreshType;
            if (isScrollPositionUpdateNeeded && this.contentContainerElement) {
                this.pendingRefreshUi.scrollTop = this.contentContainerElement.scrollTop;
                this.pendingRefreshUi.scrollLeft = this.contentContainerElement.scrollLeft;
                if (this.pendingRefreshUi.refreshType === RefreshUIType.ScrollPosition)
                    this.pendingRefreshUi.refreshType = RefreshUIType.All;
            }
            return;
        }
        this.pendingRefreshUi = { refreshType };
        requestAnimationFrame(() => {
            const { refreshType, scrollTop, scrollLeft } = this.pendingRefreshUi;
            this.pendingRefreshUi = null;
            if (!this.scrollController)
                return;
            const vertInfo = this.scrollController.verticalScrollBarInfo;
            const horInfo = this.scrollController.horizontalScrollBarInfo;
            if (this.contentContainerElement) {
                if (refreshType === RefreshUIType.All || refreshType === RefreshUIType.ScrollPosition) {
                    this.contentContainerElement.scrollTop = scrollTop !== null && scrollTop !== void 0 ? scrollTop : vertInfo.contentElementInfo.scrollStart;
                    this.contentContainerElement.scrollLeft = scrollLeft !== null && scrollLeft !== void 0 ? scrollLeft : horInfo.contentElementInfo.scrollStart;
                }
                if (refreshType === RefreshUIType.All || refreshType === RefreshUIType.ScrollBars)
                    this.updateScrollableElementInfo(this.contentContainerElement);
            }
            this.verticalScrollBarElement && (this.verticalScrollBarElement.info = vertInfo);
            this.horizontalScrollBarElement && (this.horizontalScrollBarElement.info = horInfo);
            if (this.contentContainerElement)
                this.onRefresh(this.contentContainerElement.scrollTop, this.contentContainerElement.scrollLeft);
            this.preventScrollEvent = false;
        });
    }
    onRefresh(scrollTop, scrollLeft) {
        if (this.contentContainerScrollingCallback)
            this.contentContainerScrollingCallback(scrollTop, scrollLeft);
    }
    initializeInnerHTMLElements() {
        this.contentContainerElement = this.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
        this.contentContainerElement.addEventListener("scroll", this.boundOnContentScrollHandler);
        this.verticalScrollBarElement = this.getScrollElement(ScrollViewerCssClasses.VerticalScrollBarClassName);
        this.verticalScrollBarElement.mode = ScrollBarMode.Vertical;
        this.subscribeEvents(this.verticalScrollBarElement, this.boundOnVerticalScrollBarClickHandler, this.boundOnVerticalScrollThumbMoveHandler);
        this.horizontalScrollBarElement = this.getScrollElement(ScrollViewerCssClasses.HorizontalScrollBarClassName);
        this.horizontalScrollBarElement.mode = ScrollBarMode.Horizontal;
        this.subscribeEvents(this.horizontalScrollBarElement, this.boundOnHorizontalScrollBarClickHandler, this.boundOnHorizontalScrollThumbMoveHandler);
    }
    initializeScrollController() {
        if (!this.contentContainerElement || !this.verticalScrollBarElement || !this.horizontalScrollBarElement)
            return;
        this.scrollController = new ScrollController(this.contentContainerElement);
        if (this.verticalScrollBarElement instanceof DxScrollBar && this.horizontalScrollBarElement instanceof DxScrollBar) {
            const verticalThumbThickness = this.verticalScrollBarElement.getThumbThickness();
            const horizontalThumbThickness = this.horizontalScrollBarElement.getThumbThickness();
            this.scrollController.initScrollBarsThickness(verticalThumbThickness, horizontalThumbThickness);
        }
    }
    updateScrollableElementInfo(element) {
        if (!this.scrollController || !element)
            return;
        this.scrollController.updateScrollableElementInfo(element);
    }
    connectResizeObservers() {
        if (!this.contentContainerElement)
            return;
        this.contentResizeObserver.observe(this);
        for (let i = 0; i < this.contentContainerElement.children.length; i++)
            this.contentResizeObserver.observe(this.contentContainerElement.children[i]);
        this.connectHeaderResizeObserver();
        this.connectFooterResizeObserver();
        this.connectLeftResizeObserver();
        this.connectRightResizeObserver();
    }
    connectHeaderResizeObserver() {
        const headerElements = this.getHeaderElements();
        headerElements && headerElements.forEach((header) => { this.headerResizeObserver.observe(header); });
    }
    connectFooterResizeObserver() {
        const footerElems = this.getFooterElements();
        footerElems && footerElems.forEach((footer) => { this.footerResizeObserver.observe(footer); });
    }
    connectLeftResizeObserver() {
        const leftElems = this.getLeftElements();
        leftElems && leftElems.forEach((left) => { this.leftResizeObserver.observe(left); });
    }
    connectRightResizeObserver() {
        const rightElems = this.getRightElements();
        rightElems && rightElems.forEach((right) => { this.rightResizeObserver.observe(right); });
    }
    reconnectHeaderResizeObserver() {
        this.headerResizeObserver.disconnect();
        this.connectHeaderResizeObserver();
    }
    reconnectFooterResizeObserver() {
        this.footerResizeObserver.disconnect();
        this.connectFooterResizeObserver();
    }
    reconnectLeftResizeObserver() {
        this.leftResizeObserver.disconnect();
        this.connectLeftResizeObserver();
    }
    reconnectRightResizeObserver() {
        this.rightResizeObserver.disconnect();
        this.connectRightResizeObserver();
    }
    onContentScroll(_) {
        if (!this.preventScrollEvent) {
            this.refresh(RefreshUIType.ScrollBars);
            this.setScrollAttribute();
        }
    }
    setScrollAttribute() {
        const scrollAttrName = "scrolling";
        DataQaUtils.setAttribute(this, scrollAttrName);
        if (this.scrollAttributeLifespanTimeoutId)
            clearTimeout(this.scrollAttributeLifespanTimeoutId);
        this.scrollAttributeLifespanTimeoutId = setTimeout(() => {
            DataQaUtils.removeAttribute(this, scrollAttrName);
        }, 2000);
    }
    onVerticalScrollBarClick(evt) {
        if (this.scrollController) {
            this.scrollController.vertScrollByPointerClick(evt.offsetY);
            this.refreshScrollPosition();
        }
    }
    onHorizontalScrollBarClick(evt) {
        if (this.scrollController) {
            this.scrollController.horScrollByPointerClick(evt.offsetX);
            this.refreshScrollPosition();
        }
    }
    onVerticalScrollThumbMove(evt) {
        this.preventScrollEvent = true;
        if (this.scrollController) {
            this.scrollController.vertScrollByPointerMove(evt.detail.deltaY);
            this.refreshScrollPosition();
        }
    }
    onHorizontalScrollThumbMove(evt) {
        this.preventScrollEvent = true;
        if (this.scrollController) {
            this.scrollController.horScrollByPointerMove(evt.detail.deltaX);
            this.refreshScrollPosition();
        }
    }
    getScrollElement(className) {
        return this.querySelector(`:scope > .${className}`);
    }
    onContentSizeChanged(_, __) {
        this.refreshUI();
    }
    onHeaderSizeChanged(entries, _) {
        if (entries.length < 1 || !this.scrollController)
            return;
        else if (!entries[0].target.isConnected) {
            this.reconnectHeaderResizeObserver();
            return;
        }
        const headerRectangle = this.getElementsRectangle(this.getHeaderElements());
        if (headerRectangle)
            this.scrollController.updateTopPanelHeight(headerRectangle.height);
        this.refreshScrollPosition();
    }
    onFooterSizeChanged(entries, _) {
        if (entries.length < 1 || !this.scrollController)
            return;
        else if (!entries[0].target.isConnected) {
            this.reconnectFooterResizeObserver();
            return;
        }
        const footerRectangle = this.getElementsRectangle(this.getFooterElements());
        if (footerRectangle)
            this.scrollController.updateBottomPanelHeight(footerRectangle.height);
        this.refreshScrollPosition();
    }
    onLeftSizeChanged(entries, _) {
        if (entries.length < 1 || !this.scrollController)
            return;
        else if (!entries[0].target.isConnected) {
            this.reconnectLeftResizeObserver();
            return;
        }
        const leftRectangle = this.getElementsRectangle(this.getLeftElements());
        if (leftRectangle)
            this.scrollController.updateLeftPanelWidth(leftRectangle.width);
        this.refreshScrollPosition();
    }
    onRightSizeChanged(entries, _) {
        if (entries.length < 1 || !this.scrollController)
            return;
        else if (!entries[0].target.isConnected) {
            this.reconnectRightResizeObserver();
            return;
        }
        const rightRectangle = this.getElementsRectangle(this.getRightElements());
        if (rightRectangle)
            this.scrollController.updateRightPanelWidth(rightRectangle.width);
        this.refreshScrollPosition();
    }
    processRequestMakeElementVisible(attributeValue) {
        if (!attributeValue)
            return;
        const args = JSON.parse(attributeValue);
        if (args.length === 3) {
            const elementSelector = args[0];
            let alignVert = null;
            let alignHor = null;
            if (args[1] !== null)
                alignVert = args[1];
            if (args[2] !== null)
                alignHor = args[2];
            if (elementSelector)
                this.execRequestMakeElementVisible(elementSelector, alignVert, alignHor);
            else
                this.cancelRequestMakeElementVisible();
        }
    }
    execRequestMakeElementVisible(elementSelector, alignVert, alignHor) {
        this.scheduleMakeElementVisible(elementSelector, alignVert, alignHor);
    }
    cancelRequestMakeElementVisible() {
        if (this.currentMakeElementVisibleTimeoutId !== -1)
            clearTimeout(this.currentMakeElementVisibleTimeoutId);
    }
    scheduleMakeElementVisible(elementSelector, alignVert, alignHor) {
        if (this.currentMakeElementVisibleTimeoutId !== -1)
            clearTimeout(this.currentMakeElementVisibleTimeoutId);
        this.currentMakeElementVisibleTimeoutId = setTimeout(() => {
            if (!this.canMakeElementVisible) // wait for all requests to be processed
                this.scheduleMakeElementVisible(elementSelector, alignVert, alignHor);
            else
                this.makeElementVisible(elementSelector, alignVert, alignHor);
        });
    }
    makeElementVisible(elementSelector, alignVert, alignHor) {
        if (!this.contentContainerElement)
            return;
        const element = this.contentContainerElement.querySelector(elementSelector);
        if (!element) {
            this.makeUnrenderedElementVisible(elementSelector, alignVert, alignHor);
            return;
        }
        DxScrollViewer.scrollToElementRelyOnStickyDescendants(element, alignVert, alignHor, this);
        this.dispatchEvent(new ScrollViewerVisibleElementChangedEvent(element, true)); // TODO isFocusRequired mechanism
    }
    makeUnrenderedElementVisible(elementSelector, alignVert, alignHor) { }
    static scrollToElementRelyOnStickyDescendants(targetElement, alignVert, alignHor, viewer) {
        if (viewer.contentContainerElement) {
            const dataAreaRect = viewer.getDataAreaRectangle();
            const containerTop = dataAreaRect.y;
            const containerLeft = dataAreaRect.x;
            const containerBottom = dataAreaRect.y + dataAreaRect.height;
            const containerRight = dataAreaRect.x + dataAreaRect.width;
            const targetRect = targetElement.getBoundingClientRect();
            const offsetY = this.calcScrollOffset(containerTop, containerBottom, targetRect.top, targetRect.bottom, alignVert);
            const offsetX = this.calcScrollOffset(containerLeft, containerRight, targetRect.left, targetRect.right, alignHor);
            const scrollTop = viewer.contentContainerElement.scrollTop;
            const scrollLeft = viewer.contentContainerElement.scrollLeft;
            const newScrollTop = Math.round(scrollTop + offsetY);
            const newScrollLeft = Math.round(scrollLeft + offsetX);
            if (newScrollTop !== Math.round(scrollTop) || newScrollLeft !== Math.round(scrollLeft)) {
                viewer.contentContainerElement.scrollTo(newScrollLeft, newScrollTop); // T1277276
                viewer.refresh(RefreshUIType.ScrollBars);
            }
        }
        const parentViewer = DxScrollViewer.findClosestViewer(viewer);
        if (parentViewer)
            DxScrollViewer.scrollToElementRelyOnStickyDescendants(targetElement, null, null, parentViewer);
    }
    static calcScrollOffset(containerMin, containerMax, targetMin, targetMax, align) {
        switch (align) {
            case VerticalAlign.Top || HorizontalAlign.Left:
                return targetMin - containerMin;
            case VerticalAlign.Bottom || HorizontalAlign.Right:
                return targetMax - containerMax;
            case VerticalAlign.None || HorizontalAlign.None:
                return 0;
        }
        if (containerMin > targetMin)
            return targetMin - containerMin;
        else if (containerMax < targetMax)
            return Math.min(targetMax - containerMax, targetMin - containerMin);
        return 0;
    }
    static findClosestViewer(viewer) {
        if (viewer.parentElement)
            return viewer.parentElement.closest(`.${ScrollViewerCssClasses.ClassName}`);
        return null;
    }
    static get observedAttributes() {
        return ["reset-v-scroll-guid", "reset-h-scroll-guid", "request-make-element-visible", "header-selector", "footer-selector", "left-selector", "right-selector"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "reset-v-scroll-guid":
                if (this.contentContainerElement && newVal) {
                    this.contentContainerElement.scrollTop = 0;
                    this.refresh(RefreshUIType.ScrollBars);
                }
                break;
            case "reset-h-scroll-guid":
                if (this.contentContainerElement && newVal) {
                    this.contentContainerElement.scrollLeft = 0;
                    this.refresh(RefreshUIType.ScrollBars);
                }
                break;
            case "header-selector":
                if (this.contentContainerElement)
                    setTimeout(() => this.reconnectHeaderResizeObserver());
                break;
            case "footer-selector":
                if (this.contentContainerElement)
                    setTimeout(() => this.reconnectFooterResizeObserver());
                break;
            case "left-selector":
                if (this.contentContainerElement)
                    setTimeout(() => this.reconnectLeftResizeObserver());
                break;
            case "right-selector":
                if (this.contentContainerElement)
                    setTimeout(() => this.reconnectRightResizeObserver());
                break;
            case "request-make-element-visible":
                this.processRequestMakeElementVisible(newVal);
                break;
        }
    }
}
customElements.define("dxbl-scroll-bar", DxScrollBar);
customElements.define(DxScrollViewerTagName, DxScrollViewer);

export { DxScrollViewer as D, HorizontalAlign as H, RequiredVisibleElementAttributeName as R, ScrollViewerAutoScrollingMode as S, VerticalAlign as V, ScrollViewerVisibleElementChangedEvent as a, ScrollViewerUpdateEvent as b, DxScrollViewerTagName as c };
//# sourceMappingURL=dx-scroll-viewer-24.2.js.map
