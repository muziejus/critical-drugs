import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";

interface MapCardComponentSignature {
  Args: {
    point: NeatlineRecord;
  };
}

export default class MapCardComponent extends Component<MapCardComponentSignature> {
  get item() {
    return this.args.point.item;
  }

  get DCdescription() {
    const item = this.item;
    return item.elementTexts.DCdescription;
  }
}
