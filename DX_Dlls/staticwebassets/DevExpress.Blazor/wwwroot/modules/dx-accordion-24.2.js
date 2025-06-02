import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { K as KeyboardNavigationStrategy, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { b as A11y } from './constants-24.2.js';
import { N as NavigationAction, a as NavigationActionRequestEvent } from './events-24.22.js';
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
import './property-24.2.js';
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

var _a;
class AccordionCssClasses {
}
_a = AccordionCssClasses;
AccordionCssClasses.prefix = "dxbl";
AccordionCssClasses.root = `${_a.prefix}-accordion`;
AccordionCssClasses.group = `${_a.root}-group`;
AccordionCssClasses.header = `${_a.group}-header`;
AccordionCssClasses.body = `${_a.group}-body`;
AccordionCssClasses.item = `${_a.root}-item`;
AccordionCssClasses.itemContent = `${_a.item}-content`;
AccordionCssClasses.itemsContainer = `${_a.root}-items-container`;
AccordionCssClasses.itemTemplate = `${_a.root}-tmpl`;

class DxAccordionItemKbdStrategy extends KeyboardNavigationStrategy {
    get selector() {
        return this.isTemplatedItem(this.targetElement) ? `:scope.${AccordionCssClasses.itemTemplate}` : `:scope.${AccordionCssClasses.itemContent}`;
    }
    constructor(accordion, targetElement) {
        super(accordion.getKeyBoardNavigator(), targetElement);
        this._accordion = accordion;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    isTemplatedItem(element) {
        return element.classList.contains(AccordionCssClasses.itemTemplate);
    }
    queryItems() {
        return this.queryItemsBySelector(this.selector);
    }
    isExpanded() {
        return this.selectedItemElement.getAttribute(A11y.ariaExpanded) === "true";
    }
    handleKeyDown(evt) {
        if (super.handleKeyDown(evt))
            return true;
        if (!this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        return false;
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Enter:
                this.raiseClickEvent(this.targetElement, evt.ctrlKey, evt.metaKey, evt.shiftKey);
                return true;
            case key.KeyCode.Left:
                if (this.isExpanded()) {
                    this.performAction(NavigationAction.Collapse);
                    return true;
                }
                return false;
            case key.KeyCode.Right:
                if (!this.isExpanded()) {
                    this.performAction(NavigationAction.Expand);
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
    performAction(action) {
        this.targetElement.dispatchEvent(new NavigationActionRequestEvent(action));
    }
}

class DxAccordionGroupHeaderKbdStrategy extends DxAccordionItemKbdStrategy {
    get selector() {
        return `:scope.${AccordionCssClasses.header}`;
    }
}

class DxAccordionGroupBodyKbdStrategy extends KeyboardNavigationStrategy {
    get activateFirstItem() {
        return this._activateFirstItem;
    }
    set activateFirstItem(value) {
        this._activateFirstItem = value;
    }
    constructor(accordion, targetElement) {
        super(accordion.getKeyBoardNavigator(), targetElement);
        this._activateFirstItem = true;
        this._accordion = accordion;
    }
    activate() {
        if (this.focusedFromOutsideBody())
            this.selectedItemIndex = this.activateFirstItem ? 0 : this.itemCount - 1;
        super.activate();
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    focusedFromOutsideBody() {
        return !this.targetElement.contains(document.activeElement);
    }
    isTemplatedBody() {
        return this.targetElement.querySelector(`:scope .${AccordionCssClasses.item}`) == null;
    }
    isItem(element) {
        return element.classList.contains(AccordionCssClasses.itemContent);
    }
    queryItems() {
        return this.queryItemsBySelector(this.getBodyElementsSelector());
    }
    getBodyElementsSelector() {
        return !this.isTemplatedBody() ? `:scope .${AccordionCssClasses.itemContent}` : `:scope.${AccordionCssClasses.body}`;
    }
    createItemStrategy(_itemElement) {
        if (this.isItem(_itemElement))
            return new DxAccordionItemKbdStrategy(this._accordion, _itemElement);
        return null;
    }
    handleKeyDown(evt) {
        const handled = super.handleKeyDown(evt);
        if (!handled && !this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        else
            return handled;
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
                if (this.canProcessUpDownKey()) {
                    this.moveToNextItem(true);
                    return true;
                }
                return false;
            case key.KeyCode.Up:
                if (this.canProcessUpDownKey()) {
                    this.moveToPrevItem(true);
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
    canProcessUpDownKey() {
        return this.isItem(document.activeElement);
    }
}

const AccordionElementsSelector = `:scope .${AccordionCssClasses.header},
:scope .${AccordionCssClasses.body}[expanded-state=True], :scope .${AccordionCssClasses.itemTemplate}`;
class DxAccordionRootKbdStrategy extends KeyboardNavigationStrategy {
    constructor(accordion) {
        super(accordion.getKeyBoardNavigator(), accordion);
        this._accordion = accordion;
    }
    isHeader(element) {
        return element.classList.contains(AccordionCssClasses.header);
    }
    isBody(element) {
        return element.classList.contains(AccordionCssClasses.body);
    }
    queryItems() {
        return this.queryItemsBySelector(AccordionElementsSelector);
    }
    createItemStrategy(itemElement) {
        if (this.isHeader(itemElement))
            return new DxAccordionGroupHeaderKbdStrategy(this._accordion, itemElement);
        if (this.isBody(itemElement))
            return new DxAccordionGroupBodyKbdStrategy(this._accordion, itemElement);
        return new DxAccordionItemKbdStrategy(this._accordion, itemElement);
    }
    handleKeyDown(evt) {
        super.handleKeyDown(evt);
        if (!this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        return false;
    }
    activate() {
        var _a, _b;
        if ((_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.targetElement.contains(document.activeElement))
            (_b = this.getSelectedItemStrategy()) === null || _b === void 0 ? void 0 : _b.activate();
        else
            super.activate();
    }
    handleKeyDownCore(evt) {
        var _a;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Enter:
                if (this.isBody(this.selectedItemElement))
                    (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.activate();
                return true;
            case key.KeyCode.Esc:
                if (document.activeElement !== this.selectedItemElement)
                    this.selectItem(this.selectedItemIndex);
                return true;
            case key.KeyCode.Down:
                this.moveToNextItem(false);
                return true;
            case key.KeyCode.Up:
                this.moveToPrevItem(false);
                return true;
            case key.KeyCode.Tab:
                if (evt.shiftKey)
                    this.leaveBackward();
                else
                    this.leaveForward();
                return true;
        }
        return false;
    }
    canFocusSelectedItem() {
        return super.canFocusSelectedItem() || this.isBody(this.selectedItemElement);
    }
    updateSelectedItemByIndex(index) {
        const prevSelectedItemIndex = this.selectedItemIndex;
        super.updateSelectedItemByIndex(index);
        if (this.isBody(this.selectedItemElement))
            this.getSelectedItemStrategy().activateFirstItem = prevSelectedItemIndex < this.selectedItemIndex;
    }
}

class AccordionBase extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this._keyboardNavigator = null;
    }
    connectedOrContentChanged() {
        this._keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (this._keyboardNavigator)
            this.initializeKeyboardNavigator();
        super.connectedOrContentChanged();
    }
    initializeKeyboardNavigator() {
        if (this._keyboardNavigator && "initialized" in this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new DxAccordionRootKbdStrategy(this));
    }
    disconnectedCallback() {
        var _a;
        (_a = this._keyboardNavigator) === null || _a === void 0 ? void 0 : _a.disposeComponent();
    }
    getKeyBoardNavigator() {
        return this._keyboardNavigator;
    }
}

const AccordionTagName = "dxbl-accordion";
let DxAccordion = class DxAccordion extends AccordionBase {
};
DxAccordion = __decorate([
    e(AccordionTagName)
], DxAccordion);

export { AccordionTagName, DxAccordion };
//# sourceMappingURL=dx-accordion-24.2.js.map
