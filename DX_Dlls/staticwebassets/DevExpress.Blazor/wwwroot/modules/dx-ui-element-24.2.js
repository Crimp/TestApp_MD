import { L as LitElementBase } from './lit-element-base-24.2.js';
import { i as isISupportCaptureHierarchyElement, L as LogicalTreeHelper } from './logicaltreehelper-24.2.js';

class DxUIElement extends LitElementBase {
    constructor() {
        super();
        this._logicalParent = null;
        this._logicalChildren = new Array();
    }
    get hasLogicalParent() {
        return !!this.logicalParent;
    }
    get logicalParent() {
        return this._logicalParent;
    }
    set logicalParent(value) {
        this._logicalParent = value;
    }
    get logicalChildren() {
        return this._logicalChildren;
    }
    addLogicalChild(child) {
        if (child.logicalParent)
            throw new Error("Child element already added.");
        this._logicalChildren.push(child);
        child.logicalParent = this;
    }
    removeLogicalChild(child) {
        child.logicalParent = null;
        const index = this._logicalChildren.indexOf(child);
        if (index > -1)
            this._logicalChildren.splice(index, 1);
    }
    async processCapturedKeyDownAsync(event, options) {
        if (options.handled)
            return;
        if (this.logicalParent && isISupportCaptureHierarchyElement(this.logicalParent))
            await this.logicalParent.processCapturedKeyDownAsync(event, options);
    }
    async processCapturedPointerAsync(event, options) {
        if (options.handled)
            return;
        const logicalParent = LogicalTreeHelper.findParent(this, x => isISupportCaptureHierarchyElement(x));
        if (logicalParent && isISupportCaptureHierarchyElement(logicalParent))
            await logicalParent.processCapturedPointerAsync(event, options);
    }
    isPointedCaptured(e) {
        const logicalParent = LogicalTreeHelper.findParent(this, x => isISupportCaptureHierarchyElement(x));
        return logicalParent != null;
    }
}

export { DxUIElement as D };
//# sourceMappingURL=dx-ui-element-24.2.js.map
