import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import utils from "@sitevision/api/server/Utils";

router.get("/", (req, res) => {
  const image = appData.getNode("image");

  if (!image) {
    res.send("No image selected");
  }

  const imageRenderer = utils.getImageRenderer();
  const imageScaler = utils.getImageScaler(600, 400);
  imageRenderer.update(image);
  imageRenderer.setImageScaler(imageScaler);

  res.send(imageRenderer.render());
});
