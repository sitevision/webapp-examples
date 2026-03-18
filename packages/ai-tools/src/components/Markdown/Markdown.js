import MarkdownToJSX from "markdown-to-jsx";
import PropTypes from "prop-types";
import * as React from "react";
import styles from "./Markdown.scss";

const Markdown = ({ message }) => {
  return (
    <div className={styles.markdown}>
      <MarkdownToJSX
        options={{
          disableParsingRawHTML: true,
          forceBlock: true,
          overrides: {
            code: {
              props: { className: "env-ui-text-caption" },
            },
            h1: {
              props: { className: "env-ui-text-sectionheading" },
            },
            h2: {
              props: { className: "env-ui-text-subheading" },
            },
            h3: {
              props: { className: "env-ui-text-subheading" },
            },
            h4: {
              props: { className: "env-ui-text-subheading" },
            },
            h5: { props: { className: "env-ui-text-subheading" } },
            h6: {
              props: { className: "env-ui-text-subheading" },
            },
            p: {
              props: { className: "env-text" },
            },
            span: {
              props: { className: "env-text" },
            },
            ol: {
              props: { className: "env-text" },
            },
            ul: {
              props: { className: "env-text" },
            },
            a: {
              props: { target: "_blank", className: "env-link env-text" },
            },
          },
        }}
      >
        {message}
      </MarkdownToJSX>
    </div>
  );
};

Markdown.propTypes = {
  message: PropTypes.string,
};

export default Markdown;
