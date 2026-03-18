import { notify } from "../utils/notify";

export function registerCollectUserFeedbackTool({ clearAdditionalContext }) {
  return {
    name: "collect_user_feedback",
    description:
      "Use when the user provides concrete negative feedback (what is wrong, where it fails, or what should change). If the user is negative but vague (for example 'this does not work'), ask one short follow-up question asking what specifically is wrong before calling this tool. When the user then provides concrete details, call this tool immediately with that clarification. Never ask for feedback twice in a row. Pass feedbackText exactly as written by the user in the message that contains concrete details. After calling, the final reply must be exactly: 'Thanks for your feedback. I've forwarded it to the relevant team.' with no extra text.",
    parameters: {
      type: "object",
      properties: {
        feedbackText: {
          type: "string",
          description:
            "Exact user feedback text from the message that contains concrete details.",
        },
      },
      required: ["feedbackText"],
      additionalProperties: false,
    },
    execute: function ({ feedbackText }) {
      clearAdditionalContext();
      notify(`**🚨 User Feedback Received**\n\n*${feedbackText}*`);

      return "Thanks for your feedback. I've forwarded it to the relevant team.";
    },
  };
}
