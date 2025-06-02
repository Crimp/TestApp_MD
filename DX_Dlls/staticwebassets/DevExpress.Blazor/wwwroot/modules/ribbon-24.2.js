import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { K as getElementOffsetWidth, h as getLeftRightBordersAndPaddingsSummaryValue, k as getLeftRightMargins, M as getHorizontalBordersWidth, i as isRemovedFromDOM, R as RequestAnimationFrame, d as subscribeElementContentSize, u as unsubscribeElement } from './dom-utils-24.2.js';
import { d as disposeEvents } from './disposable-24.2.js';
import { U as Utils } from './ribbon-utils-24.2.js';
import { initFocusHidingEvents } from './focus-utils-24.2.js';
import { T as ToolbarCssClasses } from './toolbar-css-classes-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import ToolbarModule from './toolbar-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { D as DxToolbarRootKeyboardStrategy } from './constants-24.26.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './key-24.2.js';
import './constants-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './dx-dropdown-owner-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './lit-element-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
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
import './observables-24.2.js';
import './constants-24.25.js';
import './constants-24.23.js';
import './events-24.23.js';
import './state-24.2.js';
import './menu-keyboard-strategy-24.2.js';
import './constants-24.24.js';
import './modal-keyboard-strategy-24.2.js';
import './dropdown-menu-keyboard-strategy-24.2.js';

class LayoutEntity {
    constructor(owner) {
        this.container = null;
        this.owner = owner;
    }
    querySelectorAll(selector) {
        var _a;
        return this.querySelectorAllInternal(selector || ("#" + ((_a = this.getContainer()) === null || _a === void 0 ? void 0 : _a.id)));
    }
    toggleClassName(el, className, condition) {
        return this.owner ? this.owner.toggleClassName(el, className, condition) : this.toggleClassNameInternal(el, className, condition);
    }
    toggleClassNameInternal(_el, _className, _condition) {
    }
    querySelectorAllInternal(selector) {
        return this.owner ? this.owner.querySelectorAll(selector) : this.getNodes(selector);
    }
    getNodes(selector) {
        const htmlElement = this.container;
        let result = htmlElement.querySelectorAll(selector);
        if (!result.length) {
            selector = "#" + htmlElement.id + selector;
            if (htmlElement.parentNode)
                result = htmlElement.parentNode.querySelectorAll(selector);
        }
        return result;
    }
    getContainer() {
        return this.owner ? this.owner.getContainer() : this.container;
    }
    getBoxSize(el) {
        return Math.ceil(getElementOffsetWidth(el)) + this.getBoxOuterOffset(el);
    }
    getBoxInnerOffset(el) {
        return getLeftRightBordersAndPaddingsSummaryValue(el);
    }
    getBoxOuterOffset(el) {
        return getLeftRightMargins(el);
    }
    getBoxOffset(el) {
        return this.getBoxOuterOffset(el) + this.getBoxInnerOffset(el);
    }
    getNodeWidth(node, skipMargins = false) {
        const htmlElement = node;
        if (!htmlElement)
            return 0;
        return Math.ceil(htmlElement.offsetWidth + (skipMargins ? 0 : this.getBoxOuterOffset(htmlElement))) + getHorizontalBordersWidth(htmlElement);
    }
    dispose() {
    }
    setActive(_isActive) {
    }
    // eslint-disable-next-line
    createLayoutEntity(type, ...args) {
        return this.owner !== null ? this.owner.createLayoutEntity(type, ...args) : this.createLayoutEntityCore(type, ...args);
    }
    createLayoutEntityCore(type, ...args) {
        const t = this.resolveLayoutEntityType(type);
        // eslint-disable-next-line new-cap
        return new t(...args);
    }
    // eslint-disable-next-line
    resolveLayoutEntityType(t) {
        return t;
    }
}

const LayoutAnimationDuration = 500;
ToolbarModule.fakeInit();
const btnToolbarSelector = `.${ToolbarCssClasses.ButtonToolbar}`;
const btnEllipsisSelector = `.${ToolbarCssClasses.ButtonEllipsis}`;
const ribbonToolbarLoadedAttribute = "data-dx-ribbon-toolbar-loaded";
class OneLineLayoutBlock extends LayoutEntity {
    constructor(owner, group, element) {
        super(owner);
        this.nextBlock = null;
        this.prevBlock = null;
        this.ribbonOwner = owner;
        this.group = group;
        this.element = element;
        this.width = 0;
        this.isActiveValue = null;
        this.index = group.blocks.length;
        this.nextBlock = null;
        this.prevBlock = element.layoutBlockObj || null;
        this._element = element;
        this._element.layoutBlockObj = this._element.layoutBlockObj ? this._element.layoutBlockObj.nextBlock = this : this;
        this._element.onHide = () => {
            this.toggleClassName(this.element, ToolbarCssClasses.ToolbarHiddenItem, true);
        };
        this._element.onShow = () => {
            this.toggleClassName(this.element, ToolbarCssClasses.ToolbarHiddenItem, false);
        };
    }
    dispose() {
        delete this._element.onHide;
        delete this._element.onShow;
        this.ribbonOwner = null;
        super.dispose();
    }
    afterCreate(groupsCollection) {
        delete this._element.layoutBlockObj;
        groupsCollection.maxWidth += this.width;
        groupsCollection.minWidth += this.getMinWidth();
        if (this.width === 0)
            this.raiseVisibilityChange(false);
    }
    setActive(active) {
        if (this.isActiveValue === active)
            return;
        this.isActiveValue = active;
        this.group.activeBlock = active ? this : null;
        this.group.groupsCollection.lastGroup = this.group;
        if (this.group.state.prevState)
            this.toggleClassName(this.group.element.parentNode, this.group.state.prevState.name, this.isActiveValue);
        this.toggleClassName(this.element, this.group.state.name, this.isActiveValue);
        this.toggleClassName(this.group.element, this.group.state.name, this.isActiveValue);
    }
    raiseVisibilityChange(isVisible) {
        var _a, _b;
        const callback = isVisible ? this._element.onShow : this._element.onHide;
        if (callback)
            (_a = this.owner) === null || _a === void 0 ? void 0 : _a.domChanges.push(callback);
        (_b = this.ribbonOwner) === null || _b === void 0 ? void 0 : _b.toggleVisibility(this.element, isVisible);
    }
    getMinWidth() {
        return this.nextBlock ? this.nextBlock.getMinWidth() : this.width;
    }
    getNextBlock(step) {
        let group = this.group;
        let block = group.blocks[this.index - step];
        if (!block && (group = group.groupsCollection.blockGroups[group.totalIndex + step]))
            block = group.blocks[Math.pow(group.blocks.length, step > 0 ? 1 : 0) - 1];
        return block;
    }
}
class LayoutState extends LayoutEntity {
    constructor(owner, buffer, name, prevState) {
        super(owner);
        this.builders = buffer || [];
        this.name = name;
        this.index = prevState ? prevState.index + 1 : 0;
        this.prevState = prevState;
        this.nextState = null;
        if (prevState)
            prevState.nextState = this;
    }
    for(selectorOrFunc) {
        return this.builders[this.builders.length] = this.createLayoutEntity(OneLineLayoutBreakPointBuilder, this.owner, this.name, selectorOrFunc);
    }
}
class OneLineLayoutBlockGroup extends LayoutEntity {
    constructor(owner, groupsCollection, element, state, domIndex) {
        super(owner);
        this.groupsCollection = groupsCollection;
        this.state = state;
        this.element = element;
        this.elementOffset = this.getBoxOffset(element) + this.getMarginLeftOffset(element);
        this.blocks = [];
        this.activeBlock = null;
        this.fullWidth = this.elementOffset;
        this.isSmallest = !state.nextState;
        this.isLargest = !state.prevState;
        this.domIndex = domIndex;
        this.totalIndex = this.groupsCollection.blockGroups.length;
        this.createBlocks(state.builders);
        const _element = element;
        if (!!state.prevState && (this.isSmallest || (_element.layoutBlockGroupObj.isSmallest = this.blocks.length === 0)))
            delete _element.layoutBlockGroupObj;
        else
            _element.layoutBlockGroupObj = this;
    }
    dispose() {
        for (let i = 0; i < this.blocks.length; i++)
            this.blocks[i].dispose();
        super.dispose();
    }
    afterCreate(groupsCollection) {
        this.blocks.forEach(function (b) {
            b.afterCreate(groupsCollection);
        });
        groupsCollection.groupsOffset += this.elementOffset;
        groupsCollection.groupBlocksLengthLookup[this.domIndex] = this.blocks.length;
        groupsCollection.lastGroup = this;
    }
    setActive(isActive) {
        let index = 0;
        if (!this.isSmallest && this.isLargest)
            index = this.blocks.length - 1;
        this.blocks[index].setActive(isActive);
    }
    createBlocks(builders) {
        for (let i = 0; i < builders.length; i++) {
            const builder = builders[i];
            const blockElements = builder.findBlockElements(this.element);
            for (let j = 0; j < blockElements.length; j++) {
                const block = this.createLayoutEntity(OneLineLayoutBlock, this.owner, this, blockElements[j]);
                this.fullWidth += block.width = builder.getBlockWidth(block);
                this.blocks.push(block);
            }
        }
        if (this.isLargest)
            this.setActive(true);
    }
    calculateWidth(block) {
        return this !== block.group ? this.fullWidth : this.getActualBlocks(block).reduce(function (r, b) {
            return r + b.width;
        }, this.elementOffset);
    }
    getActualBlocks(block) {
        return this.blocks.map(function (b) {
            return b.prevBlock && b.index < block.index ? b.prevBlock : b;
        }.bind(this));
    }
    getBeforeOffset(node) {
        const beforeStyle = window.getComputedStyle(node, ":before");
        return dom.DomUtils.pxToInt(beforeStyle.width) + dom.DomUtils.pxToInt(beforeStyle.marginRight);
    }
    getMarginLeftOffset(node) {
        const style = window.getComputedStyle(node);
        return dom.DomUtils.pxToInt(style.marginLeft);
    }
}
class OneLineLayoutBlockGroupCollection extends LayoutEntity {
    constructor(owner, groupsContainer, selector) {
        super(owner);
        this.ribbonOwner = owner;
        this.groupsContainer = groupsContainer;
        this.testElement = typeof selector === "function" ? selector : function (el) {
            return Utils.elementMatchesSelector(el, selector);
        };
        this.blockGroups = [];
        this.states = [];
        this.width = 0;
        this.groupsOffset = 0;
        this.maxWidth = 0;
        this.minWidth = 0;
        this.groupElementsCount = 0;
        this.currentLayoutElements = [];
        this.lastGroup = null;
        this.selector = selector;
        this.groupLookupMap = {};
        this.groupBlocksLengthLookup = {};
    }
    createBlockGroup(groupElement, state, domIndex) {
        let blockGroup = this.createLayoutEntity(OneLineLayoutBlockGroup, this.owner, this, groupElement, state, domIndex);
        if (blockGroup)
            blockGroup = blockGroup.blocks.length > 0 ? this.blockGroups[this.blockGroups.length] = blockGroup : null;
        if (blockGroup)
            (this.groupLookupMap[domIndex] || (this.groupLookupMap[domIndex] = [])).splice(0, 0, blockGroup.totalIndex);
        return blockGroup;
    }
    createBlockGroups() {
        var _a;
        const groupElements = (_a = this.ribbonOwner) === null || _a === void 0 ? void 0 : _a.getGroupElements(this.groupsContainer, this.selector);
        if (!groupElements)
            return;
        this.groupElementsCount = groupElements.length;
        for (let i = 0; i < this.states.length; i++) {
            for (let j = this.groupElementsCount - 1; j >= 0; j--) {
                const el = groupElements[j];
                if (el && (!this.testElement(el) || !this.createBlockGroup(el, this.states[i], j)))
                    groupElements[j] = null;
            }
        }
        this.states = [];
        for (let i = 0; i < this.blockGroups.length; i++) {
            if (!this.blockGroups[i].isLargest)
                break;
            this.blockGroups[i].afterCreate(this);
        }
        this.minWidth += this.groupsOffset;
        this.maxWidth += this.groupsOffset;
        this.width = this.maxWidth;
        this.currentLayoutElements = this.findActiveBlocks();
    }
    defineState(stateName, initializeStateFunc) {
        const layoutState = this.createLayoutEntity(LayoutState, this.owner, [], stateName, this.states[this.states.length - 1] || null);
        this.states.push(layoutState);
        initializeStateFunc(layoutState);
    }
    initialize() {
    }
    applyLayout(layoutElements) {
        if (this.currentLayoutElements) {
            this.currentLayoutElements.forEach(function (le) {
                le.setActive(false);
            });
        }
        this.currentLayoutElements = layoutElements;
        this.currentLayoutElements.forEach(function (le) {
            le.setActive(true);
        });
        this.detectBlockItemVisibilityChanges();
    }
    adjust(width) {
        if (width === this.width || width <= this.minWidth && this.width === this.minWidth || width >= this.maxWidth && this.width === this.maxWidth)
            return;
        const oldWidth = this.width;
        this.width = Math.max(this.minWidth, Math.min(this.maxWidth, width));
        if (this.width === this.maxWidth) {
            return this.applyLayout(this.blockGroups.filter(function (g) {
                return g.isLargest;
            }));
        }
        else if (this.width === this.minWidth) {
            return this.applyLayout(this.blockGroups.filter(function (g) {
                return g.isSmallest;
            }));
        }
        const delta = oldWidth - this.width;
        const sign = delta / Math.abs(delta);
        const activeBlocks = this.findActiveBlocks();
        let block = activeBlocks ? activeBlocks[0] : null;
        let prevBlock = block;
        const currentBlock = block;
        while (block) {
            width = this.calculateWidth(block);
            if (sign > 0 && width <= this.width || sign < 0 && width >= this.width) {
                const blockToApply = sign < 0 ? prevBlock : block;
                if (blockToApply !== currentBlock && blockToApply !== null)
                    this.applyLayout([blockToApply]);
                break;
            }
            prevBlock = block;
            block = block.getNextBlock(sign);
        }
    }
    detectBlockItemVisibilityChanges() {
        const actualGroups = this.findActualBlockGroups();
        for (let i = 0; i < actualGroups.length; i++) {
            const group = actualGroups[i];
            let afterActiveBlock = false;
            for (let j = 0; j < group.blocks.length; j++) {
                let block = group.blocks[j];
                if (group === this.lastGroup && !(afterActiveBlock = (afterActiveBlock || block.isActiveValue)))
                    block = block.prevBlock || block;
                block.raiseVisibilityChange(block.width > 0);
            }
        }
    }
    calculateWidth(block) {
        if (!block) {
            const activeBlocks = this.findActiveBlocks();
            if (activeBlocks)
                block = activeBlocks[0];
        }
        const groups = this.findActualBlockGroups(block.group);
        return groups.reduce(function (w, g) {
            return w + g.calculateWidth(block);
        }, 0);
    }
    findActualBlockGroups(activeGroup = null) {
        activeGroup = activeGroup || this.lastGroup;
        const groups = [];
        if (!activeGroup)
            return groups;
        for (let i = 0; i < this.groupElementsCount; i++) {
            const groupIndices = this.groupLookupMap[i];
            for (let j = 0; j < groupIndices.length; j++) {
                const group = this.blockGroups[groupIndices[j]];
                if (i < activeGroup.domIndex ? group.state.index < activeGroup.state.index : group.state.index <= activeGroup.state.index) {
                    groups.push(group);
                    break;
                }
            }
        }
        return groups;
    }
    findActiveBlocks() {
        return this.lastGroup ? this.lastGroup.blocks.filter(function (b) {
            return b.isActiveValue;
        }) : null;
    }
    dispose() {
        for (let i = 0; i < this.blockGroups.length; i++)
            this.blockGroups[i].dispose();
        this.blockGroups = [];
        super.dispose();
    }
}
class OneLineLayoutBreakPointBuilder extends LayoutEntity {
    constructor(owner, name, selectorOrFunc) {
        super(owner);
        this.name = name;
        this.selectorOrFunc = selectorOrFunc;
        this.prepareBlockFunc = null;
    }
    getBlockWidth(block) {
        return this.prepareBlockFunc ? this.prepareBlockFunc(block) : 0;
    }
    findBlockElements(container) {
        const elements = Utils.getChildElementNodesByPredicate(container, (n) => {
            return Utils.elementMatchesSelector(n, this.selectorOrFunc);
        });
        return elements !== null && elements !== void 0 ? elements : [];
    }
    setPrepareFunc(func) {
        this.prepareBlockFunc = func;
        return this;
    }
    setWidth() {
        return this.setPrepareFunc((block) => {
            return this.getBoxSize(block.element);
        });
    }
    setHidden() {
        return this.setPrepareFunc(function (_block) {
            return 0;
        });
    }
    setOnlyImageWidth() {
        return this.setPrepareFunc((block) => {
            let width = this.getBoxSize(block.element);
            let imageElement = Utils.getChildByClassName(block.element, `${CssClasses.Image}:not(.${ToolbarCssClasses.AdaptivePreviewImage})`);
            if (!imageElement)
                imageElement = Utils.getChildByClassName(Utils.getChildByClassName(block.element, ToolbarCssClasses.DropDownToggle), `${CssClasses.Image}:not(.${ToolbarCssClasses.AdaptivePreviewImage})`);
            let previewImageElement = Utils.getChildByClassName(block.element, ToolbarCssClasses.AdaptivePreviewImage);
            if (!previewImageElement)
                previewImageElement = Utils.getChildByClassName(Utils.getChildByClassName(block.element, ToolbarCssClasses.DropDownToggle), ToolbarCssClasses.AdaptivePreviewImage);
            if (imageElement) {
                width = this.getBoxSize(imageElement) - this.getBoxOuterOffset(imageElement);
                if (previewImageElement) {
                    const previewImageWidth = this.getBoxSize(previewImageElement) - this.getBoxOuterOffset(previewImageElement);
                    width = Math.max(width, previewImageWidth);
                }
                let offset = this.getBoxOffset(block.element);
                let parent = imageElement.parentNode;
                while (parent !== block.element) {
                    offset += this.getBoxOffset(parent);
                    parent = parent.parentNode;
                }
                return width + offset;
            }
            return width;
        });
    }
    setNoTextWidth() {
        return this.setPrepareFunc((block) => {
            let width = this.getBoxSize(block.element);
            if (Utils.getChildByClassName(block.element, ToolbarCssClasses.ToolbarEdit))
                return width;
            const innerElement = Utils.getChildByClassName(block.element, ToolbarCssClasses.ToolbarItem);
            if (Utils.getChildByClassName(innerElement, ToolbarCssClasses.ToolbarEdit))
                return width;
            const imageElement = this.findImageElement(block.element);
            if (imageElement) {
                const textElement = imageElement.nextElementSibling;
                if (textElement) {
                    width -= this.getBoxSize(textElement);
                    width -= this.getBoxOuterOffset(imageElement);
                }
            }
            return width;
        });
    }
    findImageElement(element) {
        var _a;
        let imageElement = Utils.getChildByClassName(element, CssClasses.Image);
        if (!imageElement)
            imageElement = Utils.getChildByClassName(Utils.getChildByClassName(element, CssClasses.Button), CssClasses.Image);
        if (!imageElement && ((_a = element === null || element === void 0 ? void 0 : element.classList) === null || _a === void 0 ? void 0 : _a.contains(ToolbarCssClasses.ToolbarItem))) {
            const innerElement = Utils.getChildByClassName(element, ToolbarCssClasses.ToolbarItem);
            return this.findImageElement(innerElement);
        }
        return imageElement;
    }
}
class OneLineLayoutBreakpointsBuilder extends LayoutEntity {
    constructor(control) {
        super(null);
        this.clientStateMap = new Map();
        this.dotNetReference = control.dotNetReference;
        this.container = control.getMainElement();
        this.containerOffsets = this.calculateContainerOffsets();
        this.blockGroupsArray = [];
        this.isReady = false;
        this.classesToApply = [];
        this.domChanges = [];
        this.nextAdjustGroupWidth = null;
    }
    getClientState(el) {
        const isAdaptive = el.getAttribute("dxbl-toolbar-adaptive-item");
        if (isAdaptive === null)
            return null;
        const id = el.id;
        if (!id)
            return null;
        let state = this.clientStateMap.get(id);
        if (!state) {
            state = { id: id };
            this.clientStateMap.set(id, state);
        }
        return state;
    }
    toggleClassNameInternal(el, className, condition) {
        this.getBatchCssUpdateCache(el)[className] = condition;
        const state = this.getClientState(el);
        if (state)
            state[className] = condition;
    }
    getBatchCssUpdateCache(el) {
        let cache = el._layoutBuilderCache;
        if (!cache) {
            cache = el._layoutBuilderCache = {};
            this.classesToApply.push(this.createBatchCssUpdateDelegate(el));
        }
        return cache;
    }
    createBatchCssUpdateDelegate(el) {
        return function () {
            const cache = el._layoutBuilderCache;
            if (!cache)
                return;
            delete el._layoutBuilderCache;
            for (const k in cache) {
                if (Object.prototype.hasOwnProperty.call(cache, k))
                    dom.DomUtils.toggleClassName(el, k, cache[k]);
            }
        };
    }
    createBlockGroupsCore(selectorOrFunc, groupSelectorOrFunc, prepareFunc) {
        const result = [];
        const containers = this.querySelectorAll(selectorOrFunc);
        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            const blockGroupCollection = this.createLayoutEntity(OneLineLayoutBlockGroupCollection, this, container, groupSelectorOrFunc);
            this.blockGroupsArray.push(blockGroupCollection);
            if (prepareFunc)
                prepareFunc(blockGroupCollection);
            blockGroupCollection.createBlockGroups();
            result.push(blockGroupCollection);
        }
        this.nextAdjustGroupWidth = this.getGroupsWidth();
        return result;
    }
    initialize() {
        for (let i = 0; i < this.blockGroupsArray.length; i++)
            this.blockGroupsArray[i].initialize();
        this.isReady = true;
        this.adjust();
    }
    adjust(beforeUpdate = null) {
        if (this.isReady) {
            const prevCssChanges = this.classesToApply;
            const prevDomChanges = this.domChanges;
            let cssChanges = this.classesToApply = [];
            let domChanges = this.domChanges = [];
            const prevState = this.clientStateMap;
            let w;
            if (this.nextAdjustGroupWidth !== null) {
                w = this.nextAdjustGroupWidth;
                this.nextAdjustGroupWidth = null;
            }
            else
                w = this.getGroupsWidth();
            for (let i = 0; i < this.blockGroupsArray.length; i++)
                this.blockGroupsArray[i].adjust(w);
            if (beforeUpdate)
                beforeUpdate();
            cssChanges = prevCssChanges.concat(cssChanges);
            domChanges = prevDomChanges.concat(domChanges);
            const stateMap = Array.from(prevState.values()).concat(Array.from(this.clientStateMap.values()));
            this.queueUpdates(() => {
                while (cssChanges.length) {
                    const t = cssChanges.shift();
                    if (t)
                        t();
                }
                this.queueUpdates(() => {
                    while (domChanges.length) {
                        const t = domChanges.shift();
                        if (t)
                            t();
                    }
                    if (stateMap.length) {
                        this.dotNetReference.invokeMethodAsync("OnModelUpdated", stateMap)
                            .catch((e) => {
                            if (!isRemovedFromDOM(this.container))
                                console.error(e);
                        });
                    }
                });
            });
        }
    }
    toggleVisibility(element, isVisible) {
        const state = this.getClientState(element);
        if (state)
            state.isVisible = isVisible;
    }
    queueUpdates(callback) {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(callback);
    }
    getGroupsWidth() {
        const container = this.getContainer();
        if (!container)
            return 0;
        return container.offsetWidth - this.containerOffsets;
    }
    dispose() {
        this.containerOffsets = this.calculateContainerOffsets();
        for (let i = 0; i < this.blockGroupsArray.length; i++)
            this.blockGroupsArray[i].dispose();
        this.blockGroupsArray = [];
        this.classesToApply = [];
        this.isReady = false;
        super.dispose();
    }
    getGroupElements(groupsContainer, selector) {
        return Utils.getChildElementNodesByPredicate(groupsContainer, function (el) {
            return Utils.elementMatchesSelector(el, selector);
        });
    }
    createBlockGroups() {
        this.createBlockGroupsCore(`.${ToolbarCssClasses.Toolbar} > ${btnToolbarSelector}`, `.${ToolbarCssClasses.ToolbarGroup}`, function (blockGroups) {
            blockGroups.defineState(ToolbarCssClasses.AdaptiveItem, function (state) {
                state.for(`:not(${btnEllipsisSelector})`).setWidth();
                state.for(btnEllipsisSelector).setHidden();
            });
            blockGroups.defineState(ToolbarCssClasses.AdaptiveItemTextHidden, function (state) {
                state.for(`:not(${btnEllipsisSelector})`).setNoTextWidth();
                state.for(btnEllipsisSelector).setHidden();
            });
            blockGroups.defineState(ToolbarCssClasses.AdaptiveItemHidden, function (state) {
                state.for(`:only-child:not(${btnEllipsisSelector})`).setWidth();
                state.for(`:not(:only-child):not(${btnEllipsisSelector})`).setHidden();
                state.for(btnEllipsisSelector).setWidth();
            });
            blockGroups.defineState(ToolbarCssClasses.AdaptiveItemAllHidden, function (state) {
                state.for(`:only-child:not(${btnEllipsisSelector})`).setNoTextWidth();
                state.for(`:not(:only-child):not(${btnEllipsisSelector})`).setHidden();
                state.for(btnEllipsisSelector).setNoTextWidth();
            });
        });
    }
    calculateContainerOffsets() {
        var _a;
        if (!this.container)
            return 0;
        let result = this.getBoxInnerOffset(this.container);
        let offsetEl = (_a = this.container.querySelector(".dxbl-toolbar")) !== null && _a !== void 0 ? _a : this.container;
        while (offsetEl !== this.container) {
            if (!offsetEl)
                break;
            result += this.getBoxOffset(offsetEl);
            offsetEl = offsetEl.parentNode;
        }
        return result;
    }
}
class OneLineRibbon {
    constructor(mainElement, dotNetRef) {
        this.currentWidth = null;
        this.currentHeight = null;
        this.elementContentWidthSubscription = null;
        this.mainElement = mainElement;
        this.layoutBreakPoints = null;
        this.dotNetReference = dotNetRef;
    }
    getMainElement() {
        return this.mainElement;
    }
    initialize() {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame((() => {
            this.buildLayout();
        }));
        // eslint-disable-next-line new-cap
        RequestAnimationFrame(() => {
            this.adjustLayout();
        });
        this.elementContentWidthSubscription = subscribeElementContentSize(this.getMainElement(), (size) => {
            if (this.currentWidth !== size.width || this.currentHeight !== size.height) {
                this.currentWidth = size.width;
                this.currentHeight = size.height;
                this.onBrowserWindowResize();
            }
        });
    }
    applyLayoutStateAppearance() {
        var _a;
        dom.DomUtils.addClassName(this.getMainElement(), ToolbarCssClasses.Loaded);
        (_a = this.layoutBreakPoints) === null || _a === void 0 ? void 0 : _a.initialize();
        setTimeout(() => {
            dom.DomUtils.removeClassName(this.getMainElement(), ToolbarCssClasses.Loading);
        }, LayoutAnimationDuration);
    }
    onBrowserWindowResize() {
        if (this.layoutBreakPoints)
            this.layoutBreakPoints.adjust();
    }
    update() {
        if (this.layoutBreakPoints)
            this.layoutBreakPoints.adjust();
    }
    dispose() {
        if (this.elementContentWidthSubscription)
            unsubscribeElement(this.elementContentWidthSubscription);
        if (this.layoutBreakPoints)
            this.layoutBreakPoints.dispose();
    }
    buildLayout() {
        this.layoutBreakPoints = this.layoutBreakPoints || new OneLineLayoutBreakpointsBuilder(this);
        this.layoutBreakPoints.createBlockGroups();
    }
    adjustLayout() {
        var _a;
        this.applyLayoutStateAppearance();
        (_a = this.layoutBreakPoints) === null || _a === void 0 ? void 0 : _a.adjust();
    }
}
let RibbonInternalComponent = class RibbonInternalComponent extends SingleSlotElementBase {
    constructor() {
        super();
        this._keyboardNavigator = null;
        this.loading = false;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("loading") && !this.loading)
            this.initializeNavigator();
    }
    initializeNavigator() {
        if (!this._keyboardNavigator)
            this._keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (!this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new DxToolbarRootKeyboardStrategy(this._keyboardNavigator, this));
    }
};
__decorate([
    n({ type: Boolean, attribute: "loading" })
], RibbonInternalComponent.prototype, "loading", void 0);
RibbonInternalComponent = __decorate([
    e("dxbl-ribbon-internal")
], RibbonInternalComponent);
const ribbonMap = new Map();
function init(mainElement, options, dotNetRef) {
    if (!mainElement)
        return Promise.reject("failed");
    let ribbon = ribbonMap.get(mainElement);
    if (ribbon)
        ribbon.update();
    else {
        ribbon = new OneLineRibbon(mainElement, dotNetRef);
        ribbon.initialize();
        ribbonMap.set(mainElement, ribbon);
    }
    const elementToFocus = (mainElement.querySelector(btnToolbarSelector) || mainElement);
    initFocusHidingEvents(elementToFocus);
    // eslint-disable-next-line new-cap
    RequestAnimationFrame(() => {
        mainElement.setAttribute(ribbonToolbarLoadedAttribute, "");
    });
    return Promise.resolve("ok");
}
function dispose(mainElement) {
    disposeCore(mainElement, ribbonMap);
    Array.from(ribbonMap.keys()).forEach(x => {
        if (isRemovedFromDOM(x))
            disposeCore(x, ribbonMap);
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
const ribbon = { init, dispose };

export { ribbon as default, dispose, init };
//# sourceMappingURL=ribbon-24.2.js.map
