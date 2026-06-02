import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from './custom-text-input.component';

@Component({
  selector: 'app-form-control-example-component',
  template: `
    <app-custom-text-input [formControl]="formControl" data-testid="custom-text-input" />
    <div>Current value: {{ currentValue() }}</div>
  `,
  imports: [CustomTextInputComponent, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlExampleComponent {
  protected readonly formControl = new FormControl<string>('Custom initial value');

  protected readonly currentValue = toSignal(this.formControl.valueChanges, {
    initialValue: this.formControl.value,
  });
}
