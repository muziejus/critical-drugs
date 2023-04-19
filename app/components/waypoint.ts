import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";
import ActiveInstitutions from "emb-line/services/active-institutions";

interface WaypointComponentSignature {
  Args: {
    record: NeatlineRecord;
  };
}

export default class WaypointComponent extends Component<WaypointComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  @service declare neatlineMap: NeatlineMap;

  @service declare activeInstitutions: ActiveInstitutions;

  @tracked isZoomed = false;

  get isOpen() {
    return this.activeInstitutions.list.has(this.args.record.id);
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

  @action handleOpen() {
    this.activeInstitutions.list = this.activeInstitutions.list.add(
      this.args.record.id
    );
  }

  @action handleClose() {
    this.activeInstitutions.list.delete(this.args.record.id);
    this.activeInstitutions.list = this.activeInstitutions.list;
  }
}
