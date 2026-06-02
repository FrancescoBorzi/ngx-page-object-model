import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';

/**
 * Demonstrates content rendered outside the component host via a CDK Overlay,
 * which attaches its DOM to a `cdk-overlay-container` in `document.body`.
 */
@Component({
  selector: 'app-overlay-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button data-testid="open-dialog-button" (click)="open()">Open dialog</button>

    <ng-template #dialog>
      <div data-testid="confirm-dialog" class="dialog">
        <h2 data-testid="confirm-dialog-title">Are you sure?</h2>
        <button data-testid="confirm-dialog-action" (click)="close()">Confirm</button>
        <button data-testid="confirm-dialog-action" (click)="close()">Cancel</button>
      </div>
    </ng-template>
  `,
  styles: `
    .dialog {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #bbb;
      border-radius: 8px;
      padding: 24px;
      backdrop-filter: blur(4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
  `,
})
export class OverlayDialogComponent {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly dialogTemplate = viewChild.required<TemplateRef<unknown>>('dialog');

  private overlayRef?: OverlayRef;

  open(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    this.overlayRef.attach(new TemplatePortal(this.dialogTemplate(), this.viewContainerRef));
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}
