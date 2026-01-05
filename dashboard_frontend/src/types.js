/**
 * Shared JSDoc “types” to keep structure consistent without TypeScript.
 */

/**
 * @typedef {'pending'|'review_successful'|'want_to_meet'} SubmissionStatus
 */

/**
 * @typedef {Object} MeetingDetails
 * @property {string} datetimeISO ISO datetime string
 * @property {string=} notes Optional notes
 */

/**
 * @typedef {Object} Submission
 * @property {string} id
 * @property {string} participantId
 * @property {string} dateISO YYYY-MM-DD
 * @property {string} dayLabel e.g., "Day 3"
 * @property {string} description
 * @property {{name: string, type: string, size: number, url: string}=} file
 * @property {SubmissionStatus} status
 * @property {MeetingDetails=} meeting
 * @property {string=} hrFeedback
 */

/**
 * @typedef {Object} Participant
 * @property {string} id
 * @property {string} name
 * @property {string=} avatarUrl
 */
export {};
