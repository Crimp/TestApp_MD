import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { T as ToolbarCssClasses } from './toolbar-css-classes-24.2.js';
import { u as unsubscribeElement, R as RequestAnimationFrame, d as subscribeElementContentSize, f as getTopBottomBordersAndPaddingsSummaryValue, h as getLeftRightBordersAndPaddingsSummaryValue, j as getTopBottomMargins, k as getLeftRightMargins, c as changeDom, s as setOrRemoveAttribute, l as elementHasCssClass } from './dom-utils-24.2.js';
import { U as Utils } from './ribbon-utils-24.2.js';
import { a as Rect, R as RectHelper } from './layouthelper-24.2.js';
import { attachEventsForFocusHiding } from './focus-utils-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { T as TabsCssClasses, A as ActiveTabChangedEvent } from './tabs-events-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './key-24.2.js';
import './disposable-24.2.js';
import './logicaltreehelper-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './custom-events-helper-24.2.js';

var TabsRenderMode;
(function (TabsRenderMode) {
    TabsRenderMode["Default"] = "Default";
    TabsRenderMode["AllTabs"] = "AllTabs";
    TabsRenderMode["OnDemand"] = "OnDemand";
})(TabsRenderMode || (TabsRenderMode = {}));
var TabsScrollMode;
(function (TabsScrollMode) {
    TabsScrollMode["Auto"] = "Auto";
    TabsScrollMode["NavButtons"] = "NavButtons";
    TabsScrollMode["Swipe"] = "Swipe";
    TabsScrollMode["NoScroll"] = "NoScroll";
})(TabsScrollMode || (TabsScrollMode = {}));
var SizeMode;
(function (SizeMode) {
    SizeMode["Small"] = "Small";
    SizeMode["Medium"] = "Medium";
    SizeMode["Large"] = "Large";
})(SizeMode || (SizeMode = {}));
var TabsPosition;
(function (TabsPosition) {
    TabsPosition["Top"] = "Top";
    TabsPosition["Bottom"] = "Bottom";
    TabsPosition["Left"] = "Left";
    TabsPosition["Right"] = "Right";
})(TabsPosition || (TabsPosition = {}));

var TabsScrollDirection;
(function (TabsScrollDirection) {
    TabsScrollDirection[TabsScrollDirection["None"] = 0] = "None";
    TabsScrollDirection[TabsScrollDirection["Back"] = 1] = "Back";
    TabsScrollDirection[TabsScrollDirection["Forward"] = 2] = "Forward";
})(TabsScrollDirection || (TabsScrollDirection = {}));
class TabsScrollHelper {
    static calculate(scrollDirection, isSideTabs, scrollRect, currentTab, prevTab, nextTab) {
        const scrollSize = isSideTabs ? scrollRect.height : scrollRect.width;
        const currentEnd = isSideTabs ? currentTab.bottom : currentTab.right;
        const currentStart = isSideTabs ? currentTab.top : currentTab.left;
        const scrollEnd = isSideTabs ? scrollRect.bottom : scrollRect.right;
        const scrollStart = isSideTabs ? scrollRect.top : scrollRect.left;
        const nextEnd = nextTab ? (isSideTabs ? nextTab.bottom : nextTab.right) : 0;
        const prevStart = prevTab ? (isSideTabs ? prevTab.top : prevTab.left) : 0;
        let delta = currentStart - scrollStart;
        switch (scrollDirection) {
            case TabsScrollDirection.Forward: {
                delta = Math.round(currentEnd - scrollEnd);
                if (Math.round(delta) === 0) {
                    if (nextTab)
                        delta = Math.round(nextEnd - scrollEnd);
                }
                delta = Math.min(Math.max(0, delta), scrollSize);
                if (delta === 0)
                    delta = scrollSize;
                break;
            }
            case TabsScrollDirection.Back: {
                delta = Math.round(currentStart) - Math.round(scrollStart);
                if (Math.round(delta) === 0) {
                    if (prevTab)
                        delta = Math.round(prevStart - scrollStart);
                }
                delta = -Math.min(Math.max(0, Math.abs(delta)), scrollSize);
                if (delta === 0)
                    delta = -scrollSize;
                break;
            }
            default: {
                const prev = currentStart < scrollStart;
                const next = currentEnd > scrollEnd;
                if (!prev && !next)
                    return 0; // fully visible already
                if (next) {
                    const currentRightDelta = currentEnd - scrollEnd; // delta to current tab right border
                    const nextRightDelta = nextTab ? nextEnd - scrollEnd : 0; // delta to next tab right border
                    const nextLeft = currentStart - nextRightDelta;
                    delta = nextTab && nextLeft >= scrollStart ?
                        delta = nextRightDelta :
                        currentRightDelta;
                }
                else if (prev) {
                    const currentLeftDelta = -currentStart + scrollStart; // delta to current tab left border
                    const prevLeftDelta = prevTab ? -prevStart + scrollStart : 0; // delta to prev tab left border
                    const currentRight = currentEnd + currentLeftDelta;
                    const prevRight = currentEnd + prevLeftDelta;
                    if (prevTab && prevRight <= scrollEnd)
                        delta = -prevLeftDelta;
                    else if (currentRight <= scrollEnd)
                        delta = -currentLeftDelta;
                    else
                        delta = 0;
                }
                break;
            }
        }
        return Math.ceil(delta);
    }
}

var DxTabs_1;
const tabIdSelector = "data-dxtabs-tab-id";
const contentIdSelector = "data-dxtabs-content-id";
const dxTabsAttributes = {
    tabCount: "tab-count",
    scrollMode: "scroll-mode",
    renderMode: "render-mode",
    activeTab: "active-tab",
    sizeMode: "size-mode",
    tabsPosition: "tabs-position",
};
let DxTabs = DxTabs_1 = class DxTabs extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.mainElementContentWidthSubscription = null;
        this.contentPanelWidthSubscription = null;
        this.currentSize = { width: null, height: null };
        this.contentSize = { width: null, height: null };
        this.scrollContainerElement = null;
        this.canTrackScroll = false;
        this.tabListElement = null;
        this.updateOverflowStateTimeout = 0;
        this.isReady = false;
        this.neededCheckSize = false;
        this.unsubscribeFocusUtils = null;
        this.unsubscribe = null;
        this.onScrollHandler = this.onScroll.bind(this);
        this.onNextButtonClickHandler = this.onScrollToNext.bind(this);
        this.onPrevButtonClickHandler = this.onScrollToPrev.bind(this);
        this.onClickHandler = this.onClick.bind(this);
        this.tabCount = 0;
        this.scrollMode = TabsScrollMode.Auto;
        this.renderMode = TabsRenderMode.Default;
        this.activeTab = "";
        this.sizeMode = SizeMode.Medium;
        this.tabsPosition = TabsPosition.Top;
    }
    get isVertical() {
        return this.tabsPosition === TabsPosition.Left || this.tabsPosition === TabsPosition.Right;
    }
    get listElement() {
        return this.tabListElement.getElementsByTagName("ul")[0];
    }
    getActiveTab() {
        return this.querySelector(DxTabs_1.getSelector(tabIdSelector, this.activeTab));
    }
    get activeTabIndex() {
        const tabs = Array.from(this.querySelectorAll(`.${TabsCssClasses.Item}`));
        return tabs.findIndex((t) => t.classList.contains(CssClasses.Active));
    }
    get scrollViewer() {
        return this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
    }
    get scrollViewerContentContainer() {
        if (!this.tabListElement)
            return null;
        return dom.DomUtils.getNodesByClassName(this.tabListElement, ScrollViewerCssClasses.ContentContainerClassName)[0];
    }
    get prevButton() {
        var _a;
        return (_a = this.findScrollContainer()) === null || _a === void 0 ? void 0 : _a.querySelector(`:scope > .${TabsCssClasses.ButtonScrollPrev}`);
    }
    get nextButton() {
        var _a;
        return (_a = this.findScrollContainer()) === null || _a === void 0 ? void 0 : _a.querySelector(`:scope > .${TabsCssClasses.ButtonScrollNext}`);
    }
    get tabsContentElement() {
        return this.querySelector(`:scope > .${TabsCssClasses.ContentPanel}`);
    }
    connectedOrContentChanged() {
        const navElement = this.querySelector(`:scope > .${TabsCssClasses.TabList}`);
        if (navElement && navElement !== this.tabListElement) {
            this.tabListElement = navElement;
            this.dispose();
            this.subscribeToEvents();
            this.initialize();
            this.isReady = true;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.disposeEvents();
        this.dispose();
    }
    disposeEvents() {
        var _a, _b;
        (_a = this.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(this);
        this.unsubscribe = null;
        (_b = this.unsubscribeFocusUtils) === null || _b === void 0 ? void 0 : _b.call(this);
        this.unsubscribeFocusUtils = null;
    }
    subscribeToEvents() {
        if (!this.tabListElement)
            return;
        this.disposeEvents();
        if (this.scrollMode !== TabsScrollMode.NavButtons && this.scrollMode !== TabsScrollMode.Swipe)
            return;
        const list = this.scrollViewerContentContainer;
        list === null || list === void 0 ? void 0 : list.addEventListener("scroll", this.onScrollHandler);
        list === null || list === void 0 ? void 0 : list.addEventListener("click", this.onClickHandler);
        const prev = this.prevButton;
        prev === null || prev === void 0 ? void 0 : prev.addEventListener("click", this.onPrevButtonClickHandler);
        const next = this.nextButton;
        next === null || next === void 0 ? void 0 : next.addEventListener("click", this.onNextButtonClickHandler);
        this.unsubscribe = () => {
            list === null || list === void 0 ? void 0 : list.removeEventListener("scroll", this.onScrollHandler);
            list === null || list === void 0 ? void 0 : list.removeEventListener("click", this.onClickHandler);
            prev === null || prev === void 0 ? void 0 : prev.removeEventListener("click", this.onPrevButtonClickHandler);
            next === null || next === void 0 ? void 0 : next.removeEventListener("click", this.onNextButtonClickHandler);
        };
        this.unsubscribeFocusUtils = attachEventsForFocusHiding(this.tabListElement);
    }
    dispose() {
        this.isReady = false;
        if (this.updateOverflowStateTimeout) {
            clearTimeout(this.updateOverflowStateTimeout);
            this.updateOverflowStateTimeout = 0;
        }
        if (this.mainElementContentWidthSubscription)
            unsubscribeElement(this.mainElementContentWidthSubscription);
        if (this.contentPanelWidthSubscription)
            unsubscribeElement(this.contentPanelWidthSubscription);
        this.neededCheckSize = false;
    }
    activate(activeTabId) {
        if (!activeTabId)
            return;
        const activeTab = document.querySelector(DxTabs_1.getSelector(tabIdSelector, activeTabId));
        if ((activeTab === null || activeTab === void 0 ? void 0 : activeTab.parentNode) != null) {
            const listElement = this.listElement;
            for (let index = 0; index < this.tabCount; index++) {
                if (Utils.getChildByClassName(listElement.children[index], TabsCssClasses.Item) === activeTab) {
                    this.scrollToIndex(index);
                    break;
                }
            }
        }
    }
    onScroll(_e) {
        this.updateOverflowState();
    }
    initialize() {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame((() => {
            this.prepareScrollMode();
            dom.DomUtils.addClassName(this.tabListElement, ToolbarCssClasses.Loaded);
            this.checkForOverflow();
        }));
        this.mainElementContentWidthSubscription = subscribeElementContentSize(this.tabListElement, (size) => {
            if (this.currentSize.width !== size.width || this.currentSize.height !== size.height) {
                this.currentSize = { width: size.width, height: size.height };
                this.checkForOverflow();
            }
        });
        const contentPanel = this.tabsContentElement;
        if (contentPanel) {
            this.contentPanelWidthSubscription = subscribeElementContentSize(contentPanel, (size) => {
                if (this.contentSize.width !== size.width || this.contentSize.height !== size.height) {
                    this.contentSize = { width: size.width, height: size.height };
                    this.onContentElementResize();
                }
            });
        }
    }
    onContentElementResize() {
        this.updateSelectedContent();
    }
    updated(changedProperties) {
        if (!this.isReady)
            return;
        if (changedProperties.has("scrollMode") || changedProperties.has("tabCount") || changedProperties.has("sizeMode") || changedProperties.has("tabsPosition")) {
            // eslint-disable-next-line new-cap
            RequestAnimationFrame(() => {
                this.prepareScrollMode();
                this.checkForOverflow();
            });
            this.subscribeToEvents();
        }
        if (changedProperties.has("activeTab"))
            this.activate(this.activeTab);
        if (changedProperties.has("renderMode") || changedProperties.has("activeTab"))
            this.updateSelectedContent(this.dispatchActiveTabChangedEvent.bind(this));
        super.updated(changedProperties);
    }
    dispatchActiveTabChangedEvent() {
        this.dispatchEvent(new ActiveTabChangedEvent());
    }
    queryUpdateOverflowState(timeout) {
        if (this.updateOverflowStateTimeout)
            clearTimeout(this.updateOverflowStateTimeout);
        this.updateOverflowStateTimeout = setTimeout(() => {
            this.updateOverflowStateTimeout = 0;
            this.updateOverflowState();
        }, timeout);
    }
    prepareScrollMode() {
        this.neededCheckSize = !!this.tabListElement && this.scrollMode === TabsScrollMode.NavButtons;
    }
    checkForOverflow() {
        if (!this.neededCheckSize || !this.tabListElement)
            return;
        const availableSize = this.isVertical
            ? (this.tabListElement.getBoundingClientRect().height - getTopBottomBordersAndPaddingsSummaryValue(this.tabListElement))
            : (this.tabListElement.getBoundingClientRect().width - getLeftRightBordersAndPaddingsSummaryValue(this.tabListElement));
        this.togleScrollState((availableSize - this.calcNeededSize()) <= -1);
    }
    togleScrollState(isActive) {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(() => {
            dom.DomUtils.toggleClassName(this.tabListElement, TabsCssClasses.HasOverflow, isActive);
            this.canTrackScroll = isActive;
            if (isActive)
                this.queryUpdateOverflowState();
        });
    }
    calcNeededSize() {
        var _a;
        const list = (_a = this.tabListElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("ul")[0];
        if (!list)
            return 0;
        let size = this.isVertical ? getTopBottomBordersAndPaddingsSummaryValue(list) : getLeftRightBordersAndPaddingsSummaryValue(list);
        const items = list.getElementsByTagName("li");
        for (const item of items)
            size += this.isVertical ? (item.getBoundingClientRect().height + getTopBottomMargins(item)) : (item.getBoundingClientRect().width + getLeftRightMargins(item));
        return size;
    }
    updateOverflowState() {
        if (!this.canTrackScroll || this.scrollMode !== TabsScrollMode.NavButtons)
            return;
        const el = this.findScrollContainer();
        if (!el)
            return;
        const list = this.scrollViewerContentContainer;
        if (!list)
            return;
        const [canPrevBtn, canNextBtn] = this.getScrollAccess(list);
        const nextBtn = this.nextButton;
        const prevBtn = this.prevButton;
        changeDom(() => {
            if (nextBtn)
                setOrRemoveAttribute(nextBtn, "disabled", !canNextBtn);
            if (prevBtn)
                setOrRemoveAttribute(prevBtn, "disabled", !canPrevBtn);
        });
    }
    getScrollAccess(scrollContent) {
        if (this.isVertical) {
            const scrollTop = Math.ceil(scrollContent.scrollTop);
            const scrollBottom = scrollContent.scrollHeight - scrollTop;
            const canScrollTop = scrollTop > 0;
            const canScrollBottom = Math.round(scrollBottom) - Math.round(scrollContent.clientHeight) > DxTabs_1.minScrollStep;
            return [canScrollTop, canScrollBottom];
        }
        else {
            const scrollLeft = Math.ceil(scrollContent.scrollLeft);
            const scrollRight = scrollContent.scrollWidth - scrollLeft;
            const canScrollLeft = scrollLeft > 0;
            const canScrollRight = Math.round(scrollRight) - Math.round(scrollContent.clientWidth) > DxTabs_1.minScrollStep;
            return [canScrollLeft, canScrollRight];
        }
    }
    findScrollContainer() {
        if (!this.scrollContainerElement) {
            if (!this.tabListElement)
                return null;
            this.scrollContainerElement = Utils.elementMatchesSelector(this.tabListElement, `.${TabsCssClasses.Scrollable}`) ? this.tabListElement : this.tabListElement.querySelector(`.${TabsCssClasses.Scrollable}`);
        }
        return this.scrollContainerElement;
    }
    onScrollToPrev(e) {
        e.preventDefault();
        const targetIndex = this.findExtremeTabItemIndex(TabsScrollDirection.Back);
        this.scrollToIndex(targetIndex, TabsScrollDirection.Back);
    }
    onScrollToNext(e) {
        e.preventDefault();
        const targetIndex = this.findExtremeTabItemIndex(TabsScrollDirection.Forward);
        this.scrollToIndex(targetIndex, TabsScrollDirection.Forward);
    }
    onClick(e) {
        let element = e.target;
        while (element) {
            if (elementHasCssClass(element, TabsCssClasses.Item)) {
                const tabId = element.getAttribute(tabIdSelector);
                if (tabId)
                    this.activate(tabId);
                break;
            }
            element = element.parentElement;
        }
    }
    getTabElement(index) {
        const tabs = this.listElement.querySelectorAll(":scope > li > ." + TabsCssClasses.Item);
        return tabs[index];
    }
    scrollToIndex(i, direction = TabsScrollDirection.None) {
        var _a, _b;
        if (i > -1 && !!this.scrollViewerContentContainer) {
            const getListItemAncestor = (el) => el.closest("li");
            const visibleTab = this.getTabElement(i);
            const nextTab = (_a = getListItemAncestor(visibleTab)) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
            const prevTab = (_b = getListItemAncestor(visibleTab)) === null || _b === void 0 ? void 0 : _b.previousElementSibling;
            this.scrollToTab(visibleTab, prevTab, nextTab, direction);
        }
    }
    findExtremeTabItemIndex(direction) {
        if (direction === TabsScrollDirection.None)
            return -1;
        const list = this.scrollViewerContentContainer;
        if (!list)
            return -1;
        const tabs = this.listElement.querySelectorAll(":scope > li > ." + TabsCssClasses.Item);
        const listRect = this.getContentFrameRect(list);
        const [start, end, step] = direction === TabsScrollDirection.Forward
            ? [0, this.tabCount, 1]
            : [this.tabCount - 1, -1, -1];
        for (let i = start; i !== end; i += step) {
            const r = tabs[i].getBoundingClientRect();
            if (this.isVertical) {
                if ((direction === TabsScrollDirection.Back && r.top < listRect.top)
                    || (direction === TabsScrollDirection.Forward && r.bottom > listRect.bottom))
                    return i;
            }
            else if ((direction === TabsScrollDirection.Back && r.left < listRect.left)
                || (direction === TabsScrollDirection.Forward && r.right > listRect.right))
                return i;
        }
        return -1;
    }
    getContentFrameRect(el) {
        const styles = dom.DomUtils.getCurrentStyle(el);
        const rect = el.getBoundingClientRect();
        return new Rect(rect.left + dom.DomUtils.pxToInt(styles.paddingLeft) + dom.DomUtils.pxToInt(styles.borderLeftWidth), rect.top + dom.DomUtils.pxToInt(styles.paddingTop) + dom.DomUtils.pxToInt(styles.borderTopWidth), rect.width - dom.DomUtils.pxToInt(styles.paddingRight) - dom.DomUtils.pxToInt(styles.borderRightWidth), rect.height - dom.DomUtils.pxToInt(styles.paddingBottom) - dom.DomUtils.pxToInt(styles.borderBottomWidth));
    }
    scrollToTab(currentTab, prevTab, nextTab, direction) {
        const list = this.scrollViewerContentContainer;
        if (!list)
            return;
        const delta = TabsScrollHelper.calculate(direction, this.isVertical, this.getContentFrameRect(list), RectHelper.fromDomRect(currentTab.getBoundingClientRect()), prevTab ? RectHelper.fromDomRect(prevTab.getBoundingClientRect()) : undefined, nextTab ? RectHelper.fromDomRect(nextTab.getBoundingClientRect()) : undefined);
        if (delta !== 0) {
            if (this.isVertical)
                list.scrollTop += delta;
            else
                list.scrollLeft += delta;
        }
        else if (list.scrollLeft > 0 && direction === TabsScrollDirection.Back) {
            if (this.isVertical)
                list.scrollTop = 0;
            else
                list.scrollLeft = 0;
        }
    }
    updateSelectedContent(callback = null) {
        const contentPanel = this.tabsContentElement;
        if (contentPanel) {
            const activeTab = this.activeTab ? contentPanel.querySelector(DxTabs_1.getSelector(contentIdSelector, this.activeTab)) : null;
            const inactiveTabs = Array.from(contentPanel.querySelectorAll(`:scope > .${TabsCssClasses.Content}${this.activeTab ? `:not(${DxTabs_1.getSelector(contentIdSelector, this.activeTab)})` : ""}`));
            // eslint-disable-next-line new-cap
            RequestAnimationFrame((() => {
                if (activeTab) {
                    activeTab.style.cssText = "";
                    activeTab.setAttribute("data-dx-tab-loaded", "");
                }
                if (this.renderMode !== TabsRenderMode.Default) {
                    const cssText = `position:absolute;visibility:hidden;left:-10000px;top:-10000px;width:${contentPanel.clientWidth}px;height:${contentPanel.clientHeight}px`;
                    inactiveTabs.forEach(x => {
                        x.style.cssText = cssText;
                    });
                }
                if (contentPanel)
                    dom.DomUtils.addClassName(contentPanel, ToolbarCssClasses.Loaded);
                if (callback)
                    setTimeout(() => callback(), 0);
            }));
        }
    }
    static getSelector(selectorString, id) {
        return `[${selectorString}=${id}]`;
    }
};
DxTabs.minScrollStep = 1;
__decorate([
    n({ type: Number, attribute: dxTabsAttributes.tabCount })
], DxTabs.prototype, "tabCount", void 0);
__decorate([
    n({ type: TabsScrollMode, attribute: dxTabsAttributes.scrollMode })
], DxTabs.prototype, "scrollMode", void 0);
__decorate([
    n({ type: TabsRenderMode, attribute: dxTabsAttributes.renderMode })
], DxTabs.prototype, "renderMode", void 0);
__decorate([
    n({ attribute: dxTabsAttributes.activeTab })
], DxTabs.prototype, "activeTab", void 0);
__decorate([
    n({ attribute: dxTabsAttributes.sizeMode })
], DxTabs.prototype, "sizeMode", void 0);
__decorate([
    n({ attribute: dxTabsAttributes.tabsPosition })
], DxTabs.prototype, "tabsPosition", void 0);
DxTabs = DxTabs_1 = __decorate([
    e(DxTagNames.Tabs)
], DxTabs);
function loadModule() { }
const dxTabs = { loadModule };

export { DxTabs, dxTabs as default, tabIdSelector };
//# sourceMappingURL=dx-tabs-24.2.js.map
