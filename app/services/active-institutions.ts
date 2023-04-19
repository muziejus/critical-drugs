import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ActiveInstitutions extends Service {
  // @tracked list: string[] = [];
  @tracked list: Set<string> = new Set(["37"]);
}

declare module "@ember/service" {
  interface Registry {
    "active-institutions": ActiveInstitutions;
  }
}
