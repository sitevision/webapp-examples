import type { DocumentationItem } from "./fetchItems";

export function mapContent(items: DocumentationItem[]) {
  return items
    .map(({ text }) => {
      return text;
    })
    .join("\n\n");
}
