import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "critical-drugs";
import config from "critical-drugs/config/environment";

module("Acceptance | omeka api/tags endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test.skip("api/tags/:id returns a Tag", async function (this: MirageTestContext, assert) {
    assert.ok(fetchUrl);
  });
});
