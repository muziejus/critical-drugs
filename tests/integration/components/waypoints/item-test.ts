import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | waypoints/item", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function (val) { ... });

    await render(hbs`<Waypoints::Item />`);

    assert.dom().hasText("");

    // Template block usage:
    await render(hbs`
      <Waypoints::Item>
        template block text
      </Waypoints::Item>
    `);

    assert.dom().hasText("template block text");
  });
});
