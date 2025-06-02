class NumericHelper {
    static isZero(value) {
        return Math.abs(value) < Number.EPSILON;
    }
    static areClose(value1, value2) {
        if (value1 === value2)
            return true;
        const compare = (Math.abs(value1) + Math.abs(value2) + 10) * Number.EPSILON;
        const delta = value1 - value2;
        return ((-compare < delta) && (compare > delta));
    }
    static greaterThan(value1, value2) {
        return (value1 > value2) && !NumericHelper.areClose(value1, value2);
    }
    static lessThan(value1, value2) {
        return (value1 < value2) && !NumericHelper.areClose(value1, value2);
    }
    static lessThanOrClose(value1, value2) {
        if (value1 >= value2)
            return NumericHelper.areClose(value1, value2);
        return true;
    }
    static greaterThanOrClose(value1, value2) {
        if (value1 <= value2)
            return NumericHelper.areClose(value1, value2);
        return true;
    }
    static toRange(value, left, right) {
        const min = Math.min(left, right);
        const max = Math.max(left, right);
        return Math.min(Math.max(value, min), max);
    }
    static findNumber(value) {
        if (value == null)
            return null;
        const matches = value.match(/\d+/);
        if (matches && (matches === null || matches === void 0 ? void 0 : matches.length) > 0)
            return parseInt(matches[0]);
        return null;
    }
}

class Point {
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
}
Point.zero = new Point(0, 0);
class PointHelper {
    static areClose(point1, point2) {
        return NumericHelper.areClose(point1.x, point2.x) && NumericHelper.areClose(point1.y, point2.y);
    }
    static equals(point1, point2) {
        return point1.x === point2.x && point1.y === point2.y;
    }
    static add(point1, point2) {
        return new Point(point1.x + point2.x, point1.y + point2.y);
    }
    static sub(point1, point2) {
        return new Point(point1.x - point2.x, point1.y - point2.y);
    }
}

export { NumericHelper as N, Point as P, PointHelper as a };
//# sourceMappingURL=point-24.2.js.map
