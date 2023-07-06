import Model, {
  attr,
  belongsTo,
  hasMany,
  AsyncHasMany,
} from "@ember-data/model";
import Tag from "emb-line/models/tag";
// import ElementText from "emb-line/models/element-text";
import User from "emb-line/models/user";
import Collection from "emb-line/models/collection";
import ItemType from "emb-line/models/item-type";

export default class ItemModel extends Model {
  @attr declare featured?: boolean;
  @attr declare public?: boolean;
  @attr declare added: string;
  @attr declare modified: string;
  // This is magicked in the adapter.
  @attr declare elementTexts: Record<string, string>;

  @hasMany("tag", { inverse: "records", async: true })
  declare tags: AsyncHasMany<Tag>;

  // Too complex to work out for now.
  // @hasMany("elementText", { async: true, inverse: "record" })
  // declare elementTexts: AsyncHasMany<ElementText>;

  @belongsTo("collection", { async: true }) declare collection: Collection;
  @belongsTo("user", { async: true }) declare owner: User;
  @belongsTo("itemType", { async: true }) declare itemType: ItemType;

  private get dates() {
    if (this.elementTexts["DCdate"] && /-/.test(this.elementTexts["DCdate"])) {
      let [startDate, endDate] = this.elementTexts["DCdate"].split("-") as [
        string,
        string | undefined
      ];
      if (!endDate) {
        endDate = "";
      }

      if (/present/i.test(endDate)) {
        // Kind of a goofy way to do this to ensure that Date.parse
        // works below.
        endDate = new Date().getFullYear().toString();
      }

      return {
        startDate: new Date(Date.parse(startDate)),
        endDate: new Date(Date.parse(endDate)),
      };
    }

    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  get startDate() {
    const { startDate } = this.dates;
    return startDate;
  }

  get endDate() {
    const { endDate } = this.dates;
    return endDate;
  }

  get startYear() {
    return this.startDate.getUTCFullYear();
  }

  get endYear() {
    return this.endDate.getUTCFullYear();
  }

  get stillActive() {
    return this.endYear === new Date().getUTCFullYear();
  }
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    item: ItemModel;
  }
}
