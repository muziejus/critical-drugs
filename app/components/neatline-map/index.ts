import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import Store from "@ember-data/store";
import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";
import { LeafletEvent, Map } from "leaflet";

interface NeatlineMapComponentSignature {
  Element: HTMLDivElement;
  Args: {
    records: NeatlineRecord[];
  };
  Blocks: {
    default: [];
  };
}

export default class NeatlineMapComponent extends Component<NeatlineMapComponentSignature> {
  @service declare store: Store;

  @service declare neatlineMap: NeatlineMap;

  @service declare neatlineFilter: NeatlineFilter;

  @action onLoad(event: LeafletEvent) {
    const map = event.target as Map;
    setTimeout(() => map.invalidateSize(), 0);
    this.neatlineMap.initializeMap(map, this.args.records);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    NeatlineMap: typeof NeatlineMapComponent;
  }
}
