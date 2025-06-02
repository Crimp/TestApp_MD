import { d as defineDxCustomElement } from './define-custom-element-24.2.js';
import { g as getDeviceInfo } from './devices-24.2.js';

class DxMenuPreloader extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["menu-id"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "menu-id")
            this.updateAttributes(newVal);
    }
    updateAttributes(id) {
        const parent = document.querySelector(`[data-dxmenu-id=${id}]`);
        if (parent) {
            // TODO: find a solution to initialize DeviceInfo earlier or pass useUAData flag here
            const deviceInfo = getDeviceInfo();
            if (deviceInfo.isMobileDevice)
                parent.toggleAttribute("data-dx-menu-mobile", true);
            parent.toggleAttribute("data-dx-menu-loaded", true);
        }
    }
}
defineDxCustomElement(customElements, "dxbl-menu-preloader", DxMenuPreloader);

export { DxMenuPreloader as default };
//# sourceMappingURL=dx-menu-preloader-24.2.js.map
