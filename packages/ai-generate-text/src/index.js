import events from '@sitevision/api/common/events';
import router from '@sitevision/api/common/router';
import ai from '@sitevision/api/server/ai';
import appData from '@sitevision/api/server/appData';
import logUtil from '@sitevision/api/server/LogUtil';
import privileged from '@sitevision/api/server/privileged';
import restApi from '@sitevision/api/server/RestApi';
import { getRecentEntries } from './util/entriesUtil';

const getDayInString = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const date = new Date();

  return days[date.getDay() - 1];
};

const fetchAndPost = () => {
  let success = false;

  privileged.doPrivilegedAction(() => {
    const entries = getRecentEntries();

    if (entries.length === 0) {
      success = true;
      logUtil.info('No entries found to summarize.');
      return;
    }

    const llm = appData.getNode('llm');

    const { text, error } = ai.generateText(llm, {
      messages: [
        {
          role: 'system',
          content: `
            You are a fun and witty office assistant, and your job is to put smiles on people's faces.
            You've been tasked with generating a summary of recent entries.
            Format the summary using the following markdown rules:

            • Always start your summary with a fun and encouraging greeting, giving the team a boost of energy and enthusiasm!
            • Return the summary in bullet points only.
            • Use ** for bolding important titles or themes.
            • For each entry:
              - Extract the "authorName" and "authorId" from the input data (e.g., "authorName:John Doe authorId:12345").
              - Tag the author using the format "[authorName](authorId)" in the summary.
            • If an entry contains repetitive or irrelevant information, ignore it and only focus on meaningful content.
            • Keep the summaries focused and clear, without unnecessary details or repetition.
            • Entries come from either a group or a channel. End each activity with **#groupName** or **#channelName** to indicate its source of origin.
            • Mix up the opening greeting to keep things fresh and engaging. Feel free to use relevant emojis to add more fun (e.g., 🎉 for celebrations, 📊 for reports, etc.).

            Some example greetings:
            • 🌞 Good morning, Team! Time to conquer the day—here's the recent highlights! 📊
            • ☕ Coffee's extra strong today! Here's what's brewing in the office!
            • 🎉 Happy ${getDayInString()}, everyone!
          `,
        },
        {
          role: 'user',
          content: entries.join(' '),
        },
      ],
    });

    if (error) {
      logUtil.error(`Error generating text: ${JSON.stringify(error)}`);
      success = false;

      return;
    }

    const messageResult = restApi.post(
      appData.getNode('channel'),
      'ChannelMessages',
      {
        message: text,
      }
    );

    success = messageResult.statusCode >= 200 && messageResult.statusCode < 300;
  });

  return success;
};

router.get('/summarize', (req, res) => {
  if (!privileged.isConfigured()) {
    res.status(503).json({
      error: 'Privileged user is not configured.',
    });

    return;
  }

  const result = fetchAndPost();

  res.status(result ? 200 : 500).json({ success: result });
});

events.on('sv:every-hour', ({ timestamp }) => {
  if (!privileged.isConfigured()) {
    logUtil.warn(
      'Privileged user is not configured, activity-tracker will not run.'
    );

    return;
  }

  const date = new Date(timestamp);
  const day = date.getDay();
  const hour = date.getHours();

  // Check if its monday - friday and 7am
  if (day >= 1 && day <= 5 && hour === 7) {
    fetchAndPost();
  }
});
