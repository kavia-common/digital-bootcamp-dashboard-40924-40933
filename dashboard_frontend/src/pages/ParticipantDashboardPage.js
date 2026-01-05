import React, { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { FileUpload } from "../components/FileUpload";
import { SubmissionItem } from "../components/SubmissionItem";
import { useAppState } from "../context/AppStateContext";
import { useToast } from "../context/ToastContext";
import { defaultDayLabelFromDate, isValidISODate } from "../utils/date";

/**
 * For demo, the Participant view acts as participant p1.
 */
const DEMO_PARTICIPANT_ID = "p1";

// PUBLIC_INTERFACE
export function ParticipantDashboardPage() {
  /** Participant dashboard: add daily work submission and view history. */
  const { state, actions } = useAppState();
  const { push } = useToast();

  const participant = state.participants.find((p) => p.id === DEMO_PARTICIPANT_ID);

  const mySubmissions = useMemo(
    () => state.submissions.filter((s) => s.participantId === DEMO_PARTICIPANT_ID),
    [state.submissions]
  );

  const [dateISO, setDateISO] = useState("");
  const [dayLabel, setDayLabel] = useState("");
  const [description, setDescription] = useState("");
  const [fileMeta, setFileMeta] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!dateISO || !isValidISODate(dateISO)) next.dateISO = "Please choose a valid date.";
    if (!dayLabel?.trim()) next.dayLabel = "Day is required.";
    if (!description?.trim()) next.description = "Description is required.";
    if (fileMeta?.error) next.file = fileMeta.error;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onDateChange = (v) => {
    setDateISO(v);
    if (!dayLabel) setDayLabel(defaultDayLabelFromDate(v));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      push("Please fix the highlighted fields.", "error");
      return;
    }

    const safeFile =
      fileMeta && !fileMeta.error
        ? { name: fileMeta.name, type: fileMeta.type, size: fileMeta.size, url: fileMeta.url }
        : undefined;

    actions.addSubmission({
      participantId: DEMO_PARTICIPANT_ID,
      dateISO,
      dayLabel: dayLabel.trim(),
      description: description.trim(),
      file: safeFile,
    });

    push("Submission added.", "success");

    setDateISO("");
    setDayLabel("");
    setDescription("");
    setFileMeta(null);
    setErrors({});
  };

  return (
    <AppShell>
      <div className="page-head">
        <div>
          <div className="page-title">Participant Dashboard</div>
          <div className="page-subtitle">
            {participant ? `Welcome, ${participant.name}` : "Welcome"}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <Card className="panel">
          <div className="panel-title">Add daily work</div>
          <form onSubmit={onSubmit} className="form-grid" noValidate>
            <label className="form-field">
              <div className="form-label">Date</div>
              <input
                className={`input ${errors.dateISO ? "input-error" : ""}`}
                type="date"
                value={dateISO}
                onChange={(e) => onDateChange(e.target.value)}
                required
              />
              {errors.dateISO ? <div className="form-error">{errors.dateISO}</div> : null}
            </label>

            <label className="form-field">
              <div className="form-label">Day</div>
              <input
                className={`input ${errors.dayLabel ? "input-error" : ""}`}
                value={dayLabel}
                onChange={(e) => setDayLabel(e.target.value)}
                placeholder="Day 1"
                required
              />
              {errors.dayLabel ? <div className="form-error">{errors.dayLabel}</div> : null}
            </label>

            <label className="form-field" style={{ gridColumn: "1 / -1" }}>
              <div className="form-label">Description</div>
              <textarea
                className={`textarea ${errors.description ? "input-error" : ""}`}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you work on today?"
                required
              />
              {errors.description ? <div className="form-error">{errors.description}</div> : null}
            </label>

            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <div className="form-label">File upload (optional)</div>
              <FileUpload value={fileMeta} onChange={setFileMeta} />
              {errors.file ? <div className="form-error">{errors.file}</div> : null}
            </div>

            <div className="form-actions" style={{ gridColumn: "1 / -1" }}>
              <Button type="submit">Submit daily work</Button>
            </div>
          </form>
        </Card>

        <div>
          <div className="panel-title" style={{ marginBottom: 12 }}>
            Submission history
          </div>
          <div className="stack">
            {mySubmissions.length === 0 ? (
              <Card className="empty">
                No submissions yet. Add your first entry to get started.
              </Card>
            ) : (
              mySubmissions.map((s) => <SubmissionItem key={s.id} submission={s} />)
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
