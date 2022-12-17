import Model, { attr, belongsTo } from "@ember-data/model";
import Item from "emb-line/models/item";
import User from "emb-line/models/user";
import NeatlineExhibit from "emb-line/models/neatline-exhibit";

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "neatline-record": NeatlineRecord;
  }
}

export default class NeatlineRecord extends Model {
  @attr declare added: string;
  @attr declare modified: string;
  @attr declare published?: boolean;
  @attr declare isCoverage?: boolean;
  @attr declare isWms?: boolean;
  @attr declare title?: string;
  @attr declare slug?: string;
  @attr declare itemTitle?: string;
  @attr declare body?: string;
  @attr declare coverage?: string;
  @attr declare tags?: string;
  @attr declare widgets?: string;
  @attr declare presenter?: string;
  @attr declare fillColor?: string;
  @attr declare fillColorSelect?: string;
  @attr declare strokeColor?: string;
  @attr declare strokeColorSelect?: string;
  @attr declare fillOpacity?: string;
  @attr declare fillOpacitySelect?: string;
  @attr declare strokeOpacity?: string;
  @attr declare strokeOpacitySelect?: string;
  @attr declare strokeWidth?: number;
  @attr declare pointRadius?: number;
  @attr declare zindex?: number;
  @attr declare weight?: number;
  @attr declare startDate?: string;
  @attr declare endDate?: string;
  @attr declare afterDate?: string;
  @attr declare beforeDate?: string;
  @attr declare pointImage?: string;
  @attr declare wmsAddress?: string;
  @attr declare wmsLayers?: string;
  @attr declare maxZoom?: number;
  @attr declare minZoom?: number;
  @attr declare mapZoom?: number;

  @belongsTo("neatline-exhibit", { async: true })
  declare exhibit: NeatlineExhibit;
  @belongsTo("user", { async: true }) declare owner: User;
  @belongsTo("item", { async: true }) declare item: Item;
}
