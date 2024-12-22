# ngx-page-object-model

ngx-page-object-model is a lightweight library designed to simplify writing [unit tests for Angular UI Components](https://javascript.plainenglish.io/component-dom-testing-in-angular-0d2256414c06) by leveraging the [Page Object Model (POM) design pattern](https://martinfowler.com/bliki/PageObject.html).

This library is fully Angular-based and completely testing-framework-agnostic, making it compatible with [Jasmine](https://jasmine.github.io/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), or any other unit testing framework. 
It can be used alongside tools like [Spectator](https://ngneat.github.io/spectator/) or as a standalone solution, offering maximum flexibility.

By using the Page Object Model design pattern, you can create a new abstraction and separate your test logic from the logic to read and manipulate the DOM.

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
    return this.getDebugElementByTestId('increase');
  }
  getDecreaseButton(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByTestId('decrease');
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

  expect(page.getCount().nativeElement.innerHTML).toEqual('0');
});

it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
  page.clickIncreaseButton();
  page.clickIncreaseButton();

  page.clickDecreaseButton();

  expect(page.getCount().nativeElement.innerHTML).toEqual('0');
});
```
