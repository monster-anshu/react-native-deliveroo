import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Record<string, Record<string, number>>;
  current: string | null;
}

interface ADD_ITEM {
  restaurantId: string;
  dishId: string;
}

const initialState: CartState = {
  items: {},
  current: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ADD_ITEM>) => {
      const { dishId, restaurantId } = action.payload;
      const restaurant = state.items[restaurantId] ?? {};
      restaurant[dishId] = (restaurant[dishId] ?? 0) + 1;
      state.items[restaurantId] = restaurant;
    },
    removeItem: (state, action: PayloadAction<ADD_ITEM>) => {
      const { dishId, restaurantId } = action.payload;
      const restaurant = state.items[restaurantId] ?? {};
      const count = (restaurant[dishId] ?? 0) - 1;
      if (count < 1) {
        delete restaurant[dishId];
        if (Object.keys(restaurant).length < 1) {
          delete state.items[restaurantId];
        }
        return;
      }
      restaurant[dishId] = count;
    },
    removeDish: (state, action: PayloadAction<ADD_ITEM>) => {
      const { restaurantId, dishId } = action.payload;
      delete state.items[restaurantId]?.[dishId];
    },
    setCurrent: (state, action: PayloadAction<string | null>) => {
      state.current = action.payload;
    },
  },
});

export default cartSlice;
export const cartAction = cartSlice.actions;
