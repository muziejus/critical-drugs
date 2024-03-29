import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { action } from "@ember/object";
import NeatlineFilter from "critical-drugs/services/neatline-filter";
import ActiveInstitutions from "critical-drugs/services/active-institutions";
import { LeafletEvent } from "leaflet";
import EmberLeafletLayers from "critical-drugs/ember-leaflet";
import ItemModel from "critical-drugs/models/item";

interface NeatlineMapMarkerComponentSignature {
  Args: {
    point: ItemModel;
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
    const id = className.split("item-id-")[1];
    this.neatlineFilter.shownOrganizations.push(id);
    this.activeInstitutions.toggleList(id);
  }

  constructor(
    owner: unknown,
    args: NeatlineMapMarkerComponentSignature["Args"]
  ) {
    super(owner, args);
    this.latitude = this.args.point.elementTexts["latitude"];
    this.longitude = this.args.point.elementTexts["longitude"];
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    "NeatlineMap::Marker": typeof NeatlineMapMarkerComponent;
  }
}
