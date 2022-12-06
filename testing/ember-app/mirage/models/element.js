import { Model, belongsTo } from "miragejs";

export default Model.extend({
  elementSet: belongsTo(),
  // element_set_id
  // order
  // name
  // description
  // comment
});
