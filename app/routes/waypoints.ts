import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class Waypoints extends Route {
  @service declare store: Store;

  async model() {
    const records = await this.store.findAll("neatline-record");
    return records;
  }
}
