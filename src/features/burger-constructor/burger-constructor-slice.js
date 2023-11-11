import { createSlice, createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  bun: {},
  ingredients: [],
  bunPrice: 0,
  ingredientPrice: 0,
}

export const addBun = createAction('ADD_BUN');
export const addIngredient = createAction('ADD_INGREDIENT', function prepare(ingredient) {
  return {
    payload: {
      ...ingredient,
      uniqueId: uuid()
    }
  }
});
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
        state.ingredients.push(action.payload);
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


export const { switchIngredients } = burgerConstructorSlice.actions;
