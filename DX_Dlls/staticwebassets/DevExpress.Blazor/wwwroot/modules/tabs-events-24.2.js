import { C as CssClasses } from './css-classes-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { D as DxTagNames } from './dx-tag-names-24.2.js';

class TabsCssClasses {
}
TabsCssClasses.Prefix = CssClasses.Prefix + "-tabs";
TabsCssClasses.Item = TabsCssClasses.Prefix + "-item";
TabsCssClasses.Content = TabsCssClasses.Prefix + "-content";
TabsCssClasses.TabList = TabsCssClasses.Prefix + "-tablist";
TabsCssClasses.ContentPanel = TabsCssClasses.Content + "-panel";
TabsCssClasses.Scrollable = TabsCssClasses.TabList + "-scrollable";
TabsCssClasses.HasOverflow = TabsCssClasses.TabList + "-has-overflow";
TabsCssClasses.ButtonScroll = TabsCssClasses.Prefix + "-scroll-btn";
TabsCssClasses.ButtonScrollNext = TabsCssClasses.ButtonScroll + "-next";
TabsCssClasses.ButtonScrollPrev = TabsCssClasses.ButtonScroll + "-prev";
TabsCssClasses.CloseButton = TabsCssClasses.Prefix + "-close-button";

class ActiveTabChangedEvent extends Event {
    constructor() {
        super(ActiveTabChangedEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
ActiveTabChangedEvent.eventName = DxTagNames.Tabs + ".active-tab-changed";
class DxTabReorderEvent extends CustomEvent {
    constructor(fromIndex, toIndex) {
        super(DxTabReorderEvent.eventName, {
            detail: new OnTabReorderContext(fromIndex, toIndex),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DxTabReorderEvent.eventName = DxTagNames.Tabs + ".tab-reorder";
class OnTabReorderContext {
    constructor(fromIndex, toIndex) {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }
}
CustomEventsHelper.register(DxTabReorderEvent.eventName, x => x.detail);

export { ActiveTabChangedEvent as A, DxTabReorderEvent as D, TabsCssClasses as T };
//# sourceMappingURL=tabs-events-24.2.js.map
