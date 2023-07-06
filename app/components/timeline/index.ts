import Component from "@glimmer/component";
import { scaleLinear, scaleBand } from "d3";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import NeatlineFilter from "emb-line/services/neatline-filter";
import NeatlineMap from "emb-line/services/neatline-map";
import ActiveInstitutions from "emb-line/services/active-institutions";
import ItemModel from "emb-line/models/item";

interface TimelineComponentSignature {
  Element: HTMLDivElement;
  Args: {
    items: ItemModel[];
    defaultYear?: number;
  };
}

export default class TimelineComponent extends Component<TimelineComponentSignature> {
  @tracked svgWidth = 0;

  @tracked windowWidth = 0;

  @tracked svgHeight = 0;

  @service declare neatlineMap: NeatlineMap;

  @service declare neatlineFilter: NeatlineFilter;

  @service declare activeInstitutions: ActiveInstitutions;

  margins = {
    top: 10,
    left: 15,
    right: 15,
    bottom: 30,
  };

  @action handleClick(id: string) {
    this.activeInstitutions.toggleList(id);
    this.neatlineMap.flyTo(id);
  }

  @action scrollFilter({ target }: PointerEvent) {
    const { scrollLeft } = target;
    this.neatlineFilter.beforeYear = this.scrollScale(
      scrollLeft - this.margins.left
    );
    this.neatlineFilter.afterYear = this.scrollScale(
      scrollLeft - this.margins.left + this.windowWidth
    );
  }

  @action calculateTimelineSvgSize({ contentRect }: SVGElement) {
    this.windowWidth = contentRect.width;
    this.svgWidth = contentRect.width * 6;
    this.svgHeight = contentRect.height;
  }

  get defaultYear() {
    if (this.args.defaultYear) {
      return this.args.defaultYear;
    }

    return this.args.items.map(item => item.startYear).sort()[0];
  }

  get sortedItems() {
    // return this.args.items.toSorted((a, b) => a.startYear - b.startYear);
    return [...this.args.items].sort((a, b) => a.startYear - b.startYear);
  }

  get scrollScale() {
    return scaleLinear()
      .domain([0, this.svgWidth - this.margins.left - this.margins.right])
      .range([this.defaultYear, new Date().getFullYear()]);
  }

  get scale() {
    return scaleLinear()
      .domain([this.defaultYear, new Date().getFullYear()])
      .range([0, this.svgWidth - this.margins.left - this.margins.right]);
  }

  get bandScale() {
    return scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7])
      .range([this.margins.top, this.svgHeight - this.margins.bottom])
      .padding(0.1);
  }

  get ticks() {
    const year = new Date().getFullYear();
    return year - this.defaultYear;
  }

  get rem() {
    if (document) {
      return parseFloat(
        window
          .getComputedStyle(document.documentElement)
          .fontSize.replace("px", "")
      );
    }

    return 16;
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    Timeline: typeof TimelineComponent;
  }
}
