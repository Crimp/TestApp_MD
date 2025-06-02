import { d as devices } from './devices-24.2.js';

function scrollIntoView(element, containerId) {
    const container = element.ownerDocument.getElementById(containerId);
    if (container !== null) {
        const parentBox = container.getBoundingClientRect();
        const elementBox = element.getBoundingClientRect();
        return new Promise((resolve, _) => {
            requestAnimationFrame((_) => {
                if (!(element.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_DISCONNECTED) &&
                    parentBox.top > elementBox.top && container.scrollTop > 0)
                    container.scrollTop = 0;
                resolve();
            });
        });
    }
    return Promise.resolve();
}
// https://learn.microsoft.com/en-us/aspnet/core/blazor/file-downloads
async function downloadFileFromStream(fileName, streamReference) {
    const arrayBuffer = await streamReference.arrayBuffer();
    const fileUrl = URL.createObjectURL(new Blob([arrayBuffer]));
    const element = document.createElement("a");
    document.body.appendChild(element); // fix T1164089 - blazor maui
    element.href = fileUrl;
    element.download = fileName !== null && fileName !== void 0 ? fileName : "";
    element.click();
    element.remove();
    URL.revokeObjectURL(fileUrl);
    return Promise.resolve();
}
async function sendFileOptions(mainElement, streamReference) {
    const uploadControl = mainElement.isConnected ? mainElement : null;
    if (uploadControl !== null) {
        const arrayBuffer = await streamReference.arrayBuffer();
        const serializedOptions = new TextDecoder("utf-8").decode(arrayBuffer);
        const options = JSON.parse(serializedOptions);
        uploadControl.processUploadedFilesOptions(options);
    }
    return Promise.resolve();
}
async function waitUntilElementLoaded(tagName) {
    const element = customElements.get(tagName);
    if (element)
        return;
    await customElements.whenDefined(tagName);
}
async function showFileSelectorDialog(mainElement) {
    const uploadControl = mainElement.isConnected ? mainElement : null;
    if (uploadControl !== null)
        uploadControl.showFileSelectorDialog();
    return Promise.resolve();
}
async function invokeMethod(target, methodName, ...args) {
    return new Promise((resolve, reject) => {
        try {
            const method = target[methodName];
            const result = method.call(target, args);
            if (result.then)
                result.then(resolve);
            else
                resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}
async function copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext)
        return await navigator.clipboard.writeText(textToCopy);
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    textArea.style.height = "0px";
    textArea.style.width = "0px";
    document.body.prepend(textArea);
    textArea.select();
    try {
        document.execCommand("copy");
    }
    catch (error) {
        console.error(error);
    }
    finally {
        textArea.remove();
    }
}
class GetLayoutAttributes {
    constructor(targetWidth, targetHeight, targetPositionX, targetPositionY, viewPortWidth, viewPortHeight, viewPortScrollWidth, viewPortScrollHeight) {
        this.targetWidth = 0;
        this.targetHeight = 0;
        this.targetPositionX = 0;
        this.targetPositionY = 0;
        this.viewPortWidth = 0;
        this.viewPortHeight = 0;
        this.viewPortScrollHeight = 0;
        this.viewPortScrollWidth = 0;
        this.targetWidth = targetWidth;
        this.targetHeight = targetHeight;
        this.targetPositionX = targetPositionX;
        this.targetPositionY = targetPositionY;
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;
        this.viewPortScrollWidth = viewPortScrollWidth;
        this.viewPortScrollHeight = viewPortScrollHeight;
    }
}
function getElement(htmlElement) {
    if (!htmlElement)
        throw new Error("failed");
    return htmlElement;
}
function getLayoutAttributes(positionTarget) {
    const positionTargetElement = document.querySelector(positionTarget);
    if (positionTarget === null)
        throw new Error("Position target does not exist");
    if (positionTargetElement === null) {
        console.warn("Could not find an element by the specified position target");
        return getDefaultLayoutAttributes();
    }
    const boundingRect = positionTargetElement.getBoundingClientRect();
    return new GetLayoutAttributes(Math.floor(boundingRect.width), Math.floor(boundingRect.height), Math.floor(boundingRect.x), Math.floor(boundingRect.y), Math.floor(window.innerWidth), Math.floor(window.innerHeight), Math.floor(window.scrollX), Math.floor(window.scrollY));
}
function getDeviceInfo(useUAData, useNativeDetection) {
    return devices.getDeviceInfo(useUAData, useNativeDetection);
}
function getInputValue(element) {
    return element.value;
}
function setInputValue(element, value) {
    element.value = value;
}
function getDefaultLayoutAttributes() {
    const bodyElement = document.querySelector("body");
    const boundingRect = bodyElement.getBoundingClientRect();
    return new GetLayoutAttributes(Math.floor(boundingRect.width / 2), Math.floor(boundingRect.height), Math.floor(boundingRect.width / 2), Math.floor(boundingRect.height), Math.floor(window.innerWidth), Math.floor(window.innerHeight), Math.floor(window.scrollX), Math.floor(window.scrollY));
}

export { copyToClipboard, downloadFileFromStream, getDeviceInfo, getElement, getInputValue, getLayoutAttributes, invokeMethod, scrollIntoView, sendFileOptions, setInputValue, showFileSelectorDialog, waitUntilElementLoaded };
//# sourceMappingURL=after-render-utils.js.map
