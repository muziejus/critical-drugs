import ApplicationSerializer from "./application";

export default class ItemSerializer extends ApplicationSerializer {
  include = [
    "itemType",
    "elementTexts",
    "collection",
    "tags",
    "files",
    "owner",
  ];
}
