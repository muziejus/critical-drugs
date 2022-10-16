import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | omeka api/element sets endpoint works", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /omeka-api/element-sets-endpoint-works", async function (assert) {
    await visit("/omeka-api/element-sets-endpoint-works");

    assert.equal(currentURL(), "/omeka-api/element-sets-endpoint-works");
  });
});
