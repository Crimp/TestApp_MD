import { a as DropDownRootKbdStrategy, E as EditorDropDownKbdStrategy, D as DxDropDownBase } from './dx-dropdown-base3-24.2.js';
import { k as key } from './key-24.2.js';
import { A as ActiveTabChangedEvent, T as TabsCssClasses } from './tabs-events-24.2.js';
import { C as CalendarKeyboardNavigationLeavedEvent, a as CalendarCssClasses } from './dx-calendar-24.2.js';
import { F as FocusUtils } from './keyboard-navigation-strategy-24.2.js';
import { addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { RollerCssClasses, RollerInitializedEvent } from './roller-24.2.js';

class TimeEditRootKbdStrategy extends DropDownRootKbdStrategy {
    createPopupStrategy(navigator, targetElement) {
        return new TimeEditDropDownKbdStrategy(navigator, targetElement, this);
    }
}
class TimeEditDropDownKbdStrategy extends EditorDropDownKbdStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement, parentStrategy);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (evt.shiftKey && keyCode === key.KeyCode.Tab && this.isFirstHeaderButtonSelected() && !this.isRollerFooterExist()) {
            const item = this.getLastRollerItem();
            if (item) {
                this.focusItem(item);
                return true;
            }
        }
        if (keyCode === key.KeyCode.Enter && this.isTimeRollerSelected() ||
            keyCode === key.KeyCode.Space && this.isLastTimeRollerSelected()) {
            this.closeDropDownAndApplyValue(evt);
            return true;
        }
        return super.handleKeyDown(evt);
    }
    handlePopupShown() {
        this.editorFocused = this.dropDownEditor.focused;
        if (!this.editorFocused)
            addFocusHiddenAttribute(this.dropDownEditor);
        super.handlePopupShown();
        if (this.editorFocused)
            this.focusFirstRollerItem();
    }
    onRollerInitialized() {
        if (this.editorFocused)
            this.focusFirstRollerItem();
    }
    focusFirstRollerItem() {
        this.focusItem(this.getFirstRollerItem());
    }
    focusLastRollerItem() {
        this.focusItem(this.getLastRollerItem());
    }
    focusItem(item) {
        if (item) {
            FocusUtils.makeElementFocusable(item);
            FocusUtils.focusElement(item);
        }
    }
    getFirstRollerItem() {
        return this.targetElement.querySelector(`.${RollerCssClasses.RollerAfter}`);
    }
    getLastRollerItem() {
        const items = this.targetElement.querySelectorAll(`.${RollerCssClasses.RollerAfter}`);
        return items[items.length - 1];
    }
    addEventSubscriptions() {
        super.addEventSubscriptions();
        if (!this.boundOnRollerInitializedHandler) {
            this.boundOnRollerInitializedHandler = this.onRollerInitialized.bind(this);
            this.targetElement.addEventListener(RollerInitializedEvent.eventName, this.boundOnRollerInitializedHandler);
        }
    }
    onDispose() {
        if (this.boundOnRollerInitializedHandler) {
            this.targetElement.removeEventListener(RollerInitializedEvent.eventName, this.boundOnRollerInitializedHandler);
            this.boundOnRollerInitializedHandler = undefined;
        }
    }
    isTimeRollerSelected() {
        var _a;
        return (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains(`${RollerCssClasses.RollerAfter}`);
    }
    isLastTimeRollerSelected() {
        var _a;
        return this.isTimeRollerSelected() && !((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling);
    }
    isFirstHeaderButtonSelected() {
        return this.getHeaderButtons()[0] === document.activeElement;
    }
    isRollerFooterExist() {
        const el = this.targetElement.querySelector(`.${RollerCssClasses.RollerFooter}`);
        return !!el;
    }
    closeDropDownAndApplyValue(evt) {
        this.parentStrategy.closeDropDownAndApplyValue(evt);
    }
}

class DateEditRootKbdStrategy extends TimeEditRootKbdStrategy {
    createPopupStrategy(navigator, targetElement) {
        return new DateEditDropDownKbdStrategy(navigator, targetElement, this);
    }
}
class DateEditDropDownKbdStrategy extends TimeEditDropDownKbdStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement, parentStrategy);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Space && this.isLastDateRollerSelected()) {
            this.performShortcutEvent(evt);
            return true;
        }
        return super.handleKeyDown(evt);
    }
    handlePopupShown() {
        super.handlePopupShown();
        if (this.editorFocused)
            this.focusItem(this.getSelectedDay());
    }
    addEventSubscriptions() {
        super.addEventSubscriptions();
        if (!this.boundOnActiveTabChangedHandler) {
            this.boundOnActiveTabChangedHandler = this.onActiveTabChanged.bind(this);
            this.targetElement.addEventListener(ActiveTabChangedEvent.eventName, this.boundOnActiveTabChangedHandler);
        }
        if (!this.boundOnCalendarKeyboardNavigationLeavedHandler) {
            this.boundOnCalendarKeyboardNavigationLeavedHandler = this.onCalendarKeyboardNavigationLeaved.bind(this);
            this.targetElement.addEventListener(CalendarKeyboardNavigationLeavedEvent.eventName, this.boundOnCalendarKeyboardNavigationLeavedHandler);
        }
    }
    onDispose() {
        if (this.boundOnActiveTabChangedHandler) {
            this.targetElement.removeEventListener(ActiveTabChangedEvent.eventName, this.boundOnActiveTabChangedHandler);
            this.boundOnActiveTabChangedHandler = undefined;
        }
        if (this.boundOnCalendarKeyboardNavigationLeavedHandler) {
            this.targetElement.removeEventListener(CalendarKeyboardNavigationLeavedEvent.eventName, this.boundOnCalendarKeyboardNavigationLeavedHandler);
            this.boundOnCalendarKeyboardNavigationLeavedHandler = undefined;
        }
        super.onDispose();
    }
    onActiveTabChanged() {
        var _a;
        if (!((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains(TabsCssClasses.Item)))
            this.focusFirstRollerItem();
    }
    onCalendarKeyboardNavigationLeaved() {
        const tabs = this.getTabs();
        if (!tabs) {
            const lastElement = FocusUtils.findFocusableElements(this.targetElement).pop();
            if (lastElement)
                this.focusItem(lastElement);
        }
    }
    isLastTimeRollerSelected() {
        const tabs = this.getTabs();
        if (tabs !== null && tabs.activeTabIndex === tabs.tabCount - 1)
            return super.isLastTimeRollerSelected();
        return false;
    }
    isLastDateRollerSelected() {
        const tabs = this.getTabs();
        if (tabs !== null && tabs.activeTabIndex === 0)
            return super.isLastTimeRollerSelected();
        return false;
    }
    getCalendar() {
        return this.targetElement.querySelector(`.${CalendarCssClasses.MainElement}`);
    }
    getTabs() {
        return this.targetElement.querySelector(`.${TabsCssClasses.Prefix}`);
    }
    getSelectedDay() {
        var _a;
        return (_a = this.getCalendar()) === null || _a === void 0 ? void 0 : _a.querySelector(`.${CalendarCssClasses.SelectedItem}`);
    }
}

class DxDateEditBase extends DxDropDownBase {
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    toggleDropDownVisibility() {
        if (this.fieldText !== this.fieldElementValue)
            this.raiseFieldChange();
        super.toggleDropDownVisibility();
    }
    openDropDown() {
        if (this.fieldText !== this.fieldElementValue)
            this.raiseFieldChange();
        super.openDropDown();
    }
    createKeyboardStrategy() {
        return new DateEditRootKbdStrategy(this);
    }
}

export { DxDateEditBase as D, TimeEditRootKbdStrategy as T };
//# sourceMappingURL=dx-date-edit-base-24.2.js.map
