var _a;
class Visibility {
}
Visibility.visible = "visible";
Visibility.hidden = "hidden";
Visibility.collapse = "collapse";
class Display {
}
Display.block = "block";
Display.inline = "inline";
Display.inlineBlock = "inline-block";
Display.inlineTable = "inline-table";
Display.listItem = "list-item";
Display.none = "none";
Display.runIn = "run-in";
Display.table = "table";
Display.tableCaption = "table-caption";
Display.tableCell = "table-cell";
Display.tableColumnGroup = "table-column-group";
Display.tableColumn = "table-column";
Display.tableFooterGroup = "table-footer-group";
Display.tableHeaderGroup = "table-header-group";
Display.tableRow = "table-row";
Display.tableRowGroup = "table-row-group";
Display.flex = "flex";
class Tags {
}
Tags.input = "INPUT";
Tags.textarea = "TEXTAREA";
Tags.video = "VIDEO";
Tags.audio = "AUDIO";
Tags.details = "DETAILS";
Tags.textArea = "TEXTAREA";
Tags.table = "table";
Tags.tableCell = "td";
Tags.tableHeaderCell = "th";
Tags.mark = "mark";
class A11y {
}
_a = A11y;
A11y.aria = "aria";
A11y.ariaExpanded = `${_a.aria}-expanded`;
A11y.ariaLevel = `${_a.aria}-level`;
A11y.ariaChecked = `${_a.aria}-checked`;
A11y.ariaSelected = `${_a.aria}-selected`;
class InputType {
}
InputType.hidden = "hidden";
class Attribute {
}
Attribute.textTrimmed = "text-trimmed";
Attribute.title = "title";
class TextOverflow {
}
TextOverflow.ellipsis = "ellipsis";
const FocusableElementsSelector = "a[href], input:not([disabled]), button:not([disabled]), textarea:not([disabled]), select:not([disabled]), area[href], iframe, object, embed, [tabindex]:not([tabindex='-1'])";

export { Attribute as A, Display as D, FocusableElementsSelector as F, InputType as I, Tags as T, Visibility as V, TextOverflow as a, A11y as b };
//# sourceMappingURL=constants-24.2.js.map
