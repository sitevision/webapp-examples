import * as React from "react";
import Form from "../Form";
import ScrollController from "../ScrollController";
import Responses from "../Responses";

const App = () => {
  const [responses, setResponses] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  return (
    <>
      <Responses responses={responses} isProcessing={isProcessing} />
      <Form
        setResponses={setResponses}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
      <ScrollController responses={responses} />
    </>
  );
};

export default App;
