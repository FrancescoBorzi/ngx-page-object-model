---
sidebar_position: 2
---

# Testing absent elements

In the [basic example](./setup.md) we mentioned how a developer-friendly error would be displayed when we attempt to access an element that is not present in the DOM.

However, sometimes we do want to look for specific elements that we expect not to be present.

### Toggle Component Example

Consider the following example. 
A component featuring a toggle button that, when clicked, shows/hides some text. 

```typescript
@Component({
  selector: 'app-toggle',
  template: `
    <button (click)="onToggleClick()">Toggle</button>
    @if (visible()) {
      <div>Toggled content</div>
    }
  `
})
export class ToggleTextComponent {
  protected readonly visible =  signal<boolean>(false);

  protected onToggleClick(): void {
    this.visible.set(!this.visible());
  }
}
```

If we build our page object method as follows:

```typescript
text(): DebugHtmlElement<HTMLDivElement> {
  return this.getDebugElementByCss('div');
}
```

```typescript
describe('when initialized', () => {
  it('should not display the text content', () => {
    page.detectChanges();

    expect(page.text()).toBeFalsy(); // This would error!
  });
});
```

This would throw an error and fail the test with:

> Element with selector "div" was not found.

However, in this case we do want to try finding that element and explicitly check that it has not been found.

To achieve this, query methods such as `getDebugElementByCss`, `getDebugElementByTestId`, etc., are built to take as input an optional `assert` boolean parameter (that defaults to `true`).

When writhing get methods for elements that we sometimes expect not to be present, it is important to allow them to take `assert` and pass it through:

```typescript
text(assert = true): DebugHtmlElement<HTMLDivElement> {
  return this.getDebugElementByCss('div', assert);
}
```

This way, if (**and only if**) in a specific test case we expect the element not to be present, we can simply use:

```typescript
describe('when initialized', () => {
  it('should not display the text content', () => {
    page.detectChanges();

    expect(page.text(false)).toBeFalsy();
  });
});
```

This way `page.text(false)` will try to get the element without throwing an error if it has not been found.
Then we explicitly check that value to not be defined (falsy) to make our assertion.

### Good practices to prevent common mistakes

Remember to:

- Only pass `false` when you do expect the element not to be present.
- Never hardcode `assert` in the page object method definition, keep it optional and default to `true`

This way the assertion mechanism will continue doing its job whenever the element is not found unexpectedly, so you don't end up with an unfriendly "undefined" error.

### Full toggle component test code

```typescript
import { TestBed } from '@angular/core/testing';

import { ToggleTextComponent } from './toggle-text.component';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

describe(ToggleTextComponent.name, () => {
  class ToggleTextComponentPOM extends PageObjectModel<ToggleTextComponent> {
    // always expected to be there, no need to pass "assert" 
    toggleButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByCss('button');
    }
    // sometimes missing, let's allow passing the "assert" parameter
    text(assert = true): DebugHtmlElement<HTMLDivElement> {
      return this.getDebugElementByCss('div', assert);
    }

    clickButton(): void {
      this.toggleButton().nativeElement.click();
    }
  }

  let page: ToggleTextComponentPOM;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleTextComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ToggleTextComponent);
    page = new ToggleTextComponentPOM(fixture);
  });

  describe('when initialized', () => {
    it('should not display the text content', () => {
      page.detectChanges();

      expect(page.text(false)).toBeFalsy();
    });
  });

  describe('when the user clicks the button', () => {
    it('should toggle the text content', () => {
      page.clickButton();
      page.detectChanges();
      expect(page.text().nativeElement.textContent).toContain('Toggled content');

      page.clickButton();
      page.detectChanges();
      expect(page.text(false)).toBeFalsy();
    });
  });
});
```

_The full source code of this example can be found [here](https://github.com/FrancescoBorzi/ngx-page-object-model/blob/main/apps/demo-app/src/app/toggle-text/toggle.component.spec.ts)._
