/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class EventRegister {
    constructor(context) {
        this.eventTokens = [];
        this.context = context;
    }
    attachEventWithContext(element, eventName, func, _context) {
        if (!this.eventTokens || !_context || !element)
            return { item: null, name: null, delegate: null, dispose: () => { } };
        const f = func.bind(_context);
        element.addEventListener(eventName, f);
        const eventToken = {
            item: element,
            name: eventName,
            delegate: f,
            dispose: () => {
                this.detachEvent(eventToken);
            }
        };
        this.eventTokens.push(eventToken);
        return eventToken;
    }
    attachEvent(element, eventName, func) {
        return this.attachEventWithContext(element, eventName, func, this.context);
    }
    detachEvent(token) {
        if (!this.eventTokens)
            return null;
        if (!token || !token.item || !token.name || !token.delegate)
            return false;
        const i = this.eventTokens.indexOf(token);
        if (i >= 0) {
            token.item.removeEventListener(token.name, token.delegate);
            this.eventTokens.splice(i, 1);
            token.item = null;
            token.delegate = null;
            token.dispose = () => { };
            return true;
        }
        return false;
    }
    dispose() {
        if (!this.eventTokens)
            return false;
        this.eventTokens.forEach(function (token) {
            if (!token.item || !token.name || !token.delegate)
                return;
            token.item.removeEventListener(token.name, token.delegate);
            token.item = null;
            token.delegate = null;
            token.dispose = () => { };
        });
        this.eventTokens = [];
        return true;
    }
}

export { EventRegister as E };
//# sourceMappingURL=eventRegister-24.2.js.map
