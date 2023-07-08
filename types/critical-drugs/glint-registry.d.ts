import "@glint/environment-ember-loose";
import { ComponentLike, HelperLike } from "@glint/template";
import AndHelper from "@gavant/glint-template-types/types/ember-truth-helpers/and";
import NotHelper from "@gavant/glint-template-types/types/ember-truth-helpers/not";
import OrHelper from "@gavant/glint-template-types/types/ember-truth-helpers/or";
import LteHelper from "@gavant/glint-template-types/types/ember-truth-helpers/lte";
import GteHelper from "@gavant/glint-template-types/types/ember-truth-helpers/gte";
import GtHelper from "@gavant/glint-template-types/types/ember-truth-helpers/gt";
import EqHelper from "@gavant/glint-template-types/types/ember-truth-helpers/gt";
import MarkdownToHtml from "@gavant/glint-template-types/types/ember-cli-showdown/markdown-to-html";
import SvgJarHelper from "@gavant/glint-template-types/types/ember-svg-jar/svg-jar";
import EmberLeafletLayers from "./ember-leaflet";
import { LeafletEventHandlerFn } from "leaflet";
import "ember-css-transitions/glint";
import { PopperJS } from "ember-popperjs";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    add: HelperLike<{
      Args: { Positional: number[] };
      Return: number;
    }>;
    div: HelperLike<{
      Args: { Positional: number[] };
      Return: number;
    }>;
    mod: HelperLike<{
      Args: { Positional: number[] };
      Return: number;
    }>;
    mult: HelperLike<{
      Args: { Positional: number[] };
      Return: number;
    }>;
    sub: HelperLike<{
      Args: { Positional: number[] };
      Return: number;
    }>;
    and: typeof AndHelper;
    or: typeof OrHelper;
    not: typeof NotHelper;
    lte: typeof LteHelper;
    gte: typeof GteHelper;
    gt: typeof GtHelper;
    eq: typeof EqHelper;
    PopperJS: typeof PopperJS;
    // "on-resize": HelperLike<{
    //   Args: { Positional: [action: () => void, args: any] };
    // }>;
    "svg-jar": typeof SvgJarHelper;
    "markdown-to-html": typeof MarkdownToHtml;
    "html-safe": HelperLike<{
      Args: {Positional: [text:string]};
      Return: string;
    }>;
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
