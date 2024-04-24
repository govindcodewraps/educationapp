import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DistributerProfile from '../../../screens/DistributerScreens/DistributerProfile';
import DistributerAccountScreen from '../../../screens/DistributerScreens/DistributerAccountScreen';

import DistributerAddress from '../../../screens/DistributerScreens/DistributerAddress';
import DistributerAddAddress from '../../../screens/DistributerScreens/DistributerAddAddress';
import DistributerUpdateAddress from '../../../screens/DistributerScreens/DistributerUpdateAddress';
const Stack = createStackNavigator();
export default function DistributerAccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DistributerAccountScreen">
      <Stack.Screen
        name="DistributerAccountScreen"
        component={DistributerAccountScreen}
      />
      <Stack.Screen name="DistributerProfile" component={DistributerProfile}/>
      <Stack.Screen name="DistributerAddress" component={DistributerAddress}/>
      <Stack.Screen name="DistributerAddAddress" component={DistributerAddAddress}/>
      <Stack.Screen name="DistributerUpdateAddress" component={DistributerUpdateAddress}/>
    </Stack.Navigator>
  );
}
