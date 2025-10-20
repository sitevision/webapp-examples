/* global fetch TextDecoder */
import * as React from "react";
import PropTypes from "prop-types";
import i18n from "@sitevision/api/common/i18n";
import router from "@sitevision/api/common/router";
import security from "@sitevision/api/common/security";
import SearchIcon from "./SearchIcon";

const Form = ({ setResponses, isProcessing, setIsProcessing }) => {
  const queryInputId = React.useId();
  const conversationIdentifier = React.useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);

    const query = e.target[queryInputId].value.trim();
    e.target[queryInputId].value = "";

    setResponses((responses) => [
      ...responses,
      {
        message: query,
        self: true,
      },
      {}, // Preemptively add an empty response to show loading spinner
    ]);

    try {
      const url = router.getStandaloneUrl("/recommendation");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [security.csrf.getHeaderName()]: security.csrf.getToken(),
        },
        body: JSON.stringify({
          input: query,
          conversationIdentifier: conversationIdentifier.current,
        }),
      });

      if (!response || !response.body || !response.ok) {
        const error = new Error("No response from server");
        error.status = response.status;
        throw error;
      }

      const reader = response.body.getReader();
      let result = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);

        result += text;
        const response = {
          message: result,
        };

        setResponses((responses) => {
          const newResponses = responses.slice();
          newResponses[newResponses.length - 1] = response;
          return newResponses;
        });
      }

      setIsProcessing(false);
      if (!conversationIdentifier.current) {
        // Save the conversation identifier to be able to continue the conversation for subsequent messages
        conversationIdentifier.current = response.headers.get(
          "X-Conversation-Identifier"
        );
      }
    } catch (error) {
      setIsProcessing(false);
      setResponses((responses) => {
        const updatedResponses = [...responses];
        updatedResponses.pop();
        updatedResponses.push({
          message: i18n.get("queryErrorMessage"),
        });
        return updatedResponses;
      });
    }
  }

  return (
    <form className="env-form" onSubmit={onSubmit}>
      <div className="env-form-field">
        <label htmlFor={queryInputId} className="env-form-label">
          {i18n.get("queryLabel")}
        </label>
        <div className="env-form-control">
          <div className="env-form-label" aria-hidden="true">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="env-form-input"
            placeholder={i18n.get("queryPlaceholder")}
            aria-describedby={`${queryInputId}-help`}
            id={queryInputId}
            autoComplete="off"
          />
          <button
            className="env-button env-button--primary"
            disabled={isProcessing}
          >
            {i18n.get("submit")}
          </button>
        </div>
        <p id={`${queryInputId}-help`} className="env-form-field-help">
          {i18n.get("queryHelp")}
        </p>
      </div>
    </form>
  );
};

Form.propTypes = {
  setResponses: PropTypes.func,
  isProcessing: PropTypes.bool,
  setIsProcessing: PropTypes.func,
};

export default Form;
