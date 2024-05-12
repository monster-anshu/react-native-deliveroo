import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import CatgoryCard from './CatgoryCard';
import { Category } from 'types';
import { CategoryService } from '@services/category';
import { urlFor } from '@services/sanity';

const Catgories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    CategoryService.getAll().then(data => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 10,
      }}
    >
      {categories.map(item => (
        <CatgoryCard
          imageUri={urlFor(item.image).url()}
          title={item.name}
          key={item._id}
        />
      ))}
    </ScrollView>
  );
};
export default Catgories;
