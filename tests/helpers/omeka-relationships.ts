import isOmekaUrl from "emb-line/tests/helpers/is-omeka-url";
import {
  ElementTextResponse,
  RelatedItemResponse,
  RelatedNamedItemResponse,
} from "omeka-api";

export function belongsTo(
  relatedItem: RelatedItemResponse,
  pluralType: string
) {
  console.log(relatedItem);
  return (
    typeof relatedItem.id === "number" &&
    isOmekaUrl(relatedItem.url, pluralType, relatedItem.id) &&
    relatedItem.resource === pluralType
  );
}

export function hasMany(
  collection: RelatedNamedItemResponse[],
  pluralType: string
) {
  const test = collection.map(item => {
    return isANamedItem(item, pluralType);
  });

  return test.filter(element => element === false).length === 0;
}

export function hasManyCollected() {
  return true;
}

export function hasManyElementTexts(elementTexts: ElementTextResponse[]) {
  if (elementTexts.length === 0) return false;
  const test = elementTexts.map(elementText => isAnElementText(elementText));
  return test.filter(element => element === false).length === 0;
}

function isAnElementText(elementText: ElementTextResponse) {
  return (
    typeof elementText.html === "boolean" &&
    (typeof elementText.text === "string" || elementText.text === undefined) &&
    isANamedItem(elementText.element_set, "element_sets") &&
    isANamedItem(elementText.element, "elements")
  );
}

function isANamedItem(item: RelatedNamedItemResponse, pluralType: string) {
  return (
    typeof item.id === "number" &&
    isOmekaUrl(item.url, pluralType, item.id) &&
    item.resource === pluralType &&
    typeof item.name === "string"
  );
}
