import Model, { attr, belongsTo } from "@ember-data/model";
import ElementSetModel from "./element-set";

export default class ElementModel extends Model {
  @attr declare order?: number;
  @attr declare name?: string;
  @attr declare description?: string;
  @attr declare comment?: string;

  @belongsTo("elementSet", { async: false })
  declare elementSet: ElementSetModel;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    element: ElementModel;
  }
}
