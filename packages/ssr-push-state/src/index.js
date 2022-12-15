import router from "@sitevision/api/common/router";
import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/App";

router.get("/", (req, res) => {
  res.agnosticRender(renderToString(<App state={req.path} />), {
    state: req.path,
  });
});

router.get("/:dynamicPath", (req, res) => {
  const state = req.path;
  if (req.xhr) {
    // return state as JSON if desired
  }

  res.agnosticRender(renderToString(<App state={state} />), {
    state,
  });
});
