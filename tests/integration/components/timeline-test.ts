import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | timeline", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function (val) { ... });

    await render(hbs`<Timeline />`);

    assert.dom().hasText("");

    // Template block usage:
    await render(hbs`
      <Timeline>
        template block text
      </Timeline>
    `);

    assert.dom().hasText("template block text");
  });
});
