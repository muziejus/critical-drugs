import { type TestContext } from "@ember/test-helpers";
import { Server } from "miragejs";
import ItemModel from "critical-drugs/models/item";
import TagModel from "critical-drugs/models/tag";

export default interface MirageTestContext extends TestContext {
  server: Server;
  model: TagModel | ItemModel | TagModel[] | ItemModel[];
}
