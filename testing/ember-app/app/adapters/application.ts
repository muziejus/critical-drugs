import RESTAdapter from "@ember-data/adapter/rest";
import type Store from "@ember-data/store";
import { Snapshot } from "@ember-data/store";
import { underscore } from "@ember/string";
import config from "ember-app/config/environment";
import Inflector from 'ember-inflector';

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

  addRelatedModel(relatedModel: string, [relationshipDefinition: RelationshipDefinition], item) {
    if (relationshipDefinition.meta.kind === "belongsTo" && item[relatedModel]) {
      return {
        data: {
          type: relationshipDefinition.meta.name,
          id: item[relatedModel].id
        }
      }
    }

    return {}
  }

  async findRecord(store: Store, schema: ModelSchema, queryId: string, snapshot: Snapshot) {
    const payload = await super.findRecord(store, schema, queryId, snapshot);
    console.log(payload);
    const { id, ...attributes } = payload;
    const out = {
      data: {
        id,
        type: schema.modelName,
        attributes
      }
    }
    console.log(out);
    return out;
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
    const out = {
      data: payload.map(item => {
        const { id, ...attributes } = item;
        const relationships = {};
        for (const [relatedModel, i] of schema.relationships) {
          relationships[relatedModel] = this.addRelatedModel(relatedModel, i, item)
        }
        return {
          id,
          type: schema.modelName,
          attributes,
          relationships,
        };
      }),
    };
    console.log("out", out);
    return out;
  }
}
