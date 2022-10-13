import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default Factory.extend({
  html() {
    return Math.random() > 0.5;
  },

  text() {
    if (this.html) {
      return `<i>HTML ${faker.lorem.sentence()}</i>`;
    }

    return faker.lorem.sentence();
  },
});
