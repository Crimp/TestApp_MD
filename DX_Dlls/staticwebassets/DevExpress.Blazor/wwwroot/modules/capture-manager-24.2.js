import { E as EventHelper } from './eventhelper-24.2.js';
import { F as FocusHelper } from './focushelper-24.2.js';
import { b as dxPopupRootTagName } from './constants-24.22.js';

class Locker {
    constructor() {
        this.lockCount = 0;
    }
    get IsLocked() {
        return this.lockCount > 0;
    }
    lock() {
        this.lockCount += 1;
    }
    unlock() {
        if (!this.IsLocked)
            return;
        this.lockCount -= 1;
    }
    reset() {
        this.lockCount = 0;
    }
    lockOnce() {
        if (!this.IsLocked)
            this.lock();
    }
    doLockedAction(action) {
        this.lock();
        try {
            action();
        }
        finally {
            this.unlock();
        }
    }
    async doLockedAsyncAction(asyncAction) {
        this.lock();
        try {
            await asyncAction();
        }
        finally {
            this.unlock();
        }
    }
    doIfNotLocked(action) {
        if (!this.IsLocked)
            action();
    }
    doLockedActionIfNotLocked(action) {
        this.doIfNotLocked(() => this.doLockedAction(action));
    }
    async doLockedAsyncActionIfNotLocked(asyncAction) {
        this.doIfNotLocked(async () => await this.doLockedAsyncAction(asyncAction));
    }
}

class CaptureTree {
    constructor() {
        this.root = new CapturedNode(null, false);
    }
    get hasCapture() {
        return this.root.hasChildren;
    }
    get captured() {
        var _a, _b;
        return (_b = (_a = this.root.searchCaptured()) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null;
    }
    get count() {
        return this.root.count();
    }
    add(element) {
        var _a;
        const capturedElement = this.root.searchCaptured();
        if (capturedElement && capturedElement.element !== element) {
            capturedElement.captured = false;
            (_a = capturedElement.element) === null || _a === void 0 ? void 0 : _a.lostCapture();
        }
        const isAdded = this.root.tryAdd(new CapturedNode(element, true));
        if (isAdded)
            element.gotCapture();
    }
    remove(element) {
        const isRemoved = this.root.tryRemove(new CapturedNode(element, false));
        if (isRemoved)
            element.lostCapture();
    }
    isChild(elementBranchId, childBranchId) {
        const node = this.root.search(elementBranchId);
        return node !== null && node.search(childBranchId) !== null;
    }
    nextCapture(element) {
        var _a, _b;
        if (this.captured !== null)
            return;
        if (element.parentBranchId) {
            const parent = this.root.search(element.parentBranchId);
            if (parent) {
                const sibling = parent.getNextChild(element);
                if (sibling) {
                    sibling.captured = true;
                    (_a = sibling.element) === null || _a === void 0 ? void 0 : _a.gotCapture();
                }
                else {
                    parent.captured = true;
                    (_b = parent.element) === null || _b === void 0 ? void 0 : _b.gotCapture();
                }
            }
        }
        else {
            const nextElement = this.root.getNextChild(element);
            if (nextElement)
                nextElement.captured = true;
        }
    }
}
class CapturedNode {
    constructor(element, captured) {
        this.element = element;
        this.captured = captured;
        this.children = [];
    }
    get isRoot() {
        return this.element === null;
    }
    get hasChildren() {
        return this.children.length > 0;
    }
    get branchId() {
        var _a, _b;
        return (_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.branchId) !== null && _b !== void 0 ? _b : "";
    }
    get parentBranchId() {
        var _a, _b;
        return (_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.parentBranchId) !== null && _b !== void 0 ? _b : null;
    }
    tryAdd(node) {
        if (!node.parentBranchId && this.isRoot || node.parentBranchId === this.branchId) {
            const addedNode = this.children.find(x => x.branchId === node.branchId);
            if (addedNode)
                addedNode.captured = true;
            else
                this.children.push(node);
            return true;
        }
        else {
            for (const child of this.children) {
                const result = child.tryAdd(node);
                if (result)
                    return true;
            }
        }
        return false;
    }
    tryRemove(node) {
        const nodeToDelete = this.children.find(x => x.branchId === node.branchId);
        if (nodeToDelete) {
            const index = this.children.indexOf(nodeToDelete);
            this.children.splice(index, 1);
            if (nodeToDelete.captured) {
                if (nodeToDelete.parentBranchId != null)
                    this.captured = true;
                else if (this.children.length > 0) {
                    const lastChild = this.children[this.children.length - 1];
                    lastChild.captured = true;
                }
            }
            return true;
        }
        else {
            for (const child of this.children) {
                const result = child.tryRemove(node);
                if (result)
                    return true;
            }
        }
        return false;
    }
    count() {
        let count = 0;
        if (this.children.length > 0) {
            for (const child of this.children)
                count += child.count();
        }
        if (!this.isRoot)
            count += 1;
        return count;
    }
    search(branchId) {
        if (this.branchId === branchId)
            return this;
        for (let i = 0; i < this.children.length; i++) {
            const found = this.children[i].search(branchId);
            if (found)
                return found;
        }
        return null;
    }
    searchCaptured() {
        if (this.captured)
            return this;
        for (let i = 0; i < this.children.length; i++) {
            const found = this.children[i].searchCaptured();
            if (found)
                return found;
        }
        return null;
    }
    getNextChild(element) {
        if (this.children.length === 0)
            return null;
        for (let i = this.children.length - 1; i >= 0; i--) {
            const child = this.children[i];
            if (child.element !== element)
                return child;
        }
        return null;
    }
}

class CaptureInteractionPreventEndedEvent extends CustomEvent {
    constructor() {
        super(CaptureInteractionPreventEndedEvent.eventName);
    }
}
CaptureInteractionPreventEndedEvent.eventName = "capture-interaction-prevent-ended";
class CaptureInteractionPreventTarget extends EventTarget {
    constructor() {
        super(...arguments);
        this.preventNextPointerInteraction = false;
    }
    reset() {
        this.preventNextPointerInteraction = false;
        this.dispatchEvent(new CaptureInteractionPreventEndedEvent());
    }
    get isPreventing() {
        return this.preventNextPointerInteraction;
    }
    prevent() {
        this.preventNextPointerInteraction = true;
    }
}
class CaptureProcessor {
    constructor() {
        this._globalLocker = new Locker();
        this.preventNextPointerInteraction = new CaptureInteractionPreventTarget();
    }
    get isInteractionPreventing() {
        return this.preventNextPointerInteraction.isPreventing;
    }
    subscribeInteractionPreventEnd(listener) {
        this.preventNextPointerInteraction.addEventListener(CaptureInteractionPreventEndedEvent.eventName, listener);
    }
    unsubscribeInteractionPreventEnd(listener) {
        this.preventNextPointerInteraction.removeEventListener(CaptureInteractionPreventEndedEvent.eventName, listener);
    }
    async processCapturedElementPointer(capturedElement, execute) {
        const locker = this.getCapturedInteractionLocker(capturedElement);
        const options = new CaptureInteractionOptions();
        await locker.doLockedAsyncActionIfNotLocked(async () => {
            this.preventNextPointerInteraction.reset();
            this.capturedProcessPromise = execute(options);
            await this.capturedProcessPromise;
            this.capturedProcessPromise = undefined;
        });
        if (options.handled && options.nextInteractionHandled)
            this.preventNextPointerInteraction.prevent();
    }
    async processCapturedElementKeyboard(capturedElement, execute) {
        const locker = this.getCapturedInteractionLocker(capturedElement);
        await locker.doLockedAsyncActionIfNotLocked(async () => {
            const options = new CaptureInteractionOptions();
            await execute(options);
        });
    }
    checkInteractionsPreventing(capturedElement, event, doIfNotPrevent, endPreventing = false) {
        const locker = this.getCapturedInteractionLocker(capturedElement);
        const isEventPrevented = this.preventEventIfLocked(locker, event);
        locker.doIfNotLocked(() => {
            if (!this.preventNextPointerInteraction.isPreventing)
                return;
            if (endPreventing)
                this.preventNextPointerInteraction.reset();
            doIfNotPrevent();
        });
        return isEventPrevented || this.preventNextPointerInteraction.isPreventing;
    }
    async waitForCaptureProcessing() {
        if (this.capturedProcessPromise)
            await this.capturedProcessPromise;
    }
    endInteractionIfNotLocked(capturedElement) {
        const locker = this.getCapturedInteractionLocker(capturedElement);
        locker.doIfNotLocked(() => this.preventNextPointerInteraction.reset());
    }
    getCapturedInteractionLocker(capturedElement) {
        return capturedElement ? capturedElement.locker : this._globalLocker;
    }
    preventEventIfLocked(locker, event) {
        if (locker.IsLocked) {
            EventHelper.markHandled(event, false);
            return true;
        }
        return false;
    }
}

class CaptureInteractionOptions {
    constructor() {
        this.nextInteractionHandled = false;
        this.handled = false;
    }
}
class CaptureManager {
    constructor() {
        this.captureTree = new CaptureTree();
        this.captureProcessor = new CaptureProcessor();
        this.restoreFocusOnPreventNextPointerInteractionElement = null;
        this.capturedInPointerUp = false;
        this.capturedInPointerDown = false;
        this.pointerDownHandler = this.handlePointerDown.bind(this);
        this.pointerUpHandler = this.handlePointerUp.bind(this);
        this.clickHandler = this.handleClick.bind(this);
        this.keyDownHandler = this.handleKeyDown.bind(this);
        this.disposeCheckHandler = this.checkDispose.bind(this);
    }
    get hasCapture() {
        return this.captureTree.hasCapture;
    }
    get lastCaptured() {
        return this.captureTree.captured;
    }
    get captureStackCount() {
        return this.captureTree.count;
    }
    checkInitialize() {
        if (this.hasCapture)
            return;
        this.initialize();
    }
    checkDispose() {
        if (this.hasCapture || this.captureProcessor.isInteractionPreventing)
            return;
        this.dispose();
    }
    capture(element) {
        this.checkInitialize();
        this.captureTree.add(element);
    }
    releaseCapture(element) {
        this.captureTree.remove(element);
        this.captureTree.nextCapture(element);
        this.checkDispose();
    }
    initialize() {
        document.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
        document.addEventListener("pointerup", this.pointerUpHandler, { capture: true });
        document.addEventListener("click", this.clickHandler, { capture: true });
        document.addEventListener("keydown", this.keyDownHandler, { capture: true });
        this.captureProcessor.subscribeInteractionPreventEnd(this.disposeCheckHandler);
    }
    dispose() {
        document.removeEventListener("pointerdown", this.pointerDownHandler, { capture: true });
        document.removeEventListener("pointerup", this.pointerUpHandler, { capture: true });
        document.removeEventListener("click", this.clickHandler, { capture: true });
        document.removeEventListener("keydown", this.keyDownHandler, { capture: true });
        this.captureProcessor.unsubscribeInteractionPreventEnd(this.disposeCheckHandler);
    }
    async handlePointerDown(event) {
        const capturedElement = this.captureTree.captured;
        if (!capturedElement)
            return;
        this.captureProcessor.endInteractionIfNotLocked(capturedElement);
        this.capturedInPointerDown = capturedElement.isPointedCaptured(event);
        if (this.capturedInPointerDown || capturedElement.isCloseOnPointerUp)
            return;
        const execute = (options) => capturedElement.processCapturedPointerAsync(event, options);
        await this.captureProcessor.processCapturedElementPointer(capturedElement, execute);
    }
    async handlePointerUp(event) {
        const capturedElement = this.captureTree.captured;
        this.capturedInPointerUp = (capturedElement === null || capturedElement === void 0 ? void 0 : capturedElement.isPointedCaptured(event)) || true;
        if (!capturedElement || (this.capturedInPointerUp && this.capturedInPointerDown) || !capturedElement.isCloseOnPointerUp)
            return;
        const execute = (options) => capturedElement.processCapturedPointerAsync(event, options);
        await this.captureProcessor.processCapturedElementPointer(capturedElement, execute);
    }
    async handleClick(event) {
        await this.captureProcessor.waitForCaptureProcessing();
        const capturedElement = this.captureTree.captured;
        const doIfNotPrevent = () => {
            EventHelper.markHandled(event, false);
            if (this.restoreFocusOnPreventNextPointerInteractionElement && FocusHelper.isFocused(this.restoreFocusOnPreventNextPointerInteractionElement))
                return;
            FocusHelper.unfocus();
        };
        this.captureProcessor.checkInteractionsPreventing(capturedElement, event, doIfNotPrevent, true);
    }
    async handleKeyDown(event) {
        const capturedElement = this.captureTree.captured;
        if (!capturedElement)
            return;
        const execute = (options) => capturedElement.processCapturedKeyDownAsync(event, options);
        await this.captureProcessor.processCapturedElementKeyboard(capturedElement, execute);
    }
}
function getCaptureManagerSingletonForTests() {
    const popupRoot = document.querySelector(dxPopupRootTagName);
    if (!popupRoot)
        throw new Error("Error when trying to get CaptureManager in DxPopupRoot");
    return popupRoot.captureManager;
}
const captureManager = {
    LightCaptureManager: CaptureManager,
    getCaptureManagerSingletonForTests
};

const captureManager$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CaptureInteractionOptions,
    CaptureManager,
    getCaptureManagerSingletonForTests,
    default: captureManager
});

export { CaptureManager as C, Locker as L, captureManager$1 as c };
//# sourceMappingURL=capture-manager-24.2.js.map
