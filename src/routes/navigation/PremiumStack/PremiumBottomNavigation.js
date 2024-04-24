import React from 'react';
import color from '../../../assets/theme/color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
// import {
//   PremiHomeStack

//   CourseStack,
//   AccountStack,
//   FavouriteStack,
//   PlansStack,
// } from './navigation';
import PremiumHomeStack from '../../navigation/PremiumHomeStack/PremiumHomeStack';
import {Image} from 'react-native';
import {FONTS} from '../../../assets/theme/theme';
import PremiumPlansStack from '../PremiumPlanStack/PremiumPlanStack';
import PreMiumCourseStack from '../PremiumCourseStack/PremiumCourseStack';
import PremiumFavouriteStack from '../PremiumFavouritesStack/PremiumFavouriteStack';
import PremiumAccountStack from '../PremiumAccountStack/PremiumAccountStack';
const ClientTab = createBottomTabNavigator();

export default function PremiumBottomNavigation() {
  return (
    <ClientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.dark_blue,
        tabBarInactiveTintColor: color.near_black,
      }}>
      <ClientTab.Screen
        name="PremiumHomeStack"
        component={PremiumHomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/home.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="PremiumPlansStack"
        component={PremiumPlansStack}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/plan.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="PremiumFavouriteStack"
        component={PremiumFavouriteStack}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/favourite.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="PreMiumCourseStack"
        component={PreMiumCourseStack}
        options={{
          tabBarLabel: 'Course',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/course.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />

      <ClientTab.Screen
        name="PremiumAccountStack"
        component={PremiumAccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/account.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      />
    </ClientTab.Navigator>
  );
}
