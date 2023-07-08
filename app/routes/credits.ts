import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class Credits extends Route {
  @service declare store: Store;

  async model() {
    const creditsSimplePageId = 2;
    return this.store.findRecord("simplePage", creditsSimplePageId);
  }
}
