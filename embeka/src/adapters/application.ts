import RESTAdapter from "@ember-data/adapter/rest";
import type Store from "@ember-data/store";
import { Snapshot } from "@ember-data/store";
import ModelRegistry from "ember-data/types/registries/model";

declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    application: EmbekaApplicationAdapter;
  }
}

export default class EmbekaApplicationAdapter extends RESTAdapter {
  host = "";
  namespace = "";

  pathForType(modelName: string) {
    const inflect: Record<string, string> = {
      "element-set": "element_sets",
    };
    return inflect[modelName] ?? super.pathForType(modelName as never);
  }

  addRelatedModel(
    relatedModel: string,
    [relationshipDefinition]: [RelationshipDefinition],
    item
  ) {
    if (
      relationshipDefinition.meta.kind === "belongsTo" &&
      item[relatedModel]
    ) {
      return {
        data: {
          type: relationshipDefinition.meta.name,
          id: item[relatedModel].id,
        },
      };
    }

    return {};
  }

  async findRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelRegistry[K],
    queryId: string,
    snapshot: Snapshot<K>
  ) {
    console.log("type", type);
    const payload = await super.findRecord(store, type, queryId, snapshot);
    console.log(payload);
    const { id, ...attributes } = payload;
    const out = {
      data: {
        id,
        type: type,
        attributes,
      },
    };
    console.log(out);
    return out;
  }

  async findAll<K extends keyof ModelRegistry>(
    store: Store,
    schema: ModelRegistry[K],
    sinceToken: string,
    snapshotRecordArray: SnapshotRecordArray<K>
  ) {
    console.log("findAll schema", schema);
    // ): Promise<AdapterPayload> {
    const payload = await super.findAll(
      store,
      schema,
      sinceToken,
      snapshotRecordArray
    );
    console.log("payloadd", payload);
    const out = {
      data: payload.map((item) => {
        const { id, ...attributes } = item;
        const relationships = {};
        for (const [relatedModel, i] of schema.relationships) {
          relationships[relatedModel] = this.addRelatedModel(
            relatedModel,
            i,
            item
          );
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
