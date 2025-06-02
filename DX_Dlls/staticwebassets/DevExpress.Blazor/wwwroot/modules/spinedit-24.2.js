import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { k as key } from './key-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { s as spinEditTagName } from './constants-24.23.js';
import { n as nameofFactory } from './nameof-factory-24.2.js';
import { DxMaskedInputEditor } from './masked-input-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { B as BindValueMode } from './text-editor-24.2.js';
import { n } from './property-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './input-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './focushelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './dom-utils-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './devices-24.2.js';
import './lit-element-24.2.js';
import './custom-element-24.2.js';
import './single-slot-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';

class IncrementValueEvent extends CustomEvent {
    constructor(increment, previousValue) {
        super(IncrementValueEvent.eventName, {
            detail: new IncrementValueEventContext(increment, previousValue),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
IncrementValueEvent.eventName = spinEditTagName + ".incrementValue";
class IncrementValueEventContext {
    constructor(increment, previousValue) {
        this.Increment = increment;
        this.PreviousValue = previousValue;
    }
}
CustomEventsHelper.register(IncrementValueEvent.eventName, x => {
    return x.detail;
});

var _a;
var SpinEditEditorAttributes;
(function (SpinEditEditorAttributes) {
    SpinEditEditorAttributes["allowMouseWheel"] = "allow-mouse-wheel";
    SpinEditEditorAttributes["needExponentialView"] = "need-exponential-view";
    SpinEditEditorAttributes["decimalSeparator"] = "decimal-separator";
})(SpinEditEditorAttributes || (SpinEditEditorAttributes = {}));
const nameof = nameofFactory();
class SpinEditCssClasses {
}
_a = SpinEditCssClasses;
SpinEditCssClasses.Prefix = CssClasses.Prefix + "-spin";
SpinEditCssClasses.BtnsContainer = _a.Prefix + "-btns";
SpinEditCssClasses.IncBtn = _a.Prefix + "-btn-inc";
SpinEditCssClasses.DecBtn = _a.Prefix + "-btn-dec";
class DxSpinEdit extends DxMaskedInputEditor {
    constructor() {
        super(...arguments);
        this.regex = /^-?(\d)*$/;
        this.pointerDownTimer = { id: -1, button: null };
        this.buttonObserver = new MutationObserver(this.buttonRemovedHandler.bind(this));
        this.boundButtonOnPointerUpHandler = this.onButtonPointerUp.bind(this);
        this.allowMouseWheel = false;
        this.needExponentialView = false;
    }
    // for tests
    get pointerDownTimerId() { return this.pointerDownTimer.id; }
    get shouldProcessWheel() {
        return this.allowMouseWheel;
    }
    disconnectedCallback() {
        this.buttonObserver.disconnect();
        this.stopPointerLongTap();
        super.disconnectedCallback();
    }
    connectedOrContentChanged() {
        super.connectedOrContentChanged();
        this.buttonObserver.observe(this, { childList: true });
    }
    onTextInput(evt) {
        if (this.isMaskDefined)
            return;
        if (!this.inputElement || !EventHelper.containsInComposedPath(evt, e => e === this.inputElement))
            return;
        let currentValue = this.fieldElementValue.trim();
        if (this.decimalSeparator)
            currentValue = currentValue.replace(/[.|,]/g, this.decimalSeparator);
        if (!this.regex.test(currentValue))
            currentValue = currentValue.replace(/[^0-9]/g, "");
        if (currentValue !== this.fieldElementValue)
            this.fieldElementValue = currentValue;
        super.onTextInput(evt);
    }
    processKeyDown(e) {
        const inputElement = this.getFieldElement();
        if (!EventHelper.containsInComposedPath(e, e => e === inputElement))
            return false;
        if (this.isNavigationKey(e)) {
            EventHelper.markHandled(e);
            this.incrementValue(e.keyCode === key.KeyCode.Up);
            return true;
        }
        if (super.processKeyDown(e))
            return true;
        return false;
    }
    processWheel(e) {
        this.incrementValue(e.deltaY < 0);
    }
    processPointerDown(e) {
        const button = this.getButton(e);
        if (button && this.inputElement) {
            e.preventDefault();
            if (!this.useAdaptiveLayout)
                dom.DomUtils.setFocus(this.inputElement);
            const inc = dom.DomUtils.hasClassName(button, SpinEditCssClasses.IncBtn);
            this.incrementValue(inc);
            this.pointerDownTimer = { id: window.setTimeout(this.startPointerLongTap.bind(this), 1000, inc), button };
            button.addEventListener("pointerup", this.boundButtonOnPointerUpHandler);
            button.addEventListener("pointerout", this.boundButtonOnPointerUpHandler);
        }
        return super.processPointerDown(e);
    }
    getButton(e) {
        const composed = e.composedPath();
        for (const index in composed) {
            const element = composed[index];
            if (element && this.hasSpinBtnClass(element))
                return element;
        }
        return null;
    }
    hasSpinBtnClass(element) {
        return dom.DomUtils.hasClassName(element, SpinEditCssClasses.IncBtn) || dom.DomUtils.hasClassName(element, SpinEditCssClasses.DecBtn);
    }
    startPointerLongTap(inc, button) {
        this.pointerDownTimer = { id: window.setInterval(this.incrementValue.bind(this), 50, inc), button };
    }
    stopPointerLongTap() {
        if (this.pointerDownTimer.id !== -1) {
            clearTimeout(this.pointerDownTimer.id);
            this.pointerDownTimer = { id: -1, button: null };
            if (this.bindValueMode === BindValueMode.OnDelayedInput)
                this.applyDefferedValue();
            else
                this.raiseApplyValue();
        }
    }
    onButtonPointerUp(e) {
        let btn = e.target;
        if (!this.hasSpinBtnClass(btn))
            btn = dom.DomUtils.getParentByTagName(btn, "button");
        this.stopPointerLongTap();
        btn.removeEventListener("pointerup", this.boundButtonOnPointerUpHandler);
        btn.removeEventListener("pointerout", this.boundButtonOnPointerUpHandler);
    }
    buttonRemovedHandler(records, _) {
        if (this.pointerDownTimer.id === -1)
            return;
        const isLongTappedButtonRemoved = records.some(record => Array.from(record.removedNodes).some(node => {
            var _b, _c;
            return dom.DomUtils.isElementNode(node) &&
                node.classList.contains(SpinEditCssClasses.BtnsContainer) && (((_b = this.pointerDownTimer.button) === null || _b === void 0 ? void 0 : _b.isEqualNode(dom.DomUtils.getChildNodesByClassName(node, SpinEditCssClasses.IncBtn)[0])) ||
                ((_c = this.pointerDownTimer.button) === null || _c === void 0 ? void 0 : _c.isEqualNode(dom.DomUtils.getChildNodesByClassName(node, SpinEditCssClasses.DecBtn)[0])));
        }));
        if (isLongTappedButtonRemoved)
            this.stopPointerLongTap();
    }
    incrementValue(inc) {
        this.dispatchEvent(new IncrementValueEvent(inc, this.fieldElementValue));
    }
    isNavigationKey(evt) {
        return evt.keyCode === key.KeyCode.Up || evt.keyCode === key.KeyCode.Down;
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has(nameof("decimalSeparator")) || changed.has(nameof("needExponentialView")))
            this.applyRegex();
    }
    applyRegex() {
        if (this.decimalSeparator) {
            if (this.needExponentialView)
                this.regex = /^-?(\d+|[,.]\d+|\d+[,.]\d+|\d+[,.]|[,.])?([eE]?[+-]?(\d)*)?$/;
            else
                this.regex = /^-?(\d+|[,.]\d+|\d+[,.]\d+|\d+[,.]|[,.])?$/;
        }
    }
    shouldProcessKeyUp(e) {
        switch (e.key) {
            case "ArrowUp":
            case "ArrowDown":
                return this.isMaskDefined || this.bindValueMode === BindValueMode.OnDelayedInput;
        }
        return super.shouldProcessKeyUp(e);
    }
}
__decorate([
    n({ type: Boolean, attribute: SpinEditEditorAttributes.allowMouseWheel })
], DxSpinEdit.prototype, "allowMouseWheel", void 0);
__decorate([
    n({ type: Boolean, attribute: SpinEditEditorAttributes.needExponentialView })
], DxSpinEdit.prototype, "needExponentialView", void 0);
__decorate([
    n({ type: String, attribute: SpinEditEditorAttributes.decimalSeparator })
], DxSpinEdit.prototype, "decimalSeparator", void 0);
customElements.define(spinEditTagName, DxSpinEdit);
function loadModule() { }
const spinedit = { loadModule };

export { DxSpinEdit, SpinEditCssClasses, spinedit as default };
//# sourceMappingURL=spinedit-24.2.js.map
