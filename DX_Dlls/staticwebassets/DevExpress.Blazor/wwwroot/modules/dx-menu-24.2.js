import { _ as __decorate } from './tslib.es6-24.2.js';
import { M as MenuItemConnectedEvent, a as MenuCollapseChangedEvent, D as DxMenuItem } from './dx-menu-item-24.2.js';
import { D as DxDropDownOwner } from './dx-dropdown-owner-24.2.js';
import { a as MenuConstants, M as MenuCssClasses } from './constants-24.24.js';
import { e } from './custom-element-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { d as dom } from './dom-24.2.js';
import { dxLicenseTriggerName } from './dx-license-24.2.js';
import { L as measureAsync, s as mutateAsync } from './popup-24.2.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { D as DxDropDownMenuOwnerKeyboardStrategy, f as MenuItemSelector, g as MenuTitle, T as TemplatedItemAttribute, b as hasPopup, c as containsFocus, M as MenuItem, d as DropDownActionRequestEvent, e as DropDownAction, i as DxMenuKeyboardStrategy, a as MenuLevelController, j as PopupMenuKeyboardStrategyBase, k as isExpanded } from './menu-keyboard-strategy-24.2.js';
import { D as DxMenuDropDownRootMenuKeyboardStrategy, a as DropDownMenuKeyboardStrategyBase, b as DxMenuDropDownSubMenuKeyboardStrategy } from './dropdown-menu-keyboard-strategy-24.2.js';
import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { n } from './property-24.2.js';
import './custom-events-helper-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './eventhelper-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './devices-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './dom-utils-24.2.js';
import './constants-24.25.js';

let DxMenuNavbar = class DxMenuNavbar extends DxDropDownOwner {
    constructor() {
        super();
        this.desiredWidth = null;
        this.dropDownWidthSourceResizeObserver = new ResizeObserver(this.onDropDownWidthSourceSizeChanged.bind(this));
    }
    connectedCallback() {
        super.connectedCallback();
        this.observeForDropDownWidthSourceElementSize();
    }
    disconnectedCallback() {
        this.dropDownWidthSourceResizeObserver.disconnect();
        super.disconnectedCallback();
    }
    ensureDropDownElement() {
        super.ensureDropDownElement();
        this.updateDropDownDesiredWidth();
    }
    onDropDownWidthSourceSizeChanged(entries, _) {
        if (entries.length < 1)
            return;
        const resizeEntry = entries[0];
        this.desiredWidth = resizeEntry.contentRect.width + "px";
        this.updateDropDownDesiredWidth();
    }
    updateDropDownDesiredWidth() {
        if (!this.dropDownElement)
            return;
        this.dropDownElement.desiredWidth = this.desiredWidth;
    }
    observeForDropDownWidthSourceElementSize() {
        this.dropDownWidthSourceResizeObserver.disconnect();
        const dropDownWidthSourceElement = this.getDropDownWidthSourceElement();
        if (dropDownWidthSourceElement)
            this.dropDownWidthSourceResizeObserver.observe(dropDownWidthSourceElement);
    }
    getDropDownWidthSourceElement() {
        return this;
    }
};
DxMenuNavbar = __decorate([
    e(MenuConstants.menuNavBarComponentName)
], DxMenuNavbar);

class MenuItemInfo {
    constructor(menuItem) {
        var _a;
        this.menuItem = menuItem;
        this.id = (_a = menuItem.id) !== null && _a !== void 0 ? _a : "";
        this.width = -1;
        this.adaptivePriority = menuItem.adaptivePriority;
        this.canCrop = menuItem.canCrop;
        this.textElement = null;
        this.textWidth = -1;
        this.container = menuItem.closest(`[data-dxmenu-item-id="${this.id}"]`);
        this.initialize();
    }
    canCollapse() {
        return this.canCrop && this.textElement !== null;
    }
    canReduce() {
        return this.canCollapse() && !dom.DomUtils.hasClassName(this.textElement, MenuCssClasses.menuItemTextHiddenClass);
    }
    canIncrease() {
        return this.canCollapse() && dom.DomUtils.hasClassName(this.textElement, MenuCssClasses.menuItemTextHiddenClass);
    }
    showTextElement() {
        this.toggleCssClass(this.textElement, MenuCssClasses.menuItemTextHiddenClass, false);
        this.toggleCssClass(this.container, MenuCssClasses.menuListItemHiddenClass, false);
    }
    hideTextElement() {
        this.toggleCssClass(this.textElement, MenuCssClasses.menuItemTextHiddenClass, true);
        this.toggleCssClass(this.container, MenuCssClasses.menuListItemHiddenClass, true);
    }
    initialize() {
        let width = 0;
        if (this.container)
            width = this.calculateChildrenOffsetWidth(this.container);
        const subItem = this.menuItem.querySelector(`*:not(${dxLicenseTriggerName})`);
        if (subItem) {
            width += this.calculateChildrenOffsetWidth(subItem);
            for (let i = 0; i < subItem.children.length; i++) {
                const child = subItem.children[i];
                const childWidth = this.calculateElementWidth(child);
                if (child.matches(`div.${MenuCssClasses.menuItemTextContainer}`)) {
                    this.textElement = child;
                    this.textWidth = childWidth;
                }
                width += childWidth;
            }
        }
        this.width = width;
    }
    isHTMLElement(element) {
        return !!element.offsetWidth;
    }
    calculateElementWidth(element) {
        const style = getComputedStyle(element);
        return (this.isHTMLElement(element) ? element.offsetWidth : element.getBoundingClientRect().width)
            + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    calculateChildrenOffsetWidth(container) {
        const style = dom.DomUtils.getCurrentStyle(container);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.marginLeft) + parseFloat(style.marginRight) +
            parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    }
    toggleCssClass(element, cssClass, value) {
        if (element)
            element.classList.toggle(cssClass, value);
    }
}

class MenuItemsWidthInfo {
    constructor(width, minWidth) {
        this.width = width;
        this.minWidth = minWidth;
    }
}
class MenuItemsSizeController {
    constructor(menuView) {
        this._currentWidth = 0;
        this._itemsWidth = new MenuItemsWidthInfo(0, 0);
        this._itemsOffset = 0;
        this._collapseToHamburgerWidth = -1;
        this._menuItemInfos = [];
        this._resizeObserver = null;
        this._menuView = menuView;
    }
    get isCollapsed() { return this._menuView.isCollapsed; }
    get isVertical() { return this._menuView.isVertical; }
    get canCollapse() { return this._menuView.canCollapse; }
    get collapseToIcons() { return this._menuView.collapseToIcons; }
    get collapseToIconsAll() { return this._menuView.collapseToIconsAll; }
    get collapseToHamburgerMenu() { return this._menuView.collapseToHamburgerMenu; }
    async initialize(items, width) {
        this.unsubsribeFromSizeChanges();
        if (width !== undefined && this.canCollapse && (this.collapseToIcons || this.collapseToIconsAll || this.collapseToHamburgerMenu)) {
            this._menuItemInfos = await measureAsync(null, _ => this.createMenuItemInfos(items));
            this._currentWidth = width;
            if (!this.isCollapsed) {
                if (this.isVertical) {
                    this._itemsOffset = 0;
                    this._itemsWidth = new MenuItemsWidthInfo(Math.max(...this._menuItemInfos.map(o => o.width)), 0);
                    this._collapseToHamburgerWidth = -1;
                }
                else {
                    this._itemsOffset = this._menuView.itemsOffset;
                    this._itemsWidth = new MenuItemsWidthInfo(this.calculateItemsWidth(), this.calculateItemsMinWidth());
                    if (this.collapseToIcons || this.collapseToIconsAll)
                        this._collapseToHamburgerWidth = this._itemsWidth.minWidth + this._itemsOffset;
                    else
                        this._collapseToHamburgerWidth = this._itemsWidth.width + this._itemsOffset;
                }
            }
            await mutateAsync(null, _ => this.resize(this._currentWidth));
            this.subscribeToSizeChanges();
        }
        else {
            if (this.isCollapsed)
                this._menuView.onCollapseChanged(false);
            else
                await mutateAsync(null, _ => this.increaseAllItems());
            this._menuItemInfos = [];
        }
    }
    resize(width) {
        if (this.isCollapsed) {
            if (width > this._collapseToHamburgerWidth || !this.collapseToHamburgerMenu)
                this._menuView.onCollapseChanged(false);
        }
        else {
            const delta = width - this._currentWidth;
            if (this.isVertical) {
                if (this.collapseToIconsAll) {
                    if (delta <= 0 && this._itemsWidth.width > width)
                        this.reduceAllItems();
                    else if (this._itemsWidth.width < width)
                        this.increaseAllItems();
                }
            }
            else {
                if (this.collapseToIcons) {
                    let itemsWidthWithOffset = this._itemsOffset;
                    this._menuItemInfos.forEach(v => {
                        itemsWidthWithOffset += v.width;
                        if (v.canIncrease())
                            itemsWidthWithOffset -= v.textWidth;
                    });
                    if (delta <= 0 && itemsWidthWithOffset > width)
                        this.reduceItems(width, itemsWidthWithOffset);
                    else if (delta >= 0)
                        this.increaseItems(width, itemsWidthWithOffset);
                }
                else if (this.collapseToIconsAll) {
                    const itemsWidth = this._itemsWidth.width + this._itemsOffset;
                    if (delta <= 0 && itemsWidth > width)
                        this.reduceAllItems();
                    else if (delta >= 0 && itemsWidth < width)
                        this.increaseAllItems();
                }
                else
                    this.increaseAllItems();
                if (this.collapseToHamburgerMenu && delta <= 0 && width < this._collapseToHamburgerWidth)
                    this._menuView.onCollapseChanged(true);
            }
        }
        this._currentWidth = width;
    }
    dispose() {
        this.unsubsribeFromSizeChanges();
        this._menuItemInfos = [];
    }
    subscribeToSizeChanges() {
        this.subscribeToRootElementSizeChange();
    }
    unsubsribeFromSizeChanges() {
        this.unsubscribeFromRootElementSizeChange();
    }
    subscribeToRootElementSizeChange() {
        this._resizeObserver = new ResizeObserver(entries => {
            const resizeEntry = entries[0];
            if (resizeEntry)
                this.resize(resizeEntry.contentRect.width);
        });
        this._resizeObserver.observe(this._menuView.root);
    }
    unsubscribeFromRootElementSizeChange() {
        var _a;
        (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this._resizeObserver = null;
    }
    createMenuItemInfos(items) {
        const result = [];
        if (items) {
            items.forEach(item => {
                result.push(new MenuItemInfo(item));
            });
            result.sort((a, b) => a.adaptivePriority - b.adaptivePriority);
        }
        return result;
    }
    calculateItemsWidth() {
        let width = 0;
        this._menuItemInfos.forEach(v => width += v.width);
        return width;
    }
    calculateItemsMinWidth() {
        let width = 0;
        this._menuItemInfos.forEach(v => {
            width += v.width;
            if (v.canCollapse())
                width -= v.textWidth;
        });
        return width;
    }
    reduceItems(maxWidth, itemsWidth) {
        for (let i = this._menuItemInfos.length - 1; i >= 0 && itemsWidth > maxWidth; i--) {
            const item = this._menuItemInfos[i];
            if (item.canReduce()) {
                item.hideTextElement();
                itemsWidth -= item.textWidth;
            }
        }
    }
    increaseItems(maxWidth, itemsWidth) {
        for (let i = 0; i < this._menuItemInfos.length; i++) {
            const item = this._menuItemInfos[i];
            if (item.canIncrease()) {
                if ((itemsWidth + item.textWidth) > maxWidth)
                    break;
                item.showTextElement();
                itemsWidth += item.textWidth;
            }
        }
    }
    reduceAllItems() {
        for (let i = 0; i < this._menuItemInfos.length; i++) {
            const item = this._menuItemInfos[i];
            if (item.canReduce())
                item.hideTextElement();
        }
    }
    increaseAllItems() {
        for (let i = 0; i < this._menuItemInfos.length; i++) {
            const item = this._menuItemInfos[i];
            if (item.canIncrease())
                item.showTextElement();
        }
    }
}

var MenuKeyboardCommand;
(function (MenuKeyboardCommand) {
    MenuKeyboardCommand[MenuKeyboardCommand["Unknown"] = 0] = "Unknown";
    MenuKeyboardCommand[MenuKeyboardCommand["MoveToNextItem"] = 2] = "MoveToNextItem";
    MenuKeyboardCommand[MenuKeyboardCommand["MoveToPrevItem"] = 4] = "MoveToPrevItem";
    MenuKeyboardCommand[MenuKeyboardCommand["MoveToFirstItem"] = 8] = "MoveToFirstItem";
    MenuKeyboardCommand[MenuKeyboardCommand["MoveToLastItem"] = 16] = "MoveToLastItem";
    MenuKeyboardCommand[MenuKeyboardCommand["OpenSubMenu"] = 32] = "OpenSubMenu";
    MenuKeyboardCommand[MenuKeyboardCommand["Execute"] = 64] = "Execute";
    MenuKeyboardCommand[MenuKeyboardCommand["Leave"] = 128] = "Leave";
})(MenuKeyboardCommand || (MenuKeyboardCommand = {}));
class DxDesktopMenuKeyboardStrategy extends DxDropDownMenuOwnerKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
        this._keyCodeToCommandMap = this.createKeyCodeToCommandMap();
    }
    get menuItemSelector() {
        return MenuItemSelector;
    }
    queryItems() {
        if (this.needToAddTitle())
            return this.queryItemsBySelector(`${MenuItemSelector}, ${MenuTitle}`);
        return this.queryItemsBySelector(MenuItemSelector);
    }
    getCommands(keyCode) {
        var _a;
        return (_a = this._keyCodeToCommandMap.get(keyCode)) !== null && _a !== void 0 ? _a : MenuKeyboardCommand.Unknown;
    }
    createPopupStrategy(navigator, targetElement) {
        return new DxMenuDropDownRootMenuKeyboardStrategy(navigator, targetElement, MenuItemSelector, this, this.hasTransitContainer(targetElement));
    }
    hasTransitContainer(element) {
        return element.hasAttribute(TemplatedItemAttribute);
    }
    createModalStrategy(_navigator, _targetElement) {
        throw new Error("This strategy type is not supported in the current context.");
    }
    moveToNextItem(isLoop = false) {
        if (!this.isTitle(this.selectedItemElement)) {
            if (this.selectedItemIndex < this.itemCount - 1)
                this.selectItem(this.selectedItemIndex + 1);
            else if (isLoop && !this.isTitle(this.items[0]))
                this.selectItem(0);
        }
    }
    moveToPrevItem(isLoop = false) {
        if (!this.isTitle(this.selectedItemElement)) {
            if (this.selectedItemIndex > 0 && !this.isTitle(this.items[this.selectedItemIndex - 1]))
                this.selectItem(this.selectedItemIndex - 1);
            else if (isLoop && !this.isTitle(this.items[this.itemCount - 1]))
                this.selectItem(this.itemCount - 1);
        }
    }
    handleKeyDownCore(evt) {
        const commands = this.getCommands(key.KeyUtils.getEventKeyCode(evt));
        switch (commands) {
            case MenuKeyboardCommand.MoveToNextItem:
                if (this.subMenuStrategy)
                    this.closeSubMenuAndMoveToNextItem();
                else
                    this.moveToNextItem(true);
                return true;
            case MenuKeyboardCommand.MoveToPrevItem:
                if (this.subMenuStrategy)
                    this.closeSubMenuAndMoveToPrevItem();
                else
                    this.moveToPrevItem(true);
                return true;
            case MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToLastItem:
                if (hasPopup(this.selectedItemElement) && containsFocus(this.targetElement)) {
                    if (this.subMenuStrategy)
                        this.subMenuStrategy.focusLastItem();
                    else
                        this.openSubMenuAndFocusItem(MenuItem.Last);
                    return true;
                }
                return false;
            case MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToFirstItem:
                if (hasPopup(this.selectedItemElement) && containsFocus(this.targetElement)) {
                    if (this.subMenuStrategy)
                        this.subMenuStrategy.focusFirstItem();
                    else
                        this.openSubMenuAndFocusItem(MenuItem.First);
                    return true;
                }
                return false;
            case MenuKeyboardCommand.MoveToFirstItem:
                if (!this.isTitle(this.items[0]))
                    this.selectItem(0);
                else if (this.itemCount > 1)
                    this.selectItem(1);
                return true;
            case MenuKeyboardCommand.MoveToLastItem:
                if (!this.isTitle(this.items[this.itemCount - 1]))
                    this.selectItem(this.itemCount - 1);
                else if (this.itemCount > 1)
                    this.selectItem(this.itemCount - 2);
                this.selectItem(this.itemCount - 1);
                return true;
            case MenuKeyboardCommand.Execute:
                if (!this.isTitle(this.selectedItemElement))
                    this.doAction(evt);
                return true;
            case MenuKeyboardCommand.Leave:
                if (this.subMenuStrategy)
                    this.requestSubMenuClose();
                return this.handleTabKeyDown(evt);
            default:
                return false;
        }
    }
    doAction(evt) {
        this.raiseClickEvent(this.selectedItemElement, evt.ctrlKey, evt.metaKey, evt.shiftKey);
        if (hasPopup(this.selectedItemElement))
            this.focusSubMenuItemAsync(MenuItem.First);
    }
    closeSubMenu() {
        this.requestSubMenuClose();
    }
    closeSubMenuAndMoveToPrevItem() {
        this.requestSubMenuClose();
        this.moveToPrevItem(true);
        this.requestSubMenuOpen();
    }
    closeSubMenuAndMoveToNextItem() {
        this.requestSubMenuClose();
        this.moveToNextItem(true);
        this.requestSubMenuOpen();
    }
    openSubMenuAndFocusItem(item) {
        this.requestSubMenuOpen();
        return this.focusSubMenuItemAsync(item);
    }
    requestSubMenuOpen() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Expand));
    }
    requestSubMenuClose() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
    }
}

class DxVerticalMenuKeyboardStrategy extends DxDesktopMenuKeyboardStrategy {
    createKeyCodeToCommandMap() {
        return new Map([
            [key.KeyCode.Down, MenuKeyboardCommand.MoveToNextItem],
            [key.KeyCode.Up, MenuKeyboardCommand.MoveToPrevItem],
            [key.KeyCode.Right, MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToFirstItem],
            [key.KeyCode.Left, MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToLastItem],
            [key.KeyCode.Home, MenuKeyboardCommand.MoveToFirstItem],
            [key.KeyCode.End, MenuKeyboardCommand.MoveToLastItem],
            [key.KeyCode.Enter, MenuKeyboardCommand.Execute],
            [key.KeyCode.Space, MenuKeyboardCommand.Execute],
            [key.KeyCode.Tab, MenuKeyboardCommand.Leave]
        ]);
    }
    closeSubMenuAndMoveToNextItem() {
        this.requestSubMenuClose();
    }
    closeSubMenuAndMoveToPrevItem() {
        this.requestSubMenuClose();
    }
    createPopupStrategy(navigator, targetElement) {
        return new DxVerticalMenuDropDownRootMenuKeyboardStrategy(navigator, targetElement, MenuItemSelector, this, this.hasTransitContainer(targetElement));
    }
}
class DxVerticalMenuDropDownRootMenuKeyboardStrategy extends DropDownMenuKeyboardStrategyBase {
    createSubMenuStrategy(navigator, targetElement) {
        return new DxMenuDropDownSubMenuKeyboardStrategy(navigator, targetElement, this.menuItemSelector, this, this.hasTransitContainer(targetElement));
    }
    closeSelf() {
        this.parentStrategy.closeSubMenu();
        return true;
    }
}

class DxHorizontalMenuKeyboardStrategy extends DxDesktopMenuKeyboardStrategy {
    createKeyCodeToCommandMap() {
        return new Map([
            [key.KeyCode.Right, MenuKeyboardCommand.MoveToNextItem],
            [key.KeyCode.Left, MenuKeyboardCommand.MoveToPrevItem],
            [key.KeyCode.Down, MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToFirstItem],
            [key.KeyCode.Up, MenuKeyboardCommand.OpenSubMenu | MenuKeyboardCommand.MoveToLastItem],
            [key.KeyCode.Home, MenuKeyboardCommand.MoveToFirstItem],
            [key.KeyCode.End, MenuKeyboardCommand.MoveToLastItem],
            [key.KeyCode.Enter, MenuKeyboardCommand.Execute],
            [key.KeyCode.Space, MenuKeyboardCommand.Execute],
            [key.KeyCode.Tab, MenuKeyboardCommand.Leave]
        ]);
    }
}

class DxMobileVerticalMenuKeyboardStrategy extends DxMenuKeyboardStrategy {
    constructor() {
        super(...arguments);
        this._levelController = new MenuLevelController();
    }
    get menuLevel() {
        return this._levelController.currentLevel;
    }
    initialize() {
        super.initialize();
        this._levelController.updateState(this.selectedItemIndex, this.itemCount);
        this.selectedItemIndex = this._levelController.selectedItemIndex;
    }
    queryItems() {
        if (this.needToAddTitle())
            return this.queryItemsBySelector(`${MenuItemSelector}, .${MenuCssClasses.subMenuTemplate}, ${MenuTitle}`);
        return this.queryItemsBySelector(`${MenuItemSelector}, .${MenuCssClasses.subMenuTemplate}`);
    }
    moveToNextItem(isLoop = false) {
        if (!this.isTitle(this.selectedItemElement)) {
            if (this.selectedItemIndex < this.itemCount - 1)
                this.selectItem(this.selectedItemIndex + 1);
            else if (isLoop && !this.isTitle(this.items[0]))
                this.selectItem(0);
        }
    }
    moveToPrevItem(isLoop = false) {
        if (!this.isTitle(this.selectedItemElement)) {
            if (this.selectedItemIndex > 0 && !this.isTitle(this.items[this.selectedItemIndex - 1]))
                this.selectItem(this.selectedItemIndex - 1);
            else if (isLoop && !this.isTitle(this.items[this.itemCount - 1]))
                this.selectItem(this.itemCount - 1);
        }
    }
    handleKeyDownCore(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        switch (keyCode) {
            case key.KeyCode.Down:
                this.moveToNextItem(true);
                return true;
            case key.KeyCode.Up:
                this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                if (!this.isTitle(this.selectedItemElement)) {
                    this.raiseClickEvent(this.selectedItemElement, evt.ctrlKey, evt.metaKey, evt.shiftKey);
                    if (isHeader(this.selectedItemElement))
                        this.onMoveToPrevLevel();
                    else if (hasPopup(this.selectedItemElement))
                        this.onMoveToNextLevel(MenuItem.First);
                }
                return true;
            case key.KeyCode.Right:
                if (hasPopup(this.selectedItemElement)) {
                    this.performShortcutEvent(evt);
                    this.onMoveToNextLevel(MenuItem.First);
                    return true;
                }
                return false;
            case key.KeyCode.Left:
                if (this.menuLevel > 0) {
                    this.performShortcutEvent(evt);
                    this.onMoveToPrevLevel();
                    return true;
                }
                else if (hasPopup(this.selectedItemElement)) {
                    this.performShortcutEvent(evt);
                    this.onMoveToNextLevel(MenuItem.Last);
                    return true;
                }
                if (this.menuLevel > 0) {
                    this.performShortcutEvent(evt);
                    this.onMoveToPrevLevel();
                    return true;
                }
                return false;
            case key.KeyCode.Tab:
                return this.handleTabKeyDown(evt);
            default:
                return false;
        }
    }
    getShortcutContext() {
        const selectedItemIndex = this.menuLevel > 0 || this.needToAddTitle() ? this.selectedItemIndex - 1 : this.selectedItemIndex;
        return {
            level: this.menuLevel,
            selectedItemIndex
        };
    }
    onMoveToNextLevel(selectedMenuItem) {
        this._levelController.moveToNextLevel(selectedMenuItem);
    }
    onMoveToPrevLevel() {
        this._levelController.moveToPrevLevel();
    }
}
function isHeader(element) {
    return element.hasAttribute("data-header");
}

const HamburgerButtonSelector = `.${MenuCssClasses.menuNav} > .${MenuCssClasses.menuNavBar} > .dxbl-btn`;
class DxMobileHorizonalMenuKeyboardStrategy extends DxDropDownMenuOwnerKeyboardStrategy {
    createModalStrategy(_navigator, _targetElement) {
        throw new Error("This strategy type is not supported in the current context.");
    }
    createPopupStrategy(navigator, targetElement) {
        return new DropDownMenuKeyboardStrategy(navigator, targetElement, this);
    }
    queryItems() {
        if (this.needToAddTitle())
            return this.queryItemsBySelector(`${HamburgerButtonSelector}, ${MenuTitle}`);
        return this.queryItemsBySelector(HamburgerButtonSelector);
    }
    handleKeyDownCore(evt) {
        if (!this.isTitle(this.selectedItemElement)) {
            switch (key.KeyUtils.getEventKeyCode(evt)) {
                case key.KeyCode.Up:
                    this.performShortcutEvent(evt);
                    this.focusSubMenuItemAsync(MenuItem.Last);
                    return true;
                case key.KeyCode.Down:
                case key.KeyCode.Enter:
                case key.KeyCode.Space:
                    this.performShortcutEvent(evt);
                    this.focusSubMenuItemAsync(MenuItem.First);
                    return true;
            }
        }
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab) {
            this.performShortcutEvent(evt);
            return this.handleTabKeyDown(evt);
        }
        return false;
    }
    isImmediatelyClickEnabled() {
        return false;
    }
}
// TODO: some members duplicate members from the DxMenuKeyboardStrategy class.
// To use this class as a parent, it is need to refactor the DxDropDownMenuKeyboardStrategy class.
class DropDownMenuKeyboardStrategy extends PopupMenuKeyboardStrategyBase {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement);
        this._itemIdToParentIdMap = new Map();
        this._parentStrategy = parentStrategy;
    }
    initialize() {
        super.initialize();
        this._itemIdToParentIdMap.clear();
        const rootList = this.targetElement.querySelector(`.${MenuCssClasses.navigation}`);
        if (rootList)
            this.mapItemsToParent(rootList, null);
    }
    mapItemsToParent(list, parentId) {
        for (const item of list.children) {
            const id = item.dataset["dxmenuItemId"];
            if (!id)
                continue;
            this._itemIdToParentIdMap.set(id, parentId);
            const children = Array.from(item.children);
            const nestedList = children.find(child => child instanceof HTMLUListElement);
            if (nestedList)
                this.mapItemsToParent(nestedList, id);
        }
    }
    queryItems() {
        return this.queryItemsBySelector(`${MenuItemSelector}, .${MenuCssClasses.subMenuTemplate}`);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (!this.nestedContentSelected && keyCode === key.KeyCode.Tab)
            return false;
        return super.handleKeyDown(evt);
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Down:
                this.moveToNextItem(true);
                return true;
            case key.KeyCode.Up:
                this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Home:
                this.focusFirstItem();
                return true;
            case key.KeyCode.End:
                this.focusLastItem();
                return true;
            case key.KeyCode.Right:
                if (hasPopup(this.selectedItemElement)) {
                    if (isExpanded(this.selectedItemElement))
                        this.moveToNextItem(true);
                    else
                        this.requestSubMenuOpen();
                }
                return true;
            case key.KeyCode.Left:
                if (isExpanded(this.selectedItemElement))
                    this.requestSubMenuClose();
                else {
                    const parentNode = this.getParentNode(this.selectedItemElement);
                    if (parentNode) {
                        this.updateSelectedItemByChildElement(parentNode);
                        this.focusSelectedItem();
                    }
                }
                return true;
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                this.doClick(this.selectedItemElement, evt);
                return true;
            default:
                return false;
        }
    }
    getParentNode(element) {
        var _a;
        const id = (_a = element.closest(`.${MenuCssClasses.menuItem}`)) === null || _a === void 0 ? void 0 : _a.getAttribute("id");
        if (id) {
            const parentId = this._itemIdToParentIdMap.get(id);
            if (parentId)
                return this.targetElement.querySelector(`#${parentId}${MenuItemSelector}`);
        }
        return null;
    }
    requestSubMenuOpen() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Expand));
    }
    requestSubMenuClose() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
    }
    handlePopupShown() {
        this._parentStrategy.onSubMenuShown(this);
    }
    handlePopupClosed() {
        this._parentStrategy.onSubMenuClosed(this);
    }
}

var SizeMode;
(function (SizeMode) {
    SizeMode[SizeMode["Small"] = 0] = "Small";
    SizeMode[SizeMode["Medium"] = 1] = "Medium";
    SizeMode[SizeMode["Large"] = 2] = "Large";
})(SizeMode || (SizeMode = {}));
let DxMenu = class DxMenu extends SingleSlotElementBase {
    constructor() {
        super();
        this._menuItems = [];
        this._sizeController = null;
        this._handlePromise = Promise.resolve();
        this._keyboardNavigator = null;
        this._hasVisibleItems = false;
        this.isVertical = false;
        this.isCollapsed = false;
        this.canCollapse = false;
        this.collapseToIcons = false;
        this.collapseToIconsAll = false;
        this.collapseToHamburgerMenu = false;
        this.loadMode = false;
        this._hasVisibleItems = false;
        this.sizeMode = SizeMode.Medium;
        this.isMobileMode = false;
        this._menuItemsChanged = false;
        this._firstUpdate = true;
        this._intersectionObserver = new IntersectionObserver(this.onItemsIntersectionChanged.bind(this), { root: this, threshold: [0, 1] });
        this.addEventListener(MenuItemConnectedEvent.eventName, (e) => {
            this.onItemConnected();
        });
    }
    onItemConnected() {
        this.updateItems();
    }
    onItemDisconnected() {
        this.updateItems();
    }
    get hasVisibleItems() {
        return this._hasVisibleItems;
    }
    set hasVisibleItems(value) {
        this._hasVisibleItems = value;
        if (value && this._menuItemsChanged)
            this.showMenuItems();
    }
    async showMenuItems() {
        var _a;
        this._menuItemsChanged = false;
        const currentWidth = this.offsetWidth;
        await ((_a = this._sizeController) === null || _a === void 0 ? void 0 : _a.initialize(this._menuItems, currentWidth));
        this.toggleItemsContainerCssClasses(MenuCssClasses.invisible, false);
        this.toggleItemsContainerCssClasses(MenuCssClasses.menuLoading, false);
    }
    updateItems(needToCollectItems = true) {
        this._menuItems = needToCollectItems ? this.collectMenuItems() : [];
        this._intersectionObserver.disconnect();
        this._menuItems.forEach(item => {
            item.menu = this;
            this._intersectionObserver.observe(item);
        });
        this._menuItemsChanged = true;
    }
    get root() { return this; }
    get items() { return this._menuItems; }
    get itemsOffset() { return this.calculateItemsOffset(); }
    restoreState() {
        DataQaUtils.setLoaded(this);
        if (!this.getAttribute("tabindex"))
            this.initializeKeyboardNavigatior();
    }
    connectedCallback() {
        super.connectedCallback();
        this._sizeController = new MenuItemsSizeController(this);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this._sizeController) === null || _a === void 0 ? void 0 : _a.dispose();
        this._sizeController = null;
        this._intersectionObserver.disconnect();
    }
    initializeKeyboardNavigatior() {
        this._keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this._keyboardNavigator)
            this._keyboardNavigator.initialize(this, this.createKeyboardStrategy(this._keyboardNavigator));
    }
    createKeyboardStrategy(navigator) {
        if (this.isMobileMode) {
            if (this.isVertical)
                return new DxMobileVerticalMenuKeyboardStrategy(navigator, this);
            else
                return new DxMobileHorizonalMenuKeyboardStrategy(navigator, this);
        }
        else {
            if (this.isVertical)
                return new DxVerticalMenuKeyboardStrategy(navigator, this);
            else
                return new DxHorizontalMenuKeyboardStrategy(navigator, this);
        }
    }
    async getUpdateComplete() {
        await this._handlePromise;
        return super.getUpdateComplete();
    }
    firstUpdated() {
        this._firstUpdate = false;
    }
    willUpdate(changedProperties) {
        this._handlePromise = this.handleChangedProperties(changedProperties, this._firstUpdate);
    }
    async handleChangedProperties(changedProperties, firstUpdate) {
        var _a;
        if (this.anyOf(changedProperties, "isMobileMode", "isVertical"))
            this.initializeKeyboardNavigatior();
        if (this.anyOf(changedProperties, "canCollapse", "isCollapsed", "isVertical")) {
            const needToCollectItems = !this.isCollapsed;
            this.updateItems(needToCollectItems);
        }
        if (!firstUpdate && this.canCollapse && changedProperties.has("sizeMode")) {
            if (!this.isCollapsed) {
                this._menuItemsChanged = true;
                this.toggleItemsContainerCssClasses(MenuCssClasses.invisible, true);
            }
            await ((_a = this._sizeController) === null || _a === void 0 ? void 0 : _a.initialize(this._menuItems));
        }
        if (this.hasVisibleItems)
            await this.showMenuItems();
    }
    onCollapseChanged(collapsed) {
        this.dispatchEvent(new MenuCollapseChangedEvent(collapsed));
    }
    anyOf(changedProperties, ...properties) {
        for (const property of properties) {
            if (changedProperties.has(property))
                return true;
        }
        return false;
    }
    collectMenuItems() {
        const items = this.querySelectorAll(`:scope ${MenuConstants.menuItemComponentName}`);
        const result = [];
        if (items)
            items.forEach(item => result.push(item));
        return result;
    }
    onItemsIntersectionChanged(entries) {
        entries.forEach(entry => entry.target.isVisible = entry.isIntersecting);
        this.hasVisibleItems = this._menuItems.filter(menuItem => menuItem.isVisible).length > 0;
    }
    toggleItemsContainerCssClasses(cssClass, value) {
        const element = this.querySelector(MenuConstants.menuItemsContainerSelector);
        if (element)
            requestAnimationFrame(() => element.classList.toggle(cssClass, value));
    }
    calculateItemsOffset() {
        const ul = this.querySelector(MenuConstants.menuItemsContainerSelector);
        if (!ul)
            return 0;
        return ul.offsetLeft - this.offsetLeft;
    }
};
__decorate([
    n({ type: Boolean, attribute: "is-vertical" })
], DxMenu.prototype, "isVertical", void 0);
__decorate([
    n({ type: Boolean, attribute: "is-collapsed" })
], DxMenu.prototype, "isCollapsed", void 0);
__decorate([
    n({ type: Boolean, attribute: "can-collapse" })
], DxMenu.prototype, "canCollapse", void 0);
__decorate([
    n({ type: Boolean, attribute: "collapse-to-icons" })
], DxMenu.prototype, "collapseToIcons", void 0);
__decorate([
    n({ type: Boolean, attribute: "collapse-to-icons-all" })
], DxMenu.prototype, "collapseToIconsAll", void 0);
__decorate([
    n({ type: Boolean, attribute: "collapse-to-hamburger-menu" })
], DxMenu.prototype, "collapseToHamburgerMenu", void 0);
__decorate([
    n({ type: Boolean, attribute: "load-mode" })
], DxMenu.prototype, "loadMode", void 0);
__decorate([
    n({ type: SizeMode, attribute: "size-mode" })
], DxMenu.prototype, "sizeMode", void 0);
__decorate([
    n({ type: Boolean, attribute: "data-dx-menu-mobile" })
], DxMenu.prototype, "isMobileMode", void 0);
DxMenu = __decorate([
    e(MenuConstants.menuComponentName)
], DxMenu);
const dependentTypes = [DxMenuItem, DxMenuNavbar];
function loadModule() { }
const dxMenu = { loadModule };

export { DxMenu, dxMenu as default, dependentTypes };
//# sourceMappingURL=dx-menu-24.2.js.map
