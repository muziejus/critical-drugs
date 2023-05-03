import Ember from "ember";
import "ember-source/types";
import "ember-source/types/preview";
import type MirageTestContext from "./mirage-test-context";
import type EmberLeafletLayers from "./ember-leaflet";

declare global {
  // Prevents ESLint from "fixing" this via its auto-fix to turn it into a type
  // alias (e.g. after running any Ember CLI generator)
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

export { MirageTestContext, EmberLeafletLayers };
