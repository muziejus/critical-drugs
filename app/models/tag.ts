import Model, { attr, hasMany, AsyncHasMany } from "@ember-data/model";
import Collection from "critical-drugs/models/collection";
import Item from "critical-drugs/models/item";

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
