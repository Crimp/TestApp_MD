import { k as key } from './key-24.2.js';
import { h as hasClass, S as Semaphore, a as MenuLevelController, b as hasPopup, M as MenuItem } from './menu-keyboard-strategy-24.2.js';
import { K as KeyboardNavigationStrategy } from './keyboard-navigation-strategy-24.2.js';
import { M as ModalDialogKeyboardStrategy, S as Signal } from './popup-24.2.js';
import { D as DispatcherAction, F as FocusHelper } from './focushelper-24.2.js';
import { D as DxMenuDropDownRootMenuKeyboardStrategy } from './dropdown-menu-keyboard-strategy-24.2.js';
import { B as ButtonCssClasses } from './constants-24.25.js';

const ToolbarMenuItemSelectors = [
    ".dxbl-btn:not([disabled]):not(.dxbl-toolbar-hidden-item)",
    ".dxbl-btn-split:not(.dxbl-toolbar-hidden-item):has(.dxbl-btn:not([disabled]))"
];
const ToolbarMenuItemSelector = [
    ...ToolbarMenuItemSelectors.map(selector => `.dxbl-toolbar-dropdown-item > .dxbl-toolbar-menu-item > ${selector}`),
    ".dxbl-toolbar-dropdown-item.dxbl-toolbar-item-tmpl:not(.dxbl-toolbar-edit)",
    ".dxbl-toolbar-dropdown-item.dxbl-toolbar-item-tmpl.dxbl-toolbar-edit:has(.dxbl-text-edit:not(.dxbl-disabled))"
].join(",");
const DropDownItemSelector = ".dxbl-dropdown-item.dxbl-btn";
class DxToolbarDropDownRootMenuKeyboardStrategy extends DxMenuDropDownRootMenuKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy, menuItemSelector = ToolbarMenuItemSelector) {
        super(navigator, targetElement, menuItemSelector, parentStrategy);
    }
    switchToNestedContent() {
        if (this.isSplitButtonMenuItem(this.selectedItemElement))
            return false;
        return super.switchToNestedContent();
    }
    doAction(evt) {
        if (this.isSplitButtonMenuItem(this.selectedItemElement)) {
            const dropdownItem = this.selectedItemElement.querySelector(DropDownItemSelector);
            if (dropdownItem) {
                this.doClick(dropdownItem, evt);
                return;
            }
        }
        super.doAction(evt);
    }
    isSplitButtonMenuItem(menuItem) {
        return hasClass(menuItem, ButtonCssClasses.SplitButton);
    }
}

var WindowSection;
(function (WindowSection) {
    WindowSection[WindowSection["Header"] = 0] = "Header";
    WindowSection[WindowSection["Body"] = 1] = "Body";
})(WindowSection || (WindowSection = {}));
var WindowStatus;
(function (WindowStatus) {
    WindowStatus[WindowStatus["Shown"] = 0] = "Shown";
    WindowStatus[WindowStatus["Closed"] = 1] = "Closed";
})(WindowStatus || (WindowStatus = {}));
class DxToolbarModalRootKeyboardStrategy extends ModalDialogKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy, menuItemSelector) {
        super(navigator, targetElement);
        this._dispatcherAction = new DispatcherAction();
        this._activeSection = null;
        this._initialized = null;
        this._focusSemaphore = new Semaphore();
        this._parentStrategy = parentStrategy;
        this._sectionElementMap = {
            [WindowSection.Header]: null,
            [WindowSection.Body]: null,
        };
        this._modalStatusSignal = new Signal();
        this._menuItemSelector = menuItemSelector;
    }
    get headerElement() {
        return this._sectionElementMap[WindowSection.Header];
    }
    set headerElement(element) {
        this._sectionElementMap[WindowSection.Header] = element;
    }
    get bodyElement() {
        return this._sectionElementMap[WindowSection.Body];
    }
    set bodyElement(element) {
        this._sectionElementMap[WindowSection.Body] = element;
    }
    initialize() {
        this._initialized = this.initializeCore();
    }
    initializeCore() {
        super.initialize();
        if (!this.headerElement || !this.bodyElement)
            return this.shcheduleInitialization();
        return Promise.resolve();
    }
    shcheduleInitialization() {
        this._dispatcherAction.cancel();
        return new Promise(resolve => {
            this._dispatcherAction.execute(() => {
                super.initialize();
                resolve();
            });
        });
    }
    queryItems() {
        this.headerElement = this.targetElement.querySelector(".dxbl-modal-header");
        this.bodyElement = this.targetElement.querySelector(".dxbl-modal-body");
        return [this.headerElement, this.bodyElement];
    }
    async activate() {
        var _a;
        await this._initialized;
        FocusHelper.cancelRestoreFocus();
        const activeSection = (_a = this._activeSection) !== null && _a !== void 0 ? _a : WindowSection.Body;
        this.setActiveSection(activeSection);
    }
    createItemStrategy(itemElement) {
        if (itemElement === this.headerElement)
            return new DxToolbarModalHeaderKeyboardStrategy(this.navigator, this.headerElement);
        if (itemElement === this.bodyElement)
            return new DxToolbarModalBodyKeyboardStrategy(this.navigator, this.bodyElement, this._parentStrategy, this._focusSemaphore, this._modalStatusSignal, this._menuItemSelector);
        return null;
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab) {
            this.setActiveSection(this.toggleActiveSection());
            return true;
        }
        return super.handleKeyDown(evt);
    }
    toggleActiveSection() {
        return this._activeSection === WindowSection.Body ? WindowSection.Header : WindowSection.Body;
    }
    setActiveSection(section) {
        const activeSection = section !== null && section !== void 0 ? section : WindowSection.Body;
        const targetElement = this._sectionElementMap[activeSection];
        const strategy = this.navigator.getStrategy(targetElement);
        this._focusSemaphore.doAllowedAction(() => {
            strategy === null || strategy === void 0 ? void 0 : strategy.activate();
        });
        this._activeSection = activeSection;
    }
    onPopupShown() {
        super.onPopupShown();
        this._modalStatusSignal.raise(this.targetElement, WindowStatus.Shown);
    }
    onPopupClosed() {
        super.onPopupClosed();
        this._modalStatusSignal.raise(this.targetElement, WindowStatus.Closed);
    }
}
class DxToolbarModalHeaderKeyboardStrategy extends KeyboardNavigationStrategy {
    initialize() {
        super.initialize();
        this.selectedItemIndex = 0;
    }
    queryItems() {
        return this.queryItemsBySelector(".dxbl-btn").filter(el => el && !hasClass(el, "dxbl-invisible"));
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                this.raiseClickEvent(this.selectedItemElement, evt.ctrlKey, evt.metaKey, evt.shiftKey);
                return true;
            case key.KeyCode.Left:
                this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Right:
                this.moveToNextItem(true);
                return true;
            case key.KeyCode.Up:
            case key.KeyCode.Down:
                return true;
            default:
                return super.handleKeyDown(evt);
        }
    }
}
class DxToolbarModalBodyKeyboardStrategy extends DxToolbarDropDownRootMenuKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy, focusSemaphore, modalStatusSignal, menuItemSelector) {
        super(navigator, targetElement, parentStrategy, menuItemSelector);
        this._boundModalStatusChanged = this.modalStatusChanged.bind(this);
        this._levelController = new MenuLevelController();
        this._focusSemaphore = focusSemaphore;
        this._modalStatusSignal = modalStatusSignal;
        this._modalStatusSignal.subscribe(this._boundModalStatusChanged);
    }
    get menuLevel() {
        return this._levelController.currentLevel;
    }
    modalStatusChanged(_modal, status) {
        if (status === WindowStatus.Shown)
            this.onPopupShown();
        else
            this.onPopupClosed();
    }
    initialize() {
        super.initialize();
        this._levelController.updateState(this.selectedItemIndex, this.itemCount);
        this.selectedItemIndex = this._levelController.selectedItemIndex;
    }
    activate() {
        this._focusSemaphore.doIfAllowed(() => {
            super.activate();
        });
        this._focusSemaphore.disallow();
    }
    handleLeftKey(evt) {
        if (this.menuLevel > 0) {
            this.moveToPrevLevel(evt);
            return true;
        }
        else if (hasPopup(this.selectedItemElement)) {
            this.moveToNextLevel(evt, MenuItem.Last);
            return true;
        }
        return false;
    }
    handleRightKey(evt) {
        if (hasPopup(this.selectedItemElement)) {
            this.moveToNextLevel(evt, MenuItem.First);
            return true;
        }
        return false;
    }
    doAction(evt) {
        if (hasPopup(this.selectedItemElement))
            this.moveToNextLevel(evt, MenuItem.First);
        super.doAction(evt);
    }
    moveToNextLevel(evt, selectedMenuItem) {
        this.performShortcutEvent(evt);
        this._levelController.moveToNextLevel(selectedMenuItem);
        this._focusSemaphore.allow();
    }
    moveToPrevLevel(evt) {
        this.performShortcutEvent(evt);
        this._levelController.moveToPrevLevel();
        this._focusSemaphore.allow();
    }
    getShortcutContext() {
        return {
            level: this.menuLevel,
            selectedItemIndex: this.selectedItemIndex
        };
    }
    handlePopupClosed() {
        super.handlePopupClosed();
        this._levelController.clearState();
    }
    addEventSubscriptions() { }
    removeEventSubscriptions() {
        this._modalStatusSignal.unsubscribe(this._boundModalStatusChanged);
    }
}

export { DxToolbarDropDownRootMenuKeyboardStrategy as D, DxToolbarModalRootKeyboardStrategy as a };
//# sourceMappingURL=modal-keyboard-strategy-24.2.js.map
