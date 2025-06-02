class RafAction {
    constructor() {
        this.action = null;
        this.rafHandle = null;
    }
    execute(action) {
        this.cancel();
        this.action = action;
        this.rafHandle = requestAnimationFrame(() => {
            var _a;
            (_a = this.action) === null || _a === void 0 ? void 0 : _a.call(this);
            this.rafHandle = null;
            this.action = null;
        });
    }
    cancel() {
        if (this.rafHandle) {
            cancelAnimationFrame(this.rafHandle);
            this.action = null;
            this.rafHandle = null;
        }
    }
}

export { RafAction as R };
//# sourceMappingURL=rafaction-24.2.js.map
