---
sidebar_position: 3
---

# Using with Spectator

If you want to use `ngx-page-object-model` together with [Spectator](https://ngneat.github.io/spectator/), they can run together smoothly.

## Simple setup: decoupled page object and spectator

The simplest way is to just pass `spectator.fixture` when instantiating your page object:

```typescript
import { createHostFactory } from '@ngneat/spectator';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

describe(MyComponent.name, () => {
  class Page extends PageObjectModel<MyComponent> {
    myInputElement(): DebugHtmlElement<HTMLInputElement> {
      return this.getDebugElementByTestId('my-input');
    }
  }

  const createComponent = createHostFactory({
    component: MyComponent,
    // ...
    detectChanges: false,
  });
  
  const setup = () => {
    const spectator = createComponent('<app-my-component />');
    const page = new Page(spectator.fixture);
    // ...
    return { spectator, page };
  };

  it('should do something', () => {
    const { page, spectator } = setup();
    // ...
  });
});
```

You can then combine their usage, for example:

```typescript
it('should do something', () => {
  const { page, spectator } = setup();

  spectator.typeInElement('some text', page.myInputElement());
  
  // ...
});
```

This way, the page object and Spectator are completely decoupled and can be used independently.

## Advanced custom setup: blended together

Suppose that you want to create a more advanced utility by leveraging both the page object model and spectator together, 
yet using just one `page` object to control everything, instead of mixing `page` and `spectator`

This is possible by creating a custom base page object class that encapsulates the `spectator` object instead of just `spectator.fixture`:

```typescript
import { Spectator, SpectatorHost } from '@ngneat/spectator/jest';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

export abstract class SpectatorPageObjectModel<ComponentType> extends PageObjectModel<ComponentType> {
  constructor(public readonly spectator: Spectator<ComponentType> | SpectatorHost<ComponentType>) {
    super(spectator.fixture);
  }
  
  // build custom utility methods
}
```

Now we no longer need to pass the `spectator` object to our tests but we can simply access it by using `page.spectator`.

This also allows building more complex utility methods that rely on Spectator's features.

For example, suppose we want to create a method that takes as input a `<select>` element 
and selects an option at a certain `index` having a certain `value`.
We could build such a utility this way:

```typescript
import { Spectator, SpectatorHost } from '@ngneat/spectator/jest';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

export abstract class SpectatorPageObject<ComponentType> extends PageObjectModel<ComponentType> {
  constructor(public readonly spectator: Spectator<ComponentType> | SpectatorHost<ComponentType>) {
    super(spectator.fixture);
  }

  getSelectNgValue(index: number, value: string | number): string {
    return `${index}: ${value}`;
  }

  selectOption(element: HTMLSelectElement | DebugHtmlElement<HTMLSelectElement>, index: number, value: string): void {
    const ngValue = this.getSelectNgValue(index, value);

    const optionElement = element.querySelector(`option[value="${ngValue}"]`);

    if (!optionElement) {
      throw new Error(`Cannot find <option> at index ${index} with value ${value}`);
    }

    this.spectator.selectOption(element, ngValue);
  }
}
```

We can then use such utility this way:

```typescript
import { createHostFactory } from '@ngneat/spectator';
import { DebugHtmlElement } from 'ngx-page-object-model';

import { SpectatorPageObject } from '../somewhere/spectator-page-object.ts'

describe(MyComponent.name, () => {
  class Page extends SpectatorPageObject<MyComponent> {
    mySelectElement(): DebugHtmlElement<HTMLSelectElement> {
      return this.getDebugElementByTestId('my-select-input-element');
    }
  }

  const createComponent = createHostFactory({
    component: MyComponent,
    // ...
    detectChanges: false,
  });
  
  const setup = () => {
    const spectator = createComponent('<app-my-component />');

    // this time we are passing the whole spectator object, not only spectator.fixture
    const page = new Page(spectator);

    // no need to return spectator since it's accessible via page.spectator
    return { page };
  };

  it('should do something', () => {
    const { page } = setup();

    // select option of mySelectElement at index 2 with value 'SomeValue' 
    page.selectOption(page.mySelectElement, 2, 'SomeValue');

    // ...
  });
});
```

This approach has pros and cons.

On one hand, we can leverage Spectator's features for more complex stuff.
Also, the tests have everything they need inside the `page` object and it can be used as a single control point.

On the other hand, we are making the POM and Spectator tightly coupled and increasing the overall complexity of our test base utility setup.

Which approach to use depends on your use case and personal taste.
You can also start with a simple setup and then add more customizations if needed.
