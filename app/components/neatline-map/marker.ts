import Component from "@glimmer/component";
import { EmberLeafletLayers } from "emb-line";
import NeatlineRecord from "emb-line/models/neatline-record";

interface NeatlineMapMarkerComponentSignature {
  Args: {
    point: NeatlineRecord;
    layers: EmberLeafletLayers;
  }
}

export default class NeatlineMapMarkerComponent extends Component<NeatlineMapMarkerComponentSignature> {
  get item() {
    return this.args.point.item;
  }
}
