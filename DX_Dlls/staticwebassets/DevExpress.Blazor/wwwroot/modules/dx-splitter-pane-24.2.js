import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
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

let DxSplitterPane = class DxSplitterPane extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.forceIsFlexible = false;
        this.minSize = null;
        this.maxSize = null;
    }
    get size() {
        return this.style.flexBasis;
    }
    set size(size) {
        if (this.forceIsFlexible)
            size = "";
        this.style.flex = size ? `0 0 ${size}` : "";
    }
    updated(props) {
        super.updated(props);
        if (props.has("forceIsFlexible")) {
            if (this.forceIsFlexible)
                this.size = "";
        }
    }
};
__decorate([
    n({ type: Boolean, attribute: "force-flexible" })
], DxSplitterPane.prototype, "forceIsFlexible", void 0);
__decorate([
    n({ type: String, attribute: "min-size" })
], DxSplitterPane.prototype, "minSize", void 0);
__decorate([
    n({ type: String, attribute: "max-size" })
], DxSplitterPane.prototype, "maxSize", void 0);
DxSplitterPane = __decorate([
    e(DxTagNames.SplitterPane)
], DxSplitterPane);

export { DxSplitterPane };
//# sourceMappingURL=dx-splitter-pane-24.2.js.map
