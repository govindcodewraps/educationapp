import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import BasicHome from '../../../screens/BasicScreens/BasicHome';
import basicFormScreen from '../../../screens/BasicScreens/BasicFormScreen';
import BasicFormsuccess from '../../../screens/BasicScreens/BasicFormsuccess';
export default function BasicHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BasicHome">
      <Stack.Screen name="BasicHome" component={BasicHome} />
      <Stack.Screen name="BasicFormScreen" component={basicFormScreen} />
      <Stack.Screen name="BasicFormsuccess" component={BasicFormsuccess} />
    </Stack.Navigator>
  );
}
