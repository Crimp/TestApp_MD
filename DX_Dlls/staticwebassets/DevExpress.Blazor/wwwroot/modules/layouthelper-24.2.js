import { P as Point, N as NumericHelper } from './point-24.2.js';
import { T as Tags, V as Visibility, D as Display } from './constants-24.2.js';

class Size {
    get width() {
        return this.widthField;
    }
    get height() {
        return this.heightField;
    }
    constructor(width, height) {
        this.widthField = width;
        this.heightField = height;
    }
}
Size.Empty = new Size(0, 0);

class Range {
    get end() {
        return this._end;
    }
    get start() {
        return this._start;
    }
    get size() {
        return Math.abs(this.end - this.start);
    }
    constructor(start, end) {
        this._start = start;
        this._end = end;
    }
    static rectToRange(rect, isVertical) {
        if (isVertical)
            return new Range(rect.left, rect.right);
        return new Range(rect.top, rect.bottom);
    }
}
class Rect {
    get topLeft() {
        return new Point(this.x, this.y);
    }
    get topRight() {
        return new Point(this.x + this.width, this.y);
    }
    get bottomLeft() {
        return new Point(this.x, this.y + this.height);
    }
    get bottomRight() {
        return new Point(this.x + this.width, this.y + this.height);
    }
    get x() {
        return this.xField;
    }
    get y() {
        return this.yField;
    }
    get width() {
        return this.widthField;
    }
    get height() {
        return this.heightField;
    }
    get isEmpty() {
        return NumericHelper.lessThanOrClose(this.width, 0) || NumericHelper.lessThanOrClose(this.height, 0);
    }
    get left() {
        return this.x;
    }
    get top() {
        return this.y;
    }
    get right() {
        if (this.isEmpty)
            return Number.NEGATIVE_INFINITY;
        return this.x + this.width;
    }
    get bottom() {
        if (this.isEmpty)
            return Number.NEGATIVE_INFINITY;
        return this.y + this.height;
    }
    get size() {
        return new Size(this.width, this.height);
    }
    constructor(x, y, width, height) {
        this.xField = x;
        this.yField = y;
        this.widthField = width;
        this.heightField = height;
    }
    static create(point, size) {
        return new Rect(point.x, point.y, size.width, size.height);
    }
    static createFromPoints(point1, point2) {
        return new Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point1.x - point2.x), Math.abs(point1.y - point2.y));
    }
}
Rect.Empty = new Rect(0, 0, 0, 0);
class RectHelper {
    static fromDomRect(rect) {
        return new Rect(rect.left, rect.top, rect.width, rect.height);
    }
    static offset(rect, offset) {
        return new Rect(rect.x + offset.x, rect.y + offset.y, rect.width, rect.height);
    }
    static areSame(left, right) {
        return NumericHelper.areClose(left.x, right.x) && NumericHelper.areClose(left.y, right.y) && NumericHelper.areClose(left.width, right.width) && NumericHelper.areClose(left.height, right.height);
    }
    static intersectsWith(left, right) {
        if (left.isEmpty || right.isEmpty)
            return false;
        return (right.left <= left.right) &&
            (right.right >= left.left) &&
            (right.top <= left.bottom) &&
            (right.bottom >= left.top);
    }
    static intersect(left, right) {
        if (!RectHelper.intersectsWith(left, right))
            return Rect.Empty;
        const leftMax = Math.max(left.left, right.left);
        const topMax = Math.max(left.top, right.top);
        const width = Math.max(Math.min(left.right, right.right) - leftMax, 0);
        const height = Math.max(Math.min(left.bottom, right.bottom) - topMax, 0);
        return new Rect(leftMax, topMax, width, height);
    }
    static contains(rect, point) {
        if (rect.isEmpty)
            return false;
        return ((point.x >= rect.x) && (point.x - rect.width <= rect.x) &&
            (point.y >= rect.y) && (point.y - rect.height <= rect.y));
    }
    static parse(value) {
        const values = value.split(",");
        if (values.length !== 4)
            throw new Error("incorrect parameters number");
        return new Rect(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]));
    }
}

class DomHelper {
    static isAbsolutePositioning(el) {
        return window.getComputedStyle(el).getPropertyValue("position") === "absolute";
    }
    static isFixedPositioning(el) {
        return window.getComputedStyle(el).getPropertyValue("position") === "fixed";
    }
    static isScrollable(el) {
        const { overflow, overflowX, overflowY } = window.getComputedStyle(el);
        return /auto|scroll|overlay|hidden/.test(overflow + overflowX + overflowY);
    }
    static setBooleanAttribute(element, attribute, value) {
        if (value)
            element.setAttribute(attribute, "");
        else
            element.removeAttribute(attribute);
    }
    static isOverflown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
    static isTableElement(el) {
        var _a;
        return [Tags.table, Tags.tableCell, Tags.tableHeaderCell].indexOf((_a = DomHelper.getNodeName(el)) !== null && _a !== void 0 ? _a : "") >= 0;
    }
    static isTextInput(element) {
        return element.tagName === Tags.input || element.tagName === Tags.textArea;
    }
    static isMultipleRowInput(element) {
        const contentEditable = element.getAttribute("contenteditable");
        if (contentEditable)
            return contentEditable.toLowerCase() !== "false";
        return element.tagName === Tags.textArea;
    }
    static toPx(val) {
        return Math.floor(val) + "px";
    }
    static getNodeName(node) {
        return node ? (node.nodeName || "").toLowerCase() : null;
    }
    static getVerticalScrollbarWidth(element = null) {
        if (element == null)
            return window.innerWidth - document.body.getBoundingClientRect().width;
        return element.offsetWidth - element.clientWidth;
    }
    static matches(element, selector) {
        return element.matches(selector);
    }
    static isHidden(element) {
        if (getComputedStyle(element).visibility === Visibility.hidden ||
            element.closest("[inert=\"true\"]"))
            return true;
        let currentElement = element;
        while (currentElement) {
            if (getComputedStyle(element).display === Display.none)
                return true;
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    static getAttributeIntValue(element, attribute, defaultValue) {
        return DomHelper.getAttributeParsedNumberValue(element, attribute, parseInt, defaultValue);
    }
    static getAttributeParsedNumberValue(element, attribute, parser, defaultValue) {
        const rawValue = element.getAttribute(attribute);
        return rawValue ? parser(rawValue) : defaultValue;
    }
}

class LayoutHelper {
    static getRelativeElementRect(el, root = null) {
        const rootRect = root != null ? RectHelper.fromDomRect(root.getBoundingClientRect()) : Rect.Empty;
        const rect = RectHelper.fromDomRect(el.getBoundingClientRect());
        return new Rect(rect.x - rootRect.x + window.scrollX, rect.y - rootRect.y + window.scrollY, rect.width, rect.height);
    }
    static getParent(element, slotTree) {
        const parent = this.getParentCore(element, slotTree);
        if ((parent === null || parent === void 0 ? void 0 : parent.nodeName.toLowerCase()) === "html")
            return null;
        return parent;
    }
    static getParentCore(element, slotTree) {
        if (slotTree) {
            const slot = element;
            if (slot && slot.assignedSlot)
                return slot.assignedSlot;
        }
        if (element.parentNode)
            return element.parentNode;
        const shadowRoot = element;
        if (shadowRoot && shadowRoot.host)
            return shadowRoot.host;
        return null;
    }
    static findParent(element, predicate, slotTree = true) {
        let parent = LayoutHelper.getParent(element, slotTree);
        while (parent) {
            const check = parent;
            if (check && predicate(parent))
                return parent;
            parent = LayoutHelper.getParent(parent, slotTree);
        }
        return null;
    }
    static *getRootPathAndSelf(element, root = null, slotTree = true) {
        yield element;
        // eslint-disable-next-line no-restricted-syntax
        for (const node of LayoutHelper.getRootPath(element, root, slotTree))
            yield node;
    }
    static *getRootPath(element, root = null, slotTree = true) {
        let parent = LayoutHelper.getParent(element, slotTree);
        while (parent && parent !== root) {
            yield parent;
            parent = LayoutHelper.getParent(parent, slotTree);
        }
    }
    static getScrollParent(node) {
        var _a;
        if (!node)
            return null;
        if (["html", "body", "#document"].indexOf((_a = DomHelper.getNodeName(node)) !== null && _a !== void 0 ? _a : "") >= 0)
            return null;
        if (node instanceof HTMLElement && DomHelper.isScrollable(node))
            return node;
        return LayoutHelper.getScrollParent(LayoutHelper.getParent(node, true));
    }
    static getRealOffsetParent(el) {
        if (!(el instanceof HTMLElement) || DomHelper.isFixedPositioning(el))
            return null;
        return el.offsetParent;
    }
    static getOffsetParent(el) {
        let offsetParent = LayoutHelper.getRealOffsetParent(el);
        while (offsetParent && DomHelper.isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static")
            offsetParent = LayoutHelper.getRealOffsetParent(offsetParent);
        return offsetParent;
    }
    static containsElement(parent, child) {
        var _a;
        if (!child)
            return false;
        const rootNode = child.getRootNode();
        if (parent.contains(child))
            return true;
        else if (rootNode && rootNode instanceof ShadowRoot) {
            let next = child;
            do {
                if (next && parent.isSameNode(next))
                    return true;
                next = (_a = next === null || next === void 0 ? void 0 : next.parentNode) !== null && _a !== void 0 ? _a : null;
            } while (next);
        }
        return false;
    }
    static getScrollParents(el) {
        if (!el)
            return [];
        const scrollParent = LayoutHelper.getScrollParent(el);
        if (!scrollParent)
            return [];
        const updated = new Array(scrollParent);
        const parent = LayoutHelper.getParent(scrollParent, true);
        if (!parent)
            return updated;
        const parents = this.getScrollParents(parent);
        return updated.concat(parents);
    }
    static getClippingRoot(el) {
        return LayoutHelper.findParent(el, x => x instanceof HTMLElement && (DomHelper.isFixedPositioning(x)), true);
    }
    static getClippingParents(el) {
        const clippingParents = LayoutHelper.getScrollParents(LayoutHelper.getParent(el, true));
        const clippingRoot = LayoutHelper.getClippingRoot(el);
        return clippingRoot
            ? clippingParents.filter(x => x instanceof HTMLElement && x !== clippingRoot && !LayoutHelper.containsElement(x, clippingRoot))
            : clippingParents.filter(x => x instanceof HTMLElement);
    }
}

export { DomHelper as D, LayoutHelper as L, RectHelper as R, Size as S, Rect as a, Range as b };
//# sourceMappingURL=layouthelper-24.2.js.map
