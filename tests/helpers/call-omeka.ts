import config from "critical-drugs/config/environment";

export default async function callOmeka(endpoint: string) {
  const fetchUrl = `${config.omekaApi.host}/${config.omekaApi.namespace}/${endpoint}`;
  const response = await fetch(fetchUrl);
  const data = await response.json();
  return data;
}
