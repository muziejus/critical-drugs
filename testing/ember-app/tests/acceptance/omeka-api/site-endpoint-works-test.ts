import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "ember-app";
import config from "ember-app/config/environment";

module("Acceptance | omeka api/site endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test("api/site returns a Site object", async function (this: MirageTestContext, assert) {
    const apiResponse = await fetch(fetchUrl + "site");
    const data = await apiResponse.json();
    const site = {
      omeka_url: "https://ember-app-omeka-site.com",
      omeka_version: "2.7",
      title: "Emb-Line Omeka Backend",
      description: "Lorem ipsum dolo sit amet",
      author: "The Emb-Line Team",
      copyright: "Creative Commons Attribution-ShareAlike 3.0 License",
    };

    assert.deepEqual(site, data);
  });
});
