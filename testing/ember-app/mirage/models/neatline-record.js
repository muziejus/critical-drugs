import { Model, belongsTo } from "miragejs";

export default Model.extend({
  owner: belongsTo("user"),
  item: belongsTo("item"),
  exhibit: belongsTo("neatline-exhibit"),
});
