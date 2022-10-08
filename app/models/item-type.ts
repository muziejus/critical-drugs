import Model, { attr, hasMany, AsyncHasMany } from "@ember-data/model";
import Item from "emb-line/models/item";

export default class ItemTypeModel extends Model {
  @attr declare name?: string;
  @attr declare description?: string;

  // @hasMany("item") declare items: AsyncHasMany<Item>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "item-type": ItemTypeModel;
  }
}
