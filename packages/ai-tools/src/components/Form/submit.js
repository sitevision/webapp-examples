/* global fetch console TextDecoder */
import router from "@sitevision/api/common/router";
import security from "@sitevision/api/common/security";

export async function onSubmit({
  e,
  prompt,
  setPrompt,
  setIsProcessing,
  setMessages,
  conversationIdentifier,
}) {
  e.preventDefault();
  const query = prompt.trim();
  setPrompt("");
  if (!query.trim()) {
    return;
  }

  setIsProcessing(true);

  setMessages((messages) => [
    ...messages,
    {
      text: query,
      sender: "user",
    },
    { text: "", sender: "assistant" }, // Preemptively add an empty response to show loading spinner
  ]);

  submit({
    query,
    setPrompt,
    setIsProcessing,
    setMessages,
    conversationIdentifier,
  });
}

async function submit({
  query,
  setIsProcessing,
  setMessages,
  conversationIdentifier,
  isRetry = false,
}) {
  try {
    const url = router.getStandaloneUrl("/ask");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [security.csrf.getHeaderName()]: security.csrf.getToken(),
      },
      body: JSON.stringify({
        input: query,
        conversationIdentifier: conversationIdentifier.current,
      }),
    });

    if (!response?.body || !response.ok) {
      const error = new Error("No response from server");
      error.status = response.status;
      throw error;
    }

    const reader = response.body.getReader();
    let result = "";

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const text = new TextDecoder().decode(value);

      result += text;

      const response = {
        text: result,
        sender: "assistant",
      };

      setMessages((messages) => {
        const newMessages = messages.slice();
        newMessages[newMessages.length - 1] = response;
        return newMessages;
      });
    }

    setIsProcessing(false);
    if (!conversationIdentifier.current) {
      // Save the conversation identifier to be able to continue the conversation for subsequent messages
      conversationIdentifier.current = response.headers.get(
        "X-Conversation-Identifier"
      );
    }
  } catch (error) {
    console.error("Failed to get response from server:", error);
    if (!isRetry) {
      // Allow one automatic retry if there's an error
      submit({
        query,
        setIsProcessing,
        setMessages,
        conversationIdentifier,
        isRetry: true,
      });
      return;
    }

    setIsProcessing(false);
    setMessages((messages) => {
      const updatedMessages = [...messages];
      updatedMessages.pop();
      updatedMessages.push({
        text: "Failed to get response from server. Please try again.",
        sender: "assistant",
      });
      return updatedMessages;
    });
  }
}
