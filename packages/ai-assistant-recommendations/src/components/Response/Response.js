import * as React from "react";
import PropTypes from "prop-types";
import styles from "./Response.scss";
import Markdown from "../Markdown";
import classNames from "classnames";

const Response = ({ isProcessing, message, self }) => {
  if (!isProcessing && !message) {
    return null;
  }

  return (
    <div className={classNames(styles.response, { [styles.self]: self })}>
      {message ? (
        <Markdown message={message} />
      ) : (
        <div className="env-spinner-bounce">
          <div className="env-bounce1"></div>
          <div className="env-bounce2"></div>
          <div className="env-bounce3"></div>
        </div>
      )}
    </div>
  );
};

Response.propTypes = {
  isProcessing: PropTypes.bool,
  message: PropTypes.string,
  self: PropTypes.bool,
};

export default Response;
