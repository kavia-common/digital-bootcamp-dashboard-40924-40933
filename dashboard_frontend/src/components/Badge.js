import React from "react";
import classNames from "classnames";

/**
 * @param {import("../types").SubmissionStatus} status
 */
function getStatusMeta(status) {
  switch (status) {
    case "review_successful":
      return { label: "Review Successful", tone: "success" };
    case "want_to_meet":
      return { label: "Want to Meet", tone: "warning" };
    case "pending":
    default:
      return { label: "Pending", tone: "neutral" };
  }
}

// PUBLIC_INTERFACE
export function Badge({ status, className }) {
  /** Color-coded badge for submission status. */
  const meta = getStatusMeta(status);
  return (
    <span
      className={classNames("badge", `badge-${meta.tone}`, className)}
      aria-label={`Status: ${meta.label}`}
      role="status"
    >
      {meta.label}
    </span>
  );
}
