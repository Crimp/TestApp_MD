class CustomEventsHelper {
    static register(name, handler) {
        var _a;
        (_a = window.Blazor) === null || _a === void 0 ? void 0 : _a.registerCustomEventType(name, {
            createEventArgs: handler
        });
    }
}

export { CustomEventsHelper as C };
//# sourceMappingURL=custom-events-helper-24.2.js.map
