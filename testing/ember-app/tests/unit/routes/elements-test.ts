import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | elements", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:elements");
    assert.ok(route);
  });
});
