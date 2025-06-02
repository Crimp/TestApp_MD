import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './utils-24.2.js';
import './single-slot-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './property-24.2.js';
import './events-24.2.js';

const dxMapTag = "dxbl-map";
class MapClickEvent extends CustomEvent {
    constructor(lat, lng) {
        super(MapClickEvent.eventName, {
            detail: new MapClickEventContext(lat, lng),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MapClickEvent.eventName = dxMapTag + ".click";
class MapMarkerClickEvent extends CustomEvent {
    constructor(key) {
        super(MapMarkerClickEvent.eventName, {
            detail: new MapMarkerClickEventContext(key),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
MapMarkerClickEvent.eventName = dxMapTag + ".marker-click";
class MapClickEventContext {
    constructor(lat, lng) {
        this.Latitude = lat;
        this.Longitude = lng;
    }
}
class MapMarkerClickEventContext {
    constructor(key) {
        this.Key = key;
    }
}
CustomEventsHelper.register(MapClickEvent.eventName, x => x.detail);
CustomEventsHelper.register(MapMarkerClickEvent.eventName, x => x.detail);

var _a;
var _b;
// temporary fix console error from bing map
(_a = (_b = window)["sj_evt"]) !== null && _a !== void 0 ? _a : (_b["sj_evt"] = { fire: () => { }, bind: () => { } });
const markersKey = "markers";
const markerIdKey = "markerId";
const onClickKey = "onClick";
let DxMap = class DxMap extends DevExtremeWidgetWrapper {
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onClick: (e) => this.onMapClick(e),
            onReady: (e) => this.onMapReady(e),
            onOptionChanged: (e) => this.onMapOptionChanged(e)
        };
    }
    getWidgetModuleName() { return "ui"; }
    getWidgetTypeName() { return "dxMap"; }
    disposeWidget(widget) {
        var _a;
        (_a = widget === null || widget === void 0 ? void 0 : widget._lastAsyncAction) === null || _a === void 0 ? void 0 : _a.catch(_ => { });
        super.disposeWidget(widget);
    }
    createWidgetDefaultOptions() {
        return {
            height: "100%",
            width: "100%"
        };
    }
    processSpecialOptions(_options) {
        super.processSpecialOptions(_options);
        this.preapreMarkerClickHandlers(_options[markersKey]);
    }
    onMapClick(e) {
        const lat = e.location.lat;
        const lng = e.location.lng;
        this.dispatchEvent(new MapClickEvent(lat, lng));
    }
    onMapReady(_) {
        this.changeLoadingPanelVisibility(false);
    }
    onMapOptionChanged(_) {
        this.changeLoadingPanelVisibility(false);
    }
    preapreMarkerClickHandlers(markers) {
        markers === null || markers === void 0 ? void 0 : markers.forEach(m => {
            if (m[markerIdKey]) {
                const key = m[markerIdKey];
                m[onClickKey] = () => { this.onMarkerClick(key); };
                delete m[markerIdKey];
            }
        });
    }
    onMarkerClick(key) {
        this.dispatchEvent(new MapMarkerClickEvent(key));
    }
};
DxMap = __decorate([
    e("dxbl-map")
], DxMap);

export { DxMap };
//# sourceMappingURL=dx-map-24.2.js.map
