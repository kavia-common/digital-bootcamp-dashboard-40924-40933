/**
 * Small ID helper. Good enough for client-side demo state.
 */

// PUBLIC_INTERFACE
export function createId(prefix = "id") {
  /** Generate a pseudo-unique ID for in-memory entities. */
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
