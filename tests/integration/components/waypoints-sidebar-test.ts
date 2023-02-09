import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | waypoints-sidebar", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function (val) { ... });

    await render(hbs`<WaypointsSidebar />`);

    assert.dom().hasText("");

    // Template block usage:
    await render(hbs`
      <WaypointsSidebar>
        template block text
      </WaypointsSidebar>
    `);

    assert.dom().hasText("template block text");
  });
});
