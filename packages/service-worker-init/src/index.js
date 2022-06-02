import router from "@sitevision/api/common/router";
import appResource from "@sitevision/api/server/appResource";

router.get("/", (req, res) => {
  res.agnosticRender("");
});

router.get("/service-worker.js", (req, res) => {
  const workerFile = appResource.getNode("worker.js");
  res
    .set("Service-Worker-Allowed", "/")
    .type("text/javascript")
    .sendFile(workerFile);
});
