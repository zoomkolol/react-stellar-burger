import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../../common/types/types';

type CardOrderState = {
  success: boolean,
  orders: Order[],
  total: string,
  totalToday: string
}

const initialState: CardOrderState = {
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
