import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../../common/types/types';

type ProfileOrderState = {
  success: boolean,
  orders: Order[],
  total: string,
  totalToday: string
}

const initialState: ProfileOrderState = {
  success: false,
  orders: [],
  total: '',
  totalToday: ''
};

export const profileOrderSlice = createSlice({
  name: 'profileOrder',
  initialState,
  reducers: {
    updateProfileOrder: (state, action) => {
      return action.payload;
    }
  }
})

export const {updateProfileOrder} = profileOrderSlice.actions;

export default profileOrderSlice.reducer;
