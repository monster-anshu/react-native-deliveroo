import { Featured } from 'types';
import sanityClient from './sanity';

export default class FeaturedService {
  static async getAll() {
    try {
      const data = await sanityClient.fetch<Featured[]>(`
                *[_type == "featured"] {
                    ...,
                    restaurants[]->{
                    ...,
                    dishes[]->,
                    type->,
                    },
                }
            `);
      return data;
    } catch (error) {
      return [];
    }
  }
}
