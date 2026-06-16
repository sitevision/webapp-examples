import type { FetchType } from "../constants";

export function normalizeType(
  type: string | string[] | undefined
): FetchType | null {
  const rawType = Array.isArray(type) ? type[0] : type;
  const normalizedType = rawType ? rawType.trim().toLowerCase() : null;

  if (normalizedType === "releasenotes") {
    return "releaseNotes";
  }

  if (normalizedType === "news" || normalizedType === "any") {
    return normalizedType;
  }

  return null;
}

export function normalizeCount(
  count: number | string | string[] | undefined
): number | null {
  const rawCount = Array.isArray(count) ? count[0] : count;

  if (rawCount === undefined || rawCount === "") {
    return null;
  }

  const normalizedCount =
    typeof rawCount === "number" ? rawCount : Number(rawCount.trim());

  if (
    !Number.isInteger(normalizedCount) ||
    normalizedCount < 1 ||
    normalizedCount > 10
  ) {
    return null;
  }

  return normalizedCount;
}

export function normalizeLatest(
  latest: boolean | string | string[] | undefined
): boolean | null {
  const rawLatest = Array.isArray(latest) ? latest[0] : latest;

  if (rawLatest === undefined || rawLatest === "") {
    return false;
  }

  if (typeof rawLatest === "boolean") {
    return rawLatest;
  }

  const normalizedLatest = rawLatest.trim().toLowerCase();

  if (normalizedLatest === "true") {
    return true;
  }

  if (normalizedLatest === "false") {
    return false;
  }

  return null;
}

export function normalizeQuery(query: string | string[] | undefined): string | undefined {
  const rawQuery = Array.isArray(query) ? query[0] : query;

  if (!rawQuery) {
    return undefined;
  }

  const normalizedQuery = rawQuery.trim();

  return normalizedQuery || undefined;
}
