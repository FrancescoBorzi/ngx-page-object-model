import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MinimalComponent } from './minimal.component';

describe(MinimalComponent.name, () => {
  let fixture: ComponentFixture<MinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinimalComponent);
  });

  describe('when initialized', () => {
    it('should display a "Not yet clicked" text', () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('Not yet clicked');
    });
  });

  describe('when the user clicks the button', () => {
    it('should display a "Clicked!" text', () => {
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('Clicked!');
    });
  });
});
