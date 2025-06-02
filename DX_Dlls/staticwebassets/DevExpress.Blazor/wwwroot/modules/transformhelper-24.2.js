class TransformHelper {
    static translate(x, y) {
        return `translate(${Math.floor(x)}px, ${Math.floor(y)}px)`;
    }
    static translateWithoutFloor(x, y) {
        return `translate(${x}px, ${y}px)`;
    }
    static translateByPoint(point) {
        return `translate(${Math.floor(point.x)}px, ${Math.floor(point.y)}px)`;
    }
}

export { TransformHelper as T };
//# sourceMappingURL=transformhelper-24.2.js.map
