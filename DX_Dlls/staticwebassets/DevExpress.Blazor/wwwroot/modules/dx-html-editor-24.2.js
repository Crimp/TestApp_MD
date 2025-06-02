import { _ as __decorate } from './tslib.es6-24.2.js';
import { D as DevExtremeWidgetWrapper } from './devextreme-widget-wrapper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { C as ClientComponentEmptyContextEvent } from './events-24.2.js';
import { L as LogicalTreeHelper } from './logicaltreehelper-24.2.js';
import { k as key } from './key-24.2.js';
import { F as FocusableElementsSelector } from './constants-24.2.js';
import { D as DomHelper } from './layouthelper-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import './dom-utils-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './css-classes-24.2.js';
import './utils-24.2.js';
import './single-slot-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './lit-element-24.2.js';
import './point-24.2.js';

const dxHtmlEditorTag = "dxbl-html-editor";
class HtmlEditorStateChangedEvent extends CustomEvent {
    constructor(format, buttonsVisibility, readOnly) {
        super(HtmlEditorStateChangedEvent.eventName, {
            detail: new StateChangedEventContext(format, buttonsVisibility, readOnly),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
HtmlEditorStateChangedEvent.eventName = dxHtmlEditorTag + ".state-changed";
class HtmlEditorShowHyperlinkDialogEvent extends CustomEvent {
    constructor(data) {
        super(HtmlEditorShowHyperlinkDialogEvent.eventName, {
            detail: new ShowHyperlinkDialogEventContext(data),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
HtmlEditorShowHyperlinkDialogEvent.eventName = dxHtmlEditorTag + ".show-hyperlink-dialog";
class HtmlEditorShowImageDialogEvent extends CustomEvent {
    constructor(data) {
        super(HtmlEditorShowImageDialogEvent.eventName, {
            detail: new ShowImageDialogEventContext(data),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
HtmlEditorShowImageDialogEvent.eventName = dxHtmlEditorTag + ".show-image-dialog";
class HtmlEditorShowTableDialogEvent extends ClientComponentEmptyContextEvent {
    constructor() {
        super(HtmlEditorShowTableDialogEvent.eventName);
    }
}
HtmlEditorShowTableDialogEvent.eventName = dxHtmlEditorTag + ".show-table-dialog";
class HtmlEditorValueChangedEvent extends CustomEvent {
    constructor(value) {
        super(HtmlEditorValueChangedEvent.eventName, {
            detail: new ValueChangedEventContext(value),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
HtmlEditorValueChangedEvent.eventName = dxHtmlEditorTag + ".value-changed";
class StateChangedEventContext {
    constructor(format, buttonsVisibility, readOnly) {
        this.Format = format;
        this.ButtonsVisibility = buttonsVisibility;
        this.ReadOnly = readOnly;
    }
}
class ShowHyperlinkDialogEventContext {
    constructor(data) {
        this.Data = data;
    }
}
class ShowImageDialogEventContext {
    constructor(data) {
        this.Data = data;
    }
}
class ValueChangedEventContext {
    constructor(value) {
        this.Value = value;
    }
}
CustomEventsHelper.register(HtmlEditorStateChangedEvent.eventName, x => x.detail);
CustomEventsHelper.register(HtmlEditorValueChangedEvent.eventName, x => x.detail);
CustomEventsHelper.register(HtmlEditorShowHyperlinkDialogEvent.eventName, x => x.detail);
CustomEventsHelper.register(HtmlEditorShowImageDialogEvent.eventName, x => x.detail);
CustomEventsHelper.register(HtmlEditorShowTableDialogEvent.eventName, x => x.detail);

class WidgetFocusHelper {
    static moveFocus(container, elementsSelector, forward) {
        const elements = container.querySelectorAll(elementsSelector);
        if (elements.length <= 1)
            return;
        const visibleElements = Array.from(elements).filter(e => !DomHelper.isHidden(e));
        if (visibleElements.length <= 1)
            return;
        const activeElement = document.activeElement;
        const currentIndex = visibleElements.reduce((index, e, i) => e.contains(activeElement) ? i : index, -1);
        if (currentIndex < 0)
            return;
        let nextFocusableElement;
        let index = currentIndex;
        if (forward) {
            index++;
            if (index >= visibleElements.length) {
                const focusableElements = this.findFocusableElements(document);
                const childFocusableElements = this.findFocusableElements(container);
                const lastElementIndex = focusableElements.indexOf(childFocusableElements[childFocusableElements.length - 1]);
                if (lastElementIndex >= 0 && lastElementIndex < focusableElements.length - 1)
                    nextFocusableElement = focusableElements[lastElementIndex + 1];
                else
                    nextFocusableElement = focusableElements[0];
            }
            else
                nextFocusableElement = visibleElements[index];
        }
        else {
            index--;
            if (index < 0) {
                const focusableElements = this.findFocusableElements(document);
                const childFocusableElements = this.findFocusableElements(container);
                const firstElementIndex = focusableElements.indexOf(childFocusableElements[0]);
                if (firstElementIndex > 0)
                    nextFocusableElement = focusableElements[firstElementIndex - 1];
                else
                    nextFocusableElement = focusableElements[focusableElements.length - 1];
            }
            else
                nextFocusableElement = visibleElements[index];
        }
        nextFocusableElement === null || nextFocusableElement === void 0 ? void 0 : nextFocusableElement.focus();
    }
    static findFocusableElements(container) {
        return Array.from(container.querySelectorAll(FocusableElementsSelector))
            .filter(el => el.tabIndex > -1 && (el.offsetWidth && el.offsetHeight) && !DomHelper.isHidden(el));
    }
}

const editorChangeEventName = "editor-change";
const defaultMinColumnWidth = 40;
const defaultMinRowHeight = 24;
const validationMessageModeAlways = "always";
const validationStatusInvalid = "invalid";
const hyperlinkDialogType = "ShowHyperlinkDialog";
const imageDialogType = "ShowInsertPictureDialog";
const tableDialogType = "ShowInsertTableDialog";
const silentMode = "silent";
const userMode = "user";
const focusOut = "focusout";
const keydown = "keydown";
const normalText = "Normal text";
const serverMaxResponseTime = 500;
var BindValueMode;
(function (BindValueMode) {
    BindValueMode["OnLostFocus"] = "onLostFocus";
    BindValueMode["OnDelayedInput"] = "onDelayedInput";
})(BindValueMode || (BindValueMode = {}));
let DxHtmlEditor = class DxHtmlEditor extends DevExtremeWidgetWrapper {
    constructor() {
        super(...arguments);
        this._readOnly = false;
        this._bindValueMode = BindValueMode.OnLostFocus;
        this._inputDelay = 500;
        this._timer = 0;
        this._lastQuillFormat = {};
        this._lastButtonsVisibility = "";
        this._valueChangesQueueTimer = 0;
        this._valueChangesQueue = [];
        this.isBindingUse = false;
    }
    getWidgetModuleName() { return "ui"; }
    getWidgetTypeName() { return "dxHtmlEditor"; }
    createInitOptions() {
        const options = super.createInitOptions();
        options.toolbar = undefined;
        options.mediaResizing = { enabled: true };
        return options;
    }
    updateWidgetOptions(widget, options) {
        if (Object.keys(options).length === 1 && "value" in options) {
            const dxtValue = widget.option("value");
            if (dxtValue === options.value)
                this.hideLoadingPanel();
            if (this._valueChangesQueue.length > 0) {
                if (this._valueChangesQueue.shift() === options.value)
                    return;
                else
                    this._valueChangesQueue = [];
            }
        }
        super.updateWidgetOptions(widget, options);
        this.updateStates(options);
    }
    processSpecialOptions(options) {
        super.processSpecialOptions(options);
        this.prepareValidationOptions(options);
        this.prepareResizingOptions(options);
        this.setBindValueOptions(options);
    }
    setBindValueOptions(options) {
        if (options.bindMarkupMode) {
            this._bindValueMode = options.bindMarkupMode;
            delete options.bindMarkupMode;
        }
        if (options.inputDelay) {
            this._inputDelay = options.inputDelay;
            delete options.inputDelay;
        }
    }
    prepareValidationOptions(options) {
        if ("showValidationMessageOnFocus" in options) {
            options.validationMessageMode = validationMessageModeAlways;
            delete options.showValidationMessageOnFocus;
        }
        if (options.isValid === false) {
            options.validationStatus = validationStatusInvalid;
            delete options.isValid;
        }
        if (options.validationMessage) {
            options.validationError = { message: options.validationMessage };
            delete options.validationMessage;
        }
    }
    prepareResizingOptions(options) {
        var _a, _b;
        if ("mediaResizeEnabled" in options) {
            options.mediaResizing = { enabled: options.mediaResizeEnabled };
            delete options.mediaResizeEnabled;
        }
        if ("tableResizeEnabled" in options) {
            options.tableResizing = {
                enabled: options.tableResizeEnabled,
                minColumnWidth: (_a = options.tableColumnMinWidth) !== null && _a !== void 0 ? _a : defaultMinColumnWidth,
                minRowHeight: (_b = options.tableRowMinHeight) !== null && _b !== void 0 ? _b : defaultMinRowHeight
            };
            delete options.tableResizeEnabled;
        }
        delete options.tableColumnMinWidth;
        delete options.tableRowMinHeight;
    }
    createComponent(options) {
        var _a;
        super.createComponent(options);
        (_a = this._widgetPromise) === null || _a === void 0 ? void 0 : _a.then(w => {
            this._widgetInstance = w;
            this._widgetInstance.getQuillInstance().on(editorChangeEventName, this.onEditorChange.bind(this));
            this.updateStates(options);
            this.getWidgetElement().removeAttribute("role");
        });
        const container = this.getContainerToSetStyle();
        container.addEventListener(focusOut, this.onFocusOut);
        container.addEventListener(keydown, this.onKeyDown);
    }
    updateStates(options) {
        this.applyHtmlEditorState(options.readOnly);
    }
    disposeComponent() {
        super.disposeComponent();
        const container = this.getContainerToSetStyle();
        container.removeEventListener(focusOut, this.onFocusOut);
        container.removeEventListener(keydown, this.onKeyDown);
    }
    createWidgetHandlers() {
        return {
            ...super.createWidgetHandlers(),
            onContentReady: (e) => this.hideLoadingPanel(),
            onValueChanged: (e) => this.onValueChanged(e.value),
            onOptionChanged: (e) => this.hideLoadingPanel(),
        };
    }
    onWidgetInitialized(e) {
        super.onWidgetInitialized(e);
        this.processMentionsModule(e.component);
    }
    processMentionsModule(component) {
        const MentionsModule = component.get("modules/mentions");
        class ExtendedMentionsModule extends MentionsModule {
            _getPopupConfig() {
                const popupConfig = super._getPopupConfig();
                popupConfig.container = "dxbl-html-editor";
                return popupConfig;
            }
        }
        component.register({ "modules/mentions": ExtendedMentionsModule });
    }
    hideLoadingPanel() {
        this.changeLoadingPanelVisibility(false);
    }
    setValueInQueue(value) {
        this._valueChangesQueue.push(value);
        clearTimeout(this._valueChangesQueueTimer);
        this._valueChangesQueueTimer = setTimeout(() => {
            this._valueChangesQueue = [];
        }, serverMaxResponseTime);
    }
    onValueChanged(value) {
        if (this._bindValueMode === BindValueMode.OnDelayedInput) {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.isBindingUse && this.setValueInQueue(value);
                this.sendValue(value);
            }, this._inputDelay);
        }
        else
            this._value = value;
    }
    onFocusOut(e) {
        if (this._bindValueMode === BindValueMode.OnLostFocus && this._value !== undefined && !LogicalTreeHelper.containsElement(this.getContainerToSetStyle(), e.relatedTarget)) {
            this.sendValue(this._value);
            this._value = undefined;
        }
    }
    onKeyDown(event) {
        if (event.shiftKey && event.altKey) {
            const keyCode = key.KeyUtils.getEventKeyCode(event);
            if (keyCode === key.KeyCode.Down) {
                this.moveFocus(true);
                event.stopPropagation();
            }
            else if (keyCode === key.KeyCode.Up) {
                this.moveFocus(false);
                event.stopPropagation();
            }
        }
    }
    moveFocus(forward) {
        WidgetFocusHelper.moveFocus(this.getContainerToSetStyle(), "dxbl-ribbon-internal, .ql-editor", forward);
    }
    sendValue(value) {
        let jsObjectReference;
        if (value !== "")
            jsObjectReference = this.getJsObjectReference(value);
        this.dispatchEvent(new HtmlEditorValueChangedEvent(jsObjectReference));
    }
    getJsObjectReference(value) {
        const textEncoder = new TextEncoder();
        const buffer = textEncoder.encode(value);
        return DotNet.createJSStreamReference(buffer);
    }
    onEditorChange(eventName, ...args) {
        if (eventName === "selection-change" && args[0] === null)
            this._selection = args[1];
        else
            !this._readOnly && this.applyHtmlEditorState();
    }
    applyHtmlEditorState(readOnly) {
        const currentReadOnly = !!readOnly;
        const quillFormat = this.getQuillFormat();
        const format = this.modifyFormat(quillFormat);
        const buttonsVisibility = this.getButtonsVisibility(quillFormat);
        if (this._readOnly !== currentReadOnly || JSON.stringify(this._lastQuillFormat) !== JSON.stringify(quillFormat) || this._lastButtonsVisibility !== buttonsVisibility)
            this.dispatchEvent(new HtmlEditorStateChangedEvent(format, buttonsVisibility, currentReadOnly));
        this._readOnly = currentReadOnly;
        this._lastQuillFormat = quillFormat;
        this._lastButtonsVisibility = buttonsVisibility;
    }
    getQuillFormat() {
        var _a, _b;
        const selection = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getSelection();
        if (selection)
            return (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.getFormat(selection.index, selection.length);
        return {};
    }
    modifyFormat(quillFormat) {
        const preparedFormat = this.prepareFormatParameters(quillFormat);
        const fullPreparedFormat = this.getFullFormat(preparedFormat);
        return JSON.stringify(fullPreparedFormat);
    }
    getFullFormat(format) {
        if (!format.header)
            format.header = normalText;
        return format;
    }
    getButtonsVisibility(format) {
        if (!this._widgetInstance)
            return "{}";
        const historyModule = this._widgetInstance.getQuillInstance().history;
        const { undo, redo } = historyModule.stack;
        const isTable = this.isTableElement(format);
        const buttons = {
            undo: undo.length > 0,
            redo: redo.length > 0,
            insertTable: !isTable,
            insertRowAbove: isTable,
            insertRowBelow: isTable,
            deleteRow: isTable,
            insertColumnLeft: isTable,
            insertColumnRight: isTable,
            deleteColumn: isTable,
            insertHeaderRow: isTable,
            deleteTable: isTable
        };
        return JSON.stringify(buttons);
    }
    isTableElement(format) {
        return !!(format.tableCellLine || format.tableHeaderCellLine);
    }
    prepareFormatParameters(format) {
        const result = {};
        for (const [key, value] of Object.entries(format)) {
            switch (key) {
                case "align":
                    if (value === "left")
                        result["alignLeft"] = true;
                    else if (value === "center")
                        result["alignCenter"] = true;
                    else if (value === "right")
                        result["alignRight"] = true;
                    else
                        result["alignJustify"] = true;
                    break;
                case "list":
                    if (value === "ordered")
                        result["orderedList"] = true;
                    else if (value === "bullet")
                        result["bulletList"] = true;
                    break;
                case "script":
                    if (value === "sub")
                        result["subscript"] = true;
                    else if (value === "super")
                        result["superscript"] = true;
                    break;
                case "indent":
                    break;
                case "code-block":
                    result["code-block"] = true;
                    break;
                case "header":
                    result["header"] = this.getHeaderValue(value);
                    break;
                case "imageSrc":
                case "background":
                case "color":
                case "target":
                case "link":
                    break;
                default:
                    result[key] = value;
                    break;
            }
        }
        return result;
    }
    parseFormatParameters(key, value) {
        let formatName;
        let formatValue;
        switch (key) {
            case "alignLeft":
                formatName = "align";
                formatValue = value ? "left" : false;
                break;
            case "alignCenter":
                formatName = "align";
                formatValue = value ? "center" : false;
                break;
            case "alignRight":
                formatName = "align";
                formatValue = value ? "right" : false;
                break;
            case "alignJustify":
                formatName = "align";
                formatValue = value ? "justify" : false;
                break;
            case "orderedList":
                formatName = "list";
                formatValue = value ? "ordered" : false;
                break;
            case "bulletList":
                formatName = "list";
                formatValue = value ? "bullet" : false;
                break;
            case "subscript":
                formatName = "script";
                formatValue = value ? "sub" : false;
                break;
            case "superscript":
                formatName = "script";
                formatValue = value ? "super" : false;
                break;
            case "increaseIndent":
                formatName = "indent";
                formatValue = value ? "+1" : false;
                break;
            case "decreaseIndent":
                formatName = "indent";
                formatValue = value ? "-1" : false;
                break;
            case "header":
                formatValue = this.parseHeaderValue(value);
                break;
        }
        return {
            formatName: formatName !== null && formatName !== void 0 ? formatName : key,
            formatValue: formatValue !== null && formatValue !== void 0 ? formatValue : value,
        };
    }
    toggleUndoRedo(key) {
        var _a, _b;
        if (key === "undo")
            (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.undo();
        else
            (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.redo();
        this.applyHtmlEditorState();
    }
    clearFormat() {
        var _a, _b;
        const selection = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getSelection();
        if (selection) {
            (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.removeFormat(selection.index, selection.length);
            this.applyHtmlEditorState();
        }
    }
    toggleFontChanges(key, value) {
        var _a, _b;
        this.focusEditor();
        if (this._selection)
            (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.setSelection(this._selection.index, this._selection.length);
        (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.format(key, value);
        this.applyHtmlEditorState();
    }
    parseHeaderValue(formatValue) {
        switch (formatValue) {
            case normalText:
                return false;
            default:
                return formatValue.split(" ")[1];
        }
    }
    getHeaderValue(value) {
        if (!value)
            return normalText;
        else
            return `Heading ${value}`;
    }
    getLeafSelection(quillInstance, selectionIndex) {
        const leaf = quillInstance.getLeaf(selectionIndex);
        const startIndex = selectionIndex - leaf[1];
        const currentText = leaf[0].text;
        return {
            index: startIndex,
            length: currentText ? currentText.length : 0
        };
    }
    getTableModule() {
        var _a;
        const quillInstance = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getQuillInstance();
        quillInstance.focus();
        return quillInstance.getModule("table");
    }
    insertRowAbove() {
        const table = this.getTableModule();
        table.insertRowAbove();
    }
    insertRowBelow() {
        const table = this.getTableModule();
        table.insertRowBelow();
    }
    deleteRow() {
        const table = this.getTableModule();
        table.deleteRow();
    }
    insertColumnLeft() {
        const table = this.getTableModule();
        table.insertColumnLeft();
    }
    insertColumnRight() {
        const table = this.getTableModule();
        table.insertColumnRight();
    }
    deleteColumn() {
        const table = this.getTableModule();
        table.deleteColumn();
    }
    insertHeaderRow() {
        const table = this.getTableModule();
        table.insertHeaderRow();
    }
    deleteTable() {
        const table = this.getTableModule();
        table.deleteTable();
    }
    insertVariable(value, extraOptions) {
        var _a, _b;
        const selection = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getSelection();
        const startIndex = selection ? selection.index : 0;
        const quillInstance = (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.getQuillInstance();
        selection && quillInstance.deleteText(startIndex, selection.length, silentMode);
        this._widgetInstance.insertEmbed(startIndex, "variable", {
            value,
            escapeChar: extraOptions ? extraOptions : ["{", "}"]
        });
    }
    executeCommand(key, value, extraOptions) {
        var _a;
        const { formatName, formatValue } = this.parseFormatParameters(key, value);
        switch (formatName) {
            case "undo":
            case "redo":
                this.toggleUndoRedo(formatName);
                break;
            case "clear":
                this.clearFormat();
                break;
            case "header":
            case "size":
            case "font":
                this.toggleFontChanges(formatName, formatValue);
                break;
            case "insertRowAbove":
                this.insertRowAbove();
                break;
            case "insertRowBelow":
                this.insertRowBelow();
                break;
            case "deleteRow":
                this.deleteRow();
                break;
            case "insertColumnLeft":
                this.insertColumnLeft();
                break;
            case "insertColumnRight":
                this.insertColumnRight();
                break;
            case "deleteColumn":
                this.deleteColumn();
                break;
            case "insertHeaderRow":
                this.insertHeaderRow();
                break;
            case "deleteTable":
                this.deleteTable();
                break;
            case "variable":
                this.insertVariable(value, extraOptions);
                break;
            default:
                (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.format(formatName, formatValue);
                this.applyHtmlEditorState();
        }
    }
    async applyPicture(streamRef, alt, width, height) {
        var _a, _b, _c, _d;
        const currentFormat = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getFormat();
        const selection = (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.getSelection();
        const quillInstance = (_c = this._widgetInstance) === null || _c === void 0 ? void 0 : _c.getQuillInstance();
        const src = await this.decodeStream(streamRef);
        let selectionIndex = (_d = selection.index) !== null && _d !== void 0 ? _d : 0;
        if (currentFormat.imageSrc && selection.length === 0) {
            selectionIndex = this.getLeafSelection(quillInstance, selection.index).index;
            quillInstance.deleteText(selectionIndex, 1, silentMode);
        }
        else if (selection.length)
            quillInstance.deleteText(selectionIndex, selection.length, silentMode);
        this._widgetInstance.insertEmbed(selectionIndex, "extendedImage", {
            src: src,
            alt: alt,
            width: width,
            height: height
        });
    }
    applyHyperlink(url, text, blank) {
        var _a, _b, _c, _d, _e;
        const currentFormat = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getFormat();
        const selection = (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.getSelection();
        const quillInstance = (_c = this._widgetInstance) === null || _c === void 0 ? void 0 : _c.getQuillInstance();
        if (selection.length > 0 && this.hasEmbeddedElement(selection)) {
            (_d = this._widgetInstance) === null || _d === void 0 ? void 0 : _d.format("link", {
                href: url,
                target: blank
            });
        }
        else {
            const linkText = text.length === 0 ? url : text;
            let selectionIndex = (_e = selection.index) !== null && _e !== void 0 ? _e : 0;
            if (currentFormat.link !== undefined && selection.length === 0) {
                const { index, length } = this.getLeafSelection(quillInstance, selection.index);
                selectionIndex = index;
                quillInstance.deleteText(index, length, silentMode);
            }
            else if (selection.length)
                quillInstance.deleteText(selection.index, selection.length, silentMode);
            quillInstance.insertText(selectionIndex, linkText, "link", {
                href: url,
                target: blank
            }, userMode);
            quillInstance.setSelection(selectionIndex + linkText.length, 0);
        }
    }
    insertTable(rows, columns) {
        const table = this.getTableModule();
        table.insertTable(rows, columns);
    }
    showDialog(type) {
        switch (type) {
            case hyperlinkDialogType:
                this.passHyperlinkDialogData();
                break;
            case imageDialogType:
                this.passImageDialogData();
                break;
            case tableDialogType:
                this.passTableDialogData();
                break;
        }
    }
    focusEditor() {
        var _a;
        (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.focus();
    }
    getSelectedContent() {
        if (!this._widgetInstance)
            return;
        const { start, length } = this.getCurrentPosition();
        const text = this._widgetInstance.getText(start, length);
        return text;
    }
    insertText(text, position) {
        if (!this._widgetInstance)
            return;
        const { start, length } = this.getCurrentPosition();
        switch (position) {
            case "after":
                this._widgetInstance.insertText(start + length, text, userMode);
                this._widgetInstance.setSelection(start + length, text.length);
                break;
            case "before":
                this._widgetInstance.insertText(start, text, userMode);
                this._widgetInstance.setSelection(start, text.length);
                break;
            case "replace":
                this._widgetInstance.delete(start, length);
                this._widgetInstance.insertText(start, text, userMode);
                this._widgetInstance.setSelection(start, text.length);
                break;
        }
    }
    getCurrentPosition() {
        const selection = this._widgetInstance.getSelection(true);
        if (selection && selection.length)
            return { start: selection.index, length: selection.length };
        return { start: 0, length: this._widgetInstance.getLength() };
    }
    hasEmbeddedElement(selection) {
        var _a;
        const quillInstance = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getQuillInstance();
        const contents = quillInstance.getContents(selection.index, selection.length).ops;
        for (const item of contents) {
            if (item.insert.extendedImage || item.insert.variable || item.insert.mention)
                return true;
        }
        return false;
    }
    async decodeStream(streamRef) {
        const data = await streamRef.arrayBuffer();
        const decoder = new TextDecoder("utf-8");
        return decoder.decode(data);
    }
    passHyperlinkDialogData() {
        var _a, _b, _c;
        let data = {};
        const currentFormat = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getFormat();
        const selection = (_b = this._widgetInstance) === null || _b === void 0 ? void 0 : _b.getSelection();
        const quillInstance = (_c = this._widgetInstance) === null || _c === void 0 ? void 0 : _c.getQuillInstance();
        if (selection.length > 0 && this.hasEmbeddedElement(selection)) {
            data = {
                url: currentFormat.link,
                text: null,
                blank: currentFormat.link ? !!currentFormat.target : undefined
            };
        }
        else if (currentFormat.link === undefined) {
            const text = this._widgetInstance.getText(selection.index, selection.length);
            data = {
                text,
            };
        }
        else {
            const leaf = quillInstance.getLeaf(selection.index);
            const text = this._widgetInstance.getText(selection.index, selection.length);
            data = {
                url: currentFormat.link,
                text: selection.length === 0 ? leaf[0].text : text,
                blank: !!currentFormat.target
            };
        }
        this.dispatchEvent(new HtmlEditorShowHyperlinkDialogEvent(data));
    }
    passImageDialogData() {
        var _a;
        let data = {};
        const currentFormat = (_a = this._widgetInstance) === null || _a === void 0 ? void 0 : _a.getFormat();
        data = {
            stream: currentFormat.imageSrc && this.getJsObjectReference(currentFormat.imageSrc),
            alt: currentFormat.alt,
            width: currentFormat.width,
            height: currentFormat.height
        };
        this.dispatchEvent(new HtmlEditorShowImageDialogEvent(data));
    }
    passTableDialogData() {
        this.dispatchEvent(new HtmlEditorShowTableDialogEvent());
    }
};
__decorate([
    n({ attribute: "is-binding-use", type: Boolean })
], DxHtmlEditor.prototype, "isBindingUse", void 0);
DxHtmlEditor = __decorate([
    e("dxbl-html-editor")
], DxHtmlEditor);

export { DxHtmlEditor };
//# sourceMappingURL=dx-html-editor-24.2.js.map
