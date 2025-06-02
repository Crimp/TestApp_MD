import { _ as __decorate } from './tslib.es6-24.2.js';
import { b as DxTextEditorAttributes, c as DxTextEditor, d as FocusInEvent, e as FocusOutEvent, I as InputKeyboardEvent, T as TextEditCssClasses } from './text-editor-24.2.js';
import { t as textInputTagName } from './constants-24.23.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { s } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';

class InputRootKbdStrategy extends KeyboardNavigationStrategy {
    constructor(editor) {
        super(editor.getKeyboardNavigator(), editor);
        this._editor = editor;
    }
    queryItems() {
        const result = [];
        if (this._editor.editBoxElement)
            result.push(this._editor.editBoxElement);
        const focusableElements = FocusUtils.findFocusableElements(this._editor).filter(x => x !== this._editor.editBoxElement);
        focusableElements.forEach(element => result.push(element));
        return result;
    }
    activate() {
        const activeElement = document.activeElement;
        if (activeElement && this._editor.editBoxElement && this._editor.editBoxElement.contains(activeElement))
            return;
        super.activate();
    }
}

var InputEditorAttributes;
(function (InputEditorAttributes) {
    InputEditorAttributes["isDisplayFormatDefined"] = "is-display-format-defined";
    InputEditorAttributes["isPassword"] = "is-password";
    InputEditorAttributes["needSelection"] = "need-selection";
})(InputEditorAttributes || (InputEditorAttributes = {}));
const DxInputEditorAttributes = { ...InputEditorAttributes, ...DxTextEditorAttributes };
let DxInputEditor = class DxInputEditor extends DxTextEditor {
    constructor() {
        super(...arguments);
        this.selectionRequested = false;
        this.boundOnInputFocusHandler = this.onInputFocusIn.bind(this);
        this.boundOnInputFocusOutHandler = this.onInputFocusOut.bind(this);
        this.boundOnBeforeInputHandler = this.onBeforeInput.bind(this);
        this.boundOnInputKeyUpHandler = this.onInputKeyUp.bind(this);
        this.needSelection = false;
        this.isDisplayFormatDefined = false;
        this.isPassword = false;
    }
    get shouldProcessFocusIn() {
        return this.isDisplayFormatDefined || this.selectionRequested;
    }
    get shouldProcessFocusOut() {
        return this.isDisplayFormatDefined;
    }
    get shouldProcessEnter() {
        return false;
    }
    get inputElement() {
        return this.fieldElement;
    }
    get shouldProcessFieldTextVersion() {
        return !this.isPassword && super.shouldProcessFieldTextVersion;
    }
    onFieldReady(field, firstInit) {
        field.addEventListener("keyup", this.boundOnInputKeyUpHandler);
        field.addEventListener("beforeinput", this.boundOnBeforeInputHandler);
        field.addEventListener("focusin", this.boundOnInputFocusHandler);
        field.addEventListener("focusout", this.boundOnInputFocusOutHandler);
        this.initializeKeyboardNavigator();
        super.onFieldReady(field, firstInit);
        if (firstInit && this.focused)
            this.onInputFocusIn();
    }
    onTemplateWithoutInputReady(templateElement) {
        super.onTemplateWithoutInputReady(templateElement);
        templateElement.addEventListener("focusin", this.boundOnInputFocusHandler);
        templateElement.addEventListener("focusout", this.boundOnInputFocusOutHandler);
        templateElement.addEventListener("keyup", this.boundOnInputKeyUpHandler);
        this.initializeKeyboardNavigator();
    }
    onInputFocusIn() {
        if (this.shouldProcessFocusIn)
            this.processFocusIn();
    }
    onInputFocusOut(e) {
        if (this.shouldProcessFocusOut)
            this.processFocusOut(e);
    }
    onInputKeyUp(e) {
        if (!this.isReadOnly)
            this.processKeyUp(e);
    }
    onBeforeInput(e) {
        this.processBeforeInput(e);
    }
    processKeyUp(_) {
        return false;
    }
    processFocusIn() {
        if (this.fieldElement) {
            const needSelection = this.selectionRequested || this.focused && this.isAllSelected();
            this.raiseFocusIn(needSelection);
            this.selectionRequested = false;
        }
        else if (this.editBoxTemplateElement)
            this.raiseFocusIn(false);
    }
    processFocusOut(_) {
        this.raiseFocusOut(this.fieldElementValue);
    }
    processBeforeInput(_) {
        return false;
    }
    raiseFocusIn(needSelection) {
        this.dispatchEvent(new FocusInEvent(needSelection));
    }
    raiseFocusOut(text, tabKey) {
        this.dispatchEvent(new FocusOutEvent(text, tabKey));
    }
    raiseKeyDown(e) {
        this.dispatchEvent(new InputKeyboardEvent(e));
    }
    getFieldElement() {
        return this.querySelector(`[parent-id="${this.id}"].${TextEditCssClasses.TextEditInput}`);
    }
    selectInputText(selectionStart, selectionEnd) {
        if (!this.fieldElement)
            return;
        this.fieldElement.setSelectionRange(selectionStart, selectionEnd);
    }
    selectAll() {
        if (this.fieldElement && this.focused)
            this.fieldElement.select();
    }
    onPasswordChanged() {
        if (this.isPassword)
            this.fieldElementValue = "";
    }
    updated(changed) {
        super.updated(changed);
        if (this.rendered && changed.has("isPassword"))
            this.onPasswordChanged();
        if (this.rendered && changed.has("needSelection") && this.needSelection)
            this.selectAll();
    }
    focusAndSelectAll() {
        var _a;
        this.selectionRequested = true;
        (_a = this.fieldElement) === null || _a === void 0 ? void 0 : _a.focus();
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, this.createKeyboardStrategy());
    }
    createKeyboardStrategy() {
        return new InputRootKbdStrategy(this);
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
    // do not delete this method! neeed it for programmatic focus of the editors
    focus(options) {
        var _a;
        (_a = this.fieldElement) === null || _a === void 0 ? void 0 : _a.focus(options);
    }
};
DxInputEditor.shadowRootOptions = { ...s.shadowRootOptions, delegatesFocus: true };
__decorate([
    n({ type: Boolean, attribute: InputEditorAttributes.needSelection })
], DxInputEditor.prototype, "needSelection", void 0);
__decorate([
    n({ type: Boolean, attribute: InputEditorAttributes.isDisplayFormatDefined })
], DxInputEditor.prototype, "isDisplayFormatDefined", void 0);
__decorate([
    n({ type: Boolean, attribute: InputEditorAttributes.isPassword })
], DxInputEditor.prototype, "isPassword", void 0);
DxInputEditor = __decorate([
    e(textInputTagName)
], DxInputEditor);
function loadModule() { }
const input = { loadModule };

const input$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DxInputEditorAttributes,
    get DxInputEditor () { return DxInputEditor; },
    default: input
});

export { DxInputEditorAttributes as D, InputRootKbdStrategy as I, DxInputEditor as a, input$1 as i };
//# sourceMappingURL=input-24.2.js.map
