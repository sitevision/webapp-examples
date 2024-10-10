(() => {
  const router = require('router');
  const rlu = require('ResourceLocatorUtil');
  const properties = require('Properties');
  const nodeFilterUtil = require('NodeFilterUtil');
  const nodeIteratorUtil = require('NodeIteratorUtil');

  router.get('/', (req, res) => {
    const notArchivedFilter = nodeFilterUtil.getBooleanPropertyFilter(
      'isArchived',
      false
    );

    const channels = nodeIteratorUtil
      .findAll(rlu.getTopicRepository().getNodes(), notArchivedFilter)
      .toArray()
      .map((topic) => ({
        id: topic.getIdentifier(),
        name: properties.get(topic, 'displayName'),
      }));

    res.render({
      channels,
    });
  });
})();
