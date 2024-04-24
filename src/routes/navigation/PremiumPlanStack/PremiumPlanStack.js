import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {PremiumPlans} from '../../../screens/PremiumBottom';
export default function PremiumPlansStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PremiumPlans" component={PremiumPlans} />
    </Stack.Navigator>
  );
}
