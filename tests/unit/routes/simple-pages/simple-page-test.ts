import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | simple-pages/simple-page", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:simple-pages/simple-page");
    assert.ok(route);
  });
});
