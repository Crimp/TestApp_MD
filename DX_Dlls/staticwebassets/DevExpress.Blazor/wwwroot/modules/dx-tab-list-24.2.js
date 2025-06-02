import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { T as TabsCssClasses } from './tabs-events-24.2.js';
import { tabIdSelector } from './dx-tabs-24.2.js';
import { k as key } from './key-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './focushelper-24.2.js';
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
import './scroll-viewer-css-classes-24.2.js';
import './toolbar-css-classes-24.2.js';
import './ribbon-utils-24.2.js';

class TabItemKbdStrategy extends KeyboardNavigationStrategy {
    constructor(tabs, navigator, targetElement) {
        super(navigator, targetElement);
        this.tabs = tabs;
    }
    queryItems() {
        return this.queryItemsBySelector(`:scope.${TabsCssClasses.Item}`);
    }
}

class TabKbdStrategy extends KeyboardNavigationStrategy {
    constructor(tabs, navigator, targetElement) {
        super(navigator, targetElement);
        this.tabs = tabs;
    }
    queryItems() {
        return this.queryItemsBySelector(`:scope .${TabsCssClasses.Item}`);
    }
    createItemStrategy(itemElement) {
        return new TabItemKbdStrategy(this.tabs, this.navigator, itemElement);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (this.tabs.isVertical) {
            if (keyCode === key.KeyCode.Down) {
                this.moveForward(evt);
                return true;
            }
            if (keyCode === key.KeyCode.Up) {
                this.moveBackward(evt);
                return true;
            }
        }
        else {
            if (keyCode === key.KeyCode.Right) {
                this.moveForward(evt);
                return true;
            }
            if (keyCode === key.KeyCode.Left) {
                this.moveBackward(evt);
                return true;
            }
        }
        if (keyCode === key.KeyCode.Tab) {
            if (evt.shiftKey)
                this.leaveBackward();
            else
                this.leaveForward();
            return true;
        }
        if (keyCode === key.KeyCode.Delete)
            this.performShortcutEvent(evt);
        return false;
    }
    moveForward(evt) {
        this.moveToNextItem(true);
        this.performShortcutEvent(evt);
    }
    moveBackward(evt) {
        this.moveToPrevItem(true);
        this.performShortcutEvent(evt);
    }
    getShortcutContext() {
        return {
            TabId: this.getSelectedTabId()
        };
    }
    focusSelectedItem() {
        var _a;
        if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains(TabsCssClasses.Prefix)) || this.isTabActive())
            FocusUtils.focusElement(this.selectedItemElement);
    }
    isTabActive() {
        var _a;
        return (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains(TabsCssClasses.Item);
    }
    getSelectedTabId() {
        const element = this.getItem(this.selectedItemIndex);
        return element === null || element === void 0 ? void 0 : element.getAttribute(tabIdSelector);
    }
    updateSelectedItemByChildElement(childElement, evt = null) {
        if (childElement === this.targetElement) {
            const element = this.tabs.getActiveTab();
            const index = this.items.findIndex((el) => el === element);
            this.updateSelectedItemByIndex(this.validateItemIndex(index));
        }
        else
            super.updateSelectedItemByChildElement(childElement, evt);
    }
}

let DxTabList = class DxTabList extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.tabs = null;
        this.tabId = "";
    }
    connectedOrContentChanged() {
        this.keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (this.keyboardNavigator && "initialized" in this.keyboardNavigator && !this.keyboardNavigator.initialized) {
            this.tabs = document.querySelector(`#${this.tabId}`);
            const tab = new TabKbdStrategy(this.tabs, this.keyboardNavigator, this);
            this.keyboardNavigator.initialize(this, tab);
        }
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (this.keyboardNavigator && "initialized" in this.keyboardNavigator && !this.keyboardNavigator.initialized) {
            const tab = new TabKbdStrategy(this.tabs, this.keyboardNavigator, this);
            this.keyboardNavigator.initialize(this, tab);
        }
    }
};
__decorate([
    n({ attribute: "data-dxtabs-id" })
], DxTabList.prototype, "tabId", void 0);
DxTabList = __decorate([
    e(DxTagNames.TabList)
], DxTabList);

export { DxTabList };
//# sourceMappingURL=dx-tab-list-24.2.js.map
