import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { D as DxToolbarRootKeyboardStrategy, R as RibbonCssClasses } from './constants-24.26.js';
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
import './key-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './focushelper-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './css-classes-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './devices-24.2.js';
import './menu-keyboard-strategy-24.2.js';
import './popup-24.2.js';
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
import './constants-24.24.js';
import './constants-24.25.js';
import './modal-keyboard-strategy-24.2.js';
import './dropdown-menu-keyboard-strategy-24.2.js';

let RibbonComponent = class RibbonComponent extends SingleSlotElementBase {
    constructor() {
        super();
        this._keyboardNavigator = null;
        this.loading = false;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("loading") && !this.loading)
            this.initializeNavigator();
    }
    initializeNavigator() {
        if (!this._keyboardNavigator)
            this._keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (!this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new DxToolbarRootKeyboardStrategy(this._keyboardNavigator, this));
    }
};
__decorate([
    n({ type: Boolean, attribute: "loading" })
], RibbonComponent.prototype, "loading", void 0);
RibbonComponent = __decorate([
    e(RibbonCssClasses.Ribbon)
], RibbonComponent);
const RibbonComponent$1 = RibbonComponent;

export { RibbonComponent$1 as default };
//# sourceMappingURL=dx-ribbon-24.2.js.map
