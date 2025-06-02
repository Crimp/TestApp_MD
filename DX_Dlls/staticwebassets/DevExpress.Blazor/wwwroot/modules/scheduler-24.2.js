import { d as dom } from './dom-24.2.js';
import { D as DxHTMLElementBase } from './dx-html-element-base-24.2.js';
import { DxUIHandlersBridgeTagName } from './dx-ui-handlers-bridge-24.2.js';
import { b as getParentByClassName, I as getParentByPredicate, d as subscribeElementContentSize, u as unsubscribeElement } from './dom-utils-24.2.js';
import { H as HandlePointerEventsMode, d as PointerClickEvent, e as PointerDblClickEvent, P as PointerDragStartEvent, a as PointerDragStopEvent, c as PointerDragCancelEvent } from './dx-html-element-pointer-events-helper-24.2.js';
import { S as ScrollViewerAutoScrollingMode } from './dx-scroll-viewer-24.2.js';
import { t as touch } from './touch-24.2.js';
import { _ as __decorate } from './tslib.es6-24.2.js';
import { S as ScrollViewerCssClasses } from './scroll-viewer-css-classes-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { F as FocusUtils, K as KeyboardNavigationStrategy, L as LeaveDirection, a as DxKeyboardNavigatorTagName } from './keyboard-navigation-strategy-24.2.js';
import { n } from './property-24.2.js';
import { k as key } from './key-24.2.js';
import { b as calendarTagName } from './constants-24.23.js';
import { T as Tabbable } from './tabbable-24.2.js';
import { DxCheckBoxTagName } from './dx-check-internal-24.2.js';
import { b as dxPopupRootTagName } from './constants-24.22.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './data-qa-utils-24.2.js';
import './dx-license-24.2.js';
import './css-classes-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './lit-element-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './focushelper-24.2.js';
import './custom-events-helper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';

class Timer {
    static throttle(func, delay) {
        let isThrottled = false;
        let savedArg = null;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let savedThis = this;
        function wrapper(e) {
            if (isThrottled) {
                savedArg = e;
                savedThis = this;
                return;
            }
            func.apply(this, [e]);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
                if (savedArg) {
                    wrapper.apply(savedThis, [savedArg]);
                    savedArg = null;
                }
            }, delay);
        }
        return wrapper;
    }
}

class SchedulerAttributes {
}
SchedulerAttributes.ContainerIndex = "data-container-index";
SchedulerAttributes.FirstContainerIndex = "data-first-container-index";
SchedulerAttributes.LastContainerIndex = "data-last-container-index";
SchedulerAttributes.FirstCellIndex = "data-first-cell-index";
SchedulerAttributes.LastCellIndex = "data-last-cell-index";
SchedulerAttributes.ColumnsCount = "data-columns-count";
SchedulerAttributes.Column = "data-column";
SchedulerAttributes.Row = "data-row";
SchedulerAttributes.RowSpan = "data-row-span";
SchedulerAttributes.Key = "data-key";
SchedulerAttributes.Start = "data-start";
SchedulerAttributes.End = "data-end";
SchedulerAttributes.Duration = "data-duration";
SchedulerAttributes.AllDay = "data-allday";
SchedulerAttributes.Resource = "data-resource";
SchedulerAttributes.SnapToCellsMode = "snap-to-cells-mode";
SchedulerAttributes.AppointmentTopPosition = "data-appointment-top-position";
SchedulerAttributes.UtcOffset = "data-uct-offset";

class SchedulerCssClasses {
}
SchedulerCssClasses.TimeCellsContainerClassName = "dxbl-sc-timecells-container";
SchedulerCssClasses.VerticalAppointmentsClassName = "dxbl-sc-vertical-apts";
SchedulerCssClasses.HorizontalAppointmentsClassName = "dxbl-sc-horizontal-apts";
SchedulerCssClasses.VerticalAppointmentClassName = "dxbl-sc-vertical-apt";
SchedulerCssClasses.HorizontalAppointmentClassName = "dxbl-sc-horizontal-apt";
SchedulerCssClasses.CompactAppointmentClassName = "dxbl-sc-apt-compact";
SchedulerCssClasses.EditableAppointmentClassName = "dxbl-sc-apt-edited";
SchedulerCssClasses.DateCellHeadClassName = "dxbl-date-cell-head";
SchedulerCssClasses.MonthViewClassName = "dxbl-sc-month";
SchedulerCssClasses.DateHeaderClassName = "dxbl-sc-date-hr";
SchedulerCssClasses.TimeCellClassName = "dxbl-sc-time-cell";
SchedulerCssClasses.TodayClassName = "dxbl-sc-today";
SchedulerCssClasses.HorizontalViewClassName = "dxbl-sc-horizontal-view";
SchedulerCssClasses.TimeMarkerWrapperClassName = "dxbl-sc-time-marker-wrapper";
SchedulerCssClasses.TimeMarkerWrapperInvisibleClassName = "dxbl-sc-time-marker-wrapper-invisible";
SchedulerCssClasses.TimeMarkerClassName = "dxbl-sc-time-marker";
SchedulerCssClasses.TimeMarkerImageClassName = "dxbl-sc-time-marker-image";
SchedulerCssClasses.TimeMarkerLineClassName = "dxbl-sc-time-marker-line";
SchedulerCssClasses.TimeIndicatorClassName = "dxbl-sc-time-indicator";
SchedulerCssClasses.AppointmentClassName = "dxbl-sc-apt";
SchedulerCssClasses.SelectedAppointmentClassName = "dxbl-sc-apt-selected";
SchedulerCssClasses.DisableAppointmentClassName = "dxbl-sc-apt-disable";
SchedulerCssClasses.VerticalResourceHeaderClassName = "dxbl-v-resource-header";
SchedulerCssClasses.ResourcesContainerClassName = "dxbl-sc-resources-container";
SchedulerCssClasses.HeadersContainerClassName = "dxbl-sc-headers-container";
SchedulerCssClasses.AllDayAreaClassName = "dxbl-sc-all-day-area";
SchedulerCssClasses.TimelineViewClassName = "dxbl-sc-timeline";
SchedulerCssClasses.TopHandleClassName = "dxbl-top-handle";
SchedulerCssClasses.BottomHandleClassName = "dxbl-bottom-handle";
SchedulerCssClasses.LeftHandleClassName = "dxbl-left-handle";
SchedulerCssClasses.RightHandleClassName = "dxbl-right-handle";
SchedulerCssClasses.VerticalViewClassName = "dxbl-sc-vertical-view";
SchedulerCssClasses.View = "dxbl-view";
SchedulerCssClasses.ToolbarWrapper = "dxbl-sc-tb-wrapper";
SchedulerCssClasses.ResourceNavigatorFooter = "dxbl-rn-footer";
SchedulerCssClasses.ResourceNavigatorSelectAllContainer = "dxbl-select-all-container";
SchedulerCssClasses.ResourceNavigatorSearchBox = "dxbl-resource-navigator-search-box";
SchedulerCssClasses.ResourceNavigatorListBoxContainer = "dxbl-resource-navigator-list-box-container";

var SnapToCellsMode;
(function (SnapToCellsMode) {
    SnapToCellsMode[SnapToCellsMode["None"] = 0] = "None";
    SnapToCellsMode[SnapToCellsMode["Auto"] = 1] = "Auto";
    SnapToCellsMode[SnapToCellsMode["Always"] = 2] = "Always";
})(SnapToCellsMode || (SnapToCellsMode = {}));
const SnapToCellsMode$1 = SnapToCellsMode;

class SchedulerDomUtilsAttributes {
    getContainerIndex(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.ContainerIndex, -1);
    }
    getFirstContainerIndex(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.FirstContainerIndex, -1);
    }
    getLastContainerIndex(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.LastContainerIndex, -1);
    }
    getAppointmentFirstCellIndex(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.FirstCellIndex, -1);
    }
    getAppointmentLastCellIndex(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.LastCellIndex, -1);
    }
    getAppointmentColumnsCount(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.ColumnsCount, 0);
    }
    setAppointmentColumnsCount(el, value) {
        el.setAttribute(SchedulerAttributes.ColumnsCount, value);
    }
    getAppointmentColumn(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.Column, 0);
    }
    setAppointmentColumn(el, value) {
        el.setAttribute(SchedulerAttributes.Column, value);
    }
    getAppointmentRow(el) {
        return SchedulerDomUtilsAttributes.getAttributeFloatValue(el, SchedulerAttributes.Row, -1);
    }
    getAppointmentRowSpan(el) {
        return SchedulerDomUtilsAttributes.getAttributeFloatValue(el, SchedulerAttributes.RowSpan, 0);
    }
    getAppointmentKey(el) {
        return el.getAttribute(SchedulerAttributes.Key) || "";
    }
    getAppointmentTopPosition(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.AppointmentTopPosition, 0);
    }
    setAppointmentTopPosition(el, value) {
        el.setAttribute(SchedulerAttributes.AppointmentTopPosition, value);
    }
    removeAppointmentTopPosition(el) {
        el.removeAttribute(SchedulerAttributes.AppointmentTopPosition);
    }
    getStart(el) {
        const time = new Date(parseInt(el.getAttribute(SchedulerAttributes.Start) || ""));
        return DateTimeHelper.dateIncreaseWithUtcOffset(time, time.getTimezoneOffset() * DateTimeHelper.HourSpan);
    }
    getEnd(el) {
        const start = parseInt(el.getAttribute(SchedulerAttributes.Start) || "");
        const end = parseInt(el.getAttribute(SchedulerAttributes.End) || "");
        return DateTimeHelper.dateIncreaseWithUtcOffset(this.getStart(el), end - start);
    }
    getDuration(el) {
        return parseInt(el.getAttribute(SchedulerAttributes.Duration) || "");
    }
    getAppointmentEnd(el) {
        const start = this.getStart(el);
        const duration = this.getDuration(el);
        return new Date(start.getTime() + duration);
    }
    getAllDay(el) {
        return el.getAttribute(SchedulerAttributes.AllDay) === "";
    }
    getResourceKey(el) {
        return el.getAttribute(SchedulerAttributes.Resource) || "";
    }
    getSnapToCellsMode(el) {
        const attrValue = el.getAttribute(SchedulerAttributes.SnapToCellsMode);
        return attrValue === null ? null : SnapToCellsMode$1[attrValue];
    }
    getUtcOffset(el) {
        return SchedulerDomUtilsAttributes.getAttributeIntValue(el, SchedulerAttributes.UtcOffset, 0);
    }
    static getAttributeIntValue(element, attribute, defaultValue) {
        return SchedulerDomUtilsAttributes.getAttributeParsedNumberValue(element, attribute, parseInt, defaultValue);
    }
    static getAttributeFloatValue(element, attribute, defaultValue) {
        return SchedulerDomUtilsAttributes.getAttributeParsedNumberValue(element, attribute, parseFloat, defaultValue);
    }
    static getAttributeParsedNumberValue(element, attribute, parser, defaultValue) {
        const rawValue = element.getAttribute(attribute);
        return rawValue ? parser(rawValue) : defaultValue;
    }
}
class SchedulerDomUtils {
    static getVerticalAppointmentsContainer(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.VerticalAppointmentsClassName}`)[0];
    }
    static getHorizontalAppointmentsContainer(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.HorizontalAppointmentsClassName}`)[0];
    }
    static getHorizontalAppointments(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.HorizontalAppointmentClassName}`);
        return Array.from(elements);
    }
    static getHorizontalEditableAppointments(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.HorizontalAppointmentClassName}.${SchedulerCssClasses.EditableAppointmentClassName}`);
        return Array.from(elements);
    }
    static getVerticalAppointments(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.VerticalAppointmentClassName}`);
        return Array.from(elements);
    }
    static getVerticalEditableAppointments(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.VerticalAppointmentClassName}.${SchedulerCssClasses.EditableAppointmentClassName}`);
        return Array.from(elements);
    }
    static getHorizontalView(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.HorizontalViewClassName}`)[0];
    }
    static getTimeMarkerWrappers(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.TimeMarkerWrapperClassName}`);
    }
    static getTimeMarkerContainer(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.TimeMarkerClassName}`)[0];
    }
    static getTimeMarkerImages(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.TimeMarkerImageClassName}`);
        return Array.from(elements);
    }
    static getTimeMarkerLine(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.TimeMarkerLineClassName}`)[0];
    }
    static getTimeIndicatorContainer(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.TimeIndicatorClassName}`)[0];
    }
    static getAppointmentContainer(el) {
        return getParentByClassName(el, SchedulerCssClasses.AppointmentClassName);
    }
    static getTimeCellContainer(el) {
        return getParentByPredicate(el, "", function (el, c) { return SchedulerDomUtils.isTimeCellElement(el); });
    }
    static getSelectedAppointment(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.SelectedAppointmentClassName}:not(.${SchedulerCssClasses.DisableAppointmentClassName})`)[0];
    }
    static getEditableAppointments(container) {
        const elements = container.querySelectorAll(`.${SchedulerCssClasses.EditableAppointmentClassName}`);
        return Array.from(elements);
    }
    static isEditableAppointment(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.EditableAppointmentClassName);
    }
    static getVerticalResourceHeaders(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.VerticalResourceHeaderClassName}`);
    }
    static getDateHeaders(container) {
        const headerClassName = SchedulerDomUtils.isMonthView(container) ? SchedulerCssClasses.TimeCellClassName : SchedulerCssClasses.DateHeaderClassName;
        return container.querySelectorAll(`.${headerClassName}`);
    }
    static getResourcesViewport(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.ResourcesContainerClassName}`)[0];
    }
    static getTimescaleViewport(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.HeadersContainerClassName}`)[0];
    }
    static getTimeCellsViewport(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.TimeCellsContainerClassName}`)[0];
    }
    static getParentTimeCellsViewport(el) {
        return getParentByClassName(el, SchedulerCssClasses.TimeCellsContainerClassName);
    }
    static isVerticalAppointment(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.VerticalAppointmentClassName);
    }
    static isHorizontalAppointment(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.HorizontalAppointmentClassName);
    }
    static isTimeCellElement(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.AllDayAreaClassName) || dom.DomUtils.hasClassName(el, SchedulerCssClasses.TimeCellClassName);
    }
    static isTimelineView(container) {
        return dom.DomUtils.hasClassName(container, SchedulerCssClasses.TimelineViewClassName);
    }
    static isMonthView(container) {
        return dom.DomUtils.hasClassName(container, SchedulerCssClasses.MonthViewClassName);
    }
    static isTopHandleElement(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.TopHandleClassName);
    }
    static isBottomHandleElement(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.BottomHandleClassName);
    }
    static isLeftHandleElement(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.LeftHandleClassName);
    }
    static isRightHandleElement(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.RightHandleClassName);
    }
    static isAppointmentSelected(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.SelectedAppointmentClassName);
    }
    static isTargetAppointment(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.TargetAppointmentClassName);
    }
    static isDateCellHeader(el) {
        return dom.DomUtils.hasClassName(el, SchedulerCssClasses.DateCellHeadClassName);
    }
    static getToolbarWrapper(container) {
        return container.querySelectorAll(`.${SchedulerCssClasses.ToolbarWrapper}`)[0];
    }
}
SchedulerDomUtils.Attr = new SchedulerDomUtilsAttributes();

class DateTimeHelper {
    static dateSubsWithTimezone(date1, date2) {
        return date1.valueOf() - date2.valueOf() + (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * DateTimeHelper.HourSpan;
    }
    static truncToDate(dateTime) {
        return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    }
    static calculateDaysDifference(date1, date2) {
        const snappedDate1 = DateTimeHelper.truncToDate(date1);
        const snappedDate2 = DateTimeHelper.truncToDate(date2);
        return DateTimeHelper.dateSubsWithTimezone(snappedDate2, snappedDate1) / DateTimeHelper.DaySpan;
    }
    static dateIncreaseWithUtcOffset(date, spanInMilliseconds) {
        const result = DateTimeHelper.dateIncrease(date, spanInMilliseconds);
        const utcDiff = (result.getTimezoneOffset() - date.getTimezoneOffset()) * DateTimeHelper.HourSpan;
        return DateTimeHelper.dateIncrease(result, utcDiff);
    }
    static dateIncrease(date, spanInMilliseconds) {
        return new Date(date.valueOf() + spanInMilliseconds);
    }
    static addTimeSpan(date, timeSpan) {
        return new Date(date.valueOf() + timeSpan);
    }
    static toDayTime(dateTime) {
        return dateTime.valueOf() - DateTimeHelper.truncToDate(dateTime).valueOf();
    }
    static getCellInterval(cell) {
        const start = SchedulerDomUtils.Attr.getStart(cell);
        const end = SchedulerDomUtils.Attr.getEnd(cell);
        return new Interval(start, this.dateSubsWithTimezone(end, start));
    }
    static dateTimeComparer(dateTime1, dateTime2) {
        const dif = dateTime2.getTime() - dateTime1.getTime();
        if (dif === 0)
            return 0;
        return dif < 0 ? 1 : -1;
    }
    static dateTimeIndexComparer(array, index, value) {
        return DateTimeHelper.dateTimeComparer(array[index], value);
    }
    static getUtcTimezoneOffset(value) {
        return value.getTimezoneOffset() * DateTimeHelper.HourSpan * -1;
    }
    static getCurrentLocalTime() {
        const time = new Date();
        const newLocalTime = time.getTime(); // + time.getTimezoneOffset() * 60000 + clientUtcOffset;
        return new Date(newLocalTime);
    }
}
DateTimeHelper.HourSpan = 60 * 1000;
DateTimeHelper.HalfHourSpan = 30 * 60 * 1000;
DateTimeHelper.DaySpan = 24 * 60 * 60 * 1000;

class Interval {
    constructor(start, duration) {
        this.start = start;
        this.duration = duration;
        this.isLongerOrEqualDay = duration >= DateTimeHelper.DaySpan;
    }
    getStart() {
        return this.start;
    }
    getDuration() {
        return this.duration;
    }
    getEnd() {
        return DateTimeHelper.dateIncreaseWithUtcOffset(this.start, this.duration);
    }
    intersectsWith(interval) {
        return (interval.getEnd().valueOf() - this.getStart().valueOf()) >= 0 && (interval.getStart().valueOf() - this.getEnd().valueOf()) <= 0;
    }
}

class AppointmentInfo {
    constructor(id, views, interval) {
        this.id = id;
        this.views = views;
        this.interval = interval;
        this.allDay = SchedulerDomUtils.Attr.getAllDay(views[0]);
        this.resourceKey = SchedulerDomUtils.Attr.getResourceKey(views[0]);
        this.sourceView = this.views[0].cloneNode(true);
        this.aptCont = this.views[0].parentElement;
    }
    getStart() {
        return this.interval.start;
    }
    getDuration() {
        return this.interval.duration;
    }
    getEnd() {
        return this.interval.getEnd();
    }
    clearViews() {
        this.views.forEach((view) => {
            if (view.parentElement)
                view.parentElement.removeChild(view);
        });
        this.views = [];
    }
    static createItem(aptId, views) {
        return new AppointmentInfo(aptId, views, AppointmentInfo.getAppointmentInterval(views));
    }
    static getAppointmentInterval(views) {
        const start = SchedulerDomUtils.Attr.getStart(views[0]);
        const duration = SchedulerDomUtils.Attr.getDuration(views[0]);
        return new Interval(start, duration);
    }
    static createItems(views) {
        const apts = {};
        for (let i = 0, view; view = views[i]; i++) {
            const id = SchedulerDomUtils.Attr.getAppointmentKey(view);
            if (!apts[id])
                apts[id] = [];
            apts[id].push(view);
        }
        const result = [];
        for (const id in apts) {
            if (!Object.prototype.hasOwnProperty.call(apts, id))
                continue;
            result.push(AppointmentInfo.createItem(id, apts[id]));
        }
        return result;
    }
}

var AppointmentLayoutType;
(function (AppointmentLayoutType) {
    AppointmentLayoutType[AppointmentLayoutType["Horizontal"] = 0] = "Horizontal";
    AppointmentLayoutType[AppointmentLayoutType["Vertical"] = 1] = "Vertical";
})(AppointmentLayoutType || (AppointmentLayoutType = {}));
const AppointmentLayoutType$1 = AppointmentLayoutType;

class SchedulerUIEventNames {
}
SchedulerUIEventNames.CreateAppointment = "createAppointment";
SchedulerUIEventNames.SelectAppointment = "selectAppointment";
SchedulerUIEventNames.DragAppointment = "dragAppointment";
SchedulerUIEventNames.DropNewAppointment = "dropNewAppointment";
SchedulerUIEventNames.DropAppointment = "dropAppointment";
SchedulerUIEventNames.StartDragAppointment = "startDragAppointment";
SchedulerUIEventNames.StartDragNewAppointment = "startDragNewAppointment";
SchedulerUIEventNames.CancelDragAppointment = "cancelDragAppointment";
SchedulerUIEventNames.ShowAppointmentToolTip = "showAppointmentToolTip";
SchedulerUIEventNames.HideAppointmentToolTip = "hideAppointmentToolTip";

var DragMode;
(function (DragMode) {
    DragMode[DragMode["None"] = 0] = "None";
    DragMode[DragMode["DragAppointment"] = 1] = "DragAppointment";
    DragMode[DragMode["DragAppointmentStart"] = 2] = "DragAppointmentStart";
    DragMode[DragMode["DragAppointmentEnd"] = 3] = "DragAppointmentEnd";
    DragMode[DragMode["DragNewAppointment"] = 4] = "DragNewAppointment";
})(DragMode || (DragMode = {}));
var ResizeDirection;
(function (ResizeDirection) {
    ResizeDirection[ResizeDirection["Top"] = 0] = "Top";
    ResizeDirection[ResizeDirection["Bottom"] = 1] = "Bottom";
})(ResizeDirection || (ResizeDirection = {}));
class AppointmentDragController {
    constructor(scheduler) {
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseMoveInternalHandler = this.onMouseMoveInternal.bind(this);
        this.scheduler = scheduler;
        this.schedulerView = null;
        this.appointmentInfo = null;
        this.sourceAppointmentInfo = null;
        this.startCellInfo = null;
        this.currentCellInfo = null;
        this.dateDiff = 0;
        this.horizontalAppointmentDragged = false;
        this.lastCellChanged = false;
        this.initialPageY = 0;
        this.initialTop = 0;
        this.initialScrollTop = 0;
        this.lastTop = 0;
        this.lastCell = null;
        this.direction = ResizeDirection.Top;
        this.mode = DragMode.None;
        this.throttledDrag = Timer.throttle(this.onMouseMoveInternalHandler, 20);
    }
    dragAppointmentStart(aptInfo, startCellInfo, eventCoords) {
        this.mode = DragMode.DragAppointmentStart;
        this.startDrag(aptInfo, startCellInfo, eventCoords);
    }
    dragAppointmentEnd(aptInfo, startCellInfo, eventCoords) {
        this.mode = DragMode.DragAppointmentEnd;
        this.startDrag(aptInfo, startCellInfo, eventCoords);
    }
    dragAppointment(aptInfo, startCellInfo, eventCoords) {
        this.mode = DragMode.DragAppointment;
        this.startDrag(aptInfo, startCellInfo, eventCoords);
    }
    dragNewAppointment(startCellInfo) {
        this.mode = DragMode.DragNewAppointment;
        this.startDragNewAppointment(startCellInfo);
    }
    dropAppointment() {
        var _a, _b;
        if (this.mode === DragMode.None)
            return;
        this.scheduler.removeEventListener("pointermove", this.onMouseMoveHandler);
        this.stopAutoScrolling();
        if (this.mode === DragMode.DragNewAppointment)
            (_a = this.getUIHandlersBridge()) === null || _a === void 0 ? void 0 : _a.send(SchedulerUIEventNames.DropNewAppointment, "");
        else {
            this.removeAppointmentTopPositionInfo();
            (_b = this.getUIHandlersBridge()) === null || _b === void 0 ? void 0 : _b.send(SchedulerUIEventNames.DropAppointment, "");
        }
        this.schedulerView = null;
        this.mode = DragMode.None;
    }
    cancelDragAppointment() {
        var _a;
        if (this.mode === DragMode.None)
            return;
        this.scheduler.removeEventListener("pointermove", this.onMouseMoveHandler);
        this.stopAutoScrolling();
        if (this.mode !== DragMode.DragNewAppointment)
            this.removeAppointmentTopPositionInfo();
        (_a = this.getUIHandlersBridge()) === null || _a === void 0 ? void 0 : _a.send(SchedulerUIEventNames.CancelDragAppointment, "");
        this.schedulerView = null;
        this.mode = DragMode.None;
    }
    startDrag(aptInfo, startCellInfo, eventCoords) {
        var _a;
        this.beforeStart(startCellInfo);
        this.appointmentInfo = new AppointmentInfo(aptInfo.id, aptInfo.views, aptInfo.interval);
        this.sourceAppointmentInfo = aptInfo;
        this.currentCellInfo = startCellInfo;
        this.dateDiff = DateTimeHelper.dateSubsWithTimezone(aptInfo.getStart(), startCellInfo.interval.start);
        this.horizontalAppointmentDragged = startCellInfo.layoutType === AppointmentLayoutType$1.Horizontal;
        this.initialTop = this.findAppointmentViewByInterval(this.appointmentInfo.views, startCellInfo.interval).offsetTop;
        this.initialPageY = eventCoords.pageY;
        this.lastTop = this.initialTop;
        this.lastCell = startCellInfo.cell;
        this.initialScrollTop = this.getViewportScrollTop();
        this.saveAppointmentTopPositionInfo();
        (_a = this.getUIHandlersBridge()) === null || _a === void 0 ? void 0 : _a.send(SchedulerUIEventNames.StartDragAppointment, {
            key: aptInfo.id,
            resize: this.mode === DragMode.DragAppointmentStart || this.mode === DragMode.DragAppointmentEnd
        });
        this.startAutoScrolling();
    }
    startDragNewAppointment(startCellInfo) {
        this.beforeStart(startCellInfo);
        const start = startCellInfo.interval.start;
        const end = DateTimeHelper.dateIncreaseWithUtcOffset(start, startCellInfo.interval.duration);
        const utcOffsetStart = this.scheduler.getUtcOffset(start, startCellInfo.utcOffset);
        const utcOffsetEnd = this.scheduler.getUtcOffset(end, startCellInfo.utcOffset);
        this.dispatchEvent(SchedulerUIEventNames.StartDragNewAppointment, DateTimeHelper.addTimeSpan(start, utcOffsetStart), DateTimeHelper.addTimeSpan(end, utcOffsetEnd), startCellInfo.allDay, SchedulerDomUtils.Attr.getResourceKey(startCellInfo.cell));
        this.startAutoScrolling();
    }
    beforeStart(startCellInfo) {
        this.startCellInfo = startCellInfo;
        this.scheduler.addEventListener("pointermove", this.onMouseMoveHandler);
    }
    onMouseMove(e) {
        if (this.mode === DragMode.None)
            return;
        this.throttledDrag(e);
    }
    onMouseMoveInternal(e) {
        var _a;
        const cellInfo = (_a = this.getSchedulerView()) === null || _a === void 0 ? void 0 : _a.findCellByCoordinates(e.clientX, e.clientY);
        if (!cellInfo)
            return;
        const appointmentInfo = this.scheduler.getSelectedAppointmentInfo();
        if (appointmentInfo) {
            if (this.mode === DragMode.DragNewAppointment)
                this.resizeNewAppointment(cellInfo);
            else if (this.mode === DragMode.DragAppointment)
                this.drag(cellInfo, e);
            else
                this.resize(cellInfo, this.mode === DragMode.DragAppointmentStart);
        }
    }
    drag(cellInfo, eventCoords) {
        var _a;
        if (!this.startCellInfo || !this.currentCellInfo || !this.appointmentInfo || !this.sourceAppointmentInfo)
            return;
        const cellInterval = this.currentCellInfo.interval;
        this.lastCellChanged = false;
        this.updateEditedAppointmentPosition(eventCoords);
        const cell = cellInfo.cell;
        this.lastCellChanged = this.lastCell !== cell;
        this.lastCell = cell;
        if (cellInfo.layoutType === AppointmentLayoutType$1.Horizontal && !this.horizontalAppointmentDragged) {
            const parentClientTop = ((_a = cell.offsetParent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top) || 0;
            this.initialTop = eventCoords.clientY - parentClientTop;
            this.initialPageY = eventCoords.pageY;
            this.initialScrollTop = this.getViewportScrollTop(cell);
            this.lastTop = this.initialTop;
        }
        const newInterval = cellInfo.interval;
        if (DateTimeHelper.dateSubsWithTimezone(cellInterval.start, newInterval.start) === 0 && cellInterval.duration === newInterval.duration) {
            const newResourceKey = SchedulerDomUtils.Attr.getResourceKey(cell);
            if (!this.appointmentInfo.resourceKey || this.appointmentInfo.resourceKey === newResourceKey)
                return;
        }
        if (this.currentCellInfo.allDay !== cellInfo.allDay) {
            this.dateDiff = 0;
            if (cellInfo.allDay) {
                this.appointmentInfo.interval = this.sourceAppointmentInfo.allDay ?
                    new Interval(newInterval.start, this.sourceAppointmentInfo.interval.duration) :
                    newInterval;
            }
            else {
                this.appointmentInfo.interval = this.startCellInfo.allDay ?
                    newInterval :
                    new Interval(newInterval.start, this.sourceAppointmentInfo.interval.duration);
            }
            this.appointmentInfo.allDay = cellInfo.allDay;
        }
        else {
            let newStart = DateTimeHelper.addTimeSpan(newInterval.start, this.dateDiff || 0);
            if (this.appointmentInfo.allDay)
                newStart = DateTimeHelper.truncToDate(newStart);
            this.appointmentInfo.interval = new Interval(newStart, this.appointmentInfo.interval.duration);
        }
        this.updateResource(cell);
        this.saveAppointmentTopPositionInfo();
        const utcOffsetStart = this.scheduler.getUtcOffset(newInterval.getStart(), cellInfo.utcOffset);
        const utcOffsetEnd = this.scheduler.getUtcOffset(newInterval.getEnd(), cellInfo.utcOffset);
        this.dispatchEvent(SchedulerUIEventNames.DragAppointment, DateTimeHelper.addTimeSpan(this.appointmentInfo.getStart(), utcOffsetStart), DateTimeHelper.addTimeSpan(this.appointmentInfo.getEnd(), utcOffsetEnd), this.appointmentInfo.allDay, this.appointmentInfo.resourceKey);
        this.currentCellInfo = cellInfo;
    }
    resize(cellInfo, resizeStart) {
        if (!this.appointmentInfo || !this.currentCellInfo || !this.sourceAppointmentInfo)
            return;
        const newInterval = cellInfo.interval;
        const currentInterval = this.currentCellInfo.interval;
        if (DateTimeHelper.dateSubsWithTimezone(currentInterval.start, newInterval.start) === 0 && currentInterval.duration === newInterval.duration || currentInterval.isLongerOrEqualDay !== newInterval.isLongerOrEqualDay)
            return;
        if (resizeStart) {
            const duration = this.sourceAppointmentInfo.interval.duration + (DateTimeHelper.dateSubsWithTimezone(this.sourceAppointmentInfo.interval.start, newInterval.start));
            if (duration >= 0)
                this.appointmentInfo.interval = new Interval(newInterval.start, duration);
        }
        else
            this.appointmentInfo.interval.duration = DateTimeHelper.dateSubsWithTimezone(newInterval.getEnd(), this.sourceAppointmentInfo.interval.start);
        this.updateResource(this.currentCellInfo.cell);
        const utcOffsetStart = this.scheduler.getUtcOffset(this.appointmentInfo.getStart(), cellInfo.utcOffset);
        const utcOffsetEnd = this.scheduler.getUtcOffset(this.appointmentInfo.getEnd(), cellInfo.utcOffset);
        this.dispatchEvent(SchedulerUIEventNames.DragAppointment, DateTimeHelper.addTimeSpan(this.appointmentInfo.getStart(), utcOffsetStart), DateTimeHelper.addTimeSpan(this.appointmentInfo.getEnd(), utcOffsetEnd), this.appointmentInfo.allDay, this.appointmentInfo.resourceKey);
        this.currentCellInfo = cellInfo;
    }
    resizeNewAppointment(cellInfo) {
        if (!this.startCellInfo)
            return;
        const interval = cellInfo.interval;
        const duration = DateTimeHelper.dateSubsWithTimezone(interval.start, this.startCellInfo.interval.start);
        if (duration === 0 && this.startCellInfo.interval.duration === interval.duration)
            return;
        if (duration < 0 && this.startCellInfo.interval.duration === interval.duration)
            this.direction = ResizeDirection.Top;
        else if (duration > 0 && this.startCellInfo.interval.duration === interval.duration)
            this.direction = ResizeDirection.Bottom;
        if (this.direction === ResizeDirection.Bottom)
            this.startCellInfo.interval.duration = duration + interval.duration;
        else if (this.direction === ResizeDirection.Top) {
            this.startCellInfo.interval.start = interval.start;
            this.startCellInfo.interval.duration += duration * -1;
        }
        const start = this.startCellInfo.interval.start;
        const end = DateTimeHelper.dateIncreaseWithUtcOffset(start, this.startCellInfo.interval.duration);
        const resourceKey = SchedulerDomUtils.Attr.getResourceKey(cellInfo.cell);
        const utcOffsetStart = this.scheduler.getUtcOffset(start, cellInfo.utcOffset);
        const utcOffsetEnd = this.scheduler.getUtcOffset(end, cellInfo.utcOffset);
        this.dispatchEvent(SchedulerUIEventNames.DragAppointment, DateTimeHelper.addTimeSpan(start, utcOffsetStart), DateTimeHelper.addTimeSpan(end, utcOffsetEnd), cellInfo.allDay, resourceKey);
    }
    dispatchEvent(eventName, start, end, isAllDay, resourceKey) {
        var _a;
        (_a = this.getUIHandlersBridge()) === null || _a === void 0 ? void 0 : _a.send(eventName, {
            start: start,
            end: end,
            isAllDay: isAllDay,
            resourceKey: resourceKey
        });
    }
    getUIHandlersBridge() {
        return this.scheduler.uiHandlersBridge;
    }
    getSchedulerView() {
        if (this.schedulerView === null)
            this.schedulerView = this.scheduler.getView();
        return this.schedulerView;
    }
    findAppointmentViewByInterval(apts, interval) {
        return apts.find((apt) => {
            if (interval && apt.firstCell && apt.lastCell) {
                const aptViewStart = DateTimeHelper.getCellInterval(apt.firstCell).getStart();
                const aptViewEnd = DateTimeHelper.getCellInterval(apt.lastCell).getEnd();
                if (interval.intersectsWith(new Interval(aptViewStart, DateTimeHelper.dateSubsWithTimezone(aptViewEnd, aptViewStart))))
                    return apt;
            }
        });
    }
    updateEditedAppointmentPosition(eventCoords) {
        const apts = this.scheduler.getEditableAppointments();
        if (!this.lastCell || apts.length === 0 || !this.currentCellInfo)
            return;
        const apt = this.findAppointmentViewByInterval(apts, this.currentCellInfo.interval);
        if (!apt)
            return;
        if (!SchedulerDomUtils.isHorizontalAppointment(apt)) {
            this.horizontalAppointmentDragged = false;
            return;
        }
        let checkBoundaries = false;
        if (!this.horizontalAppointmentDragged) {
            this.initialTop -= apt.offsetHeight / 2;
            this.lastTop = this.initialTop;
            this.horizontalAppointmentDragged = true;
            checkBoundaries = true;
        }
        if (eventCoords) {
            const scrollTop = this.getViewportScrollTop();
            const scrollDiffY = scrollTop - this.initialScrollTop;
            const diffY = eventCoords.pageY - this.initialPageY + scrollDiffY;
            this.lastTop = this.initialTop + diffY;
            checkBoundaries = checkBoundaries || diffY !== 0;
        }
        if (checkBoundaries || this.lastCellChanged) {
            const minTop = this.lastCell.offsetTop + 1;
            const maxTop = minTop + this.lastCell.offsetHeight - apt.offsetHeight - 2;
            this.lastTop = Math.min(this.lastTop, maxTop);
            this.lastTop = Math.max(minTop, this.lastTop);
        }
        const topInCell = this.lastTop - this.lastCell.offsetTop;
        apts.forEach((item) => {
            const apt = item;
            const cell = apt.firstCell;
            const min = cell.offsetTop;
            const max = (cell.offsetTop + cell.offsetHeight) - apt.offsetHeight - 2;
            let value = min + topInCell;
            if (value >= max)
                value = max;
            apt.style.top = value + "px";
            apt.style.zIndex = "1000";
        });
    }
    saveAppointmentTopPositionInfo() {
        if (!this.lastCell)
            return;
        const topInCell = this.lastTop - this.lastCell.offsetTop;
        SchedulerDomUtils.Attr.setAppointmentTopPosition(this.getSchedulerView(), topInCell.toString());
    }
    removeAppointmentTopPositionInfo() {
        SchedulerDomUtils.Attr.removeAppointmentTopPosition(this.getSchedulerView());
    }
    updateResource(cell) {
        if (this.appointmentInfo && this.appointmentInfo.resourceKey)
            this.appointmentInfo.resourceKey = SchedulerDomUtils.Attr.getResourceKey(cell);
    }
    getViewportScrollTop(cell) {
        const actualCell = cell ? cell : this.lastCell;
        if (!actualCell)
            return 0;
        const viewport = SchedulerDomUtils.getParentTimeCellsViewport(actualCell);
        return (viewport === null || viewport === void 0 ? void 0 : viewport.scrollTop) || 0;
    }
    startAutoScrolling() {
        var _a, _b;
        (_b = (_a = this.getSchedulerView()) === null || _a === void 0 ? void 0 : _a.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.startAutoScrolling(ScrollViewerAutoScrollingMode.Horizontal);
    }
    stopAutoScrolling() {
        var _a, _b;
        (_b = (_a = this.getSchedulerView()) === null || _a === void 0 ? void 0 : _a.getScrollViewer()) === null || _b === void 0 ? void 0 : _b.stopAutoScrolling();
    }
}

const DXPOPUP_MODAL_TAG_NAME = dxPopupRootTagName.toUpperCase();
class DxAppointmentTooltip extends SingleSlotElementBase {
    constructor() {
        super();
        this.scheduler = null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.scheduler = dom.DomUtils.getParentByTagName(this, DxScheduler.TagName);
        if (this.scheduler)
            this.initEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener(touch.TouchUtils.touchMouseDownEventName, this.toolTipLostFocusHandler);
    }
    initEvents() {
        this.toolTipLostFocusHandler = (evt) => {
            var _a, _b;
            const apt = SchedulerDomUtils.getAppointmentContainer(evt.target);
            if (apt && SchedulerDomUtils.isTargetAppointment(apt) || !((_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.uiHandlersBridge))
                return false;
            return getOutsideClickEventHandler(evt, this, (_b = this.scheduler) === null || _b === void 0 ? void 0 : _b.uiHandlersBridge, this.scheduler);
        };
        document.addEventListener(touch.TouchUtils.touchMouseDownEventName, this.toolTipLostFocusHandler);
    }
}
DxAppointmentTooltip.TagName = "dxbl-appointment-tooltip";
function onOutsideClick(evt, element, scheduler, onOutsideClick) {
    let targetElement = evt.target;
    while (targetElement) {
        if (targetElement === element || targetElement.tagName === DXPOPUP_MODAL_TAG_NAME || targetElement === scheduler)
            return false;
        targetElement = targetElement.parentElement;
    }
    if (onOutsideClick) {
        setTimeout(() => {
            onOutsideClick();
        }, 0);
    }
    return true;
}
function getOutsideClickEventHandler(evt, tooltip, uiHandlersBridge, scheduler) {
    return onOutsideClick(evt, tooltip, scheduler, function () {
        const willBeClosed = tooltip && typeof tooltip !== "string" && tooltip.style.display !== "none";
        if (willBeClosed)
            uiHandlersBridge === null || uiHandlersBridge === void 0 ? void 0 : uiHandlersBridge.send(SchedulerUIEventNames.HideAppointmentToolTip, { outsideClick: true });
    });
}

var FormType;
(function (FormType) {
    FormType[FormType["None"] = 0] = "None";
    FormType[FormType["AppointmentEditForm"] = 1] = "AppointmentEditForm";
    FormType[FormType["AppointmentCompactEditForm"] = 2] = "AppointmentCompactEditForm";
    FormType[FormType["AppointmentToolTip"] = 3] = "AppointmentToolTip";
    FormType[FormType["RecurrentAppointmentEditForm"] = 4] = "RecurrentAppointmentEditForm";
    FormType[FormType["RecurrentAppointmentDeleteForm"] = 5] = "RecurrentAppointmentDeleteForm";
    FormType[FormType["GotoDateForm"] = 6] = "GotoDateForm";
})(FormType || (FormType = {}));
const FormType$1 = FormType;

class TimeMarkerUpdater {
    constructor() {
        this.TIMEOUT = 60 * 1000;
        this.subscriptions = [];
        this.timerId = -1;
    }
    subscribe(scheduler, updateAction) {
        if (this.getSubscriptionIndex(scheduler) === -1) {
            const subscription = {
                scheduler: scheduler,
                updateAction: updateAction
            };
            this.subscriptions.push(subscription);
            if (this.timerId === -1)
                this.startTimer();
        }
    }
    unsubscribe(scheduler) {
        const index = this.getSubscriptionIndex(scheduler);
        if (index !== -1)
            this.unsubscribeByIndex(index);
        if (this.subscriptions.length === 0)
            this.stopTimer();
    }
    unsubscribeByIndex(index) {
        this.subscriptions.splice(index, 1);
    }
    getSubscriptionIndex(scheduler) {
        for (let i = 0, subscription; subscription = this.subscriptions[i]; i++) {
            if (subscription.scheduler === scheduler)
                return i;
        }
        return -1;
    }
    startTimer() {
        this.timerId = setTimeout(this.onTimeout.bind(this), this.TIMEOUT);
    }
    stopTimer() {
        if (this.timerId !== -1) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
    }
    onTimeout() {
        for (let i = 0, subscription; subscription = this.subscriptions[i]; i++) {
            if (TimeMarkerUpdater.isElementValid(subscription.scheduler)) {
                try {
                    subscription.updateAction();
                }
                catch (e) { }
            }
            else {
                this.unsubscribeByIndex(i);
                i--;
            }
        }
        this.startTimer();
    }
    static isElementValid(element) {
        while (element != null) {
            if (element.tagName === "BODY")
                return true;
            element = element.parentNode;
        }
        return false;
    }
}

class DateTimeTableLayout {
    constructor(table, cellSelector) {
        this._element = table;
        this._cellSelector = cellSelector;
        this.containers = null;
        this.timeCells = null;
    }
    get element() {
        return this._element;
    }
    get cellSelector() {
        return this._cellSelector;
    }
    getContainers() {
        if (!this.containers) {
            const timeCells = this.getTimeCells();
            this.containers = {};
            for (let i = 0, cell; cell = timeCells[i]; i++) {
                const index = SchedulerDomUtils.Attr.getContainerIndex(cell);
                if (!this.containers[index])
                    this.containers[index] = { cells: [] };
                this.containers[index].cells.push(cell);
            }
        }
        return this.containers;
    }
    clearObjects() {
        this.timeCells = null;
        this.containers = null;
    }
    getTimeCells() {
        if (!this.timeCells)
            this.timeCells = this.element.querySelectorAll(this.cellSelector);
        return this.timeCells;
    }
    getFirstContainer() {
        const containers = this.getContainers();
        for (const index in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, index))
                continue;
            return containers[index];
        }
        return undefined;
    }
    findCell(date) {
        const containers = this.getContainers();
        for (const index in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, index))
                continue;
            for (let i = 0, cell; cell = containers[index].cells[i]; i++) {
                const start = SchedulerDomUtils.Attr.getStart(cell);
                const end = SchedulerDomUtils.Attr.getEnd(cell);
                if ((start.valueOf() - date.valueOf()) <= 0 && (date.valueOf() - end.valueOf()) < 0)
                    return cell;
            }
        }
        return null;
    }
    findStartCell(date) {
        const containers = this.getContainers();
        for (const index in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, index))
                continue;
            for (let i = 0, cell; cell = containers[index].cells[i]; i++) {
                const start = SchedulerDomUtils.Attr.getStart(cell);
                if ((date.valueOf() - start.valueOf()) <= 0)
                    return cell;
            }
        }
        return null;
    }
    findEndCell(date) {
        const containers = this.getContainers();
        for (const index in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, index))
                continue;
            for (let i = 0, cell; cell = containers[index].cells[i]; i++) {
                const end = SchedulerDomUtils.Attr.getEnd(cell);
                if ((date.valueOf() - end.valueOf()) <= 0)
                    return cell;
            }
        }
        return null;
    }
    findCellByPos(x, y) {
        const cells = this.getTimeCells();
        for (let i = 0, cell; cell = cells[i]; i++) {
            const rect = cell.getBoundingClientRect();
            if (rect.top <= y && y < rect.bottom && rect.left <= x && x < rect.right)
                return cell;
        }
        return null;
    }
}

class BusyInterval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    containsExcludeEndBound(value) {
        return this.start <= value && this.end > value;
    }
}

function defaultBinarySearchComparer(array, index, value) {
    const arrayElement = array[index];
    if (arrayElement === value)
        return 0;
    else
        return arrayElement < value ? -1 : 1;
}
function arrayBinarySearch(array, value, binarySearchComparer, startIndex, length) {
    if (!binarySearchComparer)
        binarySearchComparer = defaultBinarySearchComparer;
    let sIndex = startIndex === undefined || startIndex === null ? 0 : startIndex;
    if (length === undefined || length === null)
        length = array.length - sIndex;
    let endIndex = (sIndex + length) - 1;
    while (sIndex <= endIndex) {
        const middle = (sIndex + ((endIndex - sIndex) >> 1));
        const compareResult = binarySearchComparer(array, middle, value);
        if (compareResult === 0)
            return middle;
        if (compareResult < 0)
            sIndex = middle + 1;
        else
            endIndex = middle - 1;
    }
    return -(sIndex + 1);
}

class ViewAttributeNames {
}
ViewAttributeNames.state = "state";
ViewAttributeNames.snapToCellsMode = "snap-to-cells-mode";
ViewAttributeNames.editableAppointmentKey = "editable-appointment-key";

class ParsedAppointmentClientKey {
    constructor(date, recurrenceIndex, resource) {
        this.date = date;
        this.recurrenceIndex = recurrenceIndex;
        this.resource = resource;
    }
    static from(clientKey) {
        const [date, recurrenceIndex, resource] = clientKey.split(ParsedAppointmentClientKey.ClientKeyPartSeparator);
        return new ParsedAppointmentClientKey(date, recurrenceIndex, resource);
    }
    static to(key) {
        let result = key.date + ParsedAppointmentClientKey.ClientKeyPartSeparator + key.recurrenceIndex;
        if (key.resource)
            result = result + ParsedAppointmentClientKey.ClientKeyPartSeparator + key.resource;
        return result;
    }
    static IsSame(apt1, apt2, ignoreResource = false) {
        const mainPartIsSame = apt1.date === apt2.date && apt1.recurrenceIndex === apt2.recurrenceIndex;
        if (ignoreResource)
            return mainPartIsSame;
        return mainPartIsSame && apt1.resource === apt2.resource;
    }
}
ParsedAppointmentClientKey.ClientKeyPartSeparator = "_";

class AppointmentUtils {
    static selectSameAppointments(parsedKey, appointments) {
        appointments.filter(apt => {
            const aptKey = SchedulerDomUtils.Attr.getAppointmentKey(apt);
            const aptParsedKey = ParsedAppointmentClientKey.from(aptKey); // eslint-disable-line new-cap
            return ParsedAppointmentClientKey.IsSame(parsedKey, aptParsedKey, true); // eslint-disable-line new-cap
        }).forEach(apt => {
            if (!dom.DomUtils.hasClassName(apt, SchedulerCssClasses.SelectedAppointmentClassName))
                dom.DomUtils.addClassName(apt, SchedulerCssClasses.SelectedAppointmentClassName);
        });
    }
}

const COMPACT_APPOINTMENT_WIDTH = 50;
class ViewWithHorizontalAppointments extends SingleSlotElementBase {
    constructor() {
        super();
        this.editableAppointmentKey = "";
        this.state = "";
        this.snapToCellsMode = SnapToCellsMode$1.Auto;
        this.selectedAppointmentKey = "";
        this.horizontalAppointments = [];
        this.appointmentInfos = [];
        this.DEBUG_calculateHorizontalAppointmentsCount = 0;
    }
    contentChanged() {
        super.contentChanged();
        this.timeMarkerUpdater = new TimeMarkerUpdater();
        this.scrollViewer = this.querySelector(`.${ScrollViewerCssClasses.ClassName}`);
        this.addEventSubscriptions();
    }
    disconnectedCallback() {
        this.removeEventSubscriptions();
        super.disconnectedCallback();
    }
    recalculateLayout() {
        this.initializeDateHeaders();
        this.initializeTimeCells();
        this.initializeAppointments(false);
        this.adjust();
    }
    adjust() {
        this.calculateAppointments(true);
        this.updateTimeMarkersEventHandler();
    }
    recalculateAppointments(allowCalculateCellsHeight, onlyEditableAppointments) {
        this.initializeAppointments(onlyEditableAppointments);
        if (onlyEditableAppointments)
            this.calculateEditableAppointments();
        else
            this.calculateAppointments(allowCalculateCellsHeight);
    }
    findCellByCoordinates(clientX, clientY) {
        var _a;
        const cell = (_a = this.horizontalView) === null || _a === void 0 ? void 0 : _a.findCellByPos(clientX, clientY);
        if (!cell)
            return null;
        return this.createCellInfo(cell, AppointmentLayoutType$1.Horizontal);
    }
    getEditableAppointmentKey() {
        return this.editableAppointmentKey;
    }
    getSelectedAppointmentKey() {
        return this.selectedAppointmentKey;
    }
    isEditableAppointment(apt) {
        return SchedulerDomUtils.Attr.getAppointmentKey(apt) === this.getEditableAppointmentKey();
    }
    getScrollViewer() {
        return this.scrollViewer;
    }
    restoreFocusedAppointment(aptKey) {
        if (!aptKey)
            return;
        const scheduler = this.closest(DxScheduler.TagName);
        if (!(scheduler === null || scheduler === void 0 ? void 0 : scheduler.contains(document.activeElement)))
            return;
        const editedAppointmentElement = this.querySelector(`[${SchedulerAttributes.Key}='${aptKey}']`);
        if (!editedAppointmentElement) {
            const parsedKey = ParsedAppointmentClientKey.from(aptKey);
            if (parsedKey.resource === null)
                return;
            const parcedKetWithoutResource = new ParsedAppointmentClientKey(parsedKey.date, parsedKey.recurrenceIndex, null);
            const keyWithoutResource = ParsedAppointmentClientKey.to(parcedKetWithoutResource);
            const editedAppointmentElementWithAnyResource = this.querySelector(`[${SchedulerAttributes.Key}^='${keyWithoutResource}']`);
            if (editedAppointmentElementWithAnyResource) {
                FocusUtils.makeElementFocusable(editedAppointmentElementWithAnyResource);
                FocusUtils.focusElement(editedAppointmentElementWithAnyResource);
            }
        }
        else if (document.activeElement !== editedAppointmentElement) {
            FocusUtils.makeElementFocusable(editedAppointmentElement);
            FocusUtils.focusElement(editedAppointmentElement);
        }
    }
    createCellInfo(cell, layoutType) {
        return {
            cell,
            layoutType,
            allDay: SchedulerDomUtils.Attr.getAllDay(cell),
            interval: DateTimeHelper.getCellInterval(cell),
            utcOffset: SchedulerDomUtils.Attr.getUtcOffset(cell)
        };
    }
    calculateEditableAppointments() {
        var _a;
        const horizontalContainers = (_a = this.horizontalView) === null || _a === void 0 ? void 0 : _a.getContainers();
        if (horizontalContainers) {
            this.resetCalculationInfo();
            for (let i = 0, apt; apt = this.horizontalAppointments[i]; i++) {
                this.calculateHorizontalAppointmentCore(apt);
                const topPosition = SchedulerDomUtils.Attr.getAppointmentTopPosition(this);
                apt.style.top = (apt.firstCell.offsetTop + topPosition) + "px";
            }
        }
    }
    calculateAppointments(allowCalculateCellsHeight) {
        var _a;
        const horizontalContainers = (_a = this.horizontalView) === null || _a === void 0 ? void 0 : _a.getContainers();
        if (horizontalContainers) {
            this.resetCalculationInfo();
            if (allowCalculateCellsHeight)
                this.calculateHorizontalAppointmentsAndCells(this, horizontalContainers);
            else
                this.calculateHorizontalAppointments(horizontalContainers);
        }
        this.DEBUG_calculateHorizontalAppointmentsCount++;
    }
    initializeTimeCells() {
        var _a;
        (_a = this.getHorizontalViewPart()) === null || _a === void 0 ? void 0 : _a.clearObjects();
    }
    initializeAppointments(onlyEditableAppointments) {
        var _a;
        this.horizontalAppointments = onlyEditableAppointments ? SchedulerDomUtils.getHorizontalEditableAppointments(this) : SchedulerDomUtils.getHorizontalAppointments(this);
        this.prepareAppointments((_a = this.horizontalView) === null || _a === void 0 ? void 0 : _a.getTimeCells(), this.horizontalAppointments);
        this.appointmentInfos = AppointmentInfo.createItems(this.horizontalAppointments);
    }
    prepareAppointments(cellList, apts) {
        if (!cellList)
            return;
        const cells = {};
        for (let i = 0, item; item = cellList[i]; i++) {
            item.intersects = [];
            const index = SchedulerDomUtils.Attr.getContainerIndex(item);
            if (!cells[index])
                cells[index] = [];
            cells[index].push(item);
        }
        for (let i = 0, apt; apt = apts[i]; i++) {
            const containerIndex = SchedulerDomUtils.Attr.getContainerIndex(apt);
            const firstCellIndex = SchedulerDomUtils.Attr.getAppointmentFirstCellIndex(apt);
            const lastCellIndex = SchedulerDomUtils.Attr.getAppointmentLastCellIndex(apt);
            if (cells[containerIndex]) {
                apt.firstCell = cells[containerIndex][firstCellIndex];
                apt.lastCell = cells[containerIndex][lastCellIndex];
                apt.info = {
                    cellCount: lastCellIndex - firstCellIndex + 1
                };
                for (let j = firstCellIndex; j <= lastCellIndex; j++) {
                    const cell = cells[containerIndex][j];
                    this.addIntersect(cell, apt);
                }
            }
        }
    }
    addIntersect(el, apt) {
        const intersects = el.intersects;
        if (intersects.findIndex((item) => SchedulerDomUtils.Attr.getAppointmentKey(item) === SchedulerDomUtils.Attr.getAppointmentKey(apt)) < 0)
            intersects.push(apt);
    }
    findTimelineResourceHeader(scheduler, resourceKey) {
        if (resourceKey === "")
            return null;
        const headers = SchedulerDomUtils.getVerticalResourceHeaders(scheduler);
        for (let i = 0, header; header = headers[i]; i++) {
            if (this.getElementResourceKey(header) === resourceKey)
                return header;
        }
        return null;
    }
    getElementResourceKey(el) {
        return SchedulerDomUtils.Attr.getResourceKey(el);
    }
    prepareResourceHeaders(scheduler, containers) {
        const resourceHeaders = {};
        for (const containerIndex in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, containerIndex))
                continue;
            const cells = containers[containerIndex].cells;
            const resourceKey = this.getElementResourceKey(cells[0]);
            const resourceHeader = this.findTimelineResourceHeader(scheduler, resourceKey);
            if (resourceHeader) {
                resourceHeader.style.height = "";
                if (resourceHeaders[resourceKey] == null)
                    resourceHeaders[resourceKey] = { element: resourceHeader, height: 0, minHeight: 0, lastContainerIndex: containerIndex };
                else
                    resourceHeaders[resourceKey].lastContainerIndex = containerIndex;
            }
        }
        for (const resourceKey in resourceHeaders) {
            if (!Object.prototype.hasOwnProperty.call(resourceHeaders, resourceKey))
                continue;
            resourceHeaders[resourceKey].minHeight = resourceHeaders[resourceKey].element.offsetHeight;
        }
        return resourceHeaders;
    }
    calculateHorizontalAppointments(containers) {
        for (const containerIndex in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, containerIndex))
                continue;
            const cells = containers[containerIndex].cells;
            for (let cellIndex = 0, cell; cell = cells[cellIndex]; cellIndex++)
                this.calculateHorizontalAppointmentsInCell(cell);
        }
    }
    calculateHorizontalAppointmentsInCell(cell) {
        const calculatedApts = this.getCalculatedHorizontalAppointmentsInCell(cell);
        const apts = this.getNotCalculatedHorizontalAppointmentsInCell(cell);
        calculatedApts.forEach(apt => apt.calculated = true);
        apts.forEach(apt => apt.calculated = false);
        this.calculateHorizontalAptsInCellCore(cell, calculatedApts.concat(apts), calculatedApts.length);
    }
    calculateHorizontalAptsInCellCore(cell, apts, statIndex) {
        this.calculateAppointmentRelativeTopOffset(apts, statIndex);
        this.calculateAppointmentsPosition(cell, apts);
    }
    calculateAppointmentRelativeTopOffset(apts, startIndex) {
        this.adjustAppointmentCellIndexes(apts);
        this.calculateAppointmentRelativePositionsCore(apts, startIndex);
    }
    calculateAppointmentRelativePositionsCore(apts, startIndex) {
        const count = apts.length;
        const busyIntervals = this.createBusyIntervals(2 * count);
        let i = 0;
        while (i < startIndex) {
            if (!this.isEditableAppointment(apts[i]))
                this.makeIntervalBusy(apts[i], busyIntervals);
            i++;
        }
        while (i < count) {
            const apt = apts[i];
            this.calculateHorizontalAppointmentCore(apt);
            if (!apt.calculated) {
                const relativePosition = this.findAvailableRelativePosition(apt, busyIntervals);
                apt.relativePosition = relativePosition;
            }
            if (!this.isEditableAppointment(apt))
                this.makeIntervalBusy(apt, busyIntervals);
            i++;
        }
    }
    findAvailableRelativePosition(apt, cellsBusyIntervals) {
        apt.relativePosition = 0;
        let relativePosition = 0;
        const from = apt.info.busyIntervalFirstCellIndex;
        const to = apt.info.busyIntervalLastCellIndex;
        let i = from;
        while (i <= to) {
            const busyIntervals = cellsBusyIntervals[i];
            const interval = this.findPossibleIntersectionInterval(busyIntervals, relativePosition);
            if ((interval === null) || (interval.start >= relativePosition + apt.offsetHeight))
                i++;
            else {
                relativePosition = interval.end;
                i = from;
            }
        }
        return relativePosition;
    }
    findPossibleIntersectionInterval(busyIntervals, value) {
        for (let i = 0; i < busyIntervals.length; i++) {
            const interval = busyIntervals[i];
            if ((interval.containsExcludeEndBound(value)) || (interval.start > value))
                return new BusyInterval(interval.start, interval.end);
        }
        return null;
    }
    calculateHorizontalAppointmentCore(apt) {
        const firstCell = apt.firstCell;
        const cellWidth = firstCell.getBoundingClientRect().width;
        const startOffset = SchedulerDomUtils.Attr.getAppointmentRow(apt) - SchedulerDomUtils.Attr.getAppointmentFirstCellIndex(apt);
        const left = firstCell.offsetLeft + Math.floor(cellWidth * startOffset);
        let width = cellWidth - Math.floor(cellWidth * startOffset);
        let currentCell = firstCell.nextElementSibling;
        const rowSpan = SchedulerDomUtils.Attr.getAppointmentRowSpan(apt);
        for (let i = 1; i < Math.trunc(rowSpan) && currentCell != null; i++) {
            width += currentCell.getBoundingClientRect().width;
            currentCell = currentCell.nextElementSibling;
        }
        const endOffset = rowSpan - Math.trunc(rowSpan);
        if (endOffset > 0) {
            if (rowSpan < 1)
                width -= cellWidth - firstCell.getBoundingClientRect().width * endOffset;
            else if (currentCell != null)
                width += currentCell.getBoundingClientRect().width * endOffset;
        }
        this.updateAppointmentCompactStyle(apt, width);
        apt.style.height = "";
        apt.style.width = `${width}px`;
        apt.style.left = `${left}px`;
        apt.style.top = "-10000px";
        apt.style.display = "";
    }
    updateAppointmentCompactStyle(apt, aptWidth) {
        const useCompactStyle = aptWidth < COMPACT_APPOINTMENT_WIDTH;
        dom.DomUtils.toggleClassName(apt.children[0], SchedulerCssClasses.CompactAppointmentClassName, useCompactStyle);
    }
    createBusyIntervals(cellsCount) {
        const result = [];
        for (let i = 0; i < cellsCount; i++)
            result.push([]);
        return result;
    }
    makeIntervalBusy(apt, busyIntervals) {
        const from = apt.info.busyIntervalFirstCellIndex;
        const to = apt.info.busyIntervalLastCellIndex;
        for (let i = from; i <= to; i++)
            this.addBusyInterval(busyIntervals[i], new BusyInterval(apt.relativePosition, (apt.relativePosition + apt.offsetHeight)));
    }
    addBusyInterval(busyIntervals, busyInterval) {
        if (!this.checkBusyIntervalExists(busyIntervals, busyInterval)) {
            let i = busyIntervals.findIndex(interval => interval.start > busyInterval.start);
            if (i === -1)
                i = busyIntervals.length;
            busyIntervals.splice(i, 0, busyInterval);
        }
    }
    checkBusyIntervalExists(busyIntervals, busyInterval) {
        return busyIntervals.some(interval => interval.start === busyInterval.start && interval.end === busyInterval.end);
    }
    calculateAppointmentsPosition(cell, apts) {
        let cellOffsetTop = cell.offsetTop;
        if (cell.firstElementChild && SchedulerDomUtils.isDateCellHeader(cell.firstElementChild)) {
            const paddingTop = window.getComputedStyle(cell).paddingTop;
            cellOffsetTop += cell.firstElementChild.offsetHeight + parseInt(paddingTop);
        }
        for (let i = 0; i < apts.length; i++) {
            const apt = apts[i];
            let aptTopPosition = apt.relativePosition + cellOffsetTop;
            if (this.isEditableAppointment(apt)) {
                const disabledApt = apts.find(apt => apt.classList.contains(SchedulerCssClasses.DisableAppointmentClassName));
                if (disabledApt)
                    aptTopPosition = disabledApt.relativePosition + cellOffsetTop;
                else
                    continue;
            }
            apt.info.calculatedTop = aptTopPosition;
            apt.style.top = aptTopPosition + "px";
        }
    }
    adjustAppointmentCellIndexes(apts) {
        const dateTimes = this.createAptsDateTimeCollection(apts);
        this.calculateAdjustedCellIndexes(apts, dateTimes);
    }
    createAptsDateTimeCollection(apts) {
        const dateTimeCollection = [];
        for (let i = 0; i < apts.length; i++) {
            const apt = apts[i];
            const { startTime, endTime } = this.getAptAdjustedStartEndTime(apt);
            this.addDateTime(dateTimeCollection, startTime);
            this.addDateTime(dateTimeCollection, endTime);
        }
        dateTimeCollection.sort(DateTimeHelper.dateTimeComparer);
        return dateTimeCollection;
    }
    addDateTime(dateTimeCollection, dateTime) {
        if (!this.isAlreadyAdded(dateTimeCollection, dateTime))
            dateTimeCollection.push(dateTime);
    }
    isAlreadyAdded(dateTimeCollection, dateTime) {
        const count = dateTimeCollection.length;
        for (let i = 0; i < count; i++) {
            if (dateTimeCollection[i].valueOf() === dateTime.valueOf())
                return true;
        }
        return false;
    }
    calculateAdjustedCellIndexes(apts, dateTimes) {
        for (let i = 0; i < apts.length; i++)
            this.calculateAdjustedCellIndexesCore(apts[i], dateTimes);
    }
    calculateAdjustedCellIndexesCore(apt, dateTimes) {
        const { startTime, endTime } = this.getAptAdjustedStartEndTime(apt);
        const firstCellIndex = arrayBinarySearch(dateTimes, startTime, DateTimeHelper.dateTimeIndexComparer);
        const lastCellIndex = arrayBinarySearch(dateTimes, endTime, DateTimeHelper.dateTimeIndexComparer) - 1;
        apt.info.busyIntervalFirstCellIndex = firstCellIndex;
        apt.info.busyIntervalLastCellIndex = lastCellIndex;
    }
    getAptAdjustedStartEndTime(apt) {
        const snapToCellsMode = SchedulerDomUtils.Attr.getSnapToCellsMode(this);
        const firstCellIndex = SchedulerDomUtils.Attr.getAppointmentFirstCellIndex(apt);
        const lastCellIndex = SchedulerDomUtils.Attr.getAppointmentLastCellIndex(apt);
        const isNotLongInterval = firstCellIndex - lastCellIndex <= 1;
        const isSnapToCellsActive = snapToCellsMode === SnapToCellsMode$1.Always
            || snapToCellsMode === SnapToCellsMode$1.Auto && isNotLongInterval;
        const startTime = isSnapToCellsActive
            ? SchedulerDomUtils.Attr.getStart(apt.firstCell)
            : SchedulerDomUtils.Attr.getStart(apt);
        const endTime = isSnapToCellsActive
            ? SchedulerDomUtils.Attr.getEnd(apt.lastCell)
            : SchedulerDomUtils.Attr.getAppointmentEnd(apt);
        return { startTime, endTime };
    }
    getCalculatedHorizontalAppointmentsInCell(cell) {
        return cell.intersects
            .filter((apt) => apt.info.calculatedTop !== undefined && !this.isEditableAppointment(apt))
            .sort((apt1, apt2) => apt1.info.calculatedTop - apt2.info.calculatedTop);
    }
    getNotCalculatedHorizontalAppointmentsInCell(cell) {
        return cell.intersects
            .filter((apt) => apt.info.calculatedTop === undefined && !this.isEditableAppointment(apt))
            .sort((apt1, apt2) => {
            const cellCountDiff = apt2.info.cellCount - apt1.info.cellCount;
            if (cellCountDiff)
                return cellCountDiff;
            return SchedulerDomUtils.Attr.getStart(apt1).valueOf() - SchedulerDomUtils.Attr.getStart(apt2).valueOf();
        });
    }
    getHorizontalCellHeight(cell) {
        let maxAptTop = -1;
        let lowestApt = null;
        cell.intersects.forEach((apt) => {
            if (apt.info.calculatedTop > maxAptTop) {
                maxAptTop = apt.info.calculatedTop;
                lowestApt = apt;
            }
        });
        return lowestApt ? maxAptTop - cell.offsetTop + lowestApt.offsetHeight : 0;
    }
    calculateHorizontalAppointmentsAndCells(scheduler, containers) {
        const resourceHeaders = this.prepareResourceHeaders(scheduler, containers);
        this.style.height = this.offsetHeight + "px";
        for (const containerIndex in containers) {
            if (!Object.prototype.hasOwnProperty.call(containers, containerIndex))
                continue;
            let maxHeight = 0;
            const cells = containers[containerIndex].cells;
            for (let cellIndex = 0, cell; cell = cells[cellIndex]; cellIndex++) {
                this.calculateHorizontalAppointmentsInCell(cell);
                const height = this.getHorizontalCellHeight(cell); // TODO - optimize - calc it before and store in cell
                if (height > maxHeight)
                    maxHeight = height;
            }
            const cell = cells[0];
            let cellHeight = maxHeight ? maxHeight + 15 : 0;
            cell.style.height = "";
            cellHeight = Math.max(cell.offsetHeight, cellHeight);
            const resourceKey = this.getElementResourceKey(cell);
            const resourceHeader = resourceHeaders[resourceKey];
            if (resourceHeader) {
                if (resourceHeader.lastContainerIndex === containerIndex)
                    cellHeight = Math.max(resourceHeader.minHeight - resourceHeader.height, cellHeight);
                resourceHeader.height += cellHeight;
            }
            cell.style.height = cellHeight + "px";
        }
        this.style.height = "";
        for (const resourceKey in resourceHeaders) {
            if (!Object.prototype.hasOwnProperty.call(resourceHeaders, resourceKey))
                continue;
            resourceHeaders[resourceKey].element.style.height = resourceHeaders[resourceKey].height + "px";
        }
    }
    initializeDateHeaders() {
        const headers = SchedulerDomUtils.getDateHeaders(this);
        const localTime = DateTimeHelper.getCurrentLocalTime();
        headers.forEach(el => {
            const startDate = SchedulerDomUtils.Attr.getStart(el);
            const endDate = SchedulerDomUtils.Attr.getEnd(el);
            if (endDate.valueOf() - startDate.valueOf() > DateTimeHelper.DaySpan)
                return;
            if (localTime.valueOf() - startDate.valueOf() >= 0 && endDate.valueOf() - localTime.valueOf() > 0)
                el.classList.add(SchedulerCssClasses.TodayClassName);
            else
                el.classList.remove(SchedulerCssClasses.TodayClassName);
        });
    }
    resetCalculationInfo() {
        for (let i = 0, apt; apt = (this.horizontalAppointments[i]); i++) {
            apt.info = {
                cellCount: apt.info.cellCount
            };
        }
    }
    addEventSubscriptions() {
        var _a, _b;
        (_a = this.timeMarkerUpdater) === null || _a === void 0 ? void 0 : _a.subscribe(this, this.updateTimeMarkersEventHandler.bind(this));
        (_b = this.scrollViewer) === null || _b === void 0 ? void 0 : _b.subscribeToScroll(this.viewportScrollViewerEventHandler.bind(this));
    }
    removeEventSubscriptions() {
        var _a, _b;
        (_a = this.timeMarkerUpdater) === null || _a === void 0 ? void 0 : _a.unsubscribe(this);
        (_b = this.scrollViewer) === null || _b === void 0 ? void 0 : _b.unsubscribeFromScroll();
    }
    updateTimeMarkersEventHandler() {
        var _a;
        this.calculateHorizontalTimeMarker(this, (_a = this.horizontalView) === null || _a === void 0 ? void 0 : _a.getFirstContainer());
    }
    calculateHorizontalTimeMarker(scheduler, container) {
        const markerImages = SchedulerDomUtils.getTimeMarkerImages(scheduler);
        const markerLine = SchedulerDomUtils.getTimeMarkerLine(scheduler);
        if (!markerImages.length || !markerLine || !container)
            return;
        const time = DateTimeHelper.getCurrentLocalTime();
        const firstCell = container.cells[0];
        const lastCell = container.cells[container.cells.length - 1];
        const startDate = SchedulerDomUtils.Attr.getStart(firstCell);
        const endDate = SchedulerDomUtils.Attr.getEnd(lastCell);
        const duration = endDate.valueOf() - startDate.valueOf();
        const remainderDuration = DateTimeHelper.dateSubsWithTimezone(time, startDate);
        const shiftShare = remainderDuration / duration;
        if (shiftShare > 0 && shiftShare < 1) {
            markerImages.forEach((img) => {
                const image = img;
                image.style.display = "unset";
            });
            markerLine.style.display = "unset";
            const left = Math.round(shiftShare * 10000) / 100;
            const markerOffset = markerLine.offsetWidth / 2;
            const imageOffset = markerImages[0].offsetWidth / 2;
            const imageLeftStyle = `calc(${left}% - ${imageOffset}px)`;
            markerImages.forEach((img) => {
                const image = img;
                image.style.left = imageLeftStyle;
            });
            markerLine.style.left = `calc(${left}% - ${markerOffset}px)`;
        }
        else {
            markerImages.forEach((img) => {
                const image = img;
                image.style.display = "none";
            });
            markerLine.style.display = "none";
        }
    }
    viewportScrollViewerEventHandler(scrollTop, scrollLeft) {
        const resourcesViewport = SchedulerDomUtils.getResourcesViewport(this);
        if (resourcesViewport)
            resourcesViewport.scrollTop = scrollTop;
        const timescaleViewport = SchedulerDomUtils.getTimescaleViewport(this);
        if (timescaleViewport)
            timescaleViewport.scrollLeft = scrollLeft;
    }
    getHorizontalViewPart() {
        if (!this.horizontalView)
            this.horizontalView = new DateTimeTableLayout(this, `.${SchedulerCssClasses.AllDayAreaClassName}, .${SchedulerCssClasses.HorizontalViewClassName} .${SchedulerCssClasses.TimeCellClassName}`);
        return this.horizontalView;
    }
    updated(changed) {
        if (changed.has("state") || changed.has("snapToCellsMode")) {
            if (this.editableAppointmentKey) {
                this.recalculateAppointments(!this.editableAppointmentKey, true);
                this.recalculateAppointments(!this.editableAppointmentKey, false);
            }
            else
                this.recalculateLayout();
            this.restoreFocusedAppointment(changed.get("editableAppointmentKey"));
        }
        super.updated(changed);
    }
    selectSameAppointments(key) {
        const parsedKey = ParsedAppointmentClientKey.from(key);
        if (parsedKey.resource === null)
            return;
        AppointmentUtils.selectSameAppointments(parsedKey, this.horizontalAppointments);
    }
    syncronizeScrollViewWithHeader() { }
}
__decorate([
    n({ attribute: ViewAttributeNames.editableAppointmentKey })
], ViewWithHorizontalAppointments.prototype, "editableAppointmentKey", void 0);
__decorate([
    n()
], ViewWithHorizontalAppointments.prototype, "state", void 0);
__decorate([
    n({ attribute: ViewAttributeNames.snapToCellsMode })
], ViewWithHorizontalAppointments.prototype, "snapToCellsMode", void 0);
__decorate([
    n()
], ViewWithHorizontalAppointments.prototype, "selectedAppointmentKey", void 0);

class TimelineView extends ViewWithHorizontalAppointments {
    constructor() {
        super();
    }
}
TimelineView.TagName = "dxbl-timeline-view";

const TIME_CELL_MARGIN_LEFT = 10;
class ViewWithVerticalAndHorizontalAppointments extends ViewWithHorizontalAppointments {
    constructor() {
        super();
        this.verticalAppointments = [];
        this.DEBUG_calculateVerticalAppointmentsCount = 0;
    }
    updateTimeMarkersEventHandler() {
        var _a;
        this.calculateVerticalTimeMarkers(this, (_a = this.verticalView) === null || _a === void 0 ? void 0 : _a.getTimeCells());
    }
    findCellByCoordinates(clientX, clientY) {
        var _a;
        const cell = (_a = this.verticalView) === null || _a === void 0 ? void 0 : _a.findCellByPos(clientX, clientY);
        if (cell)
            return this.createCellInfo(cell, AppointmentLayoutType$1.Vertical);
        return super.findCellByCoordinates(clientX, clientY);
    }
    calculateEditableAppointments() {
        super.calculateEditableAppointments();
        this.calculateVerticalAppointments(this.verticalAppointments);
    }
    initializeTimeCells() {
        var _a;
        super.initializeTimeCells();
        (_a = this.getVerticalViewPart()) === null || _a === void 0 ? void 0 : _a.clearObjects();
    }
    calculateAppointments(allowCalculateCellsHeight) {
        super.calculateAppointments(allowCalculateCellsHeight);
        this.calculateVerticalAppointments(this.verticalAppointments);
    }
    initializeAppointments(onlyEditableAppointments) {
        var _a;
        super.initializeAppointments(onlyEditableAppointments);
        this.verticalAppointments = onlyEditableAppointments ? SchedulerDomUtils.getVerticalEditableAppointments(this) : SchedulerDomUtils.getVerticalAppointments(this);
        this.prepareAppointments((_a = this.verticalView) === null || _a === void 0 ? void 0 : _a.getTimeCells(), this.verticalAppointments);
        this.appointmentInfos = this.appointmentInfos.concat(AppointmentInfo.createItems(this.verticalAppointments));
    }
    calculateVerticalAppointments(apts) {
        for (let i = 0, apt; apt = apts[i]; i++)
            this.calculateVerticalAppointment(apt);
        this.DEBUG_calculateVerticalAppointmentsCount++;
    }
    calculateVerticalAppointment(apt) {
        const firstCell = apt.firstCell;
        const cellWidth = firstCell.offsetWidth - TIME_CELL_MARGIN_LEFT;
        const width = cellWidth / SchedulerDomUtils.Attr.getAppointmentColumnsCount(apt);
        const cellHeight = firstCell.getBoundingClientRect().height;
        const startOffset = SchedulerDomUtils.Attr.getAppointmentRow(apt) - SchedulerDomUtils.Attr.getAppointmentFirstCellIndex(apt);
        const startHeight = Math.floor(cellHeight * startOffset);
        const top = firstCell.offsetTop + startHeight;
        const index = SchedulerDomUtils.Attr.getAppointmentColumn(apt);
        const left = firstCell.offsetLeft + width * index;
        const height = Math.floor(cellHeight * SchedulerDomUtils.Attr.getAppointmentRowSpan(apt)) - startHeight;
        this.updateAppointmentCompactStyle(apt, width);
        apt.style.top = `${top}px`;
        apt.style.left = `${left}px`;
        apt.style.width = `${width}px`;
        apt.style.height = `${height}px`;
        apt.style.display = "";
    }
    calculateVerticalTimeMarkers(scheduler, verticalTimeCells) {
        if (!verticalTimeCells)
            return;
        const time = DateTimeHelper.getCurrentLocalTime();
        const date = DateTimeHelper.truncToDate(time);
        const markerInfos = this.getTimeMarkerInfos(scheduler);
        if (markerInfos.length === 0)
            return;
        for (let i = 0, markerInfo; markerInfo = markerInfos[i]; i++)
            this.calculateVerticalTimeMarker(markerInfo, scheduler, verticalTimeCells, date, time);
    }
    getTimeMarkerInfos(scheduler) {
        const result = [];
        const wrappers = SchedulerDomUtils.getTimeMarkerWrappers(scheduler);
        for (let i = 0, wrapper; wrapper = wrappers[i]; i++) {
            const info = {
                wrapper: wrapper,
                timeMarker: SchedulerDomUtils.getTimeMarkerContainer(wrapper),
                timeIndicator: SchedulerDomUtils.getTimeIndicatorContainer(wrapper),
                firstContainerIndex: SchedulerDomUtils.Attr.getFirstContainerIndex(wrapper),
                lastContainerIndex: SchedulerDomUtils.Attr.getLastContainerIndex(wrapper),
                startFromContainer: i > 0
            };
            result.push(info);
        }
        return result;
    }
    calculateVerticalTimeMarker(markerInfo, scheduler, verticalTimeCells, date, time) {
        const wrapper = markerInfo.wrapper;
        const indicatorCells = this.findCellsByTime(verticalTimeCells, time, markerInfo.firstContainerIndex, markerInfo.lastContainerIndex);
        if (!indicatorCells.length) {
            // var isPastInterval = time - DomUtils.Attr.getEnd(verticalTimeCells[verticalTimeCells.length - 1]) > 0;
            // cell = isPastInterval ? verticalTimeCells[verticalTimeCells.length - 1] : verticalTimeCells[0];
            wrapper.classList.add(SchedulerCssClasses.TimeMarkerWrapperInvisibleClassName);
            return;
        }
        else
            wrapper.classList.remove(SchedulerCssClasses.TimeMarkerWrapperInvisibleClassName);
        const timeMarkerContainer = markerInfo.timeMarker;
        const timeIndicatorContainer = markerInfo.timeIndicator;
        const markerShift = timeMarkerContainer.offsetHeight / 2;
        const indicatorLeft = indicatorCells[0].offsetLeft;
        let markerLeft = 0;
        if (markerInfo.startFromContainer) {
            const firstCell = this.findFirstCellInContainer(verticalTimeCells, markerInfo.firstContainerIndex);
            if (firstCell)
                markerLeft = firstCell.offsetLeft === indicatorLeft ? indicatorLeft - markerShift : firstCell.offsetLeft;
        }
        const top = Math.floor(this.calculateTop(time, indicatorCells[0], date));
        timeMarkerContainer.style.top = (top - markerShift) + "px";
        timeMarkerContainer.style.left = markerLeft + "px";
        timeMarkerContainer.style.width = (indicatorLeft - markerLeft + markerShift) + 1 + "px";
        if (this.isElementDisplayed(wrapper)) {
            let indicatorWidth = 0;
            for (let i = 0, indicatorCell; indicatorCell = indicatorCells[i]; i++)
                indicatorWidth += indicatorCell.offsetWidth;
            timeIndicatorContainer.style.top = top - 1 + "px";
            timeIndicatorContainer.style.width = indicatorWidth + "px";
            timeIndicatorContainer.style.left = indicatorLeft + "px";
        }
    }
    findCellsByTime(verticalTimeCells, time, firstContainerIndex, lastContainerIndex) {
        const result = [];
        for (let i = 0, el; el = verticalTimeCells[i]; i++) {
            if (SchedulerDomUtils.Attr.getContainerIndex(el) < firstContainerIndex || SchedulerDomUtils.Attr.getContainerIndex(el) > lastContainerIndex)
                continue;
            if ((time.valueOf() - SchedulerDomUtils.Attr.getStart(el).valueOf()) >= 0 && SchedulerDomUtils.Attr.getEnd(el).valueOf() - time.valueOf() > 0)
                result.push(el);
        }
        return result;
    }
    getVerticalViewPart() {
        if (!this.verticalView)
            this.verticalView = new DateTimeTableLayout(this, `.${SchedulerCssClasses.VerticalViewClassName} .${SchedulerCssClasses.TimeCellClassName}`);
        return this.verticalView;
    }
    findFirstCellInContainer(verticalTimeCells, containerIndex) {
        for (let i = 0, el; el = verticalTimeCells[i]; i++) {
            if (SchedulerDomUtils.Attr.getContainerIndex(el) === containerIndex)
                return el;
        }
        return null;
    }
    isElementDisplayed(element) {
        return element && element.style.display !== "none";
    }
    calculateTop(time, currentTimeCell, startCell) {
        const adaptedContainerTime = this.getAdaptedContainerTime(startCell, time);
        const start = SchedulerDomUtils.Attr.getStart(currentTimeCell);
        const end = SchedulerDomUtils.Attr.getEnd(currentTimeCell);
        const remainderDuration = DateTimeHelper.dateSubsWithTimezone(adaptedContainerTime, start);
        return currentTimeCell.offsetTop + currentTimeCell.offsetHeight * remainderDuration / (end.valueOf() - start.valueOf());
    }
    getAdaptedContainerTime(startCell, dateTime) {
        const start = startCell; // getStart(startCell);
        const dayTimeDelta = DateTimeHelper.dateSubsWithTimezone(dateTime, start);
        const dateTimeDuration = Math.abs(dayTimeDelta);
        let dayTime = dateTimeDuration % DateTimeHelper.DaySpan;
        if (dayTimeDelta < 0)
            dayTime = DateTimeHelper.DaySpan - dayTime;
        return DateTimeHelper.dateIncreaseWithUtcOffset(start, dayTime);
    }
    selectSameAppointments(key) {
        const parsedKey = ParsedAppointmentClientKey.from(key);
        if (parsedKey.resource === null)
            return;
        super.selectSameAppointments(key);
        AppointmentUtils.selectSameAppointments(parsedKey, this.verticalAppointments);
    }
    syncronizeScrollViewWithHeader() {
        const scrollViewer = this.getScrollViewer();
        if (scrollViewer) {
            const contentContainer = scrollViewer.querySelector(`.${ScrollViewerCssClasses.ContentContainerClassName}`);
            if (contentContainer) {
                const timescaleViewport = SchedulerDomUtils.getTimescaleViewport(this);
                const scrollLeft = timescaleViewport ? timescaleViewport.scrollLeft : -1;
                if (scrollLeft > -1)
                    contentContainer.scrollTo && contentContainer.scrollTo(scrollLeft, 0);
            }
        }
    }
}

class DayView extends ViewWithVerticalAndHorizontalAppointments {
    constructor() {
        super();
    }
}
DayView.TagName = "dxbl-day-view";

class MonthView extends ViewWithHorizontalAppointments {
    constructor() {
        super();
    }
}
MonthView.TagName = "dxbl-month-view";

class SchedulerKbdStrategy extends KeyboardNavigationStrategy {
    constructor(scheduler, targetElement, isTransitContainer = false) {
        super(scheduler.getKeyboardNavigator(), targetElement, isTransitContainer);
        this.scheduler = scheduler;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    getToolbarWrapper() {
        return SchedulerDomUtils.getToolbarWrapper(this.scheduler);
    }
    getVerticalAppointmentsContainer() {
        const apptContainer = SchedulerDomUtils.getVerticalAppointmentsContainer(this.scheduler);
        return (apptContainer === null || apptContainer === void 0 ? void 0 : apptContainer.childElementCount) > 0 ? apptContainer : null;
    }
    getHorizontalAppointmentsContainer() {
        const apptContainer = SchedulerDomUtils.getHorizontalAppointmentsContainer(this.scheduler);
        return (apptContainer === null || apptContainer === void 0 ? void 0 : apptContainer.childElementCount) > 0 ? apptContainer : null;
    }
    handleTabKeyDown(evt, allowAltKey = false) {
        if (!allowAltKey && evt.altKey)
            return false;
        if (evt.shiftKey) {
            if (this.firstItemSelected)
                return false;
            this.moveToPrevItem();
        }
        else {
            if (this.lastItemSelected)
                return false;
            this.moveToNextItem();
        }
        return true;
    }
}

class SchedulerHorApptsKbdStrategy extends SchedulerKbdStrategy {
    constructor(scheduler, targetElement) {
        super(scheduler, targetElement);
        this.itemSelector = `:scope > .${SchedulerCssClasses.HorizontalAppointmentClassName}`;
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab)
            return this.handleTabKeyDown(evt);
        switch (keyCode) {
            case key.KeyCode.Enter:
            case key.KeyCode.Delete:
            case key.KeyCode.Key_n:
            case key.KeyCode.Key_r:
                this.performShortcutEvent(evt);
                return true;
        }
        return false;
    }
    handleTabKeyDown(evt) {
        if (!super.handleTabKeyDown(evt, evt.altKey))
            return false;
        return true;
    }
    getShortcutContext() {
        var _a;
        return { AppointmentKey: (_a = this.selectedItemElement.getAttributeNode("data-key")) === null || _a === void 0 ? void 0 : _a.value };
    }
    focusSelectedItem() {
        var _a;
        super.focusSelectedItem();
        (_a = this.scheduler.getView()) === null || _a === void 0 ? void 0 : _a.syncronizeScrollViewWithHeader();
    }
}

class SchedulerToolbarContainerKbdStrategy extends SchedulerKbdStrategy {
    constructor(scheduler, targetElement, rootStrategy) {
        super(scheduler, targetElement, true);
        this.rootStrategy = rootStrategy;
    }
    leaveTransitContainer(direction) {
        super.leaveTransitContainer(direction);
        this.rootStrategy.moveFromToolbar(direction);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Key_n) {
            this.performShortcutEvent(evt);
            return true;
        }
        return false;
    }
}

class SchedulerVertApptsKbdStrategy extends SchedulerKbdStrategy {
    constructor(scheduler, targetElement) {
        super(scheduler, targetElement);
        this.itemSelector = `:scope > .${SchedulerCssClasses.VerticalAppointmentClassName}`;
    }
    queryItems() {
        return this.queryItemsBySelector(this.itemSelector);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab)
            return this.handleTabKeyDown(evt);
        switch (keyCode) {
            case key.KeyCode.Enter:
            case key.KeyCode.Delete:
            case key.KeyCode.Key_n:
            case key.KeyCode.Key_r:
                this.performShortcutEvent(evt);
                return true;
        }
        return false;
    }
    handleTabKeyDown(evt) {
        if (!super.handleTabKeyDown(evt, evt.altKey))
            return false;
        return true;
    }
    getShortcutContext() {
        var _a;
        return { AppointmentKey: (_a = this.selectedItemElement.getAttributeNode("data-key")) === null || _a === void 0 ? void 0 : _a.value };
    }
}

class SchedulerRootKbdStrategy extends SchedulerKbdStrategy {
    constructor(scheduler) {
        super(scheduler, scheduler);
    }
    queryItems() {
        return new Array(this.getToolbarWrapper(), this.getHorizontalAppointmentsContainer(), this.getVerticalAppointmentsContainer());
    }
    createItemStrategy(itemElement) {
        if (itemElement === this.getToolbarWrapper())
            return new SchedulerToolbarContainerKbdStrategy(this.scheduler, itemElement, this);
        if (itemElement === this.getVerticalAppointmentsContainer())
            return new SchedulerVertApptsKbdStrategy(this.scheduler, itemElement);
        if (itemElement === this.getHorizontalAppointmentsContainer())
            return new SchedulerHorApptsKbdStrategy(this.scheduler, itemElement);
        throw new Error("Not implemented");
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab)
            return this.handleTabKeyDown(evt);
        return false;
    }
    handleTabKeyDown(evt) {
        if (!super.handleTabKeyDown(evt, evt.altKey)) {
            if (evt.shiftKey)
                this.leaveBackward();
            else
                this.leaveForward();
        }
        return true;
    }
    moveFromToolbar(direction) {
        if (direction === LeaveDirection.Backward) {
            this.leaveBackward();
            this.navigator.leaveFromNavigator();
        }
        else if (direction === LeaveDirection.Forward) {
            if (this.lastItemSelected) {
                this.leaveForward();
                this.navigator.leaveFromNavigator();
            }
            else
                this.moveToNextItem();
        }
    }
}

class SchedulerDateNavigatorKbdStrategy extends KeyboardNavigationStrategy {
    constructor(dateNavigator, targetElement) {
        super(dateNavigator.getKeyboardNavigator(), targetElement, true);
        this._dateNavigator = dateNavigator;
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    leaveTransitContainer(direction) {
        const calendar = this._dateNavigator.getCalendar();
        if (calendar) {
            const tabbableElements = Tabbable.getTabbables(calendar, false);
            if (!tabbableElements.length || direction === LeaveDirection.None)
                return;
            const focusedElement = direction === LeaveDirection.Forward ? tabbableElements[0] : tabbableElements[tabbableElements.length - 1];
            focusedElement.focus();
        }
    }
}

class DxDateNavigator extends SingleSlotElementBase {
    getKeyboardNavigator() {
        return this._keyboardNavigator;
    }
    getCalendar() {
        return this.querySelector(calendarTagName);
    }
    contentChanged() {
        super.contentChanged();
        this.initializeKeyboardNavigator();
    }
    initializeKeyboardNavigator() {
        this._keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new SchedulerDateNavigatorKbdStrategy(this, this));
    }
}
DxDateNavigator.TagName = "dxbl-date-navigator";

class SchedulerResourceNavigatorKbdStrategy extends KeyboardNavigationStrategy {
    constructor(resourceNavigator, targetElement) {
        super(resourceNavigator.getKeyboardNavigator(), targetElement);
        this._resourceNavigator = resourceNavigator;
    }
    queryItems() {
        return new Array(this._resourceNavigator.getSearchBox(), this._resourceNavigator.getSelectAllCheckBox(), this._resourceNavigator.getResourceListBoxContainer(), this._resourceNavigator.getOkButton(), this._resourceNavigator.getCancelButton());
    }
    createItemStrategy(itemElement) {
        if (itemElement.matches(this._resourceNavigator.getResourceListBoxContainerSelector()))
            return new ContainerKdbStrategy(this._resourceNavigator.getKeyboardNavigator(), itemElement, this);
        return null;
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode === key.KeyCode.Tab) {
            if (evt.shiftKey)
                this.moveToPrevItem(true);
            else
                this.moveToNextItem(true);
            return true;
        }
        return super.handleKeyDown(evt);
    }
    canSwitchToNestedContentMode() {
        return true;
    }
    moveForward() {
        this.moveToNextItem(true);
    }
    moveBackward() {
        super.moveToPrevItem(true);
    }
}
class ContainerKdbStrategy extends KeyboardNavigationStrategy {
    constructor(navigator, targetElement, rootStrategy) {
        super(navigator, targetElement, true);
        this._rootStrategy = rootStrategy;
    }
    leaveTransitContainer(direction) {
        super.leaveTransitContainer(direction);
        if (direction === LeaveDirection.Forward)
            this._rootStrategy.moveForward();
        else if (direction === LeaveDirection.Backward)
            this._rootStrategy.moveBackward();
    }
    canSwitchToNestedContentMode() {
        return true;
    }
}

class DxResourceNavigator extends SingleSlotElementBase {
    getKeyboardNavigator() {
        return this._keyboardNavigator;
    }
    getSearchBox() {
        return this.querySelector(`.${SchedulerCssClasses.ResourceNavigatorSearchBox} > input`);
    }
    getSelectAllCheckBox() {
        return this.querySelector(`.${SchedulerCssClasses.ResourceNavigatorSelectAllContainer} > ${DxCheckBoxTagName} input`);
    }
    getResourceListBoxContainerSelector() {
        return `.${SchedulerCssClasses.ResourceNavigatorListBoxContainer}`;
    }
    getResourceListBoxContainer() {
        return this.querySelector(this.getResourceListBoxContainerSelector());
    }
    getOkButton() {
        return this.querySelector(`.${SchedulerCssClasses.ResourceNavigatorFooter} button:first-child`);
    }
    getCancelButton() {
        return this.querySelector(`.${SchedulerCssClasses.ResourceNavigatorFooter} button:last-child`);
    }
    contentChanged() {
        super.contentChanged();
        this.initializeKeyboardNavigator();
    }
    initializeKeyboardNavigator() {
        this._keyboardNavigator = this.querySelector(DxKeyboardNavigatorTagName);
        if (this._keyboardNavigator && !this._keyboardNavigator.initialized)
            this._keyboardNavigator.initialize(this, new SchedulerResourceNavigatorKbdStrategy(this, this));
    }
}
DxResourceNavigator.TagName = "dxbl-resource-navigator";

class DxScheduler extends DxHTMLElementBase {
    constructor() {
        super();
        this.onClickEventHandler = this.onDelayedClickEvent.bind(this);
        this.onDoubleClickEventHandler = this.onDoubleClickEvent.bind(this);
        this.onDragStartEventHandler = this.onDragStartEvent.bind(this);
        this.onDragStopEventHandler = this.onDragStopEvent.bind(this);
        this.onDragCancelEventHandler = this.onDragCancelEvent.bind(this);
        this.unforcedFunctions = {};
        this.appointmentDragController = new AppointmentDragController(this);
        this.allowCreateAppointment = false;
        this.allowEditAppointment = false;
        this.allowDragAppointment = false;
        this.allowResizeAppointment = false;
        this.enableAppointmentTooltip = false;
        this.activeFormType = FormType$1.None;
        this.clientUtcOffset = 0;
        this.handlePointerEventsMode = HandlePointerEventsMode.Click | HandlePointerEventsMode.DblClick | HandlePointerEventsMode.Dragging;
    }
    initializeComponent() {
        super.initializeComponent();
        this.uiHandlersBridge = this.querySelector(DxUIHandlersBridgeTagName);
        this.addEventSubscriptions();
        this.initializeKeyboardNavigator();
    }
    disposeComponent() {
        delete this.uiHandlersBridge;
        this.removeEventSubscriptions();
        super.disposeComponent();
    }
    getView() {
        return this.querySelector(`.${SchedulerCssClasses.View}`);
    }
    getKeyboardNavigator() {
        return this.keyboardNavigator;
    }
    adjustControl(_, oldSize) {
        var _a;
        (_a = this.getView()) === null || _a === void 0 ? void 0 : _a.adjust();
    }
    addEventSubscriptions() {
        this.addEventListener(PointerClickEvent.eventName, this.onClickEventHandler);
        this.addEventListener(PointerDblClickEvent.eventName, this.onDoubleClickEventHandler);
        this.addEventListener(PointerDragStartEvent.eventName, this.onDragStartEventHandler);
        this.addEventListener(PointerDragStopEvent.eventName, this.onDragStopEventHandler);
        this.addEventListener(PointerDragCancelEvent.eventName, this.onDragCancelEventHandler);
        this.elementContentSizeSubscription = subscribeElementContentSize(this, this.adjustControl.bind(this));
    }
    removeEventSubscriptions() {
        this.removeEventListener(PointerClickEvent.eventName, this.onClickEventHandler);
        this.removeEventListener(PointerDblClickEvent.eventName, this.onDoubleClickEventHandler);
        this.removeEventListener(PointerDragStartEvent.eventName, this.onDragStartEventHandler);
        this.removeEventListener(PointerDragStopEvent.eventName, this.onDragStopEventHandler);
        this.removeEventListener(PointerDragCancelEvent.eventName, this.onDragCancelEventHandler);
        if (this.elementContentSizeSubscription)
            unsubscribeElement(this.elementContentSizeSubscription);
    }
    initializeKeyboardNavigator() {
        this.keyboardNavigator = this.querySelector(`:scope > ${DxKeyboardNavigatorTagName}`);
        if (this.keyboardNavigator && !this.keyboardNavigator.initialized)
            this.keyboardNavigator.initialize(this, new SchedulerRootKbdStrategy(this));
    }
    onClickEvent(evt) {
        var _a, _b, _c, _d, _e;
        const srcElement = evt.detail.source.target;
        const apt = SchedulerDomUtils.getAppointmentContainer(srcElement);
        const editableAppointmentKey = (_a = this.getView()) === null || _a === void 0 ? void 0 : _a.getEditableAppointmentKey();
        const selectedAppointmentKey = (_b = this.getView()) === null || _b === void 0 ? void 0 : _b.getSelectedAppointmentKey();
        const appointmentKey = apt ? SchedulerDomUtils.Attr.getAppointmentKey(apt) : null;
        if (editableAppointmentKey && (!apt || editableAppointmentKey !== appointmentKey)) {
            (_c = this.uiHandlersBridge) === null || _c === void 0 ? void 0 : _c.send(SchedulerUIEventNames.HideAppointmentToolTip, { outsideClick: false });
            return;
        }
        if (apt) {
            if (selectedAppointmentKey !== appointmentKey)
                this.selectAppointment(apt);
            if (this.enableAppointmentTooltip && editableAppointmentKey !== appointmentKey)
                (_d = this.uiHandlersBridge) === null || _d === void 0 ? void 0 : _d.send(SchedulerUIEventNames.ShowAppointmentToolTip, "");
            evt.stopPropagation();
        }
        else if (this.activeFormType === FormType$1.None) {
            const timeCell = SchedulerDomUtils.getTimeCellContainer(srcElement);
            if (this.allowCreateAppointment && timeCell) {
                this.createAppointmentByTimeCell(timeCell);
                evt.stopPropagation();
            }
        }
        else
            (_e = this.uiHandlersBridge) === null || _e === void 0 ? void 0 : _e.send(SchedulerUIEventNames.HideAppointmentToolTip, { outsideClick: false });
    }
    onDelayedClickEvent(evt) {
        this.unforcedFunctionCall(this.onClickEvent.bind(this, evt), "ClickEvent", 200, true);
    }
    onDoubleClickEvent(evt) {
        var _a;
        const srcElement = evt.detail.source.target;
        const apt = SchedulerDomUtils.getAppointmentContainer(srcElement);
        const view = this.getView();
        if (apt && view && view.getEditableAppointmentKey() !== SchedulerDomUtils.Attr.getAppointmentKey(apt)) {
            const selectedAppointmentKey = (_a = this.getView()) === null || _a === void 0 ? void 0 : _a.getSelectedAppointmentKey();
            const appointmentKey = SchedulerDomUtils.Attr.getAppointmentKey(apt);
            if (selectedAppointmentKey !== appointmentKey)
                this.selectAppointment(apt);
            this.clearUnforcedFunctionByKey("ClickEvent");
        }
    }
    onDragStartEvent(evt) {
        var _a, _b;
        const srcElement = evt.detail.source.target;
        if (!srcElement || ((_a = this.getView()) === null || _a === void 0 ? void 0 : _a.getEditableAppointmentKey()))
            return;
        const cellInfo = (_b = this.getView()) === null || _b === void 0 ? void 0 : _b.findCellByCoordinates(evt.detail.source.clientX, evt.detail.source.clientY);
        if (!cellInfo)
            return;
        const apt = SchedulerDomUtils.getAppointmentContainer(srcElement);
        if (apt) {
            const appointmentInfo = this.getAppointmentInfo(SchedulerDomUtils.Attr.getAppointmentKey(apt));
            if (this.allowEditAppointment && appointmentInfo) {
                if (this.allowResizeAppointment
                    && (SchedulerDomUtils.isTopHandleElement(srcElement) || SchedulerDomUtils.isLeftHandleElement(srcElement)))
                    this.appointmentDragController.dragAppointmentStart(appointmentInfo, cellInfo, evt.detail.source);
                else if (this.allowResizeAppointment
                    && (SchedulerDomUtils.isBottomHandleElement(srcElement) || SchedulerDomUtils.isRightHandleElement(srcElement)))
                    this.appointmentDragController.dragAppointmentEnd(appointmentInfo, cellInfo, evt.detail.source);
                else if (this.allowDragAppointment)
                    this.appointmentDragController.dragAppointment(appointmentInfo, cellInfo, evt.detail.source);
            }
        }
        else if (this.allowCreateAppointment && this.allowResizeAppointment)
            this.appointmentDragController.dragNewAppointment(cellInfo);
        evt.stopPropagation();
    }
    onDragStopEvent(evt) {
        this.appointmentDragController.dropAppointment();
        evt.stopPropagation();
    }
    onDragCancelEvent(evt) {
        this.appointmentDragController.cancelDragAppointment();
        evt.stopPropagation();
    }
    selectAppointment(apt) {
        var _a, _b;
        if (!apt)
            return;
        dom.DomUtils.addClassName(apt, SchedulerCssClasses.TargetAppointmentClassName);
        dom.DomUtils.addClassName(apt, SchedulerCssClasses.SelectedAppointmentClassName);
        const key = SchedulerDomUtils.Attr.getAppointmentKey(apt);
        (_a = this.getView()) === null || _a === void 0 ? void 0 : _a.selectSameAppointments(key);
        (_b = this.uiHandlersBridge) === null || _b === void 0 ? void 0 : _b.send(SchedulerUIEventNames.SelectAppointment, {
            key: SchedulerDomUtils.Attr.getAppointmentKey(apt)
        });
    }
    createAppointmentByTimeCell(el) {
        var _a;
        const start = SchedulerDomUtils.Attr.getStart(el);
        const end = SchedulerDomUtils.Attr.getEnd(el);
        const utcOffsetStart = this.getUtcOffset(start, SchedulerDomUtils.Attr.getUtcOffset(el));
        const utcOffsetEnd = this.getUtcOffset(end, SchedulerDomUtils.Attr.getUtcOffset(el));
        (_a = this.uiHandlersBridge) === null || _a === void 0 ? void 0 : _a.send(SchedulerUIEventNames.CreateAppointment, {
            appointmentInfo: {
                start: DateTimeHelper.addTimeSpan(start, utcOffsetStart),
                end: DateTimeHelper.addTimeSpan(end, utcOffsetEnd),
                isAllDay: SchedulerDomUtils.Attr.getAllDay(el),
                resourceKey: SchedulerDomUtils.Attr.getResourceKey(el)
            }
        });
    }
    getSelectedAppointmentInfo() {
        const apt = SchedulerDomUtils.getSelectedAppointment(this);
        return apt ? this.getAppointmentInfo(SchedulerDomUtils.Attr.getAppointmentKey(apt)) : null;
    }
    getAppointmentInfo(id) {
        const view = this.getView();
        return !view ? null : view.appointmentInfos.filter((apt) => {
            return apt.id === id;
        })[0];
    }
    getEditableAppointments() {
        return SchedulerDomUtils.getEditableAppointments(this);
    }
    getUtcOffset(value, cellUtcOffset) {
        return DateTimeHelper.getUtcTimezoneOffset(value) + cellUtcOffset * (-1);
    }
    static get observedAttributes() {
        return [
            "allow-create-appointment",
            "allow-edit-appointment",
            "allow-drag-appointment",
            "allow-resize-appointment",
            "enable-appointment-tooltip",
            "active-form-type",
            "client-utc-offset"
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "allow-create-appointment":
                this.allowCreateAppointment = newVal !== null;
                break;
            case "allow-edit-appointment":
                this.allowEditAppointment = newVal !== null;
                break;
            case "allow-drag-appointment":
                this.allowDragAppointment = newVal !== null;
                break;
            case "allow-resize-appointment":
                this.allowResizeAppointment = newVal !== null;
                break;
            case "enable-appointment-tooltip":
                this.enableAppointmentTooltip = newVal !== null;
                break;
            case "active-form-type":
                this.activeFormType = parseInt(newVal);
                break;
            case "client-utc-offset":
                this.clientUtcOffset = parseInt(newVal);
                break;
        }
    }
    unforcedFunctionCall(func, key, timeout, resetTimer) {
        if (resetTimer && this.hasUnforcedFunction(key))
            this.clearUnforcedFunctionByKey(key);
        if (this.unforcedFunctions[key] === undefined) {
            this.unforcedFunctions[key] = setTimeout(() => {
                func();
                delete this.unforcedFunctions[key];
            }, timeout);
        }
    }
    hasUnforcedFunction(key) {
        return !!this.unforcedFunctions[key];
    }
    clearUnforcedFunctionByKey(key) {
        clearTimeout(this.unforcedFunctions[key]);
        delete this.unforcedFunctions[key];
    }
}
DxScheduler.TagName = "dxbl-scheduler";
customElements.define(DxScheduler.TagName, DxScheduler);
customElements.define(DxAppointmentTooltip.TagName, DxAppointmentTooltip);
customElements.define(DayView.TagName, DayView);
customElements.define(MonthView.TagName, MonthView);
customElements.define(TimelineView.TagName, TimelineView);
customElements.define(DxDateNavigator.TagName, DxDateNavigator);
customElements.define(DxResourceNavigator.TagName, DxResourceNavigator);
function loadModule() { }
const scheduler = { loadModule };

export { DxScheduler, scheduler as default };
//# sourceMappingURL=scheduler-24.2.js.map
