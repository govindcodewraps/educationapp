import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CheckoutScreen from '../../../screens/CheckoutScreens/CheckoutScreen';
import CheckoutAddress from '../../../screens/CheckoutScreens/CheckoutAddress';
import OrderSuccess from '../../../screens/CheckoutScreens/OrderSuccess';
const Stack = createStackNavigator();

export default function CheckoutStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutAddress" component={CheckoutAddress} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
