---
sidebar_position: 2
---

# Setup and basic example

## Installation

To install `ngx-page-object-model`, run the following command:

```
npm install -D ngx-page-object-model
```

Now you are ready to write tests!

## Basic example

Let's consider a minimalistic example with a small component featuring:

- A text that initially says "_Not yet clicked_" 
- A button that, once clicked, sets the status to "_Clicked!_"

```typescript
import { Component, computed, signal, } from '@angular/core';

@Component({
  selector: 'app-minimal',
  template: `
    <button (click)="onButtonClick()">Click me</button>
    <span>Status: {{ clickedStatusText() }}</span>
  `
})
export class MinimalComponent {
  private readonly clicked =  signal<boolean>(false);

  protected readonly clickedStatusText = computed(
    () => this.clicked() ? 'Clicked!' : 'Not yet clicked',
  );

  protected onButtonClick(): void {
    this.clicked.set(true);
  }
}
```

### Unit test without POM

Now let's see how we could write a simple unit test for this component without using the Page Object Model pattern:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MinimalComponent } from './minimal.component';

describe(MinimalComponent.name, () => {
  let fixture: ComponentFixture<MinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinimalComponent);
  });

  describe('when initialized', () => {
    it('should display a "Not yet clicked" text', () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('Not yet clicked');
    });
  });

  describe('when the user clicks the button', () => {
    it('should display a "Clicked!" text', () => {
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('Clicked!');
    });
  });
});
```

This works and all tests pass. However, there are a couple of things that are not ideal:

- Too much repetition
- The test logic is mixed with the code responsible to read and manipulate the DOM
- The type of `nativeElement` is `any`, which doesn't provide type safety

Furthermore, if we made a typo in the CSS selector, we would get an ugly error such as:
> Cannot read properties of null (reading 'nativeElement')

Such developer-unfriendly errors can be hard to debug in the case of a larger test, especially when multiple HTML elements are involved.

Let's see how `ngx-page-object-model` can help improve the above issues.

### Unit test with POM

Let's import the following:

```typescript
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';
```

We can now use them to build the page object for our component:

```typescript
class MinimalComponentPOM extends PageObjectModel<MinimalComponent> {
  // define elements access methods
  button(): DebugHtmlElement<HTMLButtonElement> {
    return this.getDebugElementByCss('button');
  }
  text(): DebugHtmlElement<HTMLSpanElement> {
    return this.getDebugElementByCss('span');
  }

  // define action methods
  clickButton(): void {
    this.button().nativeElement.click();
  }
  getCurrentText(): string | null {
    return this.text().nativeElement.textContent;
  }
}
```

We have:

- defined a couple of methods to access our DOM elements using `getDebugElementByCss()` that takes in input a CSS selector (and returns a dev-friendly error in case such element is not found)
- used the optional `DebugHtmlElement` type that allows us specifying the correct type of the HTML element that we expect to find (if not specified, it will default to `DebugHtmlElement<HTMLElement>`)
- defined a couple of methods to perform actions on our DOM elements (clicking the `<button>`, getting the text content of `<span>`)

Now we can use this definition to instantiate our Page Object:

```typescript
let page: MinimalComponentPOM;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MinimalComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(MinimalComponent);
  page = new MinimalComponentPOM(fixture);
});
```

Let's consider a few points.
The `page` object is of type `MinimalComponentPOM` which extends `PageObjectModel<MinimalComponent>`

In general, the constructor of `PageObjectModel<ComponentType>` takes as input a `fixture` of type `ComponentFixture<ComponentType>`, which is exactly what `TestBed.createComponent(ComponentType)` returns.
There is no magic involved here; `ngx-page-object-model` is just wrapping around what Angular is already providing us. 

Let's now use the `page` object to rewrite our unit tests:

```typescript
describe('when initialized', () => {
  it('should display a "Not yet clicked" text', () => {
    page.detectChanges();

    expect(page.getCurrentText()).toContain('Not yet clicked');
  });
});

describe('when the user clicks the button', () => {
  it('should display a "Clicked!" text', () => {
    page.clickButton();
    page.detectChanges();

    expect(page.getCurrentText()).toContain('Clicked!');
  });
});
```

Our unit tests now look much cleaner and more readable! 

- all the code responsible for the access and manipulation of the DOM is gone
- we have better type safety
- when checking the test code, we can focus on **what** the test is actually doing instead of being distracted with the **how**

Furthermore, if we mistype any CSS selector, we would get a much more dev-friendly error such as:

> Element with selector "#selector-with-typo" was not found.

This could save us quite some time while debugging.

_The full source code of this example can be found [here](https://github.com/FrancescoBorzi/ngx-page-object-model/blob/main/apps/demo-app/src/app/minimal/minimal.component.pom.spec.ts)._
