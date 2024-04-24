import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import DistributerFavScreen from '../../../screens/DistributerScreens/DistributerFavScreen';
import ProductDetailScreen from '../../../screens/DistributerScreens/ProductDetailScreen';
import CheckoutScreen from '../../../screens/CheckoutScreens/CheckoutScreen';
import NotificationScreen from '../../../screens/NotificationScreen';
import CheckoutStack from '../DistributerCheckoutStack/CheckoutStack';
// import CheckoutStack from '../DistributerCheckoutStack/CheckoutStack';
export default function DistributerFavouriteStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DistributerFavScreen">
      <Stack.Screen
        name="DistributerFavScreen"
        component={DistributerFavScreen}
      />
      {/* <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      /> */}
      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
      {/* <Stack.Screen name="CheckoutStack" component={CheckoutStack} /> */}
    </Stack.Navigator>
  );
}
