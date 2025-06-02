import { k as key } from './key-24.2.js';
import { D as DxDropDownMenuOwnerKeyboardStrategy, M as MenuItem, c as containsFocus, d as DropDownActionRequestEvent, e as DropDownAction } from './menu-keyboard-strategy-24.2.js';
import { D as DxToolbarDropDownRootMenuKeyboardStrategy, a as DxToolbarModalRootKeyboardStrategy } from './modal-keyboard-strategy-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';

const ToolbarRootSelector = ":scope > .dxbl-btn-toolbar:not(.dxbl-virtual-toolbar)";
const ToolbarItemSelectors = [
    ".dxbl-btn:not([disabled]):not(.dxbl-toolbar-hidden-item)",
    ".dxbl-btn-split:not(.dxbl-toolbar-hidden-item) > .dxbl-btn:not([disabled])"
];
const ToolbarItemSelector = [
    ...ToolbarItemSelectors.map(selector => `${ToolbarRootSelector} .dxbl-toolbar-item[visible]:not(.dxbl-toolbar-edit) > ${selector}`),
    `${ToolbarRootSelector} .dxbl-toolbar-btn-ellipsis[visible]:not([disabled]):not(.dxbl-toolbar-hidden-item) > .dxbl-btn`,
    `${ToolbarRootSelector} .dxbl-toolbar-item[visible].dxbl-toolbar-edit:has(.dxbl-text-edit:not(.dxbl-disabled))`,
    `${ToolbarRootSelector} .dxbl-toolbar-item[visible].dxbl-toolbar-item-tmpl:not(.dxbl-toolbar-edit)`,
    `${ToolbarRootSelector} .dxbl-toolbar-title`
].join(",");
// TODO list:
// 1. move hasClass to common utils
// 2. use shortcut aproach to perform actions on the server
class DxToolbarRootKeyboardStrategy extends DxDropDownMenuOwnerKeyboardStrategy {
    queryItems() {
        return this.queryItemsBySelector(ToolbarItemSelector);
    }
    getShortcutContext() {
        return { itemIndex: this.selectedItemIndex };
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Right:
                if (!this.subMenuStrategy)
                    this.moveToNextItem(true);
                return true;
            case key.KeyCode.Left:
                if (!this.subMenuStrategy)
                    this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Home:
                this.selectItem(0);
                return true;
            case key.KeyCode.End:
                this.selectItem(this.itemCount - 1);
                return true;
            case key.KeyCode.Up:
                if (evt.altKey && !evt.shiftKey) {
                    if (this.isMenuExpanded()) {
                        this.requestSubMenuClose();
                        return true;
                    }
                }
                else if (this.subMenuStrategy) {
                    this.subMenuStrategy.focusLastItem();
                    return true;
                }
                return false;
            case key.KeyCode.Down:
                if (evt.altKey && !evt.shiftKey) {
                    if (this.hasMenu()) {
                        this.requestSubMenuOpen();
                        this.focusSubMenuItemAsync(MenuItem.First);
                        return true;
                    }
                }
                else if (this.subMenuStrategy) {
                    this.subMenuStrategy.focusFirstItem();
                    return true;
                }
                return false;
            case key.KeyCode.Tab:
                if (!this.nestedContentSelected) {
                    this.requestSubMenuClose();
                    return super.handleTabKeyDown(evt);
                }
                return false;
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                if (this.hasMenu())
                    this.focusSubMenuItemAsync(MenuItem.First);
                return false;
            default:
                return false;
        }
    }
    focusSubMenuItemAsync(item) {
        this.shouldRestoreFocus = containsFocus(this.targetElement);
        return super.focusSubMenuItemAsync(item);
    }
    requestSubMenuOpen() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Expand));
    }
    requestSubMenuClose() {
        var _a;
        (_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new DropDownActionRequestEvent(DropDownAction.Collapse));
    }
    createPopupStrategy(navigator, targetElement) {
        return new DxToolbarDropDownRootMenuKeyboardStrategy(navigator, targetElement, this);
    }
    createModalStrategy(navigator, targetElement) {
        return new DxToolbarModalRootKeyboardStrategy(navigator, targetElement, this);
    }
}

class RibbonCssClasses {
}
RibbonCssClasses.Ribbon = CssClasses.Prefix + "-ribbon";

export { DxToolbarRootKeyboardStrategy as D, RibbonCssClasses as R };
//# sourceMappingURL=constants-24.26.js.map
