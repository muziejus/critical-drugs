import Model, { attr, hasMany, AsyncHasMany } from "@ember-data/model";
import ElementModel from "./element";

export default class ElementSetModel extends Model {
  @attr declare name?: string;
  @attr declare description?: string;
  @attr declare recordType?: string;
  @hasMany("element") declare elements: AsyncHasMany<ElementModel>;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "element-set": ElementSetModel;
  }
}
