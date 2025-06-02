import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { D as DxDropDownMenuOwnerKeyboardStrategy, M as MenuItem } from './menu-keyboard-strategy-24.2.js';
import { D as DxToolbarDropDownRootMenuKeyboardStrategy, a as DxToolbarModalRootKeyboardStrategy } from './modal-keyboard-strategy-24.2.js';
import { containsFocusHiddenAttribute, addFocusHiddenAttribute } from './focus-utils-24.2.js';
import { b as PointerEventHelper } from './dx-html-element-pointer-events-helper-24.2.js';
import { D as DxDropDownOwner } from './dx-dropdown-owner-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
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
import './focushelper-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './popup-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './capture-manager-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './constants-24.24.js';
import './constants-24.25.js';
import './dropdown-menu-keyboard-strategy-24.2.js';
import './disposable-24.2.js';

class DxDropDownButtonRootKeyboardStrategy extends DxToolbarDropDownRootMenuKeyboardStrategy {
    constructor(navigator, targetElement, parentStrategy, menuItemSelector) {
        super(navigator, targetElement, parentStrategy, menuItemSelector);
        this._parentTargetElement = parentStrategy.targetElement;
    }
    get parentTargetElement() {
        return this._parentTargetElement;
    }
    handlePopupShown() {
        super.handlePopupShown();
        this.focusFirstItem();
        this.synchronizeFocusState();
    }
    synchronizeFocusState() {
        if (containsFocusHiddenAttribute(this.parentTargetElement))
            addFocusHiddenAttribute(this.targetElement);
    }
    focusSelectedItem() {
        this._focusSemaphore.doAllowedAction(() => {
            super.focusSelectedItem();
        });
    }
}

const ButtonSelector = ".dxbl-btn:not([disabled])";
const ContentTemplateSelector = ".dxbl-btn-dropdown-content-template";
const NavigatorInitializationTimeout = 50;
class ButtonKbnStrategy extends DxDropDownMenuOwnerKeyboardStrategy {
    constructor(navigator, targetElement) {
        super(navigator, targetElement);
        this._timeoutId = null;
        this.boundWaitForCustomSubMenuInitialization = this.waitForCustomSubMenuInitialization.bind(this);
        this.verticalOrientation = targetElement.verticalOrientation;
    }
    queryItems() {
        const items = this.targetElement.querySelectorAll(ButtonSelector);
        return [...items];
    }
    handleKeyDownCore(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Right:
                if (this.verticalOrientation)
                    return false;
                this.moveToNextItem(true);
                return true;
            case key.KeyCode.Left:
                if (this.verticalOrientation)
                    return false;
                this.moveToPrevItem(true);
                return true;
            case key.KeyCode.Home:
                this.moveToFirstItem();
                return true;
            case key.KeyCode.End:
                this.moveToLastItem();
                return true;
            case key.KeyCode.Up:
                if (evt.altKey && !evt.shiftKey)
                    return this.performCloseShortcutEvent(evt);
                if (this.verticalOrientation) {
                    this.moveToPrevItem(true);
                    return true;
                }
                return false;
            case key.KeyCode.Down:
                if (evt.altKey && !evt.shiftKey)
                    return this.performOpenShortcutEvent(evt);
                if (this.verticalOrientation) {
                    this.moveToNextItem(true);
                    return true;
                }
                return false;
            case key.KeyCode.Tab:
                return this.handleTabKeyDown(evt);
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                return this.performOpenShortcutEvent(evt);
            default:
                return false;
        }
    }
    performOpenShortcutEvent(evt) {
        if (!this.hasMenu())
            return false;
        this.performShortcutEvent(evt);
        this.focusSubMenuItemAsync(MenuItem.First);
        return true;
    }
    performCloseShortcutEvent(evt) {
        if (this.isMenuExpanded())
            this.performShortcutEvent(evt);
        return true;
    }
    handleTabKeyDown(evt) {
        this.performCloseShortcutEvent(evt);
        if (evt.shiftKey)
            this.leaveBackward();
        else
            this.leaveForward();
        return true;
    }
    onSubMenuShown(strategy) {
        const navigator = strategy.targetElement.querySelector(DxKeyboardNavigatorTagName);
        if (navigator && !navigator.initialized)
            this.waitForCustomSubMenuInitialization(navigator, () => super.onSubMenuShown(strategy));
        else
            super.onSubMenuShown(strategy);
    }
    waitForCustomSubMenuInitialization(navigator, callback) {
        if (this._timeoutId)
            clearTimeout(this._timeoutId);
        if (!navigator.initialized)
            this._timeoutId = setTimeout(() => this.boundWaitForCustomSubMenuInitialization(navigator, callback), NavigatorInitializationTimeout);
        else
            callback();
    }
    createPopupStrategy(navigator, targetElement) {
        return new DxDropDownButtonRootKeyboardStrategy(navigator, targetElement, this, [ButtonSelector, ContentTemplateSelector].join(","));
    }
    createModalStrategy(navigator, targetElement) {
        return new DxToolbarModalRootKeyboardStrategy(navigator, targetElement, this, [ButtonSelector, ContentTemplateSelector].join(","));
    }
}

const ButtonDataIdAttribute = "data-dxbutton-id";
const ItemSubmitFormOnClickAttribute = "submit-form-on-click";
class ButtonItem extends DxDropDownOwner {
    constructor() {
        super(...arguments);
        this.boundOnButtonClick = this.onButtonClick.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.boundOnButtonClick);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this.boundOnButtonClick);
        super.disconnectedCallback();
    }
    canHandlePointerDown(evt) {
        return PointerEventHelper.containsInComposedPath(evt, this);
    }
    onButtonClick(_) {
        if (this.getAttribute(ItemSubmitFormOnClickAttribute) === null)
            return;
        const id = this.getAttribute(ButtonDataIdAttribute);
        if (id) {
            const button = document.querySelector(`[${ButtonDataIdAttribute}=${id}]`);
            if (button) {
                const submitter = document.createElement("input");
                submitter.type = "submit";
                submitter.hidden = true;
                button.appendChild(submitter);
                submitter.click();
                button.removeChild(submitter);
            }
        }
    }
}

let DxButton = class DxButton extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.verticalOrientation = false;
    }
    connectedOrContentChanged() {
        this.initializeKeyboardNavigator();
        super.connectedOrContentChanged();
    }
    disconnectedCallback() {
        delete this._keyboardNavigator;
        super.disconnectedCallback();
    }
    initializeKeyboardNavigator() {
        this._keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (!this._keyboardNavigator)
            return;
        if ("initialized" in this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new ButtonKbnStrategy(this._keyboardNavigator, this));
    }
};
__decorate([
    n({ attribute: "vertical-orientation", type: Boolean })
], DxButton.prototype, "verticalOrientation", void 0);
DxButton = __decorate([
    e("dxbl-button")
], DxButton);
customElements.define("dxbl-button-dropdown-item", ButtonItem);

export { DxButton };
//# sourceMappingURL=dx-button-24.2.js.map
