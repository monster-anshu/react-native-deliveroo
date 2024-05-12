import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export default class RestaurantSelector {
  static state = (state: RootState) => state.restaurants;

  static restaurants = createSelector(
    this.state,
    restaurantState => restaurantState.items,
  );

  static restaurantById = (id: string) =>
    createSelector(this.restaurants, restaurants => restaurants[id]);
}
