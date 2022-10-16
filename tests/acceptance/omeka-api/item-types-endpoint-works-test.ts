import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/item types endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/item-types-endpoint-works", async function (assert) {
    await visit("/omeka-api/item-types-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/item-types-endpoint-works");
  });
});
