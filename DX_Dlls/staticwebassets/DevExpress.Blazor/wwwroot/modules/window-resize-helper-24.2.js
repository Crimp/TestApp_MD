const windowResizeListeners = [];
const currentWindowSize = { width: 0, height: 0 };
window.addEventListener("resize", (_) => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    if (currentWindowSize.height !== newHeight || currentWindowSize.width !== newWidth) {
        currentWindowSize.height = newHeight;
        currentWindowSize.width = newWidth;
        windowResizeListeners.forEach((h) => h(currentWindowSize));
    }
}, { passive: true });
function subscribeWindowResize(eventListener) {
    if (windowResizeListeners.indexOf(eventListener) > -1)
        throw new Error("already subscribed");
    windowResizeListeners.push(eventListener);
    return () => {
        const index = windowResizeListeners.indexOf(eventListener);
        if (index === -1)
            throw new Error("already un-subscribed");
        windowResizeListeners.splice(index, 1);
    };
}

function init(dotNetRef) {
    subscribeWindowResize((newSize) => {
        onWindowResize(dotNetRef, newSize.width);
    });
    onWindowResize(dotNetRef, window.innerWidth);
    return Promise.resolve("ok");
}
function onWindowResize(dotNetRef, width) {
    dotNetRef.invokeMethodAsync("OnWindowResize", width).catch(e => console.error(e));
}
function dispose() {
    return Promise.resolve("ok");
}
const windowResizeHelper = { init, dispose };

export { windowResizeHelper as default, dispose, init };
//# sourceMappingURL=window-resize-helper-24.2.js.map
