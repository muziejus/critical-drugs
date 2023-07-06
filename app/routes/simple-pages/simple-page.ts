import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class SimplePagesSimplePage extends Route {
  @service declare store: Store;

  async model({ simple_page_id }: { simple_page_id: string }) {
    return this.store.findRecord("simple-page", simple_page_id);
  }
}
