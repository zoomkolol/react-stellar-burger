import { BASE_URL } from "./constants";
import checkResponse from "./check-response";

export default function request(endpoint: string, settings: {}) {
  return fetch(BASE_URL + endpoint, settings).then(checkResponse)
}
