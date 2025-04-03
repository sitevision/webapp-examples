import * as React from "react";
import App from "./components/App";
import { hydrateRoot } from "react-dom/client";

export default (initialState, el) => {
  hydrateRoot(el, <App state={initialState.state} />);
};
