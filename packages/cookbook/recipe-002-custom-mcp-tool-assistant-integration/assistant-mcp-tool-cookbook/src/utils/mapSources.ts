import type { DocumentationItem } from "./fetchItems";

export function mapSources(items: DocumentationItem[]) {
  return items.map(({ id, source, name, url }) => {
    return {
      id,
      type: "external",
      source,
      name,
      url,
    };
  });
}
