import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | neatline-map-service", function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test("it exists", function (assert) {
    const service = this.owner.lookup("service:neatline-map-service");
    assert.ok(service);
  });
});
