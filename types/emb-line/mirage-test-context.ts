import { type TestContext } from "@ember/test-helpers";
import { Server } from "miragejs";
import ItemModel from "emb-line/models/item";
import TagModel from "emb-line/models/tag";

export default interface MirageTestContext extends TestContext {
  server: Server;
  model: TagModel | ItemModel | TagModel[] | ItemModel[];
}
