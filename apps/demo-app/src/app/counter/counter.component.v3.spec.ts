import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import {DebugHtmlElement, PageObjectModel} from "ngx-page-object-model";

describe('CounterComponent - Component DOM testing with Page Object', () => {

  class CounterPage extends PageObjectModel<CounterComponent> {
    // methods to retrieve the elements
    getIncreaseButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId('increase');
    }
    getDecreaseButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId('decrease');
    }
    getResetButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId('reset');
    }
    getCount(): DebugHtmlElement<HTMLSpanElement> {
      return this.getDebugElementByTestId('count');
    }

    // methods to perform actions
    clickIncreaseButton(): void {
      this.getIncreaseButton().nativeElement.click();
    }
    clickDecreaseButton(): void {
      this.getDecreaseButton().nativeElement.click();
    }
    clickResetButton(): void {
      this.getResetButton().nativeElement.click();
    }
    expectCurrentCountToBe(value: number) {
      expect(this.getCount().nativeElement.innerHTML).toEqual(`${value}`);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(CounterComponent);
    const page = new CounterPage(fixture);
    return { page };
  }

  it('should have the counter set to 0 by default', () => {
    const { page } = setup();

    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });

  it('should increase the counter when clicking on the increase button', () => {
    const { page } = setup();

    page.clickIncreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(1);
  });

  it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
    const { page } = setup();
    page.clickIncreaseButton();
    page.clickIncreaseButton();

    page.clickDecreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(1);
  });

  it('should NOT decrease the counter if the current value is 0 when clicking on the decrease button', () => {
    const { page } = setup();

    page.clickDecreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });

  it('should reset the counter when clicking the reset button', () => {
    const { page } = setup();
    page.clickIncreaseButton();
    page.clickIncreaseButton();

    page.clickResetButton();
    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });
});
