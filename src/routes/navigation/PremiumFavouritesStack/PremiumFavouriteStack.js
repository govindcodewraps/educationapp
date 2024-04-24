import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Favourites} from '../../../screens/bottom';
import {PremiumFavourites} from '../../../screens/PremiumBottom';
export default function PremiumFavouriteStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PremiumFavourites" component={PremiumFavourites} />
    </Stack.Navigator>
  );
}
