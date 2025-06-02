import { _ as __decorate } from './tslib.es6-24.2.js';
import { DxDropDownBase } from './dropdown-24.2.js';
import { o as ItemListDropDownKeyboardStrategy } from './popup-24.2.js';
import { r as registeredComponents } from './dropdowncomponents-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './thumb-24.2.js';
import './point-24.2.js';
import './data-qa-utils-24.2.js';
import './eventhelper-24.2.js';
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './layouthelper-24.2.js';
import './constants-24.2.js';
import './custom-events-helper-24.2.js';
import './query-24.2.js';
import './lit-element-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './string-24.2.js';
import './devices-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';

registeredComponents;
var ItemListDropdownWindowAlignment;
(function (ItemListDropdownWindowAlignment) {
    ItemListDropdownWindowAlignment["Left"] = "left";
    ItemListDropdownWindowAlignment["Right"] = "right";
    ItemListDropdownWindowAlignment["FitPositionTarget"] = "fitpositiontarget";
})(ItemListDropdownWindowAlignment || (ItemListDropdownWindowAlignment = {}));
let DxItemListDropDown = class DxItemListDropDown extends DxDropDownBase {
    constructor() {
        super(...arguments);
        this.windowAlignment = ItemListDropdownWindowAlignment.Left;
    }
    get dropFromRight() {
        return this.windowAlignment === ItemListDropdownWindowAlignment.Right;
    }
    createKeyboardNavigationStrategy() {
        return new ItemListDropDownKeyboardStrategy(this.keyboardNavigator, this);
    }
};
__decorate([
    n({ type: String, attribute: "window-alignment" })
], DxItemListDropDown.prototype, "windowAlignment", void 0);
DxItemListDropDown = __decorate([
    e("dxbl-itemlist-dropdown")
], DxItemListDropDown);
//# sourceMappingURL=dxbl-itemlistdropdown-24.2.js.map
