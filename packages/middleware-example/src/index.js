import router from "@sitevision/api/common/router";
import properties from "@sitevision/api/server/Properties";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
import appData from "@sitevision/api/server/appData";
import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/App";
import systemUserUtil from "@sitevision/api/server/SystemUserUtil";

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {
    if (req.xhr) {
      return res.status(401);
    }

    return res.send("Please log in to view images");
  }

  next();
});

router.use((req, res, next) => {
  const image = resourceLocatorUtil.getNodeByIdentifier(req.params.image);

  req.data = { URI: properties.get(image, "URI") };

  next();
});

router.get("/", (req, res) => {
  const URI = req.data.URI;

  const images = appData.getArray("images");
  const imageIds = images ? images.map((image) => image.getIdentifier()) : [];

  const html = <App images={imageIds} URI={URI} />;
  res.agnosticRender(renderToString(html), {
    images: imageIds,
    URI,
  });
});

router.get("/image", (req, res) => {
  res.json({ URI: req.data.URI });
});
