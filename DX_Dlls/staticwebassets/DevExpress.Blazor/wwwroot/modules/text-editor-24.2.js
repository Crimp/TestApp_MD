import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { t as textInputTagName } from './constants-24.23.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { g as getDeviceInfo } from './devices-24.2.js';
import { d as dom } from './dom-24.2.js';
import { isFocusableElement } from './focus-utils-24.2.js';
import { n } from './property-24.2.js';

class FocusInEvent extends CustomEvent {
    constructor(needSelection) {
        super(FocusInEvent.eventName, {
            detail: new FocusInEventContext(needSelection),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
FocusInEvent.eventName = textInputTagName + ".focusin";
class FocusOutEvent extends CustomEvent {
    constructor(text, tabKey) {
        super(FocusOutEvent.eventName, {
            detail: new FocusOutEventContext(text, tabKey),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
FocusOutEvent.eventName = textInputTagName + ".focusout";
class InputKeyboardEvent extends CustomEvent {
    constructor(detail) {
        super(InputKeyboardEvent.eventName, {
            detail: detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
InputKeyboardEvent.eventName = textInputTagName + ".keydown";
class BeforeInputEvent extends CustomEvent {
    constructor(detail) {
        super(BeforeInputEvent.eventName, {
            detail: detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
BeforeInputEvent.eventName = textInputTagName + ".beforeinput";
class FocusInEventContext {
    constructor(needSelection) {
        this.NeedSelection = needSelection;
    }
}
class FocusOutEventContext {
    constructor(text, tabKey) {
        this.Text = text;
        this.TabKey = tabKey;
    }
}
class EditorTextChangeEventContext {
    constructor(text) {
        this.Text = text;
    }
}
class EditorTextInputEventContext extends EditorTextChangeEventContext {
    constructor(text, version) {
        super(text);
        this.Version = version;
    }
}
class EditorTextInputEvent extends CustomEvent {
    constructor(text, version) {
        super(EditorTextInputEvent.eventName, {
            detail: new EditorTextInputEventContext(text, version),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
EditorTextInputEvent.eventName = textInputTagName + ".textinput";
class EditorTextChangeEvent extends CustomEvent {
    constructor(text) {
        super(EditorTextChangeEvent.eventName, {
            detail: new EditorTextChangeEventContext(text),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
EditorTextChangeEvent.eventName = textInputTagName + ".textchange";
CustomEventsHelper.register(EditorTextInputEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(EditorTextChangeEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(FocusInEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(FocusOutEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(InputKeyboardEvent.eventName, x => {
    const e = x.detail;
    return {
        "Key": e.key,
        "Code": e.code,
        "CtrlKey": e.ctrlKey,
        "AltKey": e.altKey,
        "ShiftKey": e.shiftKey,
        "MetaKey": e.metaKey
    };
});
CustomEventsHelper.register(BeforeInputEvent.eventName, x => {
    const e = x.detail;
    return {
        "InputType": e.inputType,
        "Text": e.data,
    };
});

class DeferredAction {
    get hasAction() {
        return !!this.handle;
    }
    constructor(timeout) {
        this.action = null;
        this.handle = null;
        this.timeout = 0;
        this.timeout = timeout;
    }
    execute(action) {
        this.cancel();
        this.action = action;
        this.handle = setTimeout(() => {
            var _a;
            (_a = this.action) === null || _a === void 0 ? void 0 : _a.call(this);
            this.handle = null;
            this.action = null;
        }, this.timeout);
    }
    forceExecute() {
        if (!this.hasAction)
            return;
        const action = this.action;
        this.cancel();
        if (action)
            action();
    }
    cancel() {
        if (!this.hasAction)
            return;
        if (this.handle) {
            clearTimeout(this.handle);
            this.action = null;
            this.handle = null;
        }
    }
}

var DxTextEditorAttributes;
(function (DxTextEditorAttributes) {
    DxTextEditorAttributes["inputText"] = "field-text";
    DxTextEditorAttributes["inputTextVersion"] = "field-text-version";
    DxTextEditorAttributes["bindValueMode"] = "bind-value-mode";
    DxTextEditorAttributes["fieldInputDelay"] = "field-input-delay";
    DxTextEditorAttributes["customPlaceholder"] = "custom-placeholder";
})(DxTextEditorAttributes || (DxTextEditorAttributes = {}));
var BindValueMode;
(function (BindValueMode) {
    BindValueMode["OnLostFocus"] = "OnLostFocus";
    BindValueMode["OnInput"] = "OnInput";
    BindValueMode["OnDelayedInput"] = "OnDelayedInput";
})(BindValueMode || (BindValueMode = {}));
var EditBoxState;
(function (EditBoxState) {
    EditBoxState["WithoutTemplate"] = "WithoutTemplate";
    EditBoxState["WithTemplate"] = "WithTemplate";
    EditBoxState["WithEditableTemplate"] = "WithEditableTemplate";
})(EditBoxState || (EditBoxState = {}));
const DEFAULT_INPUT_DELAY = 500;
class TextEditCssClasses {
}
TextEditCssClasses.TextEdit = CssClasses.Prefix + "-text-edit";
TextEditCssClasses.ClearButton = CssClasses.Prefix + "-edit-btn-clear";
TextEditCssClasses.EditBoxTemplate = CssClasses.Prefix + "-text-edit-template";
TextEditCssClasses.TextEditInput = CssClasses.Prefix + "-text-edit-input";
TextEditCssClasses.EditorButton = CssClasses.Prefix + "-text-edit-btn";
class DxTextEditor extends SingleSlotElementBase {
    constructor() {
        super();
        this.fieldText = "";
        this.fieldTextVersion = -1;
        this.fieldInputDelay = 500;
        this.bindValueMode = BindValueMode.OnLostFocus;
        this.isReadOnly = false;
        this.placeholder = "";
        this.boundOnInputInputHandler = this.onTextInput.bind(this);
        this.boundOnInputChangeHandler = this.onTextChange.bind(this);
        this.boundOnInputKeyDownHandler = this.onInputKeyDown.bind(this);
        this.boundOnPointerDownHandler = this.onPointerDown.bind(this);
        this.inputDelayDeferredAction = new DeferredAction(DEFAULT_INPUT_DELAY);
        this._fieldTextHistory = {};
        this._fieldInitialized = false;
        this._fieldTextVersion = -1;
        this._isMobileDevice = getDeviceInfo().isMobileDevice;
        this.mainElementObserver = new MutationObserver(this.mainElementContentChanged.bind(this));
    }
    // Adaptivity
    get useAdaptiveLayout() {
        return this._isMobileDevice;
    }
    // Selection
    get inputSelectionStart() {
        var _a, _b;
        return (_b = (_a = this.fieldElement) === null || _a === void 0 ? void 0 : _a.selectionStart) !== null && _b !== void 0 ? _b : 0;
    }
    get inputSelectionEnd() {
        var _a, _b;
        return (_b = (_a = this.fieldElement) === null || _a === void 0 ? void 0 : _a.selectionEnd) !== null && _b !== void 0 ? _b : 0;
    }
    get selectionLength() {
        return Math.abs(this.inputSelectionEnd - this.inputSelectionStart);
    }
    isAllSelected() {
        const valueLength = this.fieldElementValue.length;
        return valueLength > 0 && this.inputSelectionStart === 0 && this.inputSelectionEnd === valueLength;
    }
    // Base
    get enabled() {
        if (this.fieldElement)
            return !this.fieldElement.disabled;
        else
            return !dom.DomUtils.hasClassName(this, CssClasses.Disabled);
    }
    get allowInput() {
        return this.enabled && !!this.fieldElement && !this.fieldElement.readOnly;
    }
    static isClearButtonElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(TextEditCssClasses.ClearButton) : false;
    }
    static isEditBoxTemplateElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(TextEditCssClasses.EditBoxTemplate) : false;
    }
    static isEditorButtonElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(TextEditCssClasses.EditorButton) : false;
    }
    isFocusableElementInMainElementTemplate(element) {
        if (this.editBoxTemplateElement)
            return this.editBoxTemplateElement !== element && this.editBoxTemplateElement.contains(element) && isFocusableElement(element);
        return false;
    }
    get fieldElementValue() {
        var _a, _b;
        return (_b = (_a = this.fieldElement) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
    }
    set fieldElementValue(value) {
        if (this.fieldElement)
            this.fieldElement.value = value;
    }
    get rendered() {
        return !!this.fieldElement;
    }
    get focused() {
        return document.activeElement === this.editBoxElement;
    }
    get isFieldElementReadonly() {
        return !!this.fieldElement && this.fieldElement.readOnly;
    }
    get editBoxElement() {
        var _a;
        return (_a = this.fieldElement) !== null && _a !== void 0 ? _a : this.editBoxTemplateElement;
    }
    get editBoxTemplateElement() {
        return this.querySelector(`:scope > .${TextEditCssClasses.EditBoxTemplate}`);
    }
    // Field value binding
    raiseFieldText() {
        let version;
        const text = this.fieldElementValue;
        if (this.shouldProcessFieldTextVersion) {
            version = ++this._fieldTextVersion;
            this._fieldTextHistory[version] = text;
        }
        else
            version = this._fieldTextVersion;
        this.dispatchEvent(new EditorTextInputEvent(text, version));
    }
    raiseFieldChange() {
        this.dispatchEvent(new EditorTextChangeEvent(this.fieldElementValue));
    }
    applyTextProperty() {
        if (this.shouldProcessFieldTextVersion)
            this.applyTextPropertyByVersion();
        else {
            this.applyTextPropertyCore();
            this._fieldTextVersion = this.fieldTextVersion;
        }
    }
    applyTextPropertyByVersion() {
        const serverInputTextVersion = this.fieldTextVersion;
        const serverInputInputText = this.fieldText;
        let clientInputTextVersion = this._fieldTextVersion;
        if (serverInputTextVersion > clientInputTextVersion)
            clientInputTextVersion = serverInputTextVersion;
        if (clientInputTextVersion === -1 || (serverInputInputText !== this.fieldElementValue && this._fieldTextHistory[serverInputTextVersion] !== serverInputInputText)) {
            this.applyTextPropertyCore();
            this._fieldTextVersion = clientInputTextVersion + 1;
        }
        else
            delete this._fieldTextHistory[serverInputTextVersion];
    }
    applyTextPropertyCore() {
        this.fieldElementValue = this.fieldText;
    }
    onBindValueModeChanged(oldMode) {
        if (oldMode === BindValueMode.OnLostFocus) {
            this._fieldTextHistory = {};
            this._fieldTextVersion++;
        }
        else if (this.bindValueMode === BindValueMode.OnLostFocus) {
            this._fieldTextHistory = {};
            this._fieldTextVersion = -1;
        }
    }
    onInputDelayChanged() {
        this.inputDelayDeferredAction = new DeferredAction(this.fieldInputDelay);
    }
    get shouldProcessFieldTextVersion() {
        return this.bindValueMode === BindValueMode.OnInput || this.bindValueMode === BindValueMode.OnDelayedInput;
    }
    get shouldForceInputOnEnter() { return true; }
    // Events
    onTextInput(_) {
        if (!this.shouldRaiseFieldTextEvents)
            return;
        switch (this.bindValueMode) {
            case BindValueMode.OnInput:
                this.raiseFieldText();
                break;
            case BindValueMode.OnDelayedInput:
                this.inputDelayDeferredAction.execute(() => this.raiseFieldText());
                break;
        }
    }
    onTextChange(_) {
        if (!this.shouldRaiseFieldTextEvents)
            return;
        if (this.bindValueMode === BindValueMode.OnLostFocus)
            this.raiseFieldChange();
        else if (this.bindValueMode === BindValueMode.OnDelayedInput)
            this.tryForceDelayedInput();
    }
    onFieldReady(field, firstInit) {
        field.addEventListener("input", this.boundOnInputInputHandler);
        field.addEventListener("change", this.boundOnInputChangeHandler);
        field.addEventListener("keydown", this.boundOnInputKeyDownHandler);
        if (firstInit) {
            this.applyTextProperty();
            this.updatePlaceholder();
        }
    }
    onTemplateWithoutInputReady(templateElement) {
        templateElement.addEventListener("keydown", this.boundOnInputKeyDownHandler);
    }
    onPointerDown(evt) {
        this.processPointerDown(evt);
    }
    processPointerDown(evt) {
        var _a;
        const target = evt.target;
        const isClearButton = EventHelper.containsInComposedPath(evt, DxTextEditor.isClearButtonElement);
        const isEditorButton = EventHelper.containsInComposedPath(evt, DxTextEditor.isEditorButtonElement);
        const isUnfocusableEditBoxTemplateElement = this.editBoxTemplateElement && this.editBoxTemplateElement === target && !isFocusableElement(this.editBoxTemplateElement);
        const isUnfocusableElementInEditBoxTemplate = this.editBoxTemplateElement && this.editBoxTemplateElement.contains(target) && !isFocusableElement(target);
        const needFocusEditBoxElement = !this.focused
            && (isClearButton || (isEditorButton && !this.useAdaptiveLayout) || isUnfocusableEditBoxTemplateElement || isUnfocusableElementInEditBoxTemplate);
        const needPreventDefault = isClearButton || isEditorButton || isUnfocusableEditBoxTemplateElement || isUnfocusableElementInEditBoxTemplate;
        if (isEditorButton && this.focused)
            this.raiseFieldChange();
        if (needPreventDefault)
            evt.preventDefault();
        if (needFocusEditBoxElement)
            (_a = this.editBoxElement) === null || _a === void 0 ? void 0 : _a.focus();
        return true;
    }
    onInputKeyDown(e) {
        if (!this.isReadOnly)
            this.processKeyDown(e);
    }
    processKeyDown(e) {
        if (e.key === "Enter" && this.shouldForceInputOnEnter)
            this.tryForceDelayedInput();
        return false;
    }
    tryForceDelayedInput() {
        if (!this.shouldRaiseFieldTextEvents)
            return;
        if (this.bindValueMode === BindValueMode.OnDelayedInput)
            this.inputDelayDeferredAction.forceExecute();
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        this.mainElementObserver.observe(this, { childList: true, subtree: true });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.mainElementObserver.disconnect();
    }
    contentChanged() {
        this.fieldElement = this.getFieldElement();
        if (this.fieldElement) {
            this.onFieldReady(this.fieldElement, !this._fieldInitialized);
            this._fieldInitialized = true;
        }
        else if (this.editBoxTemplateElement)
            this.onTemplateWithoutInputReady(this.editBoxTemplateElement);
        if (this.editBoxTemplateElement)
            this.updateEditBoxTemplateTabIndex();
        this.addEventListener("pointerdown", this.boundOnPointerDownHandler);
    }
    get shouldRaiseFieldTextEvents() {
        return true;
    }
    get readyOnConnectedCallback() {
        return false;
    }
    updated(changed) {
        if (this.rendered) {
            if (changed.has("bindValueMode"))
                this.onBindValueModeChanged(changed.get("bindValueMode"));
            if ((changed.has("fieldText") || changed.has("fieldTextVersion")))
                this.applyTextProperty();
            if (changed.has("placeholder"))
                this.updatePlaceholder();
        }
        if (changed.has("fieldInputDelay"))
            this.onInputDelayChanged();
        super.updated(changed);
    }
    updatePlaceholder() {
        if (!this.fieldElement)
            return;
        if (this.placeholder && this.placeholder !== "")
            this.fieldElement.setAttribute("placeholder", this.placeholder);
        else
            this.fieldElement.removeAttribute("placeholder");
    }
    updateEditBoxTemplateTabIndex() {
        var _a, _b;
        if (this.enabled && !this.fieldElement)
            (_a = this.editBoxTemplateElement) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", "0");
        else
            (_b = this.editBoxTemplateElement) === null || _b === void 0 ? void 0 : _b.removeAttribute("tabindex");
    }
    mainElementContentChanged(records, __) {
        const previousFieldElement = this.fieldElement;
        this.contentChanged();
        if (this.fieldElement && previousFieldElement !== this.fieldElement)
            this.applyTextProperty();
    }
}
__decorate([
    n({ type: String, attribute: DxTextEditorAttributes.inputText })
], DxTextEditor.prototype, "fieldText", void 0);
__decorate([
    n({ type: Number, attribute: DxTextEditorAttributes.inputTextVersion })
], DxTextEditor.prototype, "fieldTextVersion", void 0);
__decorate([
    n({ type: Number, attribute: DxTextEditorAttributes.fieldInputDelay })
], DxTextEditor.prototype, "fieldInputDelay", void 0);
__decorate([
    n({ type: BindValueMode, attribute: DxTextEditorAttributes.bindValueMode })
], DxTextEditor.prototype, "bindValueMode", void 0);
__decorate([
    n({ type: Boolean, attribute: "is-read-only" })
], DxTextEditor.prototype, "isReadOnly", void 0);
__decorate([
    n({ type: String, attribute: DxTextEditorAttributes.customPlaceholder })
], DxTextEditor.prototype, "placeholder", void 0);

export { BindValueMode as B, DEFAULT_INPUT_DELAY as D, FocusOutEventContext as F, InputKeyboardEvent as I, TextEditCssClasses as T, BeforeInputEvent as a, DxTextEditorAttributes as b, DxTextEditor as c, FocusInEvent as d, FocusOutEvent as e };
//# sourceMappingURL=text-editor-24.2.js.map
