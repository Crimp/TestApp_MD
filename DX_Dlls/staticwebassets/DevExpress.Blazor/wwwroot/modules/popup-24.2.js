import { _ as __decorate } from './tslib.es6-24.2.js';
import { a as Rect, L as LayoutHelper, D as DomHelper, S as Size, R as RectHelper } from './layouthelper-24.2.js';
import { R as RafAction } from './rafaction-24.2.js';
import { P as Point, a as PointHelper } from './point-24.2.js';
import { S as ScreenHelper } from './screenhelper-24.2.js';
import { T as TransformHelper } from './transformhelper-24.2.js';
import { PositionChangingEvent } from './positiontracker-24.2.js';
import { D as Display } from './constants-24.2.js';
import { BranchActivatedEvent, BranchIdContext, BranchRefreshedEvent, BranchCreatedEvent, BranchUpdatedEvent, BranchRemovedEvent } from './branch-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { L as LogicalTreeHelper, i as isISupportCaptureHierarchyElement, a as isIPopupBaseClientSideApi, b as isILogicalOwner } from './logicaltreehelper-24.2.js';
import { g as getPopupRootSingleton, P as PortableElementsChangedEvent } from './portal-24.2.js';
import { H as HandlePointerEventsMode, T as TapInteractionTimeout, P as PointerDragStartEvent, a as PointerDragStopEvent, D as DxElementPointerEventsHelper, b as PointerEventHelper } from './dx-html-element-pointer-events-helper-24.2.js';
import { D as DxUIElement } from './dx-ui-element-24.2.js';
import { L as Locker, C as CaptureManager } from './capture-manager-24.2.js';
import { n as nameofFactory } from './nameof-factory-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { f as focusTrapSingleton } from './focustrap-24.2.js';
import { k as key } from './key-24.2.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils, L as LeaveDirection, D as DxKeyboardNavigator } from './keyboard-navigation-strategy-24.2.js';
import { b as browser } from './browser-24.2.js';
import { d as dom } from './dom-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { s, x, i } from './lit-element-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { containsFocusHiddenAttribute } from './focus-utils-24.2.js';
import { d as dxPopupPortalTagName, a as dxWindowDialogTagName, b as dxPopupRootTagName } from './constants-24.22.js';

class MouseHelper {
    constructor() {
        this._x = 0;
        this._y = 0;
        this.handlePointerDown = this.pointerEventHandler.bind(this);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    subscribe() {
        window.addEventListener("pointerdown", this.handlePointerDown, { capture: true, passive: true });
        window.addEventListener("pointermove", this.handlePointerDown, { capture: true, passive: true });
        window.addEventListener("pointerup", this.handlePointerDown, { capture: true, passive: true });
    }
    unsubscribe() {
        window.removeEventListener("pointerdown", this.handlePointerDown);
        window.removeEventListener("pointermove", this.handlePointerDown);
        window.removeEventListener("pointerup", this.handlePointerDown);
    }
    pointerEventHandler(ev) {
        this._x = ev.pageX;
        this._y = ev.pageY;
    }
}
const mouseHelperSingleton = new MouseHelper();
mouseHelperSingleton.subscribe();

class Vector {
    get x() {
        return this.xField;
    }
    get y() {
        return this.yField;
    }
    constructor(x, y) {
        this.xField = x;
        this.yField = y;
    }
}
Vector.zero = new Vector(0, 0);
class VectorHelper {
    static add(left, right) {
        return new Vector(left.x + right.x, left.y + right.y);
    }
    static multiply(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * (1.0 / scalar));
    }
    static divide(vector, scalar) {
        return new Vector(vector.x * (1.0 / scalar), vector.y * (1.0 / scalar));
    }
    static getLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }
    static normalize(vector) {
        const scalar = Math.max(Math.abs(vector.x), Math.max(vector.y));
        const divideVector = VectorHelper.divide(vector, scalar);
        return VectorHelper.divide(divideVector, VectorHelper.getLength(divideVector));
    }
}

class PositionTrackerObserverEntry {
    get position() {
        return this.callback(this.target);
    }
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
    }
}
class PositionTrackerObserver {
    get raf() {
        return this.options.raf;
    }
    constructor(callback, options) {
        this.observer = null;
        this.elementScrollHandler = this.handleElementScroll.bind(this);
        this.resizeHandler = this.handleResize.bind(this);
        this.overflows = [];
        this.resizing = [];
        this.targetElement = null;
        this.rafAction = new RafAction();
        this.callback = callback;
        this.options = options;
    }
    observe(targetElement) {
        this.disconnect();
        this.targetElement = targetElement;
        this.subscribeEvents();
    }
    disconnect() {
        var _a;
        this.unsubscribeEvents();
        this.rafAction.cancel();
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.observer = null;
    }
    getTargetBoundingClientRect() {
        if (!this.targetElement)
            return Rect.Empty;
        return LayoutHelper.getRelativeElementRect(this.targetElement);
    }
    subscribeEvents() {
        if (!this.targetElement)
            return;
        window.addEventListener("scroll", this.elementScrollHandler);
        const overflows = [];
        const resizing = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const node of LayoutHelper.getRootPathAndSelf(this.targetElement)) {
            const element = node;
            if (!element)
                return;
            if (this.isInShadowDom(element))
                continue;
            const resizeObserver = new ResizeObserver(this.resizeHandler);
            resizeObserver.observe(element, { box: "border-box" });
            resizing.push();
            if (!DomHelper.isScrollable(element))
                continue;
            element.addEventListener("scroll", this.elementScrollHandler, { capture: true });
            overflows.push(element);
        }
        this.overflows = overflows;
        this.resizing = resizing;
    }
    isInShadowDom(element) {
        return element.getRootNode() instanceof ShadowRoot;
    }
    unsubscribeEvents() {
        window.removeEventListener("scroll", this.elementScrollHandler);
        this.overflows.forEach(x => {
            x.removeEventListener("scroll", this.elementScrollHandler);
        });
        this.resizing.forEach(x => {
            x.disconnect();
        });
    }
    handleResize(entries, observer) {
        this.raisePositionChanged();
    }
    handleElementScroll(ev) {
        this.raisePositionChanged();
    }
    raisePositionChanged() {
        if (this.raf)
            this.rafAction.execute(() => this.raisePositionChangedCore());
        else
            this.raisePositionChangedCore();
    }
    raisePositionChangedCore() {
        this.callback(new PositionTrackerObserverEntry(this.targetElement, this.getTargetBoundingClientRect), this);
    }
}

class ElementObserver {
    get hasObservedElement() {
        return this.observedElement !== null;
    }
    constructor(selector, callback) {
        this.target = null;
        this.targetMutationObserver = new MutationObserver(mutations => this.handleTargetMutations.bind(this));
        this.observedElement = null;
        this.selector = selector;
        this.callback = callback;
    }
    observe(target = null) {
        this.disconnect();
        this.target = target;
        const root = target !== null && target !== void 0 ? target : document;
        this.observedElement = root.querySelector(this.selector);
        if (this.observedElement)
            this.raiseElementChanged(null, this.observedElement);
        this.targetMutationObserver.observe(root, { subtree: true, childList: true });
    }
    disconnect() {
        this.targetMutationObserver.disconnect();
    }
    raiseElementChanged(oldElement, element) {
        this.callback({ oldElement: oldElement, element: element }, this);
    }
    handleTargetMutations(mutations, observer) {
        if (this.hasObservedElement)
            this.processRemovedNodes(mutations);
        else
            this.processAddedNodes(mutations);
    }
    processRemovedNodes(mutations) {
        const elementRemoved = this.processRemovedNodesInternal(mutations);
        if (elementRemoved) {
            this.raiseElementChanged(this.observedElement, null);
            this.observedElement = null;
        }
    }
    processRemovedNodesInternal(mutations) {
        mutations.forEach(m => {
            m.removedNodes.forEach(n => {
                if (this.observedElement === n)
                    return true;
            });
        });
        return false;
    }
    processAddedNodes(mutations) {
        const [elementAdded, element] = this.processAddedNodesInternal(mutations);
        if (elementAdded) {
            this.raiseElementChanged(this.observedElement, element);
            this.observedElement = element;
        }
    }
    processAddedNodesInternal(mutations) {
        var _a;
        const root = (_a = this.target) !== null && _a !== void 0 ? _a : document;
        const observedElement = root.querySelector(this.selector);
        return [observedElement !== null, observedElement];
    }
}

class TaskCompletionSource {
    constructor() {
        this._isResolved = false;
        this._isRejected = false;
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    get promise() {
        return this._promise;
    }
    resolve(value) {
        this._isResolved = true;
        this._resolve(value);
    }
    reject(reason) {
        this._isRejected = true;
        this._reject(reason);
    }
    tryResolve(value) {
        if (!this._isResolved && !this._isRejected)
            this.resolve(value);
    }
    tryReject(reason) {
        if (!this._isResolved && !this._isRejected)
            this.reject(reason);
    }
}

var BranchType;
(function (BranchType) {
    BranchType["Modal"] = "modal";
    BranchType["DropDown"] = "dropdown";
    BranchType["Flyout"] = "flyout";
    BranchType["Window"] = "window";
    BranchType["Root"] = "root";
    BranchType["DragHint"] = "draghint";
})(BranchType || (BranchType = {}));
class BranchNode {
    get type() {
        return this._type;
    }
    get children() {
        return Array.from(this._children);
    }
    get hasChildren() {
        return this._children.size > 0;
    }
    get id() {
        return this._id;
    }
    constructor(id, parentId, type) {
        this._children = new Set();
        this._id = id;
        this._parentId = parentId;
        this._type = type;
    }
    add(node) {
        this._children.add(node);
    }
    remove(node) {
        this._children.delete(node);
    }
}
class BranchTree {
    constructor() {
        this.idToNode = new Map();
        this.idToParentId = new Map();
        this.idToNode.set(BranchTree.root, new BranchNode(BranchTree.root, BranchTree.root, BranchType.Root));
    }
    add(id, parentId, type) {
        parentId = parentId !== null && parentId !== void 0 ? parentId : BranchTree.root;
        const node = new BranchNode(id, parentId, type);
        this.idToParentId.set(id, parentId);
        this.idToNode.set(id, node);
        const parent = this.idToNode.get(parentId);
        parent.add(node);
    }
    remove(id) {
        if (!this.idToNode.has(id))
            return;
        const parentId = this.idToParentId.get(id);
        const parent = this.idToNode.get(parentId);
        const node = this.idToNode.get(id);
        this.idToParentId.delete(id);
        this.idToNode.delete(id);
        parent.remove(node);
    }
    getParentId(id) {
        return this.idToParentId.get(id);
    }
    getBranchNode(id) {
        var _a;
        return (_a = this.idToNode.get(id)) !== null && _a !== void 0 ? _a : null;
    }
    findRoot(id) {
        let previousId = id;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const currentId = this.idToParentId.get(previousId);
            if (currentId === BranchTree.root)
                return previousId;
            previousId = currentId;
        }
    }
}
BranchTree.baseIndex = 1050;
BranchTree.root = "";
class VisibleBranchNode {
    get type() {
        return this.branchNode.type;
    }
    get index() {
        return this._index;
    }
    set index(val) {
        this._index = val;
    }
    get children() {
        return this._children;
    }
    get hasChildren() {
        return this._children.length > 0;
    }
    get id() {
        return this.branchNode.id;
    }
    constructor(branchNode) {
        this._children = new Array();
        this._index = 0;
        this.branchNode = branchNode;
    }
    add(child) {
        this._children.push(child);
    }
    remove(child) {
        this._children = this._children.filter(x => x !== child);
    }
    peek() {
        return this._children[this._children.length - 1];
    }
    activate(child) {
        if (this.peek() === child)
            return false;
        this.remove(child);
        this.add(child);
        return true;
    }
}
class VisibleBranchTree {
    constructor() {
        this.idToNode = new Map();
        this.rootNode = new VisibleBranchNode(branchTreeSingleton.getBranchNode(""));
        this.idToNode.set("", this.rootNode);
    }
    getIndex(id) {
        const node = this.idToNode.get(id);
        return node ? node.index : 0;
    }
    register(id) {
        const root = branchTreeSingleton.findRoot(id);
        const node = branchTreeSingleton.getBranchNode(id);
        const visibleNode = new VisibleBranchNode(node);
        this.idToNode.set(id, visibleNode);
        if (id === root)
            this.rootNode.add(visibleNode);
        else {
            const parent = branchTreeSingleton.getParentId(id);
            const parentNode = this.idToNode.get(parent);
            parentNode.add(visibleNode);
        }
        this.refresh();
    }
    unregister(id) {
        var _a;
        const visibleNode = (_a = this.idToNode.get(id)) !== null && _a !== void 0 ? _a : null;
        if (!visibleNode)
            return;
        const parentNodeId = branchTreeSingleton.getParentId(visibleNode.id);
        const parentVisibleNode = this.idToNode.get(parentNodeId);
        parentVisibleNode.remove(visibleNode);
        // eslint-disable-next-line no-restricted-syntax
        for (const childId of this.iterateBranch(id))
            this.idToNode.delete(childId);
        this.idToNode.delete(id);
        this.refresh();
    }
    activate(id) {
        var _a, _b, _c;
        let node = (_a = this.idToNode.get(id)) !== null && _a !== void 0 ? _a : null;
        if (!node)
            return false;
        let activated = false;
        while (node) {
            const parentId = branchTreeSingleton.getParentId(node.id);
            const parentNode = (_b = this.idToNode.get(parentId)) !== null && _b !== void 0 ? _b : null;
            activated = activated || ((_c = parentNode === null || parentNode === void 0 ? void 0 : parentNode.activate(node)) !== null && _c !== void 0 ? _c : false);
            node = parentNode;
        }
        return activated;
    }
    iterateBranch(id) {
        let result = new Array();
        const node = this.idToNode.get(id);
        if (!(node === null || node === void 0 ? void 0 : node.hasChildren))
            return result;
        // eslint-disable-next-line no-restricted-syntax
        for (const child of node.children) {
            result.push(child.id);
            result = result.concat(this.iterateBranch(child.id));
        }
        return result.sort((left, right) => this.idToNode.get(right).index - this.idToNode.get(left).index);
    }
    refresh() {
        let baseIndexTaken = false;
        let index = BranchTree.baseIndex;
        for (const childId in this.rootNode.children) {
            const child = this.rootNode.children[childId];
            if (baseIndexTaken)
                index = index + this.incrementByType(child.type);
            else
                baseIndexTaken = true;
            index = this.calculateZIndices(child, index);
        }
    }
    calculateZIndices(node, index) {
        node.index = index;
        if (node.hasChildren) {
            // eslint-disable-next-line no-restricted-syntax
            for (const child of node.children) {
                index = index + this.incrementByType(child.type);
                index = this.calculateZIndices(child, index);
            }
        }
        return index;
    }
    incrementByType(type) {
        switch (type) {
            case BranchType.Flyout:
            case BranchType.DropDown:
                return 10;
            case BranchType.Modal:
                return 100;
        }
        return 10;
    }
    setTopMostBranch(topMostBranchId) {
        let currentBranch = this.idToNode.get(topMostBranchId) || null;
        while (!!currentBranch && currentBranch.type !== BranchType.Modal) {
            const parentBranchId = branchTreeSingleton.getParentId(currentBranch.id);
            if (parentBranchId) {
                const parentBranch = this.idToNode.get(parentBranchId);
                parentBranch.activate(currentBranch);
                currentBranch = parentBranch;
            }
            else {
                this.rootNode.activate(currentBranch);
                currentBranch = null;
            }
        }
        this.refresh();
    }
}
const branchTreeSingleton = new BranchTree();
const visibleBranchTreeSingleton = new VisibleBranchTree();

var PopupCloseReason;
(function (PopupCloseReason) {
    PopupCloseReason["OutsideClick"] = "OutsideClick";
    PopupCloseReason["EscapePress"] = "EscapePress";
    PopupCloseReason["Programmatically"] = "Programmatically";
})(PopupCloseReason || (PopupCloseReason = {}));

class PopupClosingHierarchyHelper {
    static async closeHierarchyAsync(popup, event, options, closeReason) {
        var _a;
        const popupPointerOptions = options;
        let result = true;
        if (popupPointerOptions.requestClose || popup.closeOnOutsideClick) {
            // eslint-disable-next-line no-restricted-syntax
            for (const child of visibleBranchTreeSingleton.iterateBranch(popup.branchId)) {
                const popup = await getPopupRootSingleton().getPopup(child);
                result = (_a = await (popup === null || popup === void 0 ? void 0 : popup.closeAsync(options, closeReason))) !== null && _a !== void 0 ? _a : true;
                if (!result)
                    break;
            }
        }
        const hasChildren = popup.children.length > 0;
        if (result && popup.closeOnOutsideClick && hasChildren)
            await popup.closeAsync(options, closeReason);
    }
    static async closeRootAsync(popup, event, options, closeReason) {
        const popupElement = popup;
        const parent = LogicalTreeHelper.findParent(popupElement, x => isISupportCaptureHierarchyElement(x));
        if (parent) {
            const pointerCaptureOptions = options;
            pointerCaptureOptions.requestClose = pointerCaptureOptions.requestClose || popup.closeOnOutsideClick;
            await parent.processCapturedPointerAsync(event, options);
            if (options.handled)
                return;
        }
        await PopupClosingHierarchyHelper.closeHierarchyAsync(popup, event, options, closeReason);
    }
    static async tryCloseCapturedElement(popup, event, options) {
        if (options.nextInteractionHandled) {
            if (popup.closeOnOutsideClick)
                await PopupClosingHierarchyHelper.closeHierarchyAsync(popup, event, options, PopupCloseReason.OutsideClick);
            else
                return;
        }
        else
            await PopupClosingHierarchyHelper.closeRootAsync(popup, event, options, PopupCloseReason.OutsideClick);
    }
}

class SimpleEvent {
    constructor() {
        this.handlers = [];
        this.raise = ((args) => {
            this.handlers.slice(0).forEach(h => h(args));
        });
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
}
class Signal {
    constructor() {
        this.handlers = [];
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    raise(source, data) {
        this.handlers.slice(0).forEach(h => h(source, data));
    }
}

class DxSupportCaptureElement extends DxUIElement {
    constructor() {
        super(...arguments);
        this.branchId = "";
        this.parentBranchId = null;
        this._isCaptured = false;
        this._locker = null;
        this.capturingAction = () => { };
        this.releasingCaptureAction = () => { };
    }
    get locker() {
        return this._locker || (this._locker = new Locker());
    }
    get isCaptured() {
        return this._isCaptured;
    }
    gotCapture() {
        if (!this._isCaptured) {
            this._isCaptured = true;
            this.capturingAction();
        }
    }
    lostCapture() {
        if (this._isCaptured) {
            this._isCaptured = false;
            this.releasingCaptureAction();
        }
    }
    get isCloseOnPointerUp() {
        return false;
    }
}

const dxPopupCellTagName = "dxbl-popup-cell";
let DxPopupCell = class DxPopupCell extends s {
    constructor() {
        super(...arguments);
        this._portal = null;
        this.elements = null;
        this.elementsChangedHandler = this.handleElementsChanged.bind(this);
        this.zIndexDeltaChangeHandler = this.handleZIndexDeltaChange.bind(this);
        this.baseZIndex = 0;
        this.zIndexDelta = 0;
    }
    get zIndex() {
        return this.baseZIndex + this.zIndexDelta;
    }
    createRenderRoot() {
        return this;
    }
    get portal() {
        return this._portal;
    }
    setPortal(portal) {
        this.unsubscribe();
        this._portal = portal;
        this.subscribe();
        this.updateElements(this.elements, portal.portable);
    }
    connectedCallback() {
        super.connectedCallback();
        this.subscribe();
    }
    subscribe() {
        this.addEventListener(PopupZIndexDeltaChangeEvent.eventName, this.zIndexDeltaChangeHandler);
        if (!this.portal)
            return;
        this.portal.addEventListener(PortableElementsChangedEvent.eventName, this.elementsChangedHandler);
    }
    unsubscribe() {
        this.removeEventListener(PopupZIndexDeltaChangeEvent.eventName, this.zIndexDeltaChangeHandler);
        if (!this.portal)
            return;
        this.portal.removeEventListener(PortableElementsChangedEvent.eventName, this.elementsChangedHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe();
    }
    handleElementsChanged(e) {
        this.updateElements(this.elements, e.detail.elements);
    }
    updateElements(oldElements, elements) {
        if (oldElements)
            oldElements.forEach(x => this.removeChild(x));
        this.elements = elements;
        if (elements)
            this.append(...elements);
    }
    handleZIndexDeltaChange(e) {
        this.zIndexDelta = e.detail.zIndex;
    }
    updated(updated) {
        if (updated.has("zIndex") || updated.has("zIndexDelta") || updated.has("baseZIndex"))
            this.style.zIndex = String(this.zIndex);
    }
};
__decorate([
    n({ type: Number })
], DxPopupCell.prototype, "baseZIndex", void 0);
__decorate([
    n({ type: Number })
], DxPopupCell.prototype, "zIndexDelta", void 0);
__decorate([
    n({ type: Number, reflect: true })
], DxPopupCell.prototype, "zIndex", null);
DxPopupCell = __decorate([
    e(dxPopupCellTagName)
], DxPopupCell);

class ModalShadowStack {
    constructor() {
        this._shadowBranchEvent = new SimpleEvent();
        this._topShadowId = null;
        this.shadowSet = new Set();
    }
    get shadowBranchChanged() {
        return this._shadowBranchEvent;
    }
    register(branchId) {
        this.shadowSet.add(branchId);
        this.raiseTopShadowStackChanged();
    }
    unregister(branchId) {
        this.shadowSet.delete(branchId);
        this.raiseTopShadowStackChanged();
    }
    raiseTopShadowStackChanged() {
        const topId = this.getTopShadowModal();
        if (this._topShadowId === topId)
            return;
        this._topShadowId = topId;
        const top = { branch: topId };
        this._shadowBranchEvent.raise(top);
    }
    getTopShadowModal() {
        let maxIndex = -1;
        let topId = "";
        // eslint-disable-next-line no-restricted-syntax
        for (const id of Array.from(this.shadowSet)) {
            const index = visibleBranchTreeSingleton.getIndex(id);
            if (index > maxIndex) {
                maxIndex = index;
                topId = id;
            }
        }
        return topId;
    }
}
const modalShadowStackSingleton = new ModalShadowStack();

const PREVENT_SAFARI_SCROLLING_CLASS = CssClasses.Prefix + "-prevent-safari-scrolling";
class BodyScrollLock {
    constructor() {
        this.paddingCoerced = false;
        this.bodyScrollTop = 0;
        this.bodyScrollPadding = "";
        this.scrollLocked = false;
        this.scrollLockHostSet = new Set();
    }
    register(branchId) {
        this.scrollLockHostSet.add(branchId);
        this.updateScrollLock();
    }
    unregister(branchId) {
        this.scrollLockHostSet.delete(branchId);
        this.updateScrollLock();
    }
    updateScrollLock() {
        this.toggleBodyScroll(document.body, this.scrollLockHostSet.size > 0);
    }
    toggleBodyScroll(body, locked) {
        if (locked === this.scrollLocked)
            return;
        this.scrollLocked = locked;
        this.toggleScrollPadding(body, locked);
        dom.DomUtils.toggleClassName(body, "dxbl-modal-open", locked);
        if (browser.Browser.Safari)
            this.toggleSafariScroll(body, locked);
    }
    toggleScrollPadding(body, locked) {
        if (locked) {
            const scrollBarWidth = DomHelper.getVerticalScrollbarWidth();
            if (scrollBarWidth === 0)
                return;
            this.paddingCoerced = true;
            const computedBodyPaddingRight = parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
            this.bodyScrollPadding = document.body.style.paddingRight;
            body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
            return;
        }
        if (!this.paddingCoerced)
            return;
        body.style.paddingRight = this.bodyScrollPadding;
        this.paddingCoerced = false;
    }
    toggleSafariScroll(body, locked) {
        if (locked) {
            this.bodyScrollTop = window.pageYOffset;
            dom.DomUtils.toggleClassName(body, PREVENT_SAFARI_SCROLLING_CLASS, locked);
        }
        else {
            dom.DomUtils.toggleClassName(body, PREVENT_SAFARI_SCROLLING_CLASS, locked);
            window.scrollTo(0, this.bodyScrollTop);
        }
    }
}
const bodyScrollLockSingleton = new BodyScrollLock();

class MeasureTarget {
    constructor(action) {
        this.action = action;
    }
    measure() {
        this.action(this);
    }
}
class MutationTarget {
    constructor(action) {
        this.action = action;
    }
    mutate() {
        this.action(this);
    }
}
const mutationPool = new Set();
const measurePool = new Set();
function attachToPool(element, pool, poolName) {
    safeModifyPool(element, pool, pool.add, true, poolName);
}
function detachFromPool(element, pool, poolName) {
    safeModifyPool(element, pool, pool.delete, false, poolName);
}
function safeModifyPool(element, pool, modifyAction, modifyErrorCondition, poolName) {
    if (pool.has(element) === modifyErrorCondition)
        throw new Error(`Element already ${(modifyErrorCondition ? "attached to" : "detached from")} to the ${poolName} pipeline`);
    modifyAction.call(pool, element);
    checkRafPipeline();
}
let rafId = -1;
function hasAnyMeasureOrMutateTargets() {
    return measurePool.size !== 0 || mutationPool.size !== 0;
}
function checkRafPipeline() {
    if (hasAnyMeasureOrMutateTargets()) {
        if (rafId === -1)
            rafId = requestAnimationFrame(doRafRoutine);
    }
    else if (rafId !== -1) {
        cancelAnimationFrame(rafId);
        rafId = -1;
    }
}
function doRafRoutine(ticks) {
    measurePool.forEach(c => c.measure());
    mutationPool.forEach(c => c.mutate());
    if (hasAnyMeasureOrMutateTargets())
        rafId = requestAnimationFrame(doRafRoutine);
    else
        rafId = -1;
}
function attachToMutationPipeline(element) {
    attachToPool(element, mutationPool, "mutation");
}
function detachFromMutationPipeline(element) {
    detachFromPool(element, mutationPool, "mutation");
}
function attachToMeasurePipeline(element) {
    attachToPool(element, measurePool, "measure");
}
function detachFromMeasurePipeline(element) {
    detachFromPool(element, measurePool, "measure");
}
function measureAsync(element, measureAction) {
    return new Promise((resolve, _) => {
        attachToMeasurePipeline(new MeasureTarget((self) => {
            detachFromMeasurePipeline(self);
            resolve(measureAction(element));
        }));
    });
}
function mutateAsync(element, mutationAction) {
    return new Promise((resolve, _) => {
        attachToMutationPipeline(new MutationTarget((self) => {
            detachFromMutationPipeline(self);
            resolve(mutationAction(element));
        }));
    });
}

class WindowCssClasses {
}
WindowCssClasses.Window = CssClasses.Prefix + "-window";
WindowCssClasses.WindowHeader = WindowCssClasses.Window + "-header";
WindowCssClasses.WindowHeaderButton = WindowCssClasses.WindowHeader + "-button";
class PopupCssClasses {
}
PopupCssClasses.Popup = CssClasses.Prefix + "-popup";
PopupCssClasses.PopupHeader = PopupCssClasses.Popup + "-header";
PopupCssClasses.PopupHeaderButton = PopupCssClasses.PopupHeader + "-button";
PopupCssClasses.PopupResized = PopupCssClasses.Popup + "-resized";

const dialogCloseBtnSelector = `.${WindowCssClasses.WindowHeaderButton}, .${PopupCssClasses.PopupHeaderButton}`;
class PopupHeaderDragCompletedEventContext {
    constructor(start, end) {
        this.x = end.x;
        this.y = end.y;
    }
}
class PopupHeaderDragCompletedEvent extends CustomEvent {
    constructor(start, end) {
        super(PopupHeaderDragCompletedEvent.eventName, {
            detail: new PopupHeaderDragCompletedEventContext(start, end),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupHeaderDragCompletedEvent.eventName = "dxbl:popup-dragcompleted";
CustomEventsHelper.register(PopupHeaderDragCompletedEvent.eventName, x => {
    return x.detail;
});
class PopupHeaderDragStartedEventContext {
    constructor(start) {
        this.x = start.x;
        this.y = start.y;
    }
}
class PopupHeaderDragStartedEvent extends CustomEvent {
    constructor(start) {
        super(PopupHeaderDragStartedEvent.eventName, {
            detail: new PopupHeaderDragStartedEventContext(start),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupHeaderDragStartedEvent.eventName = "dxbl:popup-dragstarted";
CustomEventsHelper.register(PopupHeaderDragStartedEvent.eventName, x => {
    return x.detail;
});
class PopupHeaderDragEventContext {
    constructor(start) {
        this.x = start.x;
        this.y = start.y;
    }
}
class PopupHeaderDragEvent extends CustomEvent {
    constructor(start) {
        super(PopupHeaderDragEvent.eventName, {
            detail: new PopupHeaderDragEventContext(start),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
PopupHeaderDragEvent.eventName = "dxbl-popup.drag";
const draggingClassName = "dxbl-popup-dragging";
let DxPopupHeader = class DxPopupHeader extends s {
    constructor() {
        super();
        this.allowDrag = false;
        this.showCloseButton = false;
    }
    updated(props) {
        if (props.has("showCloseButton") || this.showCloseButton)
            this.preventCloseButtonDragging();
    }
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
    render() {
        return x `<slot></slot>`;
    }
    preventCloseButtonDragging() {
        const closeButton = this.querySelector(dialogCloseBtnSelector);
        if (closeButton) {
            closeButton.addEventListener("pointerdown", (event) => {
                event.stopPropagation();
            });
        }
    }
};
__decorate([
    n({ type: Boolean, attribute: "allow-drag", reflect: false })
], DxPopupHeader.prototype, "allowDrag", void 0);
__decorate([
    n({ type: Boolean, attribute: "show-close-button", reflect: false })
], DxPopupHeader.prototype, "showCloseButton", void 0);
DxPopupHeader = __decorate([
    e("dxbl-popup-header")
], DxPopupHeader);

class PositionRestriction {
    constructor(minX, minY, maxX, maxY) {
        this.min = new Point(minX, minY);
        this.max = new Point(maxX, maxY);
    }
}
function calculateViewPortPositionRestriction(topLeftCorner) {
    return new PositionRestriction(window.scrollX - topLeftCorner.x, window.scrollY - topLeftCorner.y, window.scrollX + window.innerWidth - topLeftCorner.x, window.scrollY + window.innerHeight - topLeftCorner.y);
}
function calculatePositionDelta(parent, e) {
    const box = parent.getBoundingClientRect();
    return new Point(Math.floor(e.clientX - box.x), Math.floor(e.clientY - box.y));
}
function createPoint(positionDelta, e, viewPortPositionRestriction) {
    const min = viewPortPositionRestriction.min;
    const max = viewPortPositionRestriction.max;
    return new Point(calculateCoordinate(min.x, max.x, e.clientX + window.scrollX - positionDelta.x), calculateCoordinate(min.y, max.y, e.clientY + window.scrollY - positionDelta.y));
}
function calculateCoordinate(min, max, coordinate) {
    return Math.floor(Math.min(max, Math.max(min, coordinate)));
}
class DragHandler {
    constructor(mainElement, onStart, onMove, onEnd, checkPermission = null) {
        this.mainElement = mainElement;
        this.onStart = onStart;
        this.onMove = onMove;
        this.onEnd = onEnd;
        this.checkPermission = checkPermission;
        this.handlersAdded = false;
        this.dragHandler = this.handleDragStart.bind(this);
    }
    addHandlers() {
        if (this.handlersAdded)
            return;
        this.mainElement.addEventListener(PointerDragStartEvent.eventName, this.dragHandler);
        this.handlersAdded = true;
    }
    removeHandlers() {
        this.mainElement.removeEventListener(PointerDragStartEvent.eventName, this.dragHandler);
        this.handlersAdded = false;
    }
    handleDragStart(_e) {
        if (this.checkPermission !== null && !this.checkPermission())
            return;
        const e = _e;
        const positionDelta = calculatePositionDelta(this.mainElement, e.detail.source);
        const vpRestriction = calculateViewPortPositionRestriction(positionDelta);
        const initialPosition = createPoint(positionDelta, e.detail.source, vpRestriction);
        let currentPosition = initialPosition;
        let lastDispatchedPosition = null;
        const onPointerMove = (e) => {
            const isButtonUnpressed = e.buttons === 0;
            if (isButtonUnpressed)
                return;
            currentPosition = createPoint(positionDelta, e, vpRestriction);
            if (lastDispatchedPosition === null || !PointHelper.areClose(lastDispatchedPosition, currentPosition)) {
                lastDispatchedPosition = currentPosition;
                this.onMove(lastDispatchedPosition);
            }
        };
        document.addEventListener("pointermove", onPointerMove, { passive: true });
        this.mainElement.addEventListener(PointerDragStopEvent.eventName, (stopArgs) => {
            document.removeEventListener("pointermove", onPointerMove);
            const e = stopArgs;
            const finalPosition = createPoint(positionDelta, e.detail.source, vpRestriction);
            lastDispatchedPosition !== null && lastDispatchedPosition !== void 0 ? lastDispatchedPosition : (lastDispatchedPosition = finalPosition);
            this.onEnd(e.detail.source.buttons !== 0 ? finalPosition : lastDispatchedPosition, initialPosition);
        }, { once: true });
        this.onStart(initialPosition);
    }
}

class DxPopupBaseDialog extends s {
    static get styles() {
        return i `
            :host {
                display: flex;
            }
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        DataQaUtils.setLoaded(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        DataQaUtils.removeLoaded(this);
    }
    render() {
        return x `<slot></slot>`;
    }
}
class DxPopupDraggableDialog extends DxPopupBaseDialog {
    get draggableElement() {
        return this.allowDragByHeaderOnly ? this.header : this;
    }
    get canDrag() {
        return this.allowDrag && (this.header !== null || !this.allowDragByHeaderOnly);
    }
    constructor() {
        super();
        this.allowDrag = false;
        this.allowDragByHeaderOnly = false;
        this.canDragByBody = false;
        this.showHeader = false;
        this.pointerEventsHelper = new DxElementPointerEventsHelper(this);
        this.dragHandler = new DragHandler(this, (initialPosition) => {
            this.style.cursor = "move";
            this.style.userSelect = "none";
            this.classList.add(draggingClassName);
            this.shadowRoot.dispatchEvent(new PopupHeaderDragStartedEvent(initialPosition));
        }, (lastDispatchedPosition) => {
            this.shadowRoot.dispatchEvent(new PopupHeaderDragEvent(lastDispatchedPosition));
        }, (finalPosition, initialPosition) => {
            this.style.cursor = "";
            this.style.userSelect = "";
            this.classList.remove(draggingClassName);
            this.shadowRoot.dispatchEvent(new PopupHeaderDragCompletedEvent(initialPosition, finalPosition));
        }, () => this.canDrag);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.disposeDrag();
    }
    updated(props) {
        if (props.has("allowDrag") || props.has("allowDragByHeaderOnly") || props.has("showHeader"))
            this.updateDragging();
    }
    updateDragging() {
        if (this.allowDrag && this.canDragByBody) {
            this.pointerEventsHelper.reinitialize(this.draggableElement);
            this.dragHandler.addHandlers();
        }
        else
            this.disposeDrag();
    }
    disposeDrag() {
        this.dragHandler.removeHandlers();
        this.pointerEventsHelper.dispose();
    }
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
}
__decorate([
    n({ type: Boolean, attribute: "allow-drag", reflect: true })
], DxPopupDraggableDialog.prototype, "allowDrag", void 0);
__decorate([
    n({ type: Boolean, attribute: "allow-drag-by-header-only", reflect: true })
], DxPopupDraggableDialog.prototype, "allowDragByHeaderOnly", void 0);
__decorate([
    n({ type: Boolean, attribute: "can-drag-by-body" })
], DxPopupDraggableDialog.prototype, "canDragByBody", void 0);
__decorate([
    n({ type: Boolean, attribute: "show-header" })
], DxPopupDraggableDialog.prototype, "showHeader", void 0);

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const container = (entry.target);
        container.actualSize = new Size(Math.round(entry.contentRect.width), Math.round(entry.contentRect.height));
    }
});
function attachToSizeChangeNotifications(element) {
    resizeObserver.observe(element);
}
function detachFromSizeChangeNotifications(element) {
    resizeObserver.unobserve(element);
}

const handleSize = "0.25rem";
const widthAttrName = "--dxbl-popup-resize-container-width";
const heightAttrName = "--dxbl-popup-resize-container-height";
class PopupResizeStartedEventContext {
    constructor(size) {
        this.width = size.width;
        this.height = size.height;
    }
}
class PopupResizeStartedEvent extends CustomEvent {
    constructor(start) {
        super(PopupResizeStartedEvent.eventName, {
            detail: new PopupResizeStartedEventContext(start),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupResizeStartedEvent.eventName = "dxbl:popup-resizestarted";
CustomEventsHelper.register(PopupResizeStartedEvent.eventName, x => x.detail);
class PopupResizeCompletedEventContext {
    constructor(size) {
        this.width = size.width;
        this.height = size.height;
    }
}
class PopupResizeCompletedEvent extends CustomEvent {
    constructor(start) {
        super(PopupResizeCompletedEvent.eventName, {
            detail: new PopupResizeCompletedEventContext(start),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupResizeCompletedEvent.eventName = "dxbl:popup-resizecompleted";
CustomEventsHelper.register(PopupResizeCompletedEvent.eventName, x => x.detail);
class PopupLayoutChangeEventContext {
    constructor(deltaWidth, deltaHeight, deltaX, deltaY, resizing, dragging) {
        this.deltaWidth = deltaWidth;
        this.deltaHeight = deltaHeight;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.resizing = resizing;
        this.dragging = dragging;
    }
}
class PopupLayoutChangeEvent extends CustomEvent {
    constructor(deltaWidth, deltaHeight, deltaX, deltaY, resizing, dragging) {
        super(PopupLayoutChangeEvent.eventName, {
            detail: new PopupLayoutChangeEventContext(deltaWidth, deltaHeight, deltaX, deltaY, resizing, dragging),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupLayoutChangeEvent.eventName = "dxbl:popup-layoutchange";
class PopupLayoutChangeStartEventContext {
    constructor(resizing, dragging) {
        this.width = null;
        this.height = null;
        this.x = null;
        this.y = null;
        this.resizing = resizing;
        this.dragging = dragging;
    }
}
class PopupLayoutChangeStartEvent extends CustomEvent {
    constructor(resizing, dragging) {
        super(PopupLayoutChangeStartEvent.eventName, {
            detail: new PopupLayoutChangeStartEventContext(resizing, dragging),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupLayoutChangeStartEvent.eventName = "dxbl:popup-layoutchangestart";
CustomEventsHelper.register(PopupLayoutChangeStartEvent.eventName, x => x.detail);
class PopupLayoutChangeEndEventContext {
    constructor(resizing, dragging) {
        this.width = null;
        this.height = null;
        this.x = null;
        this.y = null;
        this.oldWidth = null;
        this.oldHeight = null;
        this.oldX = null;
        this.oldY = null;
        this.resizing = resizing;
        this.dragging = dragging;
    }
}
class PopupLayoutChangeEndEvent extends CustomEvent {
    constructor(resizing, dragging) {
        super(PopupLayoutChangeEndEvent.eventName, {
            detail: new PopupLayoutChangeEndEventContext(resizing, dragging),
            bubbles: true,
            composed: true,
            cancelable: false
        });
    }
}
PopupLayoutChangeEndEvent.eventName = "dxbl:popup-layoutchangeend";
CustomEventsHelper.register(PopupLayoutChangeEndEvent.eventName, x => x.detail);
class ResizerMovingEvent extends CustomEvent {
    constructor(moving) {
        super(ResizerMovingEvent.eventName, {
            detail: moving,
            bubbles: true,
            composed: true
        });
    }
}
ResizerMovingEvent.eventName = "dxbl-popup-resizer.onMoving";
class ResizeHandle extends s {
    get lastX() {
        if (this.currentPosition === null)
            throw new Error("invalid state");
        return this.currentPosition.x;
    }
    get lastY() {
        if (this.currentPosition === null)
            throw new Error("invalid state");
        return this.currentPosition.y;
    }
    get topValue() {
        throw new Error("should be implemented");
    }
    get leftValue() {
        throw new Error("should be implemented");
    }
    get widthValue() {
        return handleSize;
    }
    get heightValue() {
        return handleSize;
    }
    get cursorValue() {
        throw new Error("should be implemented");
    }
    get isDragPossible() {
        return false;
    }
    constructor() {
        super();
        this.currentPosition = null;
        this.pointerEventsHelper = new DxElementPointerEventsHelper(this);
        this.dragHandler = new DragHandler(this, (initialPosition) => {
            this.dispatchEvent(new ResizerMovingEvent(true));
            this.currentPosition = initialPosition;
            this.shadowRoot.dispatchEvent(new PopupLayoutChangeStartEvent(true, this.isDragPossible));
        }, (lastDispatchedPosition) => {
            const deltaWidth = this.getDeltaWidth(lastDispatchedPosition.x);
            const deltaHeight = this.getDeltaHeight(lastDispatchedPosition.y);
            const deltaX = this.getDeltaX(lastDispatchedPosition.x);
            const deltaY = this.getDeltaY(lastDispatchedPosition.y);
            this.currentPosition = lastDispatchedPosition;
            this.shadowRoot.dispatchEvent(new PopupLayoutChangeEvent(deltaWidth, deltaHeight, deltaX, deltaY, true, this.isDragPossible));
        }, (finalPosition, initialPosition) => {
            this.dispatchEvent(new ResizerMovingEvent(false));
            this.currentPosition = null;
            this.shadowRoot.dispatchEvent(new PopupLayoutChangeEndEvent(true, this.isDragPossible));
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this.pointerEventsHelper.initialize();
        this.dragHandler.addHandlers();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.pointerEventsHelper.dispose();
        this.dragHandler.removeHandlers();
    }
    get handlePointerEventsMode() {
        return HandlePointerEventsMode.Dragging;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return TapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
    getDeltaWidth(x) {
        throw new Error("should be implemented");
    }
    getDeltaHeight(y) {
        throw new Error("should be implemented");
    }
    getDeltaX(x) {
        throw new Error("should be implemented");
    }
    getDeltaY(y) {
        throw new Error("should be implemented");
    }
    render() {
        return x `
    <style>
        :host {
            position: absolute;
            top: ${this.topValue};
            left: ${this.leftValue};
            width: 0px;
            height: 0px;
            z-index: 1;
            pointer-events: auto;

        }
        .dxbl-resize-handle {
            width: ${this.widthValue};
            height: ${this.heightValue};
            opacity: 0;
            cursor: ${this.cursorValue};
            z-index: 1;
        }
    </style>
    <div class="dxbl-resize-handle"></div>
`;
    }
}
let TopEdge = class TopEdge extends ResizeHandle {
    get isDragPossible() {
        return true;
    }
    get topValue() {
        return "0%";
    }
    get leftValue() {
        return handleSize;
    }
    get widthValue() {
        return `calc(var(${widthAttrName}) - ${handleSize})`;
    }
    get cursorValue() {
        return "ns-resize";
    }
    getDeltaWidth(x) {
        return 0;
    }
    getDeltaX(x) {
        return 0;
    }
    getDeltaHeight(y) {
        return this.lastY - y;
    }
    getDeltaY(y) {
        return y - this.lastY;
    }
};
TopEdge = __decorate([
    e("dxbl-resize-top-edge")
], TopEdge);
let RightEdge = class RightEdge extends ResizeHandle {
    get topValue() {
        return handleSize;
    }
    get leftValue() {
        return "100%";
    }
    get heightValue() {
        return `calc(var(${heightAttrName}) - ${handleSize})`;
    }
    get cursorValue() {
        return "ew-resize";
    }
    getDeltaWidth(x) {
        return x - this.lastX;
    }
    getDeltaX(x) {
        return 0;
    }
    getDeltaHeight(y) {
        return 0;
    }
    getDeltaY(y) {
        return 0;
    }
};
RightEdge = __decorate([
    e("dxbl-resize-right-edge")
], RightEdge);
let BottomEdge = class BottomEdge extends ResizeHandle {
    get topValue() {
        return "100%";
    }
    get leftValue() {
        return handleSize;
    }
    get widthValue() {
        return `calc(var(${widthAttrName}) - ${handleSize})`;
    }
    get cursorValue() {
        return "ns-resize";
    }
    getDeltaWidth(x) {
        return 0;
    }
    getDeltaX(x) {
        return 0;
    }
    getDeltaHeight(y) {
        return y - this.lastY;
    }
    getDeltaY(y) {
        return 0;
    }
};
BottomEdge = __decorate([
    e("dxbl-resize-bottom-edge")
], BottomEdge);
let LeftEdge = class LeftEdge extends ResizeHandle {
    get isDragPossible() {
        return true;
    }
    get topValue() {
        return handleSize;
    }
    get leftValue() {
        return "0%";
    }
    get heightValue() {
        return `calc(var(${heightAttrName}) - ${handleSize})`;
    }
    get cursorValue() {
        return "ew-resize";
    }
    getDeltaWidth(x) {
        return this.lastX - x;
    }
    getDeltaX(x) {
        return x - this.lastX;
    }
    getDeltaHeight(y) {
        return 0;
    }
    getDeltaY(y) {
        return 0;
    }
};
LeftEdge = __decorate([
    e("dxbl-resize-left-edge")
], LeftEdge);
let TopLeftGrip = class TopLeftGrip extends ResizeHandle {
    get isDragPossible() {
        return true;
    }
    get topValue() {
        return "0%";
    }
    get leftValue() {
        return "0%";
    }
    get cursorValue() {
        return "se-resize";
    }
    getDeltaWidth(x) {
        return this.lastX - x;
    }
    getDeltaX(x) {
        return x - this.lastX;
    }
    getDeltaHeight(y) {
        return this.lastY - y;
    }
    getDeltaY(y) {
        return y - this.lastY;
    }
};
TopLeftGrip = __decorate([
    e("dxbl-resize-tl-grip")
], TopLeftGrip);
let TopRightGrip = class TopRightGrip extends ResizeHandle {
    get isDragPossible() {
        return true;
    }
    get topValue() {
        return "0%";
    }
    get leftValue() {
        return "100%";
    }
    get cursorValue() {
        return "ne-resize";
    }
    getDeltaWidth(x) {
        return x - this.lastX;
    }
    getDeltaX(x) {
        return 0;
    }
    getDeltaHeight(y) {
        return this.lastY - y;
    }
    getDeltaY(y) {
        return y - this.lastY;
    }
};
TopRightGrip = __decorate([
    e("dxbl-resize-tr-grip")
], TopRightGrip);
let BottomRightGrip = class BottomRightGrip extends ResizeHandle {
    get topValue() {
        return "100%";
    }
    get leftValue() {
        return "100%";
    }
    get cursorValue() {
        return "se-resize";
    }
    getDeltaWidth(x) {
        return x - this.lastX;
    }
    getDeltaX(x) {
        return 0;
    }
    getDeltaHeight(y) {
        return y - this.lastY;
    }
    getDeltaY(y) {
        return 0;
    }
};
BottomRightGrip = __decorate([
    e("dxbl-resize-br-grip")
], BottomRightGrip);
let BottomLeftGrip = class BottomLeftGrip extends ResizeHandle {
    get isDragPossible() {
        return true;
    }
    get topValue() {
        return "100%";
    }
    get leftValue() {
        return "0%";
    }
    get cursorValue() {
        return "sw-resize";
    }
    getDeltaWidth(x) {
        return this.lastX - x;
    }
    getDeltaX(x) {
        return x - this.lastX;
    }
    getDeltaHeight(y) {
        return y - this.lastY;
    }
    getDeltaY(y) {
        return 0;
    }
};
BottomLeftGrip = __decorate([
    e("dxbl-resize-bl-grip")
], BottomLeftGrip);
const popupResizableContainerTagName = "dxbl-popup-resizable-container";
let DxPopupResizableContainer = class DxPopupResizableContainer extends s {
    constructor() {
        super(...arguments);
        this.actualSize = null;
        this.appliedSize = null;
        this.widthAttrName = widthAttrName;
        this.heightAttrName = heightAttrName;
        this.resizerMovingHandler = this.resizerMoving.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        attachToMutationPipeline(this);
        attachToSizeChangeNotifications(this);
        this.addEventListener(ResizerMovingEvent.eventName, this.resizerMovingHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        detachFromMutationPipeline(this);
        detachFromSizeChangeNotifications(this);
        this.removeEventListener(ResizerMovingEvent.eventName, this.resizerMovingHandler);
    }
    resizerMoving(e) {
        this.style.pointerEvents = e.detail ? "none" : "";
    }
    mutate() {
        if (this.actualSize !== null) {
            if (this.appliedSize === null || this.appliedSize.width !== this.actualSize.width)
                this.style.setProperty(widthAttrName, `calc(${this.actualSize.width}px - ${handleSize})`);
            if (this.appliedSize === null || this.appliedSize.height !== this.actualSize.height)
                this.style.setProperty(heightAttrName, `calc(${this.actualSize.height}px - ${handleSize})`);
            this.appliedSize = this.actualSize;
        }
    }
    render() {
        return x `
<style>
    :host {
        display: flex;
        flex: 1 1 auto;
        min-width: 0px;
        min-height: 0px;

        ${this.widthAttrName}: 0px;
        ${this.heightAttrName}: 0px;
    }
    .dxbl-popup-resizable-container {
        position: absolute;
        width: var(${this.widthAttrName});
        height: var(${this.heightAttrName});
        pointer-events: none;
    }
    .dxbl-popup-resizable-content {
        display: flex;
        flex-flow: column nowrap;
        flex: 1 1 auto;
        overflow: hidden;
        border-radius: var(--dxbl-popup-border-radius);
    }
</style>
<div class="dxbl-popup-resizable-container">
    <dxbl-resize-top-edge></dxbl-resize-top-edge>
    <dxbl-resize-right-edge></dxbl-resize-right-edge>
    <dxbl-resize-bottom-edge></dxbl-resize-bottom-edge>
    <dxbl-resize-left-edge></dxbl-resize-left-edge>
    <dxbl-resize-tl-grip></dxbl-resize-tl-grip>
    <dxbl-resize-tr-grip></dxbl-resize-tr-grip>
    <dxbl-resize-br-grip></dxbl-resize-br-grip>
    <dxbl-resize-bl-grip></dxbl-resize-bl-grip>
</div>
<div class="dxbl-popup-resizable-content">
    <slot></slot>
</div>
`;
    }
};
DxPopupResizableContainer = __decorate([
    e(popupResizableContainerTagName)
], DxPopupResizableContainer);

const measureDivTemplate = document.createElement("DIV");
measureDivTemplate.style.position = "absolute";
measureDivTemplate.style.top = "-1000px";
measureDivTemplate.style.left = "-1000px";
measureDivTemplate.style.visibility = "hidden";
function calculateSizeStyleAttributeToPx(size, container) {
    if (size === null)
        return 0;
    const element = measureDivTemplate.cloneNode();
    element.style.width = size;
    const containerForMeasureElement = container || document.body;
    containerForMeasureElement.appendChild(element);
    const runtimeSize = element.offsetWidth;
    element.remove();
    return runtimeSize;
}
function addLayoutChangeHandlers(element) {
    element.addEventListener(PopupHeaderDragEvent.eventName, (e) => {
        e.stopImmediatePropagation();
        const dragArgs = e;
        element.positionX = dragArgs.detail.x;
        element.positionY = dragArgs.detail.y;
    }, { passive: true });
    element.addEventListener(PopupLayoutChangeStartEvent.eventName, (e) => {
        const args = e;
        const rect = element.getBoundingClientRect();
        element.classList.add(PopupCssClasses.PopupResized);
        element.sizeDirty = true;
        element.actualPosition = new Point(window.scrollX + rect.x, window.scrollY + rect.y);
        element.actualSize = new Size(rect.width, rect.height);
        element.initialPosition = element.actualPosition;
        element.initialSize = element.actualSize;
        element.actualMinWidth = calculateSizeStyleAttributeToPx(element.minWidth, element);
        element.actualMinHeight = calculateSizeStyleAttributeToPx(element.minHeight, element);
        element.actualMaxWidth = calculateSizeStyleAttributeToPx(element.maxWidth, element) || Number.MAX_VALUE;
        element.actualMaxHeight = calculateSizeStyleAttributeToPx(element.maxHeight, element) || Number.MAX_VALUE;
        args.detail.width = element.initialSize.width;
        args.detail.height = element.initialSize.height;
        args.detail.x = element.initialPosition.x;
        args.detail.y = element.initialPosition.y;
    });
    element.addEventListener(PopupLayoutChangeEndEvent.eventName, (e) => {
        const args = e;
        args.detail.width = element.actualSize.width;
        args.detail.height = element.actualSize.height;
        args.detail.x = element.actualPosition.x;
        args.detail.y = element.actualPosition.y;
        args.detail.oldWidth = element.initialSize.width;
        args.detail.oldHeight = element.initialSize.height;
        args.detail.oldX = element.initialPosition.x;
        args.detail.oldY = element.initialPosition.y;
    });
    element.addEventListener(PopupLayoutChangeEvent.eventName, (_e) => {
        const args = _e;
        const ctx = args.detail;
        const prevActualSize = element.actualSize;
        element.actualSize = new Size(Math.max(element.actualMinWidth, Math.min(element.actualMaxWidth, element.actualSize.width + ctx.deltaWidth)), Math.max(element.actualMinHeight, Math.min(element.actualMaxHeight, element.actualSize.height + ctx.deltaHeight)));
        const hasRealXDelta = (prevActualSize.width - element.actualSize.width) !== 0;
        const hasRealYDelta = (prevActualSize.height - element.actualSize.height) !== 0;
        element.actualPosition = new Point(element.actualPosition.x + (hasRealXDelta ? ctx.deltaX : 0), element.actualPosition.y + (hasRealYDelta ? ctx.deltaY : 0));
        element.positionX = element.actualPosition.x;
        element.positionY = element.actualPosition.y;
        element.width = element.actualSize.width + "px";
        element.height = element.actualSize.height + "px";
    }, { passive: true });
}

const dxModalDialogTagName = "dxbl-modal-dialog";
let DxModalDialog = class DxModalDialog extends DxPopupDraggableDialog {
    get header() {
        return this.querySelector(".dxbl-popup-header");
    }
    constructor() {
        super();
        this.actualSize = null;
        this.actualPosition = null;
        this.initialSize = null;
        this.initialPosition = null;
        this.actualMinWidth = null;
        this.actualMaxWidth = null;
        this.actualMinHeight = null;
        this.actualMaxHeight = null;
        this.sizeDirty = false;
        this.cssTextToApply = "";
        this.popup = null;
        this.positionY = null;
        this.positionX = null;
        this.allowResize = false;
        this.width = null;
        this.height = null;
        this.minWidth = null;
        this.minHeight = null;
        this.maxWidth = null;
        this.maxHeight = null;
        // TODO: https://trello.com/c/qMGgCv5V/943-recover-popup-style-update
        this.dialogCssStyle = "";
        addLayoutChangeHandlers(this);
    }
    connectedCallback() {
        super.connectedCallback();
        attachToMutationPipeline(this);
        this.popup = this.closest(dxModalTagName);
        this.popup.notifyDialogConnected(this);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        detachFromMutationPipeline(this);
        (_a = this.popup) === null || _a === void 0 ? void 0 : _a.notifyDialogDisconnected();
        this.popup = null;
    }
    updated(props) {
        super.updated(props);
        this.mapCssTextToApply();
    }
    mutate() {
        this.style.cssText = this.cssTextToApply;
    }
    render() {
        if (!this.allowResize)
            return x `<slot></slot>`;
        return x `<dxbl-popup-resizable-container><slot></slot></dxbl-popup-resizable-container>`;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.mapCssTextToApply();
    }
    mapCssTextToApply() {
        const transformParts = [];
        const styleParts = [];
        if (this.dialogCssStyle)
            styleParts.push(this.dialogCssStyle);
        if (this.positionX !== null) {
            transformParts.push(`translateX(${this.positionX}px)`);
            styleParts.push("margin-left: 0;");
            styleParts.push("margin-right: 0;");
            styleParts.push("left: 0;");
        }
        if (this.positionY !== null) {
            transformParts.push(`translateY(${this.positionY}px)`);
            styleParts.push("margin-top: 0;");
            styleParts.push("margin-bottom: 0;");
            styleParts.push("top: 0;");
        }
        if (this.width)
            styleParts.push(`width: ${this.width}`);
        if (this.height)
            styleParts.push(`height: ${this.height}`);
        if (transformParts.length > 0) {
            styleParts.push("position: absolute");
            styleParts.push(`transform: ${transformParts.join(" ")}`);
        }
        this.cssTextToApply = styleParts.join("; ");
    }
};
__decorate([
    n({ type: Number, attribute: "position-y", reflect: false })
], DxModalDialog.prototype, "positionY", void 0);
__decorate([
    n({ type: Number, attribute: "position-x", reflect: false })
], DxModalDialog.prototype, "positionX", void 0);
__decorate([
    n({ type: Boolean, attribute: "allow-resize", reflect: false })
], DxModalDialog.prototype, "allowResize", void 0);
__decorate([
    n({ type: String, attribute: "width", reflect: false })
], DxModalDialog.prototype, "width", void 0);
__decorate([
    n({ type: String, attribute: "height", reflect: false })
], DxModalDialog.prototype, "height", void 0);
__decorate([
    n({ type: String, attribute: "min-width", reflect: false })
], DxModalDialog.prototype, "minWidth", void 0);
__decorate([
    n({ type: String, attribute: "min-height", reflect: false })
], DxModalDialog.prototype, "minHeight", void 0);
__decorate([
    n({ type: String, attribute: "max-width", reflect: false })
], DxModalDialog.prototype, "maxWidth", void 0);
__decorate([
    n({ type: String, attribute: "max-height", reflect: false })
], DxModalDialog.prototype, "maxHeight", void 0);
__decorate([
    n({ type: String, attribute: "dialog-css-style", reflect: false })
], DxModalDialog.prototype, "dialogCssStyle", void 0);
DxModalDialog = __decorate([
    e(dxModalDialogTagName)
], DxModalDialog);

const dxDropDownDialogTagName = "dxbl-dropdown-dialog";
let DxDropDownDialog = class DxDropDownDialog extends DxPopupBaseDialog {
    createRenderRoot() {
        return this;
    }
};
DxDropDownDialog = __decorate([
    e(dxDropDownDialogTagName)
], DxDropDownDialog);

var DxFlyoutArrow_1;
const dxFlyoutArrowTagName = "dxbl-flyout-arrow";
var FlyoutArrowAlignment;
(function (FlyoutArrowAlignment) {
    FlyoutArrowAlignment["top"] = "top";
    FlyoutArrowAlignment["bottom"] = "bottom";
    FlyoutArrowAlignment["end"] = "end";
    FlyoutArrowAlignment["start"] = "start";
})(FlyoutArrowAlignment || (FlyoutArrowAlignment = {}));
let DxFlyoutArrow = DxFlyoutArrow_1 = class DxFlyoutArrow extends s {
    constructor() {
        super(...arguments);
        this.slotChangedHandler = this.handleSlotChanged.bind(this);
        this.arrow = null;
        this._alignment = FlyoutArrowAlignment.bottom;
        this.position = Vector.zero;
        this.serverClass = null;
        this.clientClass = null;
        this.cssClass = null;
    }
    get alignment() {
        return this._alignment;
    }
    set alignment(val) {
        const oldAlignment = this._alignment;
        this._alignment = val;
        this.clientClass = this.calcClientCssClass(val);
        this.requestUpdate("alignment", oldAlignment);
    }
    calcClientCssClass(val) {
        const alignment = val;
        return `dxbl-popover-${alignment}`;
    }
    get arrowSize() {
        return this.arrow ? DxFlyoutArrow_1.calcSizeWithMargins(this.arrow, LayoutHelper.getRelativeElementRect(this.arrow).size) : Size.Empty;
    }
    static calcSizeWithMargins(el, size) {
        const style = window.getComputedStyle(el);
        const left = parseFloat(style.marginLeft);
        const right = parseFloat(style.marginRight);
        const top = parseFloat(style.marginTop);
        const bottom = parseFloat(style.marginBottom);
        return new Size(size.width + left + right, size.height + top + bottom);
    }
    static get styles() {
        return i `
            :host {
                display: block;
            }
        }`;
    }
    willUpdate(changed) {
        if (changed.has("serverClass") || changed.has("clientClass")) {
            const result = [];
            if (this.clientClass)
                this.clientClass.split(" ").forEach(x => result.push(x));
            if (this.serverClass)
                this.serverClass.split(" ").forEach(x => result.push(x));
            this.cssClass = result.join(" ");
        }
    }
    updated(updated) {
        if (this.arrow && updated.has("position")) {
            switch (this.alignment) {
                case FlyoutArrowAlignment.bottom:
                    this.arrow.style.transform = TransformHelper.translateWithoutFloor(Math.floor(this.position.x), 0.5);
                    break;
                case FlyoutArrowAlignment.top:
                    this.arrow.style.transform = TransformHelper.translateWithoutFloor(Math.floor(this.position.x), -0.5);
                    break;
                case FlyoutArrowAlignment.start:
                    this.arrow.style.transform = TransformHelper.translateWithoutFloor(-0.5, Math.floor(this.position.y));
                    break;
                case FlyoutArrowAlignment.end:
                    this.arrow.style.transform = TransformHelper.translateWithoutFloor(0.5, Math.floor(this.position.y));
                    break;
            }
        }
        if (updated.has("cssClass"))
            this.className = this.cssClass ? this.cssClass : "";
    }
    render() {
        return x `
            <slot @slotchange="${this.slotChangedHandler}"></slot>
        `;
    }
    handleSlotChanged(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        for (const index in elements) {
            const element = elements[index];
            if (element instanceof HTMLElement) {
                this.arrow = element;
                break;
            }
        }
    }
};
__decorate([
    n({ reflect: false })
], DxFlyoutArrow.prototype, "position", void 0);
__decorate([
    n({ type: String, attribute: "server-class" })
], DxFlyoutArrow.prototype, "serverClass", void 0);
__decorate([
    n({ reflect: false })
], DxFlyoutArrow.prototype, "clientClass", void 0);
__decorate([
    n({ reflect: false })
], DxFlyoutArrow.prototype, "cssClass", void 0);
__decorate([
    n({ reflect: false })
], DxFlyoutArrow.prototype, "alignment", null);
DxFlyoutArrow = DxFlyoutArrow_1 = __decorate([
    e(dxFlyoutArrowTagName)
], DxFlyoutArrow);

const dxFlyoutDialogTagName = "dxbl-flyout-dialog";
var FlyoutAnimationType;
(function (FlyoutAnimationType) {
    FlyoutAnimationType["Fade"] = "fade";
    FlyoutAnimationType["None"] = "none";
})(FlyoutAnimationType || (FlyoutAnimationType = {}));
let DxFlyoutDialog = class DxFlyoutDialog extends DxPopupBaseDialog {
    constructor() {
        super(...arguments);
        this.arrowSlotChangeHandler = this.handleArrowSlotChange.bind(this);
        this._arrow = null;
        this._arrowAlignment = FlyoutArrowAlignment.bottom;
        this.serverClass = null;
        this.cssClass = null;
        this.animationType = FlyoutAnimationType.Fade;
        this.animationEnabled = false;
    }
    get arrow() {
        return this._arrow;
    }
    get arrowAlignment() {
        return this._arrowAlignment;
    }
    set arrowAlignment(val) {
        this._arrowAlignment = val;
    }
    calcAnimationTypeCssClass() {
        return `dxbl-flyout-dialog-${this.animationType} dxbl-flyout-dialog-show`;
    }
    willUpdate(changed) {
        if (changed.has("serverClass") ||
            changed.has("animationEnabled") || changed.has("animationType")) {
            const result = [];
            if (this.serverClass)
                this.serverClass.split(" ").forEach(x => result.push(x));
            if (this.animationEnabled && this.animationType !== FlyoutAnimationType.None) {
                const index = result.indexOf(`dxbl-flyout-dialog-${this.animationType}`, 0);
                const animationCssClass = this.calcAnimationTypeCssClass();
                if (index > -1)
                    result.splice(index, 1, animationCssClass);
                else
                    result.push(animationCssClass);
            }
            this.cssClass = result.join(" ");
        }
    }
    updated(updated) {
        if (updated.has("cssClass"))
            this.className = this.cssClass ? this.cssClass : "";
    }
    render() {
        return x `
            <slot></slot>
            <slot name="arrow" @slotchange="${this.arrowSlotChangeHandler}"></slot>
        `;
    }
    handleArrowSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this._arrow = elements[0];
    }
};
__decorate([
    n({ type: String, attribute: "server-class" })
], DxFlyoutDialog.prototype, "serverClass", void 0);
__decorate([
    n({ reflect: false })
], DxFlyoutDialog.prototype, "cssClass", void 0);
__decorate([
    n({ type: String, attribute: "animation-type" })
], DxFlyoutDialog.prototype, "animationType", void 0);
__decorate([
    n({ type: Boolean, reflect: false })
], DxFlyoutDialog.prototype, "animationEnabled", void 0);
DxFlyoutDialog = __decorate([
    e(dxFlyoutDialogTagName)
], DxFlyoutDialog);

const DxPopupKeyboardNavigatorTagName = "dxbl-popup-keyboard-navigator";
const closeWindowButtonSelector = "[data-qa-selector=\"dx-popup-close-button\"]";
class DxPopupKeyboardNavigator extends DxKeyboardNavigator {
    get popupOwner() {
        return super.owner;
    }
    initialize(owner, rootStrategy) {
        super.initialize(owner, rootStrategy);
    }
    onContentChanged() {
        var _a;
        const isModalContentChanged = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName) === "BODY" && this.targetElement.tagName === "DXBL-MODAL" && this.getIsNestedContentSelected(this.targetElement);
        if (isModalContentChanged)
            this.isActive = true;
        super.onContentChanged();
        if (isModalContentChanged && this.rootStrategy)
            this.rootStrategy.activatePopupContent();
    }
    getPortal() {
        var _a, _b;
        return (_b = (_a = this.popupOwner) === null || _a === void 0 ? void 0 : _a.getPortal()) !== null && _b !== void 0 ? _b : null;
    }
    syncFocusHiddenStateWithOwner(ownerElement) {
        if (this.isFocusHiddenState())
            this.passFocusHiddenAttribute(ownerElement);
    }
    isFocusHiddenState() {
        return containsFocusHiddenAttribute(this.targetElement);
    }
}
class PopupKeyboardStrategyBase extends KeyboardNavigationStrategy {
    constructor(navigator, targetElement, isTransitContainer = false) {
        super(navigator, targetElement, isTransitContainer);
        this.portalPath = [];
        this.addEventSubscriptions();
    }
    get popupNavigator() {
        return super.navigator;
    }
    get portal() {
        var _a;
        return (_a = this.popupNavigator) === null || _a === void 0 ? void 0 : _a.getPortal();
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (this.nestedContentSelected)
            return false;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                return this.switchToNestedContent();
            case key.KeyCode.Esc: // CaptureManager reserved
                return true;
        }
        return false;
    }
    onPopupShown() {
        this.handlePopupShown();
    }
    handlePopupShown() {
        if (this.portal)
            this.portalPath = Array.from(LayoutHelper.getRootPathAndSelf(this.portal));
        this.activatePopupContent();
    }
    activatePopupContent() {
        FocusUtils.makeElementFocusable(this.targetElement);
        this.activate();
    }
    onPopupClosed() {
        this.removeEventSubscriptions();
        this.handlePopupClosed();
    }
    handlePopupClosed() {
        this.focusElementInRootPath(true);
    }
    focusElementInRootPath(closing = false, direction = null) {
        const focusableElements = this.portalPath.filter(element => element.isConnected && element.tabIndex >= 0 && element.tagName.toLowerCase() !== dxPopupPortalTagName);
        if (focusableElements.length > 0 && this.navigator.isActive) {
            const elementToFocus = FocusUtils.findFocusableElementInRootPath(focusableElements[0]);
            if (elementToFocus) {
                this.popupNavigator.syncFocusHiddenStateWithOwner(elementToFocus);
                FocusUtils.focusElement(elementToFocus);
            }
            return true;
        }
        return false;
    }
}
class PopupKeyboardStrategy extends PopupKeyboardStrategyBase {
    constructor(navigator, targetElement, isTransitContainer = false) {
        super(navigator, targetElement, isTransitContainer);
    }
    activatePopupContent() {
        super.activatePopupContent();
        this.focusSelectedItem();
    }
    onPopupVisibleChanged(e) {
        if (e.detail.visible)
            this.onPopupShown();
    }
    addEventSubscriptions() {
        if (!this.boundOnPopupVisibleChangedHandler || !this.boundOnPopupClosedHandler) { // Not initialized immediately because during compilation this will be transferred to the constructor and the addEventSubscriptions will be called earlier
            this.boundOnPopupVisibleChangedHandler = this.onPopupVisibleChanged.bind(this);
            this.boundOnPopupClosedHandler = this.onPopupClosed.bind(this);
        }
        this.targetElement.addEventListener(PopupVisibleChangedEvent.eventName, this.boundOnPopupVisibleChangedHandler);
        this.targetElement.addEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
    }
    removeEventSubscriptions() {
        this.targetElement.removeEventListener(PopupVisibleChangedEvent.eventName, this.boundOnPopupVisibleChangedHandler);
        this.targetElement.removeEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
    }
}
class FocusTrappedPopupKeyboardStrategy extends PopupKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
    }
    handleKeyDown(evt) {
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab)
            return false;
        return super.handleKeyDown(evt);
    }
    onPopupShown() {
        super.onPopupShown();
        this.switchToNestedContent();
    }
    onPopupClosed() {
        this.leaveFromNestedContent();
        super.onPopupClosed();
    }
    switchToNestedContent() {
        if (super.switchToNestedContent()) {
            focusTrapSingleton.activate(this.selectedItemElement, false, true);
            return true;
        }
        return false;
    }
    leaveFromNestedContent() {
        super.leaveFromNestedContent();
        focusTrapSingleton.deactivate(this.selectedItemElement, false);
    }
}
class DropDownKeyboardStrategy extends FocusTrappedPopupKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
    }
    queryItems() {
        return this.queryItemsBySelector(dxDropDownDialogTagName);
    }
    onPopupShown() {
        super.onPopupShown();
        this.switchToNestedContent();
    }
}
class PopupWindowKeyboardStrategy extends PopupKeyboardStrategy {
    constructor(navigator, targetElement, isTransitContainer = false) {
        super(navigator, targetElement, isTransitContainer);
    }
    get windowIsOpened() {
        return this.targetElement.isOpen;
    }
    queryItems() {
        return this.queryItemsBySelector(dxWindowDialogTagName);
    }
    getNestedContentElement() {
        const focusableElements = FocusUtils.findFocusableElements(this.selectedItemElement);
        if (focusableElements.length > 0) {
            const filteredElements = focusableElements.filter(el => !el.matches(closeWindowButtonSelector));
            return filteredElements.length > 0 ? filteredElements[0] : focusableElements[0];
        }
        return null;
    }
    addEventSubscriptions() {
        super.addEventSubscriptions();
        if (!this.boundOnPopupKeyboardStrategyActivateHandler)
            this.boundOnPopupKeyboardStrategyActivateHandler = this.handleWindowKeyboardStrategyActivate.bind(this);
        if (!this.boundOnPopupRootBlurHandler)
            this.boundOnPopupRootBlurHandler = this.handlePopupRootBlur.bind(this);
        this.targetElement.addEventListener(PopupKeyboardStrategyActivateEvent.eventName, this.boundOnPopupKeyboardStrategyActivateHandler);
        const popupRoot = document.querySelector(dxPopupRootTagName);
        popupRoot === null || popupRoot === void 0 ? void 0 : popupRoot.addEventListener("blur", this.boundOnPopupRootBlurHandler);
    }
    handleWindowKeyboardStrategyActivate(e) {
        if (e.detail.visible)
            this.activatePopupContent();
    }
    handlePopupRootBlur() {
        if (this.windowIsOpened) {
            this.targetElement.toggleAttribute("inert");
            this.boundOnDocumentFocusInHandler = this.handleDocumentFocusIn.bind(this);
            document.addEventListener("focusin", this.boundOnDocumentFocusInHandler);
        }
    }
    handleDocumentFocusIn(evt) {
        this.targetElement.toggleAttribute("inert");
        document.removeEventListener("focusin", this.boundOnDocumentFocusInHandler);
    }
    removeEventSubscriptions() {
        super.removeEventSubscriptions();
        this.targetElement.removeEventListener(PopupKeyboardStrategyActivateEvent.eventName, this.boundOnPopupKeyboardStrategyActivateHandler);
        const popupRoot = document.querySelector(dxPopupRootTagName);
        popupRoot === null || popupRoot === void 0 ? void 0 : popupRoot.removeEventListener("blur", this.boundOnPopupRootBlurHandler);
    }
    focusElementInRootPath(closing = false, direction = null) {
        if (!super.focusElementInRootPath(closing, direction)) {
            if (this.portal) {
                const prevFocusable = FocusUtils.findPrevFocusableElement(this.portal);
                const nextFocusable = FocusUtils.findNextFocusableNotChildElement(this.portal);
                const elementToFocus = closing ? (prevFocusable !== null && prevFocusable !== void 0 ? prevFocusable : nextFocusable) : (direction === LeaveDirection.Backward ? prevFocusable : nextFocusable);
                if (elementToFocus) {
                    if (!this.popupNavigator.isFocusHiddenState()) {
                        FocusUtils.focusElement(elementToFocus);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    handleKeyDown(evt) {
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab) {
            if (!this.nestedContentSelected) {
                this.leavePopupContent(evt.shiftKey ? LeaveDirection.Backward : LeaveDirection.Forward);
                return true;
            }
        }
        return super.handleKeyDown(evt);
    }
    activatePopupContent() {
        super.activatePopupContent();
        this.switchToNestedContent();
    }
    onPopupShown() {
        if (this.portal)
            FocusUtils.makeElementFocusable(this.portal);
        super.onPopupShown();
    }
    onPopupClosed() {
        this.leaveFromNestedContent();
        super.onPopupClosed();
        if (this.portal)
            FocusUtils.removeTabIndex(this.portal);
    }
    leaveTransitContainer(direction) {
        super.leaveTransitContainer(direction);
        this.leavePopupContent(direction);
    }
    leavePopupContent(direction) {
        this.popupNavigator.leaveFromNavigator();
        FocusUtils.removeTabIndex(this.targetElement);
        this.focusElementInRootPath(false, direction);
    }
}
class FlyoutKeyboardStrategy extends FocusTrappedPopupKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
    }
    queryItems() {
        return this.queryItemsBySelector(dxFlyoutDialogTagName);
    }
    onPopupShown() {
        super.onPopupShown();
        this.switchToNestedContent();
    }
}
class ItemListDropDownKeyboardStrategy extends PopupKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
    }
    queryItems() {
        return this.queryItemsBySelector(dxDropDownDialogTagName);
    }
}
class ModalDialogKeyboardStrategy extends PopupKeyboardStrategyBase {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
    }
    queryItems() {
        return this.queryItemsBySelector(dxModalDialogTagName);
    }
    activatePopupContent() {
        super.activatePopupContent();
        this.switchToNestedContent();
    }
    handleKeyDown(evt) {
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab)
            return false;
        return super.handleKeyDown(evt);
    }
    onModalFocusChange(e) {
        if (e.detail.isFocused)
            this.onPopupShown();
        else
            this.onPopupClosed();
    }
    addEventSubscriptions() {
        if (!this.boundOnModalFocusChangeHandler) // Not initialized immediately because during compilation this will be transferred to the constructor and the addEventSubscriptions will be called earlier
            this.boundOnModalFocusChangeHandler = this.onModalFocusChange.bind(this);
        this.targetElement.addEventListener(PopupAdjustZIndexRequestEvent.eventName, this.boundOnModalFocusChangeHandler);
    }
    removeEventSubscriptions() {
        this.targetElement.removeEventListener(PopupAdjustZIndexRequestEvent.eventName, this.boundOnModalFocusChangeHandler);
    }
}
customElements.define(DxPopupKeyboardNavigatorTagName, DxPopupKeyboardNavigator);

var DxModal_1;
const dxModalTagName = "dxbl-modal";
const nameof$1 = nameofFactory();
class ModalClosingEventContext {
    constructor(closeReason) {
        this.closeReason = closeReason;
    }
}
class ModalClosingRequestedEvent extends CustomEvent {
    constructor(closeReason) {
        super(ModalClosingRequestedEvent.eventName, {
            detail: new ModalClosingEventContext(closeReason),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ModalClosingRequestedEvent.eventName = dxModalTagName + ".closingRequested";
CustomEventsHelper.register(ModalClosingRequestedEvent.eventName, x => {
    return x.detail;
});
class ModalClosingResultRequestedEvent extends CustomEvent {
    constructor(closeReason) {
        super(ModalClosingResultRequestedEvent.eventName, {
            detail: new ModalClosingEventContext(closeReason),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ModalClosingResultRequestedEvent.eventName = dxModalTagName + ".closingResultRequested";
CustomEventsHelper.register(ModalClosingResultRequestedEvent.eventName, x => {
    return x.detail;
});
let DxModal = DxModal_1 = class DxModal extends DxSupportCaptureElement {
    constructor() {
        super(...arguments);
        this._positionChangedEvent = new Signal();
        this.shadowSlotChangedHandler = this.handleShadowSlotChange.bind(this);
        this.topShadowBranchChangedHandler = this.handleTopShadowBranchChanged.bind(this);
        this.dragStartHandler = this.handleDragStart.bind(this);
        this.dragEndHandler = this.handleDragEnd.bind(this);
        this.resizeStartHandler = this.handleResizeStart.bind(this);
        this.resizeEndHandler = this.handleResizeEnd.bind(this);
        this.shadow = null;
        this.closingResultRequestedTcs = new TaskCompletionSource();
        this.shownCompletedTcs = new TaskCompletionSource();
        this.popupDialog = null;
        this._zIndex = 0;
        this.modal = null;
        this.shadingChangedEvent = new SimpleEvent();
        this._capturedElementReleaseCallback = null;
        this._isOpen = false;
        this.shading = false;
        this.closeOnOutsideClick = false;
        this.closeOnEscape = false;
        this.closeOnPointerUp = false;
        this.autoZIndex = false;
        this.zIndex = 0;
        this.shadowVisible = false;
        this.topShadowBranchId = null;
        this.hasServerSideClosing = false;
        this.disableFocusTrap = false;
        this.width = "";
        this.height = "";
        this.isDragging = false;
        this.isResizing = false;
        this.capturingAction = this.capturing;
        this.releasingCaptureAction = this.releaseFocusTrap;
    }
    static fromElement(element) {
        while (element !== null && !(element instanceof DxModal_1))
            element = element.parentElement;
        return element;
    }
    get positionChanged() {
        return this._positionChangedEvent;
    }
    get renderedVisible() {
        return true;
    }
    get isOpen() {
        return this._isOpen;
    }
    get branchType() {
        return BranchType.Modal;
    }
    get preventInteractions() {
        return true;
    }
    get isCloseOnPointerUp() {
        return this.closeOnPointerUp;
    }
    render() {
        return x `
            <dxbl-branch
                id="branch"
                branch-id="${this.branchId}"
                parent-branch-id="${this.parentBranchId}"
                type="${this.branchType}">
                ${this.renderShadow()}
                ${this.renderDefaultSlot()}
            </dxbl-branch>
        `;
    }
    renderDefaultSlot() {
        return x `<slot></slot>`;
    }
    renderShadow() {
        return x `<slot name="shadow" @slotchange="${this.shadowSlotChangedHandler}"></slot>`;
    }
    handleShadowSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this.shadow = elements.find(x => x instanceof HTMLElement);
    }
    get shadingChanged() {
        return this.shadingChangedEvent;
    }
    connectedCallback() {
        super.connectedCallback();
        this.subscribeToEvents();
        this.raiseZIndexChange();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribeFromEvents();
        this.close();
    }
    show() {
        if (!this.isOpen) {
            this._isOpen = true;
            this.initializeCapture();
            this.initializeBodyScrollLock();
            this.addToVisibleBranchTree();
            this.raiseAdjustZIndexRequest(true);
            this.raiseShown();
        }
        return this.shownCompletedTcs.promise;
    }
    raiseAdjustZIndexRequest(isFocused) {
        this.dispatchEvent(new PopupAdjustZIndexRequestEvent(new PopupAdjustZIndexRequestContext(this.branchId, isFocused)));
    }
    close() {
        if (!this.isOpen)
            return;
        this._isOpen = false;
        this.releaseCapture();
        this.releaseBodyScrollLock();
        this.removeFromVisibleBranchTree();
        this.raiseAdjustZIndexRequest(false);
        this.raiseClosed();
    }
    raiseShown() {
        const detail = new PopupContext();
        this.dispatchEvent(new PopupShownEvent(detail));
    }
    raiseClosed() {
        const detail = new PopupContext();
        this.dispatchEvent(new PopupClosedEvent(detail));
    }
    willUpdate(updated) {
        this.shadowVisible = this.shading && this.isOpen && !!this.branchId && this.branchId === this.topShadowBranchId;
    }
    updated(updated) {
        var _a;
        if (this.shadow && updated.has(nameof$1("shadowVisible")))
            this.shadow.style.display = this.shadowVisible ? Display.block : Display.none;
        if (updated.has(nameof$1("zIndex"))) {
            this.style.zIndex = this.autoZIndex ? "" : String(this.zIndex);
            this.raiseZIndexChange();
        }
        if (updated.has("width") || updated.has("height"))
            (_a = this.popupDialog) === null || _a === void 0 ? void 0 : _a.setSize(this.width, this.height);
    }
    ensureBranchId() {
        if (!this.branchId)
            throw new Error("branchId should not be null");
    }
    addToVisibleBranchTree() {
        this.ensureBranchId();
        visibleBranchTreeSingleton.register(this.branchId);
        modalShadowStackSingleton.register(this.branchId);
        this.raiseBranchRefreshed();
    }
    removeFromVisibleBranchTree() {
        this.ensureBranchId();
        visibleBranchTreeSingleton.unregister(this.branchId);
        modalShadowStackSingleton.unregister(this.branchId);
        this.raiseBranchRefreshed();
    }
    initializeBodyScrollLock() {
        bodyScrollLockSingleton.register(this.branchId);
    }
    releaseBodyScrollLock() {
        bodyScrollLockSingleton.unregister(this.branchId);
    }
    subscribeToEvents() {
        modalShadowStackSingleton.shadowBranchChanged.subscribe(this.topShadowBranchChangedHandler);
        this.addEventListener(PopupHeaderDragStartedEvent.eventName, this.dragStartHandler);
        this.addEventListener(PopupHeaderDragCompletedEvent.eventName, this.dragEndHandler);
        this.addEventListener(PopupLayoutChangeStartEvent.eventName, this.resizeStartHandler);
        this.addEventListener(PopupLayoutChangeEndEvent.eventName, this.resizeEndHandler);
    }
    unsubscribeFromEvents() {
        modalShadowStackSingleton.shadowBranchChanged.unsubscribe(this.topShadowBranchChangedHandler);
        this.removeEventListener(PopupHeaderDragStartedEvent.eventName, this.dragStartHandler);
        this.removeEventListener(PopupHeaderDragCompletedEvent.eventName, this.dragEndHandler);
        this.removeEventListener(PopupLayoutChangeStartEvent.eventName, this.resizeStartHandler);
        this.removeEventListener(PopupLayoutChangeEndEvent.eventName, this.resizeEndHandler);
    }
    handleTopShadowBranchChanged(topBranch) {
        this.topShadowBranchId = topBranch.branch;
    }
    handleDragStart(_) {
        this.isDragging = true;
    }
    handleDragEnd(_) {
        this.isDragging = false;
    }
    handleResizeStart(_) {
        this.isResizing = true;
    }
    handleResizeEnd(_) {
        this.isResizing = false;
    }
    initializeCapture() {
        const popupRoot = document.querySelector("dxbl-popup-root");
        if (popupRoot)
            this._capturedElementReleaseCallback = popupRoot.subscribe(this);
    }
    releaseCapture() {
        this.processClosingRequested(true);
        if (this._capturedElementReleaseCallback) {
            this._capturedElementReleaseCallback();
            this._capturedElementReleaseCallback = null;
        }
    }
    processClosingRequested(result) {
        this.closingResultRequestedTcs.resolve(result);
        this.closingResultRequestedTcs = new TaskCompletionSource();
    }
    notifyDialogConnected(dialog) {
        this.popupDialog = dialog;
        this.initializeKeyboardNavigator();
        this.initializeFocusTrap();
    }
    notifyRootConnected() {
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.shownCompletedTcs.tryResolve();
            });
        });
    }
    notifyDialogDisconnected() {
        this.disposeKeyboardNavigator();
        this.releaseFocusTrap(true);
        this.popupDialog = null;
    }
    notifyRootDisconnected() {
        this.shownCompletedTcs.tryReject("cancelled");
        this.shownCompletedTcs = new TaskCompletionSource();
    }
    capturing() {
        this.activate();
        this.initializeFocusTrap();
    }
    initializeFocusTrap() {
        if (!this.isOpen)
            return;
        if (this.popupDialog && !this.disableFocusTrap)
            focusTrapSingleton.activate(this.popupDialog, true, !!this.keyboardNavigator);
    }
    releaseFocusTrap(shouldRestoreFocus = null) {
        if (shouldRestoreFocus === null)
            shouldRestoreFocus = !this.isOpen;
        focusTrapSingleton.deactivate(this.popupDialog, shouldRestoreFocus);
    }
    activate() {
        const branchActivated = new BranchActivatedEvent(new BranchIdContext(this.branchId));
        this.dispatchEvent(branchActivated);
    }
    notifyCloseCanceled() {
        this.processClosingRequested(false);
    }
    async processCapturedPointerAsync(event, options) {
        if (options.handled)
            return;
        if (this.isPointedCaptured(event))
            return;
        options.nextInteractionHandled = true;
        await PopupClosingHierarchyHelper.tryCloseCapturedElement(this, event, options);
    }
    isPointedCaptured(event) {
        if (this.closeOnPointerUp && (this.isDragging || this.isResizing))
            return true;
        return PointerEventHelper.containsInComposedPath(event, this.popupDialog);
    }
    async processCapturedKeyDownAsync(e, options) {
        if (options.handled)
            return;
        if (this.closeOnEscape && e.key === "Escape")
            await this.processEscape(e, options);
    }
    async processEscape(e, options) {
        const closing = await this.raiseClosingResultRequestedAsync(PopupCloseReason.EscapePress);
        this.closingResultRequestedTcs = new TaskCompletionSource();
        if (!closing) {
            options.handled = true;
            return;
        }
    }
    async closeAsync(options, closeReason) {
        const closing = await this.raiseClosingResultRequestedAsync(closeReason);
        this.closingResultRequestedTcs = new TaskCompletionSource();
        options.nextInteractionHandled = true;
        options.handled = true;
        if (!closing)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }
    async closeHierarchyAsync(e, options, closeReason) {
        // eslint-disable-next-line no-restricted-syntax
        for (const child of visibleBranchTreeSingleton.iterateBranch(this.branchId)) {
            const popup = await getPopupRootSingleton().getPopup(child);
            await (popup === null || popup === void 0 ? void 0 : popup.closeAsync(options, closeReason));
        }
        await this.closeAsync(options, closeReason);
    }
    async raiseClosingResultRequestedAsync(closeReason) {
        if (!this.hasServerSideClosing) {
            this.raiseClosingRequested(closeReason);
            return true;
        }
        const closingRequestedTcs = new TaskCompletionSource();
        this.closingResultRequestedTcs = closingRequestedTcs;
        this.raiseClosingResultRequested(closeReason);
        return closingRequestedTcs.promise;
    }
    raiseClosingRequested(closeReason) {
        setTimeout(() => {
            this.dispatchEvent(new ModalClosingRequestedEvent(closeReason));
        });
    }
    raiseClosingResultRequested(closeReason) {
        this.dispatchEvent(new ModalClosingResultRequestedEvent(closeReason));
    }
    raiseBranchRefreshed() {
        const branchRefreshed = new BranchRefreshedEvent(new BranchIdContext(this.branchId));
        this.dispatchEvent(branchRefreshed);
    }
    raiseZIndexChange() {
        this.updateComplete.then(value => {
            this.dispatchEvent(new PopupZIndexDeltaChangeEvent(new ZIndexDeltaChangeContext(this.zIndex)));
        });
    }
    initializeKeyboardNavigator() {
        var _a, _b, _c;
        if (!this.keyboardNavigator)
            this.keyboardNavigator = this.querySelector(DxPopupKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized) {
            const event = new PopupKeyboardStrategyCreatingEvent({
                createModal: (navigator, targetElement) => new ModalDialogKeyboardStrategy(navigator, targetElement)
            });
            (_a = this.getPortal()) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
            const strategy = (_c = (_b = event.detail.factory) === null || _b === void 0 ? void 0 : _b.createModal) === null || _c === void 0 ? void 0 : _c.call(_b, this.keyboardNavigator, this);
            if (strategy)
                this.keyboardNavigator.initialize(this, strategy);
        }
    }
    disposeKeyboardNavigator() {
        var _a;
        (_a = this.keyboardNavigator) === null || _a === void 0 ? void 0 : _a.disposeComponent();
    }
    getPortal() {
        return PortalAccessor.getPortal(this.branchId);
    }
};
__decorate([
    n({
        type: Boolean, attribute: "x-is-open", reflect: true, converter: {
            fromAttribute: (value, type) => {
                throw new Error("readonly");
            }
        }
    })
], DxModal.prototype, "_isOpen", void 0);
__decorate([
    n({ type: Boolean, attribute: "shading" })
], DxModal.prototype, "shading", void 0);
__decorate([
    n({ type: Boolean, attribute: "close-on-outside-click" })
], DxModal.prototype, "closeOnOutsideClick", void 0);
__decorate([
    n({ type: Boolean, attribute: "close-on-escape" })
], DxModal.prototype, "closeOnEscape", void 0);
__decorate([
    n({ type: Boolean, attribute: "close-on-pointer-up" })
], DxModal.prototype, "closeOnPointerUp", void 0);
__decorate([
    n({ type: Boolean, attribute: "auto-z-index" })
], DxModal.prototype, "autoZIndex", void 0);
__decorate([
    n({ type: Number, attribute: "z-index" })
], DxModal.prototype, "zIndex", void 0);
__decorate([
    n({ type: String, attribute: "branch-id" })
], DxModal.prototype, "branchId", void 0);
__decorate([
    n({ type: String, attribute: "parent-branch-id" })
], DxModal.prototype, "parentBranchId", void 0);
__decorate([
    n({ reflect: false })
], DxModal.prototype, "shadowVisible", void 0);
__decorate([
    n({ reflect: false })
], DxModal.prototype, "topShadowBranchId", void 0);
__decorate([
    n({ type: Boolean, attribute: "has-serverside-closing" })
], DxModal.prototype, "hasServerSideClosing", void 0);
__decorate([
    n({ type: Boolean, attribute: "disable-focus-trap" })
], DxModal.prototype, "disableFocusTrap", void 0);
__decorate([
    n({ type: String, attribute: "width" })
], DxModal.prototype, "width", void 0);
__decorate([
    n({ type: String, attribute: "height" })
], DxModal.prototype, "height", void 0);
DxModal = DxModal_1 = __decorate([
    e(dxModalTagName)
], DxModal);
const modal = { DxModal };

const modal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    dxModalTagName,
    ModalClosingRequestedEvent,
    ModalClosingResultRequestedEvent,
    get DxModal () { return DxModal; },
    default: modal
});

const cellItemTemplate = document.createElement("template");
cellItemTemplate.innerHTML = "<" + dxPopupCellTagName + " class=\"" + dxPopupCellTagName + "\" />";
class PortalDictionary {
    constructor() {
        this.portals = new Map();
    }
    addPortal(branchId, portal) {
        this.portals.set(branchId, portal);
    }
    removePortal(branchId) {
        this.portals.delete(branchId);
    }
    getPortal(branchId) {
        return this.portals.get(branchId);
    }
}
class PortalAccessor {
    static getPortal(branchId) {
        return portalDictionary.getPortal(branchId);
    }
    static getPortalFrom(element) {
        var _a, _b;
        const portal = ((_a = DxPopup.fromElement(element)) === null || _a === void 0 ? void 0 : _a.getPortal()) || ((_b = DxModal.fromElement(element)) === null || _b === void 0 ? void 0 : _b.getPortal());
        return portal ? portal : null;
    }
}
const portalDictionary = new PortalDictionary();
let DxPopupRoot = class DxPopupRoot extends s {
    constructor() {
        super(...arguments);
        this.activateLocker = new Locker();
        this.portalsMapping = new Map();
        this.portals = new Map();
        this.rafAction = new RafAction();
        this.focusInHandler = this.handleFocusIn.bind(this);
        this.adjustZIndexRequestHandler = this.adjustZIndexRequest.bind(this);
        this.branchCreatedHandler = this.handleBranchCreated.bind(this);
        this.branchUpdatedHandler = this.handleBranchUpdated.bind(this);
        this.branchRemovedHandler = this.handleBranchRemoved.bind(this);
        this.branchActivatedHandler = this.handleBranchActivated.bind(this);
        this.branchRefreshedHandler = this.handleBranchRefreshed.bind(this);
        this.captureManager = new CaptureManager();
    }
    createRenderRoot() {
        return this;
    }
    assign(portal) {
        if (this.portals.has(portal) || !portal.branchId)
            return;
        const item = this.selectTemplate(portal);
        this.appendChild(item);
        const cell = this.children[this.children.length - 1];
        cell.setPortal(portal);
        this.portalsMapping.set(portal.branchId, portal);
        this.portals.set(portal, cell);
        portalDictionary.addPortal(portal.branchId, portal);
    }
    release(portal) {
        const cell = this.portals.get(portal);
        this.portalsMapping.delete(portal.branchId);
        portalDictionary.removePortal(portal.branchId);
        this.portals.delete(portal);
        if (cell)
            this.removeChild(cell);
    }
    connectedCallback() {
        super.connectedCallback();
        this.tabIndex = 0;
        this.addEventListener("focusin", this.focusInHandler, { capture: true });
        this.addEventListener(PopupAdjustZIndexRequestEvent.eventName, this.adjustZIndexRequestHandler);
        this.addEventListener(BranchCreatedEvent.eventName, this.branchCreatedHandler);
        this.addEventListener(BranchUpdatedEvent.eventName, this.branchUpdatedHandler);
        this.addEventListener(BranchRemovedEvent.eventName, this.branchRemovedHandler);
        this.addEventListener(BranchActivatedEvent.eventName, this.branchActivatedHandler);
        this.addEventListener(BranchRefreshedEvent.eventName, this.branchRefreshedHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("focusin", this.focusInHandler);
        this.removeEventListener(PopupAdjustZIndexRequestEvent.eventName, this.adjustZIndexRequestHandler);
        this.removeEventListener(BranchCreatedEvent.eventName, this.branchCreatedHandler);
        this.removeEventListener(BranchUpdatedEvent.eventName, this.branchUpdatedHandler);
        this.removeEventListener(BranchRemovedEvent.eventName, this.branchRemovedHandler);
        this.removeEventListener(BranchActivatedEvent.eventName, this.branchActivatedHandler);
        this.removeEventListener(BranchRefreshedEvent.eventName, this.branchRefreshedHandler);
    }
    handleFocusIn(e) {
        this.rafAction.cancel();
        const relatedTargetElement = e.target;
        if (relatedTargetElement === this) {
            EventHelper.markHandled(e);
            this.rafAction.execute(() => this.blur());
        }
    }
    handleBranchCreated(e) {
        branchTreeSingleton.add(e.detail.id, e.detail.parentId, e.detail.type);
        this.assignZIndices();
    }
    handleBranchUpdated(e) {
        branchTreeSingleton.remove(e.detail.id);
        branchTreeSingleton.add(e.detail.id, e.detail.parentId, e.detail.type);
        this.assignZIndices();
    }
    handleBranchRemoved(e) {
        branchTreeSingleton.remove(e.detail.id);
        this.assignZIndices();
    }
    handleBranchActivated(e) {
        const id = e.detail.id;
        if (!visibleBranchTreeSingleton.activate(id)) {
            const portal = this.portalsMapping.get(id);
            if (!portal)
                return;
            const popup = portal.popupBase;
            if (popup)
                this.captureManager.capture(popup);
            this.assignZIndices();
            return;
        }
        const captured = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const branchId of visibleBranchTreeSingleton.iterateBranch(id)) {
            const portal = this.portalsMapping.get(branchId);
            const popup = portal.popup;
            captured.push(popup);
            if (branchId === id)
                break;
        }
        if (captured.length > 0) {
            captured.forEach(x => this.captureManager.releaseCapture(x));
            captured.forEach(x => this.captureManager.capture(x));
        }
        else {
            const portal = this.portalsMapping.get(id);
            const popup = portal.popupBase;
            this.captureManager.capture(popup);
        }
        this.assignZIndices();
    }
    handleBranchRefreshed(e) {
        this.assignZIndices();
    }
    assignZIndices() {
        visibleBranchTreeSingleton.refresh();
        // eslint-disable-next-line no-restricted-syntax
        for (const portal of this.portals.keys()) {
            const branchId = portal.branchId;
            const cell = this.portals.get(portal);
            cell.baseZIndex = visibleBranchTreeSingleton.getIndex(branchId);
        }
    }
    adjustZIndexRequest(e) {
        const branchId = e.detail.branchId;
        if (this.isBranchExistsInDom(branchId)) {
            if (e.detail.isFocused)
                visibleBranchTreeSingleton.setTopMostBranch(branchId);
            this.assignZIndices();
        }
    }
    isBranchExistsInDom(branchId) {
        const portal = this.portalsMapping.get(branchId);
        if (!portal)
            return false;
        return !!this.portals.get(portal);
    }
    getPopup(parentBranchId) {
        const portal = this.portalsMapping.get(parentBranchId);
        const popupPortal = portal;
        return (popupPortal === null || popupPortal === void 0 ? void 0 : popupPortal.popupBase) || null;
    }
    selectTemplate(portal) {
        return cellItemTemplate.content.cloneNode(true);
    }
    subscribe(element) {
        this.captureManager.capture(element);
        return () => {
            this.captureManager.releaseCapture(element);
        };
    }
};
DxPopupRoot = __decorate([
    e(dxPopupRootTagName)
], DxPopupRoot);

const popuproot = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cellItemTemplate,
    PortalAccessor,
    get DxPopupRoot () { return DxPopupRoot; }
});

class ElementViabilityObserver {
    constructor(reinitCallback) {
        this.reinitCallback = reinitCallback;
        this.mutationObserver = new MutationObserver((mutations) => this.checkViability(mutations, this.reinitCallback));
        this.subscribed = false;
    }
    checkViability(mutations, callback) {
        for (const mutation of mutations) {
            if (!mutation.target.isConnected) {
                callback();
                break;
            }
        }
    }
    subscribe(targetElement) {
        if (this.subscribed)
            return;
        this.mutationObserver.observe(targetElement, { attributes: true });
        this.subscribed = true;
    }
    unsubscribe() {
        if (!this.subscribed)
            return;
        this.mutationObserver.disconnect();
        this.subscribed = false;
    }
}

var DxPopup_1;
const dxPopupTagName = "dxbl-popup";
const nameof = nameofFactory();
class PopupClosingEventContext {
    constructor(closeReason, branchId) {
        this.closeReason = closeReason;
        this.branchId = branchId;
    }
}
class PopupClosingRequestedEvent extends CustomEvent {
    constructor(closeReason, branchId) {
        super(PopupClosingRequestedEvent.eventName, {
            detail: new PopupClosingEventContext(closeReason, branchId),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
PopupClosingRequestedEvent.eventName = dxPopupTagName + ".closingRequested";
CustomEventsHelper.register(PopupClosingRequestedEvent.eventName, x => {
    return x.detail;
});
class PopupClosingResultRequestedEvent extends CustomEvent {
    constructor(closeReason, branchId) {
        super(PopupClosingResultRequestedEvent.eventName, {
            detail: new PopupClosingEventContext(closeReason, branchId),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
PopupClosingResultRequestedEvent.eventName = dxPopupTagName + ".closingResultRequested";
CustomEventsHelper.register(PopupClosingResultRequestedEvent.eventName, x => {
    return x.detail;
});
var RestrictMode;
(function (RestrictMode) {
    RestrictMode["Viewport"] = "viewport";
    RestrictMode["Page"] = "page";
    RestrictMode["Rectangle"] = "rectangle";
    RestrictMode["TargetElement"] = "targetelement";
})(RestrictMode || (RestrictMode = {}));
var CloseMode;
(function (CloseMode) {
    CloseMode["None"] = "none";
    CloseMode["Hide"] = "hide";
    CloseMode["Close"] = "close";
})(CloseMode || (CloseMode = {}));
var InterestPoint;
(function (InterestPoint) {
    InterestPoint[InterestPoint["TopLeft"] = 0] = "TopLeft";
    InterestPoint[InterestPoint["TopRight"] = 1] = "TopRight";
    InterestPoint[InterestPoint["BottomLeft"] = 2] = "BottomLeft";
    InterestPoint[InterestPoint["BottomRight"] = 3] = "BottomRight";
    InterestPoint[InterestPoint["Center"] = 4] = "Center";
})(InterestPoint || (InterestPoint = {}));
class PointCombination {
    constructor(targetInterestPoint, childInterestPoint) {
        this.targetInterestPoint = targetInterestPoint;
        this.childInterestPoint = childInterestPoint;
    }
}
var PlacementMode;
(function (PlacementMode) {
    PlacementMode["Absolute"] = "absolute";
    PlacementMode["Relative"] = "relative";
    PlacementMode["Bottom"] = "bottom";
    PlacementMode["Center"] = "center";
    PlacementMode["Right"] = "right";
    PlacementMode["AbsolutePoint"] = "absolutepoint";
    PlacementMode["RelativePoint"] = "relativepoint";
    PlacementMode["Mouse"] = "mouse";
    PlacementMode["MousePoint"] = "mousepoint";
    PlacementMode["Left"] = "left";
    PlacementMode["Top"] = "top";
    PlacementMode["Custom"] = "custom";
})(PlacementMode || (PlacementMode = {}));
var DropDirection;
(function (DropDirection) {
    DropDirection["Near"] = "near";
    DropDirection["Far"] = "far";
})(DropDirection || (DropDirection = {}));
var DropAlignment;
(function (DropAlignment) {
    DropAlignment["top"] = "top";
    DropAlignment["bottom"] = "bottom";
})(DropAlignment || (DropAlignment = {}));
var PopupPrimaryAxis;
(function (PopupPrimaryAxis) {
    PopupPrimaryAxis[PopupPrimaryAxis["None"] = 0] = "None";
    PopupPrimaryAxis[PopupPrimaryAxis["Horizontal"] = 1] = "Horizontal";
    PopupPrimaryAxis[PopupPrimaryAxis["Vertical"] = 2] = "Vertical";
})(PopupPrimaryAxis || (PopupPrimaryAxis = {}));
class PositionInfo {
    constructor(topLeft = new Point(0, 0), size = new Size(0, 0)) {
        this.childSize = Size.Empty;
        this.mousePosition = null;
        this.visuallyHidden = false;
        this.closingRequested = false;
        this.lockPlacement = false;
        this.lockedPosition = 0;
        this.topLeft = topLeft;
        this.size = size;
    }
}
class CustomPopupPlacement {
    constructor(point, axis, dropOpposite, dropDirection, dropAlignment) {
        this.dropOpposite = false;
        this.dropDirection = DropDirection.Near;
        this.dropAlignment = DropAlignment.bottom;
        this.axis = axis;
        this.point = point;
        this.dropOpposite = dropOpposite;
        this.dropAlignment = dropAlignment;
        this.dropDirection = dropDirection;
    }
}
class CustomPlacementContext {
    get childPoints() {
        return this._childPoints;
    }
    get placementTargetPoints() {
        return this._placementTargetPoints;
    }
    constructor(childPoints, placementTargetPoints) {
        this.customPlacement = null;
        this._childPoints = childPoints;
        this._placementTargetPoints = placementTargetPoints;
    }
}
class CustomPlacementEvent extends CustomEvent {
    constructor(detail) {
        super(CustomPlacementEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
CustomPlacementEvent.eventName = "dxbl-popup-custom-placement";
class PopupContext {
}
class PopupShownEvent extends CustomEvent {
    constructor(detail) {
        super(PopupShownEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PopupShownEvent.eventName = "dxbl-popup-shown";
class PopupClosedEvent extends CustomEvent {
    constructor(detail) {
        super(PopupClosedEvent.eventName, {
            detail,
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
PopupClosedEvent.eventName = "dxbl-popup-closed";
class ZIndexDeltaChangeContext {
    get zIndex() { return this._zIndex; }
    constructor(zIndex) {
        this._zIndex = zIndex !== null && zIndex !== void 0 ? zIndex : 0;
    }
}
class PopupZIndexDeltaChangeEvent extends CustomEvent {
    constructor(detail) {
        super(PopupZIndexDeltaChangeEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
PopupZIndexDeltaChangeEvent.eventName = "dxbl-popup-zindex-delta-change";
class PopupAdjustZIndexRequestContext {
    get isFocused() { return this._isFocused; }
    get branchId() { return this._branchId; }
    constructor(branchId, isFocused) {
        this._branchId = branchId;
        this._isFocused = isFocused;
    }
}
class PopupAdjustZIndexRequestEvent extends CustomEvent {
    constructor(detail) {
        super(PopupAdjustZIndexRequestEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
PopupAdjustZIndexRequestEvent.eventName = "dxbl-popup-focus-change";
class PopupVisibleChangedEvent extends CustomEvent {
    constructor(visible) {
        super(PopupVisibleChangedEvent.eventName, {
            detail: { visible },
            bubbles: true,
            composed: true
        });
    }
}
PopupVisibleChangedEvent.eventName = "dxbl-popup-visible-change";
class PopupKeyboardStrategyActivateEvent extends CustomEvent {
    constructor(visible) {
        super(PopupKeyboardStrategyActivateEvent.eventName, {
            detail: { visible },
            bubbles: true,
            composed: true
        });
    }
}
PopupKeyboardStrategyActivateEvent.eventName = "dxbl-popup-kbd-strategy-activate";
class PopupFocusLoopContext {
}
class PopupFocusLoopEvent extends CustomEvent {
    constructor(detail) {
        super(PopupFocusLoopEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
PopupFocusLoopEvent.eventName = "dxbl-popup-focus-loop";
class PopupKeyboardStrategyCreatingEvent extends CustomEvent {
    constructor(factory) {
        super(PopupKeyboardStrategyCreatingEvent.eventName, {
            detail: {
                factory
            },
            bubbles: true,
            composed: true
        });
    }
}
PopupKeyboardStrategyCreatingEvent.eventName = "dxbl-popup-keyboard-strategy-creating";
let DxPopup = DxPopup_1 = class DxPopup extends DxSupportCaptureElement {
    static fromElement(element) {
        while (element !== null && !(element instanceof DxPopup_1))
            element = element.parentElement;
        return element;
    }
    get branchType() {
        return BranchType.DropDown;
    }
    get positionChanged() {
        return this._positionChangedEvent;
    }
    get initialVisibility() {
        return this._initialVisibility;
    }
    set initialVisibility(value) {
        this._initialVisibility = value;
        this._setVisibilityStyles(this._initialVisibility);
        this.initializeFocusTrap();
        this.initializeKeyboardNavigator();
        this.dispatchEvent(new PopupVisibleChangedEvent(this._initialVisibility));
    }
    _setVisibilitySizing(visible) {
        if (visible) {
            if (this._currentMaxHeight !== null) {
                this.style.maxWidth = this._currentMaxWidth;
                this.style.maxHeight = this._currentMaxHeight;
                this.style.overflow = this._currentOverflow;
            }
        }
        else {
            if (this._currentMaxHeight === null) {
                this._currentMaxHeight = this.style.maxHeight;
                this._currentMaxWidth = this.style.maxWidth;
                this._currentOverflow = this.style.overflow;
            }
            this.style.overflow = "hidden";
            this.style.maxWidth = "0px";
            this.style.maxHeight = "0px";
        }
    }
    _setVisibilityStyles(visible) {
        if (visible) {
            this.style.opacity = "1";
            this.style.pointerEvents = "auto";
        }
        else {
            this.style.opacity = "0";
            this.style.pointerEvents = "none";
        }
        this._setVisibilitySizing(visible);
    }
    enableVisibility() {
        clearTimeout(this._showingTimeoutId);
        this._showingTimeoutId = setTimeout(() => {
            if (!this.initialVisibility)
                this.initialVisibility = true;
        });
    }
    static get styles() {
        return i `
            :host {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                min-height: 0;
            }
            dxbl-branch {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                min-height: 0;
            }
            .content-holder {
                display: flex;
                flex: 1 0 auto;
                flex-direction: column;
                min-height: 0;
            }
        `;
    }
    get isCloseOnPointerUp() {
        return this.closeOnPointerUp;
    }
    get renderedVisible() {
        var _a, _b;
        return this._renderedVisible && ((_b = (_a = this._parentPopup) === null || _a === void 0 ? void 0 : _a.renderedVisible) !== null && _b !== void 0 ? _b : true);
    }
    updated(updated) {
        if (updated.has("closeOnOutsideClick"))
            this.processCapture(this.closeOnOutsideClick);
        this.reposition();
    }
    initializeFocusTrap() {
        if (this.initialVisibility && this.isOpen && this.focusLoop)
            focusTrapSingleton.activate(this, false);
    }
    get child() {
        return this._child;
    }
    get isOpen() {
        return this._isOpen;
    }
    get placementTargetElement() {
        return this.placementTargetElementField;
    }
    set placementTargetElement(element) {
        this.unsubscribeFromPlacementTargetPositionObserver();
        this.placementTargetElementField = element;
        this.subscribeToPlacementTargetPositionObserver();
    }
    updateTargetElement() {
        if (!this.placementTarget)
            return;
        const target = document.querySelector(this.placementTarget);
        if (!target)
            return;
        this.placementTargetElement = target;
    }
    get dropOpposite() {
        return this._dropOpposite;
    }
    get autoFocus() {
        return this._autoFocus;
    }
    get dropFromRight() {
        return this._dropFromRight;
    }
    get offset() {
        return this._offset;
    }
    set offset(value) {
        this._offset = value;
        this.style.transform = TransformHelper.translateByPoint(value);
    }
    get childSize() {
        return this.positionInfo.childSize;
    }
    constructor() {
        super();
        this._renderedVisible = false;
        this.hasOwnLogicalParent = false;
        this.tolerance = 0.01;
        this.repositionAction = new RafAction();
        this.positionInfo = new PositionInfo();
        this._child = null;
        this.childResizeObserver = new ResizeObserver(this.handleChildSizeChanged.bind(this));
        this._dropOpposite = false;
        this._dropFromRight = false;
        this._offset = Point.zero;
        this.placementTargetElementField = null;
        this.focusInHandler = this.handleFocusIn.bind(this);
        this.focusOutHandler = this.handleFocusOut.bind(this);
        this.focusLoopHandler = this.handleFocusLoop.bind(this);
        this.positionChangingHandler = this.handlePositionChanging.bind(this);
        this.sizeChangedHandler = this.handleSizeChanged.bind(this);
        this.placementTargetPositionChangedHandler = this.handlePlacementTargetPositionChanged.bind(this);
        this.placementTargetPositionObserver = new PositionTrackerObserver(this.placementTargetPositionChangedHandler, { raf: false });
        this.placementTargetViabilityObserver = new ElementViabilityObserver(() => this.updateTargetElement());
        this.placementTargetElementChangedHandler = this.handlePlacementTargetElementChanged.bind(this);
        this.placementTargetObserver = null;
        this._autoFocus = false;
        this._interceptor = null;
        this.bridgeSlotChangedHandler = this.handleBridgeSlotChange.bind(this);
        this.closingResultRequestedTcs = new TaskCompletionSource();
        this._positionChangedEvent = new Signal();
        this._parentPopup = null;
        this.positionChangedHandler = this.handleParentPopupPositionChanged.bind(this);
        this._initialVisibility = true;
        this._showingTimeoutId = undefined;
        this.isAdjustDialogEnabled = true;
        this._capturedElementReleaseCallback = null;
        this._currentMaxHeight = null;
        this._currentMaxWidth = null;
        this._currentOverflow = null;
        this.closeOnOutsideClick = false;
        this.closeOnPointerUp = false;
        this.preventCloseOnPositionTargetClick = false;
        this.closeMode = CloseMode.Hide;
        this.fitToRestriction = false;
        this.preventInteractions = false;
        this.hasServerSideClosing = false;
        this.parentBranchId = null;
        this.rootCssStyle = null;
        this.placement = PlacementMode.Absolute;
        this.horizontalOffset = 0;
        this.verticalOffset = 0;
        this.placementTarget = null;
        this.restrictTarget = null;
        this.restrict = RestrictMode.Viewport;
        this.width = null;
        this.maxWidth = null;
        this.minWidth = null;
        this.height = null;
        this.maxHeight = null;
        this.minHeight = null;
        this.desiredWidth = null;
        this.desiredHeight = null;
        this.minDesiredWidth = null;
        this.minDesiredHeight = null;
        this.renderWidth = null;
        this.renderHeight = null;
        this.restrictRectangle = Rect.Empty;
        this.placementRectangle = Rect.Empty;
        this.actualDropDirection = DropDirection.Near;
        this.actualDropAlignment = DropAlignment.bottom;
        this.actualDropOpposite = false;
        this._isOpen = false;
        this.animationEnabled = false;
        this.resizing = false;
        this.focusLoop = false;
        this.zIndex = 0;
        this.releasingCaptureAction = this.releaseFocusTrap;
        this.capturingAction = this.activate;
    }
    render() {
        return this.renderTemplate();
    }
    activatePopupContent() {
        // raise event for strategy activating
    }
    willUpdate(updated) {
        this.renderWidth = this.calcRenderWidth();
        this.renderHeight = this.calcRenderHeight();
        if (this.shouldUpdateRootCssStyle(updated))
            this.rootCssStyle = this.composeRootCssStyle();
        if (updated.has(nameof("placementTarget")))
            this.processPlacementTargetChanged();
    }
    composeRootCssStyle() {
        let rootCssStyle = "";
        if (this.shouldCalcWidth())
            rootCssStyle += `width: ${this.calcWidth()}; `;
        if (this.shouldCalcMinWidth())
            rootCssStyle += `min-width: ${this.calcMinWidth()}; `;
        if (this.shouldCalcMaxWidth())
            rootCssStyle += `max-width: ${this.calcMaxWidth()}; `;
        if (this.shouldCalcHeight())
            rootCssStyle += `height: ${this.calcHeight()}; `;
        if (this.shouldCalcMinHeight())
            rootCssStyle += `min-height: ${this.calcMinHeight()}; `;
        if (this.shouldCalcMaxHeight())
            rootCssStyle += `max-height: ${this.calcMaxHeight()}; `;
        return rootCssStyle;
    }
    processPlacementTargetChanged() {
        this.unsubscribeFromPlacementTargetObserver();
        this.unsubscribeFromPlacementTargetPositionObserver();
        this.subscribeToPlacementTargetObserver();
        this.subscribeToPlacementTargetPositionObserver();
    }
    calcRenderHeight() {
        var _a;
        return (_a = this.desiredHeight) !== null && _a !== void 0 ? _a : this.height;
    }
    calcRenderWidth() {
        var _a;
        return (_a = this.desiredWidth) !== null && _a !== void 0 ? _a : this.width;
    }
    calcMaxWidth() {
        return this.maxWidth;
    }
    calcMaxHeight() {
        return this.maxHeight;
    }
    calcMinWidth() {
        var _a;
        return (_a = this.minDesiredWidth) !== null && _a !== void 0 ? _a : this.minWidth;
    }
    calcMinHeight() {
        var _a;
        return (_a = this.minDesiredHeight) !== null && _a !== void 0 ? _a : this.minHeight;
    }
    shouldCalcMinHeight() {
        return !!this.minHeight || !!this.minDesiredHeight;
    }
    shouldCalcMinWidth() {
        return !!this.minWidth || !!this.minDesiredWidth;
    }
    shouldCalcMaxWidth() {
        return !!this.maxWidth;
    }
    shouldCalcMaxHeight() {
        return !!this.maxHeight;
    }
    shouldCalcWidth() {
        return !!this.renderWidth;
    }
    shouldCalcHeight() {
        return !!this.renderHeight;
    }
    calcWidth() {
        return this.renderWidth;
    }
    calcHeight() {
        return this.renderHeight;
    }
    shouldUpdateRootCssStyle(updated) {
        return updated.has("width") || updated.has("minWidth") || updated.has("maxWidth") || updated.has("height") || updated.has("minHeight")
            || updated.has("maxHeight") || updated.has("desiredWidth") || updated.has("desiredHeight") || updated.has("renderWidth")
            || updated.has("renderHeight") || updated.has("minDesiredWidth") || updated.has("minDesiredHeight");
    }
    renderTemplate() {
        return x `
            <div class="${this.rootCssStyle}">
                ${this.renderSlot}
            </div>
        `;
    }
    renderSlot() {
        return x `
            ${this.renderDefaultSlot()}
            ${this.renderAdditionalSlots()}
            ${this.renderBridgeSlot()}
        `;
    }
    renderDefaultSlot() {
        return x `<slot></slot>`;
    }
    renderBridgeSlot() {
        return x `
            <slot name="bridge" @slotchange=${this.bridgeSlotChangedHandler}></slot>
        `;
    }
    renderAdditionalSlots() {
        return x `
            <slot name="top-left" slot="top-left"></slot>
            <slot name="top-right" slot="top-right"></slot>
            <slot name="bottom-left" slot="bottom-left"></slot>
            <slot name="bottom-right" slot="bottom-right"></slot>
        `;
    }
    firstUpdated() {
        if (!this.child)
            return;
        this.childResizeObserver.observe(this.child);
        this.reposition();
    }
    connectedCallback() {
        super.connectedCallback();
        this.style.display = Display.flex;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.close();
    }
    createKeyboardNavigationStrategy() {
        return null;
    }
    initializeKeyboardNavigator() {
        var _a, _b, _c;
        if (!this.keyboardNavigator)
            this.keyboardNavigator = this.querySelector(DxPopupKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized) {
            const event = new PopupKeyboardStrategyCreatingEvent({
                createPopup: this.createKeyboardNavigationStrategy.bind(this)
            });
            (_a = this.getPortal()) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
            const strategy = (_c = (_b = event.detail.factory) === null || _b === void 0 ? void 0 : _b.createPopup) === null || _c === void 0 ? void 0 : _c.call(_b, this.keyboardNavigator, this);
            if (strategy)
                this.keyboardNavigator.initialize(this, strategy);
        }
    }
    handleBridgeSlotChange(e) {
        const slot = e.target;
        const elements = slot.assignedNodes();
        this._interceptor = elements[0];
    }
    async processCapturedPointerAsync(event, options) {
        if (options.handled)
            return;
        if (this.isPointedCaptured(event))
            return;
        options.nextInteractionHandled = options.nextInteractionHandled || this.preventInteractions;
        await PopupClosingHierarchyHelper.tryCloseCapturedElement(this, event, options);
    }
    isPointedCaptured(event) {
        if (PointerEventHelper.containsInComposedPath(event, this))
            return true;
        if (event.target instanceof Node && this.isSubItem(event.target))
            return true;
        return this.shouldCloseOnPlacementTargetClick(event);
    }
    isSubItem(element) {
        return !!LogicalTreeHelper.findParent(element, e => e === this);
    }
    shouldCloseOnPlacementTargetClick(event) {
        if (!this.preventCloseOnPositionTargetClick || !this.placementTargetElement)
            return false;
        return EventHelper.containsInComposedPath(event, x => x === this.placementTargetElement);
    }
    async closeAsync(options, closeReason) {
        const closing = await this.raiseClosingResultRequestedAsync(closeReason);
        this.closingResultRequestedTcs = new TaskCompletionSource();
        options.nextInteractionHandled = options.nextInteractionHandled || this.preventInteractions;
        options.handled = true;
        if (!closing)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }
    async closeHierarchyAsync(event, options, closeReason) {
        await PopupClosingHierarchyHelper.closeHierarchyAsync(this, event, options, closeReason);
    }
    async closeRootAsync(event, options, closeReason) {
        await PopupClosingHierarchyHelper.closeRootAsync(this, event, options, closeReason);
    }
    async processCapturedKeyDownAsync(e, options) {
        await super.processCapturedKeyDownAsync(e, options);
        if (options.handled)
            return;
        if (e.key === "Escape" && this.canProcessEscapeKeyDown()) {
            EventHelper.markHandled(e);
            const closing = await this.raiseClosingResultRequestedAsync(PopupCloseReason.EscapePress);
            this.closingResultRequestedTcs = new TaskCompletionSource();
            if (!closing) {
                options.handled = true;
                return;
            }
            this.unsubscribeCapture();
        }
    }
    canProcessEscapeKeyDown() {
        return true;
    }
    releaseFocusTrap() {
        const shouldRestoreFocus = !this.isOpen;
        focusTrapSingleton.deactivate(this, shouldRestoreFocus);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    raiseEvent(name, args) {
        var _a;
        (_a = this._interceptor) === null || _a === void 0 ? void 0 : _a.raise(name, args);
    }
    unsubscribeFromPlacementTargetObserver() {
        if (!this.placementTargetObserver)
            return;
        this.placementTargetObserver.disconnect();
        this.placementTargetObserver = null;
    }
    subscribeToPlacementTargetObserver() {
        if (!this.isOpen)
            return;
        this.placementTargetObserver = new ElementObserver(this.placementTarget, this.placementTargetElementChangedHandler);
        this.placementTargetObserver.observe();
    }
    unsubscribeFromPlacementTargetPositionObserver() {
        this.placementTargetPositionObserver.disconnect();
        this.placementTargetViabilityObserver.unsubscribe();
    }
    subscribeToParentPopup() {
        const parentPopup = LogicalTreeHelper.findParent(this, x => isIPopupBaseClientSideApi(x));
        if (parentPopup && isIPopupBaseClientSideApi(parentPopup)) {
            const parentPopupApi = parentPopup;
            parentPopupApi.positionChanged.subscribe(this.positionChangedHandler);
            this._parentPopup = parentPopupApi;
        }
    }
    unsubscribeFromParentPopup() {
        if (!this._parentPopup)
            return;
        this._parentPopup.positionChanged.unsubscribe(this.positionChangedHandler);
        this._parentPopup = null;
    }
    handleParentPopupPositionChanged(source, data) {
        this.updatePosition();
    }
    subscribeToPlacementTargetPositionObserver() {
        if (!this.placementTargetElement || !this.isOpen)
            return;
        this.placementTargetPositionObserver.observe(this.placementTargetElement);
        this.placementTargetViabilityObserver.subscribe(this.placementTargetElement);
    }
    show() {
        if (this.isOpen)
            return;
        this._isOpen = true;
        this.initialVisibility = false;
        this._isOpen = true;
        this.raiseShown();
        this.addToLogicalTree();
        this.addToVisibleBranchTree();
        this.subscribeEvents();
        this.initializeCapture();
        this.reposition();
        if (this.canAdjustZIndexOnShow)
            this.raiseAdjustZIndexRequest(true);
    }
    get canAdjustZIndexOnShow() {
        return true;
    }
    ensureBranchId() {
        if (!this.branchId)
            throw new Error("branchId should not be null");
    }
    addToVisibleBranchTree() {
        this.ensureBranchId();
        visibleBranchTreeSingleton.register(this.branchId);
    }
    removeFromVisibleBranchTree() {
        this.ensureBranchId();
        visibleBranchTreeSingleton.unregister(this.branchId);
    }
    getPortal() {
        return PortalAccessor.getPortal(this.branchId);
    }
    raiseShown() {
        this._setVisibilitySizing(true);
        const detail = new PopupContext();
        this.dispatchEvent(new PopupShownEvent(detail));
    }
    raiseClosed() {
        const detail = new PopupContext();
        this.dispatchEvent(new PopupClosedEvent(detail));
    }
    close() {
        if (!this.isOpen)
            return;
        this._isOpen = false;
        this.raiseClosed();
        this.removeFromLogicalTree();
        this.removeFromVisibleBranchTree();
        this.unsubscribeEvents();
        this.releaseCapture();
        this.cleanUpAfterClose();
        this.reposition();
        if (this.canAdjustZIndexOnShow)
            this.raiseAdjustZIndexRequest(false);
    }
    notifyCloseCanceled() {
        this.processClosingRequested(false);
        this.positionInfo.closingRequested = false;
    }
    cleanUpAfterClose() {
        this.updateVisibility(false);
        this.animationEnabled = false;
        this.positionInfo = new PositionInfo();
    }
    shouldCapture() {
        return this.closeOnOutsideClick || this.preventInteractions;
    }
    async addToLogicalTree() {
        if (this.hasLogicalParent) {
            this.hasOwnLogicalParent = true;
            return;
        }
        this.ensureBranchId();
        const parentId = branchTreeSingleton.getParentId(this.branchId);
        const parent = await getPopupRootSingleton().getPopup(parentId);
        if (parent && isILogicalOwner(parent))
            parent.addLogicalChild(this);
    }
    removeFromLogicalTree() {
        if (this.hasOwnLogicalParent) {
            this.hasOwnLogicalParent = false;
            return;
        }
        const parent = LogicalTreeHelper.getParent(this, true);
        if (parent && isILogicalOwner(parent))
            parent.removeLogicalChild(this);
    }
    initializeCapture() {
        if (!this.shouldCapture)
            return;
        this.subscribeCapture();
    }
    focusCapture() {
        if (!this.shouldCapture)
            return;
    }
    releaseCapture() {
        this.processClosingRequested(true);
        this.unsubscribeCapture();
    }
    subscribeCapture() {
        const popupRoot = document.querySelector("dxbl-popup-root");
        if (popupRoot)
            this._capturedElementReleaseCallback = popupRoot.subscribe(this);
    }
    unsubscribeCapture() {
        if (this._capturedElementReleaseCallback) {
            this._capturedElementReleaseCallback();
            this._capturedElementReleaseCallback = null;
        }
    }
    processClosingRequested(result) {
        this.closingResultRequestedTcs.resolve(result);
        this.closingResultRequestedTcs = new TaskCompletionSource();
        this.positionInfo.closingRequested = false;
    }
    subscribeToChild(element) {
        if (!element)
            return;
        this.childResizeObserver.observe(element, { box: "border-box" });
    }
    unsubscribeFromChild(element) {
        if (!element)
            return;
        this.childResizeObserver.unobserve(element);
    }
    subscribeEvents() {
        if (this.isAdjustDialogEnabled) {
            this.addEventListener("focusin", this.focusInHandler);
            this.addEventListener("focusout", this.focusOutHandler);
        }
        if (this.focusLoop)
            this.addEventListener(PopupFocusLoopEvent.eventName, this.focusLoopHandler);
        document.addEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
        this.addEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
        window.addEventListener("resize", this.sizeChangedHandler);
        this.subscribeToPlacementTargetObserver();
        this.subscribeToPlacementTargetPositionObserver();
        this.subscribeToParentPopup();
    }
    unsubscribeEvents() {
        if (this.isAdjustDialogEnabled) {
            this.removeEventListener("focusin", this.focusInHandler);
            this.removeEventListener("focusout", this.focusOutHandler);
        }
        if (this.focusLoop)
            this.removeEventListener(PopupFocusLoopEvent.eventName, this.focusLoopHandler);
        document.removeEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
        this.removeEventListener(PositionChangingEvent.eventName, this.positionChangingHandler);
        this.removeEventListener("resize", this.sizeChangedHandler);
        this.unsubscribeFromPlacementTargetPositionObserver();
        this.unsubscribeFromPlacementTargetObserver();
        this.unsubscribeFromParentPopup();
    }
    reposition() {
        this.repositionAction.execute(this.updatePosition.bind(this));
    }
    activate() {
        const branchActivated = new BranchActivatedEvent(new BranchIdContext(this.branchId));
        this.dispatchEvent(branchActivated);
    }
    forceReposition() {
        this.repositionAction.cancel();
        this.updatePosition();
    }
    lockPlacement() {
        this.positionInfo.lockPlacement = true;
    }
    unlockPlacement() {
        this.positionInfo.lockPlacement = false;
    }
    handleChildSizeChanged(_, __) {
        this.reposition();
        if (this.contentLoaded())
            this.enableVisibility();
    }
    contentLoaded() {
        return true;
    }
    handlePositionChanging(evt) {
        this.reposition();
    }
    handleSizeChanged(evt) {
        this.reposition();
    }
    handlePlacementTargetPositionChanged(entry, observer) {
        this.reposition();
        this.enableVisibility();
    }
    handlePlacementTargetElementChanged(entry, observer) {
        this.placementTargetElement = entry.element;
        this.reposition();
    }
    handleFocusIn(e) {
        this.raiseAdjustZIndexRequest(true);
        this.subscribeCapture();
    }
    handleFocusOut(e) {
        this.raiseAdjustZIndexRequest(false);
    }
    handleFocusLoop() {
        this.initializeFocusTrap();
    }
    raiseAdjustZIndexRequest(isFocused) {
        this.dispatchEvent(new PopupAdjustZIndexRequestEvent(new PopupAdjustZIndexRequestContext(this.branchId, isFocused)));
        if (isFocused)
            this.focusCapture();
    }
    isAbsolutePlacementMode(placement) {
        switch (placement) {
            case PlacementMode.MousePoint:
            case PlacementMode.Mouse:
            case PlacementMode.AbsolutePoint:
            case PlacementMode.Absolute:
                return true;
        }
        return false;
    }
    interestPointsFromRect(rect) {
        const points = new Array(5);
        points[InterestPoint.TopLeft] = rect.topLeft;
        points[InterestPoint.TopRight] = rect.topRight;
        points[InterestPoint.BottomLeft] = rect.bottomLeft;
        points[InterestPoint.BottomRight] = rect.bottomRight;
        points[InterestPoint.Center] = new Point(rect.x + rect.width / 2.0, rect.y + rect.height / 2.0);
        return points;
    }
    getPlacementTargetInterestPoints(placement) {
        let interestPoints;
        let placementRect = Rect.Empty;
        const target = this.placementTargetElement;
        const offset = new Vector(this.horizontalOffset, this.verticalOffset);
        if (!target || this.isAbsolutePlacementMode(placement)) {
            if (placement === PlacementMode.Mouse || placement === PlacementMode.MousePoint) {
                if (!this.positionInfo.mousePosition)
                    this.positionInfo.mousePosition = new Point(mouseHelperSingleton.x, mouseHelperSingleton.y);
                placementRect = Rect.create(this.positionInfo.mousePosition, Size.Empty);
            }
            placementRect = RectHelper.offset(placementRect, offset);
            interestPoints = this.interestPointsFromRect(placementRect);
        }
        else {
            placementRect = this.placementRectangle;
            if (RectHelper.areSame(placementRect, Rect.Empty)) {
                if (placement !== PlacementMode.Relative && placement !== PlacementMode.RelativePoint)
                    placementRect = new Rect(0, 0, target.getBoundingClientRect().width, target.getBoundingClientRect().height);
                else
                    placementRect = Rect.Empty;
            }
            placementRect = RectHelper.offset(placementRect, offset);
            interestPoints = this.interestPointsFromRect(placementRect);
            const targetToClientOffset = LayoutHelper.getRelativeElementRect(target).topLeft;
            for (let i = 0; i < 5; i++)
                interestPoints[i] = PointHelper.add(interestPoints[i], targetToClientOffset);
        }
        return interestPoints;
    }
    getChildInterestPoints(placement) {
        if (!this.child)
            return this.interestPointsFromRect(Rect.Empty);
        this._setVisibilitySizing(true);
        return this.interestPointsFromRect(new Rect(0, 0, this.child.offsetWidth, this.child.offsetHeight));
    }
    getBounds(interestPoints) {
        let left = interestPoints[0].x;
        let right = interestPoints[0].x;
        let top = interestPoints[0].y;
        let bottom = interestPoints[0].y;
        interestPoints.forEach(p => {
            const x = p.x;
            const y = p.y;
            if (x < left)
                left = x;
            if (x > right)
                right = x;
            if (y < top)
                top = y;
            if (y > bottom)
                bottom = y;
        });
        return new Rect(left, top, right - left, bottom - top);
    }
    raiseCustomPlacement(childPoints, placementTargetPoints) {
        const args = new CustomPlacementEvent(new CustomPlacementContext(childPoints, placementTargetPoints));
        this.dispatchEvent(args);
        return args.detail.customPlacement;
    }
    getNumberOfCombinations(placement) {
        switch (placement) {
            case PlacementMode.Mouse:
                return 2;
            case PlacementMode.Bottom:
            case PlacementMode.Top:
            case PlacementMode.Right:
            case PlacementMode.Left:
            case PlacementMode.RelativePoint:
            case PlacementMode.MousePoint:
            case PlacementMode.AbsolutePoint:
                return 4;
            case PlacementMode.Custom:
                return 0;
            case PlacementMode.Absolute:
            case PlacementMode.Relative:
            case PlacementMode.Center:
            default:
                return 1;
        }
    }
    getPointCombination(placement, i) {
        const dropFromRight = this.dropFromRight;
        switch (placement) {
            case PlacementMode.Mouse:
                if (dropFromRight) {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                }
                else {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                }
                break;
            case PlacementMode.Bottom:
                if (dropFromRight) {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.top];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.top];
                }
                else {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.top];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.top];
                }
                break;
            case PlacementMode.Top:
                if (dropFromRight) {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.top];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.bottom];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.top];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.bottom];
                }
                else {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.top];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.bottom];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.top];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.bottom];
                }
                break;
            case PlacementMode.Right:
            case PlacementMode.Left:
                if ((dropFromRight && placement === PlacementMode.Right) ||
                    (!dropFromRight && placement === PlacementMode.Left)) {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopRight), PopupPrimaryAxis.Vertical, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.BottomRight), PopupPrimaryAxis.Vertical, true, DropDirection.Near, DropAlignment.top];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.TopLeft), PopupPrimaryAxis.Vertical, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.BottomLeft), PopupPrimaryAxis.Vertical, true, DropDirection.Far, DropAlignment.top];
                }
                else {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopRight, InterestPoint.TopLeft), PopupPrimaryAxis.Vertical, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.BottomRight, InterestPoint.BottomLeft), PopupPrimaryAxis.Vertical, true, DropDirection.Near, DropAlignment.top];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopRight), PopupPrimaryAxis.Vertical, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.BottomLeft, InterestPoint.BottomRight), PopupPrimaryAxis.Vertical, true, DropDirection.Far, DropAlignment.top];
                }
                break;
            case PlacementMode.Relative:
            case PlacementMode.RelativePoint:
            case PlacementMode.MousePoint:
            case PlacementMode.AbsolutePoint:
                if (dropFromRight) {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.top];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.top];
                }
                else {
                    if (i === 0)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopLeft), PopupPrimaryAxis.Horizontal, false, DropDirection.Near, DropAlignment.bottom];
                    if (i === 1)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopRight), PopupPrimaryAxis.Horizontal, false, DropDirection.Far, DropAlignment.bottom];
                    if (i === 2)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomLeft), PopupPrimaryAxis.Horizontal, true, DropDirection.Near, DropAlignment.top];
                    if (i === 3)
                        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.BottomRight), PopupPrimaryAxis.Horizontal, true, DropDirection.Far, DropAlignment.top];
                }
                break;
            case PlacementMode.Center:
                return [new PointCombination(InterestPoint.Center, InterestPoint.Center), PopupPrimaryAxis.None, false, DropDirection.Near, DropAlignment.bottom];
            case PlacementMode.Absolute:
            case PlacementMode.Custom:
            default:
                return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopLeft), PopupPrimaryAxis.None, false, DropDirection.Near, DropAlignment.bottom];
        }
        return [new PointCombination(InterestPoint.TopLeft, InterestPoint.TopLeft), PopupPrimaryAxis.None, false, DropDirection.Near, DropAlignment.bottom];
    }
    getRestrictBounds() {
        switch (this.restrict) {
            case RestrictMode.Viewport:
                return ScreenHelper.viewport();
            case RestrictMode.Page:
                return ScreenHelper.page();
            case RestrictMode.TargetElement: {
                if (!this.restrictTarget)
                    throw new Error("restrictTarget should be specified if restrictmode is custom");
                const target = document.querySelector(this.restrictTarget);
                return LayoutHelper.getRelativeElementRect(target);
            }
            case RestrictMode.Rectangle:
                return this.restrictRectangle;
        }
        return ScreenHelper.viewport();
    }
    updatePosition() {
        if (!this.isOpen) {
            this._renderedVisible = false;
            this._setVisibilityStyles(false);
            return;
        }
        const previousRenderedVisible = this.renderedVisible;
        this._renderedVisible = true;
        const visible = this.renderedVisible;
        if (!visible) {
            this.updateVisibility(true);
            if (previousRenderedVisible !== visible)
                this.raisePositionChanged(this.offset, false);
            return;
        }
        const placement = this.placement;
        const placementTargetInterestPoints = this.getPlacementTargetInterestPoints(placement);
        const childInterestPoints = this.getChildInterestPoints(placement);
        const placementBounds = this.getBounds(placementTargetInterestPoints);
        let childBounds = this.getBounds(childInterestPoints);
        const childArea = childBounds.width * childBounds.height;
        let bestIndex = -1;
        let bestTranslation = new Vector(this.positionInfo.topLeft.x, this.positionInfo.topLeft.y);
        let shouldHide = false;
        let bestScore = -1;
        let bestAxis = PopupPrimaryAxis.None;
        let positions = 0;
        let bestDropDirection = this.actualDropDirection;
        let bestDropOpposite = this.actualDropOpposite;
        let bestDropAlignment = this.actualDropAlignment;
        let bestCustomPlacement = null;
        let customPlacements = null;
        if (placement === PlacementMode.Custom) {
            customPlacements = this.processCustomPlacement(childInterestPoints, placementTargetInterestPoints);
            positions = customPlacements ? customPlacements.length : 0;
        }
        else
            positions = this.getNumberOfCombinations(placement);
        for (let i = 0; i < positions; i++) {
            if (this.positionInfo.lockPlacement && this.positionInfo.lockedPosition !== i)
                continue;
            let popupTranslation = new Vector(0, 0);
            let axis = PopupPrimaryAxis.None;
            let dropOppositeCandidate = false;
            let dropDirectionCandidate = DropDirection.Near;
            let dropAlignmentCandidate = DropAlignment.bottom;
            let customPlacement = null;
            if (placement === PlacementMode.Custom) {
                customPlacement = customPlacements[i];
                popupTranslation = VectorHelper.add(placementTargetInterestPoints[InterestPoint.TopLeft], customPlacement.point);
                axis = customPlacement.axis;
                dropOppositeCandidate = customPlacement.dropOpposite;
                dropDirectionCandidate = customPlacement.dropDirection;
                dropAlignmentCandidate = customPlacement.dropAlignment;
            }
            else {
                const [pointCombination, axis, dropOpposite, dropDirection, dropAlignment] = this.getPointCombination(placement, i);
                const targetInterestPoint = pointCombination.targetInterestPoint;
                const childInterestPoint = pointCombination.childInterestPoint;
                dropOppositeCandidate = dropOpposite;
                dropDirectionCandidate = dropDirection;
                dropAlignmentCandidate = dropAlignment;
                popupTranslation = PointHelper.sub(placementTargetInterestPoints[targetInterestPoint], childInterestPoints[childInterestPoint]);
            }
            const translatedChildBounds = RectHelper.offset(childBounds, popupTranslation);
            const screenBounds = this.getRestrictBounds();
            const currentIntersection = RectHelper.intersect(screenBounds, translatedChildBounds);
            const score = currentIntersection.isEmpty ? 0 : currentIntersection.width * currentIntersection.height;
            if (score - bestScore > this.tolerance) {
                bestIndex = i;
                bestTranslation = popupTranslation;
                bestScore = score;
                bestAxis = axis;
                bestDropDirection = dropDirectionCandidate;
                bestDropOpposite = dropOppositeCandidate;
                bestDropAlignment = dropAlignmentCandidate;
                bestCustomPlacement = customPlacement;
                if (Math.abs(score - childArea) < this.tolerance)
                    break;
            }
        }
        this.actualDropOpposite = bestDropOpposite;
        this.actualDropDirection = bestDropDirection;
        this.actualDropAlignment = bestDropAlignment;
        childBounds = RectHelper.offset(childBounds, bestTranslation);
        const screenBounds = this.getRestrictBounds();
        const intersection = RectHelper.intersect(screenBounds, childBounds);
        [bestTranslation, shouldHide] = this.calcRestrictedBestTranslation(intersection, childBounds, placementTargetInterestPoints, screenBounds, placementBounds, bestTranslation);
        this.processBestTranslationResults(bestTranslation, childBounds, placementBounds, screenBounds, bestDropOpposite, bestDropDirection, bestDropAlignment, bestAxis, bestCustomPlacement);
        this.positionInfo.lockedPosition = bestIndex;
        this.positionInfo.childSize = childBounds.size;
        const bestX = Math.round(bestTranslation.x);
        const bestY = Math.round(bestTranslation.y);
        let shouldRaisePositionChanged = false;
        if (bestX !== this.positionInfo.topLeft.x || bestY !== this.positionInfo.topLeft.y) {
            this.positionInfo.topLeft = new Point(bestX, bestY);
            this.offset = this.positionInfo.topLeft;
            shouldRaisePositionChanged = true;
        }
        const hierarchicalShouldHide = !visible || shouldHide;
        const visibilityUpdated = this.updateVisibility(hierarchicalShouldHide);
        shouldRaisePositionChanged = shouldRaisePositionChanged || visibilityUpdated;
        this.animationEnabled = visible && !shouldHide;
        this._setVisibilityStyles(!hierarchicalShouldHide);
        if (shouldRaisePositionChanged)
            this.raisePositionChanged(this.offset, hierarchicalShouldHide);
        if (this.closeMode === CloseMode.Close && !this.positionInfo.closingRequested && hierarchicalShouldHide) {
            this.positionInfo.closingRequested = true;
            this.raiseClosingRequested(PopupCloseReason.Programmatically);
        }
    }
    raisePositionChanged(point, shouldHide) {
        this._positionChangedEvent.raise(this, [!shouldHide, point]);
    }
    updateVisibility(shouldHide) {
        this._renderedVisible = !shouldHide;
        if (this.positionInfo.visuallyHidden !== shouldHide) {
            this._setVisibilityStyles(!shouldHide);
            this.positionInfo.visuallyHidden = shouldHide;
            return true;
        }
        return false;
    }
    processCustomPlacement(childInterestPoints, placementTargetInterestPoints) {
        return this.raiseCustomPlacement(childInterestPoints, placementTargetInterestPoints);
    }
    raiseClosingRequested(closeReason) {
        this.dispatchEvent(new PopupClosingRequestedEvent(closeReason, this.branchId));
    }
    raiseClosingResultRequested(closeReason) {
        this.dispatchEvent(new PopupClosingResultRequestedEvent(closeReason, this.branchId));
    }
    async raiseClosingResultRequestedAsync(closeReason) {
        if (!this.hasServerSideClosing) {
            this.raiseClosingRequested(closeReason);
            return true;
        }
        const closingRequestedTcs = new TaskCompletionSource();
        this.closingResultRequestedTcs = closingRequestedTcs;
        this.raiseClosingResultRequested(closeReason);
        return closingRequestedTcs.promise;
    }
    calcRestrictedBestTranslation(intersection, childBounds, placementTargetInterestPoints, screenBounds, targetBounds, initialPosition) {
        const bestTranslation = this.fitToRestriction ? this.calcRestrictedFitBestTranslation(intersection, childBounds, placementTargetInterestPoints, screenBounds, initialPosition) : initialPosition;
        const shouldHide = this.closeMode === CloseMode.None ? false : this.calcRestrictedShouldHide(screenBounds, targetBounds);
        return [bestTranslation, shouldHide];
    }
    calcRestrictedShouldHide(restrictBounds, targetBounds) {
        if (!this.placementTargetElement)
            return !DxPopup_1.checkTargetEdgesWithin(restrictBounds, targetBounds);
        let visibleRestrictBounds = restrictBounds;
        // eslint-disable-next-line no-restricted-syntax
        const clippingParents = LayoutHelper.getClippingParents(this.placementTargetElement);
        clippingParents.forEach(x => {
            const bounds = LayoutHelper.getRelativeElementRect(x);
            visibleRestrictBounds = RectHelper.intersect(visibleRestrictBounds, bounds);
        });
        if (visibleRestrictBounds.isEmpty)
            return true;
        return !DxPopup_1.checkTargetEdgesWithin(visibleRestrictBounds, targetBounds);
    }
    static checkTargetEdgesWithin(restrictBounds, targetBounds) {
        return RectHelper.contains(restrictBounds, targetBounds.topLeft) || RectHelper.contains(restrictBounds, targetBounds.topRight) || RectHelper.contains(restrictBounds, targetBounds.bottomLeft) || RectHelper.contains(restrictBounds, targetBounds.bottomRight);
    }
    calcRestrictedFitBestTranslation(intersection, childBounds, placementTargetInterestPoints, restrictBounds, bestTranslation) {
        if (Math.abs(intersection.width - childBounds.width) > this.tolerance || Math.abs(intersection.height - childBounds.height) > this.tolerance) {
            const topLeft = placementTargetInterestPoints[InterestPoint.TopLeft];
            const topRight = placementTargetInterestPoints[InterestPoint.TopRight];
            const delta = PointHelper.sub(topRight, topLeft);
            const horizontalAxis = VectorHelper.normalize(new Vector(delta.x, delta.y));
            if (Number.isNaN(horizontalAxis.y) || Math.abs(horizontalAxis.y) < this.tolerance) {
                if (childBounds.right > restrictBounds.right)
                    bestTranslation = new Vector(restrictBounds.right - childBounds.width, bestTranslation.y);
                else if (childBounds.left < restrictBounds.left)
                    bestTranslation = new Vector(restrictBounds.left, bestTranslation.y);
            }
            else if (Math.abs(horizontalAxis.x) < this.tolerance) {
                if (childBounds.bottom > restrictBounds.bottom)
                    bestTranslation = new Vector(bestTranslation.x, restrictBounds.bottom - childBounds.bottom);
                else if (childBounds.top < restrictBounds.top)
                    bestTranslation = new Vector(bestTranslation.x, restrictBounds.top);
            }
            const bottomLeft = placementTargetInterestPoints[InterestPoint.BottomLeft];
            const deltaY = PointHelper.sub(topLeft, bottomLeft);
            const verticalAxis = VectorHelper.normalize(deltaY);
            if (Number.isNaN(verticalAxis.x) || Math.abs(verticalAxis.x) < this.tolerance) {
                if (childBounds.bottom > restrictBounds.bottom)
                    bestTranslation = new Vector(bestTranslation.x, restrictBounds.bottom - childBounds.height);
                else if (childBounds.top < restrictBounds.top)
                    bestTranslation = new Vector(bestTranslation.x, restrictBounds.top);
            }
            else if (Math.abs(verticalAxis.y) < this.tolerance) {
                if (childBounds.right > restrictBounds.right)
                    bestTranslation = new Vector(restrictBounds.right - childBounds.width, bestTranslation.y);
                else if (childBounds.left < restrictBounds.left)
                    bestTranslation = new Vector(restrictBounds.x, bestTranslation.y);
            }
        }
        return bestTranslation;
    }
    processCapture(closeOnOutsideClick) {
    }
    processBestTranslationResults(bestTranslation, childSize, targetBounds, screenBounds, bestDropOpposite, bestDropDirection, bestDropAlignment, bestAxis, bestCustomPlacement) {
    }
};
__decorate([
    n({ type: Boolean, attribute: "close-on-outside-click" })
], DxPopup.prototype, "closeOnOutsideClick", void 0);
__decorate([
    n({ type: Boolean, attribute: "close-on-pointer-up" })
], DxPopup.prototype, "closeOnPointerUp", void 0);
__decorate([
    n({ type: Boolean, attribute: "prevent-close-on-position-target-click" })
], DxPopup.prototype, "preventCloseOnPositionTargetClick", void 0);
__decorate([
    n({ type: String, attribute: "close-mode" })
], DxPopup.prototype, "closeMode", void 0);
__decorate([
    n({ type: Boolean, attribute: "fit-to-restriction" })
], DxPopup.prototype, "fitToRestriction", void 0);
__decorate([
    n({ type: Boolean, attribute: "prevent-interactions" })
], DxPopup.prototype, "preventInteractions", void 0);
__decorate([
    n({ type: Boolean, attribute: "has-serverside-closing" })
], DxPopup.prototype, "hasServerSideClosing", void 0);
__decorate([
    n({ type: String, attribute: "branch-id" })
], DxPopup.prototype, "branchId", void 0);
__decorate([
    n({ type: String, attribute: "parent-branch-id" })
], DxPopup.prototype, "parentBranchId", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxPopup.prototype, "rootCssStyle", void 0);
__decorate([
    n({ type: String, attribute: "placement" })
], DxPopup.prototype, "placement", void 0);
__decorate([
    n({ type: Number, attribute: "horizontal-offset" })
], DxPopup.prototype, "horizontalOffset", void 0);
__decorate([
    n({ type: Number, attribute: "vertical-offset" })
], DxPopup.prototype, "verticalOffset", void 0);
__decorate([
    n({ type: String, attribute: "placement-target" })
], DxPopup.prototype, "placementTarget", void 0);
__decorate([
    n({ type: String, attribute: "restrict-target" })
], DxPopup.prototype, "restrictTarget", void 0);
__decorate([
    n({ type: String, attribute: "restrict" })
], DxPopup.prototype, "restrict", void 0);
__decorate([
    n({ type: String, attribute: "width" })
], DxPopup.prototype, "width", void 0);
__decorate([
    n({ type: String, attribute: "max-width" })
], DxPopup.prototype, "maxWidth", void 0);
__decorate([
    n({ type: String, attribute: "min-width" })
], DxPopup.prototype, "minWidth", void 0);
__decorate([
    n({ type: String, attribute: "height" })
], DxPopup.prototype, "height", void 0);
__decorate([
    n({ type: String, attribute: "max-height" })
], DxPopup.prototype, "maxHeight", void 0);
__decorate([
    n({ type: String, attribute: "min-height" })
], DxPopup.prototype, "minHeight", void 0);
__decorate([
    n({ type: String, attribute: "desired-width" })
], DxPopup.prototype, "desiredWidth", void 0);
__decorate([
    n({ type: String, attribute: "desired-height" })
], DxPopup.prototype, "desiredHeight", void 0);
__decorate([
    n({ type: String, attribute: "min-desired-width" })
], DxPopup.prototype, "minDesiredWidth", void 0);
__decorate([
    n({ type: String, attribute: "min-desired-height" })
], DxPopup.prototype, "minDesiredHeight", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxPopup.prototype, "renderWidth", void 0);
__decorate([
    n({ type: String, reflect: false })
], DxPopup.prototype, "renderHeight", void 0);
__decorate([
    n({
        type: String, attribute: "restrict-rect", converter: (attr) => {
            if (attr)
                return RectHelper.parse(attr);
            return Rect.Empty;
        }
    })
], DxPopup.prototype, "restrictRectangle", void 0);
__decorate([
    n({
        type: String, attribute: "placement-rect", converter: (attr) => {
            if (attr)
                return RectHelper.parse(attr);
            return Rect.Empty;
        }
    })
], DxPopup.prototype, "placementRectangle", void 0);
__decorate([
    n({ type: String, attribute: "x-drop-direction", reflect: true })
], DxPopup.prototype, "actualDropDirection", void 0);
__decorate([
    n({ type: String, attribute: "x-drop-alignment", reflect: true })
], DxPopup.prototype, "actualDropAlignment", void 0);
__decorate([
    n({ type: String, attribute: "x-drop-opposite", reflect: true, converter: {
            toAttribute: (value, type) => {
                return value ? "true" : "false";
            }
        }
    })
], DxPopup.prototype, "actualDropOpposite", void 0);
__decorate([
    n({ type: Boolean, attribute: "x-is-open", reflect: true, converter: {
            fromAttribute: (value, type) => {
                throw new Error("readonly");
            }
        } })
], DxPopup.prototype, "_isOpen", void 0);
__decorate([
    n({ type: Boolean, reflect: false })
], DxPopup.prototype, "animationEnabled", void 0);
__decorate([
    n({ type: Boolean, attribute: "resizing" })
], DxPopup.prototype, "resizing", void 0);
__decorate([
    n({ type: Boolean, attribute: "focus-loop" })
], DxPopup.prototype, "focusLoop", void 0);
__decorate([
    n({ type: Number, attribute: "z-index" })
], DxPopup.prototype, "zIndex", void 0);
DxPopup = DxPopup_1 = __decorate([
    e(dxPopupTagName)
], DxPopup);
function init() {
}
function getReference(reference) {
    if (!reference)
        throw new Error("failed");
    return reference;
}
const popup = { init, getReference, dxPopupTagName, DxPopup };

const popup$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    dxPopupTagName,
    PopupClosingRequestedEvent,
    PopupClosingResultRequestedEvent,
    get CloseMode () { return CloseMode; },
    get InterestPoint () { return InterestPoint; },
    get PlacementMode () { return PlacementMode; },
    get DropDirection () { return DropDirection; },
    get DropAlignment () { return DropAlignment; },
    get PopupPrimaryAxis () { return PopupPrimaryAxis; },
    CustomPopupPlacement,
    CustomPlacementEvent,
    PopupContext,
    PopupShownEvent,
    PopupClosedEvent,
    ZIndexDeltaChangeContext,
    PopupZIndexDeltaChangeEvent,
    PopupAdjustZIndexRequestContext,
    PopupAdjustZIndexRequestEvent,
    PopupVisibleChangedEvent,
    PopupKeyboardStrategyActivateEvent,
    PopupFocusLoopContext,
    PopupFocusLoopEvent,
    PopupKeyboardStrategyCreatingEvent,
    get DxPopup () { return DxPopup; },
    init,
    getReference,
    default: popup
});

export { PortalAccessor as A, BranchType as B, CustomPopupPlacement as C, DxPopup as D, DxModal as E, FlyoutArrowAlignment as F, PopupCloseReason as G, visibleBranchTreeSingleton as H, InterestPoint as I, dxFlyoutDialogTagName as J, dxFlyoutArrowTagName as K, measureAsync as L, ModalDialogKeyboardStrategy as M, modal$1 as N, popuproot as O, PopupZIndexDeltaChangeEvent as P, popup$1 as Q, Signal as S, TaskCompletionSource as T, Vector as V, ZIndexDeltaChangeContext as Z, DropDirection as a, DropAlignment as b, calculateSizeStyleAttributeToPx as c, DropDownKeyboardStrategy as d, PlacementMode as e, PopupPrimaryAxis as f, DxFlyoutDialog as g, FlyoutKeyboardStrategy as h, DxPopupDraggableDialog as i, CloseMode as j, addLayoutChangeHandlers as k, PopupKeyboardStrategyActivateEvent as l, PopupWindowKeyboardStrategy as m, dxDropDownDialogTagName as n, ItemListDropDownKeyboardStrategy as o, popupResizableContainerTagName as p, PopupKeyboardStrategy as q, PopupKeyboardStrategyCreatingEvent as r, mutateAsync as s, PopupShownEvent as t, PopupClosedEvent as u, PopupClosingResultRequestedEvent as v, PopupClosingRequestedEvent as w, DxModalDialog as x, dxModalTagName as y, dxModalDialogTagName as z };
//# sourceMappingURL=popup-24.2.js.map
