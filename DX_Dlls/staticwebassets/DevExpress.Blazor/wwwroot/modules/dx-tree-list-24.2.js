import { G as GridSelectors, a as GridRowDraggingHelperBase, b as GridDropPosition, c as GridDataRowKbdStrategy, d as GridInplaceEditRowKbdStrategy, e as GridDataTableKbdStrategy, f as GridDataTableBodyKbdStrategy, g as GridDataTableBodyWithVirtualScrollKbdStrategy, h as GridRootKbdStrategy, i as GridEditorManager, D as DxGridBase, j as DxTreeListTagName } from './dx-grid-24.2.js';
import { k as key } from './key-24.2.js';
import './dx-html-element-base-24.2.js';
import './data-qa-utils-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './tslib.es6-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './eventhelper-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './dx-license-24.2.js';
import './css-classes-24.2.js';
import './dx-ui-handlers-bridge-24.2.js';
import './dx-scroll-viewer-24.2.js';
import './scroll-viewer-css-classes-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './focushelper-24.2.js';
import './logicaltreehelper-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './dom-utils-24.2.js';
import './custom-events-helper-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './dx-virtual-scroll-viewer-24.2.js';
import './thumb-24.2.js';
import './pager-24.2.js';
import './dx-check-internal-24.2.js';
import './dragging-helper-24.2.js';
import './popup-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './property-24.2.js';
import './custom-element-24.2.js';
import './lit-element-24.2.js';
import './portal-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './capture-manager-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './grid-scroll-utils-24.2.js';
import './svg-utils-24.2.js';

class TreeListSelectors {
}
TreeListSelectors.TreeNodeExpandControlsCell = `${GridSelectors.TableCell}.dxbl-grid-tree-node-expand-controls-cell`;
TreeListSelectors.TreeNodeExpandControlsContainer = `${TreeListSelectors.TreeNodeExpandControlsCell} > .dxbl-grid-tree-node-expand-controls-container`;
TreeListSelectors.TreeNodeExpandButton = `${TreeListSelectors.TreeNodeExpandControlsContainer} > .dxbl-grid-tree-node-expand-button`;

class TreeListRowDraggingHelper extends GridRowDraggingHelperBase {
    getDropPosition() {
        if (!this.draggableRowContext)
            return GridDropPosition.Append;
        const { currentCursorPosition, mouseOverElementRect, mouseOverElement } = this.draggableRowContext;
        if (!mouseOverElement || !mouseOverElementRect)
            return GridDropPosition.Inside;
        if (GridRowDraggingHelperBase.isEmptyRow(mouseOverElement))
            return GridDropPosition.Append;
        if (!GridRowDraggingHelperBase.isDataRow(mouseOverElement))
            return GridDropPosition.Inside;
        if (this.isRestrictedArea(currentCursorPosition.y, mouseOverElementRect))
            return GridDropPosition.Inside;
        if (TreeListRowDraggingHelper.isCursorInMiddle(currentCursorPosition.y, mouseOverElementRect))
            return GridDropPosition.Inside;
        if (!this.isPositionalDropAllowed())
            return GridDropPosition.Append;
        return GridRowDraggingHelperBase.getDropPositionByCursor(currentCursorPosition.y, mouseOverElementRect);
    }
    isRestrictedArea(cursorY, rect) {
        const { top, bottom } = TreeListRowDraggingHelper.getBounds(rect);
        return (this.isRestrictedTopArea() && cursorY > top)
            || (this.isRestrictedBottomArea() && cursorY < bottom);
    }
    static isCursorInMiddle(cursorY, rect) {
        const { top, bottom } = TreeListRowDraggingHelper.getBounds(rect);
        return cursorY > top && cursorY < bottom;
    }
    static getBounds(rect) {
        const centerPointY = GridRowDraggingHelperBase.calculateVerticalCenter(rect);
        const quarterHeight = rect.height / 4;
        return {
            top: centerPointY - quarterHeight,
            bottom: centerPointY + quarterHeight
        };
    }
}

class TreeListKbdClientHelper {
    static isExpandCollapseHotkey(evt, isMacOsPlatform) {
        const keyCode = key.KeyUtils.getEventKeyCode(evt);
        if (keyCode !== key.KeyCode.Right && keyCode !== key.KeyCode.Left)
            return false;
        return isMacOsPlatform ? evt.metaKey : evt.ctrlKey;
    }
}

class TreeListDataRowKbdStrategy extends GridDataRowKbdStrategy {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    handleArrowLeftKeyDown(evt) {
        if (TreeListKbdClientHelper.isExpandCollapseHotkey(evt, this.isMacOSPlatform)) {
            this.performShortcutEvent(evt);
            return true;
        }
        return super.handleArrowLeftKeyDown(evt);
    }
    handleArrowRightKeyDown(evt) {
        if (TreeListKbdClientHelper.isExpandCollapseHotkey(evt, this.isMacOSPlatform)) {
            this.performShortcutEvent(evt);
            return true;
        }
        return super.handleArrowRightKeyDown(evt);
    }
}
class TreeListInplaceEditRowKbdStrategy extends GridInplaceEditRowKbdStrategy {
    constructor(tableStrategy, grid, targetElement) {
        super(tableStrategy, grid, targetElement);
    }
    handleArrowLeftKeyDown(evt) {
        if (TreeListKbdClientHelper.isExpandCollapseHotkey(evt, this.isMacOSPlatform)) {
            this.performShortcutEvent(evt);
            return true;
        }
        return super.handleArrowLeftKeyDown(evt);
    }
    handleArrowRightKeyDown(evt) {
        if (TreeListKbdClientHelper.isExpandCollapseHotkey(evt, this.isMacOSPlatform)) {
            this.performShortcutEvent(evt);
            return true;
        }
        return super.handleArrowRightKeyDown(evt);
    }
}

class TreeListDataTableKbdStrategy extends GridDataTableKbdStrategy {
    constructor(grid, targetElement) {
        super(grid, targetElement);
    }
    createTableBodyItemStrategy(itemElement) {
        if (this.isVirtualScrollingEnabled(itemElement))
            return new TreelistDataTableBodyWithVirtualScrollKbdStrategy(this, this.grid, itemElement);
        return new TreelistDataTableBodyKbdStrategy(this, this.grid, itemElement);
    }
}
class TreelistDataTableBodyKbdStrategy extends GridDataTableBodyKbdStrategy {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
    }
    createDataRowStrategy(element) {
        return new TreeListDataRowKbdStrategy(this, this.grid, element);
    }
    createInplaceEditRowStrategy(element) {
        return new TreeListInplaceEditRowKbdStrategy(this, this.grid, element);
    }
}
class TreelistDataTableBodyWithVirtualScrollKbdStrategy extends GridDataTableBodyWithVirtualScrollKbdStrategy {
    constructor(owner, grid, targetElement) {
        super(owner, grid, targetElement);
    }
    createDataRowStrategy(element) {
        return new TreeListDataRowKbdStrategy(this, this.grid, element);
    }
    createInplaceEditRowStrategy(element) {
        return new TreeListInplaceEditRowKbdStrategy(this, this.grid, element);
    }
}

class TreeListRootKbdStrategy extends GridRootKbdStrategy {
    constructor(grid) {
        super(grid);
    }
    createDataTableStrategy(dataTableElement) {
        return new TreeListDataTableKbdStrategy(this.grid, dataTableElement);
    }
}

class TreeListEditorManager extends GridEditorManager {
    constructor(grid) {
        super(grid);
    }
    isDataCellInteractiveElement(element) {
        if (!element)
            return false;
        return element.matches(TreeListSelectors.TreeNodeExpandControlsCell) || element.matches(TreeListSelectors.TreeNodeExpandButton);
    }
}

class DxTreeList extends DxGridBase {
    constructor() {
        super();
    }
    getTagName() {
        return DxTreeListTagName;
    }
    get bypassNonInlineHoverTitleElementChildSelector() {
        return TreeListSelectors.TreeNodeExpandControlsContainer;
    }
    allowInplaceEditingOnCellElementClick(targetElement) {
        return !targetElement.matches(`${TreeListSelectors.TreeNodeExpandButton} *`);
    }
    createRowDraggingHelper() {
        return new TreeListRowDraggingHelper(this);
    }
    createRootKeyboardNavigationStrategy() {
        return new TreeListRootKbdStrategy(this);
    }
    createEditorManager() {
        return new TreeListEditorManager(this);
    }
}
customElements.define(DxTreeListTagName, DxTreeList);
function loadModule() { }
const dxTreeList = { loadModule };

export { DxTreeList, dxTreeList as default };
//# sourceMappingURL=dx-tree-list-24.2.js.map
