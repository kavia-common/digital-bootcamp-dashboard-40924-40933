import React, { createContext, useContext, useMemo, useReducer } from "react";
import { getSeedData } from "../utils/seedData";
import { createId } from "../utils/uid";

/**
 * @typedef {import("../types").Participant} Participant
 * @typedef {import("../types").Submission} Submission
 */

const AppStateContext = createContext(null);

function summarizeParticipant(participantId, submissions) {
  const subs = submissions.filter((s) => s.participantId === participantId);
  const pending = subs.some((s) => s.status === "pending");
  const wantToMeet = subs.some((s) => s.status === "want_to_meet");
  const total = subs.length;

  if (total === 0) return { label: "No submissions yet", kind: "muted" };
  if (wantToMeet) return { label: "Want to meet", kind: "warning" };
  if (pending) return { label: "Pending review", kind: "neutral" };
  return { label: "Review successful", kind: "success" };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_SUBMISSION": {
      const submission = action.payload;
      return {
        ...state,
        submissions: [submission, ...state.submissions],
      };
    }
    case "SET_SUBMISSION_STATUS": {
      const { submissionId, status } = action.payload;
      return {
        ...state,
        submissions: state.submissions.map((s) =>
          s.id === submissionId ? { ...s, status } : s
        ),
      };
    }
    case "SET_SUBMISSION_MEETING": {
      const { submissionId, meeting } = action.payload;
      return {
        ...state,
        submissions: state.submissions.map((s) =>
          s.id === submissionId ? { ...s, meeting, status: "want_to_meet" } : s
        ),
      };
    }
    case "SET_SUBMISSION_FEEDBACK": {
      const { submissionId, hrFeedback } = action.payload;
      return {
        ...state,
        submissions: state.submissions.map((s) =>
          s.id === submissionId ? { ...s, hrFeedback } : s
        ),
      };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function AppStateProvider({ children }) {
  /** Provides shared app state (participants + submissions) for HR/Participant dashboards. */
  const seed = getSeedData();
  const [state, dispatch] = useReducer(reducer, {
    participants: seed.participants,
    submissions: seed.submissions,
  });

  const actions = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      addSubmission: ({ participantId, dateISO, dayLabel, description, file }) => {
        /** Add a new submission (Participant action). */
        const submission = {
          id: createId("sub"),
          participantId,
          dateISO,
          dayLabel,
          description,
          file,
          status: "pending",
          meeting: undefined,
          hrFeedback: "",
        };
        dispatch({ type: "ADD_SUBMISSION", payload: submission });
        return submission;
      },
      // PUBLIC_INTERFACE
      setSubmissionStatus: (submissionId, status) => {
        /** Set submission status (HR action). */
        dispatch({ type: "SET_SUBMISSION_STATUS", payload: { submissionId, status } });
      },
      // PUBLIC_INTERFACE
      setSubmissionMeeting: (submissionId, meeting) => {
        /** Schedule meeting (HR action) and mark as want_to_meet. */
        dispatch({ type: "SET_SUBMISSION_MEETING", payload: { submissionId, meeting } });
      },
      // PUBLIC_INTERFACE
      setSubmissionFeedback: (submissionId, hrFeedback) => {
        /** Set HR feedback note (optional). */
        dispatch({ type: "SET_SUBMISSION_FEEDBACK", payload: { submissionId, hrFeedback } });
      },
    };
  }, []);

  const derived = useMemo(() => {
    const participantSummaryById = Object.fromEntries(
      state.participants.map((p) => [p.id, summarizeParticipant(p.id, state.submissions)])
    );
    return { participantSummaryById };
  }, [state.participants, state.submissions]);

  const value = useMemo(() => ({ state, actions, derived }), [state, actions, derived]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppState() {
  /** Hook for accessing app state and actions. */
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
