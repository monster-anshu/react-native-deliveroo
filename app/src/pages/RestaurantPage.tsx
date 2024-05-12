import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useLayoutEffect } from 'react';
import type { RootStackScreenProps } from '@routes/rootStack';
import { urlFor } from '@services/sanity';
import AppSafeAreaView from '@components/AppSafeAreaView';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import colors from '@config/colors';
import AppText from '@components/AppText';
import {
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';
import DishRow from '@components/restaurant/DishRow';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { cartAction } from '@redux/cart/cartSlice';
import RestaurantSelector from '@redux/restaurant/restaurantSelector';
import CartIcon from '@components/restaurant/CartIcon';

type IRestaurantProps = RootStackScreenProps<'Restaurant'>;

const Restaurant: FC<IRestaurantProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const restaurant = useAppSelector(RestaurantSelector.restaurantById(id));
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(cartAction.setCurrent(restaurant?._id ?? null));
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  if (!restaurant) return null;

  const {
    _id,
    address,
    dishes,
    image,
    // lat,
    // long,
    name,
    rating,
    short_description,
    type,
  } = restaurant;

  const handleAdd = (dishId: string) => {
    dispatch(
      cartAction.addItem({
        dishId,
        restaurantId: _id,
      }),
    );
  };

  const handleRemove = (dishId: string) => {
    dispatch(
      cartAction.removeItem({
        dishId,
        restaurantId: _id,
      }),
    );
  };

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
      <CartIcon onPress={handleCart} id={_id} />
      <AppSafeAreaView>
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative">
            <Image
              source={{ uri: urlFor(image).url() }}
              className="w-full p-4 aspect-video bg-backgroundFaded"
            />
            <TouchableOpacity
              onPress={handleBack}
              className="absolute p-1 rounded-full top-4 left-4 bg-backgroundFaded"
            >
              <ArrowLeftIcon size={20} color={colors.textFaded} />
            </TouchableOpacity>
          </View>

          <View className="bg-backgroundFaded">
            <View className="px-4 pt-4">
              <AppText className="text-3xl font-bold">{name}</AppText>
              <View className="flex-row my-1 space-x-2">
                <View className="flex-row items-center space-x-1">
                  <StarIcon color={colors.primary} size={22} />
                  <AppText>
                    <AppText className="text-primary ">{rating}</AppText> .{' '}
                    {type.name}
                  </AppText>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color={colors.textFaded} size={22} />
                  <AppText className="text-textFaded">
                    Nearby . {address}
                  </AppText>
                </View>
              </View>
              <AppText className="pb-4 mt-2 text-textFaded" numberOfLines={2}>
                {short_description}
              </AppText>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-y border-y-textFaded">
            <QuestionMarkCircleIcon
              size={20}
              color={colors.textFaded}
              opacity={0.6}
            />
            <AppText className="flex-1 pl-2 font-bold ">
              Have a food allergy ?
            </AppText>
            <ChevronRightIcon size={20} color={colors.textFaded} />
          </TouchableOpacity>

          <View className="mb-24">
            <AppText className="px-4 pt-6 mb-3 text-xl font-bold">Menu</AppText>
            {dishes.map(item => (
              <DishRow
                key={item._id}
                dishId={item._id}
                restaurantId={_id}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            ))}
          </View>
        </ScrollView>
      </AppSafeAreaView>
    </>
  );
};
export default Restaurant;
export type { IRestaurantProps };
