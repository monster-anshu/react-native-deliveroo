import { Category } from 'types';
import sanityClient from './sanity';

export class CategoryService {
  static async getAll() {
    try {
      const data = await sanityClient.fetch<Category[]>(`
                *[_type == "category"] {
                    ...,
                }
            `);
      return data;
    } catch (error) {
      return [];
    }
  }
}
