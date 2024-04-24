import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Favourites} from '../../../screens/bottom';
export default function FavouriteStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Favourites" component={Favourites} />
    </Stack.Navigator>
  );
}
