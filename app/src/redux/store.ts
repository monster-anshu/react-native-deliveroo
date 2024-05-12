import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import restaurantSlice from './restaurant/restaurantSlice';
import dishSlice from './dish/dishSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    restaurants: restaurantSlice.reducer,
    dishes: dishSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
