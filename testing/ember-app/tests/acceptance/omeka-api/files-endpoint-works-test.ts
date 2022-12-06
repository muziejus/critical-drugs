import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "ember-app";
import config from "ember-app/config/environment";

module("Acceptance | omeka api/files endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test.skip("api/files/:id returns a File", async function (this: MirageTestContext, assert) {
    assert.ok(fetchUrl);
  });
});
