import Route from "@ember/routing/route";

export default class SiteRoute extends Route {
  async model() {
    return {
      omeka_url: "this.urlPrefix",
      omeka_version: "2.7",
      title: "Emb-Line Omeka Backend",
      description: "Lorem ipsum dolo sit amet",
      author: "The Emb-Line Team",
      copyright: "Creative Commons Attribution-ShareAlike 3.0 License",
    };
  }
}
