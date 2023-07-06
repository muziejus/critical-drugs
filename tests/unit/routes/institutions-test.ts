import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | institutions", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:institutions");
    assert.ok(route);
  });
});
