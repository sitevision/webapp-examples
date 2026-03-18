import * as React from "react";
import classnames from "classnames";
import styles from "./Messages.scss";
import PropTypes from "prop-types";
import Markdown from "../Markdown";

const Messages = ({ messages }) => {
  const messageListRef = React.useRef(null);

  React.useEffect(() => {
    if (!messageListRef.current) {
      return;
    }

    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.chatWindow}>
      <div
        ref={messageListRef}
        className={styles.messageList}
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={classnames(styles.messageRow, {
              [styles.messageRowUser]: message.sender === "user",
              [styles.messageRowAssistant]: message.sender === "assistant",
            })}
          >
            <div
              className={classnames("env-shadow-small", styles.messageBubble, {
                [styles.messageBubbleUser]: message.sender === "user",
                [styles.messageBubbleAssistant]: message.sender === "assistant",
              })}
            >
              {message.text ? (
                <Markdown message={message.text} />
              ) : (
                <div className="env-spinner-bounce">
                  <div className="env-bounce1"></div>
                  <div className="env-bounce2"></div>
                  <div className="env-bounce3"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

Messages.propTypes = {
  messages: PropTypes.array,
};
