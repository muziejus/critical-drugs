import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "emb-line";
import config from "emb-line/config/environment";

module("Acceptance | omeka api/collections endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test.skip("api/collections/:id returns a Collection", async function (this: MirageTestContext, assert) {
    assert.ok(fetchUrl);
  });
});
