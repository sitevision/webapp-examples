import requester from "@sitevision/api/server/Requester";

export type DocumentationItem = {
  name: string;
  id: string;
  source: string;
  text: string;
  url?: string;
};

export function fetchItems({
  type,
  latest,
  query,
}: {
  type: string;
  latest: boolean;
  query: string;
}) {
  let items: DocumentationItem[] = [];

  const url =
    "https://developer.sitevision.se/rest-api/assistant-mcp-tool-cookbook-data-endpoint/fetch";

  const options = {
    data: {
      type,
      latest,
      count: 5,
      query,
    },
  };

  requester
    .get(url, options)
    .done((result: DocumentationItem[]) => {
      items = result;
    })
    .fail((message: string, status: number) => {
      console.error("Error calling data endpoint:", message, "Status:", status);
    });

  return items;
}
