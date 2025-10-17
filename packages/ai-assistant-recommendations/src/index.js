/* global console */
import aiAssistant from "@sitevision/api/server/aiAssistant";
import appData from "@sitevision/api/server/appData";
import router from "@sitevision/api/common/router";
import properties from "@sitevision/api/server/Properties";
import timestampUtil from "@sitevision/api/server/TimestampUtil";

router.get("/", (req, res) => {
  res.agnosticRender("", {});
});

router.post("/recommendation", (req, res) => {
  const { input, conversationIdentifier } = req.params;

  if (!input || input.length > 1000) {
    return res.status(400);
  }

  generateAnswer({ res, input, conversationIdentifier });
});

function generateAnswer({ res, input, conversationIdentifier }) {
  // See assistant.txt for the prompt used for this example (Defined in the assistant settings on the site)
  const aiAssistantNode = appData.getNode("aiAssistant");

  // On the first message we create a new conversation. Reuse the conversationIdentifier on subsequent messages to continue the conversation.
  if (!conversationIdentifier) {
    conversationIdentifier = aiAssistant.createConversation(aiAssistantNode);
  }

  const presentations = querySemanticIndex({ aiAssistantNode, input });

  const options = {
    conversationIdentifier,
    message: input,
    knowledge: presentations,
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
    },
  };

  res
    .status(200)
    .set("Content-Type", "text/plain")
    .set("Cache-Control", "no-cache")
    .set("X-Conversation-Identifier", conversationIdentifier);

  // AI calls require being logged in. If the webapp allows anonymous users, we need to use privileged to make the call.
  aiAssistant.askAssistant(aiAssistantNode, options);
}

function querySemanticIndex({ aiAssistantNode, input }) {
  const searchResult = aiAssistant.querySemanticIndex(aiAssistantNode, {
    query: input,
    maxHits: 3,
  });

  const presentations = [];
  searchResult.forEach(({ text, id, type }) => {
    if (type !== "internal") {
      // This example is made assuming only internal sources are used
      // RAG should not contain any external sources.
      return;
    }

    const { displayName, programfrom, programtodate, URL } = properties.get(
      id,
      "displayName",
      "programfrom", // Metadata available on the demo site
      "programtodate", // Metadata available on the demo site
      "URL"
    );
    const presentation = [];
    // Add some context around the presentation
    presentation.push(
      `Presentation start time: ${formatTimestamp(programfrom)}`
    );
    presentation.push(
      `Presentation end time: ${formatTimestamp(programtodate)}`
    );
    presentation.push(`Presentation title: [${displayName}](${URL})`);
    presentation.push(`Presentation text: ${text}`);
    presentations.push(presentation);
  });

  if (presentations.length < 1) {
    return "Unfortunately we could not find a relevant presentation in the program. Is there anything else that would interest you?";
  }

  return presentations.map((inner) => inner.join("\n")).join("\n\n");
}

function formatTimestamp(timestamp) {
  return timestampUtil.format(timestamp, "EEEE HH:mm");
}
