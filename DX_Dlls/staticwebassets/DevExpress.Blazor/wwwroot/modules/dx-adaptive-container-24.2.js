import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { T as ToolbarCssClasses } from './toolbar-css-classes-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { T as ToolbarGroupStateChangeEvent, a as ToolbarUpdateEvent } from './events-24.23.js';
import { s } from './lit-element-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './custom-events-helper-24.2.js';

var GroupStateEnum;
(function (GroupStateEnum) {
    GroupStateEnum["Default"] = "dxbl-adaptive-group-state-default";
    GroupStateEnum["Text"] = "dxbl-adaptive-group-state-text";
    GroupStateEnum["NoText"] = "dxbl-adaptive-group-state-no-text";
    GroupStateEnum["Collapsed"] = "dxbl-adaptive-group-state-collapsed";
})(GroupStateEnum || (GroupStateEnum = {}));
var ItemStateEnum;
(function (ItemStateEnum) {
    ItemStateEnum["Default"] = "dxbl-adaptive-item-state-default";
    ItemStateEnum["NoText"] = "dxbl-adaptive-item-state-no-text";
    // "dxbl-toolbar-adaptive-item-text-hidden",
    ItemStateEnum["Collapsed"] = "dxbl-adaptive-item-state-collapsed";
})(ItemStateEnum || (ItemStateEnum = {}));
var EllipsisStateEnum;
(function (EllipsisStateEnum) {
    EllipsisStateEnum["Default"] = "dxbl-adaptive-ellipsis-state-default";
    EllipsisStateEnum["Hidden"] = "dxbl-toolbar-hidden-item";
})(EllipsisStateEnum || (EllipsisStateEnum = {}));
const groupStateCssClasses$1 = Object.values(GroupStateEnum).map(x => x);
Object.values(ItemStateEnum).map(x => x);
Object.values(EllipsisStateEnum).map(x => x);
var AdaptiveStateEnum;
(function (AdaptiveStateEnum) {
    AdaptiveStateEnum["Default"] = "dxbl-adaptive-state-default";
    AdaptiveStateEnum["FullSequential"] = "dxbl-adaptive-state-full-seq";
    AdaptiveStateEnum["NoText"] = "dxbl-adaptive-state-no-text";
    AdaptiveStateEnum["NoTextSequential"] = "dxbl-adaptive-state-no-text-seq";
    AdaptiveStateEnum["Group"] = "dxbl-adaptive-state-group-text";
    // Group = "dxbl-adaptive-state-grouping",
    AdaptiveStateEnum["GroupNoText"] = "dxbl-adaptive-state-grouping-no-text";
})(AdaptiveStateEnum || (AdaptiveStateEnum = {}));
const stateCssClasses = Object.values(AdaptiveStateEnum).map(x => x);

class AdaptiveCssClasses {
}
AdaptiveCssClasses.Adaptive = CssClasses.Prefix + "-adaptive";
AdaptiveCssClasses.AdaptiveContainer = AdaptiveCssClasses.Adaptive + "-container";
AdaptiveCssClasses.AdaptiveContainerContent = AdaptiveCssClasses.AdaptiveContainer + "-content";
AdaptiveCssClasses.AdaptiveGroup = AdaptiveCssClasses.Adaptive + "-group";
AdaptiveCssClasses.AdaptiveItem = AdaptiveCssClasses.Adaptive + "-item";
AdaptiveCssClasses.EllipsisGroup = AdaptiveCssClasses.Adaptive + "-ellipsis-group";
AdaptiveCssClasses.EllipsisGroupText = AdaptiveCssClasses.EllipsisGroup + "-text";
AdaptiveCssClasses.EllipsisGroupNoText = AdaptiveCssClasses.EllipsisGroup + "-no-text";
AdaptiveCssClasses.ItemCollapsed = AdaptiveCssClasses.AdaptiveItem + "-collapsed";
AdaptiveCssClasses.ItemNoText = AdaptiveCssClasses.AdaptiveItem + "-no-text";
AdaptiveCssClasses.VirtualContainer = AdaptiveCssClasses.Adaptive + "-virtual-container";
AdaptiveCssClasses.VirtualTestContainer = AdaptiveCssClasses.VirtualContainer + "-test";

const ellipsisCssClasses = [
    AdaptiveCssClasses.EllipsisGroupNoText,
    AdaptiveCssClasses.EllipsisGroupText,
    EllipsisStateEnum.Default,
    EllipsisStateEnum.Hidden
];
class StateRenderer {
    renderContainerDefaultState(container) {
        var _a, _b, _c;
        for (const group of container.groups) {
            this.resetGroupToDefault(group);
            this.resetItems(group.items);
            this.expandGroup(group);
        }
        container.root.classList.remove(...stateCssClasses);
        (_a = container.ellipsis) === null || _a === void 0 ? void 0 : _a.classList.remove(...ellipsisCssClasses);
        (_b = container.ellipsis) === null || _b === void 0 ? void 0 : _b.classList.add(EllipsisStateEnum.Hidden);
        (_c = container.separator) === null || _c === void 0 ? void 0 : _c.classList.add(ToolbarCssClasses.ToolbarHiddenItem);
    }
    renderContainerNoTextState(container, noTextIds) {
        noTextIds.forEach(id => {
            const element = container.root.querySelector(`#${id}`);
            if (element)
                element.classList.add(ItemStateEnum.NoText);
        });
    }
    renderGroupState(group, state) {
        const groupElement = group.element;
        if (groupElement) {
            groupElement.classList.add(state);
            group.items.forEach(x => this.hideElement(x));
            this.showEllipsis(group);
        }
    }
    renderContainerCollapsedState(container, collapsedIds) {
        collapsedIds.forEach(id => {
            const element = container.root.querySelector(`#${id}`);
            if (element)
                element.classList.add(ItemStateEnum.Collapsed);
        });
        if (collapsedIds.size > 0) {
            const groups = container.groups.filter(x => x.items.some(i => collapsedIds.has(i.id)));
            groups.forEach(x => this.showEllipsis(x));
        }
    }
    showGlobalEllipsis(container) {
        var _a, _b, _c;
        (_a = container.ellipsis) === null || _a === void 0 ? void 0 : _a.classList.remove(...ellipsisCssClasses);
        (_b = container.ellipsis) === null || _b === void 0 ? void 0 : _b.classList.remove(EllipsisStateEnum.Hidden);
        (_c = container.separator) === null || _c === void 0 ? void 0 : _c.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
    }
    hideGlobalEllipsis(container) {
        var _a, _b, _c;
        (_a = container.ellipsis) === null || _a === void 0 ? void 0 : _a.classList.remove(...ellipsisCssClasses);
        (_b = container.ellipsis) === null || _b === void 0 ? void 0 : _b.classList.add(EllipsisStateEnum.Hidden);
        (_c = container.separator) === null || _c === void 0 ? void 0 : _c.classList.add(ToolbarCssClasses.ToolbarHiddenItem);
    }
    collapseGroup(group) {
        group.items.forEach(x => this.hideElement(x));
        this.showEllipsis(group);
    }
    expandGroup(group) {
        group.items.forEach(x => this.showElement(x));
        this.hideEllipsis(group);
    }
    resetGroupToDefault(group) {
        group.element.classList.remove(...groupStateCssClasses$1);
        group.element.classList.remove(...stateCssClasses);
        group.ellipsis.classList.remove(...ellipsisCssClasses);
    }
    resetItems(elements) {
        elements.forEach(x => {
            x.classList.remove(...[
                AdaptiveCssClasses.ItemNoText,
                AdaptiveCssClasses.ItemCollapsed,
                ItemStateEnum.NoText.toString(),
                ItemStateEnum.Collapsed.toString(),
                "dxbl-toolbar-item-collapsed",
                "dxbl-toolbar-hidden-item"
            ]);
            x.classList.add(ItemStateEnum.Default);
        });
    }
    showEllipsis(group) {
        group.ellipsis.classList.remove(ToolbarCssClasses.ToolbarHiddenItem);
        group.ellipsis.classList.add(EllipsisStateEnum.Default);
    }
    hideEllipsis(group) {
        group.ellipsis.classList.remove(EllipsisStateEnum.Default);
        group.ellipsis.classList.add(ToolbarCssClasses.ToolbarHiddenItem);
    }
    showElement(element) {
        element.classList.remove(AdaptiveCssClasses.ItemCollapsed);
    }
    hideElement(element) {
        element.classList.add(AdaptiveCssClasses.ItemCollapsed);
    }
}

class StateFactory {
    createDefaultState(container) {
        return {
            layout: AdaptiveStateEnum.Default,
            width: container.content.offsetWidth,
            groups: container.groups.map(g => {
                return {
                    id: g.element.id,
                    state: GroupStateEnum.Default,
                    order: g.order,
                    items: g.items.map(i => {
                        return {
                            id: i.id,
                            state: ItemStateEnum.Default,
                            groupId: g.element.id
                        };
                    }),
                    ellipsis: {
                        id: g.ellipsis.id,
                        state: EllipsisStateEnum.Hidden,
                    }
                };
            }),
            ellipsis: {
                id: container.ellipsis.id,
                state: EllipsisStateEnum.Hidden
            }
        };
    }
    createNoTextState(container, noTextBlockIds, collapsedGroupIds = new Set(), groupState = GroupStateEnum.Default) {
        function getBlockState(blockId, groupId) {
            if (collapsedGroupIds.has(groupId))
                return ItemStateEnum.Collapsed;
            if (noTextBlockIds.has(blockId))
                return ItemStateEnum.NoText;
            return ItemStateEnum.Default;
        }
        function isShowGlobalEllipsis(groupIds) {
            const groups = container.groups.filter(x => groupIds.has(x.element.id));
            return groups.flatMap(x => x.blocks).some(x => x.collapseInGlobalGroup);
        }
        return {
            layout: AdaptiveStateEnum.NoText,
            width: container.content.offsetWidth,
            groups: container.groups.map(g => {
                return {
                    id: g.element.id,
                    order: g.order,
                    state: collapsedGroupIds.has(g.element.id) ? GroupStateEnum.Text : GroupStateEnum.Default,
                    items: g.items.map(i => {
                        return {
                            id: i.id,
                            groupId: g.element.id,
                            state: getBlockState(i.id, g.element.id)
                        };
                    }),
                    ellipsis: {
                        id: g.ellipsis.id,
                        state: collapsedGroupIds.has(g.element.id) ? EllipsisStateEnum.Default : EllipsisStateEnum.Hidden
                    }
                };
            }),
            ellipsis: {
                id: container.ellipsis.id,
                state: isShowGlobalEllipsis(collapsedGroupIds) ? EllipsisStateEnum.Default : EllipsisStateEnum.Hidden
            }
        };
    }
    createCollapseState(container, collapsedBlockIds, collapsedGroupIds, nonCollapseItemState) {
        function isEllipsisVisible(group) {
            const isAnyBlockCollapsed = group.blocks
                .filter(x => !x.collapseInGlobalGroup)
                .map(x => x.id).some(x => collapsedBlockIds.has(x));
            const isGroupCollapsed = collapsedGroupIds.has(group.element.id);
            return isAnyBlockCollapsed || isGroupCollapsed;
        }
        function getBlockState(blockId, groupId) {
            if (collapsedGroupIds.has(groupId) || collapsedBlockIds.has(blockId))
                return ItemStateEnum.Collapsed;
            return nonCollapseItemState;
        }
        function isShowGlobalEllipsis() {
            return container.groups.
                flatMap(x => x.blocks).
                filter(x => collapsedBlockIds.has(x.id) || collapsedGroupIds.has(x.groupId)).
                some(x => x.collapseInGlobalGroup);
        }
        return {
            layout: AdaptiveStateEnum.NoTextSequential,
            width: container.content.offsetWidth,
            groups: container.groups.map(g => {
                return {
                    id: g.element.id,
                    order: g.order,
                    state: collapsedGroupIds.has(g.element.id) ? GroupStateEnum.Text : GroupStateEnum.Default,
                    items: g.items.map(i => {
                        return {
                            id: i.id,
                            groupId: g.element.id,
                            state: getBlockState(i.id, g.element.id)
                        };
                    }),
                    ellipsis: {
                        id: g.ellipsis.id,
                        state: isEllipsisVisible(g) ? EllipsisStateEnum.Default : EllipsisStateEnum.Hidden
                    }
                };
            }),
            ellipsis: {
                id: container.ellipsis.id,
                state: isShowGlobalEllipsis() ? EllipsisStateEnum.Default : EllipsisStateEnum.Hidden
            }
        };
    }
    createGroupNoTextState(container, noTextGroupIds) {
        function isShowGlobalEllipsis() {
            return container.groups.flatMap(x => x.blocks).some(x => x.collapseInGlobalGroup);
        }
        return {
            layout: AdaptiveStateEnum.GroupNoText,
            width: container.content.offsetWidth,
            groups: container.groups.map(g => {
                return {
                    id: g.element.id,
                    order: g.order,
                    state: noTextGroupIds.has(g.element.id) ? GroupStateEnum.NoText : GroupStateEnum.Text,
                    items: g.items.map(i => {
                        return {
                            id: i.id,
                            groupId: g.element.id,
                            state: ItemStateEnum.Collapsed
                        };
                    }),
                    ellipsis: {
                        id: g.ellipsis.id,
                        state: EllipsisStateEnum.Default,
                    }
                };
            }),
            ellipsis: {
                id: container.ellipsis.id,
                state: isShowGlobalEllipsis() ? EllipsisStateEnum.Default : EllipsisStateEnum.Hidden
            }
        };
    }
}

class StateCalculator {
    constructor() {
        this.renderer = new StateRenderer();
        this.factory = new StateFactory();
    }
    getStates(container, itemSelector, settings) {
        const states = [];
        const blocks = this.getBlocks(container);
        const groupLimits = [];
        if (settings.toGroups)
            groupLimits.push(...this.getGroupLimits(container));
        states.push(...this.getDefaultState(container, groupLimits));
        if (settings.toIcons)
            states.push(...this.getNoTextStates(container, blocks, groupLimits));
        if (settings.hideItems) {
            const minWidthNoText = states.filter(x => x.layout === AdaptiveStateEnum.NoText).sort((a, b) => a.width - b.width).map(x => x.width)[0];
            states.push(...this.getCollapsedStates(container, blocks, groupLimits, settings.toIcons ? ItemStateEnum.NoText : ItemStateEnum.Default, minWidthNoText));
        }
        if (settings.toGroups)
            states.push(...this.getGroupNoTextStates(container, states));
        return states;
    }
    getBlocks(adaptiveContainer) {
        const adaptiveBlocks = adaptiveContainer.groups
            .flatMap(g => g.blocks.reverse());
        return adaptiveBlocks.sort((a, b) => b.adaptivePriority - a.adaptivePriority);
    }
    getNoTextStates(container, blocks, groupLimits) {
        const states = [];
        const noTextBlockIds = new Set();
        const collapsedGroupIds = new Set();
        this.renderer.hideGlobalEllipsis(container);
        for (const block of blocks) {
            noTextBlockIds.add(block.id);
            this.renderer.renderContainerNoTextState(container, noTextBlockIds);
            const group = container.groups.find(x => x.element.id === block.groupId);
            const groupLimit = groupLimits.find(x => x.groupId === group.element.id);
            if (groupLimit && !this.compareGroupWidth(group, groupLimit)) {
                if (collapsedGroupIds.has(groupLimit.groupId))
                    continue;
                this.renderer.renderGroupState(group, GroupStateEnum.Text);
                collapsedGroupIds.add(groupLimit.groupId);
            }
            states.push(this.factory.createNoTextState(container, noTextBlockIds, collapsedGroupIds));
        }
        return states;
    }
    getGroupLimits(container) {
        const groupLimits = [];
        this.renderer.renderContainerDefaultState(container);
        for (const group of container.groups) {
            this.renderer.renderGroupState(group, GroupStateEnum.Text);
            groupLimits.push({
                groupId: group.element.id,
                width: group.element.offsetWidth
            });
        }
        return groupLimits;
    }
    getCollapsedStates(container, blocks, groupLimits, nonCollapseItemState, minWidth) {
        const states = [];
        const collapsedBlockIds = new Set();
        const collapsedGroupIds = new Set();
        let globalEllipsShown = false;
        for (const block of blocks) {
            collapsedBlockIds.add(block.id);
            if (block.collapseInGlobalGroup && !globalEllipsShown) {
                this.renderer.showGlobalEllipsis(container);
                globalEllipsShown = true;
            }
            this.renderer.renderContainerCollapsedState(container, collapsedBlockIds);
            if (container.content.offsetWidth > minWidth)
                continue;
            const group = container.groups.find(x => x.element.id === block.groupId);
            const groupLimit = groupLimits.find(x => x.groupId === group.element.id);
            if (groupLimit && !this.compareGroupWidth(group, groupLimit)) {
                if (collapsedGroupIds.has(groupLimit.groupId))
                    continue;
                this.renderer.renderGroupState(group, GroupStateEnum.Text);
                collapsedGroupIds.add(groupLimit.groupId);
            }
            states.push(this.factory.createCollapseState(container, collapsedBlockIds, collapsedGroupIds, nonCollapseItemState));
        }
        return states;
    }
    getGroupNoTextStates(container, states) {
        const resultStates = [];
        const groupStates = states.filter(x => x.groups.every(g => g.state === GroupStateEnum.Text));
        const noTextGroupIds = new Set();
        const groupIds = new Set(groupStates.flatMap(gs => gs.groups)
            .sort((a, b) => a.order - b.order)
            .map(x => x.id));
        for (const groupId of groupIds) {
            const group = container.groups.find(x => x.element.id === groupId);
            if (!group.hasIcon)
                continue;
            noTextGroupIds.add(groupId);
            this.renderer.renderGroupState(group, GroupStateEnum.NoText);
            resultStates.push(this.factory.createGroupNoTextState(container, noTextGroupIds));
        }
        return resultStates;
    }
    compareGroupWidth(group, groupLimit) {
        return group.element.offsetWidth > groupLimit.width;
    }
    getDefaultState(container, groupLimits) {
        this.renderer.renderContainerDefaultState(container);
        for (const group of container.groups) {
            const groupLimit = groupLimits.find(x => x.groupId === group.element.id);
            if (groupLimit && !this.compareGroupWidth(group, groupLimit))
                this.renderer.renderGroupState(group, GroupStateEnum.Text);
        }
        return [this.factory.createDefaultState(container)];
    }
}

const groupStateCssClasses = Object.values(GroupStateEnum).map(x => x);
const itemStateCssClasses = Object.values(ItemStateEnum).map(x => x);
const ellipsisStateCssClasses = Object.values(EllipsisStateEnum).map(x => x);
class VirtualContainer {
    constructor() {
        this.appliedState = null;
        this.states = [];
        this.currentCheckpoint = 0;
        this.calculator = new StateCalculator();
        this.containerItemsUpdate = null;
    }
    async configure(container, itemSelector, settings) {
        const clone = this.copyContainer(container);
        const cloneAdaptiveContainer = this.createAdaptiveContainer(clone, itemSelector);
        if (cloneAdaptiveContainer.content.offsetWidth === 0)
            return;
        this.states = this.calculator.getStates(cloneAdaptiveContainer, itemSelector, settings);
        cloneAdaptiveContainer.root.remove();
        await this.adjust(container, itemSelector);
    }
    async adjust(container, itemSelector) {
        const adaptiveContainer = this.createAdaptiveContainer(container, itemSelector);
        const containerWidth = adaptiveContainer.root.offsetWidth;
        const checkpoints = this.states.map(x => x.width).sort((a, b) => b - a);
        const newCheckpoint = checkpoints.find(x => x < containerWidth);
        if (this.appliedState && this.currentCheckpoint && this.currentCheckpoint === newCheckpoint)
            return;
        // if(this.currentCheckpoint && this.currentCheckpoint === newCheckpoint &&
        //     this.appliedStates.map(x => x.state).some(x => x !== null)) return;
        container.querySelector(`.${AdaptiveCssClasses.AdaptiveContainerContent}`);
        // const directedAppliedStates = increasing ? [...this.appliedStates].reverse() : [...this.appliedStates];
        // let applying = true;
        // TODO: calc new states
        const newState = this.states.filter(x => x.width === newCheckpoint)[0];
        if (!newState)
            return;
        this.currentCheckpoint = newCheckpoint;
        await this.waitForAnimationFrame(() => {
            this.applyNewState(adaptiveContainer, newState);
            if (this.containerItemsUpdate && newState.groups.length > 0) {
                const toolbarItems = newState.groups.map(x => x.items).reduce((acc, obj) => acc.concat(obj)).map(x => {
                    return {
                        Id: x.id,
                        TextHidden: x.state === ItemStateEnum.NoText,
                        IsVisible: x.state !== ItemStateEnum.Collapsed
                    };
                });
                this.containerItemsUpdate(toolbarItems);
            }
        });
    }
    applyNewState(container, state) {
        for (const group of state.groups)
            this.applyGroupState(container, group);
        if (state.ellipsis)
            this.applyEllipsisState(container, state.ellipsis);
        this.appliedState = state;
    }
    waitForAnimationFrame(callback) {
        return new Promise(resolve => {
            requestAnimationFrame((timestamp) => {
                callback();
                resolve(timestamp);
            });
        });
    }
    applyGroupState(container, group) {
        const groupElement = container.root.querySelector(`#${group.id}`);
        if (!groupElement)
            return;
        groupElement.classList.remove(...groupStateCssClasses);
        groupElement.classList.add(group.state);
        groupElement.dispatchEvent(new ToolbarGroupStateChangeEvent(group.state.toString()));
        for (const item of group.items)
            this.applyItemState(container, item);
        if (group.ellipsis)
            this.applyEllipsisState(container, group.ellipsis);
    }
    applyItemState(container, item) {
        const itemElement = container.root.querySelector(`#${item.id}`);
        if (!itemElement)
            return;
        itemElement.classList.remove(...itemStateCssClasses);
        itemElement.classList.add(item.state);
    }
    applyEllipsisState(container, ellipsis) {
        const ellipsisElement = container.root.querySelector(`#${ellipsis.id}`);
        if (!ellipsisElement)
            return;
        ellipsisElement.classList.remove(...ellipsisStateCssClasses);
        ellipsisElement.classList.add(ellipsis.state);
    }
    copyContainer(container) {
        const clone = container.cloneNode(true);
        clone.classList.add(AdaptiveCssClasses.VirtualContainer);
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";
        const parent = container.parentElement;
        parent.appendChild(clone);
        return clone;
    }
    createAdaptiveContainer(container, itemSelector) {
        const content = container.querySelector(`.${AdaptiveCssClasses.AdaptiveContainerContent}`);
        const groupList = content.querySelectorAll(`.${AdaptiveCssClasses.AdaptiveGroup}`);
        let count = 0;
        const groups = [...groupList].reverse().map(group => {
            count++;
            const elements = group.querySelectorAll(itemSelector);
            const groupElement = group;
            return {
                element: group,
                order: count,
                hasText: groupElement.hasAttribute("has-adaptive-text"),
                hasIcon: groupElement.hasAttribute("has-adaptive-icon"),
                items: [...elements],
                blocks: [...elements].map(x => {
                    return {
                        id: x.id,
                        groupOrder: count,
                        groupId: group.id,
                        collapsed: false,
                        noText: false,
                        adaptivePriority: parseInt(x.getAttribute("adaptive-priority")),
                        collapseInGlobalGroup: x.hasAttribute("collapse-in-global-group")
                    };
                }),
                ellipsis: group.querySelector(`.${ToolbarCssClasses.ButtonEllipsis}`)
            };
        });
        return {
            root: container,
            content: content,
            groups: groups,
            separator: container.querySelector(".dxbl-ribbon-general-separator"),
            ellipsis: container.querySelector(".dxbl-toolbar-btn-ellipsis-general")
        };
    }
}

class RibbonItemResizedEventContext {
    constructor(id) {
        this.id = id;
    }
}
class RibbonItemResizedEvent extends CustomEvent {
    constructor(id) {
        super(RibbonItemResizedEvent.eventName, {
            detail: new RibbonItemResizedEventContext(id),
            bubbles: true
        });
    }
}
RibbonItemResizedEvent.eventName = "dxbl-ribbon-item.resized";
class RibbonItemUpdatedEventContext {
    constructor(id, adaptivePriority) {
        this.id = id;
        this.adaptivePriority = adaptivePriority;
    }
}
class RibbonItemUpdatedEvent extends CustomEvent {
    constructor(id, adaptivePriority) {
        super(RibbonItemUpdatedEvent.eventName, {
            detail: new RibbonItemUpdatedEventContext(id, adaptivePriority),
            bubbles: true,
            composed: true
        });
    }
}
RibbonItemUpdatedEvent.eventName = "dxbl-ribbon-item.updated";

let AdaptiveContainer = class AdaptiveContainer extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.containerResizeObserver = null;
        this.contentResizeObserver = null;
        this.isAdaptivityEnabled = false;
        this.virtualContainer = new VirtualContainer();
        this.itemResizedHandler = this.itemResized.bind(this);
        this.adaptiveItemUpdatedHandler = this.adaptiveItemUpdated.bind(this);
        this.initialized = false;
        this.collapseToIcons = false;
        this.canHideItems = false;
        this.collapseToGroups = false;
        this.minRootItemCount = 0;
        this.itemSelector = ".dxbl-adaptive-item:not(.dxbl-toolbar-btn-ellipsis)";
    }
    get settings() {
        return {
            toIcons: this.collapseToIcons,
            toGroups: this.collapseToGroups,
            hideItems: this.canHideItems
        };
    }
    firstUpdated() {
        this.tryAdapt();
    }
    updated(props) {
        super.updated(props);
        if (props.has("collapseToIcons") || props.has("canHideItems") || props.has("collapseToGroups"))
            this.configure();
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(RibbonItemResizedEvent.eventName, this.itemResizedHandler);
        this.addEventListener(RibbonItemUpdatedEvent.eventName, this.adaptiveItemUpdatedHandler);
        this.virtualContainer.containerItemsUpdate = (items) => {
            this.dispatchEvent(new ToolbarUpdateEvent(Array.from(items)));
        };
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        this.removeEventListener(RibbonItemResizedEvent.eventName, this.itemResizedHandler);
        this.removeEventListener(RibbonItemUpdatedEvent.eventName, this.adaptiveItemUpdatedHandler);
        (_a = this.containerResizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this);
    }
    tryAdapt() {
        if (this.classList.contains(AdaptiveCssClasses.VirtualContainer))
            return;
        this.containerResizeObserver = new ResizeObserver(() => new Promise(() => this.adjust()));
        this.containerResizeObserver.observe(this);
        this.contentResizeObserver = new ResizeObserver(() => {
            if (this.offsetWidth === 0)
                return;
            this.configure();
        });
        this.contentResizeObserver.observe(this.querySelector(`.${AdaptiveCssClasses.AdaptiveContainerContent}`));
        this.initialized = true;
        this.configure();
    }
    async configure() {
        if (this.initialized)
            await this.virtualContainer.configure(this, this.itemSelector, this.settings);
    }
    async adjust() {
        await this.virtualContainer.adjust(this, this.itemSelector);
    }
    itemResized(event) {
        super.getUpdateComplete().then(() => this.virtualContainer.configure(this, this.itemSelector, this.settings));
    }
    adaptiveItemUpdated(event) {
    }
};
AdaptiveContainer.shadowRootOptions = { ...s.shadowRootOptions, mode: "open" };
__decorate([
    n({ attribute: "collapse-to-icons", type: Boolean })
], AdaptiveContainer.prototype, "collapseToIcons", void 0);
__decorate([
    n({ attribute: "can-hide-items", type: Boolean })
], AdaptiveContainer.prototype, "canHideItems", void 0);
__decorate([
    n({ attribute: "collapse-to-groups", type: Boolean })
], AdaptiveContainer.prototype, "collapseToGroups", void 0);
__decorate([
    n({ attribute: "min-root-item-count", type: Number })
], AdaptiveContainer.prototype, "minRootItemCount", void 0);
AdaptiveContainer = __decorate([
    e("dxbl-adaptive-container")
], AdaptiveContainer);
const AdaptiveContainer$1 = AdaptiveContainer;

export { AdaptiveContainer$1 as default };
//# sourceMappingURL=dx-adaptive-container-24.2.js.map
