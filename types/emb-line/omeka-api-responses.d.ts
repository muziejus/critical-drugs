declare module "omeka-api" {
  type OmekaResource =
    | "item_types"
    | "users"
    | "files"
    | "items"
    | "tags"
    | "element_sets"
    | "elements";

  interface OmekaApiEntity {
    id: number;
    url: string;
  }

  interface SiteReponse {
    omeka_url: string;
    omeka_version: string;
    title?: string;
    description?: string;
    author?: string;
    copyright?: string;
  }

  interface HasManyResponse {
    count?: number;
    url: string;
    resource: OmekaResource;
  }

  interface RelatedItemResponse extends OmekaApiEntity {
    resource: OmekaResource;
  }

  interface RelatedNamedItemResponse extends RelatedItemResponse {
    name: string;
  }

  type HasManyResponse = RelatedItemResponse[];

  interface ElementTextResponse {
    html: boolean;
    text: string;
    element_set: RelatedNamedItemResponse;
    element: RelatedNamedItemResponse;
  }

  interface ItemCollectionResponse extends OmekaApiEntity {
    public: boolean;
    featured: boolean;
    added: string;
    modified: string;
    owner?: RelatedItemResponse;
    element_texts: ElementTextResponse[];
    extended_resources: [];
  }

  interface ItemResponse extends ItemCollectionResponse {
    collection?: RelatedItemResponse;
    files?: HasManyResponse;
    itemType?: RelatedItemResponse;
    tags?: RelatedItemResponse[];
  }

  interface CollectionResponse extends ItemCollectionResponse {
    items: HasManyResponse[];
  }

  interface ElementResponse extends OmekaApiEntity {
    order?: number;
    name?: string;
    description?: string;
    comment?: string;
    element_set: RelatedItemResponse;
    extended_resources: [];
  }

  interface ElementSetResponse extends OmekaApiEntity {
    name?: string;
    description?: string;
    record_type?: string;
    elements: HasManyResponse;
    extended_resources: [];
  }

  interface FileResponse extends OmekaApiEntity {
    file_urls: {
      original?: string;
      fullsize?: string;
      thumbnail?: string;
      square_thumbnail?: string;
    };
    added: string;
    modified: string;
    filename: string;
    authentication: string;
    has_derivative_image: boolean;
    mime_type: string;
    order?: number;
    original_filename: string;
    size: number;
    stored: boolean;
    type_os: string;
    metadata: Record<string, string>;
    item: RelatedItemResponse;
    element_texts: ElementTextResponse[];
    extended_resources: [];
  }

  interface ItemTypeResponse extends OmekaApiEntity {
    name?: string;
    description?: string;
    elements: OmekaApiEntity[];
    items: HasManyResponse;
    extended_resources: [];
  }

  interface TagResponse extends OmekaApiEntity {
    name?: string;
    extended_resources: [];
  }
}
