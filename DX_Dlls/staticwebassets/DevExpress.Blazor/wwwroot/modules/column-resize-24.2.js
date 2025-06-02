import { d as dom } from './dom-24.2.js';
import { e as evt } from './evt-24.2.js';
import { e as ensureElement, E as subscribeElementDisconnected, R as RequestAnimationFrame, F as getLeftRightPaddings, b as getParentByClassName } from './dom-utils-24.2.js';
import { k as key } from './key-24.2.js';
import { ensureAccentColorStyle } from './dx-style-helper-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './touch-24.2.js';
import './css-classes-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './lit-element-24.2.js';
import './custom-element-24.2.js';

function sendMessageToAssistiveTechnology(message) {
    if (!window.dxAccessibilityHelper)
        window.dxAccessibilityHelper = new AccessibilityHelper();
    window.dxAccessibilityHelper.sendMessageToAssistiveTechnology(message);
}
class AccessibilityHelper {
    constructor() {
        this._helperElement = null;
    }
    get helperElement() {
        if (this._helperElement == null)
            this._helperElement = this.createHelperElement();
        return this._helperElement;
    }
    createHelperElement() {
        const helperElement = document.createElement("DIV");
        helperElement.className = "dxAIFE dxAIFME";
        helperElement.setAttribute("role", "note");
        helperElement.setAttribute("aria-live", "assertive");
        document.documentElement.appendChild(helperElement);
        return helperElement;
    }
    sendMessageToAssistiveTechnology(message) {
        this.helperElement.innerHTML = message;
        setTimeout(() => { this.helperElement.innerHTML = ""; }, 300);
    }
}

var ColumnResizeMode;
(function (ColumnResizeMode) {
    ColumnResizeMode[ColumnResizeMode["Disabled"] = 0] = "Disabled";
    ColumnResizeMode[ColumnResizeMode["NextColumn"] = 1] = "NextColumn";
    ColumnResizeMode[ColumnResizeMode["Component"] = 2] = "Component";
})(ColumnResizeMode || (ColumnResizeMode = {}));
var ColumnResizeType;
(function (ColumnResizeType) {
    ColumnResizeType[ColumnResizeType["Default"] = 0] = "Default";
    ColumnResizeType[ColumnResizeType["Minimization"] = 1] = "Minimization";
    ColumnResizeType[ColumnResizeType["Maximization"] = 2] = "Maximization";
})(ColumnResizeType || (ColumnResizeType = {}));
const columnIdAttributeName = "data-dxdg-column-id";
const invalidColumnIndex = -1;
const minColumnWidth = 30;
const maxColumnWidth = 1500;
const setWidthTimeout = 500;
class ResizableHeaderCell {
    constructor(headerCellElement, gridResizeProxy, mode, blazorComponent) {
        this._mainElement = headerCellElement;
        this._nextHeaderCellElement = headerCellElement.nextElementSibling;
        this._blazorComponent = blazorComponent;
        this._gridResizeProxy = gridResizeProxy;
        this._mode = mode;
        this._resizeParameters = {
            allowResize: false,
            minWidth: -1,
            currentWidth: -1,
            maxWidth: -1
        };
        this._resizeAnchor = null;
        this._lastContainerWidth = -1;
        this._lastWidth = -1;
        this._lastNextWidth = -1;
        this._timeoutId = null;
        this._leftMouseXBoundary = -1;
        this._rightMouseXBoundary = -1;
        this._initWidth = -1;
        this._initNextWidth = -1;
        this._allWidth = -1;
        this._totalDiffX = 0;
    }
    get mainElement() { return this._mainElement; }
    get nextHeaderCellElement() { return this._nextHeaderCellElement; }
    get hasNextColumn() { return !!this._nextHeaderCellElement; }
    get hasColumnId() { return this.mainElement.hasAttribute(columnIdAttributeName); }
    get gridResizeProxy() { return this._gridResizeProxy; }
    get blazorComponent() { return this._blazorComponent; }
    get resizeAnchor() { return this._resizeAnchor; }
    get caption() { return this.mainElement.innerText; }
    get isResizeAllowed() {
        return this._mode !== ColumnResizeMode.Disabled && this.hasColumnId && (this.hasNextColumn || this._mode === ColumnResizeMode.Component);
    }
    get step() {
        let step = Math.ceil((this._resizeParameters.maxWidth - this._resizeParameters.minWidth) / 100);
        if (step > 5)
            step = 5;
        return step;
    }
    initialize() {
        this.createResizeAnchor();
        getResizeEventManager().initializeHeaderCellEvents(this);
        this.initializeEvents();
    }
    initializeEvents() {
        if (!this.isResizeAllowed)
            return;
        this.mainElement.addEventListener("focus", this.onFocus.bind(this));
        this.mainElement.addEventListener("keydown", this.onKeyDown.bind(this));
        this.mainElement.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    removeEvents() {
        this.mainElement.removeEventListener("focus", this.onFocus.bind(this));
        this.mainElement.removeEventListener("keydown", this.onKeyDown.bind(this));
        this.mainElement.removeEventListener("keyup", this.onKeyUp.bind(this));
    }
    onFocus(e) {
        if (evt.EvtUtils.getEventSource(e) !== this.mainElement)
            return;
        this.onFocusCore();
        this.updateResizeParameters();
    }
    onKeyDown(e) {
        if (evt.EvtUtils.getEventSource(e) !== this.mainElement)
            return;
        switch (e.keyCode) {
            case key.KeyCode.Left:
                this.onKeyResize(-this.step);
                e.stopPropagation();
                e.preventDefault();
                break;
            case key.KeyCode.Right:
                this.onKeyResize(this.step);
                e.stopPropagation();
                e.preventDefault();
                break;
        }
    }
    onKeyResize(diffX) {
        if (this._lastWidth === -1)
            this.onStartKeyResize();
        const currentWidth = this._lastWidth;
        let allWidth = maxColumnWidth;
        if (this.hasNextColumn)
            allWidth = currentWidth + this._lastNextWidth;
        const newWidth = this._lastWidth + diffX;
        if (newWidth > minColumnWidth)
            this._totalDiffX += diffX;
        // eslint-disable-next-line new-cap
        RequestAnimationFrame((() => {
            this.setWidth(newWidth, allWidth, this._totalDiffX);
        }).bind(this));
        if (this._timeoutId)
            clearTimeout(this._timeoutId);
    }
    onStartKeyResize() {
        this._lastWidth = this.mainElement.getBoundingClientRect().width;
        this._lastNextWidth = this.hasNextColumn ? this.nextHeaderCellElement.getBoundingClientRect().width : 0;
        this._lastContainerWidth = getColumnContainerWidth(this.mainElement);
        this.gridResizeProxy.initializeComponentsWidths();
        this._totalDiffX = 0;
    }
    onKeyUp(e) {
        if (evt.EvtUtils.getEventSource(e) !== this.mainElement)
            return;
        const keyCode = e.keyCode;
        if (keyCode !== key.KeyCode.Left && keyCode !== key.KeyCode.Right)
            return;
        if (this._timeoutId)
            clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(() => this.invokeSetWidth(), setWidthTimeout);
    }
    updateResizeParameters() {
        const currentWidth = this.mainElement.getBoundingClientRect().width;
        const nextHeaderCellWidth = this.hasNextColumn ? this.nextHeaderCellElement.getBoundingClientRect().width : 0;
        const allowResize = this.isResizeAllowed;
        let maxWidth = maxColumnWidth;
        if (this._mode === ColumnResizeMode.NextColumn)
            maxWidth = currentWidth + nextHeaderCellWidth - minColumnWidth;
        this._resizeParameters = {
            allowResize: allowResize,
            minWidth: allowResize ? minColumnWidth : currentWidth,
            currentWidth: currentWidth,
            maxWidth: allowResize ? maxWidth : currentWidth
        };
    }
    update(mode) {
        if (!this._resizeAnchor)
            return;
        const oldResizeAllowed = this.isResizeAllowed;
        this._nextHeaderCellElement = this.mainElement.nextElementSibling;
        this._mode = mode;
        if (this.isResizeAllowed) {
            if (!oldResizeAllowed) {
                this.mainElement.appendChild(this._resizeAnchor);
                getResizeEventManager().initializeHeaderCellEvents(this);
            }
        }
        else {
            if (oldResizeAllowed) {
                this.mainElement.removeChild(this._resizeAnchor);
                getResizeEventManager().removeHeaderCellEvents(this);
            }
        }
    }
    createResizeAnchor() {
        const resizeAnchor = document.createElement("div");
        dom.DomUtils.addClassName(resizeAnchor, "dxColumnResizeAnchor");
        resizeAnchor.dxResizableHeaderCell = this;
        this._resizeAnchor = resizeAnchor;
        this.mainElement.appendChild(resizeAnchor);
    }
    onMouseDown() {
        this.updateState();
    }
    updateState() {
        this.setMouseBoundaries();
        this.onFocusCore();
        this.gridResizeProxy.initializeComponentsWidths();
    }
    setMouseBoundaries() {
        const resizeHandlerIndent = 10;
        const clientRect = this.mainElement.getBoundingClientRect();
        const minWidth = Math.min(minColumnWidth, clientRect.width);
        this._leftMouseXBoundary = clientRect.left + minWidth - resizeHandlerIndent;
        this._initWidth = clientRect.width;
        if (this._mode === ColumnResizeMode.NextColumn) {
            const nextHeaderCellClientRect = this.nextHeaderCellElement.getBoundingClientRect();
            this._rightMouseXBoundary = clientRect.right + nextHeaderCellClientRect.width - minColumnWidth;
            this._initNextWidth = nextHeaderCellClientRect.width;
            this._allWidth = clientRect.width + nextHeaderCellClientRect.width;
        }
    }
    removeMouseBoundaries() {
        this._leftMouseXBoundary = -1;
        this._rightMouseXBoundary = -1;
        this._initWidth = -1;
        this._initNextWidth = -1;
        this._allWidth = -1;
    }
    getResizeType(pageX) {
        if (this._leftMouseXBoundary === -1)
            return ColumnResizeType.Default;
        if (pageX <= this._leftMouseXBoundary)
            return ColumnResizeType.Minimization;
        if (this._rightMouseXBoundary !== -1 && pageX >= this._rightMouseXBoundary)
            return ColumnResizeType.Maximization;
        return ColumnResizeType.Default;
    }
    onFocusCore() {
        if (this.isResizeAllowed) {
            this.ensureWidthSyncronized();
            sendMessageToAssistiveTechnology(`Width is ${this.mainElement.offsetWidth} pixels. Use arrow keys to resize.`);
        }
    }
    onDragResizeAnchor(diffX, pageX) {
        if (!this.isResizeAllowed)
            return;
        const resizeType = this.getResizeType(pageX);
        const newWidth = this.getNewWidth(diffX, resizeType);
        if (resizeType === ColumnResizeType.Minimization)
            diffX = newWidth - this._initWidth;
        this.setWidth(newWidth, this._allWidth, diffX);
    }
    getNewWidth(diffX, resizeType) {
        switch (resizeType) {
            case ColumnResizeType.Minimization: {
                const currentWidth = this.mainElement.getBoundingClientRect().width;
                return Math.min(minColumnWidth, currentWidth);
            }
            case ColumnResizeType.Maximization:
                return this._allWidth - minColumnWidth;
            default:
                return this._initWidth + diffX;
        }
    }
    onDragResizeAnchorStop() {
        this.removeMouseBoundaries();
        this.invokeSetWidth();
    }
    setWidth(newWidth, allWidth, diffX) {
        if (!allWidth || !this.isWidthChanged(newWidth) || !this.isValidWidth(newWidth, allWidth, diffX))
            return false;
        const contentBoxLeftRightPaddings = getContentBoxLeftRightPaddings(this.mainElement);
        newWidth = newWidth - contentBoxLeftRightPaddings;
        const newNextWidth = allWidth - newWidth - contentBoxLeftRightPaddings;
        this._lastWidth = newWidth;
        this._lastNextWidth = newNextWidth;
        this._lastContainerWidth = getColumnContainerWidth(this.mainElement);
        this.gridResizeProxy.setWidth(this._mode, newWidth, newNextWidth, diffX);
        return true;
    }
    isWidthChanged(newWidth) {
        return newWidth !== this._lastWidth;
    }
    async invokeSetWidth() {
        if (this._lastWidth === -1 || this._lastNextWidth === -1)
            return;
        this.gridResizeProxy.resetWidth();
        getResizeEventManager().lockResize();
        await this.blazorComponent.invokeMethodAsync("SetColumnWidths", getColumnIndex(this.mainElement), this._lastWidth, getColumnIndex(this.nextHeaderCellElement), this._lastNextWidth, this._lastContainerWidth);
        this._lastWidth = -1;
        this._lastNextWidth = -1;
        this._lastContainerWidth = -1;
        getResizeEventManager().unlockResize();
    }
    isValidWidth(newWidth, allWidth, diffX) {
        let isValid = newWidth >= minColumnWidth || (this._lastWidth !== -1 ? newWidth > this._lastWidth : diffX > 0);
        if (isValid && this._mode !== ColumnResizeMode.Component)
            isValid = newWidth <= allWidth - minColumnWidth;
        return isValid;
    }
    async ensureWidthSyncronized() {
        if (this.isWidthSyncronized())
            return;
        const gridResizeProxy = this.gridResizeProxy;
        const elements = await this.blazorComponent.invokeMethodAsync("GetCellCache");
        gridResizeProxy.synchronizeWidth(elements);
    }
    isWidthSyncronized() {
        let result = false;
        const colElementInlineWidth = this.gridResizeProxy.getColElementInlineWidth();
        if (colElementInlineWidth === 0)
            result = true;
        else {
            const cellOffsetWidth = this.mainElement.getBoundingClientRect().width;
            result = colElementInlineWidth === cellOffsetWidth;
        }
        return result;
    }
}
class GridResizeProxy {
    constructor(headerCellElement, resizeElements) {
        this.mainElement = headerCellElement;
        this._resizeElements = resizeElements;
        this._colElements = null;
        this._elementsToSetComponentWidth = null;
        this._elementsToSyncWidth = null;
        this._elementsToCheckScroll = null;
        this._elementsToReset = null;
        this._initWidths = new Map();
        this._hasHorizontalScroll = null;
    }
    get colElements() {
        return fillElementsByIds(this._colElements, this._resizeElements.colElements);
    }
    get elementsToSetComponentWidth() {
        return fillElementsByIds(this._elementsToSetComponentWidth, this._resizeElements.elementsToSetComponentWidth);
    }
    get elementsToSyncWidth() {
        return fillElementsByIds(this._elementsToSyncWidth, this._resizeElements.elementsToSyncWidth);
    }
    get elementsToCheckScroll() {
        return fillElementsByIds(this._elementsToCheckScroll, this._resizeElements.elementsToCheckScroll);
    }
    get elementsToReset() {
        return fillElementsByIds(this._elementsToReset, this._resizeElements.elementsToReset);
    }
    update(resizeElements) {
        this._resizeElements = resizeElements;
        this._colElements = null;
        this._elementsToSetComponentWidth = null;
        this._elementsToSyncWidth = null;
        this._elementsToCheckScroll = null;
        this._elementsToReset = null;
    }
    setWidth(mode, newWidth, newNextWidth, diffX) {
        if (!this.colElements)
            return;
        sendMessageToAssistiveTechnology(`${newWidth} pixels`);
        this.setComponentWidth(diffX);
        this.colElements.forEach(el => {
            el.style.width = toPixels(newWidth);
            if (mode === ColumnResizeMode.NextColumn) {
                const nextElement = el.nextElementSibling;
                nextElement.style.width = toPixels(newNextWidth);
            }
        });
    }
    setComponentWidth(diffX) {
        if (!this.elementsToSetComponentWidth)
            return;
        if (this.isScrollExists())
            this._hasHorizontalScroll = true;
        else
            this.setComponentWidthCore(diffX);
    }
    setComponentWidthCore(diffX) {
        var _a;
        if (this._hasHorizontalScroll)
            this.onHorizontalScrollDisappears();
        const widths = [];
        const initWidths = this._initWidths;
        (_a = this.elementsToSetComponentWidth) === null || _a === void 0 ? void 0 : _a.forEach(element => widths.push(new ElementWidth(element, (initWidths.get(element) || 0) + diffX)));
        if (this.elementsToSyncWidth)
            widths.push(new ElementWidth(this.elementsToSyncWidth[0], (initWidths.get(this.elementsToSyncWidth[1]) || 0) + diffX));
        widths.forEach(width => width.apply());
    }
    onHorizontalScrollDisappears() {
        this._hasHorizontalScroll = false;
        this.resetWidth();
        getResizeEventManager().updateState();
    }
    initializeComponentsWidths() {
        var _a;
        if (!this.elementsToSetComponentWidth)
            return;
        const initWidths = new Map();
        (_a = this.elementsToSetComponentWidth) === null || _a === void 0 ? void 0 : _a.forEach(element => initWidths.set(element, element.getBoundingClientRect().width));
        if (this.elementsToSyncWidth) {
            const element = this.elementsToSyncWidth[1];
            initWidths.set(element, element.getBoundingClientRect().width);
        }
        this._initWidths = initWidths;
    }
    isScrollExists() {
        if (this._hasHorizontalScroll === false)
            return false;
        const elements = this.elementsToCheckScroll;
        if (!elements)
            return false;
        const container = elements[0];
        const element = elements[1];
        return container.clientWidth < element.clientWidth;
    }
    getColElementInlineWidth() {
        let width = 0;
        const colElements = this.colElements;
        for (let i = 0; colElements && i < colElements.length; i++) {
            const inlineWidth = colElements[i].style.width;
            if (inlineWidth !== "") {
                width = parseInt(inlineWidth);
                break;
            }
        }
        return width;
    }
    synchronizeWidth(elementCollection) {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(function () {
            const colWidthMap = elementCollection
                .map((x) => {
                const element = ensureElement(x[0]);
                return element ? {
                    width: element.getBoundingClientRect().width,
                    cols: getElementsByIds(x[1])
                } : null;
            })
                .filter(x => x);
            for (let i = 0; i < colWidthMap.length; i++) {
                const cols = colWidthMap[i].cols;
                for (let j = 0; j < cols.length; j++)
                    cols[j].style.width = toPixels(colWidthMap[i].width);
            }
        });
    }
    resetWidth() {
        if (this.elementsToReset && !this.isScrollExists()) {
            this.elementsToReset.forEach(element => {
                element.style.width = "";
            });
        }
    }
}
class ElementWidth {
    constructor(element, width) {
        this._element = element;
        this._width = width;
    }
    apply() {
        this._element.style.width = toPixels(this._width);
    }
}
class ResizeEventManager {
    constructor() {
        this._currentPageX = -1;
        this._pageX = -1;
        this._resizeLock = 0;
        this._resizableHeaderCell = null;
    }
    get pageX() { return this._pageX; }
    get resizableHeaderCell() { return this._resizableHeaderCell; }
    initializeHeaderCellEvents(resizableHeaderCell) {
        if (resizableHeaderCell.resizeAnchor)
            this.initializeMouseDown(resizableHeaderCell.resizeAnchor);
    }
    initializeMouseDown(resizeAnchor) {
        resizeAnchor.addEventListener("pointerdown", mouseDownHandler);
    }
    initializeMouseMove() {
        document.addEventListener("pointermove", mouseMoveHandler);
    }
    initializeMouseUp() {
        document.addEventListener("pointerup", mouseUpHandler);
    }
    removeHeaderCellEvents(resizableHeaderCell) {
        const resizeAnchor = resizableHeaderCell.resizeAnchor;
        if (resizeAnchor)
            resizeAnchor.removeEventListener("pointerdown", mouseDownHandler);
    }
    onMouseDown(headerCell, pageX) {
        this._resizableHeaderCell = headerCell;
        headerCell.onMouseDown();
        this._pageX = pageX;
        this.initializeMouseMove();
        this.initializeMouseUp();
    }
    lockResize() {
        this._resizeLock++;
    }
    unlockResize() {
        this._resizeLock--;
    }
    isResizeLocked() {
        return this._resizeLock > 0;
    }
    setCurrentPageX(pageX) {
        this._currentPageX = pageX;
    }
    updateState() {
        var _a;
        this._pageX = this._currentPageX;
        (_a = this._resizableHeaderCell) === null || _a === void 0 ? void 0 : _a.updateState();
    }
    invalidateState() {
        this._pageX = -1;
        this._resizableHeaderCell = null;
    }
}
function getContentBoxLeftRightPaddings(element) {
    const boxSizing = window.getComputedStyle(element, null).getPropertyValue("box-sizing");
    if (boxSizing === "border-box")
        return 0;
    return getLeftRightPaddings(element);
}
function getColumnIndex(headerCell) {
    if (!headerCell)
        return invalidColumnIndex.toString();
    const attribute = headerCell.getAttribute(columnIdAttributeName);
    const dragDropStatus = attribute ? attribute.split("|") : [];
    return dragDropStatus[0];
}
function getPageX(e) {
    return e.isPrimary !== false ? e.pageX : 0;
}
function mouseDownHandler(e) {
    const eventSource = evt.EvtUtils.getEventSource(e);
    if (!eventSource)
        return;
    const eventManager = getResizeEventManager();
    const headerCell = eventSource.dxResizableHeaderCell;
    if (headerCell && headerCell.isResizeAllowed) {
        const pageX = getPageX(e);
        eventManager.onMouseDown(headerCell, pageX);
    }
}
function mouseMoveHandler(e) {
    const eventManager = getResizeEventManager();
    if (eventManager.isResizeLocked() || eventManager.pageX === -1)
        return;
    const pageX = getPageX(e);
    eventManager.setCurrentPageX(pageX);
    const diffX = pageX - eventManager.pageX;
    if (diffX !== 0) {
        const headerCell = eventManager.resizableHeaderCell;
        if (headerCell) {
            // eslint-disable-next-line new-cap
            RequestAnimationFrame(function () {
                headerCell.onDragResizeAnchor(diffX, pageX);
            });
        }
    }
}
function mouseUpHandler() {
    const eventManager = getResizeEventManager();
    if (eventManager.resizableHeaderCell)
        eventManager.resizableHeaderCell.onDragResizeAnchorStop();
    eventManager.invalidateState();
    document.removeEventListener("pointermove", mouseMoveHandler);
    document.removeEventListener("pointerup", mouseUpHandler);
}
function getColumnContainerWidth(columnElement) {
    const container = getParentByClassName(columnElement, "dxbs-gridview");
    return container.getBoundingClientRect().width;
}
function toPixels(value) {
    return value + "px";
}
function fillElementsByIds(result, ids) {
    if (!ids)
        return null;
    if (!result)
        result = getElementsByIds(ids);
    return result;
}
function getElementsByIds(ids) {
    return ids.map(id => document.getElementById(id));
}
window.dxResizeEventManagerInstance = null;
function getResizeEventManager() {
    if (window.dxResizeEventManagerInstance === null)
        window.dxResizeEventManagerInstance = new ResizeEventManager();
    return window.dxResizeEventManagerInstance;
}
const headerCellMap = new Map();
function initResizeColumn(headerCellElement, resizeElements, mode, blazorComponent) {
    headerCellElement = ensureElement(headerCellElement);
    if (!headerCellElement)
        return Promise.reject("failed");
    let headerCell = headerCellMap.get(headerCellElement);
    if (headerCell) {
        headerCell.update(mode);
        headerCell.gridResizeProxy.update(resizeElements);
    }
    else {
        const gridResizeProxy = new GridResizeProxy(headerCellElement, resizeElements);
        headerCell = new ResizableHeaderCell(headerCellElement, gridResizeProxy, mode, blazorComponent);
        if (headerCell.isResizeAllowed) {
            headerCell.initialize();
            headerCellMap.set(headerCellElement, headerCell);
        }
    }
    ensureAccentColorStyle();
    subscribeElementDisconnected(headerCellElement, function () {
        headerCell.removeEvents();
        headerCellMap.delete(headerCellElement);
    });
    return Promise.resolve("ok");
}
const columnResize = { initResizeColumn };

export { ColumnResizeMode, columnResize as default, initResizeColumn, minColumnWidth };
//# sourceMappingURL=column-resize-24.2.js.map
