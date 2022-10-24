import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import type { MirageTestContext } from "emb-line";
import isIsoDate from "emb-line/tests/helpers/is-iso-date";
import isOmekaUrl from "emb-line/tests/helpers/is-omeka-url";
import callOmeka from "emb-line/tests/helpers/call-omeka";
import {
  belongsTo,
  hasSummaryOfMany,
  hasMany,
  hasManyElementTexts,
} from "emb-line/tests/helpers/omeka-relationships";

module("Acceptance | Omeka Endpoint api/items", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("api/items/:id returns an Item", async function (this: MirageTestContext, assert) {
    this.server.loadFixtures();
    const id = Math.floor(Math.random() * 100);
    const date = new Date();

    const itemType = this.server.create("itemType", {
      id,
      name: "item type name",
      description: "item type description",
    });

    const owner = this.server.create("user", {
      id,
      username: "username",
      name: "user's name",
      email: "user@email.com",
      role: "super",
    });

    const collection = this.server.create("collection");

    const tags = this.server.createList("tag", 4);

    const item = this.server.create("item", {
      id,
      public: true,
      featured: false,
      added: date,
      modified: date,
      itemType,
      owner,
      collection,
      tags,
    });

    this.server.create("elementText", {
      html: true,
      text: "This is <i>the element</i> text.",
      record: item,
      element: this.server.schema.elements.find(1),
    });

    this.server.create("elementText", {
      html: false,
      text: "Contributor McContributor",
      record: item,
      element: this.server.schema.elements.find(37),
    });

    this.server.createList("file", 5, {
      item,
    });

    const data = await callOmeka(`items/${id}`);

    assert.strictEqual(typeof data.id, "number", "ID is a number.");
    assert.true(isOmekaUrl(data.url, "items", data.id), "URL is an Omeka URL.");
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
      belongsTo(data.item_type, "item_types"),
      "Item belongs to a ItemType."
    );
    assert.true(
      belongsTo(data.owner, "users"),
      "Item belongs to a User (owner)."
    );
    assert.true(
      belongsTo(data.collection, "collections"),
      "Item belongs to a Collection."
    );
    assert.true(hasMany(data.tags, "tags"), "Item has many Tags.");
    assert.true(
      hasSummaryOfMany(data.files, "files", "item", data.id),
      "Item has a summary of many Files."
    );

    assert.true(
      hasManyElementTexts(data.element_texts),
      "Item has many ElementTexts."
    );
  });

  module("Acceptance | Omeka api/items returns many items", function (hooks) {
    test.skip("api/items returns an array of Items.", async function (this: MirageTestContext, assert) {});

    test("api/items?collection=:id returns all items in a collection.", async function (this: MirageTestContext, assert) {
      this.server.loadFixtures();
      const collectionOne = this.server.create("collection", { id: 34 });
      const collectionTwo = this.server.create("collection", { id: 56 });
      const count = Math.floor(Math.random() * 100);
      this.server.createList("item", count, { collection: collectionOne });
      this.server.createList("item", 100 - count, {
        collection: collectionTwo,
      });

      const allItems = await callOmeka("items");
      assert.true(allItems.length === 100, "There are 100 total Items");

      const collectionOneData = await callOmeka("items?collection=34");

      assert.true(
        collectionOneData.length === count,
        `There are ${count} Items in the 34 Collection.`
      );

      const collectionTwoData = await callOmeka("items?collection=56");
      assert.true(
        collectionTwoData.length === 100 - count,
        `There are ${100 - count} Items in the 56 Collection.`
      );
    });
    test.skip("api/items?item_type=:id returns all items of a specific type.");
    test.skip("api/items?public returns all public items.");
    test.skip("api/items?featured returns all featured items.");
    test.skip(
      "api/items?added_since=:date returns all items added since a time."
    );
    test.skip(
      "api/items?modified_since=:date returns all items modified since a time."
    );
    test.skip("api/items?owner=:id returns all items owned by a user.");
    test.skip(
      "api/items?tags=:tags returns all items with the specified tags."
    );
    test.skip(
      "api/items?excludeTags=:tags returns all items without the specified tags."
    );
    test.skip("api/items?hasImage returns all items with an image.");
    test.skip("api/items?range=:range returns all items in a range.");
    test.skip("api/items?search=:query returns all items matching a query.");
  });
});
