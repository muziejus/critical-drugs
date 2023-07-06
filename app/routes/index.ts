import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class Index extends Route {
  @service declare store: Store;

  async model() {
    const institutionItemTypeId = 19;
    return this.store.query("item", { item_type: institutionItemTypeId })
  }
}
