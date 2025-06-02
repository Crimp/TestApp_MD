import { C as CssClasses } from './css-classes-24.2.js';

class DraggingUtils {
    static getPointerPosition(evt) {
        return {
            x: evt.pageX,
            y: evt.pageY
        };
    }
    static getDocumentScrollPosition() {
        return {
            x: document.documentElement.scrollLeft,
            y: document.documentElement.scrollTop
        };
    }
    static getElementPosition(element) {
        const { left, top } = element.getBoundingClientRect();
        return {
            x: left,
            y: top
        };
    }
}

class DropTargetRegistry {
    constructor() {
        this.draggingHelpersMap = new Map();
    }
    register(helper) {
        this.draggingHelpersMap.set(helper.getKey(), helper);
    }
    remove(key) {
        this.draggingHelpersMap.delete(key);
    }
    find(key) {
        var _a;
        return (_a = this.draggingHelpersMap.get(key)) !== null && _a !== void 0 ? _a : null;
    }
    getTargets() {
        return [...this.draggingHelpersMap.values()];
    }
}
const dropTargetRegistrySingleton = new DropTargetRegistry();

class DraggingHelperBase {
    constructor() {
        this.draggableContext = null;
        this.isRefreshUIRequested = false;
        this.boundOnDocumentMouseMoveHandler = this.onDocumentMouseMove.bind(this);
        this.boundOnDocumentScrollHandler = this.onDocumentScroll.bind(this);
    }
    start(srcElement, mouseDownEvt) {
        const draggableElement = this.getDraggableElement(srcElement);
        this.draggableContext = this.createDraggableContext(srcElement, draggableElement, mouseDownEvt);
        this.addEventSubscriptions();
        this.updateDraggableElement(mouseDownEvt);
    }
    stop() {
        if (this.draggableContext)
            this.draggableContext.isStarted = false;
        this.isRefreshUIRequested = false;
        this.hideDraggableElement();
        this.removeEventSubscriptions();
        this.draggableContext = null;
    }
    isStarted() {
        var _a;
        return !!((_a = this.draggableContext) === null || _a === void 0 ? void 0 : _a.isStarted);
    }
    hideDraggableElement() {
        if (this.draggableContext) {
            this.draggableContext.dragableElement.style.transform = "";
            this.draggableContext.dragableElement.classList.remove(CssClasses.Visible);
        }
    }
    addEventSubscriptions() {
        document.addEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
        document.addEventListener("scroll", this.boundOnDocumentScrollHandler);
    }
    removeEventSubscriptions() {
        document.removeEventListener("pointermove", this.boundOnDocumentMouseMoveHandler);
        document.removeEventListener("scroll", this.boundOnDocumentScrollHandler);
    }
    refreshUI() {
        if (!this.isRefreshUIRequested) {
            this.isRefreshUIRequested = true;
            requestAnimationFrame(() => this.refreshUICore());
        }
    }
    refreshUICore() {
        this.isRefreshUIRequested = false;
        if (!this.isStarted() || !this.draggableContext)
            return;
        const context = this.draggableContext;
        context.dragableElement.style.transform = `translate(${Math.round(context.draggableElementPosition.x)}px, ${Math.round(context.draggableElementPosition.y)}px)`;
        context.dragableElement.classList.add(CssClasses.Visible);
    }
    createDraggableContext(srcElement, draggableElement, pointerDownEvt) {
        const scrollPosition = DraggingUtils.getDocumentScrollPosition();
        const pointerPosition = DraggingUtils.getPointerPosition(pointerDownEvt);
        return {
            isStarted: true,
            srcElement: srcElement,
            srcElementPosition: DraggingUtils.getElementPosition(srcElement),
            dragableElement: draggableElement,
            mouseOverElement: null,
            mouseOverElementRect: null,
            isPossibleDropItem: false,
            initialCursorPosition: pointerPosition,
            currentCursorPosition: { x: 0, y: 0 },
            draggableElementOffset: DraggingUtils.getElementPosition(draggableElement),
            draggableElementPosition: pointerPosition,
            initialScrollPosition: scrollPosition,
            currentScrollPosition: scrollPosition,
        };
    }
    clearMoveStateFromDraggableContext() {
        if (!this.draggableContext)
            return;
        this.draggableContext.mouseOverElement = null;
        this.draggableContext.mouseOverElementRect = null;
        this.draggableContext.isPossibleDropItem = false;
    }
    setMouseOverElementInfo(dropElement) {
        if (!this.draggableContext)
            return;
        const rect = dropElement.getBoundingClientRect();
        const { currentScrollPosition } = this.draggableContext;
        this.draggableContext.mouseOverElement = dropElement;
        this.draggableContext.mouseOverElementRect = {
            x: rect.left + currentScrollPosition.x,
            y: rect.top + currentScrollPosition.y,
            width: rect.width,
            height: rect.height,
        };
    }
    updateDraggableElementPosition() {
        if (!this.draggableContext)
            return;
        const context = this.draggableContext;
        const x = context.currentCursorPosition.x - context.currentScrollPosition.x;
        const y = context.currentCursorPosition.y - context.currentScrollPosition.y;
        context.draggableElementPosition = { x, y };
    }
    onElementMouseOut(_) {
        this.clearMoveStateFromDraggableContext();
        this.refreshUI();
    }
    onDocumentMouseMove(evt) {
        this.updateDraggableElement(evt);
    }
    onDocumentScroll(_) {
        if (!this.draggableContext)
            return;
        const context = this.draggableContext;
        context.currentScrollPosition = DraggingUtils.getDocumentScrollPosition();
        context.srcElementPosition = DraggingUtils.getElementPosition(context.srcElement);
        if (context.mouseOverElement)
            this.setMouseOverElementInfo(context.mouseOverElement);
        this.updateDraggableElementPosition();
        this.refreshUI();
    }
    updateDraggableElement(evt) {
        if (!this.draggableContext)
            return;
        const context = this.draggableContext;
        context.currentCursorPosition = { x: evt.pageX, y: evt.pageY };
        context.initialScrollPosition = context.currentScrollPosition;
        this.updateDraggableElementPosition();
        this.refreshUI();
    }
}
class ItemDraggingHelper extends DraggingHelperBase {
    constructor() {
        super();
        this.boundOnElementMouseOutHandler = this.onElementMouseOut.bind(this);
    }
    get draggableItemContext() {
        return (this.draggableContext);
    }
    createItemDraggedHandlerArgs() {
        if (!this.draggableItemContext || !this.draggableItemContext.isPossibleDropItem || !this.draggableItemContext.target)
            return null;
        const target = this.draggableItemContext.target;
        return {
            sourceInfo: this.createSourceInfo(),
            targetInfo: target.createTargetInfo()
        };
    }
    createTargetInfo() {
        return { key: this.getKey() };
    }
    activateDropTarget(context) {
        if (!this.isWithinDragging())
            this.draggableContext = context;
        this.addElementListeners(this.getItemDropArea());
    }
    deactivateDropTarget() {
        this.removeElementListeners(this.getItemDropArea());
        if (!this.isWithinDragging())
            this.draggableContext = null;
    }
    start(srcElement, mouseDownEvt) {
        var _a, _b;
        super.start(srcElement, mouseDownEvt);
        (_b = (_a = this.getDraggableHintElement()) === null || _a === void 0 ? void 0 : _a.show) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.getDroppableTargets().forEach(target => target.activateDropTarget.bind(target)(this.draggableContext));
    }
    stop() {
        var _a, _b;
        this.getDroppableTargets().forEach(target => target.deactivateDropTarget.bind(target)());
        (_b = (_a = this.getDraggableHintElement()) === null || _a === void 0 ? void 0 : _a.hide) === null || _b === void 0 ? void 0 : _b.call(_a);
        super.stop();
    }
    createDraggableContext(srcElement, draggableElement, pointerDownEvt) {
        const baseContext = super.createDraggableContext(srcElement, draggableElement, pointerDownEvt);
        return {
            ...baseContext,
            source: this,
            target: this,
            targetKey: null,
        };
    }
    getDroppableTargets() {
        return dropTargetRegistrySingleton.getTargets();
    }
    updateDraggableContext(dropItemElement) {
        if (!this.draggableItemContext)
            return;
        const { isPossibleDropItem, target } = this.draggableItemContext;
        const currentDropArea = this.getItemDropArea();
        if (target && isPossibleDropItem && ItemDraggingHelper.isDescendantElement(currentDropArea, target.getItemDropArea()))
            return;
        this.clearMoveStateFromDraggableContext();
        this.setMouseOverElementInfo(dropItemElement);
        this.draggableItemContext.target = this;
        this.draggableItemContext.targetKey = this.getKey();
        this.draggableItemContext.isPossibleDropItem = this.isItemDropPossible(dropItemElement);
    }
    isWithinDragging() {
        var _a;
        return ((_a = this.draggableItemContext) === null || _a === void 0 ? void 0 : _a.source) === this;
    }
    createSourceInfo() {
        return { key: this.getKey() };
    }
    addElementListeners(element) {
        element.addEventListener("pointerout", this.boundOnElementMouseOutHandler);
    }
    removeElementListeners(element) {
        element.removeEventListener("pointerout", this.boundOnElementMouseOutHandler);
    }
    isItemDropPossible(_dropItemElement) {
        return true;
    }
    getDraggableHintElement() {
        var _a, _b;
        return (_b = (_a = this.draggableContext) === null || _a === void 0 ? void 0 : _a.dragableElement) !== null && _b !== void 0 ? _b : null;
    }
    static isDescendantElement(parent, element) {
        if (parent === element)
            return false;
        return parent.contains(element);
    }
}

export { DraggingHelperBase as D, ItemDraggingHelper as I, dropTargetRegistrySingleton as d };
//# sourceMappingURL=dragging-helper-24.2.js.map
