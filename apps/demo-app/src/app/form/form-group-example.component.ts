import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from './custom-text-input.component';

@Component({
  selector: 'app-form-control-example-component',
  template: `
    <form [formGroup]="formGroup" data-testid="my-form-group">
      <app-custom-text-input formControlName="myControl" />
    </form>
  `,
  imports: [CustomTextInputComponent, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupExampleComponent {
  protected readonly formGroup = new FormGroup({
    myControl: new FormControl('Custom initial value'),
  });
}
