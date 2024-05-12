// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStack } from '@routes/rootStack';

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStack>>();
