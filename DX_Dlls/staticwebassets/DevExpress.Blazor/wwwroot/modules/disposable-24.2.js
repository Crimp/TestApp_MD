function generateDisposeIdCore() {
    const rawId = (62135596800000 + (new Date()).getTime()).toString() + getRandomInt(1, 1000).toString();
    return parseInt(rawId);
}
function generateDisposeId() {
    let id;
    do
        id = generateDisposeIdCore();
    while (Disposable[id]);
    return id.toString();
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function disposeEvents(element) {
    const disposeId = element.dataset.disposeId ? parseInt(element.dataset.disposeId) : -1;
    if (disposeId > -1) {
        Disposable[disposeId]();
        delete Disposable[disposeId];
        delete element.dataset.disposeId;
    }
    logDisposableCount();
}
function registerDisposableEvents(element, dispose) {
    if (!element.dataset.disposeId)
        element.dataset.disposeId = generateDisposeId();
    Disposable[parseInt(element.dataset.disposeId)] = dispose;
    logDisposableCount();
}
const Disposable = [];
function logDisposableCount() {
    Disposable.filter(d => d).length;
}

export { disposeEvents as d, registerDisposableEvents as r };
//# sourceMappingURL=disposable-24.2.js.map
