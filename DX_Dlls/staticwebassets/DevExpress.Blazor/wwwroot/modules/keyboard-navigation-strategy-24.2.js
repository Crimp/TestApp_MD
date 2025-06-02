import { k as key } from './key-24.2.js';
import { D as DispatcherAction, F as FocusHelper } from './focushelper-24.2.js';
import { L as LayoutHelper, D as DomHelper } from './layouthelper-24.2.js';
import { F as FocusableElementsSelector } from './constants-24.2.js';
import { s as setOrRemoveAttribute, a as isScrollBarClick } from './dom-utils-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import { hasClosestFocusableElement, attachEventsForFocusHiding, addFocusHiddenAttribute, removeFocusHiddenAttribute } from './focus-utils-24.2.js';
import { g as getDeviceInfo } from './devices-24.2.js';

class FocusUtils {
    static isFocusedElement(element) {
        return element === document.activeElement;
    }
    static scheduleResetTabIndex(element) {
        FocusUtils.resetTabIndexAction.cancel();
        FocusUtils.elementsToResetTabIndex.push(element);
        FocusUtils.resetTabIndexAction.execute(() => {
            FocusUtils.elementsToResetTabIndex.forEach(el => FocusUtils.removeTabIndex(el));
            FocusUtils.elementsToResetTabIndex.splice(0); // clear
        });
    }
    static focusElement(element, preventScroll = false) {
        if (element)
            element.focus({ preventScroll: preventScroll });
    }
    static makeElementFocusable(element) {
        if (element.tabIndex < 0 && !element.hasAttribute("tabIndex"))
            setOrRemoveAttribute(element, "tabIndex", "0");
    }
    static removeTabIndex(element) {
        if (element.tabIndex >= 0)
            setOrRemoveAttribute(element, "tabIndex");
    }
    static findPrevFocusableElement(targetElement) {
        const documentFocusableElements = FocusUtils.findFocusableElements(document);
        const targetIndex = documentFocusableElements.findIndex(e => e === targetElement);
        const prevElementIndex = targetIndex - 1;
        if (prevElementIndex >= 0)
            return documentFocusableElements[prevElementIndex];
        return null;
    }
    static findNextFocusableNotChildElement(targetElement) {
        const documentFocusableElements = FocusUtils.findFocusableElements(document);
        const targetFocusableElements = FocusUtils.findFocusableElements(targetElement);
        const targetIndex = documentFocusableElements.findIndex(e => e === targetElement);
        const nextElementIndex = targetIndex + targetFocusableElements.length + 1;
        if (nextElementIndex < documentFocusableElements.length)
            return documentFocusableElements[nextElementIndex];
        return null;
    }
    static findFocusableElementInRootPath(targetElement) {
        var _a;
        const path = [...LayoutHelper.getRootPathAndSelf(targetElement)];
        return (_a = path.find(element => element.tabIndex > -1 || this.isRootWidget(element))) !== null && _a !== void 0 ? _a : null;
    }
    static isRootWidget(element) {
        if (typeof element.className === "string")
            return element.className.includes("dxbl-kbn-root-widget");
        return false;
    }
    static findFocusableElements(container) {
        return Array.from(container.querySelectorAll(FocusableElementsSelector))
            .filter((el, _, array) => FocusUtils.isElementFocusable(el, array));
    }
    static isElementFocusable(el, elements) {
        if (el.tabIndex > -1 && FocusUtils.isElementVisible(el) && !DomHelper.isHidden(el)) {
            const input = el;
            if ((input === null || input === void 0 ? void 0 : input.type) === "radio")
                return FocusUtils.isRadioButtonFocusable(input, elements);
            return true;
        }
        return false;
    }
    static isElementVisible(element) {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
    static isRadioButtonFocusable(input, elements) {
        if (input.checked)
            return true;
        elements = elements.filter((item) => (item === null || item === void 0 ? void 0 : item.name) === input.name);
        if (elements.findIndex((item) => input !== item && item.checked) > 0)
            return false;
        return input === elements[0];
    }
    static findItemElementIndexByChild(items, child) {
        return items.findIndex(element => LayoutHelper.containsElement(element, child));
    }
}
FocusUtils.elementsToResetTabIndex = [];
FocusUtils.resetTabIndexAction = new DispatcherAction();
function sortByElementPath(targetElement, map) {
    const path = [...LayoutHelper.getRootPathAndSelf(targetElement)];
    return sortByPath(path, map);
}
function sortByPath(array, map) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const key = array[i];
        if (map.has(key)) {
            const item = map.get(key);
            if (item)
                result.push(item);
        }
    }
    return result;
}

class NavigatorShortcutEvent extends CustomEvent {
    constructor(evt, info) {
        super(NavigatorShortcutEvent.eventName, {
            detail: new NavigatorShortcutEventContext(evt, info),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
NavigatorShortcutEvent.eventName = "dxbl-keyboard-navigator.shortcut";
class NavigatorShortcutEventContext {
    constructor(event, info) {
        this.Event = event;
        this.Info = JSON.stringify(info);
    }
}
CustomEventsHelper.register(NavigatorShortcutEvent.eventName, x => {
    const e = x.detail;
    return {
        "Key": e.Event.key,
        "Code": e.Event.code,
        "CtrlKey": e.Event.ctrlKey,
        "AltKey": e.Event.altKey,
        "ShiftKey": e.Event.shiftKey,
        "MetaKey": e.Event.metaKey,
        "Info": e.Info
    };
});

class KeyboardNavigatorsManager {
    get keyboardEventProcessed() {
        return this._keyboardEventProcessed;
    }
    get processingKeyCode() {
        return this._processingKeyCode;
    }
    constructor() {
        this.boundOnKeyDownHandler = this.handleKeyDown.bind(this);
        this.boundOnKeyUpHandler = this.handleKeyUp.bind(this);
        this.boundOnMouseDownHandler = this.handleMouseDown.bind(this);
        this.boundOnFocusInHandler = this.handleFocusIn.bind(this);
        this.navigators = new Map();
        this.lockTreeLineActivation = false;
        this.leavingToDocument = false;
        this._keyboardEventProcessed = false;
        this._processingKeyCode = null;
        setTimeout(this.addEventSubscriptions.bind(this));
    }
    register(navigator) {
        const key = navigator.targetElement;
        if (!this.navigators.has(key))
            this.navigators.set(key, navigator);
    }
    remove(navigator) {
        const key = navigator.targetElement;
        if (this.navigators.has(key))
            this.navigators.delete(key);
    }
    addFocusHiddenAttributes(targetElement) {
        this.forEachNavigatorInTreeLine(targetElement, (navigator) => navigator.addFocusHiddenAttribute());
    }
    removeFocusHiddenAttributes(targetElement) {
        this.forEachNavigatorInTreeLine(targetElement, (navigator) => !navigator.removeFocusHiddenAttribute());
    }
    addEventSubscriptions() {
        document.addEventListener("keydown", this.boundOnKeyDownHandler, { capture: true });
        document.addEventListener("keyup", this.boundOnKeyUpHandler, { capture: true });
        document.addEventListener("mousedown", this.boundOnMouseDownHandler, { capture: true });
        document.addEventListener("focusin", this.boundOnFocusInHandler, { capture: true });
    }
    handleKeyDown(evt) {
        this._processingKeyCode = key.KeyUtils.getEventKeyCode(evt);
        this.handleKeyboardEvent(evt, (n, t) => n.onKeyDown(evt, t));
    }
    handleKeyUp(evt) {
        this.handleKeyboardEvent(evt, (n, t) => n.onKeyUp(evt, t));
        this._processingKeyCode = null;
    }
    handleKeyboardEvent(evt, func) {
        this._keyboardEventProcessed = true;
        this.forEachNavigatorInTreeLine(evt.target, (navigator, target, index, navigators) => {
            if (func(navigator, target)) {
                let isEventHandled = true;
                if (navigator.leaveDirection !== LeaveDirection.None) {
                    const destinationNavigator = index < navigators.length - 1 ? navigators[index + 1] : null;
                    isEventHandled = this.leaveFromNavigator(navigator, destinationNavigator);
                }
                if (isEventHandled)
                    EventHelper.markHandled(evt, false);
                this.removeFocusHiddenAttributes(target);
                return true;
            }
            return navigator.getIsNestedContentSelected(target);
        });
    }
    handleMouseDown(evt) {
        this.activateTreeLine(evt, false);
        if (!isScrollBarClick(evt))
            this.updateActiveState(evt.target);
    }
    handleFocusIn(evt) {
        if (this.leavingToDocument)
            return;
        this.updateActiveState(evt.target);
        this.activateTreeLine(evt, true);
        this._keyboardEventProcessed = false;
    }
    getNavigatorsTreeLine(targetElement) {
        return createTreeLine(targetElement, this.navigators);
    }
    activateTreeLine(evt, isFocusEvent) {
        if (this.lockTreeLineActivation)
            return;
        this.lockTreeLineActivation = true;
        const eventTarget = evt.target;
        this.activateTreeLineCore(evt, eventTarget, isFocusEvent);
        this.lockTreeLineActivation = false;
    }
    activateTreeLineCore(evt, targetElement, isFocusEvent) {
        this.forEachNavigatorInTreeLine(targetElement, (navigator, target, index) => {
            navigator.updateSelectedItems(target, targetElement, evt);
            if (index === 0) {
                navigator.activateStrategyTreeLine(evt, targetElement, isFocusEvent);
                const lastSelectedStrategy = navigator.findLastSelectedStrategy();
                if (!lastSelectedStrategy || !lastSelectedStrategy.isTransitContainer || instanceOfPopupNavigator(navigator))
                    return false;
                const nestedElement = lastSelectedStrategy.getNestedContentElement();
                if (nestedElement && isFocusEvent) {
                    this.updateActiveState(nestedElement);
                    this.activateTreeLineCore(evt, nestedElement, isFocusEvent);
                    return true;
                }
            }
            return false;
        });
    }
    forEachNavigatorInTreeLine(target, func) {
        var _a;
        const treeLine = this.getNavigatorsTreeLine(target);
        for (let i = 0; i < treeLine.length; i++) {
            const navigator = treeLine[i];
            if (func(navigator, target, i, treeLine))
                break;
            const popupNavigator = instanceOfPopupNavigator(navigator) ? navigator : null;
            if (popupNavigator)
                target = (_a = popupNavigator.getPortal()) !== null && _a !== void 0 ? _a : target;
        }
    }
    updateActiveState(focusCandidate) {
        let activeNavigator = null;
        if (hasClosestFocusableElement(focusCandidate)) {
            const treeLine = sortByElementPath(focusCandidate, this.navigators);
            activeNavigator = treeLine.length > 0 ? treeLine[0] : null;
        }
        this.navigators.forEach((n) => {
            const navigator = n;
            navigator.isActive = navigator === activeNavigator;
        });
    }
    leaveFromNavigator(navigator, destinationNavigator) {
        const isBackward = navigator.leaveDirection === LeaveDirection.Backward;
        const findElementAction = isBackward
            ? FocusUtils.findPrevFocusableElement
            : FocusUtils.findNextFocusableNotChildElement;
        const nextFocusableElement = findElementAction(navigator.targetElement);
        const currentFocusableElement = navigator.getSelectedItemElement();
        const destNavSelectedElement = destinationNavigator === null || destinationNavigator === void 0 ? void 0 : destinationNavigator.getSelectedItemElement();
        const parentElement = !currentFocusableElement || (destNavSelectedElement && destNavSelectedElement.contains(currentFocusableElement)) ? destNavSelectedElement : null;
        if (nextFocusableElement && (!parentElement || (parentElement.contains(nextFocusableElement) && parentElement !== nextFocusableElement)))
            FocusUtils.focusElement(nextFocusableElement);
        else if (destinationNavigator)
            destinationNavigator.captureFocus(navigator.leaveDirection);
        else {
            this.leaveToDocument(navigator, isBackward);
            return false;
        }
        return true;
    }
    leaveToDocument(navigator, isBackward) {
        const focusableElements = FocusUtils.findFocusableElements(navigator.targetElement);
        const leavingElement = isBackward || focusableElements.length === 0
            ? navigator.targetElement
            : focusableElements[focusableElements.length - 1];
        if (!FocusUtils.isFocusedElement(leavingElement)) {
            this.leavingToDocument = true;
            FocusUtils.focusElement(leavingElement, true);
            this.leavingToDocument = false;
        }
    }
}
function createTreeLine(targetElement, map) {
    let result = [];
    do {
        const treeLine = sortByElementPath(targetElement, map);
        const lastNavigator = treeLine[treeLine.length - 1];
        result = result.concat(...treeLine);
        targetElement = !!lastNavigator && instanceOfPopupNavigator(lastNavigator) ? lastNavigator.getPortal() : null;
    } while (!!targetElement);
    return result;
}
function instanceOfPopupNavigator(object) {
    return "getPortal" in object;
}
const navigatorsManagerSingleton = new KeyboardNavigatorsManager();

const DxKeyboardNavigatorTagName = "dxbl-keyboard-navigator";
var LeaveDirection;
(function (LeaveDirection) {
    LeaveDirection[LeaveDirection["None"] = 0] = "None";
    LeaveDirection[LeaveDirection["Backward"] = 1] = "Backward";
    LeaveDirection[LeaveDirection["Forward"] = 2] = "Forward";
})(LeaveDirection || (LeaveDirection = {}));
var ComponentReactivateMode;
(function (ComponentReactivateMode) {
    ComponentReactivateMode["NearestItem"] = "NearestItem";
    ComponentReactivateMode["LastActiveItem"] = "LastActiveItem";
})(ComponentReactivateMode || (ComponentReactivateMode = {}));
class DxKeyboardNavigator extends HTMLElement {
    constructor() {
        super();
        this._isActive = false;
        this._initialized = false;
        this._leaveDirection = LeaveDirection.None;
        this._owner = null;
        this._rootStrategy = null;
        this.unsubscribeFocusHiding = null;
        this.strategies = new Map();
        this._componentReactivateMode = ComponentReactivateMode.LastActiveItem;
        this._focusedFromForwardElement = false;
        this.contentChangedObserver = new MutationObserver(this.onContentChanged.bind(this));
    }
    get rootStrategy() {
        return this._rootStrategy;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this.updateActiveState(value);
    }
    get leaveDirection() {
        return this._leaveDirection;
    }
    get initialized() {
        return this._initialized && !!this._rootStrategy;
    }
    get targetElement() {
        return this.owner;
    }
    get owner() {
        return this._owner;
    }
    get focusedFromForwardElement() {
        return this._focusedFromForwardElement;
    }
    get preventScrollOnFocus() {
        return !navigatorsManagerSingleton.keyboardEventProcessed;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "reactivate-mode")
            this._componentReactivateMode = ComponentReactivateMode[newValue];
    }
    initialize(owner, rootStrategy, reinitializingAttributeToObserve = null) {
        this._initialized = false;
        this._owner = owner;
        this._rootStrategy = rootStrategy;
        FocusUtils.makeElementFocusable(this.targetElement);
        this.register(reinitializingAttributeToObserve);
        this.unsubscribeFocusHiding = attachEventsForFocusHiding(this.targetElement);
        this.attachStrategy(this._rootStrategy);
        this._rootStrategy.initialize();
        if (FocusHelper.isFocusWithin(this.targetElement))
            this.updateSelectedItems(document.activeElement);
        this._initialized = true;
    }
    reinitialize() {
        this._initialized = false;
        if (this._rootStrategy) {
            this._rootStrategy.initialize();
            if (this.isActive)
                this._rootStrategy.activate(); // activate only prev focused grid
        }
        this._initialized = true;
    }
    disconnectedCallback() {
        this.disposeComponent();
    }
    disposeComponent() {
        var _a;
        this.disposeStrategies();
        this._rootStrategy = null;
        this.contentChangedObserver.disconnect();
        (_a = this.unsubscribeFocusHiding) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeFocusHiddenAttribute();
        navigatorsManagerSingleton.remove(this);
    }
    attachStrategy(strategy) {
        if (strategy)
            this.strategies.set(strategy.targetElement, strategy);
    }
    getStrategy(targetElement) {
        var _a;
        if (targetElement && this.strategies.has(targetElement))
            return (_a = this.strategies.get(targetElement)) !== null && _a !== void 0 ? _a : null;
        return null;
    }
    getIsNestedContentSelected(targetElement) {
        const path = this.getStrategiesPath(targetElement);
        const connectionStrategy = path.findIndex(s => s.nestedContentSelected);
        return connectionStrategy >= 0;
    }
    onKeyDown(evt, target) {
        return this.handleKeyboardEvent(target, s => s.handleKeyDown(evt));
    }
    onKeyUp(evt, target) {
        return this.handleKeyboardEvent(target, s => s.handleKeyUp(evt));
    }
    dispatchShortcutEvent(evt) {
        const info = this.collectShortcutInfo(evt);
        this.dispatchEvent(new NavigatorShortcutEvent(evt, info));
    }
    captureFocus(direction = LeaveDirection.None) {
        var _a;
        (_a = this.findLastSelectedStrategy()) === null || _a === void 0 ? void 0 : _a.captureFocus(direction);
    }
    leaveFocus(isBackward) {
        this._leaveDirection = isBackward
            ? LeaveDirection.Backward
            : LeaveDirection.Forward;
    }
    leaveFromNavigator() {
        navigatorsManagerSingleton.leaveFromNavigator(this, null);
    }
    getSelectedItemElement() {
        var _a;
        return (_a = this.findLastSelectedStrategy()) === null || _a === void 0 ? void 0 : _a.selectedItemElement;
    }
    addFocusHiddenAttribute() {
        addFocusHiddenAttribute(this.targetElement);
        return true;
    }
    removeFocusHiddenAttribute() {
        if (this.targetElement)
            removeFocusHiddenAttribute(this.targetElement);
        return true;
    }
    passFocusHiddenAttribute(target) {
        navigatorsManagerSingleton.addFocusHiddenAttributes(target);
    }
    updateSelectedItems(target, actualTarget = target, evt = null) {
        const strategies = this.getStrategiesPath(target);
        for (let i = 0; i < strategies.length; i++) {
            const isFirstStrategy = i === 0;
            const strategy = strategies[i];
            strategy.updateSelectedItemByChildElement(target, evt);
            if (target === actualTarget && strategy.canSwitchToNestedContentMode())
                strategy.nestedContentSelected = isFirstStrategy;
        }
    }
    activateStrategyTreeLine(evt, eventTarget, isFocusEvent) {
        if (isFocusEvent && this.tryActivateFromPreviousFocusedSibling(evt))
            return;
        const strategies = this.getStrategiesPath(eventTarget);
        if (strategies.length === 0)
            return;
        const firstStrategyInTreeLine = strategies[0];
        const isRootStrategy = firstStrategyInTreeLine === this._rootStrategy;
        if (isRootStrategy)
            firstStrategyInTreeLine.activate();
        if (!isRootStrategy || strategies.length === 1)
            this.handleSelectedItemFocus(firstStrategyInTreeLine, eventTarget);
    }
    tryActivateFromPreviousFocusedSibling(evt) {
        const relatedTarget = evt.relatedTarget;
        if (!relatedTarget || this.targetElement.contains(relatedTarget))
            return false;
        const eventTarget = evt.target;
        const prevFocusableSibling = FocusUtils.findPrevFocusableElement(eventTarget);
        const nextFocusableSibling = FocusUtils.findNextFocusableNotChildElement(eventTarget);
        if (relatedTarget !== prevFocusableSibling && relatedTarget !== nextFocusableSibling)
            return false;
        const strategies = this.getStrategiesPath(eventTarget);
        if (strategies.length === 0)
            return false;
        this.updateAndActivateRootStrategy(strategies[0], relatedTarget, nextFocusableSibling);
        return true;
    }
    handleSelectedItemFocus(strategy, eventTarget) {
        var _a;
        let shouldFocusSelectedItem = strategy.selectedItemElement === eventTarget;
        if (!shouldFocusSelectedItem) {
            const firstFocusableElement = FocusUtils.findFocusableElementInRootPath(eventTarget);
            if (strategy.selectedItemElement === firstFocusableElement || !((_a = strategy.selectedItemElement) === null || _a === void 0 ? void 0 : _a.contains(firstFocusableElement)))
                shouldFocusSelectedItem = true;
        }
        if (shouldFocusSelectedItem) {
            strategy.resetNestedContentSelectedRecursive();
            strategy.focusSelectedItem();
        }
    }
    updateAndActivateRootStrategy(strategy, relatedTarget, nextFocusableSibling) {
        strategy.resetNestedContentSelectedRecursive();
        if (this._rootStrategy) {
            this._focusedFromForwardElement = relatedTarget === nextFocusableSibling;
            if (this._componentReactivateMode === ComponentReactivateMode.NearestItem) {
                const itemIndex = relatedTarget === nextFocusableSibling ? this._rootStrategy.itemCount - 1 : 0;
                this._rootStrategy.updateSelectedItemByIndex(itemIndex);
            }
            this._rootStrategy.activate();
        }
    }
    updateActiveState(isActive) {
        if (this._isActive === isActive)
            return;
        this._isActive = isActive;
        this.strategies.forEach(s => s.onActiveStateChanged(isActive));
    }
    register(contentChangedAttribute) {
        const attributeFilter = ["disabled"];
        if (contentChangedAttribute)
            attributeFilter.push(contentChangedAttribute);
        this.contentChangedObserver.observe(this.targetElement, { childList: true, subtree: true, attributeFilter: attributeFilter });
        navigatorsManagerSingleton.register(this);
    }
    onContentChanged() {
        this.detachDisconnectedStrategies();
        this.reinitialize();
    }
    getStrategiesPath(target) {
        return sortByElementPath(target, this.strategies);
    }
    findLastSelectedStrategy() {
        var _a, _b;
        return (_b = (_a = this._rootStrategy) === null || _a === void 0 ? void 0 : _a.findLastSelectedStrategy()) !== null && _b !== void 0 ? _b : null;
    }
    handleKeyboardEvent(target, func) {
        this._leaveDirection = LeaveDirection.None;
        const strategies = this.getStrategiesPath(target);
        for (let i = 0; i < strategies.length; i++) {
            const strategy = strategies[i];
            if (func(strategy))
                return true;
            if (strategy.nestedContentSelected)
                return false;
        }
        return false;
    }
    detachDisconnectedStrategies() {
        var _a;
        const targetElements = Array.from(this.strategies.keys()).filter(t => !t.isConnected);
        for (const strategyTarget of targetElements) {
            (_a = this.strategies.get(strategyTarget)) === null || _a === void 0 ? void 0 : _a.onDispose();
            this.strategies.delete(strategyTarget);
        }
    }
    disposeStrategies() {
        this.strategies.forEach(strategy => strategy.onDispose());
    }
    collectShortcutInfo(evt) {
        const strategies = this.getStrategiesPath(evt.target);
        const infos = strategies.map(s => s.getShortcutContext());
        return Object.assign({}, ...infos);
    }
}
customElements.define(DxKeyboardNavigatorTagName, DxKeyboardNavigator);

class KeyboardNavigationStrategy {
    constructor(navigator, targetElement, isTransitContainer = false) {
        this._isTransitContainer = false;
        this._nestedContentSelected = false;
        this._selectedItemIndex = 0;
        this._savedSelectedItemElement = null;
        this._leaveDirection = LeaveDirection.None;
        this._navigator = navigator;
        this._targetElement = targetElement;
        this._items = [];
        this._isTransitContainer = isTransitContainer;
        this._isMacOSPlatform = getDeviceInfo().isMac;
    }
    get navigator() {
        return this._navigator;
    }
    get targetElement() {
        return this._targetElement;
    }
    get itemCount() {
        return this.items.length;
    }
    get selectedItemElement() {
        return this.items[this.selectedItemIndex];
    }
    get nestedContentSelected() {
        return this._nestedContentSelected;
    }
    set nestedContentSelected(value) {
        this._nestedContentSelected = value && this.canFocusSelectedItem();
    }
    get preventScrollOnFocus() {
        return this._navigator.preventScrollOnFocus;
    }
    get selectedItemIndex() {
        return this._selectedItemIndex;
    }
    set selectedItemIndex(value) {
        this._selectedItemIndex = value;
    }
    get isTransitContainer() {
        return this._isTransitContainer;
    }
    get leaveDirection() {
        return this._leaveDirection;
    }
    get items() {
        return this._items;
    }
    get firstItemSelected() {
        return this.selectedItemIndex === 0;
    }
    get lastItemSelected() {
        return this.selectedItemIndex === this.itemCount - 1;
    }
    get isObsolete() {
        return false;
    }
    get isMacOSPlatform() {
        return this._isMacOSPlatform;
    }
    getShortcutContext() {
        return {};
    }
    initialize() {
        this.storeSelection();
        this.items.splice(0); // clear
        const itemElements = this.queryItems().filter(element => !!element);
        if (itemElements.length === 0)
            itemElements.push(this.targetElement);
        itemElements.forEach(itemElement => this.initializeItemStrategy(itemElement));
        this.tryRestoreSelection();
    }
    activate() {
        this.selectItem(this.selectedItemIndex);
    }
    onDispose() {
        var _a;
        if ((_a = this.selectedItemElement) === null || _a === void 0 ? void 0 : _a.isConnected)
            FocusUtils.removeTabIndex(this.selectedItemElement);
    }
    getItem(index) {
        return this.items[index];
    }
    getSelectedItemStrategy() {
        return this.navigator.getStrategy(this.selectedItemElement);
    }
    focusSelectedItem() {
        if (!this.canFocusSelectedItem())
            return;
        if (!this.preventScrollOnFocus && this.selectedItemElement)
            this.selectedItemElement.scrollIntoView({ block: "nearest" });
        FocusUtils.focusElement(this.selectedItemElement, this.preventScrollOnFocus);
    }
    isIndexWithinBoundaries(index) {
        return index >= 0 && index < this.itemCount;
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (this.nestedContentSelected) {
            if (keyCode === key.KeyCode.Esc)
                return this.processEscapeKeyDown();
            if (keyCode === key.KeyCode.Tab)
                return this.processTabKeyDown(evt.shiftKey);
            if (this.isImmediatelyClickEnabled() && this.hasSingleFocusableElement())
                this.leaveFromNestedContent();
        }
        if (!this.nestedContentSelected && keyCode === key.KeyCode.Enter)
            return this.processEnter(evt);
        return false;
    }
    handleKeyUp(_evt) {
        return false;
    }
    switchToNestedContent() {
        if (this.nestedContentSelected && this.isNestedElementFocused())
            return true;
        if (this.selectedItemElement) {
            const nestedElement = this.getNestedContentElement();
            if (nestedElement) {
                this.nestedContentSelected = true;
                FocusUtils.focusElement(nestedElement, this.preventScrollOnFocus);
                return true;
            }
        }
        return false;
    }
    leaveFromNestedContent(direction = LeaveDirection.None) {
        this.nestedContentSelected = false;
        if (this.isTransitContainer) {
            this._leaveDirection = direction;
            this.navigator.isActive = true;
            if (this.leaveDirection !== LeaveDirection.None)
                this.leaveTransitContainer(this.leaveDirection);
            this._leaveDirection = LeaveDirection.None;
        }
        else
            this.focusSelectedItem();
    }
    resetNestedContentSelectedRecursive() {
        this.nestedContentSelected = false;
        const isSelfLoopbackStrategy = this.targetElement === this.selectedItemElement;
        if (!isSelfLoopbackStrategy) {
            const selectedItemStrategy = this.getSelectedItemStrategy();
            selectedItemStrategy === null || selectedItemStrategy === void 0 ? void 0 : selectedItemStrategy.resetNestedContentSelectedRecursive();
        }
    }
    captureFocus(direction = LeaveDirection.None) {
        if (this.nestedContentSelected)
            this.leaveFromNestedContent(direction);
    }
    findLastSelectedStrategy() {
        const strategy = this.getSelectedItemStrategy();
        if (strategy && strategy !== this)
            return strategy.findLastSelectedStrategy();
        return this;
    }
    updateSelectedItemByIndex(index) {
        const prevSelectedItemElement = this.selectedItemElement;
        this.selectedItemIndex = this.validateItemIndex(index);
        if (prevSelectedItemElement && this.selectedItemElement !== prevSelectedItemElement) {
            FocusUtils.scheduleResetTabIndex(prevSelectedItemElement);
            this.nestedContentSelected = false;
        }
        if (this.selectedItemElement && this.canFocusSelectedItem())
            FocusUtils.makeElementFocusable(this.selectedItemElement);
    }
    updateSelectedItemByChildElement(childElement, _evt = null) {
        const index = this.findItemElementIndexByChild(childElement);
        if (index > -1 || childElement === this.targetElement)
            this.updateSelectedItemByIndex(index);
    }
    canSwitchToNestedContentMode() {
        return false;
    }
    onActiveStateChanged(_isActive) {
        // do nothing yet
    }
    leaveTransitContainer(_direction) {
        // do nothing yet
    }
    createItemStrategy(_itemElement) {
        return null;
    }
    getItemStrategy(index) {
        const validatedIndex = this.validateItemIndex(index);
        return this.navigator.getStrategy(this.getItem(validatedIndex));
    }
    queryItems() {
        return new Array();
    }
    queryItemsBySelector(itemSelector) {
        return Array.from(this.targetElement.querySelectorAll(itemSelector));
    }
    selectItem(index) {
        var _a;
        this.updateSelectedItemByIndex(index);
        if (this.canFocusSelectedItem()) {
            if (this.navigator.isActive && !this.isNestedElementFocused())
                this.focusSelectedItem();
        }
        else
            (_a = this.getSelectedItemStrategy()) === null || _a === void 0 ? void 0 : _a.activate();
    }
    moveToPrevItem(isLoop = false) {
        if (this.selectedItemIndex > 0)
            this.selectItem(this.selectedItemIndex - 1);
        else if (isLoop)
            this.selectItem(this.itemCount - 1);
    }
    moveToNextItem(isLoop = false) {
        if (this.selectedItemIndex < this.itemCount - 1)
            this.selectItem(this.selectedItemIndex + 1);
        else if (isLoop)
            this.selectItem(0);
    }
    moveToFirstItem() {
        this.selectItem(0);
    }
    moveToLastItem() {
        this.selectItem(this.itemCount - 1);
    }
    isImmediatelyClickEnabled() {
        return false;
    }
    raiseClickEvent(target, ctrlKey, metaKey, shiftKey) {
        const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey, metaKey, shiftKey });
        target.dispatchEvent(clickEvent);
    }
    performShortcutEvent(evt) {
        this.navigator.dispatchShortcutEvent(evt);
    }
    validateItemIndex(index) {
        index = Math.max(index, 0);
        return Math.min(index, this.itemCount - 1);
    }
    leaveBackward() {
        this.navigator.leaveFocus(true);
    }
    leaveForward() {
        this.navigator.leaveFocus(false);
    }
    getNestedContentContainer() {
        return this.selectedItemElement;
    }
    getNestedContentElement() {
        const focusableElements = this.findFocusableElements();
        if (focusableElements.length > 0)
            return focusableElements[0];
        return null;
    }
    findItemElementIndexByChild(childElement) {
        return FocusUtils.findItemElementIndexByChild(this.items, childElement);
    }
    tryRestoreSelectedItem(itemElementToRestore) {
        if (itemElementToRestore.isConnected) {
            const itemIndex = this.items.indexOf(itemElementToRestore);
            if (itemIndex > -1)
                this.selectedItemIndex = itemIndex;
        }
    }
    initializeItemStrategy(itemElement) {
        this.items.push(itemElement);
        let strategy = this.navigator.getStrategy(itemElement);
        if (!strategy || strategy.isObsolete) {
            strategy === null || strategy === void 0 ? void 0 : strategy.onDispose();
            strategy = this.createItemStrategy(itemElement);
            this.navigator.attachStrategy(strategy);
        }
        if (strategy && strategy !== this)
            strategy.initialize();
    }
    canFocusSelectedItem() {
        if (this.targetElement === this.selectedItemElement) // empty group panel
            return true;
        return !this.getSelectedItemStrategy();
    }
    processEnter(evt) {
        if (this.isImmediatelyClickEnabled() && this.processImmediatellyClick(evt))
            return true;
        return this.switchToNestedContent();
    }
    processEscapeKeyDown() {
        this.leaveFromNestedContent(LeaveDirection.None);
        return true;
    }
    processTabKeyDown(shift) {
        if (this.selectedItemElement) {
            const focusableElements = this.findFocusableElements();
            if (focusableElements.length > 0) {
                const firstElementFocused = FocusUtils.isFocusedElement(focusableElements[0]);
                const lastElementFocused = FocusUtils.isFocusedElement(focusableElements[focusableElements.length - 1]);
                let leaveDirection = null;
                if (shift && firstElementFocused)
                    leaveDirection = LeaveDirection.Backward;
                if (!shift && lastElementFocused)
                    leaveDirection = LeaveDirection.Forward;
                if (leaveDirection) {
                    this.leaveFromNestedContent(leaveDirection);
                    return true;
                }
            }
        }
        return false;
    }
    findFocusableElements() {
        return FocusUtils.findFocusableElements(this.getNestedContentContainer());
    }
    processImmediatellyClick(evt) {
        const element = this.getNestedContentElement();
        if (element && this.hasSingleFocusableElement()) {
            this.raiseClickEvent(element, evt.ctrlKey, evt.metaKey, evt.shiftKey);
            return true;
        }
        return false;
    }
    hasSingleFocusableElement() {
        const focusableElements = this.findFocusableElements();
        return focusableElements.length === 1;
    }
    isNestedElementFocused() {
        if (!document.activeElement || !this.nestedContentSelected)
            return false;
        const parentItemIndex = FocusUtils.findItemElementIndexByChild(this.items, document.activeElement);
        return parentItemIndex === this.selectedItemIndex;
    }
    storeSelection() {
        this._savedSelectedItemElement = this.selectedItemElement;
    }
    tryRestoreSelection() {
        if (!this._savedSelectedItemElement)
            return false;
        this.tryRestoreSelectedItem(this._savedSelectedItemElement);
        this._savedSelectedItemElement = null;
        return true;
    }
}

export { DxKeyboardNavigator as D, FocusUtils as F, KeyboardNavigationStrategy as K, LeaveDirection as L, DxKeyboardNavigatorTagName as a, navigatorsManagerSingleton as n };
//# sourceMappingURL=keyboard-navigation-strategy-24.2.js.map
