import Component from "@glimmer/component";
import { Attachment } from "omeka-api";
import { service } from "@ember/service";
import Store from "@ember-data/store";
import FileModel from "critical-drugs/models/file";

interface AttachmentGalleryComponentSignature {
  Args: {
    attachments: Attachment[];
    files: FileModel[];
  }
}

export default class AttachmentGalleryComponent extends Component<AttachmentGalleryComponentSignature> {
  @service declare store: Store;

  getFile(id: number) {
    const file = (async () => {
      const record = await this.store.findRecord("file", id);
      return record;
    })();
    console.log(file);
    return file;
  }

  get files() {
    return this.args.attachments.map(attachment => {
      if(attachment?.file?.id) {
        const file = this.getFile(attachment.file.id);
      }
    })
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    AttachmentGallery: typeof AttachmentGalleryComponent;
    "attachment-gallery": typeof AttachmentGalleryComponent;
  }
}
