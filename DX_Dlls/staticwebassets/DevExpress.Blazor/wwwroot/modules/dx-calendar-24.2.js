import { d as dom } from './dom-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { H as HandlePointerEventsMode, D as DxElementPointerEventsHelper, L as LongTapInteractionTimeout, P as PointerDragStartEvent, a as PointerDragStopEvent, c as PointerDragCancelEvent, d as PointerClickEvent } from './dx-html-element-pointer-events-helper-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { b as calendarTagName } from './constants-24.23.js';
import { n } from './property-24.2.js';
import { R as RectHelper } from './layouthelper-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';
import { K as KeyboardNavigationStrategy, F as FocusUtils, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { k as key } from './key-24.2.js';
import { f as focusTrapSingleton } from './focustrap-24.2.js';

const DxCalendarTableContainerTagName = "dxbl-calendar-table-container";
class CalendarCssClasses {
}
CalendarCssClasses.MainElement = CssClasses.Prefix + "-calendar";
CalendarCssClasses.SelectedItem = CalendarCssClasses.MainElement + "-selected-item";
CalendarCssClasses.SelectedRange = CalendarCssClasses.MainElement + "-selected-range";
CalendarCssClasses.Header = CalendarCssClasses.MainElement + "-header";
CalendarCssClasses.Content = CalendarCssClasses.MainElement + "-content";
CalendarCssClasses.DataTableContainerWrapperClassName = CalendarCssClasses.MainElement + "-data-table-container-wrapper";
CalendarCssClasses.Footer = CalendarCssClasses.MainElement + "-footer";
CalendarCssClasses.WeekRow = CalendarCssClasses.MainElement + "-week-row";
CalendarCssClasses.YearRow = CalendarCssClasses.MainElement + "-year-row";
CalendarCssClasses.DecadeRow = CalendarCssClasses.MainElement + "-decade-row";
CalendarCssClasses.CenturyRow = CalendarCssClasses.MainElement + "-century-row";
CalendarCssClasses.Day = CalendarCssClasses.MainElement + "-day";
CalendarCssClasses.NotCurrentView = CalendarCssClasses.MainElement + "-not-current-view";
CalendarCssClasses.HeaderHelper = CalendarCssClasses.MainElement + "-header";
CalendarCssClasses.HeaderTitleButton = CalendarCssClasses.HeaderHelper + "-title-btn";
CalendarCssClasses.HeaderPreviousYearButton = CalendarCssClasses.HeaderHelper + "-previous-year-btn";
CalendarCssClasses.HeaderPreviousMonthButton = CalendarCssClasses.HeaderHelper + "-previous-month-btn";
CalendarCssClasses.HeaderPreviousPeriodButton = CalendarCssClasses.HeaderHelper + "-previous-period-btn";
CalendarCssClasses.HeaderNextYearButton = CalendarCssClasses.HeaderHelper + "-next-year-btn";
CalendarCssClasses.HeaderNextMonthButton = CalendarCssClasses.HeaderHelper + "-next-month-btn";
CalendarCssClasses.HeaderNextPeriodButton = CalendarCssClasses.HeaderHelper + "-next-period-btn";
class CalendarSelectors {
}
CalendarSelectors.MainElement = `.${CalendarCssClasses.MainElement}`;
CalendarSelectors.SelectedItem = `td.${CalendarCssClasses.SelectedItem}`;
CalendarSelectors.Header = `.${CalendarCssClasses.Header}`;
CalendarSelectors.FirstDataTableContainer = `${DxCalendarTableContainerTagName}:nth-of-type(1)`;
CalendarSelectors.DateTableContainer = DxCalendarTableContainerTagName;
CalendarSelectors.DataTable = `.${CalendarCssClasses.Content} > table`;
CalendarSelectors.DataTableContainerWrapperClassName = `.${CalendarCssClasses.DataTableContainerWrapperClassName}`;
CalendarSelectors.Footer = `.${CalendarCssClasses.Footer}`;
CalendarSelectors.Day = `.${CalendarCssClasses.Day}`;
var CalendarAttributes;
(function (CalendarAttributes) {
    CalendarAttributes["class"] = "class";
    CalendarAttributes["view"] = "view";
    CalendarAttributes["viewDate"] = "view-date";
    CalendarAttributes["enableMultiSelect"] = "enable-multi-select";
    CalendarAttributes["minDate"] = "min-date";
    CalendarAttributes["maxDate"] = "max-date";
    CalendarAttributes["visiblePeriodsCount"] = "visible-periods-count";
    CalendarAttributes["enableRangeSelect"] = "enable-range-select";
    CalendarAttributes["periodIndex"] = "period-index";
    CalendarAttributes["hasNullStartXorEndDate"] = "has-null-start-xor-end-date";
    CalendarAttributes["selectDateOnFirstFocus"] = "select-date-on-first-focus";
})(CalendarAttributes || (CalendarAttributes = {}));
var CalendarDataCellAttributes;
(function (CalendarDataCellAttributes) {
    CalendarDataCellAttributes["dataDate"] = "data-date";
    CalendarDataCellAttributes["dataMonth"] = "data-month";
    CalendarDataCellAttributes["dataYear"] = "data-year";
    CalendarDataCellAttributes["dataDecade"] = "data-decade";
})(CalendarDataCellAttributes || (CalendarDataCellAttributes = {}));
const DaysInWeek = 7;
const NonMonthViewRowLength = 4;
const MonthsInYear = 12;
const YearsInDecade = 10;
const CalendarFirstAccessibleDate = new Date(new Date(Date.UTC(1, 0, 1)).setUTCFullYear(1));
const CalendarLastAccessibleDate = new Date(Date.UTC(9999, 11, 31));
const millisecondsInDay = 24 * 60 * 60 * 1000;

class DayCellPointerUpEvent extends CustomEvent {
    constructor(pointerDownDate, pointerUpDate, clearSelection) {
        super(DayCellPointerUpEvent.eventName, {
            detail: new DayCellPointerUpContext(pointerDownDate, pointerUpDate, clearSelection),
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
}
DayCellPointerUpEvent.eventName = calendarTagName + ".daycellpointerup";
class CalendarKeyboardNavigationLeavedEvent extends Event {
    constructor() {
        super(CalendarKeyboardNavigationLeavedEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
CalendarKeyboardNavigationLeavedEvent.eventName = calendarTagName + ".keyboardnavigationleaved";
class DayCellPointerUpContext {
    constructor(pointerDownDate, pointerUpDate, clearSelection) {
        this.PointerDownDate = pointerDownDate;
        this.PointerUpDate = pointerUpDate;
        this.ClearSelection = clearSelection;
    }
}
CustomEventsHelper.register(DayCellPointerUpEvent.eventName, x => {
    return x.detail;
});

class CalendarMultipleDaySelectionRenderer {
    constructor(options, callback) {
        this._pointerDownDate = options.pointerDownDate;
        this._pointerUpDate = null;
        this._clearSelection = options.clearSelection;
        this.dayCellElements = options.dayCellElements;
        this._callback = callback;
        this.refreshUI(false);
    }
    get clearSelection() {
        return this._clearSelection;
    }
    get pointerDownDate() {
        return this._pointerDownDate;
    }
    get pointerUpDate() {
        return this._pointerUpDate;
    }
    set pointerUpDate(value) {
        if (this._pointerUpDate === value || !value)
            return;
        this._pointerUpDate = value;
        this.refreshUI(true);
    }
    get isValid() {
        return !!this._pointerUpDate;
    }
    stop() {
        this.refreshUI(false);
        if (this.isValid && this._callback !== null)
            this._callback(this._pointerDownDate, this._pointerUpDate, this._clearSelection);
    }
    cancel() {
        for (let i = 0; i < this.dayCellElements.length; i++) {
            const dayCell = this.dayCellElements[i];
            CalendarMultipleDaySelectionRenderer.removeDayCellSelectedClasses(dayCell);
            if (dayCell.hasAttribute("data-selected"))
                CalendarMultipleDaySelectionRenderer.addSelectedClassesToCell(dayCell);
        }
    }
    refreshUI(displaySelectionBoundaries) {
        const startPointedDate = this.getStartPointedDateRange();
        const endPointedDate = this.getEndPointedDateRange();
        for (let i = 0; i < this.dayCellElements.length; i++) {
            const dayCell = this.dayCellElements[i];
            if (DxCalendar.isDateCellDisabled(dayCell))
                continue;
            const cellDayTime = Number(dayCell.dataset["date"]);
            CalendarMultipleDaySelectionRenderer.removeDayCellSelectedClasses(dayCell);
            if (displaySelectionBoundaries && this.isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate))
                dom.DomUtils.addClassName(dayCell, CalendarCssClasses.SelectedRange);
            if (this.needApplySelectedStyle(cellDayTime, startPointedDate, endPointedDate, displaySelectionBoundaries))
                CalendarMultipleDaySelectionRenderer.addSelectedClassesToCell(dayCell);
            if (dayCell.hasAttribute("data-selected") && !this.clearSelection)
                CalendarMultipleDaySelectionRenderer.addSelectedClassesToCell(dayCell);
        }
    }
    getStartPointedDateRange() {
        if (this.pointerUpDate)
            return Math.min(this.pointerUpDate.getTime(), this.pointerDownDate.getTime());
        return this.pointerDownDate.getTime();
    }
    getEndPointedDateRange() {
        if (this.pointerUpDate)
            return Math.max(this.pointerUpDate.getTime(), this.pointerDownDate.getTime());
        return this.pointerDownDate.getTime();
    }
    needApplySelectedStyle(cellDayTime, startPointedDate, endPointedDate, displaySelectionBoundaries) {
        if (cellDayTime < startPointedDate || cellDayTime > endPointedDate)
            return false;
        return displaySelectionBoundaries ? !this.isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate) : true;
    }
    isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate) {
        if (!this.isDateDisabled(cellDayTime) && (cellDayTime === startPointedDate || cellDayTime === endPointedDate))
            return true;
        const isDateInRange = cellDayTime > startPointedDate && cellDayTime < endPointedDate;
        if (isDateInRange && (cellDayTime === this.getBoundaryDate(startPointedDate, cellDayTime) || cellDayTime === this.getBoundaryDate(endPointedDate, cellDayTime)))
            return true;
        return false;
    }
    getBoundaryDate(pointedRangeDateTime, cellDayTime) {
        const isStartBoundary = pointedRangeDateTime < cellDayTime;
        const k = isStartBoundary ? 1 : -1;
        let dateTime = pointedRangeDateTime;
        while (isStartBoundary ? dateTime < cellDayTime : dateTime > cellDayTime) {
            if (!this.isDateDisabled(dateTime))
                break;
            dateTime += k * millisecondsInDay;
        }
        return dateTime;
    }
    isDateDisabled(cellDayTime) {
        const dayCell = this.getDayCellByDay(cellDayTime);
        return dayCell != null ? DxCalendar.isDateCellDisabled(dayCell) : false;
    }
    getDayCellByDay(cellDayTime) {
        for (let i = 0; i < this.dayCellElements.length; i++) {
            if (this.dayCellElements[i].getAttribute(CalendarDataCellAttributes.dataDate) === cellDayTime.toString())
                return this.dayCellElements[i];
        }
        return null;
    }
    static addSelectedClassesToCell(dayCell) {
        dom.DomUtils.addClassName(dayCell, CalendarCssClasses.SelectedItem);
    }
    static removeDayCellSelectedClasses(dayCellElement) {
        dom.DomUtils.removeClassName(dayCellElement, CalendarCssClasses.SelectedItem);
        dom.DomUtils.removeClassName(dayCellElement, CalendarCssClasses.SelectedRange);
        dom.DomUtils.removeClassName(dayCellElement, "text-white");
    }
}

class CalendarSingleDaySelectionRenderer {
    constructor(pointerDownDate, clearSelection, callback) {
        this._pointerDownDate = pointerDownDate;
        this._pointerUpDate = null;
        this._clearSelection = clearSelection;
        this._callback = callback;
    }
    get clearSelection() {
        return this._clearSelection;
    }
    get pointerDownDate() {
        return this._pointerDownDate;
    }
    get pointerUpDate() {
        return this._pointerUpDate;
    }
    set pointerUpDate(value) {
        this._pointerUpDate = value;
    }
    get isValid() {
        var _a;
        return this.pointerDownDate.getTime() === ((_a = this.pointerUpDate) === null || _a === void 0 ? void 0 : _a.getTime());
    }
    stop() {
        if (this._callback !== null && !!this._pointerUpDate)
            this._callback(this._pointerDownDate, this._pointerUpDate, this._clearSelection);
    }
    cancel() {
    }
}

class CalendarDateRangeSelectionRenderer {
    constructor(options, callback) {
        this._pointerDownDate = options.pointerDownDate;
        this._pointerUpDate = null;
        this._clearSelection = options.clearSelection;
        this.dayCellElements = options.dayCellElements;
        this._callback = callback;
        this.refreshUI();
    }
    get clearSelection() {
        return this._clearSelection;
    }
    get pointerDownDate() {
        return this._pointerDownDate;
    }
    get pointerUpDate() {
        return this._pointerUpDate;
    }
    set pointerUpDate(value) {
        if (this._pointerUpDate === value || !value)
            return;
        this._pointerUpDate = value;
        this.refreshUI();
    }
    get isValid() {
        return !!this._pointerUpDate;
    }
    stop() {
        this.refreshUI();
        if (this.isValid && this._callback !== null)
            this._callback(this._pointerDownDate, this._pointerUpDate, this._clearSelection);
    }
    cancel() {
        for (let i = 0; i < this.dayCellElements.length; i++) {
            const dayCell = this.dayCellElements[i];
            CalendarDateRangeSelectionRenderer.removeDayCellSelectedClasses(dayCell);
            if (dayCell.hasAttribute("data-selected"))
                CalendarDateRangeSelectionRenderer.addSelectedClassesToCell(dayCell);
        }
    }
    refreshUI() {
        const startPointedDate = this.getStartPointedDateRange();
        const endPointedDate = this.getEndPointedDateRange();
        for (let i = 0; i < this.dayCellElements.length; i++) {
            const dayCell = this.dayCellElements[i];
            if (DxCalendar.isDateCellDisabled(dayCell))
                continue;
            const cellDayTime = Number(dayCell.dataset["date"]);
            CalendarDateRangeSelectionRenderer.removeDayCellSelectedClasses(dayCell);
            if (this.isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate))
                dom.DomUtils.addClassName(dayCell, CalendarCssClasses.SelectedRange);
            if (this.needApplySelectedStyle(cellDayTime, startPointedDate, endPointedDate))
                CalendarDateRangeSelectionRenderer.addSelectedClassesToCell(dayCell);
            if (dayCell.hasAttribute("data-selected") && !this.clearSelection)
                CalendarDateRangeSelectionRenderer.addSelectedClassesToCell(dayCell);
        }
    }
    getStartPointedDateRange() {
        if (this.pointerUpDate)
            return Math.min(this.pointerUpDate.getTime(), this.pointerDownDate.getTime());
        return this.pointerDownDate.getTime();
    }
    getEndPointedDateRange() {
        if (this.pointerUpDate)
            return Math.max(this.pointerUpDate.getTime(), this.pointerDownDate.getTime());
        return this.pointerDownDate.getTime();
    }
    needApplySelectedStyle(cellDayTime, startPointedDate, endPointedDate) {
        if (cellDayTime < startPointedDate || cellDayTime > endPointedDate)
            return false;
        return !this.isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate);
    }
    isDateRangeBoundary(cellDayTime, startPointedDate, endPointedDate) {
        if (!this.isDateDisabled(cellDayTime) && (cellDayTime === startPointedDate || cellDayTime === endPointedDate))
            return true;
        const isDateInRange = cellDayTime > startPointedDate && cellDayTime < endPointedDate;
        return isDateInRange && (cellDayTime === this.getBoundaryDate(startPointedDate, cellDayTime) || cellDayTime === this.getBoundaryDate(endPointedDate, cellDayTime));
    }
    getBoundaryDate(pointedRangeDateTime, cellDayTime) {
        const isStartBoundary = pointedRangeDateTime < cellDayTime;
        const k = isStartBoundary ? 1 : -1;
        let dateTime = pointedRangeDateTime;
        while (isStartBoundary ? dateTime < cellDayTime : dateTime > cellDayTime) {
            if (!this.isDateDisabled(dateTime))
                break;
            dateTime += k * millisecondsInDay;
        }
        return dateTime;
    }
    isDateDisabled(cellDayTime) {
        const dayCell = this.getDayCellByDay(cellDayTime);
        return dayCell != null ? DxCalendar.isDateCellDisabled(dayCell) : false;
    }
    getDayCellByDay(cellDayTime) {
        for (let i = 0; i < this.dayCellElements.length; i++) {
            if (this.dayCellElements[i].getAttribute(CalendarDataCellAttributes.dataDate) === cellDayTime.toString())
                return this.dayCellElements[i];
        }
        return null;
    }
    static addSelectedClassesToCell(dayCell) {
        dom.DomUtils.addClassName(dayCell, CalendarCssClasses.SelectedItem);
    }
    static removeDayCellSelectedClasses(dayCellElement) {
        dom.DomUtils.removeClassName(dayCellElement, CalendarCssClasses.SelectedItem);
        dom.DomUtils.removeClassName(dayCellElement, CalendarCssClasses.SelectedRange);
        dom.DomUtils.removeClassName(dayCellElement, "text-white");
    }
}

var CalendarHeaderButtonType;
(function (CalendarHeaderButtonType) {
    CalendarHeaderButtonType[CalendarHeaderButtonType["PreviousYear"] = 0] = "PreviousYear";
    CalendarHeaderButtonType[CalendarHeaderButtonType["PreviousMonth"] = 1] = "PreviousMonth";
    CalendarHeaderButtonType[CalendarHeaderButtonType["Title"] = 2] = "Title";
    CalendarHeaderButtonType[CalendarHeaderButtonType["NextMonth"] = 3] = "NextMonth";
    CalendarHeaderButtonType[CalendarHeaderButtonType["NextYear"] = 4] = "NextYear";
    CalendarHeaderButtonType[CalendarHeaderButtonType["PreviousPeriod"] = 5] = "PreviousPeriod";
    CalendarHeaderButtonType[CalendarHeaderButtonType["NextPeriod"] = 6] = "NextPeriod";
})(CalendarHeaderButtonType || (CalendarHeaderButtonType = {}));
var CalendarNavigationAreaType;
(function (CalendarNavigationAreaType) {
    CalendarNavigationAreaType[CalendarNavigationAreaType["Header"] = 0] = "Header";
    CalendarNavigationAreaType[CalendarNavigationAreaType["DataTable"] = 1] = "DataTable";
    CalendarNavigationAreaType[CalendarNavigationAreaType["Footer"] = 2] = "Footer";
})(CalendarNavigationAreaType || (CalendarNavigationAreaType = {}));
var CalendarView;
(function (CalendarView) {
    CalendarView[CalendarView["Month"] = 0] = "Month";
    CalendarView[CalendarView["Year"] = 1] = "Year";
    CalendarView[CalendarView["Decade"] = 2] = "Decade";
    CalendarView[CalendarView["Century"] = 3] = "Century";
})(CalendarView || (CalendarView = {}));
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month || (Month = {}));

class DxCalendarTableContainer extends SingleSlotElementBase {
    constructor() {
        super();
        this._handlePointerEventsMode = HandlePointerEventsMode.None;
        this.viewDate = new Date();
        this.viewType = CalendarView.Month;
        this.periodIndex = 0;
        this._pointerEventsHelper = new DxElementPointerEventsHelper(this);
    }
    get calendar() {
        if (!this._calendar)
            this._calendar = dom.DomUtils.getParentByTagName(this, calendarTagName);
        return this._calendar;
    }
    connectedCallback() {
        super.connectedCallback();
        this._pointerEventsHelper.initialize();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._pointerEventsHelper.dispose();
    }
    updated(changed) {
        if (changed.has("viewDate"))
            this.calendar.restoreFocus();
        if (changed.has("viewType")) {
            this._handlePointerEventsMode = HandlePointerEventsMode.None;
            if (this.viewType === CalendarView.Month) {
                this.calendar.fixCalendarTableSize();
                this._handlePointerEventsMode = HandlePointerEventsMode.Click | HandlePointerEventsMode.Dragging;
            }
            this.calendar.restoreFocus();
        }
        super.updated(changed);
    }
    // Pointer events interaction
    get handlePointerEventsMode() {
        return this._handlePointerEventsMode;
    }
    get handlePointerEventsTarget() {
        return this;
    }
    get handlePointerEventsDelay() {
        return LongTapInteractionTimeout;
    }
    get hoverTitleElementsSelector() {
        return null;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return null;
    }
    shouldProcessPointerEvent(evt) {
        return true;
    }
}
__decorate([
    n({
        attribute: CalendarAttributes.viewDate,
        converter(value) {
            return new Date(Number(value));
        }
    })
], DxCalendarTableContainer.prototype, "viewDate", void 0);
__decorate([
    n({ type: Number, attribute: CalendarAttributes.view })
], DxCalendarTableContainer.prototype, "viewType", void 0);
__decorate([
    n({ type: Number, attribute: CalendarAttributes.periodIndex })
], DxCalendarTableContainer.prototype, "periodIndex", void 0);

class CalendarKbdStrategy extends KeyboardNavigationStrategy {
    constructor(calendar, targetElement) {
        super(calendar.getKeyboardNavigator(), targetElement);
        this.calendar = calendar;
    }
    isFocusedFromOutside() {
        return this.calendar.isSameNode(document.activeElement);
    }
    isFocusedFromDataTable() {
        var _a, _b, _c;
        return (_c = (_b = ((_a = this.getDataTableContainerWrapper()) !== null && _a !== void 0 ? _a : this.getCurrentDataTableContainer())) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) !== null && _c !== void 0 ? _c : false;
    }
    getHeader() {
        return this.calendar.getHeaderElement();
    }
    getDataTableContainerWrapper() {
        return this.calendar.tableContainerWrapper;
    }
    getCurrentDataTableContainer() {
        return this.calendar.currentTableContainer;
    }
    getAllDataTableContainers() {
        return this.calendar.enumerateTableContainers;
    }
    getFooter() {
        return this.calendar.getFooterElement();
    }
}

class CalendarHeaderKbdStrategy extends CalendarKbdStrategy {
    constructor(calendar, targetElement) {
        super(calendar, targetElement);
        this.itemSelector = `:scope > .${CssClasses.Button}:not(.${CssClasses.Disabled}), :scope > div.${CalendarCssClasses.HeaderTitleButton}:not(.${CssClasses.Disabled})`;
        this.buttonClassToButtonType = new Map([
            [CalendarCssClasses.HeaderPreviousYearButton, CalendarHeaderButtonType.PreviousYear],
            [CalendarCssClasses.HeaderPreviousMonthButton, CalendarHeaderButtonType.PreviousMonth],
            [CalendarCssClasses.HeaderPreviousPeriodButton, CalendarHeaderButtonType.PreviousPeriod],
            [CalendarCssClasses.HeaderTitleButton, CalendarHeaderButtonType.Title],
            [CalendarCssClasses.HeaderNextYearButton, CalendarHeaderButtonType.NextYear],
            [CalendarCssClasses.HeaderNextMonthButton, CalendarHeaderButtonType.NextMonth],
            [CalendarCssClasses.HeaderNextPeriodButton, CalendarHeaderButtonType.NextPeriod],
        ]);
        this.buttonTypeToButtonClass = new Map([
            [CalendarHeaderButtonType.PreviousYear, CalendarCssClasses.HeaderPreviousYearButton],
            [CalendarHeaderButtonType.PreviousMonth, CalendarCssClasses.HeaderPreviousMonthButton],
            [CalendarHeaderButtonType.PreviousPeriod, CalendarCssClasses.HeaderPreviousPeriodButton],
            [CalendarHeaderButtonType.Title, CalendarCssClasses.HeaderTitleButton],
            [CalendarHeaderButtonType.NextYear, CalendarCssClasses.HeaderNextYearButton],
            [CalendarHeaderButtonType.NextMonth, CalendarCssClasses.HeaderNextMonthButton],
            [CalendarHeaderButtonType.NextPeriod, CalendarCssClasses.HeaderNextPeriodButton]
        ]);
    }
    getShortcutContext() {
        return {
            AreaType: CalendarNavigationAreaType.Header,
            ButtonType: this.getSelectedButtonType()
        };
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    activate() {
        const lastFocusedButtonIndex = this.getButtonIndexByType(this.lastFocusedButtonType);
        if (this.isFocusedFromOutside())
            this.selectedItemIndex = 0;
        else if (this.isFocusedFromDataTable())
            this.selectedItemIndex = this.itemCount - 1;
        else
            this.selectedItemIndex = lastFocusedButtonIndex !== null && lastFocusedButtonIndex !== void 0 ? lastFocusedButtonIndex : 0;
        super.activate();
    }
    leaveBackward() {
        this.lastFocusedButtonType = undefined;
        super.leaveBackward();
    }
    leaveForward() {
        this.lastFocusedButtonType = undefined;
        super.leaveForward();
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                return evt.shiftKey ? this.moveToPrevItem() : this.moveToNextItem();
            case key.KeyCode.Space:
            case key.KeyCode.Enter:
                this.calendar.scheduleFocusRestoration(false);
                this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Left:
            case key.KeyCode.Up:
            case key.KeyCode.Home:
            case key.KeyCode.PageUp:
            case key.KeyCode.Right:
            case key.KeyCode.Down:
            case key.KeyCode.End:
            case key.KeyCode.PageDown:
                return true;
        }
        return super.handleKeyDown(evt);
    }
    moveToPrevItem() {
        if (this.selectedItemIndex > 0) {
            this.selectItem(this.selectedItemIndex - 1);
            return true;
        }
        return false;
    }
    moveToNextItem() {
        if (this.selectedItemIndex < this.itemCount - 1) {
            this.selectItem(this.selectedItemIndex + 1);
            return true;
        }
        return false;
    }
    updateSelectedItemByIndex(index) {
        super.updateSelectedItemByIndex(index);
        this.lastFocusedButtonType = this.getSelectedButtonType();
    }
    getSelectedButtonType() {
        for (const className of this.selectedItemElement.classList) {
            if (this.buttonClassToButtonType.has(className))
                return this.buttonClassToButtonType.get(className);
        }
    }
    getButtonIndexByType(buttonType) {
        return buttonType ? this.items.findIndex(i => i.classList.contains(this.buttonTypeToButtonClass.get(buttonType))) : undefined;
    }
}

class CalendarDataTableKbdStrategyBase extends CalendarKbdStrategy {
    get isObsolete() {
        return this.calendar.currentView !== this.currentCalendarView;
    }
    get targetElement() {
        return super.targetElement;
    }
    constructor(calendar, targetElement) {
        super(calendar, targetElement);
        this.boundCalendarFocusedDayChangedHandler = this.onCalendarFocusedDayChanged.bind(this);
        this.calendar.onFocusedDayChanged(this.boundCalendarFocusedDayChangedHandler);
    }
    activate() {
        this.applyCalendarFocus();
        super.activate();
    }
    onDispose() {
        this.calendar.offFocusedDayChanged(this.boundCalendarFocusedDayChangedHandler);
        super.onDispose();
    }
    get daySelectionRenderer() {
        return this.calendar.daySelectionRenderer;
    }
    getShortcutContext() {
        const shortcutArgs = this.lastShortcutArgs;
        delete this.lastShortcutArgs;
        return {
            AreaType: CalendarNavigationAreaType.DataTable,
            Offset: shortcutArgs === null || shortcutArgs === void 0 ? void 0 : shortcutArgs.offset,
            Row: shortcutArgs === null || shortcutArgs === void 0 ? void 0 : shortcutArgs.row,
            Column: shortcutArgs === null || shortcutArgs === void 0 ? void 0 : shortcutArgs.column,
            PeriodIndex: shortcutArgs === null || shortcutArgs === void 0 ? void 0 : shortcutArgs.periodIndex,
            Date: shortcutArgs === null || shortcutArgs === void 0 ? void 0 : shortcutArgs.date
        };
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Left:
                if ((evt.ctrlKey || evt.metaKey || evt.altKey) && !evt.shiftKey)
                    return false;
                return this.moveToPrevDay(evt);
            case key.KeyCode.Right:
                if ((evt.ctrlKey || evt.metaKey || evt.altKey) && !evt.shiftKey)
                    return false;
                return this.moveToNextDay(evt);
            case key.KeyCode.Up:
                if ((evt.ctrlKey || evt.metaKey || evt.altKey) && !evt.shiftKey)
                    return false;
                return this.moveToPrevRow(evt);
            case key.KeyCode.Down:
                if ((evt.ctrlKey || evt.metaKey || evt.altKey) && !evt.shiftKey)
                    return false;
                return this.moveToNextRow(evt);
            case (key.KeyCode.Home):
                return this.handleHomeKey(evt);
            case (key.KeyCode.End):
                return this.handleEndKey(evt);
            case (key.KeyCode.PageUp):
                this.calendar.scheduleFocusRestoration();
                return this.handlePageUpKey(evt);
            case (key.KeyCode.PageDown):
                this.calendar.scheduleFocusRestoration();
                return this.handlePageDownKey(evt);
            case (key.KeyCode.Enter):
            case (key.KeyCode.Space):
                this.handleItemClick(evt);
                return true;
        }
        return super.handleKeyDown(evt);
    }
    handleKeyUp(evt) {
        if (this.isShiftKeyCode(evt))
            this.stopSelectingDays();
        return super.handleKeyUp(evt);
    }
    isShiftKeyCode(evt) {
        return key.KeyUtils.getEventKeyCode(evt) === 16;
    }
    getSelectedItemRowIndex() {
        return Math.floor(this.selectedItemIndex / this.rowLength);
    }
    getSelectedItemColumnIndex() {
        return Math.floor(this.selectedItemIndex % this.rowLength);
    }
    handlePageUpKey(evt, offset) {
        this.prepareAndPerformShortcutEvent(evt, {
            offset: offset !== null && offset !== void 0 ? offset : (evt.shiftKey ? -MonthsInYear : -1),
            date: evt.shiftKey ? DxCalendar.getDateFromCell(this.selectedItemElement) : undefined
        });
        return true;
    }
    handlePageDownKey(evt, offset) {
        this.prepareAndPerformShortcutEvent(evt, {
            offset: offset !== null && offset !== void 0 ? offset : (evt.shiftKey ? MonthsInYear : 1),
            date: evt.shiftKey ? DxCalendar.getDateFromCell(this.selectedItemElement) : undefined
        });
        return true;
    }
    prepareAndPerformShortcutEvent(evt, args) {
        args.periodIndex = this.targetElement.periodIndex;
        this.lastShortcutArgs = args;
        this.performShortcutEvent(evt);
    }
    tryRemoveTabindexFromSelectedElement() {
        if (this.selectedItemElement)
            FocusUtils.removeTabIndex(this.selectedItemElement);
    }
    onCalendarFocusedDayChanged(focusedDayElement, needImmediateSelection = true) {
        this.tryRemoveTabindexFromSelectedElement();
        if (this.isActive() && focusedDayElement) {
            this.tryRestoreSelectedItem(focusedDayElement);
            if (this.selectedItemElement)
                FocusUtils.makeElementFocusable(this.selectedItemElement);
            if (needImmediateSelection)
                this.selectItem(this.selectedItemIndex);
        }
    }
    applyCalendarFocus() {
        var _a;
        this.tryRemoveTabindexFromSelectedElement();
        const calendarFocusedElement = (_a = this.calendar.getFocusedCellElementInView(this.currentCalendarView)) !== null && _a !== void 0 ? _a : this.targetElement.querySelector(CalendarSelectors.SelectedItem);
        if (calendarFocusedElement)
            this.tryRestoreSelectedItem(calendarFocusedElement);
    }
    tryRestoreSelectedItem(itemElementToRestore) {
        if (!itemElementToRestore.isConnected)
            return;
        const targetStrategy = this.navigator.getStrategy(this.getCurrentDataTableContainer());
        if (!targetStrategy)
            return;
        const itemIndex = targetStrategy.items.indexOf(itemElementToRestore);
        if (itemIndex > -1)
            targetStrategy.selectedItemIndex = itemIndex;
    }
    initStartDaySelection(evt) {
        if (this.daySelectionRenderer === null && evt.shiftKey)
            this.calendar.createDaySelectionRenderer(DxCalendar.getDateFromCell(this.selectedItemElement), !evt.ctrlKey && !evt.metaKey);
    }
    stopSelectingDays() {
        if (this.daySelectionRenderer !== null) {
            this.daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(this.selectedItemElement);
            this.calendar.stopSelectingDays();
        }
    }
    updateSelectedItemFocusableState() {
        if (this.selectedItemElement)
            this.isActive() ? FocusUtils.makeElementFocusable(this.selectedItemElement) : FocusUtils.removeTabIndex(this.selectedItemElement);
    }
    isActive() {
        return this.targetElement === this.calendar.currentTableContainer;
    }
}
class CalendarMonthDataTableKbdStrategy extends CalendarDataTableKbdStrategyBase {
    get rowLength() { return DaysInWeek; }
    get currentCalendarView() { return CalendarView.Month; }
    get itemSelector() { return `:scope .${CalendarCssClasses.WeekRow} > .${CalendarCssClasses.Day}`; }
    constructor(calendar, targetElement) {
        super(calendar, targetElement);
    }
    activate() {
        super.activate();
        this.extendSelection();
    }
    moveToPrevDay(evt) {
        var _a, _b;
        const offset = { value: -1, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : -1;
            if (this.selectedItemIndex >= resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_b = movementResult.periodsToSkip) !== null && _b !== void 0 ? _b : -1);
        }
        return true;
    }
    moveToNextDay(evt) {
        var _a, _b;
        const offset = { value: 1, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : 1;
            if (this.selectedItemIndex < this.itemCount - resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_b = movementResult.periodsToSkip) !== null && _b !== void 0 ? _b : 1);
        }
        return true;
    }
    moveToPrevRow(evt) {
        var _a, _b;
        const offset = { value: -1, isHorizontal: false };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : -this.rowLength;
            if (this.selectedItemIndex >= resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_b = movementResult.periodsToSkip) !== null && _b !== void 0 ? _b : -1);
        }
        return true;
    }
    moveToNextRow(evt) {
        var _a, _b;
        const offset = { value: 1, isHorizontal: false };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : this.rowLength;
            if (this.selectedItemIndex < this.itemCount - resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_b = movementResult.periodsToSkip) !== null && _b !== void 0 ? _b : 1);
        }
        return true;
    }
    handleHomeKey(evt) {
        var _a;
        const newItemIndex = this.getSelectedItemRowIndex() * this.rowLength;
        const offset = { value: newItemIndex - this.selectedItemIndex, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const newSelectedItemIndex = movementResult.unitsToSkip !== undefined ? this.selectedItemIndex + movementResult.unitsToSkip : newItemIndex;
            this.selectItem(newSelectedItemIndex);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_a = movementResult.periodsToSkip) !== null && _a !== void 0 ? _a : -1);
        }
        return true;
    }
    handleEndKey(evt) {
        var _a;
        const newItemIndex = (this.getSelectedItemRowIndex() + 1) * this.rowLength - 1;
        const offset = { value: newItemIndex - this.selectedItemIndex, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const newSelectedItemIndex = movementResult.unitsToSkip !== undefined ? this.selectedItemIndex + movementResult.unitsToSkip : newItemIndex;
            this.selectItem(newSelectedItemIndex);
            this.extendSelection();
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, (_a = movementResult.periodsToSkip) !== null && _a !== void 0 ? _a : 1);
        }
        return true;
    }
    handlePageUpKey(evt) {
        const offsetValue = evt.shiftKey
            ? DxCalendar.getYearOffsetInDaysFrom(-1, this.selectedItemElement)
            : DxCalendar.getMonthOffsetInDaysFrom(-1, this.selectedItemElement);
        const offset = { value: -offsetValue, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            this.applyCalendarFocus();
            this.selectItem(this.selectedItemIndex);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange) {
                this.applyCalendarFocus();
                return false;
            }
            super.handlePageUpKey(evt, movementResult.periodsToSkip);
        }
        return true;
    }
    handlePageDownKey(evt) {
        const offsetValue = evt.shiftKey
            ? DxCalendar.getYearOffsetInDaysFrom(1, this.selectedItemElement)
            : DxCalendar.getMonthOffsetInDaysFrom(1, this.selectedItemElement);
        const offset = { value: offsetValue, isHorizontal: true };
        this.initStartDaySelection(evt);
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            this.applyCalendarFocus();
            this.selectItem(this.selectedItemIndex);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange) {
                this.applyCalendarFocus();
                return false;
            }
            super.handlePageDownKey(evt, movementResult.periodsToSkip);
        }
        return true;
    }
    extendSelection() {
        if (this.daySelectionRenderer !== null)
            this.daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(this.selectedItemElement);
    }
    handleItemClick(evt) {
        const date = DxCalendar.getDateFromCell(this.selectedItemElement);
        this.calendar.tryCreateRangeSelectionRenderer(date);
        this.prepareAndPerformShortcutEvent(evt, { date });
    }
    switchCurrentMonth(evt, offset) {
        this.prepareAndPerformShortcutEvent(evt, {
            offset,
            date: this.calendar.focusedDate
        });
    }
}
class CalendarNonMonthDataTableKbdStrategy extends CalendarDataTableKbdStrategyBase {
    get rowLength() { return NonMonthViewRowLength; }
    moveToPrevDay(evt) {
        var _a;
        const movementResult = this.calendar.tryMoveFocus({ value: -1, isHorizontal: true }, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : -1;
            if (this.selectedItemIndex >= resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, -1);
        }
        return true;
    }
    moveToNextDay(evt) {
        var _a;
        const movementResult = this.calendar.tryMoveFocus({ value: 1, isHorizontal: true }, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : 1;
            if (this.selectedItemIndex < this.itemCount - resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, 1);
        }
        return true;
    }
    moveToPrevRow(evt) {
        var _a;
        const movementResult = this.calendar.tryMoveFocus({ value: -1, isHorizontal: false }, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : -this.rowLength;
            if (this.selectedItemIndex >= resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, -1);
        }
        return true;
    }
    moveToNextRow(evt) {
        var _a;
        const movementResult = this.calendar.tryMoveFocus({ value: 1, isHorizontal: false }, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const resultingOffset = (_a = movementResult.unitsToSkip) !== null && _a !== void 0 ? _a : this.rowLength;
            if (this.selectedItemIndex < this.itemCount - resultingOffset)
                this.selectItem(this.selectedItemIndex + resultingOffset);
        }
        else {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            this.switchCurrentMonth(evt, 1);
        }
        return true;
    }
    handleHomeKey(_evt) {
        const newItemIndex = this.getIndexOfFirstAccessibleItemInCurrentView();
        const offset = { value: newItemIndex - this.selectedItemIndex, isHorizontal: true };
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const newSelectedItemIndex = movementResult.unitsToSkip !== undefined ? this.selectedItemIndex + movementResult.unitsToSkip : newItemIndex;
            this.selectItem(newSelectedItemIndex);
        }
        else if (movementResult.newPeriodFitsIntoVisibleRange)
            return false;
        return true;
    }
    handleEndKey(_evt) {
        const newItemIndex = this.getIndexOfLastAccessibleItemInCurrentView();
        const offset = { value: newItemIndex - this.selectedItemIndex, isHorizontal: true };
        const movementResult = this.calendar.tryMoveFocus(offset, this.selectedItemElement);
        if (!movementResult.needChangePeriod) {
            const newSelectedItemIndex = movementResult.unitsToSkip !== undefined ? this.selectedItemIndex + movementResult.unitsToSkip : newItemIndex;
            this.selectItem(newSelectedItemIndex);
        }
        else if (movementResult.newPeriodFitsIntoVisibleRange)
            return false;
        return true;
    }
    handlePageUpKey(evt) {
        const offsetValue = this.calendar.currentView === CalendarView.Year ? MonthsInYear : YearsInDecade;
        const movementResult = this.calendar.tryMoveFocus({ value: -offsetValue, isHorizontal: true }, this.selectedItemElement);
        if (movementResult.needChangePeriod) {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            super.handlePageUpKey(evt, movementResult.periodsToSkip);
        }
        return true;
    }
    handlePageDownKey(evt) {
        const offsetValue = this.calendar.currentView === CalendarView.Year ? MonthsInYear : YearsInDecade;
        const movementResult = this.calendar.tryMoveFocus({ value: offsetValue, isHorizontal: true }, this.selectedItemElement);
        if (movementResult.needChangePeriod) {
            if (movementResult.newPeriodFitsIntoVisibleRange)
                return false;
            super.handlePageDownKey(evt, movementResult.periodsToSkip);
        }
        return true;
    }
    handleItemClick(evt) {
        this.calendar.scheduleFocusRestoration();
        this.prepareAndPerformShortcutEvent(evt, { row: this.getSelectedItemRowIndex(), column: this.getSelectedItemColumnIndex() });
    }
    switchCurrentMonth(evt, offset) {
        this.prepareAndPerformShortcutEvent(evt, { offset });
    }
    getIndexOfFirstAccessibleItemInCurrentView() {
        let itemIndex = 0;
        while (itemIndex <= this.selectedItemIndex && !this.itemBelongsToCurrentView(itemIndex))
            itemIndex++;
        return itemIndex;
    }
    getIndexOfLastAccessibleItemInCurrentView() {
        let itemIndex = this.itemCount - 1;
        while (itemIndex >= this.selectedItemIndex && !this.itemBelongsToCurrentView(itemIndex))
            itemIndex--;
        return itemIndex;
    }
    itemBelongsToCurrentView(itemIndex) {
        var _a;
        return !((_a = this.getItem(itemIndex)) === null || _a === void 0 ? void 0 : _a.classList.contains(CalendarCssClasses.NotCurrentView));
    }
}
class CalendarYearDataTableKbdStrategy extends CalendarNonMonthDataTableKbdStrategy {
    get currentCalendarView() { return CalendarView.Year; }
    get itemSelector() { return `:scope .${CalendarCssClasses.YearRow} > td`; }
}
class CalendarDecadeDataTableKbdStrategy extends CalendarNonMonthDataTableKbdStrategy {
    get currentCalendarView() { return CalendarView.Decade; }
    get itemSelector() { return `:scope .${CalendarCssClasses.DecadeRow} > td:not(.${CssClasses.Invisible})`; }
}
class CalendarCenturyDataTableKbdStrategy extends CalendarNonMonthDataTableKbdStrategy {
    get currentCalendarView() { return CalendarView.Century; }
    get itemSelector() { return `:scope .${CalendarCssClasses.CenturyRow} > td:not(.${CssClasses.Invisible})`; }
}

class CalendarFooterKbdStrategy extends CalendarKbdStrategy {
    constructor(calendar, targetElement) {
        super(calendar, targetElement);
        this.itemSelector = `:scope > .${CssClasses.Button}`;
    }
    getShortcutContext() {
        return {
            AreaType: CalendarNavigationAreaType.Footer,
            ButtonType: this.selectedItemIndex
        };
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    activate() {
        this.selectedItemIndex = this.isFocusedFromOutside() ? this.itemCount - 1 : 0;
        super.activate();
    }
    handleKeyDown(evt) {
        switch (key.KeyUtils.getEventKeyCode(evt)) {
            case key.KeyCode.Tab:
                return evt.shiftKey ? this.moveToPrevItem() : this.moveToNextItem();
            case key.KeyCode.Space:
            case key.KeyCode.Enter:
                this.performShortcutEvent(evt);
                return true;
            case key.KeyCode.Left:
            case key.KeyCode.Up:
            case key.KeyCode.Home:
            case key.KeyCode.PageUp:
            case key.KeyCode.Right:
            case key.KeyCode.Down:
            case key.KeyCode.End:
            case key.KeyCode.PageDown:
                return true;
        }
        return super.handleKeyDown(evt);
    }
    moveToPrevItem() {
        if (this.selectedItemIndex > 0) {
            this.selectItem(this.selectedItemIndex - 1);
            return true;
        }
        return false;
    }
    moveToNextItem() {
        if (this.selectedItemIndex < this.itemCount - 1) {
            this.selectItem(this.selectedItemIndex + 1);
            return true;
        }
        return false;
    }
}

class CalendarRootKbdStrategy extends CalendarKbdStrategy {
    constructor(calendar) {
        super(calendar, calendar);
        this._isFirstFocus = true;
    }
    updateSelectedItemByChildElement(childElement, evt = null) {
        super.updateSelectedItemByChildElement(childElement, evt);
        if (this.calendar.hasAttribute(CalendarAttributes.selectDateOnFirstFocus) && this._isFirstFocus) {
            this._isFirstFocus = false;
            this.selectedItemIndex = 1;
        }
    }
    queryItems() {
        return new Array(this.getHeader(), ...this.getAllDataTableContainers(), this.getFooter());
    }
    activate() {
        const isUpcomingStrategyADataTableOne = this.isDateTableStrategy(this.getItemStrategy(this.selectedItemIndex));
        if (isUpcomingStrategyADataTableOne)
            this.selectedItemIndex = this.findActiveDataTableStrategyIndex();
        super.activate();
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches(CalendarSelectors.Header))
            return new CalendarHeaderKbdStrategy(this.calendar, itemElement);
        if (itemElement.matches(CalendarSelectors.DateTableContainer))
            return this.createDataTableStrategy(itemElement);
        if (itemElement.matches(CalendarSelectors.Footer))
            return new CalendarFooterKbdStrategy(this.calendar, itemElement);
        throw new Error("Not implemented");
    }
    createDataTableStrategy(tableContainer) {
        switch (tableContainer.viewType) {
            case CalendarView.Month:
                return new CalendarMonthDataTableKbdStrategy(this.calendar, tableContainer);
            case CalendarView.Year:
                return new CalendarYearDataTableKbdStrategy(this.calendar, tableContainer);
            case CalendarView.Decade:
                return new CalendarDecadeDataTableKbdStrategy(this.calendar, tableContainer);
            case CalendarView.Century:
                return new CalendarCenturyDataTableKbdStrategy(this.calendar, tableContainer);
        }
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        switch (keyCode) {
            case key.KeyCode.Tab:
                return this.handleTab(evt);
            case key.KeyCode.Up:
                return this.handleArrowUp(evt);
            case key.KeyCode.Down:
                return this.handleArrowDown(evt);
            case key.KeyCode.Left:
            case key.KeyCode.Home:
            case key.KeyCode.PageUp:
                return this.handleMove(evt, false);
            case key.KeyCode.Right:
            case key.KeyCode.End:
            case key.KeyCode.PageDown:
                return this.handleMove(evt, true);
        }
        return super.handleKeyDown(evt);
    }
    handleTab(evt) {
        if (this.isDateTableStrategy(this.getSelectedItemStrategy())) {
            const newIndex = this.findNotDataTableStrategyIndex(!evt.shiftKey);
            if (newIndex !== -1) {
                this.selectItem(newIndex);
                return true;
            }
            else {
                this.updateDataTableStrategiesFocusableElements();
                this.selectedItemIndex = evt.shiftKey ? 0 : this.itemCount - 1;
            }
        }
        else {
            const nextStrategyIndex = this.selectedItemIndex + (evt.shiftKey ? -1 : 1);
            if (this.isDateTableStrategy(this.getItemStrategy(nextStrategyIndex))) {
                this.updateDataTableStrategiesFocusableElements();
                this.selectItem(this.findActiveDataTableStrategyIndex());
                return true;
            }
        }
        if (evt.shiftKey) {
            if (this.selectedItemIndex > 0)
                this.moveToPrevItem();
            else {
                this.leaveBackward();
                this.dispatchKeyboardNavigationLeavedEvent();
            }
            return true;
        }
        else {
            if (this.selectedItemIndex < this.itemCount - 1) {
                this.moveToNextItem();
                return true;
            }
        }
        return super.handleKeyDown(evt);
    }
    handleArrowUp(evt) {
        if (evt.ctrlKey) {
            this.calendar.scheduleFocusRestoration();
            this.performShortcutEvent(evt);
            return true;
        }
        return this.handleMove(evt, false);
    }
    handleArrowDown(evt) {
        if (evt.ctrlKey) {
            this.calendar.scheduleFocusRestoration();
            this.performShortcutEvent(evt);
            return true;
        }
        return this.handleMove(evt, true);
    }
    handleMove(evt, moveForward) {
        if (!this.isAnyModifierKeyPressed(evt)) {
            moveForward ? this.moveToNextItem() : this.moveToPrevItem();
            return true;
        }
        return super.handleKeyDown(evt);
    }
    dispatchKeyboardNavigationLeavedEvent() {
        setTimeout(() => this.targetElement.dispatchEvent(new CalendarKeyboardNavigationLeavedEvent()), 0);
    }
    isAnyModifierKeyPressed(evt) {
        return evt.shiftKey || evt.ctrlKey || evt.metaKey || evt.altKey;
    }
    findNotDataTableStrategyIndex(forward) {
        if (forward) {
            for (let i = this.selectedItemIndex + 1; i < this.itemCount; i++) {
                if (!this.isDateTableStrategy(this.getItemStrategy(i)))
                    return i;
            }
        }
        else {
            for (let i = this.selectedItemIndex - 1; i >= 0; i--) {
                if (!this.isDateTableStrategy(this.getItemStrategy(i)))
                    return i;
            }
        }
        return -1;
    }
    findActiveDataTableStrategyIndex() {
        for (let i = 0; i < this.itemCount; i++) {
            const strategy = this.getItemStrategy(i);
            if (this.isDateTableStrategy(strategy) && strategy.isActive())
                return i;
        }
        return 0;
    }
    updateDataTableStrategiesFocusableElements() {
        for (let i = 0; i < this.itemCount; i++) {
            const strategy = this.getItemStrategy(i);
            if (this.isDateTableStrategy(strategy))
                strategy.updateSelectedItemFocusableState();
        }
        if (focusTrapSingleton.isActivated)
            focusTrapSingleton.updateSubscriptions();
    }
    isDateTableStrategy(strategy) {
        return strategy instanceof CalendarDataTableKbdStrategyBase;
    }
}

class CalendarBaseFocusStrategy {
    get focusedItem() {
        return this._focusedItem;
    }
    set focusedItem(value) {
        this._focusedItem = value;
    }
    get focusedElement() {
        return this._focusedElement;
    }
    set focusedElement(value) {
        this._focusedElement = value;
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = value;
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = value;
    }
    get calendar() {
        return this._calendar;
    }
    constructor(calendar) {
        this.boundCalendarMinMaxDatesChangedHandler = this.updateMinMaxDates.bind(this);
        this._calendar = calendar;
        this._focusedElement = null;
        this._minDate = this._calendar.minDate;
        this._maxDate = this._calendar.maxDate;
        this.calendar.onMinMaxDatesChanged(this.boundCalendarMinMaxDatesChangedHandler);
    }
    get calendarCurrentViewDate() {
        return this.calendar.currentViewDate;
    }
    getUpdatedElementToFocus() {
        this.focusedElement = this.findCellElementByItem(this.getUpdatedItemToFocus());
        return this.focusedElement;
    }
    updateMinMaxDates(minDate, maxDate) {
        if (minDate)
            this._minDate = minDate;
        if (maxDate)
            this._maxDate = maxDate;
    }
}

class CalendarYearViewFocusStrategy extends CalendarBaseFocusStrategy {
    tryMoveFocus(offset, startCell) {
        const startMonth = DxCalendar.getMonthFromCell(startCell);
        this.focusedItem = this.getMonthRelativeTo(offset, startMonth);
        if (this.focusedItem !== undefined)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        this.focusedElement = this.findCellElementByItem(this.focusedItem);
        const needChangePeriod = this.areMonthsDifferByYear(offset, startMonth);
        const monthToSkip = this.focusedItem && startMonth ? (this.focusedItem - startMonth) : undefined;
        return { needChangePeriod, periodsToSkip: needChangePeriod ? offset.value : undefined, unitsToSkip: monthToSkip };
    }
    getUpdatedItemToFocus() {
        if (this.focusedItem === undefined) {
            const selectedElement = this.calendar.findSelectedCellElement();
            this.focusedItem = selectedElement ? DxCalendar.getMonthFromCell(selectedElement) : this.calendarCurrentViewDate.getMonth();
        }
        if (this.focusedItem)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        return this.focusedItem;
    }
    findCellElementByItem(month) {
        return month === undefined ? null : this.calendar.currentTableContainer.querySelector(`td[${CalendarDataCellAttributes.dataMonth}="${Month[month]}"]`);
    }
    applyMinMaxDates(item) {
        if (this.calendarCurrentViewDate.getFullYear() === this.minDate.getFullYear() && item < this.minDate.getMonth())
            return this.minDate.getMonth();
        if (this.calendarCurrentViewDate.getFullYear() === this.maxDate.getFullYear() && item > this.maxDate.getMonth())
            return this.maxDate.getMonth();
        return item;
    }
    getMonthRelativeTo(offset, startMonth) {
        if (startMonth === undefined)
            return;
        const adjustedMonthIndex = (this.getRawIndex(offset, startMonth) % MonthsInYear + MonthsInYear) % MonthsInYear;
        return Month[Month[adjustedMonthIndex % MonthsInYear]];
    }
    areMonthsDifferByYear(offset, startMonth) {
        if (startMonth === undefined)
            return false;
        const rawIndex = this.getRawIndex(offset, startMonth);
        return rawIndex < 0 || rawIndex >= MonthsInYear;
    }
    getEffectiveOffset(offset) {
        return offset.value * (offset.isHorizontal ? 1 : NonMonthViewRowLength);
    }
    getRawIndex(offset, startMonth) {
        return startMonth + this.getEffectiveOffset(offset);
    }
}

class CalendarDecadeViewFocusStrategy extends CalendarBaseFocusStrategy {
    tryMoveFocus(offset, startCell) {
        const startYear = DxCalendar.getYearFromCell(startCell);
        this.focusedItem = this.getYearRelativeTo(offset, startYear);
        if (this.focusedItem !== undefined)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        this.focusedElement = this.findCellElementByItem(this.focusedItem);
        const needChangePeriod = this.areYearsDifferByDecade(this.calendarCurrentViewDate.getFullYear(), this.focusedItem);
        const yearsToSkip = this.focusedItem && startYear ? (this.focusedItem - startYear) : undefined;
        return { needChangePeriod, periodsToSkip: needChangePeriod ? offset.value : undefined, unitsToSkip: yearsToSkip };
    }
    getUpdatedItemToFocus() {
        if (this.focusedItem === undefined) {
            const selectedElement = this.calendar.findSelectedCellElement();
            this.focusedItem = selectedElement ? DxCalendar.getYearFromCell(selectedElement) : this.calendarCurrentViewDate.getFullYear();
        }
        if (this.focusedItem)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        return this.focusedItem;
    }
    findCellElementByItem(year) {
        return year === undefined ? null : this.calendar.currentTableContainer.querySelector(`td[${CalendarDataCellAttributes.dataYear}="${year}"]`);
    }
    applyMinMaxDates(item) {
        if (item < this.minDate.getFullYear())
            return this.minDate.getFullYear();
        if (item > this.maxDate.getFullYear())
            return this.maxDate.getFullYear();
        return item;
    }
    getYearRelativeTo(offset, startYear) {
        if (startYear === undefined)
            return;
        return startYear + this.getEffectiveOffset(offset);
    }
    getEffectiveOffset(offset) {
        return offset.value * (offset.isHorizontal ? 1 : NonMonthViewRowLength);
    }
    areYearsDifferByDecade(year1, year2) {
        if (year1 === undefined || year2 === undefined)
            return false;
        return Math.floor(year1 / 10) !== Math.floor(year2 / 10);
    }
}

class CalendarMonthViewFocusStrategy extends CalendarBaseFocusStrategy {
    tryMoveFocus(offset, startCell) {
        const startDate = DxCalendar.getDateFromCell(startCell);
        this.focusedItem = this.applyMinMaxDates(this.getDateRelativeTo(offset, startCell));
        this.focusedElement = this.findCellElementByItem(this.focusedItem);
        const needChangePeriod = this.areDatesDifferByMonthOrYear(this.calendarCurrentViewDate, this.focusedItem);
        const shortcutOffset = needChangePeriod ? this.getShortcutOffsetInMonths(this.focusedItem, this.calendarCurrentViewDate) : undefined;
        const daysToSkip = this.focusedItem ? Math.round((this.focusedItem.getTime() - startDate.getTime()) / millisecondsInDay) : undefined;
        return { needChangePeriod, periodsToSkip: shortcutOffset, unitsToSkip: daysToSkip };
    }
    getUpdatedItemToFocus() {
        this.focusedItem = this.getFindCachedFocusedItem();
        if (this.areDatesDifferByMonthOrYear(this.focusedItem, this.calendarCurrentViewDate)) {
            const focusedDay = this.focusedItem.getDate();
            this.focusedItem = new Date(this.calendarCurrentViewDate);
            let newDate = this.trySetDate(this.focusedItem, focusedDay);
            if (newDate === null)
                newDate = this.trySetDate(this.focusedItem, this.calendarCurrentViewDate.getDate());
            if (newDate === null)
                newDate = this.trySetDate(this.focusedItem, 1);
            this.focusedItem = newDate;
        }
        this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        return this.focusedItem;
    }
    getFindCachedFocusedItem() {
        let result = this.focusedItem;
        if (result === undefined) {
            const selectedElement = this.calendar.findSelectedCellElement();
            result = selectedElement ? DxCalendar.getDateFromCell(selectedElement) : this.calendarCurrentViewDate;
        }
        return result;
    }
    findCellElementByItem(date) {
        return date === undefined ? null : this.calendar.currentTableContainer.querySelector(`.${CalendarCssClasses.Day}[${CalendarDataCellAttributes.dataDate}="${date.getTime()}"]`);
    }
    applyMinMaxDates(item) {
        if (item < this.minDate)
            return new Date(this.minDate);
        if (item > this.maxDate)
            return new Date(this.maxDate);
        return new Date(item);
    }
    areDatesDifferByMonthOrYear(date1, date2) {
        return date1.getMonth() !== date2.getMonth() || this.areDatesDifferByYear(date1, date2);
    }
    areDatesDifferByYear(date1, date2) {
        return date1.getUTCFullYear() !== date2.getUTCFullYear();
    }
    trySetDate(originalDate, day) {
        const newDate = new Date(originalDate);
        newDate.setDate(day);
        return this.areDatesDifferByMonthOrYear(newDate, originalDate) ? null : newDate;
    }
    getShortcutOffsetInMonths(date1, date2) {
        return date1.getMonth() - date2.getMonth() + (date1.getUTCFullYear() - date2.getUTCFullYear()) * MonthsInYear;
    }
    getDateRelativeTo(offset, startDateCell) {
        const startDate = DxCalendar.getDateFromCell(startDateCell);
        const adjustedDate = new Date(startDate);
        return new Date(adjustedDate.setDate(adjustedDate.getDate() + offset.value * (offset.isHorizontal ? 1 : DaysInWeek)));
    }
}

class CalendarCenturyViewFocusStrategy extends CalendarBaseFocusStrategy {
    tryMoveFocus(offset, startCell) {
        const startDecade = DxCalendar.getDecadeFromCell(startCell);
        this.focusedItem = this.getDecadeRelativeTo(offset, startDecade);
        if (this.focusedItem !== undefined)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        this.focusedElement = this.findCellElementByItem(this.focusedItem);
        const needChangePeriod = this.areDecadesDifferByCentury(this.getCurrentDecade(), this.focusedItem);
        const decadesToSkip = this.focusedItem && startDecade ? this.subtractDecade(this.focusedItem, startDecade) : undefined;
        return { needChangePeriod, periodsToSkip: needChangePeriod ? offset.value : undefined, unitsToSkip: decadesToSkip };
    }
    getUpdatedItemToFocus() {
        if (this.focusedItem === undefined) {
            const selectedElement = this.calendar.findSelectedCellElement();
            this.focusedItem = selectedElement ? DxCalendar.getDecadeFromCell(selectedElement) : this.getCurrentDecade();
        }
        if (this.focusedItem)
            this.focusedItem = this.applyMinMaxDates(this.focusedItem);
        return this.focusedItem;
    }
    findCellElementByItem(decade) {
        return decade === undefined ? null : this.calendar.currentTableContainer.querySelector(`td[${CalendarDataCellAttributes.dataDecade}="${decade.startYear}-${decade.endYear}"]`);
    }
    applyMinMaxDates(item) {
        if (this.compareDecades(item, this.getDecadeOfDate(this.minDate)) === -1)
            return this.getDecadeOfDate(this.minDate);
        if (this.compareDecades(item, this.getDecadeOfDate(this.maxDate)) === 1)
            return this.getDecadeOfDate(this.maxDate);
        return item;
    }
    getDecadeRelativeTo(offset, startDecade) {
        if (startDecade === undefined)
            return;
        const adjustedDecadeStartYear = startDecade.startYear + this.getEffectiveOffset(offset);
        return { startYear: adjustedDecadeStartYear, endYear: adjustedDecadeStartYear + 9 };
    }
    getEffectiveOffset(offset) {
        return offset.value * (offset.isHorizontal ? 1 : NonMonthViewRowLength) * YearsInDecade;
    }
    areDecadesDifferByCentury(decade1, decade2) {
        if ((decade1 === null || decade1 === void 0 ? void 0 : decade1.startYear) === undefined || (decade2 === null || decade2 === void 0 ? void 0 : decade2.startYear) === undefined)
            return false;
        const firstYearOfDecade1 = Math.floor(decade1.startYear / 100);
        const firstYearOfDecade2 = Math.floor(decade2.startYear / 100);
        return firstYearOfDecade1 !== firstYearOfDecade2;
    }
    getCurrentDecade() {
        return this.getDecadeOfDate(this.calendarCurrentViewDate);
    }
    getDecadeOfDate(date) {
        const dateFullYear = date.getFullYear();
        const startYear = Math.floor(dateFullYear / 10) * 10;
        const endYear = startYear + 9;
        return { startYear, endYear };
    }
    compareDecades(decade1, decade2) {
        return decade1.startYear < decade2.startYear ? -1 : decade1.startYear === decade2.startYear ? 0 : 1;
    }
    subtractDecade(minuend, subtrahend) {
        return (minuend.startYear - subtrahend.startYear) / 10;
    }
}

const Template = document.createElement("template");
Template.innerHTML = `
<style></style>
<slot />`;
class DxCalendar extends DxHTMLElementBase {
    constructor() {
        super();
        this.boundOnStartDaySelectionHandler = this.onStartDaySelection.bind(this);
        this.boundOnStopDaySelectionHandler = this.onStopDaySelection.bind(this);
        this.boundOnCancelDaySelectionHandler = this.onCancelDaySelection.bind(this);
        this.boundOnDayCellPointerEnterHandler = this.onDayCellPointerEnter.bind(this);
        this._enableMultiSelect = false;
        this._enableRangeSelect = false;
        this._hasNullStartXorEndDate = false;
        this._visiblePeriodsCount = 1;
        this._currentViewIndex = 0;
        this._focusedCellElement = null;
        this._focusRestorationScheduled = true;
        this._needImmediateSelectionAfterFocusRestored = true;
        this._tableContainers = new Array();
        this._minDate = CalendarFirstAccessibleDate;
        this._maxDate = CalendarLastAccessibleDate;
        this._daySelectionRenderer = null;
        this.calendarTableResizeObservers = new Map();
        this.focusedDayChangedHandlers = new Set();
        this.minMaxDatesChangedHandlers = new Set();
    }
    get enableMultiSelect() {
        return this._enableMultiSelect;
    }
    set enableMultiSelect(value) {
        this._enableMultiSelect = value;
    }
    get enableRangeSelect() {
        return this._enableRangeSelect;
    }
    set enableRangeSelect(value) {
        this._enableRangeSelect = value;
    }
    get hasNullStartXorEndDate() {
        return this._hasNullStartXorEndDate;
    }
    set hasNullStartXorEndDate(value) {
        this._hasNullStartXorEndDate = value;
    }
    get visiblePeriodsCount() {
        return this._visiblePeriodsCount;
    }
    set visiblePeriodsCount(value) {
        this._visiblePeriodsCount = value;
    }
    get currentViewDate() {
        return this.currentTableContainer.viewDate;
    }
    get baseViewDate() {
        return this.baseTableContainer.viewDate;
    }
    get currentView() {
        var _a, _b;
        return (_b = (_a = this.baseTableContainer) === null || _a === void 0 ? void 0 : _a.viewType) !== null && _b !== void 0 ? _b : CalendarView.Month;
    }
    get focusedDate() {
        return this._focusStrategies[CalendarView.Month].getFindCachedFocusedItem();
    }
    get enumerateTableContainers() {
        if (!this._tableContainers)
            this.registerTableContainers();
        return this._tableContainers;
    }
    get currentTableContainer() {
        return this._tableContainers[this._currentViewIndex];
    }
    get baseTableContainer() {
        if (!this._baseTableContainer)
            this._baseTableContainer = this.querySelector(CalendarSelectors.FirstDataTableContainer);
        return this._baseTableContainer;
    }
    get tableContainerWrapper() {
        if (!this._tableContainerWrapper)
            this._tableContainerWrapper = this.querySelector(CalendarSelectors.DataTableContainerWrapperClassName);
        return this._tableContainerWrapper;
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = value;
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = value;
    }
    get daySelectionRenderer() {
        return this._daySelectionRenderer;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventSubscriptions();
    }
    initializeComponent() {
        super.initializeComponent();
        this._focusStrategies = {
            [CalendarView.Month]: new CalendarMonthViewFocusStrategy(this),
            [CalendarView.Year]: new CalendarYearViewFocusStrategy(this),
            [CalendarView.Decade]: new CalendarDecadeViewFocusStrategy(this),
            [CalendarView.Century]: new CalendarCenturyViewFocusStrategy(this),
        };
        this.fixCalendarTableSize();
        this.registerTableContainers();
        this.initializeKeyboardNavigator();
        this.tryInitializeRangeSelectionSubscriptions();
    }
    disposeComponent() {
        this.removeEventSubscriptions();
        this.focusedDayChangedHandlers.clear();
        this.minMaxDatesChangedHandlers.clear();
        super.disposeComponent();
    }
    disconnectedCallback() {
        this.calendarTableResizeObservers.forEach(o => o.disconnect());
        super.disconnectedCallback();
    }
    registerTableContainers() {
        this._tableContainers = Array.from(this.querySelectorAll(CalendarSelectors.DateTableContainer));
    }
    fixCalendarTableSize() {
        if (this.currentView !== CalendarView.Month)
            return;
        const tableElements = this.getTableElements();
        if (!tableElements.length)
            return;
        tableElements.forEach(table => {
            var _a;
            if (!table)
                return;
            table.style.width = "";
            table.style.height = "";
            const tableRect = table.getBoundingClientRect();
            if (RectHelper.fromDomRect(tableRect).isEmpty) {
                this.calendarTableResizeObservers.set(table, new ResizeObserver(this.onCalendarTableSizeChanged.bind(this)));
                (_a = this.calendarTableResizeObservers.get(table)) === null || _a === void 0 ? void 0 : _a.observe(table);
            }
            else
                this.applyTableSize(table, tableRect.width, tableRect.height);
        });
    }
    applyTableSize(table, width, height) {
        table.style.width = width + "px";
        table.style.height = height + "px";
    }
    onCalendarTableSizeChanged(entries) {
        var _a;
        if (entries.length < 1)
            return;
        const table = entries[0].target;
        const tableRect = entries[0].contentRect;
        if (!RectHelper.fromDomRect(tableRect).isEmpty) {
            this.applyTableSize(table, tableRect.width, tableRect.height);
            (_a = this.calendarTableResizeObservers.get(table)) === null || _a === void 0 ? void 0 : _a.disconnect();
        }
    }
    addEventSubscriptions() {
        this.addEventListener(PointerDragStartEvent.eventName, this.boundOnStartDaySelectionHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this.boundOnStopDaySelectionHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this.boundOnCancelDaySelectionHandler);
        if (this.enableRangeSelect)
            this.addEventListener(PointerClickEvent.eventName, this.boundOnStartDaySelectionHandler);
    }
    removeEventSubscriptions() {
        this.removeEventListener(PointerDragStartEvent.eventName, this.boundOnStartDaySelectionHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this.boundOnStopDaySelectionHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this.boundOnCancelDaySelectionHandler);
        this.removeEventListener(PointerClickEvent.eventName, this.boundOnStartDaySelectionHandler);
    }
    addDayCellEventSubscriptions() {
        const elements = this.findDayCellElements();
        for (let i = 0; i < elements.length; i++) {
            const dayCellElement = elements[i];
            dayCellElement.addEventListener("pointerenter", this.boundOnDayCellPointerEnterHandler);
        }
    }
    removeDayCellEventSubscriptions() {
        const elements = this.findDayCellElements();
        for (let i = 0; i < elements.length; i++) {
            const dayCellElement = elements[i];
            dayCellElement.removeEventListener("pointerenter", this.boundOnDayCellPointerEnterHandler);
        }
    }
    tryInitializeRangeSelectionSubscriptions() {
        if (!this.hasNullStartXorEndDate)
            return;
        const selectedDateCell = this.findSelectedCellElement();
        if (!selectedDateCell)
            return;
        const selectedDate = DxCalendar.getDateFromCell(selectedDateCell);
        if (!selectedDate)
            return;
        this.createDaySelectionRenderer(selectedDate, true);
        if (this._daySelectionRenderer && !DxCalendar.isDateCellDisabled(selectedDateCell))
            this._daySelectionRenderer.pointerUpDate = selectedDate;
        this.addDayCellEventSubscriptions();
    }
    onStartDaySelection(evt) {
        if (dom.DomUtils.hasClassName(this, CssClasses.Disabled) || dom.DomUtils.hasClassName(this, CssClasses.ReadOnly))
            return;
        const dayCell = DxCalendar.getDayCellByTarget(evt.detail.source.target);
        const startDate = DxCalendar.getDateFromTarget(evt.detail.source.target);
        if (!dayCell || !startDate)
            return;
        const clearSelection = !evt.detail.isLongTap && (!(evt.detail.source.ctrlKey || evt.detail.source.metaKey) || evt.detail.isTouch);
        this.createDaySelectionRenderer(startDate, clearSelection);
        if (this._daySelectionRenderer && !DxCalendar.isDateCellDisabled(dayCell))
            this._daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(dayCell);
        this.addDayCellEventSubscriptions();
        evt.stopPropagation();
    }
    onStopDaySelection(evt) {
        if (!this._daySelectionRenderer)
            return;
        const pointerUpDateCell = DxCalendar.getDayCellByTarget(evt.detail.source.target);
        if (pointerUpDateCell && !DxCalendar.isDateCellDisabled(pointerUpDateCell))
            this._daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(pointerUpDateCell);
        this.stopSelectingDays();
        this.removeDayCellEventSubscriptions();
        evt.stopPropagation();
    }
    onCancelDaySelection(evt) {
        if (!this._daySelectionRenderer)
            return;
        this._daySelectionRenderer.cancel();
        this.removeDayCellEventSubscriptions();
        this._daySelectionRenderer = null;
        evt.stopPropagation();
    }
    stopSelectingDays() {
        if (!this._daySelectionRenderer)
            return;
        this._daySelectionRenderer.stop();
        this._daySelectionRenderer = null;
    }
    invokeDayCellPointerUp(pointerDownDate, pointerUpDate, clearSelection) {
        this.dispatchEvent(new DayCellPointerUpEvent(pointerDownDate, pointerUpDate, clearSelection));
    }
    onDayCellPointerEnter(evt) {
        const pointerUpDateCell = DxCalendar.getDayCellByTarget(evt.target);
        if (this._daySelectionRenderer && pointerUpDateCell && !DxCalendar.isDateCellDisabled(pointerUpDateCell))
            this._daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(pointerUpDateCell);
    }
    tryCreateRangeSelectionRenderer(pointerDownDate) {
        if (this.enableRangeSelect)
            this._daySelectionRenderer = this.createDateRangeSelectionRenderer(pointerDownDate, false);
    }
    createDaySelectionRenderer(pointerDownDate, clearSelection) {
        this._daySelectionRenderer = this.enableRangeSelect
            ? this.createDateRangeSelectionRenderer(pointerDownDate, clearSelection)
            : this.enableMultiSelect
                ? this.createMultipleDaySelectionRenderer(pointerDownDate, clearSelection)
                : this.createSingleDaySelectionRenderer(pointerDownDate, clearSelection);
    }
    createMultipleDaySelectionRenderer(pointerDownDate, clearSelection) {
        return new CalendarMultipleDaySelectionRenderer({
            pointerDownDate,
            clearSelection,
            dayCellElements: this.findDayCellElements()
        }, this.invokeDayCellPointerUp.bind(this));
    }
    createSingleDaySelectionRenderer(pointerDownDate, clearSelection) {
        return new CalendarSingleDaySelectionRenderer(pointerDownDate, clearSelection, this.invokeDayCellPointerUp.bind(this));
    }
    createDateRangeSelectionRenderer(pointerDownDate, clearSelection) {
        return new CalendarDateRangeSelectionRenderer({
            pointerDownDate,
            clearSelection,
            dayCellElements: this.findDayCellElements()
        }, this.invokeDayCellPointerUp.bind(this));
    }
    findDayCellElements() {
        return this.querySelectorAll(CalendarSelectors.Day);
    }
    findSelectedCellElement() {
        return this.querySelector(CalendarSelectors.SelectedItem);
    }
    getMainElement() {
        return this.querySelector(CalendarSelectors.MainElement);
    }
    getHeaderElement() {
        return this.querySelector(CalendarSelectors.Header);
    }
    getTableElements() {
        return Array.from(this.querySelectorAll(CalendarSelectors.DataTable));
    }
    getFooterElement() {
        return this.querySelector(CalendarSelectors.Footer);
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, new CalendarRootKbdStrategy(this));
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
    // focus
    getFocusedCellElementInView(view) {
        return this._focusStrategies[view].getUpdatedElementToFocus();
    }
    tryMoveFocus(offset, oldFocusedElement) {
        const currentFocusStrategy = this._focusStrategies[this.currentView];
        const movementResult = currentFocusStrategy.tryMoveFocus(offset, oldFocusedElement);
        if (movementResult.needChangePeriod && movementResult.periodsToSkip) {
            this.scheduleFocusRestoration();
            const periodsToSkip = this.currentView === CalendarView.Month
                ? movementResult.periodsToSkip
                : movementResult.periodsToSkip > 0 ? 1 : -1;
            const newPeriodIndex = this._currentViewIndex + periodsToSkip;
            if (newPeriodIndex >= 0 && newPeriodIndex < this._visiblePeriodsCount) {
                this._currentViewIndex = newPeriodIndex;
                movementResult.newPeriodFitsIntoVisibleRange = true;
            }
        }
        return movementResult;
    }
    scheduleFocusRestoration(needImmediateSelection = true) {
        this._focusRestorationScheduled = true;
        this._needImmediateSelectionAfterFocusRestored = needImmediateSelection;
    }
    restoreFocus() {
        const currentFocusStrategy = this._focusStrategies[this.currentView];
        const focusedItem = currentFocusStrategy.getUpdatedElementToFocus();
        if (!this._focusRestorationScheduled)
            return;
        this.tryFireFocusedDayChanged(focusedItem);
        if (this.daySelectionRenderer && focusedItem)
            this.daySelectionRenderer.pointerUpDate = DxCalendar.getDateFromCell(focusedItem);
        this._focusRestorationScheduled = false;
        this._needImmediateSelectionAfterFocusRestored = false;
    }
    onFocusedDayChanged(listener) {
        this.focusedDayChangedHandlers.add(listener);
    }
    offFocusedDayChanged(listener) {
        this.focusedDayChangedHandlers.delete(listener);
    }
    onMinMaxDatesChanged(listener) {
        this.minMaxDatesChangedHandlers.add(listener);
    }
    tryFireFocusedDayChanged(focusedCellElement) {
        if (focusedCellElement === null)
            return;
        for (const handler of this.focusedDayChangedHandlers)
            handler(focusedCellElement, this._needImmediateSelectionAfterFocusRestored);
    }
    fireMinMaxDatesChanged(minDate, maxDate) {
        for (const handler of this.minMaxDatesChangedHandlers)
            handler(minDate, maxDate);
    }
    static getDateFromTarget(target) {
        const datCellElement = DxCalendar.getDayCellByTarget(target);
        return datCellElement ? DxCalendar.getDateFromCell(datCellElement) : null;
    }
    static getDayCellByTarget(target) {
        const targetElement = target;
        if (!targetElement)
            return null;
        if (dom.DomUtils.hasClassName(targetElement, CalendarCssClasses.Day))
            return targetElement;
        return targetElement.closest(CalendarSelectors.Day);
    }
    static getDateFromCell(dayCellElement) {
        return new Date(Number(dayCellElement.getAttribute(CalendarDataCellAttributes.dataDate)));
    }
    static getMonthFromCell(dayCellElement) {
        const attributeValue = dayCellElement.getAttribute(CalendarDataCellAttributes.dataMonth);
        if (!attributeValue)
            return;
        return Month[attributeValue];
    }
    static getYearFromCell(dayCellElement) {
        const attributeValue = dayCellElement.getAttribute(CalendarDataCellAttributes.dataYear);
        if (!attributeValue)
            return;
        return Number(attributeValue);
    }
    static getDecadeFromCell(dayCellElement) {
        const attributeValue = dayCellElement.getAttribute(CalendarDataCellAttributes.dataDecade);
        if (!attributeValue)
            return;
        const [startYear, endYear] = attributeValue.split("-").map(Number);
        return { startYear, endYear };
    }
    static getMonthOffsetInDaysFrom(offset, dayCellElement) {
        const currentDate = DxCalendar.getDateFromCell(dayCellElement);
        const currentDateNumber = currentDate.getDate();
        const newDate = new Date(currentDate);
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + offset);
        const lastDayOfNewMonth = this.getLastDayOfTheMonth(newDate);
        newDate.setDate(currentDateNumber > lastDayOfNewMonth ? lastDayOfNewMonth : currentDateNumber);
        return Math.round(Math.abs(newDate.getTime() - currentDate.getTime()) / millisecondsInDay);
    }
    static getYearOffsetInDaysFrom(offset, dayCellElement) {
        const currentDate = DxCalendar.getDateFromCell(dayCellElement);
        const currentDateNumber = currentDate.getDate();
        const newDate = new Date(currentDate);
        newDate.setDate(1);
        newDate.setFullYear(newDate.getFullYear() + offset);
        const lastDayOfNewMonth = this.getLastDayOfTheMonth(newDate);
        newDate.setDate(currentDateNumber > lastDayOfNewMonth ? lastDayOfNewMonth : currentDateNumber);
        return Math.round(Math.abs(newDate.getTime() - currentDate.getTime()) / millisecondsInDay);
    }
    static getLastDayOfTheMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    static isDateCellDisabled(dayCell) {
        return dayCell.hasAttribute("data-disabled");
    }
    getContentTemplate() {
        return Template;
    }
    static get observedAttributes() {
        return [
            CalendarAttributes.class,
            CalendarAttributes.enableMultiSelect,
            CalendarAttributes.minDate,
            CalendarAttributes.maxDate,
            CalendarAttributes.enableRangeSelect,
            CalendarAttributes.visiblePeriodsCount,
            CalendarAttributes.hasNullStartXorEndDate
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case CalendarAttributes.class:
                this.fixCalendarTableSize();
                break;
            case CalendarAttributes.enableMultiSelect:
                this.enableMultiSelect = newVal !== null;
                break;
            case CalendarAttributes.minDate: {
                const newMinDate = new Date(Number(newVal));
                this.minDate = newMinDate >= CalendarFirstAccessibleDate ? newMinDate : CalendarFirstAccessibleDate;
                this.fireMinMaxDatesChanged(this.minDate);
                break;
            }
            case CalendarAttributes.maxDate: {
                const newMaxDate = new Date(Number(newVal));
                this.maxDate = newMaxDate <= CalendarLastAccessibleDate ? newMaxDate : CalendarLastAccessibleDate;
                this.fireMinMaxDatesChanged(undefined, this.maxDate);
                break;
            }
            case CalendarAttributes.visiblePeriodsCount:
                this.visiblePeriodsCount = Number(newVal);
                break;
            case CalendarAttributes.enableRangeSelect:
                this.enableRangeSelect = newVal !== null;
                this.removeEventSubscriptions();
                this.addEventSubscriptions();
                break;
            case CalendarAttributes.hasNullStartXorEndDate:
                this.hasNullStartXorEndDate = newVal !== null;
                this.removeDayCellEventSubscriptions();
                this.tryInitializeRangeSelectionSubscriptions();
                this.removeEventSubscriptions();
                this.addEventSubscriptions();
                break;
        }
    }
}
customElements.define(calendarTagName, DxCalendar);
customElements.define(DxCalendarTableContainerTagName, DxCalendarTableContainer);
function loadModule() { }
const calendarComponent = { loadModule };

const dxCalendar = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DxCalendar,
    default: calendarComponent
});

export { CalendarKeyboardNavigationLeavedEvent as C, CalendarCssClasses as a, calendarComponent as c, dxCalendar as d };
//# sourceMappingURL=dx-calendar-24.2.js.map
