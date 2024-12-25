import { config } from "./services/config";

export function createUrl(path) {
  return `${config.serverUrl}/${path}`;
}
