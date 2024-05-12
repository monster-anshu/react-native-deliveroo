import colors from '@config/colors';
import React, { FC } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';

export type IAppTextProps = React.ComponentProps<typeof Text>;

const styles = StyleSheet.create({
  container: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: colors.text,
  },
});

const AppText: FC<IAppTextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.container, style]}>
      {children}
    </Text>
  );
};

export default AppText;
