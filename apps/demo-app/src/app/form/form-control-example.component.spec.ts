import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel, getFormControlOfDebugElement } from 'ngx-page-object-model';

import { FormControlExampleComponent } from './form-control-example.component';
import { CustomTextInputComponent } from './custom-text-input.component';

describe(FormControlExampleComponent.name, () => {
  class Page extends PageObjectModel<FormControlExampleComponent> {
    customTextInput(): DebugHtmlElement<HTMLElement> {
      return this.getDebugElementByTestId('custom-text-input');
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlExampleComponent, CustomTextInputComponent],
      // Note: assume that CustomTextInputComponent can also just be mocked here
    }).compileComponents();
  });

  const setup = () => {
    const page = new Page(TestBed.createComponent(FormControlExampleComponent));

    return { page };
  };

  it('should initialize a formControl and pass it to the <app-custom-text-input> component', () => {
    const { page } = setup();
    page.detectChanges();

    // get the form control through the DOM
    const customTextInput = page.customTextInput();
    const formControl = getFormControlOfDebugElement(customTextInput);

    expect(formControl.value).toEqual('Custom initial value');
  });
});
