import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { J as calculateStyles, d as subscribeElementContentSize, u as unsubscribeElement, x as findParentBySelector, K as getElementOffsetWidth, k as getLeftRightMargins, i as isRemovedFromDOM, R as RequestAnimationFrame, e as ensureElement } from './dom-utils-24.2.js';
import { d as disposeEvents } from './disposable-24.2.js';
import { b as PointerEventHelper } from './dx-html-element-pointer-events-helper-24.2.js';
import { D as DxDropDownOwner } from './dx-dropdown-owner-24.2.js';
import { T as ToolbarCssClasses } from './toolbar-css-classes-24.2.js';
import { S as Subject } from './observables-24.2.js';
import { B as ButtonCssClasses } from './constants-24.25.js';
import { G as GlobalConstants } from './const-24.2.js';
import { i as comboBoxTagName, j as comboBox2TagName } from './constants-24.23.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { b as ToolbarItemResizedEvent, c as ToolbarItemUpdateEvent, d as ToolbarItemVisibilityChangedEvent, e as ToolbarItemOrderedEvent, a as ToolbarUpdateEvent } from './events-24.23.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { D as DxToolbarRootKeyboardStrategy, R as RibbonCssClasses } from './constants-24.26.js';
import { t } from './state-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './popup-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './custom-events-helper-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './focus-utils-24.2.js';
import './menu-keyboard-strategy-24.2.js';
import './constants-24.24.js';
import './modal-keyboard-strategy-24.2.js';
import './dropdown-menu-keyboard-strategy-24.2.js';

class Block {
    constructor(toolbarModel, id) {
        this.toolbarModel = toolbarModel;
        this.id = id;
        this.state = "";
        this._isWidthCalculationLocked = false;
        this.index = -1;
        this.adaptivePriority = 0;
        this._width = 0; // TODO: check whether this field it required?
    }
    getWidth() { return this.isVisible() ? getNodeWidth(this.getElement(), false, globalSkipParentMargin) : 0; }
    getNoTextWidth() { return this.getWidth(); }
    isVisible() { return true; }
    get isWidthCalculationLocked() {
        return this._isWidthCalculationLocked;
    }
    updateState(s) {
        this.state = s;
        this.updateStateCore(s);
    }
    updateStateCore(_state) { }
    lockWidthCalculation() { this._isWidthCalculationLocked = true; }
    unlockWidthCalculation() { this._isWidthCalculationLocked = false; }
    getGroupElement() {
        return null;
    }
    reset() {
    }
}
class ItemBlockBase extends Block {
    constructor(toolbar, item) {
        var _a, _b, _c, _d, _e;
        super(toolbar, (_c = (_b = (_a = item.element) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : item.id) !== null && _c !== void 0 ? _c : "-1");
        this.item = item;
        this.adaptivePriority = (_e = (_d = item === null || item === void 0 ? void 0 : item.adaptivePriority) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : 0;
    }
    getElement() { return this.item.getElement(); }
    updateStateCore(state) {
        this.item.isDisplayed.update(state.indexOf("has-" + this.getName()) > -1);
    }
    updateVisible(v) {
        if (!v)
            this.lockWidthCalculation();
        this.item.updateVisible(v);
        if (v)
            this.unlockWidthCalculation();
    }
    reset() {
        const element = this.getElement();
        if (element)
            element.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
    }
}
class ItemBlock extends ItemBlockBase {
    constructor(toolbar, item) {
        super(toolbar, item);
    }
    getNoTextWidth() { return this.item.isDisplayed.value ? getItemWithoutTextWidth(this.getElement()) : 0; }
    getName() { return "item"; }
    isVisible() { return this.item.isDisplayed.value; }
    updateStateCore(state) {
        const toolbarViewModel = this.item.toolbar;
        const hasEllipsis = state.indexOf(ToolbarCssClasses.ToolbarHasEllipsis) === -1;
        if (toolbarViewModel.minRootItems > 0)
            this.updateVisible(hasEllipsis || this.index < toolbarViewModel.minRootItems);
        else
            this.updateVisible(hasEllipsis);
    }
    getGroupElement() {
        return this.item.getGroupElement();
    }
}
class EllipsisBtnBlock extends ItemBlockBase {
    constructor(toolbar, item) {
        super(toolbar, item);
    }
    getName() { return "ellipsis"; }
    updateStateCore(state) {
        super.updateStateCore(state);
        this.updateVisible(this.item.isDisplayed.value);
    }
    reset() {
        this.updateVisible(true);
    }
}
class GroupBlock extends ItemBlock {
    constructor(toolbar, item) {
        super(toolbar, item);
        this.itemBlocks = [];
        this.addItem(item);
    }
    addItem(item) { this.itemBlocks.push(new ItemBlock(this.toolbarModel, item)); }
    isVisible() {
        const visibleBlocks = this.itemBlocks.reduce(function (r, b) { return r && b.isVisible(); }, true);
        return visibleBlocks;
    }
    getWidth() { return this.itemBlocks.reduce(function (r, b) { return r + b.getWidth(); }, 0); }
    getNoTextWidth() { return this.itemBlocks.reduce(function (r, b) { return r + b.getNoTextWidth(); }, 0); }
    updateVisible(visible) { this.itemBlocks.forEach(function (b) { b.updateVisible(visible); }); }
    tryAddItem(item) {
        const prev = this.itemBlocks[this.itemBlocks.length - 1].item;
        const success = prev.groupName === item.groupName && prev.group === item.group && prev.adaptivePriority.value === item.adaptivePriority.value;
        if (success)
            this.addItem(item);
        return success;
    }
}
class TitleBlock extends Block {
    constructor(toolbar, item, id) {
        super(toolbar, id);
        this.item = item;
    }
    getName() { return "title"; }
    getWidth() { return getNodeWidth(this.getElement(), false, globalSkipParentMargin); }
    getElement() { return this.item.getElement(); }
}
class Collection {
    constructor(items) {
        this.items = [];
        this.isLocked = false;
        this.subscriptions = [];
        if (items)
            this.addRange(items);
    }
    // eslint-disable-next-line
    subscribe(subscription) {
        if (!this.isLocked)
            subscription(this.getChanges(this.items, []));
        this.subscriptions.push(subscription);
    }
    getChanges(addedItems, removedItems) {
        return { addedItems: addedItems || [], removedItems: removedItems || [] };
    }
    // eslint-disable-next-line
    forEach(action, thisArg) { this.items.forEach(action, thisArg); }
    // eslint-disable-next-line
    selectMany(s, thisArg) {
        return this.map(s, thisArg).reduce(function (r, i) { return r.concat(i); }, []);
    }
    reduce(f, v) { return this.items.reduce(f, v); }
    // eslint-disable-next-line
    map(f, thisArg) { return this.items.map(f, thisArg); }
    // eslint-disable-next-line
    filter(f, thisArg) { return this.items.filter(f, thisArg); }
    any() { return this.count() > 0; }
    count() { return this.items.length; }
    get(index) { return this.items[index]; }
    add(item) {
        if (this.addItemCore(item))
            this.raiseChanges([item], []);
    }
    remove(item) {
        if (this.removeItemCore(item))
            this.raiseChanges([], [item]);
    }
    addRange(items) {
        this.raiseChanges(items.map(this.addItemCore.bind(this)).filter(function (i) { return !!i; }), []);
    }
    removeRange(items) { this.raiseChanges([], items.map(this.removeItemCore.bind(this)).filter(function (i) { return !!i; })); }
    addItemCore(item) { return this.items.indexOf(item) > -1 ? null : (this.items[this.items.length] = item); }
    removeItemCore(item) {
        const index = this.items.indexOf(item);
        return index === -1 ? null : this.items.splice(index, 1)[0];
    }
    raiseChanges(addedItems, removedItems) {
        const changes = this.getChanges(addedItems, removedItems);
        if (changes.addedItems.length > 0 || changes.removedItems.length > 0)
            this.subscriptions.forEach(function (s) { s(changes); });
    }
    lock() { this.isLocked = true; }
    unlock() { this.isLocked = false; }
}
class BlockCollection {
    // eslint-disable-next-line
    constructor(id) {
        this.id = id;
        this._margins = undefined;
        this.blocks = [];
    }
    push(block) {
        if (!this.blocks.includes(block))
            this.blocks.push(block);
        this.update();
    }
    toArray() {
        return Array.from(this.blocks);
    }
    get margins() {
        return this._margins || 0;
    }
    update() {
        if (!this._margins) {
            if (this.blocks.length) {
                const groupElement = this.blocks[0].getGroupElement();
                if (groupElement) {
                    const parentStyle = dom.DomUtils.getCurrentStyle(groupElement);
                    this._margins = dom.DomUtils.pxToInt(parentStyle.marginRight) + dom.DomUtils.pxToInt(parentStyle.marginLeft);
                }
            }
        }
    }
}

class LayoutBlock {
    constructor(layer, block, blockUpdater) {
        var _a;
        this.layer = layer;
        this.block = block;
        this.width = 0;
        this._blockCollection = undefined;
        const id = block.getGroupElement();
        if (id) {
            this._blockCollection = this.layer.getBlockCollection(id);
            (_a = this._blockCollection) === null || _a === void 0 ? void 0 : _a.push(block);
        }
        blockUpdater.subscribe(block, (w, isInit = false) => {
            var _a;
            if (w === null)
                w = (_a = this.layer.getPrevLayer()) === null || _a === void 0 ? void 0 : _a.getActualBlocks().filter(function (lb) { return lb.block === block; })[0].width;
            if (w !== this.width) {
                this.width = w !== null && w !== void 0 ? w : 0;
                if (!isInit)
                    this.layer.requestUpdateLayoutModel();
            }
        });
    }
    get blockCollection() {
        return this._blockCollection || new BlockCollection(null);
    }
    getMinWidth() { return this.width; }
    getMaxWidth(_layer) { return this.getMinWidth(); }
}
class LayoutDynamicBlock extends LayoutBlock {
    getPrevLayerMinWidth() {
        const prev = this.layer.getPrevLayer();
        return prev ? prev.getActualBlocks().filter((lb) => { return lb.block === this.block; })[0].getMinWidth() : 0;
    }
    getMaxWidth(layer) {
        return layer === this.layer ?
            this.getPrevLayerMinWidth() :
            this.getMinWidth();
    }
}
class LayoutStaticBlock extends LayoutBlock {
}
class LayoutDefaultBlock extends LayoutBlock {
}
class LayoutBlockUpdater {
    // eslint-disable-next-line
    constructor(widthCalculator, triggersResolver) {
        this.widthCalculator = widthCalculator;
        this.triggersResolver = triggersResolver;
        this.widthSubscriber = null;
        this.widthCalculator = widthCalculator;
        this.triggersResolver = triggersResolver;
    }
    subscribe(block, widthSubscriber) {
        this.widthSubscriber = widthSubscriber;
        const boundWidthCalculator = this.widthCalculator.bind(this);
        function subscribeToRefreshTrigger(trigger) {
            trigger.subscribe(function () {
                if (!block.isWidthCalculationLocked)
                    calculateStyles(function () { widthSubscriber(boundWidthCalculator(block), false); });
            }, true);
        }
        this.triggersResolver(block).forEach(subscribeToRefreshTrigger);
        // subscribeToRefreshTrigger(block.getGlobalRefreshTrigger());
        calculateStyles(function () { widthSubscriber(boundWidthCalculator(block), true); });
    }
    updateWidth(block) {
        const widthSubscriber = this.widthSubscriber;
        const boundWidthCalculator = this.widthCalculator.bind(this);
        calculateStyles(function () {
            widthSubscriber(boundWidthCalculator(block), true);
        });
    }
}
// TODO: refactor this
let LayoutBlockUpdaters;
// eslint-disable-next-line
LayoutBlockUpdaters = {
    fullWidthItem: new LayoutBlockUpdater(function (b) {
        return b.getWidth();
    }, getItemSizeAffectingProperties),
    fullWidthSystemItem: new LayoutBlockUpdater(function (b) {
        return b.getWidth();
    }, getSystemItemSizeAffectingProperties),
    titleItem: new LayoutBlockUpdater(function (b) {
        return b.getWidth();
    }, function (b) {
        var _a, _b;
        return [(_a = b.toolbarModel.title) === null || _a === void 0 ? void 0 : _a.hasTitle, (_b = b.toolbarModel.title) === null || _b === void 0 ? void 0 : _b.text];
    }),
    noTextItem: new LayoutBlockUpdater(function (b) {
        return b.getNoTextWidth();
    }, getItemSizeAffectingProperties),
    contextItem: function (blocks) {
        return new LayoutBlockUpdater(function (b) {
            const prevVisibleItems = blocks.items.filter(function (i) {
                return i.getName() === "item" && i.index < b.index && i.isVisible();
            });
            return prevVisibleItems.length >= b.toolbarModel.minRootItems || !b.isVisible() ? 0 : null;
        }, getItemSizeAffectingProperties);
    },
    hiddenItem: new LayoutBlockUpdater(function () {
        return 0;
    }, function () {
        return [];
    })
};

class LayerRangeCalculator {
    getMin(blocks) {
        return blocks.map(x => x.minSize).reduce((pv, cv) => pv + cv);
    }
    getMax(blocks) {
        return blocks.map(x => x.fullSize).reduce((pv, cv) => pv + cv);
    }
}
class DefaultLayerRangeCalculator extends LayerRangeCalculator {
    getRange(blocks, margin, prevLayerBlocks) {
        return {
            min: this.getMin(blocks) + margin,
            max: this.getMax(blocks) + margin,
        };
    }
}
class SequentialLayerRangeCalculator extends LayerRangeCalculator {
    getRange(blocks, margin, prevLayerBlocks) {
        return {
            min: this.getMin(blocks),
            max: this.getMax(blocks) + margin,
        };
    }
}
class SimultaneousLayerRangeCalculator extends LayerRangeCalculator {
    constructor() {
        super(...arguments);
        this.prevLayerRangeCalculator = new SequentialLayerRangeCalculator();
    }
    // TODO: accurate this calculation - keep in mind getPrevLayerRangeMax calc
    getRange(blocks, margin, prevLayerBlocks = []) {
        return {
            min: this.getMin(blocks) + margin,
            max: this.getMax(prevLayerBlocks) + margin - 1
        };
    }
}

class VirtualLayer {
    constructor(name, canApply, blocks, margin) {
        this.name = name;
        this.canApply = canApply;
        this.blocks = blocks;
        this.margin = margin;
    }
    // TODO: probably pass ellipsisId and titleId (in the case of empty toolbar cannot recognize maxIndex)
    orderBlock(id, index) {
        const block = this.blocks.find(x => x.id === id);
        if (!block)
            throw new Error(`No block with id ${id} in layer with type: ${this.type}`);
        block.index = index;
        this.blocks.sort((a, b) => sortBlocks(a, b));
    }
    getBlock(id) {
        const block = this.blocks.find(x => x.id === id);
        if (!block)
            throw new Error(`No block with id ${id} in layer with type: ${this.type}`);
        return block;
    }
}
class DefaultVirtualLayer extends VirtualLayer {
    constructor() {
        super(...arguments);
        this.type = LayerType.Default;
    }
    // TODO: declare a common ancestor for this and NoTextVirtualLayer
    updateBlock(resizeModel, isInMinRooItems) {
        const block = this.getBlock(resizeModel.id);
        if (resizeModel.width === 0)
            return false;
        const isChanged = block.minWidth !== resizeModel.width ||
            block.maxWidth !== resizeModel.width;
        block.minWidth = resizeModel.width;
        block.maxWidth = resizeModel.width;
        return isChanged;
    }
}
class FullSequentialVirtualLayer extends VirtualLayer {
    constructor() {
        super(...arguments);
        this.type = LayerType.FullSequential;
    }
    // TODO: declare a common ancestor for this and NoTextSequentialVirtualLayer
    updateBlock(resizeModel, isInMinRooItems) {
        const block = this.getBlock(resizeModel.id);
        let isChanged = block.maxWidth !== resizeModel.width;
        block.maxWidth = resizeModel.width;
        if (block.minWidth) {
            isChanged = isChanged || block.minWidth !== resizeModel.width;
            block.minWidth = resizeModel.width;
        }
        if (!isInMinRooItems) {
            isChanged = isChanged || block.minWidth !== 0;
            block.minWidth = 0;
        }
        return isChanged;
    }
}
class NoTextVirtualLayer extends VirtualLayer {
    constructor() {
        super(...arguments);
        this.type = LayerType.NoText;
    }
    updateBlock(resizeModel, isInMinRooItems) {
        const block = this.getBlock(resizeModel.id);
        if (resizeModel.width === 0)
            return false;
        const isChanged = block.minWidth !== resizeModel.width ||
            block.maxWidth !== resizeModel.width;
        block.minWidth = resizeModel.width;
        block.maxWidth = resizeModel.width;
        return isChanged;
    }
}
class NoTextSequentialVirtualLayer extends VirtualLayer {
    constructor() {
        super(...arguments);
        this.type = LayerType.NoTextSequential;
    }
    updateBlock(resizeModel, isInMinRooItems) {
        const block = this.getBlock(resizeModel.id);
        let isChanged = block.maxWidth !== resizeModel.width;
        block.maxWidth = resizeModel.width;
        if (block.minWidth) {
            isChanged = isChanged || block.minWidth !== resizeModel.width;
            block.minWidth = resizeModel.width;
        }
        if (!isInMinRooItems) {
            isChanged = isChanged || block.minWidth !== 0;
            block.minWidth = 0;
        }
        return isChanged;
    }
}
class VirtualLayoutModel {
    constructor() {
        this.layers = [];
        this.fullLayerTypes = [LayerType.Default, LayerType.FullSequential];
        this.noTextLayerTypes = [LayerType.NoText, LayerType.NoTextSequential];
    }
    get isEmpty() {
        if (this.layers.length === 0)
            return true;
        const defaultLayer = this.layers.find(x => x.type === LayerType.Default);
        return defaultLayer.blocks.filter(x => !x.isEllipse && !x.isTitle && x.maxWidth !== 0).length === 0;
    }
    get blockIds() {
        const defaultLayer = this.layers.find(x => x.type === LayerType.Default);
        if (!defaultLayer || defaultLayer.blocks.length === 0)
            return [];
        return defaultLayer.blocks.filter(x => !x.isEllipse).map(x => x.id);
    }
    resetLayers(layers) {
        this.layers = this.convertLayers(layers).map(this.toLayer);
    }
    initLayers(layers) {
        if (this.isEmpty) {
            this.resetLayers(layers);
            return true;
        }
        return false;
    }
    convertLayers(layers) {
        return layers.map(layer => {
            const actualBlocks = layer.getActualBlocks();
            return {
                name: layer.stateName,
                canApply: layer.canApply,
                type: layer.type,
                blocks: toBlockSize(actualBlocks, layer).sort((a, b) => sortBlocks(a, b)),
                margin: totalMargin(actualBlocks)
            };
        });
    }
    updateFullSizeBlock(resizeModel, isInMinRootItems) {
        return this.updateBlock(resizeModel, isInMinRootItems, this.fullLayerTypes);
    }
    updateNoTextBlock(resizeModel, isInMinRootItems) {
        return this.updateBlock(resizeModel, isInMinRootItems, this.noTextLayerTypes);
    }
    updateBlock(resizeModel, isInMinRootItems, types) {
        let isChanged = false;
        for (const layer of this.layers.filter(x => types.includes(x.type)))
            isChanged = layer.updateBlock(resizeModel, isInMinRootItems) || isChanged;
        return isChanged;
    }
    orderBlock(id, index) {
        for (const layer of this.layers)
            layer.orderBlock(id, index);
    }
    updateBlockByLayer(resizeModel, isInMinRootItems, type) {
        const layer = this.layers.find(x => x.type === type);
        return layer.updateBlock(resizeModel, isInMinRootItems);
    }
    getItemsByName(layerName) {
        const layer = this.layers.find(x => x.name === layerName);
        return this.getBlocks(layer);
    }
    getItemsByType(layerType) {
        const layer = this.layers.find(x => x.type === layerType);
        return this.getBlocks(layer);
    }
    getBlocks(layer) {
        return layer.blocks.filter(x => x.index !== -1);
    }
    getBlock(state, index) {
        const layer = this.layers.find(x => x.name === state);
        if (!layer)
            return undefined;
        return layer.blocks.find(x => x.index === index);
    }
    getBlockInEveryLayer(id) {
        return this.layers.map(x => x.blocks).flat().filter(x => x.id === id);
    }
    toLayer(virtualLayer) {
        const { name, canApply, type, blocks, margin } = { ...virtualLayer };
        switch (type) {
            case LayerType.Default:
                return new DefaultVirtualLayer(name, canApply, blocks, margin);
            case LayerType.FullSequential:
                return new FullSequentialVirtualLayer(name, canApply, blocks, margin);
            case LayerType.NoText:
                return new NoTextVirtualLayer(name, canApply, blocks, margin);
            case LayerType.NoTextSequential:
                return new NoTextSequentialVirtualLayer(name, canApply, blocks, margin);
        }
    }
}
function sortBlocks(pb, nb) {
    if (pb.isTitle || nb.isTitle)
        return pb.index - nb.index;
    if (pb.isEllipse || nb.isEllipse)
        return nb.index - pb.index;
    if (pb.adaptivePriority !== nb.adaptivePriority && !nb.isEllipse)
        return pb.adaptivePriority - nb.adaptivePriority;
    else if (pb.index > nb.index)
        return 1;
    return -1;
}

class LayerCheckpointService {
    constructor() {
        this._layers = [];
        this.checkpointsByLayers = new Map();
    }
    get layers() {
        return this._layers.filter(x => x.canApply);
    }
    initialize(layers) {
        var _a;
        this._layers = layers;
        this.checkpointsByLayers.clear();
        let limitValue = 0;
        for (const layer of this.layers) {
            const checkpoints = this.getPoints(layer, limitValue).filter(x => x !== 0);
            const newCheckpoints = checkpoints.filter(x => this.getCheckpoints().indexOf(x) < 0);
            this.checkpointsByLayers.set(layer.type, newCheckpoints);
            limitValue = (_a = checkpoints[checkpoints.length - 1]) !== null && _a !== void 0 ? _a : 0;
        }
    }
    getLayerTypeByWidth(checkpoint) {
        for (const layerType of this.layers.map(x => x.type)) {
            const values = this.checkpointsByLayers.get(layerType);
            if (values.indexOf(checkpoint) > -1)
                return layerType;
        }
        return LayerType.Default;
    }
    getCheckpointPair(width) {
        const checkpoints = this.getCheckpoints();
        let prevPoint = 0;
        let nextPoint = 0;
        for (const point of checkpoints) {
            if (point < width) {
                nextPoint = point;
                break;
            }
            prevPoint = point;
        }
        return [prevPoint, nextPoint];
    }
    getCheckpoints() {
        const values = [...this.checkpointsByLayers.values()].flat();
        return [...new Set(values.sort((a, b) => a < b ? 1 : -1))];
    }
    getPoints(layer, limitValue = 0) {
        switch (layer.type) {
            case LayerType.Default:
                return this.getConstantLayerPoints(layer);
            case LayerType.FullSequential:
                return this.getSeqPoints(layer, true, limitValue);
            case LayerType.NoText:
                return this.getConstantLayerPoints(layer);
            case LayerType.NoTextSequential:
                return this.getSeqPoints(layer, true, limitValue);
        }
        return [];
    }
    getConstantLayerPoints(layer) {
        return [layer.blocks.map(x => x.fullSize).reduce((pv, cv) => pv + cv, 0)];
    }
    getSeqPoints(layer, isMargin, limitValue) {
        const maxPoint = layer.blocks.map(x => x.fullSize).reduce((pv, cv) => pv + cv, 0);
        const result = [];
        let prevValue = maxPoint;
        for (const item of layer.blocks.slice().reverse()) {
            const value = prevValue - (item.fullSize - item.minWidth);
            if (value !== prevValue && item.index > -1 && (!limitValue || value < limitValue))
                result.push(value);
            prevValue = value;
        }
        return result;
    }
}

var LayerType;
(function (LayerType) {
    LayerType[LayerType["Default"] = 0] = "Default";
    LayerType[LayerType["FullSequential"] = 1] = "FullSequential";
    LayerType[LayerType["NoText"] = 2] = "NoText";
    LayerType[LayerType["NoTextSequential"] = 3] = "NoTextSequential";
})(LayerType || (LayerType = {}));
class LayoutAdaptivityModel {
    // eslint-disable-next-line
    constructor(onLayerApplied) {
        this.onLayerApplied = onLayerApplied;
        this.layers = [];
        this.blockCollection = null;
        this.currentLayer = null;
        this.currentWidth = null;
        this.currentHeight = null;
        this._defaultLayer = null;
        this._sequentialLayer = null;
        this.minWidth = null;
        this.virtualLayout = new VirtualLayoutModel();
        this.layerCheckpointService = new LayerCheckpointService();
        this.layersCheckpoints = [];
        this.prevPoint = 0;
        this.nextPoint = 0;
        this.toolbarWidthUpdate = () => { };
        this.toolbarHeightUpdate = () => { };
        this.toolbarIsVisible = () => true;
    }
    // eslint-disable-next-line
    initialize(collection, DOMelement, onElementResize) {
        this.blockCollection = collection;
        this.elementContentWidthSubscription = subscribeElementContentSize(DOMelement, (size) => {
            var _a;
            if (this.currentWidth !== size.width || this.currentHeight !== size.height) {
                if (this.currentWidth === null) {
                    (_a = this.blockCollection) === null || _a === void 0 ? void 0 : _a.subscribe((changes) => {
                        changes.addedItems.forEach(this.addItemBlock.bind(this));
                        changes.removedItems.forEach(this.removeItemBlock.bind(this));
                    });
                }
                // TODO: move this after layout blocks init refactoring
                this.getCheckpoints();
                this.currentWidth = size.width;
                if (!this.currentHeight || this.currentHeight !== size.height) {
                    this.currentHeight = size.height;
                    this.toolbarHeightUpdate(this.currentHeight);
                }
                if (!this.minWidth)
                    this.setMinWidth();
                if (!this.currentLayer || this.checkForLayoutUpdate()) {
                    if (this.virtualLayout.isEmpty) {
                        this.virtualLayout.resetLayers(this.layers);
                        this.getCheckpoints();
                    }
                    this.setCheckpoints();
                    this.setLayout();
                }
                if (onElementResize)
                    onElementResize(size);
            }
        });
    }
    addBlockToCollection(block) {
        var _a;
        (_a = this.blockCollection) === null || _a === void 0 ? void 0 : _a.add(block);
    }
    removeBlockToCollection(block) {
        var _a;
        (_a = this.blockCollection) === null || _a === void 0 ? void 0 : _a.remove(block);
    }
    dispose() {
        if (this.elementContentWidthSubscription)
            unsubscribeElement(this.elementContentWidthSubscription);
    }
    getLastLayer() { return this.layers[this.layers.length - 1] || null; }
    // eslint-disable-next-line
    setDefaultLayer(callback, canApply) {
        const defaultLayer = this._defaultLayer =
            new DefaultAdaptivityLayer("default", callback, this, canApply);
        this.layers.push(defaultLayer);
    }
    // eslint-disable-next-line
    setSimultaneousTransitionLayer(stateName, callback, canApply) {
        this.layers.push(new SimultaneousAdaptivityLayer(stateName, LayerType.NoText, callback, this.getLastLayer(), canApply));
    }
    // eslint-disable-next-line
    setSequentialTransitionLayer(stateName, type, callback, canApply) {
        const sequentialAdaptivityLayer = this._sequentialLayer =
            new SequentialAdaptivityLayer(stateName, type, callback, this.getLastLayer(), canApply);
        this.layers.push(sequentialAdaptivityLayer);
    }
    addItemBlock(block) {
        this.layers.forEach(function (layer) {
            layer.addBlock(block);
        });
    }
    removeItemBlock(blockId) {
        this.layers.forEach(function (layer) {
            layer.removeBlock(blockId);
        });
    }
    removeItemBlocks(removeIds) {
        for (const removeId of removeIds)
            this.removeItemBlock(removeId);
    }
    checkForLayoutUpdate() {
        const width = this.currentWidth;
        return this.nextPoint > 0 && width < this.nextPoint || this.prevPoint > 0 && width > this.prevPoint;
    }
    updateFromVirtualLayer(virtualLayer) {
        const layer = this.layers.find(x => x.type === virtualLayer.type);
        layer.canApply = virtualLayer.canApply;
        for (const block of layer.layoutBlocks) {
            const virtualBlock = virtualLayer.blocks.find(x => x.id === block.block.id);
            if (virtualBlock)
                block.width = virtualBlock.minWidth; // is it correct?
        }
    }
    orderFromVirtualLayer(virtualLayer) {
        const layer = this.layers.find(x => x.type === virtualLayer.type);
        const blocks = layer.layoutBlocks;
        const virtualBlocks = virtualLayer.blocks;
        for (const layoutBlock of layer.layoutBlocks) {
            const virtualBlock = virtualLayer.blocks.find(x => x.id === layoutBlock.block.id);
            if (virtualBlock)
                layoutBlock.block.index = virtualBlock.index;
        }
        layer.layoutBlocks = [...blocks].sort((a, b) => virtualBlocks.indexOf(virtualBlocks.find(x => x.id === a.block.id)) -
            virtualBlocks.indexOf(virtualBlocks.find(x => x.id === b.block.id)));
    }
    recalculateLayout() {
        this.setLayout();
    }
    setCheckpoints() {
        [this.prevPoint, this.nextPoint] = this.layerCheckpointService.getCheckpointPair(this.currentWidth);
    }
    updateCheckpoints(isUpdateLayout) {
        const [currentPrevPoint, currentNextPoint] = [this.prevPoint, this.nextPoint];
        this.resetCheckpoints();
        const width = this.currentWidth;
        const isCorrectCheckpoint = currentPrevPoint !== this.prevPoint && width < this.prevPoint ||
            currentNextPoint !== this.nextPoint && width > this.nextPoint;
        if (isUpdateLayout && isCorrectCheckpoint)
            this.setLayout();
    }
    resetCheckpoints() {
        this.virtualLayout.resetLayers(this.layers);
        this.layerCheckpointService.initialize(this.virtualLayout.layers);
        this.layersCheckpoints = this.layerCheckpointService.getCheckpoints();
        this.setCheckpoints();
        this.setMinWidth();
    }
    setLayout() {
        const width = this.currentWidth;
        const checkpoint = this.nextPoint > 0 && width > this.nextPoint ? this.nextPoint : this.prevPoint;
        const layerType = this.layerCheckpointService.getLayerTypeByWidth(checkpoint);
        const layerToUpdate = this.layers.find(x => x.type === layerType);
        this.virtualLayout.resetLayers(this.layers);
        this.applyLayer(layerToUpdate);
    }
    setMinWidth() {
        const checkpoints = this.getCheckpoints();
        this.minWidth = checkpoints[checkpoints.length - 1];
        this.toolbarWidthUpdate();
    }
    // TODO: replace by setLayout()
    updateLayout() {
        const layers = this.findLayersForWidth(this.currentWidth);
        const layerToUpdate = layers[0];
        if (layerToUpdate) {
            this.applyLayer(layerToUpdate);
            this.minWidth = Math.min(...this.layers.filter(x => x.latestRange).map(x => x.latestRange.min));
        }
    }
    getCheckpoints() {
        if (!this.layersCheckpoints.length && !this.virtualLayout.isEmpty && this.toolbarIsVisible())
            this.resetCheckpoints();
        return this.layersCheckpoints;
    }
    resetToDefault() {
        this.applyLayer(this.layers[0], true);
    }
    applyLayer(layerToApply, resetToDefault = false) {
        this.currentLayer = layerToApply;
        if (resetToDefault)
            layerToApply.activateAndReset(this.currentWidth);
        else {
            this.virtualLayout.initLayers(this.layers);
            const virtualLayer = this.virtualLayout.layers.find(x => x.type === this.currentLayer.type);
            layerToApply.activate(this.currentWidth, virtualLayer.blocks);
        }
        if (this.onLayerApplied)
            this.onLayerApplied(layerToApply);
    }
    findLayersForWidth(width) {
        return this.layers.filter(function (layer) {
            return layer.isValidWidth(width);
        });
    }
    forceUpdate() {
        if (this.currentWidth === null)
            return;
        this.updateLayout();
    }
    getMinWidth() {
        if (this.minWidth)
            return this.minWidth;
        if (!this._sequentialLayer)
            return null;
        return this._sequentialLayer.getActualBlocks().map(x => x.getMinWidth()).reduce((sum, x) => sum + x, 0);
    }
}
class LayoutAdaptivityLayer {
    // eslint-disable-next-line
    constructor(stateName, type, blockUpdaterGetter, prevLayer, canApply) {
        this.stateName = stateName;
        this.type = type;
        this.blockUpdaterGetter = blockUpdaterGetter;
        this.prevLayer = prevLayer;
        this.canApply = canApply;
        this.nextLayer = null;
        this.layoutBlocks = [];
        this.nextLayer = null;
        if (prevLayer)
            prevLayer.nextLayer = this;
    }
    getNextLayer() {
        return this.nextLayer != null ? (this.nextLayer.canApply ? this.nextLayer : this.nextLayer.getNextLayer()) : null;
    }
    getPrevLayer() {
        return this.prevLayer != null ? (this.prevLayer.canApply ? this.prevLayer : this.prevLayer.getPrevLayer()) : null;
    }
    requestUpdateLayoutModel() { var _a; (_a = this.getPrevLayer()) === null || _a === void 0 ? void 0 : _a.requestUpdateLayoutModel(); }
    // eslint-disable-next-line
    getBlockCollection(id) {
        var _a;
        return (_a = this.getPrevLayer()) === null || _a === void 0 ? void 0 : _a.getBlockCollection(id);
    }
    isValidWidth(w) {
        if (!this.canApply || !w)
            return false;
        const r = this.getRangeNew();
        return (!this.getNextLayer() && r.min > w) || (!this.getPrevLayer() && r.max < w) || (r.min <= w && r.max >= w);
    }
    getRange() {
        const groupMap = new Set();
        const res = this.latestRange = this.getActualBlocks().reduce((r, lb) => {
            groupMap.add(lb.blockCollection);
            return { min: r.min + lb.getMinWidth(), max: r.max + lb.getMaxWidth(this) };
        }, { min: 0, max: 0 });
        groupMap.forEach((x) => {
            res.min += x.margins;
            res.max += x.margins;
        });
        return res;
    }
    // TODO: will replace getRange()
    getRangeNew() {
        const actualBlocks = this.getActualBlocks();
        const blocks = toBlockSize(actualBlocks, this);
        const prevLayerBlocks = this.type === LayerType.NoText && this.prevLayer ?
            toBlockSize(this.prevLayer.getActualBlocks(), this.prevLayer) : [];
        return this.latestRange = this.rangeCalculator.getRange(blocks, 0, prevLayerBlocks);
    }
    getActualBlocks() {
        const prevLayer = this.getPrevLayer();
        if (!prevLayer)
            return this.layoutBlocks;
        return prevLayer.getActualBlocks()
            .map((lb1) => {
            return this.layoutBlocks.filter(function (lb2) { return lb2.block === lb1.block; })[0] || lb1;
        });
    }
    activate(width, virtualBlocks) {
        if (!width)
            return;
        this.layoutBlocks.forEach((lb) => { lb.block.updateState(this.stateName); });
    }
    addBlock(block) {
        const blockUpdater = this.blockUpdaterGetter(block);
        if (blockUpdater) {
            const layoutBlock = this.createBlock(block, blockUpdater);
            this.layoutBlocks.push(layoutBlock);
        }
    }
    removeBlock(_blockId) {
        const blockToRemove = this.layoutBlocks.find(x => x.block.id === _blockId);
        if (blockToRemove) {
            const index = this.layoutBlocks.indexOf(blockToRemove);
            this.layoutBlocks.splice(index, 1);
        }
    }
    activateAndReset(_currentWidth) { }
}
class DefaultAdaptivityLayer extends LayoutAdaptivityLayer {
    // eslint-disable-next-line
    constructor(stateName, blockUpdaterGetter, layoutModel, canApply) {
        super(stateName, LayerType.Default, blockUpdaterGetter, null, canApply);
        this.layoutModel = layoutModel;
        this.rangeCalculator = new DefaultLayerRangeCalculator();
        this.blockCollection = new Map();
    }
    requestUpdateLayoutModel() { this.layoutModel.updateLayout(); }
    createBlock(block, blockUpdater) {
        return new LayoutDefaultBlock(this, block, blockUpdater);
    }
    activateAndReset(currentWidth) {
        this.activate(currentWidth, []);
        this.layoutBlocks.forEach((lb) => { lb.block.reset(); });
    }
    // eslint-disable-next-line
    getBlockCollection(id) {
        return this.getBlockCollectionCore(id);
    }
    // eslint-disable-next-line
    getBlockCollectionCore(id) {
        let blockCollection = this.blockCollection.get(id);
        if (!blockCollection)
            this.blockCollection.set(id, blockCollection = new BlockCollection(id));
        return blockCollection;
    }
}
class SequentialAdaptivityLayer extends LayoutAdaptivityLayer {
    constructor() {
        super(...arguments);
        this.rangeCalculator = new SequentialLayerRangeCalculator();
    }
    activate(width, virtualBlocks) {
        // coded case - shrinking; reverse flow for growing
        const currentBlocks = this.getActualBlocks();
        // TODO: don't use range system
        this.getRangeNew();
        let maxWidth = this.latestRange.max;
        let stateName = this.stateName;
        const groupMap = new Map();
        for (let i = virtualBlocks.length - 1; i >= 0; i--) {
            const virtualBlock = virtualBlocks[i];
            const lBlock = currentBlocks.find(x => x.block.id === virtualBlock.id);
            if (maxWidth > width) {
                const delta = virtualBlock.fullSize - virtualBlock.minSize;
                maxWidth -= delta;
                const groupId = lBlock.blockCollection.id;
                const blocks = (groupMap.has(groupId) ? groupMap : groupMap.set(groupId, lBlock.blockCollection.toArray()))
                    .get(groupId);
                if (blocks) {
                    blocks.splice(blocks.indexOf(lBlock.block), 1);
                }
                if (maxWidth <= width) {
                    lBlock.block.updateState(stateName);
                    const prev = this.getPrevLayer();
                    stateName = prev ? prev.stateName : "";
                    continue;
                }
            }
            lBlock.block.updateState(stateName);
        }
    }
    getRange() {
        const groupMap = new Set();
        this.latestRange = this.getActualBlocks().reduce((r, lb) => {
            groupMap.add(lb.blockCollection);
            return { min: r.min + lb.getMinWidth(), max: r.max + lb.getMaxWidth(this) };
        }, { min: 0, max: 0 });
        groupMap.forEach((x) => {
            this.latestRange.max += x.margins;
        });
        return this.latestRange;
    }
    createBlock(block, blockUpdater) { return new LayoutDynamicBlock(this, block, blockUpdater); }
}
class SimultaneousAdaptivityLayer extends LayoutAdaptivityLayer {
    constructor() {
        super(...arguments);
        this.rangeCalculator = new SimultaneousLayerRangeCalculator();
    }
    createBlock(block, blockUpdater) { return new LayoutStaticBlock(this, block, blockUpdater); }
    getRange() {
        const groupMap = new Set();
        let min = this.getActualBlocks().reduce(function (r, lb) {
            groupMap.add(lb.blockCollection);
            return r + lb.getMinWidth();
        }, 0);
        groupMap.forEach((x) => {
            min += x.margins;
        });
        const max = this.getPrevLayerRangeMax();
        return this.latestRange = { min: min, max: max };
    }
    getPrevLayerRangeMax() {
        const prev = this.getPrevLayer();
        return prev ? prev.getRangeNew().max - 1 : 0;
    }
}

var ToolbarRenderMode;
(function (ToolbarRenderMode) {
    ToolbarRenderMode[ToolbarRenderMode["Contained"] = 0] = "Contained";
    ToolbarRenderMode[ToolbarRenderMode["Plain"] = 1] = "Plain";
})(ToolbarRenderMode || (ToolbarRenderMode = {}));
var ToolbarItemSpacingMode;
(function (ToolbarItemSpacingMode) {
    ToolbarItemSpacingMode[ToolbarItemSpacingMode["Default"] = 0] = "Default";
    ToolbarItemSpacingMode[ToolbarItemSpacingMode["Large"] = 1] = "Large";
})(ToolbarItemSpacingMode || (ToolbarItemSpacingMode = {}));
class ViewModelBase {
    constructor(element, toolbar) {
        this.element = element;
        this.toolbar = toolbar;
        this.index = new Subject(-1);
        this.isVisible = new Subject(this.defaultIsVisible());
        this.isVisible.subscribe((visible) => {
            this.onIsVisibleChanged(visible);
        }, true);
    }
    defaultIsVisible() { return true; }
    getElement() { return this.element; }
    updateVisible(visible) {
        this.isVisible.update(visible);
    }
    onIsVisibleChanged(visible) {
        const element = this.getElement();
        if (!element)
            return;
        if (visible)
            this.show(element);
        else
            this.hide(element);
    }
    show(element) {
        element.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
    }
    hide(element) {
        element.classList.add(ToolbarCssClasses.ToolbarHiddenItem);
    }
}
class ItemViewModelBase extends ViewModelBase {
    constructor() {
        super(...arguments);
        this.isDisplayed = new Subject(true);
        this.text = new Subject("");
        this.iconCssClass = new Subject("");
    }
    show(element) {
        element.style.display = "";
    }
    hide(element) {
        element.style.display = "none";
    }
    getGroupElement() {
        return null;
    }
}
class ItemViewModel extends ItemViewModelBase {
    constructor(element, toolbar, group) {
        super(element, toolbar);
        this.group = group;
        this.groupName = new Subject("");
        this.adaptivePriority = new Subject(-1);
    }
    onIsVisibleChanged(visible) {
        super.onIsVisibleChanged(visible);
        this.group.onItemVisibleChanged();
    }
    getElement() {
        return document.querySelector(`#${this.id}`);
    }
    getParent() {
        const element = this.getElement();
        if (element && element.parentElement)
            return element.parentElement;
        return null;
    }
    getGroupElement() {
        return this.group.getElement();
    }
}
class EllipsisItemViewModel extends ItemViewModelBase {
    constructor(element, toolbar) {
        super(element, toolbar);
    }
    defaultIsVisible() { return null; }
}
class GroupViewModel extends ViewModelBase {
    constructor(element, toolbar) {
        super(element, toolbar);
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    onItemVisibleChanged() {
        if (this.items.length === 0)
            return;
        const hasVisibleItems = this.items.some(x => x.isVisible.value);
        this.updateVisible(hasVisibleItems);
    }
    getElement() {
        if (this.items.length === 0)
            return null;
        const element = findParentBySelector(this.items[0].getElement(), getSelector(groupSelectorString, this.toolbar.id));
        return element ? element : this.items[0].getParent();
    }
}
class TitleViewModel extends ViewModelBase {
    constructor(toolbar, elementSelector) {
        super(null, toolbar);
        this.elementSelector = elementSelector;
        this.hasTitle = new Subject(false);
        this.text = new Subject("");
        this.text.subscribe((v) => {
            this.hasTitle.update(v != null && v !== "");
        });
    }
    getElement() {
        return document.querySelector(this.elementSelector);
    }
}
class ToolbarViewModel {
    constructor(element, id) {
        this.element = element;
        this.id = id;
        this.items = [];
        this.itemMap = new Map();
        this.groupMap = new Map();
        this.canHideRootItems = false;
        this.canCollapseToIcons = false;
        this.minRootItems = 0;
    }
}

const tagsToSkipCloning = [
    comboBoxTagName,
    comboBox2TagName
].map(x => x.toUpperCase());
const elementsToSkip = [
    "DXBL-POPUP-PORTAL"
];
class VirtualToolbar {
    constructor(dataToolbarId) {
        this.dataToolbarId = dataToolbarId;
        this.virtualElementCreator = {
            [ToolbarCssClasses.ToolbarGroup]: this.createVirtualGroup,
            [ToolbarCssClasses.ToolbarItem]: this.createVirtualRootItem,
            [ToolbarCssClasses.ToolbarPlaceholder]: this.createVirtualPlaceholder,
            [ToolbarCssClasses.ButtonEllipsis]: this.createVirtualRootItem
        };
        this.toolbar = document.querySelector(`[${dataToolbarIdAttribute}='${this.dataToolbarId}']`);
        this.buttonToolbar = this.toolbar.querySelector(`.${ToolbarCssClasses.ButtonToolbar}`);
        this.virtualButtonToolbar = document.createElement("div");
        this.copyToolbar();
        this.toolbar.appendChild(this.virtualButtonToolbar);
    }
    copyToolbar() {
        this.virtualButtonToolbar.classList.remove(...this.virtualButtonToolbar.classList);
        this.virtualButtonToolbar.classList.add(ToolbarCssClasses.VirtualToolbar);
        this.virtualButtonToolbar.classList.add(...this.buttonToolbar.classList);
        const buttonToolbarChildren = [...this.buttonToolbar.children];
        const virtualToolbarElements = [];
        for (const child of buttonToolbarChildren) {
            const creatorType = [...child.classList].find(x => this.virtualElementCreator[x] != null);
            virtualToolbarElements.push(this.virtualElementCreator[creatorType].bind(this, child)());
        }
        this.numberToolbarGroups(virtualToolbarElements.filter(x => x.classList.contains(ToolbarCssClasses.ToolbarGroup)));
        this.virtualButtonToolbar.innerHTML = "";
        virtualToolbarElements.forEach(x => this.virtualButtonToolbar.appendChild(x));
    }
    numberToolbarGroups(groups) {
        for (let i = 0; i < groups.length; i++)
            if (i === 0)
                groups[i].classList.add(ButtonCssClasses.ButtonGroupFirst);
    }
    getElementWidth(id) {
        this.buttonToolbar.style.width = this.buttonToolbar.offsetWidth + "px";
        const item = this.virtualButtonToolbar.querySelector(`[virtual-id=${id}]`);
        const parent = item.parentElement;
        let marginLeft = 0;
        let marginRight = 0;
        const separator = [...parent.children].find(x => x.classList.contains(ToolbarCssClasses.ToolbarGroupSeparator));
        let separatorWidth = 0;
        if (item.parentElement != null && item.parentElement.classList.contains(ToolbarCssClasses.ToolbarGroup)) {
            const parentStyle = dom.DomUtils.getCurrentStyle(item.parentElement);
            if (item.parentElement.lastElementChild === item)
                marginRight = dom.DomUtils.pxToInt(parentStyle.marginRight);
            if (item.parentElement.firstElementChild === item)
                marginLeft = dom.DomUtils.pxToInt(parentStyle.marginLeft);
            if (parent.classList.contains(ButtonCssClasses.ButtonGroupFirst) && parent.children[1] === item)
                marginLeft = dom.DomUtils.pxToInt(parentStyle.marginLeft);
            else if (parent.firstElementChild === separator && separator.nextElementSibling === item) {
                const separatorElement = separator;
                if (separatorElement) {
                    const parentStyle = dom.DomUtils.getCurrentStyle(parent);
                    const separatorStyle = dom.DomUtils.getCurrentStyle(separatorElement);
                    separatorWidth += dom.DomUtils.pxToInt(parentStyle.marginLeft) + separatorElement.offsetWidth +
                        dom.DomUtils.pxToInt(separatorStyle.marginRight);
                }
            }
        }
        this.buttonToolbar.style.width = "";
        if (item.offsetWidth === 0)
            return 0;
        return item.offsetWidth + marginLeft + marginRight + separatorWidth;
    }
    setRenderMode(renderMode) {
        // eslint-disable-next-line
        if (renderMode == ToolbarRenderMode.Plain)
            this.virtualButtonToolbar.classList.add(ToolbarCssClasses.ButtonPlainToolbar);
        else
            this.virtualButtonToolbar.classList.remove(ToolbarCssClasses.ButtonPlainToolbar);
    }
    applyFullLayer() {
        this.applyAdaptivityState(ToolbarCssClasses.ToolbarDefaultLayer);
    }
    applyNoTextLayer() {
        this.applyAdaptivityState(ToolbarCssClasses.ToolbarNoItemText);
    }
    applyAdaptivityState(state) {
        if (state.indexOf(ToolbarCssClasses.ToolbarNoItemText) > -1)
            this.virtualButtonToolbar.classList.add(ToolbarCssClasses.ToolbarNoItemText);
        else
            this.virtualButtonToolbar.classList.remove(ToolbarCssClasses.ToolbarNoItemText);
    }
    createVirtualGroup(group) {
        const virtualGroup = document.createElement("div");
        const buttons = virtualGroup.querySelectorAll(`.${ToolbarCssClasses.ToolbarItem} > .${ButtonCssClasses.Button}`);
        const firstButtonId = buttons.length > 0 ? buttons[0].id : "";
        const lastButtonId = buttons.length > 0 ? buttons[buttons.length - 1].id : "";
        for (const attribute of group.attributes)
            virtualGroup.setAttribute(attribute.name, attribute.value);
        for (let i = 0; i < group.children.length; i++) {
            virtualGroup.appendChild(this.createVirtualItem(group.children[i], firstButtonId, lastButtonId));
        }
        virtualGroup.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
        return virtualGroup;
    }
    createVirtualRootItem(item) {
        return this.createVirtualItem(item, "", "");
    }
    createVirtualItem(item, isFirstId, isLastId) {
        const virtualItem = document.createElement("div");
        for (const attribute of [...item.attributes].filter(x => x.name !== "id"))
            virtualItem.setAttribute(attribute.name, attribute.value);
        virtualItem.setAttribute("virtual-id", item.id);
        virtualItem.style.display = "block";
        if (item.children.length > 0) {
            for (const child of item.children) {
                const virtualChild = child.tagName === ToolbarCssClasses.ToolbarItem ?
                    this.createVirtualItem(child, isFirstId, isLastId) :
                    this.createVirtualChild(child, isFirstId, isLastId);
                virtualItem.appendChild(virtualChild);
            }
        }
        else
            virtualItem.innerHTML = item.innerHTML;
        return virtualItem;
    }
    createVirtualPlaceholder(placeholder) {
        const virtualPlaceholder = document.createElement("DIV");
        for (const attribute of [...placeholder.attributes].filter(x => x.name !== "id"))
            virtualPlaceholder.setAttribute(attribute.name, attribute.value);
        virtualPlaceholder.style.width = placeholder.clientWidth + "px";
        return virtualPlaceholder;
    }
    createVirtualChild(element, isFirstId, isLastId) {
        const virtualChild = element.cloneNode(true);
        const processVirtualChild = ((virtualElement, parent = null) => {
            if (elementsToSkip.some(x => virtualElement.tagName === x))
                return;
            if (parent && tagsToSkipCloning.indexOf(virtualElement.tagName) > -1) {
                const mockChild = document.createElement("DIV");
                mockChild.style.width = element.getBoundingClientRect().width + "px";
                parent.replaceChild(mockChild, virtualElement);
                return;
            }
            for (const attr of virtualElement.attributes) {
                if (attr.name.toLowerCase().endsWith("id"))
                    virtualElement.setAttribute(attr.name, attr.value + "__virtual");
            }
            virtualElement.setAttribute(GlobalConstants.virtualElementAttributeName, "true");
            for (const child of virtualElement.children)
                processVirtualChild(child, virtualElement);
        });
        processVirtualChild(virtualChild);
        virtualChild.setAttribute("virtual-id", element.id);
        virtualChild.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
        if (element.classList.contains(ButtonCssClasses.Button)) {
            if (isFirstId === virtualChild.id)
                virtualChild.classList.add(ButtonCssClasses.ButtonFirst);
            if (isLastId === virtualChild.id)
                virtualChild.classList.add(ButtonCssClasses.ButtonLast);
        }
        return virtualChild;
    }
}

class LayoutUpdateService {
    constructor(layoutModel, layoutOptions, dataToolbarId) {
        this.layoutModel = layoutModel;
        this.layoutOptions = layoutOptions;
        this.minRootItemIds = [];
        this.virtualLayout = new VirtualLayoutModel();
        this.virtualToolbar = new VirtualToolbar(dataToolbarId);
        this.setRenderMode(this.layoutOptions.renderMode);
        this.setMinRootItems();
    }
    // TODO: refactor to sub methods
    updateMinRootItems(value) {
        this.virtualLayout.resetLayers(this.layoutModel.layers);
        const fullSeqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.FullSequential);
        const noTextSeqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.NoTextSequential);
        // TODO: put it in some setting-method
        fullSeqLayer.canApply = value > 0;
        const currentItems = this.virtualLayout.getItemsByName(this.layoutModel.currentLayer.stateName);
        const affectedItemIds = this.getAffectedItemIds(currentItems.map(x => x.id), this.layoutOptions.minRootItems, value);
        if (value - this.layoutOptions.minRootItems > 0) {
            fullSeqLayer.blocks.filter(x => affectedItemIds.includes(x.id)).forEach(x => x.minWidth = x.maxWidth);
            noTextSeqLayer.blocks.filter(x => affectedItemIds.includes(x.id)).forEach(x => x.minWidth = x.maxWidth);
        }
        else {
            fullSeqLayer.blocks.filter(x => affectedItemIds.includes(x.id)).forEach(x => x.minWidth = 0);
            noTextSeqLayer.blocks.filter(x => affectedItemIds.includes(x.id)).forEach(x => x.minWidth = 0);
        }
        this.layoutOptions.minRootItems = value;
        this.setMinRootItems();
        this.layoutModel.updateFromVirtualLayer(fullSeqLayer);
        this.layoutModel.updateFromVirtualLayer(noTextSeqLayer);
        this.layoutModel.updateCheckpoints(true);
    }
    setMinRootItems() {
        if (this.virtualLayout.layers.length === 0)
            return;
        const seqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.FullSequential);
        const adaptiveItems = seqLayer.blocks.filter(x => !x.isTitle && !x.isEllipse);
        this.minRootItemIds = this.getAffectedItemIds(adaptiveItems.map(x => x.id), 0, this.layoutOptions.minRootItems);
    }
    setRenderMode(value) {
        this.layoutOptions.renderMode = value;
        this.virtualToolbar.setRenderMode(this.layoutOptions.renderMode);
    }
    updateRenderMode(value) {
        this.virtualLayout.resetLayers(this.layoutModel.layers);
        this.virtualToolbar.copyToolbar();
        this.setRenderMode(value);
        for (const blockId of this.virtualLayout.blockIds) {
            const sizeBlock = { id: blockId, width: 0 };
            for (const layer of this.virtualLayout.layers) {
                if (layer.type === LayerType.NoText)
                    this.virtualToolbar.applyNoTextLayer();
                else
                    this.virtualToolbar.applyFullLayer();
                const virtualResizeModel = this.renderVirtualResizeModel(sizeBlock);
                layer.updateBlock(virtualResizeModel, this.checkIfIsInMinRootItems(sizeBlock.id));
            }
        }
        this.updateAllRealLayers(true);
    }
    updateCanHideRootItems(value) {
        this.refreshVirtualLayout();
        if (this.layoutOptions.canHideRootItems === value)
            return;
        this.layoutOptions.canHideRootItems = value;
        const fullSeqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.FullSequential);
        const noTextSeqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.NoTextSequential);
        fullSeqLayer.canApply = this.layoutOptions.canHideRootItems && (this.layoutOptions.minRootItems > 0 || !this.layoutOptions.canCollapseToIcons);
        noTextSeqLayer.canApply = this.layoutOptions.canHideRootItems;
        this.updateAllRealLayers(true);
    }
    updateCanCollapseToIcons(value) {
        this.refreshVirtualLayout();
        if (this.layoutOptions.canCollapseToIcons === value)
            return;
        this.layoutOptions.canCollapseToIcons = value;
        const noTextLayer = this.virtualLayout.layers.find(x => x.type === LayerType.NoText);
        const noTextSeqLayer = this.virtualLayout.layers.find(x => x.type === LayerType.NoTextSequential);
        noTextLayer.canApply = this.layoutOptions.canCollapseToIcons;
        noTextSeqLayer.canApply = this.layoutOptions.canCollapseToIcons && this.layoutOptions.canHideRootItems;
        this.updateAllRealLayers(true);
    }
    addBlock(item) {
        this.virtualLayout.initLayers(this.layoutModel.layers);
    }
    refreshVirtualLayout() {
        this.virtualLayout.resetLayers(this.layoutModel.layers);
        this.setMinRootItems();
    }
    removeBlocks(ids) {
        this.virtualLayout.initLayers(this.layoutModel.layers);
        this.refreshVirtualToolbar();
        this.layoutModel.updateCheckpoints(true);
    }
    orderBlock(item) {
        this.virtualLayout.orderBlock(item.id, item.index);
        this.setMinRootItems();
        this.updateAllRealLayers(true);
        this.orderAllRealLayers();
    }
    updateBlockSize(resizeModel, force) {
        this.refreshVirtualLayout();
        if (force)
            this.virtualToolbar.copyToolbar();
        let isUpdated = false;
        if (resizeModel.isTitle)
            isUpdated = this.virtualLayout.updateBlock(resizeModel, this.checkIfIsInMinRootItems(resizeModel.id), getEnumValues(LayerType)) || isUpdated;
        else
            isUpdated = this.renderVirtualInLayers(resizeModel) || isUpdated;
        this.updateAllRealLayers(isUpdated);
    }
    renderVirtualInLayers(sizeableBLock) {
        let isUpdated = false;
        for (const layer of this.virtualLayout.layers) {
            if (layer.type === LayerType.NoText)
                this.virtualToolbar.applyNoTextLayer();
            else
                this.virtualToolbar.applyFullLayer();
            const virtualResizeModel = this.renderVirtualResizeModel(sizeableBLock);
            isUpdated = layer.updateBlock(virtualResizeModel, this.checkIfIsInMinRootItems(sizeableBLock.id)) || isUpdated;
        }
        return isUpdated;
    }
    renderVirtualResizeModel(sizeBLock) {
        const renderedWidth = this.virtualToolbar.getElementWidth(sizeBLock.id);
        return {
            id: sizeBLock.id,
            width: renderedWidth,
        };
    }
    getAffectedItemIds(items, currentValue, newValue) {
        const currentSlice = items.slice(0, currentValue);
        const newSlice = items.slice(0, newValue);
        return newValue > currentValue ?
            newSlice.filter(x => !currentSlice.includes(x)) :
            currentSlice.filter(x => !newSlice.includes(x));
    }
    updateAllRealLayers(isUpdated) {
        for (const virtualLayer of this.virtualLayout.layers)
            this.layoutModel.updateFromVirtualLayer(virtualLayer);
        this.layoutModel.updateCheckpoints(isUpdated);
    }
    orderAllRealLayers() {
        for (const virtualLayer of this.virtualLayout.layers)
            this.layoutModel.orderFromVirtualLayer(virtualLayer);
        this.layoutModel.updateCheckpoints(true);
    }
    refreshVirtualToolbar() {
        this.virtualToolbar.copyToolbar();
    }
    checkIfIsInMinRootItems(itemId) {
        return this.minRootItemIds.includes(itemId);
    }
}
class BlockSize {
    constructor(id, index, adaptivePriority, minWidth, maxWidth, margin, isTitle, isEllipse) {
        this.id = id;
        this.index = index;
        this.adaptivePriority = adaptivePriority;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.margin = margin;
        this.isTitle = isTitle;
        this.isEllipse = isEllipse;
    }
    get fullSize() {
        return this.maxWidth;
    }
    get minSize() {
        return this.minWidth;
    }
}

const globalSkipParentMargin = false;
const groupSelectorString = "data-dxtoolbar-group-id";
const titleSelectorString = "data-dxtoolbar-title-id";
const ellipsisSelectorString = "data-dxtoolbar-ellipsis-id";
const btnToolbarSelector = ".dxbl-btn-toolbar";
const imageNotToggleSelector = ".dxbl-image:not(.dxbl-toolbar-dropdown-toggle)";
const imageToggleSelector = ".dxbl-image.dxbl-toolbar-dropdown-toggle";
const toolbarTemplateSelector = ".dxbl-toolbar-item-tmpl";
const dataToolbarIdAttribute = "data-dxtoolbar-id";
// TODO: find a way to get this from element on prerender
const separatorWidth = 1;
function getNodeWidth(node, skipMargins = false, skipParentMargins = false) {
    if (!node)
        return 0;
    let elementWidth = Math.ceil(getElementOffsetWidth(node) + (skipMargins ? 0 : getBoxOuterOffset(node)));
    if (node.parentElement && !skipParentMargins) {
        const separator = [...node.parentElement.children].find(x => x.classList.contains(ToolbarCssClasses.ToolbarGroupSeparator));
        if (node.parentElement.lastElementChild === node) {
            const parentStyle = dom.DomUtils.getCurrentStyle(node.parentElement);
            elementWidth += dom.DomUtils.pxToInt(parentStyle.marginRight);
        }
        if (node.parentElement.firstElementChild === separator && separator.nextElementSibling === node) {
            const separatorElement = separator;
            if (separatorElement) {
                const parentStyle = dom.DomUtils.getCurrentStyle(node.parentElement);
                const separatorStyle = dom.DomUtils.getCurrentStyle(separatorElement);
                elementWidth += separatorElement.offsetWidth !== 0 ? separatorElement.offsetWidth : separatorWidth +
                    dom.DomUtils.pxToInt(parentStyle.marginLeft) +
                    dom.DomUtils.pxToInt(separatorStyle.marginRight);
            }
        }
        if (node.parentElement.firstElementChild === node) {
            const parentStyle = dom.DomUtils.getCurrentStyle(node.parentElement);
            elementWidth += dom.DomUtils.pxToInt(parentStyle.marginLeft);
        }
    }
    return elementWidth;
}
function getItemWithoutTextWidth(itemEl) {
    let width = getNodeWidth(itemEl, false, globalSkipParentMargin);
    if (width === 0)
        return width;
    if (itemEl) {
        const template = itemEl.querySelector(toolbarTemplateSelector);
        if (template)
            return width;
        const notToggleImage = itemEl.querySelector(imageNotToggleSelector);
        if (notToggleImage) {
            const toggleImage = itemEl.querySelector(imageToggleSelector);
            width -= getBoxOuterOffset(notToggleImage);
            let nodeToHide = notToggleImage;
            while (nodeToHide = nodeToHide.nextElementSibling) {
                if (!isPopupElement(nodeToHide) && isPositionAbsolute(nodeToHide) && nodeToHide !== toggleImage)
                    width -= getNodeWidth(nodeToHide);
            }
        }
    }
    return width;
}
function getItemSizeAffectingProperties(b) {
    return [b.item.text, b.item.isDisplayed, b.item.iconCssClass]; // todo: itemsize //todo: renderMode
}
function getSystemItemSizeAffectingProperties(_b) {
    return [ /* b.item.Text, b.item.IconCssClass*/];
}
function getBoxOuterOffset(el) { return getLeftRightMargins(el); }
function isPopupElement(el) { return dom.DomUtils.hasClassName(el, "popout"); }
function isPositionAbsolute(element) { return dom.DomUtils.getCurrentStyle(element).position !== "absolute"; }
function getSelector(selectorString, id) {
    return `[${selectorString}=${id}]`;
}
function getAdaptiveItemSelector(id) {
    return `#${id}[dxbl-toolbar-adaptive-item]`;
}
function areEqual(array1, array2) {
    return (array1.length === array2.length) && array1.every((element, index) => element === array2[index]);
}
function toBlockSize(blocks, layer) {
    return [...new Set(blocks)].map(lb => new BlockSize(lb.block.id, lb.block.index, lb.block.adaptivePriority, lb.getMinWidth(), lb.getMaxWidth(layer), lb.blockCollection.margins, lb.block instanceof TitleBlock, lb.block instanceof EllipsisBtnBlock));
}
function totalMargin(layoutBlock) {
    return [...new Set(layoutBlock.map(b => b.blockCollection))]
        .map(b => b.margins).reduce((pv, cv) => pv + cv, 0);
}
function getEnumValues(enumObject) {
    return Object.keys(enumObject)
        .filter(key => Number.isNaN(Number(key)))
        .map(key => enumObject[key]);
}

class DxToolbarMenuItem extends DxDropDownOwner {
    constructor() {
        super(...arguments);
        this.boundOnButtonClick = this.onButtonClick.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.boundOnButtonClick);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this.boundOnButtonClick);
        super.disconnectedCallback();
    }
    canHandlePointerDown(evt) {
        return PointerEventHelper.containsInComposedPath(evt, this);
    }
    onButtonClick(_) {
        if (this.getAttribute("submit-form-on-click") === null)
            return;
        const id = this.getAttribute("data-dxtoolbar-container-id");
        if (id) {
            const toolbar = document.querySelector(`[${dataToolbarIdAttribute}=${id}]`);
            if (toolbar) {
                const submitter = document.createElement("input");
                submitter.type = "submit";
                submitter.hidden = true;
                toolbar.appendChild(submitter);
                submitter.click();
                toolbar.removeChild(submitter);
            }
        }
    }
}

class ToolbarItemsManager {
    constructor() {
        this.toolbars = new Map();
    }
    addToolbar(toolbar) {
        this.toolbars.set(toolbar.id, toolbar);
    }
    removeToolbar(toolbar) {
        this.toolbars.delete(toolbar.id);
    }
    addToolbarItem(item) {
        const toolbar = this.getToolbar(item.id);
        if (!toolbar)
            return;
        toolbar.addItem(item);
    }
    removeToolbarItem(item) {
        for (const toolbar of this.toolbars.values())
            toolbar.removeItem(item);
    }
    getToolbar(itemId) {
        const itemElement = document.querySelector(`#${itemId}`);
        if (!itemElement)
            return undefined;
        const toolbarElement = itemElement.closest(`.${ToolbarCssClasses.Toolbar}`);
        if (!toolbarElement)
            return undefined;
        return this.toolbars.get(toolbarElement.id);
    }
}
const toolbarItemsManager = new ToolbarItemsManager();
let ToolbarComponent = class ToolbarComponent extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.isLoading = true;
        this.isLayoutCalculated = false;
        this.model = null;
        this._keyboardNavigator = null;
        this.layoutModel = null;
        this.minWidth = null;
        this.reinitRequested = false;
        this.items = [];
        this.toolbarItemResizedHandler = this.resizeToolbarItem.bind(this);
        this.toolbarItemUpdatedHandler = this.updateToolbarItem.bind(this);
        this.toolbarItemVisibilityChangedHandler = this.toolbarItemVisibilityChanged.bind(this);
        this.toolbarItemOrderHandler = this.orderToolbarItem.bind(this);
        this.toolbarTitle = "";
        this.minRootItemCount = 0;
        this.collapseItemsToIcons = false;
        this.hideRootItems = false;
        this.itemSize = 0;
        this.renderMode = ToolbarRenderMode.Contained;
        this.itemSpacingMode = ToolbarItemSpacingMode.Default;
        // TODO: temporary
        this.ellipsisId = null;
        this.layoutUpdateService = null;
    }
    connectedCallback() {
        super.connectedCallback();
        toolbarItemsManager.addToolbar(this);
        this.addEventListener(ToolbarItemResizedEvent.eventName, this.toolbarItemResizedHandler);
        this.addEventListener(ToolbarItemUpdateEvent.eventName, this.toolbarItemUpdatedHandler);
        this.addEventListener(ToolbarItemVisibilityChangedEvent.eventName, this.toolbarItemVisibilityChangedHandler);
        this.addEventListener(ToolbarItemOrderedEvent.eventName, this.toolbarItemOrderHandler);
    }
    disconnectedCallback() {
        this.removeEventListener(ToolbarItemResizedEvent.eventName, this.toolbarItemResizedHandler);
        this.removeEventListener(ToolbarItemUpdateEvent.eventName, this.toolbarItemUpdatedHandler);
        this.removeEventListener(ToolbarItemVisibilityChangedEvent.eventName, this.toolbarItemVisibilityChangedHandler);
        this.removeEventListener(ToolbarItemOrderedEvent.eventName, this.toolbarItemOrderHandler);
        toolbarItemsManager.removeToolbar(this);
        super.disconnectedCallback();
    }
    updated(props) {
        var _a, _b, _c, _d;
        super.updated(props);
        if (props.has("ellipsisId")) {
            // TODO: temporary init here when ellipsis model is ready
            this.initializeToolbar(this.ellipsisId != null);
        }
        if (props.has("collapseItemsToIcons"))
            (_a = this.layoutUpdateService) === null || _a === void 0 ? void 0 : _a.updateCanCollapseToIcons(this.collapseItemsToIcons);
        if (props.has("hideRootItems"))
            (_b = this.layoutUpdateService) === null || _b === void 0 ? void 0 : _b.updateCanHideRootItems(this.hideRootItems);
        if (props.has("minRootItemCount")) {
            if (this.model)
                this.model.minRootItems = this.minRootItemCount;
            (_c = this.layoutUpdateService) === null || _c === void 0 ? void 0 : _c.updateMinRootItems(this.minRootItemCount);
        }
        if (props.has("renderMode"))
            (_d = this.layoutUpdateService) === null || _d === void 0 ? void 0 : _d.updateRenderMode(this.renderMode);
    }
    updateLayout() {
        var _a;
        (_a = this.layoutModel) === null || _a === void 0 ? void 0 : _a.updateLayout();
    }
    addItem(item) {
        var _a, _b, _c, _d;
        if (item.isEllipse)
            return;
        const modelItem = (_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.find(x => x.id === item.id);
        if (!modelItem && this.model) {
            const itemViewModel = this.initItem(item, true);
            const itemBlocks = this.getItemsBlocks(this.model, [itemViewModel]);
            (_c = this.layoutModel) === null || _c === void 0 ? void 0 : _c.addItemBlock(itemBlocks[0]);
        }
        if (item && !this.items.some(x => x.id === item.id)) {
            this.items.push(item);
            (_d = this.layoutUpdateService) === null || _d === void 0 ? void 0 : _d.addBlock(item);
        }
    }
    removeItem(item) {
        var _a, _b, _c, _d;
        const itemToRemove = (_a = this.model) === null || _a === void 0 ? void 0 : _a.items.find(x => x.id === item.id);
        if (itemToRemove && this.model) {
            const index = this.model.items.indexOf(itemToRemove);
            (_b = this.model) === null || _b === void 0 ? void 0 : _b.items.splice(index, 1);
            (_c = this.layoutModel) === null || _c === void 0 ? void 0 : _c.removeItemBlock(itemToRemove.id);
            (_d = this.layoutUpdateService) === null || _d === void 0 ? void 0 : _d.removeBlocks([itemToRemove.id]);
        }
    }
    resizeToolbarItem(e) {
        this.processToolbarItem(e.detail.size, e.detail.force);
    }
    updateToolbarItem(e) {
        this.processToolbarItem(e.detail.item);
    }
    toolbarItemVisibilityChanged(_e) {
        this.initializeKeyboardNavigator();
    }
    initializeKeyboardNavigator() {
        if (this._keyboardNavigator) {
            if (!this._keyboardNavigator.initialized)
                this._keyboardNavigator.initialize(this, new DxToolbarRootKeyboardStrategy(this._keyboardNavigator, this));
            else
                this._keyboardNavigator.reinitialize();
        }
    }
    orderToolbarItem(e) {
        var _a;
        const item = e.detail.item;
        const toolbarItem = this.items.find(x => x.id === item.id);
        if (toolbarItem) {
            toolbarItem.index = item.index;
            (_a = this.layoutUpdateService) === null || _a === void 0 ? void 0 : _a.orderBlock(item);
        }
    }
    processToolbarItem(size, force = false) {
        var _a;
        if (this.offsetHeight === 0)
            return;
        const currentItem = this.items.find(x => x.id === size.id);
        if (!currentItem || (currentItem.width === size.width && !force))
            return;
        currentItem.width = size.width;
        // fix for "ToolbarAdaptivityOnHideViaDisplayAttribute" test
        // layout recalculate for none-displayed toolbar
        if (window.getComputedStyle(this).display === "none")
            return;
        if (size.isEllipse)
            return;
        // TODO: force == true. Stable but not optimal
        (_a = this.layoutUpdateService) === null || _a === void 0 ? void 0 : _a.updateBlockSize(size, true);
    }
    initializeToolbar(reinit) {
        const options = {
            mainElement: this,
            canCollapseToIcons: this.collapseItemsToIcons,
            canHideRootItems: this.hideRootItems,
            minRootItems: this.minRootItemCount,
            title: this.toolbarTitle,
            items: this.items,
            itemSize: this.itemSize,
            renderMode: this.renderMode,
            itemSpacingMode: this.itemSpacingMode,
            adaptiveMenuModel: { id: this.ellipsisId },
        };
        if (reinit)
            this.reinit(options);
        else
            this.init(options);
    }
    initItem(toolbarItem, forceAdd = false) {
        const element = document.querySelector(getAdaptiveItemSelector(toolbarItem.id));
        const groupMap = this.model.groupMap;
        if (element)
            element.classList.remove(ToolbarCssClasses.ToolbarHiddenItem); // if element have been already existed and wasn't reset;
        const group = findParentBySelector(element, getSelector(groupSelectorString, this.dataset.dxtoolbarId));
        let groupViewModel = null;
        if (groupMap.has(group))
            groupViewModel = groupMap.get(group);
        if (!groupViewModel) {
            groupViewModel = new GroupViewModel(group, this.model);
            groupMap.set(group, groupViewModel);
        }
        const item = new ItemViewModel(element, this.model, groupViewModel);
        item.text.update(toolbarItem.text);
        item.groupName.update(toolbarItem.groupName);
        item.adaptivePriority.update(toolbarItem.adaptivePriority);
        item.iconCssClass.update(toolbarItem.iconCssClass);
        item.isDisplayed.update(toolbarItem.visible);
        // todo: item.itemsize
        item.index.update(toolbarItem.index);
        item.id = toolbarItem.id;
        this.model.itemMap.set(item.id, item);
        if (this.model.items.every(x => x.id !== item.id)) {
            groupViewModel.addItem(item);
            this.model.items.push(item);
        }
        return item;
    }
    init(options) {
        var _a;
        const mainElement = options.mainElement;
        if (!mainElement)
            return;
        this.isLayoutCalculated = false;
        const id = mainElement.dataset.dxtoolbarId;
        const titleSelector = getSelector(titleSelectorString, id);
        const ellipsisSelector = getSelector(ellipsisSelectorString, id);
        const ellipsis = document.querySelector(ellipsisSelector);
        const toolbarModel = this.model = new ToolbarViewModel(mainElement, id);
        const groupMap = toolbarModel.groupMap;
        Array.from(options.items).forEach(x => this.initItem(x));
        toolbarModel.canHideRootItems = options.canHideRootItems;
        toolbarModel.canCollapseToIcons = options.canCollapseToIcons;
        toolbarModel.minRootItems = options.minRootItems;
        toolbarModel.itemSize = options.itemSize;
        toolbarModel.renderMode = options.renderMode;
        toolbarModel.itemSpacing = options.itemSpacingMode;
        const blocks = new Collection([]);
        const titleViewModel = new TitleViewModel(toolbarModel, titleSelector);
        titleViewModel.text.update(options.title);
        toolbarModel.title = titleViewModel;
        // TODO: refactor block filling
        const titleElement = document.querySelector(titleSelector);
        blocks.add(new TitleBlock(toolbarModel, titleViewModel, (_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.id) !== null && _a !== void 0 ? _a : "-1"));
        const groups = Array.from(groupMap.values());
        const items = groups.some(x => x) ?
            groups.map(x => x.items).reduce((prev, current) => prev.concat(current)) : [];
        // this filter remove empty title block object from collection, refactor this
        blocks.addRange(this.getItemsBlocks(toolbarModel, items.filter(x => x.element)));
        const ellipsisVm = new EllipsisItemViewModel(ellipsis, toolbarModel);
        ellipsisVm.id = options.adaptiveMenuModel.id;
        blocks.add(new EllipsisBtnBlock(toolbarModel, ellipsisVm));
        toolbarModel.ellipsisViewModel = ellipsisVm;
        this._keyboardNavigator = [...this.children].filter(x => x.tagName.toLowerCase() === DxKeyboardNavigatorTagName)[0];
        this.initializeKeyboardNavigator();
        const contextItem = LayoutBlockUpdaters.contextItem(blocks);
        const layoutModel = this.layoutModel = new LayoutAdaptivityModel((layer) => {
            if (!this.isLayoutCalculated) {
                this.isLayoutCalculated = true;
                calculateStyles(() => {
                    this.updateToolbarHeight();
                    this.isLoading = false;
                });
            }
            const btnToolbar = toolbarModel.element.querySelector(btnToolbarSelector) || toolbarModel.element;
            if (layer.stateName.indexOf(ToolbarCssClasses.ToolbarNoItemText) > -1)
                dom.DomUtils.addClassName(btnToolbar, ToolbarCssClasses.ToolbarNoItemText);
            else
                dom.DomUtils.removeClassName(btnToolbar, ToolbarCssClasses.ToolbarNoItemText);
            dom.DomUtils.removeClassName(mainElement, ToolbarCssClasses.Loading);
            if (isRemovedFromDOM(mainElement))
                return;
            const noText = btnToolbar.classList.contains(ToolbarCssClasses.ToolbarNoItemText);
            const items = toolbarModel.items.concat(toolbarModel.ellipsisViewModel);
            const updateResult = items.map(x => {
                return { Id: x.id, IsVisible: x.isVisible.value, TextHidden: noText };
            });
            this.dispatchEvent(new ToolbarUpdateEvent(Array.from(updateResult)));
        });
        layoutModel.setDefaultLayer(function (block) {
            switch (block.getName()) {
                case "item": return LayoutBlockUpdaters.fullWidthItem;
                case "title": return LayoutBlockUpdaters.titleItem;
            }
            return LayoutBlockUpdaters.hiddenItem;
        }, true);
        layoutModel.setSequentialTransitionLayer(ToolbarCssClasses.ToolbarHasEllipsis, LayerType.FullSequential, function (block) {
            switch (block.getName()) {
                case "ellipsis": return LayoutBlockUpdaters.fullWidthSystemItem;
                case "item": return contextItem;
            }
        }, toolbarModel.canHideRootItems && (toolbarModel.minRootItems > 0 || !toolbarModel.canCollapseToIcons));
        layoutModel.setSimultaneousTransitionLayer(ToolbarCssClasses.ToolbarNoItemText, function (block) {
            switch (block.getName()) {
                case "item": return LayoutBlockUpdaters.noTextItem;
                case "ellipsis": return LayoutBlockUpdaters.hiddenItem;
            }
        }, toolbarModel.canCollapseToIcons);
        // todo: toolbar.CanCollapseToIcons as function
        layoutModel.setSequentialTransitionLayer(toolbarModel.canCollapseToIcons ? `${ToolbarCssClasses.ToolbarNoItemText} ${ToolbarCssClasses.ToolbarHasEllipsis}` : ToolbarCssClasses.ToolbarHasEllipsis, LayerType.NoTextSequential, function (block) {
            switch (block.getName()) {
                case "item": return contextItem;
                case "ellipsis": return LayoutBlockUpdaters.fullWidthSystemItem;
            }
        }, toolbarModel.canHideRootItems && toolbarModel.canCollapseToIcons);
        // TODO: temporary width init
        blocks.forEach(x => x._width = x.getWidth());
        layoutModel.initialize(blocks, toolbarModel.element.querySelector(btnToolbarSelector) || toolbarModel.element, (size) => {
            if (this.height !== size.height) {
                this.isLayoutCalculated = false;
                this.height = size.height;
            }
            this.checkUpdateMinWidth(toolbarModel);
        });
        // TODO: consider move it into settings update event
        layoutModel.toolbarWidthUpdate = () => this.checkUpdateMinWidth(toolbarModel);
        layoutModel.toolbarHeightUpdate = (height) => this.updateToolbarHeight();
        layoutModel.toolbarIsVisible = () => window.getComputedStyle(this).display !== "none" &&
            this.offsetWidth !== 0;
        // TODO: find another good place for it
        setTimeout(() => {
            const toolbarExists = document.querySelector(`#${this.id}`);
            if (!toolbarExists)
                return;
            this.layoutUpdateService = new LayoutUpdateService(layoutModel, {
                canCollapseToIcons: this.collapseItemsToIcons,
                canHideRootItems: this.hideRootItems,
                minRootItems: this.minRootItemCount,
                renderMode: this.renderMode,
            }, this.getAttribute(dataToolbarIdAttribute));
        });
    }
    reinit(options) {
        if (this.reinitRequested)
            return;
        this.reinitRequested = true;
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(() => {
            this.resetToDefault();
            this.disposeModel();
            // eslint-disable-next-line new-cap
            RequestAnimationFrame(() => {
                this.reinitRequested = false;
                this.init(options);
            });
        });
    }
    resetToDefault() {
        var _a;
        (_a = this.layoutModel) === null || _a === void 0 ? void 0 : _a.resetToDefault();
    }
    // TODO: rename this when it's done and delete old "updateSettings" method
    updateSettings() {
    }
    // TODO: will be deleted after refactoring
    oldUpdateSettings(options) {
        var _a, _b;
        if (!this.model)
            return;
        let shouldUpdate = false;
        let shouldReinit = false;
        if (this.model.canHideRootItems !== options.canHideRootItems) {
            this.model.canHideRootItems = options.canHideRootItems;
            shouldUpdate = true;
        }
        if (this.model.canCollapseToIcons !== options.canCollapseToIcons) {
            this.model.canCollapseToIcons = options.canCollapseToIcons;
            shouldUpdate = true;
        }
        if (this.model.minRootItems !== options.minRootItems) {
            this.model.minRootItems = options.minRootItems;
            shouldReinit = true;
        }
        if (this.model.itemSize !== options.itemSize) {
            this.model.itemSize = options.itemSize;
            shouldReinit = true;
        }
        if (this.model.renderMode !== options.renderMode) {
            this.model.renderMode = options.renderMode;
            shouldReinit = true;
        }
        if (this.model.itemSpacing !== options.itemSpacingMode) {
            this.model.itemSpacing = options.itemSpacingMode;
            shouldReinit = true;
        }
        (_a = this.model.title) === null || _a === void 0 ? void 0 : _a.text.update(options.title);
        if (!shouldReinit) {
            const nextIds = Array.from(options.items).map(x => x.id);
            const currentIds = Array.from(this.model.itemMap.values()).map(x => x.id);
            shouldReinit = !areEqual(nextIds, currentIds);
        }
        if (shouldReinit) {
            this.reinit(options);
            return;
        }
        Array.from(options.items).forEach((x) => {
            if (!this.model)
                return;
            const item = this.model.itemMap.get(x.id);
            if (item) {
                item.text.update(x.text);
                item.groupName.update(x.groupName);
                item.adaptivePriority.update(x.adaptivePriority);
                item.index.update(x.index);
                item.iconCssClass.update(x.iconCssClass);
                item.isDisplayed.update(x.visible);
                // todo: item.itemSize
            }
        });
        if (shouldUpdate)
            (_b = this.layoutModel) === null || _b === void 0 ? void 0 : _b.forceUpdate();
    }
    disposeModel() {
        var _a;
        (_a = this.layoutModel) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    dispose() {
        this.disposeModel();
    }
    getItemsBlocks(toolbar, items) {
        return items
            .reduce((result, item) => {
            if (result.group && result.group.tryAddItem(item))
                return result;
            if (item.groupName.value)
                return { group: result.blocks[result.blocks.length] = new GroupBlock(toolbar, item), blocks: result.blocks };
            return { group: null, blocks: result.blocks.concat([new ItemBlock(toolbar, item)]) };
        }, { blocks: [], group: null }).blocks
            .sort(function (a, b) { return a.item.adaptivePriority.value - b.item.adaptivePriority.value; })
            .map(function (b, i) {
            b.index = i;
            return b;
        });
    }
    updateToolbarHeight() {
        const btnToolbar = this.querySelector(btnToolbarSelector);
        const offsetHeight = !this.isLoading && btnToolbar ? btnToolbar.offsetHeight : this.offsetHeight;
        this.style.height = offsetHeight + "px";
    }
    checkUpdateMinWidth(toolbar) {
        var _a;
        const layoutMinWidth = (_a = this.layoutModel) === null || _a === void 0 ? void 0 : _a.getMinWidth();
        if (!layoutMinWidth || this.minWidth === layoutMinWidth)
            return;
        this.minWidth = layoutMinWidth;
        toolbar.element.style.minWidth = layoutMinWidth + "px";
    }
};
__decorate([
    t()
], ToolbarComponent.prototype, "layoutModel", void 0);
__decorate([
    t()
], ToolbarComponent.prototype, "items", void 0);
__decorate([
    n({ type: String, attribute: "toolbar-title" })
], ToolbarComponent.prototype, "toolbarTitle", void 0);
__decorate([
    n({ type: Number, attribute: "min-root-item-count" })
], ToolbarComponent.prototype, "minRootItemCount", void 0);
__decorate([
    n({ type: Boolean, attribute: "auto-collapse-items-to-icons" })
], ToolbarComponent.prototype, "collapseItemsToIcons", void 0);
__decorate([
    n({ type: Boolean, attribute: "auto-hide-root-items" })
], ToolbarComponent.prototype, "hideRootItems", void 0);
__decorate([
    n({ type: Number, attribute: "item-size" })
], ToolbarComponent.prototype, "itemSize", void 0);
__decorate([
    n({ type: ToolbarRenderMode, attribute: "render-mode" })
], ToolbarComponent.prototype, "renderMode", void 0);
__decorate([
    n({ type: ToolbarItemSpacingMode, attribute: "item-spacing-mode" })
], ToolbarComponent.prototype, "itemSpacingMode", void 0);
__decorate([
    n({ type: String, attribute: "ellipsis-id" })
], ToolbarComponent.prototype, "ellipsisId", void 0);
ToolbarComponent = __decorate([
    e(ToolbarCssClasses.Toolbar)
], ToolbarComponent);
const toolbarMap = new Map();
const toolbarItemResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const toolbarItem = entry.target;
        if (toolbarItem)
            toolbarItem.updateSize();
    }
});
let ToolbarItem = class ToolbarItem extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.text = "";
        this.groupName = "";
        this.adaptivePriority = 0;
        this.iconCssClass = "";
        this.visible = false;
        this.index = 0;
        this.justHidden = false;
    }
    get isEllipse() {
        return this.classList.contains(ToolbarCssClasses.ButtonEllipsis);
    }
    get isTitle() {
        return this.classList.contains(ToolbarCssClasses.ToolbarTitle);
    }
    get isPlaceholder() {
        return this.classList.contains(ToolbarCssClasses.ToolbarPlaceholder);
    }
    get isHidden() {
        return this.style.display === "none";
    }
    update(props) {
        if (this.isInRibbon)
            return;
        if (props.has("text"))
            this.updateSize(true);
        if (props.has("visible"))
            this.dispatchEvent(new ToolbarItemVisibilityChangedEvent(this.visible));
        if (props.has("index"))
            this.itemOrdered();
        super.update(props);
    }
    updateSize(force = false) {
        if (this.isHidden && !this.justHidden) {
            this.justHidden = true;
            if (!force)
                return;
        }
        if (!this.isHidden && this.justHidden) {
            this.justHidden = false;
            return;
        }
        this.dispatchEvent(new ToolbarItemResizedEvent({
            id: this.id,
            width: this.offsetWidth,
            isTitle: this.isTitle,
            isEllipse: this.isEllipse,
            isHidden: this.isHidden,
        }, force));
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.isInRibbon)
            return;
        toolbarItemsManager.addToolbarItem(this.toolbarItem);
        if (!this.isEllipse && !this.isPlaceholder)
            toolbarItemResizeObserver.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.isInRibbon)
            return;
        toolbarItemsManager.removeToolbarItem(this.toolbarItem);
        if (!this.isEllipse && !this.isPlaceholder)
            toolbarItemResizeObserver.unobserve(this);
    }
    itemOrdered() {
        if (this.index > -1)
            this.dispatchEvent(new ToolbarItemOrderedEvent(this.toolbarItem));
    }
    get toolbarItem() {
        return {
            id: this.id,
            groupName: this.groupName,
            text: this.text,
            adaptivePriority: this.adaptivePriority,
            iconCssClass: this.iconCssClass,
            visible: this.visible,
            index: this.index,
            width: this.offsetWidth,
            isEllipse: this.isEllipse,
            isTitle: this.isTitle
        };
    }
    get isInRibbon() {
        return this.closest(RibbonCssClasses.Ribbon) !== null;
    }
};
__decorate([
    n({ type: String, attribute: "text" })
], ToolbarItem.prototype, "text", void 0);
__decorate([
    n({ type: String, attribute: "group-name" })
], ToolbarItem.prototype, "groupName", void 0);
__decorate([
    n({ type: Number, attribute: "adaptive-priority" })
], ToolbarItem.prototype, "adaptivePriority", void 0);
__decorate([
    n({ type: String, attribute: "icon-css-class" })
], ToolbarItem.prototype, "iconCssClass", void 0);
__decorate([
    n({ type: Boolean, attribute: "visible" })
], ToolbarItem.prototype, "visible", void 0);
__decorate([
    n({ type: Number, attribute: "index" })
], ToolbarItem.prototype, "index", void 0);
ToolbarItem = __decorate([
    e(ToolbarCssClasses.ToolbarItem)
], ToolbarItem);
// works like loadModule()
function init(mainElement, options) {
    return Promise.resolve("ok");
}
function dispose(mainElement) {
    mainElement = ensureElement(mainElement);
    disposeCore(mainElement, toolbarMap);
    Array.from(toolbarMap.keys()).forEach(x => {
        if (isRemovedFromDOM(x))
            disposeCore(x, toolbarMap);
    });
    return Promise.resolve("ok");
    function disposeCore(key, map) {
        if (!key)
            return;
        const elementToFocus = (key.querySelector(btnToolbarSelector));
        if (elementToFocus)
            disposeEvents(elementToFocus);
        const value = map.get(key);
        value === null || value === void 0 ? void 0 : value.dispose();
        map.delete(key);
    }
}
customElements.define("dxbl-toolbar-menu-item", DxToolbarMenuItem);
const ToolbarModule = { init, fakeInit: () => { }, dispose };

export { ToolbarComponent, ToolbarItem, ToolbarModule as default, dispose, init };
//# sourceMappingURL=toolbar-24.2.js.map
