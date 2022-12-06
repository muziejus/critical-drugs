import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default Factory.extend({
  stored: true,
  added() {
    return faker.date.recent(5, this.modified);
  },
  modified() {
    return faker.date.past(5);
  },
  has_derivative_images() {
    return Math.random() > 0.5;
  },
  file_urls() {
    if (this.has_derivative_images) {
      return {
        original: faker.internet.url(),
        fullsize: faker.internet.url(),
        thumbnail: faker.internet.url(),
      };
    }
  },
  order: null,
  size() {
    return Math.floor(Math.random() * 1000000);
  },
  authentication: "somepasswordlookingstring",
  mime_type: "image/jpeg",
  original_filename() {
    return faker.system.commonFileName("jpg");
  },
  filename() {
    return faker.system.commonFileName("jpg");
  },
  metadata: {},
});
