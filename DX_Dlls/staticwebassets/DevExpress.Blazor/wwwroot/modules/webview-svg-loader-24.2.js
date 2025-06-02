import { d as defineDxCustomElement } from './define-custom-element-24.2.js';

let spriteLoaded = false;
const spriteUrlAttributeName = "src";
const observedAttributes = [spriteUrlAttributeName];
const containerForAllSvgSprites = document.createElement("DIV");
containerForAllSvgSprites.style.display = "none";
requestAnimationFrame(() => {
    document.body.appendChild(containerForAllSvgSprites);
});
class DxWebViewSpritePreloader extends HTMLElement {
    connectedCallback() {
        this.style.display = "none";
    }
    static get observedAttributes() {
        return observedAttributes;
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (spriteLoaded)
            return;
        spriteLoaded = true;
        if (name === spriteUrlAttributeName)
            DxWebViewSpritePreloader.loadAndEmbedSpriteAsync(newVal).then((_) => { }).catch((_) => { });
    }
    static async loadAndEmbedSpriteAsync(spriteUrl) {
        const svgMarkup = await fetch(spriteUrl).then(r => r.text());
        const div = document.createElement("DIV");
        div.innerHTML = svgMarkup;
        containerForAllSvgSprites.appendChild(div);
    }
}
defineDxCustomElement(customElements, "dxbl-webview-sprite-preloader", DxWebViewSpritePreloader);

export { DxWebViewSpritePreloader as default };
//# sourceMappingURL=webview-svg-loader-24.2.js.map
