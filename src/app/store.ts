import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../features/burger-constructor/burger-constructor-slice';
import { burgerIngredientsSlice } from '../features/burger-ingredients/burger-ingredients-slice';
import { ingredientDetailsSlice } from '../features/ingredient-details/ingredient-details-slice';
import { orderDetailsSlice } from '../features/order-details/order-details-slice';
import userReducer from '../common/services/user';
import cardOrderReducer from '../features/card-order/card-order-slice';
import profileOrderReducer from '../features/profile-order/profile-order-slice';
import socketMiddleware from '../common/utils/socketMiddleware/socketMiddleware';
import socketReducer from '../common/utils/socketMiddleware/socketMiddleware-slice';


const reducer = {
  burgerConstructor: burgerConstructorSlice.reducer,
  burgerIngredients: burgerIngredientsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  user: userReducer,
  cardOrder: cardOrderReducer,
  profileOrder: profileOrderReducer,
  websocket: socketReducer
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware())
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
