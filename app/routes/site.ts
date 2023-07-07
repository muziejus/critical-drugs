import Route from "@ember/routing/route";

export default class SiteRoute extends Route {
  async model() {
    const response = await fetch("https://critical-drugs-omeka-site.com/api/site");
    const data = await response.json();
    return data;
  }
}
