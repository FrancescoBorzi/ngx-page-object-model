import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel, getFormGroupOfDebugElement } from 'ngx-page-object-model';

import { FormGroupExampleComponent } from './form-group-example.component';
import { CustomTextInputComponent } from './custom-text-input.component';
import { FormControl } from '@angular/forms';

describe(FormGroupExampleComponent.name, () => {
  class Page extends PageObjectModel<FormGroupExampleComponent> {
    myFormGroup(): DebugHtmlElement<HTMLFormElement> {
      return this.getDebugElementByTestId('my-form-group');
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupExampleComponent, CustomTextInputComponent],
      // Note: assume that CustomTextInputComponent can also just be mocked here
    }).compileComponents();
  });

  const setup = () => {
    const page = new Page(TestBed.createComponent(FormGroupExampleComponent));

    return { page };
  };

  it('should initialize a formGroup with a formControl inside it and pass it to the <app-custom-text-input> component', () => {
    const { page } = setup();
    page.detectChanges();

    // get the form group through the DOM
    const myFormHtmlElement = page.myFormGroup();
    const formGroup = getFormGroupOfDebugElement(myFormHtmlElement);
    const formControl = formGroup.get('myControl');

    expect(formControl).toBeTruthy();
    expect(formControl?.value).toEqual('Custom initial value');
  });

  it('should initialize a typed formGroup with a formControl inside it and pass it to the <app-custom-text-input> component', () => {
    const { page } = setup();
    page.detectChanges();

    // get the form group through the DOM
    const myFormHtmlElement = page.myFormGroup();
    const formGroup = getFormGroupOfDebugElement<{ myControl: FormControl<string> }>(myFormHtmlElement);
    const formControl = formGroup.get('myControl');

    expect(formControl).toBeTruthy();
    // the type of formControl?.value is string, so we can call .trim()
    expect(formControl?.value.trim()).toEqual('Custom initial value');
  });
});
