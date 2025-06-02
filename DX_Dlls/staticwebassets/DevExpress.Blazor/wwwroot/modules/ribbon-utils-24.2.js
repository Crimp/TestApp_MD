import { d as dom } from './dom-24.2.js';
import { m as getItemByIndex } from './dom-utils-24.2.js';

const Utils = {};
Utils.getIsParent = function(parentElement, element) {
    if(!parentElement || !element)
        return false;
    while(element){
        if(element === parentElement)
            return true;
        if(element.tagName === "BODY")
            return false;
        element = element.parentNode;
    }
    return false;
};

Utils.getChildElementNodes = function(parent) {
    if(!parent) return null;
    return dom.DomUtils.getChildNodes(parent, function(e) { return e.nodeType === 1; });
};
Utils.getChildElementNodesByPredicate = function (parent, predicate) {
    if(!parent) return null;
    if(!predicate) return Utils.getChildElementNodes(parent);
    return dom.DomUtils.getChildNodes(parent, function(e) { return e.nodeType === 1 && predicate(e); });
};
Utils.getChildByClassName = function(element, className, index) {
    if(element != null){
        const collection = dom.DomUtils.getChildNodesByClassName(element, className);
        return getItemByIndex(collection, index);
    }
    return null;
};
Utils.elementMatchesSelector = (function (e) {
    return (function (matches) {
        return function (el, selector) { return !!el && !!selector && matches.call(el, selector); };
    })(e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector);
})(Element.prototype);

export { Utils as U };
//# sourceMappingURL=ribbon-utils-24.2.js.map
