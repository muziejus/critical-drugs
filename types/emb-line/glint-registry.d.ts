import "@glint/environment-ember-loose";
import { ComponentLike, HelperLike } from "@glint/template";
import AndHelper from "@gavant/glint-template-types/types/ember-truth-helpers/and";
import NotHelper from "@gavant/glint-template-types/types/ember-truth-helpers/not";
import OrHelper from "@gavant/glint-template-types/types/ember-truth-helpers/or";
import LteHelper from "@gavant/glint-template-types/types/ember-truth-helpers/lte";
import GteHelper from "@gavant/glint-template-types/types/ember-truth-helpers/gte";
import MarkdownToHtml from "@gavant/glint-template-types/types/ember-cli-showdown/markdown-to-html";
import SvgJarHelper from "@gavant/glint-template-types/types/ember-svg-jar/svg-jar";
import EmberLeafletLayers from "./ember-leaflet";
import { LeafletEventHandlerFn } from "leaflet";
import "ember-css-transitions/glint";
import { PopperJS } from "ember-popperjs";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    and: typeof AndHelper;
    or: typeof OrHelper;
    not: typeof NotHelper;
    lte: typeof LteHelper;
    gte: typeof GteHelper;
    PopperJS: typeof PopperJS;
    "svg-jar": typeof SvgJarHelper;
    "markdown-to-html": typeof MarkdownToHtml;
    "page-title": HelperLike<{
      Args: { Positional: [title: string] };
      Return: void;
    }>;
    LeafletMap: ComponentLike<{
      Element: HTMLDivElement;
      Args: {
        lat: number;
        lng: number;
        zoom: number;
        onLoad?: LeafletEventHandlerFn;
      };
      Blocks: {
        default: [layers: EmberLeafletLayers];
      };
    }>;
  }
}
