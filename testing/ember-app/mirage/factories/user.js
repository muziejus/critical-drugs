import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default Factory.extend({
  username() {
    return faker.internet.userName();
  },
  name() {
    return faker.name.fullName();
  },
  email() {
    return faker.internet.email();
  },
  active() {
    return Math.random() < 0.5;
  },
  role() {
    return "super";
  },
});
