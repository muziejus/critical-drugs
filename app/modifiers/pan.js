import Modifier from "ember-modifier";
import { select, zoom } from "d3";

export default class PanModifier extends Modifier {
  modify() {
    console.log("in modify");
    select("svg.panable").call(zoom().on("zoom", this.zoomed));
  }

  zoomed({ transform }) {
    console.log("zomed called");
    select("g.panable").attr("transform", transform);
  }
}
