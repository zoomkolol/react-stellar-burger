import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "./socketMiddleware-action-types";
import { WSMessage } from "../../types/types";

type WebSocketState = {
  wsConnected: boolean;
  message: WSMessage | null;
}

const initialState: WebSocketState = {
  wsConnected: false,
  message: null
}

export const wsConnectionStart = createAction(WS_CONNECTION_START, (wsUrl: string) => ({
  payload: {
    wsUrl
  }
}));

export const wsConnectionClosed = createAction(WS_CONNECTION_CLOSED);


const webSokcetSlice = createSlice({
  name: 'websocket',
  initialState: initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
    },
    wsConnectionError: (state) => {
      state.wsConnected = false;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    wsGetMessage: (state, action: PayloadAction<WSMessage>) => {
      state.message = action.payload;
    }
  }
})

export const {wsConnectionSuccess, wsConnectionError, wsGetMessage} = webSokcetSlice.actions;

export default webSokcetSlice.reducer;
