import Model, { attr } from "@ember-data/model";

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    collection: CollectionModel;
  }
}

export default class CollectionModel extends Model {
  @attr declare featured?: boolean;
  @attr declare public?: boolean;
  @attr declare added: string;
  @attr declare modified: string;
}
