import React from "react";
import classNames from "classnames";
import { useToast } from "../context/ToastContext";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

function iconFor(intent) {
  if (intent === "error") return <FiAlertCircle />;
  if (intent === "info") return <FiInfo />;
  return <FiCheckCircle />;
}

// PUBLIC_INTERFACE
export function ToastViewport() {
  /** Renders toasts bottom-right for feedback. */
  const { toasts, remove } = useToast();

  return (
    <div className="toast-viewport" aria-live="polite" aria-relevant="additions">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={classNames("toast", `toast-${t.intent}`)}
          role="status"
        >
          <div className="toast-icon" aria-hidden="true">
            {iconFor(t.intent)}
          </div>
          <div className="toast-message">{t.message}</div>
          <button className="toast-close" onClick={() => remove(t.id)} aria-label="Dismiss toast">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
