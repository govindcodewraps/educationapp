import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {HomeScreen} from '../../../screens/bottom';
import NotificationScreen from '../../../screens/NotificationScreen';
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
