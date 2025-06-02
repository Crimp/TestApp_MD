import { L as LogicalTreeHelper } from './logicaltreehelper-24.2.js';
import { L as LayoutHelper } from './layouthelper-24.2.js';

class DispatcherAction {
    constructor() {
        this.action = null;
        this.handle = null;
    }
    execute(action) {
        this.cancel();
        this.action = action;
        this.handle = setTimeout(() => {
            var _a;
            (_a = this.action) === null || _a === void 0 ? void 0 : _a.call(this);
            this.handle = null;
            this.action = null;
        }, 0);
    }
    cancel() {
        if (this.handle) {
            clearTimeout(this.handle);
            this.action = null;
            this.handle = null;
        }
    }
}

class FocusHelper {
    static isFocused(el) {
        return el === document.activeElement;
    }
    static isFocusWithin(el, logicalTree = false) {
        if (logicalTree)
            return LogicalTreeHelper.containsElement(el, document.activeElement);
        return LayoutHelper.containsElement(el, document.activeElement);
    }
    static restoreFocus(el) {
        el.focus({ preventScroll: false });
    }
    static cancelRestoreFocus() {
        this.restoreFocusAction.cancel();
    }
    static unfocus() {
        FocusHelper.cancelRestoreFocus();
        const element = document.activeElement;
        if (element)
            element.blur();
    }
}
FocusHelper.restoreFocusAction = new DispatcherAction();

export { DispatcherAction as D, FocusHelper as F };
//# sourceMappingURL=focushelper-24.2.js.map
