import React from "react";
import { Button } from "./Button";
import { FiCheckCircle, FiCalendar, FiClock } from "react-icons/fi";

// PUBLIC_INTERFACE
export function StatusSelector({ status, onSetSuccessful, onWantToMeet, onSchedule }) {
  /** Small action group for HR to update status or schedule meeting. */
  return (
    <div className="status-actions">
      <Button
        variant={status === "review_successful" ? "success" : "secondary"}
        size="sm"
        onClick={onSetSuccessful}
      >
        <FiCheckCircle style={{ marginRight: 8 }} />
        Review Successful
      </Button>
      <Button
        variant={status === "want_to_meet" ? "warning" : "secondary"}
        size="sm"
        onClick={onWantToMeet}
      >
        <FiClock style={{ marginRight: 8 }} />
        Want to Meet
      </Button>
      <Button variant="secondary" size="sm" onClick={onSchedule}>
        <FiCalendar style={{ marginRight: 8 }} />
        Schedule Meeting
      </Button>
    </div>
  );
}
