import { e as dateRangePickerTagName } from './constants-24.23.js';
import { D as DxDateEditBase } from './dx-date-edit-base-24.2.js';
import adaptiveDropdownComponents from './adaptivedropdowncomponents-24.2.js';
import { c as calendarComponent } from './dx-calendar-24.2.js';
import { E as EventHelper } from './eventhelper-24.2.js';
import './dx-dropdown-base3-24.2.js';
import './tslib.es6-24.2.js';
import './dx-html-element-pointer-events-helper-24.2.js';
import './dom-24.2.js';
import './_commonjsHelpers-24.2.js';
import './string-24.2.js';
import './browser-24.2.js';
import './constants-24.2.js';
import './devices-24.2.js';
import './custom-events-helper-24.2.js';
import './portal-24.2.js';
import './data-qa-utils-24.2.js';
import './constants-24.22.js';
import './const-24.2.js';
import './lit-element-24.2.js';
import './property-24.2.js';
import './custom-element-24.2.js';
import './popup-24.2.js';
import './layouthelper-24.2.js';
import './point-24.2.js';
import './rafaction-24.2.js';
import './screenhelper-24.2.js';
import './transformhelper-24.2.js';
import './positiontracker-24.2.js';
import './branch-24.2.js';
import './logicaltreehelper-24.2.js';
import './dx-ui-element-24.2.js';
import './lit-element-base-24.2.js';
import './dx-license-24.2.js';
import './capture-manager-24.2.js';
import './focushelper-24.2.js';
import './nameof-factory-24.2.js';
import './focustrap-24.2.js';
import './tabbable-24.2.js';
import './key-24.2.js';
import './keyboard-navigation-strategy-24.2.js';
import './dom-utils-24.2.js';
import './css-classes-24.2.js';
import './focus-utils-24.2.js';
import './disposable-24.2.js';
import './masked-input-24.2.js';
import './text-editor-24.2.js';
import './single-slot-element-base-24.2.js';
import './input-24.2.js';
import './constants-24.25.js';
import './tabs-events-24.2.js';
import './dx-tag-names-24.2.js';
import './roller-24.2.js';
import './observables-24.2.js';
import './dropdowncomponents-24.2.js';
import './dropdown-24.2.js';
import './thumb-24.2.js';
import './query-24.2.js';
import './popupportal-24.2.js';
import './events-interseptor-24.2.js';
import './modalcomponents-24.2.js';
import './dx-html-element-base-24.2.js';

class DxDateRangePicker extends DxDateEditBase {
    processPointerDown(e) {
        if (EventHelper.containsInComposedPath(e, this.isFieldElement.bind(this)) && !this.isDropDownOpen)
            this.tryOpenDropDown();
        return super.processPointerDown(e);
    }
}
customElements.define(dateRangePickerTagName, DxDateRangePicker);
function loadModule() { }
const dxDateRangePicker = { loadModule, adaptiveDropdownComponents, calendarComponent };

export { DxDateRangePicker, dxDateRangePicker as default };
//# sourceMappingURL=dx-date-range-picker-24.2.js.map
