import Component from "@glimmer/component";
import DisclosureButtonComponent from "./button";
import DisclosurePanelComponent from "./panel";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { guidFor } from "@ember/object/internals";

interface DisclosureComponentBlock {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  Button: typeof DisclosureButtonComponent;
  Panel: typeof DisclosurePanelComponent;
}

interface DisclosureComponentSignature {
  Element: HTMLElement;
  Args: {
    isOpen?: boolean | Promise<boolean>;
    open?: () => void;
    close?: () => void;
  };
  Blocks: {
    default: [disclosure: DisclosureComponentBlock];
  };
}

export default class DisclosureComponent extends Component<DisclosureComponentSignature> {
  guid = `${guidFor(this)}-headlessui-disclosure`;

  @tracked _isOpen = false;

  get isOpen() {
    if (this.args.isOpen) {
      return this.args.isOpen;
    }

    return this._isOpen;
  }

  @action
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  @action
  open() {
    if (this.args.open) {
      return this.args.open();
    }

    this._isOpen = true;
  }

  @action
  close() {
    if (this.args.close) {
      return this.args.close();
    }

    this._isOpen = false;
  }

  get panelGuid() {
    return `${this.guid}-panel`;
  }

  get panelElement() {
    return document.getElementById(this.panelGuid);
  }

  get buttonGuid() {
    return `${this.guid}-button`;
  }

  get buttonElement() {
    return document.getElementById(this.buttonGuid);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    Disclosure: typeof DisclosureComponent;
  }
}
