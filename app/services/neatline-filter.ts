import Service from "@ember/service";

export default class NeatlineFilter extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    "neatline-filter": NeatlineFilter;
  }
}
