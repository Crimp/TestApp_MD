class EventHelper {
    static markHandled(e, immediate = true) {
        if (e.cancelable)
            e.preventDefault();
        e.stopPropagation();
        if (immediate)
            e.stopImmediatePropagation();
    }
    static stopPropagation(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    static getOriginalSource(e) {
        const composed = e.composedPath();
        return composed[0];
    }
    static containsInComposedPath(event, predicate) {
        const composed = event.composedPath();
        for (const index in composed) {
            if (predicate(composed[index]))
                return true;
        }
        return false;
    }
    static getEventSource(e) {
        var _a;
        return (_a = e.srcElement) !== null && _a !== void 0 ? _a : e.target;
    }
}

export { EventHelper as E };
//# sourceMappingURL=eventhelper-24.2.js.map
