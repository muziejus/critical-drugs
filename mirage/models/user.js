import { hasMany, Model } from "miragejs";

export default Model.extend({
  // username
  // name
  // email
  // password
  // salt
  // active
  // role
  items: hasMany(),
});
