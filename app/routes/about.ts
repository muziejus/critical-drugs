import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class About extends Route {
  @service declare store: Store;

  async model() {
    const aboutSimplePageId = 3;
    return this.store.findRecord("simplePage", aboutSimplePageId);
  }
}
