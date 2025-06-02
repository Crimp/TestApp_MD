import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { s as stringToEnumConverter } from './enumConverter-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
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

var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation || (Orientation = {}));

let DxSplitter = class DxSplitter extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this._orientation = null;
    }
    get isVertical() {
        return this._orientation === Orientation.Vertical;
    }
};
__decorate([
    n({ type: Orientation, converter: stringToEnumConverter(Orientation), attribute: "orientation" })
], DxSplitter.prototype, "_orientation", void 0);
DxSplitter = __decorate([
    e(DxTagNames.Splitter)
], DxSplitter);

export { DxSplitter };
//# sourceMappingURL=dx-splitter-24.2.js.map
