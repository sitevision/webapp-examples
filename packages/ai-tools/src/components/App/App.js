import * as React from "react";
import classnames from "classnames";
import styles from "./App.scss";
import Form from "../Form";
import Messages from "../Messages/Messages";

const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const messageListRef = React.useRef(null);

  React.useEffect(() => {
    if (!messageListRef.current) {
      return;
    }

    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.container}>
      {messages.length > 0 && <Messages messages={messages} />}
      <Form
        setMessages={setMessages}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default App;
