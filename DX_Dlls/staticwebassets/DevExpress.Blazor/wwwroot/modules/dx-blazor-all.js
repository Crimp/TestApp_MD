function createInvoker(resolveImporter, skipResult) {
    return invoke;
    function invoke(name, args) {
        args = Array.prototype.slice.call(args);

        return resolveImporter().then(function(m) {
            return new Promise(function(resolve, reject) {
                if(skipResult) {
                    resolve();
                    resolve = () => {};
                    reject = (e) => console.warn(e);
                }
                try {
                    const result = m.default[name].apply(m, args);
                    if(result && result.then)
                        result.then(resolve).catch(reject);
                    else
                        resolve(result);
                }
                catch(e) { reject(e); }
            });
        });
    }
}

const invoke$W = createInvoker(function() { return import('./dropdowns-24.2.js'); });
const invokeAndForget$5 = createInvoker(function() { return import('./dropdowns-24.2.js'); }, true);
function init$d(){ return invoke$W("init", arguments); }
function dispose$5(){ return invokeAndForget$5("dispose", arguments); }
function showAdaptiveDropdown(){ return invoke$W("showAdaptiveDropdown", arguments); }
function updateGridDropDown(){ return invoke$W("updateGridDropDown", arguments); }
function setInlineModalSize(){ return invoke$W("setInlineModalSize", arguments); }
const EditorsDropDown = { init: init$d, dispose: dispose$5, showAdaptiveDropdown, updateGridDropDown, setInlineModalSize };

const invoke$V = createInvoker(function() { return import('./dx-combobox-24.2.js'); });
function loadModule$w(){ return invoke$V("loadModule", arguments); }
function adaptiveDropdownComponents$6(){ return invoke$V("adaptiveDropdownComponents", arguments); }
const ComboBox = { loadModule: loadModule$w, adaptiveDropdownComponents: adaptiveDropdownComponents$6 };

const invoke$U = createInvoker(function() { return import('./dx-date-edit-24.2.js'); });
function loadModule$v(){ return invoke$U("loadModule", arguments); }
function adaptiveDropdownComponents$5(){ return invoke$U("adaptiveDropdownComponents", arguments); }
function calendarComponent$2(){ return invoke$U("calendarComponent", arguments); }
const DateEdit = { loadModule: loadModule$v, adaptiveDropdownComponents: adaptiveDropdownComponents$5, calendarComponent: calendarComponent$2 };

const invoke$T = createInvoker(function() { return import('./dx-date-range-picker-24.2.js'); });
function loadModule$u(){ return invoke$T("loadModule", arguments); }
function adaptiveDropdownComponents$4(){ return invoke$T("adaptiveDropdownComponents", arguments); }
function calendarComponent$1(){ return invoke$T("calendarComponent", arguments); }
const DateRangePicker = { loadModule: loadModule$u, adaptiveDropdownComponents: adaptiveDropdownComponents$4, calendarComponent: calendarComponent$1 };

const invoke$S = createInvoker(function() { return import('./dx-date-time-edit-24.2.js'); });
function loadModule$t(){ return invoke$S("loadModule", arguments); }
function adaptiveDropdownComponents$3(){ return invoke$S("adaptiveDropdownComponents", arguments); }
function calendarComponent(){ return invoke$S("calendarComponent", arguments); }
const DateTimeEdit = { loadModule: loadModule$t, adaptiveDropdownComponents: adaptiveDropdownComponents$3, calendarComponent };

const invoke$R = createInvoker(function() { return import('./dx-tagbox-24.2.js'); });
function loadModule$s(){ return invoke$R("loadModule", arguments); }
function forceInputValue(){ return invoke$R("forceInputValue", arguments); }
const TagBox = { loadModule: loadModule$s, forceInputValue };

const invoke$Q = createInvoker(function() { return import('./dx-listbox-24.2.js'); });
function loadModule$r(){ return invoke$Q("loadModule", arguments); }
const ListBoxLegacy = { loadModule: loadModule$r };

const invoke$P = createInvoker(function() { return import('./dx-memo-24.2.js'); });
function loadModule$q(){ return invoke$P("loadModule", arguments); }
const Memo = { loadModule: loadModule$q };

const invoke$O = createInvoker(function() { return import('./dragAndDropUnit-24.2.js'); });
function DragAndDropUnit(){ return invoke$O("DragAndDropUnit", arguments); }
function FocusUnit(){ return invoke$O("FocusUnit", arguments); }
function RectBlz(){ return invoke$O("RectBlz", arguments); }
function PointBlz(){ return invoke$O("PointBlz", arguments); }
function getClientRect(){ return invoke$O("getClientRect", arguments); }
function getClientRectWithMargins(){ return invoke$O("getClientRectWithMargins", arguments); }
function geometry(){ return invoke$O("geometry", arguments); }
const DragAndDrop = { DragAndDropUnit, FocusUnit, RectBlz, PointBlz, getClientRect, getClientRectWithMargins, geometry };

const invoke$N = createInvoker(function() { return import('./dx-check-internal-24.2.js'); });
function loadModule$p(){ return invoke$N("loadModule", arguments); }
const CheckBox = { loadModule: loadModule$p };

const invoke$M = createInvoker(function() { return import('./columnchooser-24.2.js'); });
const invokeAndForget$4 = createInvoker(function() { return import('./columnchooser-24.2.js'); }, true);
function init$c(){ return invoke$M("init", arguments); }
function dispose$4(){ return invokeAndForget$4("dispose", arguments); }
const DataGridColumnChooser = { init: init$c, dispose: dispose$4 };

const invoke$L = createInvoker(function() { return import('./dom-utils-24.2.js').then(n => n.N); });
function focusElement(){ return invoke$L("focusElement", arguments); }
function setInputAttribute(){ return invoke$L("setInputAttribute", arguments); }
function setCheckInputIndeterminate(){ return invoke$L("setCheckInputIndeterminate", arguments); }
const Dom = { focusElement, setInputAttribute, setCheckInputIndeterminate };

const invoke$K = createInvoker(function() { return import('./grid-24.2.js'); });
const invokeAndForget$3 = createInvoker(function() { return import('./grid-24.2.js'); }, true);
function init$b(){ return invoke$K("init", arguments); }
function dispose$3(){ return invokeAndForget$3("dispose", arguments); }
const DataGrid = { init: init$b, dispose: dispose$3 };

const invoke$J = createInvoker(function() { return import('./dx-grid-24.2.js').then(n => n.k); });
function loadModule$o(){ return invoke$J("loadModule", arguments); }
const Grid = { loadModule: loadModule$o };

const invoke$I = createInvoker(function() { return import('./dx-tree-list-24.2.js'); });
function loadModule$n(){ return invoke$I("loadModule", arguments); }
const TreeList = { loadModule: loadModule$n };

const invoke$H = createInvoker(function() { return import('./column-resize-24.2.js'); });
function initResizeColumn(){ return invoke$H("initResizeColumn", arguments); }
const DataGridColumnResize = { initResizeColumn };

const invoke$G = createInvoker(function() { return import('./scheduler-24.2.js'); });
function loadModule$m(){ return invoke$G("loadModule", arguments); }
const Scheduler = { loadModule: loadModule$m };

const invoke$F = createInvoker(function() { return import('./utils-24.2.js'); });
function getReference$4(){ return invoke$F("getReference", arguments); }
const ClientComponentUtils = { getReference: getReference$4 };

const invoke$E = createInvoker(function() { return import('./dx-calendar-24.2.js').then(n => n.d); });
function loadModule$l(){ return invoke$E("loadModule", arguments); }
const Calendar = { loadModule: loadModule$l };

const invoke$D = createInvoker(function() { return import('./roller-24.2.js'); });
function initializeDateRoller(){ return invoke$D("initializeDateRoller", arguments); }
function initializeTimeRoller(){ return invoke$D("initializeTimeRoller", arguments); }
function updateRoller(){ return invoke$D("updateRoller", arguments); }
const Roller = { initializeDateRoller, initializeTimeRoller, updateRoller };

const invoke$C = createInvoker(function() { return import('./positiontracker-24.2.js'); });
function init$a(){ return invoke$C("init", arguments); }
function PositionTracker(){ return invoke$C("PositionTracker", arguments); }
const PositionTracker$1 = { init: init$a, PositionTracker };

const invoke$B = createInvoker(function() { return import('./positionlistener-24.2.js'); });
function init$9(){ return invoke$B("init", arguments); }
function PositionListener(){ return invoke$B("PositionListener", arguments); }
const PositionListener$1 = { init: init$9, PositionListener };

const invoke$A = createInvoker(function() { return import('./draggable-24.2.js'); });
function init$8(){ return invoke$A("init", arguments); }
function DxDraggable(){ return invoke$A("DxDraggable", arguments); }
function dxDraggableTagName(){ return invoke$A("dxDraggableTagName", arguments); }
const Draggable = { init: init$8, DxDraggable, dxDraggableTagName };

const invoke$z = createInvoker(function() { return import('./modalcomponents-24.2.js'); });
function getReference$3(){ return invoke$z("getReference", arguments); }
function registeredComponents$3(){ return invoke$z("registeredComponents", arguments); }
const Modal = { getReference: getReference$3, registeredComponents: registeredComponents$3 };

const invoke$y = createInvoker(function() { return import('./branch-24.2.js'); });
function init$7(){ return invoke$y("init", arguments); }
function DxBranch(){ return invoke$y("DxBranch", arguments); }
function dxBranchTagName(){ return invoke$y("dxBranchTagName", arguments); }
function BranchUpdatedEvent(){ return invoke$y("BranchUpdatedEvent", arguments); }
const Branch = { init: init$7, DxBranch, dxBranchTagName, BranchUpdatedEvent };

const invoke$x = createInvoker(function() { return import('./popup-24.2.js').then(n => n.Q); });
function init$6(){ return invoke$x("init", arguments); }
function getReference$2(){ return invoke$x("getReference", arguments); }
function dxPopupTagName(){ return invoke$x("dxPopupTagName", arguments); }
function DxPopup(){ return invoke$x("DxPopup", arguments); }
const Popup = { init: init$6, getReference: getReference$2, dxPopupTagName, DxPopup };

const invoke$w = createInvoker(function() { return import('./flyoutcomponents-24.2.js'); });
function getReference$1(){ return invoke$w("getReference", arguments); }
function registeredComponents$2(){ return invoke$w("registeredComponents", arguments); }
const Flyout = { getReference: getReference$1, registeredComponents: registeredComponents$2 };

const invoke$v = createInvoker(function() { return import('./dropdowncomponents-24.2.js').then(n => n.d); });
function getReference(){ return invoke$v("getReference", arguments); }
function registeredComponents$1(){ return invoke$v("registeredComponents", arguments); }
const DropDown = { getReference, registeredComponents: registeredComponents$1 };

const invoke$u = createInvoker(function() { return import('./thumb-24.2.js'); });
function init$5(){ return invoke$u("init", arguments); }
function dxThumbTagName(){ return invoke$u("dxThumbTagName", arguments); }
function ThumbDragStartedEvent(){ return invoke$u("ThumbDragStartedEvent", arguments); }
function ThumbDragDeltaEvent(){ return invoke$u("ThumbDragDeltaEvent", arguments); }
function ThumbDragCompletedEvent(){ return invoke$u("ThumbDragCompletedEvent", arguments); }
function DragContext(){ return invoke$u("DragContext", arguments); }
const Thumb = { init: init$5, dxThumbTagName, ThumbDragStartedEvent, ThumbDragDeltaEvent, ThumbDragCompletedEvent, DragContext };

const invoke$t = createInvoker(function() { return import('./portal-24.2.js').then(n => n.p); });
function init$4(){ return invoke$t("init", arguments); }
function DxPortal(){ return invoke$t("DxPortal", arguments); }
function dxPortalTagName(){ return invoke$t("dxPortalTagName", arguments); }
const Portal = { init: init$4, DxPortal, dxPortalTagName };

const invoke$s = createInvoker(function() { return import('./capture-manager-24.2.js').then(n => n.c); });
function LightCaptureManager(){ return invoke$s("LightCaptureManager", arguments); }
function getCaptureManagerSingletonForTests(){ return invoke$s("getCaptureManagerSingletonForTests", arguments); }
const CaptureManager = { LightCaptureManager, getCaptureManagerSingletonForTests };

const invoke$r = createInvoker(function() { return import('./adaptivedropdowncomponents-24.2.js'); });
function dropDownRegisteredComponents(){ return invoke$r("dropDownRegisteredComponents", arguments); }
function modalRegisteredComponents(){ return invoke$r("modalRegisteredComponents", arguments); }
function init$3(){ return invoke$r("init", arguments); }
function dxAdaptiveDropDownTagName(){ return invoke$r("dxAdaptiveDropDownTagName", arguments); }
function dxEventsInterceptorTagName(){ return invoke$r("dxEventsInterceptorTagName", arguments); }
const AdaptiveDropDown = { dropDownRegisteredComponents, modalRegisteredComponents, init: init$3, dxAdaptiveDropDownTagName, dxEventsInterceptorTagName };

const invoke$q = createInvoker(function() { return import('./upload-24.2.js'); });
function loadModule$k(){ return invoke$q("loadModule", arguments); }
function initDotNetReference$1(){ return invoke$q("initDotNetReference", arguments); }
function getRecentlyAddedFileInfosStream$1(){ return invoke$q("getRecentlyAddedFileInfosStream", arguments); }
const Upload = { loadModule: loadModule$k, initDotNetReference: initDotNetReference$1, getRecentlyAddedFileInfosStream: getRecentlyAddedFileInfosStream$1 };

const invoke$p = createInvoker(function() { return import('./file-input-24.2.js'); });
function loadModule$j(){ return invoke$p("loadModule", arguments); }
function initDotNetReference(){ return invoke$p("initDotNetReference", arguments); }
function getFileBytes(){ return invoke$p("getFileBytes", arguments); }
function updateFileStatus(){ return invoke$p("updateFileStatus", arguments); }
function getRecentlyAddedFileInfosStream(){ return invoke$p("getRecentlyAddedFileInfosStream", arguments); }
const FileInput = { loadModule: loadModule$j, initDotNetReference, getFileBytes, updateFileStatus, getRecentlyAddedFileInfosStream };

const invoke$o = createInvoker(function() { return import('./toolbar-24.2.js'); });
const invokeAndForget$2 = createInvoker(function() { return import('./toolbar-24.2.js'); }, true);
function init$2(){ return invoke$o("init", arguments); }
function fakeInit(){ return invoke$o("fakeInit", arguments); }
function dispose$2(){ return invokeAndForget$2("dispose", arguments); }
const Toolbar = { init: init$2, fakeInit, dispose: dispose$2 };

const invoke$n = createInvoker(function() { return import('./spinedit-24.2.js'); });
function loadModule$i(){ return invoke$n("loadModule", arguments); }
const SpinEdit = { loadModule: loadModule$i };

const invoke$m = createInvoker(function() { return import('./masked-input-24.2.js'); });
function loadModule$h(){ return invoke$m("loadModule", arguments); }
const MaskedInput = { loadModule: loadModule$h };

const invoke$l = createInvoker(function() { return import('./focus-utils-24.2.js'); });
function initFocusHidingEvents(){ return invoke$l("initFocusHidingEvents", arguments); }
const FocusUtils = { initFocusHidingEvents };

const invoke$k = createInvoker(function() { return import('./window-resize-helper-24.2.js'); });
const invokeAndForget$1 = createInvoker(function() { return import('./window-resize-helper-24.2.js'); }, true);
function init$1(){ return invoke$k("init", arguments); }
function dispose$1(){ return invokeAndForget$1("dispose", arguments); }
const WindowResizeHelper = { init: init$1, dispose: dispose$1 };

const invoke$j = createInvoker(function() { return import('./dx-style-helper-24.2.js'); });
function ensureAccentColorStyle(){ return invoke$j("ensureAccentColorStyle", arguments); }
function showDeprecatedStyleSheetWarningIfNeeded(){ return invoke$j("showDeprecatedStyleSheetWarningIfNeeded", arguments); }
const StyleHelper = { ensureAccentColorStyle, showDeprecatedStyleSheetWarningIfNeeded };

const invoke$i = createInvoker(function() { return import('./dx-menu-24.2.js'); });
function loadModule$g(){ return invoke$i("loadModule", arguments); }
const MenuComponent = { loadModule: loadModule$g };

const invoke$h = createInvoker(function() { return import('./dx-menu-item-24.2.js').then(n => n.d); });
function loadModule$f(){ return invoke$h("loadModule", arguments); }
const MenuItem = { loadModule: loadModule$f };

const invoke$g = createInvoker(function() { return import('./dx-context-menu-24.2.js'); });
function loadModule$e(){ return invoke$g("loadModule", arguments); }
const ContextMenu = { loadModule: loadModule$e };

const invoke$f = createInvoker(function() { return import('./custom-color-area-24.2.js'); });
function loadModule$d(){ return invoke$f("loadModule", arguments); }
const CustomColorArea = { loadModule: loadModule$d };

const invoke$e = createInvoker(function() { return import('./ribbon-24.2.js'); });
const invokeAndForget = createInvoker(function() { return import('./ribbon-24.2.js'); }, true);
function init(){ return invoke$e("init", arguments); }
function dispose(){ return invokeAndForget("dispose", arguments); }
const Ribbon = { init, dispose };

const invoke$d = createInvoker(function() { return import('./dx-tabs-24.2.js'); });
function loadModule$c(){ return invoke$d("loadModule", arguments); }
const Tabs = { loadModule: loadModule$c };

const invoke$c = createInvoker(function() { return import('./index-24.2.js'); });
function loadModule$b(){ return invoke$c("loadModule", arguments); }
function registeredComponents(){ return invoke$c("registeredComponents", arguments); }
const ScrollViewer = { loadModule: loadModule$b, registeredComponents };

const invoke$b = createInvoker(function() { return import('./dx-group-control-24.2.js'); });
function loadModule$a(){ return invoke$b("loadModule", arguments); }
const GroupControl = { loadModule: loadModule$a };

const invoke$a = createInvoker(function() { return import('./dx-ui-handlers-bridge-24.2.js'); });
function loadModule$9(){ return invoke$a("loadModule", arguments); }
const UiHandlersBridge = { loadModule: loadModule$9 };

const invoke$9 = createInvoker(function() { return import('./input-24.2.js').then(n => n.i); });
function loadModule$8(){ return invoke$9("loadModule", arguments); }
const Input = { loadModule: loadModule$8 };

const invoke$8 = createInvoker(function() { return import('./pager-24.2.js'); });
function loadModule$7(){ return invoke$8("loadModule", arguments); }
const Pager = { loadModule: loadModule$7 };

const invoke$7 = createInvoker(function() { return import('./expandable-container-24.2.js'); });
function loadModule$6(){ return invoke$7("loadModule", arguments); }
const ExpandableContainer = { loadModule: loadModule$6 };

const invoke$6 = createInvoker(function() { return import('./dx-css-runtime-24.2.js'); });
function initializeThemeCssRuntimeVariables(){ return invoke$6("initializeThemeCssRuntimeVariables", arguments); }
const CssRuntime = { initializeThemeCssRuntimeVariables };

const invoke$5 = createInvoker(function() { return import('./dx-list-box-24.2.js'); });
function loadModule$5(){ return invoke$5("loadModule", arguments); }
const ListBox = { loadModule: loadModule$5 };

const invoke$4 = createInvoker(function() { return import('./dx-combo-box-24.2.js'); });
function loadModule$4(){ return invoke$4("loadModule", arguments); }
function adaptiveDropdownComponents$2(){ return invoke$4("adaptiveDropdownComponents", arguments); }
const ComboBox2 = { loadModule: loadModule$4, adaptiveDropdownComponents: adaptiveDropdownComponents$2 };

const invoke$3 = createInvoker(function() { return import('./dx-tag-box-24.2.js'); });
function loadModule$3(){ return invoke$3("loadModule", arguments); }
function adaptiveDropdownComponents$1(){ return invoke$3("adaptiveDropdownComponents", arguments); }
const TagBox2 = { loadModule: loadModule$3, adaptiveDropdownComponents: adaptiveDropdownComponents$1 };

const invoke$2 = createInvoker(function() { return import('./dx-dropdown-box-24.2.js'); });
function loadModule$2(){ return invoke$2("loadModule", arguments); }
function adaptiveDropdownComponents(){ return invoke$2("adaptiveDropdownComponents", arguments); }
const DropDownBox = { loadModule: loadModule$2, adaptiveDropdownComponents };

const invoke$1 = createInvoker(function() { return import('./dx-color-palette-24.2.js'); });
function loadModule$1(){ return invoke$1("loadModule", arguments); }
const ColorPalette = { loadModule: loadModule$1 };

const invoke = createInvoker(function() { return import('./dx-pivot-table-24.2.js'); });
function loadModule(){ return invoke("loadModule", arguments); }
const PivotTable = { loadModule };

CssRuntime.initializeThemeCssRuntimeVariables();
const apiFacade = {
    ClientComponentUtils,
    EditorsDropDown,
    ComboBox,
    DateEdit,
    DateRangePicker,
    DateTimeEdit,
    TagBox,
    ListBoxLegacy,
    CheckBox,
    Memo,
    Dom,
    DataGrid,
    DataGridColumnResize,
    Grid,
    TreeList,
    Scheduler,
    Calendar,
    Roller,
    PositionTracker: PositionTracker$1,
    PositionListener: PositionListener$1,
    Draggable,
    Branch,
    Modal,
    Popup,
    DropDown,
    Thumb,
    Flyout,
    Portal,
    CaptureManager,
    AdaptiveDropDown,
    Upload,
    FileInput,
    DataGridColumnChooser,
    DragAndDrop,
    SpinEdit,
    MaskedInput,
    FocusUtils,
    Toolbar,
    WindowResizeHelper,
    StyleHelper,
    MenuComponent,
    MenuItem,
    ContextMenu,
    CustomColorArea,
    Ribbon,
    Tabs,
    ScrollViewer,
    UiHandlersBridge,
    Input,
    Pager,
    GroupControl,
    ExpandableContainer,
    ListBox,
    ComboBox2,
    TagBox2,
    DropDownBox,
    ColorPalette,
    PivotTable
};
window.DxBlazor = apiFacade;
window.DxBlazor.StyleHelper.showDeprecatedStyleSheetWarningIfNeeded();
const loadModuleBundle = apiFacade;

// for the next time
// export const loadCommonScripts = (mapper: { [key: string]: () => Promise<unknown> }): void => {
//    const keys = Object.keys(mapper);
//    if(keys.length > 0) {
//        let currentComponentNames: Array<string> = [];
//        for(let i = 0; i < keys.length; i++) {
//            if(document.getElementsByTagName(keys[i]).length > 0)
//                currentComponentNames.push(keys[i]);
//        }
//        if(currentComponentNames.length === 0)
//            currentComponentNames = [keys[0]];
//        Promise.all(currentComponentNames.map(x => {
//            const func = mapper[x];
//            delete mapper[x];
//            return func();
//        })).then(x => {
//            loadCommonScripts(mapper);
//        });
//    }
// };
const loadScriptsByDemands = (mapper) => {
    let observer = null;
    let timeout = null;
    const importModules = () => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            (Object.keys(mapper)).forEach((key) => {
                if (document.getElementsByTagName(key).length > 0) {
                    mapper[key]();
                    delete mapper[key];
                    if (!Object.keys(mapper).length)
                        observer === null || observer === void 0 ? void 0 : observer.disconnect();
                }
            });
        }, 5);
    };
    if (Object.keys(mapper).length > 0) {
        observer = new MutationObserver(() => {
            importModules();
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
    }
    importModules();
};

const registerComponents = () => {
    loadScriptsByDemands({
        "dxbl-grid": () => loadModuleBundle.Grid.loadModule(),
        "dxbl-tree-list": () => loadModuleBundle.TreeList.loadModule(),
        // client components
        "dxbl-chart": () => import('./chart-24.2.js'),
        "dxbl-pie-chart": () => import('./pie-chart-24.2.js'),
        "dxbl-polar-chart": () => import('./polar-chart-24.2.js'),
        "dxbl-map": () => import('./dx-map-24.2.js'),
        "dxbl-html-editor": () => import('./dx-html-editor-24.2.js'),
        "dxbl-bar-gauge": () => import('./dx-bar-gauge-24.2.js'),
        "dxbl-sankey": () => import('./dx-sankey-24.2.js'),
        "dxbl-sparkline": () => import('./dx-sparkline-24.2.js'),
        "dxbl-range-selector": () => import('./dx-range-selector-24.2.js'),
        // widgets section
        "dxbl-input-editor": () => loadModuleBundle.Input.loadModule(),
        "dxbl-masked-input": () => loadModuleBundle.MaskedInput.loadModule(),
        "dxbl-date-edit": () => loadModuleBundle.DateEdit.loadModule(),
        "dxbl-date-range-picker": () => loadModuleBundle.DateRangePicker.loadModule(),
        "dxbl-combobox": () => loadModuleBundle.ComboBox.loadModule(),
        "dxbl-combo-box": () => loadModuleBundle.ComboBox2.loadModule(),
        "dxbl-dropdown-box": () => loadModuleBundle.DropDownBox.loadModule(),
        "dxbl-memo-editor": () => loadModuleBundle.Memo.loadModule(),
        "dxbl-date-time-edit": () => loadModuleBundle.DateTimeEdit.loadModule(),
        "dxbl-listbox": () => loadModuleBundle.ListBoxLegacy.loadModule(),
        "dxbl-list-box": () => loadModuleBundle.ListBox.loadModule(),
        "dxbl-tagbox": () => loadModuleBundle.TagBox.loadModule(),
        "dxbl-tag-box": () => loadModuleBundle.TagBox2.loadModule(),
        "dxbl-spinedit": () => loadModuleBundle.SpinEdit.loadModule(),
        "dxbl-calendar": () => loadModuleBundle.Calendar.loadModule(),
        "dxbl-check": () => loadModuleBundle.CheckBox.loadModule(),
        "dxbl-color-palette": () => loadModuleBundle.ColorPalette.loadModule(),
        "dxbl-dropdown": () => import('./dropdown-24.2.js'),
        "dxbl-flyout": () => import('./flyout-24.2.js'),
        "dxbl-modal": () => import('./popup-24.2.js').then(n => n.N),
        "dxbl-window": () => import('./dxbl-window-24.2.js'),
        "dxbl-popup-root": () => import('./popup-24.2.js').then(n => n.O),
        "dxbl-upload": () => loadModuleBundle.Upload.loadModule(),
        "dxbl-file-input": () => loadModuleBundle.FileInput.loadModule(),
        // layout section
        "dxbl-carousel": () => import('./dx-carousel-24.2.js'),
        "dxbl-drawer": () => import('./dx-drawer-24.2.js'),
        "dxbl-form-layout": () => import('./dx-form-layout-24.2.js'),
        "dxbl-grid-layout": () => import('./dx-grid-layout-24.2.js'),
        "dxbl-splitter": () => import('./dx-splitter-24.2.js'),
        "dxbl-splitter-pane": () => import('./dx-splitter-pane-24.2.js'),
        "dxbl-splitter-separator": () => import('./dx-splitter-separator-24.2.js'),
        "dxbl-stack-layout": () => import('./dx-stack-layout-24.2.js'),
        "dxbl-tabs": () => loadModuleBundle.Tabs.loadModule(),
        "dxbl-tab-list": () => import('./dx-tab-list-24.2.js'),
        "dxbl-tab-item": () => import('./dx-tab-item-24.2.js'),
        // navigation section
        "dxbl-menu": async () => {
            await import('./dxbl-itemlistdropdown-24.2.js');
            await loadModuleBundle.MenuComponent.loadModule();
        },
        "dxbl-menu-preloader": () => import('./dx-menu-preloader-24.2.js'),
        // toolbar (not web component yet)
        "dxbl-treeview": () => import('./dx-tree-view-24.2.js'),
        "dxbl-accordion": () => import('./dx-accordion-24.2.js'),
        "dxbl-context-menu": () => loadModuleBundle.ContextMenu.loadModule(),
        "dxbl-pivot-table": () => loadModuleBundle.PivotTable.loadModule(),
        // rich (not web component yet)
        "dxbl-scheduler": async () => {
            await loadModuleBundle.Calendar.loadModule();
            await loadModuleBundle.Scheduler.loadModule();
        },
        // other section
        "dxbl-loading-panel": () => import('./dx-loading-panel-24.2.js'),
        "dxbl-pager": () => loadModuleBundle.Pager.loadModule(),
        "dxbl-toast-portal": () => import('./dx-toast-portal-24.2.js'),
        "dxbl-toast": () => import('./dx-toast-24.2.js'),
        "dxbl-progress-bar": () => import('./dx-progress-bar-24.2.js'),
        "dxbl-button": () => import('./dx-button-24.2.js'),
        // internal tools
        "dxbl-ui-handlers-bridge": () => loadModuleBundle.UiHandlersBridge.loadModule(),
        "dxbl-custom-color-area": () => loadModuleBundle.CustomColorArea.loadModule(),
        "dxbl-expandable-container": () => loadModuleBundle.ExpandableContainer.loadModule(),
        "dxbl-group-control": () => loadModuleBundle.GroupControl.loadModule(),
        "dx-license-trigger": () => import('./dx-license-24.2.js'),
        "dxbl-adaptive-dropdown": () => loadModuleBundle.AdaptiveDropDown.init(),
        "dxbl-scroll-viewer": () => loadModuleBundle.ScrollViewer.loadModule(),
        "dxbl-virtual-scroll-viewer": () => loadModuleBundle.ScrollViewer.loadModule(),
        "dxbl-dynamic-stylesheet": () => import('./dynamic-stylesheet-component-24.2.js'),
        "dxbl-itemlist-dropdown": () => import('./dxbl-itemlistdropdown-24.2.js'),
        "dxbl-webview-sprite-preloader": () => import('./webview-svg-loader-24.2.js'),
        "dxbl-adaptive-container": () => import('./dx-adaptive-container-24.2.js'),
        "dxbl-ribbon-item": () => import('./ribbon-item-24.2.js'),
        "dxbl-ribbon": () => import('./dx-ribbon-24.2.js'),
    });
};

registerComponents();

export { loadModuleBundle as default };
//# sourceMappingURL=dx-blazor-all.js.map
