import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxElementPointerEventsHelper, P as PointerDragStartEvent, c as PointerDragCancelEvent, a as PointerDragStopEvent, H as HandlePointerEventsMode, L as LongTapInteractionTimeout } from './dx-html-element-pointer-events-helper-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { D as DraggingHelperBase } from './dragging-helper-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { S as ScrollViewerAutoScrollingMode } from './dx-scroll-viewer-24.2.js';
import { T as TabsCssClasses, D as DxTabReorderEvent } from './tabs-events-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './dx-html-element-base-24.2.js';
import './scroll-viewer-css-classes-24.2.js';
import './custom-events-helper-24.2.js';

class TabDraggingHelper extends DraggingHelperBase {
    constructor() {
        super(...arguments);
        this.dragIndex = -1;
        this.dropIndex = -1;
        this.dxTabs = null;
        this.tabsUl = null;
        this.dxTabItems = null;
        this.dropTargetIndicator = null;
        this.restoreDisabled = false;
        this.boundOnScroll = this.onScroll.bind(this);
    }
    start(srcElement, mouseDownEvt) {
        var _a;
        this.dxTabs = srcElement.tabs;
        this.tabsUl = srcElement.closest("ul");
        this.dxTabItems = Array.from(this.tabsUl.querySelectorAll(`:scope > li > .${TabsCssClasses.Item}`));
        this.dragIndex = this.dxTabItems.indexOf(srcElement);
        this.dropIndex = this.dragIndex;
        super.start(srcElement, mouseDownEvt);
        this.dropTargetIndicator = this.addDropTargetIndicator();
        this.dxTabs.classList.add(CssClasses.Dragging);
        document.body.classList.add(CssClasses.GrabbingCursor);
        if (!srcElement.classList.contains(CssClasses.Disabled)) {
            srcElement.classList.add(CssClasses.Disabled);
            this.restoreDisabled = true;
        }
        const scrollViewer = this.dxTabs.scrollViewer;
        if (scrollViewer) {
            if (this.dxTabs.isVertical)
                scrollViewer.startAutoScrolling(ScrollViewerAutoScrollingMode.Vertical);
            else
                scrollViewer.startAutoScrolling(ScrollViewerAutoScrollingMode.Horizontal);
            (_a = this.dxTabs.scrollViewerContentContainer) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.boundOnScroll);
        }
        document.addEventListener("wheel", this.boundOnScroll);
    }
    stop() {
        var _a, _b;
        const srcElement = this.draggableContext.srcElement;
        super.stop();
        this.removeDropTargetIndicator();
        this.dxTabs.classList.remove(CssClasses.Dragging);
        if (this.restoreDisabled) {
            srcElement.classList.remove(CssClasses.Disabled);
            this.restoreDisabled = false;
        }
        document.body.classList.remove(CssClasses.GrabbingCursor);
        const scrollViewer = this.dxTabs.scrollViewer;
        if (scrollViewer) {
            (_a = this.dxTabs.scrollViewer) === null || _a === void 0 ? void 0 : _a.stopAutoScrolling();
            (_b = this.dxTabs.scrollViewerContentContainer) === null || _b === void 0 ? void 0 : _b.removeEventListener("scroll", this.boundOnScroll);
        }
        document.removeEventListener("wheel", this.boundOnScroll);
        this.dxTabs = null;
        this.tabsUl = null;
        this.dxTabItems = null;
        this.dragIndex = -1;
        this.dropIndex = -1;
    }
    isValidTarget(tab) {
        return this.dxTabs === tab.tabs;
    }
    getDragIndex() {
        return Number(this.dxTabItems[this.dragIndex].index);
    }
    getDropIndex() {
        return Number(this.dxTabItems[this.dropIndex].index);
    }
    getDraggableElement(srcElement) {
        const originalRect = srcElement.getBoundingClientRect();
        const draggableElement = srcElement.cloneNode(true);
        draggableElement.id = "";
        draggableElement.style.position = "fixed";
        draggableElement.style.top = `${originalRect.top}px`;
        draggableElement.style.left = `${originalRect.left}px`;
        draggableElement.classList.add(CssClasses.Dragging);
        srcElement.parentElement.insertBefore(draggableElement, srcElement);
        return draggableElement;
    }
    hideDraggableElement() {
        super.hideDraggableElement();
        this.draggableContext.dragableElement.remove();
    }
    addDropTargetIndicator() {
        const targetIndicator = document.createElement("div");
        targetIndicator.classList.add(CssClasses.DropTargetIndicator, CssClasses.Invisible);
        this.tabsUl.parentElement.insertBefore(targetIndicator, null);
        return targetIndicator;
    }
    removeDropTargetIndicator() {
        this.dropTargetIndicator.remove();
        this.dropTargetIndicator = null;
    }
    showDropTargetIndicator() {
        this.dropTargetIndicator.classList.remove(CssClasses.Invisible);
    }
    hideDropTargetIndicator() {
        this.dropIndex = this.dragIndex;
        this.dropTargetIndicator.classList.add(CssClasses.Invisible);
    }
    onScroll() {
        this.hideDropTargetIndicator();
    }
    onDocumentScroll(evt) {
        super.onDocumentScroll(evt);
        this.onScroll();
    }
    onDocumentMouseMove(evt) {
        super.onDocumentMouseMove(evt);
        if (evt.target === this.dropTargetIndicator)
            return;
        const tabItem = evt.target.closest(`.${TabsCssClasses.Item}`);
        if (!tabItem || !this.isValidTarget(tabItem)) {
            this.hideDropTargetIndicator();
            return;
        }
        this.updateDropIndex(evt, tabItem);
        this.updateDropTargetIndicatorPosition();
    }
    updateDropIndex(evt, tabItem) {
        var _a;
        const dropIndex = this.dxTabItems.indexOf(tabItem);
        let near;
        let midPoint;
        const bounding = tabItem.getBoundingClientRect();
        if ((_a = this.dxTabs) === null || _a === void 0 ? void 0 : _a.isVertical) {
            midPoint = bounding.y + (bounding.height / 2);
            near = evt.clientY;
        }
        else {
            midPoint = bounding.x + (bounding.width / 2);
            near = evt.clientX;
        }
        if (near > midPoint)
            this.dropIndex = dropIndex + 1;
        else
            this.dropIndex = dropIndex;
        if (this.dragIndex < this.dropIndex)
            this.dropIndex = this.dropIndex - 1;
    }
    updateDropTargetIndicatorPosition() {
        if (this.dragIndex === this.dropIndex) {
            this.hideDropTargetIndicator();
            return;
        }
        this.showDropTargetIndicator();
        const clientRect = this.dxTabItems[this.dropIndex].getBoundingClientRect();
        let top = clientRect.y;
        let left = clientRect.x;
        if (this.dragIndex < this.dropIndex) {
            if (this.dxTabs.isVertical)
                top += clientRect.height - this.dropTargetIndicator.offsetHeight;
            else
                left += clientRect.width - this.dropTargetIndicator.offsetWidth;
        }
        this.dropTargetIndicator.style.top = `${top}px`;
        this.dropTargetIndicator.style.left = `${left}px`;
        if (this.dxTabs.isVertical)
            this.dropTargetIndicator.style.width = `${clientRect.width}px`;
        else
            this.dropTargetIndicator.style.height = `${clientRect.height}px`;
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
}

var DxTabItem_1;
let DxTabItem = DxTabItem_1 = class DxTabItem extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.boundOnDragStartHandler = this.handleDragStart.bind(this);
        this.boundOnDragStopHandler = this.handleDrop.bind(this);
        this.boundOnDragCancelHandler = this.handleDragEnd.bind(this);
        this.pointerEventsHelper = new DxElementPointerEventsHelper(this);
        this.allowReorder = false;
        this.index = -1;
    }
    handleDragStart(e) {
        DxTabItem_1.draggingHelper.start(this, e.detail.source);
        e.stopPropagation();
    }
    handleDragEnd(e) {
        DxTabItem_1.draggingHelper.stop();
        e.stopPropagation();
    }
    handleDrop(e) {
        if (DxTabItem_1.draggingHelper.isValidTarget(this)) {
            const dragIndex = DxTabItem_1.draggingHelper.getDragIndex();
            const dropIndex = DxTabItem_1.draggingHelper.getDropIndex();
            if (dragIndex !== dropIndex)
                this.dispatchEvent(new DxTabReorderEvent(dragIndex, dropIndex));
        }
        DxTabItem_1.draggingHelper.stop();
        e.stopPropagation();
    }
    isDraggableTab() {
        return this.allowReorder;
    }
    get tabs() {
        return this.closest(DxTagNames.Tabs);
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.isDraggableTab())
            this.addDragEventSubscriptions();
    }
    disconnectedCallback() {
        if (this.isDraggableTab())
            this.removeDragEventSubscriptions();
        super.disconnectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has("allowReorder"))
            this.onAllowTabReorderChanged();
        super.updated(changedProperties);
    }
    addDragEventSubscriptions() {
        this.addEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.pointerEventsHelper.initialize();
    }
    removeDragEventSubscriptions() {
        this.removeEventListener(PointerDragStartEvent.eventName, this.boundOnDragStartHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this.boundOnDragCancelHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this.boundOnDragStopHandler);
        this.pointerEventsHelper.dispose();
    }
    onAllowTabReorderChanged() {
        if (this.isDraggableTab())
            this.addDragEventSubscriptions();
        else
            this.removeDragEventSubscriptions();
    }
    // Pointer events interaction
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        const target = evt.target;
        if (target.closest(`.${TabsCssClasses.CloseButton}`))
            return false;
        return true;
    }
};
DxTabItem.draggingHelper = new TabDraggingHelper();
__decorate([
    n({ type: Boolean, attribute: "allow-reorder" })
], DxTabItem.prototype, "allowReorder", void 0);
__decorate([
    n({ type: Number, attribute: "index" })
], DxTabItem.prototype, "index", void 0);
DxTabItem = DxTabItem_1 = __decorate([
    e(DxTagNames.TabItem)
], DxTabItem);

export { DxTabItem };
//# sourceMappingURL=dx-tab-item-24.2.js.map
