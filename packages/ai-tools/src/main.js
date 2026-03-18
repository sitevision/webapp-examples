import * as React from "react";
import { createRoot } from "react-dom";

import App from "./components/App";

export default (initialState, el) => {
  createRoot(el).render(<App {...initialState} />);
};
