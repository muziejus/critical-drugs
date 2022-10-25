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

  test("api/items returns an array of Items.", async function (this: MirageTestContext, assert) {
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { public: true });

    const allItems = await callOmeka("items");
    assert.strictEqual(
      allItems.length,
      count,
      `All ${count} Items are returned`
    );
  });

  test("api/items?collection=:id returns all items in a collection.", async function (this: MirageTestContext, assert) {
    const collectionOne = this.server.create("collection", { id: 34 });
    const collectionTwo = this.server.create("collection", { id: 56 });
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { collection: collectionOne });
    this.server.createList("item", 100 - count, {
      collection: collectionTwo,
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const collectionOneData = await callOmeka("items?collection=34");

    assert.strictEqual(
      collectionOneData.length,
      count,
      `There are ${count} Items in the 34 Collection.`
    );

    const collectionTwoData = await callOmeka("items?collection=56");
    assert.strictEqual(
      collectionTwoData.length,
      100 - count,
      `There are ${100 - count} Items in the 56 Collection.`
    );
  });
  test("api/items?item_type=:id returns all items of a specific type.", async function (this: MirageTestContext, assert) {
    const itemTypeOne = this.server.create("item-type", { id: 34 });
    const itemTypeTwo = this.server.create("item-type", { id: 56 });
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { itemType: itemTypeOne });
    this.server.createList("item", 100 - count, {
      itemType: itemTypeTwo,
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const itemTypeOneData = await callOmeka("items?item_type=34");

    assert.strictEqual(
      itemTypeOneData.length,
      count,
      `There are ${count} Items of type "${itemTypeOne.name}."`
    );

    const itemTypeTwoData = await callOmeka("items?item_type=56");
    assert.strictEqual(
      itemTypeTwoData.length,
      100 - count,
      `There are ${100 - count} Items of type "${itemTypeTwo.name}."`
    );
  });
  test("api/items?public returns all public items.", async function (this: MirageTestContext, assert) {
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { public: true });
    this.server.createList("item", 100 - count, {
      public: false,
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const publicData = await callOmeka("items?public");

    assert.strictEqual(
      publicData.length,
      count,
      `There are ${count} public Items.`
    );
  });

  test("api/items?featured returns all featured items.", async function (this: MirageTestContext, assert) {
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { featured: true });
    this.server.createList("item", 100 - count, {
      featured: false,
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const featuredData = await callOmeka("items?featured");

    assert.strictEqual(
      featuredData.length,
      count,
      `There are ${count} featured Items.`
    );
  });

  test("api/items?added_since=:date returns all items added since a time.", async function (this: MirageTestContext, assert) {
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count);
    this.server.createList("item", 100 - count, {
      added: new Date("1990-01-01 12:59:00"),
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const recentItemData = await callOmeka("items?added_since=2000-01-01");

    assert.strictEqual(
      recentItemData.length,
      count,
      `There are ${count} Items created since 2000.`
    );
  });
  test("api/items?modified_since=:date returns all items modified since a time.", async function (this: MirageTestContext, assert) {
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count);
    this.server.createList("item", 100 - count, {
      modified: new Date("1990-01-01 12:59:00"),
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const recentItemData = await callOmeka("items?modified_since=2000-01-01");

    assert.strictEqual(
      recentItemData.length,
      count,
      `There are ${count} Items modified since 2000.`
    );
  });
  test("api/items?owner=:id returns all items owned by a user.", async function (this: MirageTestContext, assert) {
    const ownerOne = this.server.create("user", { id: 34 });
    const ownerTwo = this.server.create("user", { id: 56 });
    const count = Math.floor(Math.random() * 100);
    this.server.createList("item", count, { owner: ownerOne });
    this.server.createList("item", 100 - count, {
      owner: ownerTwo,
    });

    const allItems = await callOmeka("items");
    assert.strictEqual(allItems.length, 100, "There are 100 total Items");

    const ownerOneData = await callOmeka("items?owner=34");

    assert.strictEqual(
      ownerOneData.length,
      count,
      `There are ${count} Items belonging to ${ownerOne.name}.`
    );

    const ownerTwoData = await callOmeka("items?owner=56");
    assert.strictEqual(
      ownerTwoData.length,
      100 - count,
      `There are ${100 - count} Items belonging to ${ownerTwo.name}.`
    );
  });
  test.skip("api/items?tags=:tags returns all items with the specified tags.");
  test.skip(
    "api/items?excludeTags=:tags returns all items without the specified tags."
  );
  test.skip("api/items?hasImage returns all items with an image.");
  test.skip("api/items?range=:range returns all items in a range.");
  test.skip("api/items?search=:query returns all items matching a query.");
});
