import { modifier } from "ember-modifier";
import { select } from "d3";

export default modifier(function d3Call(
  element: SVGElement | HTMLElement,
  [callback]: [() => void] /*, named*/
): void {
  select(element).call(callback);
});
