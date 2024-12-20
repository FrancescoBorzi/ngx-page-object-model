import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageObjectModelComponent } from './ngx-page-object-model.component';

describe('NgxPageObjectModelComponent', () => {
  let component: NgxPageObjectModelComponent;
  let fixture: ComponentFixture<NgxPageObjectModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPageObjectModelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPageObjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
