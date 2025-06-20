---
sidebar_position: 1
---

# Testing Form Controls

### The issue

When working with forms, it is often useful to access the [FormControl](https://angular.dev/api/forms/FormControl) object bound to a specific HTML element.

In the case of a Component implementing the [ControlValueAccessor](https://javascript.plainenglish.io/angulars-controlvalueaccessor-17c1ab6548b2) and accepting the `[formControl]` as input, that is straightforward.
You can just pass it in the test `setup()` function:

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyCustomInputTextComponent],
  }).compileComponents();
});

const setup = () => {
  const page = new Page(TestBed.createComponent(MyCustomInputTextComponent));
  const formControl = new FormControl<string>('');
  page.fixture.componentRef.setInput('formControl', formControl);
  return { page, formControl };
};

it('should do something', () => {
  const { page, formControl } = setup();
  // we have access to the formControl that is passed as input inside the MyCustomInputTextComponent
});
```

However, consider now the scenario where we have to test another component that initializes some `protected formControl` and passes it down to a child element of its template.

Also, the child element could just be an `<input>` HTML element and we could technically check the effect of changes on the value of the formControl on it.
But what if we are instead passing it to a custom child component that is mocked?

Consider the following code:

```typescript
@Component({
  selector: 'app-form-control-example-component',
  template: ` <app-custom-text-input [formControl]="formControl" data-testid="custom-text-input" /> `,
  imports: [CustomTextInputComponent, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExampleComponent {
  protected readonly formControl = new FormControl<string>('Custom initial value');
}
```

What this component does is quite simple:

- Creates an instance of a `formControl` and initializes its value to _"Custom initial value"_
- Passes it down to the custom `<app-custom-text-input>`

Now suppose that we want to write a unit test for this component where the inner `<app-custom-text-input>` is mocked.
How can we access the `formControl`?

You might be tempted to just declare it `public`, but that would go against the [encapsulation](../best-practices/encapsulation) principle.
Another possible approach would be using an ugly type hack like `(page.fixture.componentInstance as any)['formControl']`.

However, both these hacky approaches would only allow us to test the control value initialization,
not the part where we correctly pass it to the `<app-custom-text-input>` element.
**In other words, we wouldn't be testing our component template but only its class.**

### The solution: getFormControlOfDebugElement()

To solve this issue properly and avoid hacky solutions, the `ngx-page-object-model` library provides a `getFormControlOfDebugElement()` method that, given a debug element, it returns the `[formControl]` bound to it:

```typescript
getFormControlOfDebugElement(debugElement: DebugHtmlElement, assert = true): AbstractControl
```

We can then implement the test for our component like the following.
First let's create a Page Object to get the `<app-custom-text-input>` element from the component rendered template:

```typescript
class Page extends PageObjectModel<FormExampleComponent> {
  customTextInput(): DebugHtmlElement<HTMLElement> {
    return this.getDebugElementByTestId('custom-text-input');
  }
}
```

Now, in the test, use it to get such element and then use the `getFormControlOfDebugElement()` method provided by the `ngx-page-object-model` library to get the `formControl` bound to it:

```typescript
it('should initialize a formControl and pass it to the <app-custom-text-input> component', () => {
  const { page } = setup();
  page.detectChanges();

  // get the form control through the DOM
  const customTextInput = page.customTextInput();
  const formControl = getFormControlOfDebugElement(customTextInput);

  expect(formControl.value).toEqual('Custom initial value');
});
```

This way we access the `formControl` object from the DOM instead of the Component's class.
By doing so we are implicitly testing that it is correctly bound to the `<app-custom-text-input>` element
and then we check its value by simply calling `formControl.value`.

The full test code looks like this:

```typescript
import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel, getFormControlOfDebugElement } from 'ngx-page-object-model';

import { FormExampleComponent } from './form-control-example.component';
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
});
```

### Working with FormGroup: getFormGroupOfDebugElement()

Similarly, you may want to get the [FormGroup](https://angular.dev/api/forms/FormGroup) object bound to a `<form>` HTML Element, for example:

```html
<form [formGroup]="formGroup" data-testid="my-form-group">
  <app-custom-text-input formControlName="myControl" />
</form>
```

To do this, you can use the `getFormGroupOfDebugElement()` method provided by the `ngx-page-object-model` library:

```typescript
class Page extends PageObjectModel<FormGroupExampleComponent> {
  myFormGroup(): DebugHtmlElement<HTMLFormElement> {
    return this.getDebugElementByTestId('my-form-group');
  }
}
```

```typescript
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
```

_The full source code of this example can be found [here](https://github.com/FrancescoBorzi/ngx-page-object-model/blob/main/apps/demo-app/src/app/form/)._
