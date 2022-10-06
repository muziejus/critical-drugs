import { Model, belongsTo } from "miragejs";

export default Model.extend({
  itemType: belongsTo(),
  collection: belongsTo(),
  // featured:
  // public:
  // modified:
  // added:
  owner: belongsTo("user"),
});
