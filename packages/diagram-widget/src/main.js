import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

const main = (initialState, el) => {
  createRoot(el).render(<App contentTypes={initialState.contentTypes} />);
};

export default main;
