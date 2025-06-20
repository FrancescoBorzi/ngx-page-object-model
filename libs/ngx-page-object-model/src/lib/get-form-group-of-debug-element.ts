import { FormGroup, FormGroupDirective } from '@angular/forms';

import { DebugHtmlElement } from './debug-html-element';

export function getFormGroupOfDebugElement(debugElement: DebugHtmlElement, assert = true): FormGroup {
  let formGroupDirective;

  try {
    formGroupDirective = debugElement.injector.get(FormGroupDirective);
  } catch {
    if (assert) {
      throw new Error(
        `Unable to find binding [formGroup] for element "${debugElement.name}[data-testid=${debugElement.attributes['data-testid']}]"`,
      );
    }
  }

  return formGroupDirective?.form as FormGroup;
}
