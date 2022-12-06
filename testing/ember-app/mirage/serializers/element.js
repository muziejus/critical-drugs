import ApplicationSerializer from "./application";

export default class ElementSerializer extends ApplicationSerializer {
  include = ["elementSet"];
}
