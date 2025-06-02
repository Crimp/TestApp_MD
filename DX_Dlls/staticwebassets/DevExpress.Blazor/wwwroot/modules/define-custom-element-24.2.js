const domContainer = document;
function defineDxCustomElement(registry, selector, proto) {
    const existingElements = domContainer.querySelectorAll(selector);
    const length = existingElements.length;
    for (let i = 0; i < length; i++)
        registry.upgrade(existingElements[i]);
    registry.define(selector, proto);
}

export { defineDxCustomElement as d };
//# sourceMappingURL=define-custom-element-24.2.js.map
