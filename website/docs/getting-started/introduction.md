---
sidebar_position: 1
---

# Introduction

## What is Component DOM Testing?

From the Angular documentation:

> A component, unlike all other parts of an Angular application, combines an HTML template and a TypeScript class.
> The component truly is the template and the class working together. To adequately test a component, you should test that they work together as intended.

The best way to write unit tests for an Angular UI component is to simulate how a real user interacts with it: through its HTML template.
This approach is known as [Component DOM Testing](https://javascript.plainenglish.io/component-dom-testing-in-angular-0d2256414c06).

## What is the Page Object Model design pattern?

The **Page Object Model (POM)** is a technique that separates test logic from DOM interactions, 
creating an abstraction layer for cleaner, more readable, and maintainable test code.

### Wait... weren't Page Objects something used in e2e tests?

While indeed using page objects is very common in the world of end-to-end testing, the Page Object Model is a **design pattern** that can be applied to any automation testing layer interacting with the DOM.

The name "Page Object" can be misleading, as it doesn't necessarily refer to an entire "page"; in many cases, like with Angular Components, it refers to just a specific part of it.

_From [Martin Flower's definition of Page Object](https://martinfowler.com/bliki/PageObject.html):_

> There's an argument here that the name “page object” is misleading because it makes you think you should have just one page object per page. 
> Something like “panel object” would be better - but the term “page object” is what's become accepted.

When creating page objects for Angular UI components, you typically create just one small page object per component inside its own `.spec.ts` file. 

## The ngx-page-object-model library

The `ngx-page-object-model` library is a simple and lightweight tool that helps to implement the Page Object Model design pattern in Angular UI component unit tests.

This library is built on top of Angular and compatible with all modern Angular-based applications.

It is completely testing-framework-agnostic, making it compatible with [Jasmine](https://jasmine.github.io/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), or any other unit testing framework.
It can also be used alongside tools like [Spectator](https://ngneat.github.io/spectator/) or as a standalone solution.
