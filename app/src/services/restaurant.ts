import { Restaurant } from 'types';
import sanityClient from './sanity';

export default class RestaurantService {
  static async getAll() {
    try {
      const data = await sanityClient.fetch<Restaurant[]>(`
            *[_type == "restaurant"] {
                    ...,
                    dishes[]->,
                    type-> {
                    name
                    },
                }
            `);
      return data;
    } catch (error) {
      return [];
    }
  }
}
