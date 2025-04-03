import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./components/App";

export default (initialState, el) => {
  hydrateRoot(el, <App {...initialState} />);
};
