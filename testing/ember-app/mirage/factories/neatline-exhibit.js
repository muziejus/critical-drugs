import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { point } from "@turf/helpers";
import { toMercator } from "@turf/projection";

export default Factory.extend({
  public: true,
  added() {
    return faker.date.recent(5, this.modified);
  },
  modified() {
    return faker.date.past(5);
  },
  published() {
    return faker.date.past(3);
  },
  title(i) {
    return `A Neatline Exhibit Numbered “${i + 1}”`;
  },
  slug() {
    return this.title.replace(/ /g, "-").replace(/[“”]/g, "").toLowerCase();
  },
  narrative() {
    return `<p>This is a narrative describing <i>${
      this.title
    }</i>. And here is some lorem ipsum. ${faker.lorem.paragraphs(
      3,
      "</p>\n<p>"
    )}</p>`;
  },
  widgets: null,
  item_query: null,
  spatial_layers: "OpenStreetMap",
  spatial_layer: "OpenStreetMap",
  image_layer: null,
  image_height: null,
  image_width: null,
  zoom_levels: 20,
  wms_address: null,
  wms_layers: null,
  spatial_querying: true,
  styles: null,
  map_focus() {
    const butlerLibrary = point([-73.9633, 40.8064]);
    const butlerMercator = toMercator(butlerLibrary);
    return butlerMercator.geometry.coordinates.join(",");
  },
  map_zoom: 4,
  accessible_url: null,
  map_restricted_extent: null,
  map_min_zoom: null,
  map_max_zoom: null,
});
