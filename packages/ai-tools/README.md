# ai-tools

Example WebApp about how you can utilize the [aiAssistant SDK](https://developer.sitevision.se/docs/webapps/sdk/aiassistant) with TOOLS. The WebApp is created as a complement to a presentation made for Sitevision Tech Summit 2026. Even if not present it should serve as a quick example of a small chat bot.

The app is created to exemplify tool usage.

## Tools

This app registers four assistant tools:

- `retrieve_context`: Fetches markdown context from the current page. This is the first retrieval step for documentation questions.
- `retrieve_semantic_context`: Searches the semantic index for additional documentation context when page context is not enough.
- `question_unanswered`: Escalation/fallback tool used when documentation context is still not enough (or the question is out of scope). Tool also notifies the configured channel/group/mail.
- `collect_user_feedback`: Captures concrete user feedback (for example bugs, accessibility issues, confusing responses) and forwards it to the team. Tool also notifies the configured channel/group/mail.

Typical flow:

1. Try `retrieve_context`.
2. If needed, try `retrieve_semantic_context`.
3. If still unsupported, call `question_unanswered`.
4. If the user reports a quality issue, call `collect_user_feedback`.

## Setup

In the site settings you need to set up a knowledge base with the desired scope. You will also need to set up an assistant. For the example prompt used, see `assistant.txt`.

Module preferably placed in a template and it will stick to the bottom right of the screen.
