import Model, {
  attr,
  belongsTo,
  hasMany,
  AsyncHasMany,
} from "@ember-data/model";
import Exhibit from "emb-line/models/exhibit";

export default class ExhibitPage extends Model {
  @attr declare title?: string;
  @attr declare slug?: string;
  @attr declare order?: number;
  @attr declare parent?: number;
  @attr declare pageBlocks?: PageBlock[];

  @belongsTo("exhibit", { async: true }) declare exhibit: Exhibit;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "exhibit-page": ExhibitPage;
  }
}
