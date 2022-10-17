import ApplicationSerializer from "./application";

export default class ElementTextSerializer extends ApplicationSerializer {
  include = ["record", "element", "elementSet"];
}
