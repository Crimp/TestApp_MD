import { C as CssClasses } from './css-classes-24.2.js';

class SvgUtils {
    static getSvgHtml(iconName) {
        return `
<svg class="${CssClasses.Image}" role="img" aria-hidden="true">
    <use class="dxbl-icon-set-default" href="_content/DevExpress.Blazor/dx-blazor.svg#${iconName}"></use>
    <use class="dxbl-icon-set-fluent" href="_content/DevExpress.Blazor/dx-blazor.svg#${iconName}-fluent"></use>
</svg>`;
    }
}
SvgUtils.ArrowUpIconName = "dx-arrow-up";
SvgUtils.ArrowDownIconName = "dx-arrow-down";

export { SvgUtils as S };
//# sourceMappingURL=svg-utils-24.2.js.map
