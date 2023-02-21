import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import Store from "@ember-data/store";
import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineFilter from "emb-line/services/neatline-filter";

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

  @service declare neatlineFilter: NeatlineFilter;

  @action onLoad(event) {
    const map = event.target;
    console.log("invalidating");
    setTimeout(() => map.invalidateSize(), 0);
    map.setView([39, -115], 3);
  }

  get lat() {
    return this.args.lat ?? 39;
  }
  get zoom() {
    return this.args.zoom ?? 3;
  }
  get lng() {
    return this.args.lng ?? -104;
  }
}
