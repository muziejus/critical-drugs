import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";
import { action } from "@ember/object";
import { service } from "@ember/service";
import NeatlineFilter from "emb-line/services/neatline-filter";

interface WaypointComponentSignature {
  Args: {
    record: NeatlineRecord;
  };
}

export default class WaypointComponent extends Component<WaypointComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  // @tracked isOpen = dg

  get isOpen() {
    console.log("from isopen", this.args.record.id);
    const inArray =
      this.neatlineFilter.shownOrganizations.filter(
        id => id === this.args.record.id
      ).length > 0;
    console.log("inarray", inArray);
    return inArray;
  }

  get item() {
    return this.args.record.item;
  }

  @action handleClose() {
    console.log("handling close");
  }
}
