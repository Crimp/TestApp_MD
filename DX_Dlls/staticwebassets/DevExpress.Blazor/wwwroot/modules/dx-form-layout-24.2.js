import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';
import { d as dom } from './dom-24.2.js';
import { s as stringToEnumConverter } from './enumConverter-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { g as getCurrentStyleSheet, r as retrieveByPredicate, b as getParentByClassName } from './dom-utils-24.2.js';
import { n } from './property-24.2.js';
import { T as TextEditCssClasses } from './text-editor-24.2.js';
import { e } from './custom-element-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
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
import './custom-events-helper-24.2.js';
import './constants-24.23.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';
import './focus-utils-24.2.js';
import './key-24.2.js';
import './disposable-24.2.js';

class FormLayoutCssClasses {
}
FormLayoutCssClasses.Root = CssClasses.Prefix + "-fl";
FormLayoutCssClasses.Loading = FormLayoutCssClasses.Root + "-loading";
FormLayoutCssClasses.RowBreak = FormLayoutCssClasses.Root + "-row-break";
FormLayoutCssClasses.Group = FormLayoutCssClasses.Root + "-group";
FormLayoutCssClasses.GroupBody = FormLayoutCssClasses.Group + "-body";
FormLayoutCssClasses.GroupDecoration = FormLayoutCssClasses.Root + "-gd";
FormLayoutCssClasses.GroupTab = FormLayoutCssClasses.Root + "-gt";
FormLayoutCssClasses.GroupHeaderTemplate = FormLayoutCssClasses.Root + "-group-header-tmpl";
FormLayoutCssClasses.Item = FormLayoutCssClasses.Root + "-item";
FormLayoutCssClasses.TabItem = FormLayoutCssClasses.Root + "-tab-item";
FormLayoutCssClasses.Caption = FormLayoutCssClasses.Root + "-cpt";
FormLayoutCssClasses.EmptyCaption = FormLayoutCssClasses.Root + "-empty-caption";
FormLayoutCssClasses.BeginRow = FormLayoutCssClasses.Root + "-begin-row";
FormLayoutCssClasses.TabContent = FormLayoutCssClasses.Root + "-tab-content";
FormLayoutCssClasses.ItemContentWithCaption = FormLayoutCssClasses.Root + "-ctrl";
FormLayoutCssClasses.ItemContentWithoutCaption = FormLayoutCssClasses.Root + "-ctrl-nc";
FormLayoutCssClasses.ItemHorizontal = FormLayoutCssClasses.Root + "-item-horizontal";
FormLayoutCssClasses.HeaderContentTemplate = FormLayoutCssClasses.Root + "-header-content-tmpl";
FormLayoutCssClasses.CaptionTemplate = FormLayoutCssClasses.Root + "-caption-tmpl";
FormLayoutCssClasses.ItemCaptionWidthCalculation = FormLayoutCssClasses.Root + "-calc";
FormLayoutCssClasses.Row = CssClasses.Prefix + "-row";

var BootstrapVersion;
(function (BootstrapVersion) {
    BootstrapVersion["v4"] = "v4";
    BootstrapVersion["v5"] = "v5";
})(BootstrapVersion || (BootstrapVersion = {}));
const mediaQueryScreenSizesCache = {};
function createCssRuleForScreenSizeMediaQuery(cssVarName, fallbackWidth, cssRule) {
    const cache = mediaQueryScreenSizesCache;
    const minWidth = cache[cssVarName] || (cache[cssVarName] = (dom.DomUtils.getCurrentStyle(document.body).getPropertyValue(cssVarName) || fallbackWidth));
    if (minWidth) {
        const styleSheet = getCurrentStyleSheet();
        if (styleSheet)
            styleSheet.insertRule("@media (min-width: " + minWidth + ") {\n" + cssRule + "\n}\n", styleSheet.cssRules.length);
    }
}
function createCssRuleForLargeScreen(cssRule) {
    createCssRuleForScreenSizeMediaQuery("--breakpoint-lg", "992px", cssRule);
}

var ItemCaptionAlignment;
(function (ItemCaptionAlignment) {
    ItemCaptionAlignment[ItemCaptionAlignment["None"] = 0] = "None";
    ItemCaptionAlignment[ItemCaptionAlignment["InGroups"] = 1] = "InGroups";
    ItemCaptionAlignment[ItemCaptionAlignment["All"] = 2] = "All";
})(ItemCaptionAlignment || (ItemCaptionAlignment = {}));
var SizeMode;
(function (SizeMode) {
    SizeMode[SizeMode["Small"] = 0] = "Small";
    SizeMode[SizeMode["Medium"] = 1] = "Medium";
    SizeMode[SizeMode["Large"] = 2] = "Large";
})(SizeMode || (SizeMode = {}));
const captionSelector = ` > .${FormLayoutCssClasses.Caption}`;
const generateItemSelector = (id) => `${DxTagNames.FormLayoutItem}[fl-id=${id}].${FormLayoutCssClasses.Item}.${FormLayoutCssClasses.ItemHorizontal}`;
const patternRegex = /\./g;
class FormLayoutBase extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.captionAlignment = ItemCaptionAlignment.InGroups;
    }
    get itemSelector() {
        return ` > .${FormLayoutCssClasses.Row} > ${generateItemSelector(this.mainElementId)}`;
    }
    get mainElementId() {
        return this.id;
    }
    getMainElement() {
        return document.getElementById(this.mainElementId);
    }
    calculateAdaptivityCssRules() { }
    startCalculationItems(className) {
        const selector = ` .${className}`;
        const groups = this.querySelectorAll(`:scope${selector}[fl-id=${this.mainElementId}]`);
        for (let i = 0; i < groups.length; i++)
            groups[i].calculateAdaptivityCssRules();
    }
    updateGroups() {
        this.startCalculationItems(FormLayoutCssClasses.Group);
    }
    updateTabs() {
        this.startCalculationItems(FormLayoutCssClasses.TabContent);
    }
    createAdaptivityCssRules() {
        var _a;
        let width = 0;
        dom.DomUtils.addClassName(this, FormLayoutCssClasses.ItemCaptionWidthCalculation);
        const selector = ` .${FormLayoutCssClasses.Group}[fl-id=${this.mainElementId}] .${FormLayoutCssClasses.GroupBody}[expanded-state=False]`;
        const collapsedGroups = ((_a = this.getMainElement()) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`:scope${selector}`));
        const loadItemsInCollapsedGroups = (load) => {
            for (let i = 0; i < (collapsedGroups === null || collapsedGroups === void 0 ? void 0 : collapsedGroups.length); i++) {
                collapsedGroups[i].style.display = load ? "" : "none";
                collapsedGroups[i].style.visibility = load ? "hidden" : "";
            }
        };
        loadItemsInCollapsedGroups(true);
        const elements = this.findCaptions();
        if (elements && elements.length > 0) {
            width = this.getMaxCaptionWidth(elements);
            this.createAdaptivityCssRulesForElements(width);
        }
        loadItemsInCollapsedGroups(false);
        dom.DomUtils.removeClassName(this, FormLayoutCssClasses.ItemCaptionWidthCalculation);
    }
    findCaptions() {
        return [...this.querySelectorAll(`:scope${this.itemSelector}${captionSelector}`)];
    }
    createAdaptivityCssRulesForElements(width) {
        this.createCssRulesForElementsInternal(width, false, false);
    }
    getMaxCaptionWidth(elements) {
        let width = 0;
        if (elements.length > 0) {
            const emptyCaptionElement = elements.find((element) => element.classList.contains(FormLayoutCssClasses.EmptyCaption));
            let emptyCaptionElementHeight = "0 px";
            if (emptyCaptionElement)
                emptyCaptionElementHeight = window.getComputedStyle(emptyCaptionElement, null).getPropertyValue("height");
            for (let i = 0; i < elements.length; i++) {
                const captionWidth = elements[i].offsetWidth;
                if (this.isEmptyCaption(elements[i]))
                    elements[i].style.height = emptyCaptionElementHeight;
                const parent = elements[i].parentNode;
                if (parent && captionWidth > width && captionWidth < parent.offsetWidth)
                    width = captionWidth;
            }
        }
        return width > 0 ? (width + 1) : 0;
    }
    isEmptyCaption(element) {
        return element.classList.contains(FormLayoutCssClasses.EmptyCaption);
    }
    getFilteredElements(elements) {
        return retrieveByPredicate(elements, (el) => getParentByClassName(el, FormLayoutCssClasses.Root) === this);
    }
    encodeDotsForMediaQuiery(value) {
        return value.replace(patternRegex, "\\$&");
    }
    getAdaptivityCssRulesPrefix() {
        const mainElement = this.getMainElement();
        if (!mainElement)
            return null;
        let prefix = `.${FormLayoutCssClasses.Root}`;
        let flElement = mainElement;
        while (flElement) {
            prefix = " #" + this.encodeDotsForMediaQuiery(flElement.id) + prefix;
            flElement = getParentByClassName(flElement.parentNode, FormLayoutCssClasses.Root);
        }
        prefix.slice(1);
        let insideFormPath = "";
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let parentContainer = this;
        while (parentContainer && parentContainer !== mainElement && mainElement.contains(parentContainer)) {
            if (parentContainer.id)
                insideFormPath = " #" + this.encodeDotsForMediaQuiery(parentContainer.id) + insideFormPath;
            parentContainer = getParentByClassName(parentContainer.parentNode, FormLayoutCssClasses.Group);
        }
        prefix += insideFormPath;
        return prefix;
    }
    createCssRulesForElementsInternal(captionWidth, isMainElementTab, isMainElementCardGroup) {
        if (captionWidth === 0)
            return;
        this.itemCaptionWidth = captionWidth;
        const mediaRulePrefix = this.getAdaptivityCssRulesPrefix();
        const formGroupPrefix = this.captionAlignment === ItemCaptionAlignment.InGroups ? this.itemSelector : ` ${generateItemSelector(this.mainElementId)}`;
        let mediaRule = mediaRulePrefix + formGroupPrefix + `${captionSelector} {\n width:` + captionWidth + "px;\n}\n";
        mediaRule += mediaRulePrefix + formGroupPrefix + ` > .${FormLayoutCssClasses.ItemContentWithCaption}:not(img):not(.${FormLayoutCssClasses.EmptyCaption} + .${FormLayoutCssClasses.ItemContentWithCaption}):not(.${FormLayoutCssClasses.ItemContentWithoutCaption}) {\n width: calc(100% - ` + captionWidth + "px);\n}\n";
        createCssRuleForLargeScreen(mediaRule);
    }
}
__decorate([
    n({ attribute: "caption-alignment", type: ItemCaptionAlignment, converter: stringToEnumConverter(ItemCaptionAlignment) })
], FormLayoutBase.prototype, "captionAlignment", void 0);

class FormLayout extends FormLayoutBase {
    constructor() {
        super();
        this._enchancedCallback = () => void 0;
        this._calculationProcess = null;
        this.sizeMode = SizeMode.Medium;
        this._isRendered = false;
        this._mutationObserver = new MutationObserver((mutations) => {
            this.itemVisibilityChangeHandler(mutations);
        });
        this._enchancedCallback = () => this.calculateAdaptivityCssRules();
        this._formSizeObserver = new ResizeObserver(this.calculateAdaptivityCssRules.bind(this));
    }
    needReasignAttributes() { return false; }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        if ((_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.addEventListener)
            window.Blazor.addEventListener("enhancedload", this._enchancedCallback);
        this._mutationObserver.observe(this, {
            childList: true,
            subtree: true,
        });
        this._formSizeObserver.observe(this);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        this._isRendered = false;
        this._mutationObserver.disconnect();
        if ((_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.removeEventListener)
            window.Blazor.removeEventListener("enhancedload", this._enchancedCallback);
        this._formSizeObserver.disconnect();
    }
    itemVisibilityChangeHandler(mutations) {
        if (this._isRendered) {
            const mutation = mutations.some(m => (m.addedNodes.length || m.removedNodes.length) && m.target.classList.contains("dxbl-row"));
            if (mutation)
                this.calculateAdaptivityCssRules();
        }
    }
    willUpdate(changed) {
        if (changed.has("sizeMode") || changed.has("captionAlignment"))
            this.calculateAdaptivityCssRules();
    }
    findCaptions() {
        if (this.captionAlignment === ItemCaptionAlignment.All)
            return this.getFilteredElements(this.querySelectorAll(`${generateItemSelector(this.mainElementId)}:not(.${CssClasses.Invisible})` + captionSelector));
        return super.findCaptions();
    }
    calculateAdaptivityCssRules() {
        this._calculationProcess && clearTimeout(this._calculationProcess);
        this._calculationProcess = setTimeout(() => {
            if (this.captionAlignment !== ItemCaptionAlignment.None)
                this.createAdaptivityCssRules();
            if (this.captionAlignment === ItemCaptionAlignment.InGroups) {
                this.updateGroups();
                this.updateTabs();
            }
            dom.DomUtils.removeClassName(this, FormLayoutCssClasses.Loading);
            this._isRendered = true;
        });
    }
}
__decorate([
    n({ attribute: "size-mode", type: SizeMode, converter: stringToEnumConverter(SizeMode) })
], FormLayout.prototype, "sizeMode", void 0);

class FormLayoutGroupBase extends FormLayoutBase {
    constructor(_isMainTabElement) {
        super();
        this._isMainTabElement = _isMainTabElement;
        this.flId = "";
    }
    get mainElementId() {
        return this.flId;
    }
    calculateAdaptivityCssRules() {
        if (this.captionAlignment !== ItemCaptionAlignment.None)
            this.createAdaptivityCssRules();
    }
}
__decorate([
    n({ attribute: "fl-id", type: String })
], FormLayoutGroupBase.prototype, "flId", void 0);

class FormLayoutItem extends SingleSlotElementBase {
    constructor() {
        super();
        this._currentCaption = null;
        this.captionFor = null;
    }
    get useShadowDom() {
        return false;
    }
    _findFormLayout() {
        let parent = this.parentNode;
        while (parent && !(parent instanceof FormLayout))
            parent = parent === null || parent === void 0 ? void 0 : parent.parentNode;
        return parent;
    }
    contentChanged() {
        var _a;
        super.contentChanged();
        const caption = this.initAndGetCaptionForInput();
        if (((_a = this._currentCaption) === null || _a === void 0 ? void 0 : _a.innerHTML) !== (caption === null || caption === void 0 ? void 0 : caption.innerHTML)) {
            const formLayout = this._findFormLayout();
            formLayout === null || formLayout === void 0 ? void 0 : formLayout.calculateAdaptivityCssRules();
        }
        this._currentCaption = caption;
    }
    initAndGetCaptionForInput() {
        var _a;
        const caption = this.getCaption();
        if (caption && this.captionFor !== "") {
            const value = this.captionFor || ((_a = this.getEditorInput()) === null || _a === void 0 ? void 0 : _a.id);
            if (value)
                caption.htmlFor = value;
        }
        return caption;
    }
    getCaption() {
        return this.querySelector(`:scope > .${FormLayoutCssClasses.Caption}`);
    }
    getEditorInput() {
        return this.querySelector(`.${TextEditCssClasses.TextEdit} > input, .${TextEditCssClasses.TextEdit} > textarea, .dxbl-checkbox-check-element > input`);
    }
}
__decorate([
    n({ attribute: "caption-for" })
], FormLayoutItem.prototype, "captionFor", void 0);

class GroupControlCssClasses {
}
GroupControlCssClasses.Group = CssClasses.Prefix + "-group";
GroupControlCssClasses.Header = GroupControlCssClasses.Group + "-header";
GroupControlCssClasses.Body = GroupControlCssClasses.Group + "-body";
GroupControlCssClasses.BodyContent = GroupControlCssClasses.Body + "-content";

let DxFormLayoutTab = class DxFormLayoutTab extends FormLayoutGroupBase {
    constructor() {
        super(true);
        this.isActiveTab = false;
    }
    get itemSelector() {
        return ` > .${FormLayoutCssClasses.Row} > .${FormLayoutCssClasses.TabItem}.${FormLayoutCssClasses.ItemHorizontal}`;
    }
    willUpdate(changed) {
        if (changed.has("isActiveTab") && this.isActiveTab) {
            if (this.captionAlignment === ItemCaptionAlignment.InGroups) {
                this.calculateAdaptivityCssRules();
                this.updateTabs();
                this.updateGroups();
            }
            if (this.captionAlignment === ItemCaptionAlignment.All)
                this.getMainElement().calculateAdaptivityCssRules();
        }
    }
    createAdaptivityCssRulesForElements(width) {
        this.createCssRulesForElementsInternal(width, true, false);
    }
};
__decorate([
    n({ attribute: "is-active-tab", type: Boolean })
], DxFormLayoutTab.prototype, "isActiveTab", void 0);
DxFormLayoutTab = __decorate([
    e(DxTagNames.FormLayoutTab)
], DxFormLayoutTab);
let DxFormLayoutGroup = class DxFormLayoutGroup extends FormLayoutGroupBase {
    constructor() { super(false); }
    get itemSelector() {
        const plainSelector = ` > .${FormLayoutCssClasses.Row} > ${generateItemSelector(this.flId)}`;
        const groupSelector = ` > .${GroupControlCssClasses.Group} > .${GroupControlCssClasses.Body} > .${GroupControlCssClasses.BodyContent}${plainSelector}`;
        return this.isMainElementCardGroup() ? groupSelector : plainSelector;
    }
    isMainElementCardGroup() {
        return this.classList.contains(FormLayoutCssClasses.GroupDecoration);
    }
    createAdaptivityCssRulesForElements(width) {
        this.createCssRulesForElementsInternal(width, false, this.isMainElementCardGroup());
    }
};
DxFormLayoutGroup = __decorate([
    e(DxTagNames.FormLayoutGroup)
], DxFormLayoutGroup);
let DxFormLayoutItem = class DxFormLayoutItem extends FormLayoutItem {
};
DxFormLayoutItem = __decorate([
    e(DxTagNames.FormLayoutItem)
], DxFormLayoutItem);
let DxFormLayout = class DxFormLayout extends FormLayout {
};
DxFormLayout = __decorate([
    e(DxTagNames.FormLayout)
], DxFormLayout);

export { DxFormLayout, DxFormLayoutGroup, DxFormLayoutItem, DxFormLayoutTab };
//# sourceMappingURL=dx-form-layout-24.2.js.map
