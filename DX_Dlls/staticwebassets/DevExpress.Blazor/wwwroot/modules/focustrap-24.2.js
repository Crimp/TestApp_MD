import { T as Tabbable } from './tabbable-24.2.js';
import { L as LogicalTreeHelper } from './logicaltreehelper-24.2.js';
import { F as FocusHelper } from './focushelper-24.2.js';

class PostponedAction {
    constructor(postponeAction) {
        this.action = null;
        this.postponeAction = postponeAction;
    }
    executePostpone(action) {
        this.action = null;
        if (this.postponeAction()) {
            action();
            return;
        }
        this.action = action;
    }
    execute() {
        if (this.action && this.postponeAction())
            this.executeForce();
    }
    executeForce() {
        if (this.action)
            this.action();
        this.clear();
    }
    clear() {
        this.action = null;
    }
}

const mutationObserveOptions = {
    subtree: true,
    childList: true,
    attributeFilter: ["disabled", "tabindex"]
};
class FocusTrapInfo {
    constructor(blockOutsideClick, blockOutsideNavigation, element, lastFocusedElement, NestedOnly) {
        this.BlockOutsideClick = false;
        this.BlockOutsideNavigation = false;
        this.NestedOnly = false;
        this.BlockOutsideClick = blockOutsideClick;
        this.BlockOutsideNavigation = blockOutsideNavigation;
        this.Element = element;
        this.LastFocusedElement = lastFocusedElement;
        this.NestedOnly = NestedOnly;
    }
}
class FocusTrap {
    constructor() {
        this.documentFocusInHandler = this.documentFocusIn.bind(this);
        this.documentKeyDownHandler = this.documentKeyDown.bind(this);
        this.firstInnerElementKeyDownHandler = this.firstInnerElementKeyDown.bind(this);
        this.lastInnerElementKeyDownHandler = this.lastInnerElementKeyDown.bind(this);
        this.handleFocusOutHandler = this.handleFocusOut.bind(this);
        this.documentKeyboardTrackerHandler = this.documentKeyboardTracker.bind(this);
        this.documentMouseTrackerHandler = this.documentMouseTracker.bind(this);
        this.tabbables = [];
        this.mutationObserver = new MutationObserver(this.handleMutations.bind(this));
        this.focusPostponedAction = new PostponedAction(() => { var _a, _b; return (_b = ((_a = this.tabbables) === null || _a === void 0 ? void 0 : _a.length) > 0) !== null && _b !== void 0 ? _b : false; });
        this.firstInnerElement = null;
        this.lastInnerElement = null;
        this._stack = [];
        this._lastInputFromPointer = false;
        document.addEventListener("keydown", this.documentKeyboardTrackerHandler, true);
        document.addEventListener("pointerdown", this.documentMouseTrackerHandler, true);
    }
    documentKeyboardTracker(evt) {
        this._lastInputFromPointer = false;
    }
    documentMouseTracker(evt) {
        this._lastInputFromPointer = true;
    }
    get isActivated() {
        return this._stack.length > 0;
    }
    get info() {
        return this.isActivated ? this._stack[this._stack.length - 1] : null;
    }
    get element() {
        var _a, _b;
        return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.Element) !== null && _b !== void 0 ? _b : null;
    }
    get blockOutsideClick() {
        var _a, _b;
        return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.BlockOutsideClick) !== null && _b !== void 0 ? _b : null;
    }
    get blockOutsideNavigation() {
        var _a, _b;
        return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.BlockOutsideNavigation) !== null && _b !== void 0 ? _b : null;
    }
    get lastFocusedElement() {
        var _a, _b;
        return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.LastFocusedElement) !== null && _b !== void 0 ? _b : null;
    }
    get nestedOnly() {
        var _a, _b;
        return (_b = (_a = this.info) === null || _a === void 0 ? void 0 : _a.NestedOnly) !== null && _b !== void 0 ? _b : null;
    }
    filterStack(element) {
        if (element)
            this._stack = this._stack.filter(item => item.Element !== element);
    }
    activate(element, blockOutsideNavigation, nestedOnly = false, blockOutsideClick = blockOutsideNavigation) {
        if (typeof element === "string")
            element = document.querySelector(element);
        if (element == null)
            throw "element is null";
        if (this.element)
            this.deactivateCore();
        const lastFocusedElement = document.activeElement;
        this.filterStack(element);
        this._stack.push(new FocusTrapInfo(blockOutsideClick, blockOutsideNavigation, element, lastFocusedElement, nestedOnly));
        this.activateCore();
    }
    activateCore() {
        if (!this.element)
            return;
        if (this.blockOutsideClick || this.blockOutsideNavigation)
            this.subscribe(this.element);
        this.tabbables = Tabbable.getTabbables(this.element, !this.nestedOnly);
        this.updateInnerElements();
        this.subscribeInnerElementsKeyDown();
        this.focusPostponedAction.executePostpone(this.forceFocusFirstElement.bind(this));
        this.mutationObserver.observe(this.element, mutationObserveOptions);
    }
    deactivate(element, restoreFocus) {
        var _a;
        if (!this.isActivated || !element)
            return;
        if (this.element !== element) {
            this.filterStack(element);
            return;
        }
        this.deactivateCore();
        const lastFocusedElement = (_a = this._stack.pop()) === null || _a === void 0 ? void 0 : _a.LastFocusedElement;
        if (restoreFocus && !LogicalTreeHelper.containsElement(element, document.activeElement) && lastFocusedElement)
            FocusHelper.restoreFocus(lastFocusedElement);
        if (this.element)
            this.activateCore();
    }
    deactivateCore() {
        if (!this.element)
            return;
        this.focusPostponedAction.clear();
        this.mutationObserver.disconnect();
        this.unsubscribeDocument();
        this.unsubscribe(this.element);
        this.unsubscribeInnerElementsKeyDown();
        clearTimeout(this.updateTabbablesTimerID);
    }
    forceFocusFirstElement() {
        const first = this.tabbables[0];
        if (!first)
            return;
        if (this.lastFocusedElement && this.element && LogicalTreeHelper.containsElement(this.element, document.activeElement))
            return;
        FocusHelper.restoreFocus(first);
    }
    handleMutations(records) {
        clearTimeout(this.updateTabbablesTimerID);
        this.updateTabbablesTimerID = setTimeout(this.updateSubscriptions.bind(this), 50);
    }
    updateSubscriptions() {
        this.tabbables = Tabbable.getTabbables(this.element, !this.nestedOnly);
        this.unsubscribeInnerElementsKeyDown();
        this.updateInnerElements();
        this.subscribeInnerElementsKeyDown();
        this.focusPostponedAction.execute();
    }
    subscribe(element) {
        this.element.addEventListener("focusout", this.handleFocusOutHandler, true);
    }
    unsubscribe(element) {
        this.element.removeEventListener("focusout", this.handleFocusOutHandler, true);
    }
    handleFocusOut(e) {
        if (this._lastInputFromPointer) {
            if (!this.blockOutsideClick)
                return;
        }
        else if (!this.blockOutsideNavigation)
            return;
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget) {
            this.subscribeDocument();
            return;
        }
        if (!this.element.contains(relatedTarget)) {
            this.focusPostponedAction.executePostpone(this.forceFocusFirstElement.bind(this));
            return;
        }
    }
    subscribeDocument() {
        document.addEventListener("focusin", this.documentFocusInHandler);
        document.addEventListener("keydown", this.documentKeyDownHandler);
    }
    unsubscribeDocument() {
        document.removeEventListener("keydown", this.documentKeyDownHandler);
        document.removeEventListener("focusin", this.documentFocusInHandler);
    }
    documentKeyDown(e) {
        var _a;
        const target = e.target;
        if (target && (this.element === target || ((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(target))))
            return;
        const requireReraise = this.element;
        if (!requireReraise)
            return;
        requireReraise.processKeyDown(e);
    }
    documentFocusIn(e) {
        const target = e.target;
        if (!target)
            return;
        this.unsubscribeDocument();
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget && !this.element.contains(target)) {
            this.focusPostponedAction.executePostpone(this.forceFocusFirstElement.bind(this));
            return;
        }
        if (relatedTarget && !this.element.contains(relatedTarget)) {
            this.focusPostponedAction.executePostpone(this.forceFocusFirstElement.bind(this));
            return;
        }
    }
    firstInnerElementKeyDown(e) {
        var _a;
        if (this.firstInnerElement === document.activeElement && e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            (_a = this.lastInnerElement) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: false });
        }
    }
    lastInnerElementKeyDown(e) {
        var _a;
        if (this.lastInnerElement === document.activeElement && e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            (_a = this.firstInnerElement) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: false });
        }
    }
    unsubscribeInnerElementsKeyDown() {
        var _a, _b;
        (_a = this.firstInnerElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("keydown", this.firstInnerElementKeyDownHandler);
        (_b = this.lastInnerElement) === null || _b === void 0 ? void 0 : _b.removeEventListener("keydown", this.lastInnerElementKeyDownHandler);
    }
    subscribeInnerElementsKeyDown() {
        var _a, _b;
        (_a = this.firstInnerElement) === null || _a === void 0 ? void 0 : _a.addEventListener("keydown", this.firstInnerElementKeyDownHandler);
        (_b = this.lastInnerElement) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", this.lastInnerElementKeyDownHandler);
    }
    updateInnerElements() {
        if (!this.tabbables)
            return;
        this.firstInnerElement = this.tabbables[0];
        this.lastInnerElement = this.tabbables[this.tabbables.length - 1];
    }
}
const focusTrapSingleton = new FocusTrap();

export { focusTrapSingleton as f };
//# sourceMappingURL=focustrap-24.2.js.map
