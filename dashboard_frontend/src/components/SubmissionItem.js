import React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { FiDownload, FiMessageSquare, FiVideo } from "react-icons/fi";
import { formatDatePretty } from "../utils/date";

// PUBLIC_INTERFACE
export function SubmissionItem({
  submission,
  rightSlot,
}) {
  /** Displays a submission with date/day, description, file link, status, meeting. */
  return (
    <Card className="submission-card">
      <div className="submission-header">
        <div>
          <div className="submission-title">
            {formatDatePretty(submission.dateISO)} <span className="muted">·</span>{" "}
            {submission.dayLabel}
          </div>
          <div className="submission-subtitle">{submission.description}</div>
        </div>
        <div className="submission-badges">
          <Badge status={submission.status} />
        </div>
      </div>

      {submission.file?.url ? (
        <div className="submission-row">
          <div className="submission-row-label">Upload</div>
          <a className="link" href={submission.file.url} download={submission.file.name}>
            <FiDownload style={{ marginRight: 8 }} />
            {submission.file.name}
          </a>
        </div>
      ) : submission.file?.name ? (
        <div className="submission-row">
          <div className="submission-row-label">Upload</div>
          <span className="muted">{submission.file.name}</span>
        </div>
      ) : null}

      {submission.hrFeedback ? (
        <div className="submission-row">
          <div className="submission-row-label">
            <FiMessageSquare style={{ marginRight: 8 }} />
            Feedback
          </div>
          <div className="submission-row-value">{submission.hrFeedback}</div>
        </div>
      ) : null}

      {submission.meeting?.datetimeISO ? (
        <div className="submission-row">
          <div className="submission-row-label">
            <FiVideo style={{ marginRight: 8 }} />
            Meeting
          </div>
          <div className="submission-row-value">
            {new Date(submission.meeting.datetimeISO).toLocaleString()}
            {submission.meeting.notes ? (
              <div className="muted" style={{ marginTop: 4 }}>{submission.meeting.notes}</div>
            ) : null}
          </div>
        </div>
      ) : null}

      {rightSlot ? <div className="submission-actions">{rightSlot}</div> : null}
    </Card>
  );
}
