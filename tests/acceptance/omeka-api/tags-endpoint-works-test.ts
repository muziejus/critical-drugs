import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/tags endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/tags-endpoint-works", async function (assert) {
    await visit("/omeka-api/tags-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/tags-endpoint-works");
  });
});
