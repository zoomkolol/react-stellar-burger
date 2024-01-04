import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  success: false,
  orders: [],
  total: '',
  totalToday: ''
};

export const cardOrderSlice = createSlice({
  name: 'cardOrder',
  initialState,
  reducers: {
    updateCardOrder: (state, action) => {
      return action.payload;
    }
  }
})

export const {updateCardOrder} = cardOrderSlice.actions;

export default cardOrderSlice.reducer;
