import Model, {
  attr,
  belongsTo,
  hasMany,
  AsyncHasMany,
} from "@ember-data/model";
import User from "critical-drugs/models/user";
import ExhibitPage from "critical-drugs/models/exhibit-page";

export default class Exhibit extends Model {
  @attr declare title?: string;
  @attr declare slug?: string;
  @attr declare description?: string;
  @attr declare credits?: string;
  @attr declare featured?: boolean;
  @attr declare public?: boolean;
  @attr declare added: string;
  @attr declare modified: string;

  @belongsTo("user", { async: true }) declare owner: User;
  @hasMany("exhibit-page", { async: true })
  declare exhibitPages: AsyncHasMany<ExhibitPage>;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    exhibit: Exhibit;
  }
}
