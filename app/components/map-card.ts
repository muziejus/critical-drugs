import Component from "@glimmer/component";
import ItemModel from "emb-line/models/item";

interface MapCardComponentSignature {
  Args: {
    point: ItemModel;
  };
}

export default class MapCardComponent extends Component<MapCardComponentSignature> {
  get item() {
    return this.args.point;
  }

  get DCdescription() {
    const item = this.item;
    return item.elementTexts.DCdescription;
  }
}
