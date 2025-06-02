import { k as key } from './key-24.2.js';
import { removeFocusHiddenAttribute, addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { T as TaskCompletionSource, q as PopupKeyboardStrategy, r as PopupKeyboardStrategyCreatingEvent, s as mutateAsync } from './popup-24.2.js';
import { L as LeaveDirection, K as KeyboardNavigationStrategy } from './keyboard-navigation-strategy-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { b as isILogicalOwner, d as isILogicalChildBase } from './logicaltreehelper-24.2.js';
import { M as MenuCssClasses } from './constants-24.24.js';
import { B as ButtonCssClasses } from './constants-24.25.js';
import { F as FocusableElementsSelector } from './constants-24.2.js';

class Holder {
    constructor() {
        this._objCaptured = new TaskCompletionSource();
        this._objReleased = new TaskCompletionSource();
        this._obj = null;
    }
    get subject() {
        return this._obj;
    }
    capture(obj) {
        if (obj === null || obj === undefined)
            throw new Error(`Value cannot be ${obj}`);
        if (this._obj !== null)
            this._objReleased.tryReject(`The object ${this._obj} was not released.`);
        this._objReleased = new TaskCompletionSource();
        this._obj = obj;
        this._objCaptured.tryResolve(obj);
    }
    release() {
        const obj = this._obj;
        this._obj = null;
        if (obj)
            this._objReleased.tryResolve(obj);
        this._objCaptured = new TaskCompletionSource();
    }
    waitCapture() {
        return this._objCaptured.promise;
    }
    waitRelease() {
        return this._objReleased.promise;
    }
}
class MenuLevelController {
    constructor() {
        this._selectedItemIndices = [];
        this._initialSelectedItem = null;
        this._initNewState = false;
        this._selectedItemIndex = 0;
    }
    get currentLevel() {
        return this._selectedItemIndices.length;
    }
    get selectedItemIndex() {
        return this._selectedItemIndex;
    }
    updateState(selectedItemIndex, itemCount) {
        var _a;
        if (this._initNewState) {
            this._selectedItemIndices.push(selectedItemIndex);
            if (this._initialSelectedItem === MenuItem.Last)
                this._selectedItemIndex = itemCount - 1;
            else
                this._selectedItemIndex = 0;
        }
        else
            this._selectedItemIndex = (_a = this._selectedItemIndices.pop()) !== null && _a !== void 0 ? _a : selectedItemIndex;
    }
    moveToNextLevel(selectedMenuItem) {
        this._initNewState = true;
        this._initialSelectedItem = selectedMenuItem;
    }
    moveToPrevLevel() {
        this._initNewState = false;
    }
    clearState() {
        this._selectedItemIndices = [];
        this._selectedItemIndex = 0;
        this._initNewState = false;
        this._initialSelectedItem = MenuItem.First;
    }
}
class Semaphore {
    constructor() {
        this.allowCount = 0;
    }
    get Allowed() {
        return this.allowCount > 0;
    }
    allow() {
        this.allowCount++;
    }
    disallow() {
        if (this.Allowed)
            this.allowCount--;
    }
    reset() {
        this.allowCount = 0;
    }
    doAllowedAction(action) {
        this.allow();
        try {
            action();
        }
        finally {
            this.disallow();
        }
    }
    doAllowedFunc(func) {
        this.allow();
        try {
            return func();
        }
        finally {
            this.disallow();
        }
    }
    doIfAllowed(action) {
        if (this.Allowed)
            action();
    }
}
function hasPopup(item) {
    return item && "hasPopup" in item.dataset;
}
function isExpanded(item) {
    return !!item && "expanded" in item.dataset;
}
function hasClass(element, cssClass) {
    return element.classList.contains(cssClass);
}
function containsFocus(element) {
    return element.isConnected && element.matches(":scope:focus-within");
}

var DropDownAction;
(function (DropDownAction) {
    DropDownAction[DropDownAction["Expand"] = 0] = "Expand";
    DropDownAction[DropDownAction["Collapse"] = 1] = "Collapse";
    DropDownAction[DropDownAction["Execute"] = 2] = "Execute";
})(DropDownAction || (DropDownAction = {}));
class DropDownActionRequestEvent extends CustomEvent {
    constructor(action) {
        super(DropDownActionRequestEvent.eventName, {
            detail: { action },
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
DropDownActionRequestEvent.eventName = "dxbl-dropdown.action-request";
CustomEventsHelper.register(DropDownActionRequestEvent.eventName, x => {
    return x.detail;
});

var MenuItem;
(function (MenuItem) {
    MenuItem[MenuItem["First"] = 0] = "First";
    MenuItem[MenuItem["Last"] = 1] = "Last";
})(MenuItem || (MenuItem = {}));
class PopupMenuKeyboardStrategyBase extends PopupKeyboardStrategy {
    canSwitchToNestedContentMode() {
        return true;
    }
    isImmediatelyClickEnabled() {
        return false;
    }
    // TODO: dublicated code
    updateSelectedItemByIndex(index) {
        if (index < 0)
            index = Math.min(this.selectedItemIndex, this.itemCount - 1);
        super.updateSelectedItemByIndex(index);
    }
    // TODO: dublicated code
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab && !this.nestedContentSelected)
            return false;
        if (super.handleKeyDown(evt))
            return true;
        if (!this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        return false;
    }
    focusFirstItem() {
        this.focusItem(0);
    }
    focusLastItem() {
        this.focusItem(this.itemCount - 1);
    }
    focusItem(itemIndex) {
        removeFocusHiddenAttribute(this.targetElement);
        this.updateSelectedItemByIndex(itemIndex);
        if (!this.selectedItemElement.hasAttribute("data-is-templated-item"))
            this.focusSelectedItem();
        else
            this.switchToNestedContent();
    }
    doClick(target, evt) {
        this.raiseClickEvent(target, evt.ctrlKey, evt.metaKey, evt.shiftKey);
    }
    onPopupShown() {
        addFocusHiddenAttribute(this.targetElement);
        super.onPopupShown();
    }
}
class PopupMenuKeyboardStrategy extends PopupMenuKeyboardStrategyBase {
    constructor(navigator, targetElement, isTransitContainer = false) {
        super(navigator, targetElement, isTransitContainer);
        this._subMenuHolder = new Holder();
        this.boundOnPopupKeyboardStrategyCreating = this.onPopupKeyboardStrategyCreating.bind(this);
        this._shouldRestoreFocus = false;
        this.subscribeToEvents();
    }
    get subMenuStrategy() {
        return this._subMenuHolder.subject;
    }
    canSwitchToNestedContentMode() {
        return !this.subMenuStrategy;
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
                if (!evt.ctrlKey && !evt.shiftKey && !evt.altKey) {
                    this.moveToNextItem(true);
                    return true;
                }
                return false;
            case key.KeyCode.Up:
                if (!evt.ctrlKey && !evt.shiftKey && !evt.altKey) {
                    this.moveToPrevItem(true);
                    return true;
                }
                return false;
            case key.KeyCode.Home:
                this.selectItem(0);
                return true;
            case key.KeyCode.End:
                this.selectItem(this.itemCount - 1);
                return true;
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                if (this.selectedItemElement !== this.targetElement || !this.switchToNestedContent())
                    this.doAction(evt);
                return true;
            case key.KeyCode.Right:
                return this.handleRightKey(evt);
            case key.KeyCode.Left:
                return this.handleLeftKey(evt);
            default:
                return false;
        }
    }
    handleRightKey(_evt) {
        if (hasPopup(this.selectedItemElement) && !isExpanded(this.selectedItemElement)) {
            this.openSubMenu(MenuItem.First);
            return true;
        }
        return false;
    }
    handleLeftKey(_evt) {
        return this.closeSelf();
    }
    onSubMenuClosed(strategy) {
        if (this._subMenuHolder.subject === strategy)
            this._subMenuHolder.release();
        if (this.navigator.leaveDirection === LeaveDirection.None && this._shouldRestoreFocus)
            this.restoreFocus();
        this._shouldRestoreFocus = false;
    }
    restoreFocus() {
        this.focusSelectedItem();
    }
    onSubMenuShown(strategy) {
        this._subMenuHolder.capture(strategy);
        this._shouldRestoreFocus = this._shouldRestoreFocus || containsFocus(this.targetElement);
    }
    waitSubMenuShown() {
        return this._subMenuHolder.waitCapture();
    }
    waitSubMenuClosed() {
        return this._subMenuHolder.waitRelease();
    }
    requestSubMenuOpen() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Expand));
    }
    requestSubMenuClose() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
    }
    subscribeToEvents() {
        this.targetElement.addEventListener(PopupKeyboardStrategyCreatingEvent.eventName, this.boundOnPopupKeyboardStrategyCreating);
    }
    onPopupKeyboardStrategyCreating(evt) {
        evt.detail.factory = {
            createPopup: (navigator, targetElement) => this.createSubMenuStrategy(navigator, targetElement)
        };
    }
}

const MenuItemSelector = `.${MenuCssClasses.menuItem} > .dxbl-btn, .${MenuCssClasses.menuItem} > .dxbl-menu-item-tmpl`;
const MenuTitle = `.${MenuCssClasses.menuTitle}`;
const KeyboardNavigatorIsReadyAtribute = "data-keyboard-navigator-is-ready";
const TemplatedItemAttribute = "data-is-templated-item";
const SplitDropDownButtonClassName = "dxbl-btn-split-dropdown";
const SplitButtonSelector = `.${ButtonCssClasses.SplitButton}`;
class DxMenuKeyboardStrategy extends KeyboardNavigationStrategy {
    initialize() {
        super.initialize();
        mutateAsync(this.targetElement, e => e.setAttribute(KeyboardNavigatorIsReadyAtribute, ""));
    }
    updateSelectedItemByIndex(index) {
        if (index < 0)
            index = Math.min(this.selectedItemIndex, this.itemCount - 1);
        super.updateSelectedItemByIndex(index);
    }
    isImmediatelyClickEnabled() {
        return false;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (!this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        return false;
    }
    isTitle(element) {
        return element.classList.contains(MenuCssClasses.menuTitle);
    }
    needToAddTitle() {
        const title = this.targetElement.querySelector(MenuTitle);
        return title != null && title.querySelectorAll(FocusableElementsSelector).length > 0;
    }
    handleTabKeyDown(evt) {
        if (evt.shiftKey) {
            if (this.selectedItemIndex > 0 && this.isTitle(this.items[0]))
                this.selectItem(0);
            else
                this.leaveBackward();
        }
        else {
            if (this.isTitle(this.selectedItemElement))
                this.selectItem(this.selectedItemIndex + 1);
            else
                this.leaveForward();
        }
        return true;
    }
}
class DxDropDownMenuOwnerKeyboardStrategy extends DxMenuKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
        this.boundOnPopupKeyboardStrategyCreating = this.onPopupKeyboardStrategyCreating.bind(this);
        this._subMenuHolder = new Holder();
        this._shouldRestoreFocus = false;
        this.subscribeToEvents();
    }
    get shouldRestoreFocus() {
        return this._shouldRestoreFocus;
    }
    set shouldRestoreFocus(value) {
        this._shouldRestoreFocus = value;
    }
    hasMenu() {
        return hasPopup(this.selectedItemElement) || hasClass(this.selectedItemElement, SplitDropDownButtonClassName);
    }
    isMenuExpanded() {
        return isExpanded(this.selectedItemElement) ||
            (hasClass(this.selectedItemElement, SplitDropDownButtonClassName) && isExpanded(this.selectedItemElement.closest(SplitButtonSelector)));
    }
    subscribeToEvents() {
        this.targetElement.addEventListener(PopupKeyboardStrategyCreatingEvent.eventName, this.boundOnPopupKeyboardStrategyCreating);
    }
    onPopupKeyboardStrategyCreating(evt) {
        evt.detail.factory = {
            createPopup: (navigator, targetElement) => this.createPopupStrategy(navigator, targetElement),
            createModal: (navigator, targetElement) => this.createModalStrategy(navigator, targetElement)
        };
    }
    get subMenuStrategy() {
        return this._subMenuHolder.subject;
    }
    canSwitchToNestedContentMode() {
        return !this.subMenuStrategy;
    }
    onSubMenuShown(strategy) {
        this.tryAddLogicalChild(strategy.targetElement);
        this._subMenuHolder.capture(strategy);
        this.shouldRestoreFocus = this.shouldRestoreFocus || containsFocus(this.targetElement);
    }
    onSubMenuClosed(strategy) {
        if (this._subMenuHolder.subject === strategy)
            this._subMenuHolder.release();
        if (this.navigator.leaveDirection === LeaveDirection.None && this.shouldRestoreFocus)
            this.focusSelectedItem();
        this.shouldRestoreFocus = false;
        this.tryRemoveLogicalChild(strategy.targetElement);
    }
    closeSubMenu() { }
    tryAddLogicalChild(child) {
        if (isILogicalOwner(this.targetElement) && isILogicalChildBase(child)) {
            if (!child.logicalParent)
                this.targetElement.addLogicalChild(child);
        }
    }
    tryRemoveLogicalChild(child) {
        if (isILogicalOwner(this.targetElement) && isILogicalChildBase(child)) {
            if (child.logicalParent === this.targetElement)
                this.targetElement.removeLogicalChild(child);
        }
    }
    waitSubMenuShown() {
        return this._subMenuHolder.waitCapture();
    }
    waitSubMenuClosed() {
        return this._subMenuHolder.waitRelease();
    }
    async focusSubMenuItemAsync(item) {
        const strategy = await this.waitSubMenuShown();
        if (item === MenuItem.First)
            strategy.focusFirstItem();
        else
            strategy.focusLastItem();
    }
}

export { DxDropDownMenuOwnerKeyboardStrategy as D, KeyboardNavigatorIsReadyAtribute as K, MenuItem as M, PopupMenuKeyboardStrategy as P, Semaphore as S, TemplatedItemAttribute as T, MenuLevelController as a, hasPopup as b, containsFocus as c, DropDownActionRequestEvent as d, DropDownAction as e, MenuItemSelector as f, MenuTitle as g, hasClass as h, DxMenuKeyboardStrategy as i, PopupMenuKeyboardStrategyBase as j, isExpanded as k };
//# sourceMappingURL=menu-keyboard-strategy-24.2.js.map
