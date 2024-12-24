import { Component, computed, signal, } from '@angular/core';

@Component({
  selector: 'app-minimal',
  template: `
    <button (click)="onButtonClick()">Click me</button>
    <span>Status: {{ clickedStatusText() }}</span>
  `
})
export class MinimalComponent {
  private readonly clicked =  signal<boolean>(false);

  protected readonly clickedStatusText = computed(
    () => this.clicked() ? 'Clicked!' : 'Not yet clicked',
  );

  protected onButtonClick(): void {
    this.clicked.set(true);
  }
}
