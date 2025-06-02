import { _ as __decorate } from './tslib.es6-24.2.js';
import { d as dom } from './dom-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';
import { n } from './property-24.2.js';
import { S as SingleSlotElementBase } from './single-slot-element-base-24.2.js';
import { C as CustomEventsHelper } from './custom-events-helper-24.2.js';

class ContentChangedContext {
}
class ContentChangedEvent extends CustomEvent {
    constructor(detail) {
        super(ContentChangedEvent.eventName, {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true
        });
    }
    static create() {
        return new ContentChangedEvent(new ContentChangedContext());
    }
}
ContentChangedEvent.eventName = "dxbl-grid-layout-root-element-base.contentchanged";
CustomEventsHelper.register(ContentChangedEvent.eventName, x => {
    return x.detail;
});
class DxGridLayoutElementBase extends SingleSlotElementBase {
    constructor() {
        super(...arguments);
        this.layoutInfo = "";
    }
    willUpdate(changed) {
        if (changed.has("layoutInfo"))
            this.applyLayout();
    }
    applyLayout() {
        if (this.layoutInfo) {
            const info = JSON.parse(this.layoutInfo);
            for (const key in info)
                this.style.setProperty(key, `${info[key]}`);
        }
    }
}
__decorate([
    n({ attribute: "layout-info" })
], DxGridLayoutElementBase.prototype, "layoutInfo", void 0);
class DxGridLayoutRootElementBase extends DxGridLayoutElementBase {
    createRenderRoot() {
        this.applyLayout();
        return super.createRenderRoot();
    }
    contentChanged() {
        this.makeChildrenVisible();
        this.dispatchEvent(ContentChangedEvent.create());
    }
    restoreState() {
        super.restoreState();
        this.makeChildrenVisible();
    }
    makeChildrenVisible() {
        dom.DomUtils.removeClassName(this, CssClasses.Invisible);
    }
}

export { DxGridLayoutElementBase as D, DxGridLayoutRootElementBase as a };
//# sourceMappingURL=dx-grid-layout-element-base-24.2.js.map
