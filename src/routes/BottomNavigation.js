import React from 'react';
import color from '../assets/theme/color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {
  HomeStack,
  CourseStack,
  AccountStack,
  FavouriteStack,
  PlansStack,
} from './navigation';
import {Image} from 'react-native';
import {FONTS} from '../assets/theme/theme';
const ClientTab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <ClientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.dark_theme,
        tabBarInactiveTintColor: color.near_black,
      }}>
      <ClientTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/bottom_bar/home.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="PlansStack"
        component={PlansStack}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/bottom_bar/plan.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="FavouriteStack"
        component={FavouriteStack}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/bottom_bar/favourite.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="CourseStack"
        component={CourseStack}
        options={{
          tabBarLabel: 'Course',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/bottom_bar/course.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/bottom_bar/account.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />
    </ClientTab.Navigator>
  );
}
