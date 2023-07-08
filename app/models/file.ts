import Model, { attr, belongsTo } from "@ember-data/model";
import ItemModel from "./item";

interface FileUrls {
  original: string;
  fullsize: string;
  thumbnail: string;
  square_thumbnail: string;
}

export default class FileModel extends Model {
  @attr declare fileUrls: FileUrls;
  @attr declare null?: number;
  @attr declare size: number;
  @attr declare hasDerivativeImages: boolean;
  @attr declare authentication: string;
  @attr declare mimeType: string;
  @attr declare typeOs: string;
  @attr declare filename: string;
  @attr declare originalFilename: string;
  @attr declare added: string;
  @attr declare modified: string;
  @attr declare stored: boolean;
  // Metadata comes from the getId3 library.
  @attr declare metadata: Record<string, string>;
  // This is magicked in the adapter.
  @attr declare elementTexts: Record<string, string>;

  @belongsTo("item", { async: true}) declare item: ItemModel;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    file: FileModel;
  }
}
