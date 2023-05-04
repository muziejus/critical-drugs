import Component from "@glimmer/component";
import { service } from "@ember/service";
import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineFilter from "emb-line/services/neatline-filter";

interface WaypointsComponentSignature {
  Element: HTMLDivElement;
  Args: {
    records: NeatlineRecord[];
  };
  Blocks: {
    default: [];
  };
}

export default class WaypointsComponent extends Component<WaypointsComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  regions = [
    "Northeast",
    "Southeast",
    "Midwest",
    "West",
    "Caribbean",
    "Canada",
  ];

  get sortedRecords() {
    // newest on top.
    return this.args.records.sort((a, b) => b.afterDate - a.afterDate);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    Waypoints: typeof WaypointsComponent;
  }
}
