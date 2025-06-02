import { _ as __decorate } from './tslib.es6-24.2.js';
import { F as FocusUtils, K as KeyboardNavigationStrategy, D as DxKeyboardNavigator, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { k as key } from './key-24.2.js';
import { b as hasPopup, M as MenuItem, P as PopupMenuKeyboardStrategy, K as KeyboardNavigatorIsReadyAtribute, d as DropDownActionRequestEvent, e as DropDownAction, c as containsFocus } from './menu-keyboard-strategy-24.2.js';
import { r as PopupKeyboardStrategyCreatingEvent } from './popup-24.2.js';
import { e } from './custom-element-24.2.js';
import './focushelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './devices-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './property-24.2.js';
import './constants-24.24.js';
import './constants-24.25.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './capture-manager-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';

const ContextMenuItemSelector = ".dxbl-context-menu-item, .dxbl-context-menu-template";
class DxContextMenuPopupKeyboardStrategy extends PopupMenuKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement);
        this._parentStrategy = parentStrategy;
        this.selectedItemIndex = -1;
    }
    get parentStrategy() {
        return this._parentStrategy;
    }
    initialize() {
        super.initialize();
        this.targetElement.setAttribute(KeyboardNavigatorIsReadyAtribute, "");
    }
    activate() {
        if (this.selectedItemIndex >= 0)
            super.activate();
    }
    updateSelectedItemByIndex(index) {
        if (index >= 0)
            super.updateSelectedItemByIndex(index);
    }
    queryItems() {
        return this.queryItemsBySelector(ContextMenuItemSelector);
    }
    onActiveStateChanged(isActive) {
        if (!isActive) {
            if (this.selectedItemElement)
                FocusUtils.removeTabIndex(this.selectedItemElement);
            FocusUtils.removeTabIndex(this.targetElement);
        }
    }
    doAction(evt) {
        if (this.selectedItemElement) {
            this.doClick(this.selectedItemElement, evt);
            if (hasPopup(this.selectedItemElement))
                this.openSubMenu(MenuItem.First);
        }
    }
    async openSubMenu(focusedItem) {
        this.requestSubMenuOpen();
        const strategy = await this.waitSubMenuShown();
        if (focusedItem === MenuItem.Last)
            strategy.focusLastItem();
        else
            strategy.focusFirstItem();
    }
    handlePopupShown() {
        this.parentStrategy.onSubMenuShown(this);
        this.focusContainer();
    }
    handlePopupClosed() {
        this.parentStrategy.onSubMenuClosed(this);
    }
    onSubMenuClosed(strategy) {
        super.onSubMenuClosed(strategy);
        this.focusContainer();
    }
    focusContainer() {
        const focusableElements = FocusUtils.findFocusableElements(this.targetElement);
        if (focusableElements.length > 0)
            FocusUtils.focusElement(focusableElements[0]);
    }
    createSubMenuStrategy(navigator, targetElement) {
        return new DxContextMenuSubMenuKeyboardStrategy(navigator, targetElement, this);
    }
}
class DxContextMenuRootMenuKeyboardStrategy extends DxContextMenuPopupKeyboardStrategy {
    closeSelf() {
        if (hasPopup(this.selectedItemElement)) {
            this.openSubMenu(MenuItem.Last);
            return true;
        }
        else
            return false;
    }
}
class DxContextMenuSubMenuKeyboardStrategy extends DxContextMenuPopupKeyboardStrategy {
    closeSelf() {
        const parentElement = this.targetElement.placementTargetElement;
        if (parentElement) {
            parentElement.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
            this.parentStrategy.updateSelectedItemByChildElement(parentElement);
            this.parentStrategy.focusSelectedItem();
            return true;
        }
        return false;
    }
}

class DxContextMenuRootStrategy extends KeyboardNavigationStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
        this._prevActiveElement = null;
        this.boundHandlePopupKeyboardStrategyCreating = this.handlePopupKeyboardStrategyCreating.bind(this);
        this.targetElement.addEventListener(PopupKeyboardStrategyCreatingEvent.eventName, this.boundHandlePopupKeyboardStrategyCreating);
    }
    queryItems() {
        return this.queryItemsBySelector(".dxbl-dropdown-dialog");
    }
    onSubMenuShown(_strategy) {
        if (!this._prevActiveElement)
            this._prevActiveElement = document.activeElement;
    }
    onSubMenuClosed(strategy) {
        if (!strategy.targetElement.isConnected || containsFocus(strategy.targetElement))
            this.tryRestoreFocusedElement();
    }
    handlePopupKeyboardStrategyCreating(evt) {
        evt.detail.factory = {
            createPopup: (navigator, targetElement) => new DxContextMenuRootMenuKeyboardStrategy(navigator, targetElement, this)
        };
        evt.stopPropagation();
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab && !this.nestedContentSelected) {
            this.performShortcutEvent(evt);
            if (evt.shiftKey)
                this.leaveBackward();
            else
                this.leaveForward();
            return true;
        }
        return super.handleKeyDown(evt);
    }
    tryRestoreFocusedElement() {
        if (this._prevActiveElement && this._prevActiveElement instanceof HTMLElement) {
            this._prevActiveElement.focus();
            this._prevActiveElement = null;
        }
    }
}

let DxContextMenu = class DxContextMenu extends SingleSlotElementBase {
    constructor() {
        super();
        this._keyboardNavigator = null;
        this.bindedOnChanged = this.onChanged.bind(this);
        this._observer = new MutationObserver(this.bindedOnChanged);
    }
    onChanged(mutations, _observer) {
        mutations === null || mutations === void 0 ? void 0 : mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node instanceof DxKeyboardNavigator) {
                    this._keyboardNavigator = node;
                    this.initializeKeyboardNavigation();
                }
            });
        });
    }
    connectedCallback() {
        this._keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this._keyboardNavigator)
            this.initializeKeyboardNavigation();
        else
            this._observer.observe(this, { childList: true });
    }
    initializeKeyboardNavigation() {
        if (this._keyboardNavigator && "initialized" in this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new DxContextMenuRootStrategy(this._keyboardNavigator, this));
    }
    disconnectedCallback() {
        var _a;
        this._observer.disconnect();
        (_a = this._keyboardNavigator) === null || _a === void 0 ? void 0 : _a.disposeComponent();
    }
};
DxContextMenu = __decorate([
    e("dxbl-context-menu")
], DxContextMenu);
function loadModule() { }
const dxContextMenu = { loadModule };

export { DxContextMenu, dxContextMenu as default };
//# sourceMappingURL=dx-context-menu-24.2.js.map
