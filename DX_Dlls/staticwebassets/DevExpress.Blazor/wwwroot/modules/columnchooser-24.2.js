import { H as eraseBlazorIdentificators } from './dom-utils-24.2.js';
import { E as EventRegister } from './eventRegister-24.2.js';
import { FocusUnit, DragAndDropUnit, getClientRect, RectBlz } from './dragAndDropUnit-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './touch-24.2.js';

let chooserItems = null;
let sourceItem;
let sourceIndex = -1;
let itemToDragUnitMap;
let itemToFocusUnitMap;
let _dotnetHelper;
let focusedItemIndex = -1;

let mapRect;
let events;

let exitButtonFocusUnit;
let needFocusContent = true;
let isModal = false;
let container;
let abs_container;

const TabKeyCode = 9;
const SpaceKeyCode = 32;
const UpKeyCode = 38;
const DownKeyCode = 40;

function GetPreparedColumnInfo(colInfo) {
    const col = colInfo.clientRef;
    if(colInfo.serverRef)
        col._dx_server_ref = colInfo.serverRef;
    return col;
}
function init(_container, _columnsInfo, _focusContent, blazorComponent) {
    const inputElements = Array.from(_columnsInfo).map(colInfo => GetPreparedColumnInfo(colInfo));
    if(!_dotnetHelper)
        _dotnetHelper = blazorComponent;
    else if(_dotnetHelper._id !== blazorComponent._id) {
        dispose(_dotnetHelper);
        _dotnetHelper = blazorComponent;
    }

    if(!container) {
        container = _container;
        let c = container;
        while(c.parentNode !== document && c.classList) {
            if(c.classList.contains("modal-dialog")) {
                isModal = true;
                break;
            }
            c = c.parentNode;
        }
    }

    mapRect = new Map();
    if(events) events.dispose();
    events = new EventRegister(container);

    if(!chooserItems) {
        itemToDragUnitMap = new Map();
        itemToFocusUnitMap = new Map();
        chooserItems = inputElements;
    }

    focusedItemIndex = -1;
    events.attachEventWithContext(document, "keydown", arrowsKeysNavigation, document);

    if(chooserItems) {
        chooserItems.sort((a, b) => a.dataset.vindex - b.dataset.vindex);
        abs_container = findContainerFor(container, "absolute");
        setNeedFocusContent(_focusContent && !isModal);

        if(getNeedFocusContent()) {
            const token = events.attachEvent(abs_container, "focusin", function() {
                token.dispose();
                chooserItems[0].focus();
            });
        }
    }

    resetDraggableItem();
}

function findContainerFor(element, _position) {
    if(isModal)
        return element;
    let _container = element;
    let style = window.getComputedStyle(_container);
    while(style.position !== _position && _container.parentNode !== document) {
        _container = _container.parentNode;
        style = window.getComputedStyle(_container);
    }
    return _container;
}

function setNeedFocusContent(focus) {
    needFocusContent = focus;

    if(exitButtonFocusUnit) exitButtonFocusUnit.dispose();
    const button = document.querySelector(".column-chooser-exit-button");
    exitButtonFocusUnit = button ? new FocusUnit(button, null, container, !needFocusContent) : null;

    itemToFocusUnitMap.forEach(function(v) { v.dispose(); });
    itemToFocusUnitMap = new Map();
    chooserItems.forEach(function(item) { attachEvents(item, abs_container); });
}

function getNeedFocusContent() {
    return needFocusContent;
}

function arrowsKeysNavigation(event) {
    if(!getNeedFocusContent()) {
        setNeedFocusContent(true);
        if(event.keyCode === TabKeyCode)
            chooserItems[chooserItems.length - 1].focus();
    }
    switch(event.keyCode) {
        case SpaceKeyCode:
            if(focusedItemIndex >= 0) {
                event.preventDefault();
                chooserItems[focusedItemIndex].click();
            }
            break;
        case UpKeyCode:
            event.preventDefault();
            focuseNextItem(-1);
            break;
        case DownKeyCode:
            event.preventDefault();
            focuseNextItem(1);
            break;
    }
}

function focuseNextItem(offset) {
    if(!chooserItems || !itemToDragUnitMap)
        return;

    focusedItemIndex = focusedItemIndex + offset;
    focusedItemIndex = focusedItemIndex < 0 ? chooserItems.length - 1 : focusedItemIndex;
    focusedItemIndex = focusedItemIndex % chooserItems.length;

    const unit = itemToFocusUnitMap.get(chooserItems[focusedItemIndex]);
    if(unit) unit.focus();
}

function onFocusedItemChanged(item) {
    focusedItemIndex = chooserItems.indexOf(item);
}
function onLoseFocus(item) {
    if(focusedItemIndex === chooserItems.indexOf(item)) {
        if(focusedItemIndex === chooserItems.length - 1 && exitButtonFocusUnit)
            exitButtonFocusUnit.focus();
        focusedItemIndex = -1;
    }
}
function onMouseClick(item) {
    if(getNeedFocusContent())
        setNeedFocusContent(false);
}

function attachEvents(item, abs_container) {
    if(item._dx_server_ref) {
        let dragAndDropUnit = itemToDragUnitMap.get(item);
        if(!dragAndDropUnit) {
            dragAndDropUnit = new DragAndDropUnit(item, item.parentNode, GetItemWithBound, ".column-chooser-drag-icon-owner", getZeroPoint, isModal);

            dragAndDropUnit.onDragStart = handleDragStart;
            dragAndDropUnit.onDrag = MoveItems;
            dragAndDropUnit.onDragCancel = onDragCancel;
            dragAndDropUnit.onDropAnimationEnd = onDropAnimationEnd;
            itemToDragUnitMap.set(item, dragAndDropUnit);
        }
        dragAndDropUnit.reset();
    }
    item.classList.remove("up");
    item.classList.remove("down");
    item.classList.remove("freeze");

    let focusUnit = itemToFocusUnitMap.get(item);
    if(!focusUnit) {
        focusUnit = new FocusUnit(item, ".custom-control-input", abs_container, isModal || !needFocusContent);
        focusUnit.onFocus = onFocusedItemChanged;
        focusUnit.onBlur = onLoseFocus;
        focusUnit.onClick = onMouseClick;
        itemToFocusUnitMap.set(item, focusUnit);
    }
    focusUnit.reset();
}
function getItem(point) {
    return chooserItems.find(function(item, _, __) { return isTarget(item, point.y); });
}
function GetItemWithBound(point) {
    const item = getItem(point);
    if(!item)
        return null;
    return { item: item, relativeRect: getClientRectFor(item) };
}

function resetDraggableItem() {
    if(sourceItem && sourceItem.style) {
        const unit = itemToDragUnitMap.get(sourceItem);
        if(unit) unit.reset();
        const f_unit = itemToFocusUnitMap.get(sourceItem);
        if(f_unit) f_unit.reset();
        sourceIndex = -1;
        sourceItem.childNodes.forEach(function(chl) { if(chl.style) chl.style.visibility = ""; });
        sourceItem = null;
    }
}

function handleDragStart(e) {
    sourceItem = e;
    sourceIndex = chooserItems.indexOf(sourceItem);
    chooserItems.forEach(function(el) {
        el.blur();
        if(el !== sourceItem) el.classList.add("freeze");
    });
    sourceItem.childNodes.forEach(function(chl) { if(chl.style) chl.style.visibility = "hidden"; });
    const f_unit = itemToFocusUnitMap.get(sourceItem);
    if(f_unit) f_unit.stop();
}

function getClientRectFor(item) {
    let rect = mapRect.get(item);
    if(rect)
        return rect;
    const r = getClientRect(item);
    const zero = getZeroPoint();
    rect = new RectBlz(r.x - zero.x, r.y - zero.y, r.width, r.height);
    mapRect.set(item, rect);
    return rect;
}

function isTarget(item, y) {
    const r = getClientRectFor(item);
    if(!r)
        return false;
    return r.top <= y && y <= r.bottom;
}

function onDropAnimationEnd(s, t) {
    chooserItems.forEach(function(item) { itemToDragUnitMap.get(item).stop(); });

    const curtainForContainer = container.cloneNode(true);

    eraseBlazorIdentificators(curtainForContainer);
    curtainForContainer.style["z-index"] = 2000;
    container.parentNode.appendChild(curtainForContainer);

    _dotnetHelper.invokeMethodAsync("OnElementsExchange", s._dx_server_ref, t._dx_server_ref)
        .catch(function(e) { console.error(e); })
        .finally(() => curtainForContainer.remove());
}

function onDragCancel(s) {
    chooserItems.forEach(function(el) {
        el.classList.remove("up");
        el.classList.remove("down");
        el.classList.remove("freeze");
    });
    resetDraggableItem();
}

function getZeroPoint() {
    const c = isModal ? container.parentNode : container;
    const rect = getClientRect(c);
    if(c.scrollTop !== 0)
        return { x: rect.x, y: rect.y - c.scrollTop };
    return rect.location;
}

function updateMetaData(item) {
    const unit = itemToFocusUnitMap.get(item);
    unit.updateStyleMetadata();
}

function MoveItems(item, e) {
    if(!item)
        return;
    if(sourceIndex === -1)
        sourceIndex = chooserItems.indexOf(item);

    const target = getItem(e.centerOfDraggingObject);
    if(!target)
        return;

    const index = chooserItems.indexOf(target);

    let needMoveItems = false;
    if(sourceIndex < index) {
        chooserItems.forEach(function(el) {
            if(sourceItem === el)
                needMoveItems = true;
            if(needMoveItems) {
                updateMetaData(el);
                el.classList.add("up");
            }
            else
                el.classList.remove("up", "down");
            if(target === el)
                needMoveItems = false;
        });
    }
    else if(sourceIndex > index) {
        chooserItems.forEach(function(el) {
            if(target === el)
                needMoveItems = true;
            if(needMoveItems) {
                updateMetaData(el);
                el.classList.add("down");
            }
            else
                el.classList.remove("up", "down");
            if(sourceItem === el)
                needMoveItems = false;
        });
    }
    else
        chooserItems.forEach(function(el) { el.classList.remove("up", "down"); });
}

function dispose(blazorComponent) {
    if(blazorComponent._id !== _dotnetHelper._id)
        return;
    blazorComponent.dispose();
    itemToDragUnitMap.forEach(function(v, k) {
        v.dispose();
        if(k._dx_server_ref)
            k._dx_server_ref.dispose();
    });
    itemToFocusUnitMap.forEach(function(v) { v.dispose(); });

    chooserItems = null;
    sourceItem = null;
    sourceIndex = -1;
    container = null;
    mapRect = null;
    itemToDragUnitMap = null;
    itemToFocusUnitMap = null;
    _dotnetHelper = null;
    if(events) events.dispose();
    events = null;
}

const columnchooser = { init, dispose };

export { columnchooser as default, dispose, init };
//# sourceMappingURL=columnchooser-24.2.js.map
