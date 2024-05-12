import React, { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import AppText from '@components/AppText';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import colors from '@config/colors';
import { Restaurant } from 'types';
import { urlFor } from '@services/sanity';
import { useAppNavigation } from '@hooks/navigation';
import { connect } from 'react-redux';
import { RootState } from '@redux/store';
import RestaurantSelector from '@redux/restaurant/restaurantSelector';

export interface IRestaurantCardProps {
  restaurant?: Restaurant;
}

const RestaurantCard: FC<IRestaurantCardProps> = ({ restaurant }) => {
  const navigation = useAppNavigation();

  if (!restaurant) {
    return null;
  }
  const { address, image, rating, name, type, _id } = restaurant;

  const handlePress = () => {
    navigation.navigate('Restaurant', { id: _id });
  };

  return (
    <TouchableOpacity className="mr-3 bg-white shadow" onPress={handlePress}>
      <Image
        source={{ uri: urlFor(image).url() }}
        className="object-contain w-64 rounded-sm h-36"
      />
      <View className="px-3 pb-4">
        <AppText className="pt-2 text-lg font-bold">{name}</AppText>
        <View className="flex-row items-center space-x-1">
          <StarIcon color={colors.primary} size={22} />
          <AppText>
            <AppText className="text-primary ">{rating}</AppText> . {type.name}
          </AppText>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color={colors.textFaded} opacity={0.7} size={22} />
          <AppText className="text-xs text-textFaded">
            Nearby . {address}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: RootState, { id }: { id: string }) => ({
  restaurant: RestaurantSelector.restaurantById(id)(state),
});

export default connect(mapStateToProps)(RestaurantCard);
