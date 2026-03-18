import * as React from "react";
import classnames from "classnames";
import styles from "./Form.scss";
import PropTypes from "prop-types";
import { onSubmit } from "./submit";

const Form = ({ setMessages, setIsProcessing, isProcessing }) => {
  const conversationIdentifier = React.useRef(null);
  const [prompt, setPrompt] = React.useState("");
  const inputRef = React.useRef(null);

  return (
    <form
      className={classnames("env-form env-shadow", styles.form)}
      onSubmit={(e) =>
        onSubmit({
          e,
          prompt,
          setPrompt,
          setIsProcessing,
          setMessages,
          conversationIdentifier,
        })
      }
    >
      <div className="env-form-field">
        <div className="env-form-control">
          <button
            type="button"
            className="env-button env-button--large env-button--icon"
            aria-label="New chat"
            onClick={() => {
              setMessages([]);
              conversationIdentifier.current = null;
              inputRef.current.focus();
            }}
            disabled={isProcessing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="env-icon env-icon--medium"
              aria-hidden="true"
            >
              <path d="M9.33,15.42c-.2,0-.39-.08-.53-.22-.17-.17-.24-.4-.21-.64l.53-3.71c.02-.16,.1-.31,.21-.42L18.88,.88C19.45,.31,20.2,0,21,0s1.56,.31,2.12,.88c1.17,1.17,1.17,3.07,0,4.24L13.58,14.67c-.11,.11-.26,.19-.42,.21l-3.71,.53s-.07,0-.11,0Zm.88-1.63l2.48-.35,7.78-7.78-2.12-2.12-7.78,7.78-.35,2.48ZM21.53,4.59l.53-.53c.58-.59,.58-1.54,0-2.12-.28-.28-.66-.44-1.06-.44s-.78,.16-1.06,.44l-.53,.53,2.12,2.12Z"></path>
              <path d="M2.25,24C1.01,24,0,22.99,0,21.75V6.75C0,5.51,1.01,4.5,2.25,4.5h7.5c.41,0,.75,.34,.75,.75s-.34,.75-.75,.75H2.25c-.41,0-.75,.34-.75,.75v15c0,.41,.34,.75,.75,.75h15c.41,0,.75-.34,.75-.75v-7.5c0-.41,.34-.75,.75-.75s.75,.34,.75,.75v7.5c0,1.24-1.01,2.25-2.25,2.25H2.25Z"></path>
            </svg>
          </button>
          <input
            ref={inputRef}
            className="env-form-input"
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={
              conversationIdentifier.current ? "Anything else?" : "Need help?"
            }
            aria-label="Message to assistant"
          />
          <button
            className="env-button env-button--brand env-button--large env-button--icon"
            type="submit"
            aria-label="Send"
            disabled={isProcessing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="env-icon env-icon--medium"
              aria-hidden="true"
            >
              <g>
                <path d="M18.3399 0.48999C18.7299 0.48999 19.0699 0.76999 19.1399 1.14999C19.5199 3.10999 21.0599 4.65999 22.9499 5.02999C23.3299 5.10999 23.6099 5.43999 23.6099 5.82999C23.6099 6.21999 23.3299 6.55999 22.9499 6.62999C21.0599 7.00999 19.5299 8.55999 19.1399 10.51C19.0599 10.89 18.7299 11.17 18.3399 11.17C17.9499 11.17 17.6099 10.89 17.5399 10.51C17.1599 8.54999 15.6199 7.00999 13.7299 6.62999C13.3499 6.54999 13.0699 6.21999 13.0699 5.82999C13.0699 5.43999 13.3499 5.09999 13.7299 5.02999C15.6099 4.64999 17.1499 3.09999 17.5399 1.14999C17.6199 0.76999 17.9499 0.48999 18.3399 0.48999ZM8.73 4.80998C9.37 4.80998 9.92 5.25998 10.04 5.88998C10.67 9.08998 13.18 11.62 16.26 12.24C16.89 12.37 17.33 12.92 17.33 13.55C17.33 14.18 16.88 14.74 16.26 14.86C13.18 15.48 10.67 18.01 10.04 21.21C9.92 21.84 9.37 22.29 8.73 22.29C8.09 22.29 7.54 21.84 7.42 21.21C6.79 18.01 4.28 15.48 1.2 14.86C0.570005 14.73 0.130005 14.18 0.130005 13.55C0.130005 12.92 0.580005 12.36 1.2 12.24C4.28 11.62 6.79 9.08998 7.42 5.88998C7.54 5.25998 8.09 4.80998 8.73 4.80998ZM20.47 15.85C20.42 15.55 20.16 15.34 19.86 15.34C19.57 15.34 19.31 15.56 19.25 15.85C18.96 17.35 17.78 18.53 16.34 18.82C16.05 18.88 15.84 19.14 15.84 19.43C15.84 19.72 16.05 19.98 16.34 20.04C17.78 20.33 18.96 21.51 19.25 23.01C19.3 23.31 19.57 23.52 19.86 23.52C20.15 23.52 20.41 23.3 20.47 23.01C20.76 21.51 21.94 20.33 23.38 20.04C23.67 19.98 23.88 19.72 23.88 19.43C23.88 19.14 23.67 18.88 23.38 18.82C21.94 18.53 20.76 17.35 20.47 15.85Z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  setMessages: PropTypes.func.isRequired,
  setIsProcessing: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default Form;
