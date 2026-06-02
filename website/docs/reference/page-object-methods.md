---
sidebar_position: 1
---

# Page Object methods list

This is a quick reference for all methods provided by the `PageObjectModel` class.
Refer to this page when looking for information about specific methods.

## Methods returning DebugHtmlElement

The `DebugHtmlElement<HTMLElementType>` type is just an extension of the native Angular's [DebugElement](https://angular.dev/api/core/DebugElement)
which provides better typing by allowing the optional `<HTMLElementType>` that defaults to `<HTMLElement>`.

All methods of this group take as input the `<HTMLElementType>` and will return either one or an array of `DebugHtmlElement<HTMLElementType>`:

#### getDebugElementByCss

- Given a CSS selector, returns a DebugHtmlElement.
- Takes an optional assert parameter which defaults to true.

```typescript
getDebugElementByCss<HTMLElementType extends HTMLElement = HTMLElement>(
  cssSelector: string,
  assert = true,
): DebugHtmlElement<HTMLElementType>;
```

#### getDebugElementByTestId

- Given a data-testid, returns a DebugHtmlElement.
- Takes an optional assert parameter which defaults to true.

```typescript
getDebugElementByTestId<HTMLElementType extends HTMLElement = HTMLElement>(
  testId: string,
  assert = true,
): DebugHtmlElement<HTMLElementType>;
```

#### getDebugElementByDirective

- Given directive (e.g. a ComponentType), returns a DebugHtmlElement items.
- Takes an optional assert parameter which defaults to true.

```typescript
getDebugElementByDirective<HTMLElementType extends HTMLElement = HTMLElement>(
  directive: Type<unknown>,
  assert = true,
): DebugHtmlElement<HTMLElementType>;
```

#### getAllDebugElementsByCss

- Given a CSS selector, returns an array of all matching DebugHtmlElement items.

```typescript
getAllDebugElementsByCss<HTMLElementType extends HTMLElement = HTMLElement>(
  cssSelector: string,
): DebugHtmlElement<HTMLElementType>[];
```

#### getAllDebugElementsByTestId

- Given a data-testid, returns an array of all matching DebugHtmlElement items.

```typescript
getAllDebugElementsByTestId<HTMLElementType extends HTMLElement = HTMLElement>(
  testId: string,
): DebugHtmlElement<HTMLElementType>[];
```

#### getAllDebugElementsByDirective

- Given directive (e.g. a ComponentType), returns an array of all matching DebugHtmlElement items.

```typescript
getAllDebugElementsByDirective<HTMLElementType extends HTMLElement = HTMLElement>(
  directive: Type<unknown>,
): DebugHtmlElement<HTMLElementType>[];
```

## Methods returning a native HTML element

These methods return directly the specified HTML element type (which defaults to `HTMLElement` when not provided).

The returned element is equivalent of the `debugElement.nativeElement` object returned by the methods of the previous group and its usage is more limited.

#### query

- Given a CSS selector, returns a native HTML element.
- Takes an optional assert parameter which defaults to true.

```typescript
query<T extends HTMLElement>(cssSelector: string, assert = true): T;
```

#### queryAll

- Given a CSS selector, returns an array containing all the matching native HTML elements.

```typescript
queryAll<T extends HTMLElement>(selector: string): T[];
```

### Querying outside the fixture

By default, all query methods are scoped to the component under test. Some elements render **outside**
the component's host element — most commonly Angular CDK overlays (dialogs, menus, tooltips, snackbars)
that attach to `document.body`. These elements have no `DebugElement` in the component's debug tree, so
they can only be retrieved as native HTML elements.

The search root defaults to the global `document` and can be customized by overriding
`getRootOutsideFixture()` (see [Making customizations](../advanced/making-customizations.md)).

#### queryOutsideFixture

- Given a CSS selector, returns a native HTML element searched outside the component fixture.
- Takes an optional assert parameter which defaults to true.

```typescript
queryOutsideFixture<T extends HTMLElement>(cssSelector: string, assert = true): T;
```

#### queryAllOutsideFixture

- Given a CSS selector, returns an array of all matching native HTML elements outside the fixture.

```typescript
queryAllOutsideFixture<T extends HTMLElement>(cssSelector: string): T[];
```

#### queryOutsideFixtureByTestId

- Given a data-testid, returns a native HTML element searched outside the component fixture.
- Takes an optional assert parameter which defaults to true.

```typescript
queryOutsideFixtureByTestId<T extends HTMLElement>(testId: string, assert = true): T;
```

#### queryAllOutsideFixtureByTestId

- Given a data-testid, returns an array of all matching native HTML elements outside the fixture.

```typescript
queryAllOutsideFixtureByTestId<T extends HTMLElement>(testId: string): T[];
```

## Other methods

#### removeNativeElement

- Removes the HTML element of the component from the DOM.

```typescript
removeNativeElement(): void;
```
