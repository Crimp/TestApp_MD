import { k as key } from './key-24.2.js';
import { P as PopupMenuKeyboardStrategy, S as Semaphore, b as hasPopup, M as MenuItem, c as containsFocus, d as DropDownActionRequestEvent, e as DropDownAction, T as TemplatedItemAttribute } from './menu-keyboard-strategy-24.2.js';
import { removeFocusHiddenAttribute } from './focus-utils-24.2.js';
import { F as FocusUtils } from './keyboard-navigation-strategy-24.2.js';

// TODO: some members duplicate members from the DxDropDownMenuOwnerKeyboardStrategy class.
// To use this class as a parent, it is need to refactor the DxDropDownMenuKeyboardStrategy class.
class DropDownMenuKeyboardStrategyBase extends PopupMenuKeyboardStrategy {
    constructor(navigator, targetElement, menuItemSelector, parentStrategy, isTransitContainer = false) {
        super(navigator, targetElement, isTransitContainer);
        this._focusSemaphore = new Semaphore();
        this._menuItemSelector = menuItemSelector;
        this._parentStrategy = parentStrategy;
    }
    get parentStrategy() {
        return this._parentStrategy;
    }
    get menuItemSelector() {
        return this._menuItemSelector;
    }
    queryItems() {
        return this.queryItemsBySelector(this._menuItemSelector);
    }
    doAction(evt) {
        this.doClick(this.selectedItemElement, evt);
        if (hasPopup(this.selectedItemElement))
            this.focusSubMenuItemAsync(MenuItem.First);
    }
    handleKeyDown(evt) {
        return this._focusSemaphore.doAllowedFunc(() => {
            const keyCode = key.KeyUtils.getEventKeyCode(evt);
            if (keyCode === key.KeyCode.Right && this.subMenuStrategy && containsFocus(this.targetElement)) {
                this.subMenuStrategy.focusFirstItem();
                return true;
            }
            return super.handleKeyDown(evt);
        });
    }
    openSubMenu(focusedItem) {
        this.openSubMenuAsync(focusedItem);
    }
    async openSubMenuAsync(focusedItem) {
        this.requestSubMenuOpen();
        await this.focusSubMenuItemAsync(focusedItem);
    }
    async focusSubMenuItemAsync(menuItem) {
        const strategy = await this.waitSubMenuShown();
        removeFocusHiddenAttribute(strategy.targetElement);
        if (menuItem === MenuItem.Last)
            strategy.focusLastItem();
        else
            strategy.focusFirstItem();
    }
    closeSubMenu() {
        this.selectedItemElement.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
    }
    handlePopupShown() {
        this._parentStrategy.onSubMenuShown(this);
    }
    handlePopupClosed() {
        this._parentStrategy.onSubMenuClosed(this);
    }
    focusFirstItem() {
        if (this.subMenuStrategy)
            this.subMenuStrategy.focusFirstItem();
        else
            super.focusFirstItem();
    }
    focusLastItem() {
        if (this.subMenuStrategy)
            this.subMenuStrategy.focusLastItem();
        else
            super.focusLastItem();
    }
    focusItem(index) {
        this._focusSemaphore.doAllowedAction(() => {
            super.focusItem(index);
        });
    }
    restoreFocus() {
        this._focusSemaphore.doAllowedAction(() => {
            super.restoreFocus();
        });
    }
    focusSelectedItem() {
        this._focusSemaphore.doIfAllowed(() => {
            super.focusSelectedItem();
        });
    }
    hasTransitContainer(element) {
        return element.hasAttribute(TemplatedItemAttribute);
    }
    findFocusableElements() {
        return FocusUtils.findFocusableElements(this.selectedItemElement).filter(x => !x.classList.contains("dxbl-dropdown-dialog"));
    }
    leaveTransitContainer(direction) {
        super.leaveTransitContainer(direction);
        this.parentStrategy.closeSubMenu();
    }
}
class DxMenuDropDownRootMenuKeyboardStrategy extends DropDownMenuKeyboardStrategyBase {
    createSubMenuStrategy(navigator, targetElement) {
        return new DxMenuDropDownSubMenuKeyboardStrategy(navigator, targetElement, this.menuItemSelector, this, this.hasTransitContainer(targetElement));
    }
    closeSelf() {
        return false;
    }
}
class DxMenuDropDownSubMenuKeyboardStrategy extends DropDownMenuKeyboardStrategyBase {
    createSubMenuStrategy(navigator, targetElement) {
        return new DxMenuDropDownSubMenuKeyboardStrategy(navigator, targetElement, this.menuItemSelector, this);
    }
    closeSelf() {
        this.parentStrategy.closeSubMenu();
        return true;
    }
}

export { DxMenuDropDownRootMenuKeyboardStrategy as D, DropDownMenuKeyboardStrategyBase as a, DxMenuDropDownSubMenuKeyboardStrategy as b };
//# sourceMappingURL=dropdown-menu-keyboard-strategy-24.2.js.map
