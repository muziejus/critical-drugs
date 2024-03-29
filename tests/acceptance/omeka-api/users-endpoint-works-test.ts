import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "critical-drugs";
import config from "critical-drugs/config/environment";

module("Acceptance | omeka api/users endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test.skip("api/users/:id returns a User", async function (this: MirageTestContext, assert) {
    assert.ok(fetchUrl);
  });
});
