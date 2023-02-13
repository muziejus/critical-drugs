import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

interface BelongsToResource {
  id: number;
  url: string;
  resource: string;
}

export interface NeatlineJsonExhibit {
  id: number;
  url: string;
  public?: boolean;
  added: string;
  modified: string;
  published: string;
  title: string;
  slug: string;
  narrative: string;
  widgets: string;
  itemQuery?: string;
  spatialLayers?: string;
  spatialLayer?: string;
  imageLayer?: string;
  imageHeight?: number;
  imageWidth?: number;
  zoomLevels?: number;
  wmsAddress?: string;
  wmsLayers?: string;
  spatialQuerying?: boolean;
  styles?: string;
  mapFocus?: string;
  mapZoom?: number;
  accessibleUrl?: string;
  mapRestrictedExtent?: string;
  mapMinZoom?: number;
  mapMaxZoom?: number;
  owner: BelongsToResource;
  extended_resources: string[];
}

export interface NeatlineJsonRecord {
  id: number;
  url: string;
  added: string;
  modified: string;
  published?: boolean;
  is_coverage?: boolean;
  is_wms?: boolean;
  title?: string;
  slug?: string;
  item_title?: string;
  body?: string;
  coverage?: string;
  tags?: string;
  widgets?: string;
  presenter?: string;
  fill_color?: string;
  fill_color_select?: string;
  stroke_color?: string;
  stroke_color_select?: string;
  fill_opacity?: string;
  fill_opacity_select?: string;
  stroke_opacity?: string;
  stroke_opacity_select?: string;
  stroke_width?: number;
  point_radius?: number;
  zindex?: number;
  weight?: number;
  start_date?: string;
  end_date?: string;
  after_date?: string;
  before_date?: string;
  point_image?: string;
  wms_address?: string;
  wms_layers?: string;
  max_zoom?: number;
  min_zoom?: number;
  map_zoom?: number;
  item: BelongsToResource;
  owner: BelongsToResource;
  exhibit: BelongsToResource;
  extended_resources: string[];
}

export default class Index extends Route {
  @service declare store: Store;

  async model() {
    const records = await this.store.findAll("neatline-record");
    return records.filter(record => record.coverage);
  }
}
