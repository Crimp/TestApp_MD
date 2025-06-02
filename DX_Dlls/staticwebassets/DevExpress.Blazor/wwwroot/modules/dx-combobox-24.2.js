import { _ as __decorate } from './tslib.es6-24.2.js';
import { b as browser } from './browser-24.2.js';
import adaptiveDropdownComponents from './adaptivedropdowncomponents-24.2.js';
import { D as DxDropDownBase } from './dx-dropdown-base3-24.2.js';
import { ListBoxSelectedItemsChangedEvent } from './dx-listbox-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { c as comboBoxBaseTagName } from './constants-24.23.js';
import { k as key } from './key-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { T as TextEditCssClasses } from './text-editor-24.2.js';
import { n } from './property-24.2.js';
import './_commonjsHelpers-24.2.js';
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
import './custom-element-24.2.js';
import './lit-element-24.2.js';
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
import './masked-input-24.2.js';
import './input-24.2.js';
import './constants-24.25.js';
import './single-slot-element-base-24.2.js';

class KeyDownEvent extends CustomEvent {
    constructor(key, altKey, ctrlKey, text) {
        super(KeyDownEvent.eventName, {
            detail: new KeyDownContext(key, altKey, ctrlKey, text),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
KeyDownEvent.eventName = comboBoxBaseTagName + ".keydown";
class KeyUpEvent extends CustomEvent {
    constructor(key) {
        super(KeyUpEvent.eventName, {
            detail: new KeyUpContext(key),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
KeyUpEvent.eventName = comboBoxBaseTagName + ".keyup";
class KeyDownContext {
    constructor(key, altKey, ctrlKey, text) {
        this.Key = key;
        this.AltKey = altKey;
        this.CtrlKey = ctrlKey;
        this.Text = text;
    }
}
class KeyUpContext {
    constructor(key) {
        this.Key = key;
    }
}
CustomEventsHelper.register(KeyDownEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(KeyUpEvent.eventName, x => {
    return x.detail;
});

const DxComboBoxTagName = "dxbl-combobox";
class DxComboBox extends DxDropDownBase {
    constructor() {
        super();
        this.boundOnDropDownSelectedItemsChangedHandler = this.onDropDownSelectedItemsChanged.bind(this);
        this.tabKeyPressed = false;
        this.filteringEnabled = false;
    }
    get useMobileFocusBehaviour() {
        return browser.Browser.MobileUI || super.useMobileFocusBehaviour;
    }
    processKeyDownServerCommand(evt) {
        if (!this.requireSendKeyCommandToServer(evt))
            return this.isToggleDropDownVisibilityKeyCommand(evt);
        const text = !this.fieldElement ? this.fieldText : this.fieldElementValue;
        this.dispatchEvent(new KeyDownEvent(evt.key, evt.altKey, evt.ctrlKey || evt.metaKey, text));
        return true;
    }
    processCapturedKeyDownAsync(e, options) {
        if (this.processKeyDownServerCommand(e)) {
            e.preventDefault();
            options.handled = true;
            return Promise.resolve();
        }
        return super.processCapturedKeyDownAsync(e, options);
    }
    processKeyDown(evt) {
        if (evt.keyCode === key.KeyCode.Tab)
            this.tabKeyPressed = true;
        const captureManagerUsed = this.isDropDownOpen;
        if (!captureManagerUsed)
            this.processKeyDownServerCommand(evt);
        return super.processKeyDown(evt);
    }
    processKeyUp(evt) {
        if (evt.keyCode === key.KeyCode.Up || evt.keyCode === key.KeyCode.Down)
            this.dispatchEvent(new KeyUpEvent(evt.key));
        this.tabKeyPressed = false;
        return false;
    }
    raiseFocusOut(text) {
        super.raiseFocusOut(text, this.tabKeyPressed);
    }
    onTextInput(evt) {
        if (!this.inputElement)
            return;
        if (!this.isDropDownOpen && evt.data && evt.data.length > 0)
            this.toggleDropDownVisibility();
        if (!this.filteringEnabled)
            return;
        evt.stopPropagation();
        this.raiseFieldText();
    }
    onTextChange(_) { }
    onDropDownSelectedItemsChanged(evt) {
        evt.stopPropagation();
        const dropDownListBox = evt.target;
        dropDownListBox === null || dropDownListBox === void 0 ? void 0 : dropDownListBox.scrollToFocusedItem(false);
    }
    ensurePopupElement() {
        var _a;
        super.ensurePopupElement();
        (_a = this.popupElement) === null || _a === void 0 ? void 0 : _a.addEventListener(ListBoxSelectedItemsChangedEvent.eventName, this.boundOnDropDownSelectedItemsChangedHandler);
    }
    disposePopupElement() {
        var _a;
        (_a = this.popupElement) === null || _a === void 0 ? void 0 : _a.removeEventListener(ListBoxSelectedItemsChangedEvent.eventName, this.boundOnDropDownSelectedItemsChangedHandler);
        super.disposePopupElement();
    }
    requireSendKeyCommandToServer(evt) {
        switch (evt.keyCode) {
            case key.KeyCode.Enter:
            case key.KeyCode.Esc:
            case key.KeyCode.Up:
            case key.KeyCode.Down:
            case key.KeyCode.PageUp:
            case key.KeyCode.PageDown:
                return true;
            case key.KeyCode.Home:
            case key.KeyCode.End:
                return evt.ctrlKey || evt.metaKey;
        }
        return false;
    }
    isToggleDropDownVisibilityKeyCommand(evt) {
        return (evt.altKey || evt.metaKey) && (evt.key === "ArrowUp" || evt.key === "ArrowDown");
    }
    applyTextPropertyCore() {
        if (!this.fieldElement)
            return;
        super.applyTextPropertyCore();
        if (this.fieldText !== "" && !this.allowInput)
            this.fieldElement.setSelectionRange(0, 0);
    }
    processPointerDown(e) {
        if (EventHelper.containsInComposedPath(e, this.isEditBoxElement.bind(this)) && !this.isDropDownOpen)
            this.toggleDropDownVisibility();
        return super.processPointerDown(e);
    }
    getFieldElement() {
        return this.querySelector(`.${TextEditCssClasses.TextEditInput}`);
    }
}
__decorate([
    n({ type: Boolean, attribute: "filtering-enabled" })
], DxComboBox.prototype, "filteringEnabled", void 0);
customElements.define(DxComboBoxTagName, DxComboBox);
function loadModule() { }
const dxCombobox = { loadModule, adaptiveDropdownComponents };

export { DxComboBox, dxCombobox as default };
//# sourceMappingURL=dx-combobox-24.2.js.map
