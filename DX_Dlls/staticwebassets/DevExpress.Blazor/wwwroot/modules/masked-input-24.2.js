import { _ as __decorate } from './tslib.es6-24.2.js';
import { b as browser } from './browser-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { m as maskedInputTagName } from './constants-24.23.js';
import { F as FocusOutEventContext, B as BindValueMode, D as DEFAULT_INPUT_DELAY, a as BeforeInputEvent } from './text-editor-24.2.js';
import { D as DxInputEditorAttributes, a as DxInputEditor } from './input-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { k as key } from './key-24.2.js';
import { n } from './property-24.2.js';
import './_commonjsHelpers-24.2.js';
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
import './css-classes-24.2.js';
import './devices-24.2.js';
import './dom-24.2.js';
import './string-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './focushelper-24.2.js';
import './dom-utils-24.2.js';
import './custom-element-24.2.js';

class MaskedInputWheelContext {
    constructor(delta) {
        this.deltaY = delta;
    }
}
var SelectionDirection;
(function (SelectionDirection) {
    SelectionDirection[SelectionDirection["forward"] = 0] = "forward";
    SelectionDirection[SelectionDirection["backward"] = 1] = "backward";
})(SelectionDirection || (SelectionDirection = {}));
class MaskInputSelectionChangeContext {
    constructor(selectionStart, selectionEnd, direction, selectAll) {
        this.direction = SelectionDirection.backward;
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        this.selectAll = selectAll;
        this.direction = direction;
    }
}
class MaskedInputApplyValueEvent extends Event {
    constructor() {
        super(MaskedInputApplyValueEvent.eventName, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MaskedInputApplyValueEvent.eventName = maskedInputTagName + ".applyValue";
class MaskedInputAutoFillEvent extends CustomEvent {
    constructor(text) {
        super(MaskedInputAutoFillEvent.eventName, {
            detail: new FocusOutEventContext(text, false),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MaskedInputAutoFillEvent.eventName = maskedInputTagName + ".autofill";
class MaskedInputWheelEvent extends CustomEvent {
    constructor(delta) {
        super(MaskedInputWheelEvent.eventName, {
            detail: new MaskedInputWheelContext(delta),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MaskedInputWheelEvent.eventName = maskedInputTagName + ".wheel";
class MaskedInputSelectionChangedEvent extends CustomEvent {
    constructor(selectionStart, selectionEnd, direction, selectAll) {
        super(MaskedInputSelectionChangedEvent.eventName, {
            detail: new MaskInputSelectionChangeContext(selectionStart, selectionEnd, direction, selectAll),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MaskedInputSelectionChangedEvent.eventName = maskedInputTagName + ".selectionchange";
class CompositionEndEvent extends CustomEvent {
    constructor(detail) {
        super(CompositionEndEvent.eventName, {
            detail: detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
CompositionEndEvent.eventName = maskedInputTagName + ".compositionEnd";
CustomEventsHelper.register(MaskedInputSelectionChangedEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(MaskedInputAutoFillEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(MaskedInputApplyValueEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(MaskedInputWheelEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(CompositionEndEvent.eventName, x => {
    const e = x.detail;
    return {
        "Text": e.data,
    };
});

var MaskedInputEditorAttributes;
(function (MaskedInputEditorAttributes) {
    MaskedInputEditorAttributes["syncSelectionStart"] = "sync-selection-start";
    MaskedInputEditorAttributes["syncSelectionEnd"] = "sync-selection-end";
    MaskedInputEditorAttributes["isMaskDefined"] = "is-mask-defined";
})(MaskedInputEditorAttributes || (MaskedInputEditorAttributes = {}));
const DxMaskedInputEditorAttributes = { ...MaskedInputEditorAttributes, ...DxInputEditorAttributes };
class DxMaskedInputEditor extends DxInputEditor {
    constructor() {
        super(...arguments);
        this.wheelTimerId = -1;
        this._shouldApplySelectionOnFocus = true;
        this.compositionProcessing = false;
        this.compositionEndHandler = this.handleCompositionEnd.bind(this);
        this.pointerUpHandler = this.handlePointerUp.bind(this);
        this.clickHandler = this.handleClick.bind(this);
        this.wheelHandler = this.handleWheel.bind(this);
        this.syncSelectionStart = null;
        this.syncSelectionEnd = null;
        this.isMaskDefined = false;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    get shouldProcessFocusOut() {
        return true;
    }
    get shouldProcessWheel() {
        return this.isMaskDefined;
    }
    get shouldProcessFocusIn() {
        return true;
    }
    get shouldApplySelectionOnFocus() {
        return this._shouldApplySelectionOnFocus;
    }
    set shouldApplySelectionOnFocus(value) {
        this._shouldApplySelectionOnFocus = value;
    }
    get inputSelectionDirection() {
        var _a;
        return ((_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.selectionDirection) === "backward" ? SelectionDirection.backward : SelectionDirection.forward;
    }
    handlePointerUp(e) {
        if (!this.allowInput || !this.isMaskDefined)
            return;
        this.processPointerUp(e);
    }
    handleCompositionEnd(e) {
        this.dispatchEvent(new CompositionEndEvent(e));
        this.inputElement.removeEventListener("compositionend", this.compositionEndHandler);
        this.compositionProcessing = false;
    }
    handleClick(_) {
        this.applyInputSelection();
    }
    handleWheel(e) {
        if (this.shouldProcessWheel) {
            e.preventDefault();
            this.processWheel(e);
            if (this.bindValueMode !== BindValueMode.OnInput) {
                if (this.wheelTimerId !== -1)
                    clearTimeout(this.wheelTimerId);
                const applyValue = () => {
                    if (this.bindValueMode === BindValueMode.OnDelayedInput)
                        this.applyDefferedValue();
                    else
                        this.raiseApplyValue();
                };
                this.wheelTimerId = window.setTimeout(applyValue.bind(this), this.bindValueMode === BindValueMode.OnDelayedInput ? Math.max(DEFAULT_INPUT_DELAY, this.fieldInputDelay) : DEFAULT_INPUT_DELAY);
            }
        }
    }
    processWheel(e) {
        this.dispatchEvent(new MaskedInputWheelEvent(e.deltaY));
    }
    applyTextPropertyCore() {
        super.applyTextPropertyCore();
        this.applyMaskManagerSelection();
    }
    applyMaskManagerSelection() {
        if (this.isMaskDefined
            && (this.focused || !(browser.Browser.MacOSPlatform || browser.Browser.MacOSMobilePlatform)) // T1180816
            && (this.inputSelectionStart !== this.syncSelectionStart || this.inputSelectionEnd !== this.syncSelectionEnd))
            this.selectInputText(this.syncSelectionStart, this.syncSelectionEnd);
    }
    get shouldProcessFieldTextVersion() {
        return !this.isMaskDefined && super.shouldProcessFieldTextVersion;
    }
    get shouldRaiseFieldTextEvents() {
        return !this.isMaskDefined;
    }
    processFocusIn() {
        var _a;
        super.processFocusIn();
        if (this.allowInput && this.isMaskDefined && this.shouldApplySelectionOnFocus)
            requestAnimationFrame(() => this.applyInputSelection()); // T1274972 - MaskedInput for Blazor - Text isn't selected when the editor is focused with the Tab key in Safari
        this.addEventListener("wheel", this.wheelHandler, { capture: true, passive: false });
        if (browser.Browser.WebKitTouchUI)
            (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.clickHandler);
    }
    processFocusOut(e) {
        var _a;
        super.processFocusOut(e);
        this.removeEventListener("wheel", this.wheelHandler, { capture: true });
        if (browser.Browser.WebKitTouchUI)
            (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.clickHandler);
    }
    processKeyDown(e) {
        super.processKeyDown(e);
        if (!this.shouldProcessKeyDown(e))
            return false;
        EventHelper.markHandled(e);
        this.raiseKeyDown(e);
        return true;
    }
    processPointerDown(evt) {
        super.processPointerDown(evt);
        if (this.isMaskDefined && !this.focused)
            this.shouldApplySelectionOnFocus = false;
        if (EventHelper.containsInComposedPath(evt, e => e === this.inputElement))
            document.addEventListener(DxMaskedInputEditor.pointerUpEventType, this.pointerUpHandler);
        return true;
    }
    processKeyUp(evt) {
        if (!this.inputElement || !EventHelper.containsInComposedPath(evt, e => e === this.inputElement))
            return false;
        const autofilledInput = this.querySelector("input:-webkit-autofill");
        if (this.isMaskDefined && autofilledInput && autofilledInput.value && !this.isOpenDropDownShortcut(evt)) {
            this.dispatchEvent(new MaskedInputAutoFillEvent(autofilledInput.value));
            EventHelper.markHandled(evt);
        }
        if (this.shouldProcessKeyUp(evt)) {
            if (this.bindValueMode === BindValueMode.OnLostFocus)
                this.raiseApplyValue();
            else
                this.applyDefferedValue();
        }
        return true;
    }
    applyDefferedValue() {
        if (this.bindValueMode === BindValueMode.OnDelayedInput)
            this.inputDelayDeferredAction.execute(() => this.raiseApplyValue());
    }
    raiseApplyValue() {
        this.dispatchEvent(new MaskedInputApplyValueEvent());
    }
    processBeforeInput(e) {
        const handled = super.processBeforeInput(e);
        if (handled)
            return true;
        if (!this.isMaskDefined)
            return false;
        if (e.isComposing && !browser.Browser.AndroidMobilePlatform) {
            if (!this.compositionProcessing) {
                this.inputElement.addEventListener("compositionend", this.compositionEndHandler);
                this.compositionProcessing = true;
            }
            return true;
        }
        EventHelper.markHandled(e);
        if (this.shouldProcessBeforeInput(e)) {
            this.applyInputSelection();
            this.dispatchEvent(new BeforeInputEvent(e));
            this.applyDefferedValue();
        }
        return true;
    }
    updated(changed) {
        super.updated(changed);
    }
    shouldProcessKeyUp(e) {
        if (!this.isMaskDefined)
            return false;
        switch (key.KeyUtils.getEventKeyCode(e)) {
            case key.KeyCode.Up:
            case key.KeyCode.Down:
            case key.KeyCode.Enter:
            case key.KeyCode.Delete:
                return true;
            case key.KeyCode.Key_z:
                return e.ctrlKey;
        }
        return false;
    }
    shouldProcessKeyDown(e) {
        if (!this.isMaskDefined)
            return false;
        switch (key.KeyUtils.getEventKeyCode(e)) {
            case key.KeyCode.Left:
            case key.KeyCode.Right:
            case key.KeyCode.Up:
            case key.KeyCode.Down:
            case key.KeyCode.Home:
            case key.KeyCode.Delete:
            case key.KeyCode.End:
                return true;
            case key.KeyCode.Key_a:
            case key.KeyCode.Key_z:
                return e.ctrlKey;
        }
        return false;
    }
    shouldProcessBeforeInput(e) {
        switch (e.inputType) {
            case "insertText":
            case "insertReplacementText":
            case "insertFromPaste":
                return e.data !== null && e.data.length > 0;
            case "deleteContentBackward":
            case "deleteContentForward":
            case "deleteByCut":
                return true;
            case "insertCompositionText":
                return browser.Browser.AndroidMobilePlatform;
        }
        return false;
    }
    isOpenDropDownShortcut(e) {
        return key.KeyUtils.getEventKeyCode(e) === key.KeyCode.Down && e.altKey;
    }
    selectAll() {
        super.selectAll();
        if (this.focused)
            this.applyInputSelection();
    }
    processPointerUp(evt) {
        this.applyInputSelection();
        if (this.shouldApplySelectionOnFocus)
            this.shouldApplySelectionOnFocus = true;
        document.removeEventListener(DxMaskedInputEditor.pointerUpEventType, this.pointerUpHandler);
        return true;
    }
    applyInputSelection() {
        if (this.isMaskDefined && (this.syncSelectionStart !== this.inputSelectionStart || this.syncSelectionEnd !== this.inputSelectionEnd)) {
            const selectAll = this.fieldElementValue.length === Math.abs(this.inputSelectionEnd - this.inputSelectionStart);
            this.raiseMaskSelectionChanged(this.inputSelectionStart, this.inputSelectionEnd, this.inputSelectionDirection, selectAll);
        }
    }
    raiseMaskSelectionChanged(selectionStart, selectionEnd, selectionDirection, selectAll) {
        this.dispatchEvent(new MaskedInputSelectionChangedEvent(selectionStart, selectionEnd, selectionDirection, selectAll));
    }
}
// mobile: there is no information about input selection on pointerup
DxMaskedInputEditor.pointerUpEventType = browser.Browser.WebKitTouchUI ? "touchend" : "pointerup";
__decorate([
    n({ type: Number, attribute: DxMaskedInputEditorAttributes.syncSelectionStart })
], DxMaskedInputEditor.prototype, "syncSelectionStart", void 0);
__decorate([
    n({ type: Number, attribute: DxMaskedInputEditorAttributes.syncSelectionEnd })
], DxMaskedInputEditor.prototype, "syncSelectionEnd", void 0);
__decorate([
    n({ type: Boolean, attribute: DxMaskedInputEditorAttributes.isMaskDefined })
], DxMaskedInputEditor.prototype, "isMaskDefined", void 0);
customElements.define(maskedInputTagName, DxMaskedInputEditor);
function loadModule() { }
const maskedInput = { loadModule };

export { DxMaskedInputEditor, DxMaskedInputEditorAttributes, maskedInput as default };
//# sourceMappingURL=masked-input-24.2.js.map
