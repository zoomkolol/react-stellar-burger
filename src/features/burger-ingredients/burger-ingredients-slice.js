import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchIngredients } from '../../common/services/api'

const initialState = {
  ingredients: [],
  loading: true
}

export const fetchIngredientsAsync = createAsyncThunk('ingredients/fetchIngredients', async () => {
  try {
    const res = await fetchIngredients();
    return res.data;
  } catch(err) {
    console.error('Ошибка: ' + err);
  }
})

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredientsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsAsync.rejected, (state) => {
        state.loading = false;
      })
  }
})
