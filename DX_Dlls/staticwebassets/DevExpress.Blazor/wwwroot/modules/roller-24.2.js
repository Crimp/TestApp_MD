import { k as key } from './key-24.2.js';
import { R as RequestAnimationFrame, b as getParentByClassName } from './dom-utils-24.2.js';
import { E as Emitter, S as Subject, a as Subscription } from './observables-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { a as DxKeyboardNavigatorTagName, K as KeyboardNavigationStrategy } from './keyboard-navigation-strategy-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './dom-24.2.js';
import './tslib.es6-24.2.js';
import './focushelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './constants-24.2.js';
import './custom-events-helper-24.2.js';
import './eventhelper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './devices-24.2.js';

// decelerating to zero velocity
function easeOutQuad(t) {
    return t * (2 - t);
}

function sign(value) {
    return value / Math.abs(value);
}
function fromEvent(element, eventName, mapFunc) {
    const emitter = new Emitter();
    element.addEventListener(eventName, (e) => {
        e.preventDefault();
        const receivedValue = mapFunc(e);
        if (receivedValue !== 0 && !isNaN(receivedValue))
            emitter.emit({ value: receivedValue, timeStamp: e.timeStamp });
    }, { capture: false, passive: false });
    return emitter;
}
function throttle(sourceEmitter, duration) {
    const emitter = new Emitter();
    let silentBeforeTimeStamp = 0;
    let lastValueSign = 1;
    sourceEmitter.subscribe((eventObj) => {
        if (silentBeforeTimeStamp === 0 || eventObj.timeStamp >= silentBeforeTimeStamp || sign(eventObj.value) !== lastValueSign) {
            silentBeforeTimeStamp = eventObj.timeStamp + duration;
            lastValueSign = sign(eventObj.value);
            emitter.emit(eventObj);
        }
    });
    return emitter;
}
function easingDecomposer(value, start, duration, easingFunc, done) {
    const end = start + duration;
    let streamed = 0;
    return (timestamp, continuation) => {
        if (continuation)
            return continuation(value - streamed, timestamp, easingFunc(timestamp / end));
        if (timestamp < start)
            return null;
        if (timestamp >= end && done)
            done();
        const delta = (value * easingFunc((Math.min(timestamp, end) - start) / duration) - streamed);
        streamed += delta;
        return delta;
    };
}
function easingStream(emitter, duration, easingFunc, beginCallback) {
    let decomposer = null;
    const next = (timestamp) => {
        return decomposer ? decomposer(timestamp, null) : 0;
    };
    const reset = () => { decomposer = null; };
    const create = (value, remain, timestamp) => {
        decomposer = easingDecomposer(remain + value, timestamp, duration, easingFunc, reset);
    };
    const handleInput = (eventObj) => {
        if (decomposer === null) {
            create(eventObj.value, 0, eventObj.timeStamp);
            beginCallback(next);
        }
        else
            decomposer(eventObj.timeStamp, (remainValue, t) => create(eventObj.value, remainValue, t));
    };
    emitter.subscribe(handleInput);
    return () => {
        decomposer = null;
        emitter.unsubscribe(handleInput);
    };
}
function wheelEventSource(element, rowHeight, easingFunc, applyStepCallback, completePromiseReceiver) {
    const animationFrameDuration = 300;
    const eventEmitter = fromEvent(element, "wheel", (e) => sign(e.deltaY) * rowHeight);
    const throttledEmitter = throttle(eventEmitter, 30);
    function iterateValues(valueIterator, onCompleted) {
        // eslint-disable-next-line new-cap
        RequestAnimationFrame((timeStamp) => {
            const delta = valueIterator(timeStamp);
            if (delta !== 0) {
                if (delta !== null)
                    applyStepCallback(delta);
                iterateValues(valueIterator, onCompleted);
            }
            else
                onCompleted();
        });
    }
    function initializeCompletePromise(valueIterator) {
        completePromiseReceiver(new Promise((resolve, _) => {
            iterateValues(valueIterator, resolve);
        }));
    }
    easingStream(throttledEmitter, animationFrameDuration, easingFunc, initializeCompletePromise);
}

class RollerCssClasses {
}
RollerCssClasses.Roller = CssClasses.Prefix + "-roller";
RollerCssClasses.RollerContainer = RollerCssClasses.Roller + "-container";
RollerCssClasses.RollerTitle = RollerCssClasses.Roller + "-title";
RollerCssClasses.RollerItem = RollerCssClasses.Roller + "-item";
RollerCssClasses.RollerAfter = RollerCssClasses.Roller + "-after";
RollerCssClasses.RollerExpander = RollerCssClasses.Roller + "-expander";
RollerCssClasses.RollerFooter = CssClasses.Prefix + "-rollers-footer";
class RollerInitializedEvent extends Event {
    constructor() {
        super(RollerInitializedEvent.eventName, {
            bubbles: true,
            composed: false,
            cancelable: true
        });
    }
}
RollerInitializedEvent.eventName = "dxrollerinitialized";
function getVisibleSibling(rollerItem, allowHidden, getter) {
    const prevItem = getter(rollerItem);
    if (!prevItem)
        return null;
    if (!allowHidden && !prevItem.visible.value)
        return getVisibleSibling(prevItem, allowHidden, getter);
    return prevItem;
}
function getGeneratedSibling(rollerGeneratedItem, deltaSign) {
    const cacheKey = deltaSign === -1 ? "prevItem" : "nextItem";
    if (!rollerGeneratedItem[cacheKey]) {
        return rollerGeneratedItem[cacheKey] = ((collection) => {
            const value = rollerGeneratedItem.value + deltaSign * collection.delta;
            if (deltaSign === -1 && collection.min !== -1 && value < collection.min)
                return collection.needLoop ? new RollerGeneratedItem(collection, collection.max, false, null, rollerGeneratedItem) : null;
            if (deltaSign === +1 && collection.max !== -1 && value > collection.max)
                return collection.needLoop ? new RollerGeneratedItem(collection, collection.min, false, rollerGeneratedItem, null) : null;
            return new RollerGeneratedItem(collection, value, false, null, null);
        })(rollerGeneratedItem.collection);
    }
    else
        return rollerGeneratedItem[cacheKey];
}
class RollerItem {
    constructor(collection, value, visible, isSelected, prevItem, nextItem) {
        this._collection = collection;
        this.prevItem = prevItem;
        this.nextItem = nextItem;
        this.value = value;
        this.visible = visible || new Subject(true);
        this.selected = new Subject(!!isSelected);
        if (prevItem)
            prevItem.nextItem = this;
        if (nextItem)
            nextItem.prevItem = this;
        this.displayText = new Subject(value);
        const collectionSelection = this.collection.selectedItem;
        this.selected.subscribe((s) => {
            if (s) {
                if (collectionSelection.value)
                    collectionSelection.value.selected.update(false);
                collectionSelection.update(this);
            }
        });
        this.visible.subscribe((v) => {
            if (!v && this.selected.value) {
                const previous = this.getPrevious(false);
                previous && previous.selected.update(true);
            }
            this.collection.visibleItemsChanged.emit(null);
        }, true);
    }
    get collection() {
        return this._collection;
    }
    getPrevious(allowHidden) {
        return getVisibleSibling(this, allowHidden, (item) => item.prevItem);
    }
    getNext(allowHidden) {
        return getVisibleSibling(this, allowHidden, (item) => item.nextItem);
    }
    getDisplayText() {
        return this.displayText.value || this.value;
    }
}
class RollerGeneratedItem extends RollerItem {
    constructor(collection, value, isSelected, prevItem, nextItem) {
        super(collection, value, null, isSelected, prevItem, nextItem);
    }
    get collection() {
        return this._collection;
    }
    getPrevious(_) {
        return getGeneratedSibling(this, -1);
    }
    getNext(_) {
        return getGeneratedSibling(this, +1);
    }
}
class RollerOriginGeneratedItem extends RollerGeneratedItem {
    constructor(collection, value) {
        super(collection, value, true, null, null);
    }
}
class RollerItemCollection {
    constructor(needLoop = true) {
        this.needLoop = needLoop;
        this.items = [];
        this.selectedItem = new Subject(null);
        this.visibleItemsChanged = new Emitter();
    }
    static createCollection(selectedValue, names, needLoop = true) {
        const result = new RollerItemCollection(needLoop);
        for (let i = 0; i < names.length; i++)
            result.add(i + 1, null, i + 1 === selectedValue).displayText.value = names[i];
        result.initialize(selectedValue);
        return result;
    }
    static createGenerator(selectedValue, min, max, delta, needLoop = true) {
        const result = new RollerItemGenerator(min, max, delta, needLoop);
        result.initialize(selectedValue);
        return result;
    }
    initialize(value) {
        this.items.filter((i) => i.value === value)[0].selected.update(true);
        if (this.needLoop) {
            this.items[0].prevItem = this.items[this.items.length - 1];
            this.items[this.items.length - 1].nextItem = this.items[0];
        }
    }
    add(value, visible, selected) {
        const result = new RollerItem(this, value, visible, selected, this.items[this.items.length - 1], null);
        this.items.push(result);
        return result;
    }
}
class RollerItemGenerator extends RollerItemCollection {
    constructor(min, max, delta, needLoop) {
        super(needLoop);
        this.min = min;
        this.max = max;
        this.delta = delta;
        this.originItem = null;
    }
    initialize(value) {
        this.originItem = new RollerOriginGeneratedItem(this, value);
    }
}
class RollerItemContainer {
    constructor(dataItem, index, roller, height, prevItem) {
        this.dataItem = null;
        this.displayTextSubscription = this.displayTextSubscription.bind(this);
        this.roller = roller;
        this.prevItem = prevItem;
        this.nextItem = null;
        this.index = index;
        this.elements = roller.createRollerItemElements();
        this.offset = index * height;
        this.height = height;
        this.position = 0;
        this.visibleItemCount = roller.visibleItemCount;
        if (prevItem)
            prevItem.nextItem = this;
        this.updateDataItem(dataItem);
        this.selectItem = this.selectItem.bind(this);
    }
    initialize(frameContainer) {
        const selectedItemIndex = Math.floor(this.visibleItemCount / 2);
        const top = (this.index - selectedItemIndex) * this.height;
        this.elements[1].style.top = top + "px";
        frameContainer.appendChild(this.elements[1]);
        this.move(this.offset);
        this.elements[0].addEventListener("click", () => {
            // eslint-disable-next-line new-cap
            RequestAnimationFrame(this.selectItem);
        });
    }
    isSelected() {
        const selectedItemIndex = Math.floor(this.visibleItemCount / 2);
        return selectedItemIndex * this.height === Math.round(this.position);
    }
    selectItem(timestamp) {
        if (!this.dataItem)
            return Promise.resolve();
        const selectedItemIndex = Math.floor(this.visibleItemCount / 2);
        const baseOffset = (selectedItemIndex - this.index) * this.height;
        const realOffset = baseOffset - (this.position - this.offset);
        return this.roller.afterMove(animateValueContiniusChange(Subscription.Empty, (d) => this.roller.move(d), {
            divisor: this.roller.itemSize.height,
            startTimestamp: timestamp,
            endTimestamp: timestamp + 300,
            easing: easeOutQuad,
            frameCallback: RequestAnimationFrame,
            value: realOffset
        }));
    }
    move(offset) {
        this.updatePosition(offset);
        const transformOffset = this.position - this.offset;
        this.elements.forEach(element => element.style.transform = "matrix(1, 0, 0, 1, 0, " + transformOffset + ")");
    }
    updatePosition(pos) {
        this.position += pos;
        if (this.position > this.visibleItemCount * this.height) {
            this.position -= (this.visibleItemCount + 1) * this.height; // assign prev value for limited lists
            this.updateDataItem(this.nextItem && this.nextItem.dataItem ? this.nextItem.dataItem.getPrevious(false) : null);
        }
        else if (this.position < (-1 * this.height)) {
            this.position += (this.visibleItemCount + 1) * this.height; // assign next value for limited lists
            this.updateDataItem(this.prevItem.dataItem ? this.prevItem.dataItem.getNext(false) : null);
        }
    }
    updateDataItem(dataItem) {
        if (this.dataItem !== dataItem) {
            if (this.dataItem)
                this.dataItem.displayText.unsubscribe(this.displayTextSubscription);
            this.dataItem = dataItem;
            if (this.dataItem)
                this.dataItem.displayText.subscribe(this.displayTextSubscription);
            else
                this.displayTextSubscription("");
        }
    }
    displayTextSubscription(displayText) {
        this.elements.forEach(element => updateRollerItemElementText(element, displayText));
    }
    raiseChanges() {
        if (this.isSelected() && this.dataItem)
            this.dataItem.selected.update(true);
    }
}
function updateRollerItemElementText(element, displayText) {
    element.innerText = displayText;
}
function getVisualRange(current, itemHeight, nextContainerGetter) {
    const nextContainer = nextContainerGetter(current);
    return nextContainer && Math.abs(Math.round(nextContainer.position - current.position)) === itemHeight ? [nextContainer].concat(getVisualRange(nextContainer, itemHeight, nextContainerGetter)) : [];
}
function updateDataItems(containers, dataItem, nextItemGetter) {
    if (containers.length === 0)
        return;
    containers.shift().updateDataItem(dataItem);
    updateDataItems(containers, nextItemGetter(dataItem), nextItemGetter);
}
class Roller {
    constructor(itemCollection, visibleItemCount, container, itemSize, caption, longestVisibleDisplayText) {
        this.itemCollection = itemCollection;
        this.visibleItemCount = visibleItemCount;
        this.itemContainers = [];
        this.itemSize = itemSize;
        this.caption = caption;
        this.longestVisibleDisplayText = longestVisibleDisplayText;
        this.needLoop = itemCollection.needLoop;
        this.container = container;
        this.rollerElement = null;
        this.rollerContainer = null;
        this.move = this.move.bind(this);
        this.moveReversed = this.moveReversed.bind(this);
        this.afterMove = this.afterMove.bind(this);
    }
    initialize() {
        this.initializeRollerElements();
        const visibleRange = [this.itemCollection.selectedItem.value];
        while (visibleRange.length < this.visibleItemCount) {
            visibleRange.splice(0, 0, visibleRange[0] ? visibleRange[0].getPrevious(false) : null);
            visibleRange.push(visibleRange[visibleRange.length - 1] ? visibleRange[visibleRange.length - 1].getNext(false) : null);
        }
        visibleRange.push(visibleRange[visibleRange.length - 1] ? visibleRange[visibleRange.length - 1].getNext(false) : null);
        for (let i = 0; i < visibleRange.length; i++)
            this.itemContainers.push(new RollerItemContainer(visibleRange[i], i, this, this.itemSize.height, this.itemContainers[this.itemContainers.length - 1]));
        if (this.longestVisibleDisplayText)
            updateRollerItemElementText(this.createRollerItemElement(RollerCssClasses.RollerItem + " " + RollerCssClasses.RollerExpander), this.longestVisibleDisplayText);
        const dublicateContainer = this.createRollerItemElement(RollerCssClasses.RollerAfter);
        this.itemContainers[0].prevItem = this.itemContainers[this.itemContainers.length - 1];
        this.itemContainers[this.itemContainers.length - 1].nextItem = this.itemContainers[0];
        for (let i = 0; i < this.itemContainers.length; i++)
            this.itemContainers[i].initialize(dublicateContainer);
        this.itemCollection.selectedItem.subscribe(() => this.updateVisibleDataItems(), true);
        this.itemCollection.visibleItemsChanged.subscribe(() => this.updateVisibleDataItems());
        attachScroll(this.rollerElement, this.itemSize.height, this.moveReversed, this.afterMove);
        attachVerticalSwipe(this.rollerElement, this.itemSize.height, this.move, this.afterMove);
        this.rollerContainer && this.rollerContainer.addEventListener("keydown", (e) => {
            let elementToSelect = null;
            if (e.keyCode === key.KeyCode.Up)
                elementToSelect = this.itemCollection.selectedItem.value.getPrevious();
            else if (e.keyCode === key.KeyCode.Down)
                elementToSelect = this.itemCollection.selectedItem.value.getNext();
            if (elementToSelect) {
                e.preventDefault();
                elementToSelect.selected.update(true);
            }
        });
    }
    initializeRollerElements() {
        const rollerContainer = this.rollerContainer = document.createElement("SPAN");
        rollerContainer.className = RollerCssClasses.RollerContainer;
        rollerContainer.style.minWidth = this.itemSize.width.toString();
        const rollerCaption = document.createElement("SPAN");
        rollerCaption.innerText = this.caption;
        rollerCaption.className = RollerCssClasses.RollerTitle;
        rollerContainer.appendChild(rollerCaption);
        const roller = this.rollerElement = document.createElement("DIV");
        roller.className = RollerCssClasses.Roller;
        roller.tabIndex = -1;
        roller.style.height = this.itemSize.height * this.visibleItemCount + "px";
        rollerContainer.appendChild(roller);
        if (this.container)
            this.container.appendChild(rollerContainer);
    }
    updateVisibleDataItems() {
        const selectedItemContainer = this.itemContainers.filter(c => c.isSelected())[0];
        if (!selectedItemContainer)
            return;
        const prevContainers = getVisualRange(selectedItemContainer, this.itemSize.height, c => c.prevItem);
        const nextContainers = getVisualRange(selectedItemContainer, this.itemSize.height, c => c.nextItem);
        const selectedDataItem = this.itemCollection.selectedItem.value;
        selectedItemContainer.updateDataItem(selectedDataItem);
        updateDataItems(prevContainers.concat([]), selectedDataItem.getPrevious(), (i) => i ? i.getPrevious(false) : null);
        updateDataItems(nextContainers.concat([]), selectedDataItem.getNext(), (i) => i ? i.getNext(false) : null);
    }
    createRollerItemElement(customCssClass) {
        const element = document.createElement("SPAN");
        element.className = customCssClass || RollerCssClasses.RollerItem;
        if (this.rollerElement)
            this.rollerElement.appendChild(element);
        return element;
    }
    createRollerItemElements() {
        const el = this.createRollerItemElement(null);
        return [el, el.cloneNode()];
    }
    moveReversed(pos) {
        this.move(0 - pos);
    }
    move(pos) {
        if (pos === 0)
            return;
        const delta = Math.sign(pos);
        const maxIndex = this.itemContainers.length - 1;
        const startIndex = delta === -1 ? maxIndex : 0;
        const endIndex = (delta === -1 ? 0 : maxIndex) + delta;
        if (!this.needLoop) {
            if (delta === 1) {
                const selectedItemStartPos = Math.floor(this.visibleItemCount / 2) * this.itemSize.height;
                for (let i = startIndex; i !== endIndex; i += delta) {
                    if (!this.itemContainers[i].dataItem &&
                        this.itemContainers[i].position + this.itemSize.height - selectedItemStartPos <= 0 &&
                        this.itemContainers[i].position + this.itemSize.height + pos - selectedItemStartPos > 0)
                        pos = Math.min(selectedItemStartPos - (this.itemContainers[i].position + this.itemSize.height), pos);
                }
            }
            else {
                const selectedItemEndPos = (Math.floor(this.visibleItemCount / 2) + 1) * this.itemSize.height;
                for (let i = startIndex; i !== endIndex; i += delta) {
                    if (!this.itemContainers[i].dataItem &&
                        this.itemContainers[i].position - selectedItemEndPos >= 0 &&
                        this.itemContainers[i].position + pos - selectedItemEndPos < 0)
                        pos = Math.max(selectedItemEndPos - this.itemContainers[i].position, pos);
                }
            }
            if (pos === 0)
                return;
        }
        for (let i = startIndex; i !== endIndex; i += delta)
            this.itemContainers[i].move(pos);
    }
    afterMove(moveCompleted) {
        return moveCompleted.then(() => Promise.resolve(this.itemContainers.forEach(i => i.raiseChanges())));
    }
}
function animateValueContiniusChange(inputEmitter, handler, settings) {
    return new Promise((resolve, reject) => {
        function processExternalInput() {
            inputEmitter.unsubscribe(processExternalInput);
            reject();
        }
        inputEmitter.subscribe(processExternalInput);
        let animatedValue = 0;
        const frameCallback = settings.frameCallback;
        const animate = (timestamp) => {
            if (timestamp < settings.endTimestamp) {
                const coef = settings.easing((timestamp - settings.startTimestamp) / (settings.endTimestamp - settings.startTimestamp));
                const value = settings.value * coef - animatedValue;
                handler(value);
                animatedValue += value;
                frameCallback(animate);
            }
            else {
                inputEmitter.unsubscribe(processExternalInput);
                handler(settings.value - animatedValue);
                resolve();
            }
        };
        frameCallback(animate);
    });
}
function attachInputSource(inputEmitter, inputFinishedEmitter, settings, handler, finishPromiseRegistrator, frameCallback) {
    let lastOffsetDelta;
    let currentOffset;
    let lastTimestap;
    let acceleration = 1;
    let isInputActive = false;
    const accMaxTimeFrame = settings.accelerationTimeFrame || 300;
    function createAnimationParams(timestamp) {
        const d = Math.abs(currentOffset % settings.divisor);
        return {
            value: (settings.divisor - d) * Math.sign(currentOffset),
            endTimestamp: timestamp + 300,
            startTimestamp: timestamp,
            easing: easeOutQuad,
            frameCallback: frameCallback,
            divisor: 0
        };
    }
    function calculateAcceleratedDelta(timestamp, delta) {
        delta = delta * acceleration;
        if ((delta >= lastOffsetDelta) && (timestamp - lastTimestap <= accMaxTimeFrame))
            acceleration = Math.min(2, acceleration * 1.2);
        currentOffset += delta;
        lastOffsetDelta = delta;
        lastTimestap = timestamp;
        return delta;
    }
    function resetGestureState(timestamp) {
        currentOffset = 0;
        lastTimestap = timestamp;
        acceleration = 1;
    }
    inputEmitter.subscribe((delta) => {
        frameCallback((timestamp) => {
            if (!isInputActive) {
                isInputActive = true;
                resetGestureState(timestamp);
                finishPromiseRegistrator(new Promise((resolve, _) => {
                    const inputFinish = (finishStamp) => {
                        inputFinishedEmitter.unsubscribe(inputFinish);
                        animateValueContiniusChange(inputEmitter, handler, createAnimationParams(finishStamp))
                            .then(() => {
                            isInputActive = false;
                            resolve();
                        })
                            .catch(() => { inputFinishedEmitter.subscribe(inputFinish); })
                            .finally(() => resetGestureState(timestamp));
                    };
                    inputFinishedEmitter.subscribe(inputFinish);
                }));
            }
            handler(calculateAcceleratedDelta(timestamp, delta));
        });
    });
}
function attachScroll(element, itemHeight, handler, registrator) {
    wheelEventSource(element, itemHeight, easeOutQuad, handler, registrator);
}
function attachVerticalSwipe(element, itemHeight, handler, registrator) {
    const inputEmmiter = new Emitter();
    const inputFinishEmmiter = new Emitter();
    let lastY = 0;
    element.addEventListener("touchstart", (e) => {
        lastY = e.touches[0].clientY;
    }, { capture: false, passive: true });
    element.addEventListener("touchend", () => {
        lastY = 0;
        // eslint-disable-next-line new-cap
        RequestAnimationFrame((timespan) => inputFinishEmmiter.emit(timespan));
    }, { capture: false, passive: true });
    element.addEventListener("touchmove", (e) => {
        e.preventDefault();
        const y = e.changedTouches[0].clientY;
        inputEmmiter.emit(y - lastY);
        lastY = y;
    }, { capture: false, passive: false });
    const settings = {
        divisor: itemHeight,
        accelerationTimeFrame: 0
    };
    attachInputSource(inputEmmiter, inputFinishEmmiter, settings, handler, registrator, RequestAnimationFrame);
}
function isLeapYear(year) {
    return ((year.value % 4 === 0) && (year.value % 100 !== 0)) || (year.value % 400 === 0);
}
function has30Days(item) {
    return item.value !== 2;
}
function has31Days(item) {
    return [1, 3, 5, 7, 8, 10, 12].indexOf(item.value) !== -1;
}
var RollerItemType;
(function (RollerItemType) {
    RollerItemType[RollerItemType["DayWithoutLeadingZero"] = 0] = "DayWithoutLeadingZero";
    RollerItemType[RollerItemType["DayWithLeadingZero"] = 1] = "DayWithLeadingZero";
    RollerItemType[RollerItemType["DayWithShortName"] = 2] = "DayWithShortName";
    RollerItemType[RollerItemType["DayWithFullName"] = 3] = "DayWithFullName";
    RollerItemType[RollerItemType["MonthWithShortName"] = 4] = "MonthWithShortName";
    RollerItemType[RollerItemType["MonthWithFullName"] = 5] = "MonthWithFullName";
    RollerItemType[RollerItemType["MonthWithoutLeadingZero"] = 6] = "MonthWithoutLeadingZero";
    RollerItemType[RollerItemType["MonthWithLeadingZero"] = 7] = "MonthWithLeadingZero";
    RollerItemType[RollerItemType["YearWithFourDigit"] = 8] = "YearWithFourDigit";
    RollerItemType[RollerItemType["YearWithThreeDigit"] = 9] = "YearWithThreeDigit";
    RollerItemType[RollerItemType["YearWithTwoDigit"] = 10] = "YearWithTwoDigit";
    RollerItemType[RollerItemType["YearWithOneDigit"] = 11] = "YearWithOneDigit";
})(RollerItemType || (RollerItemType = {}));
function addDayRollerItem(dayCollection, dayValue, visibleSubject, isSelected, dayNames, monthAndYear, dayOfWeekNameDisplayed) {
    const dayRollerItem = dayCollection.add(dayValue, visibleSubject, isSelected);
    monthAndYear.subscribe(([month, year]) => {
        if (!dayOfWeekNameDisplayed)
            dayRollerItem.displayText.value = dayNames[dayValue - 1];
        else {
            const dayOfWeekName = dayNames[getDayOfWeek(year.value, month.value, dayValue)];
            dayRollerItem.displayText.update(dayValue + " " + dayOfWeekName);
        }
    });
}
function getDayOfWeek(year, monthNumber, day) {
    return (new Date(year, monthNumber - 1, day)).getDay();
}
function getLongestPostfix(names) {
    return names && names.length ? " " + names.concat([]).sort((n1, n2) => n2.length - n1.length)[0] : "";
}
function getUnderlyingBackground(element) {
    const transparent = "rgba(0, 0, 0, 0)";
    const transparentIE11 = "transparent";
    let color = "initial";
    while (element) {
        color = window.getComputedStyle(element).backgroundColor;
        if (color && color !== transparent && color !== transparentIE11)
            return color;
        element = element.parentElement;
    }
    return color;
}
function initializeDateRoller(container, settings, previousMonth, previousYear, dotNetRef) {
    const minYear = 1;
    const maxYear = 9999;
    const yearDelta = 1;
    const itemSettingDayValue = settings.items.filter((i) => {
        return i.type === RollerItemType.DayWithShortName || i.type === RollerItemType.DayWithFullName
            || i.type === RollerItemType.DayWithoutLeadingZero || i.type === RollerItemType.DayWithLeadingZero;
    })[0];
    const itemSettingMonthValue = settings.items.filter((i) => {
        return i.type === RollerItemType.MonthWithShortName || i.type === RollerItemType.MonthWithFullName
            || i.type === RollerItemType.MonthWithLeadingZero || i.type === RollerItemType.MonthWithoutLeadingZero;
    })[0];
    const itemSettingYearValue = settings.items.filter((i) => {
        return i.type === RollerItemType.YearWithFourDigit || i.type === RollerItemType.YearWithThreeDigit
            || i.type === RollerItemType.YearWithTwoDigit || i.type === RollerItemType.YearWithOneDigit;
    })[0];
    const yearNames = settings.yearNames || [];
    let monthNames = settings.monthNames || [];
    const dayNames = settings.dayNames || [];
    const itemHeight = getRollerItemHeight(container);
    const visibleItemCount = 5;
    let dayValue = itemSettingDayValue ? itemSettingDayValue.value : 1;
    let monthValue = null;
    if (!itemSettingMonthValue) {
        monthNames = ["", "", "", "", "", "", "", "", "", "", "", ""];
        monthValue = previousMonth;
    }
    else
        monthValue = itemSettingMonthValue.value;
    let yearValue = itemSettingYearValue ? itemSettingYearValue.value : previousYear;
    const yearCollection = itemSettingYearValue ? RollerItemCollection.createCollection(yearValue, yearNames) : RollerItemCollection.createGenerator(yearValue, minYear, maxYear, yearDelta);
    const monthCollection = RollerItemCollection.createCollection(monthValue, monthNames);
    const isNotFebruary = monthCollection.selectedItem.asTrigger(has30Days);
    const visibleSubjects = {
        29: yearCollection.selectedItem.asTrigger(isLeapYear).or(isNotFebruary),
        30: isNotFebruary,
        31: monthCollection.selectedItem.asTrigger(has31Days)
    };
    const monthAndYear = monthCollection.selectedItem.join(yearCollection.selectedItem);
    const dayOfWeekNameDisplayed = itemSettingDayValue && (itemSettingDayValue.type === RollerItemType.DayWithFullName
        || itemSettingDayValue.type === RollerItemType.DayWithShortName);
    const dayCollection = new RollerItemCollection();
    for (let i = 1; i <= 31; i++)
        addDayRollerItem(dayCollection, i, visibleSubjects[i], i === dayValue, dayNames, monthAndYear, dayOfWeekNameDisplayed);
    dayCollection.initialize(dayValue);
    const maxContentString = ["25" + getLongestPostfix(dayNames), getLongestPostfix(monthNames), "0000"].reduce((a, b) => { return a.length > b.length ? a : b; });
    const docFragment = document.createDocumentFragment();
    const stylesForRoller = document.createElement("STYLE");
    stylesForRoller.type = "text/css";
    stylesForRoller.innerText = `.${RollerCssClasses.Roller} { height: ${itemHeight * visibleItemCount}px; } ` +
        `.${RollerCssClasses.RollerItem}, .${RollerCssClasses.RollerAfter} { height: ${itemHeight}px; } ` +
        `.${RollerCssClasses.RollerAfter} { background-color: ${getUnderlyingBackground(container)}; } `;
    docFragment.appendChild(stylesForRoller);
    settings.items.forEach((item) => {
        switch (item.type) {
            case RollerItemType.DayWithoutLeadingZero:
            case RollerItemType.DayWithLeadingZero:
            case RollerItemType.DayWithFullName:
            case RollerItemType.DayWithShortName: {
                const dayRoller = new Roller(dayCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Day", maxContentString);
                dayRoller.initialize();
                break;
            }
            case RollerItemType.MonthWithFullName:
            case RollerItemType.MonthWithShortName:
            case RollerItemType.MonthWithLeadingZero:
            case RollerItemType.MonthWithoutLeadingZero: {
                const monthRoller = new Roller(monthCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Month", maxContentString);
                monthRoller.initialize();
                break;
            }
            case RollerItemType.YearWithFourDigit:
            case RollerItemType.YearWithThreeDigit:
            case RollerItemType.YearWithTwoDigit:
            case RollerItemType.YearWithOneDigit: {
                const yearRoller = new Roller(yearCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Year", maxContentString);
                yearRoller.initialize();
                break;
            }
        }
    });
    docFragment.appendChild(document.createElement(DxKeyboardNavigatorTagName));
    container.textContent = "";
    container.appendChild(docFragment);
    function getValueSubscription(valueUpdater) {
        return (item) => {
            valueUpdater(item);
            dotNetRef.invokeMethodAsync("UpdateDateTime", [dayValue, monthValue, yearValue])
                .catch((e) => console.error(e));
        };
    }
    dayCollection.selectedItem.subscribe(getValueSubscription((item) => {
        dayValue = item.value;
    }));
    monthCollection.selectedItem.subscribe(getValueSubscription((item) => {
        monthValue = item.value;
    }));
    yearCollection.selectedItem.subscribe(getValueSubscription((item) => {
        yearValue = item.value;
    }));
    RollerModels.set(container, new DatePicker(yearCollection, monthCollection, dayCollection));
    const keyboardNavigator = container.querySelector(DxKeyboardNavigatorTagName);
    if (keyboardNavigator && !keyboardNavigator.initialized)
        keyboardNavigator.initialize(container, new RollerKbdStrategy(keyboardNavigator, container, dotNetRef));
    container.dispatchEvent(new RollerInitializedEvent());
    return Promise.resolve();
}
const TwelveFormatTime = {
    AM: 1,
    PM: 2
};
const TimeRollerItemType = {
    Hour: 0,
    Minute: 1,
    Second: 2,
    AMPM: 3
};
function initializeTimeRoller(container, settings, dotNetRef) {
    if (!settings)
        return Promise.reject();
    const twelveHourFormat = settings.twelveHourFormat;
    let hourValue = twelveHourFormat ? settings.time.hours % 12 : settings.time.hours;
    if (twelveHourFormat && hourValue === 0)
        hourValue = 12;
    let minuteValue = settings.time.minutes;
    let secondValue = settings.time.seconds;
    let AMPMValue = settings.time.hours >= 12 ? TwelveFormatTime.PM : TwelveFormatTime.AM;
    const itemHeight = getRollerItemHeight(container);
    const visibleItemCount = 5;
    const secondsCollection = RollerItemCollection.createGenerator(secondValue, 0, 59, 1);
    const minutesCollection = RollerItemCollection.createGenerator(minuteValue, 0, 59, 1);
    const hoursCollection = twelveHourFormat ? RollerItemCollection.createGenerator(hourValue, 1, 12, 1) : RollerItemCollection.createGenerator(hourValue, 0, 23, 1);
    let AMPMCollection = null;
    if (settings.ampmDesignators) {
        if (settings.ampmDesignators[0] && settings.ampmDesignators[1])
            AMPMCollection = RollerItemCollection.createCollection(AMPMValue, settings.ampmDesignators, false);
    }
    const docFragment = document.createDocumentFragment();
    const stylesForRoller = document.createElement("STYLE");
    stylesForRoller.type = "text/css";
    stylesForRoller.innerText = `.${RollerCssClasses.Roller} { height: ${itemHeight * visibleItemCount}px; } ` +
        `.${RollerCssClasses.RollerItem}, .${RollerCssClasses.RollerAfter} { height: ${itemHeight}px; } ` +
        `.${RollerCssClasses.RollerAfter} { background-color: ${getUnderlyingBackground(container)}; }`;
    docFragment.appendChild(stylesForRoller);
    settings.items.forEach((item) => {
        switch (item.type) {
            case TimeRollerItemType.Hour: {
                const hoursRoller = new Roller(hoursCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Hour", "15");
                hoursRoller.initialize();
                break;
            }
            case TimeRollerItemType.Minute: {
                const minutesRoller = new Roller(minutesCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Minute", "55");
                minutesRoller.initialize();
                break;
            }
            case TimeRollerItemType.Second: {
                const secondsRoller = new Roller(secondsCollection, visibleItemCount, docFragment, {
                    width: -1,
                    height: itemHeight
                }, "Second", "55");
                secondsRoller.initialize();
                break;
            }
            case TimeRollerItemType.AMPM: {
                if (AMPMCollection) {
                    const AMPMRoller = new Roller(AMPMCollection, 5, docFragment, {
                        width: -1,
                        height: itemHeight
                    }, "AM/PM", "AM");
                    AMPMRoller.initialize();
                }
                break;
            }
        }
    });
    function getValueSubscription(valueUpdater) {
        return (item) => {
            valueUpdater(item);
            dotNetRef.invokeMethodAsync("UpdateDateTime", [hourValue, minuteValue, secondValue, AMPMValue])
                .catch();
        };
    }
    hoursCollection.selectedItem.subscribe(getValueSubscription((item) => {
        hourValue = item.value;
    }));
    minutesCollection.selectedItem.subscribe(getValueSubscription((item) => {
        minuteValue = item.value;
    }));
    secondsCollection.selectedItem.subscribe(getValueSubscription((item) => {
        secondValue = item.value;
    }));
    if (AMPMCollection) {
        AMPMCollection.selectedItem.subscribe(getValueSubscription((item) => {
            AMPMValue = item.value;
        }));
    }
    docFragment.appendChild(document.createElement(DxKeyboardNavigatorTagName));
    RollerModels.set(container, new TimePicker(hoursCollection, minutesCollection, secondsCollection, AMPMCollection));
    container.textContent = "";
    container.appendChild(docFragment);
    const keyboardNavigator = container.querySelector(DxKeyboardNavigatorTagName);
    if (keyboardNavigator && !keyboardNavigator.initialized)
        keyboardNavigator.initialize(container, new RollerKbdStrategy(keyboardNavigator, container, dotNetRef));
    container.dispatchEvent(new RollerInitializedEvent());
    return Promise.resolve();
}
class RollerKbdStrategy extends KeyboardNavigationStrategy {
    constructor(navigator, targetElement, dotNetRef) {
        super(navigator, targetElement);
        this.dotNetRef = dotNetRef;
    }
    queryItems() {
        return this.queryItemsBySelector(`.${RollerCssClasses.RollerContainer} .${RollerCssClasses.Roller} .${RollerCssClasses.RollerAfter}`);
    }
    handleKeyDown(evt) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if ((keyCode === key.KeyCode.Tab || keyCode === key.KeyCode.Right || keyCode === key.KeyCode.Space) && !evt.shiftKey && !this.lastItemSelected) {
            this.moveToNextItem();
            return true;
        }
        else if (keyCode === key.KeyCode.Tab && evt.shiftKey || keyCode === key.KeyCode.Left) {
            if (this.selectedItemIndex > 0)
                this.moveToPrevItem();
            else if (keyCode !== key.KeyCode.Left)
                this.leaveBackward();
            return true;
        }
        return super.handleKeyDown(evt);
    }
}
const RollerModels = new WeakMap();
class TimePicker {
    constructor(hoursCollection, minutesCollection, secondsCollection, AMPMCollection) {
        this.hoursCollection = hoursCollection;
        this.minutesCollection = minutesCollection;
        this.secondsCollection = secondsCollection;
        this.AMPMCollection = AMPMCollection;
    }
    update(time) {
        if (this.AMPMCollection) {
            let hourValue = this.AMPMCollection ? time.hours % 12 : time.hours;
            hourValue = hourValue === 0 ? 12 : hourValue;
            this.hoursCollection.initialize(hourValue);
            this.AMPMCollection.initialize(time.hours >= 12 ? TwelveFormatTime.PM : TwelveFormatTime.AM);
        }
        else
            this.hoursCollection.initialize(time.hours);
        this.minutesCollection.initialize(time.minutes);
        this.secondsCollection.initialize(time.seconds);
    }
}
class DatePicker {
    constructor(yearsCollection, monthsCollection, daysCollection) {
        this.yearsCollection = yearsCollection;
        this.monthsCollection = monthsCollection;
        this.daysCollection = daysCollection;
    }
    update(rollerItems) {
        const dayValue = rollerItems.filter(i => i.type === RollerItemType.DayWithShortName || i.type === RollerItemType.DayWithFullName
            || i.type === RollerItemType.DayWithoutLeadingZero || i.type === RollerItemType.DayWithLeadingZero)[0];
        const monthValue = rollerItems.filter(i => i.type === RollerItemType.MonthWithShortName || i.type === RollerItemType.MonthWithFullName
            || i.type === RollerItemType.MonthWithLeadingZero || i.type === RollerItemType.MonthWithoutLeadingZero)[0];
        const yearValue = rollerItems.filter(i => i.type === RollerItemType.YearWithFourDigit || i.type === RollerItemType.YearWithThreeDigit
            || i.type === RollerItemType.YearWithTwoDigit || i.type === RollerItemType.YearWithOneDigit)[0];
        this.yearsCollection.initialize(yearValue.value);
        this.monthsCollection.initialize(monthValue.value);
        this.daysCollection.initialize(dayValue.value);
    }
}
function updateRoller(container, value) {
    if (!RollerModels.has(container))
        return;
    const timePicker = RollerModels.get(container);
    if (timePicker) {
        timePicker.update(value);
        return;
    }
    const datePicker = RollerModels.get(container);
    datePicker && datePicker.update(value);
}
function getRollerItemHeight(container) {
    const itemElement = document.createElement("span");
    itemElement.className = RollerCssClasses.RollerItem;
    itemElement.textContent = "01234567890";
    container.appendChild(itemElement);
    let itemHeight = itemElement.offsetHeight;
    if (!itemHeight) { // TODO remove after aviod JSInterop and move to web component
        if (getParentByClassName(container, "dxbl-lg"))
            itemHeight = 42;
        else if (getParentByClassName(container, "dxbl-sm"))
            itemHeight = 30;
        else
            itemHeight = 36;
    }
    container.removeChild(itemElement);
    return itemHeight;
}
const roller = { initializeDateRoller, initializeTimeRoller, updateRoller };

export { Roller, RollerCssClasses, RollerInitializedEvent, RollerItem, RollerItemCollection, RollerKbdStrategy, roller as default, getDayOfWeek, initializeTimeRoller, updateRoller };
//# sourceMappingURL=roller-24.2.js.map
