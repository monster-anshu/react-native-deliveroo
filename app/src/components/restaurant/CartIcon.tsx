import React, { FC, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppText from '@components/AppText';
import { connect } from 'react-redux';
import { RootState } from '@redux/store';
import CartSelector from '@redux/cart/cartSelector';
import DishSelector from '@redux/dish/dishSelector';
import { Dish } from 'types';
import currency from '@utils/currency';

export interface ICartIconProps {
  count: [string, number][];
  dishes: Record<string, Dish>;
  onPress: () => void;
}

const CartIcon: FC<ICartIconProps> = ({ count, dishes, onPress }) => {
  const total = useMemo(
    () => count.reduce((pre, curr) => pre + curr[1], 0),
    [count],
  );

  const price = useMemo(
    () =>
      count
        .map(item => item[1] * (dishes[item[0]]?.price ?? 0))
        .reduce((pre, curr) => pre + curr, 0),
    [count],
  );

  if (!total) return null;
  return (
    <View className="absolute z-50 w-full bottom-5">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center p-4 mx-5 space-x-1 rounded-lg bg-primary"
      >
        <AppText className="px-2 py-1 text-lg font-extrabold bg-secondary/10 text-background">
          {total}
        </AppText>
        <AppText className="flex-1 font-extrabold text-center text-background">
          View Cart
        </AppText>
        <AppText className="text-lg font-extrabold text-background">
          {currency(price)}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

interface mapStateProps {
  id: string;
}
const mapStateToProps = (state: RootState, { id }: mapStateProps) => {
  return {
    count: CartSelector.restaurantByIdArr(id)(state),
    dishes: DishSelector.dishes(state),
  };
};
export default connect(mapStateToProps)(CartIcon);
