/* global console */
import restApi from "@sitevision/api/server/RestApi";
import appData from "@sitevision/api/server/appData";
import privileged from "@sitevision/api/server/privileged";
import collaborationFactory from "@sitevision/api/server/CollaborationFactory";
import mailUtil from "@sitevision/api/server/MailUtil";

// Utility function to send the feedback message to the right place based on the app configuration.
export function notify(message) {
  const notifyBy = appData.get("notifyBy");
  console.error("Notification method: " + notifyBy);
  switch (notifyBy) {
    case "messages":
      sendMessageToChannel(message);
      break;
    case "timeline":
      sendMessageToGroup(message);
      break;
    case "mail":
      console.log(message);
      sendMessageToMail(message);
      break;
    default:
      throw new Error(`Unknown notification method: ${notifyBy}`);
  }
}

function sendMessageToChannel(message) {
  try {
    // Want the "bot" user to post the message.
    privileged.doPrivilegedAction(() => {
      restApi.post(appData.getNode("channel"), "channelMessages", {
        message,
      });
    });
  } catch (error) {
    console.warn("Failed to post feedback message to channel: " + error);
  }
}

function sendMessageToGroup(message) {
  try {
    // Want the "bot" user to post the message.
    privileged.doPrivilegedAction(() => {
      const groupWrapper = collaborationFactory.getCollaborationGroupWrapper(
        appData.getNode("group")
      );
      const group = groupWrapper.getCollaborationGroup();
      restApi.post(group, "timelineEntries", {
        message,
      });
    });
  } catch (error) {
    console.warn("Failed to post feedback message to group: " + error);
  }
}

function sendMessageToMail(message) {
  try {
    const mailBuilder = mailUtil.getMailBuilder();
    const mail = mailBuilder
      .addRecipient(appData.get("mail"))
      .setSubject("Assistant Alert")
      .setTextMessage(message)
      .setFrom(mailUtil.getSiteFromAddress())
      .build();

    mail.send();
  } catch (error) {
    console.warn("Failed to send feedback message via mail: " + error);
  }
}
