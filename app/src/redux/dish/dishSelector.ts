import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const dishState = (state: RootState) => state.dishes;

export default class DishSelector {
  static dishState = (state: RootState) => state.dishes;

  static dishes = createSelector(this.dishState, dishState => dishState.items);

  static dishById = (id: string) =>
    createSelector(this.dishes, dishes => dishes[id]);
}
