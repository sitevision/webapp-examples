import appData from "@sitevision/api/server/appData";

export function getLinks() {
  const links = [];
  let index = 0;
  while (index >= 0) {
    const text = appData.get(`text-${index}`);
    const image = appData.get(`image-${index}`, "URI");
    const link = appData.get(`link-${index}`, "URI");

    if (!text || !image || !link) {
      break;
    }

    links.push({ text, image, link });

    index++;
  }

  return links;
}
