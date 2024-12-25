---
sidebar_position: 2
---

# Making customizations

## Creating a custom base Page Object class

The `PageObjectModel` abstract class is the base for all page-object classes.
If you need to extend or override its behavior, you can extend it to create a custom base class to be used in all your application or parts of it.

For example, suppose you have a common element that you would like to get in all your page objects of your tests:

```typescript
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

export abstract class CustomBasePO<ComponentType> extends PageObjectModel<ComponentType> {
  someCommonElement(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByTestId('some-common-button');
  } 
}
```

Then in your tests:

```typescript
class Page extends CustomBasePO<MyComponent> {
  // ...
}
```

#### Avoid creating too many inheritance hierarchies!

As long as your customizations are small, this approach using inheritance is generally fine.
However, if you need to create multiple levels of customizations, avoid relying too heavily on inheritance,
as it can lead to tightly coupled code that is harder to maintain.
In other words, try to avoid deep inheritance hierarchies.

Instead, **consider using composition**, which is often regarded as a better practice than inheritance.
For instance, you can encapsulate reusable logic in helper services or utility functions and include them in your Page Objects.

## Using a custom test id

The `data-testid` attribute is probably the most common test ID used in testing automation.
This is why the `ngx-page-object-model` library uses it as default.
However, some applications may use a different one (e.g. `data-test`, `data-test-id`, `data-cy`, etc.).

If that is your case, you can easily change it by overriding the `getSelectorByTestId` method of the `PageObjectModel` class:

```typescript
import { PageObjectModel } from 'ngx-page-object-model';

export abstract class CustomBasePO<ComponentType> extends PageObjectModel<ComponentType> {
  protected override getSelectorByTestId(testId: string): string {
    return `[data-different-test-id="${testId}"]`;
  }
}
```

Then in your tests simply use:

```typescript
class Page extends CustomBasePO<MyComponent> {
  // ...
}
```

