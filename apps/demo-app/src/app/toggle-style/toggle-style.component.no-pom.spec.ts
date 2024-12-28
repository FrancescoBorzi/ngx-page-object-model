import { ToggleStyleComponent } from './toggle-style.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe(ToggleStyleComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleStyleComponent],
    }).compileComponents();
  });

  describe('Initialization', () => {
    it('should render a toggle <button> and a text container <div> elements', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));
      const toggleButton = fixture.debugElement.query(By.css('button'));

      expect(textContainer.nativeElement).toBeTruthy();
      expect(toggleButton.nativeElement).toBeTruthy();
    });

    it('should be in Light Mode by default', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));

      expect(textContainer.nativeElement.classList).toContain('light');
      expect(textContainer.nativeElement.classList).not.toContain('dark');
    });

    it('should display the given text', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.componentRef.setInput('text', 'My text');
      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));

      expect(textContainer.nativeElement.textContent).toContain('My text');
    });
  });

  describe('Light Mode', () => {
    it('should display the correct style and button text', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));
      const toggleButton = fixture.debugElement.query(By.css('button'));

      expect(textContainer.nativeElement.classList).toContain('light');
      expect(textContainer.nativeElement.classList).not.toContain('dark');
      expect(toggleButton.nativeElement.textContent).toContain(
        'Switch to Dark Mode',
      );
    });

    it('should switch to Dark Mode after clicking the button', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));
      const toggleButton = fixture.debugElement.query(By.css('button'));

      toggleButton.nativeElement.click();
      fixture.detectChanges();

      expect(textContainer.nativeElement.classList).toContain('dark');
      expect(textContainer.nativeElement.classList).not.toContain('light');
    });
  });

  describe('Dark Mode', () => {
    it('should display the correct style and button text', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));
      const toggleButton = fixture.debugElement.query(By.css('button'));
      toggleButton.nativeElement.click();
      fixture.detectChanges();

      expect(textContainer.nativeElement.classList).toContain('dark');
      expect(textContainer.nativeElement.classList).not.toContain('light');
      expect(toggleButton.nativeElement.textContent).toContain(
        'Switch to Light Mode',
      );
    });

    it('should switch to Light Mode after clicking the button', () => {
      const fixture = TestBed.createComponent(ToggleStyleComponent);

      fixture.detectChanges();
      const textContainer = fixture.debugElement.query(By.css('div'));
      const toggleButton = fixture.debugElement.query(By.css('button'));
      toggleButton.nativeElement.click();
      fixture.detectChanges();

      toggleButton.nativeElement.click();
      fixture.detectChanges();

      expect(textContainer.nativeElement.classList).toContain('light');
      expect(textContainer.nativeElement.classList).not.toContain('dark');
    });
  });
});
