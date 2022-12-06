import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export type CollectionsRouteModel = Awaited<
  ReturnType<CollectionsRoute["model"]>
>;

export default class CollectionsRoute extends Route {
  @service declare store: Store;

  model() {
    return this.store.findAll("collection");
  }
}
