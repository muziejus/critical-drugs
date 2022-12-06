import Component from "@glimmer/component";

interface ItemCardComponentSignature {}

export default class ItemCardComponent extends Component<ItemCardComponentSignature> {
  get collection() {
    return this.args.item.get("collection");
  }
}
