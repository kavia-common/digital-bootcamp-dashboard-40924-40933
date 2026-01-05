/**
 * Placeholder data service.
 *
 * Reads API base URL from env, but currently returns mocked/in-memory data.
 * Future: replace functions with fetch calls to REACT_APP_API_BASE endpoints.
 */
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  "";

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns configured API base URL (may be empty for local mock mode). */
  return API_BASE;
}
