import { Model, hasMany } from "miragejs";

export default Model.extend({
  // name
  records: hasMany({ polymorphic: true }),
});
