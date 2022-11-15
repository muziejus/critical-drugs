import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { point } from "@turf/helpers";
import { toMercator } from "@turf/projection";

export default Factory.extend({
  added() {
    return faker.date.recent(5, this.modified);
  },
  modified() {
    return faker.date.past(5);
  },
  published() {
    return faker.date.past(3);
  },
  public: true,
  is_coverage: true,
  is_wms: false,
  title() {
    return faker.commerce.productName();
  },
  slug() {
    return this.title.replace(/ /g, "-").toLowerCase();
  },
  item_title() {
    return `An item named “${this.title}”`;
  },
  body() {
    return `<p>This is body text describing <i>${
      this.title
    }</i>. And here is some lorem ipsum. ${faker.lorem.paragraphs(
      3,
      "</p>\n<p>"
    )}</p>`;
  },
  coverage() {
    const butlerLibrary = {
      latitude: 40.8064,
      longitude: -73.9633,
    };
    const coverage = faker.address.nearbyGPSCoordinate(
      [butlerLibrary.latitude, butlerLibrary.longitude],
      1,
      true
    );
    const coveragePoint = point([coverage[1], coverage[0]]);
    const coverageMercator = toMercator(coveragePoint);
    return `POINT(${coverageMercator.geometry.coordinates.join(" ")})`;
  },
  tags: null,
  widgets: "Simile,Waypoints",
  presenter: "StaticBubble",
  fill_color: "#00aeff",
  fill_color_select: "#00aeff",
  stroke_color: "#000000",
  stroke_color_select: "#000000",
  fill_opacity: "0.30",
  fill_opacity_select: "0.40",
  stroke_opacity: "0.90",
  stroke_opacity_select: "1.00",
  stroke_width: 2,
  point_radius: 10,
  zindex: null,
  weight(i) {
    return i + 1;
  },
  start_date: "2005",
  end_date: null,
  after_date: null,
  before_date: null,
  point_image: null,
  wms_address: null,
  wms_layers: null,
  max_zoom: null,
  min_zoom: null,
  map_zoom: null,
  map_focus: null,
});
