import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Accounts, Plans} from '../../../screens/bottom';
import Profile from '../../../screens/AccountScreens/Profile';
import Payment from '../../../screens/AccountScreens/Payment';
import History from '../../../screens/AccountScreens/History';
import {PremiumAccount} from '../../../screens/PremiumBottom';
import PremiumProfile from '../../../screens/PremiumAccountScreens/PremiumProfile';
import PremiumHistory from '../../../screens/PremiumAccountScreens/PremiumHistory';
import PremiumPayment from '../../../screens/PremiumAccountScreens/PremiumPayment';

export default function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PremiumAccount" component={PremiumAccount} />
      <Stack.Screen name="PremiumProfile" component={PremiumProfile} />
      <Stack.Screen name="PremiumPayment" component={PremiumPayment} />
      <Stack.Screen name="PremiumHistory" component={PremiumHistory} />
    </Stack.Navigator>
  );
}
