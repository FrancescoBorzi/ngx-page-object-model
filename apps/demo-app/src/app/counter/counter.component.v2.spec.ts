import { CounterComponent } from './counter.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CounterComponent - Component DOM testing without Page Object', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(CounterComponent);

    return { fixture };
  }

  it('should have the counter set to 0 by default', async () => {
    const { fixture } = setup();

    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('0');
  });

  it('should increase the counter when clicking on the increase button', async () => {
    const { fixture } = setup();
    await fixture.whenStable();

    fixture.debugElement.query(By.css(`[data-testid="increase"]`)).nativeElement.click();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('1');
  });

  it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', async () => {
    const { fixture } = setup();
    fixture.debugElement.query(By.css(`[data-testid="increase"]`)).nativeElement.click();
    fixture.debugElement.query(By.css(`[data-testid="increase"]`)).nativeElement.click();

    fixture.debugElement.query(By.css(`[data-testid="decrease"]`)).nativeElement.click();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('1');
  });

  it('should NOT decrease the counter if the current value is 0 when clicking on the decrease button', async () => {
    const { fixture } = setup();

    fixture.debugElement.query(By.css(`[data-testid="decrease"]`)).nativeElement.click();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('0');
  });

  it('should reset the counter when clicking the reset button', async () => {
    const { fixture } = setup();
    fixture.debugElement.query(By.css(`[data-testid="increase"]`)).nativeElement.click();
    fixture.debugElement.query(By.css(`[data-testid="increase"]`)).nativeElement.click();

    fixture.debugElement.query(By.css(`[data-testid="reset"]`)).nativeElement.click();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css(`[data-testid="count"]`)).nativeElement.innerHTML).toEqual('0');
  });
});
