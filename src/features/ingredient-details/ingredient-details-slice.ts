import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../common/types/types';

type IngredientDetailsState = {
  ingredient: TIngredient | null;
}

const initialState: IngredientDetailsState = {
  ingredient: null
}

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails(state, action) {
      state.ingredient = action.payload
    },
    deleteIngredientDetails(state) {
      state.ingredient = null;
    }
  }
});

export const { addIngredientDetails, deleteIngredientDetails } = ingredientDetailsSlice.actions;
