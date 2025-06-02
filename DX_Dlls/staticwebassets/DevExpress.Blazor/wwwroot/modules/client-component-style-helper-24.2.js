class ClientComponentStyleHelper {
    constructor() { }
    static getInstance() {
        if (!ClientComponentStyleHelper.instance)
            ClientComponentStyleHelper.instance = new ClientComponentStyleHelper();
        return ClientComponentStyleHelper.instance;
    }
    get palette() {
        return this.getDefaultClientComponentPalette();
    }
    getDefaultClientComponentPalette() {
        const colors = [
            ClientComponentStyleHelper.primaryColorKey,
            ClientComponentStyleHelper.successColorKey,
            ClientComponentStyleHelper.dangerColorKey,
            ClientComponentStyleHelper.warningColorKey,
            ClientComponentStyleHelper.infoColorKey
        ];
        const style = window.getComputedStyle(document.body);
        return colors.map(c => this.getPaletteColor(c, style));
    }
    getPaletteColor(key, style) {
        return style.getPropertyValue(ClientComponentStyleHelper.dxblClientComponentPrefix + key);
    }
}
ClientComponentStyleHelper.dxblPrefix = "--dxbl-";
ClientComponentStyleHelper.dxblClientComponentPrefix = ClientComponentStyleHelper.dxblPrefix + "client-component-palette-";
ClientComponentStyleHelper.primaryColorKey = "primary";
ClientComponentStyleHelper.successColorKey = "success";
ClientComponentStyleHelper.dangerColorKey = "danger";
ClientComponentStyleHelper.warningColorKey = "warning";
ClientComponentStyleHelper.infoColorKey = "info";

export { ClientComponentStyleHelper as C };
//# sourceMappingURL=client-component-style-helper-24.2.js.map
