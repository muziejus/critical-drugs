import Model, { attr, belongsTo } from "@ember-data/model";
import Exhibit from "emb-line/models/exhibit";

interface PageBlock {
  id: number;
  page_id: number;
  layout: string;
  options?: Record<string, string>;
  text: string;
  order: number;
  attachments?: string[];
}

export default class ExhibitPage extends Model {
  @attr declare title?: string;
  @attr declare slug?: string;
  @attr declare order?: number;
  @attr declare parent?: number;
  @attr declare pageBlocks: PageBlock[];

  @belongsTo("exhibit", { async: true }) declare exhibit: Exhibit;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "exhibit-page": ExhibitPage;
  }
}
