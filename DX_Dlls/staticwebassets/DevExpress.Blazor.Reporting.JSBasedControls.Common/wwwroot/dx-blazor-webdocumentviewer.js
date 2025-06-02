/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Scripts/_common-root-registration.js":
/*!**********************************************!*\
  !*** ./Scripts/_common-root-registration.js ***!
  \**********************************************/
/***/ (() => {

eval("DevExpress.Analytics.Internal._defaultStaticContext({\r\n    ...DevExpress.Analytics.Internal._defaultStaticContext(),\r\n    Reporting: DevExpress.Reporting,\r\n    Analytics: DevExpress.Analytics,\r\n    QueryBuilder: DevExpress.QueryBuilder,\r\n    ko: window.ko,\r\n    $: window.$\r\n});\r\n\n\n//# sourceURL=webpack:///./Scripts/_common-root-registration.js?");

/***/ }),

/***/ "./Scripts/_common-scripts-registration.js":
/*!*************************************************!*\
  !*** ./Scripts/_common-scripts-registration.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   processControlOptions: () => (/* binding */ processControlOptions)\n/* harmony export */ });\nDevExpress.Analytics.Internal.useKoIntegration();\r\n\r\nfunction DxReportingDisposeCallback(id) {\r\n    var element = document.getElementById(id);\r\n    element && window.ko.cleanNode(element);\r\n    if (window.DxReporting.DocumentViewer && window.DxReporting.DocumentViewer.DisposeCallback)\r\n        window.DxReporting.DocumentViewer.DisposeCallback();\r\n    if (window.DxReporting.ReportDesigner && window.DxReporting.ReportDesigner.DisposeCallback)\r\n        window.DxReporting.ReportDesigner.DisposeCallback();\r\n}\r\n\r\nfunction invokeDotNetAction(settings, dotnetHelper) {\r\n    const dotnetState = window.DxReporting.DotnetState;\r\n    let data = settings.data;\r\n    let url = settings.url;\r\n    if (settings.type === 'GET') {\r\n        const urlParts = url.split('?');\r\n        const urlParams = new URLSearchParams(urlParts[1]);\r\n        data = Object.fromEntries(urlParams.entries());\r\n        url = urlParts[0];\r\n    }\r\n    const responseDeferred = window.$.Deferred();\r\n    const operationId = DevExpress.Reporting.Internal.generateGuid();\r\n    dotnetState[operationId] = JSON.stringify(data);\r\n    const response = dotnetHelper.invokeMethodAsync(\"ProcessClientSideRequestAsync\", operationId, url);\r\n    response.then(async response => {\r\n        if (typeof (response) === 'object') {\r\n            const webApiResponse = new Response(response.bytes);\r\n            const fileName = encodeURIComponent(response.fileName);\r\n            webApiResponse.headers.append('Content-Disposition', `attachment; filename=\"${fileName}\"`);\r\n            webApiResponse.headers.append('Content-Type', response.contentType);\r\n            webApiResponse.headers.append('Content-Length', response.bytes.length);\r\n            responseDeferred.resolve({\r\n                result: webApiResponse,\r\n                success: true\r\n            });\r\n        } else {\r\n            const json = JSON.parse(response);\r\n            responseDeferred.resolve(json, '', { ...responseDeferred.promise(), responseJSON: json });\r\n        }\r\n    });\r\n    response.catch((error) => {\r\n        responseDeferred.reject({ error: error, statusText: error.message, status: 0 }, error.message, error);\r\n    })\r\n    response.finally(() => delete dotnetState[operationId]);\r\n    return responseDeferred.promise();\r\n}\r\n\r\nfunction enableLocalRequestProcessing(dotnetHelper) {\r\n    DevExpress.Analytics.Utils.requestManager.initialize({\r\n        sendRequest: (settings) => invokeDotNetAction(settings, dotnetHelper),\r\n        useFetch: true\r\n    })\r\n}\r\n\r\nfunction processControlOptions(options, dotnetHelper) {\r\n    if(options.disablePagesPrefetch) {\r\n        DevExpress.Reporting.Viewer.Settings.PreloadedPagesOffset(0);\r\n    }\r\n    if(options.enableLocalRequests) {\r\n        enableLocalRequestProcessing(dotnetHelper);\r\n    }\r\n}\r\n\r\nwindow.DxReporting = window.DxReporting || {\r\n    Dispose: function(elementId) {\r\n        DxReportingDisposeCallback(elementId);\r\n    },\r\n    GetDataChunk(operationId, startIndex, endIndex) {\r\n        const dotnetState = window.DxReporting.DotnetState;\r\n        if(!dotnetState[operationId]) {\r\n            throw new Error('Failed to retrieve data chunk for the specified operation id');\r\n        }\r\n        else return dotnetState[operationId].substring(startIndex, endIndex);\r\n    },\r\n    DotnetState: {}\r\n}\r\n\n\n//# sourceURL=webpack:///./Scripts/_common-scripts-registration.js?");

/***/ }),

/***/ "./Scripts/dx-webdocumentviewer.js":
/*!*****************************************!*\
  !*** ./Scripts/dx-webdocumentviewer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ViewerModelBase: () => (/* binding */ ViewerModelBase)\n/* harmony export */ });\n/* harmony import */ var _themesOverride__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themesOverride */ \"./Scripts/themesOverride.js\");\n/* harmony import */ var _themesOverride__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_themesOverride__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./Scripts/utils.js\");\n/* harmony import */ var _common_root_registration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_common-root-registration */ \"./Scripts/_common-root-registration.js\");\n/* harmony import */ var _common_root_registration__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_common_root_registration__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _common_scripts_registration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_common-scripts-registration */ \"./Scripts/_common-scripts-registration.js\");\n\r\n\r\n\r\n\r\n\r\nwindow.DEBUG = { ko: window.ko };\r\n\r\nclass ViewerModelBase {\r\n    Init(initViewerOptions, id, dotnetHelper) {\r\n        const viewerModel = initViewerOptions.model;\r\n        this.ViewerOptions = typeof (viewerModel) === 'object' ? viewerModel : JSON.parse(viewerModel);\r\n        this.ViewerOptions.reportUrl = window.ko.observable(this.ViewerOptions.reportUrl);\r\n        this.ViewerOptions.viewerModel = window.ko.observable();\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.processClientSideEvents)(this.ViewerOptions.callbacks || {});\r\n        var documentIdSubscription = function(newDocumentId) {\r\n            dotnetHelper.invokeMethodAsync(\"SetCurrentDocumentId\", newDocumentId);\r\n        };\r\n        var reportIdSubscription = function(newReportId) {\r\n            dotnetHelper.invokeMethodAsync(\"SetCurrentReportId\", newReportId);\r\n        };\r\n        var subscriptions = [];\r\n        var subscribeToNewModel = function(newModel) {\r\n            var reportPreview = newModel.reportPreview;\r\n            subscriptions.push({\r\n                dispose: reportPreview.events.on('propertyChanged', (args) => {\r\n                    if(args.propertyName === 'documentId') {\r\n                        documentIdSubscription(reportPreview.documentId);\r\n                    }\r\n                    if(args.propertyName === 'reportId') {\r\n                        reportIdSubscription(reportPreview.reportId);\r\n                    }\r\n                })\r\n            });\r\n        };\r\n        subscriptions.push(this.ViewerOptions.viewerModel.subscribe(subscribeToNewModel));\r\n        var liveCircleModel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.processModelLiveCircle)(id, subscriptions, (element) => {\r\n            (0,_common_scripts_registration__WEBPACK_IMPORTED_MODULE_3__.processControlOptions)(initViewerOptions, dotnetHelper);\r\n            this._createBinding(element, this.ViewerOptions).render();\r\n        });\r\n        this.DisposeCallback = liveCircleModel.disposeCallback;\r\n    }\r\n    OpenReport(reportName) {\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.applyViewModelMethod)(this.ViewerOptions.viewerModel(), \"OpenReport\", reportName);\r\n    }\r\n    ResetParameters() {\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.applyViewModelMethod)(this.ViewerOptions.viewerModel(), \"ResetParameters\");\r\n    }\r\n    Close() {\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.applyViewModelMethod)(this.ViewerOptions.viewerModel(), \"Close\");\r\n    }\r\n    _createBinding(element, viewerOptions) {\r\n        return null;\r\n    }\r\n}\r\n\r\nclass DocumentViewerModel extends ViewerModelBase {\r\n    _createBinding(element, viewerOptions) {\r\n        return new DevExpress.Reporting.Viewer.DxReportViewer(element, viewerOptions);\r\n    }\r\n    StartBuild() {\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.applyViewModelMethod)(this.ViewerOptions.viewerModel(), \"StartBuild\");\r\n    }\r\n}\r\n\r\nclass ParametersPanelModel extends ViewerModelBase {\r\n    _createBinding(element, viewerOptions) {\r\n        return new DevExpress.Reporting.Viewer.DxReportParametersPanel(element, viewerOptions);\r\n    }\r\n}\r\n\r\nwindow.DxReporting.ParametersPanel = window.DxReporting.ParametersPanel || new ParametersPanelModel();\r\nwindow.DxReporting.DocumentViewer = window.DxReporting.DocumentViewer || new DocumentViewerModel();\r\n\n\n//# sourceURL=webpack:///./Scripts/dx-webdocumentviewer.js?");

/***/ }),

/***/ "./Scripts/themesOverride.js":
/*!***********************************!*\
  !*** ./Scripts/themesOverride.js ***!
  \***********************************/
/***/ (() => {

eval("var THEME_MARKER_PREFIX = \"dx.\";\r\nfunction readThemeMarker() {\r\n    \r\n    var context = document.createElement(\"div\")\r\n    context.className = \"dx-blazor-reporting\";\r\n    var element = document.createElement(\"div\")\r\n    element.className = \"dx-theme-marker\"\r\n    document.body.append(context)\r\n    context.append(element)\r\n    var result;\r\n    try {\r\n        result = window.getComputedStyle(element)[\"fontFamily\"];\r\n        if(!result) {\r\n            return null\r\n        }\r\n        result = result.replace(/[\"']/g, \"\");\r\n        if(result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {\r\n            return null\r\n        }\r\n        return result.substr(THEME_MARKER_PREFIX.length)\r\n    } finally {\r\n        element.remove()\r\n        context.remove()\r\n    }\r\n}\r\n\r\nfunction isTheme(themeRegExp, themeName) {\r\n    if(!themeName) {\r\n        themeName = readThemeMarker()\r\n    }\r\n    return new RegExp(themeRegExp).test(themeName)\r\n}\r\n\r\nfunction isGeneric(themeName) {\r\n    return isTheme(\"generic\", themeName)\r\n}\r\n\r\nDevExpress.ui.themes.isGeneric = isGeneric;\n\n//# sourceURL=webpack:///./Scripts/themesOverride.js?");

/***/ }),

/***/ "./Scripts/utils.js":
/*!**************************!*\
  !*** ./Scripts/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyViewModelMethod: () => (/* binding */ applyViewModelMethod),\n/* harmony export */   processClientSideEvents: () => (/* binding */ processClientSideEvents),\n/* harmony export */   processModelLiveCircle: () => (/* binding */ processModelLiveCircle)\n/* harmony export */ });\nfunction getFunctionFromString(path) {\r\n    var scopeWindow = window;\r\n    path = path.replaceAll('\"', '');\r\n\r\n    var items = path.split('.');\r\n    for(var i = 0; i < items.length - 1; i++) {\r\n        scopeWindow = scopeWindow[items[i]];\r\n        if(scopeWindow === undefined) return;\r\n    }\r\n    return scopeWindow[items[items.length - 1]];\r\n}\r\n\r\nfunction processClientSideEvents(callbacks) {\r\n    for(var callback in callbacks) {\r\n        if(callbacks.hasOwnProperty(callback) && !!callbacks[callback]) {\r\n            var functionCallback = getFunctionFromString(callbacks[callback]);\r\n            if(typeof functionCallback === \"function\") {\r\n                callbacks[callback] = functionCallback;\r\n            } else {\r\n                console.error(\"Client-side event \" + callback.toString() + \" was skipped: function \" + callbacks[callback] + \" not found.\");\r\n                callbacks[callback] = undefined;\r\n            }\r\n        }\r\n    }\r\n    callbacks[\"_eventSenderCreated\"] = (s) => {\r\n        Object.defineProperty(s, \"dx\", {\r\n            get: () => DevExpress.Analytics.Internal._defaultStaticContext(),\r\n            configurable: true\r\n        });\r\n    }\r\n}\r\n\r\nfunction applyViewModelMethod(viewerModel, methodName) {    \r\n    if(!viewerModel)\r\n        return;\r\n    var params = [];\r\n    for(var _i = 2; _i < arguments.length; _i++) {\r\n        params[_i - 2] = arguments[_i];\r\n    }\r\n    if(params.length > 0) {\r\n        return viewerModel[methodName].apply(viewerModel, params);\r\n    }\r\n    else {\r\n        return viewerModel[methodName]();\r\n    }\r\n}\r\n\r\nfunction processModelLiveCircle(id, subscriptions, init) {\r\n    if(subscriptions === void 0) { subscriptions = []; }\r\n    var element = document.getElementById(id);\r\n    if(!element)\r\n        return { disposeCallback: () => void 0 };\r\n    window.ko.cleanNode(element);\r\n    var disposeCallback = function() {\r\n        clearTimeout(timeOut);\r\n        subscriptions.forEach(subscription => {\r\n            subscription.dispose();\r\n        });\r\n    };\r\n    var timeOut = setTimeout(() => {\r\n        init(element);\r\n        window.ko.utils.domNodeDisposal.addDisposeCallback(element, disposeCallback);\r\n    }, 1);\r\n    return { disposeCallback };\r\n}\r\n\n\n//# sourceURL=webpack:///./Scripts/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Scripts/dx-webdocumentviewer.js");
/******/ 	
/******/ })()
;