import AppText from '@components/AppText';
import colors from '@config/colors';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { ChevronDownIcon, UserIcon } from 'react-native-heroicons/outline';

const Header: FC = () => {
  return (
    <View className="flex-row items-center px-4 pb-3 space-x-2 ">
      <Image
        source={require('@assets/header-logo.png')}
        className="w-8 h-8 bg-gray-700 rounded-full"
      />
      <View className="flex-1">
        <AppText className="text-xs font-bold text-gray-400">
          Deliver Now
        </AppText>
        <View className="flex-row items-center">
          <AppText className="text-xl font-bold ">Current Location</AppText>
          <ChevronDownIcon size={20} color={colors.text} />
        </View>
      </View>
      <UserIcon size={30} color={colors.textFaded} />
    </View>
  );
};
export default Header;
