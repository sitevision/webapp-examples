/* global console */
import aiAssistant from "@sitevision/api/server/aiAssistant";
import appData from "@sitevision/api/server/appData";
import { PROMPT } from "../constants";
import {
  registerRetriveContextTool,
  registerRetrieveSemanticContextTool,
  registerQuestionUnansweredTool,
  registerCollectUserFeedbackTool,
} from "../tools";

export function generateAnswer({ res, input, conversationIdentifier }) {
  // See assistant.txt for tone and style instructions (Defined in the assistant settings on the site)
  const aiAssistantNode = appData.getNode("aiAssistant");

  // On the first message we create a new conversation. Reuse the conversationIdentifier on subsequent messages to continue the conversation.
  if (!conversationIdentifier) {
    conversationIdentifier = aiAssistant.createConversation(aiAssistantNode);
  }

  // Used to fix a small message at the end if additional context from another page is used
  let additionalContext = "";

  // Fill the tool array with tools.
  // Tools speficied in their own files for readability, but could be defined inline here as well.
  const tools = [
    registerRetriveContextTool(),
    registerRetrieveSemanticContextTool({
      setAdditionalContext: function (value) {
        additionalContext = value;
      },
    }),
    registerQuestionUnansweredTool({
      clearAdditionalContext: function () {
        additionalContext = "";
      },
    }),
    registerCollectUserFeedbackTool({
      clearAdditionalContext: function () {
        additionalContext = "";
      },
    }),
  ];

  const options = {
    conversationIdentifier, // <-- Pass the conversation identifier in the options when asking the assistant to continue the conversation.
    tools, // <-- Pass the tools in the options when asking the assistant
    message: input, // <-- Pass the user input as the message when asking the assistant
    additionalInstructions: PROMPT, // <-- Pass the additional instructions in the options when asking the assistant
    onChunk: function (chunk) {
      res.send(chunk);
      if (chunk && chunk.trim().length > 0) {
        res.flush();
      }
    },
    onFinish: function (result) {
      if (result.error) {
        console.error("Failed to generate ai response, cause: " + result.error);
        return res.status(500);
      }

      if (additionalContext) {
        res.send(additionalContext);
        res.flush();
      }
    },
  };

  res
    .status(200)
    .set("Content-Type", "text/plain")
    .set("Cache-Control", "no-cache")
    .set("X-Conversation-Identifier", conversationIdentifier); // <-- Pass the conversation identifier back to the client in a header for it to reuse in subsequent messages.

  // AI calls require being logged in. If the webapp allows anonymous users, we need to use privileged to make the call.
  // This example assumes an authenticated user
  aiAssistant.askAssistant(aiAssistantNode, options);
}
