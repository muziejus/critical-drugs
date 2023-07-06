import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class SimplePages extends Route {
  @service declare store: Store;

  async model() {
    return this.store.findAll("simple-page");
  }
}
