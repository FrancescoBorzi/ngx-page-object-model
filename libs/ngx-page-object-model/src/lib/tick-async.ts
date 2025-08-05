/**
 * Zoneless replacement for Angular's fakeAsync tick().
 *
 * Waits for the specified timeout using async/await.
 * Intended for flushing timers in Zoneless tests where fakeAsync cannot be used.
 *
 * ⚠️ Avoid using non-zero delays in tests:
 *    - Real delays make tests slower
 *    - Prefer 0ms to flush microtasks or mock timers for async code
 *
 * Examples:
 *   await tickAsync();      // flushes a 0ms timeout (recommended)
 *   await tickAsync(500);   // waits 500ms in real time (slows down test)
 *
 * @param delayMs Time to wait in milliseconds (default 0)
 */
export function tickAsync(delayMs: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}
