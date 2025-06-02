import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './_commonjsHelpers-24.2.js';
import { b as browser_1 } from './string-24.2.js';
import { c as common_1 } from './dom-24.2.js';

var touch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchUtils = void 0;


var TouchUtils = (function () {
    function TouchUtils() {
    }
    TouchUtils.onEventAttachingToDocument = function (eventName, func) {
        if (browser_1.Browser.MacOSMobilePlatform && TouchUtils.isTouchEventName(eventName)) {
            if (!TouchUtils.documentTouchHandlers[eventName])
                TouchUtils.documentTouchHandlers[eventName] = [];
            TouchUtils.documentTouchHandlers[eventName].push(func);
            return TouchUtils.documentEventAttachingAllowed;
        }
        return true;
    };
    TouchUtils.isTouchEventName = function (eventName) {
        return browser_1.Browser.WebKitTouchUI && (eventName.indexOf('touch') > -1 || eventName.indexOf('gesture') > -1);
    };
    TouchUtils.isTouchEvent = function (evt) {
        return browser_1.Browser.WebKitTouchUI && common_1.isDefined(evt.changedTouches);
    };
    TouchUtils.getEventX = function (evt) {
        return browser_1.Browser.IE ? evt.pageX : evt.changedTouches[0].pageX;
    };
    TouchUtils.getEventY = function (evt) {
        return browser_1.Browser.IE ? evt.pageY : evt.changedTouches[0].pageY;
    };
    TouchUtils.touchMouseDownEventName = browser_1.Browser.WebKitTouchUI ? 'touchstart' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerdown' : 'mousedown');
    TouchUtils.touchMouseUpEventName = browser_1.Browser.WebKitTouchUI ? 'touchend' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerup' : 'mouseup');
    TouchUtils.touchMouseMoveEventName = browser_1.Browser.WebKitTouchUI ? 'touchmove' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointermove' : 'mousemove');
    TouchUtils.msTouchDraggableClassName = 'dxMSTouchDraggable';
    TouchUtils.documentTouchHandlers = {};
    TouchUtils.documentEventAttachingAllowed = true;
    return TouchUtils;
}());
exports.TouchUtils = TouchUtils;
});

/*@__PURE__*/getDefaultExportFromCjs(touch);

export { touch as t };
//# sourceMappingURL=touch-24.2.js.map
