import { Model, hasMany, belongsTo } from "miragejs";

export default Model.extend({
  // public
  // featured
  // added
  // modified
  owner: belongsTo("user"),
  items: hasMany(),
  elementTexts: hasMany(),
});
