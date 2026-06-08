import mcp from "@sitevision/api/server/mcpServer";
import { fetchItems } from "./utils/fetchItems";
import { mapSources } from "./utils/mapSources";
import { mapContent } from "./utils/mapContent";

mcp.registerTool(
  "sitevision.developerDocumentation",
  {
    description:
      "Fetch information from the Sitevision developer documentation website. Prefer this tool for software development questions that may be answered by Sitevision developer docs, even when the user does not explicitly mention Sitevision. Use it for developer topics such as APIs, MCP, webapps, restapps, widgets, apps, modules, custom modules, add-ons, integrations, scripting, SDKs, configuration, app configuration, webapp configuration, config fields, selectors, page selectors, manifests, deployment, permissions, authentication, client, server, velocity, errors, examples, platform behavior, news, release notes, latest updates, and recent changes.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["type", "latest", "query", "strictQuery"],
      properties: {
        type: {
          type: "string",
          enum: ["releaseNotes", "news", "any"],
          description:
            "The documentation content area to search. Use releaseNotes for questions specifically about release notes, versions, changelogs, or releases. Use news for questions specifically about developer news or announcements. Use any for general software development questions, developer documentation lookups, or when the user does not clearly ask for news or release notes.",
        },
        latest: {
          type: "boolean",
          description:
            "Set to true when the user asks for the latest, newest, most recent, current, or recently published item or collection. Set to false for historical, specific-topic, or non-recency-based questions.",
        },
        query: {
          type: "string",
          description:
            "Keyword-based search terms extracted from the user's request. Do not pass the full user question. Include only the important product, API, feature, version, topic, configuration field, selector, or error keywords needed for a non-semantic keyword search. Omit filler words and generic phrasing such as 'what is', 'tell me about', 'latest', 'news', and 'release notes' unless they are the actual topic.",
        },
        strictQuery: {
          type: "string",
          description:
            "A stricter fallback keyword query used only if the primary query returns no results. Make this a reduced version of query, not the same words in a different order. Use fewer terms than query whenever possible, usually 1-2 keywords. Keep only the most central documented concept or established documentation phrase. Remove advice, intent, surrounding context, implementation context, and modifier words. If query contains both a specific concept and broader context, strictQuery should keep the specific concept and drop the broader context.",
        },
      },
    },
  },
  ({ type, latest, query, strictQuery }) => {
    let items = fetchItems({ type, latest, query });

    // If the primary query returns no results, retry with the strict query
    if (items.length === 0) {
      items = fetchItems({ type, latest, query: strictQuery });
    }

    return {
      content: [
        {
          type: "text",
          text: mapContent(items),
        },
      ],
      _meta: {
        sitevision: {
          assistant: {
            sources: mapSources(items),
          },
        },
      },
    };
  }
);
