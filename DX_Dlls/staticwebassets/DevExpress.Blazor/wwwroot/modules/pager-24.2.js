import { D as DataQaUtils } from './data-qa-utils-24.2.js';
import { C as CssClasses } from './css-classes-24.2.js';

const PagerSizeSelectorCssClass = CssClasses.Prefix + "-pager-page-size-selector";
class DxPager extends HTMLElement {
    connectedCallback() {
        DataQaUtils.setLoaded(this);
    }
    disconnectedCallback() {
        DataQaUtils.removeLoaded(this);
    }
}
customElements.define("dxbl-pager", DxPager);
function loadModule() { }
const pager = { loadModule };

export { PagerSizeSelectorCssClass, pager as default };
//# sourceMappingURL=pager-24.2.js.map
