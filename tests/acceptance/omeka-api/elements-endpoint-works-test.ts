import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/elements endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/elements-endpoint-works", async function (assert) {
    await visit("/omeka-api/elements-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/elements-endpoint-works");
  });
});
