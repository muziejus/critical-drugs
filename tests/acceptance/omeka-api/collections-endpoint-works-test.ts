import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "critical-drugs";
import config from "critical-drugs/config/environment";
import isIsoDate from "critical-drugs/tests/helpers/is-iso-date";
import isOmekaUrl from "critical-drugs/tests/helpers/is-omeka-url";
import {
  belongsTo,
  hasSummaryOfMany,
  hasManyElementTexts,
} from "critical-drugs/tests/helpers/omeka-relationships";

module("Acceptance | omeka api/collections endpoint works", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/`;

  test("api/collections/:id returns a Collection", async function (this: MirageTestContext, assert) {
    this.server.loadFixtures();
    const id = Math.floor(Math.random() * 100);
    const date = new Date();

    const owner = this.server.create("user", {
      id,
      username: "username",
      name: "user's name",
      email: "user@email.com",
      role: "super",
    });

    const collection = this.server.create("collection", {
      id,
      public: true,
      featured: false,
      added: date,
      modified: date,
      owner,
    });

    this.server.createList("item", 20, { collection });

    this.server.create("elementText", {
      html: true,
      text: "This is <i>the element</i> text.",
      record: collection,
      element: this.server.schema.elements.find(1),
    });

    this.server.create("elementText", {
      html: false,
      text: "Contributor McContributor",
      record: collection,
      element: this.server.schema.elements.find(37),
    });

    const apiResponse = await fetch(`${fetchUrl}collections/${id}`);
    const data = await apiResponse.json();

    assert.strictEqual(typeof data.id, "number", "ID is a number.");
    assert.true(
      isOmekaUrl(data.url, "collections", data.id),
      "URL is an Omeka URL."
    );
    assert.true(isIsoDate(data.added), "Date Added is an ISO 8601 string.");
    assert.true(
      isIsoDate(data.modified),
      "Date Modified is an ISO 8601 string"
    );
    assert.strictEqual(typeof data.public, "boolean", "Public is a boolean.");
    assert.strictEqual(
      typeof data.featured,
      "boolean",
      "Featured is a boolean."
    );
    assert.true(
      belongsTo(data.owner, "users"),
      "Collection belongs to a User (owner)."
    );
    assert.true(
      hasSummaryOfMany(data.items, "items", "collection", data.id),
      "Collection has a summary of many Items."
    );
    assert.true(
      hasManyElementTexts(data.element_texts),
      "Collection has many ElementTexts."
    );
  });
});
