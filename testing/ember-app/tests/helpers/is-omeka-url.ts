import config from "ember-app/config/environment";

export default function isOmekaUrl(
  url: string,
  resource: string,
  id: number,
  hasMany: string | null = null
) {
  if (hasMany) {
    return (
      url ===
      `${config.omekaApi.host}/${config.omekaApi.namespace}/${hasMany}?${resource}=${id}`
    );
  }
  return (
    url ===
    `${config.omekaApi.host}/${config.omekaApi.namespace}/${resource}/${id}`
  );
}
