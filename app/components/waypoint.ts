import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";

interface WaypointComponentSignature {
  Args: {
    record: NeatlineRecord;
  };
}

export default class WaypointComponent extends Component<WaypointComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  @service declare neatlineMap: NeatlineMap;

  @tracked isZoomed = false;

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

  toggleZoomed() {
    this.isZoomed = !this.isZoomed;
  }

  @action flyTo() {
    this.toggleZoomed();
    this.neatlineMap.flyTo(this.args.record.id);
  }

  @action recenter() {
    this.toggleZoomed();
    this.neatlineMap.recenter();
  }

  @action handleClose() {
    console.log("handling close");
  }
}
