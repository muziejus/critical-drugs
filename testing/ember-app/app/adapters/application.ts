import EmbekaApplicationAdapter from "embeka";
import config from "embeka/config/environment";

export default class ApplicationAdapter extends EmbekaApplicationAdapter {
  host = config.omekaApi.host;
  namespace = config.omekaApi.namespace;
}

declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    application: ApplicationAdapter;
  }
}
