import Model, { attr, belongsTo } from "@ember-data/model";
import User from "emb-line/models/user";

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "neatline-exhibit": NeatlineExhibit;
  }
}

export default class NeatlineExhibit extends Model {
  @attr declare public?: boolean;
  @attr declare added: string;
  @attr declare modified: string;
  @attr declare published: string;
  @attr declare title: string;
  @attr declare slug: string;
  @attr declare narrative: string;
  @attr declare widgets: string;
  @attr declare itemQuery?: string;
  @attr declare spatialLayers?: string;
  @attr declare spatialLayer?: string;
  @attr declare imageLayer?: string;
  @attr declare imageHeight?: number;
  @attr declare imageWidth?: number;
  @attr declare zoomLevels?: number;
  @attr declare wmsAddress?: string;
  @attr declare wmsLayers?: string;
  @attr declare spatialQuerying?: boolean;
  @attr declare styles?: string;
  @attr declare mapFocus?: string;
  @attr declare mapZoom?: number;
  @attr declare accessibleUrl?: string;
  @attr declare mapRestrictedExtent?: string;
  @attr declare mapMinZoom?: number;
  @attr declare mapMaxZoom?: number;

  @belongsTo("user", { async: true }) declare owner: User;
}
