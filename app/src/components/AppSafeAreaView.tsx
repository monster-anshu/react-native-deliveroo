import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type IAppSafeAreaViewProps = React.ComponentProps<
  typeof SafeAreaProvider
>;

const AppSafeAreaView: FC<IAppSafeAreaViewProps> = ({ children, ...props }) => {
  return <SafeAreaView {...props}>{children}</SafeAreaView>;
};

export default AppSafeAreaView;
