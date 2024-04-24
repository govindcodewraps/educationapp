import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Accounts, Plans} from '../../../screens/bottom';
import Profile from '../../../screens/AccountScreens/Profile';
import Payment from '../../../screens/AccountScreens/Payment';
import History from '../../../screens/AccountScreens/History';
export default function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}
