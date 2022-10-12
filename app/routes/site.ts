import Route from "@ember/routing/route";

export default class SiteRoute extends Route {
  async model() {
    const response = await fetch("https://emb-line-omeka-site.com/api/site");
    let data = await response.json();
    return data;
  }
}
