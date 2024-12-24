import { TestBed } from '@angular/core/testing';

import { MinimalComponent } from './minimal.component';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

describe(MinimalComponent.name, () => {
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

  let page: MinimalComponentPOM;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MinimalComponent);
    page = new MinimalComponentPOM(fixture);
  });

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
});
