import RESTAdapter from "@ember-data/adapter/rest";
import type Store from "@ember-data/store";
import { Snapshot } from "@ember-data/store";
import ModelRegistry from "ember-data/types/registries/model";
import DS from "ember-data";
// import { RelationshipDefinition } from "@ember-data/model/-private/relationship-meta";

interface RelationshipDefinition {
  meta: {
    name: string;
    kind: "belongsTo" | "hasMany";
  };
}

// interface SnapshotRecordArray extends DS.SnapshotRecordArray<string | number> { }

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
    item: Record<string, { id: string }>
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
  ): Promise<any> {
    console.log("type", type);
    const payload = await super.findRecord(store, type, queryId, snapshot);
    return new Promise((resolve, reject) => {
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
      if (out) {
        resolve(out);
      } else {
        reject(out);
      }
    });
  }

  async findAll<K extends keyof ModelRegistry>(
    store: Store,
    schema: ModelRegistry[K],
    sinceToken: string,
    snapshotRecordArray: DS.SnapshotRecordArray<K>
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
      data: payload.map((item: Record<string, string>) => {
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
