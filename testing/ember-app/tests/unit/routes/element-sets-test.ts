import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | element-sets", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:element-sets");
    assert.ok(route);
  });
});
