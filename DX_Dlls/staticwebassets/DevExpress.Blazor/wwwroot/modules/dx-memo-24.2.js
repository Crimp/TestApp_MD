import { _ as __decorate } from './tslib.es6-24.2.js';
import { c as DxTextEditor } from './text-editor-24.2.js';
import { h as memoTagName } from './constants-24.23.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { e } from './custom-element-24.2.js';
import './single-slot-element-base-24.2.js';
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
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './focus-utils-24.2.js';
import './key-24.2.js';
import './disposable-24.2.js';

class MemoCssClasses {
}
MemoCssClasses.Memo = CssClasses.Prefix + "-memo-edit";
let DxMemoEditor = class DxMemoEditor extends DxTextEditor {
    constructor() {
        super();
        this.textAreaObserver = new MutationObserver(this.textAreaSizeChanged.bind(this));
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        const inputElement = this.getFieldElement();
        if (inputElement)
            this.textAreaObserver.observe(inputElement, { attributes: true });
    }
    disconnectedCallback() {
        this.textAreaObserver.disconnect();
        super.disconnectedCallback();
    }
    textAreaSizeChanged(r, __) {
        var _a, _b;
        const textArea = r[0].target;
        const textAreaWidth = parseInt(textArea.style.width);
        if (!isNaN(textAreaWidth)) {
            const newWidth = this.offsetWidth - this.clientWidth + textAreaWidth;
            if (this.offsetWidth !== newWidth)
                this.style.width = newWidth + "px";
        }
        const textAreaInlineHeight = parseInt(textArea.style.height);
        if (!isNaN(textAreaInlineHeight)) {
            const textAreaMinHeight = parseInt(getComputedStyle(textArea).minHeight);
            const textAreaHeight = textAreaInlineHeight >= textAreaMinHeight ? textAreaInlineHeight : textAreaMinHeight;
            const bottomAreaHeight = (_b = (_a = this.getButtonsArea()) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
            const newHeight = this.offsetHeight - this.clientHeight + textAreaHeight + bottomAreaHeight;
            if (this.offsetHeight !== newHeight)
                this.style.height = newHeight + "px";
        }
    }
    get shouldForceInputOnEnter() { return false; }
    getFieldElement() {
        return this.querySelector("textarea");
    }
    getButtonsArea() {
        return this.querySelector(".dxbl-memo-edit-buttons-area");
    }
};
DxMemoEditor = __decorate([
    e(memoTagName)
], DxMemoEditor);
function loadModule() { }
const dxMemo = { loadModule };

export { DxMemoEditor, MemoCssClasses, dxMemo as default };
//# sourceMappingURL=dx-memo-24.2.js.map
