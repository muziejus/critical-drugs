import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class StudentPapers extends Route {
  @service declare store: Store;

  async model() {
    const studentPapersExhibitId = 2;
    return this.store.query("exhibit-page", {
      exhibit: studentPapersExhibitId,
    });
  }
}
