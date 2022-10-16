import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/files endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/files-endpoint-works", async function (assert) {
    await visit("/omeka-api/files-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/files-endpoint-works");
  });
});
