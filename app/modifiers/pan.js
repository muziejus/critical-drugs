import Modifier from "ember-modifier";
import { select, zoom } from "d3";

export default class PanModifier extends Modifier {
  modify() {
    select("svg.panable").call(zoom().on("zoom", this.zoomed));
  }

  zoomed({ transform }) {
    select("g.panable").attr("transform", transform);
  }
}
