function getUrlObject() {
    return window.URL || window['webkitURL'] || window['mozURL'] || window['msURL'] || window['oURL'];
}
var topPageMargin = 76;
window["_dxvGetPixelRatio"] = function () {
    return window["devicePixelRatio"] || 1;
};
function _getDeviceInfo() {
    var hasTouchScreen = !!window.navigator.maxTouchPoints
        && window.navigator.maxTouchPoints > 0;
    var isWindows = /Win/.test(navigator.userAgent);
    var isMac = /Mac/.test(navigator.userAgent);
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isAndroid = hasTouchScreen && /'Android'/.test(navigator.userAgent);
    var isIOS = hasTouchScreen && (/i(Phone|Pad|Pod)/i.test(navigator.userAgent) || navigator.userAgent.includes('Intel Mac'));
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple/.test(navigator.vendor);
    return {
        isWindows: isWindows,
        isMac: isMac,
        isAndroid: isAndroid,
        isIOS: isIOS,
        isChrome: isChrome,
        isSafari: isSafari
    };
}
window["_dxvExport"] = function (options) {
    var _a = _getDeviceInfo(), isChrome = _a.isChrome, isSafari = _a.isSafari, isIOS = _a.isIOS, isAndroid = _a.isAndroid;
    var shouldCallPrint = isChrome || isSafari;
    var contentType = !options.isPrint && isIOS && options.contentType === 'application/pdf' ? options.contentType = 'application/octet-stream' : options.contentType;
    var blob = new Blob([options.fileContent], { type: contentType });
    var url = getUrlObject().createObjectURL(blob);
    if (options.isPrint && !isAndroid) {
        doPrint(url, options.frameId, shouldCallPrint);
    }
    else {
        doExport(url, options.fileName);
    }
    setTimeout(function () { return URL.revokeObjectURL(url); });
};
function doExport(url, fileName) {
    var anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement); // fix T1164089 - blazor maui
    anchorElement.href = url;
    anchorElement.rel = 'noreferrer noopener';
    anchorElement.download = fileName;
    anchorElement.click();
    anchorElement.remove();
}
function doPrint(url, frameId, shouldCallPrint) {
    var frame = document.getElementById(frameId);
    var window = frame.contentWindow;
    window.location.replace(url);
    if (shouldCallPrint) {
        var printFunc_1 = function () {
            if (window) {
                window.print();
                frame.removeEventListener("load", printFunc_1);
            }
        };
        frame.addEventListener("load", printFunc_1);
    }
}
function _getScrollOffset(elementPosition, scrollOffset, visibleSize, fullSize, centered) {
    var newOffset = scrollOffset;
    if (elementPosition < scrollOffset || elementPosition > (scrollOffset + visibleSize) / 2) {
        newOffset = elementPosition;
        var halfVisibleSize = visibleSize / 2;
        if (!centered || newOffset + halfVisibleSize < fullSize) {
            newOffset -= centered ? halfVisibleSize : visibleSize;
        }
    }
    return newOffset;
}
function scrollTo(container, target, leftPosition, topPosition, centered) {
    if (leftPosition === void 0) { leftPosition = 0; }
    if (topPosition === void 0) { topPosition = 0; }
    if (centered === void 0) { centered = false; }
    var scrollLeft = _getScrollOffset(target.offsetLeft + leftPosition, container.scrollLeft, container.clientWidth, container.scrollWidth, centered);
    var scrollTop = _getScrollOffset(target.offsetTop + topPosition, container.scrollTop, container.clientHeight, container.scrollHeight, centered);
    if (container.scrollTo) {
        container.scrollTo({
            left: scrollLeft,
            top: scrollTop
        });
    }
    else {
        container.scrollLeft = scrollLeft;
        container.scrollTop = scrollTop;
    }
}
function scrollToPage(target) {
    var container = target.closest(".dxbrv-surface-wrapper");
    scrollTo(container, target, container.clientWidth, container.clientHeight - topPageMargin);
}
function scrollToBrick(target) {
    var container = target.closest(".dxbrv-surface-wrapper");
    var page = target.closest(".dxbrv-report-preview-content-flex-item");
    scrollTo(container, target, page.offsetLeft, page.offsetTop, true);
}
window["_dxvNavigateToBrick"] = function (mainElement, pageIndex, brickIndex) {
    var pageElement = mainElement.querySelector("[dxbrv-page-index='" + pageIndex + "']");
    if (!pageElement)
        return;
    var el = pageElement.querySelector("[dxbrv-brick-index='" + brickIndex + "']");
    if (el)
        scrollToBrick(el);
};
var verticalOffset = 0;
var horizontalOffset = 0;
var resizeObserver = null;
var surfaceWrapper;
var callculateDivStyles = function (container, customizeDiv) {
    var div = document.createElement('div');
    div.style.visibility = "invisible";
    customizeDiv(div);
    container.appendChild(div);
    var styles = getComputedStyle(div);
    var result = {
        marginLeft: styles.marginLeft,
        marginRight: styles.marginRight,
        marginTop: styles.marginTop,
        marginBottom: styles.marginBottom,
        width: styles.width
    };
    div.remove();
    return result;
};
window["_dxvGetAvailableArea"] = function (mainElement) {
    var surfaceWrapper = mainElement.getElementsByClassName('dxbrv-surface-wrapper')[0];
    var documentSurface = surfaceWrapper.getElementsByClassName('dxbrv-document-surface')[0];
    if (!verticalOffset || !horizontalOffset) {
        verticalOffset = parseFloat(getComputedStyle(surfaceWrapper).paddingTop);
        var pageDivStyles = callculateDivStyles(documentSurface, function (div) {
            div.classList.add('dxbrv-report-preview-content-flex-item');
        });
        horizontalOffset += (parseFloat(pageDivStyles.marginLeft) + parseFloat(pageDivStyles.marginRight));
        verticalOffset += parseFloat(pageDivStyles.marginBottom);
        var toolbar_1 = mainElement.getElementsByClassName('dxbrv-toolbar')[0];
        verticalOffset += toolbar_1.clientHeight;
    }
    return {
        Width: Math.floor(surfaceWrapper.clientWidth - horizontalOffset),
        Height: Math.floor(surfaceWrapper.clientHeight - verticalOffset)
    };
};
window["_dxvSubscribeToWindowResize"] = function (dotNetHelper, mainElement) {
    surfaceWrapper = mainElement.getElementsByClassName('dxbrv-surface-wrapper')[0];
    resizeObserver = new ResizeObserver(function () {
        dotNetHelper.invokeMethodAsync('JSUpdatePageSizeAsync');
    });
    resizeObserver.observe(surfaceWrapper);
};
window["_dxvUnSubscribeToWindowResize"] = function () {
    resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.unobserve(surfaceWrapper);
    resizeObserver = null;
};
window["_dxvNavigateToPage"] = function (mainElement, pageIndex) {
    var pageElement = mainElement.querySelector("[dxbrv-page-index='" + pageIndex + "']");
    if (pageElement)
        scrollToPage(pageElement);
};
var dragElement = (function () {
    function dragElement(element, dropMarker, resizableClassName, min, max, component) {
        var _this = this;
        this.element = element;
        this.dropMarker = dropMarker;
        this.resizableClassName = resizableClassName;
        this.component = component;
        this.currentPosition = 0;
        this.previousPosition = 0;
        this.resizing = false;
        this.minWidth = min;
        this.maxWidth = max;
        this.closeDragElement = function () {
            if (_this.resizing)
                window["_dxvOnAfterResize"](_this.component, Math.round(parseInt(_this.element.style.left)));
            _this.element.style.left = 'unset';
            _this.element.style.setProperty("--rightpanel-resize-anchor-width", "0px");
            _this.dropMarker.classList.remove("dxbrv-state-visible");
            document.removeEventListener("mouseup", _this.closeDragElement);
            document.removeEventListener("mousemove", _this.elementDrag);
            document.removeEventListener("keydown", _this.keydownEsc);
            document.onmouseup = null;
            document.onmousemove = null;
            document.onkeydown = null;
            _this.resizing = false;
        };
        this.keydownEsc = function (e) {
            if (!_this.resizing)
                return;
            e = e || window.event;
            var isEscape = false;
            if ("key" in e) {
                isEscape = (e.key === "Escape" || e.key === "Esc");
            }
            else {
                isEscape = (e.keyCode === 27);
            }
            if (isEscape) {
                _this.resizing = false;
                _this.closeDragElement();
            }
        };
        this.elementDrag = function (e) {
            _this.dropMarker.classList.add("dxbrv-state-visible");
            e = e || window.event;
            e.preventDefault();
            _this.resizing = true;
            var resizableElement = document.querySelectorAll(".dxbrv-wrapper ." + _this.resizableClassName)[0];
            var resizableElementRect = resizableElement.getBoundingClientRect();
            if (e.clientX > resizableElementRect.left - (_this.maxWidth - resizableElementRect.width) && e.clientX && e.clientX < resizableElementRect.right - _this.minWidth) {
                _this.currentPosition = _this.previousPosition - e.clientX;
                _this.previousPosition = e.clientX;
            }
            var left = _this.element.offsetLeft - _this.currentPosition;
            if (resizableElement.clientWidth - left > _this.minWidth && resizableElement.clientWidth - left < _this.maxWidth) {
                _this.element.style.left = left + "px";
                var offsetWidth = -(left);
                if (offsetWidth < 0)
                    offsetWidth = 0;
                _this.element.style.setProperty("--rightpanel-resize-anchor-width", offsetWidth + "px");
            }
            document.addEventListener("keydown", _this.keydownEsc);
        };
        this.dragMouseDown = function (e) {
            e = e || window.event;
            e.preventDefault();
            _this.previousPosition = e.clientX;
            document.addEventListener("mouseup", _this.closeDragElement);
            document.addEventListener("mousemove", _this.elementDrag);
        };
        element.addEventListener("mousedown", this.dragMouseDown);
    }
    return dragElement;
}());
window["_dxvRegisterResize"] = function (anchor, marker, resizableClassName, min, max, component) {
    window["_dxvRisizeInstance"] = new dragElement(anchor, marker, resizableClassName, min, max, component);
};
window["_dxvOnAfterResize"] = function (dotNetHelper, width) {
    return dotNetHelper.invokeMethodAsync('StopResize', width);
};
window["_dxvDisposeResize"] = function (element) {
    !!element && element.removeEventListener("mousedown", window["_dxvRisizeInstance"].dragMouseDown);
};
window["_dxvHandleCopyText"] = function (content) {
    window.navigator.clipboard.writeText(content);
};
function checkIntersection(rect1, rect2) {
    return (rect1.left < rect2.left + rect2.width) &&
        (rect1.left + rect1.width > rect2.left) &&
        (rect1.top < rect2.bottom) &&
        (rect1.bottom > rect2.top);
}
window["_dxvCheckIntersectionPages"] = function (dotNetHelper, mainElement) {
    var pages = mainElement.querySelectorAll("[dxbrv-page-needsinvalidate]");
    var root = mainElement.querySelector(".dxbrv-surface-wrapper");
    var rootRect = root.getBoundingClientRect();
    pages.forEach(function (page) {
        if (checkIntersection(rootRect, page.getBoundingClientRect())) {
            var pageIndex = Number(page.getAttribute('dxbrv-page-index'));
            dotNetHelper.invokeMethodAsync('JSUpdatePageImageAsync', pageIndex);
        }
    });
};
function createObserver(dotNetHelper, observerId, pagesCoolectionId, options) {
    var observer = null;
    var callback = function (entries) {
        entries.forEach(function (entry) {
            var target = entry.target;
            if (entry.isIntersecting && target.hasAttribute('dxbrv-page-needsinvalidate')) {
                var pageIndex = Number(target.getAttribute('dxbrv-page-index'));
                dotNetHelper.invokeMethodAsync('JSUpdatePageImageAsync', pageIndex);
            }
        });
    };
    observer = new IntersectionObserver(callback, options);
    window[observerId] = observer;
    window[pagesCoolectionId] = new Array();
    return observer;
}
window["_dxvIsInputElement"] = function (event) {
    return document.activeElement.tagName === 'INPUT';
};
window["_dxvInitializePageForDocumentScroll"] = function (dotNetHelper, mainElement, pageIndex) {
    var el = mainElement.querySelector("[dxbrv-page-index='" + pageIndex + "']");
    var root = mainElement.querySelector(".dxbrv-surface-wrapper");
    if (!el || !root)
        return;
    var mainElementId = mainElement.id;
    var observerId = "_dxv_" + mainElementId + "_PagesObserver";
    var pagesCoolectionId = "_dxv_" + mainElementId + "_Pages";
    var observer = window[observerId];
    if (!observer) {
        var options = {
            root: root,
            rootMargin: '20px',
            threshold: 0.0
        };
        observer = createObserver(dotNetHelper, observerId, pagesCoolectionId, options);
    }
    if (!!observer) {
        var pages = window[pagesCoolectionId];
        pages.push(el);
        observer.observe(el);
    }
};
function resetTabIndexById(attrValue, attribute) {
    var element = document.querySelector(getSelector(attribute, attrValue));
    if (element && element.tabIndex != -1)
        element.setAttribute('tabindex', '-1');
}
function setTabIndex(element, index) {
    element.setAttribute('tabindex', index);
}
function getFirstChild(element, nodeType) {
    element = element === null || element === void 0 ? void 0 : element.firstChild;
    while (element && element.nodeType !== nodeType) {
        element = element.nextSibling;
    }
    return element;
}
function getSelector(attribute, value) {
    return "[".concat(attribute, "=\"").concat(value, "\"]");
}
function isElementVisible(element) {
    if (!element || !element.getBoundingClientRect)
        return false;
    if (element.offsetParent === null)
        return false;
    if (element.disabled)
        return false;
    if (!(element instanceof HTMLElement))
        return false;
    var style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
        return false;
    }
    var rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var isVisible = rect.top < viewportHeight && rect.bottom > 0 &&
        rect.left < viewportWidth && rect.right > 0;
    return isVisible;
}
window["_dxvFocusElement"] = function (attrValue, attribute, recursive, scrollToViewOnFocus) {
    if (recursive === void 0) { recursive = true; }
    if (scrollToViewOnFocus === void 0) { scrollToViewOnFocus = false; }
    setTimeout(function () {
        var element = document.querySelector(getSelector(attribute, attrValue));
        if (recursive) {
            element = getFirstChild(element, 1);
        }
        if (element) {
            setTabIndex(element, '0');
            element.focus();
            if (scrollToViewOnFocus)
                element.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'center'
                });
        }
    }, 50);
};
window["_dxvResetTabIndexes"] = function (attribute, data) {
    if (!data)
        return;
    data.ids.forEach(function (id) { resetTabIndexById(id, attribute); });
};
window["_dxvFocusAdjacentElement"] = function (forward) {
    if (forward === void 0) { forward = true; }
    var elementsWithTabIndex = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    var visibleElementsWithTabIndex = Array.from(elementsWithTabIndex).filter(isElementVisible);
    var currentIndex = Array.from(visibleElementsWithTabIndex).findIndex(function (el) { return el === document.activeElement; });
    if (currentIndex !== -1) {
        var nextIndex = visibleElementsWithTabIndex.length - 1;
        if (forward)
            nextIndex = (currentIndex + 1) % visibleElementsWithTabIndex.length;
        else if (currentIndex - 1 > -1)
            nextIndex = currentIndex - 1;
        visibleElementsWithTabIndex[nextIndex].focus();
    }
};
window["_dxvGetElementsPositionInfo"] = function (pageSelector, brickSelector) {
    var element = document.querySelector(pageSelector);
    if (element) {
        var brick = document.querySelector(brickSelector);
        return {
            Top: element.offsetTop,
            Left: element.offsetLeft,
            Width: element.clientWidth,
            Height: brick.offsetTop
        };
    }
};
window["_dxvSetLiveElementContent"] = function (id, content) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = "";
        setTimeout(function () {
            element.textContent = content;
        }, 1000);
    }
};
