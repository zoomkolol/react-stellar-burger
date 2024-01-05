import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: '',
  connectionType: ''
}

const webSokcetSlice = createSlice({
  name: 'websocket',
  initialState: initialState,
  reducers: {
    addInfo: (state, action) => {
      return action.payload;
    }
  }
})

export const {addInfo} = webSokcetSlice.actions;

export default webSokcetSlice.reducer;
