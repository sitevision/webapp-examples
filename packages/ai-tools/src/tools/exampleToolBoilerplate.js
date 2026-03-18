export const customTool = {
  name: "my_custom_tool",
  description: "A description of the tool",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The user's query",
      },
    },
    required: ["query"],
    additionalProperties: false,
  },
  execute: function ({ query }) {
    // Do stuff with query

    return "Thanks for your query. Here's the result.";
  },
};
