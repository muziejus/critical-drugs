import ApplicationSerializer from "./application";

export default class CollectionSerializer extends ApplicationSerializer {
  include = ["elementTexts", "owner", "items"];
}
