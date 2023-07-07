import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | student-papers/student-paper", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:student-papers/student-paper");
    assert.ok(route);
  });
});
