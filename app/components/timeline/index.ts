import Component from "@glimmer/component";
// import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineJsonRecord from "emb-line/routes/index";
import { scaleLinear } from "d3-scale";

interface TimelineComponentSignature {
  Args: {
    records?: [NeatlineJsonRecord];
    defaultYear?: number;
  };
}

export default class TimelineComponent extends Component<TimelineComponentSignature> {
  get defaultYear() {
    return this.args.defaultYear ?? 1970;
  }

  get scale() {
    return scaleLinear()
      .domain([this.defaultYear, 2023])
      .nice()
      .range([0, 600]);
  }

  foo = 1;
}
