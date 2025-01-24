export function typeInElement(
  value: string,
  element: HTMLElement & { value: string },
): void {
  element.value = value;
  element.dispatchEvent(new Event('input'));
}
