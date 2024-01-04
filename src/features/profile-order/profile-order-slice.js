import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
