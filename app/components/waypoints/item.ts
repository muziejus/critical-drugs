import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";
import ActiveInstitutions from "emb-line/services/active-institutions";
import ItemModel from "emb-line/models/item";

interface WaypointsItemComponentSignature {
  Args: {
    item: ItemModel;
    region: string;
  };
}

export default class WaypointsItemComponent extends Component<WaypointsItemComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  @service declare neatlineMap: NeatlineMap;

  @service declare activeInstitutions: ActiveInstitutions;

  @tracked isZoomed = false;

  @tracked isRegion = false;

  get isOpen() {
    return this.activeInstitutions.list.has(this.args.item.id);
  }

  get item() {
    return this.args.item;
  }

  get startYear() {
    return 1976;
  }

  get endYear() {
    return 2022;
  }

  toggleZoomed() {
    this.isZoomed = !this.isZoomed;
  }

  @action flyTo() {
    this.toggleZoomed();
    this.neatlineMap.flyTo(this.args.item.id);
  }

  @action recenter() {
    this.toggleZoomed();
    this.neatlineMap.recenter();
  }

  @action handleOpen() {
    this.activeInstitutions.list = this.activeInstitutions.list.add(
      this.args.item.id
    );
  }

  @action handleClose() {
    this.activeInstitutions.list.delete(this.args.item.id);
    this.activeInstitutions.list = this.activeInstitutions.list;
  }

  constructor(owner: unknown, args: WaypointsItemComponentSignature['Args']) {
    super(owner, args);
    const item = this.item as unknown as Promise<ItemModel>;
    item.then((response: ItemModel) => {
      this.isRegion = this.args.region === response.elementTexts["region"];
    });
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    "Waypoints::Item": typeof WaypointsItemComponent;
  }
}
