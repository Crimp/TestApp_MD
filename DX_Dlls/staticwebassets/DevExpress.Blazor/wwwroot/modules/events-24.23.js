import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';

class ToolbarUpdateEventContext {
    constructor(items) {
        this.items = items;
    }
}
class ToolbarUpdateEvent extends CustomEvent {
    constructor(items) {
        super(ToolbarUpdateEvent.eventName, {
            detail: new ToolbarUpdateEventContext(items),
            bubbles: true
        });
    }
}
ToolbarUpdateEvent.eventName = "dxbl-toolbar.update";
CustomEventsHelper.register(ToolbarUpdateEvent.eventName, x => x.detail);
class ToolbarGroupStateChangeEventContext {
    constructor(state) {
        this.state = state;
    }
}
class ToolbarGroupStateChangeEvent extends CustomEvent {
    constructor(state) {
        super(ToolbarGroupStateChangeEvent.eventName, {
            detail: new ToolbarGroupStateChangeEventContext(state),
            bubbles: true,
            composed: true,
        });
    }
}
ToolbarGroupStateChangeEvent.eventName = "dxbl:toolbar-group.state-change";
CustomEventsHelper.register(ToolbarGroupStateChangeEvent.eventName, x => x.detail);
class ToolbarItemUpdateEventContext {
    constructor(item) {
        this.item = item;
    }
}
// TODO: consider as unnecessary
class ToolbarItemUpdateEvent extends CustomEvent {
    constructor(item) {
        super(ToolbarItemUpdateEvent.eventName, {
            detail: new ToolbarItemUpdateEventContext(item),
            bubbles: true
        });
    }
}
ToolbarItemUpdateEvent.eventName = "dxbl-toolbar-item.update";
class ToolbarItemResizedEventContext {
    constructor(size, force = false) {
        this.size = size;
        this.force = force;
    }
}
class ToolbarItemResizedEvent extends CustomEvent {
    constructor(size, force = false) {
        super(ToolbarItemResizedEvent.eventName, {
            detail: new ToolbarItemResizedEventContext(size, force),
            bubbles: true
        });
    }
}
ToolbarItemResizedEvent.eventName = "dxbl-toolbar-item.resized";
class ToolbarItemVisibilityChangedEvent extends CustomEvent {
    constructor(visible) {
        super(ToolbarItemVisibilityChangedEvent.eventName, {
            detail: { visible },
            bubbles: true
        });
    }
}
ToolbarItemVisibilityChangedEvent.eventName = "dxbl-toolbar-item.visibility-changed";
class ToolbarItemOrderedEventContext {
    constructor(item) {
        this.item = item;
    }
}
class ToolbarItemOrderedEvent extends CustomEvent {
    constructor(item) {
        super(ToolbarItemOrderedEvent.eventName, {
            detail: new ToolbarItemOrderedEventContext(item),
            bubbles: true,
            composed: true
        });
    }
}
ToolbarItemOrderedEvent.eventName = "dxbl-toolbar-item.ordered";

export { ToolbarGroupStateChangeEvent as T, ToolbarUpdateEvent as a, ToolbarItemResizedEvent as b, ToolbarItemUpdateEvent as c, ToolbarItemVisibilityChangedEvent as d, ToolbarItemOrderedEvent as e };
//# sourceMappingURL=events-24.23.js.map
