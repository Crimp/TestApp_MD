import { i as initDotNetReference, g as getRecentlyAddedFileInfosStream, U as UploadBase, F as FileStatus, t as tryGetUploader } from './upload-base-24.2.js';
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

class DxFileInput extends UploadBase {
    processUploadedFilesOptionsCore(uploadedFilesOptions) {
        var _a;
        const fileOptionsToUpload = uploadedFilesOptions.filter(f => f.status === FileStatus.PendingUpload && f.uploadStartOptions);
        for (const option of fileOptionsToUpload) {
            const file = this.files.get(option.fileGuid);
            if (!file)
                continue;
            this.attachEventsToFileItem(file);
            file.loadStart();
        }
        const fileGuidsToUpload = fileOptionsToUpload.map(o => o.fileGuid);
        if (fileGuidsToUpload.length)
            (_a = this.dotnetHelper) === null || _a === void 0 ? void 0 : _a.invokeMethodAsync("UploadFileViaJsInterop", fileGuidsToUpload);
    }
}
customElements.define("dxbl-file-input", DxFileInput);
function loadModule() { }
function getFileBytes(mainElement, fileGuid) {
    var _a, _b;
    return (_b = (_a = tryGetUploader(mainElement)) === null || _a === void 0 ? void 0 : _a.getFileBytes) === null || _b === void 0 ? void 0 : _b.call(_a, fileGuid);
}
function updateFileStatus(mainElement, fileGuid, status, args) {
    var _a;
    (_a = tryGetUploader(mainElement)) === null || _a === void 0 ? void 0 : _a.updateFileStatus(fileGuid, status, args);
}
const fileInput = { loadModule, initDotNetReference, getFileBytes, updateFileStatus, getRecentlyAddedFileInfosStream };

export { DxFileInput, fileInput as default };
//# sourceMappingURL=file-input-24.2.js.map
