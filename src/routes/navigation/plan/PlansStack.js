import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Plans} from '../../../screens/bottom';
export default function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Plans" component={Plans} />
    </Stack.Navigator>
  );
}
