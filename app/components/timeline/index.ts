import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";
import { scaleLinear } from "d3-scale";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

interface TimelineComponentSignature {
  Args: {
    records: NeatlineRecord[];
    defaultYear?: number;
  };
}

interface TimelineRecord extends NeatlineRecord {
  numAfterDate?: number;
  numBeforeDate?: number;
}

export default class TimelineComponent extends Component<TimelineComponentSignature> {
  @tracked svgWidth = 0;

  @tracked svgHeight = 0;

  margins = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 30,
  };

  @action calculateTimelineSvgSize({ contentRect }) {
    this.svgWidth = contentRect.width;
    this.svgHeight = contentRect.height;
  }

  get defaultYear() {
    if (this.args.defaultYear) {
      return this.args.defaultYear;
    }

    return this.records.map(record => record.numAfterDate).sort()[0];
  }

  get records() {
    return this.args.records.map(record => {
      if (record.afterDate) {
        record.numAfterDate = +record.afterDate;
      }
      if (record.beforeDate) {
        record.numBeforeDate = +record.beforeDate;
      }

      return record as TimelineRecord;
    });
  }

  get scale() {
    console.log(
      this.records.map(
        record => `${record.numAfterDate}–${record.numBeforeDate}`
      )
    );
    return scaleLinear()
      .domain([this.defaultYear, 2023])
      .nice()
      .range([0, this.svgWidth]);
  }

  foo = 1;
}
