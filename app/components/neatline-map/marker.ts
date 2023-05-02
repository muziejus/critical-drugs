import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import NeatlineRecord from "emb-line/models/neatline-record";
import { service } from "@ember/service";
import { action } from "@ember/object";
import NeatlineFilter from "emb-line/services/neatline-filter";
import ActiveInstitutions from "emb-line/services/active-institutions";
import { LeafletEvent} from "leaflet";
import EmberLeafletLayers from "emb-line/ember-leaflet";
import ItemModel from "emb-line/models/item";

interface NeatlineMapMarkerComponentSignature {
  Args: {
    point: NeatlineRecord;
    layers: EmberLeafletLayers;
  }
}

export default class NeatlineMapMarkerComponent extends Component<NeatlineMapMarkerComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  @service declare activeInstitutions: ActiveInstitutions;

  @tracked declare item: ItemModel | null;

  // @tracked declare latitude: null | number;

  // get latitude() {
  //   const item = this.args.point.item;
  //   console.log(item);
  //   return 0 //item.elementTexts['latitude'];
  // }

  @action handleMarkerClick(event: LeafletEvent) {
    const { className } = event.target.options;
    const id = className.split("record-id-")[1];
    this.neatlineFilter.shownOrganizations.push(id);
    this.activeInstitutions.toggleList(id);
  }

  constructor(owner: unknown, args: NeatlineMapMarkerComponentSignature['Args']){
    super(owner, args);
    this.item = this.args.point.item;
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    "NeatlineMap::Marker": typeof NeatlineMapMarkerComponent;
  }
}
