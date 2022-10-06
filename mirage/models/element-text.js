import { Model, belongsTo } from "miragejs";

export default Model.extend({
  element: belongsTo(),
  record: belongsTo({ polymorphic: true }),
  // html
  // text
});
