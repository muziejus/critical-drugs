import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";

interface WaypointComponentSignature {
  Args: {
    record: NeatlineRecord;
  };
}

export default class WaypointComponent extends Component<WaypointComponentSignature> {
  get item() {
    return this.args.record.item;
  }
}
