import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel, getFormControlOfDebugElement } from 'ngx-page-object-model';

import { FormExampleComponent } from './form-example.component';
import { CustomTextInputComponent } from './custom-text-input.component';

describe(FormExampleComponent.name, () => {
  class Page extends PageObjectModel<FormExampleComponent> {
    customTextInput(): DebugHtmlElement<HTMLElement> {
      return this.getDebugElementByTestId('custom-text-input');
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExampleComponent, CustomTextInputComponent],
      // Note: assume that CustomTextInputComponent can also just be mocked here
    }).compileComponents();
  });

  const setup = () => {
    const page = new Page(TestBed.createComponent(FormExampleComponent));

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
})
