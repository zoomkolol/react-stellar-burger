import { createAction, createSlice } from "@reduxjs/toolkit";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "./socketMiddleware-action-types";

const initialState = {
  wsConnected: false,
  message: []
}

export const wsConnectionStart = createAction(WS_CONNECTION_START);
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
    wsGetMessage: (state, action) => {
      state.message = action.payload;
    }
  }
})

export const {wsConnectionSuccess, wsConnectionError, wsGetMessage} = webSokcetSlice.actions;

export default webSokcetSlice.reducer;
