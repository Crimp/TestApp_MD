import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './_commonjsHelpers-24.2.js';
import { c as common_1, d as dom } from './dom-24.2.js';
import { t as touch } from './touch-24.2.js';
import { b as browser_1 } from './string-24.2.js';

var evt = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvtUtils = void 0;




var EvtUtils = (function () {
    function EvtUtils() {
    }
    EvtUtils.preventEvent = function (evt) {
        if (!evt.cancelable)
            return;
        if (evt.preventDefault)
            evt.preventDefault();
        else
            evt.returnValue = false;
    };
    EvtUtils.getEventSource = function (evt) {
        return common_1.isDefined(evt) ? EvtUtils.getEventSourceCore(evt) : null;
    };
    EvtUtils.getEventSourceByPosition = function (evt) {
        if (!common_1.isDefined(evt))
            return null;
        if (!document.elementFromPoint)
            return EvtUtils.getEventSourceCore(evt);
        var clientX = EvtUtils.getEventX(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom.DomUtils.getDocumentScrollLeft() : 0);
        var clientY = EvtUtils.getEventY(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom.DomUtils.getDocumentScrollTop() : 0);
        if (clientX === undefined || clientY === undefined)
            return EvtUtils.getEventSourceCore(evt);
        return document.elementFromPoint(clientX, clientY);
    };
    EvtUtils.getEventSourceCore = function (evt) {
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    EvtUtils.getMouseWheelEventName = function () {
        if (browser_1.Browser.Safari)
            return 'mousewheel';
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            return 'DOMMouseScroll';
        return 'wheel';
    };
    EvtUtils.isLeftButtonPressed = function (evt) {
        if (touch.TouchUtils.isTouchEvent(evt))
            return true;
        evt = (browser_1.Browser.IE && common_1.isDefined(event)) ? event : evt;
        if (!evt)
            return false;
        if (browser_1.Browser.IE && browser_1.Browser.Version < 11)
            return browser_1.Browser.MSTouchUI ? true : evt.button % 2 === 1;
        if (browser_1.Browser.WebKitFamily)
            return (evt.type === 'pointermove' || evt.type === 'pointerenter' || evt.type === 'pointerleave') ? evt.buttons === 1 : evt.which === 1;
        if (browser_1.Browser.NetscapeFamily || browser_1.Browser.Edge || (browser_1.Browser.IE && browser_1.Browser.Version >= 11))
            return EvtUtils.isMoveEventName(evt.type) ? evt.buttons === 1 : evt.which === 1;
        return browser_1.Browser.Opera ? evt.button === 0 : true;
    };
    EvtUtils.isMoveEventName = function (type) {
        return type === touch.TouchUtils.touchMouseMoveEventName || type === EvtUtils.getMoveEventName();
    };
    EvtUtils.getMoveEventName = function () {
        return window.PointerEvent ? 'pointermove' : (browser_1.Browser.TouchUI ? 'touchmove' : 'mousemove');
    };
    EvtUtils.preventEventAndBubble = function (evt) {
        EvtUtils.preventEvent(evt);
        if (evt.stopPropagation)
            evt.stopPropagation();
        evt.cancelBubble = true;
    };
    EvtUtils.clientEventRequiresDocScrollCorrection = function () {
        var isSafariVerLess3 = browser_1.Browser.Safari && browser_1.Browser.Version < 3;
        var isMacOSMobileVerLess51 = browser_1.Browser.MacOSMobilePlatform && browser_1.Browser.Version < 5.1;
        return browser_1.Browser.AndroidDefaultBrowser || browser_1.Browser.AndroidChromeBrowser || !(isSafariVerLess3 || isMacOSMobileVerLess51);
    };
    EvtUtils.getEventX = function (evt) {
        if (touch.TouchUtils.isTouchEvent(evt))
            return touch.TouchUtils.getEventX(evt);
        return evt.clientX + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom.DomUtils.getDocumentScrollLeft() : 0);
    };
    EvtUtils.getEventY = function (evt) {
        if (touch.TouchUtils.isTouchEvent(evt))
            return touch.TouchUtils.getEventY(evt);
        return evt.clientY + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom.DomUtils.getDocumentScrollTop() : 0);
    };
    EvtUtils.cancelBubble = function (evt) {
        evt.cancelBubble = true;
    };
    EvtUtils.getWheelDelta = function (evt) {
        var ret;
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            ret = -evt.detail;
        else if (browser_1.Browser.Safari)
            ret = evt.wheelDelta;
        else
            ret = -evt.deltaY;
        if (browser_1.Browser.Opera && browser_1.Browser.Version < 9)
            ret = -ret;
        return ret;
    };
    return EvtUtils;
}());
exports.EvtUtils = EvtUtils;
});

/*@__PURE__*/getDefaultExportFromCjs(evt);

export { evt as e };
//# sourceMappingURL=evt-24.2.js.map
