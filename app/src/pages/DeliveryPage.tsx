import { Image, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import type { RootStackScreenProps } from '@routes/rootStack';
import AppSafeAreaView from '@components/AppSafeAreaView';
import AppText from '@components/AppText';
import { XMarkIcon } from 'react-native-heroicons/outline';
import colors from '@config/colors';
import * as Progress from 'react-native-progress';
import { useAppSelector } from '@redux/hooks';
import CartSelector from '@redux/cart/cartSelector';
import MapView, { Marker } from 'react-native-maps';

type IDeliveryPageProps = RootStackScreenProps<'Delivery'>;

const DeliveryPage: FC<IDeliveryPageProps> = ({ navigation }) => {
  const restaurant = useAppSelector(CartSelector.currentRestaurant);
  if (!restaurant) return null;
  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-primary">
      <AppSafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={handleHome}>
            <XMarkIcon color={colors.background} size={30} />
          </TouchableOpacity>
          <AppText className="text-lg font-light text-background">
            Order help
          </AppText>
        </View>

        <View className="p-6 mx-5 my-2 rounded-md shadow-md bg-background">
          <View className="flex-row justify-between">
            <View>
              <AppText className="text-lg text-primary ">
                Estimated Arrival
              </AppText>
              <AppText className="text-4xl font-bold">45-55 Minutes</AppText>
            </View>
            <Image
              source={require('@assets/bike-animation.webp')}
              className="w-20 h-20"
            />
          </View>
          <Progress.Bar color={colors.primary} indeterminate={true} />
        </View>
      </AppSafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="z-0 flex-1 -mt-10"
        mapType="mutedStandard"
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          description={restaurant.short_description}
          identifier="origin"
          pinColor={colors.danger}
        />
      </MapView>
      <View className="flex-row items-center space-x-5 bg-background h-28 ">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="w-12 h-12 p-4 ml-5 rounded-full bg-backgroundFaded"
        />
        <View className="flex-1">
          <AppText className="text-lg">Sonnyn Sangha</AppText>
          <AppText className="text-textFaded">Your Rider</AppText>
        </View>
        <AppText className="mr-5 text-lg font-bold text-primary">Call</AppText>
      </View>
    </View>
  );
};
export default DeliveryPage;
export type { IDeliveryPageProps };
