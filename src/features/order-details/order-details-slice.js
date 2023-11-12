import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getOrderDetails } from '../../common/services/api';

const initialState = {
  orderId: 0,
  loading: true
}

export const getOrderDetailsAsync = createAsyncThunk('order/getOrderDetails', async (ingredeintsArr) => {
  try {
    const res = await getOrderDetails(ingredeintsArr);
    return res;
  } catch(err) {
    console.error('Ошибка: ' + err);
  }
})

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.order.number;
      })
      .addCase(getOrderDetailsAsync.rejected, (state) => {
        state.loading = false;
      })
  }
})
