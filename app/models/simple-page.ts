import Model, { attr, belongsTo } from "@ember-data/model";
import User from "emb-line/models/user";

export default class SimplePageModel extends Model {
  @attr declare isPublished: boolean;
  @attr declare title: string;
  @attr declare slug: string;
  @attr declare text: string;
  @attr declare order?: number;
  @attr declare template?: string;
  @attr declare use_tiny_mce: boolean;
  @attr declare updated: string;
  @attr declare inserted: string;
  @attr declare parent?: string;

  @belongsTo("user", { async: true }) declare modifiedByUser: User;
  @belongsTo("user", { async: true }) declare createdByUser: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "simple-page": SimplePageModel;
  }
}
