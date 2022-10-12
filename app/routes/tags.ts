import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class TagsRoute extends Route {
  @service declare store: Store;

  async model() {
    return this.store.findAll("tag");
  }
}
