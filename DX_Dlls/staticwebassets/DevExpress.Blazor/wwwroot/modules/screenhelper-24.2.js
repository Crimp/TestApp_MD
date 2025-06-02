import { a as Rect } from './layouthelper-24.2.js';

class ScreenHelper {
    static viewport() {
        return new Rect(window.scrollX, window.scrollY, document.documentElement.clientWidth, document.documentElement.clientHeight);
    }
    static page() {
        return new Rect(0, 0, document.body.clientWidth, document.body.clientHeight);
    }
}

export { ScreenHelper as S };
//# sourceMappingURL=screenhelper-24.2.js.map
