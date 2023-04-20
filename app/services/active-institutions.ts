import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ActiveInstitutions extends Service {
  @tracked list: Set<string> = new Set(["37"]);

  @tracked scrollId: string | null = null;
}

declare module "@ember/service" {
  interface Registry {
    "active-institutions": ActiveInstitutions;
  }
}
