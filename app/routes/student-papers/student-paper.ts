import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class StudentPapersStudentPaper extends Route {
  @service declare store: Store;

  async model({ exhibit_page_id_slug }: { exhibit_page_id_slug: string }) {
    const exhibit_page_id = exhibit_page_id_slug.split("-")[0];
    return this.store.findRecord("exhibit-page", exhibit_page_id);
  }
}
