import { d as dom } from './dom-24.2.js';
import { b as browser } from './browser-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';

let defaultVerticalScrollBarWidth = -1;
function getDefaultVerticalScrollBarWidth() {
    if (defaultVerticalScrollBarWidth > -1)
        return defaultVerticalScrollBarWidth;
    const container = document.createElement("DIV");
    container.style.cssText = "position: absolute; top: 0px; left: 0px; visibility: hidden; width: 200px; height: 150px; overflow: hidden; box-sizing: content-box";
    document.body.appendChild(container);
    const child = document.createElement("P");
    container.appendChild(child);
    child.style.cssText = "width: 100%; height: 200px;";
    const widthWithoutScrollBar = child.offsetWidth;
    container.style.overflow = "scroll";
    let widthWithScrollBar = child.offsetWidth;
    if (widthWithoutScrollBar === widthWithScrollBar)
        widthWithScrollBar = container.clientWidth;
    defaultVerticalScrollBarWidth = (widthWithoutScrollBar - widthWithScrollBar) * window.devicePixelRatio;
    document.body.removeChild(container);
    return defaultVerticalScrollBarWidth;
}
function getVerticalScrollBarWidth() {
    return getDefaultVerticalScrollBarWidth() / window.devicePixelRatio; // T941300
}
function isScrollBarClick(evt) {
    const target = evt.target;
    if (!target)
        return false;
    const hasVerticalScrollBar = target.scrollHeight > target.clientHeight;
    const hasHorizontalScrollBar = target.scrollWidth > target.clientWidth;
    const isVerticalScrollBar = hasVerticalScrollBar && evt.offsetX >= target.clientWidth;
    const isHorizontalScrollBar = hasHorizontalScrollBar && evt.offsetY >= target.clientHeight;
    return isVerticalScrollBar || isHorizontalScrollBar;
}

const initialDimentionValue = -1;
class Size {
    constructor(width = initialDimentionValue, height = initialDimentionValue) {
        this.width = width;
        this.height = height;
    }
    static getDimentionValue(obj, propName) {
        let result = initialDimentionValue;
        if (propName in obj) {
            const tmpResult = parseFloat(obj[propName]);
            result = Number.isNaN(tmpResult) ? initialDimentionValue : tmpResult;
        }
        return result;
    }
    isInitial() {
        return this.width === initialDimentionValue
            && this.height === initialDimentionValue;
    }
    static from(obj) {
        if (!obj)
            return new Size();
        const currentWidth = this.getDimentionValue(obj, "width");
        const currentHeight = this.getDimentionValue(obj, "height");
        return new Size(currentWidth, currentHeight);
    }
}

function getDocumentClientWidth() {
    if(document.documentElement.clientWidth === 0)
        return document.body.clientWidth;
    return document.documentElement.clientWidth;
}

function getDocumentClientHeight() {
    if(browser.Browser.Firefox && window.innerHeight - document.documentElement.clientHeight > getVerticalScrollBarWidth())
        return window.innerHeight;

    if(browser.Browser.Opera && browser.Browser.Version < 9.6 || document.documentElement.clientHeight === 0)
        return document.body.clientHeight;

    return document.documentElement.clientHeight;
}

function getAbsoluteX(curEl) {
    return getAbsolutePositionX(curEl);
}
function getAbsoluteY(curEl) {
    return getAbsolutePositionY(curEl);
}
function setAbsoluteX(element, x) {
    element.style.left = prepareClientPosForElement(x, element, true) + "px";
}
function setAbsoluteY(element, y) {
    element.style.top = prepareClientPosForElement(y, element, false) + "px";
}
function getAbsolutePositionX(element) {
    if(browser.Browser.IE)
        return getAbsolutePositionX_IE(element);
    else if(browser.Browser.Firefox && browser.Browser.Version >= 3)
        return getAbsolutePositionX_FF3(element);
    else if(browser.Browser.WebKitFamily || browser.Browser.Edge)
        return getAbsolutePositionX_FF3(element);
    else
        return window.getAbsolutePositionX_Other(element);
}
function getAbsolutePositionX_IE(element) {
    if(element == null || browser.Browser.IE && element.parentNode == null) return 0; // B96664
    return element.getBoundingClientRect().left + getDocumentScrollLeft();
}
function getAbsolutePositionX_FF3(element) {
    if(element == null) return 0;
    const x = element.getBoundingClientRect().left + getDocumentScrollLeft();
    return x;
}
function getAbsolutePositionY(element) {
    if(browser.Browser.IE)
        return getAbsolutePositionY_IE(element);
    if(browser.Browser.Firefox && browser.Browser.Version >= 3)
        return getAbsolutePositionY_FF3(element);
    else if(browser.Browser.WebKitFamily || browser.Browser.Edge)
        return getAbsolutePositionY_FF3(element);
    else
        return window.getAbsolutePositionY_Other(element);
}

function getAbsolutePositionY_IE(element) {
    if(element == null || browser.Browser.IE && element.parentNode == null) return 0; // B96664
    return element.getBoundingClientRect().top + getDocumentScrollTop();
}
function getAbsolutePositionY_FF3(element) {
    if(element == null) return 0;
    const y = element.getBoundingClientRect().top + getDocumentScrollTop();
    return y;
}

function prepareClientPosForElement(pos, element, isX) {
    pos -= getPositionElementOffset(element, isX);
    return pos;
}
function createElementMock(element) {
    const div = document.createElement("DIV");
    div.style.top = "0px";
    div.style.left = "0px";
    div.visibility = "hidden";
    div.style.position = dom.DomUtils.getCurrentStyle(element).position;
    return div;
}
function getExperimentalPositionOffset(element, isX) {
    const div = createElementMock(element);
    if(div.style.position === "static")
        div.style.position = "absolute";
    element.parentNode.appendChild(div);
    const realPos = isX ? getAbsoluteX(div) : getAbsoluteY(div);
    element.parentNode.removeChild(div);
    return realPos;
}
function getPositionElementOffset(element, isX) {
    return getExperimentalPositionOffset(element, isX);
}

function elementHasCssClass(element, className) {
    try {
        let elementClasses;
        const classList = getClassNameList(element);
        if(!classList) {
            const elementClassName = getClassName(element);
            if(!elementClassName)
                return false;
            elementClasses = elementClassName.split(" ");
        }
        const classNames = className.split(" ");
        for(let i = classNames.length - 1; i >= 0; i--) {
            if(classList) {
                if(classList.indexOf(classNames[i]) === -1)
                    return false;
                continue;
            }
            if(elementClasses.indexOf(classNames[i]) < 0)
                return false;
        }
        return true;
    }
    catch(e) {
        return false;
    }
}

// Utils.js 3128
function getClassNameList(element) {
    return element.classList ? [].slice.call(element.classList) : getClassName(element).replace(/^\s+|\s+$/g, "").split(/\s+/);
}

// Utils.js 3131
function getClassName(element) {
    if(element.tagName === "svg")
        return element.className.baseVal;
    return element.className;
}
// Utils.js 3140
function setClassName(element, className) {
    if(element.tagName === "svg")
        element.className.baseVal = className.trim();
    else
        element.className = className.trim();
}

// Utils.js 3176
function getItemByIndex(collection, index) {
    if(!index) index = 0;
    if(collection != null && collection.length > index)
        return collection[index];
    return null;
}
// Utils.js 3276
function getNodesByTagName(element, tagName) {
    const tagNameToUpper = tagName.toUpperCase();
    let result = null;
    if(element) {
        if(element.getElementsByTagName) {
            result = element.getElementsByTagName(tagNameToUpper);
            if(result.length === 0)
                result = element.getElementsByTagName(tagName);
        }
        else if(element.all && element.all.tags !== undefined)
            result = browser.Browser.Netscape ? element.all.tags[tagNameToUpper] : element.all.tags(tagNameToUpper);
    }
    return result;
}

// Utils.js 3291
function getNodeByTagName(element, tagName, index) {
    if(element != null) {
        const collection = getNodesByTagName(element, tagName);
        return getItemByIndex(collection, index);
    }
    return null;
}

// Utils.js 3556
function createStyleSheetInDocument(doc) {
    if(doc.createStyleSheet) {
        try {
            return doc.createStyleSheet();
        }
        catch(e) {
            const message = "The CSS link limit (31) has been exceeded. Please enable CSS merging or reduce the number of CSS files on the page. For details, see https://supportcenter.devexpress.com/ticket/details/k18487/.";
            throw new Error(message);
        }
    }
    else {
        const styleSheet = doc.createElement("STYLE");
        getNodeByTagName(doc, "HEAD", 0).appendChild(styleSheet);
        return styleSheet.sheet;
    }
}

// Utils.js 3597
let currentStyleSheet = null;
function getCurrentStyleSheet() {
    if(!currentStyleSheet || [...document.styleSheets].every(x => x !== currentStyleSheet))
        currentStyleSheet = createStyleSheetInDocument(document);
    return currentStyleSheet;
}

function getParentByClassNameInternal(element, className, selector) {
    while(element != null) {
        if(element.tagName === "BODY" || element.nodeName === "#document")
            return null;
        if(selector(element, className))
            return element;
        element = element.parentNode;
    }
    return null;
}
function getParentByPredicate(element, className, predicate) {
    return getParentByClassNameInternal(element, className, predicate);
}
function getParentByClassName(element, className) {
    return getParentByClassNameInternal(element, className, elementHasCssClass);
}
function retrieveByPredicate(scourceCollection, predicate) {
    const result = [];
    for(let i = 0; i < scourceCollection.length; i++) {
        const element = scourceCollection[i];
        if(!predicate || predicate(element))
            result.push(element);
    }
    return result;
}

function focusElement(element) {
    if(typeof element === "string")
        element = document.querySelector(element);
    if(element)
        element.focus();
}
function setAttribute(element, attrName, attrValue) {
    if(element)
        element[attrName] = attrValue;
}

function setCheckInputIndeterminate(inputElement, value) {
    if(inputElement)
        inputElement.indeterminate = value;
}

function removeSelection() {
    document.getSelection().removeAllRanges();
}

function log(message) { /* console.log(message); */ }

function ensureElement(element) {
    if(!element) return null;

    let internalId = null;
    if(typeof element === "string") {
        const queryResult = document.querySelector("#" + element);
        if(queryResult)
            element = queryResult;
        else {
            try {
                const elRef = JSON.parse(element);
                if(elRef && elRef.__internalId)
                    internalId = elRef.__internalId;
            }
            catch(e) { }
        }
    }

    if(!internalId && element["__internalId"])
        internalId = element["__internalId"];

    if(internalId) {
        const blid = "_bl_" + internalId;
        element = document.querySelector("[" + blid + "]");
    }

    if(!element || !element["tagName"] || element.parentNode === null)
        element = null;

    return element;
}
function setInputAttribute(element, attrName, attrValue) {
    element = ensureElement(element);
    if(element)
        setAttribute(element, attrName, attrValue);
}

function querySelectorFromRoot(element, method) {
    element.dataset.tempUniqueId = "tempUniqueId";
    try {
        method("[data-temp-unique-id]");
    }
    catch(e) {}
    finally {
        delete element.dataset.tempUniqueId;
    }
}

function removeAttribute(obj, attrName) {
    if(obj.removeAttribute)
        obj.removeAttribute(attrName);
    else if(obj.removeProperty)
        obj.removeProperty(attrName);
}
function setOrRemoveAttribute(obj, attrName, value) {
    if(!value)
        removeAttribute(obj, attrName);
    else
        setAttribute(obj, attrName, value);
}

function getLeftRightMargins(element, style) {
     const currentStyle = style ? style : dom.DomUtils.getCurrentStyle(element);
     return dom.DomUtils.pxToInt(currentStyle.marginLeft) + dom.DomUtils.pxToInt(currentStyle.marginRight);
}

function getTopBottomMargins(element, style) {
     const currentStyle = style ? style : dom.DomUtils.getCurrentStyle(element);
     return dom.DomUtils.pxToInt(currentStyle.marginTop) + dom.DomUtils.pxToInt(currentStyle.marginBottom);
}

function getLeftRightBordersAndPaddingsSummaryValue(element, currentStyle) {
    return getLeftRightPaddings(element, currentStyle) + getHorizontalBordersWidth(element, currentStyle);
}
function getTopBottomBordersAndPaddingsSummaryValue(element, currentStyle) {
    return getTopBottomPaddings(element, currentStyle) + getVerticalBordersWidth(element, currentStyle);
}
function getLeftRightPaddings(element, style) {
    const currentStyle = style ? style : dom.DomUtils.getCurrentStyle(element);
    return parseInt(currentStyle.paddingLeft) + parseInt(currentStyle.paddingRight);
}
function getTopBottomPaddings(element, style) {
    const currentStyle = style ? style : dom.DomUtils.getCurrentStyle(element);
    return parseInt(currentStyle.paddingTop) + parseInt(currentStyle.paddingBottom);
}
function getVerticalBordersWidth(element, style) {
    if(!style)
        style = (browser.Browser.IE && browser.Browser.MajorVersion !== 9 && window.getComputedStyle) ? window.getComputedStyle(element) : dom.DomUtils.getCurrentStyle(element);
    let res = 0;

    if(style.borderTopStyle !== "none")
        res += parseFloat(style.borderTopWidth);
    if(style.borderBottomStyle !== "none")
        res += parseFloat(style.borderBottomWidth);
    return res;
}
function getHorizontalBordersWidth(element, style) {
    if(!style)
        style = (browser.Browser.IE && window.getComputedStyle) ? window.getComputedStyle(element) : dom.DomUtils.getCurrentStyle(element);
    let res = 0;

    if(style.borderLeftStyle !== "none")
        res += parseFloat(style.borderLeftWidth);
    if(style.borderRightStyle !== "none")
        res += parseFloat(style.borderRightWidth);

    return res;
}

const requestAnimationFrameFunc = window.requestAnimationFrame || function(callback) { callback(); };
const cancelAnimationFrameFunc = window.cancelAnimationFrame || function(id) { };
function CancelAnimationFrame(id) { cancelAnimationFrameFunc(id); }
function RequestAnimationFrame(callback) { return requestAnimationFrameFunc(callback); }

const FrameContext = function(requestFrame) {
    this.requestFrame = requestFrame;
    this.cache = [[]];
    this.isInFrame = false;
    this.frameTimestamp = null;
    this.isWaiting = false;

    this.getBuffer = function(order) {
        if(!order) order = 0;
        if(this.cache.length <= order) this.cache[order] = [];
        return this.cache[order];
    };
    this.execute = function(callback, order) {
        if(!this.isInFrame)
            return false;
        let buffer = this.cache[order || 0];
        if(buffer === null)
            callback(requestFrameId, this.frameTimestamp);
        else (buffer = this.getBuffer(order)).push(callback);
        return true;
    };
    this.runAll = function(frameTimestamp) {
        this.isWaiting = false;
        this.isInFrame = true;
        this.frameTimestamp = frameTimestamp;
        for(let i = 0; i < this.cache.length; i++) {
            const buffer = this.cache[i];
            if(buffer) {
                this.cache[i] = null;
                while(buffer.length)
                    buffer.shift()(requestFrameId, this.frameTimestamp);
            }
        }
        this.waitNextFrame();
    };
    this.waitNextFrame = function() {
        this.cache = [[]];
        this.isInFrame = false;
        this.isWaiting = false;
    };
    this.requestExecution = function(func, order) {
        const that = this;
        return new Promise(function(resolve) {
            function callback(requestFrameId, frameTimestamp) {
                resolve(func(requestFrameId, frameTimestamp));
            }
            if(!that.execute(callback, order)) {
                that.getBuffer(order).push(callback);
                if(that.isWaiting === false) {
                    that.isWaiting = true;
                    that.requestFrame(that.runAll.bind(that));
                }
            }
        });
    };
};

let requestFrameId = null;
// eslint-disable-next-line new-cap
function requestAnimationFrame(callback) { return requestFrameId = RequestAnimationFrame(callback); }

function createAccumulator(requestFrame) {
    const context = new FrameContext(requestFrame);
    return context.requestExecution.bind(context);
}
const changeDomCore = createAccumulator(requestAnimationFrame);
const calculateStylesCore = createAccumulator(function(callback) { return changeDomCore(function() { setTimeout(callback); }); });

function changeDom(c) { return changeDomCore(c); }
function calculateStyles(c) { return calculateStylesCore(c); }

let observers = []; const minimumIntervalBetweenChecks = 50;
function itemObserver(element, callback, width, contentElement) {
    return function () {
        if(element.compareDocumentPosition(document.body) & window.Node.DOCUMENT_POSITION_DISCONNECTED)
            return false;
        const currentStyle = dom.DomUtils.getCurrentStyle(element);
        if(currentStyle.width === "auto")// auto if inside of display none || element is inline
            return true;
        const w = parseInt(currentStyle.width) - getLeftRightBordersAndPaddingsSummaryValue(element);
        if(width !== w) {
            const contentHeight = contentElement && contentElement.clientHeight;
            callback(width = w, contentHeight);
        }
        return true;
    };
}
function elementSizeObserver(element, callback, size) {
    return function() {
        if(element.compareDocumentPosition(document.body) & window.Node.DOCUMENT_POSITION_DISCONNECTED)
            return false;
        const currentStyle = dom.DomUtils.getCurrentStyle(element);
        if(currentStyle.width === "auto")// auto if inside of display none || element is inline
            return true;
        const elementWidth = Math.ceil(parseFloat(currentStyle.width)) - getLeftRightBordersAndPaddingsSummaryValue(element);
        const elementHeight = Math.ceil(parseFloat(currentStyle.height)) - getTopBottomBordersAndPaddingsSummaryValue(element);
        if (size.width !== elementWidth || size.height !== elementHeight) {
            var oldSize = Size.from(size);

            size.width = elementWidth;
            size.height = elementHeight;
            callback(size, oldSize);
        }
        return true;
    };
}
function verticalScrollBarVisibilityObserver(element, callback) {
    let wasScrollBarVisible = element.scrollHeight > element.clientHeight;
    return function() {
        if(element.compareDocumentPosition(document.body) & window.Node.DOCUMENT_POSITION_DISCONNECTED)
            return false;

        const isScrollBarVisibile = element.scrollHeight > element.clientHeight;
        if(isScrollBarVisibile !== wasScrollBarVisible) {
            callback(isScrollBarVisibile);
            wasScrollBarVisible = isScrollBarVisibile;
        }
        return true;
    };
}
function verticalScrollBarWidthObserver(callback) {
    let initialScrollbarWidth = -1;
    return function() {
        const currentScrollBarWidth = getVerticalScrollBarWidth();
        if(initialScrollbarWidth !== currentScrollBarWidth) {
            callback(currentScrollBarWidth);
            initialScrollbarWidth = currentScrollBarWidth;
        }
        return true;
    };
}

function elementDisconnectedObserver(element, onDisconnected) {
    return function() {
        if(element.compareDocumentPosition(document.body) & window.Node.DOCUMENT_POSITION_DISCONNECTED) {
            onDisconnected();
            return false;
        }
        return true;
    };
}
function unsubscribeElement(observer) {
    observers.splice(observers.indexOf(observer), 1);
}
function subscribeElementContentWidth(el, callback, contentElement) {
    const observer = itemObserver(el, callback, -1, contentElement);
    subscribeElementObserver(observer);
    return observer;
}
function subscribeElementContentSize(element, callback) {
    const observer = elementSizeObserver(element, callback, { width: -1, height: -1 });
    subscribeElementObserver(observer);
    return observer;
}
function subscribeElementVerticalScrollBarVisibility(element, callback) {
    const observer = verticalScrollBarVisibilityObserver(element, callback);
    subscribeElementObserver(observer);
    return observer;
}
function subscribeElementVerticalScrollBarWidth(callback) {
    const observer = verticalScrollBarWidthObserver(callback);
    subscribeElementObserver(observer);
    return observer;
}

function subscribeElementDisconnected(element, onDisconnected) {
    subscribeElementObserver(elementDisconnectedObserver(element, onDisconnected));
}
function subscribeElementObserver(observer) {
    if(observers.length === 0) {
        observers.push(observer);
        calculateStyles(updateTrackedElements);
    }
    else
        observers.push(observer);
}
function updateTrackedElements() {
    observers = observers.filter(function(observer) { return observer(); });
    if(observers.length > 0) {
        setTimeout(function() {
            calculateStyles(updateTrackedElements);
        }, minimumIntervalBetweenChecks);
    }
}
function applyStyles(element, styles) {
    const stylesArr = [];
    for(const property in styles) {
        if(Object.prototype.hasOwnProperty.call(styles, property))
            stylesArr.push({ attr: property, value: styles[property] });
    }
    if(stylesArr.length === 1)
        element.style[stylesArr[0].attr] = stylesArr[0].value;
    else {
        let cssText = "";
        if(element.style.cssText) {
            const oldStylesArr = element.style.cssText.split(";").map(function(nvp) { return nvp.trim().split(":"); });
            for(let i = 0; i < oldStylesArr.length; i++) {
                const oldStyleArr = oldStylesArr[i];
                if(oldStyleArr.length === 2 && styles[oldStyleArr[0]] === undefined)
                    cssText += oldStyleArr[0] + ":" + oldStyleArr[1].trim() + ";";
            }
        }
        for(let i = 0; i < stylesArr.length; i++) {
            const style = stylesArr[i];
            if(style.value !== "")
                cssText += style.attr + ":" + style.value + ";";
        }
        setOrRemoveAttribute(element, "style", cssText);
    }
}
function applyStateToElement(element, state) {
    if(state.inlineStyles === null)
        removeAttribute(element, "style");
    else
        applyStyles(element, state.inlineStyles);

    for(const attrName in state.attributes) {
        if(Object.prototype.hasOwnProperty.call(state, attrName))
            setOrRemoveAttribute(element, attrName, state.attributes[attrName]);
    }

    const allCssClasses = getClassNameList(state);
    if(allCssClasses) {
        const toggleInfo = state.cssClassToggleInfo;
        const cssClasses = allCssClasses.filter(function(c) { return toggleInfo[c] !== false; });
        for(const c in toggleInfo) {
            if(Object.prototype.hasOwnProperty.call(toggleInfo, c) && toggleInfo[c] && cssClasses.indexOf(c) === -1)
                cssClasses.push(c);
        }
        const cssClass = cssClasses.join(" ");
        if(cssClass)
            setClassName(element, cssClass);
        else
            removeAttribute(element, "class");
    }
}
function createElementState(element) {
    return { inlineStyles: {}, cssClassToggleInfo: {}, className: getClassName(element), attributes: {} };
}
function updateElementState(elementOrCollection, callback) {
    if(elementOrCollection.length !== undefined) {
        for(let i = 0; i < elementOrCollection.length; i++)
            updateElementState(elementOrCollection[i], callback);
        return;
    }
    const element = elementOrCollection;
    if(!element._dxCurrentFrameElementStateInfo) {
        callback(element._dxCurrentFrameElementStateInfo = createElementState(element));
        changeDom(function() {
            applyStateToElement(element, element._dxCurrentFrameElementStateInfo);
            element._dxCurrentFrameElementStateInfo = null;
        });
    }
    else
        callback(element._dxCurrentFrameElementStateInfo);
}
function setStyles(el, styles) {
    updateElementState(el, function(state) {
        if(state.inlineStyles === null)
            state.inlineStyles = styles;
        else {
            for(const i in styles) {
                if(Object.prototype.hasOwnProperty.call(styles, i))
                    state.inlineStyles[i] = styles[i];
            }
        }
    });
}
function clearStyles(el) {
    updateElementState(el, function(state) {
        state.inlineStyles = null;
        state.cssClassToggleInfo[CssClasses.InvisibleOffScreen] = false;
    });
}
function toggleCssClass(el, cssClass, condition) {
    updateElementState(el, function(state) {
        state.cssClassToggleInfo[cssClass] = condition;
    });
}
function setCssClassName(el, className) {
    updateElementState(el, function(state) {
        state.cssClassToggleInfo = {};
        state.className = className;
    });
}

function elementIsInDOM(element) {
    return document.body.contains(element);
}

function findParentBySelector(element, selector) {
    if(!element) return null;
    if(element.closest) return element.closest(selector);

    do {
        const matches = element.matches || element.msMatchesSelector; // IE11
        if(matches.call(element, selector)) return element;
        element = element.parentElement || element.parentNode;
    } while(element && element.tagName !== "BODY");
    return null;
}
function getDocumentScrollLeft() {
    const isScrollBodyIE = false;// Browser.IE && ASPx.GetCurrentStyle(document.body).overflow == "hidden" && document.body.scrollLeft > 0;
    if(browser.Browser.Edge || isScrollBodyIE)
        return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
    if(browser.Browser.WebKitFamily)
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    return document.documentElement.scrollLeft;
}
function getDocumentScrollTop() {
    const isScrollBodyIE = false; // Browser.IE && ASPx.GetCurrentStyle(document.body).overflow == "hidden" && document.body.scrollTop > 0;
    if(browser.Browser.WebKitFamily || browser.Browser.Edge || isScrollBodyIE) {
        if(browser.Browser.MacOSMobilePlatform) // B157267
            return window.pageYOffset;
        if(browser.Browser.WebKitFamily)
            return document.documentElement.scrollTop || document.body.scrollTop;
        return document.body.scrollTop;
    }
    else
        return document.documentElement.scrollTop;
}

function eraseBlazorIdentificators(element) {
    if(element.attributes) {
        for(let i = 0; i < element.attributes.length; i++) {
            const name = element.attributes[i].name;
            if(name.startsWith("_bl_") || name.startsWith("id"))
                element.removeAttribute(name);
        }
    }
    element.childNodes.forEach(chl => { eraseBlazorIdentificators(chl); });
}
function toPx(value) {
    return value + "px";
}
function isRemovedFromDOM(element) {
    return Boolean(element.compareDocumentPosition(document.body) & window.Node.DOCUMENT_POSITION_DISCONNECTED);
}

function isContainingBlockForAbsolutelyPositionedElement(element) {
    if(!element.style)
        return false;
    const computedStyle = window.getComputedStyle(element);
    return isContainingBlockStyleForAbsolutelyPositionedElement(computedStyle);
}

function isContainingBlockStyleForAbsolutelyPositionedElement(computedStyle) {
    //...the containing block is formed by the edge of the padding box of the nearest ancestor element that has a position value other than static
    if(computedStyle.position !== "static")
        return true;
    return isContainingBlockStyleForAbsolutelyOrFixedPositionedElement(computedStyle);
}

function isContainingBlockStyleForAbsolutelyOrFixedPositionedElement(computedStyle) {
    //If the position property is absolute or fixed, the containing block may also be formed by the edge of the padding box of the nearest ancestor element that has the following:
    //-A transform or perspective value other than none
    //-A will - change value of transform or perspective
    //-A filter value other than none or a will - change value of filter(only works on Firefox).
    //-A contain value of paint(e.g.contain: paint;)
    if(computedStyle.transform !== "none" || computedStyle["will-change"].includes("transform"))
        return true;
    if(computedStyle.perspective !== "none" || computedStyle["will-change"].includes("perspective"))
        return true;
    if(computedStyle.filter !== "none" || computedStyle["will-change"].includes("filter"))
        return true;
    if(computedStyle.contain?.includes("paint"))
        return true;
    return false;
}

function getElementOffsetWidth(element) {
    if(element.tagName === "svg") {
        return element.getBoundingClientRect().width;
    }
    else {
        return element.offsetWidth;
    }
}


const domUtils = { focusElement, setInputAttribute, setCheckInputIndeterminate };

const domUtils$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDocumentClientWidth,
    getDocumentClientHeight,
    setAbsoluteX,
    setAbsoluteY,
    getAbsolutePositionX,
    getAbsolutePositionY,
    prepareClientPosForElement,
    getPositionElementOffset,
    elementHasCssClass,
    getItemByIndex,
    getCurrentStyleSheet,
    getParentByPredicate,
    getParentByClassName,
    retrieveByPredicate,
    focusElement,
    setAttribute,
    setCheckInputIndeterminate,
    removeSelection,
    log,
    ensureElement,
    setInputAttribute,
    querySelectorFromRoot,
    setOrRemoveAttribute,
    getLeftRightMargins,
    getTopBottomMargins,
    getLeftRightBordersAndPaddingsSummaryValue,
    getTopBottomBordersAndPaddingsSummaryValue,
    getLeftRightPaddings,
    getTopBottomPaddings,
    getVerticalBordersWidth,
    getHorizontalBordersWidth,
    CancelAnimationFrame,
    RequestAnimationFrame,
    changeDom,
    calculateStyles,
    unsubscribeElement,
    subscribeElementContentWidth,
    subscribeElementContentSize,
    subscribeElementVerticalScrollBarVisibility,
    subscribeElementVerticalScrollBarWidth,
    subscribeElementDisconnected,
    applyStyles,
    createElementState,
    setStyles,
    clearStyles,
    toggleCssClass,
    setCssClassName,
    elementIsInDOM,
    findParentBySelector,
    getDocumentScrollLeft,
    getDocumentScrollTop,
    eraseBlazorIdentificators,
    toPx,
    isRemovedFromDOM,
    isContainingBlockForAbsolutelyPositionedElement,
    getElementOffsetWidth,
    default: domUtils
});

export { querySelectorFromRoot as A, removeSelection as B, subscribeElementVerticalScrollBarVisibility as C, subscribeElementVerticalScrollBarWidth as D, subscribeElementDisconnected as E, getLeftRightPaddings as F, toPx as G, eraseBlazorIdentificators as H, getParentByPredicate as I, calculateStyles as J, getElementOffsetWidth as K, prepareClientPosForElement as L, getHorizontalBordersWidth as M, domUtils$1 as N, RequestAnimationFrame as R, isScrollBarClick as a, getParentByClassName as b, changeDom as c, subscribeElementContentSize as d, ensureElement as e, getTopBottomBordersAndPaddingsSummaryValue as f, getCurrentStyleSheet as g, getLeftRightBordersAndPaddingsSummaryValue as h, isRemovedFromDOM as i, getTopBottomMargins as j, getLeftRightMargins as k, elementHasCssClass as l, getItemByIndex as m, setStyles as n, clearStyles as o, getVerticalScrollBarWidth as p, isContainingBlockForAbsolutelyPositionedElement as q, retrieveByPredicate as r, setOrRemoveAttribute as s, toggleCssClass as t, unsubscribeElement as u, elementIsInDOM as v, setAttribute as w, findParentBySelector as x, getDocumentScrollTop as y, getDocumentScrollLeft as z };
//# sourceMappingURL=dom-utils-24.2.js.map
