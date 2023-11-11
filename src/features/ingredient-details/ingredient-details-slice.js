import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  ingredient: {}
}

export const addIngredientDetails = createAction('ADD_INGREDIENT_DETAILS');
export const deleteIngredientDetails = createAction('DELETE_INGREDIENT_DETAILS');

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIngredientDetails, (state, action) => {
        state.ingredient = action.payload
      })
      .addCase(deleteIngredientDetails, (state) => {
        state.ingredient = {}
      })
    },
});
