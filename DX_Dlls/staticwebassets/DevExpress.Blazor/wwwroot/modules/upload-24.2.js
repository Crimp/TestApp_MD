import { i as initDotNetReference, g as getRecentlyAddedFileInfosStream, U as UploadBase, F as FileStatus, a as UploadTechnology, M as MAX_CONCURRENT_UPLOADS, C as ChunkFileUploader, W as WholeFileUploader } from './upload-base-24.2.js';
import './tslib.es6-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './custom-events-helper-24.2.js';
import './single-slot-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './property-24.2.js';
import './css-classes-24.2.js';

class DxUpload extends UploadBase {
    constructor() {
        super();
        this.uploaders = new Map();
        this.uploadPromises = new Set();
        this.pendingFiles = new Array();
    }
    processUploadedFilesOptionsCore(uploadedFilesOptions) {
        for (const option of uploadedFilesOptions) {
            if (option.status === FileStatus.PendingUpload && option.uploadStartOptions) {
                this.onUploadStartCallback(option.uploadStartOptions, option.customFormDataOptions);
            }
        }
    }
    onUploadStartCallback(response, customDataResponse) {
        const { guid, requestJSOptions: options } = response;
        const file = this.files.get(guid);
        if (!file)
            return;
        this.attachEventsToFileItem(file);
        if (!options) {
            file.abort();
            return;
        }
        if (this.uploadTechnology === UploadTechnology.Http && !options.uploadUrl) {
            file.error(new EventTarget());
            return;
        }
        this.startUpload(file, options, (customDataResponse === null || customDataResponse === void 0 ? void 0 : customDataResponse.customData) || {});
    }
    startUpload(file, requestOptions, customData) {
        file.status = FileStatus.PendingUpload;
        this.scheduleUpload(file, requestOptions, customData);
    }
    handleUploadError(err, file) {
        var _a;
        if (err && err.status && err.statusText && err.responseText)
            (_a = file.onError) === null || _a === void 0 ? void 0 : _a.call(file, err);
    }
    scheduleUpload(file, requestOptions, customData) {
        if (this.uploadPromises.size < MAX_CONCURRENT_UPLOADS) {
            const filePromise = this.uploadFileCore(file, requestOptions, customData);
            this.uploadPromises.add(filePromise);
            filePromise
                .catch((err) => this.handleUploadError(err, file))
                .finally(() => {
                this.onAfterUpload(filePromise);
            });
        }
        else {
            // Promise.race(this.uploadPromises).then(() => this.scheduleUpload(file, requestOptions, customData));
            this.pendingFiles.push({ file, requestOptions, customData });
        }
    }
    onAfterUpload(filePromise) {
        this.uploadPromises.delete(filePromise);
        if (this.pendingFiles.length > 0) {
            const pendingFile = this.pendingFiles.shift();
            const newFile = pendingFile.file;
            const newFilePromise = this.uploadFileCore(newFile, pendingFile.requestOptions, pendingFile.customData);
            this.uploadPromises.add(newFilePromise);
            newFilePromise
                .catch((err) => this.handleUploadError(err, newFile))
                .finally(() => {
                this.onAfterUpload(newFilePromise);
            });
        }
    }
    getUploadStrategy(file) {
        const newUploadStrategy = this.chunkSize > 0 ? new ChunkFileUploader(this) : new WholeFileUploader(this);
        const oldUploadStrategy = this.uploaders.get(file.fileInfo.guid);
        if (oldUploadStrategy !== newUploadStrategy && file.status !== FileStatus.Uploading || !oldUploadStrategy)
            this.uploaders.set(file.fileInfo.guid, newUploadStrategy);
        return this.uploaders.get(file.fileInfo.guid);
    }
    uploadFileCore(file, requestOptions, customData) {
        return this.getUploadStrategy(file).upload(file, requestOptions, customData, file => {
            file.loadEnd();
            if (!file.isUploadComplete() && file.status === FileStatus.Uploading)
                return this.uploadFileCore(file, requestOptions, null);
            else
                return Promise.resolve();
        });
    }
    onCustomizeFormDataCallback(response) {
        var _a;
        const fileId = response.fileGuid;
        (_a = this.uploaders.get(fileId)) === null || _a === void 0 ? void 0 : _a.onCustomizeChunkMetadataResponse(response.customData);
        this.uploaders.delete(fileId);
    }
}
customElements.define("dxbl-upload", DxUpload);
function loadModule() { }
const upload = { loadModule, initDotNetReference, getRecentlyAddedFileInfosStream };

export { DxUpload, upload as default };
//# sourceMappingURL=upload-24.2.js.map
