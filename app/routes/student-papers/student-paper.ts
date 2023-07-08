import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";
import { hash } from "rsvp";
import FileModel from "critical-drugs/models/file";
import ExhibitPage from "critical-drugs/models/exhibit-page";

export default class StudentPapersStudentPaper extends Route {
  @service declare store: Store;

  async model({ exhibit_page_id_slug }: { exhibit_page_id_slug: string }) {
    const exhibit_page_id = exhibit_page_id_slug.split("-")[0];
    if (exhibit_page_id) {
      const files: FileModel[] = [];
      const studentPaper = await this.store.findRecord(
        "exhibit-page",
        exhibit_page_id
      );
      if (studentPaper.pageBlocks.length > 0) {
        for (const pageBlock of studentPaper.pageBlocks) {
          if (
            pageBlock.attachments?.length &&
            pageBlock.attachments.length > 0
          ) {
            for (const attachment of pageBlock.attachments) {
              if (attachment?.file?.id) {
                files.push(
                  await this.store.findRecord("file", attachment.file.id)
                );
              }
            }
          }
        }
      }

      return hash({
        studentPaper,
        files,
      });
    }
  }
}
