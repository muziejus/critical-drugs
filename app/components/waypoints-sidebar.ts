import Component from "@glimmer/component";
import { service } from "@ember/service";
import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineFilter from "emb-line/services/neatline-filter";

interface WaypointsSidebarComponentSignature {
  Args: {
    records: NeatlineRecord[];
  };
}

export default class WaypointsSidebarComponent extends Component<WaypointsSidebarComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  get sortedRecords() {
    // newest on top.
    return this.args.records.sort((a, b) => b.afterDate - a.afterDate);
  }
}
