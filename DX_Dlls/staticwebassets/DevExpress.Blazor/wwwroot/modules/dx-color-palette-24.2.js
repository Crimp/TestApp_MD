import { u as colorPaletteTagName } from './constants-24.23.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { k as key } from './key-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import './focushelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './devices-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './property-24.2.js';

var _a;
class ColorPaletteConstants {
}
_a = ColorPaletteConstants;
ColorPaletteConstants.DefaultCssClass = CssClasses.Prefix + "-color-palette";
ColorPaletteConstants.SelectedTileCssClass = _a.DefaultCssClass + "-selected-tile";
ColorPaletteConstants.NoColorContainerCssClass = _a.DefaultCssClass + "-no-color-container";
ColorPaletteConstants.ColorValueAttribute = "color-value";

var ColorPaletteElementType;
(function (ColorPaletteElementType) {
    ColorPaletteElementType[ColorPaletteElementType["Undefined"] = 0] = "Undefined";
    ColorPaletteElementType[ColorPaletteElementType["ColorTile"] = 1] = "ColorTile";
    ColorPaletteElementType[ColorPaletteElementType["NoColorTile"] = 2] = "NoColorTile";
})(ColorPaletteElementType || (ColorPaletteElementType = {}));
var ColorPaletteSelectType;
(function (ColorPaletteSelectType) {
    ColorPaletteSelectType[ColorPaletteSelectType["First"] = 0] = "First";
    ColorPaletteSelectType[ColorPaletteSelectType["LastSelected"] = 1] = "LastSelected";
    ColorPaletteSelectType[ColorPaletteSelectType["Last"] = 2] = "Last";
})(ColorPaletteSelectType || (ColorPaletteSelectType = {}));

class ColorPaletteKbdStrategyBase extends KeyboardNavigationStrategy {
    constructor(navigator, rootStrategy, targetElement) {
        super(navigator, targetElement);
        this.rootStrategy = rootStrategy;
    }
    getItemStrategy(index) {
        return super.getItemStrategy(index);
    }
    getSelectedItemStrategy() {
        return super.getSelectedItemStrategy();
    }
    getShortcutContext() {
        return {
            ElementType: this.getElementType(),
            Value: this.getElementValue()
        };
    }
    selectItem(index) {
        this.resetFocusableState();
        super.selectItem(index);
    }
    resetFocusableState() {
        const element = this.findLastSelectedStrategy().selectedItemElement;
        if (element)
            FocusUtils.removeTabIndex(element);
    }
    getElementType() {
        return ColorPaletteElementType.Undefined;
    }
    getElementValue() {
        return null;
    }
    move(forward, vertical, loop = true) {
        const nextIndex = this.selectedItemIndex + (forward ? 1 : -1);
        if (!this.isIndexWithinBoundaries(nextIndex))
            return false;
        if (loop) {
            const nextStrategy = this.getItemStrategy(nextIndex);
            if (!nextStrategy || !this.canMove(nextStrategy, forward, vertical))
                return false;
            this.setSelectedItemIndex(nextStrategy, forward, vertical);
        }
        if (forward)
            this.moveToNextItem();
        else
            this.moveToPrevItem();
        return true;
    }
    canMove(strategy, forward, vertical) {
        return true;
    }
}

class ColorPaletteNoColorKbdStrategy extends ColorPaletteKbdStrategyBase {
    constructor(navigator, rootStrategy, targetElement) {
        super(navigator, rootStrategy, targetElement);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
            case key.KeyCode.Right:
                return true;
            case key.KeyCode.Enter:
            case key.KeyCode.Space:
                this.performShortcutEvent(evt);
                return true;
        }
        return super.handleKeyDown(evt);
    }
    setSelectedItemIndex(strategy, forward, vertical) { }
    getElementType() {
        return ColorPaletteElementType.NoColorTile;
    }
}

class ColorPaletteRowKbdStrategy extends ColorPaletteKbdStrategyBase {
    constructor(navigator, rootStrategy, targetElement) {
        super(navigator, rootStrategy, targetElement);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                return this.move(false, false, false);
            case key.KeyCode.Right:
                return this.move(true, false, false);
            case key.KeyCode.Home:
                this.moveToFirstItem();
                return true;
            case key.KeyCode.End:
                this.moveToLastItem();
                return true;
            case (key.KeyCode.Enter):
            case (key.KeyCode.Space):
                this.performShortcutEvent(evt);
                return true;
        }
        return super.handleKeyDown(evt);
    }
    focusSelectedItem() {
        var _a;
        super.focusSelectedItem();
        (_a = this.rootStrategy) === null || _a === void 0 ? void 0 : _a.setLastColumnIndex(this.selectedItemIndex);
    }
    setRowSelectedItemIndex(x) {
        var _a, _b;
        switch (x) {
            case ColorPaletteSelectType.First:
                this.selectedItemIndex = 0;
                break;
            case ColorPaletteSelectType.LastSelected:
                this.selectedItemIndex = (_b = (_a = this.rootStrategy) === null || _a === void 0 ? void 0 : _a.getLastColumnIndex()) !== null && _b !== void 0 ? _b : 0;
                break;
            case ColorPaletteSelectType.Last:
                this.selectedItemIndex = this.itemCount - 1;
                break;
        }
    }
    findAndSetRowSelectedTile() {
        for (let i = 0; i < this.itemCount; i++) {
            const item = this.getItem(i);
            if (item && item.classList.contains(ColorPaletteConstants.SelectedTileCssClass)) {
                this.selectedItemIndex = i;
                return true;
            }
        }
        return false;
    }
    queryItems() {
        return this.queryItemsBySelector("td > div");
    }
    getElementType() {
        return ColorPaletteElementType.ColorTile;
    }
    getElementValue() {
        return this.selectedItemElement.getAttribute(ColorPaletteConstants.ColorValueAttribute);
    }
    setSelectedItemIndex(strategy, forward, vertical) { }
}

class ColorPaletteKbdStrategyUtils {
    static isGroupStrategy(strategy) {
        return strategy instanceof ColorPaletteGroupKbdStrategy;
    }
    static isRowStrategy(strategy) {
        return strategy instanceof ColorPaletteRowKbdStrategy;
    }
    static isButtonStrategy(strategy) {
        return strategy instanceof ColorPaletteNoColorKbdStrategy;
    }
}

class ColorPaletteGroupKbdStrategy extends ColorPaletteKbdStrategyBase {
    constructor(navigator, rootStrategy, targetElement) {
        super(navigator, rootStrategy, targetElement);
    }
    queryItems() {
        return this.queryItemsBySelector("tbody > tr");
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches("tr"))
            return new ColorPaletteRowKbdStrategy(this.navigator, this.rootStrategy, itemElement);
        throw new Error("Color palete kbd strategy not implemented ");
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                return this.move(false, false);
            case key.KeyCode.Up:
                return this.move(false, true);
            case key.KeyCode.Right:
                return this.move(true, false);
            case key.KeyCode.Down:
                return this.move(true, true);
        }
        return super.handleKeyDown(evt);
    }
    getShortcutContext() {
        return {};
    }
    setGroupSelectedItemIndex(x, y) {
        this.selectedItemIndex = y === ColorPaletteSelectType.First ? 0 : this.itemCount - 1;
        const strategy = this.getItemStrategy(this.selectedItemIndex);
        if (ColorPaletteKbdStrategyUtils.isRowStrategy(strategy))
            strategy.setRowSelectedItemIndex(x);
    }
    findAndSetGroupSelectedTile() {
        for (let i = 0; i < this.itemCount; i++) {
            const strategy = this.getItemStrategy(i);
            if (ColorPaletteKbdStrategyUtils.isRowStrategy(strategy) && strategy.findAndSetRowSelectedTile()) {
                this.selectedItemIndex = i;
                return;
            }
        }
    }
    setSelectedItemIndex(strategy, forward, vertical) {
        if (ColorPaletteKbdStrategyUtils.isRowStrategy(strategy)) {
            if (vertical)
                strategy.setRowSelectedItemIndex(ColorPaletteSelectType.LastSelected);
            else
                strategy.setRowSelectedItemIndex(forward ? ColorPaletteSelectType.First : ColorPaletteSelectType.Last);
        }
    }
}

class ColorPaletteRootKbdStrategy extends ColorPaletteKbdStrategyBase {
    constructor(navigator, colorPalette) {
        super(navigator, null, colorPalette);
        this.lastColumnIndex = 0;
    }
    queryItems() {
        return new Array(...this.queryItemsBySelector("& > table"), ...this.queryItemsBySelector(`& > div.${ColorPaletteConstants.NoColorContainerCssClass}`));
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches("table"))
            return new ColorPaletteGroupKbdStrategy(this.navigator, this, itemElement);
        if (itemElement.matches(`div.${ColorPaletteConstants.NoColorContainerCssClass}`))
            return new ColorPaletteNoColorKbdStrategy(this.navigator, this, itemElement);
        throw new Error("Color palete kbd strategy not implemented ");
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                return this.move(false, false);
            case key.KeyCode.Up:
                return this.move(false, true);
            case key.KeyCode.Right:
                return this.move(true, false);
            case key.KeyCode.Down:
                return this.move(true, true);
            case key.KeyCode.Tab:
                return this.handleTab(evt);
        }
        return super.handleKeyDown(evt);
    }
    getShortcutContext() {
        return {};
    }
    setLastColumnIndex(index) {
        this.lastColumnIndex = index;
    }
    getLastColumnIndex() {
        return this.lastColumnIndex;
    }
    setSelectedItemIndex(strategy, forward, vertical) {
        if (ColorPaletteKbdStrategyUtils.isGroupStrategy(strategy)) {
            if (forward) {
                if (vertical)
                    strategy.setGroupSelectedItemIndex(ColorPaletteSelectType.LastSelected, ColorPaletteSelectType.First);
                else
                    strategy.setGroupSelectedItemIndex(ColorPaletteSelectType.First, ColorPaletteSelectType.First);
            }
            else {
                if (vertical)
                    strategy.setGroupSelectedItemIndex(ColorPaletteSelectType.LastSelected, ColorPaletteSelectType.Last);
                else
                    strategy.setGroupSelectedItemIndex(ColorPaletteSelectType.Last, ColorPaletteSelectType.Last);
            }
        }
    }
    canMove(strategy, forward, vertical) {
        return !forward || vertical || !ColorPaletteKbdStrategyUtils.isButtonStrategy(strategy);
    }
    handleTab(evt) {
        const nextIndex = this.selectedItemIndex + (evt.shiftKey ? -1 : 1);
        if (this.isIndexWithinBoundaries(nextIndex)) {
            const nextStrategy = this.getItemStrategy(nextIndex);
            if (ColorPaletteKbdStrategyUtils.isGroupStrategy(nextStrategy))
                nextStrategy.findAndSetGroupSelectedTile();
            this.selectItem(nextIndex);
            return true;
        }
        if (evt.shiftKey) {
            this.leaveBackward();
            return true;
        }
        return super.handleKeyDown(evt);
    }
}

class DxColorPalette extends SingleSlotElementBase {
    constructor() {
        super();
    }
    contentChanged() {
        super.contentChanged();
        this.initializeKeyboardNavigator();
    }
    disconnectedCallback() {
        delete this.keyboardNavigator;
        super.disconnectedCallback();
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, new ColorPaletteRootKbdStrategy(this.getKeyboardNavigator(), this));
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
}
customElements.define(colorPaletteTagName, DxColorPalette);
function loadModule() { }
const dxColorPalette = { loadModule };

export { DxColorPalette, dxColorPalette as default };
//# sourceMappingURL=dx-color-palette-24.2.js.map
