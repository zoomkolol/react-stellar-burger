import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../features/burger-constructor/burger-constructor-slice';
import { burgerIngredientsSlice } from '../features/burger-ingredients/burger-ingredients-slice';
import { ingredientDetailsSlice } from '../features/ingredient-details/ingredient-details-slice';
import { orderDetailsSlice } from '../features/order-details/order-details-slice';
import userReducer from '../common/services/user';
import cardOrderReducer from '../features/card-order/card-order-slice';
import profileOrderReducer from '../features/profile-order/profile-order-slice';

const reducer = {
  burgerConstructor: burgerConstructorSlice.reducer,
  burgerIngredients: burgerIngredientsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  user: userReducer,
  cardOrder: cardOrderReducer,
  profileOrder: profileOrderReducer
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});
