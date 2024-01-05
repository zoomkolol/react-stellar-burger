import { CONNECT_USER_WEBSOCKET, CONNECT_WEBSOCKET, DISCONNECT_WEBSOCKET } from "../constants"

export const connectWebSocket = payload => ({
  type: CONNECT_WEBSOCKET,
  payload
})

export const connectUserWebSocket = payload => ({
  type: CONNECT_USER_WEBSOCKET,
  payload
})

export const disconnectWebsocket = () => ({
  type: DISCONNECT_WEBSOCKET
})
