import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import NeatlineRecord from "emb-line/models/neatline-record";
import { convertCoordinates } from "emb-line/helpers/convert-coordinates";
import { action } from "@ember/object";

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

  @tracked recordCoordinates: Record<string, Coordinate> = {};

  @action recenter() {
    this.map.fitBounds(this.bounds);
  }

  @action flyTo(recordId: string) {
    console.log("in flyto", recordId);
    const coordinates = this.recordCoordinates[`record-${recordId}`];
    this.map.flyTo([coordinates.latitude, coordinates.longitude], 12);
  }

  initializeMap(map, records: NeatlineRecord[]) {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    for (const record of records) {
      const coordinates = convertCoordinates([record.coverage]);
      latitudes.push(coordinates.latitude);
      longitudes.push(coordinates.longitude);
      this.recordCoordinates[`record-${record.id}`] = coordinates;
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
