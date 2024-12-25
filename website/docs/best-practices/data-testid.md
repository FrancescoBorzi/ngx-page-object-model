---
sidebar_position: 2
---

# Use data-testid attributes

Using common CSS selectors to find elements in automation testing is not the best approach.
They are prone to change over time due to evolving software requirements and implementation details.
Automation testing should not rely on such selectors.

Developers can accidentally break tests by simply changing a `<span>` to a `<div>` or altering some CSS classes or IDs, 
without realizing that tests were relying on those.

A good approach that is widely accepted best practice in automation testing is to use a specific `data-testid` attribute.

So instead of doing:

```html
<button class="btn btn-primary">Click me</button>
```
```typescript
class Page extends PageObjectModel<MyComponent> {
  mainButton(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByCss('button.btn-primary');
  }
}
```

Do this:

```html
<button class="btn btn-primary" data-testid="main-button">Click me</button>
```
```typescript
class Page extends PageObjectModel<MyComponent> {
  mainButton(): DebugHtmlElement<HTMLButtonElement> {
    return this.getElementByTestId('main-button');
  }
}
```

What we did is simply adding a `data-testid` to the HTML element and then using `getElementByTestId` instead of `getDebugElementByCss`.

The method `getElementByTestId('some-test-id')` basically works like using `getDebugElementByCss('[data-testid="some-test-id"')`.

This approach has several benefits:

- Test IDs are independent of UI or content structure changes and completely decoupled from styling.
- Better readability: the elements used in tests are clearly indicated.
- Framework agnostic: the same test ids can be used in component unit tests as well as e2e tests.
- Reducing selector complexity (no need for difficult CSS or XPath selectors).
- It makes developers immediately aware that a certain element is used in tests, ensuring they understand that removing or moving it will likely require updating to the automation tests as well.
