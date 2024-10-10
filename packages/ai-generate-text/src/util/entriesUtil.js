import appData from '@sitevision/api/server/appData';
import indexUtil from '@sitevision/api/server/IndexUtil';
import UGC_INDEX from '@sitevision/api/server/IndexUtil.IndexType.UGC';
import nodeTypeUtil from '@sitevision/api/server/NodeTypeUtil';
import privileged from '@sitevision/api/server/privileged';
import properties from '@sitevision/api/server/Properties';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import searchFactory from '@sitevision/api/server/SearchFactory';
import userIdentityUtil from '@sitevision/api/server/UserIdentityUtil';

const getStringFromHitType = (hit) => {
  const ownerId = hit.getField('owner'); // Group or channel id
  const authorId = hit.getField('author');
  const summary = hit.getField('summary');

  const ownerNode = resourceLocatorUtil.getNodeByIdentifier(ownerId);
  const authorName = properties.get(authorId, 'displayName');

  const isGroup = nodeTypeUtil.isCollaborationGroup(ownerNode);

  if (isGroup) {
    const groupName = properties.get(ownerNode, 'displayName');

    return `authorName:${authorName} authorId:${authorId} wrote:${summary} in the group named:${groupName}`;
  }

  const isTopic = nodeTypeUtil.isType(ownerNode, nodeTypeUtil.TOPIC_TYPE);

  if (isTopic) {
    const topicName = properties.get(ownerNode, 'displayName');

    return `authorName:${authorName} authorId:${authorId} wrote:${summary} in the channel named:${topicName}`;
  }

  return `authorName:${authorName} authorId:${authorId} wrote:${summary}`;
};

export const getRecentEntries = () => {
  const searcherBuilder = searchFactory.getSearcherBuilder();
  const filterBuilder = searchFactory.getFilterBuilder();

  const privilegedUser = privileged.getPrivilegedActionUser();
  const privilegedSUI = userIdentityUtil.getUserIdentity(privilegedUser);

  const filter = filterBuilder
    .addFilterQuery('+created:[NOW-1DAYS TO NOW]')
    .addFilterQuery('+svtype:(groupentry topicentry)') // Entries from groups and channel messages
    .addFilterQuery(`-author:${privilegedSUI.getIdentifier()}`)
    .build();

  const searcher = searcherBuilder
    .setIndex(indexUtil.getDefaultIndex(UGC_INDEX))
    .setFilter(filter)
    .build();

  const maxEntries = appData.getNumber('maxEntries');
  const result = searcher.search('*:*', maxEntries);
  const entries = [];

  if (result.hasHits()) {
    const hits = result.getHits();

    while (hits.hasNext()) {
      const hit = hits.next();

      entries.push(getStringFromHitType(hit));
    }
  }

  return entries;
};
