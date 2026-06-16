import appData from "@sitevision/api/server/appData";
import indexingUtil from "@sitevision/api/server/IndexingUtil";
import properties from "@sitevision/api/server/Properties";
import searchFactory from "@sitevision/api/server/SearchFactory";
import type { SearchHit } from "@sitevision/api/types/senselogic/sitevision/api/search/SearchHit";
import type { Node } from "@sitevision/api/types/javax/jcr/Node";
import type { FetchType } from "../constants";
import queryStringUtil from "@sitevision/api/server/QueryStringUtil";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";

type SearchHitData = {
  id: string;
  name: string;
  source: string;
  url: string;
  text: string;
};

function _search({
  path,
  count,
  latest,
  query,
}: {
  path: string;
  count: number;
  latest: boolean;
  query?: string;
}): SearchHitData[] {
  const filter = searchFactory
    .getFilterBuilder()
    .clearFilterQueries()
    .addFilterQuery(`${path} +svtype:page -svtype:file`.trim())
    .build();

  const searcherBuilder = searchFactory.getSearcherBuilder();
  searcherBuilder.setFilter(filter);

  if (latest) {
    const sort = searchFactory
      .getSortBuilder()
      .clearSortFields()
      .addSortField(searchFactory.getSearchSortField("published", false))
      .build();

    searcherBuilder.setSort(sort);
  }

  const searcher = searcherBuilder.build();
  const searchResult = searcher.search(
    query ? queryStringUtil.smartWildcard(query) : "*:*",
    count
  );

  const data: SearchHitData[] = [];
  if (searchResult?.hasHits()) {
    const hits = searchResult.getHits();

    while (hits.hasNext()) {
      const hit = hits.next() as SearchHit;
      const node = hit.getNode();
      const item = getData(node);
      data.push(item);
    }
  }

  return data;
}

type ArticleProperties = {
  displayName?: string;
  articleName?: string;
  URL?: string;
};

function getData(node: Node): SearchHitData {
  const { displayName, articleName, URL } = properties.get(
    node,
    "displayName",
    "articleName",
    "URL"
  ) as ArticleProperties;

  return {
    id: node.getIdentifier(),
    name: articleName || displayName || "",
    source: properties.get(
      resourceLocatorUtil.getSite(),
      "displayName"
    ) as string,
    url: URL || "",
    text: getPageAsMarkdown(node),
  };
}

function getPageAsMarkdown(node: Node): string {
  const extractorBuilder = indexingUtil.getIndexableContentExtractorBuilder();
  const contentExtractor = extractorBuilder.setPage(node).build();
  const markdown = contentExtractor.extractMarkdown();
  return markdown;
}

export function search({
  type,
  count,
  latest,
  query,
}: {
  type: FetchType;
  count: number;
  latest: boolean;
  query?: string;
}): SearchHitData[] {
  if (type === "releaseNotes") {
    return _search({
      path: `+path:${appData.getNode("releaseNotes").getIdentifier()}`,
      count,
      latest,
      query,
    });
  }

  if (type === "news") {
    return _search({
      path: `+path:${appData.getNode("news").getIdentifier()}`,
      count,
      latest,
      query,
    });
  }

  if (type === "any") {
    return _search({
      path: "",
      count,
      latest,
      query,
    });
  }

  return [];
}
