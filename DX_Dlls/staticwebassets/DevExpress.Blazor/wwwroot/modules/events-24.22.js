import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';

var NavigationAction;
(function (NavigationAction) {
    NavigationAction[NavigationAction["Expand"] = 0] = "Expand";
    NavigationAction[NavigationAction["Collapse"] = 1] = "Collapse";
    NavigationAction[NavigationAction["Check"] = 2] = "Check";
})(NavigationAction || (NavigationAction = {}));
class NavigationActionRequestEvent extends CustomEvent {
    constructor(action) {
        super(NavigationActionRequestEvent.eventName, {
            detail: { action },
            bubbles: true,
            composed: false,
            cancelable: true,
        });
    }
}
NavigationActionRequestEvent.eventName = "dxbl-navigation.action-request";
CustomEventsHelper.register(NavigationActionRequestEvent.eventName, x => {
    return x.detail;
});

export { NavigationAction as N, NavigationActionRequestEvent as a };
//# sourceMappingURL=events-24.22.js.map
