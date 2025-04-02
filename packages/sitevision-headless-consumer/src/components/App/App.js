import * as React from "react";
import PropTypes from "prop-types";
import { HeadlessContentRenderer } from "@sitevision/headless-content-renderer";

const App = ({ baseUrl, contentNodes }) => {
  return (
    <HeadlessContentRenderer contentNodes={contentNodes} baseUrl={baseUrl} />
  );
};

App.propTypes = {
  url: PropTypes.string,
  contentNodes: PropTypes.array,
};

export default App;
