/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class Subscription {
    constructor() {
        this.subscribers = [];
    }
    subscribe(callback, _ = false) {
        if (this.subscribers.indexOf(callback) === -1)
            this.subscribers.push(callback);
    }
    unsubscribe(callback) {
        const index = this.subscribers.indexOf(callback);
        if (index !== -1)
            this.subscribers.splice(index, 1);
    }
}
Subscription.Empty = new Subscription();
class Emitter extends Subscription {
    emit(data) {
        this.subscribers.forEach(s => s(data));
    }
}
class Subject extends Subscription {
    constructor(value) {
        super();
        this.isInitialized = arguments.length === 1;
        this.value = value;
    }
    update(newValue) {
        if (!this.isInitialized || newValue !== this.value) {
            this.isInitialized = true;
            this.value = newValue;
            this.subscribers.forEach(s => s(newValue));
        }
    }
    subscribe(callback, skipInit = false) {
        if (this.isInitialized && !skipInit)
            callback(this.value);
        super.subscribe(callback, skipInit);
    }
    asTrigger(valuesOrFunc) {
        const result = new Subject(null);
        if (typeof valuesOrFunc !== "function")
            this.subscribe(v => result.update(valuesOrFunc.indexOf(v) !== -1));
        else
            this.subscribe(v => result.update(valuesOrFunc(v)));
        return result;
    }
    or(subj) {
        const result = new Subject(null);
        this.subscribe(v => result.update(v || subj.value));
        subj.subscribe(v => result.update(this.value || v));
        return result;
    }
    and(subj) {
        const result = new Subject(null);
        this.subscribe(v => result.update(v && subj.value));
        subj.subscribe(v => result.update(this.value && v));
        return result;
    }
    join(subj) {
        const result = new Subject(null);
        this.subscribe(v => result.update([v, subj.value]));
        subj.subscribe(v => result.update([this.value, v]));
        return result;
    }
}

export { Emitter as E, Subject as S, Subscription as a };
//# sourceMappingURL=observables-24.2.js.map
