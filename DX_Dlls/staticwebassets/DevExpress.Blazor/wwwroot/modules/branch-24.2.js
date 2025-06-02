import { _ as __decorate } from './tslib.es6-24.2.js';
import { n } from './property-24.2.js';
import { e } from './custom-element-24.2.js';
import { s } from './lit-element-24.2.js';

const dxBranchTagName = "dxbl-branch";
class BranchContext {
    get parentId() {
        return this._parentId;
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    constructor(id, parentId, type) {
        this._id = id;
        this._parentId = parentId;
        this._type = type;
    }
}
class BranchIdContext {
    get id() {
        return this._id;
    }
    constructor(id) {
        this._id = id;
    }
}
class BranchRefreshedEvent extends CustomEvent {
    constructor(detail) {
        super(BranchRefreshedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
BranchRefreshedEvent.eventName = "dxbranchrefreshed";
class BranchActivatedEvent extends CustomEvent {
    constructor(detail) {
        super(BranchActivatedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
BranchActivatedEvent.eventName = "dxbranchactivated";
class BranchUpdatedEvent extends CustomEvent {
    constructor(detail) {
        super(BranchUpdatedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
BranchUpdatedEvent.eventName = "dxbranchupdated";
class BranchRemovedEvent extends CustomEvent {
    constructor(detail) {
        super(BranchRemovedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
BranchRemovedEvent.eventName = "dxbranchremoved";
class BranchCreatedEvent extends CustomEvent {
    constructor(detail) {
        super(BranchCreatedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true
        });
    }
}
BranchCreatedEvent.eventName = "dxbranchcreated";
let DxBranch = class DxBranch extends s {
    constructor() {
        super(...arguments);
        this.parentBranchId = null;
    }
    createRenderRoot() {
        return this;
    }
    updated(updated) {
        if (!this.branchId)
            return;
        if (updated.get("branchId") || updated.get("parentBranchId") || updated.get("branchType"))
            this.raiseUpdated();
    }
    raiseUpdated() {
        const context = new BranchContext(this.branchId, this.parentBranchId, this.branchType);
        const event = new BranchUpdatedEvent(context);
        this.dispatchEvent(event);
    }
    connectedCallback() {
        super.connectedCallback();
        this.raiseCreated();
    }
    raiseCreated() {
        if (!this.branchId)
            return;
        const context = new BranchContext(this.branchId, this.parentBranchId, this.branchType);
        const event = new BranchCreatedEvent(context);
        this.dispatchEvent(event);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.raiseRemoved();
    }
    raiseRemoved() {
        if (!this.branchId)
            return;
        const context = new BranchContext(this.branchId, this.parentBranchId, this.branchType);
        const event = new BranchRemovedEvent(context);
        this.dispatchEvent(event);
    }
};
__decorate([
    n({ type: String, attribute: "branch-id" })
], DxBranch.prototype, "branchId", void 0);
__decorate([
    n({ type: String, attribute: "parent-branch-id" })
], DxBranch.prototype, "parentBranchId", void 0);
__decorate([
    n({ type: String, attribute: "type" })
], DxBranch.prototype, "branchType", void 0);
DxBranch = __decorate([
    e(dxBranchTagName)
], DxBranch);
function init() {
}
const branch = { init, DxBranch, dxBranchTagName, BranchUpdatedEvent };

export { BranchActivatedEvent, BranchContext, BranchCreatedEvent, BranchIdContext, BranchRefreshedEvent, BranchRemovedEvent, BranchUpdatedEvent, branch as default, dxBranchTagName, init };
//# sourceMappingURL=branch-24.2.js.map
