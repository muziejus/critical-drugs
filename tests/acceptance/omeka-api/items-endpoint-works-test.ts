import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "emb-line";
import config from "emb-line/config/environment";

module("Acceptance | omeka api/items endpoint works", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test("api/items/:id returns an Item", async function(this: MirageTestContext, assert) {
    const id = Math.floor(Math.random() * 100);
    const date = new Date();

    const itemType = this.server.create("itemType", {
      id,
      name: "item type name",
      description: "item type description",
    });

    const owner = this.server.create("user", {
      id,
      username: "username",
      name: "user's name",
      email: "user@email.com",
      role: "super",
    });

    const item = this.server.create("item", {
      id,
      public: true,
      featured: false,
      added: date,
      modified: date,
      itemType,
      owner,
    });

    console.log(item);
    const apiResponse = await fetch(`${fetchUrl}items/${id}`);
    const data = await apiResponse.json();

    console.log(data);

    assert.strictEqual(id, data.id);
  });

  test.skip("api/items returns an array of Items.", async function(this: MirageTestContext, assert) { });
});
