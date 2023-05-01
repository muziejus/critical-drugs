import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import Store from "@ember-data/store";
import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";
import ActiveInstitutions from "emb-line/services/active-institutions";
import { LeafletEvent, Map } from "leaflet";

interface NeatlineMapComponentSignature {
  Args: {
    records: NeatlineRecord[];
  };
}

export default class NeatlineMapComponent extends Component<NeatlineMapComponentSignature> {
  @service declare store: Store;

  @service declare neatlineMap: NeatlineMap;

  @service declare neatlineFilter: NeatlineFilter;

  @service declare activeInstitutions: ActiveInstitutions;

  @action onLoad(event: LeafletEvent) {
    const map = event.target as Map;
    setTimeout(() => map.invalidateSize(), 0);
    this.neatlineMap.initializeMap(map, this.args.records);
  }

  @action handleMarkerClick(event: LeafletEvent) {
    const { className } = event.target.options;
    const id = className.split("record-id-")[1];
    this.neatlineFilter.shownOrganizations.push(id);
    this.activeInstitutions.toggleList(id);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    NeatlineMap: typeof NeatlineMapComponent;
  }
}
