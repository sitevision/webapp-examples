import router from "@sitevision/api/common/router";
import {
  normalizeCount,
  normalizeLatest,
  normalizeQuery,
  normalizeType,
} from "./utils/normalize";
import { search } from "./utils/search";
import { FETCH_TYPES } from "./constants";

const formatParam = (
  param: boolean | number | string | string[] | undefined
): string => (Array.isArray(param) ? param.join(", ") : String(param));

router.get("/fetch", (req, res) => {
  const type = normalizeType(req.params.type);

  if (!type) {
    res.status(400).json({
      error: `Invalid type "${formatParam(
        req.params.type
      )}". Allowed values: ${FETCH_TYPES.join(", ")}.`,
    });
    return;
  }

  const count = normalizeCount(req.params.count);

  if (!count) {
    res.status(400).json({
      error: `Invalid count "${formatParam(
        req.params.count
      )}". Count must be a number between 1 and 10.`,
    });
    return;
  }

  const latest = normalizeLatest(req.params.latest);

  if (latest === null) {
    res.status(400).json({
      error: `Invalid latest "${formatParam(
        req.params.latest
      )}". Latest must be true or false.`,
    });
    return;
  }

  const query = latest ? undefined : normalizeQuery(req.params.query); // Query irrelevant if we simply fetch the most recent items
  const result = search({ type, count, latest, query });

  res.json(result);
});
