import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { Button } from "./Button";

// PUBLIC_INTERFACE
export function Modal({ title, open, onClose, children, footer }) {
  /** Accessible modal dialog with escape/overlay-close and initial focus. */
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    // Focus modal panel
    window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FiX />
          </Button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
