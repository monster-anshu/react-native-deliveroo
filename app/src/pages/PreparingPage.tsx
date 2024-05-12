import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import type { RootStackScreenProps } from '@routes/rootStack';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import colors from '@config/colors';

type IPreparingPageProps = RootStackScreenProps<'Preparing'>;

const PreparingPage: FC<IPreparingPageProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Delivery');
    }, 5000);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-primary">
      <Animatable.Image
        source={require('@assets/preparing-animation.gif')}
        animation={'slideInUp'}
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation={'slideInUp'}
        iterationCount={1}
        className="my-10 text-lg font-bold text-center text-background"
      >
        Waiting for Restaurant to accept the order!
      </Animatable.Text>
      <Progress.Circle
        size={60}
        indeterminate={true}
        color={colors.background}
      />
    </View>
  );
};
export default PreparingPage;
export type { IPreparingPageProps };
