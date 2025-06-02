class CalculatedCssPropertyMapping {
    constructor(defaultValueSource, computedValueSource, valueDestination) {
        this.defaultValueSource = defaultValueSource;
        this.computedValueSource = computedValueSource;
        this.valueDestination = valueDestination;
    }
}
const calculatedProperties = [
    new CalculatedCssPropertyMapping("--bs-body-bg", "background-color", "--dxbl-body-bg"),
    new CalculatedCssPropertyMapping("--bs-body-color", "color", "--dxbl-body-color")
];
const BsCssVariableNames = ["--primary", "--bs-primary"];
const BsCssVariableRetrieveRetryCount = 50;
const BsCssVariableRetrieveAttemptDelayMs = 200;
function initializeThemeCssRuntimeVariablesCore() {
    const element = document.body;
    const styles = window.getComputedStyle(element);
    calculatedProperties.forEach(x => {
        element.style.removeProperty(x.valueDestination);
    });
    calculatedProperties
        .filter(x => !styles.getPropertyValue(x.defaultValueSource))
        .forEach(x => {
        element.style.setProperty(x.valueDestination, styles.getPropertyValue(x.computedValueSource));
    });
}
function waitForBs4Load(resolveAction, retryCount) {
    if (retryCount === 0)
        return resolveAction();
    const styles = window.getComputedStyle(document.body);
    const isBsVariablesLoaded = BsCssVariableNames
        .map(x => !!styles.getPropertyValue(x))
        .reduce((prevValue, currValue) => prevValue || currValue, false);
    if (isBsVariablesLoaded)
        return resolveAction();
    setTimeout(() => waitForBs4Load(resolveAction, retryCount - 1), BsCssVariableRetrieveAttemptDelayMs);
}
function createIFramePromise() {
    return new Promise((resolve, _) => {
        const hiddenIFrame = document.createElement("IFRAME");
        hiddenIFrame.style.cssText = "position: absolute; display: none; top: -10000px; left: -10000px;";
        hiddenIFrame.onload = () => {
            resolve(hiddenIFrame);
        };
        document.body.appendChild(hiddenIFrame);
    });
}
let hiddenIFramePromise = createIFramePromise();
async function getHiddenIFramePromise() {
    const iframe = await hiddenIFramePromise;
    if (!iframe.parentNode) {
        hiddenIFramePromise = createIFramePromise();
        return await hiddenIFramePromise;
    }
    return iframe;
}
function safeFetch(url) {
    return new Promise((resolve, _) => {
        getHiddenIFramePromise().then((hiddenIFrame) => {
            const doc = hiddenIFrame.contentDocument;
            const linkElement = doc.createElement("link");
            linkElement.href = url;
            linkElement.rel = "stylesheet";
            linkElement.onload = () => {
                resolve();
                linkElement.remove();
            };
            linkElement.onerror = () => {
                resolve();
                linkElement.remove();
            };
            doc.head.appendChild(linkElement);
        });
    });
}
function ensureStylesheetLoadedAsync(href) {
    return new Promise((resolve, _) => {
        safeFetch(href).then(() => {
            waitForBs4Load(resolve, BsCssVariableRetrieveRetryCount);
        });
    });
}
async function tryEnsureStylesheetLoadedAsync(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.tagName === "LINK") {
            const linkElement = element;
            if (linkElement.rel === "stylesheet") {
                await ensureStylesheetLoadedAsync(linkElement.href);
                return true;
            }
        }
    }
    return false;
}
function ensureRuntimeStylesInvalidated(node) {
    tryEnsureStylesheetLoadedAsync(node)
        .then(isStylesheet => {
        if (isStylesheet)
            initializeThemeCssRuntimeVariablesCore();
    });
}
function initializeThemeCssRuntimeVariables() {
    const target = document.head;
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };
    const observer = new MutationObserver((mutations, _) => {
        for (const mutation of mutations) {
            if (mutation.type === "childList" && mutation.addedNodes)
                mutation.addedNodes.forEach(ensureRuntimeStylesInvalidated);
            else if (mutation.type === "attributes" && mutation.attributeName === "href")
                ensureRuntimeStylesInvalidated(mutation.target);
        }
    });
    observer.observe(target, config);
    Promise
        .all(Array.from(document.head.childNodes)
        .map(x => tryEnsureStylesheetLoadedAsync(x)))
        .then(() => initializeThemeCssRuntimeVariablesCore());
}
const dxCssRuntime = { initializeThemeCssRuntimeVariables };

export { dxCssRuntime as default };
//# sourceMappingURL=dx-css-runtime-24.2.js.map
