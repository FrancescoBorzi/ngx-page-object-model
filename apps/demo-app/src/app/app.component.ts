import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { FormControlExampleComponent } from './form/form-control-example.component';
import { FormGroupExampleComponent } from './form/form-group-example.component';
import { MinimalComponent } from './minimal/minimal.component';
import { OverlayDialogComponent } from './overlay-dialog/overlay-dialog.component';
import { ToggleStyleComponent } from './toggle-style/toggle-style.component';
import { ToggleTextComponent } from './toggle-text/toggle-text.component';

interface Demo {
  title: string;
  description: string;
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly demos: Demo[] = [
    {
      title: 'Counter',
      description: 'Increase, decrease and reset a numeric value.',
      component: CounterComponent,
    },
    {
      title: 'Minimal',
      description: 'A single button that flips a signal-backed status.',
      component: MinimalComponent,
    },
    {
      title: 'Toggle Text',
      description: 'Conditionally render content with @if control flow.',
      component: ToggleTextComponent,
    },
    {
      title: 'Toggle Style',
      description: 'Switch between dark and light mode via CSS classes.',
      component: ToggleStyleComponent,
      inputs: { text: 'The quick brown fox jumps over the lazy dog.' },
    },
    {
      title: 'Form Control',
      description: 'A custom ControlValueAccessor bound to a FormControl.',
      component: FormControlExampleComponent,
    },
    {
      title: 'Form Group',
      description: 'The same custom input wired through a FormGroup.',
      component: FormGroupExampleComponent,
    },
    {
      title: 'Overlay Dialog',
      description: 'Render a dialog outside the host via a CDK Overlay.',
      component: OverlayDialogComponent,
    },
  ];
}
