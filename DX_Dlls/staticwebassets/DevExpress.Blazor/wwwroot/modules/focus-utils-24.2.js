import { k as key } from './key-24.2.js';
import { F as FocusableElementsSelector } from './constants-24.2.js';
import { d as disposeEvents, r as registerDisposableEvents } from './disposable-24.2.js';
import { L as LogicalTreeHelper } from './logicaltreehelper-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';

const FocusHiddenAttributeName = "data-dx-focus-hidden";
function addFocusHiddenAttribute(element) {
    element.setAttribute(FocusHiddenAttributeName, "");
}
function removeFocusHiddenAttribute(element) {
    element.removeAttribute(FocusHiddenAttributeName);
}
function containsFocusHiddenAttribute(element) {
    return element.getAttribute(FocusHiddenAttributeName) !== null;
}
function attachEventsForFocusHiding(mainElement) {
    let _mainElement = mainElement;
    function onGlobalClick(e) {
        const isScreenReaderEvent = e.type === "mousedown" && e.detail === 0;
        const alreadyHidden = _mainElement === null || _mainElement === void 0 ? void 0 : _mainElement.hasAttribute(FocusHiddenAttributeName);
        if (isScreenReaderEvent || !_mainElement || alreadyHidden)
            return;
        if (LogicalTreeHelper.containsElement(_mainElement, e.target))
            addFocusHiddenAttribute(_mainElement);
    }
    function onFocusOut(e) {
        if (!_mainElement)
            return;
        const relatedTarget = e.relatedTarget;
        if (relatedTarget && !LogicalTreeHelper.containsElement(_mainElement, relatedTarget) && document.hasFocus())
            removeFocusHiddenAttribute(_mainElement);
    }
    function onKeyDown(e) {
        if (!_mainElement)
            return;
        if (key.KeyUtils.getEventKeyCode(e) === key.KeyCode.Tab)
            removeFocusHiddenAttribute(_mainElement);
    }
    const documentElement = document.documentElement;
    documentElement.addEventListener("touchstart", onGlobalClick);
    documentElement.addEventListener("mousedown", onGlobalClick);
    _mainElement.addEventListener("keydown", onKeyDown);
    _mainElement.addEventListener("focusout", onFocusOut);
    return () => {
        documentElement.removeEventListener("touchstart", onGlobalClick);
        documentElement.removeEventListener("mousedown", onGlobalClick);
        _mainElement === null || _mainElement === void 0 ? void 0 : _mainElement.removeEventListener("keydown", onKeyDown);
        _mainElement === null || _mainElement === void 0 ? void 0 : _mainElement.removeEventListener("focusout", onFocusOut);
        _mainElement = null;
    };
}
function initFocusHidingEvents(mainElement) {
    if (!mainElement)
        return;
    disposeEvents(mainElement);
    const unsubscribe = attachEventsForFocusHiding(mainElement);
    registerDisposableEvents(mainElement, unsubscribe);
}
function isFocusableElement(element) {
    return element !== null && element.matches(FocusableElementsSelector);
}
function hasClosestFocusableElement(element) {
    return element !== null && element.closest(FocusableElementsSelector) !== null;
}
const focusUtils = {
    initFocusHidingEvents
};

export { FocusHiddenAttributeName, addFocusHiddenAttribute, attachEventsForFocusHiding, containsFocusHiddenAttribute, focusUtils as default, hasClosestFocusableElement, initFocusHidingEvents, isFocusableElement, removeFocusHiddenAttribute };
//# sourceMappingURL=focus-utils-24.2.js.map
