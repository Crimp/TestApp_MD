import adaptiveDropdownComponents from './adaptivedropdowncomponents-24.2.js';
import { q as tagBox2TagName } from './constants-24.23.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { D as DxDropDownListBox, L as ListSearchMode } from './dx-dropdown-list-box-24.2.js';
import { k as key } from './key-24.2.js';
import { isFocusableElement, addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { x as findParentBySelector } from './dom-utils-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { c as DxTextEditor } from './text-editor-24.2.js';
import './dropdowncomponents-24.2.js';
import './dropdown-24.2.js';
import './tslib.es6-24.2.js';
import './popup-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './property-24.2.js';
import './custom-element-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
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
import './thumb-24.2.js';
import './query-24.2.js';
import './disposable-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';
import './modalcomponents-24.2.js';
import './dx-dropdown-base3-24.2.js';
import './masked-input-24.2.js';
import './input-24.2.js';
import './single-slot-element-base-24.2.js';
import './constants-24.25.js';
import './dx-scroll-viewer-24.2.js';
import './dx-html-element-base-24.2.js';
import './scroll-viewer-css-classes-24.2.js';
import './dx-list-box-events-24.2.js';
import './dx-virtual-scroll-viewer-24.2.js';
import './grid-scroll-utils-24.2.js';

var _a;
class TagBoxCssClasses {
}
_a = TagBoxCssClasses;
TagBoxCssClasses.TagClass = CssClasses.Prefix + "-tag";
TagBoxCssClasses.TagTemplateClass = _a.TagClass + "-tmpl";
TagBoxCssClasses.TagCloseButtonClass = _a.TagClass + "-btn-close";

class DxTagBox2 extends DxDropDownListBox {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    isFocusableElementInMainElementTemplate(element) {
        if (findParentBySelector(element, `.${TagBoxCssClasses.TagTemplateClass}`) && isFocusableElement(element))
            return true;
        return super.isFocusableElementInMainElementTemplate(element);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    get isSearchActive() {
        return this.searchMode !== ListSearchMode.None;
    }
    processPointerDown(e) {
        var _a;
        const isTagCloseButton = EventHelper.containsInComposedPath(e, this.isTagCloseButtonElement);
        const isClearButton = EventHelper.containsInComposedPath(e, DxTextEditor.isClearButtonElement);
        const isEditorButton = EventHelper.containsInComposedPath(e, DxTextEditor.isEditorButtonElement);
        const isFieldElement = e.target === this.fieldElement;
        const shouldToggleDropDownVisibility = !isTagCloseButton && !this.isFocusableElementInMainElementTemplate(e.target);
        if (isFieldElement || shouldToggleDropDownVisibility)
            this.toggleDropDownVisibility();
        addFocusHiddenAttribute(this);
        if (isEditorButton && this.focused)
            this.raiseFieldChange();
        if (isClearButton || isEditorButton || isTagCloseButton)
            e.preventDefault();
        if (!this.focused && (isEditorButton && !this.useAdaptiveLayout))
            (_a = this.editBoxElement) === null || _a === void 0 ? void 0 : _a.focus();
        return true;
    }
    applyTextPropertyCore() {
        super.applyTextPropertyCore();
        if (this.fieldElementValue) {
            this.selectAll();
            this.raiseFieldText();
        }
        this.setInputSizeAttribute();
    }
    onFieldReady(field, firstInit) {
        super.onFieldReady(field, firstInit);
        if (firstInit)
            this.setInputSizeAttribute();
    }
    updatePlaceholder() {
        super.updatePlaceholder();
        this.setInputSizeAttribute();
    }
    onTextInput(evt) {
        super.onTextInput(evt);
        this.setInputSizeAttribute();
    }
    tryProcessKeyDown(evt) {
        if (super.tryProcessKeyDown(evt))
            return true;
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Backspace:
                if (this.fieldElementValue)
                    return false;
                this.dispatchKeyDownEvent(evt);
                return true;
        }
        return false;
    }
    setInputSizeAttribute() {
        if (!this.inputElement)
            return;
        this.inputElement.setAttribute("size", this.getInputSize().toString());
    }
    getInputSize() {
        if (this.fieldElementValue)
            return this.fieldElementValue.length;
        if (this.placeholder)
            return this.placeholder.length;
        return 1;
    }
    isTagTemplateElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(TagBoxCssClasses.TagTemplateClass) : false;
    }
    isTagCloseButtonElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(TagBoxCssClasses.TagCloseButtonClass) : false;
    }
}
customElements.define(tagBox2TagName, DxTagBox2);
function loadModule() { }
const dxTagBox = { loadModule, adaptiveDropdownComponents };

export { DxTagBox2, dxTagBox as default };
//# sourceMappingURL=dx-tag-box-24.2.js.map
