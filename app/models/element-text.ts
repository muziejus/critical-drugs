import Model, { attr, belongsTo } from "@ember-data/model";
import Element from "critical-drugs/models/element";
import Item from "critical-drugs/models/item";
import Collection from "critical-drugs/models/collection";

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "element-text": ElementTextModel;
  }
}

export default class ElementTextModel extends Model {
  @attr declare html?: boolean;
  @attr declare text?: string;

  @belongsTo("element", { async: false }) declare element: Element;
  @belongsTo("record", { polymorphic: true, async: false }) declare record:
    | Item
    | Collection;
}
