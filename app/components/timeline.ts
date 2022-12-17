import Component from "@glimmer/component";
// import NeatlineRecord from "emb-line/models/neatline-record";
import NeatlineJsonRecord from "emb-line/routes/index";

interface TimelineComponentSignature {
  Args: {
    records: [NeatlineJsonRecord];
  };
}

export default class TimelineComponent extends Component<TimelineComponentSignature> {}
