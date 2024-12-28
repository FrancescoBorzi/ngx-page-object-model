import { ToggleStyleComponent } from './toggle-style.component';
import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

describe(ToggleStyleComponent.name, () => {
  class Page extends PageObjectModel<ToggleStyleComponent> {
    // define elements access methods
    textContainer(): DebugHtmlElement<HTMLDivElement> {
      return this.getDebugElementByTestId<HTMLDivElement>('text-container');
    }
    toggleButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId<HTMLButtonElement>('toggle-dark-mode-button');
    }

    // define action methods
    getRenderedText(): string | null {
      return this.textContainer().nativeElement.textContent;
    }
    clickToggleMode(): void {
      return this.toggleButton().nativeElement.click();
    }

    // define reusable expect macros
    expectLightModeActive(): void {
      expect(this.textContainer().nativeElement.classList).toContain('light');
      expect(this.textContainer().nativeElement.classList).not.toContain('dark');
      expect(this.toggleButton().nativeElement.textContent).toContain(
        'Switch to Dark Mode',
      );
    }
    expectDarkModeActive(): void {
      expect(this.textContainer().nativeElement.classList).toContain('dark');
      expect(this.textContainer().nativeElement.classList).not.toContain('light');
      expect(this.toggleButton().nativeElement.textContent).toContain(
        'Switch to Light Mode',
      );
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleStyleComponent],
    }).compileComponents();
  });

  it('should render a toggle <button> and a text container <div> elements', () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.detectChanges();

    expect(page.textContainer()).toBeTruthy();
    expect(page.toggleButton()).toBeTruthy();
  });

  it('should be in Light Mode by default', () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.detectChanges();

    // this now fully checks all Light Mode props
    page.expectLightModeActive();
  });

  it('should display the given text', () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.fixture.componentRef.setInput('text', 'My text');
    page.detectChanges();

    expect(page.getRenderedText()).toContain('My text');
  });

  it('should switch to Dark Mode after clicking the button', () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.detectChanges();

    page.clickToggleMode();
    page.detectChanges();

    // this now fully checks all Dark Mode props
    page.expectDarkModeActive();
  });

  it('should switch to Light Mode after clicking the button again', () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.detectChanges();

    page.clickToggleMode();
    page.clickToggleMode();

    page.expectLightModeActive();
  });
});
