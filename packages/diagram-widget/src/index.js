import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import searchUtil from "@sitevision/api/server/SearchUtil";
import searchFactory from "@sitevision/api/server/SearchFactory";

function getRecentlyCreatedObjectsType(numberOfObjects) {
  const result = searchUtil.search(
    "*",
    [searchFactory.getSearchSortField("created", false)],
    0,
    numberOfObjects
  );

  if (!result.hasHits()) {
    return {};
  }

  const objects = [];
  const hits = result.getHits();
  while (hits.hasNext()) {
    const hit = hits.next();
    objects.push({
      svtype: hit.getField("svtype"),
    });
  }

  const typeToCount = objects.reduce((acc, object) => {
    acc[object.svtype] = (acc[object.svtype] || 0) + 1;
    return acc;
  }, {});

  return typeToCount;
}

router.get("/", (req, res) => {
  const noOfObjects = appData.getNumber("noOfObjects");
  res.agnosticRender("", {
    contentTypes: getRecentlyCreatedObjectsType(noOfObjects),
  });
});
