import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { normalizeRestaurants } from '@utils/normalizer';
import { Restaurant } from 'types';

export interface RestaurantState {
  items: Record<string, Restaurant>;
}

const initialState: RestaurantState = {
  items: {},
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Restaurant[]>) => {
      state.items = { ...state.items, ...normalizeRestaurants(action.payload) };
    },
  },
});

export default restaurantSlice;
export const restaurantAction = restaurantSlice.actions;
