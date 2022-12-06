import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | collections", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:collections");
    assert.ok(route);
  });
});
