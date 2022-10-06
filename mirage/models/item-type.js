import { Model, hasMany } from "miragejs";

export default Model.extend({
  items: hasMany(),
  // name
  // description
});
