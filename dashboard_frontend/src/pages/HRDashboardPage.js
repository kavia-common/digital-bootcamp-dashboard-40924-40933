import React from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { ParticipantCard } from "../components/ParticipantCard";
import { useAppState } from "../context/AppStateContext";

// PUBLIC_INTERFACE
export function HRDashboardPage() {
  /** HR dashboard: participant grid with summary and navigation to details. */
  const { state, derived } = useAppState();
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="page-head">
        <div>
          <div className="page-title">HR Dashboard</div>
          <div className="page-subtitle">Review participant submissions and update statuses.</div>
        </div>
      </div>

      <div className="participant-grid">
        {state.participants.map((p) => (
          <ParticipantCard
            key={p.id}
            participant={p}
            summary={derived.participantSummaryById[p.id]}
            onClick={() => navigate(`/participants/${p.id}`)}
          />
        ))}
      </div>
    </AppShell>
  );
}
