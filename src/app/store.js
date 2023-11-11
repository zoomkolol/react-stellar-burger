import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../features/burger-constructor/burger-constructor-slice';
import { burgerIngredientsSlice } from '../features/burger-ingredients/burger-ingredients-slice';
import { ingredientDetailsSlice } from '../features/ingredient-details/ingredient-details-slice';
import { orderDetailsSlice } from '../features/order-details/order-details-slice';

const reducer = {
  burgerConstructor: burgerConstructorSlice.reducer,
  burgerIngredients: burgerIngredientsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});
