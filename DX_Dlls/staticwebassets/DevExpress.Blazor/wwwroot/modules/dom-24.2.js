import { c as createCommonjsModule, g as getDefaultExportFromCjs, b as getAugmentedNamespace } from './_commonjsHelpers-24.2.js';
import { t as tslib_es6 } from './tslib.es6-24.2.js';
import { s as string_1, b as browser_1 } from './string-24.2.js';

var common = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToStringHex = exports.numberToStringBin = exports.isOdd = exports.isEven = exports.isNonNullString = exports.isString = exports.isNumber = exports.boolToString = exports.boolToInt = exports.isDefined = void 0;

function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function boolToInt(value) {
    return value ? 1 : 0;
}
exports.boolToInt = boolToInt;
function boolToString(value) {
    return value ? '1' : '0';
}
exports.boolToString = boolToString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNonNullString(str) {
    return !!str;
}
exports.isNonNullString = isNonNullString;
function isEven(num) {
    return (num % 2) !== 0;
}
exports.isEven = isEven;
function isOdd(num) {
    return (num % 2) === 0;
}
exports.isOdd = isOdd;
function numberToStringBin(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(2), minLength, '0');
}
exports.numberToStringBin = numberToStringBin;
function numberToStringHex(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(16), minLength, '0');
}
exports.numberToStringHex = numberToStringHex;
});

/*@__PURE__*/getDefaultExportFromCjs(common);

const common_1 = common;

const tslib_1 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

var minMax = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedMinMax = exports.ExtendedMax = exports.ExtendedMin = exports.MinMaxNumber = exports.MinMax = void 0;

var MinMax = (function () {
    function MinMax(minElement, maxElement) {
        this.minElement = minElement;
        this.maxElement = maxElement;
    }
    return MinMax;
}());
exports.MinMax = MinMax;
var MinMaxNumber = (function (_super) {
    tslib_1.__extends(MinMaxNumber, _super);
    function MinMaxNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinMaxNumber.prototype, "length", {
        get: function () {
            return this.maxElement - this.minElement;
        },
        enumerable: false,
        configurable: true
    });
    return MinMaxNumber;
}(MinMax));
exports.MinMaxNumber = MinMaxNumber;
var ExtendedMin = (function () {
    function ExtendedMin(minElement, minValue) {
        this.minElement = minElement;
        this.minValue = minValue;
    }
    return ExtendedMin;
}());
exports.ExtendedMin = ExtendedMin;
var ExtendedMax = (function () {
    function ExtendedMax(maxElement, maxValue) {
        this.maxElement = maxElement;
        this.maxValue = maxValue;
    }
    return ExtendedMax;
}());
exports.ExtendedMax = ExtendedMax;
var ExtendedMinMax = (function (_super) {
    tslib_1.__extends(ExtendedMinMax, _super);
    function ExtendedMinMax(minElement, minValue, maxElement, maxValue) {
        var _this = _super.call(this, minElement, maxElement) || this;
        _this.minValue = minValue;
        _this.maxValue = maxValue;
        return _this;
    }
    return ExtendedMinMax;
}(MinMax));
exports.ExtendedMinMax = ExtendedMinMax;
});

/*@__PURE__*/getDefaultExportFromCjs(minMax);

var comparers = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equals = exports.Comparers = void 0;
var Comparers = (function () {
    function Comparers() {
    }
    Comparers.number = function (a, b) {
        return a - b;
    };
    Comparers.string = function (a, b) {
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    Comparers.stringIgnoreCase = function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    return Comparers;
}());
exports.Comparers = Comparers;
var Equals = (function () {
    function Equals() {
    }
    Equals.simpleType = function (a, b) {
        return a === b;
    };
    Equals.object = function (a, b) {
        return a && b && (a === b || a.equals(b));
    };
    return Equals;
}());
exports.Equals = Equals;
});

/*@__PURE__*/getDefaultExportFromCjs(comparers);

const min_max_1 = minMax;

const comparers_1 = comparers;

var list = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUtils = void 0;


var ListUtils = (function () {
    function ListUtils() {
    }
    ListUtils.remove = function (list, element) {
        var index = list.indexOf(element, 0);
        if (index >= 0)
            list.splice(index, 1);
    };
    ListUtils.removeBy = function (list, callback) {
        var len = list.length;
        for (var index = 0; index < len; index++) {
            if (callback(list[index], index))
                return list.splice(index, 1)[0];
        }
        return null;
    };
    ListUtils.shallowCopy = function (list) {
        return list.slice();
    };
    ListUtils.deepCopy = function (list) {
        return ListUtils.map(list, function (val) { return val.clone(); });
    };
    ListUtils.initByValue = function (numElements, initValue) {
        var result = [];
        for (; numElements > 0; numElements--)
            result.push(initValue);
        return result;
    };
    ListUtils.initByCallback = function (numElements, initCallback) {
        var result = [];
        for (var index = 0; index < numElements; index++)
            result.push(initCallback(index));
        return result;
    };
    ListUtils.forEachOnInterval = function (interval, callback) {
        var end = interval.end;
        for (var index = interval.start; index < end; index++)
            callback(index);
    };
    ListUtils.reverseForEachOnInterval = function (interval, callback) {
        var start = interval.start;
        for (var index = interval.end - 1; index >= start; index--)
            callback(index);
    };
    ListUtils.reducedMap = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var newItem = callback(list[index], index);
            if (newItem !== null)
                result.push(newItem);
        }
        return result;
    };
    ListUtils.filter = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var item = list[index];
            if (callback(item, index))
                result.push(item);
        }
        return result;
    };
    ListUtils.map = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++)
            result.push(callback(list[index], index));
        return result;
    };
    ListUtils.indexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var ind = startIndex; ind < endIndex; ind++) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.reverseIndexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var ind = startIndex; ind >= endIndex; ind--) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.elementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var ind = ListUtils.indexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.reverseElementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        var ind = ListUtils.reverseIndexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.last = function (list) {
        return list[list.length - 1];
    };
    ListUtils.setLast = function (list, newVal) {
        return list[list.length - 1] = newVal;
    };
    ListUtils.incLast = function (list) {
        return ++list[list.length - 1];
    };
    ListUtils.decLast = function (list) {
        return --list[list.length - 1];
    };
    ListUtils.equals = function (a, b) {
        return a.length === b.length && ListUtils.allOf2(a, b, function (a, b) { return a.equals(b); });
    };
    ListUtils.equalsByReference = function (a, b) {
        var aLen = a.length;
        var bLen = a.length;
        if (aLen !== bLen)
            return false;
        for (var i = 0; i < aLen; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListUtils.unique = function (list, cmp, equal, finalizeObj) {
        if (equal === void 0) { equal = cmp; }
        if (finalizeObj === void 0) { finalizeObj = function () { }; }
        var len = list.length;
        if (len === 0)
            return [];
        list = list.sort(cmp);
        var prevValue = list[0];
        var result = ListUtils.reducedMap(list, function (v) {
            if (equal(prevValue, v) !== 0) {
                prevValue = v;
                return v;
            }
            finalizeObj(v);
            return null;
        }, 1, len);
        result.unshift(list[0]);
        return result;
    };
    ListUtils.uniqueNumber = function (list) {
        list = list.sort(comparers_1.Comparers.number);
        var prevValue = Number.NaN;
        for (var i = list.length - 1; i >= 0; i--) {
            if (prevValue === list[i])
                list.splice(i, 1);
            else
                prevValue = list[i];
        }
        return list;
    };
    ListUtils.forEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(list[index], index);
    };
    ListUtils.forEach2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(listA[index], listB[index], index);
    };
    ListUtils.reverseForEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--)
            callback(list[index], index);
    };
    ListUtils.reverseIndexOf = function (list, element, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (list[index] === element)
                return index;
        }
        return -1;
    };
    ListUtils.accumulate = function (list, initAccValue, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc = callback(acc, list[ind], ind);
        return acc;
    };
    ListUtils.accumulateNumber = function (list, callback, initAccValue, startIndex, endIndex) {
        if (initAccValue === void 0) { initAccValue = 0; }
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc += callback(list[ind], ind, acc);
        return acc;
    };
    ListUtils.anyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.reverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeReverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.anyOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(listA[index], listB[index], index))
                return true;
        }
        return false;
    };
    ListUtils.allOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(list[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(listA[index], listB[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOfOnInterval = function (interval, callback) {
        var endIndex = interval.end;
        for (var index = interval.start; index < endIndex; index++) {
            if (!callback(index))
                return false;
        }
        return true;
    };
    ListUtils.addListOnTail = function (resultList, addedList) {
        for (var i = 0, elem = void 0; elem = addedList[i]; i++)
            resultList.push(elem);
        return resultList;
    };
    ListUtils.joinLists = function (converter) {
        var lists = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            lists[_i - 1] = arguments[_i];
        }
        return ListUtils.accumulate(lists, [], function (accList, list) {
            ListUtils.addListOnTail(accList, converter(list));
            return accList;
        });
    };
    ListUtils.push = function (list, element) {
        list.push(element);
        return list;
    };
    ListUtils.countIf = function (list, callback) {
        return ListUtils.accumulateNumber(list, function (elem, ind) { return callback(elem, ind) ? 1 : 0; });
    };
    ListUtils.clear = function (list) {
        list.splice(0);
    };
    ListUtils.merge = function (list, cmp, shouldMerge, merge, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        list = list.slice(startIndex, endIndex);
        if (endIndex - startIndex < 2)
            return list;
        list = list.sort(cmp);
        var prevObj = list[startIndex];
        var result = [prevObj];
        for (var ind = startIndex + 1; ind < endIndex; ind++) {
            var obj = list[ind];
            if (shouldMerge(prevObj, obj))
                merge(prevObj, obj);
            else {
                prevObj = obj;
                result.push(prevObj);
            }
        }
        return result;
    };
    ListUtils.min = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minExtended(list, getValue, startIndex, endIndex);
        return res ? res.minElement : null;
    };
    ListUtils.max = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.maxExtended(list, getValue, startIndex, endIndex);
        return res ? res.maxElement : null;
    };
    ListUtils.minMax = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minMaxExtended(list, getValue, startIndex, endIndex);
        return res ? new min_max_1.MinMax(res.minElement, res.maxElement) : null;
    };
    ListUtils.minExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var minValue = getValue(minElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
        }
        return new min_max_1.ExtendedMin(minElement, minValue);
    };
    ListUtils.maxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var maxElement = list[startIndex];
        var maxValue = getValue(maxElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    ListUtils.minMaxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var maxElement = minElement;
        var minValue = getValue(minElement);
        var maxValue = minValue;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
            else if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    ListUtils.minByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) < 0)
                found = elem;
        }
        return found;
    };
    ListUtils.maxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) > 0)
                found = elem;
        }
        return found;
    };
    ListUtils.minMaxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var min = list[startIndex];
        var max = min;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var res = cmp(elem, min);
            if (res > 0)
                max = elem;
            else if (res < 0)
                min = elem;
        }
        return new min_max_1.MinMax(min, max);
    };
    return ListUtils;
}());
exports.ListUtils = ListUtils;
});

/*@__PURE__*/getDefaultExportFromCjs(list);

const list_1 = list;

var math = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;

var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.round = function (value, digits) {
        if (digits === void 0) { digits = 0; }
        var factor = MathUtils.powFactor[digits];
        return Math.round(value * factor) / factor;
    };
    MathUtils.numberCloseTo = function (num, to, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return Math.abs(num - to) < accuracy;
    };
    MathUtils.restrictValue = function (val, minVal, maxVal) {
        if (maxVal < minVal)
            maxVal = minVal;
        if (val > maxVal)
            return maxVal;
        else if (val < minVal)
            return minVal;
        return val;
    };
    MathUtils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    MathUtils.generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    MathUtils.powFactor = list_1.ListUtils.initByCallback(20, function (ind) { return Math.pow(10, ind); });
    MathUtils.somePrimes = [1009, 1013,
        1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069,
        1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
        1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223,
        1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291,
        1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373,
        1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
        1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511,
        1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583,
        1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657,
        1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733,
        1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811,
        1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
        1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987,
        1993, 1997, 1999, 2003];
    return MathUtils;
}());
exports.MathUtils = MathUtils;
});

/*@__PURE__*/getDefaultExportFromCjs(math);

var dom = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomUtils = void 0;




var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.clearInnerHtml = function (element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    };
    DomUtils.setStylePosition = function (style, point) {
        style.left = math.MathUtils.round(point.x, 3) + 'px';
        style.top = math.MathUtils.round(point.y, 3) + 'px';
    };
    DomUtils.setStyleSize = function (style, size) {
        style.width = math.MathUtils.round(size.width, 3) + 'px';
        style.height = math.MathUtils.round(size.height, 3) + 'px';
    };
    DomUtils.setStyleSizeAndPosition = function (style, rectangle) {
        DomUtils.setStylePosition(style, rectangle);
        DomUtils.setStyleSize(style, rectangle);
    };
    DomUtils.hideNode = function (node) {
        if (node) {
            var parentNode = node.parentNode;
            if (parentNode)
                parentNode.removeChild(node);
        }
    };
    DomUtils.isHTMLElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isTextNode = function (node) {
        return node.nodeType === Node.TEXT_NODE;
    };
    DomUtils.isElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isHTMLTableRowElement = function (element) {
        return element.tagName === 'TR';
    };
    DomUtils.isItParent = function (parentElement, element) {
        if (!parentElement || !element)
            return false;
        while (element) {
            if (element === parentElement)
                return true;
            if (element.tagName === 'BODY')
                return false;
            element = element.parentNode;
        }
        return false;
    };
    DomUtils.getParentByTagName = function (element, tagName) {
        tagName = tagName.toUpperCase();
        while (element) {
            if (element.tagName === 'BODY')
                return null;
            if (element.tagName === tagName)
                return element;
            element = element.parentNode;
        }
        return null;
    };
    DomUtils.getDocumentScrollTop = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollTop > 0;
        if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge || isScrollBodyIE) {
            if (browser_1.Browser.MacOSMobilePlatform)
                return window.pageYOffset;
            if (browser_1.Browser.WebKitFamily)
                return document.documentElement.scrollTop || document.body.scrollTop;
            return document.body.scrollTop;
        }
        else
            return document.documentElement.scrollTop;
    };
    DomUtils.getDocumentScrollLeft = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollLeft > 0;
        if (browser_1.Browser.Edge || isScrollBodyIE)
            return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
        if (browser_1.Browser.WebKitFamily)
            return document.documentElement.scrollLeft || document.body.scrollLeft;
        return document.documentElement.scrollLeft;
    };
    DomUtils.getCurrentStyle = function (element) {
        if (element.currentStyle)
            return element.currentStyle;
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var result = document.defaultView.getComputedStyle(element, null);
            if (!result && browser_1.Browser.Firefox && window.frameElement) {
                var changes = [];
                var curElement = window.frameElement;
                while (!(result = document.defaultView.getComputedStyle(element, null))) {
                    changes.push([curElement, curElement.style.display]);
                    curElement.style.setProperty('display', 'block', 'important');
                    curElement = curElement.tagName === 'BODY' ? curElement.ownerDocument.defaultView.frameElement : curElement.parentNode;
                }
                result = cloneObject(result);
                for (var ch = void 0, i = 0; ch = changes[i]; i++)
                    ch[0].style.display = ch[1];
            }
            return result;
        }
        return window.getComputedStyle(element, null);
    };
    DomUtils.setFocus = function (element) {
        function focusCore() {
            try {
                element.focus();
                if (browser_1.Browser.IE && document.activeElement !== element)
                    element.focus();
            }
            catch (e) {
            }
        }
        if (browser_1.Browser.MacOSMobilePlatform)
            focusCore();
        else {
            setTimeout(function () {
                focusCore();
            }, 100);
        }
    };
    DomUtils.hasClassName = function (element, className) {
        try {
            var classNames = className.split(' ');
            var classList = element.classList;
            if (classList) {
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (!classList.contains(classNames[i]))
                        return false;
                }
            }
            else {
                var elementClassName = element.getAttribute && element.getAttribute('class');
                if (!elementClassName)
                    return false;
                var elementClasses = elementClassName.split(' ');
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (elementClasses.indexOf(classNames[i]) < 0)
                        return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    DomUtils.addClassName = function (element, className) {
        if (!DomUtils.hasClassName(element, className)) {
            var elementClassName = element.getAttribute && element.getAttribute('class');
            element.setAttribute('class', elementClassName === '' ? className : elementClassName + " " + className);
        }
    };
    DomUtils.removeClassName = function (element, className) {
        var elementClassName = element.getAttribute && element.getAttribute('class');
        var updClassName = " " + elementClassName + " ";
        var newClassName = updClassName.replace(" " + className + " ", ' ');
        if (updClassName.length !== newClassName.length)
            element.setAttribute('class', string_1.StringUtils.trim(newClassName));
    };
    DomUtils.toggleClassName = function (element, className, toggle) {
        if (toggle === undefined) {
            if (DomUtils.hasClassName(element, className))
                DomUtils.removeClassName(element, className);
            else
                DomUtils.addClassName(element, className);
        }
        else {
            if (toggle)
                DomUtils.addClassName(element, className);
            else
                DomUtils.removeClassName(element, className);
        }
    };
    DomUtils.pxToInt = function (px) {
        return pxToNumber(px, parseInt);
    };
    DomUtils.pxToFloat = function (px) {
        return pxToNumber(px, parseFloat);
    };
    DomUtils.getAbsolutePositionY = function (element) {
        function getAbsolutePositionY_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop();
        }
        function getAbsolutePositionY_FF3(element) {
            return Math.round(element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop());
        }
        function getAbsolutePositionY_Opera(curEl) {
            var isFirstCycle = true;
            if (curEl && DomUtils.isHTMLTableRowElement(curEl) && curEl.cells.length > 0)
                curEl = curEl.cells[0];
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle)
                    pos -= curEl.scrollTop;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollTop;
            return pos;
        }
        function getAbsolutePositionY_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderTopWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionY_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionY_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionY_FF3(element);
        else if (browser_1.Browser.Opera)
            return getAbsolutePositionY_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionY_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionY_FF3(element);
        return getAbsolutePositionY_Other(element);
    };
    DomUtils.getAbsolutePositionX = function (element) {
        function getAbsolutePositionX_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft();
        }
        function getAbsolutePositionX_FF3(element) {
            return Math.round(element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft());
        }
        function getAbsolutePositionX_Opera(curEl) {
            var isFirstCycle = true;
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle)
                    pos -= curEl.scrollLeft;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollLeft;
            return pos;
        }
        function getAbsolutePositionX_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderLeftWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionX_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionX_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionX_FF3(element);
        else if (browser_1.Browser.Opera && browser_1.Browser.Version <= 12)
            return getAbsolutePositionX_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionX_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionX_FF3(element);
        else
            return getAbsolutePositionX_Other(element);
    };
    DomUtils.isInteractiveControl = function (element) {
        return ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'BUTTON', 'IFRAME'].indexOf(element.tagName) > -1;
    };
    DomUtils.getClearClientHeight = function (element) {
        return element.offsetHeight - (DomUtils.getTopBottomPaddings(element) + DomUtils.getVerticalBordersWidth(element));
    };
    DomUtils.getTopBottomPaddings = function (element, style) {
        var currentStyle = style ? style : DomUtils.getCurrentStyle(element);
        return DomUtils.pxToInt(currentStyle.paddingTop) + DomUtils.pxToInt(currentStyle.paddingBottom);
    };
    DomUtils.getVerticalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && browser_1.Browser.MajorVersion !== 9 && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderTopStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderTopWidth);
        if (style.borderBottomStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderBottomWidth);
        return res;
    };
    DomUtils.getNodes = function (parent, predicate) {
        var collection = parent.all || parent.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getChildNodes = function (parent, predicate) {
        var collection = parent.childNodes;
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getNodesByClassName = function (parent, className) {
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            var result_1 = [];
            children.forEach(function (element) { return result_1.push(element); });
            return result_1;
        }
        else
            return DomUtils.getNodes(parent, function (elem) { return DomUtils.hasClassName(elem, className); });
    };
    DomUtils.getChildNodesByClassName = function (parent, className) {
        function nodeListToArray(nodeList, filter) {
            var result = [];
            for (var i = 0; i < nodeList.length; i++) {
                var element = nodeList[i];
                if (filter(element))
                    result.push(element);
            }
            return result;
        }
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            return nodeListToArray(children, function (element) { return element.parentNode === parent; });
        }
        else {
            return DomUtils.getChildNodes(parent, function (elem) {
                if (DomUtils.isElementNode(elem))
                    return common_1.isNonNullString(elem.className) && DomUtils.hasClassName(elem, elem.className);
                else
                    return false;
            });
        }
    };
    DomUtils.getVerticalScrollBarWidth = function () {
        if (DomUtils.verticalScrollBarWidth === undefined) {
            var container = document.createElement('DIV');
            container.style.cssText = 'position: absolute; top: 0px; left: 0px; visibility: hidden; width: 200px; height: 150px; overflow: hidden; box-sizing: content-box';
            document.body.appendChild(container);
            var child = document.createElement('P');
            container.appendChild(child);
            child.style.cssText = 'width: 100%; height: 200px;';
            var widthWithoutScrollBar = child.offsetWidth;
            container.style.overflow = 'scroll';
            var widthWithScrollBar = child.offsetWidth;
            if (widthWithoutScrollBar === widthWithScrollBar)
                widthWithScrollBar = container.clientWidth;
            DomUtils.verticalScrollBarWidth = widthWithoutScrollBar - widthWithScrollBar;
            document.body.removeChild(container);
        }
        return DomUtils.verticalScrollBarWidth;
    };
    DomUtils.getHorizontalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderLeftStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderLeftWidth);
        if (style.borderRightStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderRightWidth);
        return res;
    };
    DomUtils.getFontFamiliesFromCssString = function (cssString) {
        return cssString.split(',').map(function (fam) { return string_1.StringUtils.trim(fam.replace(/'|"/gi, '')); });
    };
    DomUtils.getInnerText = function (container) {
        if (browser_1.Browser.Safari && browser_1.Browser.MajorVersion <= 5) {
            if (DomUtils.html2PlainTextFilter === null) {
                DomUtils.html2PlainTextFilter = document.createElement('DIV');
                DomUtils.html2PlainTextFilter.style.width = '0';
                DomUtils.html2PlainTextFilter.style.height = '0';
                DomUtils.html2PlainTextFilter.style.overflow = 'visible';
                DomUtils.html2PlainTextFilter.style.display = 'none';
                document.body.appendChild(DomUtils.html2PlainTextFilter);
            }
            var filter = DomUtils.html2PlainTextFilter;
            filter.innerHTML = container.innerHTML;
            filter.style.display = '';
            var innerText = filter.innerText;
            filter.style.display = 'none';
            return innerText;
        }
        else if (browser_1.Browser.NetscapeFamily || browser_1.Browser.WebKitFamily || (browser_1.Browser.IE && browser_1.Browser.Version >= 9) || browser_1.Browser.Edge)
            return container.textContent;
        else
            return container.innerText;
    };
    DomUtils.html2PlainTextFilter = null;
    DomUtils.verticalScrollBarWidth = undefined;
    return DomUtils;
}());
exports.DomUtils = DomUtils;
function cloneObject(srcObject) {
    if (typeof (srcObject) !== 'object' || !common_1.isDefined(srcObject))
        return srcObject;
    var newObject = {};
    for (var i in srcObject)
        newObject[i] = srcObject[i];
    return newObject;
}
function pxToNumber(px, parseFunction) {
    var result = 0;
    if (common_1.isDefined(px) && px !== '') {
        try {
            var indexOfPx = px.indexOf('px');
            if (indexOfPx > -1)
                result = parseFunction(px.substr(0, indexOfPx));
        }
        catch (e) { }
    }
    return result;
}
function getAbsoluteScrollOffset_OperaFF(curEl, isX) {
    var pos = 0;
    var isFirstCycle = true;
    while (curEl != null) {
        if (curEl.tagName === 'BODY')
            break;
        var style = DomUtils.getCurrentStyle(curEl);
        if (style.position === 'absolute')
            break;
        if (!isFirstCycle && curEl.tagName === 'DIV' && (style.position === '' || style.position === 'static'))
            pos -= isX ? curEl.scrollLeft : curEl.scrollTop;
        curEl = curEl.parentNode;
        isFirstCycle = false;
    }
    return pos;
}
});

/*@__PURE__*/getDefaultExportFromCjs(dom);

export { common_1 as c, dom as d, math as m };
//# sourceMappingURL=dom-24.2.js.map
