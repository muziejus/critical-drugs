import Component from "@glimmer/component";
import { action } from "@ember/object";
import { format, axisBottom, type ScaleLinear } from "d3";

interface TimelineScaleComponentSignature {
  Element: SVGGElement;
  Args: {
    scale: ScaleLinear<Range, Output>;
    ticks: number;
  };
}

export default class TimelineScaleComponent extends Component<TimelineScaleComponentSignature> {
  @action axis(selection: Selection) {
    axisBottom(this.args.scale).ticks(this.args.ticks, "")(selection);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    "Timeline::Scale": typeof TimelineScaleComponent;
    "timeline/scale": typeof TimelineScaleComponent;
  }
}
