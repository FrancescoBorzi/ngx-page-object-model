import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-toggle-style',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button data-testid="toggle-dark-mode-button" (click)="toggleDarkMode()">
      {{ toggleText() }}
    </button>
    <div
      data-testid="text-container"
      [class]="isDarkModeEnabled() ? 'dark' : 'light'"
    >
      {{ text() }}
    </div>
  `,
  styles: `
    div {
      padding: 20px;
      margin-top: 10px;
    }
    .dark {
      background-color: black;
      color: white;
    }
    .light {
      background-color: white;
      color: black;
    }
  `,
})
export class ToggleStyleComponent {
  readonly text = input<string>();

  protected readonly isDarkModeEnabled = signal(false);
  protected readonly toggleText = computed(() =>
    this.isDarkModeEnabled() ? 'Switch to Light Mode' : 'Switch to Dark Mode',
  );

  protected toggleDarkMode(): void {
    this.isDarkModeEnabled.set(!this.isDarkModeEnabled());
  }
}
