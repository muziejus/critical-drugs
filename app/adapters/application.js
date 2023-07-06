import RESTAdapter from "@ember-data/adapter/rest";
// import type Store from "@ember-data/store";
// import type { ModelSchema } from "@ember-data/types/q/ds-model";
// import { Snapshot } from "@ember-data/store";
import config from "emb-line/config/environment";

// declare module "ember-data/types/registries/adapter" {
//   export default interface AdapterRegistry {
//     application: ApplicationAdapter;
//   }
// }

export default class ApplicationAdapter extends RESTAdapter {
  host = config.omekaApi.host;
  namespace = config.omekaApi.namespace;

  pathForType(modelName) {
    // pathForType(modelName: string): string {
    const inflect = {
      "element-set": "element_sets",
      "neatline-record": "neatline_records",
      "neatline-exhibit": "neatline_exhibits",
      "item-type": "item_types",
    };
    return inflect[modelName] ?? super.pathForType(modelName);
  }

  addRelatedModel(relatedModel, [relationshipDefinition], item) {
    // addRelatedModel(relatedModel: string, [relationshipDefinition: RelationshipDefinition], item) {
    // Because this is still working on payload, it has the names with
    // underscores.
    relatedModel = relatedModel.replace(/-/g, "_");
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

  async query(store, type, query, recordArray, adapterOptions) {
    const payload = await super.query(
      store,
      type,
      query,
      recordArray,
      adapterOptions
    );
    return this.normalizePayload(payload, type);
  }

  // Let's not futz w/ this one for now.
  async findRecord(store, schema, queryId, snapshot) {
    // async findRecord(store: Store, schema: ModelSchema, queryId: string, snapshot: Snapshot) {
    const payload = await super.findRecord(store, schema, queryId, snapshot);
    const { id, ...attributes } = payload;
    if (attributes.element_texts) {
      attributes.element_texts = this.formatElementTexts(
        attributes.element_texts
      );
    }
    const out = {
      data: {
        id,
        type: schema.modelName,
        attributes,
      },
    };
    return out;
  }

  normalizePayload(payload, schema) {
    return {
      data: payload.map(item => this.normalizeRecord(item, schema)),
    };
  }

  normalizeRecord(item, schema) {
    const { id, ...attributes } = item;
    if (attributes.element_texts) {
      attributes.element_texts = this.formatElementTexts(
        attributes.element_texts
      );
    }
    const relationships = {};
    for (const [relatedModel, i] of schema.relationships) {
      relationships[relatedModel] = this.addRelatedModel(relatedModel, i, item);
    }

    return {
      id,
      type: schema.modelName,
      attributes,
      relationships,
    };
  }

  async findAll(
    store, //: Store,
    schema, //: ModelSchema,
    sinceToken, //: string,
    snapshotRecordArray //: SnapshotRecordArray
  ) {
    // ): Promise<AdapterPayload> {
    const payload = await super.findAll(
      store,
      schema,
      sinceToken,
      snapshotRecordArray
    );
    return this.normalizePayload(payload, schema);
  }

  formatElementTexts(elementTexts) {
    // private formatElementTexts(elementTexts: ElementTextResponse[]) {
    const record = {};
    // const record: Record<string, string> = {};
    elementTexts.map(elementText => {
      const key =
        elementText.element_set.id === 1
          ? `DC${elementText.element.name.toLowerCase()}`
          : elementText.element.name.toLowerCase();
      record[key] = elementText.text;
    });

    return record;
  }
}
