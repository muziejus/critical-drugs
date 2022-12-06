import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default Factory.extend({
  name() {
    return faker.word.noun();
  },

  description() {
    return faker.lorem.sentence();
  },
});
