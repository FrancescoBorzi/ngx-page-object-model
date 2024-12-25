import { ChangeDetectionStrategy, Component, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-text-input',
  template: `
    <div>This is a custom input text!</div>
    <div>
      <input [formControl]="control">
    </div>
  `,
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTextInputComponent implements ControlValueAccessor {
  protected internalComponentState = '';

  get control(): FormControl {
    return this.ngControl.control as FormControl<string>;
  }

  // CUSTOM: if you need to keep track of the bound control disabled status
  protected disabled = false;

  // These are placeholder functions (the real ones will be
  // set by the consumers - see registerOn* methods below).
  // We will have to call them every time we make a change
  // to the component state that must be reflected to
  // the outside consumers of this component in order to signal
  // when the form control has been touched
  // and/or its value has been changed.
  onChange: (value: string) => unknown = (_value: string) => {};
  onTouched: () => unknown = () => {};

  // If you need to access the FormControl object from inside the component
  // It will be available in this.ngControl.control
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // allow consumers to register an onChange function
  registerOnChange(fn: (value: string) => unknown): void {
    // normally this is it, no need to change anything here
    this.onChange = fn;
  }

  // allow consumers to register an onTouched function
  registerOnTouched(fn: () => unknown): void {
    // normally this is it, no need to change anything here
    this.onTouched = fn;
  }

  // this is optional,
  // it allows to react on the disabled state of the form control
  setDisabledState(isDisabled: boolean): void {
    // we are bounding the new disabled state to
    // the internal (custom) "disabled" field
    // this is typically what you want to do with this function
    // but not mandatory
    this.disabled = isDisabled;
  }

  // this method is called every time the form control value changes
  writeValue(newValue: string): void {
    // what you want to do with the newValue depends on your use case
    // typically you want to somehow map it to your internalComponentState

    // see this function as a way to make the component react on changes
    // to the value of the form control coming from outside
    this.internalComponentState = newValue;

    // NOTE: you probably want to perform any operations
    // only if the newValue somehow represents something different
    // than your current internal component state
    // in order to optimise performances
  }

}
