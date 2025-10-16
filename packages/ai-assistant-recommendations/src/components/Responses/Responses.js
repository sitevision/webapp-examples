import * as React from "react";
import Response from "../Response";
import PropTypes from "prop-types";

const Responses = ({ responses, isProcessing }) => {
  if (responses.length < 1) {
    return null;
  }

  return (
    <div className="env-flex env-flex--direction-column env-flex--gap-small env-m-bottom--large">
      {responses.map((response, i) => (
        <Response
          key={i}
          isProcessing={isProcessing}
          message={response.message}
          self={response.self}
        />
      ))}
    </div>
  );
};

Responses.propTypes = {
  responses: PropTypes.array,
  isProcessing: PropTypes.bool,
};

export default Responses;
