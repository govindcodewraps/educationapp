import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import TrainerNotificationScreen from '../../../screens/TrainerScreens/TrainerNotificationScreen';
import TrainerHome from '../../../screens/TrainerScreens/TrainerHome';
import TrainerListScreen from '../../../screens/TrainerScreens/TrainerListScreen';

export default function TrainerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TrainerHome" component={TrainerHome} />
      <Stack.Screen name="TrainerListScreen" component={TrainerListScreen} />
      <Stack.Screen
        name="TrainerNotificationScreen"
        component={TrainerNotificationScreen}
      />

      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
