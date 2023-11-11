import { createSlice, createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { ingredientDetailsSlice } from '../ingredient-details/ingredient-details-slice';

const initialState = {
  bun: {},
  ingredients: [],
  bunPrice: 0,
  ingredientPrice: 0,
}

export const addBun = createAction('ADD_BUN');
export const addIngredient = createAction('ADD_INGREDIENT');
export const deleteIngredient = createAction('DELETE_INGREDIENT');
export const sortIngredients = createAction('SORT_INGREDIENTS');
export const resetConstructor = createAction('RESET_CONSTRUCTOR');

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBun, (state, action) => {
        state.bun = action.payload
        state.bunPrice = action.payload.price * 2
      })
      .addCase(addIngredient, (state, action) => {
        const newIngredient = {
          uniqueId: uuid(),
          ...action.payload
        };
        state.ingredients.push(newIngredient);
        state.ingredientPrice += action.payload.price
      })
      .addCase(deleteIngredient, (state, action) => {
        state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload.uniqueId)
        state.ingredientPrice -= action.payload.price
      })
      .addCase(sortIngredients, (state, action) => {
        const { dragIndex, hoverIndex } = action.payload;

        state.ingredients.splice(dragIndex, 0, state.ingredients.splice(hoverIndex, 1)[0]);
      })
      .addCase(resetConstructor, (state) => {
        state.bun = {}
        state.ingredients = []
        state.bunPrice = 0
        state.ingredientPrice = 0
      })
    },
});
