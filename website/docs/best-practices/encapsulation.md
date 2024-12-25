---
sidebar_position: 1
---

# Encapsulation

As you may have noticed, either `private` or `protected` are always used in the code examples:

```typescript
@Component({
  selector: 'app-minimal',
  template: `
    <button (click)="onButtonClick()">Click me</button>
    <span>Status: {{ clickedStatusText() }}</span>
  `
})
export class MinimalComponent {
  private readonly clicked = signal<boolean>(false);

  protected readonly clickedStatusText = computed(
    () => this.clicked() ? 'Clicked!' : 'Not yet clicked',
  );

  protected onButtonClick(): void {
    this.clicked.set(true);
  }
}
```

In case you missed it, since [Angular 14+](https://blog.angular.dev/angular-v14-is-now-available-391a6db736af) the Component's template can access `protected` members of the Component's class.

Since this change, there are only a few (not frequent) cases where you need to leave any class member `public` (that is the default accessor in TypeScript).

It is a good practice to always keep your class attributes and methods either:
- `private` by default
- `protected` when they need to be accessed by the template

This is excellent for Component DOM Testing too!
It will keep you and your colleagues away from the temptation of directly calling `component.onButtonClick()` in unit tests, forcing developers to perform proper DOM testing of UI components.

The recommended mindset is the following. A Component is the smallest UI element of an application. It exposes a public API composed by:

- the component inputs and outputs
- the template

The only way one can operate on a component in the real world is by using such API. In order to make your unit tests more realistic, stick to operating on the public API of the component instead of worrying of its internals.

This way, not only your unit tests will be more realistic, but they will be less dependent on the internal implementation of the component, and they will remain valid even if internal refactoring is performed.

If we wanted to do an analogy, this is similar to calling only the `public` methods of a service instead of testing its `private` ones.

### Bad

```typescript
describe('when the user clicks the button', () => {
    it('should display a "Clicked!" text', () => {
      component.onButtonClick(); // this is not really "the user" clicking the button, is it?
      page.detectChanges();

      expect(page.getCurrentText()).toContain('Clicked!');
    });
  });
```

This test would not catch a bug affecting the HTML template of the Component. Setting the `onButtonClick()` method to `protected` would even prevent such a bad test from being written in the first place.

### Good

```typescript
describe('when the user clicks the button', () => {
    it('should display a "Clicked!" text', () => {
      page.clickButton();
      page.detectChanges();

      expect(page.getCurrentText()).toContain('Clicked!');
    });
  });
```

If a bug is introduced in the button clicking mechanism, either in the component class or template, this test will do its job and warn us about it!
