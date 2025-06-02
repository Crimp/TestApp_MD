import { L as LayoutHelper } from './layouthelper-24.2.js';

function isIPopupAccessor(obj) {
    return isOfType(obj, ["popup", "addEventListener", "removeEventListener"]);
}
function isIPopupClientSideApi(obj) {
    return isOfType(obj, ["branchType", "reposition", "desiredWidth", "desiredHeight", "minDesiredWidth", "minDesiredHeight", "closeHierarchyAsync", "closeAsync", "processCapturedPointerAsync", "addEventListener", "removeEventListener", "contains", "focus", "positionChanged", "renderedVisible"]);
}
function isIPopupBaseClientSideApi(obj) {
    return isOfType(obj, ["closeHierarchyAsync", "closeAsync", "processCapturedPointerAsync", "addEventListener", "removeEventListener", "contains", "focus", "positionChanged", "renderedVisible"]);
}
function isILogicalChildBase(obj) {
    return isOfType(obj, ["logicalParent"]);
}
function isILogicalOwner(obj) {
    return isOfType(obj, ["logicalChildren", "addLogicalChild", "removeLogicalChild"]);
}
function isIAdaptiveDropDown(obj) {
    return isOfType(obj, ["adaptivityEnabled"]);
}
function isISupportCaptureHierarchyElement(obj) {
    return isOfType(obj, ["processCapturedPointerAsync", "processCapturedKeyDownAsync"]);
}
function isOfType(obj, properties) {
    if (properties.length === 0)
        throw new Error("empty interface");
    for (const property of properties) {
        if (!(property in obj))
            return false;
    }
    return true;
}

class LogicalTreeHelper {
    static getParent(element, slotTree) {
        var _a;
        if (isILogicalChildBase(element))
            return (_a = element.logicalParent) !== null && _a !== void 0 ? _a : LayoutHelper.getParent(element, slotTree);
        return LayoutHelper.getParent(element, slotTree);
    }
    static findParent(element, predicate, slotTree = true) {
        // eslint-disable-next-line no-restricted-syntax
        for (const parent of LogicalTreeHelper.getRootPath(element, null, slotTree)) {
            const check = parent;
            if (check && predicate(parent))
                return parent;
        }
        return null;
    }
    static containsElement(parent, child) {
        if (!child)
            return false;
        return LogicalTreeHelper.findParent(child, x => x === parent) !== null;
    }
    static *getRootPath(element, root = null, slotTree = true) {
        let parent = LogicalTreeHelper.getParent(element, slotTree);
        while (parent && parent !== root) {
            yield parent;
            parent = LogicalTreeHelper.getParent(parent, slotTree);
        }
    }
}

export { LogicalTreeHelper as L, isIPopupBaseClientSideApi as a, isILogicalOwner as b, isIPopupClientSideApi as c, isILogicalChildBase as d, isIPopupAccessor as e, isIAdaptiveDropDown as f, isISupportCaptureHierarchyElement as i };
//# sourceMappingURL=logicaltreehelper-24.2.js.map
