import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { K as KeyboardNavigationStrategy, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { N as NavigationAction, a as NavigationActionRequestEvent } from './events-24.22.js';
import { b as A11y } from './constants-24.2.js';
import { FocusHiddenAttributeName, removeFocusHiddenAttribute, addFocusHiddenAttribute } from './focus-utils-24.2.js';
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
import './focushelper-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './disposable-24.2.js';

var _a;
class TreeViewCssClasses {
}
_a = TreeViewCssClasses;
TreeViewCssClasses.prefix = "dxbl";
TreeViewCssClasses.root = `${_a.prefix}-treeview`;
TreeViewCssClasses.templatedItem = `${_a.root}-tmpl`;
TreeViewCssClasses.item = `${_a.root}-item`;
TreeViewCssClasses.itemsContainer = `${_a.root}-items-container`;
TreeViewCssClasses.itemContent = `${_a.item}-content`;
TreeViewCssClasses.itemContainer = `${_a.item}-container`;
TreeViewCssClasses.checkAllBox = `${_a.root}-checkbox-check-all`;
TreeViewCssClasses.filterPanel = `${_a.prefix}-navigation-filter`;
class TreeViewConstants {
}
TreeViewConstants.parentId = "parent-id";
TreeViewConstants.notTemplatedItemSelector = `li > .${TreeViewCssClasses.itemContent}`;
TreeViewConstants.templatedItemSelector = `li > .${TreeViewCssClasses.templatedItem}`;

const itemContentSelector = `:scope > .${TreeViewCssClasses.itemContainer}, :scope.${TreeViewCssClasses.templatedItem}`;
class DxTreeViewItemKeyboardStrategy extends KeyboardNavigationStrategy {
    constructor(treeView, targetElement) {
        super(treeView.getKeyBoardNavigator(), targetElement);
        this._treeView = treeView;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    queryItems() {
        return this.queryItemsBySelector(itemContentSelector);
    }
}

const TreeViewItemSelector = `:scope ${TreeViewConstants.templatedItemSelector}, :scope ${TreeViewConstants.notTemplatedItemSelector}`;
class TreeViewItemsContainerKbdStrategy extends KeyboardNavigationStrategy {
    activate() {
        if (!this._activatedByClick && this._focusedFromOutside && this._treeView.getAttribute(FocusHiddenAttributeName) == null)
            this.selectedItemIndex = this.navigator.focusedFromForwardElement ? this.itemCount - 1 : 0;
        this._focusedFromOutside = false;
        this._activatedByClick = false;
        super.activate();
    }
    onActiveStateChanged(_isActive) {
        this._focusedFromOutside = _isActive;
        super.onActiveStateChanged(_isActive);
    }
    onPointerDown(evt) {
        this._activatedByClick = true;
    }
    constructor(treeView, targetElement) {
        super(treeView.getKeyBoardNavigator(), targetElement);
        this._focusedFromOutside = true;
        this.boundOnPointerDownHandler = this.onPointerDown.bind(this);
        this._activatedByClick = true;
        this._treeView = treeView;
        this.targetElement.addEventListener("pointerdown", this.boundOnPointerDownHandler);
    }
    queryItems() {
        return this.queryItemsBySelector(TreeViewItemSelector);
    }
    createItemStrategy(itemElement) {
        return new DxTreeViewItemKeyboardStrategy(this._treeView, itemElement);
    }
    getFocusableContainer() {
        return this.isTemplatedItem() ? this.selectedItemElement : this.selectedItemElement.querySelector(`:scope > .${TreeViewCssClasses.itemContainer}`);
    }
    selectedItemExpandedState() {
        const element = this.getFocusableContainer();
        const expandedState = element.getAttribute(A11y.ariaExpanded);
        return expandedState === null ? null : expandedState === "true";
    }
    selectedItemIsCheckable() {
        const element = this.getFocusableContainer();
        return element.hasAttribute(A11y.ariaChecked);
    }
    selectedItemIsParentNode() {
        const element = this.getFocusableContainer();
        return element.getAttribute(A11y.ariaLevel) === "1";
    }
    selectedItemIsEndNode() {
        const element = this.getFocusableContainer();
        return element.getAttribute(A11y.ariaExpanded) === null;
    }
    getSelectedItemParent() {
        const element = this.getFocusableContainer();
        const container = this.isTemplatedItem() ? element.parentElement : element;
        const parentId = container === null || container === void 0 ? void 0 : container.getAttribute(TreeViewConstants.parentId);
        const parent = document.querySelector(`#${parentId}`);
        return this.isTemplatedItem() ? parent.firstElementChild : parent.parentElement;
    }
    isTemplatedItem() {
        return this.selectedItemElement.classList.contains(TreeViewCssClasses.templatedItem);
    }
    handleKeyDown(evt) {
        super.handleKeyDown(evt);
        if (!this.nestedContentSelected)
            return this.handleKeyDownCore(evt);
        return false;
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Enter:
                this.raiseClickEvent(this.getFocusableContainer(), evt.ctrlKey, evt.metaKey, evt.shiftKey);
                return true;
            case key.KeyCode.Space:
                this.handleSpace();
                return true;
            case key.KeyCode.Up:
                this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Down:
                this.moveToNextItem(true);
                return true;
            case key.KeyCode.Left:
                if (this.selectedItemExpandedState() === true)
                    this.performAction(NavigationAction.Collapse);
                else {
                    if (!this.selectedItemIsParentNode())
                        this.moveToParent();
                }
                return true;
            case key.KeyCode.Right:
                if (this.selectedItemExpandedState() === false)
                    this.performAction(NavigationAction.Expand);
                else {
                    if (!this.selectedItemIsEndNode())
                        this.moveToFirstChild();
                }
                return true;
            case key.KeyCode.Home:
                this.selectItem(0);
                return true;
            case key.KeyCode.End:
                this.selectItem(this.itemCount - 1);
                return true;
            default:
                return false;
        }
    }
    onDispose() {
        this.targetElement.removeEventListener("pointerdown", this.boundOnPointerDownHandler);
    }
    moveToParent() {
        const parent = this.getSelectedItemParent();
        const parentIndex = this.items.indexOf(parent);
        this.selectItem(parentIndex);
    }
    moveToFirstChild() {
        this.moveToNextItem(false);
    }
    handleSpace() {
        this.handleChecking();
    }
    selectedItemIsSelectable() {
        return this.getFocusableContainer().getAttribute(A11y.ariaSelected) !== null;
    }
    handleChecking() {
        if (this.selectedItemIsCheckable() || this.selectedItemIsSelectable())
            this.performAction(NavigationAction.Check);
    }
    performAction(action) {
        const element = this.getFocusableContainer();
        element.dispatchEvent(new NavigationActionRequestEvent(action));
    }
}

class TreeViewCheckAllKbdStrategy extends KeyboardNavigationStrategy {
    constructor(treeView, targetElement) {
        super(treeView.getKeyBoardNavigator(), targetElement);
        this._treeView = treeView;
    }
    queryItems() {
        return this.queryItemsBySelector("input");
    }
}

class TreeViewRootKbdStrategy extends KeyboardNavigationStrategy {
    get activatedByCheckAllClick() {
        return this._activatedByCheckAllClick;
    }
    set activatedByCheckAllClick(value) {
        this._activatedByCheckAllClick = value;
    }
    constructor(treeView) {
        super(treeView.getKeyBoardNavigator(), treeView);
        this.boundOnPointerDownHandler = this.onPointerDown.bind(this);
        this._activatedByCheckAllClick = false;
        this._checkAllBox = null;
        this._treeView = treeView;
    }
    onDispose() {
        if (this._checkAllBox) {
            const label = this._checkAllBox.querySelector("label");
            label.removeEventListener("pointerdown", this.boundOnPointerDownHandler);
        }
    }
    activate() {
        super.activate();
        if (!this.activatedByCheckAllClick) {
            if (this._checkAllBox)
                removeFocusHiddenAttribute(this._checkAllBox);
        }
    }
    onActiveStateChanged(_isActive) {
        super.onActiveStateChanged(_isActive);
        if (!_isActive)
            this.activatedByCheckAllClick = false;
    }
    onPointerDown(evt) {
        if (this._checkAllBox) {
            addFocusHiddenAttribute(this._checkAllBox);
            this.activatedByCheckAllClick = true;
        }
    }
    queryItems() {
        return this.queryItemsBySelector(`:scope .${TreeViewCssClasses.checkAllBox}, :scope .${TreeViewCssClasses.filterPanel} input, :scope .${TreeViewCssClasses.itemsContainer}[role=tree]`);
    }
    isItemsContainer(element) {
        return element.classList.contains(TreeViewCssClasses.itemsContainer);
    }
    isCheckAllBox(element) {
        return element.classList.contains(TreeViewCssClasses.checkAllBox);
    }
    createItemStrategy(itemElement) {
        if (this.isItemsContainer(itemElement))
            return new TreeViewItemsContainerKbdStrategy(this._treeView, itemElement);
        if (this.isCheckAllBox(itemElement)) {
            this._checkAllBox = itemElement;
            const label = this._checkAllBox.querySelector("label");
            label.addEventListener("pointerdown", this.boundOnPointerDownHandler);
            return new TreeViewCheckAllKbdStrategy(this._treeView, itemElement);
        }
        return null;
    }
    handleKeyDown(evt) {
        super.handleKeyDown(evt);
        return this.handleKeyDownCore(evt);
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                if (evt.shiftKey) {
                    if (this.firstItemSelected)
                        this.leaveBackward();
                    else
                        this.moveToPrevItem(false);
                }
                else {
                    if (this.lastItemSelected)
                        this.leaveForward();
                    else
                        this.moveToNextItem(false);
                }
                return true;
            default:
                return false;
        }
    }
}

var CheckMode;
(function (CheckMode) {
    CheckMode["Disabled"] = "Disabled";
    CheckMode["Multiple"] = "Multiple";
    CheckMode["Recursive"] = "Recursive";
})(CheckMode || (CheckMode = {}));
class TreeviewBase extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this._keyboardNavigator = null;
        this.checkMode = CheckMode.Disabled;
    }
    connectedOrContentChanged() {
        this._keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (this._keyboardNavigator)
            this.initializeKeyboardNavigation();
        super.connectedOrContentChanged();
    }
    initializeKeyboardNavigation() {
        if (this._keyboardNavigator && "initialized" in this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new TreeViewRootKbdStrategy(this));
    }
    disconnectedCallback() {
        var _a;
        (_a = this._keyboardNavigator) === null || _a === void 0 ? void 0 : _a.disposeComponent();
    }
    getKeyBoardNavigator() {
        return this._keyboardNavigator;
    }
}
__decorate([
    n({ type: CheckMode, attribute: "check-mode" })
], TreeviewBase.prototype, "checkMode", void 0);

const TreeViewTagName = "dxbl-treeview";
let DxTreeView = class DxTreeView extends TreeviewBase {
};
DxTreeView = __decorate([
    e(TreeViewTagName)
], DxTreeView);

export { DxTreeView, TreeViewTagName };
//# sourceMappingURL=dx-tree-view-24.2.js.map
