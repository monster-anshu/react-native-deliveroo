import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Dish {
  _id: string;
  name: string;
  short_description: string;
  price: number;
  image: SanityImageSource;
}

export interface Category {
  _id: string;
  name: string;
  image: SanityImageSource;
}

export interface Restaurant {
  _id: string;
  name: string;
  image: SanityImageSource;
  lat: number;
  long: number;
  address: string;
  rating: number;
  type: Partial<Category>;
  dishes: Dish[];
  short_description: string;
}

export interface Featured {
  _id: string;
  name: string;
  short_description: string;
  restaurants: Restaurant[];
}
