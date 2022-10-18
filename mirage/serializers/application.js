import { RestSerializer } from "miragejs";
import { underscore } from "@ember/string";

export default class ApplicationSerializer extends RestSerializer {
  root = false;
  embed = true;

  serialize(primaryResource, request) {
    let payload = super.serialize(primaryResource);
    const modelName = underscore(primaryResource.modelName);
    let fks = [];
    if (request.params.id) {
      // single resource
      fks = primaryResource.fks;
      payload = this.buildRelationshipsAndAddUrl(payload, fks, modelName);
    } else {
      fks = primaryResource.models[0].fks;
      payload = payload.map(record =>
        this.buildRelationshipsAndAddUrl(record, fks, modelName)
      );
    }
    return payload;
  }

  keyForAttribute(attr) {
    return underscore(attr);
  }

  keyForEmbeddedRelationship(modelName) {
    return underscore(modelName);
  }

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

  buildRelationshipsAndAddUrl(record, foreignKeys, modelName) {
    for (const foreignKey of foreignKeys) {
      if (/Ids$/.test(foreignKey)) {
        const collectionKey = this._container.inflector.pluralize(
          underscore(foreignKey.replace(/Ids$/, ""))
        );
        if (record[collectionKey]) {
          const collection = record[collectionKey];
          if (/^(tags)$/.test(collectionKey)) {
            record[collectionKey] = collection.map(oneOfMany => {
              return {
                id: parseInt(oneOfMany.id, 10),
                url: this.resourceUrl(`${collectionKey}/${oneOfMany.id}`),
                resource: collectionKey,
                name: oneOfMany.name,
              };
            });
          }

          if (/^(items|files|elements)$/.test(collectionKey)) {
            record[collectionKey] = {
              count: collection.length,
              url: this.resourceUrl(
                `${collectionKey}?${modelName}=${record.id}`
              ),
              resource: collectionKey,
            };
          }

          if (collectionKey === "element_texts") {
            record[collectionKey] = collection.map(elementText => {
              return {
                html: elementText.html,
                text: elementText.text,
                element_set: {
                  id: parseInt(elementText.element.element_set.id, 10),
                  url: this.resourceUrl(
                    `element_sets/${elementText.element.element_set.id}`
                  ),
                  name: elementText.element.element_set.name,
                  resource: "element_sets",
                },
                element: {
                  id: parseInt(elementText.element.id, 10),
                  url: this.resourceUrl(`elements/${elementText.element.id}`),
                  name: elementText.element.name,
                  resource: "elements",
                },
              };
            });
          }
        }
      }

      if (/Id$/.test(foreignKey)) {
        let belongsToKey = underscore(foreignKey.replace(/Id$/, ""));
        if (record[belongsToKey]) {
          const belongsTo = record[belongsToKey];
          let belongsToKeyPlural =
            this._container.inflector.pluralize(belongsToKey);
          if (belongsToKeyPlural === "owners") {
            belongsToKeyPlural = "users";
          }
          record[belongsToKey] = {
            id: parseInt(belongsTo.id, 10),
            url: this.resourceUrl(`${belongsToKeyPlural}/${belongsTo.id}`),
            resource: belongsToKeyPlural,
          };
        }
      }
    }

    record.url = this.resourceUrl(
      `${this._container.inflector.pluralize(modelName)}/${record.id}`
    );

    record.id = parseInt(record.id, 10);

    return record;
  }
}
