import React from "react";
import { Card } from "./Card";
import { FiUser } from "react-icons/fi";

// PUBLIC_INTERFACE
export function ParticipantCard({ participant, summary, onClick }) {
  /** Participant overview card (HR dashboard). */
  return (
    <Card className="participant-card" role="button" tabIndex={0} onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      aria-label={`Open details for ${participant.name}`}
    >
      <div className="participant-card-top">
        <div className="avatar">
          {participant.avatarUrl ? (
            <img src={participant.avatarUrl} alt={`${participant.name} profile`} />
          ) : (
            <FiUser aria-hidden="true" />
          )}
        </div>
        <div className="participant-meta">
          <div className="participant-name">{participant.name}</div>
          <div className={`participant-summary participant-summary-${summary?.kind || "muted"}`}>
            {summary?.label || "—"}
          </div>
        </div>
      </div>
      <div className="participant-card-hint">Click to review submissions</div>
    </Card>
  );
}
