import { d as dom } from './dom-24.2.js';
import { e as evt } from './evt-24.2.js';
import { t as touch } from './touch-24.2.js';
import { x as findParentBySelector, b as getParentByClassName, y as getDocumentScrollTop, z as getDocumentScrollLeft, v as elementIsInDOM, A as querySelectorFromRoot, e as ensureElement, u as unsubscribeElement, B as removeSelection, p as getVerticalScrollBarWidth, h as getLeftRightBordersAndPaddingsSummaryValue, d as subscribeElementContentSize, f as getTopBottomBordersAndPaddingsSummaryValue, C as subscribeElementVerticalScrollBarVisibility, D as subscribeElementVerticalScrollBarWidth, g as getCurrentStyleSheet } from './dom-utils-24.2.js';
import { d as disposeEvents, r as registerDisposableEvents } from './disposable-24.2.js';
import { b as browser } from './browser-24.2.js';
import { S as SvgUtils } from './svg-utils-24.2.js';
import { minColumnWidth, ColumnResizeMode } from './column-resize-24.2.js';
import { updateScrollbarStyle } from './dx-style-helper-24.2.js';
import { ListBoxLegacyCssClasses } from './dx-listbox-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './css-classes-24.2.js';
import './key-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './lit-element-24.2.js';
import './custom-element-24.2.js';
import './dx-ui-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './property-24.2.js';

const columnIdAttributeName = "data-dxdg-column-id";
const draggableIdAttributeName = "data-dxdg-draggable-id";
const ColumnHeadTypes = { GroupPanelHead: "gph", ColumnHead: "ch" };
ColumnHeadTypes["1"] = ColumnHeadTypes.ColumnHead;
ColumnHeadTypes["0"] = ColumnHeadTypes.GroupPanelHead;

function getDragStatus(element) {
    if(!element.hasAttribute(draggableIdAttributeName))
        return null;

    const dragDropStatus = element.getAttribute(columnIdAttributeName).split("|");

    const canBeGrouped = dragDropStatus.length > 2 ? dragDropStatus[2] === "1" : true;
    const columnHeadType = dragDropStatus.length > 1 ? ColumnHeadTypes[dragDropStatus[1]] : ColumnHeadTypes.ColumnHead;

    const columnVisibleIndex = columnHeadType === ColumnHeadTypes.ColumnHead ? parseInt(dragDropStatus[0]) : -1;
    const groupVisibleIndex = columnHeadType === ColumnHeadTypes.GroupPanelHead ? parseInt(dragDropStatus[0]) : -1;

    const prevSibling = element.previousElementSibling;
    const needInsertBeforeToo = !prevSibling || !getDragStatus(prevSibling);

    return {
        columnVisibleIndex: columnVisibleIndex,
        groupVisibleIndex: groupVisibleIndex,
        columnHeadType: columnHeadType,
        canBeGrouped: canBeGrouped,
        needInsertBeforeToo: needInsertBeforeToo,
        element: element
    };
}
function getGraggableSelector(dragId) {
    return "[" + draggableIdAttributeName + "=" + dragId + "]";
}
function moveDragElement(dragElement, evt, offsetFromMouseWithDocScroll) {
    setElementTranslate(dragElement, (getClientEventPos(evt, "clientX") - offsetFromMouseWithDocScroll.left), (getClientEventPos(evt, "clientY") - offsetFromMouseWithDocScroll.top));
}
function setElementTranslate(element, x, y) {
    element.style.transform = ["translate(", Math.round(x), "px, ", Math.round(y), "px)"].join("");
}

function getClientEventPos(evt, method) {
    if(typeof (evt[method]) !== "undefined")
        return evt[method];
    if(typeof (evt.touches) !== "undefined")
        return evt.touches[0][method];
    return 0;
}

function mouseDown(evt, dragId, validateResize, dotnetHelper) {
    const startX = getClientEventPos(evt, "clientX");
    const startY = getClientEventPos(evt, "clientY");
    const evtTarget = evt.target;
    const d = 10;

    if(validateResize) {
        const th = findParentBySelector(evt.target, "th");
        if(th && startX >= th.getBoundingClientRect().right - minColumnWidth)
            return;
    }

    let dragWasActivated = false;
    const mouseMove = function(evt) {

        const dx = Math.abs(startX - getClientEventPos(evt, "clientX")) > d;
        const dy = Math.abs(startY - getClientEventPos(evt, "clientY")) > d;

        if(dx || dy) {
            dragWasActivated = true;
            mouseUp();
            dragStart(evt, evtTarget, dragId, dotnetHelper);
        }

        evt.preventDefault();
        return false;
    };
    const mouseUp = function() {
        document.removeEventListener(touch.TouchUtils.touchMouseMoveEventName, mouseMove);
        document.removeEventListener(touch.TouchUtils.touchMouseUpEventName, mouseUp);

        if(!dragWasActivated && evtTarget && browser.Browser.WebKitTouchUI)
            evtTarget.click();
    };

    document.addEventListener(touch.TouchUtils.touchMouseMoveEventName, mouseMove);
    document.addEventListener(touch.TouchUtils.touchMouseUpEventName, mouseUp);

    evt.preventDefault();
    evtTarget.focus();
}

function dragStart(evt, evtTarget, dragId, dotnetHelper) {
    const headSelector = getGraggableSelector(dragId);
    const dragElementOrigin = findParentBySelector(evtTarget, headSelector);
    if(!dragElementOrigin) return;

    const gridViewRect = getParentByClassName(dragElementOrigin, "dxbs-gridview").getBoundingClientRect();
    const dragSource = getDragStatus(dragElementOrigin);

    const startDocScrollLeft = getDocumentScrollLeft();
    const startDocScrollTop = getDocumentScrollTop();
    let docScrollDiff = { left: 0, top: 0 };

    const targets = initTargets(dragElementOrigin, dragId);

    const dragElementInfo = createDragElement(dragElementOrigin, evt);
    const dragElement = dragElementInfo.dragElement;
    const offsetFromMouse = dragElementInfo.offsetFromMouse;

    moveDragElement(dragElement, evt, offsetFromMouse);
    let firtsMove = true;
    let activeTarget = null;
    const mouseMove = function(evt) {
        if(firtsMove) {
            dragElement.style.visibility = "visible";
            firtsMove = false;
        }

        const offsetFromMouseWithDocScroll = {
            left: offsetFromMouse.left + docScrollDiff.left,
            top: offsetFromMouse.top + docScrollDiff.top
        };

        moveDragElement(dragElement, evt, offsetFromMouseWithDocScroll);

        activeTarget = processTargets(targets, dragId, dragSource, evt, docScrollDiff, gridViewRect);

        evt.preventDefault();
        return false;
    };
    const mouseUp = function() {
        if(activeTarget && !dragDropToTheSameColumn(dragSource, activeTarget)) {
            const dragSourceVid = dragSource.columnHeadType === ColumnHeadTypes.GroupPanelHead ? dragSource.groupVisibleIndex : dragSource.columnVisibleIndex;
            const activeTargetVid = activeTarget.columnHeadType === ColumnHeadTypes.GroupPanelHead ? activeTarget.groupVisibleIndex : activeTarget.columnVisibleIndex;
            dotnetHelper.invokeMethodAsync("OnGridColumnHeadDragNDrop",
                dragSourceVid,
                dragSource.columnHeadType,
                activeTargetVid,
                activeTarget.columnHeadType,
                activeTarget.insertBefore
            );
            if(activeTarget.mark)
                activeTarget.mark.parentNode.removeChild(activeTarget.mark);
        }

        document.removeEventListener(touch.TouchUtils.touchMouseMoveEventName, mouseMove);
        document.removeEventListener(touch.TouchUtils.touchMouseUpEventName, mouseUp);
        window.removeEventListener("scroll", scroll);


        dragElement.parentNode.removeChild(dragElement);
    };
    const scroll = function() {
        docScrollDiff = {
            left: startDocScrollLeft - getDocumentScrollLeft(),
            top: startDocScrollTop - getDocumentScrollTop()
        };
    };
    document.addEventListener(touch.TouchUtils.touchMouseMoveEventName, mouseMove);
    document.addEventListener(touch.TouchUtils.touchMouseUpEventName, mouseUp);
    window.addEventListener("scroll", scroll);
}

function createDragElement(dragElementOrigin, evt) {
    let dragElement = dragElementOrigin.cloneNode(true);
    const originDragElementBox = dragElementOrigin.getBoundingClientRect();
    const mousePointerOffset = {
        left: getClientEventPos(evt, "clientX") - originDragElementBox.left,
        top: getClientEventPos(evt, "clientY") - originDragElementBox.top
    };

    if(dragElement.tagName !== "DIV") {
        const d = document.createElement("DIV");
        const styles = window.getComputedStyle(dragElementOrigin);

        d.innerHTML = dragElement.innerHTML;
        d.className = "card " + dragElementOrigin.className;
        d.style.width = originDragElementBox.width + "px";
        d.style.height = originDragElementBox.height + "px";
        d.style.paddingTop = styles.paddingTop;
        d.style.paddingBottom = styles.paddingBottom;
        d.style.paddingLeft = styles.paddingLeft;
        d.style.paddingRight = styles.paddingRight;
        dragElement = d;
    }
    else {
        dragElement.style.width = originDragElementBox.width + "px";
        dragElement.style.height = originDragElementBox.height + "px";
    }

    dragElement.className = dragElement.className + " dx-dragging-state";

    document.body.appendChild(dragElement);

    const cloneDragElementBox = dragElement.getBoundingClientRect();
    const dragElementFromMouseOffset = {
        left: cloneDragElementBox.left + mousePointerOffset.left,
        top: cloneDragElementBox.top + mousePointerOffset.top,
    };

    return {
        dragElement: dragElement,
        offsetFromMouse: dragElementFromMouseOffset,
    };
}

function initTargets(dragElementOrigin, dragId) {
    const targets = [];

    const headSelector = getGraggableSelector(dragId);
    const targetElements = document.querySelectorAll(headSelector);
    let groupPanelTargetFound = false;
    let columnHeadRowTargetFound = false;
    for(let i = 0; i < targetElements.length; i++) {
        const targetElement = targetElements[i];
        const box = targetElement.getBoundingClientRect();

        const dragDropStatus = getDragStatus(targetElement);
        const columnVisibleIndex = dragDropStatus.columnVisibleIndex;
        const groupVisibleIndex = dragDropStatus.groupVisibleIndex;
        const needInsertBeforeToo = dragDropStatus.needInsertBeforeToo;
        const columnHeadType = dragDropStatus.columnHeadType;

        if(columnHeadType === ColumnHeadTypes.GroupPanelHead)
            groupPanelTargetFound = true;
        else if(columnHeadType === ColumnHeadTypes.ColumnHead)
            columnHeadRowTargetFound = true;
        if(needInsertBeforeToo)
            targets.push(new Target(targetElement, box.left, box.top, box.bottom, columnVisibleIndex, groupVisibleIndex, columnHeadType, true, false));
        targets.push(new Target(targetElement, box.right, box.top, box.bottom, columnVisibleIndex, groupVisibleIndex, columnHeadType, false, false));
    }

    const hasTargets = groupPanelTargetFound || columnHeadRowTargetFound;

    if(hasTargets) {
        if(!groupPanelTargetFound) {
            const groupPanelElement = document.querySelector("[data-dxdg-drag-group-panel=" + dragId + "]");
            if(groupPanelElement) {
                const box = groupPanelElement.getBoundingClientRect();
                targets.push(new Target(groupPanelElement, box.left, box.top, box.bottom, -1, 0, ColumnHeadTypes.GroupPanelHead, false, true, true));
            }
        }
        if(!columnHeadRowTargetFound) {
            const columnRowElement = document.querySelector("[data-dxdg-drag-head-row=" + dragId + "]");
            if(columnRowElement) {
                const box = columnRowElement.getBoundingClientRect();
                targets.push(new Target(columnRowElement, box.right, box.top, box.bottom, -1, -1, ColumnHeadTypes.ColumnHead, false, true, true));
            }
        }
    }

    return targets;
}
function Target(element, x, top, bottom, columnVisibleIndex, groupVisibleIndex, columnHeadType, insertBefore, wholeRowIsRarget) {
    this.element = element;
    this.x = x;
    this.top = top;
    this.bottom = bottom;
    this.columnVisibleIndex = columnVisibleIndex;
    this.groupVisibleIndex = groupVisibleIndex;
    this.columnHeadType = columnHeadType;
    this.insertBefore = insertBefore;
    this.wholeRowIsRarget = wholeRowIsRarget;
    this.docScrollTop = getDocumentScrollTop();
    this.docScrollLeft = getDocumentScrollLeft();
}
function dragDropToTheSameColumn(dragSource, target) {
    function groupIndicesCoinside(dragSource, target) {
        return target.groupVisibleIndex === dragSource.groupVisibleIndex ||
            target.groupVisibleIndex === dragSource.groupVisibleIndex - 1 && !target.insertBefore;
    }
    function columnIndicesCoinside(dragSource, target) {
        return target.columnVisibleIndex === dragSource.columnVisibleIndex ||
            target.columnVisibleIndex === dragSource.columnVisibleIndex - 1 && !target.insertBefore;
    }
    const reorderGroupToTheSameColumn = target.columnHeadType === dragSource.columnHeadType && dragSource.columnHeadType === ColumnHeadTypes.GroupPanelHead && groupIndicesCoinside(dragSource, target);
    if(reorderGroupToTheSameColumn) return true;

    const reordercolumnToTheSameColumn = target.columnHeadType === dragSource.columnHeadType && dragSource.columnHeadType === ColumnHeadTypes.ColumnHead && columnIndicesCoinside(dragSource, target);
    if(reordercolumnToTheSameColumn) return true;

    const ungroupToInself = dragSource.columnHeadType === ColumnHeadTypes.GroupPanelHead && target.columnHeadType === ColumnHeadTypes.ColumnHead && dragSource.columnVisibleIndex !== -1 && columnIndicesCoinside(dragSource, target);
    if(ungroupToInself) return true;

    const groupToInself = dragSource.columnHeadType === ColumnHeadTypes.ColumnHead && target.columnHeadType === ColumnHeadTypes.GroupPanelHead && dragSource.groupVisibleIndex !== -1 && groupIndicesCoinside(dragSource, target);
    if(groupToInself) return true;

    return false;
}
function processTargets(targets, dragId, dragSource, evt, docScrollDiff, gridViewRect) {
    deactivateTarget(dragId);

    let activeTarget = null;
    const distances = [];
    const mouseX = getClientEventPos(evt, "clientX");
    const mouseY = getClientEventPos(evt, "clientY");

    for(let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if(target.columnHeadType === ColumnHeadTypes.GroupPanelHead && !dragSource.canBeGrouped) continue;

        const mouseIsBetween = target.top + docScrollDiff.top <= mouseY && mouseY <= target.bottom + docScrollDiff.top;
        if(!mouseIsBetween) continue;

        if(target.wholeRowIsRarget) {
            activeTarget = target;
            break;
        }
        else
            distances.push({ distance: Math.abs(Math.abs(target.x + docScrollDiff.left) - Math.abs(mouseX)), target: target });

    }
    if(activeTarget == null) {
        let minDistance = 1000000;
        for(const i in distances) {
            if(minDistance > distances[i].distance && validateTarget(mouseX, dragSource, distances[i].target)) {
                minDistance = distances[i].distance;
                activeTarget = distances[i].target;
            }
        }
    }

    if(activeTarget != null && !dragDropToTheSameColumn(dragSource, activeTarget)) {
        if(activeTarget.x >= gridViewRect.left && activeTarget.x <= gridViewRect.right)
            activateTarget(activeTarget, dragId);
    }
    return activeTarget;
}
function validateTarget(mouseX, dragSource, target) {
    const box = dragSource.element.getBoundingClientRect();
    if(dragDropToTheSameColumn(dragSource, target)) {
        if(mouseX < box.left || mouseX > box.right)
            return false;
    }
    if(target.x < box.left) {
        if(mouseX > box.right)
            return false;
    }
    else {
        if(mouseX < box.left)
            return false;
    }
    return true;
}
const dropTargetMarkClassName = "dxgv-target-marks";
function activateTarget(target, dragId) {
    const targetMark = document.createElement("DIV");
    const padding = 1;
    const svgSize = 16;
    const rowHeight = (target.bottom - target.top) + 2 * padding;
    const targetMarkHeight = 2 * (svgSize + padding) + rowHeight;

    targetMark.className = dropTargetMarkClassName;
    targetMark.dataset.dxdgDraggableId = dragId;
    targetMark.style.top = target.top + (target.docScrollTop - getDocumentScrollTop()) + getDocumentScrollTop() - 1 - padding - svgSize + "px";
    targetMark.style.height = targetMarkHeight + "px";
    targetMark.style.left = target.x + (target.docScrollLeft - getDocumentScrollLeft()) + getDocumentScrollLeft() - svgSize / 2 + "px";

    targetMark.innerHTML = [SvgUtils.getSvgHtml(SvgUtils.ArrowDownIconName), "<div style='height:", rowHeight, "px'></div>", SvgUtils.getSvgHtml(SvgUtils.ArrowUpIconName)].join("");
    document.body.appendChild(targetMark);
    target.mark = targetMark;
}
function deactivateTarget(dragId) {
    const headSelector = getGraggableSelector(dragId);
    const dropTargetMarksSelector = "div." + dropTargetMarkClassName + headSelector;
    const dropTargetMarks = document.querySelectorAll(dropTargetMarksSelector);
    for(let i = 0; i < dropTargetMarks.length; i++) {
        const targetMark = dropTargetMarks[i];
        targetMark.parentNode.removeChild(targetMark);
    }
}

const ScrollFilteringTimeout = 200;
const DataRowMarkerCssClass = "dxbs-data-row";
const Selectors = {
    GridSelectedRowCell: ".dxbs-table td.table-active"
};
const Styles = {
    SELECTION_BG: "--selection-bg",
    COMPONENT_WIDTH: "--component-width",
    SCROLL_LEFT: "--scroll-left"
};
const resizeObserver = new ResizeObserver(entries => {
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const target = entry.target;
        target.style.setProperty(Styles.COMPONENT_WIDTH, entry.contentRect.width + "px");
        if (target._dxOnWindowResize)
            target._dxOnWindowResize();
    }
});
class ScrollState {
    constructor(itemHeight, scrollTop, scrollHeight) {
        this._itemHeight = itemHeight;
        this._scrollTop = scrollTop;
        this._scrollHeight = scrollHeight;
    }
    get itemHeight() { return this._itemHeight; }
    get scrollTop() { return this._scrollTop; }
    get scrollHeight() { return this._scrollHeight; }
    isEqual(state) {
        return this.itemHeight === state.itemHeight &&
            this.scrollTop === state.scrollTop &&
            this.scrollHeight === state.scrollHeight;
    }
    toJSON() {
        return { ItemHeight: this.itemHeight, ScrollTop: this.scrollTop, ScrollHeight: this.scrollHeight };
    }
}
ScrollState.Auto = new ScrollState(0, 0, 0);
function scrollToSelectedItem(mainElement) {
    if (!elementIsInDOM(mainElement))
        return;
    let selectedRowElement = getListBoxSelectedItemElement(mainElement);
    if (!selectedRowElement)
        selectedRowElement = getGridSelectedRowElement(mainElement);
    if (selectedRowElement) {
        const scrollElement = mainElement;
        let offsetTop = selectedRowElement.offsetTop;
        if (selectedRowElement.offsetParent && selectedRowElement.offsetParent.tagName === "TABLE") {
            const virtualScrollTopElement = selectedRowElement.offsetParent.previousElementSibling;
            if (virtualScrollTopElement)
                offsetTop += virtualScrollTopElement.clientHeight;
        }
        const above = scrollElement.scrollTop > offsetTop;
        const below = scrollElement.scrollTop + scrollElement.clientHeight < offsetTop + selectedRowElement.offsetHeight;
        if (above)
            scrollElement.scrollTop = offsetTop;
        if (below)
            scrollElement.scrollTop = offsetTop - (scrollElement.clientHeight - selectedRowElement.offsetHeight);
    }
}
function scrollToFocusedItem(mainElement) {
    if (!elementIsInDOM(mainElement))
        return;
    const focusedRowElement = getListBoxFocusedItemElement(mainElement);
    if (focusedRowElement) {
        let scrollElement = mainElement.querySelector(".dxgvCSD");
        if (!scrollElement)
            scrollElement = mainElement;
        const above = scrollElement.scrollTop > focusedRowElement.offsetTop;
        const below = scrollElement.scrollTop + scrollElement.clientHeight < focusedRowElement.offsetTop + focusedRowElement.offsetHeight;
        if (above)
            scrollElement.scrollTop = focusedRowElement.offsetTop;
        if (below)
            scrollElement.scrollTop = focusedRowElement.offsetTop - (scrollElement.clientHeight - focusedRowElement.offsetHeight);
    }
}
function getGridSelectedRowElement(dropDownElement) {
    let glLbElement = null;
    querySelectorFromRoot(dropDownElement, (rootQuery) => {
        glLbElement = dropDownElement.querySelector("*" + rootQuery + " > *[id$='_LB']");
    });
    if (!glLbElement) {
        querySelectorFromRoot(dropDownElement.parentNode, (rootQuery) => {
            if (dropDownElement.parentNode)
                glLbElement = dropDownElement.parentNode.querySelector("*" + rootQuery + " > *[id$='_LB']");
        });
    }
    const firstSelectedCell = glLbElement ? glLbElement.querySelector(Selectors.GridSelectedRowCell) : null;
    return firstSelectedCell ? firstSelectedCell.parentNode : null;
}
function getListBoxSelectedItemElement(dropDownElement) {
    let lbIdSelector = dropDownElement.querySelector("*[id$='_LB']");
    if (!lbIdSelector && dropDownElement.parentNode)
        lbIdSelector = dropDownElement.parentNode.querySelector("*[id$='_LB']");
    if (!lbIdSelector)
        lbIdSelector = dropDownElement;
    if (lbIdSelector) {
        let lbSelectedItemElement = lbIdSelector.querySelector(ListBoxLegacyCssClasses.ItemSelected);
        if (!lbSelectedItemElement)
            lbSelectedItemElement = lbIdSelector.querySelector(Selectors.GridSelectedRowCell);
        if (lbSelectedItemElement)
            return lbSelectedItemElement.parentNode;
    }
    return null;
}
function getListBoxFocusedItemElement(dropDownElement) {
    let lbIdSelector = dropDownElement.querySelector("*[id$='_LB']");
    if (!lbIdSelector && dropDownElement.parentNode)
        lbIdSelector = dropDownElement.parentNode.querySelector("*[id$='_LB']");
    if (!lbIdSelector)
        lbIdSelector = dropDownElement;
    if (lbIdSelector) {
        const lbFocusedItemElement = lbIdSelector.querySelector(ListBoxLegacyCssClasses.ItemActive);
        if (lbFocusedItemElement) {
            if (lbFocusedItemElement.tagName === "TR")
                return lbFocusedItemElement;
            return lbFocusedItemElement.parentNode;
        }
    }
    return null;
}
function ensureVirtualScrollLock(element) {
    if (element.dataset.virtualScrollLock === undefined)
        element.dataset.virtualScrollLock = "0";
}
function isVirtualScrollLocked(element) {
    ensureVirtualScrollLock(element);
    return Number(element.dataset.virtualScrollLock) > 0;
}
function lockVirtualScroll(element) {
    ensureVirtualScrollLock(element);
    const virtualScrollLock = Number(element.dataset.virtualScrollLock) + 1;
    element.dataset.virtualScrollLock = virtualScrollLock.toString();
}
function unlockVirtualScroll(element) {
    ensureVirtualScrollLock(element);
    const virtualScrollLock = Number(element.dataset.virtualScrollLock) - 1;
    element.dataset.virtualScrollLock = virtualScrollLock.toString();
}
function onScroll(evt, dotnetHelper, options, scrollElement, scrollHeaderElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement) {
    if (options.isHorizontalScrolling)
        onHorizontalScroll(evt, scrollElement, scrollHeaderElement);
    if (options.isVirtualScrolling)
        onVirtualScroll(dotnetHelper, options, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement);
}
function onHorizontalScroll(evt$1, scrollElement, scrollHeaderElement) {
    if (scrollElement.scrollLeft === scrollHeaderElement.scrollLeft)
        return;
    const source = evt.EvtUtils.getEventSource(evt$1);
    if (source === scrollElement) {
        const scrollLeft = scrollElement.scrollLeft;
        scrollHeaderElement.scrollLeft = scrollLeft;
        scrollElement.style.setProperty(Styles.SCROLL_LEFT, scrollLeft + "px");
    }
    else if (source === scrollHeaderElement)
        setTimeout(() => scrollElement.scrollLeft = scrollHeaderElement.scrollLeft, 0);
}
function onVirtualScroll(dotnetHelper, options, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement) {
    if (isVirtualScrollLocked(scrollElement))
        return;
    onSmoothVirtualScroll(dotnetHelper, options, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement);
}
function onSmoothVirtualScroll(dotnetHelper, options, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement) {
    let scrollVertical = true;
    if (!scrollElement.dataset.prevScrollTop)
        scrollElement.dataset.prevScrollTop = scrollElement.scrollTop.toString();
    else
        scrollVertical = scrollElement.dataset.prevScrollTop !== scrollElement.scrollTop.toString();
    clearVirtualScrollingTimer(scrollElement);
    if (scrollVertical) {
        scrollElement.dataset.OnScrollTimerId = setTimeout(function () {
            ensureItemsVisible(dotnetHelper, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement)
                .then(() => {
                delete scrollElement.dataset.prevScrollTop;
            });
            if (options.needInternalSettings)
                initInternalSettings(options);
        }, ScrollFilteringTimeout).toString();
        correctScrollingCss(scrollElement);
    }
}
function correctScrollingCss(scrollElement) {
    const scrollStart = scrollElement.scrollTop === 0;
    const scrollEnd = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
    const scrollingClass = "dx-scrolling";
    scrollElement.classList.remove(scrollingClass);
    if (!scrollStart && !scrollEnd)
        scrollElement.classList.add(scrollingClass);
}
function clearVirtualScrollingTimer(scrollElement) {
    if (scrollElement.dataset.OnScrollTimerId) {
        clearTimeout(Number(scrollElement.dataset.OnScrollTimerId));
        delete scrollElement.dataset.OnScrollTimerId;
    }
}
function getDataElement(scrollElement) {
    const dataTable = scrollElement.querySelector("table.dxbs-table");
    const dataList = scrollElement.classList.contains(ListBoxLegacyCssClasses.ListBox) ? scrollElement.querySelector("ul") : null;
    return (dataTable || dataList);
}
function initScrollHeight(dotnetHelper, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement, options) {
    const dataElement = getDataElement(scrollElement);
    const sizes = calculateSizes(dataElement, options);
    virtualScrollSpacerTopElement.style.height = sizes.spacerTop + "px";
    virtualScrollSpacerBottomElement.style.height = sizes.spacerBelow + "px";
    initScrollPosition(scrollElement, dataElement, virtualScrollSpacerTopElement);
}
function initScrollPosition(scrollElement, dataElement, virtualScrollSpacerTopElement) {
    if (scrollElement.scrollTop < virtualScrollSpacerTopElement.clientHeight)
        scrollElement.scrollTop = virtualScrollSpacerTopElement.clientHeight + 1;
    if (scrollElement.scrollTop + scrollElement.clientHeight > virtualScrollSpacerTopElement.clientHeight + dataElement.offsetHeight)
        scrollElement.scrollTop = virtualScrollSpacerTopElement.clientHeight + dataElement.offsetHeight - scrollElement.clientHeight - 1;
}
function getVisibleRowsHeights(dataElement) {
    return Array.from(getDataRowsQuery(dataElement), (element) => element.offsetHeight);
}
function getDataRowsQuery(container) {
    switch (container.tagName) {
        case "TABLE":
            return container.querySelectorAll(":scope > tbody > tr");
        case "UL":
            return container.querySelectorAll(":scope > li");
        default:
            throw new Error("Unexpected data container element");
    }
}
function getItemHeight(dataElement) {
    const heights = getVisibleRowsHeights(dataElement);
    const itemHeights = {};
    for (let i = 0; i < heights.length; i++) {
        const height = heights[i];
        itemHeights[height] = itemHeights[height] ? (itemHeights[height] + 1) : 1;
    }
    let maxCountHeight = 0;
    let maxCount = 0;
    for (const height in itemHeights) {
        if (itemHeights[height] > maxCount) {
            maxCount = itemHeights[height];
            maxCountHeight = Number(height);
        }
    }
    return maxCountHeight;
}
function calculateSizes(dataElement, options) {
    const itemHeight = getItemHeight(dataElement);
    const spacerTop = options.virtualScrollingOptions.itemsAbove * itemHeight;
    const spacerBelow = options.virtualScrollingOptions.itemsBelow * itemHeight;
    return {
        itemHeight: itemHeight,
        spacerTop: spacerTop,
        spacerBelow: spacerBelow,
    };
}
function getParametersForVirtualScrollingRequest(scrollElement) {
    const preload_height = 300;
    const dataElement = getDataElement(scrollElement);
    let scrollTop = scrollElement.scrollTop - preload_height;
    if (scrollTop < 0)
        scrollTop = 0;
    const visibleFrameHeight = scrollElement.clientHeight;
    const scrollBottom = scrollElement.scrollTop + visibleFrameHeight + preload_height;
    let scrollTopForRequest = scrollTop - preload_height;
    if (scrollTopForRequest < 0)
        scrollTopForRequest = 0;
    const scrollHeightForRequest = scrollBottom - scrollTopForRequest + preload_height;
    const itemHeight = getItemHeight(dataElement);
    return {
        scrollTop: scrollTop,
        scrollBottom: scrollBottom,
        requestScrollState: new ScrollState(itemHeight, scrollTopForRequest, scrollHeightForRequest)
    };
}
function ensureItemsVisible(dotnetHelper, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement) {
    const dataElement = getDataElement(scrollElement);
    const tuple = getParametersForVirtualScrollingRequest(scrollElement);
    const scrollTop = tuple.scrollTop;
    const scrollBottom = tuple.scrollBottom;
    const topSpacerVisible = virtualScrollSpacerTopElement.clientHeight > 0 && scrollTop < virtualScrollSpacerTopElement.offsetHeight;
    const bottomSpacerVisible = virtualScrollSpacerBottomElement.clientHeight > 0 && scrollBottom > virtualScrollSpacerTopElement.offsetHeight + dataElement.offsetHeight;
    if (topSpacerVisible || bottomSpacerVisible)
        return sendGridVirtualScroll(dotnetHelper, scrollElement, tuple.requestScrollState);
    else
        return Promise.resolve();
}
function sendGridVirtualScroll(dotnetHelper, scrollElement, scrollState) {
    const dotnetHelperAny = dotnetHelper;
    if (dotnetHelperAny.dxScrollStateCache && dotnetHelperAny.dxScrollStateCache.isEqual(scrollState))
        return Promise.resolve();
    dotnetHelperAny.dxScrollStateCache = scrollState;
    scrollElement.DxRestoreScrollTop = scrollElement.scrollTop;
    lockVirtualScroll(scrollElement);
    return dotnetHelper
        .invokeMethodAsync("OnGridVirtualScroll", scrollState.itemHeight, scrollState.scrollTop, scrollState.scrollHeight)
        .then((options) => {
        if (options.mainElement)
            initializeGridComponent(options, dotnetHelper);
        if (scrollElement)
            unlockVirtualScroll(scrollElement);
    })
        .catch(disposeGridComponent);
}
function initializeGridComponent(options, dotnetHelper) {
    init(options.mainElement, options, dotnetHelper);
}
function disposeGridComponent(options) {
    if (options && options.mainElement)
        dispose(options.mainElement);
}
function autoWidthCalculate(rootElement, scrollElement, scrollHeaderElement, options) {
    let scrollElementOverflowX_Backup = "";
    let scrollHeaderElementOverflowX_Backup = "";
    if (scrollElement) {
        lockVirtualScroll(scrollElement);
        scrollElementOverflowX_Backup = scrollElement.style.overflowX;
        scrollElement.style.overflowX = "hidden";
        scrollElement.style.width = "0";
    }
    if (scrollHeaderElement) {
        scrollHeaderElementOverflowX_Backup = scrollHeaderElement.style.overflowX;
        scrollHeaderElement.style.overflowX = "hidden";
        scrollHeaderElement.style.width = "0";
    }
    const width = rootElement.clientWidth;
    if (scrollElement) {
        if (width)
            scrollElement.style.width = width + "px";
        scrollElement.style.overflowX = scrollElementOverflowX_Backup;
    }
    if (scrollHeaderElement) {
        const correction = hasVerticalScrollBar(scrollElement, options) ? getVerticalScrollBarWidth() : 0;
        if (width)
            scrollHeaderElement.style.width = (width - correction) + "px";
        scrollHeaderElement.style.overflowX = scrollHeaderElementOverflowX_Backup;
    }
    if (scrollElement)
        unlockVirtualScroll(scrollElement);
}
function hasVerticalScrollBar(scrollElement, options) {
    return (options.isVerticalScrolling || options.isVirtualScrolling) &&
        (scrollElement.clientHeight < scrollElement.scrollHeight || scrollElement.style.overflowY === "scroll");
}
function initGroupButtonCellWidth(mainElement) {
    const groupColumnHeadButtons = mainElement.querySelectorAll(".btn.btn-toggle");
    if (groupColumnHeadButtons.length === 0)
        return;
    for (let i = 0; i < groupColumnHeadButtons.length; i++) {
        const groupColumnHeadButton = groupColumnHeadButtons[i];
        const buttonWidth = groupColumnHeadButton.offsetWidth + getLeftRightBordersAndPaddingsSummaryValue(groupColumnHeadButton.parentNode);
        if (buttonWidth > 0) {
            requestAnimationFrame(() => {
                mainElement.style.setProperty("--button-w", buttonWidth + "px");
            });
            break;
        }
    }
}
function getRuntimeCssRuleDisposeMethod(rule) {
    return () => {
        if (!rule)
            return;
        const ownerStyleSheet = rule.parentStyleSheet;
        if (!ownerStyleSheet)
            return;
        const indexToDelete = Array.prototype.indexOf.call(ownerStyleSheet.cssRules, rule);
        if (indexToDelete > -1)
            ownerStyleSheet.deleteRule(indexToDelete);
    };
}
function autoWidthRequired(options) {
    return !options.needInternalSettings &&
        (options.isHorizontalScrolling || options.isVerticalScrolling
            && options.columnResizeMode !== ColumnResizeMode.Component);
}
function initInternalSettings(options) {
    const elementsStorage = options.elementsStorage;
    const mainElement = ensureElement(options.mainElement).parentElement;
    if (!mainElement)
        return null;
    const scrollElement = ensureElement(elementsStorage.scrollElement);
    const scrollHeaderElement = ensureElement(elementsStorage.scrollHeaderElement);
    const unsubscribeFunctions = [];
    const computedStyle = window.getComputedStyle(mainElement);
    if (!computedStyle)
        return null;
    if (!scrollElement.style.maxHeight) {
        if (options.isDropDown)
            scrollElement.style.maxHeight = getDropDownMaxHeight(computedStyle, scrollHeaderElement) + "px";
        else {
            const mainElementSizeSub = subscribeElementContentSize(mainElement, (size) => {
                scrollElement.style.maxHeight = (size.height - scrollHeaderElement.offsetHeight) + "px";
            });
            const headerSizeSub = subscribeElementContentSize(scrollHeaderElement, (size) => {
                scrollElement.style.maxHeight = (mainElement.clientHeight - (size.height + 2 * getTopBottomBordersAndPaddingsSummaryValue(scrollHeaderElement))) + "px";
            });
            unsubscribeFunctions.push(() => {
                unsubscribeElement(mainElementSizeSub);
                unsubscribeElement(headerSizeSub);
            });
            scrollElement.style.maxHeight = (mainElement.clientHeight - scrollHeaderElement.offsetHeight) + "px";
        }
    }
    if (options.isDropDown && options.dropDownWidthMode !== 2) { // DropDownWidthMode.EditorWidth
        const unsub = calculateColumnsSizeInternal(scrollElement, scrollHeaderElement, mainElement, options, computedStyle);
        const scrollElementTable = scrollElement.querySelector("table");
        if (!scrollElementTable)
            return null;
        registerDisposableEvents(scrollElementTable, () => {
            if (unsub)
                unsub();
        });
        const bodySizeSub = subscribeElementContentSize(scrollElementTable, (_) => {
            disposeEvents(scrollElementTable);
            const newUnsub = calculateColumnsSizeInternal(scrollElement, scrollHeaderElement, mainElement, options, computedStyle);
            registerDisposableEvents(scrollElementTable, function () {
                if (newUnsub)
                    newUnsub();
            });
        });
        unsubscribeFunctions.push(function () {
            unsubscribeElement(bodySizeSub);
            disposeEvents(scrollElementTable);
        });
    }
    if (unsubscribeFunctions.length > 0) {
        return () => {
            unsubscribeFunctions.forEach((f) => f());
        };
    }
    return null;
}
function subscribeVerticalScrollBarVisibility(mainElement, scrollElement, hasHorizontalScrollBar) {
    const scrollBarSubscriber = subscribeElementVerticalScrollBarVisibility(scrollElement, (isVerticalScrollBarVisible) => {
        onScrollBarVisibilityChanged(mainElement, isVerticalScrollBarVisible, hasHorizontalScrollBar);
    });
    return () => {
        unsubscribeElement(scrollBarSubscriber);
    };
}
function onScrollBarVisibilityChanged(mainElement, isVerticalScrollBarVisible, hasHorizontalScrollBar) {
    const verticalScrollBarVisibleCssClassName = "dxbs-vertical-scrollbar-visible";
    if (isVerticalScrollBarVisible && !hasHorizontalScrollBar)
        dom.DomUtils.addClassName(mainElement, verticalScrollBarVisibleCssClassName);
    else
        dom.DomUtils.removeClassName(mainElement, verticalScrollBarVisibleCssClassName);
}
function subscribeVerticalScrollBarWidth() {
    const scrollBarWidthSubscriber = subscribeElementVerticalScrollBarWidth(() => updateScrollbarStyle());
    return () => {
        unsubscribeElement(scrollBarWidthSubscriber);
    };
}
function calculateColumnsSizeInternal(scrollElement, scrollHeaderElement, mainElement, options, computedStyle) {
    function getChildrenIfExist(mainElement, selector) {
        const element = mainElement.querySelector(selector);
        if (!element)
            return null;
        return element.children;
    }
    let unsubscribeFunction = null;
    const bodyTable = scrollElement.querySelector("table");
    const headerTable = scrollHeaderElement.querySelector("table");
    if (!bodyTable || !headerTable)
        return null;
    const bodyFirstRowCells = getChildrenIfExist(bodyTable, "tbody>tr");
    const onlyEmptyRowExist = bodyFirstRowCells && bodyFirstRowCells.length === 1 && bodyTable.querySelector("tr.dxbs-empty-data-row");
    const headerCols = getChildrenIfExist(headerTable, "colgroup");
    const bodyCols = getChildrenIfExist(bodyTable, "colgroup");
    if (mainElement.dataset.calculated)
        resetColumnsSize(headerCols, bodyCols);
    let dropdownSize = 0;
    if (onlyEmptyRowExist) {
        headerTable.style.width = "auto";
        headerTable.style.tableLayout = "auto";
        const tablesWidth = window.getComputedStyle(headerTable).width;
        headerTable.removeAttribute("style");
        dropdownSize = parseFloat(tablesWidth);
    }
    else {
        const headerCells = getChildrenIfExist(headerTable, "thead>tr");
        if (!headerCols || !headerCells || !bodyFirstRowCells || !bodyCols)
            return null;
        bodyTable.style.width = headerTable.style.width = "auto";
        bodyTable.style.tableLayout = headerTable.style.tableLayout = "auto";
        const indexesToRecalculate = [];
        for (let i = 0; i < headerCols.length; i++) {
            const headerElement = headerCols[i];
            if (!headerElement.style.width) {
                headerElement.dataset.autoWidth = "true";
                dropdownSize += calculateSizeOfColumn(headerElement, bodyCols[i], headerCells[i], bodyFirstRowCells[i]);
            }
            else if (headerElement.style.width.indexOf("%") !== -1)
                indexesToRecalculate.push(i);
            else {
                const styleSheet = getCurrentStyleSheet();
                const id = ensureElement(options.mainElement).getAttribute("data-dxdg-id");
                let createdRule = null;
                if (styleSheet) {
                    styleSheet.insertRule("[data-dxdg-id='" + id + "'] table tr>td:nth-child(" + (i + 1) + "), [data-dxdg-id='" + id + "'] table tr>th:nth-child(" + (i + 1) + ") { max-width:" + headerElement.style.width + "; }", styleSheet.cssRules.length);
                    createdRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
                    dropdownSize += parseFloat(headerElement.style.width);
                }
                unsubscribeFunction = getRuntimeCssRuleDisposeMethod(createdRule);
            }
        }
        if (indexesToRecalculate.length > 0) {
            for (let i = 0; i < indexesToRecalculate.length; i++)
                dropdownSize += calculateSizeOfColumn(headerCols[i], bodyCols[i], headerCells[i], bodyFirstRowCells[i]);
        }
        bodyTable.removeAttribute("style");
        headerTable.removeAttribute("style");
    }
    if (options.dropDownWidthMode === 0 || options.dropDownWidthMode === 1) { // DropDownWidthMode.ContentOrEditorWidth
        const editor = options.editor;
        if (!editor)
            return null;
        if (window.innerWidth < bodyTable.getBoundingClientRect().width) {
            const dropdown = mainElement.closest(".dxbl-dropdown-body");
            if (dropdown)
                dropdown.style.overflowY = "auto";
        }
        const borderWidth = parseInt(computedStyle.borderRightWidth, 10) + parseInt(computedStyle.borderLeftWidth, 10);
        const needScroll = scrollElement.querySelector("table").offsetHeight > getDropDownMaxHeight(computedStyle, scrollHeaderElement);
        const expectedDropdownWidth = dropdownSize + (needScroll ? getVerticalScrollBarWidth() : 0) + borderWidth;
        if (options.dropDownWidthMode === 0 && editor.offsetWidth > expectedDropdownWidth) {
            recalculateColumnsSize(headerCols, bodyCols, editor.offsetWidth - expectedDropdownWidth);
            mainElement.style.width = editor.offsetWidth - 2 + "px";
        }
        else
            mainElement.style.width = expectedDropdownWidth + "px";
    }
    mainElement.dataset.calculated = "true";
    return unsubscribeFunction;
}
function getDropDownMaxHeight(computedStyle, scrollHeaderElement) {
    const borderWidth = parseInt(computedStyle.borderTopWidth, 10) + parseInt(computedStyle.borderBottomWidth, 10);
    const mainElementHeight = parseInt(computedStyle.maxHeight, 10) - borderWidth;
    return mainElementHeight - scrollHeaderElement.offsetHeight;
}
function calculateSizeOfColumn(headerColumn, bodyColumn, headerCell, bodyCell) {
    const headerWidth = Math.ceil(headerCell.getBoundingClientRect().width);
    const bodyWidth = Math.ceil(bodyCell.getBoundingClientRect().width);
    const width = headerWidth > bodyWidth ? headerWidth : bodyWidth;
    bodyColumn.style.width = headerColumn.style.width = width + "px";
    return width;
}
function resetColumnsSize(headerCols, bodyCols) {
    if (!headerCols || !bodyCols)
        return;
    for (let i = 0; i < headerCols.length; i++) {
        const headerElement = headerCols[i];
        if (headerElement.dataset.autoWidth)
            resetColumnSize(headerElement, bodyCols.item(i));
    }
}
function resetColumnSize(headerElement, bodyCol) {
    headerElement.style.width = "";
    if (bodyCol)
        bodyCol.style.width = "";
}
function recalculateColumnsSize(headerCols, bodyCols, additionalWidth) {
    if (!headerCols || !bodyCols)
        return;
    const headerColumnsArray = Array.from(headerCols);
    const autoWidthHeaderColumns = headerColumnsArray.filter(item => item.dataset.autoWidth);
    if (autoWidthHeaderColumns.length > 0) {
        const addForColumn = Math.floor(additionalWidth / autoWidthHeaderColumns.length);
        for (let i = 0; i < autoWidthHeaderColumns.length - 1; i++) {
            const headerCell = autoWidthHeaderColumns[i];
            const bodyCell = bodyCols[headerColumnsArray.indexOf(headerCell)];
            const headerWidth = Number.parseInt(headerCell.style.width);
            bodyCell.style.width = headerCell.style.width = headerWidth + addForColumn + "px";
        }
        const lastAutoWidthHeaderColumn = autoWidthHeaderColumns[autoWidthHeaderColumns.length - 1];
        resetColumnSize(lastAutoWidthHeaderColumn, bodyCols[headerColumnsArray.indexOf(lastAutoWidthHeaderColumn)]);
    }
}
const elementWithTableActive = document.createElement("TD");
elementWithTableActive.style.cssText = "display: none; position: fixed; top: -1000px; left: -1000px;";
elementWithTableActive.className = "table-active";
document.body.appendChild(elementWithTableActive);
function waitElementDisplayedAsync(element) {
    return new Promise((resolve, reject) => {
        waitUntilDisplayed(10);
        function waitUntilDisplayed(count) {
            if (element.clientHeight > 0)
                resolve();
            else if (count === 0)
                reject("DxDataGrid.Init error: can't measure layout");
            else
                setTimeout(waitUntilDisplayed, 100, count - 1);
        }
    });
}
async function updateComponent(element, updateAction) {
    try {
        const mainElement = ensureElement(element);
        if (!mainElement)
            throw new Error("failed");
        await waitElementDisplayedAsync(mainElement);
        if (!mainElement._dxResizeAttached) {
            mainElement._dxResizeAttached = true;
            resizeObserver.observe(mainElement);
        }
        cancelAnimationFrame(mainElement._dxNextRafId || -1);
        const componentWidth = mainElement.clientWidth + "px";
        const selectionBgColor = dom.DomUtils.getCurrentStyle(elementWithTableActive).backgroundColor;
        const response = updateAction(mainElement);
        mainElement._dxNextRafId = requestAnimationFrame(() => {
            mainElement.style.setProperty(Styles.SELECTION_BG, selectionBgColor);
            mainElement.style.setProperty(Styles.COMPONENT_WIDTH, componentWidth);
        });
        return response;
    }
    catch (e) {
        throw new Error(`DxDataGrid.Init error: ${e}`);
    }
}
function init(_mainElement, options, dotNetRef) {
    return updateComponent(_mainElement, (mainElement) => {
        const dotnetHelper = dotNetRef;
        const isMultipleSelectionEnabled = options.isMultipleSelectionEnabled;
        const scrollToSelectedItemRequested = options.scrollToSelectedItemRequested;
        const elementsStorage = options.elementsStorage;
        disposeEvents(mainElement);
        let onScrollWrapper = null;
        let onWindowResize = null;
        let columnHeadRowMouseDown = null;
        let groupRowMouseDown = null;
        let disposeOldInternalStyles = null;
        if (options.needInternalSettings)
            disposeOldInternalStyles = initInternalSettings(options);
        const scrollElement = ensureElement(elementsStorage.scrollElement);
        const scrollHeaderElement = ensureElement(elementsStorage.scrollHeaderElement);
        if (scrollElement) {
            const virtualScrollSpacerTopElement = ensureElement(elementsStorage.virtualScrollSpacerTopElement);
            const virtualScrollSpacerBottomElement = ensureElement(elementsStorage.virtualScrollSpacerBottomElement);
            lockVirtualScroll(scrollElement);
            if (options.isVirtualScrolling || options.isVerticalScrolling) {
                const hasVerticalScrollBarCssClassName = "dxbs-has-vertical-scrollbar";
                dom.DomUtils.addClassName(mainElement, hasVerticalScrollBarCssClassName);
                onScrollBarVisibilityChanged(mainElement, scrollElement.scrollHeight > scrollElement.clientHeight, options.isHorizontalScrolling);
                const needVerticalScrollBarSubsribtion = options.isFirstScrollableRender && options.isAutoVerticalScrollBarMode;
                if (needVerticalScrollBarSubsribtion)
                    mainElement.disposeVerticalScrollBarSubscriber = subscribeVerticalScrollBarVisibility(mainElement, scrollElement, options.isHorizontalScrolling);
                if (options.isFirstScrollableRender)
                    mainElement.disposeVerticalScrollBarWidthSubscriber = subscribeVerticalScrollBarWidth();
            }
            if (options.isVirtualScrolling) {
                initScrollHeight(dotnetHelper, scrollElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement, options);
                if (scrollToSelectedItemRequested)
                    scrollToSelectedItem(scrollElement);
                else if (scrollElement.DxRestoreScrollTop) {
                    scrollElement.scrollTop = scrollElement.DxRestoreScrollTop;
                    delete scrollElement.DxRestoreScrollTop;
                }
            }
            initGroupButtonCellWidth(mainElement);
            onScrollWrapper = (evt) => onScroll(evt, dotnetHelper, options, scrollElement, scrollHeaderElement, virtualScrollSpacerTopElement, virtualScrollSpacerBottomElement);
            scrollElement.addEventListener("scroll", onScrollWrapper);
            if (scrollHeaderElement)
                scrollHeaderElement.addEventListener("scroll", onScrollWrapper);
            unlockVirtualScroll(scrollElement);
            if (autoWidthRequired(options)) {
                const rootElement = ensureElement(elementsStorage.rootElement);
                onWindowResize = () => autoWidthCalculate(rootElement, scrollElement, scrollHeaderElement, options);
                onWindowResize();
                window.addEventListener("resize", onWindowResize);
                mainElement._dxOnWindowResize = onWindowResize;
            }
        }
        mainElement.addEventListener("mousedown", onGridMouseDown);
        function onGridMouseDown(evt) {
            processSelection(evt);
        }
        function processSelection(evt$1) {
            if (!isMultipleSelectionEnabled || !evt$1.shiftKey || !evt.EvtUtils.isLeftButtonPressed(evt$1))
                return;
            const eventSource = evt.EvtUtils.getEventSource(evt$1);
            const dataRow = getParentByClassName(eventSource, DataRowMarkerCssClass);
            if (dataRow)
                removeSelection();
        }
        let columnHeadRow = null;
        let groupPanel = null;
        const columnResizeEnabled = options.columnResizeMode !== ColumnResizeMode.Disabled;
        if (options.isColumnDragEnabled) {
            const dragId = mainElement.dataset.dxdgId;
            if (dragId) {
                columnHeadRow = mainElement.querySelector("[data-dxdg-drag-head-row='" + dragId + "']");
                if (columnHeadRow) {
                    columnHeadRowMouseDown = (evt) => mouseDown(evt, dragId, columnResizeEnabled, dotnetHelper);
                    columnHeadRow.addEventListener(touch.TouchUtils.touchMouseDownEventName, columnHeadRowMouseDown);
                }
                groupPanel = mainElement.querySelector("[data-dxdg-gp='" + dragId + "']");
                if (groupPanel) {
                    groupRowMouseDown = (evt) => mouseDown(evt, dragId, columnResizeEnabled, dotnetHelper);
                    groupPanel.addEventListener(touch.TouchUtils.touchMouseDownEventName, groupRowMouseDown);
                }
            }
        }
        registerDisposableEvents(mainElement, function () {
            if (disposeOldInternalStyles)
                disposeOldInternalStyles();
            if (onScrollWrapper) {
                scrollElement.removeEventListener("scroll", onScroll);
                if (scrollHeaderElement)
                    scrollHeaderElement.removeEventListener("scroll", onScroll);
            }
            if (onWindowResize)
                window.removeEventListener("resize", onWindowResize);
            if (scrollElement)
                clearVirtualScrollingTimer(scrollElement);
            if (columnHeadRowMouseDown && columnHeadRow)
                columnHeadRow.removeEventListener(touch.TouchUtils.touchMouseDownEventName, columnHeadRowMouseDown);
            if (groupRowMouseDown && groupPanel)
                groupPanel.removeEventListener(touch.TouchUtils.touchMouseDownEventName, groupRowMouseDown);
            mainElement.removeEventListener("mousedown", onGridMouseDown);
        });
        if (options.isFirstScrollableRender && options.isVirtualScrolling && options.virtualScrollingOptions.itemsBelow > 0) {
            const scrollState = getParametersForVirtualScrollingRequest(scrollElement);
            return JSON.stringify(scrollState.requestScrollState);
        }
        else
            return JSON.stringify(ScrollState.Auto);
    });
}
function dispose(mainElement) {
    mainElement = ensureElement(mainElement);
    if (mainElement)
        disposeCore(mainElement);
    return Promise.resolve("ok");
}
function disposeCore(mainElement) {
    resizeObserver.unobserve(mainElement);
    disposeEvents(mainElement);
    disposeVerticalScrollBarSubscriber(mainElement);
    disposeVerticalScrollBarWidthSubscriber(mainElement);
}
function disposeVerticalScrollBarSubscriber(mainElement) {
    if (mainElement.disposeVerticalScrollBarSubscriber) {
        mainElement.disposeVerticalScrollBarSubscriber();
        delete mainElement.disposeVerticalScrollBarSubscriber;
    }
}
function disposeVerticalScrollBarWidthSubscriber(mainElement) {
    if (mainElement.disposeVerticalScrollBarWidthSubscriber) {
        mainElement.disposeVerticalScrollBarWidthSubscriber();
        delete mainElement.disposeVerticalScrollBarWidthSubscriber;
    }
}
const grid = { init, dispose };

export { grid as default, dispose, getParametersForVirtualScrollingRequest, init, scrollToFocusedItem, scrollToSelectedItem };
//# sourceMappingURL=grid-24.2.js.map
