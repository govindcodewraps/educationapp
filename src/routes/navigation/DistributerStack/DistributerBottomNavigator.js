import React from 'react';
import color from '../../../assets/theme/color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {
  HomeStack,
  CourseStack,
  AccountStack,
  FavouriteStack,
  PlansStack,
} from '../../navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {FONTS} from '../assets/theme/theme';
import DistributerHomeStack from '../DistributerHomeStack/DistributerHomeStack';
import DistributerFavouriteStack from '../DistributerFavStack/DistributerFavouriteStack';
import DistributerOrderStack from '../DistributerOrderStack/DistributerOrderStack';
import DistributerAccountStack from '../DistributerAccountStack/DistributerAccountStack';
import DistributerHome from '../../../screens/DistributerScreens/DistributerHome';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ChatWith from '../../../screens/ChatWith';
import StartChatWith from '../../../screens/StartChat';
import ChatsStack from '../../../Chat/ChatStack';
const ClientTab = createBottomTabNavigator();

const getRouteName = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes('DistributerAboutUs') ||
    routeName?.includes('DistributerUpdateAddress') ||
    routeName?.includes('DistributerAddAddress') ||
    routeName?.includes('DistributerAddress') ||
    routeName?.includes('DistributerProfile') ||
    routeName?.includes('DistributerOrderTrack') ||
    routeName?.includes('DistributerHomeStack') ||
    routeName?.includes('ProductDetailScreen') ||
    routeName?.includes('CheckoutStack') ||
    routeName?.includes('SubmitEnqFormScreen') ||
    routeName?.includes('EnquirySuccess') ||
    routeName?.includes('McqQuestionScreen') ||
    routeName?.includes('SubmitCertificateNumberScreen') ||
    routeName?.includes('EventScreen') ||
    routeName?.includes('EventDetail') ||
    routeName?.includes('BookEvent') ||
    routeName?.includes('PaymentSuccessScreen') ||
    routeName?.includes('DistributerNotification') ||
    routeName?.includes('DistributerRecommendedScreen')
  ) {
    return 'none';
  }
  return 'flex';
};

export default function DistributerBottomNavigator() {

  return (
    <ClientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.dark_theme,
        tabBarInactiveTintColor: color.near_black,
        // tabBarStyle: {
        //   display: 'none',
        // },
      }}
      initialRouteName="DistributerHome2">
      <ClientTab.Screen
        name="DistributerHomeStack"
        component={DistributerHomeStack}
        options={({route}) => ({
          tabBarStyle: {display: getRouteName(route)},
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/home.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        })}
      />

      {/* <ClientTab.Screen
        name="PlansStack"
        component={PlansStack}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/plan.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      /> */}

      {/* <ClientTab.Screen
        name="DistributerFavouriteStack"
        component={DistributerFavouriteStack}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/favourite.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        }}
      /> */}

      <ClientTab.Screen
        name="DistributerOrderStack"
        component={DistributerOrderStack}
        // options={{
        //   tabBarLabel: 'My Order',
        //   tabBarIcon: ({color, size}) => (
        //     <Image
        //       source={require('../../../assets/images/bottom_bar/trolley.png')}
        //       style={{height: 25, width: 25, tintColor: color}}
        //     />
        //   ),
        // }}
        options={({route}) => ({
          tabBarStyle: {display: getRouteName(route)},
          tabBarLabel: 'My Order',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/trolley.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        })}
      />

      <ClientTab.Screen
        name="DistributerAccountStack"
        component={DistributerAccountStack}
        options={({route}) => ({
          tabBarStyle: {display: getRouteName(route)},
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/bottom_bar/account.png')}
              style={{height: 25, width: 25, tintColor: color}}
            />
          ),
        })}/>
      <ClientTab.Screen
        name="Chat"
        component={ChatsStack}
        options={({route}) => ({
          tabBarStyle: {display: getRouteName(route)},
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-ellipses-outline" size={25} color={color} />
          ),
        })}/>
    </ClientTab.Navigator>
  );
}
