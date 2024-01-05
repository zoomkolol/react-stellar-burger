import { updateCardOrder } from "../../../features/card-order/card-order-slice";
import { updateProfileOrder } from "../../../features/profile-order/profile-order-slice";
import { refreshAuthToken } from "../../services/api";
import { ACCESS_TOKEN, CONNECT_USER_WEBSOCKET, CONNECT_WEBSOCKET, DISCONNECT_WEBSOCKET } from "../constants";
import { connectUserWebSocket, connectWebSocket } from "./socketMiddleware-actions";
import { addInfo } from "./socketMiddleware-slice";

const socketMiddleware = store => {
  let socket = null;
  let connectionType = '';

  const onOpen = event => {
    console.log('Websocket connection opened: ' + event);
    store.dispatch(addInfo({url: event.currentTarget.url, connectionType: connectionType}));
  }

  const onClose = event => {
    console.log(`Websocket connection closed with code: ${event.code}.`);
  }

  const onMessageFeed = event => {
    const data = JSON.parse(event.data);
    console.log('Websocket data: ', data);
    store.dispatch(updateCardOrder(data));
  }

  const onMessageProfileFeed = event => {
    const data = JSON.parse(event.data);
    if(data.message = "Invalid or missing token") {
      refreshAuthToken();
    }
    console.log('Websocket data: ', data);
    store.dispatch(updateProfileOrder(data));
  }

  const onError = event => {
    socket = null;
    setTimeout(() => {
      if(socket === null) {
        if(connectionType === CONNECT_WEBSOCKET) {
          store.dispatch(connectWebSocket({url: store.getState().websocket.url}))
        }
        if(connectionType === CONNECT_USER_WEBSOCKET) {
          store.dispatch(connectUserWebSocket({url: store.getState().websocket.url}))
        }
      }
    }, 1000)
  }

  return next => action => {
    switch(action.type) {
      case CONNECT_WEBSOCKET:
        if(!socket) {
          socket = new WebSocket(action.payload.url);
          connectionType = CONNECT_WEBSOCKET;
          socket.addEventListener('open', onOpen);
          socket.addEventListener('message', onMessageFeed);
          socket.addEventListener('close', onClose);
          socket.addEventListener('error', onError);
        }
        break;

      case CONNECT_USER_WEBSOCKET:
        if(!socket) {
          const accessToken = localStorage.getItem(ACCESS_TOKEN);
          socket = new WebSocket(action.payload.url + `?token=${accessToken.replace("Bearer ", "")}`);
          connectionType = CONNECT_USER_WEBSOCKET;
          socket.addEventListener('open', onOpen);
          socket.addEventListener('message', onMessageProfileFeed);
          socket.addEventListener('close', onClose);
          socket.addEventListener('error', onError);
        }
        break;

      case DISCONNECT_WEBSOCKET:
        if(socket) {
          socket.close();
          socket = null;
        }
        break;

      default:
        return next(action);
    }
  }
}

export default socketMiddleware;
