// Types for compiled templates
declare module "emb-line/templates/*" {
  import { TemplateFactory } from "ember-cli-htmlbars";

  const tmpl: TemplateFactory;
  export default tmpl;
}
