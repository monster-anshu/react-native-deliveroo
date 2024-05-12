import React, { FC, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Dish } from 'types';
import AppText from '@components/AppText';
import { urlFor } from '@services/sanity';
import colors from '@config/colors';
import currency from '@utils/currency';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { MapStateToProps, connect } from 'react-redux';
import { RootState } from '@redux/store';
import CartSelector from '@redux/cart/cartSelector';
import DishSelector from '@redux/dish/dishSelector';

export interface IDishRowProps {
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  dishCount?: number;
  dish?: Dish;
}

const DishRow: FC<IDishRowProps> = ({
  dish,
  dishCount = 0,
  onAdd,
  onRemove,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  if (!dish) return null;

  const { _id, image, name, price, short_description } = dish;
  const handlePress = () => setIsPressed(curr => !curr);

  const handleAdd = () => {
    onAdd?.(_id);
  };

  const handleRemove = () => {
    onRemove?.(_id);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        className={`p-4 bg-background border-backgroundFaded ${
          !isPressed ? 'border' : ''
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <AppText className="mb-1 text-lg">{name}</AppText>
            <AppText className="text-textFaded">{short_description}</AppText>
            <AppText className="mt-2 text-textFaded">{currency(price)}</AppText>
          </View>
          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="w-20 h-20 bg-backgroundFaded -4"
              style={{
                borderWidth: 1,
                borderColor: colors.backgroundFaded,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="px-4 bg-background">
          <View className="flex-row items-center pb-3 space-x-2 ">
            <TouchableOpacity onPress={handleRemove} disabled={dishCount <= 0}>
              <MinusCircleIcon size={40} color={colors.primary} />
            </TouchableOpacity>
            <AppText className="font-bold"> {dishCount} </AppText>
            <TouchableOpacity onPress={handleAdd}>
              <PlusCircleIcon size={40} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
const mapStateToProps: MapStateToProps<
  unknown,
  { restaurantId: string; dishId: string },
  RootState
> = (state, { dishId, restaurantId }) => {
  return {
    dish: DishSelector.dishById(dishId)(state),
    dishCount: CartSelector.dishCount(restaurantId, dishId)(state),
  };
};

export default connect(mapStateToProps, null)(DishRow);
