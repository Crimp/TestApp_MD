import { D as DomHelper } from './layouthelper-24.2.js';
import { T as Tags, I as InputType } from './constants-24.2.js';

const tabbableSelectors = [
    "a[href]",
    "audio[controls]",
    "button",
    "[contenteditable]:not([contenteditable=\"false\"])",
    "details>summary:first-of-type",
    "details",
    "input",
    "select",
    "textarea",
    "[tabindex]",
    "video[controls]",
];
const tabbableSelector = tabbableSelectors.join(",");
class Tabbable {
    static getTabbables(element, self) {
        const tabbables = this.findTabbables(element, self);
        const standardOrdered = [];
        const sortByIndex = [];
        tabbables.forEach((tabbable, index) => {
            const tabIndex = Tabbable.getTabIndex(tabbable);
            if (tabIndex === 0)
                standardOrdered.push(tabbable);
            else
                sortByIndex.push({ index: index, tabIndex: tabIndex, item: tabbable });
        });
        return sortByIndex
            .sort((a, b) => {
            if (a.tabIndex === b.tabIndex)
                return a.index - b.index;
            return a.tabIndex - b.tabIndex;
        })
            .map(x => x.item)
            .concat(standardOrdered);
    }
    static findTabbables(element, self) {
        const tabbables = Array.from(element.querySelectorAll(tabbableSelector));
        if (self && (element.matches(tabbableSelector) || element.webkitMatchesSelector(tabbableSelector)))
            tabbables.unshift(element);
        return tabbables.filter(Tabbable.filterTabbable);
    }
    static filterTabbable(element) {
        const disabled = element;
        if (disabled.disabled)
            return false;
        if (Tabbable.isHiddenInput(element))
            return false;
        if (DomHelper.isHidden(element))
            return false;
        if (Tabbable.getTabIndex(element) < 0)
            return false;
        return true;
    }
    static getTabIndex(element) {
        const tabIndexAttr = element.getAttribute("tabindex");
        if (tabIndexAttr) {
            const tabIndex = parseInt(tabIndexAttr, 10);
            if (!isNaN(tabIndex))
                return tabIndex;
        }
        if (element.contentEditable === "true")
            return 0;
        if (element.nodeName === Tags.audio || element.nodeName === Tags.video || element.nodeName === Tags.details)
            return 0;
        return element.tabIndex;
    }
    static isHiddenInput(element) {
        return element.tagName === Tags.input && element.getAttribute("type") === InputType.hidden;
    }
}

export { Tabbable as T };
//# sourceMappingURL=tabbable-24.2.js.map
