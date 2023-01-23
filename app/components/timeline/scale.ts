import Component from "@glimmer/component";
import { action } from "@ember/object";
import { axisBottom } from "d3-axis";
import { ScaleLinear } from "d3-scale";

interface TimelineScaleComponentSignature {
  Element: SVGGElement;
  Args: {
    scale: ScaleLinear<Range, Output>;
  };
}

export default class TimelineScaleComponent extends Component<TimelineScaleComponentSignature> {
  @action axis(selection: Selection) {
    axisBottom(this.args.scale)(selection);
  }
}
