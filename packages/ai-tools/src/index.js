import router from "@sitevision/api/common/router";
import systemuserUtil from "@sitevision/api/server/SystemUserUtil";

import { generateAnswer } from "./utils/generateAnswer";
import privileged from "@sitevision/api/server/privileged";
import versionUtil from "@sitevision/api/server/VersionUtil";
import appData from "@sitevision/api/server/appData";

router.get("/", (req, res) => {
  if (systemuserUtil.isAnonymous()) {
    return;
  }

  if (!privileged.isConfigured() && appData.get("notifyBy") !== "mail") {
    if (versionUtil.getCurrentVersion() === versionUtil.OFFLINE_VERSION) {
      return res.send(
        '<p class="env-text env-text--error">Configure a service user</p>'
      );
    }

    return;
  }

  res.agnosticRender("", {});
});

router.post("/ask", (req, res) => {
  const { input, conversationIdentifier } = req.params;

  if (!input || input.length > 1000) {
    return res.status(400);
  }

  generateAnswer({ res, input, conversationIdentifier });
});
