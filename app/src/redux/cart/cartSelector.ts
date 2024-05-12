import RestaurantSelector from '@redux/restaurant/restaurantSelector';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export default class CartSelector {
  static rootState = (rootState: RootState) => rootState;
  static state = (rootState: RootState) => rootState.cart;

  static retaurants = createSelector(this.state, cartState => cartState.items);
  static current = createSelector(this.state, cartState => cartState.current);
  static totalInCart = createSelector(this.retaurants, restaurants => {
    const outPut: Record<string, number> = {};
    for (const [, cart] of Object.entries(restaurants)) {
      for (const [dId, count] of Object.entries(cart)) {
        const pre_count = outPut[dId] ?? 0;
        outPut[dId] = pre_count + count;
      }
    }
    return Object.entries(outPut);
  });

  static restaurantById = (restaurantId: string) =>
    createSelector(this.retaurants, restaurants => restaurants[restaurantId]);

  static restaurantByIdArr = (restaurantId: string) =>
    createSelector(this.restaurantById(restaurantId), restaurant =>
      Object.entries(restaurant ?? {}),
    );

  static dishCount = (restaurantId: string, dishId: string) =>
    createSelector(
      this.restaurantById(restaurantId),
      restaurant => restaurant?.[dishId],
    );

  static currentRestaurant = createSelector(this.rootState, rootState => {
    const id = this.current(rootState);
    if (!id) return;
    return RestaurantSelector.restaurantById(id)(rootState);
  });

  static currentCartArr = createSelector(this.rootState, rootSate => {
    const current = this.current(rootSate);
    if (!current) return [];
    return this.restaurantByIdArr(current)(rootSate);
  });
}
