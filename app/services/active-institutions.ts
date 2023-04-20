import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ActiveInstitutions extends Service {
  @tracked list: Set<string> = new Set(["37"]);

  @tracked scrollId: string | null = null;

  @action toggleList(id: string) {
    if (this.list.has(id)) {
      this.list.delete(id);
      this.list = this.list;
    } else {
      this.scrollId = id;
      this.list = this.list.add(id);
    }
  }
}

declare module "@ember/service" {
  interface Registry {
    "active-institutions": ActiveInstitutions;
  }
}
