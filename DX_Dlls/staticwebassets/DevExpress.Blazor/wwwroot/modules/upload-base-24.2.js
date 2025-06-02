import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { n } from './property-24.2.js';

const uploadTagName = "dxbl-upload";
class UploadProgressEventArgs {
    constructor(progress) {
        this.progress = progress;
    }
}
class CustomizeFormDataEventArgs {
    constructor(requestOptions) {
        this.requestOptions = requestOptions;
    }
}
class ErrorOccurredEventArgs {
    constructor(lastErrorCode) {
        this.lastErrorCode = lastErrorCode;
    }
}
class UploadProgressEvent extends CustomEvent {
    constructor(progress) {
        super(UploadProgressEvent.eventName, {
            detail: new UploadProgressEventArgs(progress),
            bubbles: true,
            composed: true
        });
    }
}
UploadProgressEvent.eventName = uploadTagName + ".uploadprogress";
CustomEventsHelper.register(UploadProgressEvent.eventName, x => {
    return x.detail;
});
class CustomizeFormDataEvent extends CustomEvent {
    constructor(requestOptions) {
        super(CustomizeFormDataEvent.eventName, {
            detail: new CustomizeFormDataEventArgs(requestOptions),
            bubbles: true,
            composed: true
        });
    }
}
CustomizeFormDataEvent.eventName = uploadTagName + ".customizeformdata";
CustomEventsHelper.register(CustomizeFormDataEvent.eventName, x => {
    return x.detail;
});
class ErrorOccurredEvent extends CustomEvent {
    constructor(lastErrorCode) {
        super(ErrorOccurredEvent.eventName, {
            detail: new ErrorOccurredEventArgs(lastErrorCode),
            bubbles: true,
            composed: true
        });
    }
}
ErrorOccurredEvent.eventName = uploadTagName + ".erroroccurred";
CustomEventsHelper.register(ErrorOccurredEvent.eventName, x => x.detail);

const FILE_UPLOADER_CHUNK_META_DATA_NAME = "chunkMetadata";
const MAX_CONCURRENT_UPLOADS = 10;
var UploadAttributes;
(function (UploadAttributes) {
    UploadAttributes["acceptedFileTypes"] = "accepted-file-types";
    UploadAttributes["allowedFileExtensions"] = "allowed-file-extensions";
    UploadAttributes["externalSelectButtonCssSelector"] = "external-select-button-css-selector";
    UploadAttributes["showEmbeddedSelectButton"] = "show-embedded-select-button";
    UploadAttributes["chunkSize"] = "chunk-size";
    UploadAttributes["maxFileSize"] = "max-file-size";
    UploadAttributes["minFileSize"] = "min-file-size";
    UploadAttributes["maxFileCount"] = "max-file-count";
    UploadAttributes["multiple"] = "multiple";
    UploadAttributes["uploadMode"] = "upload-mode";
    UploadAttributes["uploadTechnology"] = "upload-technology";
    UploadAttributes["dragOverClassName"] = "drag-over-class-name";
    UploadAttributes["dropZoneCssSelector"] = "drop-zone-css-selector";
    UploadAttributes["customizeFormData"] = "customize-form-data";
})(UploadAttributes || (UploadAttributes = {}));
var UploadMode;
(function (UploadMode) {
    UploadMode[UploadMode["Instant"] = 0] = "Instant";
    UploadMode[UploadMode["OnButtonClick"] = 1] = "OnButtonClick";
})(UploadMode || (UploadMode = {}));
var UploadTechnology;
(function (UploadTechnology) {
    UploadTechnology[UploadTechnology["Http"] = 0] = "Http";
    UploadTechnology[UploadTechnology["JsInterop"] = 1] = "JsInterop";
})(UploadTechnology || (UploadTechnology = {}));
var FileStatus;
(function (FileStatus) {
    FileStatus[FileStatus["WaitingStart"] = 0] = "WaitingStart";
    FileStatus[FileStatus["PendingUpload"] = 1] = "PendingUpload";
    FileStatus[FileStatus["Uploading"] = 2] = "Uploading";
    FileStatus[FileStatus["Paused"] = 3] = "Paused";
    FileStatus[FileStatus["Complete"] = 4] = "Complete";
    FileStatus[FileStatus["Canceled"] = 5] = "Canceled";
    FileStatus[FileStatus["Error"] = 6] = "Error";
    FileStatus[FileStatus["Removing"] = 7] = "Removing";
})(FileStatus || (FileStatus = {}));
var UploadClientErrorCode;
(function (UploadClientErrorCode) {
    UploadClientErrorCode[UploadClientErrorCode["MaxFileCountExceeded"] = 0] = "MaxFileCountExceeded";
    UploadClientErrorCode[UploadClientErrorCode["DragAndDropMultipleFiles"] = 1] = "DragAndDropMultipleFiles";
})(UploadClientErrorCode || (UploadClientErrorCode = {}));
class ActionRequest {
    constructor() {
        this.guids = [];
        this.actions = [];
        this.reloadedFileGuids = [];
    }
}
class FileChunkMetadata {
    constructor(fileItem) {
        this.FileName = fileItem.fileInfo.name;
        this.FileSize = fileItem.fileInfo.size;
        this.FileType = fileItem.fileInfo.type;
        this.LastModified = fileItem.fileInfo.lastModified;
        this.FileGuid = fileItem.fileInfo.guid;
        this.Index = fileItem.chunkIndex;
        this.TotalCount = fileItem.totalChunkCount;
    }
}
class UploadFileItem {
    constructor(inputFile, guid, options) {
        this._value = inputFile;
        this._status = options.uploadMode === UploadMode.Instant ? FileStatus.PendingUpload : FileStatus.WaitingStart;
        this._chunkIndex = 0;
        this._loadedBytes = 0;
        this._totalChunkCount = 0;
        this._isFileExtensionValid = UploadFileItem.validateFileExtension(inputFile, options);
        this._isMinSizeValid = UploadFileItem.validateMinFileSize(inputFile, options);
        this._isMaxSizeValid = UploadFileItem.validateMaxFileSize(inputFile, options);
        this._fileInfo = {
            name: inputFile.name,
            size: inputFile.size,
            type: inputFile.type,
            lastModified: (inputFile.lastModified * 10000) + 621355968000000000,
            guid: guid
        };
        this._request = null;
        this._onLoadStart = null;
        this._onProgress = null;
        this._onAbort = null;
        this._onPause = null;
        this._onError = null;
        this._onLoadEnd = null;
        if (!this.isValid())
            this._status = FileStatus.Error;
    }
    get value() {
        return this._value;
    }
    get status() {
        return this._status;
    }
    set status(_status) {
        this._status = _status;
    }
    get chunkIndex() {
        return this._chunkIndex;
    }
    set chunkIndex(value) {
        this._chunkIndex = value;
    }
    get loadedBytes() {
        return this._loadedBytes;
    }
    set loadedBytes(value) {
        this._loadedBytes = value;
    }
    get totalChunkCount() {
        return this._totalChunkCount;
    }
    set totalChunkCount(value) {
        this._totalChunkCount = value;
    }
    get isFileExtensionValid() {
        return this._isFileExtensionValid;
    }
    get isMinSizeValid() {
        return this._isMinSizeValid;
    }
    get isMaxSizeValid() {
        return this._isMaxSizeValid;
    }
    get fileInfo() {
        return this._fileInfo;
    }
    get request() {
        return this._request;
    }
    set request(value) {
        this._request = value;
    }
    get onLoadStart() {
        return this._onLoadStart;
    }
    set onLoadStart(callback) {
        this._onLoadStart = callback;
    }
    get onProgress() {
        return this._onProgress;
    }
    set onProgress(callback) {
        this._onProgress = callback;
    }
    get onAbort() {
        return this._onAbort;
    }
    set onAbort(callback) {
        this._onAbort = callback;
    }
    get onError() {
        return this._onError;
    }
    set onError(callback) {
        this._onError = callback;
    }
    get onLoadEnd() {
        return this._onLoadEnd;
    }
    set onLoadEnd(callback) {
        this._onLoadEnd = callback;
    }
    isValid() {
        return this.isFileExtensionValid && this.isMaxSizeValid && this.isMinSizeValid;
    }
    isUploadComplete() {
        return this.loadedBytes >= this.fileInfo.size;
    }
    loadStart() {
        if (this.status !== FileStatus.Uploading) {
            this.status = FileStatus.Uploading;
            if (this.onLoadStart)
                this.onLoadStart.call(this);
        }
    }
    progress() {
        if (this.onProgress)
            this.onProgress.call(this);
    }
    loadEnd() {
        if (this.isUploadComplete()) {
            this.status = FileStatus.Complete;
            if (this.onLoadEnd)
                this.onLoadEnd.call(this);
        }
    }
    abort(raiseEvent = true) {
        if (this.status === FileStatus.Canceled)
            return;
        this.status = FileStatus.Canceled;
        if (this.request)
            this.request.abort();
        if (raiseEvent && this.onAbort)
            this.onAbort.call(this);
        this.chunkIndex = 0;
        this.loadedBytes = 0;
    }
    error(e) {
        this.status = FileStatus.Error;
        if (this.onError)
            this.onError.call(this, e);
    }
    static validateFileExtension(file, options) {
        const allowedExtensions = options.allowedFileExtensions;
        const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        if (allowedExtensions.length === 0)
            return true;
        for (let i = 0; i < allowedExtensions.length; i++) {
            if (fileExtension === allowedExtensions[i].toLowerCase())
                return true;
        }
        return false;
    }
    static validateMinFileSize(file, options) {
        const fileSize = file.size;
        const minFileSize = options.minFileSize;
        return minFileSize > 0 ? fileSize >= minFileSize : true;
    }
    static validateMaxFileSize(file, options) {
        const fileSize = file.size;
        const maxFileSize = options.maxFileSize;
        return maxFileSize > 0 ? fileSize <= maxFileSize : true;
    }
    updateStatus(status, args) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.status = status;
        switch (this.status) {
            case FileStatus.WaitingStart:
                break;
            case FileStatus.PendingUpload:
                break;
            case FileStatus.Uploading:
                (_a = this.onLoadStart) === null || _a === void 0 ? void 0 : _a.call(this); // TODO
                break;
            case FileStatus.Paused:
                break;
            case FileStatus.Complete:
                this.loadedBytes = this.value.size;
                (_b = this.onLoadEnd) === null || _b === void 0 ? void 0 : _b.call(this);
                break;
            case FileStatus.Canceled:
                (_c = this.onAbort) === null || _c === void 0 ? void 0 : _c.call(this); // TODO
                break;
            case FileStatus.Error: {
                const eventTargetMock = new EventTarget();
                eventTargetMock.status = (_d = args === null || args === void 0 ? void 0 : args["status"]) !== null && _d !== void 0 ? _d : -1;
                eventTargetMock.statusText = (_e = args === null || args === void 0 ? void 0 : args["statusText"]) !== null && _e !== void 0 ? _e : "Unexpected error";
                eventTargetMock.responseText = (_f = args === null || args === void 0 ? void 0 : args["responseText"]) !== null && _f !== void 0 ? _f : "Unexpected error";
                (_g = this.onError) === null || _g === void 0 ? void 0 : _g.call(this, eventTargetMock);
                break;
            }
        }
    }
}
class FileUploaderBase {
    constructor(control) {
        this.control = control;
        this.requestMetadata = null;
    }
    customizeFormData(requestOptions) {
        this.control.dispatchEvent(new CustomizeFormDataEvent(requestOptions));
        return Promise.resolve();
    }
}
class ChunkFileUploader extends FileUploaderBase {
    constructor(control) {
        super(control);
    }
    upload(file, options, customData, loadEnd) {
        if (!file)
            return Promise.reject();
        if (!file.totalChunkCount) {
            file.chunkIndex = 0;
            file.totalChunkCount = ChunkFileUploader.calculateTotalChunkCount(file.fileInfo.size, options);
        }
        const loadedSize = options.chunkSize * file.chunkIndex;
        const blob = file.value.slice(loadedSize, loadedSize + options.chunkSize);
        this.requestMetadata = { formData: new FormData(), request: options, file, loadEnd };
        return this.createFormData(options.name, blob, file, customData);
    }
    createFormData(name, blob, file, customData) {
        var _a, _b;
        const chunkMetadata = new FileChunkMetadata(file);
        (_a = this.requestMetadata) === null || _a === void 0 ? void 0 : _a.formData.append(name, blob);
        (_b = this.requestMetadata) === null || _b === void 0 ? void 0 : _b.formData.append(FILE_UPLOADER_CHUNK_META_DATA_NAME, JSON.stringify(chunkMetadata));
        if (!this.control.customizeFormData && !customData)
            customData = {};
        if (customData)
            return this.onCustomizeChunkMetadataResponse(customData);
        else
            return this.customizeFormData(chunkMetadata);
    }
    onCustomizeChunkMetadataResponse(result) {
        return new Promise((resolve, reject) => {
            if (this.requestMetadata == null) {
                reject();
                return;
            }
            const { formData, request: options, file, loadEnd } = this.requestMetadata;
            if (file.status === FileStatus.Paused || file.status === FileStatus.Canceled) {
                reject();
                return;
            }
            for (const name in result) {
                if (Object.prototype.hasOwnProperty.call(result, name)) {
                    const value = result[name];
                    formData.append(name, value instanceof Object ? JSON.stringify(value) : value);
                }
            }
            for (const name in options.requestData) {
                if (Object.prototype.hasOwnProperty.call(options.requestData, name))
                    formData.append(name, options.requestData[name]);
            }
            file.request = Ajax.sendRequest(formData, {
                crossDomain: false,
                url: options.uploadUrl,
                method: "POST",
                headers: options.requestHeaders,
                onAbort: () => {
                    file.abort();
                    reject();
                },
                onProgress: () => {
                },
                onError: (e) => {
                    if (e.target)
                        file.error(e.target);
                    reject();
                },
                onLoadStart: () => {
                    file.loadStart();
                },
                onLoad: (e) => {
                    if (!e.target)
                        return;
                    if (e.target.status === 200) {
                        const blob = formData.get(options.name);
                        file.chunkIndex++;
                        file.loadedBytes += blob.size;
                        file.progress();
                        loadEnd(file)
                            .then(resolve, reject)
                            .catch(() => {
                            reject();
                            file.error(e.target);
                        });
                    }
                    else {
                        file.error(e.target);
                        reject();
                    }
                },
                onLoadEnd: null
            });
        });
    }
    static calculateTotalChunkCount(fileSize, options) {
        let result = Math.trunc(fileSize / options.chunkSize);
        if ((fileSize % options.chunkSize) > 0)
            result++;
        return result;
    }
}
class WholeFileUploader extends FileUploaderBase {
    constructor(control) {
        super(control);
    }
    upload(file, options, customData, loadEnd) {
        if (!file)
            return Promise.reject();
        this.requestMetadata = { formData: new FormData(), request: options, file, loadEnd };
        return this.createFormData(options.name, file, customData);
    }
    createFormData(name, file, customData) {
        var _a;
        (_a = this.requestMetadata) === null || _a === void 0 ? void 0 : _a.formData.append(name, file.value);
        return this.onCustomizeChunkMetadataResponse(customData || {});
    }
    onCustomizeChunkMetadataResponse(_result) {
        return new Promise((resolve, reject) => {
            if (this.requestMetadata == null) {
                reject();
                return;
            }
            const { formData, request: options, file, loadEnd } = this.requestMetadata;
            for (const name in options.requestData) {
                if (Object.prototype.hasOwnProperty.call(options.requestData, name))
                    formData.append(name, options.requestData[name]);
            }
            let progressHandled = false;
            file.request = Ajax.sendRequest(formData, {
                url: options.uploadUrl,
                method: "POST",
                headers: options.requestHeaders,
                crossDomain: false,
                onProgress: (e) => {
                    progressHandled = true;
                    file.loadedBytes = e.loaded > file.fileInfo.size ? file.fileInfo.size : e.loaded;
                    file.progress();
                },
                onAbort: (_) => {
                    file.abort();
                    reject();
                },
                onError: (e) => {
                    if (e.target)
                        file.error(e.target);
                    reject();
                },
                onLoadStart: (_) => {
                    file.loadStart();
                },
                onLoad: (e) => {
                    if (!e.target)
                        return;
                    if (e.target.status === 200) {
                        if (!progressHandled) {
                            file.loadedBytes = file.fileInfo.size;
                            file.progress();
                        }
                        loadEnd(file, e)
                            .then(resolve, reject)
                            .catch(() => {
                            reject();
                            file.error(e.target);
                        });
                    }
                    else {
                        file.error(e.target);
                        reject();
                    }
                },
                onLoadEnd: null
            });
        });
    }
}
class Ajax {
    static sendRequest(data, options) {
        const xhr = new XMLHttpRequest();
        options.crossDomain = Ajax.isCrossDomain(options.url);
        const headers = Ajax.getRequestHeaders(options);
        xhr.open(options.method, options.url, true);
        if (options.onLoadStart)
            xhr.upload.onloadstart = options.onLoadStart;
        if (options.onLoad)
            xhr.onload = options.onLoad;
        if (options.onLoadEnd)
            xhr.upload.onloadend = options.onLoadEnd;
        if (options.onProgress)
            xhr.upload.onprogress = options.onProgress;
        if (options.onError)
            xhr.upload.onerror = options.onError;
        if (options.onAbort)
            xhr.upload.onabort = options.onAbort;
        for (const name in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, name) && headers[name])
                xhr.setRequestHeader(name, headers[name]);
        }
        xhr.send(data);
        return xhr;
    }
    static getRequestHeaders(options) {
        const headers = options.headers || {};
        headers["Accept"] = headers["Accept"] || Ajax.getAcceptHeader();
        if (!options.crossDomain && !headers["X-Requested-With"])
            headers["X-Requested-With"] = "XMLHttpRequest";
        return headers;
    }
    static getAcceptHeader() {
        return "*/*";
    }
    static isCrossDomain(url) {
        let crossDomain = false;
        const originAnchor = document.createElement("a");
        const urlAnchor = document.createElement("a");
        originAnchor.href = window.location.href;
        try {
            urlAnchor.href = url;
            // NOTE: IE11
            // eslint-disable-next-line no-self-assign
            urlAnchor.href = urlAnchor.href;
            crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                urlAnchor.protocol + "//" + urlAnchor.host;
        }
        catch (e) {
            crossDomain = true;
        }
        return crossDomain;
    }
}

const INITIAL_TIMEOUT = 50;
const GENERAL_TIMEOUT = 200;
const IDLE_TIMEOUT = 1000;
class ProgressDispatcher {
    constructor(control) {
        this.control = control;
        this.state = new ProgressState();
        this.indexMap = new Map();
        this.dispatchTimerId = -1;
        this.idleTimerId = -1;
    }
    dispatch(type, file, error = null) {
        const fileIndex = this.getFileIndex(file);
        const progress = new FileProgress(fileIndex, type, file.loadedBytes, file.status);
        this.state.progressInfos.push(progress);
        if (error)
            this.state.errors.push(error);
        this.tryPerformDispatch();
    }
    forceDelayedDispatch() {
        if (this.dispatchTimerId !== -1)
            clearTimeout(this.dispatchTimerId);
        this.performDispatch();
    }
    tryPerformDispatch() {
        if (this.dispatchTimerId === -1) {
            let timeout = INITIAL_TIMEOUT;
            if (this.idleTimerId !== -1) {
                clearTimeout(this.idleTimerId);
                this.idleTimerId = -1;
                timeout = GENERAL_TIMEOUT;
            }
            this.dispatchTimerId = setTimeout(() => this.performDispatch(), timeout);
        }
    }
    performDispatch() {
        this.dispatchTimerId = -1;
        this.control.dispatchEvent(new UploadProgressEvent(this.state));
        this.state = new ProgressState();
        this.indexMap.clear();
        this.idleTimerId = setTimeout(() => {
            this.idleTimerId = -1;
        }, IDLE_TIMEOUT);
    }
    cancelSendingOfLastEvent() {
        clearTimeout(this.dispatchTimerId);
        this.dispatchTimerId = -1;
    }
    getFileIndex(file) {
        let result = this.indexMap.get(file.fileInfo.guid);
        if (result !== undefined)
            return result;
        result = this.state.fileGuids.length;
        this.state.fileGuids.push(file.fileInfo.guid);
        this.indexMap.set(file.fileInfo.guid, result);
        return result;
    }
}
class ProgressState {
    constructor() {
        this.fileGuids = [];
        this.progressInfos = [];
        this.errors = [];
    }
}
class FileProgress {
    constructor(index, type, loaded, status) {
        this.index = index;
        this.type = type;
        this.loaded = loaded;
        this.status = status;
    }
}
var ProgressType;
(function (ProgressType) {
    ProgressType[ProgressType["Started"] = 0] = "Started";
    ProgressType[ProgressType["Progress"] = 1] = "Progress";
    ProgressType[ProgressType["Uploaded"] = 2] = "Uploaded";
    ProgressType[ProgressType["Aborted"] = 3] = "Aborted";
    ProgressType[ProgressType["Error"] = 4] = "Error";
})(ProgressType || (ProgressType = {}));

class UploadCssClasses {
}
UploadCssClasses.MainElement = CssClasses.Prefix + "-upload";
UploadCssClasses.SelectButton = UploadCssClasses.MainElement + "-select-btn";

var UploadInputAttributes;
(function (UploadInputAttributes) {
    UploadInputAttributes["accept"] = "accept";
    UploadInputAttributes["multiple"] = "multiple";
})(UploadInputAttributes || (UploadInputAttributes = {}));

class UploadBase extends SingleSlotElementBase {
    constructor() {
        super();
        this.onInputChangeHandler = this.onFileInputChange.bind(this);
        this.onSelectButtonClickHandler = this.onSelectButtonClick.bind(this);
        this.onFilesDropHandler = this.onFilesDrop.bind(this);
        this.onFilesDragOverHandler = this.onFilesDragOver.bind(this);
        this.onFilesDragLeaveHandler = this.onFilesDragLeave.bind(this);
        this.acceptedFileTypes = null;
        this.allowedFileExtensions = [];
        this.externalSelectButtonCssSelector = "";
        this.showEmbeddedSelectButton = true;
        this.chunkSize = 0;
        this.maxFileSize = 0;
        this.minFileSize = 0;
        this.maxFileCount = 1000;
        this.multiple = false;
        this.uploadMode = UploadMode.Instant;
        this.uploadTechnology = UploadTechnology.Http;
        this.dragOverClassName = "";
        this.dropZoneCssSelector = "";
        this.customizeFormData = false;
        this.files = new Map();
        this.progressDispatcher = new ProgressDispatcher(this);
        this.recentlyAddedFilesStream = null;
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.initEvents();
        this.prepareInputElement();
    }
    initDotNetReference(dotnetHelper) {
        this.dotnetHelper = dotnetHelper;
        if (this.dotnetHelper)
            this.attachSelectButtonClickHandler();
    }
    updateFileStatus(fileGuid, status, args) {
        var _a, _b;
        (_b = (_a = this.files.get(fileGuid)) === null || _a === void 0 ? void 0 : _a.updateStatus) === null || _b === void 0 ? void 0 : _b.call(_a, status, args);
    }
    getFileBytes(fileGuid) {
        var _a;
        return (_a = this.files.get(fileGuid)) === null || _a === void 0 ? void 0 : _a.value;
    }
    getFileInput() {
        return this.querySelector("input");
    }
    getSelectButton(buttonSelector) {
        buttonSelector !== null && buttonSelector !== void 0 ? buttonSelector : (buttonSelector = this.externalSelectButtonCssSelector);
        return (buttonSelector
            ? document.querySelector(buttonSelector)
            : this.querySelector(`.${UploadCssClasses.SelectButton}`));
    }
    getDropZoneContainer() {
        return this.dropZoneCssSelector ? document.querySelector(this.dropZoneCssSelector) : null;
    }
    initEvents() {
        this.getFileInput().addEventListener("change", this.onInputChangeHandler);
        if (this.dotnetHelper)
            this.attachSelectButtonClickHandler();
        const dropZoneContainer = this.getDropZoneContainer();
        if (dropZoneContainer) {
            dropZoneContainer.addEventListener("drop", this.onFilesDropHandler);
            dropZoneContainer.addEventListener("dragover", this.onFilesDragOverHandler);
            dropZoneContainer.addEventListener("dragleave", this.onFilesDragLeaveHandler);
        }
    }
    attachSelectButtonClickHandler() {
        var _a;
        (_a = this.getSelectButton()) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.onSelectButtonClickHandler);
    }
    detachSelectButtonClickHandler(buttonSelector) {
        var _a;
        (_a = this.getSelectButton(buttonSelector)) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.onSelectButtonClickHandler);
    }
    prepareInputElement() {
        const fileInputElement = this.getFileInput();
        if (this.multiple)
            fileInputElement.setAttribute(UploadInputAttributes.multiple, "");
        else
            fileInputElement.removeAttribute(UploadInputAttributes.multiple);
        if (this.acceptedFileTypes)
            fileInputElement.setAttribute(UploadInputAttributes.accept, this.acceptedFileTypes.join(","));
    }
    onFileInputChange(_) {
        this.addFiles(this.createFileItems(this.getFileInput().files));
        this.getFileInput().value = "";
    }
    onSelectButtonClick(_) {
        this.getFileInput().click();
    }
    onFilesDrop(evt) {
        evt.preventDefault();
        this.addFiles(this.createFileItems(this.getFileFromDataTransfer(evt.dataTransfer)));
        this.onFilesDragLeave(evt);
    }
    onFilesDragOver(evt) {
        if (this.dragOverClassName && evt.srcElement)
            dom.DomUtils.addClassName(evt.srcElement, this.dragOverClassName);
        evt.preventDefault();
    }
    onFilesDragLeave(evt) {
        if (this.dragOverClassName)
            dom.DomUtils.removeClassName(evt.srcElement, this.dragOverClassName);
    }
    raiseErrorOccurred(lastErrorCode) {
        this.dispatchEvent(new ErrorOccurredEvent(lastErrorCode));
    }
    createFileItems(files) {
        if (!files)
            return [];
        const result = [];
        const allowedTypes = this.getAllowedFileTypes();
        for (let i = 0, inputFile = files[i]; inputFile; i++, inputFile = files[i]) {
            const item = new UploadFileItem(inputFile, this.getUUID4(), this);
            if (item.isValid() && allowedTypes && !this.isFileTypeAllowed(files[i], allowedTypes))
                continue;
            result.push(item);
        }
        return result;
    }
    isFileTypeAllowed(file, allowedTypes) {
        return allowedTypes.some(function (type) {
            if (type[0] === ".") {
                type = type.replace(".", "\\.");
                if (file.name.match(new RegExp(type + "$", "i")))
                    return true;
            }
            else {
                type = type.replace("*", "");
                if (file.type.match(new RegExp(type, "i")))
                    return true;
            }
        });
    }
    addFiles(files) {
        if (!this.dotnetHelper)
            return;
        if (files.length === 0)
            return;
        if (this.maxFileCount > 0 && this.files.size + files.length > this.maxFileCount) {
            this.raiseErrorOccurred(UploadClientErrorCode.MaxFileCountExceeded);
            return;
        }
        files.forEach((f) => this.files.set(f.fileInfo.guid, f));
        this.registerFileInfos(files);
    }
    registerFileInfos(files) {
        var _a;
        this.recentlyAddedFilesStream = new TextEncoder().encode(JSON.stringify(this.getFileInfosCollection(files)));
        (_a = this.dotnetHelper) === null || _a === void 0 ? void 0 : _a.invokeMethodAsync("RegisterAddedFiles", this.recentlyAddedFilesStream.length);
    }
    getRecentlyAddedFileInfosStream() {
        return this.recentlyAddedFilesStream;
    }
    getFileFromDataTransfer(data) {
        const result = [];
        if (data) {
            if (data.items) {
                if (!this.multiple && this.files.size + data.items.length > 1) {
                    this.raiseErrorOccurred(UploadClientErrorCode.DragAndDropMultipleFiles);
                    return null;
                }
                for (let i = 0, item = data.items[i]; item; i++, item = data.items[i]) {
                    if (item.kind === "file") {
                        const itemFile = item.getAsFile();
                        itemFile && result.push(itemFile);
                    }
                }
            }
            else {
                for (let j = 0, file = data.files[j]; file; j++, file = data.files[j])
                    result.push(file);
            }
        }
        return result;
    }
    getFileInfosCollection(files) {
        return files.map(this.createFileViewInfo);
    }
    createFileViewInfo(file) {
        return {
            name: file.fileInfo.name,
            size: file.fileInfo.size,
            type: file.fileInfo.type,
            lastModified: file.fileInfo.lastModified,
            guid: file.fileInfo.guid,
            loadedBytes: file.loadedBytes,
            status: file.status,
            isFileExtensionValid: file.isFileExtensionValid,
            isMinSizeValid: file.isMinSizeValid,
            isMaxSizeValid: file.isMaxSizeValid
        };
    }
    getAllowedFileTypes() {
        return this.acceptedFileTypes && this.acceptedFileTypes.length > 0 ? this.acceptedFileTypes.map(item => item.trim()) : null;
    }
    getUUID4() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        array[8] &= 0b00111111;
        array[8] |= 0b10000000;
        array[6] &= 0b00001111;
        array[6] |= 0b01000000;
        const pattern = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
        let idx = 0;
        return pattern.replace(/XX/g, () => array[idx++].toString(16).padStart(2, "0"));
    }
    reloadFile(file, newFileGuid) {
        if (file.status === FileStatus.Canceled && newFileGuid) {
            const newFileItem = this.createFileItems([file.value])[0];
            newFileItem.status = FileStatus.PendingUpload;
            newFileItem.fileInfo.guid = newFileGuid;
            this.files = UploadBase.replaceFileInFilesMap(this.files, file.fileInfo.guid, newFileItem);
        }
    }
    static replaceFileInFilesMap(files, oldGuid, newFile) {
        const newMap = new Map();
        for (const file of files.values()) {
            const actualFile = file.fileInfo.guid === oldGuid ? newFile : file;
            newMap.set(actualFile.fileInfo.guid, actualFile);
        }
        return newMap;
    }
    attachEventsToFileItem(file) {
        if (!file.onLoadStart) {
            file.onLoadStart = () => {
                this.fileUploadStarted(file);
            };
        }
        if (!file.onProgress) {
            file.onProgress = () => {
                this.fileProgress(file);
            };
        }
        if (!file.onAbort) {
            file.onAbort = () => {
                this.fileUploadAborted(file);
            };
        }
        if (!file.onError) {
            file.onError = (e) => {
                const response = e;
                this.fileUploadError(file, response.status, response.statusText, response.responseText);
            };
        }
        if (!file.onLoadEnd) {
            file.onLoadEnd = () => {
                this.fileUploaded(file);
            };
        }
    }
    fileUploadStarted(file) {
        this.progressDispatcher.dispatch(ProgressType.Started, file);
    }
    fileUploaded(file) {
        this.progressDispatcher.dispatch(ProgressType.Uploaded, file);
    }
    fileUploadAborted(file) {
        this.progressDispatcher.dispatch(ProgressType.Aborted, file);
    }
    fileProgress(file) {
        if (file.status === FileStatus.WaitingStart || file.status === FileStatus.PendingUpload || file.status === FileStatus.Uploading)
            this.progressDispatcher.dispatch(ProgressType.Progress, file);
    }
    fileUploadError(file, status, statusText, responseText) {
        const httpRequestInfo = { status, statusText, responseText };
        this.progressDispatcher.dispatch(ProgressType.Error, file, httpRequestInfo);
    }
    processUploadedFilesOptions(uploadedFilesOptions) {
        this.updateFileStates(uploadedFilesOptions);
        this.processUploadedFilesOptionsCore(uploadedFilesOptions);
    }
    updateFileStates(filesOptions) {
        var _a;
        for (const option of filesOptions) {
            const file = this.files.get((_a = option.beforeReloadGuid) !== null && _a !== void 0 ? _a : option.fileGuid);
            if (!file)
                continue;
            if (file.status !== option.status)
                this.changeStatus(file, option.status, option.fileGuid);
        }
    }
    createActionRequest(actions) {
        const result = new ActionRequest();
        const indexMap = new Map();
        actions.forEach(info => {
            const guid = info.file.fileInfo.guid;
            let fileIndex = indexMap.get(guid);
            if (fileIndex === undefined) {
                fileIndex = result.guids.length;
                result.guids.push(guid);
                indexMap.set(guid, fileIndex);
            }
            result.actions.push(info.action, fileIndex);
            if (info.action === FileStatus.PendingUpload && info.newReloadedFile)
                result.reloadedFileGuids.push(info.newReloadedFile.fileInfo.guid);
        });
        return result;
    }
    changeStatus(fileItem, status, newFileGuid) {
        switch (status) {
            case FileStatus.PendingUpload: {
                this.reloadFile(fileItem, newFileGuid);
                break;
            }
            case FileStatus.Paused:
                fileItem.status = FileStatus.Paused;
                break;
            case FileStatus.Canceled:
                this.progressDispatcher.cancelSendingOfLastEvent();
                fileItem.abort(false);
                break;
            case FileStatus.Removing:
                this.progressDispatcher.cancelSendingOfLastEvent();
                fileItem.abort(false);
                this.files.delete(fileItem.fileInfo.guid);
                break;
            default:
                throw new Error("Status not supported.");
        }
    }
    update(changedProperties) {
        super.update(changedProperties);
        const selectButtonVisibilityChanged = changedProperties.has("showEmbeddedSelectButton");
        const externalSelectButtonSelectorChanged = changedProperties.has("externalSelectButtonCssSelector");
        if (this.dotnetHelper && (selectButtonVisibilityChanged || externalSelectButtonSelectorChanged))
            this.detachSelectButtonClickHandler(changedProperties.get("externalSelectButtonCssSelector"));
    }
    updated(changedProperties) {
        if (changedProperties.has("acceptedFileTypes") || changedProperties.has("multiple"))
            this.prepareInputElement();
        const selectButtonVisibilityChanged = changedProperties.has("showEmbeddedSelectButton") && this.showEmbeddedSelectButton;
        const externalSelectButtonSelectorChanged = changedProperties.has("externalSelectButtonCssSelector") && this.externalSelectButtonCssSelector;
        if (this.dotnetHelper && (selectButtonVisibilityChanged || externalSelectButtonSelectorChanged))
            this.attachSelectButtonClickHandler();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachSelectButtonClickHandler();
    }
    showFileSelectorDialog() {
        var _a;
        (_a = this.getFileInput()) === null || _a === void 0 ? void 0 : _a.click();
    }
}
__decorate([
    n({ attribute: UploadAttributes.acceptedFileTypes, type: Array })
], UploadBase.prototype, "acceptedFileTypes", void 0);
__decorate([
    n({ attribute: UploadAttributes.allowedFileExtensions, type: Array })
], UploadBase.prototype, "allowedFileExtensions", void 0);
__decorate([
    n({ attribute: UploadAttributes.externalSelectButtonCssSelector })
], UploadBase.prototype, "externalSelectButtonCssSelector", void 0);
__decorate([
    n({ attribute: UploadAttributes.showEmbeddedSelectButton, type: Boolean })
], UploadBase.prototype, "showEmbeddedSelectButton", void 0);
__decorate([
    n({ attribute: UploadAttributes.chunkSize, type: Number })
], UploadBase.prototype, "chunkSize", void 0);
__decorate([
    n({ attribute: UploadAttributes.maxFileSize, type: Number })
], UploadBase.prototype, "maxFileSize", void 0);
__decorate([
    n({ attribute: UploadAttributes.minFileSize, type: Number })
], UploadBase.prototype, "minFileSize", void 0);
__decorate([
    n({ attribute: UploadAttributes.maxFileCount, type: Number })
], UploadBase.prototype, "maxFileCount", void 0);
__decorate([
    n({ attribute: UploadAttributes.multiple, type: Boolean })
], UploadBase.prototype, "multiple", void 0);
__decorate([
    n({ attribute: UploadAttributes.uploadMode, type: Number })
], UploadBase.prototype, "uploadMode", void 0);
__decorate([
    n({ attribute: UploadAttributes.uploadTechnology, type: Number })
], UploadBase.prototype, "uploadTechnology", void 0);
__decorate([
    n({ attribute: UploadAttributes.dragOverClassName })
], UploadBase.prototype, "dragOverClassName", void 0);
__decorate([
    n({ attribute: UploadAttributes.dropZoneCssSelector })
], UploadBase.prototype, "dropZoneCssSelector", void 0);
__decorate([
    n({ attribute: UploadAttributes.customizeFormData, type: Boolean })
], UploadBase.prototype, "customizeFormData", void 0);
function initDotNetReference(mainElement, dotnetHelper) {
    var _a, _b;
    (_b = (_a = tryGetUploader(mainElement)) === null || _a === void 0 ? void 0 : _a.initDotNetReference) === null || _b === void 0 ? void 0 : _b.call(_a, dotnetHelper);
}
function getRecentlyAddedFileInfosStream(mainElement) {
    var _a;
    return ((_a = tryGetUploader(mainElement)) === null || _a === void 0 ? void 0 : _a.getRecentlyAddedFileInfosStream()) || null;
}
function tryGetUploader(mainElement) {
    return mainElement.isConnected ? mainElement : null;
}

export { ChunkFileUploader as C, FileStatus as F, MAX_CONCURRENT_UPLOADS as M, UploadBase as U, WholeFileUploader as W, UploadTechnology as a, getRecentlyAddedFileInfosStream as g, initDotNetReference as i, tryGetUploader as t };
//# sourceMappingURL=upload-base-24.2.js.map
