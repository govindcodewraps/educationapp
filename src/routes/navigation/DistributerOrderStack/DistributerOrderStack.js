import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import DistributerOrderScreen from '../../../screens/DistributerScreens/DistributerOrderScreen';
import DistributerOrderTrack from '../../../screens/DistributerScreens/DistributerOrderTrack';
// import CheckoutStack from '../DistributerCheckoutStack/CheckoutStack';
export default function DistributerOrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DistributerOrderScreen">
      <Stack.Screen
        name="DistributerOrderScreen"
        component={DistributerOrderScreen}
      />
      <Stack.Screen
        name="DistributerOrderTrack"
        component={DistributerOrderTrack}
      />
      {/* <Stack.Screen name="CheckoutStack" component={CheckoutStack} /> */}
    </Stack.Navigator>
  );
}
