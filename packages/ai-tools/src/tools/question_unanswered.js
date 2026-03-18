import { notify } from "../utils/notify";

export function registerQuestionUnansweredTool({ clearAdditionalContext }) {
  return {
    name: "question_unanswered",
    description:
      "Escalation step for unresolved or out-of-scope Q&A. Use after retrieval attempts when the answer is unsupported by documentation, and also use for unrelated questions outside development-tool documentation scope (for example: 'when did World War 2 start?'). Do not use this tool for user complaints or quality issues about prior answers; those must go through collect_user_feedback instead. Pass the exact user question. After calling this tool, the final user-facing reply must be exactly this sentence and nothing else: 'I can not find relevant information to answer your question. Documentation might be incomplete or missing. I've forwarded this information to the relevant team.'",
    parameters: {
      type: "object",
      properties: {
        unansweredUserQuestion: {
          type: "string",
          description:
            "The exact user question the assistant could not answer.",
        },
      },
      required: ["unansweredUserQuestion"],
      additionalProperties: false,
    },
    execute: function ({ unansweredUserQuestion }) {
      clearAdditionalContext();
      notify(`**⚠️ Unable to answer question.**\n*${unansweredUserQuestion}*`);

      return "I can not find relevant information to answer your question. Documentation might be incomplete or missing. I've forwarded this information to the relevant team.";
    },
  };
}
