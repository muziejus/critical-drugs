import config from "emb-line/config/environment";

export default function isOmekaUrl(url: string, resource: string, id: number) {
  return (
    url ===
    `${config.omekaApi.host}/${config.omekaApi.namespace}/${resource}/${id}`
  );
}
