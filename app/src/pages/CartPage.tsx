import React, { FC, useMemo } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import AppSafeAreaView from '@components/AppSafeAreaView';
import AppText from '@components/AppText';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import CartSelector from '@redux/cart/cartSelector';
import DishSelector from '@redux/dish/dishSelector';
import type { RootState } from '@redux/store';
import type { Dish } from 'types';
import type { RootStackScreenProps } from '@routes/rootStack';
import { XCircleIcon } from 'react-native-heroicons/solid';
import colors from '@config/colors';
import { urlFor } from '@services/sanity';
import currency from '@utils/currency';
import { cartAction } from '@redux/cart/cartSlice';

type ICartPageProps = RootStackScreenProps<'Cart'> & {
  dishes: Record<string, Dish>;
};

const CartPage: FC<ICartPageProps> = ({ navigation, dishes }) => {
  const restaurant = useAppSelector(CartSelector.currentRestaurant);
  const cartItems = useAppSelector(CartSelector.currentCartArr);
  const dispatch = useAppDispatch();

  const restaurantId = restaurant?._id;
  const price = useMemo(
    () =>
      cartItems
        .map(item => item[1] * (dishes[item[0]]?.price ?? 0))
        .reduce((pre, curr) => pre + curr, 0),
    [cartItems],
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const deliveryCharges = 50;

  const handleRemove = (dishId: string) => {
    if (!restaurantId) return;
    dispatch(
      cartAction.removeItem({
        dishId: dishId,
        restaurantId: restaurantId,
      }),
    );
  };

  const handlePlaceOrder = () => {
    navigation.navigate('Preparing');
  };

  if (!restaurant) {
    return null;
  }

  return (
    <AppSafeAreaView className="flex-1">
      <View className="p-5 bg-white border-b shadow-xs border-primary">
        <View>
          <AppText className="text-2xl font-bold text-center">Cart</AppText>
          <AppText className="text-lg text-center Faded">
            {restaurant.name}
          </AppText>
        </View>
        <TouchableOpacity
          onPress={handleBack}
          className="absolute rounded-full right-5 top-3"
        >
          <XCircleIcon color={colors.primary} size={50} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-5 py-3 my-5 space-x-4 bg-background">
        <Image
          source={require('@assets/header-logo.png')}
          className="p-4 rounded-full h-7 w-7 bg-primary"
        />
        <AppText className="flex-1">Deliver in 50-74 min</AppText>
        <TouchableOpacity>
          <AppText className="text-primary">Change</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 divide-y divide-backgroundFaded">
        {cartItems.map(([dishId, count]) => {
          const dish = dishes[dishId];
          if (!dish) return;
          const price = dish.price * count;
          return (
            <View
              key={dishId}
              className="flex-row items-center px-5 py-2 space-x-3 bg-background"
            >
              <AppText className="text-primary">{count} x</AppText>
              <Image
                className="w-12 h-12 rounded-full "
                source={{
                  uri: urlFor(dish.image).url(),
                }}
              />
              <AppText className="flex-1">{dish.name}</AppText>
              <AppText className="Faded"> {currency(price)} </AppText>
              <TouchableOpacity onPress={() => handleRemove(dishId)}>
                <AppText className="text-xs text-primary">Remove</AppText>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <View className="p-5 space-y-4 bg-background">
        <View className="flex-row justify-between">
          <AppText className="text-primary">Subtotal</AppText>
          <AppText className="text-primary">{currency(price)}</AppText>
        </View>

        <View className="flex-row justify-between">
          <AppText className="text-primary">Delivery Fee</AppText>
          <AppText className="text-primary">
            {currency(deliveryCharges)}
          </AppText>
        </View>

        <View className="flex-row justify-between">
          <AppText>Order Total</AppText>
          <AppText className="font-extrabold">
            {currency(deliveryCharges + price)}
          </AppText>
        </View>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          className="p-4 rounded-lg bg-primary"
        >
          <AppText className="text-xl text-center text-background">
            Place Order
          </AppText>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    dishes: DishSelector.dishes(state),
  };
};
export default connect(mapStateToProps)(CartPage);
export type { ICartPageProps };
