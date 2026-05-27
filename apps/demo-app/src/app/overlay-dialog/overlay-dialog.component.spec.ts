import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { DebugHtmlElement, PageObjectModel } from 'ngx-page-object-model';

import { OverlayDialogComponent } from './overlay-dialog.component';

describe(OverlayDialogComponent.name, () => {
  class Page extends PageObjectModel<OverlayDialogComponent> {
    // the open button lives inside the component host (in-fixture)
    openButton(assert = true): DebugHtmlElement<HTMLButtonElement> {
      return this.getDebugElementByTestId<HTMLButtonElement>('open-dialog-button', assert);
    }

    // the dialog renders into the CDK overlay container, outside the fixture host
    dialogTitle(assert = true): HTMLElement {
      return this.queryOutsideFixtureByTestId('confirm-dialog-title', assert);
    }
    dialogActions(assert = true): HTMLButtonElement[] {
      return this.queryAllOutsideFixtureByTestId<HTMLButtonElement>('confirm-dialog-action', assert);
    }

    async openDialog(): Promise<void> {
      this.openButton().nativeElement.click();
      await this.fixture.whenStable();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayDialogComponent],
    }).compileComponents();
  });

  afterEach(() => {
    // dispose the overlay container to avoid leaking overlay nodes into other tests
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  it('returns null (assert=false) before the overlay is opened', async () => {
    const page = new Page(TestBed.createComponent(OverlayDialogComponent));
    await page.fixture.whenStable();

    expect(page.dialogTitle(false)).toBeFalsy();
    expect(page.dialogActions(false)).toBeFalsy();
  });

  it('throws a descriptive error when the overlay element is missing', async () => {
    const page = new Page(TestBed.createComponent(OverlayDialogComponent));
    await page.fixture.whenStable();

    expect(() => page.dialogTitle()).toThrow(
      'Element with selector "[data-testid="confirm-dialog-title"]" was not found outside the fixture.',
    );
  });

  it('finds the overlay content once the dialog is opened', async () => {
    const page = new Page(TestBed.createComponent(OverlayDialogComponent));
    await page.fixture.whenStable();

    await page.openDialog();

    expect(page.dialogTitle().textContent).toContain('Are you sure?');
  });

  it('returns all matching overlay elements via the queryAll variants', async () => {
    const page = new Page(TestBed.createComponent(OverlayDialogComponent));
    await page.fixture.whenStable();

    await page.openDialog();

    expect(page.dialogActions()).toHaveLength(2);
    // equivalent
    expect(page.queryAllOutsideFixture('[data-testid="confirm-dialog-action"]')).toHaveLength(2);
    expect(page.dialogActions().map((button) => button.textContent?.trim())).toEqual(['Confirm', 'Cancel']);
  });
});
