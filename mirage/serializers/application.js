import { RestSerializer } from "miragejs";
import { underscore } from "@ember/string";

export default class ApplicationSerializer extends RestSerializer {
  resourceUrl(path) {
    path = path.replace(/^\//, "");
    return `https://emb-line-omeka-site.com/api/${path}`;
  }
  root = false;
  embed = true;
  keyForEmbeddedRelationship(modelName) {
    return underscore(modelName);
  }
}
