declare module "omeka-api" {
  type OmekaResource =
    | "item_types"
    | "users"
    | "files"
    | "items"
    | "tags"
    | "element_sets"
    | "elements"
    | "exhibits"
    | "exhibit_pages"
    | "simple_pages";

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

  interface HasSummaryOfManyResponse {
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

  interface PublicFeaturedAddedModifiedResponse extends OmekaApiEntity {
    public: boolean;
    featured: boolean;
    added: string;
    modified: string;
  }

  interface ItemCollectionResponse extends PublicFeatureAddedModifiedResponse {
    owner?: RelatedItemResponse;
    element_texts: ElementTextResponse[];
    extended_resources: [];
  }

  interface ExhibitResponse extends PublicFeatureAddedModifiedResponse {
    owner?: RelatedItemResponse;
    title?: string;
    slug?: string;
    description?: string;
    credits?: string;
    exhibit_pages?: HasSummaryOfManyResponse;
  }

  interface ExhibitPageResponse extends OmekaApiEntity {
    title?: string;
    slug?: string;
    order?: number;
    parent?: number;
    exhibit?: RelatedItemResponse;
    page_blocks?: PageBlockResponse[];
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

  interface PageBlockResponse {
    id: number;
    page_id: number;
    layout?: string;
    options?: Record<string, string>;
    text?: string;
    order?: number;
    attachments: Attachment[];
  }

  interface Attachment {
    id: number;
    caption?: string;
    item?: RelatedItemResponse;
    file?: RelatedItemResponse;
  }
}
