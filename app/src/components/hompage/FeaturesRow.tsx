import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import AppText from '@components/AppText';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import colors from '@config/colors';
import RestaurantCard from '../restaurant/RestaurantCard';
import { Restaurant } from 'types';

export interface IFeaturesRowProps {
  title: string;
  description: string;
  id: string;
  restaurants: Restaurant[];
}

const FeaturesRow: FC<IFeaturesRowProps> = ({
  description,
  title,
  restaurants,
}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between px-4 mt-4">
        <AppText className="text-lg font-bold">{title}</AppText>
        <ArrowRightIcon color={colors.textFaded} />
      </View>
      <AppText className="px-4 text-xs text-textFaded">{description}</AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        className="pt-4"
      >
        {restaurants.map(item => (
          <RestaurantCard key={item._id} id={item._id} />
        ))}
      </ScrollView>
    </View>
  );
};
export default FeaturesRow;
