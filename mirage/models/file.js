import { Model, belongsTo } from "miragejs";

export default Model.extend({
  item: belongsTo(),
  // order
  // size
  // has_derivative_image
  // authentification
  // mime_type
  // type_os
  // filename
  // original_filename
  // modified
  // added
  // stored
  // metadata // json
});
