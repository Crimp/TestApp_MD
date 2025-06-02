import { _ as __decorate } from './tslib.es6-24.2.js';
import { b as PointerEventHelper } from './dx-html-element-pointer-events-helper-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { d as dropdownBaseTagName } from './constants-24.23.js';
import { P as PortableElementsChangedEvent } from './portal-24.2.js';
import { t as PopupShownEvent, u as PopupClosedEvent, q as PopupKeyboardStrategy, v as PopupClosingResultRequestedEvent, w as PopupClosingRequestedEvent, M as ModalDialogKeyboardStrategy, r as PopupKeyboardStrategyCreatingEvent } from './popup-24.2.js';
import { e as isIPopupAccessor, d as isILogicalChildBase, f as isIAdaptiveDropDown } from './logicaltreehelper-24.2.js';
import { DxMaskedInputEditor } from './masked-input-24.2.js';
import { k as key } from './key-24.2.js';
import { I as InputRootKbdStrategy } from './input-24.2.js';
import { B as ButtonCssClasses } from './constants-24.25.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { containsFocusHiddenAttribute, addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { f as focusTrapSingleton } from './focustrap-24.2.js';
import { d as dom } from './dom-24.2.js';
import { n } from './property-24.2.js';

class OpenDropDownEvent extends Event {
    constructor() {
        super(OpenDropDownEvent.eventName, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
OpenDropDownEvent.eventName = dropdownBaseTagName + ".opendropdown";
class CloseDropDownEvent extends Event {
    constructor() {
        super(CloseDropDownEvent.eventName, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
CloseDropDownEvent.eventName = dropdownBaseTagName + ".closedropdown";
class DropDownEditorPointerDownEvent extends Event {
    constructor() {
        super(DropDownEditorPointerDownEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
DropDownEditorPointerDownEvent.eventName = dropdownBaseTagName + ".pointerdown";
class TryClearEditorValueEvent extends Event {
    constructor() {
        super(TryClearEditorValueEvent.eventName, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
TryClearEditorValueEvent.eventName = dropdownBaseTagName + ".trycleareditorvalue";
CustomEventsHelper.register(OpenDropDownEvent.eventName, x => {
    return x.detail;
});
CustomEventsHelper.register(CloseDropDownEvent.eventName, x => {
    return x.detail;
});

class PopupHelper {
    constructor(control) {
        this.boundOnPopupElementChangedHandler = this.onPopupElementChanged.bind(this);
        this.boundOnPopupShownHandler = this.onPopupShown.bind(this);
        this.boundOnPopupClosedHandler = this.onPopupClosed.bind(this);
        this.boundOnPopupPortalElementsChangedHandler = this.onDropDownPortalElementsChanged.bind(this);
        this.control = control;
        this.popupPortal = null;
        this._popupElement = null;
        this._adaptiveDropDownElement = null;
    }
    get popupElement() {
        return this._popupElement;
    }
    get useMobileFocusBehaviour() {
        var _a;
        return ((_a = this._adaptiveDropDownElement) === null || _a === void 0 ? void 0 : _a.adaptivityEnabled) || false;
    }
    onConnectedCallback() {
        this.ensurePopupInfrastructure();
        this.control.addEventListener(PortableElementsChangedEvent.eventName, this.boundOnPopupElementChangedHandler);
    }
    onDisconnectedCallback() {
        this.control.removeEventListener(PortableElementsChangedEvent.eventName, this.boundOnPopupElementChangedHandler);
        this.disposePopupInfrastructure();
    }
    onSlotChanged() {
        this.disposePopupInfrastructure();
        this.ensurePopupInfrastructure();
    }
    getPopupPortal() {
        if (!this.control.shadowRoot)
            return null;
        const slot = this.control.shadowRoot.querySelector("slot");
        if (!slot)
            return null;
        const elements = slot.assignedNodes();
        return elements.find(e => isIPopupAccessor(e));
    }
    onPopupElementChanged(evt) {
        if (EventHelper.getOriginalSource(evt) !== this.popupPortal)
            return;
        this.disposePopupElement();
        this.ensurePopupElement();
    }
    onPopupShown(evt) {
        if (this.popupElement && isILogicalChildBase(this.popupElement))
            this.control.addLogicalChild(this.popupElement);
    }
    onPopupClosed(_) {
        if (this.popupElement && isILogicalChildBase(this.popupElement))
            this.control.removeLogicalChild(this.popupElement);
    }
    onDropDownPortalElementsChanged(_) {
        this.ensurePopupElement();
    }
    ensurePopupInfrastructure() {
        var _a;
        this.popupPortal = this.getPopupPortal();
        (_a = this.popupPortal) === null || _a === void 0 ? void 0 : _a.addEventListener(PortableElementsChangedEvent.eventName, this.boundOnPopupPortalElementsChangedHandler);
        this.ensurePopupElement();
    }
    ensurePopupElement() {
        var _a, _b, _c;
        if (!this.popupPortal)
            return;
        this._popupElement = (_a = this.popupPortal) === null || _a === void 0 ? void 0 : _a.popupBase;
        (_b = this._popupElement) === null || _b === void 0 ? void 0 : _b.addEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
        (_c = this._popupElement) === null || _c === void 0 ? void 0 : _c.addEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        if (this._popupElement && isIAdaptiveDropDown(this._popupElement))
            this._adaptiveDropDownElement = this._popupElement;
        this.control.ensurePopupElement();
    }
    disposePopupInfrastructure() {
        var _a;
        (_a = this.popupPortal) === null || _a === void 0 ? void 0 : _a.removeEventListener(PortableElementsChangedEvent.eventName, this.boundOnPopupPortalElementsChangedHandler);
        this.popupPortal = null;
        this._adaptiveDropDownElement = null;
        this.disposePopupElement();
    }
    disposePopupElement() {
        var _a, _b;
        (_a = this._popupElement) === null || _a === void 0 ? void 0 : _a.removeEventListener(PopupShownEvent.eventName, this.boundOnPopupShownHandler);
        (_b = this._popupElement) === null || _b === void 0 ? void 0 : _b.removeEventListener(PopupClosedEvent.eventName, this.boundOnPopupClosedHandler);
        this._popupElement = null;
        this.control.disposePopupElement();
    }
}

class DropDownCssClasses {
}
DropDownCssClasses.ClassName = CssClasses.Prefix + "-edit-dropdown";
DropDownCssClasses.Header = DropDownCssClasses.ClassName + "-header";
DropDownCssClasses.Body = CssClasses.Prefix + "-body";
DropDownCssClasses.DropDownButton = CssClasses.Prefix + "-edit-btn-dropdown";

class EditorDropDownKbdStrategy extends PopupKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement);
        this._focusTrapElement = null;
        this._parentStrategy = parentStrategy;
        this._needRestoreInputFocus = false;
    }
    get parentStrategy() {
        return this._parentStrategy;
    }
    get dropDownEditor() {
        return this.parentStrategy.dropDownEditor;
    }
    getHeaderButtons() {
        return Array.from(this.targetElement.querySelectorAll(`.${DropDownCssClasses.Header} > .${ButtonCssClasses.Button}`));
    }
    addEventSubscriptions() {
        super.addEventSubscriptions();
        if (!this.boundOnDropDownEditorPointerDownHandler) {
            this.boundOnDropDownEditorPointerDownHandler = this.onDropDownEditorPointerDownHandler.bind(this);
            this.targetElement.addEventListener(DropDownEditorPointerDownEvent.eventName, this.boundOnDropDownEditorPointerDownHandler);
        }
        if (!this.boundOnPopupClosingResultRequestedHandler) {
            this.boundOnPopupClosingResultRequestedHandler = this.onPopupClosingResultRequested.bind(this);
            this.targetElement.addEventListener(PopupClosingResultRequestedEvent.eventName, this.boundOnPopupClosingResultRequestedHandler);
            this.targetElement.addEventListener(PopupClosingRequestedEvent.eventName, this.boundOnPopupClosingResultRequestedHandler);
        }
    }
    onDispose() {
        if (this.boundOnDropDownEditorPointerDownHandler) {
            this.targetElement.removeEventListener(DropDownEditorPointerDownEvent.eventName, this.boundOnDropDownEditorPointerDownHandler);
            this.boundOnDropDownEditorPointerDownHandler = undefined;
        }
        if (this.boundOnPopupClosingResultRequestedHandler) {
            this.targetElement.removeEventListener(PopupClosingResultRequestedEvent.eventName, this.boundOnPopupClosingResultRequestedHandler);
            this.targetElement.removeEventListener(PopupClosingRequestedEvent.eventName, this.boundOnPopupClosingResultRequestedHandler);
            this.boundOnPopupClosingResultRequestedHandler = undefined;
        }
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (key.KeyUtils.getEventKeyCode(evt) === key.KeyCode.Tab)
            return false;
        if (keyCode === key.KeyCode.Esc || (evt.altKey || evt.metaKey) && keyCode === key.KeyCode.Up) {
            this._needRestoreInputFocus = true;
            this.closeDropDown();
            return true;
        }
        return super.handleKeyDown(evt);
    }
    onDropDownEditorPointerDownHandler() {
        if (!this.dropDownEditor.focused)
            this.parentStrategy.closeDropDown();
    }
    onPopupClosingResultRequested() {
        if (this.targetElement.contains(document.activeElement))
            this.dropDownEditor.focusInternal();
        else
            this.dropDownEditor.raiseFocusOutInternal();
        this._needRestoreInputFocus = false;
    }
    closeDropDown() {
        this.parentStrategy.closeDropDown();
    }
    focusElementInRootPath() {
        return false;
    }
    handlePopupShown() {
        this._needRestoreInputFocus = false;
        const el = this.getNestedContentElement();
        this._focusTrapElement = el ? el : this.targetElement;
        focusTrapSingleton.activate(this._focusTrapElement, false, true);
        super.handlePopupShown();
        if (containsFocusHiddenAttribute(this.dropDownEditor))
            addFocusHiddenAttribute(this.targetElement);
        this.dropDownEditor.classList.add(CssClasses.Focused);
    }
    onPopupClosed() {
        this.dropDownEditor.classList.remove(CssClasses.Focused);
        focusTrapSingleton.deactivate(this._focusTrapElement, false);
        this._focusTrapElement = null;
        if (this._needRestoreInputFocus)
            this.dropDownEditor.focusInternal();
        this.handlePopupClosed();
    }
}

class EditorModalDialogKbdStrategy extends ModalDialogKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy) {
        super(navigator, targetElement);
        this._parentStrategy = parentStrategy;
    }
    get parentStrategy() {
        return this._parentStrategy;
    }
    handlePopupShown() {
        super.handlePopupShown();
        if (containsFocusHiddenAttribute(this.parentStrategy.dropDownEditor))
            addFocusHiddenAttribute(this.targetElement);
    }
}

class DropDownBaseRootKbdStrategy extends InputRootKbdStrategy {
    constructor(editor) {
        super(editor);
    }
    get dropDownEditor() {
        return this._editor;
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if ((evt.altKey || evt.metaKey) && keyCode === key.KeyCode.Down) {
            this.openDropDown();
            return true;
        }
        if ((evt.altKey || evt.metaKey) && keyCode === key.KeyCode.Up) {
            this.closeDropDown();
            return true;
        }
        if (evt.altKey && keyCode === key.KeyCode.Delete) {
            this.tryClearEditorValue();
            return true;
        }
        return super.handleKeyDown(evt);
    }
    closeDropDown() {
        this.dropDownEditor.closeDropDown();
    }
    openDropDown() {
        this.dropDownEditor.openDropDown();
    }
    closeDropDownAndApplyValue(evt) {
        this.performShortcutEvent(evt);
    }
    tryClearEditorValue() {
        const editorAvailable = this.dropDownEditor.enabled && !this.dropDownEditor.isReadOnly;
        if (editorAvailable)
            this.dropDownEditor.dispatchClearEditorValue();
    }
}
class DropDownRootKbdStrategy extends DropDownBaseRootKbdStrategy {
    constructor(editor) {
        super(editor);
    }
    initialize() {
        super.initialize();
        this.subscribeToEvents();
    }
    subscribeToEvents() {
        if (!this.boundOnPopupKeyboardStrategyCreating) {
            this.boundOnPopupKeyboardStrategyCreating = this.onPopupKeyboardStrategyCreating.bind(this);
            this.targetElement.addEventListener(PopupKeyboardStrategyCreatingEvent.eventName, this.boundOnPopupKeyboardStrategyCreating);
        }
    }
    onPopupKeyboardStrategyCreating(evt) {
        evt.detail.factory = {
            createPopup: (navigator, targetElement) => this.createPopupStrategy(navigator, targetElement),
            createModal: (navigator, targetElement) => this.createModalStrategy(navigator, targetElement)
        };
    }
    onDispose() {
        if (this.boundOnPopupKeyboardStrategyCreating) {
            this.targetElement.removeEventListener(PopupKeyboardStrategyCreatingEvent.eventName, this.boundOnPopupKeyboardStrategyCreating);
            this.boundOnPopupKeyboardStrategyCreating = undefined;
        }
        super.onDispose();
    }
    createPopupStrategy(navigator, targetElement) {
        return new EditorDropDownKbdStrategy(navigator, targetElement, this);
    }
    createModalStrategy(navigator, targetElement) {
        return new EditorModalDialogKbdStrategy(navigator, targetElement, this);
    }
}
class DropDownListBoxKbdStrategy extends DropDownBaseRootKbdStrategy {
    constructor(editor) {
        super(editor);
    }
    handleKeyDown(evt) {
        const component = this.dropDownEditor;
        return (component && component.shouldHandleKeyDown) ? component.shouldHandleKeyDown(evt) : super.handleKeyDown(evt);
    }
}

var DropDownWidthMode;
(function (DropDownWidthMode) {
    DropDownWidthMode["ContentOrEditorWidth"] = "ContentOrEditorWidth";
    DropDownWidthMode["ContentWidth"] = "ContentWidth";
    DropDownWidthMode["EditorWidth"] = "EditorWidth";
})(DropDownWidthMode || (DropDownWidthMode = {}));
class DxDropDownBase extends DxMaskedInputEditor {
    constructor() {
        super();
        this.boundOnClickHandler = this.onClick.bind(this);
        this.isDropDownOpen = false;
        this.popupHelper = new PopupHelper(this);
        this.dropDownWidthMode = DropDownWidthMode.ContentWidth;
        this._componentResizeObserver = new ResizeObserver(this.onSizeChanged.bind(this));
    }
    get useMobileFocusBehaviour() {
        return this.popupHelper.useMobileFocusBehaviour;
    }
    get popupElement() {
        return this.popupHelper.popupElement;
    }
    get popupDOMElement() {
        return this.popupElement;
    }
    get dropDownElement() {
        return this.popupElement;
    }
    get shouldProcessFocusOut() {
        if (!this.enabled || this.isReadOnly)
            return false;
        const focusMovingInTemplate = this.editBoxTemplateElement && this.inputElement && !dom.DomUtils.isItParent(this.editBoxTemplateElement, this.inputElement);
        return !focusMovingInTemplate;
    }
    connectedCallback() {
        super.connectedCallback();
        this.popupHelper.onConnectedCallback();
        this._componentResizeObserver.observe(this);
    }
    disconnectedCallback() {
        this.popupHelper.onDisconnectedCallback();
        super.disconnectedCallback();
        this._componentResizeObserver.disconnect();
    }
    contentChanged() {
        super.contentChanged();
        this.popupHelper.onSlotChanged();
        this.addEventListener("click", this.boundOnClickHandler);
    }
    focusInternal() {
        var _a;
        this.shouldApplySelectionOnFocus = false;
        (_a = this.editBoxElement) === null || _a === void 0 ? void 0 : _a.focus();
        this.shouldApplySelectionOnFocus = true;
    }
    processFocusOut(evt) {
        var _a, _b, _c;
        const source = EventHelper.getEventSource(evt);
        if ((_a = this.popupElement) === null || _a === void 0 ? void 0 : _a.contains(source))
            return;
        const target = (_b = evt.relatedTarget) !== null && _b !== void 0 ? _b : document.activeElement;
        if ((this.contains(target) && !this.isFocusableElementInMainElementTemplate(target)) || ((_c = this.popupElement) === null || _c === void 0 ? void 0 : _c.contains(target)))
            return;
        this.raiseFocusOutInternal();
    }
    raiseFocusOutInternal() {
        const text = this.fieldElement ? this.fieldElementValue : this.fieldText;
        this.raiseFocusOut(text);
    }
    processFocusIn() {
        if (!this.focused)
            return;
        super.processFocusIn();
    }
    processPointerDown(e) {
        addFocusHiddenAttribute(this);
        return super.processPointerDown(e);
    }
    canHandlePointerDown(event) {
        const clickedByDropDownButton = this.contains(event.target) && EventHelper.containsInComposedPath(event, this.isDropDownButtonElement.bind(this));
        return clickedByDropDownButton || PointerEventHelper.containsInComposedPath(event, this.inputElement);
    }
    processKeyDownServerCommand(event) {
        return false;
    }
    shouldProcessKeyDown(e) {
        if (e.altKey)
            return false;
        return super.shouldProcessKeyDown(e);
    }
    shouldProcessKeyUp(e) {
        if (e.altKey)
            return false;
        return super.shouldProcessKeyUp(e);
    }
    ensurePopupElement() {
        // if(this.dropDownElement)
        //     this.dropDownElement.addEventListener("focusout", this.boundOnFocusOutHandler);
    }
    disposePopupElement() {
        // if(this.dropDownElement)
        //     this.dropDownElement.removeEventListener("focusout", this.boundOnFocusOutHandler);
    }
    openDropDown() {
        this.dispatchEvent(new OpenDropDownEvent());
    }
    closeDropDown() {
        this.dispatchEvent(new CloseDropDownEvent());
    }
    dispatchClearEditorValue() {
        this.dispatchEvent(new TryClearEditorValueEvent());
    }
    async processCapturedPointerAsync(event, options) {
        if (this.canHandlePointerDown(event))
            options.handled = true;
        return Promise.resolve();
    }
    createKeyboardStrategy() {
        return new DropDownBaseRootKbdStrategy(this);
    }
    updated(updated) {
        super.updated(updated);
        if (updated.has("dropDownWidthMode"))
            this.reconnectComponentResizeObserver();
    }
    toggleDropDownVisibility() {
        if (this.isDropDownOpen)
            this.closeDropDown();
        else if (this.enabled && !this.isReadOnly)
            this.openDropDown();
    }
    tryOpenDropDown() {
        if (this.enabled && !this.isReadOnly)
            this.openDropDown();
    }
    tryCloseDropDown() {
        if (this.isDropDownOpen)
            this.closeDropDown();
    }
    onSizeChanged(entries, _) {
        if (!this.dropDownElement)
            return;
        const masterComponentWidth = entries[0].target.getBoundingClientRect().width;
        const dropDownElementWidth = `${masterComponentWidth}px`;
        if (this.dropDownWidthMode === DropDownWidthMode.EditorWidth)
            this.dropDownElement.desiredWidth = dropDownElementWidth;
        else
            this.dropDownElement.desiredWidth = null;
        if (this.dropDownWidthMode === DropDownWidthMode.ContentOrEditorWidth)
            this.dropDownElement.minDesiredWidth = dropDownElementWidth;
        else
            this.dropDownElement.minDesiredWidth = null;
    }
    dispatchDropDownEditorPointerDownEvent() {
        document.dispatchEvent(new DropDownEditorPointerDownEvent());
    }
    isDropDownButtonElement(target) {
        var _a;
        const element = target;
        return element ? (_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(DropDownCssClasses.DropDownButton) : false;
    }
    isEditBoxElement(target) {
        const element = target;
        return element === this.fieldElement || element === this.editBoxTemplateElement;
    }
    isFieldElement(target) {
        return target === this.fieldElement;
    }
    isEditBoxTemplateElement(target) {
        return target === this.editBoxTemplateElement;
    }
    reconnectComponentResizeObserver() {
        if (!this.isDOMAttached)
            return;
        this._componentResizeObserver.disconnect();
        if (this.dropDownElement) {
            this.dropDownElement.desiredWidth = null;
            this.dropDownElement.minDesiredWidth = null;
        }
        this._componentResizeObserver.observe(this);
    }
    onClick(e) {
        this.processClick(e);
    }
    processClick(e) {
        if (EventHelper.containsInComposedPath(e, this.isDropDownButtonElement.bind(this))) {
            this.toggleDropDownVisibility();
            if (!this.focused) {
                this.focusInternal();
                this.dispatchDropDownEditorPointerDownEvent();
            }
            EventHelper.markHandled(e);
        }
        return true;
    }
}
__decorate([
    n({ type: Boolean, attribute: "is-dropdown-open" })
], DxDropDownBase.prototype, "isDropDownOpen", void 0);
__decorate([
    n({ type: DropDownWidthMode, attribute: "dropdown-width-mode" })
], DxDropDownBase.prototype, "dropDownWidthMode", void 0);

export { DxDropDownBase as D, EditorDropDownKbdStrategy as E, DropDownRootKbdStrategy as a, DropDownWidthMode as b, DropDownListBoxKbdStrategy as c, DropDownCssClasses as d };
//# sourceMappingURL=dx-dropdown-base3-24.2.js.map
