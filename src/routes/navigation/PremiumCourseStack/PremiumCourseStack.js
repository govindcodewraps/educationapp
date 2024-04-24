import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {PremiumCourses} from '../../../screens/PremiumBottom';
import PremiumAllCourses from '../../../screens/PremiumAllCourses/PremiumAllCourses';
import PremiumSessions from '../../../screens/PremiumAllCourses/PremiumSessions';
import PremiumSessionInfo from '../../../screens/PremiumAllCourses/PremiumSessionInfo';

export default function CourseStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PremiumCourses" component={PremiumCourses} />
      <Stack.Screen name="PremiumAllCourses" component={PremiumAllCourses} />
      <Stack.Screen name="PremiumSessions" component={PremiumSessions} />
      <Stack.Screen name="PremiumSessionInfo" component={PremiumSessionInfo} />
    </Stack.Navigator>
  );
}
