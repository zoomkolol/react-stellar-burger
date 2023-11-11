import { BASE_URL } from "./constants"
import checkResponse from "./check-response"

export default function request(endpoint, settings) {
  return fetch(BASE_URL + endpoint, settings).then(checkResponse)
}
