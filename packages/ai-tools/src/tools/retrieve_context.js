import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import { getPageAsMarkdown } from "../utils/context";

export function registerRetriveContextTool() {
  return {
    name: "retrieve_context",
    description:
      "Primary retrieval step for documentation Q&A. Call this first for each non-trivial user question before answering. The assistant must answer only from retrieved documentation context, never from general knowledge. If the result is empty, vague, irrelevant, or does not directly answer the question, call retrieve_semantic_context in the same turn.",
    execute: function () {
      return getPageAsMarkdown(portletContextUtil.getCurrentPage());
    },
  };
}
