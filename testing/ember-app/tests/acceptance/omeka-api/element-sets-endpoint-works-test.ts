import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "ember-app";
import config from "ember-app/config/environment";

module("Acceptance | omeka api/element sets endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test.skip("api/element_sets/:id returns an ElementSet", async function (this: MirageTestContext, assert) {
    assert.ok(fetchUrl);
  });
});
