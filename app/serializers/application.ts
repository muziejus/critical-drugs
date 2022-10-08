import RESTSerializer from "@ember-data/serializer/rest";

export default class Application extends RESTSerializer {}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module "ember-data/types/registries/serializer" {
  export default interface SerializerRegistry {
    application: Application;
  }
}
