import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxPortal } from './portal-24.2.js';
import { c as isIPopupClientSideApi, a as isIPopupBaseClientSideApi } from './logicaltreehelper-24.2.js';
import { e } from './custom-element-24.2.js';

const DxPopupPortalTagName = "dxbl-popup-portal";
let DxPopupPortal = class DxPopupPortal extends DxPortal {
    get popup() {
        var _a;
        // eslint-disable-next-line no-restricted-syntax
        for (const item of (_a = this.portable) !== null && _a !== void 0 ? _a : []) {
            if (isIPopupClientSideApi(item))
                return item;
        }
        return null;
    }
    get popupBase() {
        var _a;
        // eslint-disable-next-line no-restricted-syntax
        for (const item of (_a = this.portable) !== null && _a !== void 0 ? _a : []) {
            if (isIPopupBaseClientSideApi(item))
                return item;
        }
        return null;
    }
};
DxPopupPortal = __decorate([
    e(DxPopupPortalTagName)
], DxPopupPortal);

export { DxPopupPortalTagName as D };
//# sourceMappingURL=popupportal-24.2.js.map
