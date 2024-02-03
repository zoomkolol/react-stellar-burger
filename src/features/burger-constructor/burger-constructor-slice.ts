import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TIngredient } from '../../common/types/types';

type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  bunPrice: number;
  ingredientPrice: number;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  bunPrice: 0,
  ingredientPrice: 0,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload
      state.bunPrice = action.payload.price * 2
    },
    addIngredientReducer(state, action: PayloadAction<TIngredient>) {
      const ingredientWithUniqueId = {
        ...action.payload,
        uniqueId: uuid(),
      };

      state.ingredients.push(ingredientWithUniqueId);
      state.ingredientPrice += ingredientWithUniqueId.price;
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload.uniqueId)
      state.ingredientPrice -= action.payload.price
    },
    sortIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0]);
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.bunPrice = 0;
      state.ingredientPrice = 0;
    }
  },
});

export const {addBun, addIngredientReducer, deleteIngredient, sortIngredients, resetConstructor} = burgerConstructorSlice.actions;

