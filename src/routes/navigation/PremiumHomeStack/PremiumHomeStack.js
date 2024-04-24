import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {PremiumHome} from '../../../screens/PremiumBottom';
import NotificationScreen from '../../../screens/NotificationScreen';
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PremiumHome" component={PremiumHome} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
