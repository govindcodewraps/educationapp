import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Courses} from '../../../screens/bottom';
import AllCourses from '../../../screens/AllCourses/AllCourses';
import Sessions from '../../../screens/AllCourses/Sessions';
import SessionInfo from '../../../screens/AllCourses/SessionInfo';
export default function CourseStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="AllCourses" component={AllCourses} />
      <Stack.Screen name="Sessions" component={Sessions} />
      <Stack.Screen name="SessionInfo" component={SessionInfo} />
    </Stack.Navigator>
  );
}
