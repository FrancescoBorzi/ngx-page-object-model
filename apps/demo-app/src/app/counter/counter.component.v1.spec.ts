import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent - Component class testing', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;
    return { component };
  }

  it('should have the counter set to 0 by default', () => {
    const { component } = setup();

    expect(component.count).toBe(0);
  });

  it('should increase the counter when clicking on the increase button', () => {
    const { component } = setup();

    component.increase();

    expect(component.count).toBe(1);
  });

  it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
    const { component } = setup();
    component.count = 2;

    component.decrease();

    expect(component.count).toBe(1);
  });

  it('should NOT decrease the counter if the current value is 0 when clicking on the decrease button', () => {
    const { component } = setup();
    component.count = 0;

    component.decrease();

    expect(component.count).toBe(0);
  });

  it('should reset the counter when clicking the reset button', () => {
    const { component } = setup();
    component.count = 123;

    component.reset();

    expect(component.count).toBe(0);
  });
});
