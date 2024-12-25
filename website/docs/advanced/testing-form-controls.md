---
sidebar_position: 1
---

# Testing Form Controls

When working with forms, it is often useful to access the [FormControl](https://angular.dev/api/forms/FormControl) object bound to a specific HTML element.

In the case of a Component implementing the [ControlValueAccessor](https://javascript.plainenglish.io/angulars-controlvalueaccessor-17c1ab6548b2) and accepting the `[control]` as input, that is straightforward.
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
  page.fixture.componentRef.setInput('control', formControl);
  return { page, formControl };
};

it('should do something', () => {
  const { page, formControl } = setup();
  // here we have access to the formControl that is passed as input inside the MyCustomInputTextComponent
});
```

However, consider now the scenario where we have to test another component that initializes some `protected formControl` and passes it down to child element of its template.

Also, the child element could just be an `<input>` HTML element and we could technically check the effect of changes on the value of the formControl on it.
But what if we are are instead passing it to a custom child component that is mocked?

Consider the following code:

```typescript
@Component({
  template: `
    <h1>This component wraps a custom component implementing ControlValueAccessor</h1>
    <app-custom-text-input [control]="formControl" />
  `
})
export class TestComponent {
  protected readonly formControl = new FormControl<string>('Custom initial value');
}
```

What this component does is quite simple:

- Creates an instance of a `formControl` and initializes its value it to _"Custom initial value"_
- Passes it down to the custom `<app-custom-text-input>`

Now suppose that we want to write a unit test for this component where the inner `<app-custom-text-input>` is mocked.
How can we access the `formControl`?

You might be temped to just declare it `public`, but that would go against the [encapsulation](./best-practices/encapsulation) principle.
Also, even if we declared that as `public` and access it directly using `component.formControl` in our test, that would only allow us to test its value initialization,
but not the part where we correctly pass it the `<app-custom-text-input>` element. In other words, we wouldn't be testing our component template but only its class.

To solve this, the `ngx-page-object-model` library provides a `getFormControlOfDebugElement()` method that, given a debug element, it returns the `[formControl]` bound to it:

```typescript
getFormControlOfDebugElement(debugElement: DebugHtmlElement, assert = true): AbstractControl
```

We can then implement the test for our component this way:

