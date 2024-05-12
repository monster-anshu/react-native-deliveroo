import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish } from 'types';
import { normalizeDishes } from '@utils/normalizer';
export interface DishState {
  items: Record<string, Dish>;
}

const initialState: DishState = {
  items: {},
};

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Dish[]>) => {
      state.items = { ...state.items, ...normalizeDishes(action.payload) };
    },
  },
});

export default dishSlice;
export const dishAction = dishSlice.actions;
