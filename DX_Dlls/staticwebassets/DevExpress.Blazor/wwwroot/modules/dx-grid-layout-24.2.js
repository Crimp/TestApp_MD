import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { D as DxGridLayoutElementBase, a as DxGridLayoutRootElementBase } from './dx-grid-layout-element-base-24.2.js';
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
import './property-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './custom-events-helper-24.2.js';

let DxGridLayoutItem = class DxGridLayoutItem extends DxGridLayoutElementBase {
    createRenderRoot() {
        return this;
    }
};
DxGridLayoutItem = __decorate([
    e(DxTagNames.GridLayoutItem)
], DxGridLayoutItem);
let DxGridLayoutRoot = class DxGridLayoutRoot extends DxGridLayoutRootElementBase {
};
DxGridLayoutRoot = __decorate([
    e(DxTagNames.GridLayoutRoot)
], DxGridLayoutRoot);
let DxGridLayout = class DxGridLayout extends SingleSlotElementBase {
};
DxGridLayout = __decorate([
    e(DxTagNames.GridLayout)
], DxGridLayout);

export { DxGridLayout, DxGridLayoutItem, DxGridLayoutRoot };
//# sourceMappingURL=dx-grid-layout-24.2.js.map
