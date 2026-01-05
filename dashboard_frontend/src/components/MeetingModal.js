import React, { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { formatDateTimeLocalInput, parseDateTimeLocalToISO } from "../utils/date";

// PUBLIC_INTERFACE
export function MeetingModal({ open, onClose, onSubmit, initialISO }) {
  /** Modal to schedule a meeting (stores ISO datetime string locally). */
  const [datetimeLocal, setDatetimeLocal] = useState(() =>
    formatDateTimeLocalInput(initialISO)
  );
  const [notes, setNotes] = useState("");

  const canSubmit = useMemo(() => Boolean(datetimeLocal), [datetimeLocal]);

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          const iso = parseDateTimeLocalToISO(datetimeLocal);
          onSubmit?.({ datetimeISO: iso, notes: notes.trim() });
          onClose?.();
        }}
        disabled={!canSubmit}
      >
        Save meeting
      </Button>
    </>
  );

  return (
    <Modal title="Schedule meeting" open={open} onClose={onClose} footer={footer}>
      <div className="form-grid">
        <label className="form-field">
          <div className="form-label">Date & time</div>
          <input
            className="input"
            type="datetime-local"
            value={datetimeLocal}
            onChange={(e) => setDatetimeLocal(e.target.value)}
          />
        </label>
        <label className="form-field">
          <div className="form-label">Notes (optional)</div>
          <textarea
            className="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Agenda, location, or call link..."
          />
        </label>
      </div>
    </Modal>
  );
}
