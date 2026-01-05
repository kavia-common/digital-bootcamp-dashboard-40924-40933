import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { SubmissionItem } from "../components/SubmissionItem";
import { StatusSelector } from "../components/StatusSelector";
import { MeetingModal } from "../components/MeetingModal";
import { useAppState } from "../context/AppStateContext";
import { useToast } from "../context/ToastContext";
import { FiArrowLeft } from "react-icons/fi";

// PUBLIC_INTERFACE
export function ParticipantDetailsPage() {
  /** HR view for a single participant with per-submission actions and meeting scheduling. */
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useAppState();
  const { push } = useToast();

  const participant = state.participants.find((p) => p.id === id);

  const submissions = useMemo(() => {
    return state.submissions
      .filter((s) => s.participantId === id)
      .slice()
      .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  }, [state.submissions, id]);

  const [meetingForSubmissionId, setMeetingForSubmissionId] = useState(null);

  const activeSubmission = meetingForSubmissionId
    ? state.submissions.find((s) => s.id === meetingForSubmissionId)
    : null;

  if (!participant) {
    return (
      <AppShell>
        <Card className="empty">
          Participant not found.{" "}
          <Button variant="secondary" onClick={() => navigate("/hr")} style={{ marginLeft: 8 }}>
            Back
          </Button>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="page-head">
        <div className="page-head-row">
          <Button variant="ghost" onClick={() => navigate("/hr")} aria-label="Back to HR dashboard">
            <FiArrowLeft style={{ marginRight: 8 }} />
            Back
          </Button>
        </div>
        <div>
          <div className="page-title">{participant.name}</div>
          <div className="page-subtitle">Day-wise submissions and HR actions.</div>
        </div>
      </div>

      <div className="stack">
        {submissions.length === 0 ? (
          <Card className="empty">No submissions yet for this participant.</Card>
        ) : (
          submissions.map((s) => (
            <SubmissionItem
              key={s.id}
              submission={s}
              rightSlot={
                <StatusSelector
                  status={s.status}
                  onSetSuccessful={() => {
                    actions.setSubmissionStatus(s.id, "review_successful");
                    push("Marked as Review Successful.", "success");
                  }}
                  onWantToMeet={() => {
                    actions.setSubmissionStatus(s.id, "want_to_meet");
                    push("Marked as Want to Meet.", "info");
                  }}
                  onSchedule={() => setMeetingForSubmissionId(s.id)}
                />
              }
            />
          ))
        )}
      </div>

      <MeetingModal
        open={Boolean(meetingForSubmissionId)}
        initialISO={activeSubmission?.meeting?.datetimeISO}
        onClose={() => setMeetingForSubmissionId(null)}
        onSubmit={(meeting) => {
          if (!meeting?.datetimeISO) {
            push("Please pick a valid date & time.", "error");
            return;
          }
          actions.setSubmissionMeeting(meetingForSubmissionId, meeting);
          push("Meeting scheduled and status updated.", "success");
        }}
      />
    </AppShell>
  );
}
