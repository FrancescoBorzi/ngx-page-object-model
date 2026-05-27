import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DebugHtmlElement } from './debug-html-element';

export abstract class PageObjectModel<ComponentType> {
  constructor(public readonly fixture: ComponentFixture<ComponentType>) {}

  protected getSelectorByTestId(testId: string): string {
    return `[data-testid="${testId}"]`;
  }

  /**
   * Calls fixture.detectChanges()
   */
  detectChanges(): void {
    this.fixture.detectChanges();
  }

  /**
   * Given a CSS selector, returns a DebugHtmlElement.
   * Takes an optional assert parameter which defaults to true.
   */
  getDebugElementByCss<HTMLElementType extends HTMLElement = HTMLElement>(
    cssSelector: string,
    assert = true,
  ): DebugHtmlElement<HTMLElementType> {
    const debugElement = this.fixture.debugElement.query(By.css(cssSelector));

    if (assert && !debugElement) {
      throw new Error(`Element with selector "${cssSelector}" was not found.`);
    }

    return debugElement;
  }

  /**
   * Given a data-testid, returns a DebugHtmlElement.
   * Takes an optional assert parameter which defaults to true.
   */
  getDebugElementByTestId<HTMLElementType extends HTMLElement = HTMLElement>(
    testId: string,
    assert = true,
  ): DebugHtmlElement<HTMLElementType> {
    return this.getDebugElementByCss(this.getSelectorByTestId(testId), assert);
  }

  /**
   * Given directive (e.g. a ComponentType), returns a DebugHtmlElement items.
   * Takes an optional assert parameter which defaults to true.
   */
  getDebugElementByDirective<HTMLElementType extends HTMLElement = HTMLElement>(
    directive: Type<unknown>,
    assert = true,
  ): DebugHtmlElement<HTMLElementType> {
    const debugElement = this.fixture.debugElement.query(By.directive(directive));

    if (assert && !debugElement) {
      throw new Error(`Element with directive "${directive.name}" was not found.`);
    }

    return debugElement;
  }

  /**
   * Given a CSS selector, returns an array of all matching DebugHtmlElement items.
   */
  getAllDebugElementsByCss<HTMLElementType extends HTMLElement = HTMLElement>(
    cssSelector: string,
  ): DebugHtmlElement<HTMLElementType>[] {
    return this.fixture.debugElement.queryAll(By.css(cssSelector));
  }

  /**
   * Given a data-testid, returns an array of all matching DebugHtmlElement items.
   */
  getAllDebugElementsByTestId<HTMLElementType extends HTMLElement = HTMLElement>(
    testId: string,
  ): DebugHtmlElement<HTMLElementType>[] {
    return this.getAllDebugElementsByCss(this.getSelectorByTestId(testId));
  }

  /**
   * Given directive (e.g. a ComponentType), returns an array of all matching DebugHtmlElement items.
   */
  getAllDebugElementsByDirective<HTMLElementType extends HTMLElement = HTMLElement>(
    directive: Type<unknown>,
  ): DebugHtmlElement<HTMLElementType>[] {
    return this.fixture.debugElement.queryAll(By.directive(directive));
  }

  /**
   * Given a component type, returns the component instance.
   */
  getComponentInstance<T>(componentType: Type<T>, assert = true): T {
    return this.getDebugElementByDirective(componentType, assert).componentInstance as T;
  }

  /**
   * Given an array of data-testid, returns the matching nested DebugHtmlElement item.
   */
  getDebugElementByNestedTestIds<HTMLElementType extends HTMLElement = HTMLElement>(
    testIds: string[],
    assert = true,
  ): DebugHtmlElement<HTMLElementType> {
    const selector = testIds.map((testId) => this.getSelectorByTestId(testId)).join(' ');
    return this.getDebugElementByCss(selector, assert);
  }

  /**
   * Given a CSS selector, returns a native HTML element.
   * Takes an optional assert parameter which defaults to true.
   */
  query<T extends HTMLElement>(cssSelector: string, assert = true): T {
    const element: T = this.fixture.nativeElement.querySelector(cssSelector);

    if (assert && !element) {
      throw new Error(`Element with selector "${cssSelector}" was not found.`);
    }

    return element;
  }

  /**
   * Given a CSS selector, returns an array containing all the matching native HTML elements.
   */
  queryAll<T extends HTMLElement>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }

  /**
   * DOM root used by the "outside fixture" query helpers.
   *
   * Defaults to the global `document`, so elements rendered outside the component's host
   * (e.g. Angular CDK overlays appended to `document.body` — dialogs, menus, tooltips,
   * snackbars) can be located.
   *
   * Override to scope queries, e.g. to a CDK overlay container element.
   */
  protected getRootOutsideFixture(): ParentNode {
    return document;
  }

  /**
   * Given a CSS selector, returns a native HTML element searched outside the component
   * fixture (see getRootOutsideFixture).
   * Takes an optional assert parameter which defaults to true.
   */
  queryOutsideFixture<T extends HTMLElement>(cssSelector: string, assert = true): T {
    const element = this.getRootOutsideFixture().querySelector<T>(cssSelector);

    if (assert && !element) {
      throw new Error(`Element with selector "${cssSelector}" was not found outside the fixture.`);
    }

    return element as T;
  }

  /**
   * Given a CSS selector, returns an array of all matching native HTML elements searched
   * outside the component fixture (see getRootOutsideFixture).
   */
  queryAllOutsideFixture<T extends HTMLElement>(cssSelector: string): T[] {
    return Array.from(this.getRootOutsideFixture().querySelectorAll<T>(cssSelector));
  }

  /**
   * Given a data-testid, returns a native HTML element searched outside the component fixture.
   * Takes an optional assert parameter which defaults to true.
   */
  queryOutsideFixtureByTestId<T extends HTMLElement>(testId: string, assert = true): T {
    return this.queryOutsideFixture<T>(this.getSelectorByTestId(testId), assert);
  }

  /**
   * Given a data-testid, returns an array of all matching native HTML elements searched
   * outside the component fixture.
   */
  queryAllOutsideFixtureByTestId<T extends HTMLElement>(testId: string): T[] {
    return this.queryAllOutsideFixture<T>(this.getSelectorByTestId(testId));
  }

  /**
   * Removes the HTML element of the component from the DOM.
   */
  removeNativeElement(): void {
    this.fixture.debugElement.nativeElement.remove();
  }
}
