import { RestSerializer } from "miragejs";
import { underscore } from "@ember/string";

export default class ApplicationSerializer extends RestSerializer {
  embeddedRecord(id, key) {
    return {
      id,
      url: this.resourceUrl(key),
      resource: key,
    };
  }

  resourceUrl(path) {
    path = path.replace(/^\//, "");
    return `https://emb-line-omeka-site.com/api/${path}`;
  }

  root = false;
  embed = true;

  keyForAttribute(attr) {
    return underscore(attr);
  }

  keyForEmbeddedRelationship(modelName) {
    return underscore(modelName);
  }

  buildRelationship(record, foreignKey, modelName) {
    if (/Ids$/.test(foreignKey)) {
      const collectionKey = this._container.inflector.pluralize(
        underscore(foreignKey.replace(/Ids$/, ""))
      );
      if (record[collectionKey]) {
        const collection = record[collectionKey];
        if (/^(tags)$/.test(collectionKey)) {
          record[collectionKey] = collection.map(oneOfMany => {
            return {
              id: oneOfMany.id,
              url: this.resourceUrl(`${collectionKey}/${oneOfMany.id}`),
              resource: collectionKey,
              name: oneOfMany.name,
            };
          });
        }

        if (/^(elements)$/.test(collectionKey)) {
          console.log("in elements");
          record[collectionKey] = {
            count: collection.length,
            url: this.resourceUrl(`${collectionKey}?${modelName}=${record.id}`),
            resource: collectionKey,
          };
        }
      }

      return record;
    }

    if (/Id$/.test(foreignKey)) {
      const belongsToKey = underscore(foreignKey.replace(/Id$/, ""));
      if (record[belongsToKey]) {
        const belongsTo = record[belongsToKey];
        const belongsToKeyPlural =
          this._container.inflector.pluralize(belongsToKey);
        record[belongsToKey] = {
          id: belongsTo.id,
          url: this.resourceUrl(`${belongsToKeyPlural}/${belongsTo.id}`),
          resource: belongsToKeyPlural,
        };
      }

      return record;
    }

    return record;
  }

  buildPayload(primaryResource, ...args) {
    const payload = super.buildPayload(primaryResource, ...args);
    const modelName = underscore(this.primaryResource.modelName);

    console.log(modelName, payload);

    /*
    let fks = [];
    if (primaryResource?.models) {
      fks = primaryResource.models[0].fks;
    } else {
      fks = primaryResource.fks;
    }
    if (payload.length > 0) {
      console.log("payload has length");
      return payload.map(record => {
        if (fks.length > 0) {
          for (const foreignKey of fks) {
            record = this.buildRelationship(record, foreignKey, modelName);
          }
        }
        record.url = this.resourceUrl(
          `${this._container.inflector.pluralize(modelName)}/${record.id}`
        );
        return record;
      });
    }

    const record = payload;
    if (fks.length > 0) {
      for (const foreignKey of fks) {
        record = this.buildRelationship(record, foreignKey, modelName);
      }
    }
    record.url = this.resourceUrl(
      `${this._container.inflector.pluralize(modelName)}/${record.id}`
    );
    return record;
      */
  }
}
