import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default Factory.extend({
  featured() {
    return Math.random() > 0.5;
  },
  public: true,
  added() {
    return faker.date.recent(5, this.modified);
  },
  modified() {
    return faker.date.past(5);
  },
});
