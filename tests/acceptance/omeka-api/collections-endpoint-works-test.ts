import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/collections endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/collections-endpoint-works", async function (assert) {
    await visit("/omeka-api/collections-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/collections-endpoint-works");
  });
});
