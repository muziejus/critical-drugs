import Component from "@glimmer/component";
import SimplePageModel from "critical-drugs/models/simple-page";

interface SimplePageComponentSignature {
  simplePage: SimplePageModel;
}

export default class SimplePageComponent extends Component<SimplePageComponentSignature> {}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    SimplePage: typeof SimplePageComponent;
  }
}
