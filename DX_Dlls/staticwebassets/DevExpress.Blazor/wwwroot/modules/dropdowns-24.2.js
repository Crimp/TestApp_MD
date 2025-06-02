import { k as key } from './key-24.2.js';
import { t as touch } from './touch-24.2.js';
import { c as changeDom, n as setStyles, t as toggleCssClass, o as clearStyles, g as getCurrentStyleSheet, p as getVerticalScrollBarWidth, q as isContainingBlockForAbsolutelyPositionedElement, e as ensureElement, b as getParentByClassName, d as subscribeElementContentSize, v as elementIsInDOM, w as setAttribute, i as isRemovedFromDOM, R as RequestAnimationFrame } from './dom-utils-24.2.js';
import { d as disposeEvents, r as registerDisposableEvents } from './disposable-24.2.js';
import { scrollToFocusedItem } from './grid-24.2.js';
import { d as dom } from './dom-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { addFocusHiddenAttribute, initFocusHidingEvents } from './focus-utils-24.2.js';
import { E as EventRegister } from './eventRegister-24.2.js';
import { getClientRectWithMargins, getClientRect, PointBlz, geometry } from './dragAndDropUnit-24.2.js';
import { F as FocusableElementsSelector } from './constants-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './evt-24.2.js';
import './svg-utils-24.2.js';
import './column-resize-24.2.js';
import './dx-style-helper-24.2.js';
import './tslib.es6-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './lit-element-24.2.js';
import './custom-element-24.2.js';
import './dx-listbox-24.2.js';
import './dx-ui-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './property-24.2.js';

const targetNode = document.body;
const deletePromises = new WeakMap();
const removeHandlers = new Map();
const config = { subtree: true, childList: true };
const observer = new MutationObserver(processMutations);
function processMutations(mutationsList) {
    mutationsList.forEach(processMutation);
}
function processMutation(mutation) {
    mutation.removedNodes.forEach(processRemovedNode);
}
function processRemovedNode(node) {
    const callback = removeHandlers.get(node);
    if (removeHandlers.delete(node)) {
        if (removeHandlers.size === 0)
            observer.disconnect();
        callback();
    }
}
function whenDeleted(element) {
    if (deletePromises.has(element))
        return deletePromises.get(element);
    const result = new Promise(processPromiseContext);
    deletePromises.set(element, result);
    return result;
    function processPromiseContext(resolve) {
        if (removeHandlers.size === 0)
            observer.observe(targetNode, config);
        removeHandlers.set(element, () => {
            resolve(undefined);
        });
    }
}

const showCssClass = "show";
const matrixRegex = "\\s*matrix\\(\\s*" + ([0, 0, 0, 0, 0, 0].map(function() { return "(\\-?\\d+\\.?\\d*)"; }).join(",\\s*")) + "\\)\\s*";

const DockPointAbove = "above";
const DockPointBelow = "below";
const DockPointAboveInner = "above-inner";
const DockPointBelowInner = "below-inner";
const DockPointTopSides = "top-sides";
const DockPointBottomSides = "bottom-sides";
const DockPointOutsideLeft = "outside-left";
const DockPointOutsideRight = "outside-right";
const DockPointLeftSides = "left-sides";
const DockPointRightSides = "right-sides";

const ResizingAttributeName = "resizing";

function pxToNumber(px) {
    let result = 0;
    if(px != null && px !== "") {
        try {
            const indexOfPx = px.indexOf("px");
            if(indexOfPx > -1)
                result = parseFloat(px.substr(0, indexOfPx));
        }
        catch(e) { }
    }
    return Math.ceil(result);
}

function parseTranslateInfo(styles) {
    const m = new RegExp(matrixRegex).exec(styles.transform);
    return m ? { left: parseInt(m[5]), top: parseInt(m[6]) } : { left: 0, top: 0 };
}
function translatePosition(styles, x, y) {
    styles["transform"] = "matrix(1, 0, 0, 1, " + x + ", " + y + ")";
}
function getBoundingBox(x, y, w, h) { return { left: x, top: y, right: x + w, bottom: y + h, width: w, height: h }; }
function getSafeBoundingBox(element, roundLT, roundRB) {
    const box = element.getBoundingClientRect();
    const safeBox = { left: roundLT(box.left), top: roundLT(box.top), right: roundRB(box.right), bottom: roundRB(box.bottom) };
    safeBox.width = safeBox.right - safeBox.left;
    safeBox.height = safeBox.bottom - safeBox.top;
    return safeBox;
}
function getOuterBoundingBox(element) {
    return getSafeBoundingBox(element, Math.floor, Math.ceil);
}
function getInnerBoundingBox(element) {
    return getSafeBoundingBox(element, Math.ceil, Math.floor);
}
class DockPoint {
    constructor(key, info) {
        this.key = key;
        this.info = info;
    }
    checkMargin() { return true; }
    allowScroll() { return this.info.size === "height"; }
    canApplyToElement(element) { return element.className.indexOf("dxbs-align-" + this.key) > -1; }
    getRange(dockInfo) {
        const c1 = this.getTargetBox(dockInfo)[this.info.to];
        const c2 = c1 + this.info.sizeM * (dockInfo.elementBox[this.info.size] + (this.checkMargin() ? dockInfo.margin : 0));
        return {
            from: Math.min(c1, c2),
            to: Math.max(c1, c2),
            windowOverflow: 0
        };
    }
    getTargetBox(dockInfo) { return null; }
    validate(range, windowInfo) {
        const windowSize = windowInfo[this.info.size];
        range.windowOverflow = Math.abs(Math.min(0, range.from - windowSize.from) + Math.min(0, windowSize.to - range.to));
        range.validTo = Math.min(range.to, windowSize.to);
        range.validFrom = Math.max(range.from, windowSize.from);
        return range.windowOverflow === 0;
    }
    applyRange(range, dockInfo) {
        dockInfo.appliedModifierKeys[this.info.size] = this.key;
        const side = this.info.size === "width" ? "left" : "top";
        const style = dockInfo.styles;
        let from = range.from;
        if(this.allowScroll() && range.windowOverflow > 0) {
            if(!dockInfo.limitBox.scroll.width) {
                dockInfo.limitBox.scroll.width = true;
                dockInfo.limitBox.width.to -= getVerticalScrollBarWidth();
            }
            if(dockInfo.isScrollable) {
                style["max-height"] = dockInfo.height - range.windowOverflow + "px";
                dockInfo.width += getVerticalScrollBarWidth();
                dockInfo.elementBox.width += getVerticalScrollBarWidth();
                from = range.validFrom;
            }
        }
        style.width = dockInfo.width + "px";
        if(this.checkMargin())
            from += Math.max(0, this.info.sizeM) * dockInfo.margin;
        dockInfo.elementBox[side] += from;
        translatePosition(style, dockInfo.elementBox.left, dockInfo.elementBox.top);

    }
    dockElementToTarget(dockInfo) {
        const range1 = this.getRange(dockInfo);
        if(!this.dockElementToTargetInternal(range1, dockInfo))
            this.applyRange(range1, dockInfo);
    }
    dockElementToTargetInternal(range1, dockInfo) { }
}
class OuterDockPoint extends DockPoint {
    constructor(name, info, oppositePointName) {
        super(name, info, oppositePointName);
        this.oppositePointName = oppositePointName || null;
    }
    getTargetBox(dockInfo) { return this.info.useInnerTargetBox ?  dockInfo.targetBox.inner: dockInfo.targetBox.outer; }
    getOppositePoint() {
        return this._oppositePoint || (this._oppositePoint = dockPoints.filter(function(d) {
            return d.key === this.oppositePointName;
        }.bind(this))[0]);
    }
    dockElementToTargetInternal(range1, dockInfo) {
        if(this.validate(range1, dockInfo.limitBox))
            this.applyRange(range1, dockInfo);
        else {
            const oppositePoint = this.getOppositePoint();
            const range2 = oppositePoint.getRange(dockInfo);
            if(oppositePoint.validate(range2, dockInfo.limitBox) || range2.windowOverflow < range1.windowOverflow)
                oppositePoint.applyRange(range2, dockInfo);
            else
                return false;
        }
        return true;
    }
}
class InnerDockPoint extends DockPoint {
    checkMargin() { return false; }
    getTargetBox(dockInfo) { return dockInfo.targetBox.inner; }
    dockElementToTargetInternal(range1, dockInfo) {
        if ((this.info.isHorizontal && dockInfo.fitHorizontally) || (!this.info.isHorizontal && dockInfo.fitVertically))
            this.validate(range1, dockInfo.limitBox);
        return false;
    }
     
    validate(range, windowInfo) {
        const toOverflow = Math.min(range.from, Math.max(0, range.to - windowInfo[this.info.size].to));
        if(toOverflow > 0) {
            range.from -= toOverflow;
            range.to -= toOverflow;
        }
        return super.validate(range, windowInfo);
    }
}
const dockPoints = [
    new OuterDockPoint(DockPointAbove, { to: "top", from: "bottom", size: "height", sizeM: -1, isHorizontal: false }, DockPointBelow),
    new OuterDockPoint(DockPointBelow, { to: "bottom", from: "top", size: "height", sizeM: 1, isHorizontal: false }, DockPointAbove),
    new OuterDockPoint(DockPointAboveInner, { to: "top", from: "bottom", size: "height", sizeM: -1, isHorizontal: false, useInnerTargetBox: false }, DockPointBelowInner),
    new OuterDockPoint(DockPointBelowInner, { to: "bottom", from: "top", size: "height", sizeM: 1, isHorizontal: false, useInnerTargetBox: true }, DockPointAboveInner),
    new InnerDockPoint(DockPointTopSides, { to: "top", from: "top", size: "height", sizeM: 1, isHorizontal: false }),
    new InnerDockPoint(DockPointBottomSides, { to: "bottom", from: "bottom", size: "height", sizeM: -1, isHorizontal: false }),
    new OuterDockPoint(DockPointOutsideLeft, { to: "left", from: "right", size: "width", sizeM: -1, isHorizontal: true }, DockPointOutsideRight),
    new OuterDockPoint(DockPointOutsideRight, { to: "right", from: "left", size: "width", sizeM: 1, isHorizontal: true }, DockPointOutsideLeft),
    new InnerDockPoint(DockPointLeftSides, { to: "left", from: "left", size: "width", sizeM: 1, isHorizontal: true }),
    new InnerDockPoint(DockPointRightSides, { to: "right", from: "right", size: "width", sizeM: -1, isHorizontal: true })
];

function getElementPopupInfo(element, targetElement, settings) {
    const elementStyle = getCurrentStyleSheet();
    const box = getOuterBoundingBox(element);
    const targetBox = getInnerBoundingBox(targetElement);
    const docEl = element.ownerDocument.documentElement;

    const result = {
        isScrollable: dom.DomUtils.hasClassName(element, "dxbs-scrollable"),
        specifiedOffsetModifiers: dockPoints.filter(function(m) { return m.canApplyToElement(element); }),
        margin: pxToNumber(elementStyle.marginTop),
        width: settings ? Math.max(settings.width, Math.ceil(element.offsetWidth)) : Math.ceil(element.offsetWidth),
        height: Math.ceil(element.offsetHeight),
        appliedModifierKeys: { height: null, width: null },
        fitHorizontally: settings.fitHorizontally,
        fitVertically: settings.fitVertically
    };
    const styles = parseTranslateInfo(elementStyle);
    const left = element.classList.contains(CssClasses.InvisibleOffScreen) || element[ResizingAttributeName] ? targetBox.left : box.left;
    result.elementBox = getBoundingBox(styles.left - left, styles.top - box.top, box.width, box.height);
    result.targetBox = { outer: getOuterBoundingBox(targetElement), inner: getInnerBoundingBox(targetElement) };
    result.limitBox = {
        scroll: { width: docEl.clientWidth < window.innerWidth, height: docEl.clientHeight < window.innerHeight },
        width: { from: 0, to: docEl.clientWidth },
        height: { from: 0, to: docEl.clientHeight }
    };
    result.styles = {};
    const highPriorityModifiersData = element.getAttribute("data-popup-align") || settings && settings.align;
    const highPriorityModifiers = highPriorityModifiersData.split(/\s+/);
    result.offsetModifiers = dockPoints.filter(function(m) {
        return highPriorityModifiers.some(function(k) { return m.key === k; });
    });
    return result;
}
function preparePosition(element, targetElement, settings, onShow) {
    return changeDom(function() {
        const dockInfo = getElementPopupInfo(element, targetElement, settings);
        for(let i = 0; i < dockInfo.offsetModifiers.length; i++)
            dockInfo.offsetModifiers[i].dockElementToTarget(dockInfo);
        onShow(dockInfo);
        setStyles(element, dockInfo.styles);
    });
}
function show(element, targetElement, align, fitHorizontally = true, fitVertically= true, onShow = dockInfo => {}) {
    if(targetElement === null)
        return;
    preparePosition(element, targetElement, {align: align, fitHorizontally: fitHorizontally, fitVertically: fitVertically}, onShow);
    toggleCssClass(element, showCssClass, true);
    clearStyles(element);
}

function getElementPaddingRight(element) {
    return parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"));
}

function getScrollbarWidth() {
    return window.innerWidth - document.body.getBoundingClientRect().width;
}

class APoints {
    constructor(element, getClientRect) {
        this.element = element;
        this.getClientRect = getClientRect;
    }
    get leftTopCorner() {
        const aPoint = this;
        return new APoint(this.element, function(e) { return aPoint.getClientRect(e); }, function(_) { return { x: 0, y: 0 }; });
    }
    get leftBottomCorner() {
        const aPoint = this;
        return new APoint(this.element,
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(p.x, p.bottom);
            },
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(0, -p.height);
            });
    }
    get rightTopCorner() {
        const aPoint = this;
        return new APoint(this.element,
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(p.right, p.y);
            },
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(-p.width, 0);
            });
    }
    get rightBottomCorner() {
        const aPoint = this;
        return new APoint(this.element,
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(p.right, p.bottom);
            },
            function(e) {
                const p = aPoint.getClientRect(e);
                return new PointBlz(-p.width, -p.height);
            });
    }
    get center() {
        const aPoint = this;
        return new APoint(this.element, function(e) {
            const p = aPoint.getClientRect(e);
            return p.center;
        });
    }
}

class APoint {
    constructor(element, getLocation, getDelta) {
        this.element = element;
        this.getLocation = getLocation;
        this.getDelta = getDelta;
    }
    get location() {
        return this.getLocation(this.element);
    }
    get delta() {
        return this.getDelta(this.element);
    }
    anchorTo(an) {
        return new AnchorTracker(this, an);
    }
}

function getAllParentBySelector(element, selector) {
    const list = [];
    while(element !== null) {
        if(element.tagName === "BODY" || element.nodeName === "#document")
            break;
        if(selector(element))
            list.push(element);
        element = element.parentNode;
    }
    return list.length === 0 ? null : list;
}

class AnchorTracker {
    constructor(point, anchor) {
        this.point = point;
        this.anchor = anchor;
        this.events = new EventRegister(this);

        const toSubscribe = [];
        toSubscribe.push([ window, "resize" ]);
        toSubscribe.push([ window, "scroll" ]);
        this.containers = getAllParentBySelector(this.anchor.element.parentNode, this.isElementScrollable);
        if(this.containers) this.containers.forEach(function(e) { toSubscribe.push([e, "scroll"]); });
        this.checkInCasesInt(toSubscribe);

        if(typeof (ResizeObserver) !== "undefined") {
            const tracker = this;
            this.resizeObserver = new window.ResizeObserver(function() { tracker.update(); });
            this.resizeObserver.observe(this.anchor.element);
            this.resizeObserver.observe(this.point.element);
        }
        else
            this.resizeObserver = null;

        let parent = this.point.element.offsetParent;
        if(parent === null)
            this.notStaticParent = { x: 0, y: 0, scrollTop: 0, scrollLeft: 0 };
        else
            this.notStaticParent = isContainingBlockForAbsolutelyPositionedElement(parent) ? parent : window;
        this.update();
    }

    isElementScrollable(element) {
        const stl = window.getComputedStyle(element);
        return (stl["position"] === "static" && (stl["overflow-x"] === "scroll" || stl["overflow-y"] === "scroll" || stl["overflow-x"] === "auto" || stl["overflow-y"] === "auto"));
    }

    update() {
        const scrolling = this.notStaticParent === window ? { x: window.scrollX, y: window.scrollY } : { x: this.notStaticParent.scrollLeft, y: this.notStaticParent.scrollTop };
        const p = geometry(this.anchor.location, "+", this.point.delta, "-", this.notStaticParent, "+", scrolling);
        const target = this.point.element;

        changeDom(function() {
            target.style.left = p.x + "px";
            target.style.top = p.y + "px";
        });
    }

    checkInCasesInt(_events) {
        const ev = this.events;
        _events.forEach(function(e) { ev.attachEvent(e[0], e[1], function(_) { this.update(); }); });
    }

    checkInCases() {
        if(!this.containers)
            return this;
        this.checkInCasesInt(Array.from(arguments));
        this.update();
        return this;
    }

    dispose() {
        if(this.events) {
            this.events.dispose();
            this.events = null;
            this.dropDownStartPos = null;
            this.containers = null;
            if(this.resizeObserver) this.resizeObserver.disconnect();
        }
    }
}

function pointsWithMargins(element) {
    return new APoints(element, getClientRectWithMargins);
}
function points(element) {
    return new APoints(element, getClientRect);
}

var DialogType;
(function (DialogType) {
    DialogType[DialogType["Popup"] = 0] = "Popup";
    DialogType[DialogType["Modal"] = 1] = "Modal";
})(DialogType || (DialogType = {}));
var DropDownDirection;
(function (DropDownDirection) {
    DropDownDirection[DropDownDirection["Down"] = 1] = "Down";
    DropDownDirection[DropDownDirection["Up"] = 2] = "Up";
    // OnSelectedItem: 3     --To be developed
})(DropDownDirection || (DropDownDirection = {}));
const DropDownEdgePadding = 8;
const DropDownResizeObservers = new WeakMap();
let dropDownPositionTracker;
const openedDialogs = [];
function getDropDownElement(mainElement) {
    mainElement = ensureElement(mainElement);
    let result = mainElement.querySelector(".dxbs-dm.dropdown-menu");
    if (!result)
        result = mainElement.querySelector(".dxgvCSD.dxbs-grid-vsd");
    return result;
}
function updateGridDropDown(mainElement, dropDownDirection, allowMultiSelect, dropDownWidthMode) {
    return new Promise((resolve, _) => {
        let dropDownElement = getDropDownElement(mainElement);
        dropDownElement = ensureElement(dropDownElement);
        if (!dropDownElement) {
            resolve();
            return;
        }
        if (dropDownWidthMode === 0) // DropDownWidthMode.ContentOrEditorWidth
            dropDownElement.style.minWidth = mainElement.offsetWidth + "px";
        if (dropDownWidthMode === 2) { // DropDownWidthMode.EditorWidth
            dropDownElement.style.width = mainElement.offsetWidth + "px";
        }
        setPositionOfDropDown(mainElement, dropDownElement, dropDownDirection);
        scrollToFocusedItem(dropDownElement);
        resolve();
    });
}
function setPositionOfDropDown(mainElement, dropDownElement, dropDownDirection) {
    if (DropDownResizeObservers.has(mainElement)) {
        DropDownResizeObservers.get(mainElement).disconnect();
        DropDownResizeObservers.delete(mainElement);
    }
    const parentElement = dropDownElement.offsetParent;
    if (!parentElement) {
        changeDom(function () {
            dropDownElement.style.visibility = "";
        });
        return;
    }
    const parentElementRect = parentElement.getBoundingClientRect();
    const mainElementRect = mainElement.getBoundingClientRect();
    const mainElement_top = mainElementRect.top - parentElementRect.top;
    const mainElement_bottom = parentElementRect.bottom - mainElementRect.bottom;
    let directionUp;
    const dropDownStyle = window.getComputedStyle(dropDownElement);
    const dropDownHeight = dropDownElement.offsetHeight + Math.max(parseFloat(dropDownStyle.marginTop), 0) + Math.max(parseFloat(dropDownStyle.marginBottom), 0) + DropDownEdgePadding;
    switch (dropDownDirection) {
        case DropDownDirection.Up: {
            const dropDownElement_top = mainElement_top - dropDownHeight;
            directionUp = true;
            if (parentElementRect.top + dropDownElement_top <= 0 && parentElementRect.top + mainElement_top + mainElement.offsetHeight + dropDownHeight + window.pageYOffset <= Math.max(document.body.scrollHeight, window.innerHeight))
                directionUp = false;
            break;
        }
        case DropDownDirection.Down:
        default: {
            const dropDownElement_bottom = mainElement_bottom - dropDownHeight;
            directionUp = false;
            if (parentElementRect.bottom - dropDownElement_bottom >= window.innerHeight && parentElementRect.top + mainElement_top - dropDownHeight + window.pageYOffset >= 0)
                directionUp = true;
            break;
        }
    }
    const alignRight = (mainElementRect.left + dropDownElement.offsetWidth + DropDownEdgePadding >= document.body.clientWidth) &&
        (mainElementRect.right - dropDownElement.offsetWidth - DropDownEdgePadding > 0);
    changeDom(() => {
        if (dropDownPositionTracker)
            dropDownPositionTracker.dispose();
        if (directionUp) {
            if (alignRight)
                dropDownPositionTracker = pointsWithMargins(dropDownElement).rightBottomCorner.anchorTo(points(mainElement).rightTopCorner);
            else
                dropDownPositionTracker = pointsWithMargins(dropDownElement).leftBottomCorner.anchorTo(points(mainElement).leftTopCorner);
        }
        else {
            if (alignRight)
                dropDownPositionTracker = pointsWithMargins(dropDownElement).rightTopCorner.anchorTo(points(mainElement).rightBottomCorner);
            else
                dropDownPositionTracker = pointsWithMargins(dropDownElement).leftTopCorner.anchorTo(points(mainElement).leftBottomCorner);
        }
        dropDownElement.style.visibility = "";
    });
}
const DropAlignment = [
    { value: 0, text: "" },
    { value: 1, text: DockPointAbove },
    { value: 2, text: DockPointBelow },
    { value: 4, text: DockPointTopSides },
    { value: 8, text: DockPointBottomSides },
    { value: 16, text: DockPointOutsideLeft },
    { value: 32, text: DockPointOutsideRight },
    { value: 64, text: DockPointLeftSides },
    { value: 128, text: DockPointRightSides },
    { value: 256, text: DockPointAboveInner },
    { value: 512, text: DockPointBelowInner }
];
function onOutsideClick(evt, mainElement, onOutsideClick) {
    let element = evt.target;
    while (element) {
        if (element === mainElement)
            return;
        element = element.parentElement;
    }
    if (onOutsideClick)
        onOutsideClick();
}
function isDropDownVisible(el) {
    return el.style.visibility !== "hidden" || el.classList.contains("dxbs-visually-hidden");
}
function init(mainElement, input, dropDownElement, dotnetHelper) {
    mainElement = ensureElement(mainElement);
    input = ensureElement(input);
    dropDownElement = ensureElement(dropDownElement);
    if (!mainElement)
        return Promise.reject("failed");
    disposeEvents(mainElement);
    if (dropDownElement) {
        const documentMDown = (evt) => {
            onOutsideClick(evt, mainElement, function () {
                if (!elementIsInDOM(mainElement))
                    disposeEvents(mainElement);
                const willBlur = document.activeElement === input;
                const willBeClosed = dropDownElement && isDropDownVisible(dropDownElement);
                if (willBlur || willBeClosed)
                    dotnetHelper.invokeMethodAsync("OnDropDownLostFocus", input.value).catch(e => console.error(e));
            });
        };
        document.addEventListener(touch.TouchUtils.touchMouseDownEventName, documentMDown);
        registerDisposableEvents(mainElement, function () {
            document.removeEventListener(touch.TouchUtils.touchMouseDownEventName, documentMDown);
        });
    }
    return Promise.resolve("ok");
}
function dispose(mainElement) {
    mainElement = ensureElement(mainElement);
    if (mainElement)
        disposeEvents(mainElement);
    if (dropDownPositionTracker)
        dropDownPositionTracker.dispose();
    return Promise.resolve("ok");
}
function findFirstFocusableElement(container) {
    return container.querySelector(FocusableElementsSelector);
}
function findLastFocusableElement(container) {
    const elements = container.querySelectorAll(FocusableElementsSelector);
    return elements[elements.length - 1];
}
function toPopupAlign(align) {
    let popupAlign = "";
    DropAlignment.forEach(x => {
        if ((x.value & align) !== 0) {
            if (popupAlign)
                popupAlign += " ";
            popupAlign += x.text;
        }
    });
    return popupAlign;
}
function showAdaptiveDropdown(mainElement, options, containerElementCssClass, focusableExternalElementCssClass, dotnetHelper, parentClass) {
    mainElement = ensureElement(mainElement);
    if (!mainElement)
        return Promise.reject();
    const containerElement = getParentByClassName(mainElement, containerElementCssClass);
    if (!containerElement)
        return Promise.reject();
    const documentElement = document.documentElement;
    const initialDocumentOverflow = document.documentElement.style.overflow;
    const initialBodyOverflow = document.body.style.overflow;
    const initialBodyScroll = document.body.scroll;
    const dialogType = options.dialogType;
    const align = options.alignment;
    const popupAlign = toPopupAlign(align);
    const requirePreventTouchMove = dialogType === DialogType.Modal;
    const resizeObserver = new ResizeObserver(onResize);
    if (dialogType === DialogType.Popup) {
        if (align === 0)
            setPositionOfDropDown(containerElement, mainElement, options.dropDownDirection);
        else
            show(mainElement, containerElement, popupAlign, options.fitHorizontally, options.fitVertically, onShow);
        if (options.handleResize)
            resizeObserver.observe(mainElement);
    }
    else {
        openedDialogs.push(mainElement);
        mainElement.style.paddingRight = (getElementPaddingRight(mainElement) + getScrollbarWidth()) + "px";
        const documentPaddingRight = getElementPaddingRight(document.body) + getScrollbarWidth();
        document.body.style.paddingRight = String(documentPaddingRight);
        document.body.classList.add("dxbl-modal-open");
    }
    let isClosed = false;
    let prevRect = null;
    function onResize(entries, _) {
        if (entries.length < 1)
            return;
        if (prevRect && prevRect.height !== entries[0].contentRect.height) {
            clearStyles(mainElement);
            setAttribute(mainElement, ResizingAttributeName, true);
            show(mainElement, containerElement, popupAlign, options.fitHorizontally, options.fitVertically, onShow);
            changeDom(() => {
                setAttribute(mainElement, ResizingAttributeName, false);
            });
        }
        prevRect = entries[0].contentRect;
    }
    function onShow(dockInfo) {
        let cssClass;
        if (dockInfo.appliedModifierKeys.height === DockPointBelow || dockInfo.appliedModifierKeys.height === DockPointBelowInner)
            cssClass = options.bottomAlignmentCssClass;
        else if (dockInfo.appliedModifierKeys.height === DockPointAbove || dockInfo.appliedModifierKeys.height === DockPointAboveInner)
            cssClass = options.topAlignmentCssClass;
        if (cssClass)
            toggleCssClass(mainElement, cssClass, true);
    }
    function onGlobalClick(e) {
        const srcElement = e.srcElement;
        if (!mainElement || !srcElement)
            return;
        if (!mainElement.contains(srcElement) || (dialogType === DialogType.Modal && mainElement === srcElement))
            closeDropdown(mainElement);
    }
    function onGotFocus(e) {
        const target = e.target;
        if (!target)
            return;
        documentElement.removeEventListener("focusin", onGotFocus);
        if (e.relatedTarget === null && mainElement && mainElement.contains(target))
            target.focus();
    }
    function onLoseFocus(e) {
        const relatedTarget = e.relatedTarget;
        if (!isClosed && mainElement) {
            if (relatedTarget && !mainElement.contains(relatedTarget))
                refocusDropdownContent(relatedTarget);
            else if (relatedTarget === null)
                documentElement.addEventListener("focusin", onGotFocus);
        }
    }
    function onKeyDown(e) {
        if (mainElement && e.keyCode === key.KeyCode.Esc)
            closeDropdown(mainElement);
    }
    function closeDropdown(relatedElement) {
        if (!isClosed) {
            isClosed = true;
            if (isRemovedFromDOM(relatedElement))
                return;
            cleanEnvironment();
            dotnetHelper
                .invokeMethodAsync("CloseDialog")
                .catch(function (e) {
                if (!isRemovedFromDOM(relatedElement))
                    console.error(e);
            });
        }
    }
    function refocusDropdownContent(focusTarget) {
        if (!mainElement)
            return;
        const pos = mainElement.compareDocumentPosition(focusTarget);
        if (pos & window.Node.DOCUMENT_POSITION_PRECEDING)
            focusLast();
        else if (pos & window.Node.DOCUMENT_POSITION_FOLLOWING)
            focusFirst();
    }
    function cleanEnvironment() {
        documentElement.removeEventListener(touch.TouchUtils.touchMouseDownEventName, onGlobalClick);
        window.removeEventListener("resize", modalOnWindowResize);
        resizeObserver.disconnect();
        if (dialogType === DialogType.Modal) {
            if (mainElement) {
                const index = openedDialogs.indexOf(mainElement);
                if (index > -1)
                    openedDialogs.splice(index, 1);
            }
            if (!openedDialogs.length) {
                switchScroll(dialogType, false);
                document.body.classList.remove("dxbl-modal-open");
                document.body.style.paddingRight = String(getElementPaddingRight(document.body) - getScrollbarWidth());
            }
        }
        mainElement = null;
    }
    function focusFirst() {
        if (!mainElement)
            return;
        const elementToFocus = findFirstFocusableElement(mainElement);
        if (elementToFocus)
            elementToFocus.focus();
    }
    function focusLast() {
        if (!mainElement)
            return;
        const elementToFocus = findLastFocusableElement(mainElement);
        if (elementToFocus)
            elementToFocus.focus();
    }
    function modalOnWindowResize() {
        if (!mainElement || !getParentByClassName(mainElement, "modal-dialog-owner"))
            return;
        const firstMainElementChild = mainElement.firstElementChild;
        if (!firstMainElementChild)
            return;
        const classList = firstMainElementChild.classList;
        const scrollTop = scrollDropDown(containerElement, documentElement, dialogType);
        const classToAdd = documentElement.clientHeight > documentElement.clientWidth ? "topVertical" : "topHorizontal";
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(function () {
            if (classList.contains("topVertical") || classList.contains("topHorizontal"))
                classList.remove("transition");
            else
                classList.add("transition");
            if (scrollTop)
                documentElement.scrollTop = scrollTop;
            classList.remove("topVertical", "topHorizontal");
            classList.add(classToAdd);
        });
    }
    function switchScroll(dialogType, hide) {
        if (dialogType !== DialogType.Modal)
            return;
        let currentDocumentOverflow;
        let currentBodyOverflow;
        let currentBodyScroll;
        if (hide) {
            currentDocumentOverflow = "hidden";
            currentBodyOverflow = "hidden";
            currentBodyScroll = () => { };
        }
        else {
            currentDocumentOverflow = initialDocumentOverflow;
            currentBodyOverflow = initialBodyOverflow;
            currentBodyScroll = initialBodyScroll;
        }
        document.documentElement.style.overflow = currentDocumentOverflow;
        document.body.style.overflow = currentBodyOverflow;
        document.body.scroll = currentBodyScroll;
    }
    documentElement.addEventListener(touch.TouchUtils.touchMouseDownEventName, onGlobalClick);
    mainElement.addEventListener("keydown", onKeyDown);
    mainElement.addEventListener("focusout", onLoseFocus);
    preventTouchMove(requirePreventTouchMove, mainElement, containerElement, dialogType);
    whenDeleted(mainElement).then(() => {
        cleanEnvironment();
        mainElement = null;
    });
    switchScroll(dialogType, true);
    changeDom(function () {
        if (!mainElement)
            return;
        if (!options.showFocus) {
            addFocusHiddenAttribute(mainElement);
            initFocusHidingEvents(mainElement);
        }
        if (dialogType === DialogType.Popup) {
            focusFirst();
            showHorizontallyAdaptiveDropdown(mainElement, parentClass);
        }
    });
    if (dialogType === DialogType.Modal) {
        window.addEventListener("resize", modalOnWindowResize);
        modalOnWindowResize();
    }
    return Promise.resolve();
}
function preventTouchMove(requirePreventTouchMove, mainElement, containerElement, dialogType) {
    if (requirePreventTouchMove) {
        mainElement.addEventListener("touchmove", (e) => {
            if (e.srcElement === mainElement)
                e.preventDefault();
        });
    }
    if (dialogType === DialogType.Modal) {
        let event;
        containerElement.addEventListener("touchstart", (e) => {
            event = e;
        });
        containerElement.addEventListener("touchmove", (e) => {
            if (shouldPreventTouchMove(e, event))
                e.preventDefault();
            event = e;
        });
    }
}
function shouldPreventTouchMove(e, event) {
    if (!event)
        return false;
    const headerElement = getParentByClassName(e.srcElement, "modal-header");
    if (headerElement)
        return true;
    const columnChooserElements = getParentByClassName(e.srcElement, "column-chooser-elements-container");
    const bodyElement = getParentByClassName(columnChooserElements, "modal-body");
    if (!columnChooserElements || !bodyElement)
        return false;
    const fitsToContent = bodyElement.clientHeight >= columnChooserElements.clientHeight;
    if (fitsToContent)
        return true;
    const delta = e.touches[0].pageY - event.touches[0].pageY;
    const getTop = (element) => element.getBoundingClientRect().top;
    const firstRow = columnChooserElements.querySelector(".column-chooser-element-container");
    const startPosition = firstRow && getTop(firstRow) === getTop(bodyElement);
    if (startPosition && delta >= 0 && e.cancelable)
        return true;
    const getBottom = (element) => Math.round(element.getBoundingClientRect().bottom);
    const lastRow = columnChooserElements.querySelector(".column-chooser-element-container:last-child");
    const endPosition = lastRow && getBottom(lastRow) === getBottom(bodyElement);
    return endPosition && delta <= 0 && e.cancelable;
}
function scrollDropDown(containerElement, documentElement, dialogType) {
    if (dialogType !== DialogType.Modal)
        return -1;
    const containerClientRect = containerElement.getBoundingClientRect();
    const documentClientRect = documentElement.getBoundingClientRect();
    const gridview = getParentByClassName(containerElement, "dxbs-gridview");
    const thead = gridview && gridview.querySelector("thead");
    if (!thead)
        return -1;
    const gridHeaderClientRect = thead.getBoundingClientRect();
    const bottom = (gridHeaderClientRect ? gridHeaderClientRect : containerClientRect).bottom;
    if (bottom > documentElement.clientHeight * 0.5) {
        if (bottom - containerClientRect.top < documentElement.clientHeight * 0.5)
            return bottom - documentClientRect.top - documentElement.clientHeight * 0.5;
        else
            return containerClientRect.top - documentClientRect.top - 2;
    }
    return -1;
}
function showHorizontallyAdaptiveDropdown(element, boundClass) {
    const boundElement = getParentByClassName(element, boundClass);
    if (element && boundElement) {
        const bar = getParentByClassName(element, "dx-menu-bar");
        if (!bar || !bar.classList.contains("vertical")) {
            subscribeElementContentSize(boundElement, setPosition);
            setPosition();
        }
    }
    function setPosition() {
        const elementRect = element.getBoundingClientRect();
        const boundRect = boundElement.getBoundingClientRect();
        const marginLeft = parseFloat(element.style.marginLeft);
        if (marginLeft)
            elementRect.x = elementRect.x - marginLeft;
        if (Math.round(elementRect.x + elementRect.width) > Math.round(boundRect.x + boundRect.width) && boundRect.width > elementRect.width) {
            const parentDropdown = getParentByClassName(element.parentNode, "dropdown-menu");
            if (parentDropdown) {
                const parentRect = parentDropdown.getBoundingClientRect();
                const border = parseFloat(window.getComputedStyle(parentDropdown, null).getPropertyValue("border-right-width"));
                element.style.marginLeft = "-" + (elementRect.x + elementRect.width - parentRect.x - border) + "px";
            }
            else
                element.style.marginLeft = "-" + (elementRect.x + elementRect.width - boundRect.x - boundRect.width) + "px";
        }
        else if (marginLeft)
            element.style.marginLeft = "";
    }
}
function setInlineModalSize(mainElement) {
    mainElement = ensureElement(mainElement);
    if (!mainElement)
        return;
    const modalBody = mainElement.getElementsByClassName("modal-body")[0];
    modalBody.style.width = modalBody.offsetWidth + "px";
    modalBody.style.height = modalBody.offsetHeight + "px";
}
const dropdowns = { init, dispose, showAdaptiveDropdown, updateGridDropDown, setInlineModalSize };

export { DialogType, dropdowns as default, getDropDownElement, isDropDownVisible, onOutsideClick, scrollDropDown, setInlineModalSize, setPositionOfDropDown, shouldPreventTouchMove, updateGridDropDown };
//# sourceMappingURL=dropdowns-24.2.js.map
