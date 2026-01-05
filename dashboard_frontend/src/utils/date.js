/**
 * Lightweight date utilities (no external date lib).
 */

// PUBLIC_INTERFACE
export function isValidISODate(dateISO) {
  /** Validate YYYY-MM-DD. */
  if (!dateISO || typeof dateISO !== "string") return false;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateISO);
  if (!m) return false;
  const d = new Date(`${dateISO}T00:00:00.000Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === dateISO;
}

// PUBLIC_INTERFACE
export function formatDatePretty(dateISO) {
  /** Format YYYY-MM-DD to a friendly short string. */
  if (!isValidISODate(dateISO)) return dateISO || "";
  const d = new Date(`${dateISO}T00:00:00.000Z`);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

// PUBLIC_INTERFACE
export function defaultDayLabelFromDate(dateISO) {
  /** Compute a simple Day label from date; can be edited by user. */
  if (!isValidISODate(dateISO)) return "Day";
  const base = new Date("2026-01-01T00:00:00.000Z");
  const d = new Date(`${dateISO}T00:00:00.000Z`);
  const diffDays = Math.max(1, Math.round((d - base) / (24 * 3600 * 1000)) + 1);
  return `Day ${diffDays}`;
}

// PUBLIC_INTERFACE
export function formatDateTimeLocalInput(iso) {
  /** Convert ISO date string to yyyy-MM-ddTHH:mm for <input type="datetime-local">. */
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// PUBLIC_INTERFACE
export function parseDateTimeLocalToISO(value) {
  /** Parse datetime-local value to ISO string. */
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString();
}
