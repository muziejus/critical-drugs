import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import NeatlineRecord from "emb-line/models/neatline-record";
import { service } from "@ember/service";
import { action } from "@ember/object";
import NeatlineFilter from "emb-line/services/neatline-filter";
import ActiveInstitutions from "emb-line/services/active-institutions";
import { LeafletEvent } from "leaflet";
import EmberLeafletLayers from "emb-line/ember-leaflet";
import ItemModel from "emb-line/models/item";

interface NeatlineMapMarkerComponentSignature {
  Args: {
    point: NeatlineRecord;
    layers: EmberLeafletLayers;
  };
}

export default class NeatlineMapMarkerComponent extends Component<NeatlineMapMarkerComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  @service declare activeInstitutions: ActiveInstitutions;

  @tracked latitude: string | undefined = "8.9";

  @tracked longitude: string | undefined = "-79";

  @action handleMarkerClick(event: LeafletEvent) {
    const { className } = event.target.options;
    const id = className.split("record-id-")[1];
    this.neatlineFilter.shownOrganizations.push(id);
    this.activeInstitutions.toggleList(id);
  }

  get startYear() {
    return new Date(this.args.point.itemStartDate).getFullYear();
  }

  get endYear() {
    return new Date(this.args.point.itemEndDate).getFullYear();
  }

  constructor(
    owner: unknown,
    args: NeatlineMapMarkerComponentSignature["Args"]
  ) {
    super(owner, args);
    const item = this.args.point.item as unknown as Promise<ItemModel>;
    item.then((response: ItemModel) => {
      this.latitude = response.elementTexts["latitude"];
      this.longitude = response.elementTexts["longitude"];
    });
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    "NeatlineMap::Marker": typeof NeatlineMapMarkerComponent;
  }
}
