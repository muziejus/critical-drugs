import RESTAdapter from "@ember-data/adapter/rest";
import type Store from "@ember-data/store";
import { underscore } from "@ember/string";
import config from "emb-line/config/environment";

declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    application: ApplicationAdapter;
  }
}

export default class ApplicationAdapter extends RESTAdapter {
  host = config.omekaApi.host;
  namespace = config.omekaApi.namespace;

  pathForType(modelName) {
    const inflect = {
      "element-set": "element_sets",
    };
    return inflect[modelName] ?? super.pathForType(modelName);
  }

  async findAll(
    store: Store,
    schema: ModelSchema,
    sinceToken: string,
    snapshotRecordArray: SnapshotRecordArray
  ): Promise<AdapterPayload> {
    const payload = await super.findAll(
      store,
      schema,
      sinceToken,
      snapshotRecordArray
    );
    console.log("payloadd", payload);
    for (const [relatedModel, i] of schema.relationships) {
      console.log(relatedModel, i);
    }
    const out = {
      data: payload.map(item => {
        const { id, ...attributes } = item;
        const relationships = {};
        // // Crashing on bad keys elementTexts. Build out mirage better.
        // for (const [relatedModel, models] of schema.relationships) {
        //   for (const model of models) {
        //     relationships[model.meta.key] = "barf";
        //   }
        // }
        return {
          id,
          type: schema.modelName,
          attributes,
          relationships,
        };
      }),
    };
    console.log("out", out.data[0]);
    return out;
  }
}
