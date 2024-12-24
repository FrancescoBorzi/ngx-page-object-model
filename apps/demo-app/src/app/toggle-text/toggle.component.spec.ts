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
