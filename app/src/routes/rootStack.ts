import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStack = {
  Home: undefined;
  Cart: undefined;
  Restaurant: {
    id: string;
  };
  Preparing: undefined;
  Delivery: undefined;
};

const RootStack = createNativeStackNavigator<RootStack>();
export default RootStack;

export type RootStackScreenProps<T extends keyof RootStack> =
  NativeStackScreenProps<RootStack, T>;
