// Types for compiled templates
declare module "critical-drugs/templates/*" {
  import { TemplateFactory } from "ember-cli-htmlbars";

  const tmpl: TemplateFactory;
  export default tmpl;
}
