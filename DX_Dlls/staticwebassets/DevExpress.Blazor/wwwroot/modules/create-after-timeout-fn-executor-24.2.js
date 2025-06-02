const DrawnTimerDelay = 100;
function createFnAfterTimeoutExecutor(handler) {
    let timerId = -1;
    return {
        execute: function () {
            this.reset();
            timerId = setTimeout(handler, DrawnTimerDelay);
        },
        reset: function () {
            if (timerId !== -1)
                clearTimeout(timerId);
        },
    };
}

export { createFnAfterTimeoutExecutor as c };
//# sourceMappingURL=create-after-timeout-fn-executor-24.2.js.map
