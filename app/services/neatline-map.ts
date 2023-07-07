import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { convertCoordinates } from "critical-drugs/helpers/convert-coordinates";
import { action } from "@ember/object";
import ItemModel from "critical-drugs/models/item";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default class NeatlineMapService extends Service {
  @tracked lat = 39;

  @tracked lng = -72;

  @tracked zoom = 5;

  @tracked map = {};

  @tracked bounds = [
    [-1, -1],
    [1, 1],
  ];

  @tracked itemCoordinates: Record<string, Coordinate> = {};

  @action recenter() {
    this.map.fitBounds(this.bounds);
  }

  @action flyTo(itemId: string) {
    const coordinates = this.itemCoordinates[`item-${itemId}`];
    this.map.flyTo([coordinates.latitude, coordinates.longitude], 12);
  }

  initializeMap(map, items: ItemModel[]) {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    for (const item of items) {
      let latitude = 1;
      let longitude = 1;
      if (item.elementTexts["longitude"]) {
        longitude = parseFloat(item.elementTexts["longitude"]);
        longitudes.push(longitude);
      }
      if (item.elementTexts["latitude"]) {
        latitude = parseFloat(item.elementTexts["latitude"]);
        latitudes.push(latitude);
      }

      this.itemCoordinates[`item-${item.id}`] = { latitude, longitude };
    }
    const sortedLatitudes = latitudes.sort((a, b) => a - b);
    const sortedLongitudes = longitudes.sort((a, b) => a - b);

    this.map = map;

    this.bounds = [
      [sortedLatitudes[0], sortedLongitudes[0]],
      [
        sortedLatitudes[sortedLatitudes.length - 1],
        sortedLongitudes[sortedLongitudes.length - 1],
      ],
    ];

    map.fitBounds(this.bounds);
    return this.bounds;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    "neatline-map-service": NeatlineMapService;
  }
}
