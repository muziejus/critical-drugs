import Component from "@glimmer/component";
import { service } from "@ember/service";
import Store from "@ember-data/store";
import NeatlineRecord from "emb-line/models/neatline-record";

type NeatlinePoint = NeatlineRecord;

interface NeatlineMapComponentSignature {
  Args: {
    records: NeatlineRecord[];
    lat?: number | string;
    lng?: number | string;
    zoom?: number | string;
  };
}

export default class NeatlineMapComponent extends Component<NeatlineMapComponentSignature> {
  @service declare store: Store;

  get lat() {
    return this.args.lat ?? 41;
  }
  get zoom() {
    return this.args.zoom ?? 3;
  }
  get lng() {
    return this.args.lng ?? -73;
  }

  get points() {
    return this.args.records.filter(record => record.coverage);
  }
}
