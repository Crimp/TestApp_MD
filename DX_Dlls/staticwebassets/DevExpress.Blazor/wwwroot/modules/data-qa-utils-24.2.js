class DataQaUtils {
    static setLoaded(el) {
        this.setAttribute(el, DataQaUtils.loaded);
    }
    static removeLoaded(el) {
        this.removeAttribute(el, DataQaUtils.loaded);
    }
    static hasLoaded(el) {
        return el.getAttribute(DataQaUtils.prefix + DataQaUtils.loaded) !== null;
    }
    static setAttribute(el, attr, value = null) {
        el.setAttribute(DataQaUtils.prefix + attr, value !== null && value !== void 0 ? value : "");
    }
    static removeAttribute(el, attr) {
        el.removeAttribute(DataQaUtils.prefix + attr);
    }
}
DataQaUtils.prefix = "data-qa-dxbl-";
DataQaUtils.loaded = "loaded";

export { DataQaUtils as D };
//# sourceMappingURL=data-qa-utils-24.2.js.map
