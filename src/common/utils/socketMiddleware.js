import { ACCESS_TOKEN, ALL, ROUTE_LOGIN, USER } from "./constants";
import { updateCardOrder } from "../../features/card-order/card-order-slice";
import { refreshAuthToken } from "../services/api";
import { updateProfileOrder } from "../../features/profile-order/profile-order-slice";

let socket = null;

export const webSocket = (dispatch, url, mode) => {
  if(mode === ALL) {
    socket = new WebSocket(url);
  }
  if(mode == USER) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    socket = new WebSocket(url + `?token=${accessToken.replace("Bearer ", "")}`);

  }

  socket.onopen = () => {
    console.log("Connection opened");
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    /*if(data.message = "Invalid or missing token") {
      refreshAuthToken();
    }*/

    if(mode === ALL) {
      dispatch(updateCardOrder(data))
    }


    if(mode === USER) {
      dispatch(updateProfileOrder(data))
    }
  }

  socket.onclose = (event) => {
    if (event.wasClean){
      console.log(`Connection was closed correctly with code: ${event.code} and reason: ${event.reason}`);
    } else {
      console.log(`Connection was closed with code: ${event.code}`);
      console.log(event);
    }
  }
}

export const closeWebSocket = (code, reason) => {
  socket.close(code, reason);
}
