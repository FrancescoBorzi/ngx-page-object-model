import { ToggleStyleComponent } from './toggle-style.component';
import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

describe(ToggleStyleComponent.name, () => {
  class Page extends PageObjectModel<ToggleStyleComponent> {
    // define elements access methods
    textContainer(): DebugHtmlElement<HTMLDivElement> {
      return this.getDebugElementByTestId('text-container');
    }
    toggleButton(): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId('toggle-dark-mode-button');
    }

    // define action methods
    getRenderedText(): string | null {
      return this.textContainer().nativeElement.textContent;
    }
    async clickToggleMode(): Promise<void> {
      this.toggleButton().nativeElement.click();
      await this.fixture.whenStable();
    }

    // define reusable expect macros
    expectLightModeActive(): void {
      const containerClass = this.textContainer().nativeElement.classList;
      expect(containerClass).toContain('light');
      expect(containerClass).not.toContain('dark');
      expect(this.toggleButton().nativeElement.textContent).toContain(
        'Switch to Dark Mode',
      );
    }
    expectDarkModeActive(): void {
      const containerClass = this.textContainer().nativeElement.classList;
      expect(containerClass).toContain('dark');
      expect(containerClass).not.toContain('light');
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

  it('should render a toggle <button> and a text container <div> elements', async () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    await page.fixture.whenStable();

    expect(page.textContainer()).toBeTruthy();
    expect(page.toggleButton()).toBeTruthy();
  });

  it('should be in Light Mode by default', async () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    await page.fixture.whenStable();

    // this now fully checks all Light Mode props
    page.expectLightModeActive();
  });

  it('should display the given text', async () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    page.fixture.componentRef.setInput('text', 'My text');
    await page.fixture.whenStable();

    expect(page.getRenderedText()).toContain('My text');
  });

  it('should switch to Dark Mode after clicking the button', async () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    await page.fixture.whenStable();

    await page.clickToggleMode();

    // this now fully checks all Dark Mode props
    page.expectDarkModeActive();
  });

  it('should switch to Light Mode after clicking the button again', async () => {
    const page = new Page(TestBed.createComponent(ToggleStyleComponent));
    await page.fixture.whenStable();

    await page.clickToggleMode();
    await page.clickToggleMode();

    page.expectLightModeActive();
  });
});
