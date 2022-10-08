import JSONAPISerializer from "@ember-data/serializer/json-api";

declare module "ember-data/types/registries/serializer" {
  export default interface SerializerRegistry {
    application: Application;
  }
}

export default class Application extends JSONAPISerializer {}
