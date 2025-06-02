import { e as evt } from './evt-24.2.js';
import { t as touch } from './touch-24.2.js';
import { k as customColorAreaTagName, l as hueAreaTagName, n as saturationBrightnessAreaTagName } from './constants-24.23.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { d as disposeEvents, r as registerDisposableEvents } from './disposable-24.2.js';
import { L as prepareClientPosForElement } from './dom-utils-24.2.js';
import './_commonjsHelpers-24.2.js';
import './dom-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './data-qa-utils-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './dx-license-24.2.js';
import './css-classes-24.2.js';

class OnColorChangedEvent extends CustomEvent {
    constructor(red, green, blue) {
        super(OnColorChangedEvent.eventName, {
            detail: new OnColorChangedContext(red, green, blue),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
OnColorChangedEvent.eventName = customColorAreaTagName + ".oncolorchanged";
class OnColorChangedContext {
    constructor(red, green, blue) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
    }
}
CustomEventsHelper.register(OnColorChangedEvent.eventName, x => {
    return x.detail;
});

class ColorUtils {
    static rgbToHtml(rgb) {
        return "rgb(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ")";
    }
    static hsbToHtml(hsb) {
        return this.rgbToHtml(this.hsbToRgb(hsb));
    }
    static htmlToHsb(color) {
        return this.rgbToHsb(this.htmlToRgb(color));
    }
    static htmlToRgb(color) {
        color = color.replace("rgb", "").replace("(", "").replace(")", "");
        const splited = color.split(",").map(v => parseInt(v.trim()));
        return { red: splited[0], green: splited[1], blue: splited[2] };
    }
    static rgbToHsb(rgb) {
        const r = rgb.red / 255;
        const g = rgb.green / 255;
        const b = rgb.blue / 255;
        const M = Math.max(r, g, b);
        const m = Math.min(r, g, b);
        const C = M - m;
        let h;
        if (C === 0)
            h = 0;
        else if (M === r)
            h = ((g - b) / C) % 6;
        else if (M === g)
            h = (b - r) / C + 2;
        else
            h = (r - g) / C + 4;
        h *= 60;
        if (h < 0)
            h += 360;
        let v = M;
        let s;
        if (v === 0)
            s = 0;
        else
            s = C / v;
        s *= 100;
        v *= 100;
        return { hue: h, saturation: s, brightness: v };
    }
    static hsbToRgb(hsb) {
        const Hi = Math.floor(hsb.hue / 60);
        const Bmin = (ColorUtils.maxHsb.saturation - hsb.saturation) * hsb.brightness / ColorUtils.maxHsb.brightness;
        const a = (hsb.brightness - Bmin) * (hsb.hue % 60) / 60;
        const Binc = Bmin + a;
        const Bdec = hsb.brightness - a;
        let rgb = { red: 0, green: 0, blue: 0 };
        switch (Hi) {
            case 0:
                rgb = { red: hsb.brightness, green: Binc, blue: Bmin };
                break;
            case 1:
                rgb = { red: Bdec, green: hsb.brightness, blue: Bmin };
                break;
            case 2:
                rgb = { red: Bmin, green: hsb.brightness, blue: Binc };
                break;
            case 3:
                rgb = { red: Bmin, green: Bdec, blue: hsb.brightness };
                break;
            case 4:
                rgb = { red: Binc, green: Bmin, blue: hsb.brightness };
                break;
            case 5:
                rgb = { red: hsb.brightness, green: Bmin, blue: Bdec };
                break;
        }
        rgb.red = Math.round(rgb.red * 2.55);
        rgb.green = Math.round(rgb.green * 2.55);
        rgb.blue = Math.round(rgb.blue * 2.55);
        return rgb;
    }
}
ColorUtils.maxHsb = { hue: 359, saturation: 100, brightness: 100 };

class ColorEditCssClasses {
}
ColorEditCssClasses.Prefix = "dx-blazor-colorpicker";
ColorEditCssClasses.HueAreaIndicator = ColorEditCssClasses.Prefix + "-hue-selection-rect";
ColorEditCssClasses.SaturationBrightnessAreaIndicator = ColorEditCssClasses.Prefix + "-color-selection";
class ColorEditAttributes {
}
ColorEditAttributes.ColorAttribute = "data-color";

class DxColorAreaBase extends DxHTMLElementBase {
    constructor() {
        super();
        this._onColorChanged = null;
        this.indicator = this.querySelector(this.getIndicatorCssCelector());
        this._containerSize = { width: this.offsetWidth, height: this.offsetHeight };
        this._indicatorSize = { width: this.indicator.offsetWidth, height: this.indicator.offsetHeight };
    }
    // sizes
    getIndicatorHeight() { return this._indicatorSize.height; }
    getIndicatorWidth() { return this._indicatorSize.width; }
    getContainerHeight() { return this._containerSize.height; }
    getContainerWidth() { return this._containerSize.width; }
    connectedCallback() {
        super.connectedCallback();
        this.initializeEvents();
    }
    disposeComponent() {
        disposeEvents(this);
        super.disposeComponent();
    }
    setColorChangedCallback(onColorChanged) {
        this._onColorChanged = onColorChanged;
    }
    raiseColorChanged(color) {
        if (this._onColorChanged == null)
            return;
        this._onColorChanged(color);
    }
    initializeEvents() {
        const onMouseDown = (e) => {
            if (touch.TouchUtils.isTouchEvent(e))
                e.preventDefault();
            this.addEventListener(touch.TouchUtils.touchMouseUpEventName, onMouseUp);
            this.addEventListener(touch.TouchUtils.touchMouseMoveEventName, onMouseMove);
            this.moveIndicator(e);
        };
        const onMouseUp = (_) => {
            this.removeEventListener(touch.TouchUtils.touchMouseUpEventName, onMouseUp);
            this.removeEventListener(touch.TouchUtils.touchMouseMoveEventName, onMouseMove);
        };
        const onMouseMove = (e) => {
            if (touch.TouchUtils.isTouchEvent(e))
                e.preventDefault();
            if (evt.EvtUtils.isLeftButtonPressed(e))
                this.moveIndicator(e);
        };
        this.addEventListener(touch.TouchUtils.touchMouseDownEventName, onMouseDown);
        registerDisposableEvents(this, () => {
            this.removeEventListener(touch.TouchUtils.touchMouseDownEventName, onMouseDown);
            this.removeEventListener(touch.TouchUtils.touchMouseUpEventName, onMouseUp);
            this.removeEventListener(touch.TouchUtils.touchMouseMoveEventName, onMouseMove);
        });
    }
    updateBackground(_) { }
}
class DxHueArea extends DxColorAreaBase {
    getIndicatorCssCelector() { return `.${ColorEditCssClasses.HueAreaIndicator}`; }
    moveIndicator(e) {
        let y = prepareClientPosForElement(evt.EvtUtils.getEventY(e), this.indicator, false);
        y = Math.min(this.getContainerHeight() - Math.round(this.getIndicatorHeight() / 2), Math.max(0 - this.getIndicatorHeight() / 2, y));
        this.indicator.style.top = y + "px";
        const newColor = { hue: this.getHueValue(y), saturation: ColorUtils.maxHsb.saturation, brightness: ColorUtils.maxHsb.brightness };
        this.indicator.style.backgroundColor = ColorUtils.hsbToHtml(newColor);
        this.raiseColorChanged(newColor);
    }
    updateColor(color) {
        this.indicator.style.top = this.calculateHueIndicatorPosition(color.hue) + "px";
        this.indicator.style.backgroundColor = ColorUtils.hsbToHtml({ hue: color.hue, saturation: ColorUtils.maxHsb.saturation, brightness: ColorUtils.maxHsb.brightness });
    }
    calculateHueIndicatorPosition(hue) {
        const hueAreaHeight = this.getContainerHeight();
        const hueIndicatorHeight = this.getIndicatorHeight();
        let y = hueAreaHeight - hueAreaHeight * hue / ColorUtils.maxHsb.hue;
        const hueIndicatorOffset = Math.round(hueIndicatorHeight / 2);
        y = Math.min(hueAreaHeight - hueIndicatorOffset, Math.max(0 - hueIndicatorHeight / 2, y - hueIndicatorOffset));
        return Math.round(y);
    }
    getHueValue(y) {
        const correction = y < 0 ? this.getIndicatorHeight() / 2 : Math.round(this.getIndicatorHeight() / 2);
        y = y + correction;
        let hue = y * ColorUtils.maxHsb.hue / this.getContainerHeight();
        hue = ColorUtils.maxHsb.hue - hue;
        return Math.round(hue);
    }
}
class DxSaturationBrightnessArea extends DxColorAreaBase {
    getIndicatorCssCelector() { return `.${ColorEditCssClasses.SaturationBrightnessAreaIndicator}`; }
    moveIndicator(e) {
        let x = prepareClientPosForElement(evt.EvtUtils.getEventX(e), this.indicator, true);
        let y = prepareClientPosForElement(evt.EvtUtils.getEventY(e), this.indicator, false);
        x = Math.min(this.getContainerWidth(), Math.max(0, x)) - this.getIndicatorWidth() / 2;
        y = Math.min(this.getContainerHeight(), Math.max(0, y)) - this.getIndicatorHeight() / 2;
        this.indicator.style.top = y + "px";
        this.indicator.style.left = x + "px";
        const newColor = { hue: ColorUtils.maxHsb.hue, saturation: this.getSaturationValue(x), brightness: this.getBrightnessValue(y) };
        this.raiseColorChanged(newColor);
    }
    updateColor(color) {
        this.setIndicatorPosition(color);
        this.updateBackground(color);
    }
    updateBackground(color) {
        this.style.backgroundColor = ColorUtils.hsbToHtml({
            hue: color.hue,
            saturation: ColorUtils.maxHsb.saturation,
            brightness: ColorUtils.maxHsb.brightness
        });
        this.indicator.style.backgroundColor = ColorUtils.hsbToHtml(color);
    }
    setIndicatorPosition(color) {
        this.indicator.style.left = this.convertSaturationToXCoordinate(color.saturation) + "px";
        this.indicator.style.top = this.convertBrightnessToYCoordinate(color.brightness) + "px";
    }
    convertSaturationToXCoordinate(saturation) {
        const x = this.getContainerWidth() * saturation / ColorUtils.maxHsb.saturation - this.getIndicatorWidth() / 2;
        return Math.floor(x);
    }
    convertBrightnessToYCoordinate(brightness) {
        const colorAreaHeight = this.getContainerHeight();
        const y = colorAreaHeight - colorAreaHeight * brightness / ColorUtils.maxHsb.brightness - this.getIndicatorHeight() / 2;
        return Math.floor(y);
    }
    getSaturationValue(x) {
        const saturation = (x + this.getIndicatorWidth() / 2) * ColorUtils.maxHsb.saturation / this.getContainerWidth();
        return Math.floor(saturation);
    }
    getBrightnessValue(y) {
        const brightness = ColorUtils.maxHsb.brightness - (y + this.getIndicatorHeight() / 2) * ColorUtils.maxHsb.brightness / this.getContainerHeight();
        return Math.floor(brightness);
    }
}
class DxCustomColorArea extends DxHTMLElementBase {
    constructor() {
        super(...arguments);
        this._hueArea = null;
        this._colorArea = null;
        this._color = ColorUtils.maxHsb;
    }
    initializeComponent() {
        this._hueArea = this.querySelector(hueAreaTagName);
        this._colorArea = this.querySelector(saturationBrightnessAreaTagName);
        if (!this._hueArea || !this._colorArea)
            throw new Error("ColorAreas elements not found");
        this.setupHueArea();
        this.setupSaturationBrightnessArea();
        this.setupColorValue();
    }
    setupHueArea() {
        var _a;
        const onHueChanged = (color) => {
            this._color.hue = color.hue;
            if (this._colorArea == null)
                return;
            this._colorArea.updateBackground(this._color);
            const rgbColor = ColorUtils.hsbToRgb(this._color);
            this.raiseOnColorChanged(rgbColor.red, rgbColor.green, rgbColor.blue);
        };
        (_a = this._hueArea) === null || _a === void 0 ? void 0 : _a.setColorChangedCallback(onHueChanged);
    }
    setupSaturationBrightnessArea() {
        var _a;
        const onSaturationBrightnessChanged = (color) => {
            this._color.saturation = color.saturation;
            this._color.brightness = color.brightness;
            const rgbColor = ColorUtils.hsbToRgb(this._color);
            if (this._colorArea == null)
                return;
            this._colorArea.indicator.style.backgroundColor = ColorUtils.rgbToHtml(rgbColor);
            this.raiseOnColorChanged(rgbColor.red, rgbColor.green, rgbColor.blue);
        };
        (_a = this._colorArea) === null || _a === void 0 ? void 0 : _a.setColorChangedCallback(onSaturationBrightnessChanged);
    }
    setupColorValue() {
        const attr = this.getAttribute(ColorEditAttributes.ColorAttribute);
        if (attr == null)
            return;
        const color = ColorUtils.htmlToHsb(attr);
        this.updateColor(color);
    }
    updateColor(color) {
        var _a, _b;
        this._color = color;
        (_a = this._hueArea) === null || _a === void 0 ? void 0 : _a.updateColor(color);
        (_b = this._colorArea) === null || _b === void 0 ? void 0 : _b.updateColor(color);
    }
    raiseOnColorChanged(red, green, blue) {
        this.dispatchEvent(new OnColorChangedEvent(red, green, blue));
    }
}
customElements.define(customColorAreaTagName, DxCustomColorArea);
customElements.define(hueAreaTagName, DxHueArea);
customElements.define(saturationBrightnessAreaTagName, DxSaturationBrightnessArea);
function loadModule() { }
const customColorArea = { loadModule };

export { DxCustomColorArea, customColorArea as default };
//# sourceMappingURL=custom-color-area-24.2.js.map
