import { Dish, Restaurant } from 'types';

export function normalizeDishes(dishes: Dish[]) {
  return dishes.reduce(
    (pre, curr) => ({
      ...pre,
      [curr._id]: curr,
    }),
    {} as Record<string, Dish>,
  );
}
export function normalizeRestaurants(restaurants: Restaurant[]) {
  return restaurants.reduce(
    (pre, curr) => ({
      ...pre,
      [curr._id]: curr,
    }),
    {} as Record<string, Restaurant>,
  );
}
