# ngx-page-object-model

[![CodeFactor](https://www.codefactor.io/repository/github/FrancescoBorzi/ngx-page-object-model/badge)](https://www.codefactor.io/repository/github/FrancescoBorzi/ngx-page-object-model)
[![Actions Status](https://github.com/FrancescoBorzi/ngx-page-object-model/workflows/CI/badge.svg)](https://github.com/FrancescoBorzi/ngx-page-object-model/actions)
<a href="https://www.paypal.me/francesco92dev" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://www.npmjs.com/package/ngx-page-object-model" target="_blank"><img src="https://img.shields.io/npm/dw/ngx-page-object-model"></a>

ngx-page-object-model is a lightweight library designed to simplify writing [unit tests for Angular UI Components](https://javascript.plainenglish.io/component-dom-testing-in-angular-0d2256414c06) by leveraging the [Page Object Model (POM) design pattern](https://martinfowler.com/bliki/PageObject.html).

By using the Page Object Model design pattern, you can create a new abstraction level and keep your test logic separated from the logic to read and manipulate the DOM.

This library is fully Angular-based and completely testing-framework-agnostic, making it compatible with [Jasmine](https://jasmine.github.io/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), or any other unit testing framework.
It can be used alongside tools like [Spectator](https://ngneat.github.io/spectator/) or as a standalone solution.

## Setup

```
npm install -D ngx-page-object-model
```

- Check the [Documentation](https://francescoborzi.github.io/ngx-page-object-model) for more details

## Basic examples

### Example of tests without Page Object Model

In this minimalistic example, direct interaction with the DOM happens within the test itself, leading to repetition and more complex code:

```typescript
beforeEach(async () => {
  // ...
  fixture = TestBed.createComponent(CounterComponent);
});

it('should increase the counter when clicking on the increase button', () => {
  fixture.debugElement.query(By.css(`#increase-btn`)).nativeElement.click();

  expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('1');
});

it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
  fixture.debugElement.query(By.css(`#increase-btn`)).nativeElement.click();
  fixture.debugElement.query(By.css(`#increase-btn`)).nativeElement.click();

  fixture.debugElement.query(By.css(`#decrease-btn`)).nativeElement.click();

  expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('1');
});
```

### Example of tests using the Page Object Model

With the Page Object Model pattern, the logic to interact with the DOM is encapsulated within a dedicated page object.
This approach makes tests more readable, ensures accurate typing for HTML elements, and reduces code duplication. The page object is simply a class extending `PageObjectModel`:

```typescript
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

class CounterPage extends PageObjectModel<CounterComponent> {
  getIncreaseButton(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByCss('#increase-btn');
  }
  getDecreaseButton(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByCss('#decrease-btn');
  }
  getCount(): DebugHtmlElement<HTMLSpanElement> {
    return this.getDebugElementByTestId('count');
  }

  clickIncreaseButton(): void {
    this.getIncreaseButton().nativeElement.click();
  }
  clickDecreaseButton(): void {
    this.getDecreaseButton().nativeElement.click();
  }
}
```

The test code is now cleaner, more focused, and avoids repetitive DOM manipulation:

```typescript
beforeEach(async () => {
  // ...
  fixture = TestBed.createComponent(CounterComponent);
  page = new CounterPage(fixture);
});

it('should increase the counter when clicking on the increase button', () => {
  page.clickIncreaseButton();

  expect(page.getCount().nativeElement.innerHTML).toEqual('1');
});

it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
  page.clickIncreaseButton();
  page.clickIncreaseButton();

  page.clickDecreaseButton();

  expect(page.getCount().nativeElement.innerHTML).toEqual('0');
});
```

## More developer-friendly errors

When using Angular default methods, running into a typo in a selector usually gives you an error like this:

> TypeError: Cannot read properties of null (reading 'nativeElement')

The methods provided by `ngx-page-object-model`, such as `getDebugElementByCss()` and `getDebugElementByTestId()`, are instead designed to produce clearer and more descriptive error messages:

> Element with selector "#some-selector" was not found.

This makes debugging a lot smoother, helping you quickly spot and fix broken CSS selectors or incorrect `data-testid` values.

### Expect an element to not be there

If you want to explicitly check that an element is not present in the DOM, you can pass `false` to disable the default assertion error:

```typescript
// Assert that the count element is not present in the DOM
expect(page.getCount(false)).not.toBeDefined();
```

## Documentation

- Check the [Documentation](https://francescoborzi.github.io/ngx-page-object-model) for more code examples, features and techniques.
