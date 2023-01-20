import { helper } from "@ember/component/helper";
import { point } from "@turf/helpers";
import { toWgs84 } from "@turf/projection";

export function convertCoordinates([wkt]: [string] /*, hash*/) {
  const sphericalMercatorCoordinates = wkt
    .match(/POINT\(([^)]*)\)/)[1]
    .split(" ");
  const { coordinates } = toWgs84(point(sphericalMercatorCoordinates)).geometry;
  return {
    latitude: parseFloat(coordinates[1]),
    longitude: parseFloat(coordinates[0]),
  };
}

export default helper(convertCoordinates);
