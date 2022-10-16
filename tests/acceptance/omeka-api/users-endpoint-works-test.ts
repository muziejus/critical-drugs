import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/users endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/users-endpoint-works", async function (assert) {
    await visit("/omeka-api/users-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/users-endpoint-works");
  });
});
