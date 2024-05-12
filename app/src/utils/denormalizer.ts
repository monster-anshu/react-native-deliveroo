import { Dish, Restaurant } from 'types';

export function denormalizeDishes(dishes: Record<string, Dish>) {
  return Object.keys(dishes).map(key => dishes[key]);
}

export function denormalizeReataurants(
  restaurants: Record<string, Restaurant>,
) {
  return Object.keys(restaurants).map(key => restaurants[key]);
}
