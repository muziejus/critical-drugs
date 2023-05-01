import { helper } from "@ember/component/helper";
import { point, Position } from "@turf/helpers";
import { toWgs84 } from "@turf/projection";

export interface ConvertCoordinatesSignature {
  Args: {
    Positional: string[];
  }
  Return: {
    latitude: number;
    longitude: number;
  }
}

export function convertCoordinates([wkt]: [string] /*, hash*/) {
  if(wkt && typeof(wkt) === "string") {
    const match = wkt.match(/POINT\(([^)]*)\)/)
    if(match && match.length > 0 && match[1]) {
      const stringCoordinates = match[1].split(" ") as [string, string];
      const sphericalMercatorCoordinates = stringCoordinates.map(coord => parseFloat(coord)) as Position;
      const { coordinates } = toWgs84(point(sphericalMercatorCoordinates)).geometry;
      if(coordinates[1] && coordinates[0]){
        return {
          latitude: coordinates[1],
          longitude: coordinates[0],
        };
      }
    }
  }

  return {
    latitude: 0,
    longitude: 0
  };
}

export default helper(convertCoordinates);
