import RESTAdapter from "@ember-data/adapter/rest";

export default class Application extends RESTAdapter {
  host = "https://emb-line-omeka-site.com";
  namespace = "api";
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    application: Application;
  }
}
