import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './dx-license-24.2.js';

var CheckState;
(function (CheckState) {
    CheckState[CheckState["Indeterminate"] = 0] = "Indeterminate";
    CheckState[CheckState["Checked"] = 1] = "Checked";
    CheckState[CheckState["Unchecked"] = 2] = "Unchecked";
})(CheckState || (CheckState = {}));
const DxCheckBoxTagName = "dxbl-check";
var CheckInternalAttributes;
(function (CheckInternalAttributes) {
    CheckInternalAttributes["checkState"] = "check-state";
    CheckInternalAttributes["allowIndeterminateStateByClick"] = "allow-indeterminate-state-by-click";
    CheckInternalAttributes["isReadOnly"] = "is-read-only";
})(CheckInternalAttributes || (CheckInternalAttributes = {}));
class DxCheckInternal extends DxHTMLElementBase {
    constructor() {
        super(...arguments);
        this._checkState = CheckState.Unchecked;
        this._allowIndeterminateStateByClick = false;
        this._isReadOnly = false;
        this.boundOnInputChangeHandler = this.onInputChange.bind(this);
        this.boundOnInputClickHandler = this.onInputClick.bind(this);
    }
    get checkState() {
        return this._checkState;
    }
    set checkState(value) {
        this._checkState = value;
        this.applyCheckStateToInputElement();
    }
    get allowIndeterminateStateByClick() {
        return this._allowIndeterminateStateByClick;
    }
    set allowIndeterminateStateByClick(value) {
        this._allowIndeterminateStateByClick = value;
    }
    get isReadOnly() {
        return this._isReadOnly;
    }
    set isReadOnly(value) {
        this._isReadOnly = value;
    }
    initializeComponent() {
        super.initializeComponent();
        this.getInputElement().addEventListener("change", this.boundOnInputChangeHandler);
        this.getInputElement().addEventListener("click", this.boundOnInputClickHandler);
    }
    disposeComponent() {
        var _a, _b;
        (_a = this.getInputElement()) === null || _a === void 0 ? void 0 : _a.removeEventListener("change", this.boundOnInputChangeHandler);
        (_b = this.getInputElement()) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this.boundOnInputClickHandler);
        super.disposeComponent();
    }
    getInputElement() {
        return this.querySelector("input");
    }
    get value() {
        if (this.checkState === CheckState.Indeterminate)
            return "";
        return Boolean(this.checkState === CheckState.Checked).toString();
    }
    getNextCheckState() {
        let nextState = this.checkState + 1;
        if (nextState > CheckState.Unchecked)
            nextState = this.allowIndeterminateStateByClick ? CheckState.Indeterminate : CheckState.Checked;
        return nextState;
    }
    onInputChange(e) {
        if (this.isReadOnly) {
            e.stopImmediatePropagation();
            return;
        }
        this.checkState = this.getNextCheckState();
        this.applyCheckStateToInputElement();
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    onInputClick(e) {
        if (this.isReadOnly)
            e.preventDefault();
    }
    applyCheckStateToInputElement() {
        const input = this.getInputElement();
        if (!input)
            return;
        input.indeterminate = this.checkState === CheckState.Indeterminate;
        input.checked = this.checkState === CheckState.Checked;
    }
    static get observedAttributes() {
        return [
            CheckInternalAttributes.checkState,
            CheckInternalAttributes.allowIndeterminateStateByClick,
            CheckInternalAttributes.isReadOnly
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case CheckInternalAttributes.checkState:
                this.checkState = Number(newVal);
                break;
            case CheckInternalAttributes.allowIndeterminateStateByClick:
                this.allowIndeterminateStateByClick = newVal !== null;
                break;
            case CheckInternalAttributes.isReadOnly:
                this.isReadOnly = newVal !== null;
                break;
        }
    }
}
customElements.define(DxCheckBoxTagName, DxCheckInternal);
function loadModule() { }
const dxCheckInternal = { loadModule };

export { CheckInternalAttributes, CheckState, DxCheckBoxTagName, DxCheckInternal, dxCheckInternal as default };
//# sourceMappingURL=dx-check-internal-24.2.js.map
