/* global console */
import aiAssistant from "@sitevision/api/server/aiAssistant";
import appData from "@sitevision/api/server/appData";
import properties from "@sitevision/api/server/Properties";
import requester from "@sitevision/api/server/Requester";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import nodeTreeUtil from "@sitevision/api/server/NodeTreeUtil";
import rendererBuilderFactory from "@sitevision/api/server/RendererBuilderFactory";
import nodeTypeUtil from "@sitevision/api/server/NodeTypeUtil";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";

export function getAdditionalContext(input) {
  const searchResult = aiAssistant.querySemanticIndex(
    appData.getNode("aiAssistant"),
    {
      query: input,
      maxHits: 1, // Simply use the most relevant result, if any. In a real implementation you might want to use more results and combine them in a meaningful way before returning to the assistant.
    }
  );

  if (searchResult.length === 0 || searchResult[0].type !== "internal") {
    // This example is made assuming only internal sources are used
    // RAG should not contain any external sources.
    return { text: "Could not find any relevant information.", link: "" };
  }

  const { text, id } = searchResult[0];
  const { URL, displayName } = properties.get(id, "URL", "displayName");
  const node = resourceLocatorUtil.getNodeByIdentifier(id);

  if (
    nodeTypeUtil.isFile(
      // Use chunks for files. Feels risky to fetch all content from a file. Could be a lot.
      node
    )
  ) {
    return { text, link: `[${displayName}](${URL})` };
  }

  return { text: getPageAsMarkdown(node), link: `[${displayName}](${URL})` };
}

export function getPageAsMarkdown(node) {
  if (node === portletContextUtil.getCurrentPage()) {
    // contentRenderer.renderMarkdown() does not support rendering of the current page as of writing,
    // so we need to get the markdown in another way

    return getMarkdownForCurrentPage();
  }

  const contentAreas = nodeTreeUtil.findReferenceLayouts(node).toArray();
  const contentRendererBuilder =
    rendererBuilderFactory.getContentRendererBuilder();
  const contentRenderer = contentRendererBuilder.setPage(node).build();
  const knowledge = [];
  // Loop all content areas on the page to get all page content
  for (const area of contentAreas) {
    contentRenderer.update(area);
    const markdown = contentRenderer.renderMarkdown(); // Get content as markdown
    knowledge.push(markdown);
  }

  return knowledge.length > 0
    ? knowledge.join("\n\n")
    : "Failed to retrieve context from the page.";
}

// Workaround for current page markdown retrieval issue in content renderer. Not needed for other pages.
// Fetch the markdown by an request instead.
function getMarkdownForCurrentPage() {
  const currentPage = portletContextUtil.getCurrentPage();
  const url = properties.get(currentPage, "URL");

  const contentAreas = nodeTreeUtil.findReferenceLayouts(currentPage).toArray();

  const knowledge = [];
  // Loop all content areas on the page to get all page content
  for (const area of contentAreas) {
    const contentAreaName = properties.get(area, "displayName");
    const sourceUrl = `${url}/${contentAreaName}.md`;
    // Get content as markdown
    requester
      .get(sourceUrl, { dataType: "text" })
      .done((response) => {
        knowledge.push(response);
      })
      .fail((error) => {
        console.error(
          "Failed to retrieve context from " + sourceUrl + ", cause: " + error
        );
      });
  }

  return knowledge.length > 0
    ? knowledge.join("\n\n")
    : "Failed to retrieve context from the page.";
}
