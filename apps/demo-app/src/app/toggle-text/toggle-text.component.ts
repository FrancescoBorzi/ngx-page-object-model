import { Component, signal, } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `
    <button (click)="onToggleClick()">Toggle</button>
    @if (visible()) {
      <div>Toggled content</div>
    }
  `,
  styles: `
    div {
      margin-top: 12px;
    }
  `,
})
export class ToggleTextComponent {
  protected readonly visible =  signal<boolean>(false);

  protected onToggleClick(): void {
    this.visible.set(!this.visible());
  }
}
