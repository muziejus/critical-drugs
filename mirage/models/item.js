import { Model, hasMany, belongsTo } from "miragejs";

export default Model.extend({
  itemType: belongsTo(),
  collection: belongsTo(),
  owner: belongsTo("user"),
  tags: hasMany(),
  elementTexts: hasMany(),
  files: hasMany(),
});
