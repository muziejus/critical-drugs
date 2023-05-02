import { ComponentLike} from "@glint/template";
import { LeafletMouseEventHandlerFn } from "leaflet";

export default interface EmberLeafletLayers {
  tile: ComponentLike<{
    Args: {
      url: string;
    };
  }>;
  "circle-marker": ComponentLike<{
    Element: HTMLElement;
    Args: {
      lat: number;
      lng: number;
      title?: string;
      className?: string;
      onClick?: LeafletMouseEventHandlerFn;
    };
    Blocks: {
      default: [marker: {
        tooltip: ComponentLike;
      }]
    };
  }>;
}

