import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import router from "@sitevision/api/common/router";
import App from "./components/App";
import { getLinks } from "./utils/links";
import NoLinks from "./components/NoLinks";
import versionUtil from "@sitevision/api/server/VersionUtil";

router.get("/", (req, res) => {
  const links = getLinks();

  if (links.length < 1) {
    if (versionUtil.getCurrentVersion() === versionUtil.OFFLINE_VERSION) {
      return res.send(renderToStaticMarkup(<NoLinks />));
    }

    return;
  }

  const html = renderToStaticMarkup(<App links={links} />);
  res.send(html);
});
