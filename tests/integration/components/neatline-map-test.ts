import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | neatline-map", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function (val) { ... });

    await render(hbs`<NeatlineMap />`);

    assert.dom().hasText("");

    // Template block usage:
    await render(hbs`
      <NeatlineMap>
        template block text
      </NeatlineMap>
    `);

    assert.dom().hasText("template block text");
  });
});
