import { getAdditionalContext } from "../utils/context";

export function registerRetrieveSemanticContextTool({ setAdditionalContext }) {
  return {
    name: "retrieve_semantic_context",
    description:
      "Secondary retrieval step for documentation Q&A. Call this when retrieve_context is missing, weak, or insufficient to answer. Use the user's question as query unless a tighter search query is obvious. If this still does not provide enough relevant documentation information, or the question is out of scope for development-tool documentation, call question_unanswered before replying. Do not answer from general knowledge.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Semantic search query, usually the exact user question.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    execute: function ({ query }) {
      const result = getAdditionalContext(query);
      if (result.link) {
        setAdditionalContext(
          `\n\n---\n\nThe current page could not provide enough information. Additional information was retrieved from ${result.link} have a look at this page to learn more.`
        );
      }

      return result.text;
    },
  };
}
