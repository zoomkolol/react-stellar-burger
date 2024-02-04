import { Middleware } from "redux";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_SEND_MESSAGE } from "./socketMiddleware-action-types";
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage } from "./socketMiddleware-slice";

const socketMiddleware = (): Middleware => {
    return store => {
        let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

        if (type === WS_CONNECTION_START) {
              // объект класса WebSocket
          const wsUrl: string = payload.wsUrl;
          socket = new WebSocket(wsUrl);
        }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch(wsConnectionSuccess());
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch(wsConnectionError());
          socket = null;
        };

                // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          dispatch(wsGetMessage(data));
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch(wsConnectionClosed());
        };

        if (type === WS_CONNECTION_CLOSED) {
          socket.close();
        }

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    };
};

export default socketMiddleware;
