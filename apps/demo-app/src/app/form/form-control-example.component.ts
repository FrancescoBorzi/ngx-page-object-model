import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from './custom-text-input.component';

@Component({
  selector: 'app-form-control-example-component',
  template: `
    <!--    <div>Current value: {{ formControl.value }}</div>-->
    <app-custom-text-input [formControl]="formControl" data-testid="custom-text-input" />
  `,
  imports: [CustomTextInputComponent, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlExampleComponent {
  protected readonly formControl = new FormControl<string>('Custom initial value');
}
