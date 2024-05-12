import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import type { RootStackScreenProps } from '@routes/rootStack';
import { ScrollView, View } from 'react-native';
import AppSafeAreaView from '@components/AppSafeAreaView';
import Catgories from '@components/hompage/Catgories';
import FeaturesRow from '@components/hompage/FeaturesRow';
import FeaturedService from '@services/featured';
import { Featured } from 'types';
import Header from '@components/hompage/Header';
import SearchBar from '@components/hompage/SearchBar';
import { dishAction } from '@redux/dish/dishSlice';
import { useAppDispatch } from '@redux/hooks';
import { restaurantAction } from '@redux/restaurant/restaurantSlice';

type IHomePageProps = RootStackScreenProps<'Home'>;

const HomePage: FC<IHomePageProps> = ({ navigation }) => {
  const [featured, setFeatured] = useState<Featured[]>([]);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    const featured = await FeaturedService.getAll();
    setFeatured(featured);
    const restaurants = featured.map(item => item.restaurants).flat();
    const dishes = restaurants.map(item => item.dishes).flat();
    dispatch(dishAction.add(dishes));
    dispatch(restaurantAction.add(restaurants));
  };

  return (
    <AppSafeAreaView className="pt-4 bg-white">
      <Header />
      <SearchBar />
      <ScrollView className="bg-backgroundFaded">
        <Catgories />
        {featured.map(item => (
          <FeaturesRow
            title={item.name}
            description={item.short_description}
            id={item._id}
            key={item._id}
            restaurants={item.restaurants}
          />
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>
    </AppSafeAreaView>
  );
};
export default HomePage;
export type { IHomePageProps };
