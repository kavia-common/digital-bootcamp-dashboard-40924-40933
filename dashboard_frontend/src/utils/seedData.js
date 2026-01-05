/**
 * Seed data for in-memory demo. In real usage, replace with API calls.
 */
import { createId } from "./uid";

/**
 * @returns {{participants: Array<any>, submissions: Array<any>}}
 */
export function getSeedData() {
  const participants = [
    {
      id: "p1",
      name: "Aisha Khan",
      avatarUrl: "",
    },
    {
      id: "p2",
      name: "Diego Ramirez",
      avatarUrl: "",
    },
    {
      id: "p3",
      name: "Mei Chen",
      avatarUrl: "",
    },
  ];

  const submissions = [
    {
      id: createId("sub"),
      participantId: "p1",
      dateISO: "2026-01-02",
      dayLabel: "Day 1",
      description: "Completed React basics and built a small component library.",
      file: {
        name: "day1-notes.pdf",
        type: "application/pdf",
        size: 120000,
        url: "",
      },
      status: "review_successful",
      meeting: undefined,
      hrFeedback: "Nice progress; keep components small and reusable.",
    },
    {
      id: createId("sub"),
      participantId: "p1",
      dateISO: "2026-01-03",
      dayLabel: "Day 2",
      description: "Implemented routing with nested layouts and dynamic routes.",
      file: undefined,
      status: "want_to_meet",
      meeting: { datetimeISO: "2026-01-06T15:30:00.000Z", notes: "Discuss routing patterns" },
      hrFeedback: "Let’s meet to align on route structure and data loading.",
    },
    {
      id: createId("sub"),
      participantId: "p2",
      dateISO: "2026-01-03",
      dayLabel: "Day 2",
      description: "Built a form with validation and improved accessibility labels.",
      file: undefined,
      status: "pending",
      meeting: undefined,
      hrFeedback: "",
    },
  ];

  // Create a blob URL placeholder for the sample pdf so UI still shows link style
  // without bundling a binary file.
  // We keep url empty; UI will only show link when url exists.

  return { participants, submissions };
}
