import colors from '@config/colors';
import React, { FC } from 'react';
import { TextInput, View } from 'react-native';
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

const SearchBar: FC = () => {
  return (
    <View className="flex-row items-center px-4 mt-2 mb-1">
      <View className="flex-row items-center flex-1 p-2 space-x-2 bg-fadedBackground ">
        <MagnifyingGlassIcon color={colors.textFaded} size={16} />
        <TextInput
          placeholder="Restorants and cuisines"
          keyboardType="default"
          className="flex-1 "
        />
      </View>
      <AdjustmentsVerticalIcon color={colors.textFaded} />
    </View>
  );
};
export default SearchBar;
