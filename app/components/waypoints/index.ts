import Component from "@glimmer/component";
import { service } from "@ember/service";
import NeatlineFilter from "emb-line/services/neatline-filter";
import ItemModel from "emb-line/models/item";

interface WaypointsComponentSignature {
  Element: HTMLDivElement;
  Args: {
    items: ItemModel[];
  };
  Blocks: {
    default: [];
  };
}

export default class WaypointsComponent extends Component<WaypointsComponentSignature> {
  @service declare neatlineFilter: NeatlineFilter;

  regions = [
    "Northeast",
    "Southeast",
    "Midwest",
    "West",
    "Caribbean",
    "Canada",
  ];

  get sortedItems() {
    // newest on top.
    return this.args.items.sort((a, b) => b.afterDate - a.afterDate);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    Waypoints: typeof WaypointsComponent;
  }
}
