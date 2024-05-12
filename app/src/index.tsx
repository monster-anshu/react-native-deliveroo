import React from 'react';
import * as Expo from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import RootStack from '@routes/rootStack';
import HomePage from '@pages/HomePage';
import RestaurantPage from '@pages/RestaurantPage';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import CartPage from '@pages/CartPage';
import PreparingPage from '@pages/PreparingPage';
import DeliveryPage from '@pages/DeliveryPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import '@assets/global.css';
function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomePage} />
            <RootStack.Screen name="Restaurant" component={RestaurantPage} />
            <RootStack.Screen
              name="Cart"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
              component={CartPage}
            />
            <RootStack.Screen
              name="Preparing"
              component={PreparingPage}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Delivery"
              component={DeliveryPage}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
export default Expo.registerRootComponent(App);
