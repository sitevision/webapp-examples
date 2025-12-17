(() => {
  const router = require("router");
  const resourceLocatorUtil = require("ResourceLocatorUtil");

  router.get("/", (req, res) => {
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

    res.render({
      aiAssistants,
    });
  });
})();
