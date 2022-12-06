import { type TestContext } from "@ember/test-helpers";
import { Server } from "miragejs";
import ItemModel from "ember-app/models/item";
import TagModel from "ember-app/models/tag";

export default interface MirageTestContext extends TestContext {
  server: Server;
  model: TagModel | ItemModel | TagModel[] | ItemModel[];
}
