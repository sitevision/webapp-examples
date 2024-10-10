import router from '@sitevision/api/common/router';
import ai from '@sitevision/api/server/ai';
import appData from '@sitevision/api/server/appData';
import collaborationFactory from '@sitevision/api/server/CollaborationFactory';
import fileUtil from '@sitevision/api/server/FileUtil';
import nodeFilterUtil from '@sitevision/api/server/NodeFilterUtil';
import nodeIteratorUtil from '@sitevision/api/server/NodeIteratorUtil';
import nodeTypeUtil from '@sitevision/api/server/NodeTypeUtil';
import portletContextUtil from '@sitevision/api/server/PortletContextUtil';
import properties from '@sitevision/api/server/Properties';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

router.get('/', (req, res) => {
  const currentPage = portletContextUtil.getCurrentPage();

  // Render app only on collaboration group pages
  if (!nodeTypeUtil.isCollaborationGroupPage(currentPage)) {
    return;
  }

  const group = collaborationFactory
    .getCollaborationGroupWrapper(currentPage)
    .getCollaborationGroup();

  const fileNodes = resourceLocatorUtil
    .getPersonalFileRepository(group)
    .getNodes();

  const textFilter = nodeFilterUtil.getStartsWithStringPropertyFilter(
    'mimeType',
    'text/'
  );

  const options = nodeIteratorUtil
    .findAll(fileNodes, textFilter)
    .toArray()
    .map((node) => ({
      id: node.getIdentifier(),
      name: properties.get(node, 'displayName'),
    }));

  const data = {
    options,
  };

  res.agnosticRender(renderToString(<App {...data} />), data);
});

const getContextAwarePrompt = (context) => {
  return `
    You are a helpful assistant. You will answer questions regarding the content from meeting protocols provided in text files. Only use plain text in your responses without any formatting like markdown, bold, italics, or other text styles.

    Instructions for your responses:
    - Use line breaks to separate paragraphs and key points.
    - When listing items, start each item on a new line with a dot or dash.
    - Do not use any formatting beyond plain text and simple line breaks.

    Files: "${context}"
  `;
};

router.post('/chat', (req, res) => {
  const { question, files } = req.params;

  const content = files
    .map((file) => {
      const fileNode = resourceLocatorUtil.getNodeByIdentifier(file);
      const filename = properties.get(fileNode, 'displayName');
      const content = fileUtil.getContentAsString(fileNode);

      return `Filename:${filename} content:${content}`;
    })
    .join('\n');

  const options = {
    messages: [
      {
        role: 'system',
        content: getContextAwarePrompt(content),
      },
      {
        role: 'user',
        content: question,
      },
    ],
    onChunk: function (token) {
      res.send(token);
      res.flush(); // Flush so the client gets the data immediately
    },
    onFinish: function (result) {
      if (result.error) {
        console.error('Operation failed: ' + JSON.stringify(result));
      } else {
        res.flush();
      }
    },
  };

  res
    .status(200)
    .set('Content-Type', 'text/plain')
    .set('Cache-Control', 'no-cache');

  ai.streamText(appData.getNode('llm'), options);
});
