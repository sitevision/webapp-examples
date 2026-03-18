(() => {
  const router = require("router");
  const resourceLocatorUtil = require("ResourceLocatorUtil");
  const nodeFilterUtil = require("NodeFilterUtil");
  const nodeIteratorUtil = require("NodeIteratorUtil");

  router.get("/", (req, res) => {
    res.render({
      aiAssistants: getAiAssistants(),
      channels: getChannels(),
    });
  });

  function getAiAssistants() {
    const aiAssistants = [];
    resourceLocatorUtil
      .getAiAssistantRepository()
      .getNodes()
      .forEachRemaining((aiAssistant) => {
        aiAssistants.push({
          id: aiAssistant.getIdentifier(),
          name: aiAssistant.getName(),
        });
      });

    return aiAssistants;
  }

  function getChannels() {
    const filterBuilder = nodeFilterUtil.getCompoundAndFilterBuilder();
    const archivedFilter = nodeFilterUtil.getBooleanPropertyFilter(
      "isArchived",
      false
    );

    const channelsFilter = filterBuilder.addFilter(archivedFilter).build();
    const channels = [];
    nodeIteratorUtil
      .getFilteredNodeIterator(
        resourceLocatorUtil.getTopicRepository().getNodes(),
        channelsFilter
      )
      .forEachRemaining((channel) => {
        channels.push({
          id: channel.getIdentifier(),
          name: channel.getName(),
        });
      });
    return channels;
  }
})();
