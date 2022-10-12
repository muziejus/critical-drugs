import Model, { attr, hasMany, AsyncHasMany } from "@ember-data/model";
import Collection from "emb-line/models/collection";
import Item from "emb-line/models/item";

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    tag: TagModel;
  }
}

export default class TagModel extends Model {
  @attr declare name?: string;

  @hasMany("record", { polymorphic: true }) declare records: AsyncHasMany<
    Item | Collection
  >;
}
