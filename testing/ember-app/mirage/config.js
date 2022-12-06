import { createServer } from "miragejs";

export default function (config) {
  let finalConfig = {
    ...config,
    routes() {
      this.urlPrefix = "https://ember-app-omeka-site.com"; // make this `http://localhost:8080`, for example, if your API is on a different server
      this.namespace = "/api"; // make this `/api`, for example, if your API is namespaced

      // Omeka API requests.
      // https://omeka.readthedocs.io/en/latest/Reference/api/index.html#api-requests
      this.get("/collections");
      // params:
      // public: boolean;
      // featured: boolean;
      // added_since: string; // (ISO 8601)
      // modified_since: string; // (ISO 8601)
      // owner: integer;
      this.get("/collections/:id");
      this.get("/element_sets");
      // params:
      // name: string;
      // record_type: string;
      this.get("/elements");
      // params:
      // element_set: integer;
      // name: string;
      // item_type: string;
      this.get("/files");
      // params:
      // item: integer;
      // order: integer;
      // size_greater_than: integer;
      // has_derivative_image: boolean;
      // mime_type: string;
      // added_since: string; // (ISO 8601)
      // modified_since: string; // (ISO 8601)
      this.get("/item_types");
      // params:
      // name: string
      this.get("/items");
      this.get("/items/:id");
      // params:
      // collection: integer;
      // item_type: integer;
      // public: boolean;
      // featured: boolean;
      // added_since: string; // (ISO 8601)
      // modified_since: string; // (ISO 8601)
      // owner: integer;
      // tags: string;
      // excludeTags: string; // [sic]
      // hasImage: boolean; // [sic]
      // range: string;
      // search: string;
      this.get("/resources");
      this.get("/site", () => ({
        omeka_url: this.urlPrefix,
        omeka_version: "2.7",
        title: "Emb-Line Omeka Backend",
        description: "Lorem ipsum dolo sit amet",
        author: "The Emb-Line Team",
        copyright: "Creative Commons Attribution-ShareAlike 3.0 License",
      }));
      this.get("/tags");
      /*
      this.get("/collections/:id");
      this.get("/element_sets/:id");
      this.get("/elements/:id");
      this.get("/files/:id");
      this.get("/item_types/:id");
      this.get("/items/:id");
      this.get("/tags/:id");
      this.get("/users/:id");
      */
    },
  };

  return createServer(finalConfig);
}
