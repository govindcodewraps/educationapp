import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatWith from '../screens/ChatWith';
import StartChatWith from '../screens/StartChat';

const Stack = createStackNavigator();

export default function ChatsStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChatWiths">
      <Stack.Screen
        name="ChatWiths"
        component={ChatWith}
      />
      <Stack.Screen name="StartChatS" component={StartChatWith} />
    </Stack.Navigator>
  );
}
