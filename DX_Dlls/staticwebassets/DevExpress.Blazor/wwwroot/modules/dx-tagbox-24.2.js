import { _ as __decorate } from './tslib.es6-24.2.js';
import { DxComboBox } from './dx-combobox-24.2.js';
import { k as key } from './key-24.2.js';
import { g as tagBoxTagName } from './constants-24.23.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './adaptivedropdowncomponents-24.2.js';
import './dropdowncomponents-24.2.js';
import './dropdown-24.2.js';
import './popup-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './lit-element-24.2.js';
import './eventhelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
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
import './custom-events-helper-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './thumb-24.2.js';
import './query-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';
import './modalcomponents-24.2.js';
import './dx-dropdown-base3-24.2.js';
import './masked-input-24.2.js';
import './text-editor-24.2.js';
import './single-slot-element-base-24.2.js';
import './input-24.2.js';
import './constants-24.25.js';
import './dx-listbox-24.2.js';

let DxTagBox = class DxTagBox extends DxComboBox {
    constructor() {
        super();
        this.customTagsEnable = false;
        this.inputValue = "";
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    onTextInput(evt) {
        const input = evt.target;
        this.inputValue = input.value;
        this.fitInputWidth();
        super.onTextInput(evt);
    }
    processFocusOut(evt) {
        var _a;
        if (!this.inputElement)
            return;
        const text = (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.value;
        const inputHasValue = text && text !== "";
        super.processFocusOut(evt);
        if (!this.focused && inputHasValue)
            this.setInputValue("");
    }
    fitInputWidth() {
        if (!this.inputElement)
            return;
        const inputLength = this.inputValue.length;
        this.inputElement.setAttribute("size", inputLength === 0 ? "1" : inputLength.toString());
    }
    forceInputValue(value, highlight) {
        this.setInputValue(value);
        if (highlight)
            this.highlightInputText();
    }
    highlightInputText() {
        if (this.inputElement)
            this.inputElement.select();
    }
    applyTextPropertyCore() {
        // TODO: remove
        // this.fieldElementValue = this.fieldText;
    }
    processKeyDownServerCommand(evt) {
        if (this.isKeyDownPreventingDefaultNeeded(evt))
            evt.preventDefault();
        return super.processKeyDownServerCommand(evt);
    }
    isKeyDownPreventingDefaultNeeded(evt) {
        var _a;
        if (evt.keyCode !== key.KeyCode.Enter)
            return false;
        const inputText = (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.value;
        if (!inputText || inputText.length === 0)
            return false;
        return true;
    }
    requireSendKeyCommandToServer(evt) {
        if (super.requireSendKeyCommandToServer(evt))
            return true;
        switch (evt.keyCode) {
            case key.KeyCode.Esc:
                return true;
            case key.KeyCode.Backspace:
                return !this.inputElement || this.inputElement.value.length === 0;
        }
        return false;
    }
    setInputValue(newValue) {
        if (this.inputElement) {
            this.inputElement["value"] = newValue;
            if (!newValue || newValue === "")
                this.inputValue = this.inputElement.placeholder;
            else
                this.inputValue = newValue;
        }
        this.fitInputWidth();
    }
};
__decorate([
    n({ type: Boolean, attribute: "custom-tags-enable" })
], DxTagBox.prototype, "customTagsEnable", void 0);
DxTagBox = __decorate([
    e(tagBoxTagName)
], DxTagBox);
function forceInputValue(tagBox, value, highlight) {
    tagBox.forceInputValue(value, highlight);
}
const dxTagbox = { loadModule, forceInputValue };
function loadModule() { }

export { dxTagbox as default, forceInputValue };
//# sourceMappingURL=dx-tagbox-24.2.js.map
