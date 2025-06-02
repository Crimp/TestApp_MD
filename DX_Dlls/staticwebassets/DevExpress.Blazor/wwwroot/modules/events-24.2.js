import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';

const dxClientComponentTag = "dxbl-client-component-wrapper";
class ClientComponentEmptyContextEvent extends CustomEvent {
    constructor(eventName) {
        super(eventName, {
            detail: new EmptyContext(),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
class ClientComponentWrapperOptionsLoadedEvent extends CustomEvent {
    constructor(optionsChunkKeys) {
        super(ClientComponentWrapperOptionsLoadedEvent.eventName, {
            detail: new ClientComponentWrappeOptionsLoadedContext(optionsChunkKeys),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ClientComponentWrapperOptionsLoadedEvent.eventName = `${dxClientComponentTag}.options-loaded`;
class ClientComponentWrapperLoadingPanelVisibilityChangedEvent extends CustomEvent {
    constructor(visible) {
        super(ClientComponentWrapperLoadingPanelVisibilityChangedEvent.eventName, {
            detail: new LoadingPanelVisibilityChangedEventContext(visible),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
ClientComponentWrapperLoadingPanelVisibilityChangedEvent.eventName = `${dxClientComponentTag}.loading-panel-visibility-changed`;
class EmptyContext {
}
class ClientComponentWrappeOptionsLoadedContext {
    constructor(optionsChunkKeys) {
        this.OptionChunkKeys = optionsChunkKeys;
    }
}
class LoadingPanelVisibilityChangedEventContext {
    constructor(visible) {
        this.Visible = visible;
    }
}
CustomEventsHelper.register(ClientComponentWrapperOptionsLoadedEvent.eventName, x => x.detail);
CustomEventsHelper.register(ClientComponentWrapperLoadingPanelVisibilityChangedEvent.eventName, x => x.detail);

export { ClientComponentEmptyContextEvent as C, ClientComponentWrapperLoadingPanelVisibilityChangedEvent as a, ClientComponentWrapperOptionsLoadedEvent as b };
//# sourceMappingURL=events-24.2.js.map
