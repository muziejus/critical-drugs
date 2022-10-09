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

  buildPayload(primaryResource, ...args) {
    const payload = super.buildPayload(primaryResource, ...args);
    return payload.map(item => {
      item.url = this.resourceUrl(`items/${item.id}`);
      const collection = {
        id: item.collection.id,
        url: this.resourceUrl(`collections/${item.collection.id}`),
        resource: "collections",
      };
      item.collection = collection;
      return item;
    });
  }
}
