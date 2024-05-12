import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootTabScreenProps } from './rootTab';

export type LoginScreenStack = {
  Signin: undefined;
  Signup: undefined;
};

const LoginStack = createNativeStackNavigator<LoginScreenStack>();
export default LoginStack;

export type LoginScreenProps<T extends keyof LoginScreenStack> =
  CompositeScreenProps<
    NativeStackScreenProps<LoginScreenStack, T>,
    RootTabScreenProps<'Login'>
  >;
