import { _ as __decorate } from './tslib.es6-24.2.js';
import adaptiveDropdownComponents from './adaptivedropdowncomponents-24.2.js';
import { a as DropDownRootKbdStrategy, E as EditorDropDownKbdStrategy, d as DropDownCssClasses, D as DxDropDownBase } from './dx-dropdown-base3-24.2.js';
import { r as dropDownBoxTagName } from './constants-24.23.js';
import { F as FocusUtils, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { d as dom } from './dom-24.2.js';
import { e } from './custom-element-24.2.js';
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
import './property-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
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
import './browser-24.2.js';
import './_commonjsHelpers-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './string-24.2.js';
import './thumb-24.2.js';
import './query-24.2.js';
import './dom-utils-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';
import './modalcomponents-24.2.js';
import './masked-input-24.2.js';
import './text-editor-24.2.js';
import './single-slot-element-base-24.2.js';
import './input-24.2.js';
import './constants-24.25.js';

class DropDownBoxRootKbdStrategy extends DropDownRootKbdStrategy {
    createPopupStrategy(navigator, targetElement) {
        return new DropDownBoxDropDownKbdStrategy(navigator, targetElement, this);
    }
}
const navigatorInitializationTimeout = 50;
class DropDownBoxDropDownKbdStrategy extends EditorDropDownKbdStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement, parentStrategy);
        this._focusableElements = [];
        this._timeoutId = null;
        this.boundWaitForNavigatorInitialization = this.waitForNavigatorInitialization.bind(this);
    }
    get editDropDownElement() {
        return this.targetElement.querySelector(`.${DropDownCssClasses.ClassName}`);
    }
    updateFocusableElementsList() {
        if (this.editDropDownElement) {
            const dropDownFocusableElements = FocusUtils.findFocusableElements(this.editDropDownElement);
            this._focusableElements = dropDownFocusableElements.length > 0 ? dropDownFocusableElements : [this.editDropDownElement];
        }
    }
    get focusableElements() {
        return this._focusableElements;
    }
    handlePopupShown() {
        super.handlePopupShown();
        this.addDropDownElementsEventSubscriptions();
        const keyboardNavigator = this.editDropDownElement.querySelector(DxKeyboardNavigatorTagName);
        if (!keyboardNavigator || keyboardNavigator.initialized) {
            this.handlePopupShownInternal();
            return;
        }
        this.waitForNavigatorInitialization(keyboardNavigator, this.handlePopupShownInternal.bind(this));
    }
    handlePopupClosed() {
        super.handlePopupClosed();
        this.targetElement.removeEventListener("focus", this.boundDropDownElementFocusHandler);
        if (this.editDropDownElement)
            this.editDropDownElement.removeEventListener("focus", this.boundEditDropDownElementFocusHandler);
    }
    addDropDownElementsEventSubscriptions() {
        if (!this.boundDropDownElementFocusHandler)
            this.boundDropDownElementFocusHandler = this.dropDownElementFocusHandler.bind(this);
        this.targetElement.addEventListener("focus", this.boundDropDownElementFocusHandler);
        if (this.editDropDownElement) {
            if (!this.boundEditDropDownElementFocusHandler)
                this.boundEditDropDownElementFocusHandler = this.editDropDownElementFocusHandler.bind(this);
            this.editDropDownElement.addEventListener("focus", this.boundEditDropDownElementFocusHandler);
        }
    }
    waitForNavigatorInitialization(navigator, callback) {
        if (this._timeoutId)
            clearTimeout(this._timeoutId);
        if (document.activeElement === this.targetElement) {
            if (!navigator.initialized)
                this._timeoutId = setTimeout(() => this.boundWaitForNavigatorInitialization(navigator, callback), navigatorInitializationTimeout);
            else
                callback();
        }
    }
    handlePopupShownInternal() {
        this.updateFocusableElementsList();
        this.tryFocusFirstFocusableElement();
    }
    tryFocusFirstFocusableElement() {
        if (this.focusableElements.length > 0)
            FocusUtils.focusElement(this.focusableElements[0]);
    }
    tryFocusLastFocusableElement() {
        if (this.focusableElements.length > 0)
            FocusUtils.focusElement(this.focusableElements[this.focusableElements.length - 1]);
    }
    handleKeyDown(evt) {
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab && this.focusableElements.length <= 1) {
            EventHelper.markHandled(evt);
            return false;
        }
        return super.handleKeyDown(evt);
    }
    onDropDownEditorPointerDownHandler() {
        if (dom.DomUtils.isItParent(this.targetElement, document.activeElement))
            return;
        super.onDropDownEditorPointerDownHandler();
    }
    dropDownElementFocusHandler(e) {
        this.tryFocusFirstFocusableElement();
    }
    editDropDownElementFocusHandler(e) {
        this.tryFocusLastFocusableElement();
    }
}

let DxDropdownBox = class DxDropdownBox extends DxDropDownBase {
    constructor() {
        super();
    }
    processPointerDown(e) {
        const isEditBoxElement = e.target === this.editBoxElement;
        const isNotFocusableElementInMainElementTemplate = this.editBoxTemplateElement && this.editBoxTemplateElement.contains(e.target) && !this.isFocusableElementInMainElementTemplate(e.target);
        if (!this.isDropDownOpen && (isEditBoxElement || isNotFocusableElementInMainElementTemplate))
            this.tryOpenDropDown();
        return super.processPointerDown(e);
    }
    createKeyboardStrategy() {
        return new DropDownBoxRootKbdStrategy(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
};
DxDropdownBox = __decorate([
    e(dropDownBoxTagName)
], DxDropdownBox);
function loadModule() { }
const dxDropdownBox = { loadModule, adaptiveDropdownComponents };

export { DxDropdownBox, dxDropdownBox as default };
//# sourceMappingURL=dx-dropdown-box-24.2.js.map
