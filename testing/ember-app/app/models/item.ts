import Model, {
  attr,
  belongsTo,
  hasMany,
  AsyncHasMany,
} from "@ember-data/model";
import Tag from "ember-app/models/tag";
import ElementText from "ember-app/models/element-text";
import User from "ember-app/models/user";
import Collection from "ember-app/models/collection";
import ItemType from "ember-app/models/item-type";

export default class ItemModel extends Model {
  @attr declare featured?: boolean;
  @attr declare public?: boolean;
  @attr declare added: string;
  @attr declare modified: string;

  @hasMany("tag", { inverse: "records", async: true })
  declare tags: AsyncHasMany<Tag>;
  @hasMany("elementText", { async: true, inverse: "record" })
  declare elementTexts: AsyncHasMany<ElementText>;

  @belongsTo("collection", { async: true }) declare collection: Collection;
  @belongsTo("user", { async: true }) declare owner: User;
  @belongsTo("itemType", { async: true }) declare itemType: ItemType;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    item: ItemModel;
  }
}
