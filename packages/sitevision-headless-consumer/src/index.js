import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import requester from "@sitevision/api/server/Requester";
import endecUtil from "@sitevision/api/server/EndecUtil";
import versionUtil, {
  OFFLINE_VERSION,
} from "@sitevision/api/server/VersionUtil";
import UrlParse from "url-parse";
import i18n from "@sitevision/api/common/i18n";

router.get("/", (req, res) => {
  const url = appData.get("url");

  if (!url) {
    res.send(i18n.get("invalidConfiguration"));
    return;
  }

  const parsedUrl = new UrlParse(url);

  requester
    .get(url, {
      data: {
        textPortletFormat: "JSON",
      },
    })
    .done((response) => {
      res.send(
        renderToStaticMarkup(
          <App
            baseUrl={parsedUrl.origin}
            contentNodes={response.contentNodes}
          />
        )
      );
    })
    .fail((error) => {
      if (versionUtil.getCurrentVersion() === OFFLINE_VERSION) {
        res.send(/* html */ `
          <p>${i18n.get("httpErrorMessage")}</p>
          <pre>${endecUtil.escapeXML(error)}</pre>`);
      } else {
        console.error("Could not get headless content from ", url, error);
      }
    });
});
