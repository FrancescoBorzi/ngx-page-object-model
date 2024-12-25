---
sidebar_position: 1
---

# Testing Form Controls

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
  // here we have access to the formControl that is passed as input inside the MyCustomInputTextComponent
});
```

However, consider now the scenario where we have to test another component that initializes some `protected formControl` and passes it down to a child element of its template.

Also, the child element could just be an `<input>` HTML element and we could technically check the effect of changes on the value of the formControl on it.
But what if we are instead passing it to a custom child component that is mocked?

Consider the following code:

```typescript
@Component({
  selector: 'app-form-example-component',
  template: `
    <app-custom-text-input [formControl]="formControl" data-testid="custom-text-input" />
  `,
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

You might be tempted to just declare it `public`, but that would go against the [encapsulation](./best-practices/encapsulation) principle.
Also, even if we declared that as `public` and access it directly using `component.formControl` in our test, that would only allow us to test its value initialization,
but not the part where we correctly pass it to the `<app-custom-text-input>` element. In other words, we wouldn't be testing our component template but only its class.

To solve this, the `ngx-page-object-model` library provides a `getFormControlOfDebugElement()` method that, given a debug element, it returns the `[formControl]` bound to it:

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

Cool, right?

The full test code looks like this:

```typescript
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
```

_The full source code of this example can be found [here](https://github.com/FrancescoBorzi/ngx-page-object-model/blob/main/apps/demo-app/src/app/form/)._