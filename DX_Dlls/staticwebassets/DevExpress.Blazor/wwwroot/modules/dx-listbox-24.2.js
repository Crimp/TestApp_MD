import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DxUIElement } from './dx-ui-element-24.2.js';
import { R as RectHelper } from './layouthelper-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { H as HandlePointerEventsMode, D as DxElementPointerEventsHelper, L as LongTapInteractionTimeout } from './dx-html-element-pointer-events-helper-24.2.js';
import { n } from './property-24.2.js';
import { x } from './lit-element-24.2.js';
import { e } from './custom-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './data-qa-utils-24.2.js';
import './logicaltreehelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './eventhelper-24.2.js';
import './devices-24.2.js';

var _a;
const DxListBoxLegacyTagName = "dxbl-listbox";
const IsSelectedItemAttributeName = "data-is-selected-item";
const MultipleColumnsScrollableContainerClassName = "dxbs-grid-vsd";
class ListBoxLegacyCssClasses {
}
_a = ListBoxLegacyCssClasses;
ListBoxLegacyCssClasses.ListBox = CssClasses.Prefix + "-listbox";
ListBoxLegacyCssClasses.Item = _a.ListBox + "-item";
ListBoxLegacyCssClasses.ItemSelected = _a.Item + "-selected";
ListBoxLegacyCssClasses.ItemActive = _a.Item + "-active";
class ListBoxSelectedItemsChangedEvent extends Event {
    constructor() {
        super(ListBoxSelectedItemsChangedEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
ListBoxSelectedItemsChangedEvent.eventName = "dxlistboxselecteditemschanged";
let DxListBoxLegacy = class DxListBoxLegacy extends DxUIElement {
    constructor() {
        super();
        this._handlePointerEventsMode = HandlePointerEventsMode.None;
        this.boundSlotChangedHandler = this.onSlotChanged.bind(this);
        this.displayed = false;
        this.isMultipleColumns = false;
        this.itemContainerElement = null;
        this.resizeObserver = new ResizeObserver(this.onResized.bind(this));
        this.itemsContainerMutationObserver = new MutationObserver(this.onSelectedItemChanged.bind(this));
        this.pointerEventsHelper = new DxElementPointerEventsHelper(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver.observe(this);
        this.pointerEventsHelper.initialize();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.disconnect();
        this.itemsContainerMutationObserver.disconnect();
        this.pointerEventsHelper.dispose();
    }
    render() {
        return x `
            <slot @slotchange="${this.boundSlotChangedHandler}">
            </slot>
        `;
    }
    scrollToFocusedItem(scrollTop) {
        const focusedItem = this.querySelector(`[${IsSelectedItemAttributeName}]`);
        if (!focusedItem)
            return;
        if (!scrollTop) {
            focusedItem.scrollIntoView({ block: "nearest" });
            return;
        }
        const scrollableContainer = this.getScrollableContainerElement();
        scrollableContainer.scrollTop = focusedItem.offsetTop;
    }
    onSlotChanged(_) {
        this.itemContainerElement = this.getItemContainerElement();
        this.itemsContainerMutationObserver.observe(this.itemContainerElement, {
            attributeFilter: [IsSelectedItemAttributeName],
            attributeOldValue: true,
            subtree: true
        });
    }
    onResized(entries, _) {
        if (entries.length < 1)
            return;
        const actualDisplayed = !RectHelper.fromDomRect(entries[0].contentRect).isEmpty;
        if (actualDisplayed && !this.displayed)
            this.scrollToFocusedItem(true);
        this.displayed = actualDisplayed;
    }
    onSelectedItemChanged(_, __) {
        const event = new ListBoxSelectedItemsChangedEvent();
        this.dispatchEvent(event);
    }
    getItemContainerElement() {
        if (this.isMultipleColumns)
            return this.querySelector("table tbody");
        return this.querySelector("ul");
    }
    getScrollableContainerElement() {
        if (this.isMultipleColumns)
            return this.querySelector(`.${MultipleColumnsScrollableContainerClassName}`);
        return this;
    }
    // Pointer events interaction
    get handlePointerEventsMode() {
        return this._handlePointerEventsMode;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
};
__decorate([
    n({ type: Boolean, attribute: "is-multiple-columns" })
], DxListBoxLegacy.prototype, "isMultipleColumns", void 0);
DxListBoxLegacy = __decorate([
    e(DxListBoxLegacyTagName)
], DxListBoxLegacy);
function loadModule() { }
const dxListbox = { loadModule };

export { DxListBoxLegacy, ListBoxLegacyCssClasses, ListBoxSelectedItemsChangedEvent, dxListbox as default };
//# sourceMappingURL=dx-listbox-24.2.js.map
